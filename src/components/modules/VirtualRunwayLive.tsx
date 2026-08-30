import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  Camera,
  Users,
  MessageSquare,
  Sparkles,
  Heart,
  Flame,
  Share2,
  Download,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Layers,
  Send,
  Eye,
  Radio,
  Sliders,
  CheckCircle2,
  Globe,
  Maximize2
} from 'lucide-react';
import { Model3DCanvas } from '../common/Model3DCanvas';

interface LiveChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  time: string;
  badge?: string;
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
}

export const VirtualRunwayLive: React.FC = () => {
  const [activeCam, setActiveCam] = useState<'front' | 'side' | 'footwear' | 'back' | 'drone'>('front');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [liveViewers, setLiveViewers] = useState<number>(142);
  const [strobeLighting, setStrobeLighting] = useState<boolean>(true);
  const [musicTempo, setMusicTempo] = useState<string>('Techno Avant-Garde 128 BPM');

  // Live Floating Reactions
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);

  // Live Chat Stream
  const [chatMessages, setChatMessages] = useState<LiveChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'Elena Rostova (Milán)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      text: '¡La estructura en los hombros está impecable! 😍',
      time: '12:04',
      badge: 'Buyer'
    },
    {
      id: 'msg-2',
      sender: 'Mateo Silva (Oporto)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      text: 'La caída de la tela 460 GSM se ve pesada y de lujo 🔥',
      time: '12:05',
      badge: 'Textile Eng'
    },
    {
      id: 'msg-3',
      sender: 'Kaito Tanaka (Tokio)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      text: 'Cyber Gold + Antracita = Masterpiece ✨',
      time: '12:05',
      badge: 'Designer'
    }
  ]);
  const [myMessage, setMyMessage] = useState<string>('');

  // Snapshot & "Inspire the World" State
  const [isFlashActive, setIsFlashActive] = useState<boolean>(false);
  const [showInspireModal, setShowInspireModal] = useState<boolean>(false);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [inspirePostCaption, setInspirePostCaption] = useState<string>(
    '¡Mi nueva colección en la pasarela 3D de Aether Synergy! 🔥 Diseñado con IA y físicas textiles en tiempo real. #Runway2026 #CyberGold #AvantGarde'
  );

  // Viewer fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers((prev) => Math.max(128, Math.min(185, prev + (Math.random() > 0.45 ? 1 : -1))));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Automated new audience comments generator
  useEffect(() => {
    const pool = [
      { sender: 'Chloe Martin (París)', text: '¿Se podrá encargar para la semana de la moda? 👏', badge: 'Press' },
      { sender: 'Carlos Mendoza (CDMX)', text: 'El movimiento con el viento en pasarela es irreal 🚀', badge: 'Creator' },
      { sender: 'Yuki Takahashi (Osaka)', text: '¡Increíble la textura de la costura! 💖', badge: 'Stylist' },
      { sender: 'Liam O’Connor (Londres)', text: 'Top tier streetwear. 10/10 🔥', badge: 'Buyer' }
    ];

    const timer = setInterval(() => {
      const randomItem = pool[Math.floor(Math.random() * pool.length)];
      const newMsg: LiveChatMessage = {
        id: `msg-${Date.now()}`,
        sender: randomItem.sender,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
        text: randomItem.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        badge: randomItem.badge
      };
      setChatMessages((prev) => [...prev.slice(-12), newMsg]);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const handleSendEmoji = (emoji: string) => {
    const newEmoji: FloatingEmoji = {
      id: Date.now() + Math.random(),
      emoji,
      x: Math.random() * 80 + 10
    };
    setFloatingEmojis((prev) => [...prev, newEmoji]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!myMessage.trim()) return;

    const userMsg: LiveChatMessage = {
      id: `my-${Date.now()}`,
      sender: 'Tú (Creador)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
      text: myMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      badge: 'HOST'
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setMyMessage('');
  };

  const handleTakeEditorialPhoto = () => {
    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 200);

    const snapshotUrl = 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80';
    setCapturedPhotos((prev) => [snapshotUrl, ...prev]);

    // Mandatory Inspire the World Trigger
    setTimeout(() => {
      setShowInspireModal(true);
    }, 400);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Flash Effect Overlay */}
      {isFlashActive && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none animate-ping opacity-90" />
      )}

      {/* Broadcast Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-5 rounded-3xl border border-rose-500/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500 text-rose-400">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-extrabold uppercase animate-pulse">
                🔴 EN VIVO • PASARELA 3D
              </span>
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                AETHER VIRTUAL FASHION RUNWAY 2026
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Desfile de moda 3D en tiempo real con transmisión multicámara y sala social de espectadores conectados
            </p>
          </div>
        </div>

        {/* Viewers & Audio Control */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-cyber-950 border border-cyber-800">
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-white">{liveViewers}</span>
            <span className="text-[10px] font-mono text-emerald-400">ESPECTADORES</span>
          </div>

          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-700 text-cyber-gold hover:text-white transition-all shadow-md"
            title={isAudioMuted ? 'Activar Música de Pasarela' : 'Silenciar Música'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Broadcast Stage (2 Columns: 3D Runway + Live Social Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: 3D Multicam Runway Stage */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-cyber-700 shadow-2xl bg-black aspect-[16/10]">
            {/* Floating Emojis Overlay */}
            <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
              {floatingEmojis.map((fem) => (
                <div
                  key={fem.id}
                  style={{ left: `${fem.x}%` }}
                  className="absolute bottom-10 text-3xl animate-floatUp opacity-90 transition-all"
                >
                  {fem.emoji}
                </div>
              ))}
            </div>

            {/* Embedded 3D Canvas with High-Poly Catwalk Stage */}
            <div className="w-full h-full">
              <Model3DCanvas
                type="jacket"
                primaryColor="#e5a93c"
                accentColor="#06b6d4"
                clothPhysicsEnabled={true}
              />
            </div>

            {/* TV Broadcast Director Overlay (Top-Left) */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
              <div className="px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-rose-500/50 text-[11px] font-mono text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="font-bold">BROADCAST CAM: {activeCam.toUpperCase()}</span>
              </div>
            </div>

            {/* Shutter Button (Photo Booth) Top-Right */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={handleTakeEditorialPhoto}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyber-gold to-yellow-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2 hover:scale-105 transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>📸 Tomar Foto Front-Row</span>
              </button>
            </div>

            {/* Floating Quick Reactions Bar (Bottom Center) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 p-1.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl">
              {['🔥', '👏', '💖', '🚀', '✨', '👑'].map((em) => (
                <button
                  key={em}
                  onClick={() => handleSendEmoji(em)}
                  className="w-9 h-9 rounded-xl hover:bg-white/20 flex items-center justify-center text-lg hover:scale-125 transition-all"
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* 5-Camera Broadcast Control Switcher */}
          <div className="p-4 rounded-3xl bg-cyber-900 border border-cyber-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-tech font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Video className="w-4 h-4 text-rose-400" /> Switcher de Transmisión Multicámara:
            </span>

            <div className="flex flex-wrap gap-1.5 text-xs font-tech font-bold">
              {[
                { id: 'front', label: 'CAM 1: Frontal Pasarela' },
                { id: 'side', label: 'CAM 2: Travelling Lateral' },
                { id: 'footwear', label: 'CAM 3: Close-up Calzado' },
                { id: 'back', label: 'CAM 4: Espalda & Capucha' },
                { id: 'drone', label: 'CAM 5: Drone Aéreo 360°' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCam(c.id as any)}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeCam === c.id
                      ? 'bg-rose-500 text-white shadow-lg font-bold'
                      : 'bg-cyber-950 border border-cyber-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Live Social Chat & Audience Room */}
        <div className="lg:col-span-4 flex flex-col h-[520px] rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-cyber-800 bg-cyber-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span className="font-tech font-bold text-sm text-white">SALA EN VIVO & CHAT</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              ● Conectados
            </span>
          </div>

          {/* Chat Messages List */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto font-sans text-xs">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="space-y-1 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <img
                    src={msg.avatar}
                    alt={msg.sender}
                    className="w-5 h-5 rounded-full object-cover border border-cyber-gold/50"
                  />
                  <span className="font-bold text-slate-200 text-[11px]">{msg.sender}</span>
                  {msg.badge && (
                    <span className="px-1.5 py-0.2 rounded bg-cyber-800 text-[9px] font-mono text-cyber-gold border border-cyber-700">
                      {msg.badge}
                    </span>
                  )}
                  <span className="text-[9px] font-mono text-slate-500 ml-auto">{msg.time}</span>
                </div>
                <p className="text-slate-300 pl-7 text-[11px] leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Chat Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 bg-cyber-950 border-t border-cyber-800 flex gap-2">
            <input
              type="text"
              placeholder="Escribe tu opinión en el desfile..."
              value={myMessage}
              onChange={(e) => setMyMessage(e.target.value)}
              className="flex-1 bg-cyber-900 border border-cyber-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyber-gold"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-cyber-gold text-black hover:opacity-90 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* =========================================================
          MANDATORY "INSPIRA AL MUNDO" SHARE MODAL
          ========================================================= */}
      {showInspireModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-cyber-900 border border-cyber-gold rounded-3xl p-6 shadow-gold-glow-lg text-white space-y-4">
            <button
              onClick={() => setShowInspireModal(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyber-gold/20 text-cyber-gold border border-cyber-gold">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">¡FOTO DE PASARELA GUARDADA CON ÉXITO!</h3>
                <p className="text-xs text-slate-400">Pierde el miedo y motiva al mundo compartiendo tu talento</p>
              </div>
            </div>

            {/* Photo Preview */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-cyber-950 border border-cyber-800 relative">
              <img
                src={capturedPhotos[0] || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80'}
                alt="Runway Snapshot"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyber-gold font-bold">
                📸 RUNWAY 4K SNAPSHOT • AETHER 2026
              </span>
            </div>

            {/* Caption Input */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-300">Mensaje para la Comunidad Global:</label>
              <textarea
                rows={3}
                value={inspirePostCaption}
                onChange={(e) => setInspirePostCaption(e.target.value)}
                className="w-full bg-cyber-950 border border-cyber-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyber-gold"
              />
            </div>

            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs">
              💡 <em>"El mejor diseño es el que se comparte. Tu creación inspirará a cientos de diseñadores en todo el planeta."</em>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  alert('¡Foto guardada en tu portafolio privado!');
                  setShowInspireModal(false);
                }}
                className="py-3 rounded-2xl bg-cyber-950 border border-cyber-700 text-slate-300 font-tech font-bold text-xs uppercase hover:text-white transition-all"
              >
                Solo Guardar en Privado
              </button>

              <button
                onClick={() => {
                  alert('¡Tu fotografía y diseño se han publicado con éxito en el muro global de Aether Community Hub!');
                  setShowInspireModal(false);
                }}
                className="py-3 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
              >
                <Globe className="w-4 h-4" />
                <span>Publicar & Inspirar al Mundo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
