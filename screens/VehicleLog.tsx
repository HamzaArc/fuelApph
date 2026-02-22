import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const VehicleLog: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col h-full bg-background-dark animate-fadeIn">
      <header className="flex items-center justify-between p-4 pt-12 z-20">
        <button onClick={onBack} className="size-11 rounded-2xl bg-surface-dark border border-white/5 flex items-center justify-center text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black">{t('vehicleLog.title')}</h1>
        <button className="size-11 rounded-2xl bg-surface-dark border border-white/5 flex items-center justify-center text-slate-400">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 pb-32">
        {/* Action Button */}
        <button className="w-full h-20 bg-primary hover:bg-primary-dark text-background-dark rounded-[2rem] shadow-xl shadow-primary/20 flex items-center justify-between px-8 transition-all active:scale-[0.98]">
           <div className="flex items-center gap-4">
             <div className="size-11 rounded-xl bg-background-dark/10 flex items-center justify-center">
               <span className="material-symbols-outlined text-3xl font-black">add_circle</span>
             </div>
             <span className="text-xl font-black">{t('vehicleLog.newLog')}</span>
           </div>
           <span className="material-symbols-outlined text-3xl">chevron_right</span>
        </button>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
           <div className="p-6 rounded-[2.5rem] bg-surface-dark border border-white/5 text-left">
              <span className="material-symbols-outlined text-primary mb-3">local_gas_station</span>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('vehicleLog.avgUsage')}</p>
              <p className="text-2xl font-black text-white leading-none">5.8<span className="text-[10px] ml-1 opacity-50">L/100km</span></p>
              <div className="inline-flex items-center gap-1 text-[9px] font-black text-blue-400 mt-3">
                 <span className="material-symbols-outlined text-[12px]">trending_down</span>
                 2.1% {t('vehicleLog.lower')}
              </div>
           </div>
           <div className="p-6 rounded-[2.5rem] bg-surface-dark border border-white/5 text-left">
              <span className="material-symbols-outlined text-primary mb-3">payments</span>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('vehicleLog.totalCost')}</p>
              <p className="text-2xl font-black text-white leading-none">1,240<span className="text-[10px] ml-1 opacity-50">DH</span></p>
              <p className="text-[9px] font-black text-slate-500 mt-3 italic">{t('vehicleLog.last30Days')}</p>
           </div>
        </div>

        {/* SVG Chart Placeholder */}
        <div className="p-6 rounded-[2.5rem] bg-surface-dark border border-white/5">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-white">{t('vehicleLog.efficiencyTrend')}</h3>
              <span className="text-[10px] font-black text-primary uppercase">{t('vehicleLog.sixMonths')}</span>
           </div>
           <div className="h-40 w-full relative">
              <svg viewBox="0 0 350 150" className="size-full">
                <defs>
                   <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                   </linearGradient>
                </defs>
                <path d="M0,110 C50,110 80,40 120,60 C160,80 200,30 250,50 C300,70 350,20 350,20 L350,150 L0,150 Z" fill="url(#lineGrad)" />
                <path d="M0,110 C50,110 80,40 120,60 C160,80 200,30 250,50 C300,70 350,20 350,20" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
              </svg>
           </div>
           <div className="flex justify-between mt-4 px-2 text-[10px] font-black text-slate-600 uppercase">
              <span>{t('vehicleLog.months.may')}</span><span>{t('vehicleLog.months.aug')}</span><span>{t('vehicleLog.months.oct')}</span>
           </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
           <h3 className="font-black text-white px-2">{t('vehicleLog.recentLogs')}</h3>
           <LogItem station="Afriquia" date="Oct 24, 2024" cost={450} volume={32.5} />
           <LogItem station="Shell Agdal" date="Oct 12, 2024" cost={520} volume={38.1} />
        </div>
      </div>
    </div>
  );
};

const LogItem: React.FC<{ station: string; date: string; cost: number; volume: number }> = ({ station, date, cost, volume }) => (
  <div className="flex items-center justify-between p-5 rounded-3xl bg-surface-dark/40 border border-white/5 active:scale-[0.98] transition-all">
    <div className="flex items-center gap-4">
      <div className="size-11 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500">
        <span className="material-symbols-outlined">water_drop</span>
      </div>
      <div>
        <p className="font-black text-white text-sm">{station}</p>
        <p className="text-[10px] text-slate-500 font-bold uppercase">{date}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-black text-white text-sm">{cost} DH</p>
      <p className="text-[10px] text-slate-500 font-bold">{volume}L</p>
    </div>
  </div>
);