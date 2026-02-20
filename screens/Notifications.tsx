
import React from 'react';

export const Notifications: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-background-dark animate-fadeIn">
      <header className="flex items-center justify-between p-4 pt-12 z-20">
        <button onClick={onBack} className="size-11 rounded-2xl bg-surface-dark border border-white/5 flex items-center justify-center text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black">Activity</h1>
        <button className="text-primary font-black text-xs uppercase tracking-widest">Mark All</button>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
        <section>
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Today</h2>
          <div className="space-y-3">
            <NotifItem 
              type="price" 
              title="Price Drop Alert" 
              msg="Shell prices dropped -0.50 MAD near Casablanca center." 
              time="2m ago" 
              unread 
            />
            <NotifItem 
              type="reward" 
              title="Report Verified!" 
              msg="Your submission for Afriquia was verified. You earned +50 points." 
              time="1h ago" 
            />
          </div>
        </section>

        <section>
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Yesterday</h2>
          <div className="space-y-3">
             <NotifItem 
              type="system" 
              title="Rank Up!" 
              msg="You entered the top 100 reporters in Rabat. Keep going!" 
              time="1d ago" 
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const NotifItem: React.FC<{ type: 'price' | 'reward' | 'system'; title: string; msg: string; time: string; unread?: boolean }> = ({ type, title, msg, time, unread }) => (
  <div className={`p-5 rounded-3xl border transition-all flex gap-4 ${unread ? 'bg-white/5 border-primary/20' : 'bg-surface-dark/40 border-white/5 opacity-80'}`}>
    <div className={`size-12 shrink-0 rounded-2xl flex items-center justify-center ${type === 'price' ? 'bg-red-500/10 text-red-500' : type === 'reward' ? 'bg-primary/10 text-primary' : 'bg-blue-500/10 text-blue-500'}`}>
       <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
         {type === 'price' ? 'local_gas_station' : type === 'reward' ? 'verified' : 'leaderboard'}
       </span>
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-black text-white text-sm">{title}</h3>
        <span className="text-[9px] font-black text-slate-600 uppercase">{time}</span>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed font-medium">{msg}</p>
    </div>
    {unread && <div className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)] mt-1" />}
  </div>
);
