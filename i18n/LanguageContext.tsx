import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'fr';

interface Translations {
  [key: string]: any;
}

const en: Translations = {
  nav: {
    explore: 'Explore',
    search: 'Search',
    scan: 'Scan',
    rewards: 'Rewards',
    profile: 'Profile'
  },
  onboarding: {
    title: 'Save on every',
    titleHighlight: 'Liter.',
    subtitle: 'Join the largest community of drivers in Morocco finding the best fuel prices in real-time.',
    getStarted: 'Get Started',
    locationTitle: 'Find Nearby Stations',
    locationSubtitle: 'FuelSpy needs your location to show you the cheapest gas stations around you and enable 1-tap price verification.',
    allowLocation: 'Allow Location Access',
    skip: 'Skip for now'
  },
  app: {
    snapSave: 'Snap & Save',
    snapDesc: 'Report any station price board to earn rewards. Our AI handles the verification instantly.',
    startScanning: 'Start Scanning',
    unknown: 'Unknown',
    searchResults: 'Search Results'
  },
  profile: {
    level: 'LVL',
    expertTracker: 'Expert Tracker • Top 1% in Rabat',
    savings: 'Savings',
    reports: 'Reports',
    rank: 'Rank',
    leaderboard: 'Leaderboard',
    leaderboardDesc: 'Check your rank',
    referrals: 'Referrals',
    referralsDesc: 'Earn 100 pts',
    fuelLogs: 'Fuel Logs',
    fuelLogsDesc: 'Track efficiency',
    badges: 'Badges',
    badgesDesc: '12/45 Unlocked',
    vehicleSettings: 'Vehicle Settings',
    paymentMethods: 'Payment Methods',
    accountSecurity: 'Account Security',
    helpCenter: 'Help Center',
    language: 'Language',
    languageDesc: 'English / Français',
    signOut: 'Sign Out'
  },
  languageSettings: {
    title: 'Language / Langue',
    select: 'Select your preferred language:'
  },
  map: {
    searchPlaceholder: 'Search city... (Press Enter)',
    startLocation: 'Start: Current Location',
    route: 'Route',
    whereTo: 'Where are you going?',
    dragPin: 'Drag map to place pin',
    confirmLocation: 'Confirm Location',
    locationNotFound: 'Location not found. Try another city or area in Morocco.',
    cheapestRoute: 'Cheapest on Route',
    cheapestNearby: 'Cheapest Nearby',
    madL: 'MAD / L',
    mins: 'MINS',
    startJourney: 'Start Journey'
  },
  station: {
    mapImport: 'Map Import',
    beFirst: 'Be the first!',
    ghostDesc: 'Google Maps tells us there is a {brand} here. Verify it by scanning the price board to earn a massive pioneer reward.',
    scanNow: 'Scan Prices Now +500 PTS',
    enterManually: 'Or enter manually',
    diesel: 'Diesel',
    sansPlomb: 'Unleaded',
    premium: 'Premium',
    needsVerification: 'Needs Verification',
    verifiedBy: 'Verified by',
    community: 'Community',
    openWaze: 'Open Waze',
    googleMaps: 'Google Maps',
    confirmPrices: 'Confirm Current Prices',
    verified10: 'Verified! +10 Points',
    reportChange: 'Report Change',
    scanBoard: 'Scan Price Board',
    aiVerification: 'AI Verification (OCR)',
    voice: 'Voice',
    manual: 'Manual',
    openNow: 'Open Now',
    drive: 'Drive',
    earn50: 'Earn +50 pts',
    availableServices: 'Available Services',
    ratingStation: 'Rating Station...',
    close: 'Close'
  },
  nearby: {
    nearbyStations: 'Nearby Stations',
    map: 'Map',
    searchArea: 'Search area or station...',
    cheapest: 'Cheapest',
    nearest: 'Nearest',
    verified: 'Verified',
    bestPrice: 'Best Price'
  },
  search: {
    findFuel: 'Find Fuel',
    searchPlaceholder: 'Search station or city...',
    cheapest: 'Cheapest',
    nearest: 'Nearest',
    myRewards: 'My Rewards',
    recentSearches: 'Recent Searches',
    clear: 'Clear',
    away: 'away',
    popularCities: 'Popular Cities',
    stations: 'Stations',
    filterBrand: 'Filter by Brand',
    amenities: 'Amenities',
    fuelType: 'Fuel Type',
    applyFilters: 'Apply Filters'
  },
  amenities: {
    'Café': 'Café',
    'Shop': 'Shop',
    'Air': 'Air',
    'WC': 'WC',
    'Mosque': 'Mosque',
    'ATM': 'ATM',
    'Car Wash': 'Car Wash',
    'EV Charge': 'EV Charge'
  }
};

const fr: Translations = {
  nav: {
    explore: 'Explorer',
    search: 'Rechercher',
    scan: 'Scanner',
    rewards: 'Récompenses',
    profile: 'Profil'
  },
  onboarding: {
    title: 'Économisez sur chaque',
    titleHighlight: 'Litre.',
    subtitle: 'Rejoignez la plus grande communauté de conducteurs au Maroc pour trouver les meilleurs prix de carburant en temps réel.',
    getStarted: 'Commencer',
    locationTitle: 'Trouver des stations',
    locationSubtitle: 'FuelSpy a besoin de votre position pour vous montrer les stations les moins chères et permettre la vérification des prix en un clic.',
    allowLocation: 'Autoriser la position',
    skip: 'Ignorer pour le moment'
  },
  app: {
    snapSave: 'Scanner & Économiser',
    snapDesc: 'Signalez n\'importe quel panneau de prix pour gagner des récompenses. Notre IA s\'occupe de la vérification instantanément.',
    startScanning: 'Commencer le scan',
    unknown: 'Inconnu',
    searchResults: 'Résultats de recherche'
  },
  profile: {
    level: 'NIV',
    expertTracker: 'Traqueur Expert • Top 1% à Rabat',
    savings: 'Économies',
    reports: 'Signalements',
    rank: 'Classement',
    leaderboard: 'Classement',
    leaderboardDesc: 'Voir votre rang',
    referrals: 'Parrainage',
    referralsDesc: 'Gagnez 100 pts',
    fuelLogs: 'Carnet de bord',
    fuelLogsDesc: 'Suivi de conso',
    badges: 'Badges',
    badgesDesc: '12/45 Débloqués',
    vehicleSettings: 'Paramètres du véhicule',
    paymentMethods: 'Moyens de paiement',
    accountSecurity: 'Sécurité du compte',
    helpCenter: 'Centre d\'aide',
    language: 'Langue',
    languageDesc: 'English / Français',
    signOut: 'Se déconnecter'
  },
  languageSettings: {
    title: 'Langue / Language',
    select: 'Choisissez votre langue préférée :'
  },
  map: {
    searchPlaceholder: 'Rechercher une ville... (Entrée)',
    startLocation: 'Départ : Position actuelle',
    route: 'Itinéraire',
    whereTo: 'Où allez-vous ?',
    dragPin: 'Faites glisser pour placer le repère',
    confirmLocation: 'Confirmer l\'emplacement',
    locationNotFound: 'Lieu introuvable. Essayez une autre ville au Maroc.',
    cheapestRoute: 'Moins cher sur la route',
    cheapestNearby: 'Moins cher à proximité',
    madL: 'MAD / L',
    mins: 'MIN',
    startJourney: 'Démarrer le trajet'
  },
  station: {
    mapImport: 'Importé de la carte',
    beFirst: 'Soyez le premier !',
    ghostDesc: 'Google Maps indique qu\'il y a une station {brand} ici. Vérifiez-la en scannant le panneau des prix pour gagner une récompense pionnier massive.',
    scanNow: 'Scanner les prix +500 PTS',
    enterManually: 'Ou saisir manuellement',
    diesel: 'Gasoil',
    sansPlomb: 'Sans Plomb',
    premium: 'Premium',
    needsVerification: 'Nécessite une vérification',
    verifiedBy: 'Vérifié par',
    community: 'Communauté',
    openWaze: 'Ouvrir Waze',
    googleMaps: 'Google Maps',
    confirmPrices: 'Confirmer les prix',
    verified10: 'Vérifié ! +10 Points',
    reportChange: 'Signaler un changement',
    scanBoard: 'Scanner le panneau',
    aiVerification: 'Vérification IA (OCR)',
    voice: 'Vocal',
    manual: 'Manuel',
    openNow: 'Ouvert maintenant',
    drive: 'Y aller',
    earn50: 'Gagnez +50 pts',
    availableServices: 'Services disponibles',
    ratingStation: 'Évaluation en cours...',
    close: 'Fermer'
  },
  nearby: {
    nearbyStations: 'Stations à proximité',
    map: 'Carte',
    searchArea: 'Rechercher une zone...',
    cheapest: 'Moins cher',
    nearest: 'Plus proche',
    verified: 'Vérifié',
    bestPrice: 'Meilleur prix'
  },
  search: {
    findFuel: 'Trouver du carburant',
    searchPlaceholder: 'Rechercher station ou ville...',
    cheapest: 'Moins cher',
    nearest: 'Plus proche',
    myRewards: 'Mes récompenses',
    recentSearches: 'Recherches récentes',
    clear: 'Effacer',
    away: 'de distance',
    popularCities: 'Villes populaires',
    stations: 'Stations',
    filterBrand: 'Filtrer par marque',
    amenities: 'Services',
    fuelType: 'Carburant',
    applyFilters: 'Appliquer les filtres'
  },
  amenities: {
    'Café': 'Café',
    'Shop': 'Boutique',
    'Air': 'Air / Pression',
    'WC': 'Toilettes',
    'Mosque': 'Mosquée',
    'ATM': 'GAB / Retrait',
    'Car Wash': 'Lavage Auto',
    'EV Charge': 'Borne VE'
  }
};

const translations = { en, fr };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (path: string) => {
    const keys = path.split('.');
    let result = translations[language];
    for (const key of keys) {
      if (result[key] === undefined) return path;
      result = result[key];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};