import React, { useState, useRef } from 'react';
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
  Cpu,
  Monitor,
  Smartphone,
  Square,
  Clock,
  Zap,
  Gauge,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export type AIVideoEngine = 'sora' | 'runway' | 'kling' | 'luma' | 'midjourney';
export type CameraMove = 'orbit' | 'fpv' | 'zoom' | 'whippan' | 'dutch' | 'tracking';
export type VideoAspectRatio = '9:16' | '16:9' | '1:1' | '4:5';
export type VideoQuality = '4K' | '1080p' | '720p' | 'prores';
export type VideoDuration = '5s' | '15s' | '30s' | '60s';

export const AdGenAI: React.FC = () => {
  const { consumeCredit } = useAuth();
  const { t } = useLanguage();

  // Generation Configuration
  const [selectedEngine, setSelectedEngine] = useState<AIVideoEngine>('sora');
  const [cameraMove, setCameraMove] = useState<CameraMove>('zoom');
  const [prompt, setPrompt] = useState(
    'Hyper-realistic cinematic 4K commercial: A futuristic techwear jacket with glowing amber seams in a rainy Tokyo street at night. Neon reflections on wet asphalt, volumetric fog, dynamic camera whip pan around the product with cinematic slow motion.'
  );
  const [hookText, setHookText] = useState('DON\'T SLEEP ON THIS DROP 🔥');
  
  // 📐 Formato, Calidad y Tiempo Interactivos
  const [aspectRatio, setAspectRatio] = useState<VideoAspectRatio>('9:16');
  const [quality, setQuality] = useState<VideoQuality>('4K');
  const [duration, setDuration] = useState<VideoDuration>('15s');
  const [musicTrack, setMusicTrack] = useState('Trap Neón 140 BPM');
  const [videoSpeed, setVideoSpeed] = useState<number>(1.0);
  const [subtitleStyle, setSubtitleStyle] = useState<'neon' | 'gold' | 'typewriter'>('neon');

  // 🎵 Web Audio AI Synthesizer State
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleToggleSynth = () => {
    if (isSynthPlaying) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsSynthPlaying(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        // Generate melodic Cyber Synth beat
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(110, now); // A2
        osc1.frequency.exponentialRampToValueAtTime(220, now + 0.4);

        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

        osc1.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 1.2);

        setIsSynthPlaying(true);
        setTimeout(() => setIsSynthPlaying(false), 1200);
      } catch {
        setIsSynthPlaying(false);
      }
    }
  };

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
    { id: 'zoom' as CameraMove, label: 'Crash Zoom (Gancho Viral)', icon: Sliders },
    { id: 'orbit' as CameraMove, label: '360° Drone Orbit', icon: Camera },
    { id: 'fpv' as CameraMove, label: 'FPV Fly-Through', icon: Film },
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

  // Helper for dynamic player aspect ratio class
  const getPlayerAspectClass = () => {
    switch (aspectRatio) {
      case '16:9':
        return 'aspect-video max-w-full';
      case '1:1':
        return 'aspect-square max-w-[360px]';
      case '4:5':
        return 'aspect-[4/5] max-w-[340px]';
      case '9:16':
      default:
        return 'aspect-[9/16] max-w-[320px]';
    }
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
              Generación y edición de video publicitario cinemático con formato, calidad y duración personalizables
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
                  1. Seleccionar Motor de Inteligencia Artificial:
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

              {/* 📐 2. FORMATO, CALIDAD Y TIEMPO DEL VIDEO (SUPER INTERACTIVOS) */}
              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-gold/40 shadow-md space-y-3.5">
                <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
                  <span className="font-tech font-bold text-xs uppercase text-cyber-gold flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> 2. CONFIGURACIÓN DEL VIDEO (FORMATO, CALIDAD Y DURACIÓN)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    ADAPTATIVO EN VIVO
                  </span>
                </div>

                {/* Formato / Proporción */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1.5 flex items-center justify-between">
                    <span>Proporción / Formato de Pantalla:</span>
                    <span className="text-cyber-gold font-mono text-[10px] font-bold">
                      {aspectRatio === '9:16' ? 'TikTok / Reels / Shorts' : aspectRatio === '16:9' ? 'YouTube / TV Horizontal' : aspectRatio === '1:1' ? 'Instagram Feed Cuadrado' : 'Instagram Portrait'}
                    </span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: '9:16' as VideoAspectRatio, label: '9:16 Vertical', icon: Smartphone },
                      { id: '16:9' as VideoAspectRatio, label: '16:9 Horizontal', icon: Monitor },
                      { id: '1:1' as VideoAspectRatio, label: '1:1 Cuadrado', icon: Square },
                      { id: '4:5' as VideoAspectRatio, label: '4:5 Retrato', icon: Film }
                    ].map((fmt) => {
                      const Icon = fmt.icon;
                      const isSel = aspectRatio === fmt.id;
                      return (
                        <button
                          key={fmt.id}
                          type="button"
                          onClick={() => setAspectRatio(fmt.id)}
                          className={`p-2 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                            isSel
                              ? 'bg-cyber-gold text-black border-cyber-gold shadow-gold-glow'
                              : 'bg-cyber-900 border-cyber-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-[10px] font-mono">{fmt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Calidad de Render y Duración */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Calidad */}
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                      Calidad de Render:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono font-bold">
                      {[
                        { id: '4K' as VideoQuality, label: '4K HDR (60fps)' },
                        { id: '1080p' as VideoQuality, label: '1080p Full HD' },
                        { id: '720p' as VideoQuality, label: '720p Rápido' },
                        { id: 'prores' as VideoQuality, label: 'ProRes 422 Cine' }
                      ].map((q) => (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => setQuality(q.id)}
                          className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                            quality === q.id
                              ? 'bg-cyan-400 text-black border-cyan-400 shadow-cyan-glow'
                              : 'bg-cyber-900 border-cyber-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {q.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duración */}
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                      Tiempo / Duración:
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 text-[10px] font-mono font-bold">
                      {[
                        { id: '5s' as VideoDuration, label: '5s' },
                        { id: '15s' as VideoDuration, label: '15s' },
                        { id: '30s' as VideoDuration, label: '30s' },
                        { id: '60s' as VideoDuration, label: '60s' }
                      ].map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDuration(d.id)}
                          className={`py-1.5 rounded-lg border text-center transition-all ${
                            duration === d.id
                              ? 'bg-purple-500 text-white border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                              : 'bg-cyber-900 border-cyber-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Banda Sonora / Beat IA */}
                <div className="pt-1">
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1.5 flex items-center justify-between">
                    <span>Banda Sonora / Beat Comercial con IA:</span>
                    <button
                      type="button"
                      onClick={handleToggleSynth}
                      className="text-purple-300 hover:underline text-[10px] font-mono flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" /> {isSynthPlaying ? 'Detener' : 'Probar Sintetizador en Vivo'}
                    </button>
                  </label>
                  <select
                    value={musicTrack}
                    onChange={(e) => setMusicTrack(e.target.value)}
                    className="w-full bg-cyber-900 border border-cyber-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-gold cursor-pointer"
                  >
                    <option value="Trap Neón 140 BPM">🔥 Trap Neón 140 BPM (Sub-bass 808 pesado para Moda)</option>
                    <option value="Cyber Synthwave 120 BPM">⚡ Cyber Synthwave 120 BPM (Arpegios analógicos retro)</option>
                    <option value="Lo-Fi Chill 85 BPM">☕ Lo-Fi Chill Hop 85 BPM (Ambiente relajado e interiores)</option>
                    <option value="Cinematic Epic 100 BPM">🎬 Cinematic Epic Tech 100 BPM (Cuerdas y percusión pesada)</option>
                    <option value="Phonk Drift 135 BPM">🏎️ Phonk Drift Bass 135 BPM (Cowbell distorsionado viral)</option>
                  </select>
                </div>
              </div>

              {/* Camera Movement Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                  3. Movimiento de Cámara Cinemático:
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
                  <Wand2 className="w-3.5 h-3.5 text-cyber-gold" /> 4. Prompt de Dirección de Arte:
                </label>
                <textarea
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-2xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-cyber-gold transition-colors leading-relaxed font-sans"
                />
              </div>

              {/* ⚡ 5. ANALIZADOR PREDICTIVO DE RETENCIÓN IA (DE 3 SEGUNDOS) - MUY VISIBLE */}
              <div className="p-4 rounded-2xl bg-cyber-950 border border-emerald-500/40 shadow-md space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      <Gauge className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-tech font-bold text-xs uppercase text-white block">
                        ANALIZADOR PREDICTIVO DE RETENCIÓN (PRIMEROS 3 SEGUNDOS)
                      </span>
                      <span className="text-[10px] text-slate-400">Algoritmo predictivo entrenado con 500k videos virales</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-tech font-extrabold text-emerald-400 block leading-tight">96%</span>
                    <span className="text-[9px] font-mono text-emerald-300 uppercase font-bold">Gancho Explosivo</span>
                  </div>
                </div>

                {/* Visual Retention Curve */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>0s (100%)</span>
                    <span>1s (98%)</span>
                    <span>2s (97%)</span>
                    <span className="text-emerald-400 font-bold">3s (96% Retención)</span>
                    <span>15s (89%)</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-cyber-900 overflow-hidden flex border border-cyber-800">
                    <div className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 w-[96%]" />
                    <div className="bg-rose-500 w-[4%]" />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-cyber-900 border border-cyber-800 text-[11px] text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Diagnóstico IA:</strong> Movimiento <em>Crash Zoom</em> y subtítulo neón activados en el segundo 0. Cero riesgo de abandono en feed.
                  </span>
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
                    <span>RENDERIZANDO EN {quality} ({duration}) CON {selectedEngine.toUpperCase()}...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>GENERAR ANUNCIO {aspectRatio} • {quality} ({duration})</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* TAB 2: TIMELINE EDITOR */}
          {activeTab === 'timeline' && (
            <div className="bg-cyber-900 p-5 rounded-3xl border border-cyber-800 shadow-cyber-card space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-cyber-800">
                <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-cyber-gold" /> Editor de Línea de Tiempo Multipista
                </h3>
                <span className="text-slate-400 font-mono text-xs">Duración: {duration}</span>
              </div>

              {/* Subtitle Hook Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-cyber-gold" /> Texto de Gancho en Pantalla (Hook Subtítulo):
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
                      <Film className="w-3.5 h-3.5" /> Pista 1: Video Clip ({aspectRatio})
                    </span>
                    <span className="font-mono">00:00 - 00:{duration}</span>
                  </div>
                  <div className="relative h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 overflow-hidden flex items-center px-3">
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-cyber-gold shadow-gold-glow"
                      style={{ left: `${(timelinePlayhead / 15) * 100}%` }}
                    />
                    <span className="text-[10px] font-mono text-cyan-300 font-bold">
                      Clip_Tokyo_Techwear_{selectedEngine}.mp4 ({quality})
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
                      ♫ {musicTrack} (Sidechain Ducking Activo)
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
                      [00:00 - 00:03] "{hookText}"
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
                  <span>00:{duration}</span>
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

        {/* Right Column: Dynamic Aspect Ratio Video Player Stage */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className={`relative w-full ${getPlayerAspectClass()} rounded-3xl bg-cyber-950 border-2 border-cyber-gold/50 shadow-gold-glow-lg overflow-hidden flex flex-col justify-between p-4 group transition-all duration-500`}>
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
                <span className="text-slate-400 text-[10px] font-mono font-bold">({aspectRatio})</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-emerald-400 border border-emerald-500/40 font-bold">
                {quality} • {duration}
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

              {/* Dynamic Animated Subtitle Hook (TikTok Style) */}
              <div className={`inline-block px-3 py-1.5 rounded-xl backdrop-blur-md font-tech font-extrabold text-sm uppercase tracking-wider shadow-lg animate-pulse ${
                subtitleStyle === 'neon'
                  ? 'bg-black/85 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                  : subtitleStyle === 'gold'
                  ? 'bg-black/85 border border-cyber-gold text-cyber-gold shadow-gold-glow'
                  : 'bg-white text-black'
              }`}>
                {hookText}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 space-y-2 text-center">
              {/* Web Audio Synth Quick Play */}
              <button
                type="button"
                onClick={handleToggleSynth}
                className="w-full py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-300 font-mono text-[10px] font-bold uppercase flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Music className="w-3.5 h-3.5" />
                <span>{isSynthPlaying ? '♫ Sintetizador Sonando...' : '♫ Probar Beat Sintetizado IA (Web Audio)'}</span>
              </button>

              <div className="font-tech font-extrabold text-base text-white tracking-wider uppercase drop-shadow-md">
                AETHER NEO-TECH EDITION
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Descargando Video ${quality} Master en formato .MP4 (${aspectRatio}, ${duration})`)}
                  className="flex-1 py-2.5 rounded-xl bg-cyber-gold text-black font-tech font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Descargar {quality}
                </button>
                <button
                  onClick={() => alert('Enlace de video copiado al portapapeles para compartir con tu equipo.')}
                  className="p-2.5 rounded-xl bg-cyber-900/90 border border-cyber-700 text-white hover:border-cyber-gold"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 font-mono">
                <span className="flex items-center gap-1 truncate max-w-[180px]">
                  <Volume2 className="w-3 h-3 text-cyber-gold shrink-0" /> {musicTrack}
                </span>
                <span className="font-bold text-cyber-gold">00:{duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
