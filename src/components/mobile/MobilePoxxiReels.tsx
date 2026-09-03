import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  DollarSign,
  ShieldCheck,
  Sparkles,
  Music,
  Plus,
  Volume2,
  VolumeX,
  Radio,
  ShoppingBag,
  Send,
  X
} from 'lucide-react';
import { useDeviceMode } from '../../context/DeviceModeContext';

export const MobilePoxxiReels: React.FC = () => {
  const { hapticFeedback } = useDeviceMode();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});
  const [isSaved, setIsSaved] = useState<Record<number, boolean>>({});
  const [isMuted, setIsMuted] = useState(false);
  const [activeFeedTab, setActiveFeedTab] = useState<'foryou' | 'following'>('foryou');
  const [tipModalOpen, setTipModalOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState([
    { user: 'mateo_fashion', text: '¡Esa caída de tela en 3D se ve irreal! 🔥', time: '2m' },
    { user: 'valen_design', text: '¿Está disponible el patrón para corte láser?', time: '5m' }
  ]);

  const reelsData = [
    {
      id: 1,
      creator: 'Kaito Tanaka',
      handle: '@kaito_3d',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: 'Chaqueta Techwear Cyberpunk • Simulación 4K',
      description: 'Renderizado en 4K con simulación de telas y luces reactivas a la música. Modelo disponible para remix 3D.',
      tags: ['#Techwear', '#3DDesign', '#Blender', '#AetherSynergy'],
      sound: 'Kaito • Cyber Trap 140 BPM (Audio Original)',
      likes: 14200,
      comments: 284,
      shares: 1150,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
      badge: 'VERIFICADO ✓'
    },
    {
      id: 2,
      creator: 'Elena Rostova',
      handle: '@elena_atelier',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      title: 'Sneakers Futuristas Nitrógeno-X',
      description: 'Suela impresa en 3D con amortiguación de nitrógeno líquido. Ficha técnica lista para matriz de inyección.',
      tags: ['#Sneakerhead', '#Footwear3D', '#GenerativeCAD'],
      sound: 'Elena • Synthwave Nightdrive',
      likes: 28900,
      comments: 512,
      shares: 3400,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
      badge: 'PRO DESIGNER'
    },
    {
      id: 3,
      creator: 'Carlos Mendoza',
      handle: '@mendoza_couture',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      title: 'Vestido de Gala Seda Orgánica 3D',
      description: 'Física de caída en tiempo real a 60 FPS con cálculo de consumo de tela por corte al sesgo.',
      tags: ['#HauteCouture', '#LuxuryFashion', '#VirtualRunway'],
      sound: 'Paris Fashion Week • Orchestral Deep',
      likes: 9800,
      comments: 174,
      shares: 890,
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80',
      badge: 'ALTA COSTURA'
    }
  ];

  const currentReel = reelsData[currentIndex];

  const toggleLike = (id: number) => {
    hapticFeedback();
    setIsLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (id: number) => {
    hapticFeedback();
    setIsSaved((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const nextReel = () => {
    hapticFeedback();
    setCurrentIndex((prev) => (prev + 1) % reelsData.length);
  };

  const prevReel = () => {
    hapticFeedback();
    setCurrentIndex((prev) => (prev - 1 + reelsData.length) % reelsData.length);
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentsList([{ user: 'tu_usuario', text: commentText.trim(), time: 'ahora' }, ...commentsList]);
    setCommentText('');
  };

  return (
    <div className="relative w-full h-[calc(100vh-130px)] bg-black overflow-hidden select-none font-sans text-white">
      {/* 1. Background Video / Image (Full Edge-to-Edge) */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={currentReel.image}
          alt={currentReel.title}
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle Vignette & Gradient Shadows for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* 2. Top Header Navigation (Transparent TikTok Tabs) */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-3 pb-2">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white active:scale-95"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <div className="flex items-center gap-4 text-xs font-bold font-tech tracking-wider">
          <button
            onClick={() => {
              hapticFeedback();
              setActiveFeedTab('following');
            }}
            className={`relative transition-all ${
              activeFeedTab === 'following' ? 'text-white' : 'text-slate-400'
            }`}
          >
            Siguiendo
            {activeFeedTab === 'following' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyber-gold rounded-full" />
            )}
          </button>

          <span className="text-slate-600">|</span>

          <button
            onClick={() => {
              hapticFeedback();
              setActiveFeedTab('foryou');
            }}
            className={`relative transition-all ${
              activeFeedTab === 'foryou' ? 'text-white font-extrabold' : 'text-slate-400'
            }`}
          >
            Para Ti
            {activeFeedTab === 'foryou' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyber-gold rounded-full shadow-gold-glow" />
            )}
          </button>
        </div>

        <button
          onClick={() => alert('¡Transmisión en vivo de pasarela 3D iniciada!')}
          className="p-1.5 px-2.5 rounded-full bg-rose-600/80 backdrop-blur-md text-[10px] font-tech font-bold uppercase tracking-wider flex items-center gap-1 text-white shadow-lg animate-pulse"
        >
          <Radio className="w-3 h-3" />
          <span>Live</span>
        </button>
      </div>

      {/* 3. Right Action Rail (TikTok Buttons) */}
      <div className="absolute right-2 bottom-16 z-30 flex flex-col items-center gap-3">
        {/* Creator Avatar with follow badge */}
        <div className="relative mb-1">
          <img
            src={currentReel.avatar}
            alt={currentReel.creator}
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />
          <button
            onClick={() => alert('¡Siguiendo a ' + currentReel.creator + '!')}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* Like Button */}
        <button
          onClick={() => toggleLike(currentReel.id)}
          className="flex flex-col items-center gap-0.5 active:scale-125 transition-transform"
        >
          <div className={`p-2 rounded-full bg-black/40 backdrop-blur-md ${
            isLiked[currentReel.id] ? 'text-rose-500' : 'text-white'
          }`}>
            <Heart className={`w-6 h-6 ${isLiked[currentReel.id] ? 'fill-rose-500' : ''}`} />
          </div>
          <span className="text-[10px] font-bold">
            {(currentReel.likes + (isLiked[currentReel.id] ? 1 : 0)).toLocaleString()}
          </span>
        </button>

        {/* Comment Button */}
        <button
          onClick={() => setCommentModalOpen(true)}
          className="flex flex-col items-center gap-0.5 active:scale-125 transition-transform"
        >
          <div className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white">
            <MessageCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold">{currentReel.comments}</span>
        </button>

        {/* Bookmark / Save */}
        <button
          onClick={() => toggleSave(currentReel.id)}
          className="flex flex-col items-center gap-0.5 active:scale-125 transition-transform"
        >
          <div className={`p-2 rounded-full bg-black/40 backdrop-blur-md ${
            isSaved[currentReel.id] ? 'text-cyber-gold' : 'text-white'
          }`}>
            <Bookmark className={`w-6 h-6 ${isSaved[currentReel.id] ? 'fill-cyber-gold' : ''}`} />
          </div>
          <span className="text-[10px] font-bold">Guardar</span>
        </button>

        {/* Tipping / Propinas Directas */}
        <button
          onClick={() => setTipModalOpen(true)}
          className="flex flex-col items-center gap-0.5 active:scale-125 transition-transform"
        >
          <div className="p-2 rounded-full bg-cyber-gold/90 text-black shadow-gold-glow">
            <DollarSign className="w-5 h-5 font-extrabold" />
          </div>
          <span className="text-[10px] font-bold text-cyber-gold">Propina</span>
        </button>

        {/* Share Button */}
        <button
          onClick={() => alert('Enlace de diseño 3D copiado al portapapeles!')}
          className="flex flex-col items-center gap-0.5 active:scale-125 transition-transform"
        >
          <div className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold">Share</span>
        </button>
      </div>

      {/* 4. Bottom Info Overlay (Creator handle, description, sound, Remix 3D CTA) */}
      <div className="absolute left-3 right-16 bottom-3 z-30 space-y-1.5 text-left pointer-events-auto">
        {/* Creator Name + Badge */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-xs text-white">{currentReel.handle}</span>
          <span className="text-[9px] font-mono text-cyan-300 bg-cyan-500/20 px-1 rounded border border-cyan-500/40">
            {currentReel.badge}
          </span>
        </div>

        {/* Caption & Title */}
        <p className="text-[11px] text-slate-200 line-clamp-2 leading-tight">
          <strong>{currentReel.title}</strong> — {currentReel.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 text-[10px] text-cyber-gold font-bold">
          {currentReel.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        {/* Sound Marquee */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-300 pt-0.5">
          <Music className="w-3 h-3 text-cyber-gold animate-spin" />
          <span className="truncate">{currentReel.sound}</span>
        </div>

        {/* Remix in 3D Button (Core Aether Synergy Feature) */}
        <div className="pt-1">
          <button
            onClick={() => alert('¡Cargando este diseño en el Estudio 3D para remixar y editar!')}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyber-gold via-amber-500 to-yellow-600 text-black font-tech font-extrabold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Remix en 3D Studio</span>
          </button>
        </div>
      </div>

      {/* 5. Swipe Navigation Gestures (Up/Down Arrows on Sides for Testing) */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 opacity-60 hover:opacity-100">
        <button
          onClick={prevReel}
          className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white active:scale-95"
          title="Video Anterior"
        >
          ▲
        </button>
        <button
          onClick={nextReel}
          className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white active:scale-95"
          title="Siguiente Video"
        >
          ▼
        </button>
      </div>

      {/* 6. Comment Modal Sheet */}
      {commentModalOpen && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end animate-fadeIn">
          <div className="bg-cyber-900 border-t-2 border-cyber-gold rounded-t-3xl p-4 max-h-[60vh] flex flex-col text-white animate-slideUp">
            <div className="flex items-center justify-between border-b border-cyber-800 pb-2 mb-2">
              <span className="font-tech font-bold text-xs uppercase">{commentsList.length} Comentarios</span>
              <button onClick={() => setCommentModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-1 text-xs">
              {commentsList.map((c, i) => (
                <div key={i} className="p-2 rounded-xl bg-cyber-950 border border-cyber-800">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <strong className="text-cyber-gold">@{c.user}</strong>
                    <span>{c.time}</span>
                  </div>
                  <p className="mt-0.5 text-slate-200">{c.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendComment} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Añadir comentario..."
                className="flex-1 bg-cyber-950 border border-cyber-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-gold"
              />
              <button type="submit" className="p-2 rounded-xl bg-cyber-gold text-black font-bold">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 7. Creator Tipping Modal Sheet */}
      {tipModalOpen && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end animate-fadeIn">
          <div className="bg-cyber-900 border-t-2 border-cyber-gold rounded-t-3xl p-4 space-y-3 text-white animate-slideUp">
            <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
              <span className="font-tech font-bold text-xs uppercase text-cyber-gold">
                💰 Enviar Propina a {currentReel.creator}
              </span>
              <button onClick={() => setTipModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-slate-300">
              Apoya directamente al diseñador por este modelo 3D. Recibe el 100% neto sin comisiones.
            </p>

            <div className="grid grid-cols-4 gap-2">
              {[2, 5, 10, 25].map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    hapticFeedback();
                    alert('¡Propina enviada con éxito a ' + currentReel.creator + '!');
                    setTipModalOpen(false);
                  }}
                  className="py-2.5 rounded-xl bg-cyber-950 border border-cyber-gold text-cyber-gold font-tech font-bold text-xs hover:bg-cyber-gold hover:text-black transition-all"
                >
                  ${amount} USD
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
