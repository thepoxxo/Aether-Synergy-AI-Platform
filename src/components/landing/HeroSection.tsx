import React from 'react';
import { Model3DCanvas } from '../common/Model3DCanvas';
import { Ruler, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface HeroSectionProps {
  onExploreStudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreStudio }) => {
  const { setLoginModalOpen } = useAuth();
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 px-4 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-900 border border-cyber-700 text-slate-300 text-xs font-mono">
            <Ruler className="w-3.5 h-3.5 text-cyber-gold" /> {t('landing.badge')}
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-900 border border-cyber-700 text-slate-300 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-cyber-emerald" /> {t('hero.tagline')}
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
            {t('hero.titleTop')} <br />
            <span className="text-cyber-gold">{t('hero.titleBottom')}</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg mt-4 max-w-2xl mx-auto font-normal">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={onExploreStudio}
              className="px-7 py-3.5 rounded-xl bg-cyber-gold hover:bg-cyber-gold-light text-black font-bold text-sm tracking-wide shadow-gold-glow transition-all flex items-center gap-2"
            >
              <span>{t('hero.launchBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLoginModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-cyber-900 hover:bg-cyber-800 border border-cyber-700 text-white font-semibold text-sm transition-all"
            >
              <span>{t('landing.login')}</span>
            </button>
          </div>
        </div>

        {/* Centerpiece 3D Interactive Mockup */}
        <div className="relative max-w-5xl mx-auto rounded-2xl p-4 bg-cyber-900 border border-cyber-700 shadow-cyber-card">
          <div className="h-[460px] sm:h-[520px] w-full">
            <Model3DCanvas type="hoodie" primaryColor="#171E2E" accentColor="#E5A93C" autoRotate={true} />
          </div>
        </div>
      </div>
    </section>
  );
};
