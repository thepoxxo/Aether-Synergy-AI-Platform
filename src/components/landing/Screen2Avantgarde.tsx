import React from 'react';
import { Box, Video, Share2, Globe, ArrowRight, Sparkles, Cpu, Layers, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Screen2AvantgardeProps {
  onSelectModule: (module: string) => void;
}

export const Screen2Avantgarde: React.FC<Screen2AvantgardeProps> = ({ onSelectModule }) => {
  const { t } = useLanguage();

  const capabilities = [
    {
      id: 'aurora3d',
      code: 'SYS.01 • 3D SHADER ENGINE',
      title: t('sidebar.aurora3d'),
      desc: t('avantgarde.desc'),
      icon: Box,
      emoji: '🧊',
      badge: 'WebGL 3D',
      theme: {
        border: 'border-2 border-cyan-400/80 hover:border-cyan-300',
        glow: 'hover:shadow-[0_20px_50px_rgba(6,182,212,0.4)]',
        bgGradient: 'bg-gradient-to-b from-cyan-500/15 via-white to-cyan-50/40 dark:from-cyan-950/40 dark:via-cyber-900 dark:to-cyber-950',
        badgeColor: 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-400/50',
        accentText: 'text-cyan-600 dark:text-cyan-400',
        btnBg: 'group-hover:bg-cyan-500 group-hover:text-slate-950'
      }
    },
    {
      id: 'adgen',
      code: 'SYS.02 • GENERATIVE VIDEO',
      title: t('sidebar.adgen'),
      desc: t('about.pillar2'),
      icon: Video,
      emoji: '🎥',
      badge: 'Sora & Gen-3',
      theme: {
        border: 'border-2 border-amber-400 hover:border-amber-300',
        glow: 'hover:shadow-[0_20px_50px_rgba(245,158,11,0.45)]',
        bgGradient: 'bg-gradient-to-b from-amber-500/15 via-white to-amber-50/40 dark:from-amber-950/40 dark:via-cyber-900 dark:to-cyber-950',
        badgeColor: 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-400/50',
        accentText: 'text-amber-600 dark:text-amber-400',
        btnBg: 'group-hover:bg-amber-500 group-hover:text-slate-950'
      }
    },
    {
      id: 'automo',
      code: 'SYS.03 • AUTO SCHEDULER',
      title: t('sidebar.automo'),
      desc: t('landing.subtitle'),
      icon: Share2,
      emoji: '⚙️',
      badge: 'Multi-Channel',
      theme: {
        border: 'border-2 border-emerald-400/80 hover:border-emerald-300',
        glow: 'hover:shadow-[0_20px_50px_rgba(16,185,129,0.4)]',
        bgGradient: 'bg-gradient-to-b from-emerald-500/15 via-white to-emerald-50/40 dark:from-emerald-950/40 dark:via-cyber-900 dark:to-cyber-950',
        badgeColor: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-400/50',
        accentText: 'text-emerald-600 dark:text-emerald-400',
        btnBg: 'group-hover:bg-emerald-500 group-hover:text-slate-950'
      }
    },
    {
      id: 'suppliers',
      code: 'SYS.04 • B2B FACTORY HUB',
      title: t('sidebar.suppliers'),
      desc: t('about.pillar3'),
      icon: Globe,
      emoji: '🌐',
      badge: 'Incoterms 2020',
      theme: {
        border: 'border-2 border-purple-400/80 hover:border-purple-300',
        glow: 'hover:shadow-[0_20px_50px_rgba(168,85,247,0.4)]',
        bgGradient: 'bg-gradient-to-b from-purple-500/15 via-white to-purple-50/40 dark:from-purple-950/40 dark:via-cyber-900 dark:to-cyber-950',
        badgeColor: 'bg-purple-500/20 text-purple-600 dark:text-purple-300 border-purple-400/50',
        accentText: 'text-purple-600 dark:text-purple-400',
        btnBg: 'group-hover:bg-purple-500 group-hover:text-white'
      }
    }
  ];

  return (
    <section id="screen-avantgarde" className="relative min-h-[90vh] py-20 px-4 lg:px-8 cyber-grid flex flex-col justify-center border-t border-amber-500/20 overflow-hidden">
      {/* Ambient Cyber Light Glows in Background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12">
        {/* Top Mini Brand Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-cyber-800">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-500 animate-pulse" />
            <span className="font-tech font-extrabold text-xl text-slate-900 dark:text-white tracking-widest uppercase">
              AVANTGARDE <span className="text-amber-500">CORE</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-xs text-slate-600 dark:text-slate-300 font-semibold font-mono">
            <a href="#screen-hero" className="hover:text-amber-500 transition-colors">01//INICIO</a>
            <a href="#screen-avantgarde" className="text-amber-500 font-bold underline decoration-amber-500 decoration-2 underline-offset-4">02//CEL-SHADED</a>
            <a href="#screen-pricing" className="hover:text-amber-500 transition-colors">03//PRECIOS</a>
            <a href="#screen-about" className="hover:text-amber-500 transition-colors">04//ECOSISTEMA</a>
          </div>

          <button
            onClick={() => onSelectModule('aurora3d')}
            className="px-4 py-1.5 rounded-full border border-amber-500/60 bg-amber-500/10 hover:bg-amber-500 text-amber-600 dark:text-amber-400 hover:text-slate-950 text-xs font-tech font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            {t('landing.explore3d')}
          </button>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-tech font-bold text-xs uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('avantgarde.badge')}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-tech font-extrabold text-slate-900 dark:text-white tracking-wide">
            {t('avantgarde.title')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-normal max-w-xl mx-auto">
            {t('avantgarde.desc')}
          </p>
        </div>

        {/* 4 Cyberpunk 3D Interactive Floating Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {capabilities.map((cap) => {
            const Icon = cap.icon;

            return (
              <div
                key={cap.id}
                onClick={() => onSelectModule(cap.id)}
                className={`group relative flex flex-col justify-between p-7 rounded-3xl ${cap.theme.border} ${cap.theme.bgGradient} ${cap.theme.glow} backdrop-blur-2xl transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-3 hover:scale-[1.03]`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Cyber Corner Tech Accent */}
                <div className="absolute top-3 right-3 text-[9px] font-mono text-slate-400 dark:text-slate-500 font-bold">
                  // {cap.id.toUpperCase()}
                </div>

                <div className="space-y-4">
                  {/* Floating 3D Icon Box */}
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-cyber-950 border border-slate-200 dark:border-cyber-700 flex items-center justify-center text-3xl shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <span>{cap.emoji}</span>
                  </div>

                  {/* System Code Tag */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {cap.code}
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${cap.theme.badgeColor}`}>
                      {cap.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-xl font-tech font-bold text-slate-900 dark:text-white transition-colors group-hover:${cap.theme.accentText}`}>
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans line-clamp-3">
                    {cap.desc}
                  </p>
                </div>

                {/* Bottom Interactive Trigger */}
                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-cyber-800 flex items-center justify-between text-xs font-bold font-tech uppercase tracking-wider text-slate-700 dark:text-slate-300 transition-colors">
                  <span className={`group-hover:${cap.theme.accentText}`}>ACCEDER AL MÓDULO</span>
                  <div className={`p-1.5 rounded-xl bg-slate-100 dark:bg-cyber-800 text-slate-700 dark:text-slate-200 transition-all ${cap.theme.btnBg} group-hover:translate-x-1`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
