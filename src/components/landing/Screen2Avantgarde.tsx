import React from 'react';
import { Box, Video, FileText, Globe, ArrowRight, Scissors } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Screen2AvantgardeProps {
  onSelectModule: (module: string) => void;
}

export const Screen2Avantgarde: React.FC<Screen2AvantgardeProps> = ({ onSelectModule }) => {
  const { t } = useLanguage();

  const workflowSteps = [
    {
      id: 'aurora3d',
      step: 'PASO 01',
      title: 'Prueba la caída en 3D antes de cortar',
      desc: 'Ajusta gramaje (GSM), costuras, lavado y color sobre la prenda tridimensional. Detecta errores de proporción sin gastar en muestras físicas.',
      icon: Box,
      deliverable: 'Archivo .GLB / .OBJ + Vista 360°'
    },
    {
      id: 'clothify',
      step: 'PASO 02',
      title: 'Genera la ficha técnica y el patrón',
      desc: 'Obtén el Tech Pack en PDF con tabla de medidas graduadas (XS a XXL), consumo de tela por prenda, avíos y desglose de costo unitario.',
      icon: FileText,
      deliverable: 'Tech Pack PDF + Corte .DXF'
    },
    {
      id: 'adgen',
      step: 'PASO 03',
      title: 'Produce la campaña para pre-vender',
      desc: 'Crea fotos de producto en estudio y clips verticales 9:16 con estética de cámara 35 mm para validar la demanda de tu drop antes de fabricar.',
      icon: Video,
      deliverable: 'Tomas 9:16 + Lookbook de Producto'
    },
    {
      id: 'suppliers',
      step: 'PASO 04',
      title: 'Cotiza con talleres verificados',
      desc: 'Envía tu ficha técnica a talleres textiles con mínimo de producción (MOQ) claro, tiempos de entrega reales y verificación documental.',
      icon: Globe,
      deliverable: 'Cotización B2B con MOQ y plazos'
    }
  ];

  return (
    <section
      id="screen-avantgarde"
      className="relative py-20 px-4 lg:px-8 flex flex-col justify-center border-b border-cyber-800"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyber-900 border border-cyber-700 text-slate-300 font-mono text-xs">
            <Scissors className="w-3.5 h-3.5 text-cyber-gold" />
            <span>{t('avantgarde.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t('avantgarde.title')}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            {t('avantgarde.desc')}
          </p>
        </div>

        {/* 4 Sober Atelier Workflow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {workflowSteps.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-cyber-900 border border-cyber-700 hover:border-cyber-gold transition-all duration-200 cursor-pointer shadow-cyber-card"
              >
                <div className="space-y-4">
                  {/* Top Step & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-cyber-950 border border-cyber-700 flex items-center justify-center text-cyber-gold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-400">
                      {item.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyber-gold transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                {/* Deliverable & Action */}
                <div className="mt-6 pt-4 border-t border-cyber-800 space-y-3">
                  <div className="text-[11px] font-mono text-slate-300 bg-cyber-950 px-3 py-1.5 rounded-lg border border-cyber-800">
                    Entregable: {item.deliverable}
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-cyber-gold transition-colors">
                    <span>Abrir herramienta</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
