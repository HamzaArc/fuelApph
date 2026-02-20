
export type FuelType = 'Diesel' | 'Sans Plomb' | 'Premium';

export interface Station {
  id: string;
  name: string;
  brand: 'Shell' | 'Afriquia' | 'TotalEnergies' | 'Winxo' | 'Ola Energy' | 'Petrom';
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  prices: {
    [key in FuelType]?: number;
  };
  lastUpdated: string;
  verifiedBy?: string;
  distance: string;
  amenities: string[];
  status: 'Open' | 'Closed';
  trustScore: number;
}

export interface User {
  id: string;
  name: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  totalPoints: number;
  reportsCount: number;
  verifiedCount: number;
  savings: number;
  globalRank: number;
  vehicle?: {
    model: string;
    fuel: FuelType;
    odometer: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  description: string;
}

export interface AppNotification {
  id: string;
  type: 'price_drop' | 'reward' | 'system' | 'rank_up';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export interface Voucher {
  id: string;
  brand: string;
  value: string;
  type: 'Fuel' | 'Service' | 'Food';
  pointsRequired: number;
  code: string;
  expiryDate: string;
  isUsed: boolean;
}

export interface LogEntry {
  id: string;
  date: string;
  stationName: string;
  cost: number;
  volume: number;
  odometer: number;
}
