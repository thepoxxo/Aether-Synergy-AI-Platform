import React from 'react';
import { Model3DCanvas } from '../common/Model3DCanvas';
import { Play, TrendingUp, Layers, Sparkles, Box, Sliders, Globe, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Screen1HeroProps {
  onLaunch: () => void;
}

export const Screen1Hero: React.FC<Screen1HeroProps> = ({ onLaunch }) => {
  const { t } = useLanguage();

  return (
    <section id="screen-hero" className="relative min-h-[90vh] py-12 px-4 lg:px-8 cyber-grid flex flex-col justify-center text-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-6">
        {/* Main Hero Title */}
        <div className="space-y-2 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyber-gold/15 border border-cyber-gold/40 text-cyber-gold font-tech font-bold text-xs uppercase tracking-widest mb-1 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('landing.badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-tech font-extrabold tracking-tight text-white leading-none">
            {t('hero.titleTop')}{' '}
            <span className="gold-gradient-text block sm:inline">
              {t('hero.titleBottom')}
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* 3D Centerpiece Stage (Clear of HUD overlap) */}
        <div className="relative max-w-5xl mx-auto rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-white/90 to-slate-50/90 dark:from-cyber-900/60 dark:to-cyber-950/90 border border-amber-500/30 shadow-2xl backdrop-blur-2xl">
          {/* Top Live Metrics Strip (Integrated cleanly above canvas, NO OVERLAPPING) */}
          <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/80 dark:bg-cyber-950/80 border border-amber-500/20 shadow-sm text-left">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-500">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-600 dark:text-amber-400 block">
                    {t('hero.realtime')}
                  </span>
                  <span className="font-tech font-bold text-slate-900 dark:text-white text-sm">
                    {t('hero.category')}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                {t('hero.followers')}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/80 dark:bg-cyber-950/80 border border-amber-500/20 shadow-sm text-right">
              <div className="text-left">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">
                  {t('hero.performance')}
                </span>
                <span className="font-tech font-bold text-xs text-slate-700 dark:text-slate-300">
                  Conversion Boost
                </span>
              </div>
              <span className="text-xl font-tech font-extrabold text-amber-500">
                {t('hero.roi')}
              </span>
            </div>
          </div>

          {/* Center 3D Interactive Canvas (Uncluttered 360 View) */}
          <div className="h-[380px] sm:h-[430px] lg:h-[480px] w-full rounded-2xl overflow-hidden">
            <Model3DCanvas
              type="jacket"
              primaryColor="#171E2E"
              accentColor="#E5A93C"
              celShaded={true}
              autoRotate={true}
            />
          </div>

          {/* Bottom Interactive Launch CTA */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/90 dark:bg-cyber-950/80 border border-amber-500/20 shadow-sm">
            <div className="text-left">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="font-tech font-bold text-sm text-slate-900 dark:text-white">{t('hero.tagline')}</span>
              </div>
              <span className="text-xs text-slate-500">{t('hero.integrated')}</span>
            </div>

            <button
              onClick={onLaunch}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-tech font-extrabold text-sm uppercase tracking-wider shadow-gold-glow hover:opacity-90 hover:scale-105 transition-all flex items-center gap-2"
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
