import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const VehicleSettings: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  const [category, setCategory] = useState<'car' | 'taxi' | 'truck'>('car');
  const [fuel, setFuel] = useState('Diesel');

  return (
    <div className="flex flex-col h-full bg-background-dark animate-fadeIn">
      <header className="flex items-center justify-between p-4 pt-12 z-20">
        <button onClick={onBack} className="size-11 rounded-2xl bg-surface-dark border border-white/5 flex items-center justify-center text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black">{t('vehicleSettings.title')}</h1>
        <div className="size-11" />
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
        <section>
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t('vehicleSettings.category')}</h2>
          <div className="grid grid-cols-3 gap-3">
             {[
               { id: 'car', label: t('vehicleSettings.personal'), icon: 'directions_car' },
               { id: 'taxi', label: t('vehicleSettings.taxi'), icon: 'local_taxi' },
               { id: 'truck', label: t('vehicleSettings.truck'), icon: 'local_shipping' }
             ].map(cat => (
               <button 
                 key={cat.id}
                 onClick={() => setCategory(cat.id as any)}
                 className={`flex flex-col items-center gap-3 p-4 rounded-3xl border transition-all ${category === cat.id ? 'bg-primary border-primary text-background-dark' : 'bg-surface-dark border-white/5 text-slate-400'}`}
               >
                 <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                 <span className="text-[9px] font-black uppercase">{cat.label}</span>
               </button>
             ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t('vehicleSettings.coreInfo')}</h2>
          <div className="bg-surface-dark rounded-3xl border border-white/5 p-2 space-y-1">
             <div className="p-4 flex items-center justify-between border-b border-white/5">
                <span className="text-sm font-bold text-slate-300">{t('vehicleSettings.modelName')}</span>
                <input className="bg-transparent border-none text-right font-bold text-white focus:ring-0 p-0" defaultValue="Renault Clio 4" />
             </div>
             <div className="p-4 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-300">{t('vehicleSettings.odometer')}</span>
                <div className="flex items-center gap-2">
                   <input className="bg-transparent border-none text-right font-bold text-white focus:ring-0 p-0 w-24" defaultValue="124500" type="number" />
                   <span className="text-xs text-slate-500 font-bold">KM</span>
                </div>
             </div>
          </div>
        </section>

        <section>
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t('vehicleSettings.primaryFuel')}</h2>
          <div className="flex gap-3">
             {['Diesel', 'Sans Plomb', 'Premium'].map(f => (
               <button 
                 key={f}
                 onClick={() => setFuel(f)}
                 className={`flex-1 py-4 rounded-2xl border font-bold text-xs transition-all ${fuel === f ? 'bg-white text-background-dark border-white' : 'bg-surface-dark border-white/5 text-slate-400'}`}
               >
                 {f === 'Diesel' ? t('station.diesel') : f === 'Sans Plomb' ? t('station.sansPlomb') : t('station.premium')}
               </button>
             ))}
          </div>
        </section>

        <button 
          onClick={onBack}
          className="w-full h-16 bg-primary text-background-dark font-black text-lg rounded-[2rem] shadow-xl shadow-primary/20 active:scale-95 transition-all mt-8"
        >
          {t('vehicleSettings.saveChanges')}
        </button>
      </div>
    </div>
  );
};