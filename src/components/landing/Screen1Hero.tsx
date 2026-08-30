import React, { useState, useEffect } from 'react';
import { Model3DCanvas, ModelType } from '../common/Model3DCanvas';
import { Play, TrendingUp, Sparkles, Award, Eye, EyeOff, Dices, Shuffle, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Screen1HeroProps {
  onLaunch: () => void;
}

const AVAILABLE_HERO_MODELS: { id: ModelType; name: string; tag: string; emoji: string }[] = [
  { id: 'jacket', name: 'Cyber Viper Tech Jacket', tag: 'Textile 3D', emoji: '🧥' },
  { id: 'sneaker', name: 'SoleSmith Neo Runner V4', tag: 'Footwear 3D', emoji: '👟' },
  { id: 'hoodie', name: 'Avantgarde Heavy Hoodie', tag: 'Streetwear 3D', emoji: '🥷' },
  { id: 'chair', name: 'Minimalist Cyber Lounge', tag: 'Industrial 3D', emoji: '🪑' },
  { id: 'speaker', name: 'Spatial Acoustic Orb', tag: 'Hardware 3D', emoji: '🔊' },
  { id: 'synth', name: 'Analog Wavetable Synthesizer', tag: 'Audio Engine 3D', emoji: '🎛️' },
  { id: 'tumbler', name: 'Titanium Cryo Flask', tag: 'Product 3D', emoji: '🥤' }
];

export const Screen1Hero: React.FC<Screen1HeroProps> = ({ onLaunch }) => {
  const { t } = useLanguage();

  const [isTransparentStage, setIsTransparentStage] = useState(false);
  const [modelIndex, setModelIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  const currentModel = AVAILABLE_HERO_MODELS[modelIndex];

  // Auto-cycle 3D objects every 14 seconds if enabled
  useEffect(() => {
    if (!isAutoCycling) return;
    const timer = setInterval(() => {
      setModelIndex((prev) => (prev + 1) % AVAILABLE_HERO_MODELS.length);
    }, 14000);
    return () => clearInterval(timer);
  }, [isAutoCycling]);

  const handleNextModel = () => {
    setIsAutoCycling(false);
    setModelIndex((prev) => (prev + 1) % AVAILABLE_HERO_MODELS.length);
  };

  const handlePrevModel = () => {
    setIsAutoCycling(false);
    setModelIndex((prev) => (prev - 1 + AVAILABLE_HERO_MODELS.length) % AVAILABLE_HERO_MODELS.length);
  };

  const handleRandomModel = () => {
    setIsAutoCycling(false);
    const rand = Math.floor(Math.random() * AVAILABLE_HERO_MODELS.length);
    setModelIndex(rand);
  };

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

        {/* 3D Centerpiece Stage (With Eye Transparency & Random 3D Models Swapper) */}
        <div
          className={`relative max-w-5xl mx-auto rounded-3xl p-3 sm:p-5 transition-all duration-500 ${
            isTransparentStage
              ? 'bg-transparent border-transparent shadow-none backdrop-blur-none'
              : 'bg-gradient-to-b from-white/90 to-slate-50/90 dark:from-cyber-900/60 dark:to-cyber-950/90 border border-amber-500/30 shadow-2xl backdrop-blur-2xl'
          }`}
        >
          {/* Top Stage Control Toolbar: Transparency Eye + 3D Model Swapper + Metrics */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs">
            {/* Left: Model Switcher Capsule */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/85 dark:bg-cyber-950/85 border border-amber-500/30 shadow-sm backdrop-blur-md">
              <button
                onClick={handlePrevModel}
                className="p-1.5 rounded-xl hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 transition-colors"
                title="Objeto 3D Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-2 text-left">
                <div className="font-tech font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                  <span>{currentModel.emoji}</span>
                  <span>{currentModel.name}</span>
                </div>
                <span className="text-[10px] font-mono text-amber-500 block">{currentModel.tag}</span>
              </div>

              <button
                onClick={handleNextModel}
                className="p-1.5 rounded-xl hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 transition-colors"
                title="Siguiente Objeto 3D"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleRandomModel}
                className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-black transition-all ml-1"
                title="Objeto 3D Aleatorio"
              >
                <Dices className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Eye Transparency Button + Realtime ROI Metric */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsTransparentStage(!isTransparentStage)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-mono font-bold transition-all shadow-sm ${
                  isTransparentStage
                    ? 'bg-amber-500 text-black border-amber-400 shadow-gold-glow animate-pulse'
                    : 'bg-white/85 dark:bg-cyber-950/85 text-slate-300 border-amber-500/30 hover:border-amber-400 hover:text-white'
                }`}
                title={isTransparentStage ? 'Restaurar Fondo del Cuadro 3D' : 'Hacer Fondo 3D Transparente (Integrar con Galaxias)'}
              >
                {isTransparentStage ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">
                  {isTransparentStage ? 'Espacio Puro ON' : 'Integrar Espacio'}
                </span>
              </button>

              <div className="hidden md:flex items-center gap-2 p-2 px-3 rounded-2xl bg-white/80 dark:bg-cyber-950/80 border border-amber-500/20 shadow-sm text-right">
                <span className="text-[10px] font-mono text-slate-400 uppercase">ROI</span>
                <span className="text-base font-tech font-extrabold text-amber-500">+189%</span>
              </div>
            </div>
          </div>

          {/* Center 3D Interactive Canvas with Dynamic Model Swapping */}
          <div className="h-[380px] sm:h-[430px] lg:h-[480px] w-full rounded-2xl overflow-hidden">
            <Model3DCanvas
              key={currentModel.id}
              type={currentModel.id}
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
