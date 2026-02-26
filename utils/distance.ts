export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const p1 = lat1 * Math.PI / 180;
    const p2 = lat2 * Math.PI / 180;
    const dp = (lat2 - lat1) * Math.PI / 180;
    const dl = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dp / 2) * Math.sin(dp / 2) +
        Math.cos(p1) * Math.cos(p2) *
        Math.sin(dl / 2) * Math.sin(dl / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

export function estimateDrivingTime(distanceMeters: number): number {
    // Assuming an average city speed of 30 km/h (8.33 m/s)
    const averageSpeedMpS = 8.33;
    const timeSeconds = distanceMeters / averageSpeedMpS;
    return Math.ceil(timeSeconds / 60); // Time in minutes
}
