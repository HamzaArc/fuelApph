import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { AuthScreen } from './screens/AuthScreen';
import { useAuth } from './contexts/AuthContext';
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
import { useLanguage } from './i18n/LanguageContext';
import { supabase } from './lib/supabase';
import { submitPriceReport, addNewStation } from './services/stationService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [searchView, setSearchView] = useState<'filters' | 'results'>('filters');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const [viewMode, setViewMode] = useState<'map' | 'list' | 'manual_report' | 'voice_report' | 'add_station'>('map');
  const [lastViewBeforeReport, setLastViewBeforeReport] = useState<'map'>('map');

  const [isScanning, setIsScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const [isPioneerContribution, setIsPioneerContribution] = useState(false);
  const [pendingLocation, setPendingLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [lastContribution, setLastContribution] = useState<{ station: string, fuel: string, price: number } | null>(null);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [userName, setUserName] = useState('');
  const [userLevel, setUserLevel] = useState(1);
  const [stationRefreshKey, setStationRefreshKey] = useState(0);

  const { t } = useLanguage();
  const { user, isLoading } = useAuth();

  // Fetch user profile data for service calls
  useEffect(() => {
    if (user) {
      supabase.from('users').select('name, level').eq('id', user.id).single().then(({ data }) => {
        if (data) {
          setUserName(data.name || '');
          setUserLevel(data.level || 1);
        }
      });
    }
  }, [user]);

  const handleReport = () => setIsScanning(true);

  const finishContribution = async (
    stationName: string,
    fuelType: string,
    price: number,
    pioneer: boolean = false,
    stationId?: string
  ) => {
    setIsScanning(false);
    setLastContribution({ station: stationName, fuel: fuelType, price });
    setIsPioneerContribution(pioneer);

    if (user && stationId && !pioneer) {
      // Submit price report to Supabase
      const result = await submitPriceReport({
        userId: user.id,
        stationId,
        fuelType,
        price,
        reportType: 'manual',
        userName,
        userLevel,
      });
      setEarnedPoints(result.pointsEarned);
    } else if (user && pioneer && pendingLocation) {
      // Add new station to Supabase
      const result = await addNewStation({
        userId: user.id,
        userName,
        userLevel,
        brand: stationName.replace(' Station', ''),
        location: pendingLocation,
        dieselPrice: price,
      });
      setEarnedPoints(result.pointsEarned);
    } else {
      // Fallback if no user/station context
      setEarnedPoints(pioneer ? 200 : 50);
    }

    setShowSuccess(true);
    setViewMode('map');
    // Trigger station list refresh
    setStationRefreshKey(prev => prev + 1);
  };

  const handleSignOut = () => {
    setHasOnboarded(false);
    setActiveTab('map');
  };

  const selectStation = (s: Station) => {
    setSelectedStation(s);
    setViewMode('map');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-white">
        <div className="size-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  if (!hasOnboarded) return <Onboarding onComplete={() => setHasOnboarded(true)} />;

  if (isScanning) return (
    <ScanFlow
      onCancel={() => setIsScanning(false)}
      onComplete={(price, type) => finishContribution(selectedStation?.name || t('app.unknown'), type, price, false, selectedStation?.id)}
      onFallback={() => {
        setIsScanning(false);
        setLastViewBeforeReport('map');
        setViewMode('manual_report');
      }}
    />
  );

  if (showSuccess) {
    return (
      <ContributionSuccess
        summary={lastContribution}
        isPioneer={isPioneerContribution}
        earnedPoints={earnedPoints}
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
                refreshKey={stationRefreshKey}
                onViewList={() => setViewMode('list')}
                onStationSelect={(s) => setSelectedStation(s)}
                onAddStationInitiated={(loc) => {
                  setPendingLocation(loc);
                  setViewMode('add_station');
                }}
              />

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
              onComplete={(brand, price) => finishContribution(`${brand} Station`, 'Diesel', price, true, undefined)}
            />
          )}

          {viewMode === 'manual_report' && selectedStation && (
            <ManualReport station={selectedStation} onBack={() => setViewMode(lastViewBeforeReport)} onComplete={(p, t) => finishContribution(selectedStation.name, t, p, false, selectedStation.id)} />
          )}

          {viewMode === 'voice_report' && selectedStation && (
            <VoiceReport station={selectedStation} onBack={() => setViewMode(lastViewBeforeReport)} onComplete={(p, t) => finishContribution(selectedStation.name, t, p, false, selectedStation.id)} />
          )}
        </>
      )}

      {activeTab === 'search' && (
        searchView === 'filters' ? <SearchScreen onBack={() => setActiveTab('map')} onApplyFilters={() => setSearchView('results')} />
          : <NearbyList title={t('app.searchResults')} initialSearch="" onBack={() => setSearchView('filters')} onStationSelect={selectStation} />
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
            <h2 className="text-4xl font-black text-white mb-4">{t('app.snapSave')}</h2>
            <p className="text-slate-400 mb-12 max-w-xs mx-auto leading-relaxed text-lg">{t('app.snapDesc')}</p>
            <button
              onClick={() => setIsScanning(true)}
              className="bg-primary text-background-dark font-black px-14 py-6 rounded-3xl shadow-2xl shadow-primary/30 active:scale-95 transition-all text-xl uppercase tracking-widest"
            >
              {t('app.startScanning')}
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;