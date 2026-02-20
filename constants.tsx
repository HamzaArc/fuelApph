
import React from 'react';
import { Station, FuelType, User, Voucher } from './types';

// Fix: Added missing required property 'globalRank' to satisfy the User interface
export const MOCK_USER: User = {
  id: 'u1',
  name: 'Karim Benali',
  level: 12,
  xp: 1250,
  nextLevelXp: 1600,
  totalPoints: 2450,
  reportsCount: 142,
  verifiedCount: 89,
  savings: 240,
  globalRank: 42,
  vehicle: {
    model: 'Renault Clio 4',
    fuel: 'Diesel',
    odometer: 124500
  }
};

export const MOCK_STATIONS: Station[] = [
  {
    id: 's1',
    name: 'Shell Agdal',
    brand: 'Shell',
    location: { lat: 33.5890, lng: -7.6310, address: 'Ave. Hassan II', city: 'Casablanca' },
    prices: { Diesel: 13.45, 'Sans Plomb': 14.90 },
    lastUpdated: '15 min ago',
    verifiedBy: 'Ahmed',
    distance: '0.5 km',
    amenities: ['Café', 'Shop', 'Air', 'WC'],
    status: 'Open',
    trustScore: 94
  },
  {
    id: 's2',
    name: 'Afriquia Maarif',
    brand: 'Afriquia',
    location: { lat: 33.5800, lng: -7.6350, address: "Bd. Al Massira", city: 'Casablanca' },
    prices: { Diesel: 13.40, 'Sans Plomb': 14.85 },
    lastUpdated: '2h ago',
    verifiedBy: 'Sami',
    distance: '1.2 km',
    amenities: ['Mosque', 'Café', 'ATM'],
    status: 'Open',
    trustScore: 88
  },
  {
    id: 's3',
    name: 'TotalEnergies Ghandi',
    brand: 'TotalEnergies',
    location: { lat: 33.5750, lng: -7.6450, address: 'Bd. Ghandi', city: 'Casablanca' },
    prices: { Diesel: 13.52, 'Sans Plomb': 14.98 },
    lastUpdated: '1h ago',
    verifiedBy: 'Layla',
    distance: '2.4 km',
    amenities: ['Car Wash', 'Shop', 'EV Charge'],
    status: 'Open',
    trustScore: 92
  }
];

export const MOCK_VOUCHERS: Voucher[] = [
  {
    id: 'v1',
    brand: 'Afriquia',
    value: '20 MAD Off Fuel',
    type: 'Fuel',
    pointsRequired: 500,
    code: 'AFR-8821',
    expiryDate: '12 Oct 2024',
    isUsed: false
  },
  {
    id: 'v2',
    brand: 'Shell',
    value: 'Free Espresso',
    type: 'Food',
    pointsRequired: 200,
    code: 'SHL-COF-99',
    expiryDate: '20 Oct 2024',
    isUsed: false
  }
];

export const BRAND_COLORS = {
  Shell: 'bg-yellow-400',
  Afriquia: 'bg-blue-600',
  TotalEnergies: 'bg-red-500',
  Winxo: 'bg-purple-700',
  'Ola Energy': 'bg-blue-800',
  Petrom: 'bg-orange-600'
};
