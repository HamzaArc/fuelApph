
import React, { useState } from 'react';

interface SearchScreenProps {
  onBack: () => void;
  onApplyFilters: (filters: any) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onBack, onApplyFilters }) => {
  const [selectedFuel, setSelectedFuel] = useState<'Diesel' | 'Sans Plomb'>('Diesel');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const brands = [
    { id: 'Afriquia', label: 'Afriquia', code: 'AF', color: 'bg-blue-600' },
    { id: 'Shell', label: 'Shell', code: 'SH', color: 'bg-yellow-400 text-black' },
    { id: 'TotalEnergies', label: 'Total', code: 'TE', color: 'bg-orange-500' },
    { id: 'Winxo', label: 'Winxo', code: 'WX', color: 'bg-purple-600' },
  ];

  const amenities = [
    { id: 'Mosque', label: 'Mosque', icon: 'mosque' },
    { id: 'Café', label: 'Café', icon: 'local_cafe' },
    { id: 'ATM', label: 'ATM', icon: 'atm' },
    { id: 'Car Wash', label: 'Car Wash', icon: 'local_car_wash' },
    { id: 'EV Charge', label: 'EV Charge', icon: 'ev_charger' },
  ];

  const cities = [
    { name: 'Casablanca', stations: 142, img: 'https://picsum.photos/seed/casa/400/300' },
    { name: 'Rabat', stations: 89, img: 'https://picsum.photos/seed/rabat/400/300' },
    { name: 'Marrakech', stations: 115, img: 'https://picsum.photos/seed/marrakech/800/400' },
  ];

  const toggleBrand = (id: string) => {
    setSelectedBrands(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full bg-background-dark animate-fadeIn overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-12 shrink-0">
        <button onClick={onBack} className="text-white p-2 rounded-full hover:bg-white/5">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-white text-xl font-black tracking-tight">Find Fuel</h1>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-4 flex items-center text-primary">
            <span className="material-symbols-outlined text-xl">search</span>
          </div>
          <input 
            type="text" 
            placeholder="Search station or city..." 
            className="w-full bg-surface-dark border-none rounded-2xl py-4 pl-12 pr-12 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-primary/50"
          />
          <button className="absolute inset-y-0 right-4 flex items-center text-primary">
            <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar mb-8">
          {[
            { id: 'cheapest', label: 'Cheapest', icon: 'payments' },
            { id: 'nearest', label: 'Nearest', icon: 'near_me' },
            { id: 'rewards', label: 'My Rewards', icon: 'stars' },
          ].map((f, i) => (
            <button 
              key={f.id}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all ${
                i === 0 ? 'bg-primary border-primary text-background-dark shadow-lg shadow-primary/20' : 'bg-surface-dark border-white/5 text-slate-400'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>

        {/* Recent Searches */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-black text-lg">Recent Searches</h2>
            <button className="text-primary text-xs font-bold">Clear</button>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Station Shell - Maarif', meta: 'Casablanca • 2.4 km away' },
              { name: 'TotalEnergies Agdal', meta: 'Rabat • 12 km away' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between bg-surface-dark/40 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="size-10 bg-white/5 rounded-full flex items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined text-xl">schedule</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{s.name}</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{s.meta}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-600 text-lg">north_east</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Cities */}
        <div className="mb-10">
          <h2 className="text-white font-black text-lg mb-4">Popular Cities</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {cities.slice(0, 2).map((city) => (
              <div key={city.name} className="relative h-32 rounded-3xl overflow-hidden group">
                <img src={city.img} alt={city.name} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-black text-xl leading-none">{city.name}</p>
                  <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">local_gas_station</span>
                    {city.stations} Stations
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative h-32 rounded-3xl overflow-hidden group">
            <img src={cities[2].img} alt={cities[2].name} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-white font-black text-xl leading-none">{cities[2].name}</p>
              <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">local_gas_station</span>
                {cities[2].stations} Stations
              </p>
            </div>
          </div>
        </div>

        {/* Filter by Brand */}
        <div className="mb-10">
          <h2 className="text-white font-black text-lg mb-4">Filter by Brand</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {brands.map((brand) => (
              <div key={brand.id} className="flex flex-col items-center gap-2">
                <button 
                  onClick={() => toggleBrand(brand.id)}
                  className={`size-16 rounded-3xl flex items-center justify-center text-sm font-black transition-all border-2 ${
                    selectedBrands.includes(brand.id) ? 'border-primary ring-4 ring-primary/10' : 'border-white/5'
                  } ${brand.color}`}
                >
                  {brand.code}
                </button>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{brand.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-10">
          <h2 className="text-white font-black text-lg mb-4">Amenities</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="flex flex-col items-center gap-2">
                <button 
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`size-14 rounded-2xl flex items-center justify-center transition-all border ${
                    selectedAmenities.includes(amenity.id) ? 'bg-primary/20 border-primary text-primary' : 'bg-surface-dark border-white/5 text-slate-500'
                  }`}
                >
                  <span className="material-symbols-outlined">{amenity.icon}</span>
                </button>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fuel Type */}
        <div className="mb-10">
          <h2 className="text-white font-black text-lg mb-4">Fuel Type</h2>
          <div className="flex bg-surface-dark p-1.5 rounded-2xl border border-white/5">
            {(['Diesel', 'Sans Plomb'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedFuel(type)}
                className={`flex-1 py-4 rounded-xl text-sm font-black transition-all ${
                  selectedFuel === type ? 'bg-primary text-background-dark shadow-lg' : 'text-slate-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Filters Button */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none px-6">
        <button 
          onClick={() => onApplyFilters({ selectedFuel, selectedBrands, selectedAmenities })}
          className="pointer-events-auto bg-primary text-background-dark font-black px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(59,130,246,0.3)] flex items-center gap-2 active:scale-95 transition-all text-xs uppercase tracking-widest border border-white/20"
        >
          <span className="material-symbols-outlined text-lg">filter_alt</span>
          Apply Filters
        </button>
      </div>
    </div>
  );
};
