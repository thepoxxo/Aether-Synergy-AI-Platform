import React, { useState, useEffect } from 'react';
import { Radar, TrendingUp, Hash, Flame, Sparkles } from 'lucide-react';

export const TrendSpiderAgent: React.FC = () => {
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setScanning(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex flex-col bg-cyber-950 text-slate-200 p-6 sm:p-8 overflow-y-auto">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-rose-500/20 text-rose-400 text-[10px] font-mono font-bold uppercase tracking-wider rounded border border-rose-500/30 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              SCRAPING TIKTOK API (LIVE)
            </span>
          </div>
          <h1 className="text-3xl font-tech font-bold text-white flex items-center gap-3">
            <Radar className="w-8 h-8 text-rose-400" />
            Agente "Araña" de Tendencias
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">
            Rastrea picos de viralidad en TikTok y Pinterest en tiempo real. La IA detecta micro-tendencias y pre-diseña colecciones antes de que la competencia se entere.
          </p>
        </div>
      </div>

      {scanning ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative">
            <Radar className="w-24 h-24 text-rose-500 animate-ping opacity-20 absolute inset-0" />
            <Radar className="w-24 h-24 text-rose-400 relative z-10" />
          </div>
          <h3 className="mt-6 text-xl font-tech font-bold text-white animate-pulse">Analizando 2.4M videos...</h3>
          <p className="text-slate-500 font-mono text-sm mt-2">Buscando patrones en #FashionTikTok</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-cyber-900 border border-cyber-800 p-6 rounded-3xl">
              <h3 className="font-tech font-bold text-lg text-white mb-4 flex items-center gap-2"><Flame className="w-5 h-5 text-orange-500"/> Micro-Tendencias Detectadas (Hoy)</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-cyber-950 border border-rose-500/30 rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp className="w-12 h-12 text-rose-500"/></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-rose-400 font-bold text-lg">Gorpcore Reflectivo</span>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-1 bg-cyber-800 rounded text-[10px] text-slate-300 font-mono"><Hash className="w-3 h-3 inline"/> techwear</span>
                        <span className="px-2 py-1 bg-cyber-800 rounded text-[10px] text-slate-300 font-mono"><Hash className="w-3 h-3 inline"/> gorpcore2026</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">+482%</p>
                      <p className="text-[10px] text-slate-400">Velocidad (24h)</p>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 bg-rose-600/20 text-rose-300 border border-rose-500/50 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-rose-600/40 transition-colors">
                    <Sparkles className="w-4 h-4"/> IA: Auto-Diseñar Colección Cápsula
                  </button>
                </div>

                <div className="p-4 bg-cyber-950 border border-cyber-800 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="text-white font-bold">Y2K Metallic Denim</span>
                    <p className="text-[10px] text-slate-400 mt-1">2.1M views en las últimas 6 horas</p>
                  </div>
                  <span className="text-emerald-400 font-bold">+124%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cyber-900 border border-cyber-800 p-6 rounded-3xl flex flex-col">
            <h3 className="font-tech font-bold text-lg text-white mb-4">Feed Satelital</h3>
            <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="flex gap-3 items-center border-b border-cyber-800 pb-3">
                   <div className="w-10 h-16 bg-slate-800 rounded flex-shrink-0 animate-pulse"></div>
                   <div>
                     <p className="text-xs font-bold text-slate-300 line-clamp-2">"This new jacket is insane..."</p>
                     <p className="text-[9px] text-slate-500 mt-1">Viral Score: 98/100</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
