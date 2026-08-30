import React, { useState } from 'react';
import {
  Video,
  Sparkles,
  Play,
  Pause,
  Volume2,
  Wand2,
  RefreshCw,
  Sliders,
  Camera,
  Film,
  Scissors,
  Music,
  Type,
  TrendingUp,
  Flame,
  Share2,
  Download,
  Eye,
  Layers,
  Cpu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export type AIVideoEngine = 'sora' | 'runway' | 'kling' | 'luma' | 'midjourney';
export type CameraMove = 'orbit' | 'fpv' | 'zoom' | 'whippan' | 'dutch' | 'tracking';

export const AdGenAI: React.FC = () => {
  const { consumeCredit } = useAuth();
  const { t } = useLanguage();

  // Generation Configuration
  const [selectedEngine, setSelectedEngine] = useState<AIVideoEngine>('sora');
  const [cameraMove, setCameraMove] = useState<CameraMove>('orbit');
  const [prompt, setPrompt] = useState(
    'Hyper-realistic cinematic 4K commercial: A futuristic techwear jacket with glowing amber seams in a rainy Tokyo street at night. Neon reflections on wet asphalt, volumetric fog, dynamic camera whip pan around the product with cinematic slow motion.'
  );
  const [hookText, setHookText] = useState('DON\'T SLEEP ON THIS DROP 🔥');
  const [platform, setPlatform] = useState('TikTok / Reels (9:16)');
  const [quality, setQuality] = useState('4K Ultra HD (60fps)');
  const [length, setLength] = useState('15s');
  const [musicTrack, setMusicTrack] = useState('Dark Synth Cyberpunk Wave');
  const [videoSpeed, setVideoSpeed] = useState<number>(1.0);

  // States
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'timeline' | 'trends'>('prompt');
  const [timelinePlayhead, setTimelinePlayhead] = useState(4.5);

  const engines = [
    {
      id: 'sora' as AIVideoEngine,
      name: 'OpenAI Sora v2',
      badge: 'HIPERREALISMO 4K',
      color: 'border-emerald-500 text-emerald-400',
      desc: 'Máxima física de fluidos, telas realistas e iluminación raytraced.'
    },
    {
      id: 'runway' as AIVideoEngine,
      name: 'Runway Gen-3 Alpha',
      badge: 'CINE TURBO',
      color: 'border-cyber-gold text-cyber-gold',
      desc: 'Control de cámara cinematográfico y transiciones ultra dinámicas.'
    },
    {
      id: 'kling' as AIVideoEngine,
      name: 'Kling AI 1.5 HD',
      badge: 'MODELOS & MOVIMIENTO',
      color: 'border-purple-500 text-purple-400',
      desc: 'Comportamiento humano natural y simulación de prendas en pasarela.'
    },
    {
      id: 'luma' as AIVideoEngine,
      name: 'Luma Dream Machine',
      badge: '3D PRODUCT REVEAL',
      color: 'border-cyan-500 text-cyan-400',
      desc: 'Rotación orbital suave ideal para catálogos y e-commerce.'
    },
    {
      id: 'midjourney' as AIVideoEngine,
      name: 'Midjourney Video',
      badge: 'ANIME & CEL-SHADED',
      color: 'border-rose-500 text-rose-400',
      desc: 'Estilo artístico ilustrado, cómic y animación streetwear.'
    }
  ];

  const cameraMoves = [
    { id: 'orbit' as CameraMove, label: '360° Drone Orbit', icon: Camera },
    { id: 'fpv' as CameraMove, label: 'FPV Fly-Through', icon: Film },
    { id: 'zoom' as CameraMove, label: 'Dynamic Crash Zoom', icon: Sliders },
    { id: 'whippan' as CameraMove, label: 'Slow-Mo Whip Pan', icon: RefreshCw },
    { id: 'dutch' as CameraMove, label: 'Dutch Angle Tilt', icon: Camera },
    { id: 'tracking' as CameraMove, label: 'Runway Dolly Track', icon: Film }
  ];

  const handleGenerate = () => {
    if (!consumeCredit()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsPlaying(true);
    }, 2200);
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn transition-colors">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900 p-4 rounded-2xl border border-cyan-500/40 shadow-cyber-card">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500 text-cyan-400">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-tech font-bold text-white tracking-wide">
                AD-GEN AI • MOTOR MULTIMODELO DE VIDEO MARKETING
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                SORA v2 + GEN-3 + KLING HD
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Generación y edición de video publicitario cinemático con múltiples IAs y análisis de retención viral
            </p>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex bg-cyber-950 p-1 rounded-xl border border-cyber-800 text-xs">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'prompt' ? 'bg-cyber-gold text-black shadow-gold-glow font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" /> Generador Multi-IA
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'timeline' ? 'bg-cyber-gold text-black shadow-gold-glow font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" /> Editor Línea de Tiempo
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'trends' ? 'bg-cyber-gold text-black shadow-gold-glow font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Radar Viral TikTok
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Tools */}
        <div className="lg:col-span-7 space-y-4">
          {/* TAB 1: PROMPT & MULTI-AI SELECTOR */}
          {activeTab === 'prompt' && (
            <div className="bg-cyber-900 p-5 rounded-3xl border border-cyber-800 shadow-cyber-card space-y-4">
              {/* AI Engine Selection Grid */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                  Seleccionar Motor de Inteligencia Artificial:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {engines.map((eng) => (
                    <button
                      key={eng.id}
                      onClick={() => setSelectedEngine(eng.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedEngine === eng.id
                          ? `bg-cyber-950 ${eng.color} shadow-lg scale-102`
                          : 'bg-cyber-950/70 border-cyber-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-tech font-bold text-xs text-white">{eng.name}</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold block">{eng.badge}</span>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{eng.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Camera Movement Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                  Movimiento de Cámara Cinemático:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {cameraMoves.map((cam) => {
                    const Icon = cam.icon;
                    return (
                      <button
                        key={cam.id}
                        onClick={() => setCameraMove(cam.id)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                          cameraMove === cam.id
                            ? 'bg-cyber-gold text-black border-cyber-gold shadow-gold-glow font-bold'
                            : 'bg-cyber-950 border-cyber-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="truncate">{cam.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prompt Textarea */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
                  <Wand2 className="w-3.5 h-3.5 text-cyber-gold" /> Prompt de Dirección de Arte:
                </label>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-2xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-cyber-gold transition-colors leading-relaxed font-sans"
                />
              </div>

              {/* Specs Bar */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-800">
                  <span className="text-slate-500 block text-[10px]">Formato de Salida</span>
                  <span className="font-mono font-bold text-cyber-gold">9:16 Vertical</span>
                </div>
                <div className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-800">
                  <span className="text-slate-500 block text-[10px]">Resolución / FPS</span>
                  <span className="font-mono font-bold text-white">4K 60 FPS HDR</span>
                </div>
                <div className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-800">
                  <span className="text-slate-500 block text-[10px]">Duración Máxima</span>
                  <span className="font-mono font-bold text-white">15 Segundos</span>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-base uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>RENDERIZANDO CON {selectedEngine.toUpperCase()} EN GPU H100...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>GENERAR ANUNCIO DE VIDEO CINEMÁTICO</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* TAB 2: MULTI-TRACK TIMELINE EDITOR */}
          {activeTab === 'timeline' && (
            <div className="bg-cyber-900 p-5 rounded-3xl border border-cyber-800 shadow-cyber-card space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-cyber-800">
                <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-cyber-gold" /> Editor de Línea de Tiempo Multipista
                </h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Velocidad:</span>
                  {[0.5, 1.0, 2.0].map((s) => (
                    <button
                      key={s}
                      onClick={() => setVideoSpeed(s)}
                      className={`px-2 py-0.5 rounded-md font-mono ${
                        videoSpeed === s ? 'bg-cyber-gold text-black font-bold' : 'bg-cyber-950 text-slate-400'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Hook Text Input */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                  Texto Hook Viral en Pantalla (Subtítulo Dinámico):
                </label>
                <input
                  type="text"
                  value={hookText}
                  onChange={(e) => setHookText(e.target.value)}
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-gold"
                />
              </div>

              {/* Multi-Track Visual Editor */}
              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3 text-xs">
                {/* Track 1: Video Track */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                      <Film className="w-3.5 h-3.5" /> Pista 1: Video Clip 4K
                    </span>
                    <span className="font-mono">00:00 - 00:15</span>
                  </div>
                  <div className="relative h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 overflow-hidden flex items-center px-3">
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-cyber-gold shadow-gold-glow"
                      style={{ left: `${(timelinePlayhead / 15) * 100}%` }}
                    />
                    <span className="text-[10px] font-mono text-cyan-300 font-bold">
                      Clip_Tokyo_Techwear_Sora.mp4 ({videoSpeed}x)
                    </span>
                  </div>
                </div>

                {/* Track 2: Audio Track */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5 text-purple-400 font-bold">
                      <Music className="w-3.5 h-3.5" /> Pista 2: Audio & Beat
                    </span>
                    <span className="font-mono">{musicTrack}</span>
                  </div>
                  <div className="relative h-8 rounded-xl bg-purple-950/60 border border-purple-500/40 overflow-hidden flex items-center px-3">
                    <span className="text-[10px] font-mono text-purple-300">
                      ♫ Phonk_Drift_Bass_Drop.wav (Sidechain Ducking Activo)
                    </span>
                  </div>
                </div>

                {/* Track 3: Subtitles / Text Track */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5 text-cyber-gold font-bold">
                      <Type className="w-3.5 h-3.5" /> Pista 3: Hook Subtítulos
                    </span>
                    <span className="font-mono text-cyber-gold">{hookText}</span>
                  </div>
                  <div className="relative h-8 rounded-xl bg-amber-950/50 border border-cyber-gold/40 overflow-hidden flex items-center px-3">
                    <span className="text-[10px] font-mono text-cyber-gold font-bold">
                      [00:00 - 00:04] "{hookText}"
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline Slider */}
              <div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.1"
                  value={timelinePlayhead}
                  onChange={(e) => setTimelinePlayhead(Number(e.target.value))}
                  className="w-full accent-cyber-gold cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>00:00</span>
                  <span>00:05</span>
                  <span>00:10</span>
                  <span>00:15</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VIRAL TREND RADAR */}
          {activeTab === 'trends' && (
            <div className="bg-cyber-900 p-5 rounded-3xl border border-cyber-800 shadow-cyber-card space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-cyber-800">
                <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-400" /> Radar de Tendencias Virales & Algoritmo TikTok / Reels
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                  Score Viral: 96 / 100
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1.5">
                  <span className="font-tech font-bold text-xs text-cyber-gold uppercase block">
                    ⚡ Fórmula de Retención (Primeros 3 Segundos):
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Usa un <em>Crash Zoom</em> con destello neón y texto de gancho en mayúsculas para evitar que el usuario deslice hacia abajo en el feed.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1.5">
                  <span className="font-tech font-bold text-xs text-purple-400 uppercase block">
                    🎵 Audio en Tendencia Recomendado:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Pistas Dark Electro Wave & Phonk Bass están generando +240% de reproducciones completas en nichos de moda y diseño.
                  </p>
                </div>
              </div>

              {/* Trending Hashtags */}
              <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
                <span className="font-tech font-bold text-xs text-slate-300 uppercase block">
                  Hashtags de Alto Tráfico para Publicar:
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {['#techwear2026', '#3ddesign', '#streetwearfashion', '#cyberpunkstyle', '#aivideo', '#viralreels', '#aethersynergy'].map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-cyber-900 border border-cyber-700 text-cyan-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: 9:16 Vertical Video Player Stage */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-3xl bg-cyber-950 border-2 border-cyber-gold/50 shadow-gold-glow-lg overflow-hidden flex flex-col justify-between p-4 group">
            {/* Video Background Simulation */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80')`,
                transform: isPlaying ? 'scale(1.08)' : 'scale(1.0)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
            </div>

            {/* Top Badges */}
            <div className="relative z-10 flex items-center justify-between text-white">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyber-gold/50">
                <span className="text-cyber-gold font-tech font-bold text-xs">
                  {selectedEngine.toUpperCase()}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-emerald-400 border border-emerald-500/40">
                4K HDR 60fps
              </span>
            </div>

            {/* Center Play Button & Hook Overlay */}
            <div className="relative z-10 self-center text-center space-y-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-cyber-gold/95 text-black flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform mx-auto"
              >
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
              </button>

              {/* Dynamic Animated Subtitle Hook */}
              <div className="inline-block px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-cyber-gold text-cyber-gold font-tech font-extrabold text-sm uppercase tracking-wider shadow-lg animate-pulse">
                {hookText}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 space-y-2 text-center">
              <div className="font-tech font-extrabold text-lg text-white tracking-wider uppercase drop-shadow-md">
                AETHER NEO-TECH EDITION
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => alert('Descargando Video 4K Master en formato .MP4')}
                  className="flex-1 py-2.5 rounded-xl bg-cyber-gold text-black font-tech font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Descargar 4K
                </button>
                <button
                  onClick={() => alert('Enlace de video copiado al portapapeles para compartir con tu equipo.')}
                  className="p-2.5 rounded-xl bg-cyber-900/90 border border-cyber-700 text-white hover:border-cyber-gold"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1">
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-cyber-gold" /> {musicTrack}
                </span>
                <span>00:{length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
