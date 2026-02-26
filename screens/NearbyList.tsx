import React, { useEffect, useState } from 'react';
import { Station } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';

interface NearbyListProps {
  onStationSelect: (station: Station) => void;
  onBack: () => void;
  title?: string;
  initialSearch?: string;
  searchPlaceholder?: string;
}

export const NearbyList: React.FC<NearbyListProps> = ({
  onStationSelect,
  onBack,
  title,
  initialSearch = "Agdal, Rabat",
  searchPlaceholder
}) => {
  const { t } = useLanguage();

  const displayTitle = title || t('nearby.nearbyStations');
  const displayPlaceholder = searchPlaceholder || t('nearby.searchArea');

  const filters = [
    { id: 'cheapest', label: t('nearby.cheapest') },
    { id: 'nearest', label: t('nearby.nearest') },
    { id: 'diesel', label: t('station.diesel') },
    { id: 'verified', label: t('nearby.verified') }
  ];

  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('stations').select('*').limit(20);
      if (data && !error) {
        setStations(data);
      }
      setLoading(false);
    };
    fetchStations();
  }, []);

  return (
    <div className="flex flex-col h-full bg-background-dark animate-fadeIn">
      <header className="sticky top-0 z-20 bg-background-dark/95 backdrop-blur-md pt-12 pb-4 px-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <h1 className="text-xl font-black text-white">{displayTitle}</h1>
          <button onClick={onBack} className="flex items-center gap-1 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 transition-all">
            <span className="material-symbols-outlined text-primary text-[20px]">map</span>
            <span className="text-xs font-bold text-primary">{t('nearby.map')}</span>
          </button>
        </div>

        <div className="relative mb-6">
          <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
            <span className="material-symbols-outlined">search</span>
          </span>
          <input
            className="w-full bg-surface-dark border-none rounded-2xl py-4 pl-12 pr-12 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-primary/50"
            placeholder={displayPlaceholder}
            defaultValue={initialSearch}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {filters.map((filter, i) => (
            <button
              key={filter.id}
              className={`flex-shrink-0 flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold border transition-all ${i === 0 ? 'bg-primary border-primary text-background-dark shadow-primary/20 shadow-lg' : 'bg-surface-dark border-white/10 text-slate-300'
                }`}
            >
              <span className="material-symbols-outlined text-[18px]">{i === 0 ? 'attach_money' : 'near_me'}</span>
              {filter.label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-24 no-scrollbar">
        {loading ? (
          <div className="flex justify-center p-8"><div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full" /></div>
        ) : stations.length === 0 ? (
          <div className="text-center text-slate-400 p-8">{t('nearby.noStationsFound') || 'No stations found'}</div>
        ) : (
          stations.map((s) => {
            const isBest = s.prices.Diesel === 13.40; // You might want to calculate the actual best price dynamically later
            return (
              <div
                key={s.id}
                onClick={() => onStationSelect(s)}
                className={`relative group bg-surface-dark rounded-2xl p-5 border transition-all active:scale-[0.98] ${isBest ? 'border-primary/40 shadow-xl shadow-primary/5' : 'border-white/5'
                  }`}
              >
                {isBest && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-primary/20 text-primary px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-primary/20">
                    <span className="material-symbols-outlined text-[12px] fill-1">stars</span>
                    {t('nearby.bestPrice')}
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="relative size-14 shrink-0 rounded-xl bg-white p-2 flex items-center justify-center shadow-inner">
                    <span className="text-slate-800 font-black text-xs uppercase">{s.brand.substring(0, 2)}</span>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="text-lg font-bold text-white truncate pr-16 leading-tight">{s.name}</h3>
                    <p className="text-slate-500 text-xs truncate mb-4">{s.location.address}, {s.location.city}</p>

                    <div className="flex items-baseline justify-between border-t border-white/5 pt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                          <span className="material-symbols-outlined text-[16px]">distance</span>
                          {s.distance}
                        </div>
                        <div className="flex items-center gap-1 text-primary text-xs font-black">
                          <span className="material-symbols-outlined text-[16px] fill-1">verified</span>
                          {s.lastUpdated}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-2xl font-black text-primary leading-none tracking-tight">
                          {s.prices.Diesel} <span className="text-xs font-bold">DH</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
};