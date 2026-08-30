import React from 'react';
import { Model3DCanvas } from '../common/Model3DCanvas';
import { TrendingUp, Award, Layers, Sparkles, Sliders, Box, Globe, Play } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Screen1HeroProps {
  onLaunch: () => void;
}

export const Screen1Hero: React.FC<Screen1HeroProps> = ({ onLaunch }) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between px-4 lg:px-8 py-8 cyber-grid overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyber-gold/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Center Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        {/* Title */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-tech font-extrabold text-white tracking-tight uppercase leading-[1.05]">
            {t('hero.titleTop')} <br />
            <span className="gold-gradient-text">{t('hero.titleBottom')}</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 font-normal">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* 3D Centerpiece Stage with Holographic Overlays */}
        <div className="relative max-w-5xl mx-auto rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-cyber-900/60 to-cyber-950/90 border border-cyber-gold/30 shadow-2xl backdrop-blur-2xl">
          {/* Left Vertical Tool Capsule */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3 p-2 rounded-2xl bg-cyber-900/90 border border-cyber-700/80 shadow-lg text-slate-400">
            <button className="p-2 rounded-xl bg-cyber-gold/20 text-cyber-gold"><Layers className="w-4 h-4" /></button>
            <button className="p-2 rounded-xl hover:text-white"><Box className="w-4 h-4" /></button>
            <button className="p-2 rounded-xl hover:text-white"><Sliders className="w-4 h-4" /></button>
            <button className="p-2 rounded-xl hover:text-white"><Sparkles className="w-4 h-4" /></button>
            <button className="p-2 rounded-xl hover:text-white"><Globe className="w-4 h-4" /></button>
          </div>

          {/* Left HUD: Real-time Data */}
          <div className="absolute top-8 left-16 lg:left-20 z-20 hidden sm:block pointer-events-none">
            <div className="glass-panel p-4 rounded-2xl border-cyber-gold/40 shadow-gold-glow text-left">
              <div className="flex items-center gap-1.5 text-cyber-gold text-xs font-bold uppercase">
                <TrendingUp className="w-3.5 h-3.5" /> {t('hero.realtime')}
              </div>
              <div className="text-lg font-tech font-bold text-white mt-1">{t('hero.category')}</div>
              <div className="text-xs font-mono text-emerald-400">{t('hero.followers')}</div>
            </div>
          </div>

          {/* Right HUD: Campaign Performance */}
          <div className="absolute top-8 right-8 z-20 hidden sm:block pointer-events-none">
            <div className="glass-panel p-4 rounded-2xl border-cyber-gold/40 shadow-gold-glow text-right">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">{t('hero.performance')}</span>
              <div className="text-2xl font-tech font-bold text-cyber-gold mt-0.5">{t('hero.roi')}</div>
            </div>
          </div>

          {/* Center 3D Interactive Canvas */}
          <div className="h-[360px] sm:h-[420px] lg:h-[460px] w-full">
            <Model3DCanvas
              type="jacket"
              primaryColor="#171E2E"
              accentColor="#E5A93C"
              celShaded={true}
              autoRotate={true}
            />
          </div>

          {/* Bottom Interactive Launch CTA */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-cyber-950/80 border border-cyber-800">
            <div className="text-left">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-cyber-gold" />
                <span className="font-tech font-bold text-sm text-white">{t('hero.tagline')}</span>
              </div>
              <span className="text-xs text-slate-400">{t('hero.integrated')}</span>
            </div>

            <button
              onClick={onLaunch}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-extrabold text-sm uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all flex items-center gap-2"
            >
              <span>{t('hero.launchBtn')}</span>
              <Play className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
