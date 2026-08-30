import React from 'react';
import { Box, Video, Share2, Globe, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Screen2AvantgardeProps {
  onSelectModule: (module: string) => void;
}

export const Screen2Avantgarde: React.FC<Screen2AvantgardeProps> = ({ onSelectModule }) => {
  const { t } = useLanguage();

  const capabilities = [
    {
      id: 'aurora3d',
      title: '3D Design & Rendering',
      desc: 'Create immersive visuals and digital assets with advanced modeling.',
      icon: Box,
      emoji: '🧊'
    },
    {
      id: 'adgen',
      title: 'AI Video Generation',
      desc: 'Generate high-quality marketing videos, promos, and short-form content instantly.',
      icon: Video,
      emoji: '🎥'
    },
    {
      id: 'automo',
      title: 'Social Media Automation',
      desc: 'Schedule posts, analyze trends, and manage campaigns across all platforms effortlessly.',
      icon: Share2,
      emoji: '⚙️'
    },
    {
      id: 'suppliers',
      title: 'Global Suppliers & Sourcing',
      desc: 'Connect with verified manufacturers and streamline supply chains worldwide.',
      icon: Globe,
      emoji: '🌐'
    }
  ];

  return (
    <section id="capabilities-section" className="relative min-h-[90vh] py-20 px-4 lg:px-8 cyber-grid flex flex-col justify-center border-t border-cyber-800/80">
      {/* Decorative Grid and Robotic vectors */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Top Mini Brand */}
        <div className="flex items-center justify-between mb-12">
          <span className="font-tech font-extrabold text-xl text-cyber-gold tracking-widest uppercase">
            AVANTGARDE
          </span>

          <div className="hidden lg:flex items-center gap-6 text-xs text-slate-300 font-semibold">
            <a href="#capabilities-section" className="hover:text-cyber-gold transition-colors">Features</a>
            <a href="#capabilities-section" className="hover:text-cyber-gold transition-colors">Services</a>
            <a href="#pricing-section" className="hover:text-cyber-gold transition-colors">Pricing</a>
            <a href="#about-section" className="hover:text-cyber-gold transition-colors">Team</a>
            <a href="#about-section" className="hover:text-cyber-gold transition-colors">Blog</a>
          </div>

          <button
            onClick={() => onSelectModule('aurora3d')}
            className="px-4 py-1.5 rounded-full border border-cyber-gold/60 text-cyber-gold text-xs font-tech font-bold uppercase tracking-wider hover:bg-cyber-gold hover:text-black transition-all"
          >
            Request Demo
          </button>
        </div>

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-tech font-extrabold text-white tracking-wide">
            Our Next-Gen <span className="gold-gradient-text">Capabilities</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 font-normal">
            Transforming Ideas into Innovation through Powerful Digital Tools.
          </p>
        </div>

        {/* 4 Cards (Exact Image 2 Glass Design) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                onClick={() => onSelectModule(cap.id)}
                className="group relative flex flex-col justify-between p-7 rounded-3xl bg-cyber-900/80 border border-cyber-700/80 hover:border-cyber-gold/80 hover:shadow-gold-glow-lg transition-all duration-300 cursor-pointer backdrop-blur-xl"
              >
                <div>
                  {/* Icon illustration container */}
                  <div className="w-16 h-16 rounded-2xl bg-cyber-950/90 border border-cyber-700 flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                    <span>{cap.emoji}</span>
                  </div>

                  <h3 className="text-xl font-tech font-bold text-white mb-2 group-hover:text-cyber-gold transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {cap.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-cyber-800 flex items-center justify-between text-xs font-bold text-cyber-gold group-hover:translate-x-1 transition-transform">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
