import React, { useState } from 'react';
import {
  History,
  GitBranch,
  RotateCcw,
  Sliders,
  Camera,
  Smartphone,
  Sparkles,
  Download,
  Share2,
  CheckCircle2,
  MessageSquare,
  Eye,
  Maximize2,
  Lock,
  Layers
} from 'lucide-react';

interface VersionCommit {
  id: string;
  tag: string;
  author: string;
  timestamp: string;
  changes: string;
  image: string;
  isCurrent?: boolean;
}

export const VersionControl3D: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'diff' | 'tryon' | 'arfilters'>('history');
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isWebcamActive, setIsWebcamActive] = useState<boolean>(false);

  const [commits, setCommits] = useState<VersionCommit[]>([
    {
      id: 'v2.0',
      tag: 'v2.0 - Aprobado por Cliente VIP Milán',
      author: 'Santiago V. (Director)',
      timestamp: 'Hoy, 07:15 AM',
      changes: 'Añadido herraje de titanio en cuello y optimización de silueta boxy.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
      isCurrent: true
    },
    {
      id: 'v1.2',
      tag: 'v1.2 - Variante Colorway Cyber Gold',
      author: 'Elena Rostova (Patronista)',
      timestamp: 'Ayer, 05:40 PM',
      changes: 'Cambio de paleta a Pantone 123 C y margen de costura 1cm en mangas.',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'v1.0',
      tag: 'v1.0 - Boceto 3D Base Inicial',
      author: 'Santiago V. (Director)',
      timestamp: '28 Ago, 10:20 AM',
      changes: 'Malla inicial generada por IA desde prompt de texto.',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'
    }
  ]);

  const [annotations, setAnnotations] = useState([
    { id: '1', author: 'Elena (Patronista)', text: 'Ajustar la holgura en sisa 0.5cm para mayor movilidad.', location: 'Hombro Izquierdo' },
    { id: '2', author: 'Comprador Milán', text: 'El tono Cyber Gold luce extraordinario bajo luz de pasarela.', location: 'Pecho / Cremallera' }
  ]);

  const handleRollback = (commitTag: string) => {
    alert(`¡Modelo 3D restaurado con éxito a la versión ${commitTag}!`);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-6 rounded-3xl border border-cyan-500/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <History className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                CONTROL DE VERSIONES 3D ("GIT PARA MODA") & TRY-ON AR
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/50">
                HISTORIAL + SPLIT COMPARATOR + VIRTUAL MIRROR
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Historial de cambios 3D inmutable, comparador antes/después en pantalla dividida y probador virtual con cámara
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('¡Snapshot de versión v2.1 guardado en el árbol de versiones 3D!')}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:opacity-90 transition-all flex items-center gap-2"
        >
          <GitBranch className="w-4 h-4" />
          <span>Guardar Versión Actual (Commit)</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-cyber-950 p-2 rounded-2xl border border-cyber-800 text-xs">
        {[
          { id: 'history', label: 'Historial de Versiones (Git 3D)', icon: History },
          { id: 'diff', label: 'Comparador Split Slider (Antes vs Después)', icon: Sliders },
          { id: 'tryon', label: 'Espejo Virtual Try-On (Webcam)', icon: Camera },
          { id: 'arfilters', label: 'Filtros Instagram & TikTok (Spark AR)', icon: Smartphone }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-tech font-bold transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-black shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-cyber-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Version History & Annotations */}
      {activeTab === 'history' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
          {/* Commit Timeline (7 Cols) */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
            <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-cyan-400" /> Línea de Tiempo de Revisiones
            </h3>

            <div className="space-y-3">
              {commits.map((commit) => (
                <div
                  key={commit.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                    commit.isCurrent
                      ? 'bg-cyber-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'bg-cyber-950/60 border-cyber-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={commit.image} alt={commit.id} className="w-12 h-12 rounded-xl object-cover border border-white/20" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-tech font-bold text-sm text-white">{commit.tag}</span>
                        {commit.isCurrent && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">ACTUAL</span>
                        )}
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">{commit.changes}</p>
                      <span className="text-[10px] text-slate-500 block mt-1">{commit.author} • {commit.timestamp}</span>
                    </div>
                  </div>

                  {!commit.isCurrent && (
                    <button
                      onClick={() => handleRollback(commit.tag)}
                      className="px-3 py-1.5 rounded-xl bg-cyber-900 hover:bg-cyber-800 border border-cyber-700 text-cyan-300 font-bold text-[10px] uppercase flex items-center gap-1 shrink-0"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Revertir</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Spatial 3D Annotations (5 Cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
            <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-400" /> Anotaciones Espaciales del Equipo
            </h3>

            <div className="space-y-3">
              {annotations.map((ann) => (
                <div key={ann.id} className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-tech font-bold text-purple-300">{ann.author}</span>
                    <span className="text-slate-500 font-mono text-[10px]">{ann.location}</span>
                  </div>
                  <p className="text-slate-300 text-xs">{ann.text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const note = prompt('Escribe tu nota para anclarla en el modelo 3D:');
                if (note) {
                  setAnnotations([...annotations, { id: Date.now().toString(), author: 'Tú (Diseñador)', text: note, location: 'Cuerpo Principal' }]);
                }
              }}
              className="w-full py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500 text-purple-300 font-bold text-xs uppercase"
            >
              + Anclar Nueva Nota 3D
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Split Slider Visual Diff */}
      {activeTab === 'diff' && (
        <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
          <div className="flex items-center justify-between">
            <h3 className="font-tech font-bold text-base text-white">Comparador Visual Deslizable (Split Diff 3D)</h3>
            <span className="text-xs font-mono text-cyan-300 font-bold">Desliza para comparar v1.0 (Izquierda) vs v2.0 (Derecha)</span>
          </div>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-cyber-800 bg-black">
            {/* Version B (Right) */}
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=80"
              alt="Version 2.0"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Version A (Left with clip-path) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&auto=format&fit=crop&q=80"
                alt="Version 1.0"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_15px_#06b6d4]"
              style={{ left: `${sliderPos}%` }}
            />

            {/* Labels */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-black/80 border border-white/20 text-xs font-mono text-white">
              v1.0 (Anterior)
            </div>
            <div className="absolute top-4 right-4 px-3 py-1 rounded-xl bg-black/80 border border-cyan-400 text-xs font-mono text-cyan-300">
              v2.0 (Actual Aprobada)
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(parseInt(e.target.value))}
            className="w-full accent-cyan-400"
          />
        </div>
      )}

      {/* Tab 3: Virtual Try-On Mirror */}
      {activeTab === 'tryon' && (
        <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card text-center">
          <div className="max-w-md mx-auto space-y-3">
            <h3 className="font-tech font-bold text-lg text-white">Espejo Virtual Try-On con Cámara Frontal</h3>
            <p className="text-xs text-slate-400">
              Mapeo de la prenda 3D en tiempo real sobre tu silueta utilizando visión por computadora
            </p>

            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-black border border-cyan-400/50 flex items-center justify-center">
              {isWebcamActive ? (
                <div className="text-center space-y-2">
                  <span className="w-4 h-4 rounded-full bg-rose-500 animate-ping inline-block" />
                  <p className="font-mono text-xs text-cyan-300">CÁMARA CONECTADA • SILUETA DETECTADA</p>
                </div>
              ) : (
                <div className="text-center space-y-2 p-6">
                  <Camera className="w-10 h-10 text-slate-600 mx-auto" />
                  <span className="text-xs font-mono text-slate-400 block">Cámara en espera</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsWebcamActive(!isWebcamActive)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              {isWebcamActive ? 'Desactivar Cámara' : 'Activar Espejo Virtual (Webcam)'}
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Spark AR / TikTok Filter Exporter */}
      {activeTab === 'arfilters' && (
        <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card font-mono text-xs">
          <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-rose-400" /> Exportador de Filtros de Realidad Aumentada
          </h3>
          <p className="text-slate-400">Genera paquetes listos para subir a Meta Spark AR (Instagram Stories/Reels) y TikTok Effect House.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
              <span className="font-tech font-bold text-sm text-rose-400 block">Instagram / Facebook (Spark AR)</span>
              <p className="text-slate-400 text-[11px]">Paquete optimizado (.arexport) con tracking corporal y oclusión de prendas.</p>
              <button
                onClick={() => alert('¡Paquete .arexport para Spark AR descargado!')}
                className="w-full py-2 rounded-xl bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40 text-[10px] uppercase"
              >
                Descargar Paquete Spark AR
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
              <span className="font-tech font-bold text-sm text-cyan-400 block">TikTok (Effect House)</span>
              <p className="text-slate-400 text-[11px]">Proyecto de Effect House (.ehproj) con shader PBR y efectos de brillo reactivos a la música.</p>
              <button
                onClick={() => alert('¡Paquete .ehproj para TikTok Effect House descargado!')}
                className="w-full py-2 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 text-[10px] uppercase"
              >
                Descargar Proyecto TikTok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
