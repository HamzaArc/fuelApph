import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { MapExplorer } from './components/MapExplorer';
import { StationSheet } from './components/StationSheet';
import { ScanFlow } from './screens/ScanFlow';
import { Rewards } from './screens/Rewards';
import { Profile } from './screens/Profile';
import { ContributionSuccess } from './screens/ContributionSuccess';
import { Onboarding } from './screens/Onboarding';
import { NearbyList } from './screens/NearbyList';
import { ManualReport } from './screens/ManualReport';
import { VoiceReport } from './screens/VoiceReport';
import { SearchScreen } from './screens/SearchScreen';
import { AddStation } from './screens/AddStation';
import { Station } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [searchView, setSearchView] = useState<'filters' | 'results'>('filters');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  
  // Cleaned up view routing
  const [viewMode, setViewMode] = useState<'map' | 'list' | 'manual_report' | 'voice_report' | 'add_station'>('map');
  const [lastViewBeforeReport, setLastViewBeforeReport] = useState<'map'>('map');
  
  const [isScanning, setIsScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  
  const [isPioneerContribution, setIsPioneerContribution] = useState(false);
  const [pendingLocation, setPendingLocation] = useState<{lat: number, lng: number} | null>(null);
  const [lastContribution, setLastContribution] = useState<{station: string, fuel: string, price: number} | null>(null);

  const handleReport = () => setIsScanning(true);

  const finishContribution = (stationName: string, fuelType: string, price: number, pioneer: boolean = false) => {
    setIsScanning(false);
    setLastContribution({ station: stationName, fuel: fuelType, price });
    setIsPioneerContribution(pioneer);
    setShowSuccess(true);
    setViewMode('map');
  };

  const handleSignOut = () => {
    setHasOnboarded(false);
    setActiveTab('map');
  };

  const selectStation = (s: Station) => {
    setSelectedStation(s);
    setViewMode('map'); // Stays on map, but selectedStation triggers the full StationSheet popup
  };

  if (!hasOnboarded) return <Onboarding onComplete={() => setHasOnboarded(true)} />;
  
  if (isScanning) return <ScanFlow onCancel={() => setIsScanning(false)} onComplete={(price, type) => finishContribution(selectedStation?.name || 'Unknown', type, price, false)} />;

  if (showSuccess) {
    return (
      <ContributionSuccess 
        summary={lastContribution} 
        isPioneer={isPioneerContribution}
        onDone={() => {
          setShowSuccess(false);
          setSelectedStation(null);
        }} 
      />
    );
  }

  return (
    <Layout activeTab={activeTab} onTabChange={(tab) => {
      setActiveTab(tab);
      if (tab === 'map' && activeTab !== 'map') setViewMode('map');
      if (tab === 'search') setSearchView('filters');
    }}>
      {activeTab === 'map' && (
        <>
          {viewMode === 'map' && (
            <>
              <MapExplorer 
                hideBottomCard={!!selectedStation}
                onViewList={() => setViewMode('list')}
                onStationSelect={(s) => setSelectedStation(s)} 
                onAddStationInitiated={(loc) => {
                  setPendingLocation(loc);
                  setViewMode('add_station');
                }}
              />
              
              {/* This is now the Full Floating Details Sheet */}
              <StationSheet 
                station={selectedStation} 
                onClose={() => setSelectedStation(null)} 
                onReport={handleReport}
                onManualReport={() => {
                  setLastViewBeforeReport('map');
                  setViewMode('manual_report');
                }}
                onVoiceReport={() => {
                  setLastViewBeforeReport('map');
                  setViewMode('voice_report');
                }}
              />
            </>
          )}

          {viewMode === 'list' && (
            <NearbyList onBack={() => setViewMode('map')} onStationSelect={selectStation} />
          )}

          {viewMode === 'add_station' && (
            <AddStation 
              location={pendingLocation}
              onBack={() => setViewMode('map')}
              onComplete={(brand, price) => finishContribution(`${brand} Station`, 'Diesel', price, true)}
            />
          )}

          {viewMode === 'manual_report' && selectedStation && (
            <ManualReport station={selectedStation} onBack={() => setViewMode(lastViewBeforeReport)} onComplete={(p, t) => finishContribution(selectedStation.name, t, p, false)} />
          )}

          {viewMode === 'voice_report' && selectedStation && (
            <VoiceReport station={selectedStation} onBack={() => setViewMode(lastViewBeforeReport)} onComplete={(p, t) => finishContribution(selectedStation.name, t, p, false)} />
          )}
        </>
      )}
      
      {activeTab === 'search' && (
        searchView === 'filters' ? <SearchScreen onBack={() => setActiveTab('map')} onApplyFilters={() => setSearchView('results')} />
        : <NearbyList title="Search Results" initialSearch="" onBack={() => setSearchView('filters')} onStationSelect={selectStation} />
      )}

      {activeTab === 'rewards' && <Rewards />}
      {activeTab === 'profile' && <Profile onSignOut={handleSignOut} />}
      
      {activeTab === 'scan' && (
        <div className="h-full flex items-center justify-center p-8 text-center animate-fadeIn relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.08),transparent_70%)]" />
          <div className="relative z-10">
            <div className="size-28 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-8 relative">
               <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse-slow"></div>
               <span className="material-symbols-outlined text-6xl relative">document_scanner</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-4">Snap & Save</h2>
            <p className="text-slate-400 mb-12 max-w-xs mx-auto leading-relaxed text-lg">Report any station price board to earn rewards. Our AI handles the verification instantly.</p>
            <button 
              onClick={() => setIsScanning(true)}
              className="bg-primary text-background-dark font-black px-14 py-6 rounded-3xl shadow-2xl shadow-primary/30 active:scale-95 transition-all text-xl uppercase tracking-widest"
            >
              Start Scanning
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;