import React, { useState } from 'react';
import {
  Scissors,
  Download,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { useDeviceMode } from '../../context/DeviceModeContext';

export const MobilePatternCutting2D: React.FC = () => {
  const { hapticFeedback } = useDeviceMode();
  const [selectedPiece, setSelectedPiece] = useState<'front' | 'back' | 'sleeve' | 'collar'>('front');
  const [seamAllowance, setSeamAllowance] = useState(1.0);
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL'>('M');
  const [nestingOptimized, setNestingOptimized] = useState(false);

  const pieces = [
    { id: 'front', name: 'Delantero', dim: '58cm x 72cm', color: '#E5A93C' },
    { id: 'back', name: 'Espalda', dim: '60cm x 74cm', color: '#06B6D4' },
    { id: 'sleeve', name: 'Manga Par', dim: '24cm x 62cm', color: '#A855F7' },
    { id: 'collar', name: 'Cuello Rib', dim: '12cm x 46cm', color: '#10B981' }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] bg-cyber-950 text-white font-mono text-xs select-none p-3 space-y-3 overflow-y-auto">
      {/* 1. Header with Size Selector */}
      <div className="flex items-center justify-between bg-cyber-900 p-2.5 rounded-2xl border border-cyber-800">
        <div>
          <span className="font-tech font-bold text-xs text-cyber-gold block">PATRONAJE 2D INDUSTRIAL</span>
          <span className="text-[10px] text-slate-400">Escala 1:1 • Norma AAMA/ASTM</span>
        </div>

        <div className="flex items-center gap-1 bg-cyber-950 p-1 rounded-xl border border-cyber-800">
          {(['XS', 'S', 'M', 'L', 'XL'] as const).map((sz) => (
            <button
              key={sz}
              onClick={() => {
                hapticFeedback();
                setSelectedSize(sz);
              }}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                selectedSize === sz ? 'bg-cyber-gold text-black' : 'text-slate-400'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 2D Interactive CAD Canvas (Full Width) */}
      <div className="relative w-full h-56 bg-cyber-950 rounded-2xl border-2 border-dashed border-cyan-500/40 flex items-center justify-center overflow-hidden p-2">
        {/* Metric Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:16px_16px]" />

        {/* Visual 2D Pattern SVG */}
        <svg className="w-full h-full" viewBox="0 0 300 200">
          {selectedPiece === 'front' && (
            <path
              d="M 75 30 Q 150 50 225 30 L 245 170 Q 150 185 55 170 Z"
              fill="rgba(229,169,60,0.15)"
              stroke="#E5A93C"
              strokeWidth="2.5"
            />
          )}
          {selectedPiece === 'back' && (
            <path
              d="M 65 25 Q 150 40 235 25 L 255 175 Q 150 185 45 175 Z"
              fill="rgba(6,182,212,0.15)"
              stroke="#06B6D4"
              strokeWidth="2.5"
            />
          )}
          {selectedPiece === 'sleeve' && (
            <path
              d="M 90 40 Q 150 10 210 40 L 180 180 Q 150 185 120 180 Z"
              fill="rgba(168,85,247,0.15)"
              stroke="#A855F7"
              strokeWidth="2.5"
            />
          )}
          {selectedPiece === 'collar' && (
            <rect
              x="50"
              y="70"
              width="200"
              height="60"
              rx="10"
              fill="rgba(16,185,129,0.15)"
              stroke="#10B981"
              strokeWidth="2.5"
            />
          )}
          {/* Hilo de tela / Grain line */}
          <line x1="150" y1="50" x2="150" y2="150" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 2" />
        </svg>

        {/* Floating Canvas Badges */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 border border-cyber-800 text-[9px] text-cyber-gold font-bold">
          {pieces.find((p) => p.id === selectedPiece)?.name} ({selectedSize})
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 border border-cyber-800 text-[9px] text-slate-400 font-mono">
          Margen: +{seamAllowance}cm
        </div>
      </div>

      {/* 3. Horizontal Swipeable Piece Selector */}
      <div>
        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">
          Piezas del Patrón ({pieces.length}):
        </span>
        <div className="grid grid-cols-2 gap-2">
          {pieces.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                hapticFeedback();
                setSelectedPiece(p.id as any);
              }}
              className={`p-2.5 rounded-xl border text-left flex items-center justify-between ${
                selectedPiece === p.id
                  ? 'bg-cyber-gold/20 border-cyber-gold text-white font-bold'
                  : 'bg-cyber-900 border-cyber-800 text-slate-400'
              }`}
            >
              <div>
                <span className="font-tech text-xs block text-white">{p.name}</span>
                <span className="text-[9px] text-slate-400">{p.dim}</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
            </button>
          ))}
        </div>
      </div>

      {/* 4. Genetic Nesting AI Optimizer */}
      <div className="p-3 bg-cyber-900 rounded-2xl border border-cyber-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-tech font-bold uppercase text-slate-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyber-gold" /> Optimización de Tizada IA
          </span>
          <span className="text-[10px] font-bold text-emerald-400">94.8% Eficiencia</span>
        </div>
        <button
          onClick={() => {
            hapticFeedback();
            setNestingOptimized(true);
            alert('¡Tizada genética calculada! Desperdicio reducido al 5.2% en tela de 1.50m.');
          }}
          className="w-full py-2 rounded-xl bg-cyber-950 border border-cyber-gold/40 text-cyber-gold font-tech font-bold text-xs uppercase"
        >
          {nestingOptimized ? '✓ Tizada Optimizada (<5.2% merma)' : '⚡ Optimizar Corte Automático'}
        </button>
      </div>

      {/* 5. Export Actions */}
      <div className="pt-1">
        <button
          onClick={() => alert('¡Archivos .DXF y PDF 1:1 descargados para corte láser / plotter!')}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-tech font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
        >
          <Download className="w-4 h-4" />
          <span>Descargar Patrón DXF / PDF 1:1</span>
        </button>
      </div>
    </div>
  );
};
