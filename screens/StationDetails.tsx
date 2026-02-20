
import React, { useState } from 'react';
import { Station } from '../types';

interface StationDetailsProps {
  station: Station;
  onBack: () => void;
  onReport: () => void;
  onManualReport: () => void;
  onVoiceReport: () => void;
}

export const StationDetails: React.FC<StationDetailsProps> = ({ station, onBack, onReport, onManualReport, onVoiceReport }) => {
  const [showRating, setShowRating] = useState(false);
  const [ratings, setRatings] = useState({ cleanliness: 4, service: 0, speed: 0 });

  const amenitiesMap: Record<string, string> = {
    'Café': 'local_cafe',
    'Shop': 'grocery',
    'Air': 'tire_repair',
    'WC': 'wc',
    'Mosque': 'mosque',
    'ATM': 'atm',
    'Car Wash': 'local_car_wash',
    'EV Charge': 'ev_charger'
  };

  return (
    <div className="bg-background-dark font-display text-slate-100 overflow-hidden h-screen w-full relative flex flex-col">
      {/* Map Background Context */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <div className="w-full h-full bg-cover bg-center opacity-60 grayscale" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJLgQ9wEwiHsM99SSiFEXSia0Hldr_5vgU5gabEzxFBW8m8n6pGGj_VCXmwiTGKym51jNo9XknsvEtwRRl3zGJiTKB2JWR8WC1cH7nQJJL88atogIvMebAi6GHDbYOk_WRIV6Gjhw8aSvm09D6jyc7V1Hhb7fX218UhfVep3xrumlslJaB6RT4BGoZyW16yPWNyvpmo28zbOSjrw7X_wqWZ3sBhT8FM7mvCgzd-MCfZ_OZhYQ6oRnbSfNpTV7Wdtj6t3zqEk5MPouH')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/30 via-transparent to-background-dark/90"></div>
        
        <div className="absolute top-14 left-4 right-4 flex justify-between items-start z-20">
          <button onClick={onBack} className="bg-surface-dark/90 backdrop-blur-md p-3 rounded-full text-white shadow-lg border border-white/10">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <button className="bg-surface-dark/90 backdrop-blur-md p-3 rounded-full text-white shadow-lg border border-white/10">
            <span className="material-symbols-outlined text-[24px]">layers</span>
          </button>
        </div>

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-primary text-background-dark px-3 py-1 rounded-full text-xs font-bold mb-1 shadow-lg shadow-primary/20 whitespace-nowrap">
              {station.prices.Diesel} DH
          </div>
          <span className="material-symbols-outlined text-primary text-5xl drop-shadow-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
        </div>
      </div>

      {/* Bottom Sheet Container */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end h-[92vh] sm:h-auto pointer-events-none">
        <div className="bg-surface-dark border-t border-white/10 rounded-t-[32px] shadow-[0_-8px_30px_rgba(0,0,0,0.5)] w-full max-w-md mx-auto pointer-events-auto flex flex-col h-full sm:h-auto overflow-hidden relative backdrop-blur-xl bg-opacity-95">
          {/* Drag Handle */}
          <div className="w-full flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-24 sm:pb-6">
            {!showRating ? (
              <>
                <div className="flex items-start justify-between mt-4 mb-6">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center p-2 shadow-inner">
                      <span className="text-slate-900 font-bold text-lg uppercase">{station.brand.substring(0,2)}</span>
                    </div>
                    <div className="text-left">
                      <h1 className="text-2xl font-bold text-white tracking-tight leading-none mb-1">{station.name}</h1>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1 text-primary">
                          <span className="material-symbols-outlined text-[16px]">near_me</span> {station.distance}
                        </span>
                        <span>•</span>
                        <span className="text-blue-400">Open Now</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 rounded-full hover:bg-white/5 text-gray-400">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>

                {/* Price Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-50">
                        <span className="material-symbols-outlined text-white/20 text-4xl -rotate-12">local_gas_station</span>
                    </div>
                    <p className="text-gray-400 text-sm font-medium mb-1 text-left uppercase">Diesel</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white tracking-tight">{station.prices.Diesel}</span>
                      <span className="text-sm font-medium text-gray-400">DH</span>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-50">
                        <span className="material-symbols-outlined text-white/20 text-4xl -rotate-12">local_gas_station</span>
                    </div>
                    <p className="text-gray-400 text-sm font-medium mb-1 text-left uppercase">Sans Plomb</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white tracking-tight">{station.prices['Sans Plomb']}</span>
                      <span className="text-sm font-medium text-gray-400">DH</span>
                    </div>
                  </div>
                </div>

                {/* Price History */}
                <div className="mb-8 p-4 bg-white/5 border border-white/5 rounded-2xl text-left">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">Price History</h3>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span className="text-xs text-gray-400">Diesel</span>
                        </div>
                    </div>
                  </div>
                  <div className="relative h-24 w-full mt-2">
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                      <path d="M0,45 L20,40 L40,42 L60,35 L80,30 L100,28" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="80" cy="30" fill="#3b82f6" r="2" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest">
                    <span>30d ago</span>
                    <span>Today</span>
                  </div>
                </div>

                {/* Verification Status */}
                <div className="flex items-center gap-2 mb-8 px-1">
                  <div className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                  <span className="text-xs text-slate-400 font-medium">Verified by <span className="text-white font-bold">{station.verifiedBy || 'Community'}</span> • {station.lastUpdated}</span>
                </div>

                {/* Reporting Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">Report Prices</h3>
                    <div className="flex items-center gap-1 text-xs font-black text-accent-gold bg-accent-gold/10 px-2.5 py-1 rounded-full border border-accent-gold/20">
                      <span className="material-symbols-outlined text-[14px] fill-current">stars</span>
                      <span>Earn +50 pts</span>
                    </div>
                  </div>

                  {/* Scan Button (Primary) */}
                  <button onClick={onReport} className="w-full group relative flex items-center justify-between bg-primary hover:bg-blue-400 transition-all duration-300 rounded-2xl p-5 text-background-dark overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="flex items-center gap-4 z-10 text-left">
                      <div className="bg-background-dark/10 p-2.5 rounded-xl">
                        <span className="material-symbols-outlined text-[28px] font-black">center_focus_strong</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-lg leading-tight uppercase tracking-tight">Scan Price Board</span>
                        <span className="text-[10px] opacity-70 font-black uppercase tracking-widest">AI Verification (OCR)</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined z-10 font-black">arrow_forward</span>
                  </button>

                  {/* Voice & Manual (Secondary Row) */}
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={onVoiceReport} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all rounded-2xl p-4 active:scale-95">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
                      <span className="font-black text-xs uppercase tracking-widest">Voice</span>
                    </button>
                    <button onClick={onManualReport} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all rounded-2xl p-4 active:scale-95">
                      <span className="material-symbols-outlined text-slate-400">edit</span>
                      <span className="font-black text-xs uppercase tracking-widest">Manual</span>
                    </button>
                  </div>
                </div>

                {/* Services Section */}
                <div className="mt-8 text-left">
                  <h3 className="text-[10px] font-black text-slate-500 mb-4 uppercase tracking-[0.2em]">Available Services</h3>
                  <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    {station.amenities.map(amenity => (
                      <div key={amenity} className="flex flex-col items-center gap-2 min-w-[64px]">
                        <div className="size-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-slate-300">
                          <span className="material-symbols-outlined text-[20px]">
                            {amenitiesMap[amenity] || 'check'}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="animate-fadeIn py-4 text-center">
                 <h2 className="text-white font-black text-xl mb-4">Rating Station...</h2>
                 <button onClick={() => setShowRating(false)} className="text-primary font-bold">Close</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
