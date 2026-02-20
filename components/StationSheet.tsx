import React, { useState, useRef } from 'react';
import { Station } from '../types';

interface StationSheetProps {
  station: Station | null;
  onClose: () => void;
  onReport: () => void;
  onManualReport: () => void;
  onVoiceReport: () => void;
  onViewDetails?: () => void;
}

export const StationSheet: React.FC<StationSheetProps> = ({ 
  station, 
  onClose, 
  onReport, 
  onManualReport, 
  onVoiceReport,
  onViewDetails
}) => {
  const [oneTapSuccess, setOneTapSuccess] = useState(false);
  
  // Drag-to-dismiss state
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);

  if (!station) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    if (diff > 0) {
      setTranslateY(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (translateY > 100) {
      onClose(); // Dismiss if dragged down far enough
    }
    setTranslateY(0); // Snap back if not
  };

  const openNavigation = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=$$${station.location.lat},${station.location.lng}`, '_blank');
  };

  const handleOneTap = () => {
    setOneTapSuccess(true);
    // In production, this fires an API call to refresh the lastUpdated timestamp
    setTimeout(() => setOneTapSuccess(false), 3000);
  };

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
    <div className="absolute inset-0 z-[1100] pointer-events-none flex flex-col justify-end">
      {/* Darkened Backdrop (Click to close) */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-auto transition-opacity animate-fadeIn"
        onClick={onClose}
      />
      
      {/* The Draggable Sheet */}
      <div 
        className="relative bg-surface-darker/98 backdrop-blur-2xl border-t border-white/10 rounded-t-[32px] w-full max-w-md mx-auto pointer-events-auto shadow-[0_-8px_30px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden max-h-[90vh]"
        style={{ 
          transform: `translateY(${translateY}px)`, 
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)' 
        }}
      >
        {/* Drag Handle Area */}
        <div 
          className="w-full flex justify-center pt-4 pb-2 active:bg-white/5 cursor-grab"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-8">
          
          {/* Header Info */}
          <div className="flex items-start justify-between mt-2 mb-6">
            <div className="flex gap-4 cursor-pointer group" onClick={onViewDetails}>
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center p-2 shadow-inner group-hover:border-primary/50 transition-colors">
                <span className="text-slate-900 font-bold text-lg uppercase">{station.brand.substring(0,2)}</span>
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-white tracking-tight leading-none mb-1 group-hover:text-primary transition-colors">{station.name}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[16px]">near_me</span> {station.distance}
                  </span>
                  <span>•</span>
                  <span className="text-blue-400">Open Now</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={openNavigation} className="px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20">
                <span className="material-symbols-outlined text-lg">navigation</span>
                <span className="text-xs font-bold uppercase tracking-widest">Drive</span>
              </button>
            </div>
          </div>

          {/* Price Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-surface-dark/60 border border-white/5 rounded-2xl p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-50">
                  <span className="material-symbols-outlined text-white/20 text-4xl -rotate-12">local_gas_station</span>
              </div>
              <p className="text-gray-400 text-sm font-medium mb-1 text-left uppercase">Diesel</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white tracking-tight">{station.prices.Diesel}</span>
                <span className="text-sm font-medium text-gray-400">DH</span>
              </div>
            </div>
            <div className="bg-surface-dark/60 border border-white/5 rounded-2xl p-4 relative overflow-hidden group">
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

          {/* Verification Status */}
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            <span className="text-xs text-slate-400 font-medium">Verified by <span className="text-white font-bold">{station.verifiedBy || 'Community'}</span> • {station.lastUpdated}</span>
          </div>

          {/* 1-Tap Verify Button */}
          {!oneTapSuccess ? (
            <button onClick={handleOneTap} className="w-full relative group flex items-center justify-center gap-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 py-4 rounded-2xl mb-8 shadow-[0_0_20px_rgba(34,197,94,0.05)] transition-all active:scale-95">
              <span className="text-2xl animate-bounce-slight">👍</span>
              <span className="font-black text-sm uppercase tracking-widest">Confirm Current Prices</span>
              <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-green-500 text-background-dark text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg">+10 PTS</div>
            </button>
          ) : (
            <div className="w-full flex items-center justify-center gap-2 bg-green-500 text-background-dark py-4 rounded-2xl mb-8 shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-fadeIn duration-300">
              <span className="material-symbols-outlined font-black">check_circle</span>
              <span className="font-black text-sm uppercase tracking-widest">Verified! +10 Points</span>
            </div>
          )}

          {/* Reporting Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white">Report Change</h3>
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

            {/* Voice & Manual */}
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
        </div>
      </div>
    </div>
  );
};