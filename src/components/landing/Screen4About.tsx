import React from 'react';
import { Linkedin, Twitter, Instagram, Youtube, MessageSquare, Sparkles, Cpu, Globe2, ShieldCheck, Box, Video, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Screen4AboutProps {
  onGetStarted: () => void;
}

export const Screen4About: React.FC<Screen4AboutProps> = ({ onGetStarted }) => {
  const { t } = useLanguage();

  return (
    <section id="screen-about" className="relative min-h-[90vh] py-20 px-4 lg:px-8 cyber-grid flex flex-col justify-between border-t border-amber-500/20 overflow-hidden">
      {/* Background Cyber Ambient Radiance */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-8">
        {/* 1. Main Cyberpunk Holographic Ecosystem Glass Panel */}
        <div className="p-8 sm:p-12 rounded-3xl border-2 border-amber-500/50 dark:border-amber-400/80 bg-white/95 dark:bg-gradient-to-b dark:from-amber-950/30 dark:via-cyber-900 dark:to-cyber-950 shadow-[0_20px_50px_rgba(245,158,11,0.12)] dark:shadow-[0_0_50px_rgba(245,158,11,0.25)] text-center relative overflow-hidden backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_25px_60px_rgba(245,158,11,0.2)] hover:-translate-y-1">
          {/* Top Tech Bracket Header */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 font-tech font-bold text-xs uppercase tracking-widest mb-4 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
            <span>{t('about.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-tech font-extrabold text-slate-900 dark:text-white tracking-widest uppercase mb-4">
            {t('about.title')}
          </h2>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-sans font-medium">
            {t('about.desc')}
          </p>

          {/* 3 Cyberpunk 3D Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-cyber-800 text-left">
            {/* Pillar 1: 3D Studio */}
            <div className="p-5 rounded-2xl border-2 border-cyan-500/60 dark:border-cyan-400/70 bg-white/95 dark:bg-cyber-950/90 shadow-[0_8px_25px_rgba(6,182,212,0.12)] dark:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:scale-105 transition-transform space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-400">
                  <Box className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-bold">01 // 3D CORE</span>
              </div>
              <span className="font-tech font-extrabold text-sm text-slate-900 dark:text-white block">
                {t('about.pillar1')}
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Modelado paramétrico con Shaders Anime y física textil en tiempo real.</p>
            </div>

            {/* Pillar 2: Video AI */}
            <div className="p-5 rounded-2xl border-2 border-amber-500/60 dark:border-amber-400/70 bg-white/95 dark:bg-cyber-950/90 shadow-[0_8px_25px_rgba(245,158,11,0.12)] dark:shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-105 transition-transform space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-800 dark:text-amber-400">
                  <Video className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold">02 // SORA V2</span>
              </div>
              <span className="font-tech font-extrabold text-sm text-slate-900 dark:text-white block">
                {t('about.pillar2')}
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Comerciales cinematográficos 9:16 con cámara Drone FPV y locución multilingüe.</p>
            </div>

            {/* Pillar 3: B2B Sourcing */}
            <div className="p-5 rounded-2xl border-2 border-purple-500/60 dark:border-purple-400/70 bg-white/95 dark:bg-cyber-950/90 shadow-[0_8px_25px_rgba(168,85,247,0.12)] dark:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:scale-105 transition-transform space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-purple-500/15 text-purple-700 dark:text-purple-400">
                  <Globe2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-purple-700 dark:text-purple-400 font-bold">03 // B2B GLOBAL</span>
              </div>
              <span className="font-tech font-extrabold text-sm text-slate-900 dark:text-white block">
                {t('about.pillar3')}
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Conexión con fábricas auditadas de Portugal, Turquía y Colombia con Tech Packs en PDF.</p>
            </div>
          </div>
        </div>

        {/* 2. Dual Connect & Get Started Cyber Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Left: CONNECT & SOCIALS Card */}
          <div className="md:col-span-2 p-6 rounded-3xl border-2 border-slate-200 dark:border-cyber-800 bg-white/95 dark:bg-cyber-900/90 shadow-md flex flex-col justify-between hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="font-tech font-extrabold text-xs uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600 dark:text-amber-500" /> CONNECT & SOCIALS
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold">GLOBAL COMMUNITY</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#" className="p-3 rounded-2xl bg-slate-50 dark:bg-cyber-950 border border-slate-200 dark:border-cyber-700 text-slate-800 dark:text-amber-400 hover:text-amber-600 hover:border-amber-500 hover:scale-110 shadow-sm transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-2xl bg-slate-50 dark:bg-cyber-950 border border-slate-200 dark:border-cyber-700 text-slate-800 dark:text-amber-400 hover:text-amber-600 hover:border-amber-500 hover:scale-110 shadow-sm transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-2xl bg-slate-50 dark:bg-cyber-950 border border-slate-200 dark:border-cyber-700 text-slate-800 dark:text-amber-400 hover:text-amber-600 hover:border-amber-500 hover:scale-110 shadow-sm transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-2xl bg-slate-50 dark:bg-cyber-950 border border-slate-200 dark:border-cyber-700 text-slate-800 dark:text-amber-400 hover:text-amber-600 hover:border-amber-500 hover:scale-110 shadow-sm transition-all">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-2xl bg-slate-50 dark:bg-cyber-950 border border-slate-200 dark:border-cyber-700 text-slate-800 dark:text-amber-400 hover:text-amber-600 hover:border-amber-500 hover:scale-110 shadow-sm transition-all">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right: GET STARTED Action Card with 3D Depth */}
          <div className="p-6 rounded-3xl border-2 border-amber-500/60 dark:border-amber-400/80 bg-white/95 dark:bg-gradient-to-br dark:from-amber-950/40 dark:via-cyber-900 dark:to-cyber-950 shadow-[0_12px_30px_rgba(245,158,11,0.15)] dark:shadow-[0_0_35px_rgba(245,158,11,0.3)] flex flex-col justify-between text-center hover:scale-105 transition-all">
            <span className="font-tech font-extrabold text-xs uppercase tracking-widest text-slate-900 dark:text-white mb-2">
              COMENZAR AHORA
            </span>

            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mb-4 font-medium">
              Crea tu primer render 3D e inicia tu campaña viral de inmediato.
            </p>

            <button
              onClick={onGetStarted}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-tech font-extrabold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <span>{t('landing.startFree')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
