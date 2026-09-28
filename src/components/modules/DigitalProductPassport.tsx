import React, { useState } from 'react';
import { QrCode, ShieldCheck, Leaf, Globe, CheckCircle2, Download, Zap } from 'lucide-react';

export const DigitalProductPassport: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowQR(true);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-cyber-950 text-slate-200 p-6 sm:p-8 overflow-y-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider rounded border border-emerald-500/30">
            COMPLIANCE EU 2026 (ESPR)
          </span>
        </div>
        <h1 className="text-3xl font-tech font-bold text-white flex items-center gap-3">
          <QrCode className="w-8 h-8 text-emerald-400" />
          EU Digital Product Passport (DPP)
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Generador automatizado de pasaportes digitales obligatorios para comercializar moda en la Unión Europea. Trazabilidad blockchain, huella hídrica y reciclabilidad.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-cyber-900 border border-cyber-800 p-6 rounded-3xl space-y-4">
            <h3 className="font-tech font-bold text-lg text-white">Extracción de Datos del Modelo 3D</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-cyber-950 rounded-xl border border-cyber-800">
                <span className="text-sm text-slate-400 flex items-center gap-2"><Leaf className="w-4 h-4"/> Composición Principal</span>
                <span className="text-sm font-bold text-white">85% Algodón Orgánico, 15% RPET</span>
              </div>
              <div className="flex justify-between p-3 bg-cyber-950 rounded-xl border border-cyber-800">
                <span className="text-sm text-slate-400 flex items-center gap-2"><Globe className="w-4 h-4"/> Origen de Manufactura</span>
                <span className="text-sm font-bold text-white">Guimarães, Portugal (Fábrica #482)</span>
              </div>
              <div className="flex justify-between p-3 bg-cyber-950 rounded-xl border border-cyber-800">
                <span className="text-sm text-slate-400 flex items-center gap-2"><Zap className="w-4 h-4"/> Huella de Carbono (Est.)</span>
                <span className="text-sm font-bold text-emerald-400">2.4 kg CO2e (Bajo)</span>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating || showQR}
              className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-tech font-bold uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isGenerating ? 'Escribiendo en Blockchain...' : showQR ? 'DPP Generado Exitosamente' : 'Generar Pasaporte (ESPR)'}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center bg-cyber-900 border border-cyber-800 p-6 rounded-3xl min-h-[400px]">
          {showQR ? (
            <div className="text-center space-y-4 animate-fadeIn">
              <div className="w-48 h-48 mx-auto bg-white p-4 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] border-2 border-emerald-500">
                {/* Simulación de QR usando grid puro para el prototipo */}
                <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-1">
                   <div className="bg-black rounded-sm"></div><div className="bg-black rounded-sm"></div><div className="bg-transparent"></div><div className="bg-black rounded-sm"></div>
                   <div className="bg-black rounded-sm"></div><div className="bg-transparent"></div><div className="bg-black rounded-sm"></div><div className="bg-black rounded-sm"></div>
                   <div className="bg-transparent"></div><div className="bg-black rounded-sm"></div><div className="bg-black rounded-sm"></div><div className="bg-transparent"></div>
                   <div className="bg-black rounded-sm"></div><div className="bg-black rounded-sm"></div><div className="bg-transparent"></div><div className="bg-black rounded-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-5 h-5" /> DPP Verificado & Activo
              </div>
              <button className="flex items-center justify-center gap-2 w-full py-2 bg-cyber-950 border border-cyber-800 rounded-lg text-sm text-slate-300 hover:text-white">
                <Download className="w-4 h-4" /> Exportar Etiqueta (PDF)
              </button>
            </div>
          ) : (
             <div className="text-center text-slate-500 font-mono text-sm">
                <QrCode className="w-16 h-16 mx-auto mb-3 opacity-20" />
                Esperando orden de generación...
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
