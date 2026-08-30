import React, { useState } from 'react';
import {
  Film,
  Video,
  Play,
  RotateCw,
  Sparkles,
  Download,
  Share2,
  Sliders,
  Maximize2,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';

export const CinematicTurntable: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<string>('glamour');
  const [selectedRatio, setSelectedRatio] = useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [resolution, setResolution] = useState<'4k' | '1080p'>('4k');
  const [fps, setFps] = useState<'60' | '30'>('60');
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [renderProgress, setRenderProgress] = useState<number>(0);

  const presets = [
    {
      id: 'glamour',
      name: 'Studio Glamour 360°',
      desc: 'Rotación suave continua con desenfoque de fondo bokeh y destellos dorados.',
      tag: 'VIRAL REELS'
    },
    {
      id: 'speedramp',
      name: 'Speed Ramp & Dynamic Zoom',
      desc: 'Giro rápido inicial + zoom dramático a costuras y cámara lenta a 60 FPS.',
      tag: 'TIKTOK TREND'
    },
    {
      id: 'macro',
      name: 'Macro Textil & Detalles',
      desc: 'Recorrido en primer plano destacando tiradores de cremallera y logos reflectivos.',
      tag: 'E-COMMERCE'
    },
    {
      id: 'spotlight',
      name: 'Pasarela Spotlight Alto Contraste',
      desc: 'Foco cenital dramático simulando iluminación de pasarela de Milán.',
      tag: 'HIGH FASHION'
    }
  ];

  const handleStartRender = () => {
    setIsRendering(true);
    setRenderProgress(0);
    const interval = setInterval(() => {
      setRenderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          alert('¡Video Cinemático 360° en 4K (60 FPS) renderizado y listo para descargar!');
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-6 rounded-3xl border border-rose-500/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                GENERADOR DE VIDEOS CINEMÁTICOS 360° (TURNTABLE 4K)
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/50">
                60 FPS CINEMA EXPORT
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Renderiza videos de alta producción con movimientos de cámara profesionales, bokeh e iluminación para redes sociales
            </p>
          </div>
        </div>

        <button
          onClick={handleStartRender}
          disabled={isRendering}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:opacity-90 transition-all flex items-center gap-2"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{isRendering ? `Renderizando (${renderProgress}%)...` : 'Renderizar Video MP4 (4K 60FPS)'}</span>
        </button>
      </div>

      {/* Main Studio Viewport & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Video Preview Turntable Player */}
        <div className="lg:col-span-7 bg-cyber-900 border border-cyber-800 rounded-3xl p-4 flex flex-col justify-between shadow-cyber-card">
          <div className="relative aspect-[9/16] sm:aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=80"
              alt="Cinematic Turntable Preview"
              className="w-full h-full object-cover animate-pulse opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Live Camera Track HUD */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-[11px] font-mono font-bold text-white bg-black/70 px-2.5 py-1 rounded-lg border border-white/20">
                REC • 4K UHD @ 60 FPS • {selectedRatio}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-xs font-tech font-bold text-white uppercase tracking-wider bg-black/60 px-3 py-1 rounded-xl">
                PRESET: {selectedPreset.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-cyber-gold font-bold">DURACIÓN: 10s LOOP</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Codificación: H.264 / ProRes 422</span>
            <span>Audio: Beat Sintetizado 128 BPM</span>
          </div>
        </div>

        {/* Right 5 Cols: Presets & Aspect Ratio Switcher */}
        <div className="lg:col-span-5 space-y-4">
          {/* Aspect Ratio Selector */}
          <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-3">
            <span className="font-tech font-bold text-xs text-slate-300 block">Formato & Proporción de Video:</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '9:16', label: '9:16', desc: 'Reels / TikTok' },
                { id: '1:1', label: '1:1', desc: 'Feed Cuadrado' },
                { id: '16:9', label: '16:9', desc: 'YouTube 4K' }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRatio(r.id as any)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedRatio === r.id
                      ? 'bg-rose-500 text-white border-rose-400 shadow-md font-bold'
                      : 'bg-cyber-950 border-cyber-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block font-tech font-bold text-sm">{r.label}</span>
                  <span className="text-[10px] font-mono opacity-80 block">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Camera Motion Presets */}
          <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-3">
            <span className="font-tech font-bold text-xs text-slate-300 block">Movimiento de Cámara Cinemático:</span>
            <div className="space-y-2">
              {presets.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPreset(p.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedPreset === p.id
                      ? 'bg-cyber-950 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
                      : 'bg-cyber-950/60 border-cyber-800 hover:border-cyber-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-tech font-bold text-xs text-white">{p.name}</h4>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
