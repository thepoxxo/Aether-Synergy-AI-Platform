import React, { useState } from 'react';
import { Model3DCanvas, ModelType } from '../common/Model3DCanvas';
import { ArrowRight, ShieldCheck, Layers, Ruler, FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Screen1HeroProps {
  onLaunch: () => void;
}

const GARMENT_SAMPLES: {
  id: ModelType;
  name: string;
  fabricSpec: string;
  consumption: string;
  fitNote: string;
}[] = [
  {
    id: 'hoodie',
    name: 'Heavyweight Boxy Hoodie',
    fabricSpec: 'French Terry 480 GSM · 100% Algodón Peinado',
    consumption: '1.65 m / prenda (Talla L)',
    fitNote: 'Hombro caído · Costura doble aguja 1.0 cm'
  },
  {
    id: 'jacket',
    name: 'Chaqueta Técnica Ripstop 3L',
    fabricSpec: 'Nylon Ripstop 3 Capas · Costura Termosellada',
    consumption: '2.10 m / prenda (Talla L)',
    fitNote: 'Manga raglán · Cierre impermeable YKK #5'
  },
  {
    id: 'sneaker',
    name: 'Runner Suela Compuesta V4',
    fabricSpec: 'Malla Técnica Transpirable + Caucho EVA',
    consumption: 'Molde Horma 42 EU · 380 g par',
    fitNote: 'Refuerzo de talón en TPU · Plantilla anatómica'
  }
];

export const Screen1Hero: React.FC<Screen1HeroProps> = ({ onLaunch }) => {
  const { t } = useLanguage();
  const [modelIndex, setModelIndex] = useState(0);

  const currentSample = GARMENT_SAMPLES[modelIndex];

  const handleNextModel = () => {
    setModelIndex((prev) => (prev + 1) % GARMENT_SAMPLES.length);
  };

  const handlePrevModel = () => {
    setModelIndex((prev) => (prev - 1 + GARMENT_SAMPLES.length) % GARMENT_SAMPLES.length);
  };

  return (
    <section
      id="screen-hero"
      className="relative min-h-[88vh] py-14 px-4 lg:px-8 flex flex-col justify-center text-center overflow-hidden border-b border-cyber-800"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-8">
        {/* Editorial Hero Header */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyber-900 border border-cyber-700 text-slate-300 font-mono text-xs tracking-wide">
            <Ruler className="w-3.5 h-3.5 text-cyber-gold" />
            <span>{t('landing.badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
            {t('hero.titleTop')}{' '}
            <span className="text-cyber-gold block sm:inline">
              {t('hero.titleBottom')}
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Primary & Secondary CTAs + Explicit IP Guarantee */}
          <div className="pt-2 flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onLaunch}
                className="px-7 py-3.5 rounded-xl bg-cyber-gold hover:bg-cyber-gold-light text-black font-bold text-sm tracking-wide transition-all flex items-center gap-2 shadow-gold-glow"
              >
                <span>{t('hero.launchBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#screen-avantgarde"
                className="px-5 py-3.5 rounded-xl bg-cyber-900 hover:bg-cyber-800 text-slate-200 border border-cyber-700 font-medium text-sm transition-colors"
              >
                Ver cómo funciona el flujo (3 pasos)
              </a>
            </div>

            <div className="inline-flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyber-emerald shrink-0" />
              <span>{t('hero.tagline')}</span>
            </div>
          </div>
        </div>

        {/* Garment Atelier Workbench Stage */}
        <div className="relative max-w-5xl mx-auto rounded-2xl p-4 sm:p-6 bg-cyber-900 border border-cyber-700 shadow-cyber-card">
          {/* Top Atelier Spec Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-cyber-800 text-xs">
            {/* Garment Selector (Apparel & Footwear only) */}
            <div className="flex items-center gap-2 bg-cyber-950 border border-cyber-700 rounded-xl p-1.5">
              <button
                onClick={handlePrevModel}
                className="p-1.5 rounded-lg hover:bg-cyber-800 text-slate-400 hover:text-white transition-colors"
                title="Prenda anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-3 text-left">
                <div className="font-semibold text-xs text-white">
                  {currentSample.name}
                </div>
                <span className="text-[11px] font-mono text-slate-400 block">
                  {currentSample.fabricSpec}
                </span>
              </div>

              <button
                onClick={handleNextModel}
                className="p-1.5 rounded-lg hover:bg-cyber-800 text-slate-400 hover:text-white transition-colors"
                title="Siguiente prenda"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Technical Garment Specs (Replaces fake ROI widget) */}
            <div className="hidden md:flex items-center gap-4 text-left font-mono text-[11px]">
              <div className="px-3 py-1.5 rounded-lg bg-cyber-950 border border-cyber-800">
                <span className="text-slate-500 block">CONSUMO DE TELA</span>
                <span className="text-slate-200 font-semibold">{currentSample.consumption}</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-cyber-950 border border-cyber-800">
                <span className="text-slate-500 block">CONSTRUCCIÓN</span>
                <span className="text-slate-200 font-semibold">{currentSample.fitNote}</span>
              </div>
            </div>
          </div>

          {/* Center 3D Garment Canvas */}
          <div className="h-[380px] sm:h-[430px] lg:h-[460px] w-full rounded-xl overflow-hidden bg-cyber-950 border border-cyber-800">
            <Model3DCanvas
              key={currentSample.id}
              type={currentSample.id}
              primaryColor="#171E2E"
              accentColor="#E5A93C"
              celShaded={false}
              autoRotate={true}
              transparentStage={false}
              initialCamera="front"
            />
          </div>

          {/* Bottom 3-Step Pipeline Bar */}
          <div className="mt-4 pt-4 border-t border-cyber-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cyber-950 border border-cyber-800">
              <Layers className="w-4 h-4 text-cyber-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">01 · Boceto a Prenda 3D</span>
                <span className="text-slate-400 text-[11px]">Revisa caída, gramaje y costuras antes de cortar tela.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cyber-950 border border-cyber-800">
              <FileText className="w-4 h-4 text-cyber-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">02 · Ficha Técnica y Patrón .DXF</span>
                <span className="text-slate-400 text-[11px]">Medidas por talla (XS–XXL) y consumo exacto de rollo.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cyber-950 border border-cyber-800">
              <ShieldCheck className="w-4 h-4 text-cyber-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">03 · Campaña y Cotización en Taller</span>
                <span className="text-slate-400 text-[11px]">Pre-vende el drop y envía la orden lista para producir.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
