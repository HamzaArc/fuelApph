import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { MOCK_STATIONS } from '../constants';
import { FuelType, Station } from '../types';

interface MapExplorerProps {
  onStationSelect: (station: Station) => void;
  hideBottomCard?: boolean;
  onViewList?: () => void;
  onAddStationInitiated: (location: { lat: number, lng: number }) => void;
}

const CenterTracker: React.FC<{ onCenterChange: (center: L.LatLng) => void }> = ({ onCenterChange }) => {
  const map = useMap();
  useEffect(() => {
    const handleMoveEnd = () => onCenterChange(map.getCenter());
    map.on('moveend', handleMoveEnd);
    return () => { map.off('moveend', handleMoveEnd); };
  }, [map, onCenterChange]);
  return null;
};

export const MapExplorer: React.FC<MapExplorerProps> = ({ onStationSelect, hideBottomCard, onViewList, onAddStationInitiated }) => {
  const [activeFuel, setActiveFuel] = useState<FuelType>('Diesel');
  const [isBottomCardExpanded, setIsBottomCardExpanded] = useState(false);
  const [isDroppingPin, setIsDroppingPin] = useState(false);
  const [mapCenter, setMapCenter] = useState<L.LatLng>(new L.LatLng(33.5890, -7.6310));
  const [touchStart, setTouchStart] = useState(0);

  const fuelTypes: { id: FuelType; label: string }[] = [
    { id: 'Diesel', label: 'Diesel' },
    { id: 'Sans Plomb', label: 'Sans Plomb' },
    { id: 'Premium', label: 'Premium' }
  ];

  const cheapestNearby = useMemo(() => {
    return [...MOCK_STATIONS].sort((a, b) => (a.prices[activeFuel] || 99) - (b.prices[activeFuel] || 99))[0];
  }, [activeFuel]);

  const openNavigation = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=$${lat},${lng}`, '_blank');
  };

  const confirmPinDrop = () => {
    setIsDroppingPin(false);
    onAddStationInitiated({ lat: mapCenter.lat, lng: mapCenter.lng });
  };

  // Swipe logic for bottom card
  const handleCardTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientY);
  const handleCardTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientY - touchStart;
    if (delta < -30) setIsBottomCardExpanded(true); // Swipe Up
    if (delta > 30) setIsBottomCardExpanded(false); // Swipe Down
  };

  const createCustomIcon = (station: Station) => {
    const price = station.prices[activeFuel];
    if (!price) return null;

    const allPrices = MOCK_STATIONS.map(s => s.prices[activeFuel]).filter(Boolean) as number[];
    const isCheapest = price === Math.min(...allPrices);

    const brandColors: Record<string, string> = {
      'Afriquia': '#1A6B3C', 'Shell': '#FBDB0C', 'TotalEnergies': '#ED1C24',
      'Petrom': '#1A5276', 'Ola Energy': '#003399', 'Winxo': '#913bb1'
    };

    const iconHTML = renderToStaticMarkup(
      <div className="relative flex flex-col items-center">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl shadow-2xl border transition-all duration-300 ${isCheapest ? 'bg-primary border-white text-background-dark scale-110 z-50 ring-4 ring-primary/20' : 'bg-surface-dark border-white/10 text-white z-10'}`}>
          <div className="w-4 h-4 rounded-lg flex items-center justify-center text-[7px] font-black shadow-sm" style={{ backgroundColor: brandColors[station.brand] || '#64748b', color: station.brand === 'Shell' ? '#000' : '#fff' }}>
            {station.brand.charAt(0)}
          </div>
          <span className="text-[13px] font-black tracking-tighter">{price.toFixed(2)}</span>
        </div>
        <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] -mt-[1px] ${isCheapest ? 'border-t-primary' : 'border-t-surface-dark'}`} />
      </div>
    );

    return L.divIcon({ html: iconHTML, className: 'custom-modern-pin', iconSize: [70, 40], iconAnchor: [35, 40] });
  };

  return (
    <div className="relative h-full w-full bg-background-dark select-none overflow-hidden">
      
      {/* Top HUD */}
      {!isDroppingPin && (
        <div className="absolute top-0 left-0 right-0 z-[1000] p-4 pt-6 space-y-2 pointer-events-none animate-fadeIn">
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="flex-1 h-12 bg-surface-darker/90 backdrop-blur-xl rounded-2xl flex items-center px-4 gap-2 shadow-2xl border border-white/5 ring-1 ring-white/10">
              <span className="material-symbols-outlined text-primary text-[20px]">search</span>
              <input type="text" placeholder="Search station..." className="bg-transparent border-none outline-none flex-1 text-xs font-bold text-white placeholder:text-slate-500 focus:ring-0" />
              <div className="flex items-center gap-1">
                <button onClick={onViewList} className="size-8 bg-white/5 text-primary rounded-xl flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all">
                  <span className="material-symbols-outlined text-lg">list</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 pointer-events-auto">
            {fuelTypes.map(ft => (
              <button key={ft.id} onClick={() => setActiveFuel(ft.id)} className={`flex-shrink-0 h-8 px-5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 border ${activeFuel === ft.id ? 'bg-primary text-background-dark border-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-surface-darker/80 backdrop-blur-md text-slate-400 border-white/5'}`}>
                {ft.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FABs */}
      {!isDroppingPin && (
        <div className={`absolute right-4 z-[1000] flex flex-col gap-3 pointer-events-auto transition-all duration-300 ${hideBottomCard ? 'top-40' : 'top-[50%] -translate-y-1/2'}`}>
          <button className="size-12 bg-surface-darker/90 backdrop-blur-xl rounded-[1.25rem] shadow-2xl flex items-center justify-center text-primary border border-white/5 active:scale-90 transition-all">
            <span className="material-symbols-outlined text-[26px]">my_location</span>
          </button>
          <button onClick={() => setIsDroppingPin(true)} className="size-12 bg-accent-gold/90 backdrop-blur-xl rounded-[1.25rem] shadow-[0_10px_30px_rgba(251,191,36,0.3)] flex items-center justify-center text-background-dark border border-accent-gold active:scale-90 transition-all">
            <span className="material-symbols-outlined text-[26px]">add_location_alt</span>
          </button>
        </div>
      )}

      {/* Map */}
      <div className="absolute inset-0 z-0">
        <MapContainer center={[33.5890, -7.6310]} zoom={14} zoomControl={false} className="h-full w-full">
          <TileLayer attribution='© CARTO' url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <CenterTracker onCenterChange={setMapCenter} />
          {!isDroppingPin && MOCK_STATIONS.map(station => {
            const icon = createCustomIcon(station);
            if (!icon) return null;
            return <Marker key={station.id} position={[station.location.lat, station.location.lng]} icon={icon} eventHandlers={{ click: () => onStationSelect(station) }} />;
          })}
        </MapContainer>
      </div>

      {/* Drop Pin Layer */}
      {isDroppingPin && (
        <div className="absolute inset-0 z-[2000] pointer-events-none flex flex-col items-center justify-center animate-fadeIn">
          <div className="bg-background-dark/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4 shadow-lg border border-white/10">
            Drag map to place pin
          </div>
          <div className="size-12 -mt-16 text-accent-gold drop-shadow-[0_10px_20px_rgba(251,191,36,0.5)] animate-bounce-slight flex items-end justify-center">
            <span className="material-symbols-outlined text-[56px]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
          </div>
          <div className="w-4 h-1.5 bg-black/40 rounded-[100%] blur-[1px] mt-1" />
          <div className="absolute bottom-8 left-6 right-6 pointer-events-auto">
            <div className="flex gap-3">
              <button onClick={() => setIsDroppingPin(false)} className="size-16 bg-surface-dark text-white rounded-[2rem] shadow-xl border border-white/10 flex items-center justify-center active:scale-95 transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
              <button onClick={confirmPinDrop} className="flex-1 h-16 bg-accent-gold text-background-dark font-black text-lg rounded-[2rem] shadow-[0_15px_30px_rgba(251,191,36,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest">
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Swipeable Bottom Card */}
      {!hideBottomCard && !isDroppingPin && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000] pointer-events-none animate-slide-up">
          <div 
            onTouchStart={handleCardTouchStart}
            onTouchEnd={handleCardTouchEnd}
            onClick={(e) => {
              if (!isBottomCardExpanded && (e.target as HTMLElement).tagName !== 'BUTTON') {
                setIsBottomCardExpanded(true);
              }
            }}
            className={`bg-surface-darker/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 pointer-events-auto transition-all duration-500 ease-in-out overflow-hidden ${isBottomCardExpanded ? 'max-h-[320px]' : 'max-h-[92px]'} cursor-pointer`}
          >
            <button onClick={() => setIsBottomCardExpanded(!isBottomCardExpanded)} className="w-full h-6 flex items-center justify-center">
              <div className="w-10 h-1 bg-white/10 rounded-full" />
            </button>
            <div className="px-6 pb-6 pt-0">
              <div className="flex items-center justify-between pointer-events-none">
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
                    <button onClick={(e) => { e.stopPropagation(); openNavigation(cheapestNearby.location.lat, cheapestNearby.location.lng); }} className="flex-1 h-16 bg-primary text-background-dark rounded-2xl font-black text-sm flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-primary/10">
                      <span className="material-symbols-outlined text-[24px]">navigation</span> Start Journey
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onStationSelect(cheapestNearby); }} className="size-16 bg-white/5 text-white rounded-2xl flex items-center justify-center active:scale-95 border border-white/5">
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