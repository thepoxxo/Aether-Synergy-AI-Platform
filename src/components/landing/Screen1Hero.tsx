import React from 'react';
import { Model3DCanvas } from '../common/Model3DCanvas';
import { TrendingUp, Award, Layers, Sparkles, Sliders, Box, Globe } from 'lucide-react';
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
            THE ULTIMATE <br />
            <span className="gold-gradient-text">AI MARKETING ENGINE</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 font-normal">
            Transforming 3D Worlds into Captivating Campaigns
          </p>
        </div>

        {/* 3D Centerpiece Stage with Holographic Overlays (Exact Image 1 Layout) */}
        <div className="relative max-w-5xl mx-auto rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-cyber-900/60 to-cyber-950/90 border border-cyber-gold/30 shadow-2xl backdrop-blur-2xl">
          {/* Left Vertical Tool Capsule (as seen in image 1) */}
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
                <TrendingUp className="w-3.5 h-3.5" /> Real-time data
              </div>
              <div className="text-lg font-tech font-bold text-white mt-1">33D Streetwear</div>
              <div className="text-xs font-mono text-emerald-400">+23% Followers</div>
            </div>
          </div>

          {/* Right HUD: Campaign Performance */}
          <div className="absolute top-8 right-8 z-20 hidden sm:block pointer-events-none">
            <div className="glass-panel p-4 rounded-2xl border-cyber-gold/40 shadow-gold-glow text-right">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Campaign Performance:</span>
              <div className="text-2xl font-tech font-bold text-cyber-gold mt-0.5">+189% ROI</div>
            </div>
          </div>

          {/* 3D Model Viewport */}
          <div className="h-[440px] sm:h-[500px] w-full">
            <Model3DCanvas type="hoodie" primaryColor="#171E2E" accentColor="#E5A93C" autoRotate={true} />
          </div>

          {/* Center Call to Action Button */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <button
              onClick={onLaunch}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-extrabold text-base uppercase tracking-widest shadow-gold-glow-lg hover:scale-105 transition-all"
            >
              LAUNCH YOUR ECOSYSTEM
            </button>
          </div>

          {/* Bottom Right Awwwards Badge */}
          <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 p-2 px-3 rounded-xl bg-cyber-950/90 border border-cyber-700 text-left">
            <Award className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="text-[10px] font-bold text-white">Awwwards Winner</div>
              <div className="text-[9px] text-slate-400 font-mono">SOTO, Neon Gold</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
