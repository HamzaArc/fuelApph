
import React, { useState } from 'react';
import { MOCK_USER, MOCK_VOUCHERS } from '../constants';
import { Voucher } from '../types';

export const Rewards: React.FC = () => {
  const [activeView, setActiveView] = useState<'shop' | 'wallet'>('shop');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedVoucher, setExpandedVoucher] = useState<string | null>(null);

  const categories = [
    { id: 'All', label: 'All', icon: null },
    { id: 'Fuel', label: 'Fuel', icon: 'local_gas_station' },
    { id: 'Wash', label: 'Car Wash', icon: 'local_car_wash' },
    { id: 'Food', label: 'Food', icon: 'restaurant' }
  ];

  const shopItems = [
    {
      id: 'r1',
      brand: 'Shell',
      title: 'Basic Car Wash',
      desc: 'Exterior wash and tire shine at participating stations.',
      points: 800,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHHw9kQVBjGygajvmItLM19yUSSh4AkwTGzrjUsVGhU_dID3gtb57jr5upE7rfyEL202l2seTds1nipBQltp5fYlNlNdP-ZVtcpVk9Q1NRe1AOxczTJrg5iyjvqSoJNqMj2rFDKf14srkS-62YQXCATISvSWlVaIUY4o39T9FiYGXck072UJOBpyq6DVoVp6wcJXih6-REcLbzcci2I8Y7DdJ1SDqeVd3A8SR3s2HIORK13M8TyVHOV2KZieqD-6_3yh3BuSCOhU_W'
    },
    {
      id: 'r2',
      brand: 'Afriquia',
      title: '50 DH Fuel Voucher',
      desc: 'Discount on your next fill-up at Afriquia.',
      points: 1200,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaCd-jraCP-vQ_N1eQEZ5ss2ToUHpSuXyjoU9wMGfsLqFLHduBOaeRsCc9vxMXbi2OscPKF264sipBP11fb2F8m1_wXppmhihO8IDSwlQqLIFJ2w5zAkgIZ2Goy-QlAHzaoPP7ZdjhVdDLa_HJM0DtnD8l9OpplNa5ImhCV7ePUzqY8QlAWOLGMOoOxk73WIUTOcFzohTOyQY8RkfSy0aQZ63F4nMo7nGXFMzS_7I3aFBbcpxGR7KO8gXDIHEaZbmi-blW1FjYXEls'
    },
    {
      id: 'r3',
      brand: 'Shell',
      title: 'Breakfast Combo',
      desc: 'Coffee and croissant at Shell Select.',
      points: 350,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL3Ig3ORY6knDPyTpjeVMPmSdidXI1CZ4_iSlZNjUqQ_cO-5nc1OQ0u2Amh0NL03R3JGjYoi7qW_ypCBeWrtfotbZ6Ii56ZPmCYqDwAi7wDaLg4SdEitPR-u90ohXRAVP400nBNA4s074Im68P4n-UGUaW87zFDVjaD_1glbk0NojiAkkSMtp7ror6tT1WCoq7s1eWnzjRochIHM8kHfQhY8ne6YwLYITyz7m9kTEii1KxL0cNjIrJuK3Bnjn_2xoFhDoeekIb2QMb'
    },
    {
      id: 'r4',
      brand: 'TotalEnergies',
      title: 'Screen Wash 1L',
      desc: 'High quality screen wash fluid.',
      points: 600,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD967_AYzMdLPLngiPPxV5XTYUUREjthiJbyxKF0tMp1vjUlEiw6gNoFkQF_0-nN97d3O-gg-N-epxPRDOnDh2QzLVoBh3HMLByPEdXcplUjJeQDuAevH3-KTI-OXkuyV8h3ZUtJj65bcSB6ULmk6vijOxHjpmcZ8vnc7bbzmfwSlwisZoWgib8KsyVamZCTueryxnLAMc6DAb8poMOQNU095pB_Uv6-rbBN7RHjBKNP1iNz9s6cAWqYARt0fcgLrOzuF8EUWiLaBcu'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-dark animate-fadeIn pb-32">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-12 pb-2 sticky top-0 z-20 bg-background-dark/95 backdrop-blur-md">
        <h2 className="text-xl font-black text-white">{activeView === 'shop' ? 'Rewards Shop' : 'My Wallet'}</h2>
        <div className="flex items-center gap-2">
          {activeView === 'shop' ? (
            <button 
              onClick={() => setActiveView('wallet')}
              className="flex h-10 px-4 items-center justify-center rounded-full bg-surface-dark text-primary border border-white/10 text-xs font-bold gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              Wallet
            </button>
          ) : (
            <button 
              onClick={() => setActiveView('shop')}
              className="flex h-10 px-4 items-center justify-center rounded-full bg-surface-dark text-primary border border-white/10 text-xs font-bold gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">redeem</span>
              Shop
            </button>
          )}
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-dark text-slate-400 border border-white/10">
            <span className="material-symbols-outlined text-[20px]">history</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar">
        {activeView === 'shop' ? (
          <div className="animate-fadeIn">
            {/* Points Display */}
            <section className="px-4 py-3">
              <div className="relative overflow-hidden rounded-3xl bg-surface-dark border border-white/5 p-6 text-center shadow-2xl">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl"></div>
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Available Balance</span>
                  <div className="flex items-baseline gap-2">
                    <h1 className="text-5xl font-black text-white tracking-tighter">{MOCK_USER.totalPoints.toLocaleString()}</h1>
                    <span className="text-primary font-bold">PTS</span>
                  </div>
                </div>
                {/* Level Progress */}
                <div className="mt-6 w-full">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-2 font-black uppercase tracking-widest">
                    <span>Silver Member</span>
                    <span>Gold (3,000 pts)</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-black/40 overflow-hidden">
                    <div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: '81%' }}></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Categories */}
            <section className="mb-6 pt-2">
              <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-2">
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-all active:scale-95 border ${
                      activeCategory === cat.id 
                      ? 'bg-primary border-primary text-black font-bold' 
                      : 'bg-surface-dark border-white/10 text-slate-400 font-medium'
                    }`}
                  >
                    {cat.icon && <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>}
                    <span className="text-xs">{cat.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Hot Deal */}
            <section className="px-4 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-orange-500 fill-1">local_fire_department</span>
                <h3 className="text-lg font-bold text-white">Hot Deal</h3>
              </div>
              <div className="group relative overflow-hidden rounded-3xl bg-surface-dark border border-white/5 aspect-[16/9]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                <img 
                  alt="Hot Deal" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdrdDxJ1FnZ3-lvQ_ewj37p00jNn8zTJOZnUqeSCnF5Fl2pWm5tBICJk-L-CwzOR8bcqhe0M9DY8phEOM2yWOjFz5d9jpgYZt_n08Slz6EfuzbCOd_MqVtTuTbt43i-xnVoKqz98q94TXFKnSOZxdJG3G9YaHOV7JQDsKaKP6uYZb39eJTjFFQHILCR-5Lleu-OnTRpBgKHms1SB8cocvXCXKw3J-LBpMBPJN6GVGSDr62WEEuF4s9MV4WDUf-hcnuaCagZGOHyUmN"
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                  <div className="flex justify-between items-end">
                    <div className="text-left">
                      <span className="inline-block px-2 py-0.5 rounded bg-orange-500 text-white text-[8px] font-black uppercase tracking-wider mb-2">Limited Time</span>
                      <h4 className="text-xl font-bold text-white mb-1 leading-tight">Free Espresso at TotalEnergies</h4>
                      <p className="text-xs text-slate-400">Valid at any station highway cafe</p>
                    </div>
                    <button className="h-10 px-5 bg-white text-black font-bold rounded-xl shadow-lg hover:bg-slate-200 active:scale-95 transition-all text-xs">
                      400 pts
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Redeem Grid */}
            <section className="px-4 mb-8">
              <h3 className="text-lg font-bold text-white mb-4 text-left">Redeem Now</h3>
              <div className="grid grid-cols-2 gap-4">
                {shopItems.map(item => (
                  <div key={item.id} className="flex flex-col bg-surface-dark rounded-3xl overflow-hidden border border-white/5 group hover:border-primary/50 transition-colors shadow-lg">
                    <div className="h-32 w-full overflow-hidden relative">
                      <img 
                        alt={item.title} 
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        src={item.image}
                      />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1 border border-white/10">
                        <span className="text-primary font-black text-[10px]">{item.points} pts</span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 text-left">
                      <h4 className="text-white font-bold text-sm mb-1 truncate">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 mb-4 line-clamp-2 leading-relaxed">{item.desc}</p>
                      <button className="mt-auto w-full py-2.5 rounded-xl bg-primary/10 text-primary font-bold text-xs hover:bg-primary hover:text-black transition-all">
                        Redeem
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Goals */}
            <section className="px-4 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Goals</h3>
                <span className="text-[10px] font-black text-slate-500 uppercase">Keep earning</span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-4 p-3 bg-surface-dark rounded-2xl border border-white/5 relative overflow-hidden group">
                  <div className="size-20 shrink-0 rounded-xl overflow-hidden bg-slate-900">
                    <img className="h-full w-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvob5_grkipYRmhLW_S6P66NTAc9zGtUoTPjZA5p09KPlsktbqcc5T4vdZtX0VyGtLpndy3MX4i-IBzI3MPBd4qEIF6zlMB5SF5HvGrXOTQOd9YE24zpknGJyytYpHwemUsMSUWTzDvB3itsHBnfCHU1GXCPl5wDgUsCVrLOF_dAKWLDLJ-XaD_DT-1hgaHMz2WZnspEITCecUbNQP8W-1soj7GhI_nk70bdelEKNVOdIKAl54VN-CIAKmx19mF-jlJPv6LpI6uyxu" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center text-left">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-slate-300 font-bold text-sm">Full Oil Change</h4>
                      <span className="material-symbols-outlined text-slate-600 text-[18px]">lock</span>
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-500 mb-2 uppercase font-black tracking-widest">
                      <span>Progress</span>
                      <span>2,450 / 5,000 pts</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-700 rounded-full" style={{ width: '49%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="animate-fadeIn px-4">
            {/* Wallet Savings Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-black p-6 shadow-2xl text-white mb-6 border border-white/5">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary opacity-10 blur-3xl"></div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 text-left">Total Lifetime Savings</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-5xl font-black tracking-tighter">350</h2>
                <span className="text-xl font-bold text-primary">MAD</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
                <span>Saved 45 MAD this month</span>
              </div>
            </div>

            {/* Segmented Control */}
            <div className="p-1 bg-surface-dark rounded-2xl flex mb-6 border border-white/5">
              <button className="flex-1 py-2 text-xs font-black rounded-xl bg-white text-black shadow-lg">Active</button>
              <button className="flex-1 py-2 text-xs font-black text-slate-500">History</button>
            </div>

            {/* Vouchers List */}
            <div className="space-y-4">
              {MOCK_VOUCHERS.map(v => (
                <div 
                  key={v.id} 
                  className={`bg-surface-dark rounded-3xl border transition-all overflow-hidden ${expandedVoucher === v.id ? 'border-primary/40 shadow-2xl shadow-primary/10' : 'border-white/5'}`}
                >
                  <div 
                    onClick={() => setExpandedVoucher(expandedVoucher === v.id ? null : v.id)}
                    className="p-4 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="size-12 rounded-2xl bg-white flex items-center justify-center p-2 shrink-0 shadow-inner">
                        <span className="text-slate-900 font-black text-xs">{v.brand.substring(0,2)}</span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-white text-sm">{v.brand}</h3>
                        <p className="text-primary font-black text-xs leading-none mt-1">{v.value}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[8px] font-black text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Expires soon</span>
                      <span className="material-symbols-outlined text-slate-600 transition-transform duration-300" style={{ transform: expandedVoucher === v.id ? 'rotate(180deg)' : 'none' }}>expand_more</span>
                    </div>
                  </div>

                  {expandedVoucher === v.id && (
                    <div className="bg-black/20 px-6 pb-8 pt-4 animate-slide-up border-t border-white/5">
                      <div className="flex flex-col items-center gap-6">
                        <p className="text-xs text-slate-500 font-medium text-center leading-relaxed">Present this QR code to the station attendant before payment.</p>
                        
                        {/* QR Code Container */}
                        <div className="bg-white p-4 rounded-3xl shadow-2xl w-48 h-48 flex items-center justify-center relative border-4 border-primary/20">
                          <div className="absolute top-2 left-2 size-4 border-t-2 border-l-2 border-primary rounded-tl-lg"></div>
                          <div className="absolute bottom-2 right-2 size-4 border-b-2 border-r-2 border-primary rounded-br-lg"></div>
                          <img 
                            alt="QR Code" 
                            className="size-full object-contain" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmJcomlPHr3wYSr1VwLD2Frb4H91KAI0WE1vu8u9GZTX4g2hv5XubfGy3l5ELihoYGV6DcgaryTDLGa0Y85ciPCwu8RUdYA7VMc0eDWQaroaR_SLcFrl1UV_kC2hu2Y9w4lst64DacUaPo3bHfA1YdTglteH6qNDPN6OhUGjHJcnTErLZVBwFdnl5nbJ7endY66GwByJDHjI4Ue-fQL-O4ti7LarZJgwJhYYs9wCDDtx1mXHEWEFzcwf3SJIlAp_76CZJJA7g1lnJ9" 
                          />
                        </div>

                        <div className="w-full space-y-4">
                          <div className="flex items-center justify-between bg-surface-darker px-5 py-3 rounded-2xl border border-white/5">
                            <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase">Voucher Code</span>
                            <span className="font-mono font-bold text-white tracking-widest">{v.code}</span>
                            <button className="text-primary active:scale-90 transition-transform">
                              <span className="material-symbols-outlined text-[20px]">content_copy</span>
                            </button>
                          </div>
                          <button className="w-full py-4 bg-primary text-background-dark font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all text-sm uppercase tracking-widest">
                            Mark as Used
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Empty State */}
            {MOCK_VOUCHERS.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                <span className="material-symbols-outlined text-6xl mb-4">savings</span>
                <p className="text-slate-400 font-bold">No active vouchers yet</p>
                <button 
                  onClick={() => setActiveView('shop')}
                  className="mt-4 text-primary text-xs font-black uppercase tracking-widest"
                >
                  Visit the Shop
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
