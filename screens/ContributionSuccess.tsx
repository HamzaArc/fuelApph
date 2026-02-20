
import React from 'react';

interface ContributionSuccessProps {
  onDone: () => void;
  summary: { station: string; fuel: string; price: number } | null;
}

export const ContributionSuccess: React.FC<ContributionSuccessProps> = ({ onDone, summary }) => {
  return (
    <div className="fixed inset-0 z-[2000] bg-background-dark font-sans antialiased flex flex-col items-center overflow-y-auto no-scrollbar animate-fadeIn">
      {/* Confetti & Glow Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full">
        <div className="absolute top-[10%] left-[20%] w-3 h-3 bg-primary rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-[30%] left-[10%] w-4 h-4 border-2 border-primary rounded-full opacity-20"></div>
        <div className="absolute top-[5%] right-[30%] w-2 h-2 bg-primary rounded-full opacity-30"></div>
        <div className="absolute bottom-[40%] left-[80%] w-3 h-3 bg-yellow-400 rounded-sm rotate-12 opacity-20"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-1/2 bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,rgba(16,34,22,0)_70%)] blur-3xl pointer-events-none"></div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-md min-h-full flex flex-col px-6 py-12 relative z-10">
        
        {/* Top Section: Celebration */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-full aspect-square max-w-[280px] mb-8">
            {/* Trophy Image */}
            <div 
              className="w-full h-full bg-contain bg-center bg-no-repeat animate-bounce-slight" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaZKDtpD_IqaplKHD3WCQrVHclBU1W3Zqh0w4YzUwN_otFg-XHXDaIdNRm9Kiq_o4yZbcqlnMbQS3QfkIVeul_fBRQD5D_yf0Ng87Ie5WGiFry5adgIUzhnKZ7uBlJQfc55EptTv7_fACkdCpAq1v9sr_Moh3OUUmPby_T3giKA13Jszj2MrwTF606OzeuQFGWSOc1cASY_2Y4j6m5GJ5kACiRTPWJtTy9nGCiHsA9yUBXTw56_SLaRgee012KiDrxbhWkegMow3rY')" }}
            />
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
              AWESOME!
            </h1>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              You've helped <span className="text-primary font-black">12 drivers</span> save money today.
            </p>
          </div>
        </div>

        {/* Middle Section: Stats Cards */}
        <div className="space-y-4 mb-10">
          {/* Streak Widget */}
          <div className="bg-surface-dark border border-white/5 p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                </div>
                <div className="text-left">
                  <p className="text-white text-xl font-black leading-none">Daily Streak</p>
                  <p className="text-slate-500 text-[10px] font-black mt-2 uppercase tracking-[0.2em]">4 DAYS IN A ROW!</p>
                </div>
              </div>
              <span className="text-5xl font-black text-white italic">4</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden relative">
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all duration-1000" style={{ width: '80%' }}></div>
            </div>
          </div>

          {/* Contribution Summary Card */}
          <div className="bg-surface-dark/60 backdrop-blur-md rounded-[2rem] px-6 py-5 flex items-center gap-5 border border-white/5">
            <div className="size-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1 opacity-70">Your Contribution</span>
              <span className="text-base font-black text-white truncate">
                {summary ? `${summary.station}, ${summary.fuel} @ ${summary.price.toFixed(2)} DH` : "Contribution Verified"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Actions */}
        <div className="mt-auto space-y-4">
          <button className="w-full h-16 bg-primary hover:bg-blue-400 active:scale-[0.98] transition-all text-background-dark font-black text-xl rounded-[2rem] shadow-[0_15px_30px_rgba(59,130,246,0.3)]">
            Share Success
          </button>
          <button 
            onClick={onDone}
            className="w-full h-12 text-slate-500 hover:text-white font-black text-xs uppercase tracking-[0.3em] transition-all"
          >
            Back to Map
          </button>
        </div>
      </div>
    </div>
  );
};
