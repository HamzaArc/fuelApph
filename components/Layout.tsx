
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  hideNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, hideNav = false }) => {
  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto relative bg-background-dark overflow-hidden">
      <main className="flex-1 overflow-y-auto no-scrollbar relative">
        {children}
      </main>

      {!hideNav && (
        <nav className="flex justify-around items-center h-20 bg-surface-darker/95 backdrop-blur-md border-t border-white/5 pb-6 pt-2 px-4 z-50">
          <button 
            onClick={() => onTabChange('map')}
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${activeTab === 'map' ? 'text-primary' : 'text-slate-500'}`}
          >
            <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: activeTab === 'map' ? "'FILL' 1" : "" }}>map</span>
            <span className="text-[10px] font-bold">Explore</span>
          </button>

          <button 
            onClick={() => onTabChange('search')}
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${activeTab === 'search' ? 'text-primary' : 'text-slate-500'}`}
          >
            <span className="material-symbols-outlined text-[26px]">search</span>
            <span className="text-[10px] font-bold">Search</span>
          </button>

          <button 
            onClick={() => onTabChange('scan')}
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${activeTab === 'scan' ? 'text-primary' : 'text-slate-500'}`}
          >
            <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: activeTab === 'scan' ? "'FILL' 1" : "" }}>add_a_photo</span>
            <span className="text-[10px] font-bold">Scan</span>
          </button>

          <button 
            onClick={() => onTabChange('rewards')}
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${activeTab === 'rewards' ? 'text-primary' : 'text-slate-500'}`}
          >
            <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: activeTab === 'rewards' ? "'FILL' 1" : "" }}>stars</span>
            <span className="text-[10px] font-bold">Rewards</span>
          </button>

          <button 
            onClick={() => onTabChange('profile')}
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${activeTab === 'profile' ? 'text-primary' : 'text-slate-500'}`}
          >
            <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: activeTab === 'profile' ? "'FILL' 1" : "" }}>person</span>
            <span className="text-[10px] font-bold">Profile</span>
          </button>
        </nav>
      )}
    </div>
  );
};
