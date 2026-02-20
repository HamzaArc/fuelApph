
import React from 'react';
import { MOCK_USER } from '../constants';

export const Leaderboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const restOfRankings = [
    { id: 'u4', name: 'Amina L.', level: 9, points: 2950, city: 'Casablanca', img: 'https://i.pravatar.cc/100?u=4' },
    { id: 'u5', name: 'Karim R.', level: 8, points: 2800, city: 'Rabat', img: 'https://i.pravatar.cc/100?u=5' },
    { id: 'u6', name: 'Layla M.', level: 8, points: 2650, city: 'Tangier', img: 'https://i.pravatar.cc/100?u=6' },
    { id: 'u7', name: 'Omar S.', level: 7, points: 2420, city: 'Marrakech', img: 'https://i.pravatar.cc/100?u=7' },
  ];

  return (
    <div className="flex flex-col h-full bg-background-dark animate-fadeIn">
      {/* Fixed Header */}
      <header className="flex items-center justify-between p-4 pt-12 z-20 bg-background-dark">
        <button onClick={onBack} className="size-11 rounded-2xl bg-surface-dark border border-white/5 flex items-center justify-center text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black">Top Reporters</h1>
        <div className="size-11" />
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Podium Section */}
        <div className="pt-10 pb-8 px-6 flex justify-center items-end gap-3 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
          
          {/* #2 */}
          <PodiumItem rank={2} name="Sara K." pts={3800} img="https://i.pravatar.cc/100?u=2" />
          {/* #1 */}
          <PodiumItem rank={1} name="Ahmed B." pts={4500} img="https://i.pravatar.cc/100?u=1" featured />
          {/* #3 */}
          <PodiumItem rank={3} name="Youssef T." pts={3200} img="https://i.pravatar.cc/100?u=3" />
        </div>

        {/* List Section */}
        <div className="px-6 space-y-3">
          <div className="flex justify-between items-end mb-4 px-2">
             <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">The Rest of the pack</h2>
             <p className="text-[10px] font-bold text-primary">Updated 5m ago</p>
          </div>

          {restOfRankings.map(user => (
            <div key={user.id} className="flex items-center gap-4 p-4 rounded-[2rem] bg-surface-dark/40 border border-white/5 backdrop-blur-sm">
               <span className="w-6 text-center text-xs font-black text-slate-600">#{restOfRankings.indexOf(user) + 4}</span>
               <img src={user.img} className="size-11 rounded-full border-2 border-white/10" alt={user.name} />
               <div className="flex-1">
                 <p className="font-bold text-white text-sm">{user.name}</p>
                 <p className="text-[10px] text-slate-500 font-bold uppercase">{user.city} • Lvl {user.level}</p>
               </div>
               <div className="text-right">
                 <p className="font-black text-white text-sm">{user.points.toLocaleString()}</p>
                 <p className="text-[8px] font-black text-slate-600 uppercase">PTS</p>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky User Rank Footer */}
      <div className="fixed bottom-24 left-4 right-4 z-50">
        <div className="bg-primary/95 backdrop-blur-xl border border-white/20 p-4 rounded-[2.5rem] shadow-2xl flex items-center justify-between text-background-dark animate-slide-up">
           <div className="flex items-center gap-4">
             <div className="size-12 rounded-full border-2 border-background-dark/20 p-0.5">
               <img src="https://i.pravatar.cc/100?u=me" className="size-full rounded-full" alt="Me" />
             </div>
             <div>
               <p className="font-black text-base leading-tight">Your Rank</p>
               <p className="text-[10px] font-black uppercase opacity-70">Top 12% globally</p>
             </div>
           </div>
           <div className="text-right">
             <p className="text-3xl font-black leading-none">#{MOCK_USER.globalRank}</p>
             <div className="flex items-center gap-1 justify-end mt-1">
                <span className="material-symbols-outlined text-[12px] font-black">arrow_upward</span>
                <span className="text-[10px] font-black">12 spots</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const PodiumItem: React.FC<{ rank: number; name: string; pts: number; img: string; featured?: boolean }> = ({ rank, name, pts, img, featured }) => (
  <div className={`flex flex-col items-center gap-3 ${featured ? 'w-1/3' : 'w-1/4 pb-4 opacity-70'}`}>
    <div className="relative">
      {rank === 1 && <span className="material-symbols-outlined absolute -top-8 left-1/2 -translate-x-1/2 text-accent-gold text-4xl animate-bounce-slight" style={{ fontVariationSettings: "'FILL' 1" }}>crown</span>}
      <div className={`rounded-full p-1 bg-gradient-to-tr from-slate-700 to-slate-500 shadow-2xl ${featured ? 'size-24 border-4 border-primary' : 'size-16'}`}>
        <img src={img} className="size-full rounded-full border-2 border-background-dark" alt={name} />
      </div>
      <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full font-black text-[10px] border-2 border-background-dark shadow-xl ${rank === 1 ? 'bg-primary text-background-dark' : 'bg-slate-700 text-white'}`}>
        #{rank}
      </div>
    </div>
    <div className="text-center">
      <p className={`font-black tracking-tight truncate w-20 ${featured ? 'text-lg text-white' : 'text-xs text-slate-400'}`}>{name}</p>
      <p className={`font-black ${featured ? 'text-primary' : 'text-slate-500'} text-[10px]`}>{pts.toLocaleString()} <span className="text-[8px] opacity-60">PTS</span></p>
    </div>
  </div>
);
