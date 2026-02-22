import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const HelpCenter: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  const faqs = [
    { q: t('helpCenter.faqs.q1'), a: t('helpCenter.faqs.a1') },
    { q: t('helpCenter.faqs.q2'), a: t('helpCenter.faqs.a2') },
    { q: t('helpCenter.faqs.q3'), a: t('helpCenter.faqs.a3') },
  ];

  return (
    <div className="flex flex-col h-full bg-background-dark animate-fadeIn">
      <header className="flex items-center justify-between p-4 pt-12 z-20">
        <button onClick={onBack} className="size-11 rounded-2xl bg-surface-dark border border-white/5 flex items-center justify-center text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black">{t('helpCenter.title')}</h1>
        <div className="size-11" />
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
        <div className="relative">
           <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
              <span className="material-symbols-outlined">search</span>
           </span>
           <input className="w-full bg-surface-dark border-none rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-primary/50" placeholder={t('helpCenter.search')} />
        </div>

        <section>
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t('helpCenter.faqTitle')}</h2>
          <div className="space-y-3">
             {faqs.map((f, i) => (
               <div key={i} className="bg-surface-dark rounded-2xl border border-white/5 p-5">
                  <p className="text-sm font-black text-white mb-2">{f.q}</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">{f.a}</p>
               </div>
             ))}
          </div>
        </section>

        <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-6 text-center space-y-4">
           <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <span className="material-symbols-outlined text-4xl">support_agent</span>
           </div>
           <div>
             <h3 className="text-lg font-black text-white">{t('helpCenter.stillNeedHelp')}</h3>
             <p className="text-xs text-slate-500 font-medium">{t('helpCenter.support247')}</p>
           </div>
           <button className="w-full py-4 bg-primary text-background-dark font-black rounded-2xl shadow-lg active:scale-95 transition-all text-sm uppercase tracking-widest">
              {t('helpCenter.contactSupport')}
           </button>
        </div>
      </div>
    </div>
  );
};