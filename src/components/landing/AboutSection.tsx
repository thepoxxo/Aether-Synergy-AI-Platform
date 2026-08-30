import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { setLoginModalOpen } = useAuth();
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto transition-colors">
      <div className="relative rounded-3xl p-8 sm:p-12 glass-panel-gold border border-cyber-gold/40 shadow-gold-glow-lg overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
          {/* Left: Mascot representation */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-cyber-950/80 border border-cyber-gold/30 text-center">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-cyber-gold/40 flex items-center justify-center border border-cyber-gold shadow-gold-glow mb-4">
              <span className="text-5xl">🦊</span>
            </div>
            <div className="font-tech font-bold text-white text-lg">Sparky & Kai AI</div>
            <p className="text-xs text-cyber-gold">{t('about.copilotTag')}</p>
            <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400 bg-cyber-900 px-2.5 py-1 rounded-full border border-cyber-800">
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> {t('about.expertLevel')}
            </div>
          </div>

          {/* Center: Mission & About statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-900 border border-cyber-700 text-cyber-gold text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> {t('about.tag')}
            </div>

            <h3 className="text-2xl sm:text-4xl font-tech font-extrabold text-white uppercase tracking-tight">
              {t('about.title')} <span className="gold-gradient-text">{t('about.titleHighlight')}</span>
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              {t('about.whoWeAre')}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setLoginModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-cyber-gold text-black font-tech font-bold text-sm uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all flex items-center gap-2"
              >
                <span>{t('about.startFree')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" /> {t('about.noCard')}
                </span>
                <span>•</span>
                <span>{t('about.cancelAnytime')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
