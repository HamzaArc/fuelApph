
import React, { useState } from 'react';
import { MOCK_USER } from '../constants';
import { Leaderboard } from './Leaderboard';
import { Referrals } from './Referrals';
import { VehicleLog } from './VehicleLog';
import { Notifications } from './Notifications';
import { Badges } from './Badges';
import { VehicleSettings } from './VehicleSettings';
import { PaymentMethods } from './PaymentMethods';
import { SecuritySettings } from './SecuritySettings';
import { HelpCenter } from './HelpCenter';

type ProfileSubView = 'main' | 'leaderboard' | 'referrals' | 'logs' | 'notifications' | 'badges' | 'vehicle' | 'payment' | 'security' | 'help';

interface ProfileProps {
  onSignOut: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onSignOut }) => {
  const [subView, setSubView] = useState<ProfileSubView>('main');

  const renderContent = () => {
    switch (subView) {
      case 'leaderboard': return <Leaderboard onBack={() => setSubView('main')} />;
      case 'referrals': return <Referrals onBack={() => setSubView('main')} />;
      case 'logs': return <VehicleLog onBack={() => setSubView('main')} />;
      case 'notifications': return <Notifications onBack={() => setSubView('main')} />;
      case 'badges': return <Badges onBack={() => setSubView('main')} />;
      case 'vehicle': return <VehicleSettings onBack={() => setSubView('main')} />;
      case 'payment': return <PaymentMethods onBack={() => setSubView('main')} />;
      case 'security': return <SecuritySettings onBack={() => setSubView('main')} />;
      case 'help': return <HelpCenter onBack={() => setSubView('main')} />;
      default: return (
        <div className="animate-fadeIn pb-32">
          {/* Header & Level Progress */}
          <div className="flex flex-col items-center pt-12 pb-10 px-6 bg-gradient-to-b from-surface-dark/40 to-background-dark relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-primary/5 blur-[120px] pointer-events-none" />
            
            <button 
              onClick={() => setSubView('notifications')}
              className="absolute right-6 top-12 size-11 rounded-2xl bg-surface-dark border border-white/5 flex items-center justify-center text-slate-400 relative"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-surface-dark" />
            </button>

            <div className="relative mb-6">
              <div className="size-32 rounded-full border-4 border-primary/20 p-1.5 relative">
                <svg className="absolute inset-0 size-full -rotate-90">
                  <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                  <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="376" strokeDashoffset={376 * (1 - 0.78)} className="text-primary transition-all duration-1000" />
                </svg>
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD7lWc3Zbxpl_SpBz_FS6unVna7LApC1zxm1c8LRcxEkXE8Vd8EEqppAiYS65qSmA6jFUEEfUkVRIGBPaJN8IMa9BKGgQf-9efmHKa2iExtZiDIlQpCcI6kOQcltPLVg-mXBlGKsHa-OblN_PgsvUe_eKsU5bZkdWupbeaqq1_GhWTiSArXz3Wo5sApCd95RtVtv9YnHbqom_ShfZ0GuRidfWboRCORUcz2YC2B_8JX7jasaVX6VuKqF7XvW2a3R4g3_gwZsGYDgxY" 
                  alt="Profile" 
                  className="size-full rounded-full object-cover relative z-10" 
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-background-dark font-black px-3 py-1 rounded-full border-4 border-background-dark shadow-xl text-xs z-20">
                LVL {MOCK_USER.level}
              </div>
            </div>

            <h1 className="text-3xl font-black text-white mb-1 tracking-tight">{MOCK_USER.name}</h1>
            <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-8">Expert Tracker • Top 1% in Rabat</p>

            <div className="w-full grid grid-cols-3 gap-0.5 rounded-3xl overflow-hidden bg-white/5 border border-white/5 shadow-2xl backdrop-blur-md">
              <div className="flex flex-col items-center py-4 bg-surface-dark/40">
                <span className="text-[9px] font-black text-slate-500 uppercase mb-1">Savings</span>
                <span className="text-lg font-black text-white">{MOCK_USER.savings}<span className="text-[10px] font-bold text-slate-500 ml-0.5">DH</span></span>
              </div>
              <div className="flex flex-col items-center py-4 bg-surface-dark/40 border-x border-white/5">
                <span className="text-[9px] font-black text-slate-500 uppercase mb-1">Reports</span>
                <span className="text-lg font-black text-white">{MOCK_USER.reportsCount}</span>
              </div>
              <div className="flex flex-col items-center py-4 bg-surface-dark/40">
                <span className="text-[9px] font-black text-slate-500 uppercase mb-1">Rank</span>
                <span className="text-lg font-black text-primary">#{MOCK_USER.globalRank}</span>
              </div>
            </div>
          </div>

          <div className="px-6 grid grid-cols-2 gap-4 -mt-4 relative z-10">
             <MenuButton 
               icon="leaderboard" 
               label="Leaderboard" 
               desc="Check your rank" 
               color="text-primary" 
               onClick={() => setSubView('leaderboard')}
             />
             <MenuButton 
               icon="group_add" 
               label="Referrals" 
               desc="Earn 100 pts" 
               color="text-fs-blue" 
               onClick={() => setSubView('referrals')}
             />
             <MenuButton 
               icon="book_2" 
               label="Fuel Logs" 
               desc="Track efficiency" 
               color="text-accent-gold" 
               onClick={() => setSubView('logs')}
             />
             <MenuButton 
               icon="military_tech" 
               label="Badges" 
               desc="12/45 Unlocked" 
               color="text-orange-500" 
               onClick={() => setSubView('badges')}
             />
          </div>

          <div className="mt-8 px-6 space-y-3">
             <ListButton icon="directions_car" label="Vehicle Settings" onClick={() => setSubView('vehicle')} />
             <ListButton icon="payments" label="Payment Methods" onClick={() => setSubView('payment')} />
             <ListButton icon="security" label="Account Security" onClick={() => setSubView('security')} />
             <ListButton icon="help" label="Help Center" onClick={() => setSubView('help')} />
             <button 
               onClick={onSignOut}
               className="w-full flex items-center justify-between p-5 rounded-2xl bg-red-500/5 text-red-500 font-bold border border-red-500/10 active:scale-95 transition-all mt-4"
             >
                <div className="flex items-center gap-4">
                   <span className="material-symbols-outlined">logout</span>
                   <span>Sign Out</span>
                </div>
             </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-white overflow-y-auto no-scrollbar">
      {renderContent()}
    </div>
  );
};

const MenuButton: React.FC<{ icon: string; label: string; desc: string; color: string; onClick: () => void }> = ({ icon, label, desc, color, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-start p-5 rounded-[2rem] bg-surface-dark border border-white/5 shadow-xl active:scale-95 transition-all text-left">
    <div className={`size-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 ${color}`}>
      <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
    </div>
    <p className="font-black text-white text-sm">{label}</p>
    <p className="text-[10px] font-bold text-slate-500 tracking-tight">{desc}</p>
  </button>
);

const ListButton: React.FC<{ icon: string; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-5 rounded-2xl bg-surface-dark border border-white/5 active:scale-[0.98] transition-all text-left"
  >
    <div className="flex items-center gap-4">
      <span className="material-symbols-outlined text-slate-400">{icon}</span>
      <span className="font-bold text-sm text-slate-200">{label}</span>
    </div>
    <span className="material-symbols-outlined text-slate-600">chevron_right</span>
  </button>
);
