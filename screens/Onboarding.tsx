import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);

  const next = () => setStep(s => s + 1);

  const requestLocationAndComplete = () => {
    // Mocking native location request for the prototype
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          onComplete(); // Jump straight to map
        },
        () => {
          // If denied, don't block them. Let them explore manually.
          onComplete();
        }
      );
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-background-dark overflow-hidden relative font-sans selection:bg-primary selection:text-background-dark">
      
      {/* STEP 1: WELCOME & VALUE PROP */}
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

      {/* STEP 2: LOCATION PERMISSION */}
      {step === 2 && (
        <div className="flex-1 flex flex-col animate-fadeIn relative bg-background-dark overflow-hidden p-8 pt-20">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="relative size-40 mb-10">
              <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse-slow"></div>
              <div className="size-full bg-surface-dark border border-white/5 rounded-full flex items-center justify-center shadow-2xl relative z-10">
                <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Find Nearby Stations</h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-xs mx-auto">
              FuelSpy needs your location to show you the cheapest gas stations around you and enable 1-tap price verification.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 mt-auto mb-8">
            <button onClick={requestLocationAndComplete} className="w-full bg-primary text-background-dark font-black text-lg py-5 rounded-[2rem] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">my_location</span>
              Allow Location Access
            </button>
            <button onClick={onComplete} className="w-full py-4 text-slate-500 font-bold hover:text-white transition-colors">
              Skip for now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};