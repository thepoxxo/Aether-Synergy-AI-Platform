import React, { useState } from 'react';
import { Scissors, FileJson, ArrowRight, Settings2, Download } from 'lucide-react';

export const DXFExportEngine: React.FC = () => {
  const [progress, setProgress] = useState(0);

  const simulateTranslation = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="h-full flex flex-col bg-cyber-950 text-slate-200 p-6 sm:p-8 overflow-y-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-wider rounded border border-blue-500/30">
            AI-TO-CAD ENGINE
          </span>
        </div>
        <h1 className="text-3xl font-tech font-bold text-white flex items-center gap-3">
          <Scissors className="w-8 h-8 text-blue-400" />
          Motor de Traducción DXF
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Convierte la topología de la malla 3D generada por IA en planos de corte láser 2D (.DXF) milimétricamente exactos para producción industrial.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-cyber-900 border border-cyber-800 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[300px]">
           <div className="w-32 h-32 rounded-full border-4 border-dashed border-slate-700 flex items-center justify-center mb-4">
             <span className="font-tech text-slate-500">Malla 3D</span>
           </div>
           <p className="text-sm font-bold text-slate-300">Input: Chaqueta Cyber-Neon</p>
           <p className="text-xs text-slate-500 font-mono">Formato: .GLB (Polígonos)</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <button 
            onClick={simulateTranslation}
            className="p-4 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            <ArrowRight className="w-8 h-8 text-white" />
          </button>
          
          {progress > 0 && (
            <div className="w-full px-4">
              <div className="h-2 w-full bg-cyber-950 rounded-full overflow-hidden border border-cyber-800">
                <div className="h-full bg-blue-500 transition-all duration-100" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-center mt-2 text-[10px] font-mono text-blue-400">Calculando Geometría Euclidiana... {progress}%</p>
            </div>
          )}
        </div>

        <div className="bg-cyber-900 border border-cyber-800 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
          {progress === 100 ? (
            <div className="animate-fadeIn w-full h-full flex flex-col">
              <div className="flex-1 border border-blue-500/30 bg-blue-500/5 rounded-xl p-4 relative">
                 {/* Simulación de vectores DXF */}
                 <div className="absolute inset-0 p-4">
                   <svg width="100%" height="100%" viewBox="0 0 100 100" className="stroke-blue-400 fill-none" strokeWidth="0.5">
                     <path d="M20,20 L40,10 L60,10 L80,20 L80,80 L60,90 L40,90 L20,80 Z" strokeDasharray="2,2"/>
                     <circle cx="50" cy="30" r="5" />
                   </svg>
                 </div>
              </div>
              <button className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold text-sm">
                <Download className="w-4 h-4" /> Exportar CAD (.DXF)
              </button>
            </div>
          ) : (
            <div className="text-center text-slate-600">
              <FileJson className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="font-mono text-xs">Esperando conversión...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
