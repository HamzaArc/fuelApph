import { supabase } from '../lib/supabase';

// Points configuration
const POINTS = {
    MANUAL_REPORT: 50,
    SCAN_REPORT: 50,
    VOICE_REPORT: 50,
    CONFIRM: 10,
    PIONEER: 200,
} as const;

// XP thresholds per level (level -> xp needed for next level)
function getNextLevelXp(level: number): number {
    return 100 + (level - 1) * 50; // Level 1: 100, Level 2: 150, Level 3: 200, etc.
}

export interface SubmitPriceParams {
    userId: string;
    stationId: string;
    fuelType: string;
    price: number;
    reportType: 'manual' | 'scan' | 'voice' | 'confirm' | 'pioneer';
    userName?: string;
    userLevel?: number;
}

export interface AddStationParams {
    userId: string;
    userName: string;
    userLevel: number;
    brand: string;
    location: { lat: number; lng: number };
    dieselPrice: number;
}

export interface SubmitResult {
    success: boolean;
    pointsEarned: number;
    error?: string;
    stationId?: string;
}

/**
 * Submit a price report for an existing station.
 * Updates the station price, logs the report, and awards points to the user.
 */
export async function submitPriceReport(params: SubmitPriceParams): Promise<SubmitResult> {
    const { userId, stationId, fuelType, price, reportType, userName, userLevel } = params;

    const pointsMap: Record<string, number> = {
        manual: POINTS.MANUAL_REPORT,
        scan: POINTS.SCAN_REPORT,
        voice: POINTS.VOICE_REPORT,
        confirm: POINTS.CONFIRM,
        pioneer: POINTS.PIONEER,
    };
    const pointsEarned = pointsMap[reportType] || POINTS.MANUAL_REPORT;

    try {
        // 1. Update the station's prices and metadata
        if (reportType !== 'confirm') {
            // Build the updated prices object — we merge with existing
            const { data: existingStation } = await supabase
                .from('stations')
                .select('prices')
                .eq('id', stationId)
                .single();

            const currentPrices = (existingStation?.prices as Record<string, number>) || {};
            const updatedPrices = { ...currentPrices, [fuelType]: price };

            const { error: stationError } = await supabase
                .from('stations')
                .update({
                    prices: updatedPrices,
                    last_updated: new Date().toISOString(),
                    last_updated_timestamp: Date.now(),
                    verified_by: userName || userId,
                    verified_by_level: userLevel || 1,
                    is_ghost: false,
                })
                .eq('id', stationId);

            if (stationError) {
                console.error('Error updating station:', stationError);
                return { success: false, pointsEarned: 0, error: stationError.message };
            }
        }

        // 2. Insert the price report record
        const { error: reportError } = await supabase
            .from('price_reports')
            .insert({
                user_id: userId,
                station_id: stationId,
                fuel_type: fuelType,
                price: price,
                report_type: reportType,
                points_earned: pointsEarned,
            });

        if (reportError) {
            console.error('Error inserting price report:', reportError);
            // Don't fail the whole operation — the station price was already updated
        }

        // 3. Update the user's points, XP, and counts
        await awardPoints(userId, pointsEarned, reportType);

        return { success: true, pointsEarned };
    } catch (err: any) {
        console.error('submitPriceReport failed:', err);
        return { success: false, pointsEarned: 0, error: err.message };
    }
}

/**
 * Confirm existing prices on a station (the 👍 button).
 */
export async function confirmPrice(
    stationId: string,
    userId: string,
    fuelType: string = 'Diesel',
    currentPrice: number = 0
): Promise<SubmitResult> {
    return submitPriceReport({
        userId,
        stationId,
        fuelType,
        price: currentPrice,
        reportType: 'confirm',
    });
}

/**
 * Add a brand new station and submit its first price (Pioneer reward).
 */
export async function addNewStation(params: AddStationParams): Promise<SubmitResult> {
    const { userId, userName, userLevel, brand, location, dieselPrice } = params;

    try {
        // 1. Insert the new station
        const { data: newStation, error: insertError } = await supabase
            .from('stations')
            .insert({
                name: `${brand} Station`,
                brand: brand,
                location: {
                    lat: location.lat,
                    lng: location.lng,
                    address: 'User Added',
                    city: 'Morocco',
                },
                prices: { Diesel: dieselPrice },
                last_updated: new Date().toISOString(),
                last_updated_timestamp: Date.now(),
                verified_by: userName || userId,
                verified_by_level: userLevel || 1,
                distance: 'Nearby',
                amenities: [],
                status: 'Open',
                trust_score: 50,
                is_ghost: false,
            })
            .select('id')
            .single();

        if (insertError || !newStation) {
            console.error('Error inserting station:', insertError);
            return { success: false, pointsEarned: 0, error: insertError?.message || 'Failed to create station' };
        }

        // 2. Submit the price report with Pioneer bonus
        const result = await submitPriceReport({
            userId,
            stationId: newStation.id,
            fuelType: 'Diesel',
            price: dieselPrice,
            reportType: 'pioneer',
            userName,
            userLevel,
        });

        return { ...result, stationId: newStation.id };
    } catch (err: any) {
        console.error('addNewStation failed:', err);
        return { success: false, pointsEarned: 0, error: err.message };
    }
}

/**
 * Award points and XP to a user, handling level-up logic.
 */
async function awardPoints(
    userId: string,
    points: number,
    reportType: string
): Promise<void> {
    // Fetch current user data
    const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('total_points, xp, next_level_xp, level, reports_count, verified_count')
        .eq('id', userId)
        .single();

    if (fetchError || !user) {
        console.error('Error fetching user for point award:', fetchError);
        return;
    }

    let newXp = (user.xp || 0) + points;
    let newLevel = user.level || 1;
    let newNextLevelXp = user.next_level_xp || 100;

    // Check for level-up
    while (newXp >= newNextLevelXp) {
        newXp -= newNextLevelXp;
        newLevel += 1;
        newNextLevelXp = getNextLevelXp(newLevel);
    }

    const isReport = ['manual', 'scan', 'voice', 'pioneer'].includes(reportType);
    const isConfirm = reportType === 'confirm';

    const { error: updateError } = await supabase
        .from('users')
        .update({
            total_points: (user.total_points || 0) + points,
            xp: newXp,
            level: newLevel,
            next_level_xp: newNextLevelXp,
            reports_count: (user.reports_count || 0) + (isReport ? 1 : 0),
            verified_count: (user.verified_count || 0) + (isConfirm ? 1 : 0),
        })
        .eq('id', userId);

    if (updateError) {
        console.error('Error awarding points:', updateError);
    }
}

/**
 * Refresh stations from Supabase — returns all stations.
 */
export async function fetchAllStations() {
    const { data, error } = await supabase.from('stations').select('*');
    if (error) {
        console.error('Error fetching stations:', error);
        return [];
    }
    return data || [];
}
