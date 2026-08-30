import React from 'react';
import { Linkedin, Twitter, Instagram, Youtube, MessageSquare, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Screen4AboutProps {
  onGetStarted: () => void;
}

export const Screen4About: React.FC<Screen4AboutProps> = ({ onGetStarted }) => {
  const { t } = useLanguage();

  return (
    <section id="about-section" className="relative min-h-[90vh] py-20 px-4 lg:px-8 cyber-grid flex flex-col justify-between border-t border-cyber-800/80">
      <div className="max-w-5xl mx-auto w-full relative z-10 space-y-6">
        {/* 1. Main About Us Glass Panel */}
        <div className="p-8 sm:p-10 rounded-3xl bg-cyber-900/90 border border-cyber-gold/40 shadow-gold-glow-lg text-center relative overflow-hidden backdrop-blur-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-gold/10 border border-cyber-gold/30 text-cyber-gold font-tech font-bold text-[10px] uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3" />
            <span>{t('about.badge')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-tech font-extrabold text-white tracking-widest uppercase mb-4">
            {t('about.title')}
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl mx-auto font-sans">
            {t('about.desc')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-cyber-800/80 text-left text-xs font-tech">
            <div className="p-3 rounded-2xl bg-cyber-950/80 border border-cyber-800">
              <span className="text-cyber-gold font-bold block">{t('about.pillar1')}</span>
            </div>
            <div className="p-3 rounded-2xl bg-cyber-950/80 border border-cyber-800">
              <span className="text-cyber-gold font-bold block">{t('about.pillar2')}</span>
            </div>
            <div className="p-3 rounded-2xl bg-cyber-950/80 border border-cyber-800">
              <span className="text-cyber-gold font-bold block">{t('about.pillar3')}</span>
            </div>
          </div>
        </div>

        {/* 2. Dual Connect & Get Started Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Left: CONNECT Card */}
          <div className="md:col-span-2 p-6 rounded-3xl bg-cyber-900/90 border border-cyber-700/80 shadow-md flex flex-col justify-center">
            <span className="font-tech font-bold text-xs uppercase tracking-widest text-white mb-3">
              CONNECT & SOCIALS
            </span>

            <div className="flex items-center gap-4">
              <a href="#" className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-700 text-cyber-gold hover:text-white hover:border-cyber-gold transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-700 text-cyber-gold hover:text-white hover:border-cyber-gold transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-700 text-cyber-gold hover:text-white hover:border-cyber-gold transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-700 text-cyber-gold hover:text-white hover:border-cyber-gold transition-all">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-700 text-cyber-gold hover:text-white hover:border-cyber-gold transition-all">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right: GET STARTED Card */}
          <div className="p-6 rounded-3xl bg-cyber-900/90 border border-cyber-gold/40 shadow-gold-glow flex flex-col justify-center text-center">
            <span className="font-tech font-bold text-xs uppercase tracking-widest text-white mb-3">
              COMENZAR AHORA
            </span>

            <button
              onClick={onGetStarted}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyber-gold to-amber-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all"
            >
              {t('landing.startFree')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
