import React from 'react';
import { Model3DCanvas } from '../common/Model3DCanvas';
import { Sparkles, TrendingUp, Award, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface HeroSectionProps {
  onExploreStudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreStudio }) => {
  const { setLoginModalOpen } = useAuth();
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 px-4 lg:px-8 cyber-grid transition-colors">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyber-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyber-cyan/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-gold/10 border border-cyber-gold/30 text-cyber-gold text-xs font-bold tracking-wider uppercase shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5" /> {t('hero.tag')}
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-900 border border-cyber-700 text-slate-300 text-xs">
            <Award className="w-3.5 h-3.5 text-cyber-cyan" /> Awwwards Winner • SOTO Neon Gold
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-tech font-extrabold text-white tracking-tight uppercase leading-[1.1]">
            {t('hero.title1')} <br />
            <span className="gold-gradient-text">{t('hero.title2')}</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg mt-4 max-w-2xl mx-auto font-normal">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={onExploreStudio}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-lg uppercase tracking-wider shadow-gold-glow-lg hover:scale-105 transition-all flex items-center gap-2.5 active:scale-95"
            >
              <span>{t('hero.ctaLaunch')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setLoginModalOpen(true)}
              className="px-6 py-4 rounded-2xl bg-cyber-900/90 hover:bg-cyber-800 border border-cyber-700 hover:border-cyber-gold/40 text-white font-tech font-bold text-base uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-cyber-gold" />
              <span>{t('hero.ctaDemo')}</span>
            </button>
          </div>
        </div>

        {/* Centerpiece 3D Interactive Mockup with Holographic HUD stats */}
        <div className="relative max-w-5xl mx-auto rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-cyber-800/60 to-cyber-950/80 border border-cyber-gold/30 shadow-2xl backdrop-blur-2xl">
          {/* Overlay Holographic Stats */}
          <div className="absolute top-8 left-8 z-20 hidden md:flex flex-col gap-3 pointer-events-none">
            <div className="glass-panel p-3.5 rounded-2xl border-cyber-gold/30 shadow-lg">
              <div className="flex items-center gap-2 text-cyber-gold text-xs font-bold uppercase">
                <TrendingUp className="w-4 h-4" /> Real-time Data
              </div>
              <div className="text-xl font-tech font-bold text-white mt-1">+23% Followers & Reach</div>
              <div className="text-[10px] text-slate-400">33D Streetwear Series</div>
            </div>
          </div>

          <div className="absolute top-8 right-8 z-20 hidden md:flex flex-col gap-3 pointer-events-none">
            <div className="glass-panel p-3.5 rounded-2xl border-cyber-gold/30 shadow-lg text-right">
              <span className="text-xs text-slate-400 uppercase font-semibold">Campaign Performance</span>
              <div className="text-2xl font-tech font-bold text-cyber-gold mt-0.5">{t('hero.statRoi')}</div>
              <span className="text-[10px] text-emerald-400">Automated Pipeline</span>
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="h-[460px] sm:h-[540px] w-full">
            <Model3DCanvas type="hoodie" primaryColor="#171E2E" accentColor="#E5A93C" autoRotate={true} />
          </div>
        </div>
      </div>
    </section>
  );
};
