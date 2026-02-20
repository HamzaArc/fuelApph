import React from 'react';
import { Station } from '../types';

interface StationSheetProps {
  station: Station | null;
  onClose: () => void;
  onReport: () => void;
  onManualReport: () => void;
  onVoiceReport: () => void;
  onViewDetails: () => void;
}

export const StationSheet: React.FC<StationSheetProps> = ({ 
  station, 
  onClose, 
  onReport, 
  onManualReport, 
  onVoiceReport,
  onViewDetails
}) => {
  if (!station) return null;

  return (
    <div className="absolute inset-0 z-[1100] pointer-events-none flex flex-col justify-end">
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-auto"
        onClick={onClose}
      />
      
      <div className="relative bg-surface-darker/98 backdrop-blur-2xl border-t border-white/10 rounded-t-[3.5rem] w-full max-w-md mx-auto pointer-events-auto shadow-[0_-20px_50px_rgba(0,0,0,0.5)] px-6 pb-24 pt-4 animate-slide-up">
        {/* Magic Handle */}
        <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" />

        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4 flex-1 cursor-pointer group" onClick={onViewDetails}>
            <div className="size-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center p-3 shadow-inner group-hover:border-primary/50 transition-colors">
              <div className="size-full rounded-lg bg-slate-500/30 flex items-center justify-center text-white font-black text-xs uppercase">
                {station.brand.substring(0,2)}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-black text-white leading-none mb-1.5 group-hover:text-primary transition-colors">{station.name}</h2>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <span className="text-primary">{station.distance}</span>
                <span className="text-slate-600">•</span>
                <span className="text-blue-400">Open Now</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 underline">Tap for Details</span>
              </div>
            </div>
          </div>
          <button className="size-10 rounded-full hover:bg-white/5 flex items-center justify-center text-slate-500">
            <span className="material-symbols-outlined text-[24px]">favorite</span>
          </button>
        </div>

        {/* Improved Price Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-dark/60 border border-white/5 rounded-3xl p-5 flex flex-col relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 size-16 bg-primary/5 rounded-full blur-2xl transition-all group-hover:bg-primary/10"></div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1.5 text-left">Diesel</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-white tracking-tighter">{station.prices.Diesel}</span>
              <span className="text-xs text-slate-500 font-black">DH</span>
            </div>
          </div>
          <div className="bg-surface-dark/60 border border-white/5 rounded-3xl p-5 flex flex-col relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 size-16 bg-blue-500/5 rounded-full blur-2xl transition-all group-hover:bg-blue-500/10"></div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1.5 text-left">Sans Plomb</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-white tracking-tighter">{station.prices['Sans Plomb']}</span>
              <span className="text-xs text-slate-500 font-black">DH</span>
            </div>
          </div>
        </div>

        {/* Reporting Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1 mb-1">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Report Prices</p>
            <div className="flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
              <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              <span className="text-[9px] font-black text-primary">+50 PTS</span>
            </div>
          </div>

          {/* Primary Action: Scan */}
          <button 
            onClick={onReport}
            className="w-full h-16 bg-primary hover:bg-blue-400 text-background-dark font-black text-sm rounded-2xl shadow-lg flex items-center justify-center gap-4 transition-all active:scale-[0.97] group relative overflow-hidden uppercase tracking-widest"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <span className="material-symbols-outlined text-2xl">center_focus_strong</span>
            <span>Scan Station Price</span>
          </button>

          {/* Secondary Actions: Voice & Manual */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onVoiceReport}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all rounded-2xl p-4 active:scale-95"
            >
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
              <span className="font-black text-[10px] uppercase tracking-widest">Voice</span>
            </button>
            <button 
              onClick={onManualReport}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all rounded-2xl p-4 active:scale-95"
            >
              <span className="material-symbols-outlined text-slate-400">edit</span>
              <span className="font-black text-[10px] uppercase tracking-widest">Manual</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};