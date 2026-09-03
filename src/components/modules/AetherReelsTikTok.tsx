import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Sparkles,
  Music,
  Plus,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  Wand2,
  ChevronUp,
  ChevronDown,
  X,
  Send,
  Download,
  Copy,
  Sliders,
  DollarSign,
  Flame,
  Award,
  ExternalLink,
  Eye,
  GitFork,
  Radio,
  Layers
} from 'lucide-react';

export interface ReelComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timeAgo: string;
  likes: number;
}

export interface AetherReel {
  id: string;
  title: string;
  description: string;
  author: string;
  authorHandle: string;
  authorAvatar: string;
  isVerified: boolean;
  category: 'fashion' | 'sneakers' | 'furniture' | 'bags' | 'packaging' | 'automotive';
  categoryLabel: string;
  videoUrl: string; // Video URL or animated placeholder
  posterImage: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  musicTrack: string;
  musicArtist: string;
  promptUsed: string;
  model3dLink?: string;
  tags: string[];
  comments: ReelComment[];
}

const INITIAL_REELS: AetherReel[] = [
  {
    id: 'reel-001',
    title: 'Chaqueta Bomber Cyberpunk Neón • Holographic Drop',
    description: 'Renderizado en 4K con simulación de telas y luces reactivas a la música. ¡Disponible para remix en 3D! 🔥 #cyberpunk #streetwear #aether',
    author: 'Kaito Tanaka',
    authorHandle: '@kaito_3d',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    isVerified: true,
    category: 'fashion',
    categoryLabel: '👗 Moda & Streetwear',
    videoUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    posterImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    likesCount: 14200,
    commentsCount: 384,
    sharesCount: 1920,
    musicTrack: 'Neo-Tokyo Midnight Beat (140 BPM)',
    musicArtist: 'Suno AI Synthwave',
    promptUsed: 'Chaqueta bomber cyberpunk impermeable con membranas LED reactivas y arnés táctico',
    model3dLink: 'aurora3d',
    tags: ['#cyberpunk', '#streetwear', '#fashion3d', '#unrealengine5'],
    comments: [
      { id: 'c1', author: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80', text: '¡Increíble la textura reflectante! ¿Usaste Tripo3D o FLUX?', timeAgo: '2h', likes: 24 },
      { id: 'c2', author: 'Mateo Silva', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80', text: 'Ya la remixee en el estudio, le puse cuero nobuk y quedó brutal 🚀', timeAgo: '5h', likes: 18 }
    ]
  },
  {
    id: 'reel-002',
    title: 'Sneakers Gravitacionales Apex Void Carbon V2',
    description: 'Suela de retorno de energía con amortiguación de fibra de carbono. Diseñado para salto y carrera urbana 👟⚡ #sneakers #footwear #kicks',
    author: 'Elena Rostova',
    authorHandle: '@elena_design',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    isVerified: true,
    category: 'sneakers',
    categoryLabel: '👟 Calzado & Sneakers',
    videoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    posterImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    likesCount: 28900,
    commentsCount: 612,
    sharesCount: 4310,
    musicTrack: 'Cyber Trap High Energy (150 BPM)',
    musicArtist: 'Suno AI Trap Master',
    promptUsed: 'Sneakers futuristas con suela translúcida de carbono y capellada en nobuk hidrófugo',
    model3dLink: 'solesmith',
    tags: ['#sneakers', '#kicks', '#futurefootwear', '#carbonfiber'],
    comments: [
      { id: 'c3', author: 'Sven Lindqvist', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80', text: 'Esta suela en impresión 3D SLS sería una locura de producir!', timeAgo: '1h', likes: 45 }
    ]
  },
  {
    id: 'reel-003',
    title: 'Sillón Lounge Escandinavo en Roble & Cuero Capitoné',
    description: 'Despiece de curvado en madera de roble CNC y patronaje de cuero capitoné artesanal. ¿Qué opinan del acabado mate? 🪑✨ #furniture #nordic #woodwork',
    author: 'Sven Lindqvist',
    authorHandle: '@sven_nordic',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    isVerified: true,
    category: 'furniture',
    categoryLabel: '🪑 Muebles & Mobiliario',
    videoUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
    posterImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
    likesCount: 9400,
    commentsCount: 156,
    sharesCount: 890,
    musicTrack: 'Lo-Fi Chill Scandinavian Lounge',
    musicArtist: 'Suno AI Ambient',
    promptUsed: 'Sillón lounge ergonómico en madera contrachapada curvada de roble con cuero marrón flor',
    model3dLink: 'aurora3d',
    tags: ['#furniture', '#nordic', '#wooddesign', '#interior3d'],
    comments: [
      { id: 'c4', author: 'Clara Dupont', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80', text: 'Esa curva en el respaldo es pura ergonomía. 10/10.', timeAgo: '3h', likes: 12 }
    ]
  },
  {
    id: 'reel-004',
    title: 'Mochila Urbana Táctica Roll-Top en Cuero Graso',
    description: 'Impermeabilidad total con costuras selladas y herrajes de bronce macizo. Probada bajo lluvia real 👜🌧️ #leather #tactical #craftsmanship',
    author: 'Mateo Silva',
    authorHandle: '@mateo_craft',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    isVerified: false,
    category: 'bags',
    categoryLabel: '👜 Bolsos & Marroquinería',
    videoUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80',
    posterImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80',
    likesCount: 11800,
    commentsCount: 204,
    sharesCount: 1450,
    musicTrack: 'Dark Cinematic Bassline',
    musicArtist: 'Suno AI Beats',
    promptUsed: 'Mochila roll-top táctica en cuero vacuno graso con cierres estancos y arnés acolchado',
    model3dLink: 'pattern2d',
    tags: ['#leather', '#bags', '#tactical', '#waterproof'],
    comments: []
  },
  {
    id: 'reel-005',
    title: 'Packaging Burger Gourmet Desplegable con Vapor Vents',
    description: 'Caja autoblocante que se convierte en bandeja de comida al abrirse. Cero plásticos, 100% biodegradable 🍔🌱 #packaging #ecofriendly #gourmet',
    author: 'Clara Dupont',
    authorHandle: '@clara_packaging',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    isVerified: true,
    category: 'packaging',
    categoryLabel: '🍔 Gourmet & Packaging',
    videoUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80',
    posterImage: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80',
    likesCount: 8300,
    commentsCount: 95,
    sharesCount: 780,
    musicTrack: 'Upbeat Urban Funk Gastro',
    musicArtist: 'Suno AI Funk',
    promptUsed: 'Caja de hamburguesa gourmet con troquel inteligente y ventilación de vapor en cartón kraft',
    model3dLink: 'pattern2d',
    tags: ['#packaging', '#gourmet', '#ecofriendly', '#diecut'],
    comments: []
  }
];

interface AetherReelsTikTokProps {
  onNavigateToModule?: (moduleId: string) => void;
}

export const AetherReelsTikTok: React.FC<AetherReelsTikTokProps> = ({ onNavigateToModule }) => {
  const [reels, setReels] = useState<AetherReel[]>(INITIAL_REELS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [savedMap, setSavedMap] = useState<Record<string, boolean>>({});
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});
  const [heartBurst, setHeartBurst] = useState<boolean>(false);

  // Comments Drawer State
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [newCommentText, setNewCommentText] = useState<string>('');

  // Upload/Create Reel Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isTippingModalOpen, setIsTippingModalOpen] = useState<boolean>(false);
  const [isLiveRunwayModalOpen, setIsLiveRunwayModalOpen] = useState<boolean>(false);
  const [isIPCertModalOpen, setIsIPCertModalOpen] = useState<boolean>(false);
  const [tipAmount, setTipAmount] = useState<number>(5);
  const [preOrdersCount, setPreOrdersCount] = useState<number>(48);
  const [newReelTitle, setNewReelTitle] = useState<string>('');
  const [newReelCategory, setNewReelCategory] = useState<string>('fashion');
  const [newReelPrompt, setNewReelPrompt] = useState<string>('');
  const [selectedMusicGenre, setSelectedMusicGenre] = useState<string>('Cyber Trap 140 BPM');
  const [isGeneratingAiReel, setIsGeneratingAiReel] = useState<boolean>(false);

  const filteredReels = reels.filter(
    (r) => selectedCategory === 'all' || r.category === selectedCategory
  );

  const activeReel = filteredReels[currentIndex] || filteredReels[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCommentsOpen || isCreateModalOpen) return;
      if (e.key === 'ArrowDown' || e.key === 'j') {
        handleNextReel();
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        handlePrevReel();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.key === 'm') {
        setIsMuted((m) => !m);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredReels.length, isCommentsOpen, isCreateModalOpen]);

  const handleNextReel = () => {
    if (currentIndex < filteredReels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handlePrevReel = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredReels.length - 1);
    }
  };

  const handleToggleLike = (reelId: string) => {
    const wasLiked = Boolean(likedMap[reelId]);
    setLikedMap((prev) => ({ ...prev, [reelId]: !wasLiked }));
    setReels((list) =>
      list.map((r) =>
        r.id === reelId ? { ...r, likesCount: wasLiked ? r.likesCount - 1 : r.likesCount + 1 } : r
      )
    );
  };

  const handleDoubleTapVideo = () => {
    if (!likedMap[activeReel.id]) {
      handleToggleLike(activeReel.id);
    }
    setHeartBurst(true);
    setTimeout(() => setHeartBurst(false), 900);
  };

  const handleToggleSave = (reelId: string) => {
    setSavedMap((prev) => ({ ...prev, [reelId]: !prev[reelId] }));
  };

  const handleToggleFollow = (authorHandle: string) => {
    setFollowingMap((prev) => ({ ...prev, [authorHandle]: !prev[authorHandle] }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const commentObj: ReelComment = {
      id: 'c-' + Date.now(),
      author: 'Tú (Diseñador Aether)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
      text: newCommentText.trim(),
      timeAgo: 'Justo ahora',
      likes: 0
    };

    setReels((list) =>
      list.map((r) =>
        r.id === activeReel.id
          ? {
              ...r,
              commentsCount: r.commentsCount + 1,
              comments: [commentObj, ...r.comments]
            }
          : r
      )
    );
    setNewCommentText('');
  };

  const handleCreateAiReel = async () => {
    if (!newReelTitle.trim()) {
      alert('Ingresa un título para tu reel.');
      return;
    }
    setIsGeneratingAiReel(true);
    await new Promise((r) => setTimeout(r, 2200));

    const newReel: AetherReel = {
      id: 'reel-' + Date.now(),
      title: newReelTitle,
      description: newReelPrompt || 'Diseño renderizado con IA en Aether Synergy Platform. #aether #3d #viral',
      author: 'Tú (Diseñador Aether)',
      authorHandle: '@tu_usuario',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      isVerified: true,
      category: newReelCategory as any,
      categoryLabel: '✨ Creación Propia',
      videoUrl: activeReel.videoUrl,
      posterImage: activeReel.posterImage,
      likesCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      musicTrack: selectedMusicGenre,
      musicArtist: 'Suno AI Original Beat',
      promptUsed: newReelPrompt || newReelTitle,
      model3dLink: 'aurora3d',
      tags: ['#aether', '#aiart', '#design3d', '#viral'],
      comments: []
    };

    setReels([newReel, ...reels]);
    setIsGeneratingAiReel(false);
    setIsCreateModalOpen(false);
    setCurrentIndex(0);
    alert('¡Tu Reel 3D en 9:16 ha sido generado y publicado en el feed global de Aether!');
  };

  const handleShareReel = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('¡Enlace del Reel copiado al portapapeles! Listo para compartir en Instagram, TikTok o WhatsApp.');
  };

  return (
    <div className="p-2 sm:p-6 max-w-6xl mx-auto space-y-4 animate-fadeIn text-white font-mono text-xs select-none">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/95 p-5 rounded-3xl border border-rose-500/40 shadow-cyber-card backdrop-blur-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 border border-rose-500 text-rose-400 shadow-md">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                POXXI 3D • SHORTS & PASARELAS
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/50 flex items-center gap-1">
                ✨ POXXI FEED 9:16
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Feed inmersivo y dinámico de videos 3D generados por IA, pasarelas de moda, calzado y despieces interactivos.
            </p>
          </div>
        </div>

        {/* Global Creator Action */}
        <button
          onClick={() => setIsLiveRunwayModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-95 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-all"
        >
          <Radio className="w-4 h-4 text-rose-300 animate-pulse" />
          <span>🔴 Live Runway Pre-Orden</span>
        </button>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:opacity-95 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>+ Crear Poxxi 3D</span>
        </button>
      </div>

      {/* Category Filter Pills Bar */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar bg-cyber-900/90 p-2 rounded-2xl border border-cyber-800">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'all', label: '🔥 En Tendencia' },
            { id: 'fashion', label: '👗 Moda & Streetwear' },
            { id: 'sneakers', label: '👟 Calzado & Sneakers' },
            { id: 'furniture', label: '🪑 Muebles & Decor' },
            { id: 'bags', label: '👜 Bolsos & Cuero' },
            { id: 'packaging', label: '🍔 Packaging & Gastro' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold shadow-md'
                  : 'bg-cyber-950 text-slate-400 hover:text-white border border-cyber-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-[11px] text-slate-400 hidden sm:flex items-center gap-2 px-2 shrink-0">
          <span>Usa <strong className="text-white">↑ ↓</strong> para cambiar de video</span>
        </div>
      </div>

      {/* Main TikTok Video Viewport Station */}
      <div className="flex justify-center items-center relative min-h-[620px]">
        {/* Vertical Reel Device Shell (9:16 Aspect Ratio) */}
        <div className="relative w-full max-w-[390px] sm:max-w-[410px] h-[640px] sm:h-[680px] rounded-[36px] overflow-hidden bg-black border-2 border-cyber-800 shadow-[0_0_40px_rgba(244,63,94,0.25)] flex flex-col justify-between">
          {/* Main Background Image / Video Player */}
          <div
            className="absolute inset-0 cursor-pointer overflow-hidden"
            onClick={handleDoubleTapVideo}
          >
            <img
              src={activeReel.posterImage}
              alt={activeReel.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

            {/* Double Tap Heart Burst Animation */}
            {heartBurst && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                <Heart className="w-24 h-24 text-rose-500 fill-rose-500 animate-ping drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]" />
              </div>
            )}
          </div>

          {/* Top Bar inside Reel */}
          <div className="relative z-20 p-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-md">
              {activeReel.categoryLabel}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-all border border-white/10"
                title={isMuted ? 'Activar Sonido' : 'Silenciar'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-all border border-white/10"
                title={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-cyber-gold" />}
              </button>
            </div>
          </div>

          {/* Right Floating Actions Bar (TikTok Style) */}
          <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4">
            {/* Author Avatar with Follow (+) */}
            <div className="relative">
              <img
                src={activeReel.authorAvatar}
                alt={activeReel.author}
                className="w-11 h-11 rounded-full object-cover border-2 border-cyber-gold shadow-lg"
              />
              <button
                onClick={() => handleToggleFollow(activeReel.authorHandle)}
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center shadow-md transition-all ${
                  followingMap[activeReel.authorHandle]
                    ? 'bg-emerald-500 text-black'
                    : 'bg-rose-500 text-white hover:scale-110'
                }`}
                title="Seguir Creador"
              >
                {followingMap[activeReel.authorHandle] ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Plus className="w-3 h-3" />
                )}
              </button>
            </div>

            {/* Like Button */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => handleToggleLike(activeReel.id)}
                className={`p-3 rounded-full backdrop-blur-md transition-transform active:scale-125 shadow-lg ${
                  likedMap[activeReel.id]
                    ? 'bg-rose-500 text-white'
                    : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <Heart className={`w-5 h-5 ${likedMap[activeReel.id] ? 'fill-current' : ''}`} />
              </button>
              <span className="text-[10px] font-bold text-white drop-shadow-md">
                {(activeReel.likesCount / 1000).toFixed(1)}k
              </span>
            </div>

            {/* Comments Button */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => setIsCommentsOpen(true)}
                className="p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <span className="text-[10px] font-bold text-white drop-shadow-md">
                {activeReel.commentsCount}
              </span>
            </div>

            {/* Save / Bookmark Button */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => handleToggleSave(activeReel.id)}
                className={`p-3 rounded-full backdrop-blur-md shadow-lg transition-all ${
                  savedMap[activeReel.id]
                    ? 'bg-cyber-gold text-black'
                    : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${savedMap[activeReel.id] ? 'fill-current' : ''}`} />
              </button>
              <span className="text-[10px] font-bold text-white drop-shadow-md">Guardar</span>
            </div>

            {/* Share Button */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => setIsTippingModalOpen(true)}
                className="flex flex-col items-center gap-1 text-cyber-gold hover:scale-110 transition-transform"
                title="Apoyar y enviar propina al creador"
              >
                <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-cyber-gold/50 flex items-center justify-center shadow-lg">
                  <DollarSign className="w-5 h-5 text-cyber-gold" />
                </div>
                <span className="text-[10px] font-bold">Propina</span>
              </button>

              <button
                onClick={() => setIsIPCertModalOpen(true)}
                className="flex flex-col items-center gap-1 text-cyan-300 hover:scale-110 transition-transform"
                title="Ver Certificado de Autoría y Registro IP"
              >
                <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/50 flex items-center justify-center shadow-lg">
                  <Award className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-[10px] font-bold">Autoría</span>
              </button>

              <button
                onClick={handleShareReel}
                className="p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white shadow-lg transition-all"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <span className="text-[10px] font-bold text-white drop-shadow-md">Compartir</span>
            </div>

            {/* Spinning Suno AI Music Disc */}
            <div
              className={`w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-cyber-gold p-0.5 shadow-lg ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '4s' }}
            >
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <Music className="w-4 h-4 text-cyber-gold" />
              </div>
            </div>
          </div>

          {/* Bottom Reel Details (Author, Caption, Prompt, Remix Action) */}
          <div className="relative z-20 p-5 space-y-3">
            {/* Author Info */}
            <div className="flex items-center gap-2">
              <span className="font-tech font-extrabold text-sm text-white drop-shadow-md">
                {activeReel.author}
              </span>
              <span className="text-[11px] text-slate-300">{activeReel.authorHandle}</span>
              {activeReel.isVerified && (
                <span className="w-4 h-4 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[9px] font-bold">
                  ✓
                </span>
              )}
            </div>

            {/* Caption Description */}
            <p className="text-xs text-slate-100 leading-snug drop-shadow-md line-clamp-2">
              {activeReel.description}
            </p>

            {/* Suno AI Music Track Ticker */}
            <div className="flex items-center gap-2 text-[10px] text-cyan-300">
              <Music className="w-3 h-3 shrink-0 animate-bounce" />
              <span className="truncate">{activeReel.musicTrack} • {activeReel.musicArtist}</span>
            </div>

            {/* Remix in 3D Studio Action Button */}
            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={() => {
                  if (onNavigateToModule && activeReel.model3dLink) {
                    onNavigateToModule(activeReel.model3dLink);
                  } else {
                    alert(`Abriendo Aurora 3D Studio con el prompt: "${activeReel.promptUsed}"`);
                  }
                }}
                className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 hover:opacity-95 transition-all"
              >
                <GitFork className="w-3.5 h-3.5" />
                <span>⚡ Remixear en 3D Studio</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(activeReel.promptUsed);
                  alert('¡Prompt copiado al portapapeles!');
                }}
                className="p-2.5 rounded-2xl bg-black/60 border border-white/20 hover:bg-black/80 text-cyber-gold"
                title="Copiar Prompt IA"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Up/Down Reel Navigation Arrows */}
        <div className="hidden md:flex flex-col gap-3 ml-6 z-20">
          <button
            onClick={handlePrevReel}
            className="p-3.5 rounded-2xl bg-cyber-900 border border-cyber-800 text-slate-300 hover:text-white hover:border-cyber-gold transition-all shadow-cyber-card"
            title="Reel Anterior (Flecha Arriba)"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <div className="text-center font-mono text-[11px] text-slate-400">
            {currentIndex + 1} / {filteredReels.length}
          </div>
          <button
            onClick={handleNextReel}
            className="p-3.5 rounded-2xl bg-cyber-900 border border-cyber-800 text-slate-300 hover:text-white hover:border-cyber-gold transition-all shadow-cyber-card"
            title="Siguiente Reel (Flecha Abajo)"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* =========================================================
          SLIDE-OVER: LIVE COMMENTS DRAWER
          ========================================================= */}
      {isCommentsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-cyber-900 border-l border-cyber-800 w-full sm:max-w-md h-full p-6 flex flex-col justify-between shadow-2xl text-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-cyber-800 pb-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-rose-400" />
                  <h3 className="font-tech font-bold text-base text-white">
                    Comentarios ({activeReel.comments.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCommentsOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-cyber-950 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">
                {activeReel.comments.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">
                    Sé el primero en comentar este diseño 3D.
                  </p>
                ) : (
                  activeReel.comments.map((comm) => (
                    <div key={comm.id} className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={comm.avatar} alt={comm.author} className="w-6 h-6 rounded-full object-cover" />
                          <span className="font-tech font-bold text-xs text-slate-200">{comm.author}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{comm.timeAgo}</span>
                      </div>
                      <p className="text-xs text-slate-300 pl-8">{comm.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Comment Input Box */}
            <form onSubmit={handleAddComment} className="pt-3 border-t border-cyber-800 flex items-center gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Escribe un comentario..."
                className="flex-1 bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: SUBIR O GENERAR SHORT CON IA
          ========================================================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-rose-500/50 rounded-3xl p-6 max-w-xl w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500">
                <Wand2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">
                  CREAR POXXI SHORT 3D CON IA
                </h3>
                <p className="text-slate-400 text-xs">
                  Genera un video vertical 9:16 con cámara cinemática 360°, pista Suno AI y efectos PBR
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Título del Poxxi:</label>
                <input
                  type="text"
                  value={newReelTitle}
                  onChange={(e) => setNewReelTitle(e.target.value)}
                  placeholder="ej: Chaqueta Bomber Cyberpunk Neón Drop 2026"
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Categoría:</label>
                  <select
                    value={newReelCategory}
                    onChange={(e) => setNewReelCategory(e.target.value)}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                  >
                    <option value="fashion">👗 Moda & Streetwear</option>
                    <option value="sneakers">👟 Calzado & Sneakers</option>
                    <option value="furniture">🪑 Muebles & Decor</option>
                    <option value="bags">👜 Bolsos & Cuero</option>
                    <option value="packaging">🍔 Packaging & Gastro</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Banda Sonora Suno AI:</label>
                  <select
                    value={selectedMusicGenre}
                    onChange={(e) => setSelectedMusicGenre(e.target.value)}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                  >
                    <option value="Cyber Trap 140 BPM">Cyber Trap 140 BPM</option>
                    <option value="Lo-Fi Chill Hop 85 BPM">Lo-Fi Chill Hop 85 BPM</option>
                    <option value="Techno High Fashion 130 BPM">Techno High Fashion 130 BPM</option>
                    <option value="Ambient Luxury Lounge">Ambient Luxury Lounge</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Prompt / Descripción Visual:</label>
                <textarea
                  value={newReelPrompt}
                  onChange={(e) => setNewReelPrompt(e.target.value)}
                  rows={3}
                  placeholder="Describe la animación: Cámara orbital 360°, partículas doradas, iluminación de pasarela..."
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-400 font-mono"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1.5">
                <span className="text-[11px] text-slate-400 block font-bold">Opciones de Exportación:</span>
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-cyber-900 border border-cyber-700">📱 Formato Vertical 9:16 (1080x1920)</span>
                  <span className="px-2 py-0.5 rounded bg-cyber-900 border border-cyber-700">🎵 Audio Suno AI Sync</span>
                  <span className="px-2 py-0.5 rounded bg-cyber-900 border border-cyber-700">⚡ 60 FPS Smooth Render</span>
                </div>
              </div>

              <button
                onClick={handleCreateAiReel}
                disabled={isGeneratingAiReel}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:opacity-95 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                {isGeneratingAiReel ? (
                  <>
                    <Radio className="w-4 h-4 animate-spin text-white" />
                    <span>Renderizando Poxxi 9:16 en la Nube con IA...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Publicar Poxxi en el Feed Global</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* =========================================================
          MODAL: ENVIAR PROPINA / MONETIZACIÓN AL CREADOR
          ========================================================= */}
      {isTippingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyber-gold/50 rounded-3xl p-6 max-w-sm w-full shadow-cyber-card text-white space-y-4 text-xs font-mono relative">
            <button
              onClick={() => setIsTippingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyber-gold/20 text-cyber-gold border border-cyber-gold">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-base text-white">APOYAR AL CREADOR</h3>
                <p className="text-slate-400 text-[10px]">Enviando a: <strong>{activeReel.author}</strong></p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center font-bold">
              {[2, 5, 10, 25].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setTipAmount(amt)}
                  className={`py-2.5 rounded-xl border transition-all ${
                    tipAmount === amt
                      ? 'bg-cyber-gold text-black border-cyber-gold shadow-gold-glow'
                      : 'bg-cyber-950 border-cyber-800 text-slate-300'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                alert(`¡Propina de ${tipAmount} USD enviada con éxito a ${activeReel.author}! ¡Gracias por apoyar el talento de la comunidad!`);
                setIsTippingModalOpen(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-extrabold text-xs uppercase shadow-gold-glow hover:opacity-95 transition-all"
            >
              💰 Confirmar Propina (${tipAmount} USD)
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: LIVE RUNWAY & PRE-VENTA EXCLUSIVA
          ========================================================= */}
      {isLiveRunwayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-purple-500/50 rounded-3xl p-6 max-w-lg w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative font-mono text-xs">
            <button
              onClick={() => setIsLiveRunwayModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500">
                <Radio className="w-6 h-6 animate-pulse text-rose-400" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-base text-white">LIVE STREAM PASARELA & PRE-ORDEN</h3>
                <p className="text-slate-400 text-[10px]">Transmisión interactiva con producción bajo demanda</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Pre-Órdenes Confirmadas:</span>
                <span className="text-emerald-400 font-bold">{preOrdersCount} / 100 Piezas (Meta 100%)</span>
              </div>
              <div className="w-full bg-cyber-900 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-rose-500 to-purple-500 h-full" style={{ width: `${preOrdersCount}%` }} />
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Al completar las 100 pre-órdenes, la fábrica aliada inicia el corte en serie con TechPack oficial.
              </p>
            </div>

            <button
              onClick={() => {
                setPreOrdersCount((prev: number) => prev + 1);
                alert('¡Pre-orden reservada con éxito! Tu prenda se producirá de forma prioritaria con número de serie exclusivo.');
                setIsLiveRunwayModalOpen(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-tech font-extrabold text-xs uppercase shadow-lg hover:opacity-95 transition-all"
            >
              🛍️ Reservar Pre-Orden Exclusiva ($85 USD)
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: CERTIFICADO DE AUTORÍA & REGISTRO IP
          ========================================================= */}
      {isIPCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyan-500/50 rounded-3xl p-6 max-w-md w-full shadow-cyber-card text-white space-y-4 relative font-mono text-xs">
            <button
              onClick={() => setIsIPCertModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-base text-white">CERTIFICADO DE AUTORÍA IP</h3>
                <p className="text-slate-400 text-[10px]">Estampado de tiempo y firma criptográfica inmutable</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 text-slate-300">
              <p>🎨 <strong>Diseñador:</strong> {activeReel.author} ({activeReel.authorHandle})</p>
              <p>🔒 <strong>Hash SHA-256:</strong> <span className="text-cyan-300">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span></p>
              <p>⏱️ <strong>Timestamp:</strong> 2026-10-23T19:30:00Z</p>
              <p>📜 <strong>Licencia:</strong> CC BY-NC-SA 4.0 (Remix habilitado con atribución obligatoria)</p>
            </div>

            <button
              onClick={() => alert('¡Certificado de Propiedad Intelectual descargado en PDF de alta resolución!')}
              className="w-full py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-tech font-extrabold text-xs uppercase shadow-md transition-all"
            >
              📜 Descargar Certificado de Registro PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
