
import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const [vehicleType, setVehicleType] = useState<'car' | 'taxi' | 'truck' | null>(null);

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="h-screen w-full flex flex-col bg-background-dark overflow-hidden relative font-sans selection:bg-primary selection:text-background-dark">
      
      {/* STEP 1: WELCOME */}
      {step === 1 && (
        <div className="absolute inset-0 flex flex-col animate-fadeIn">
          <div className="absolute inset-0 z-0 h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmYQmEGn2yY0olRz7FKixPtBSO5WuxM9XKQQykx5aC7O7x4mplU7b9NGk38c2h4EnXYxoBumA6FT_uYBNRSy-SRiB0ctb_snl8x8LqRFPqrbeL_olaV5J8wp7B2O48Mz5rZr-Sxj27fbmWCY428pyHrIYM1oci1VLkfhXI2SzLuRhCjMkt1Uoj3pWLnD6lOn6gzCh3GG90chhyXTfbrMXzEYOJLKlhEzSjtVf0B2O3M1iNCCP_srjiHIFFWg7sdaVhBkmwpDojecSg")' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-background-dark"></div>
          </div>
          <div className="relative z-10 flex h-full flex-col justify-between p-8">
            <div className="flex items-center gap-2 rounded-full bg-black/20 w-fit px-3 py-1.5 backdrop-blur-md border border-white/10 mt-8">
              <span className="material-symbols-outlined text-primary text-xl">local_gas_station</span>
              <span className="text-white text-sm font-semibold tracking-wide uppercase">FuelSpy Morocco</span>
            </div>
            <div className="flex flex-col gap-6 pb-12">
              <div className="flex flex-col gap-3">
                <h1 className="text-white text-5xl font-bold leading-none tracking-tighter">Save on every <span className="text-primary">Liter.</span></h1>
                <p className="text-slate-200 text-lg font-medium leading-relaxed">Join the largest community of drivers in Morocco finding the best fuel prices in real-time.</p>
              </div>
              <div className="flex flex-col gap-4">
                <button onClick={next} className="w-full h-16 bg-primary hover:bg-primary-dark text-background-dark font-bold text-xl rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group">
                  Get Started <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: SCAN & EARN */}
      {step === 2 && (
        <div className="flex-1 flex flex-col animate-fadeIn relative bg-background-dark overflow-hidden">
          <header className="w-full px-6 pt-12 pb-4 flex justify-end items-center z-20 absolute top-0 left-0 right-0">
            <button onClick={() => setStep(4)} className="text-slate-500 font-bold text-sm hover:text-primary">Skip</button>
          </header>
          <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 w-full mt-8 mb-20">
            <div className="relative w-full aspect-square max-w-[320px] mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-75 animate-pulse"></div>
              <div className="relative z-10 w-[65%] h-[90%] bg-slate-900 border-4 border-slate-700 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col items-center">
                <div className="w-1/3 h-4 bg-slate-800 rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2 z-20"></div>
                <div className="w-full h-full bg-slate-800 relative bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAhaqr4ITxEpvRo6mCPiQW0nVRgdpJ28OUBel54IDL6efTUZVl0WcIcktwevxcWvHSm8vPg7MWtaSSZY5fta_QZxBbFxeOjYNj5MLcpsZCnvk0BTRjHuI3UKzz_gp4nsWyASLA20vm2efmhoNttWQ_Piv7d-Ph4BuDSV6HUNS758pKUmJyNTQfxBWFiiAEoay6C8V7NCL_igAsoWaeeY-stwU5mfSg6S5ugpaVIUUKJxW7FLE_LmA9GjUEtDXwqdXC-AdqOTB4ZC26')" }}>
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-40 h-20 border-2 border-primary/40 rounded-lg relative flex items-center justify-center">
                      <div className="w-[90%] h-[2px] bg-primary shadow-[0_0_15px_rgba(59,130,246,0.8)] absolute top-1/2 animate-scan-move"></div>
                      <div className="absolute -top-8 bg-primary text-background-dark text-[8px] font-black px-2 py-0.5 rounded shadow-lg uppercase tracking-widest">Scanning</div>
                    </div>
                    <div className="mt-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-[10px] font-black flex items-center gap-2">
                      <span className="material-symbols-outlined text-[12px] text-primary">payments</span>
                      14.50 DH
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center max-w-xs mx-auto space-y-3">
              <h1 className="text-3xl font-black text-white">Snap & Verify Prices</h1>
              <p className="text-slate-400 text-base leading-relaxed">Point your camera at the board. AI captures data, and you earn points.</p>
            </div>
          </div>
          <div className="w-full px-6 pb-12 pt-4 bg-background-dark flex flex-col gap-8 mt-auto">
            <button onClick={next} className="w-full bg-primary text-background-dark font-black text-lg py-5 rounded-[2rem] shadow-2xl transition-all active:scale-[0.98]">Next Step</button>
          </div>
        </div>
      )}

      {/* STEP 3: REWARDS */}
      {step === 3 && (
        <div className="flex-1 flex flex-col p-8 animate-fadeIn">
          <div className="flex-1 flex flex-col items-center justify-center">
             <div className="relative size-64 mb-12">
               <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
               <div className="size-full bg-surface-dark border border-white/5 rounded-[3rem] shadow-2xl flex items-center justify-center animate-bounce-slight">
                 <span className="material-symbols-outlined text-primary text-8xl">redeem</span>
               </div>
             </div>
             <h2 className="text-4xl font-black text-white mb-4 text-center">Fuel Rewards</h2>
             <p className="text-slate-400 text-center max-w-xs leading-relaxed">Redeem your hard-earned points for vouchers at Shell and Afriquia.</p>
          </div>
          <button onClick={next} className="w-full bg-primary text-background-dark font-black text-lg py-5 rounded-[2rem] shadow-2xl mb-8">Got it!</button>
        </div>
      )}

      {/* STEP 4: AUTH */}
      {step === 4 && (
        <div className="flex-1 flex flex-col p-8 animate-fadeIn bg-background-dark pt-20">
          <h1 className="text-white text-4xl font-black mb-2">Join the Community</h1>
          <p className="text-slate-400 mb-10">Sign up to track your savings and compete in rankings.</p>
          <div className="space-y-4">
            <div className="flex items-center w-full h-16 rounded-2xl bg-surface-dark border border-white/5 px-4 gap-4">
              <span className="text-slate-400 font-bold">+212</span>
              <input type="tel" placeholder="Phone number" className="bg-transparent border-none text-white focus:ring-0 text-lg w-full" />
            </div>
            <button onClick={next} className="w-full h-16 bg-[#2563eb] text-white font-black rounded-2xl text-lg">Continue via WhatsApp</button>
            <div className="py-4 text-center text-slate-600 text-xs font-black uppercase tracking-widest">Or</div>
            <button onClick={next} className="w-full h-12 text-slate-500 font-bold">Continue as Guest</button>
          </div>
        </div>
      )}

      {/* STEP 5: PERSONALIZE */}
      {step === 5 && (
        <div className="flex-1 flex flex-col p-8 pt-20 animate-fadeIn">
          <h1 className="text-3xl font-black text-white mb-8">Personalize Your Drive</h1>
          <div className="space-y-8">
            <section>
              <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Vehicle</h2>
              <div className="grid grid-cols-3 gap-3">
                {['car', 'taxi', 'truck'].map(v => (
                  <button key={v} onClick={() => setVehicleType(v as any)} className={`p-4 rounded-3xl border ${vehicleType === v ? 'bg-primary text-background-dark border-primary' : 'bg-surface-dark text-slate-400 border-white/5'}`}>
                    <span className="material-symbols-outlined text-2xl">{v === 'car' ? 'directions_car' : v === 'taxi' ? 'local_taxi' : 'local_shipping'}</span>
                  </button>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Fuel Preference</h2>
              {['Diesel', 'Sans Plomb'].map(f => (
                <button key={f} onClick={() => setSelectedFuel(f)} className={`w-full p-6 rounded-3xl border mb-3 flex justify-between items-center ${selectedFuel === f ? 'bg-white text-background-dark border-white' : 'bg-surface-dark text-white border-white/5'}`}>
                  <span className="font-bold">{f}</span>
                  {selectedFuel === f && <span className="material-symbols-outlined">check_circle</span>}
                </button>
              ))}
            </section>
          </div>
          <button onClick={next} className="w-full h-16 bg-primary text-background-dark font-black rounded-2xl mt-auto mb-8">Start Tour</button>
        </div>
      )}

      {/* STEP 6: TOUR - SEARCH */}
      {step === 6 && (
        <div className="absolute inset-0 z-[100] bg-background-dark flex flex-col animate-fadeIn">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center grayscale" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDG0bv_0SuMUjLqcwqdRkQQiKpBUZG0et1VwGvdQVARzaeySy8ASA64oX6hERabFL4y43NcUHz_L4_LrllLREiH6zEXosYDimtkPAkCfHzSEGWWJiwyiR5tHBUVVQXxamPuNwy2wm95TmotoIbfFR-WUYjJt4gwc8-FQkbXcs3UkYfZs72lKlEcv3d57vix1mFTQSWe1-48O-gul-qZizxiVCbR6krZwE3x1mzMa5gFwb_hnZE0K6aF4sWuEG02_flL0tJsrtzNMunD")' }} />
          <div className="relative z-20 flex flex-col h-full p-8 pt-16">
            <div className="bg-surface-dark p-4 rounded-2xl border border-primary shadow-[0_0_30px_rgba(59,130,246,0.3)] mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">search</span>
              <span className="text-slate-400 font-bold">Shell Agdal...</span>
            </div>
            <div className="bg-surface-dark p-8 rounded-[2.5rem] border border-white/10 shadow-2xl mt-auto mb-20 text-center">
              <h3 className="text-2xl font-black text-white mb-2 text-left">Smart Search</h3>
              <p className="text-slate-400 text-sm text-left leading-relaxed">Find any station across Morocco instantly. Filter by brand or distance.</p>
              <button onClick={next} className="mt-8 w-full bg-primary text-background-dark font-black py-4 rounded-2xl">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: TOUR - PINS */}
      {step === 7 && (
        <div className="absolute inset-0 z-[100] bg-background-dark flex flex-col animate-fadeIn">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center grayscale" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDG0bv_0SuMUjLqcwqdRkQQiKpBUZG0et1VwGvdQVARzaeySy8ASA64oX6hERabFL4y43NcUHz_L4_LrllLREiH6zEXosYDimtkPAkCfHzSEGWWJiwyiR5tHBUVVQXxamPuNwy2wm95TmotoIbfFR-WUYjJt4gwc8-FQkbXcs3UkYfZs72lKlEcv3d57vix1mFTQSWe1-48O-gul-qZizxiVCbR6krZwE3x1mzMa5gFwb_hnZE0K6aF4sWuEG02_flL0tJsrtzNMunD")' }} />
          <div className="relative z-20 flex flex-col items-center justify-center h-full p-8">
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-primary/20 blur-3xl scale-150 animate-pulse"></div>
              <div className="relative bg-primary text-background-dark px-4 py-2 rounded-2xl font-black text-xl shadow-2xl">13.45 DH</div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45" />
            </div>
            <div className="bg-surface-dark p-8 rounded-[2.5rem] border border-white/10 shadow-2xl text-center w-full">
              <h3 className="text-2xl font-black text-white mb-2">Live Price Pins</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">Blue markers show the best prices reported by our community right now.</p>
              <button onClick={next} className="w-full bg-primary text-background-dark font-black py-4 rounded-2xl">Continue</button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 8: TOUR - REPORT */}
      {step === 8 && (
        <div className="absolute inset-0 z-[100] bg-background-dark flex flex-col animate-fadeIn">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center grayscale" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDG0bv_0SuMUjLqcwqdRkQQiKpBUZG0et1VwGvdQVARzaeySy8ASA64oX6hERabFL4y43NcUHz_L4_LrllLREiH6zEXosYDimtkPAkCfHzSEGWWJiwyiR5tHBUVVQXxamPuNwy2wm95TmotoIbfFR-WUYjJt4gwc8-FQkbXcs3UkYfZs72lKlEcv3d57vix1mFTQSWe1-48O-gul-qZizxiVCbR6krZwE3x1mzMa5gFwb_hnZE0K6aF4sWuEG02_flL0tJsrtzNMunD")' }} />
          <div className="relative z-20 flex flex-col justify-end h-full p-8 pb-32">
            <div className="bg-surface-dark p-8 rounded-[2.5rem] border border-white/10 shadow-2xl mb-12 text-center relative">
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface-dark border-r border-b border-white/10 rotate-45" />
              <h3 className="text-2xl font-black text-white mb-2">Earn Points</h3>
              <p className="text-slate-400 text-sm leading-relaxed">See a price board? Report it using voice or camera to earn points!</p>
              <button onClick={next} className="mt-8 w-full bg-primary text-background-dark font-black py-4 rounded-2xl uppercase tracking-widest">Finish</button>
            </div>
            <div className="mx-auto size-24 bg-primary rounded-full flex items-center justify-center text-background-dark shadow-[0_0_40px_rgba(59,130,246,0.5)] border-4 border-background-dark animate-bounce">
              <span className="material-symbols-outlined text-4xl font-black">add_a_photo</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 9: SUCCESS */}
      {step === 9 && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fadeIn relative">
          <div className="relative size-64 mb-10">
             <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full"></div>
             <div className="relative size-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASzSN5FPlRObiquwRNVhCombkGz73Ml5JareJxzE2a-7v0A0RuLTxc5IQXLI7cGCojikJcaXISKIFum3-nDxri999AoNBW5g8xIOMADgZ-3cGpfiOMIGldygcWHkwSpm-gaOp2daAEggONlFSgKEQ-14xi7lFP2AUd6S4U6S9InMo6_Y64NgU2GI-HQ6FqU0jU7-Km_e9Oog9jjTrBvmvyiPHnwsJ5Tx95KtvjDRvKnx6jokqTrppeelrqAefAPKLf8RXGzl0zjBji")' }}>
                <div className="absolute bottom-0 right-4 size-16 bg-primary text-background-dark rounded-full flex items-center justify-center border-4 border-background-dark shadow-2xl scale-110">
                  <span className="material-symbols-outlined text-3xl font-black">check</span>
                </div>
             </div>
          </div>
          <h1 className="text-4xl font-black text-white mb-4">You're Ready!</h1>
          <p className="text-slate-400 text-lg mb-10 max-w-xs leading-relaxed">We've added <span className="text-primary font-bold">50 points</span> to your account as a welcome gift.</p>
          <button onClick={onComplete} className="w-full h-16 bg-primary text-background-dark font-black text-xl rounded-2xl shadow-xl active:scale-95 transition-transform uppercase tracking-widest">Go to Map</button>
        </div>
      )}
    </div>
  );
};
