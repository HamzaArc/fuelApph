
import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { MOCK_STATIONS } from '../constants';
import { FuelType, Station } from '../types';

interface MapExplorerProps {
  onStationSelect: (station: Station) => void;
  hideBottomCard?: boolean;
  onViewList?: () => void;
}

export const MapExplorer: React.FC<MapExplorerProps> = ({ onStationSelect, hideBottomCard, onViewList }) => {
  const [activeFuel, setActiveFuel] = useState<FuelType>('Diesel');
  const [showDetectionToast, setShowDetectionToast] = useState(false);
  const [detectedStation, setDetectedStation] = useState<Station | null>(null);
  const [isBottomCardExpanded, setIsBottomCardExpanded] = useState(false);

  const fuelTypes: { id: FuelType; label: string }[] = [
    { id: 'Diesel', label: 'Diesel' },
    { id: 'Sans Plomb', label: 'Sans Plomb' },
    { id: 'Premium', label: 'Premium' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDetectedStation(MOCK_STATIONS[1]); // Afriquia Maarif
      setShowDetectionToast(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const cheapestNearby = useMemo(() => {
    return [...MOCK_STATIONS].sort((a, b) => (a.prices[activeFuel] || 99) - (b.prices[activeFuel] || 99))[0];
  }, [activeFuel]);

  const createCustomIcon = (station: Station) => {
    const price = station.prices[activeFuel];
    if (!price) return null;

    const allPrices = MOCK_STATIONS.map(s => s.prices[activeFuel]).filter(Boolean) as number[];
    const min = Math.min(...allPrices);
    const isCheapest = price === min;

    const brandColors: Record<string, string> = {
      'Afriquia': '#1A6B3C',
      'Shell': '#FBDB0C',
      'TotalEnergies': '#ED1C24',
      'Petrom': '#1A5276',
      'Ola Energy': '#003399',
      'Winxo': '#913bb1'
    };

    const iconHTML = renderToStaticMarkup(
      <div className="relative flex flex-col items-center">
        <div className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-2xl shadow-2xl border transition-all duration-300
          ${isCheapest 
            ? 'bg-primary border-white text-background-dark scale-110 z-50 ring-4 ring-primary/20' 
            : 'bg-surface-dark border-white/10 text-white z-10'}
        `}>
          <div 
            className="w-4 h-4 rounded-lg flex items-center justify-center text-[7px] font-black shadow-sm"
            style={{ backgroundColor: brandColors[station.brand] || '#64748b', color: station.brand === 'Shell' ? '#000' : '#fff' }}
          >
            {station.brand.charAt(0)}
          </div>
          <span className="text-[13px] font-black tracking-tighter">
            {price.toFixed(2)}
          </span>
        </div>
        <div className={`
          w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] -mt-[1px]
          ${isCheapest ? 'border-t-primary' : 'border-t-surface-dark'}
        `} />
      </div>
    );

    return L.divIcon({
      html: iconHTML,
      className: 'custom-modern-pin',
      iconSize: [70, 40],
      iconAnchor: [35, 40],
    });
  };

  return (
    <div className="relative h-full w-full bg-background-dark select-none overflow-hidden">
      
      {/* --- TOP HUD LAYER --- */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 pt-6 space-y-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex-1 h-12 bg-surface-darker/90 backdrop-blur-xl rounded-2xl flex items-center px-4 gap-2 shadow-2xl border border-white/5 ring-1 ring-white/10">
            <span className="material-symbols-outlined text-primary text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Search station..." 
              className="bg-transparent border-none outline-none flex-1 text-xs font-bold text-white placeholder:text-slate-500 focus:ring-0"
            />
            <div className="flex items-center gap-1">
              <button 
                onClick={onViewList}
                className="size-8 bg-white/5 text-primary rounded-xl flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
              >
                <span className="material-symbols-outlined text-lg">list</span>
              </button>
              <button className="size-8 bg-white/5 text-slate-300 rounded-xl flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all">
                <span className="material-symbols-outlined text-lg">tune</span>
              </button>
            </div>
          </div>
          <button className="size-12 bg-surface-darker/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/5 flex items-center justify-center active:scale-90 transition-all">
            <div className="size-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black text-[10px] border border-primary/20">
              KB
            </div>
          </button>
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 pointer-events-auto">
          {fuelTypes.map(ft => (
            <button
              key={ft.id}
              onClick={() => setActiveFuel(ft.id)}
              className={`
                flex-shrink-0 h-8 px-5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 border
                ${activeFuel === ft.id 
                  ? 'bg-primary text-background-dark border-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                  : 'bg-surface-darker/80 backdrop-blur-md text-slate-400 border-white/5'}
              `}
            >
              {ft.label}
            </button>
          ))}
        </div>

        {showDetectionToast && detectedStation && !hideBottomCard && (
          <div className="pointer-events-auto animate-slide-up">
            <div className="bg-primary/95 backdrop-blur-md text-background-dark p-3 rounded-2xl shadow-2xl flex items-center justify-between ring-1 ring-white/20">
              <div className="flex items-center gap-3">
                <div className="size-9 bg-background-dark rounded-xl flex items-center justify-center text-primary font-black text-xs">
                  {detectedStation.brand.charAt(0)}
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.1em] opacity-70">Near You Now</p>
                  <p className="text-xs font-bold truncate max-w-[140px]">{detectedStation.name}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowDetectionToast(false)}
                  className="px-4 h-9 bg-background-dark text-primary rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                >
                  Report
                </button>
                <button 
                  onClick={() => setShowDetectionToast(false)}
                  className="size-9 bg-background-dark/10 rounded-xl flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`absolute right-4 z-[1000] flex flex-col gap-3 pointer-events-auto transition-all duration-300 ${hideBottomCard ? 'top-40' : 'top-[50%] -translate-y-1/2'}`}>
        <button className="size-12 bg-surface-darker/90 backdrop-blur-xl rounded-[1.25rem] shadow-2xl flex items-center justify-center text-primary border border-white/5 active:scale-90 transition-all">
          <span className="material-symbols-outlined text-[26px]">my_location</span>
        </button>
        <button className="size-12 bg-surface-darker/90 backdrop-blur-xl rounded-[1.25rem] shadow-2xl flex items-center justify-center text-slate-300 border border-white/5 active:scale-90 transition-all">
          <span className="material-symbols-outlined text-[26px]">notifications</span>
        </button>
      </div>

      <div className="absolute inset-0 z-0">
        <MapContainer 
          key="fuelspy-map"
          center={[33.5890, -7.6310]} 
          zoom={14} 
          zoomControl={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {MOCK_STATIONS.map(station => {
            const icon = createCustomIcon(station);
            if (!icon) return null;
            return (
              <Marker 
                key={station.id} 
                position={[station.location.lat, station.location.lng]} 
                icon={icon}
                eventHandlers={{ click: () => onStationSelect(station) }}
              />
            );
          })}
        </MapContainer>
      </div>

      {!hideBottomCard && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000] pointer-events-none">
          <div className={`
            bg-surface-darker/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] 
            border border-white/10 pointer-events-auto transition-all duration-500 ease-in-out overflow-hidden
            ${isBottomCardExpanded ? 'max-h-[320px]' : 'max-h-[92px]'}
          `}>
            <button 
              onClick={() => setIsBottomCardExpanded(!isBottomCardExpanded)}
              className="w-full h-6 flex items-center justify-center"
            >
              <div className="w-10 h-1 bg-white/10 rounded-full" />
            </button>

            <div className="px-6 pb-6 pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-primary/10 rounded-[1.25rem] flex items-center justify-center text-primary border border-primary/10">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Cheapest Nearby</p>
                    <h3 className="text-base font-black text-white truncate max-w-[160px] leading-tight mt-0.5">{cheapestNearby.name}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-primary tracking-tighter leading-none">{cheapestNearby.prices[activeFuel]?.toFixed(2)}</p>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <span className="text-[10px] font-black text-slate-500">MAD / L</span>
                  </div>
                </div>
              </div>

              {isBottomCardExpanded && (
                <div className="mt-8 space-y-6 animate-fadeIn">
                  <div className="h-px bg-white/5 w-full" />
                  <div className="flex items-center justify-around text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">near_me</span> {cheapestNearby.distance}</span>
                    <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">timer</span> 4 MINS</span>
                    <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">verified</span> 15M AGO</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 h-16 bg-primary text-background-dark rounded-2xl font-black text-sm flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-primary/10">
                      <span className="material-symbols-outlined text-[24px]">navigation</span> Start Journey
                    </button>
                    <button 
                      onClick={() => onStationSelect(cheapestNearby)}
                      className="size-16 bg-white/5 text-white rounded-2xl flex items-center justify-center active:scale-95 border border-white/5"
                    >
                      <span className="material-symbols-outlined text-[24px]">info</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
