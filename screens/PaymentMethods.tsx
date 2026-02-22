import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const PaymentMethods: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col h-full bg-background-dark animate-fadeIn">
      <header className="flex items-center justify-between p-4 pt-12 z-20">
        <button onClick={onBack} className="size-11 rounded-2xl bg-surface-dark border border-white/5 flex items-center justify-center text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black">{t('paymentMethods.title')}</h1>
        <div className="size-11" />
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
        <section>
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t('paymentMethods.savedCards')}</h2>
          <div className="space-y-4">
             <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] p-6 border border-white/10 shadow-2xl relative overflow-hidden aspect-[1.6/1]">
                <div className="absolute top-0 right-0 size-32 bg-primary/5 blur-3xl" />
                <div className="flex justify-between items-start mb-10">
                   <div className="size-12 bg-white/5 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">credit_card</span>
                   </div>
                   <span className="text-white/40 font-black tracking-[0.2em] italic">VISA</span>
                </div>
                <p className="text-xl font-bold tracking-[0.2em] text-white mb-6">•••• •••• •••• 4242</p>
                <div className="flex justify-between items-end">
                   <div>
                     <p className="text-[8px] font-black text-slate-500 uppercase mb-0.5">{t('paymentMethods.expires')}</p>
                     <p className="text-sm font-bold text-slate-300">12/26</p>
                   </div>
                   <span className="bg-primary/20 text-primary text-[8px] font-black px-2 py-1 rounded uppercase">{t('paymentMethods.primary')}</span>
                </div>
             </div>

             <button className="w-full p-6 rounded-[2rem] border-2 border-dashed border-white/10 flex items-center justify-center gap-3 text-slate-500 hover:text-primary hover:border-primary/50 transition-all group">
                <span className="material-symbols-outlined group-hover:scale-125 transition-transform">add_circle</span>
                <span className="font-bold text-sm">{t('paymentMethods.addNew')}</span>
             </button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t('paymentMethods.digitalWallets')}</h2>
          <div className="bg-surface-dark rounded-3xl border border-white/5 p-2">
             <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="size-10 bg-white rounded-xl flex items-center justify-center p-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="size-full object-contain" alt="Paypal" />
                   </div>
                   <span className="text-sm font-bold text-slate-200">PayPal</span>
                </div>
                <span className="text-xs text-slate-500 font-bold">k.benali@gmail.com</span>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};