import React, { useState } from 'react';
import {
  Scissors,
  Download,
  FileCode,
  FileText,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  CheckCircle2,
  Ruler,
  Info
} from 'lucide-react';

export const PatternCutting2D: React.FC = () => {
  const [selectedPiece, setSelectedPiece] = useState<string>('front');
  const [seamAllowance, setSeamAllowance] = useState<number>(1.0); // 1cm standard
  const [sizeScale, setSizeScale] = useState<string>('L');

  const patternPieces = [
    {
      id: 'front',
      name: 'Torso Delantero (Front Body)',
      dimensions: '58cm x 72cm',
      fabric: 'Algodón GOTS 460 GSM',
      points: 'M 50,50 L 250,50 L 280,180 L 240,400 L 60,400 L 20,180 Z',
      grainline: { x1: 150, y1: 80, x2: 150, y2: 360 }
    },
    {
      id: 'back',
      name: 'Torso Espalda (Back Body)',
      dimensions: '60cm x 75cm',
      fabric: 'Algodón GOTS 460 GSM',
      points: 'M 40,40 L 260,40 L 290,170 L 250,410 L 50,410 L 10,170 Z',
      grainline: { x1: 150, y1: 70, x2: 150, y2: 380 }
    },
    {
      id: 'sleeve_left',
      name: 'Manga Izquierda Raglán (Left Sleeve)',
      dimensions: '22cm x 65cm',
      fabric: 'Algodón GOTS 460 GSM',
      points: 'M 100,50 L 200,50 L 240,150 L 190,420 L 110,420 L 60,150 Z',
      grainline: { x1: 150, y1: 80, x2: 150, y2: 390 }
    },
    {
      id: 'hood',
      name: 'Capucha Ergonómica 3-Piezas (Hood)',
      dimensions: '35cm x 42cm',
      fabric: 'Forro Interior Térmico + Exterior',
      points: 'M 60,80 Q 220,40 260,180 L 230,350 L 70,350 L 40,220 Z',
      grainline: { x1: 150, y1: 100, x2: 150, y2: 320 }
    }
  ];

  const activePattern = patternPieces.find((p) => p.id === selectedPiece) || patternPieces[0];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-5 rounded-3xl border border-cyan-500/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500 text-cyan-400">
            <Scissors className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                PATRONAJE DIGITAL INDUSTRIAL 2D (DXF / AAMA)
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/50">
                CAD / CAM READY
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Despiece plano paramétrico 2D listo para mesas de corte láser y plotters de confección industrial (Gerber, Lectra, Optitex)
            </p>
          </div>
        </div>

        {/* Global Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('¡Archivo .DXF / AAMA exportado con capas de corte, margen de costura y piquetes!')}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-1.5 transition-all"
          >
            <FileCode className="w-4 h-4" />
            <span>Descargar .DXF (AAMA / ASTM)</span>
          </button>

          <button
            onClick={() => alert('¡Patrón 2D a Escala 1:1 descargado en PDF de Gran Formato (Plotter A0)!')}
            className="px-4 py-2.5 rounded-xl bg-cyber-950 border border-cyber-700 hover:border-cyber-gold text-cyber-gold font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>PDF Plotter 1:1</span>
          </button>
        </div>
      </div>

      {/* 2-Column Workstation: Pattern Vector Viewport + Pattern Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: 2D Interactive CAD Canvas */}
        <div className="lg:col-span-8 bg-cyber-950 rounded-3xl border border-cyber-800 p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[480px]">
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Piece Title Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-cyber-900/90 border border-cyan-500/50 text-cyan-300 font-mono text-xs font-bold">
              PIEZA: {activePattern.name} • TALLA {sizeScale}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-cyber-900 border border-cyber-800 text-slate-400 font-mono text-xs">
              Margen: +{seamAllowance} cm
            </span>
          </div>

          {/* Interactive SVG Pattern Canvas */}
          <svg viewBox="0 0 320 460" className="w-72 sm:w-80 h-auto filter drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            {/* Cut Line (Outer with Seam Allowance) */}
            <path
              d={activePattern.points}
              fill="rgba(6, 182, 212, 0.08)"
              stroke="#06b6d4"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Inner Stitching Line (Guide Dotted) */}
            <path
              d={activePattern.points}
              fill="none"
              stroke="#e5a93c"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              transform="scale(0.92) translate(12, 16)"
            />

            {/* Grainline Arrow (Hilo de la tela) */}
            <line
              x1={activePattern.grainline.x1}
              y1={activePattern.grainline.y1}
              x2={activePattern.grainline.x2}
              y2={activePattern.grainline.y2}
              stroke="#a855f7"
              strokeWidth="2"
              strokeDasharray="6 3"
            />
            <text
              x={activePattern.grainline.x1 + 8}
              y={(activePattern.grainline.y1 + activePattern.grainline.y2) / 2}
              fill="#c084fc"
              fontSize="9"
              fontFamily="monospace"
              className="select-none"
            >
              HILO DE LA TELA ↕
            </text>

            {/* Notch Marks (Piquetes de unión) */}
            <circle cx="150" cy="50" r="3.5" fill="#f43f5e" />
            <circle cx="280" cy="180" r="3.5" fill="#f43f5e" />
            <circle cx="20" cy="180" r="3.5" fill="#f43f5e" />
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 bg-cyber-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-cyber-800">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-cyan-400" /> Línea de Corte Láser
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 border-b border-dashed border-cyber-gold" /> Línea de Costura (+{seamAllowance}cm)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Piquetes de Ensamble
            </span>
          </div>
        </div>

        {/* Right 4 Cols: Piece Selector & Industrial Specs */}
        <div className="lg:col-span-4 space-y-4">
          {/* Piece Selector */}
          <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-3 shadow-cyber-card">
            <h3 className="font-tech font-bold text-sm text-slate-300 uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" /> Despiece de Patrones (4 Piezas):
            </h3>

            <div className="space-y-2">
              {patternPieces.map((piece) => (
                <button
                  key={piece.id}
                  onClick={() => setSelectedPiece(piece.id)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    selectedPiece === piece.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                      : 'bg-cyber-950 border-cyber-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div>
                    <span className="font-tech font-bold text-xs block">{piece.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">{piece.dimensions}</span>
                  </div>
                  {selectedPiece === piece.id && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Seam Allowance & Size Selector */}
          <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card text-xs">
            <div>
              <div className="flex justify-between font-tech font-bold text-slate-300 mb-1.5">
                <span>Margen de Costura (Seam Allowance):</span>
                <span className="text-cyan-400 font-mono">{seamAllowance} cm</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.5"
                value={seamAllowance}
                onChange={(e) => setSeamAllowance(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <label className="font-tech font-bold text-slate-300 block mb-1.5">Escalado de Talla Industrial:</label>
              <div className="grid grid-cols-5 gap-1.5 text-center font-mono font-bold">
                {['XS', 'S', 'M', 'L', 'XL'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSizeScale(sz)}
                    className={`py-2 rounded-xl border transition-all ${
                      sizeScale === sz
                        ? 'bg-cyber-gold text-black border-cyber-gold shadow-gold-glow'
                        : 'bg-cyber-950 border-cyber-800 text-slate-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
