import React from 'react';
import { ShieldCheck, Box, Video, Globe2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Screen4AboutProps {
  onGetStarted: () => void;
}

export const Screen4About: React.FC<Screen4AboutProps> = ({ onGetStarted }) => {
  const { t } = useLanguage();

  return (
    <section
      id="screen-about"
      className="relative py-20 px-4 lg:px-8 flex flex-col justify-between overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-10">
        {/* 1. Editorial Manifesto Panel */}
        <div className="p-8 sm:p-12 rounded-2xl border border-cyber-700 bg-cyber-900 shadow-cyber-card text-left relative">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyber-950 border border-cyber-700 text-slate-300 font-mono text-xs">
              <span>{t('about.badge')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t('about.title')}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {t('about.desc')}
            </p>
          </div>

          {/* 3 Concrete Atelier Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8 pt-8 border-t border-cyber-800">
            <div className="p-5 rounded-xl border border-cyber-800 bg-cyber-950 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-cyber-900 border border-cyber-700 text-cyber-gold">
                  <Box className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">CAÍDA & GRAMAJE</span>
              </div>
              <span className="font-bold text-sm text-white block">
                {t('about.pillar1')}
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Comprueba proporciones, costuras y peso del algodón (GSM) antes de encargar el primer corte.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-cyber-800 bg-cyber-950 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-cyber-900 border border-cyber-700 text-cyber-gold">
                  <Video className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">PRE-VENTA</span>
              </div>
              <span className="font-bold text-sm text-white block">
                {t('about.pillar2')}
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Genera fotos de estudio y clips 9:16 con dirección de arte natural para medir demanda real antes de producir.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-cyber-800 bg-cyber-950 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-cyber-900 border border-cyber-700 text-cyber-gold">
                  <Globe2 className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">ORDEN DE CORTE</span>
              </div>
              <span className="font-bold text-sm text-white block">
                {t('about.pillar3')}
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Exporta el Tech Pack en PDF y el patrón .DXF con medidas graduadas para que el taller cotice sin ambigüedades.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Founding Brands Program + Final CTA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Left: Founding Brands Program (Authentic Trust Builder) */}
          <div className="md:col-span-2 p-7 rounded-2xl border border-cyber-700 bg-cyber-900 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyber-gold font-semibold">
                  PROGRAMA DE MARCAS FUNDADORAS · CONVOCATORIA ABIERTA
                </span>
                <span className="text-[11px] font-mono text-slate-400">20 PLAZAS</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Buscamos 20 marcas independientes para documentar su próximo drop de principio a fin.
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                No publicamos testimonios inventados ni porcentajes sin fuente. Preferimos acompañarte en tu próximo lanzamiento real: congelamos tu tarifa de por vida y calibramos los patrones de tu colección contigo a cambio de documentar el caso de estudio.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyber-gold shrink-0" />
                <span>Precio congelado de por vida</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyber-gold shrink-0" />
                <span>Revisión de Tech Pack 1 a 1</span>
              </div>
              <div className="flex items-center gap-2">
                < ShieldCheck className="w-4 h-4 text-cyber-gold shrink-0" />
                <span>Propiedad 100% de tus archivos</span>
              </div>
            </div>
          </div>

          {/* Right: Final Action Card */}
          <div className="p-7 rounded-2xl border border-cyber-gold bg-cyber-900 flex flex-col justify-between text-left space-y-4">
            <div className="space-y-2">
              <span className="font-mono text-xs text-cyber-gold font-semibold block">
                PRUEBA SIN RIESGO
              </span>
              <h3 className="text-lg font-bold text-white">
                Empieza con tu primer boceto hoy.
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sube tu idea, revisa la prenda en 3D y descarga tu primera vista sin ingresar tarjeta.
              </p>
            </div>

            <button
              onClick={onGetStarted}
              className="w-full py-3.5 px-4 rounded-xl bg-cyber-gold hover:bg-cyber-gold-light text-black font-bold text-xs tracking-wide shadow-gold-glow transition-all flex items-center justify-center gap-2"
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
