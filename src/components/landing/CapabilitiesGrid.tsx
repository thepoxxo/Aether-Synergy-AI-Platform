import React from 'react';
import { Box, Video, Share2, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface CapabilitiesGridProps {
  onSelectCapability: (module: string) => void;
}

export const CapabilitiesGrid: React.FC<CapabilitiesGridProps> = ({ onSelectCapability }) => {
  const { t } = useLanguage();

  const capabilities = [
    {
      id: 'aurora3d',
      title: t('caps.c1Title'),
      subtitle: 'Create immersive visuals and digital assets with advanced cel-shaded modeling.',
      icon: Box,
      tag: 'AnimeCel 2D & 3D',
      gradient: 'from-amber-500/20 to-cyber-gold/5',
      borderColor: 'border-cyber-gold/40'
    },
    {
      id: 'adgen',
      title: t('caps.c2Title'),
      subtitle: 'Generate high-quality marketing videos, promos, and short-form TikTok content instantly.',
      icon: Video,
      tag: 'Ultra HD 9:16',
      gradient: 'from-cyan-500/20 to-blue-500/5',
      borderColor: 'border-cyan-500/40'
    },
    {
      id: 'automo',
      title: t('caps.c3Title'),
      subtitle: 'Schedule posts, analyze trends, and manage multi-platform campaigns effortlessly.',
      icon: Share2,
      tag: 'TikTok • IG • YT',
      gradient: 'from-purple-500/20 to-pink-500/5',
      borderColor: 'border-purple-500/40'
    },
    {
      id: 'suppliers',
      title: t('caps.c4Title'),
      subtitle: 'Connect with verified manufacturers and streamline supply chains worldwide.',
      icon: Globe,
      tag: 'B2B Tech Pack',
      gradient: 'from-emerald-500/20 to-teal-500/5',
      borderColor: 'border-emerald-500/40'
    }
  ];

  return (
    <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-900 border border-cyber-700 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cyber-gold" /> Avantgarde Core Stack
        </div>
        <h2 className="text-3xl sm:text-5xl font-tech font-extrabold text-white tracking-wide uppercase">
          {t('caps.title')}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Transforming Ideas into Innovation through Powerful Digital Tools.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          return (
            <div
              key={cap.id}
              onClick={() => onSelectCapability(cap.id)}
              className={`group relative flex flex-col justify-between p-6 rounded-3xl bg-cyber-900/90 border ${cap.borderColor} glass-panel-hover cursor-pointer shadow-cyber-card overflow-hidden`}
            >
              {/* Background gradient pill */}
              <div className={`absolute inset-0 bg-gradient-to-b ${cap.gradient} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`} />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-cyber-950 border border-cyber-700 flex items-center justify-center text-cyber-gold group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-cyber-950/80 border border-cyber-700 text-slate-300">
                    {cap.tag}
                  </span>
                </div>

                <h3 className="text-xl font-tech font-bold text-white mb-2 group-hover:text-cyber-gold transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {cap.subtitle}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-cyber-800 flex items-center justify-between text-xs font-bold text-cyber-gold group-hover:translate-x-1 transition-all">
                <span>Explorar Módulo</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
