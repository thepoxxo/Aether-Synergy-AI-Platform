import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Eye,
  Share2,
  Download,
  Filter,
  Search,
  Flame,
  Layers,
  Wand2,
  Tag,
  User,
  ArrowUpRight,
  RotateCcw,
  Trophy,
  Award,
  Clock,
  CheckCircle2,
  DollarSign,
  MessageSquare,
  Bookmark,
  GitFork,
  X,
  Plus,
  Play,
  Check,
  Zap,
  Box,
  Film,
  Radio
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { AetherReelsTikTok } from './AetherReelsTikTok';

export interface CommunityDesign {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  category: 'streetwear' | 'footwear' | 'interior' | 'bags' | 'packaging' | 'gourmet';
  domainLabel: string;
  image: string;
  likes: number;
  views: number;
  remixes: number;
  modelType: string;
  primaryColor: string;
  tags: string[];
  originalPrompt: string;
  downloadGlbUrl: string;
  parentDesignId?: string;
  aiCritiqueScore: {
    innovation: number;
    commercialViability: number;
    ergonomics: number;
    viralScore: number;
  };
}

export interface DesignChallenge {
  id: string;
  title: string;
  category: string;
  prizeUSD: number;
  creditsReward: number;
  endDate: string;
  description: string;
  participantsCount: number;
  sponsor: string;
  tag: string;
}

interface CommunityExploreProps {
  onRemixDesign?: (design: CommunityDesign) => void;
}

const INITIAL_DESIGNS: CommunityDesign[] = [
  {
    id: 'des-001',
    title: 'Chaqueta Cyberpunk Neo-Tokyo Modular V3',
    author: 'Kaito Tanaka',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    category: 'streetwear',
    domainLabel: '👗 Moda & Streetwear',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
    likes: 412,
    views: 2340,
    remixes: 64,
    modelType: 'jacket',
    primaryColor: '#e5a93c',
    tags: ['#cyberpunk', '#techwear', '#tokyo', '#pbr'],
    originalPrompt: 'Chaqueta bomber cyberpunk impermeable con detalles en oro y titanio y arnés táctico modular',
    downloadGlbUrl: 'aether_cyber_jacket_v3.glb',
    aiCritiqueScore: { innovation: 96, commercialViability: 92, ergonomics: 89, viralScore: 98 }
  },
  {
    id: 'des-002',
    title: 'Sneaker Gravitacional Apex Void V2 Carbon',
    author: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    category: 'footwear',
    domainLabel: '👟 Calzado & Sneakers',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    likes: 628,
    views: 3820,
    remixes: 104,
    modelType: 'sneaker',
    primaryColor: '#06b6d4',
    tags: ['#sneakers', '#futuristic', '#footwear', '#carbon'],
    originalPrompt: 'Sneaker con suela de retorno de energía en fibra de carbono y capellada en nobuk hidrófugo',
    downloadGlbUrl: 'aether_apex_sneaker_v2.glb',
    aiCritiqueScore: { innovation: 98, commercialViability: 95, ergonomics: 94, viralScore: 99 }
  },
  {
    id: 'des-003',
    title: 'Silla Paramétrica Avant-Garde Nórdica en Roble',
    author: 'Sven Lindqvist',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    category: 'interior',
    domainLabel: '🪑 Muebles & Mobiliario',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
    likes: 295,
    views: 1420,
    remixes: 38,
    modelType: 'chair',
    primaryColor: '#d97706',
    tags: ['#interior', '#furniture', '#nordic', '#3dprint'],
    originalPrompt: 'Sillón ergonómico en madera contrachapada curvada de roble con tapicería de cuero capitoné',
    downloadGlbUrl: 'aether_nordic_chair_v1.glb',
    aiCritiqueScore: { innovation: 91, commercialViability: 88, ergonomics: 96, viralScore: 86 }
  },
  {
    id: 'des-004',
    title: 'Mochila Táctica Roll-Top en Cuero Graso 1.8mm',
    author: 'Mateo Silva',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    category: 'bags',
    domainLabel: '👜 Bolsos & Marroquinería',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80',
    likes: 340,
    views: 1890,
    remixes: 42,
    modelType: 'backpack',
    primaryColor: '#78350f',
    tags: ['#leather', '#tactical', '#bags', '#craft'],
    originalPrompt: 'Mochila urbana roll-top en cuero vacuno graso con herrajes de bronce y forro impermeable',
    downloadGlbUrl: 'aether_leather_backpack.glb',
    aiCritiqueScore: { innovation: 89, commercialViability: 94, ergonomics: 92, viralScore: 90 }
  },
  {
    id: 'des-005',
    title: 'Packaging Biodegradable de Hamburguesa Gourmet',
    author: 'Clara Dupont',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    category: 'packaging',
    domainLabel: '🍔 Gourmet & Packaging',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    likes: 215,
    views: 1100,
    remixes: 27,
    modelType: 'box',
    primaryColor: '#10b981',
    tags: ['#gourmet', '#eco', '#packaging', '#kraft'],
    originalPrompt: 'Caja para hamburguesa gourmet con troquel autoblocante y ventilación para vapor en cartón kraft',
    downloadGlbUrl: 'aether_burger_box_diecut.glb',
    aiCritiqueScore: { innovation: 93, commercialViability: 97, ergonomics: 90, viralScore: 92 }
  }
];

const ACTIVE_CHALLENGE: DesignChallenge = {
  id: 'chal-001',
  title: 'Desafío Creativo: "Cyberwear & Alta Costura Otoño 2026"',
  category: '👗 Moda & Streetwear',
  prizeUSD: 1500,
  creditsReward: 5000,
  endDate: '2026-10-15',
  description: 'Diseña una colección cápsula de 3 prendas 3D o calzado que combine materiales técnicos impermeables con siluetas de alta costura.',
  participantsCount: 142,
  sponsor: 'Aether Synergy Labs x Unreal Engine',
  tag: '#CyberwearChallenge2026'
};

export const CommunityExplore: React.FC<CommunityExploreProps> = ({ onRemixDesign }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'explore' | 'reels_tiktok' | 'challenges' | 'saved_collections'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'trending' | 'most_liked' | 'most_remixed'>('trending');

  const [designs, setDesigns] = useState<CommunityDesign[]>(INITIAL_DESIGNS);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [savedMap, setSavedMap] = useState<Record<string, boolean>>({});

  // Remix Studio Modal State
  const [remixingDesign, setRemixingDesign] = useState<CommunityDesign | null>(null);
  const [remixPrompt, setRemixPrompt] = useState<string>('');
  const [remixTextureMaterial, setRemixTextureMaterial] = useState<string>('Cuero Nobuk Hidrófugo');
  const [remixColorTone, setRemixColorTone] = useState<string>('#06b6d4');
  const [isGeneratingRemix, setIsGeneratingRemix] = useState(false);
  const [remixResultImage, setRemixResultImage] = useState<string | null>(null);

  const toggleLike = (id: string) => {
    setLikedMap((prev) => {
      const isLiked = !prev[id];
      setDesigns((list) =>
        list.map((d) => (d.id === id ? { ...d, likes: isLiked ? d.likes + 1 : d.likes - 1 } : d))
      );
      return { ...prev, [id]: isLiked };
    });
  };

  const toggleSave = (id: string) => {
    setSavedMap((prev) => {
      const isSaved = !prev[id];
      return { ...prev, [id]: isSaved };
    });
  };

  const handleOpenRemixModal = (design: CommunityDesign) => {
    setRemixingDesign(design);
    setRemixPrompt(design.originalPrompt);
    setRemixTextureMaterial('Alcantara & Fibra de Carbono');
    setRemixColorTone('#e5a93c');
    setRemixResultImage(null);
  };

  const handleExecuteRemix = async () => {
    if (!remixingDesign) return;
    setIsGeneratingRemix(true);
    await new Promise((r) => setTimeout(r, 1800));

    // Simulated new remix creation
    const newRemix: CommunityDesign = {
      id: 'remix-' + Date.now(),
      title: `Remix de ${remixingDesign.title}`,
      author: 'Tú (Diseñador Aether)',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      category: remixingDesign.category,
      domainLabel: remixingDesign.domainLabel,
      image: remixingDesign.image,
      likes: 1,
      views: 12,
      remixes: 0,
      modelType: remixingDesign.modelType,
      primaryColor: remixColorTone,
      tags: [...remixingDesign.tags, '#remix'],
      originalPrompt: remixPrompt,
      downloadGlbUrl: 'aether_remix_' + Date.now() + '.glb',
      parentDesignId: remixingDesign.id,
      aiCritiqueScore: {
        innovation: 95,
        commercialViability: 93,
        ergonomics: 91,
        viralScore: 97
      }
    };

    setDesigns([newRemix, ...designs]);
    setIsGeneratingRemix(false);
    setRemixResultImage(remixingDesign.image);
    alert('¡Remix 3D generado y publicado en la comunidad con atribución automática!');
  };

  const filteredDesigns = designs.filter((d) => {
    const matchCat = selectedCategory === 'all' || d.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const savedDesignsList = designs.filter((d) => savedMap[d.id]);

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white font-mono text-xs">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/95 p-6 rounded-3xl border border-cyber-gold/50 shadow-cyber-card backdrop-blur-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-cyber-gold text-cyber-gold shadow-gold-glow">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                COMUNIDAD CREATIVA & ESTUDIO DE REMIX 3D
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/50">
                GLOBAL CREATOR NETWORK
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Explora creaciones de diseñadores de todo el mundo, bifurca cualquier modelo con el motor de Remix IA y participa en desafíos con premios.
            </p>
          </div>
        </div>

        {/* Community Stats Pills */}
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-2 rounded-2xl bg-cyber-950 border border-cyber-800 text-slate-300 text-xs">
            🔥 <strong className="text-emerald-400">12,450</strong> Diseños Activos
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-cyber-950 border border-cyber-800 text-slate-300 text-xs">
            ⚡ <strong className="text-cyan-400">3,890</strong> Remixes Creados
          </div>
        </div>
      </div>

      {/* Navigation Mode Tabs */}
      <div className="flex flex-wrap gap-2 bg-cyber-900/90 p-2 rounded-2xl border border-cyber-800">
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all ${
            activeTab === 'explore'
              ? 'bg-cyber-gold text-black shadow-gold-glow font-extrabold'
              : 'text-slate-400 hover:text-white bg-cyber-950/60 border border-cyber-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>🌟 Explorar Diseños & Remix</span>
        </button>

        <button
          onClick={() => setActiveTab('reels_tiktok')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all ${
            activeTab === 'reels_tiktok'
              ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white shadow-lg font-extrabold'
              : 'text-rose-300 hover:text-white bg-rose-500/10 border border-rose-500/30'
          }`}
        >
          <Film className="w-4 h-4 text-rose-400" />
          <span>✨ Poxxi 3D Shorts</span>
        </button>

        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all ${
            activeTab === 'challenges'
              ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black shadow-gold-glow font-extrabold'
              : 'text-amber-300 hover:text-white bg-amber-500/10 border border-amber-500/30'
          }`}
        >
          <Trophy className="w-4 h-4 text-cyber-gold" />
          <span>🏆 Desafíos Semanales & Bounties ($1,500 USD)</span>
        </button>

        <button
          onClick={() => setActiveTab('saved_collections')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all ${
            activeTab === 'saved_collections'
              ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md font-extrabold'
              : 'text-purple-300 hover:text-white bg-purple-500/10 border border-purple-500/30'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>📁 Guardados & Colecciones ({Object.values(savedMap).filter(Boolean).length})</span>
        </button>
      </div>

      {/* =========================================================
          TAB 1: EXPLORAR DISEÑOS & REMIX
          ========================================================= */}
      {activeTab === 'explore' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filter & Search Bar */}
          <div className="bg-cyber-900 p-4 rounded-3xl border border-cyber-800 shadow-cyber-card flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por prenda, diseñador o #hashtag..."
                className="w-full bg-cyber-950 border border-cyber-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-gold"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: '🌟 Todos' },
                { id: 'streetwear', label: '👗 Moda' },
                { id: 'footwear', label: '👟 Sneakers' },
                { id: 'interior', label: '🪑 Muebles' },
                { id: 'bags', label: '👜 Bolsos' },
                { id: 'packaging', label: '🍔 Packaging' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500 font-bold shadow-sm'
                      : 'bg-cyber-950 text-slate-400 hover:text-white border border-cyber-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Community Designs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDesigns.map((design) => {
              const isLiked = Boolean(likedMap[design.id]);
              const isSaved = Boolean(savedMap[design.id]);

              return (
                <div
                  key={design.id}
                  className="rounded-3xl bg-cyber-900 border border-cyber-800 hover:border-cyber-700 transition-all shadow-cyber-card overflow-hidden flex flex-col justify-between group"
                >
                  {/* Image with Overlays */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-cyber-950">
                    <img
                      src={design.image}
                      alt={design.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Domain Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-black/75 backdrop-blur-md text-white border border-white/10 shadow-md">
                        {design.domainLabel}
                      </span>
                    </div>

                    {/* Like & Save Actions */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                      <button
                        onClick={() => toggleLike(design.id)}
                        className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                          isLiked ? 'bg-rose-500 text-white shadow-lg' : 'bg-black/60 text-slate-300 hover:text-white'
                        }`}
                        title="Me gusta"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={() => toggleSave(design.id)}
                        className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                          isSaved ? 'bg-purple-500 text-white shadow-lg' : 'bg-black/60 text-slate-300 hover:text-white'
                        }`}
                        title="Guardar en Colección"
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* AI Critique Score Ribbon */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[10px]">
                      <span className="text-slate-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cyan-400" /> Score IA:
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {design.aiCritiqueScore.innovation}% Innovación • {design.aiCritiqueScore.commercialViability}% Viabilidad
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h4 className="font-tech font-bold text-base text-white group-hover:text-cyber-gold transition-colors">
                        {design.title}
                      </h4>

                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src={design.authorAvatar}
                          alt={design.author}
                          className="w-5 h-5 rounded-full object-cover border border-cyber-gold/50"
                        />
                        <span className="text-[11px] text-slate-400">Por {design.author}</span>
                      </div>
                    </div>

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-1">
                      {design.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] bg-cyber-950 border border-cyber-800 text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-cyber-800">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-rose-400" /> {design.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5 text-cyan-400" /> {design.remixes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-slate-500" /> {design.views}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          alert(`Descargando modelo 3D ${design.downloadGlbUrl} en formato .GLB`);
                        }}
                        className="text-slate-400 hover:text-white"
                        title="Descargar Malla 3D .GLB"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Big Remix Action Button */}
                    <button
                      onClick={() => handleOpenRemixModal(design)}
                      className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                      <GitFork className="w-4 h-4" />
                      <span>⚡ Remixear con IA</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: AETHER REELS & TIKTOK 3D STUDIO
          ========================================================= */}
      {activeTab === 'reels_tiktok' && (
        <AetherReelsTikTok
          onNavigateToModule={(mod) => {
            if (onRemixDesign) {
              onRemixDesign(designs[0]);
            }
          }}
        />
      )}

      {/* =========================================================
          TAB 3: DESAFÍOS CREATIVOS & BOUNTIES
          ========================================================= */}
      {activeTab === 'challenges' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Active Challenge Feature Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-cyber-900 via-slate-900 to-amber-950/40 border border-cyber-gold/60 shadow-gold-glow space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-4 rounded-2xl bg-cyber-gold/20 text-cyber-gold border border-cyber-gold">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/50">
                    🔥 DESAFÍO EN CURSO • QUEDAN 14 DÍAS
                  </span>
                  <h3 className="font-tech font-extrabold text-2xl text-white tracking-wide mt-1">
                    {ACTIVE_CHALLENGE.title}
                  </h3>
                  <span className="text-xs text-slate-400">Patrocinado por: {ACTIVE_CHALLENGE.sponsor}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Bolsa de Premios:</span>
                <span className="text-3xl font-tech font-black text-cyber-gold">
                  ${ACTIVE_CHALLENGE.prizeUSD.toLocaleString()} USD
                </span>
                <span className="text-[10px] text-emerald-400 block font-bold">
                  + {ACTIVE_CHALLENGE.creditsReward.toLocaleString()} Créditos Aether
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              {ACTIVE_CHALLENGE.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-cyber-800">
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>👥 <strong>{ACTIVE_CHALLENGE.participantsCount}</strong> Diseñadores Participando</span>
                <span>📅 Fecha Límite: <strong>{ACTIVE_CHALLENGE.endDate}</strong></span>
              </div>

              <button
                onClick={() => alert('¡Postulación registrada! Ahora abre Aurora 3D Studio para crear tu propuesta.')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-extrabold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-95"
              >
                🚀 Postular mi Diseño al Desafío
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: GUARDADOS & COLECCIONES
          ========================================================= */}
      {activeTab === 'saved_collections' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-cyber-900 p-4 rounded-3xl border border-cyber-800 shadow-cyber-card">
            <h3 className="font-tech font-bold text-base text-white">
              Mis Diseños Guardados ({savedDesignsList.length})
            </h3>
            <p className="text-slate-400 text-xs">Colección privada de inspiración y modelos listos para remixear</p>
          </div>

          {savedDesignsList.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-cyber-900 border border-cyber-800 space-y-3">
              <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-xs">Aún no has guardado ningún diseño en tus colecciones.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedDesignsList.map((design) => (
                <div
                  key={design.id}
                  className="rounded-3xl bg-cyber-900 border border-cyber-800 p-4 space-y-3 shadow-cyber-card"
                >
                  <img src={design.image} alt={design.title} className="w-full aspect-[4/3] rounded-2xl object-cover" />
                  <h4 className="font-tech font-bold text-sm text-white">{design.title}</h4>
                  <button
                    onClick={() => handleOpenRemixModal(design)}
                    className="w-full py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500 text-xs font-bold"
                  >
                    ⚡ Remixear Ahora
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          MODAL: REMIX STUDIO CON INTELIGENCIA ARTIFICIAL
          ========================================================= */}
      {remixingDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-mono text-xs">
          <div className="bg-cyber-900 border border-cyan-500/50 rounded-3xl p-6 max-w-2xl w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setRemixingDesign(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500">
                <GitFork className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">
                  ESTUDIO DE REMIX & BIFURCACIÓN CREATIVA CON IA
                </h3>
                <p className="text-slate-400 text-[11px]">
                  Bifurcando: <strong>"{remixingDesign.title}"</strong> (Original de {remixingDesign.author})
                </p>
              </div>
            </div>

            {/* Lineage Tree Badge */}
            <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Árbol de Atribución:</span>
              <span className="text-cyan-300 font-bold">
                {remixingDesign.author} $	o$ {remixingDesign.title} $	o$ Tu Remix
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] block">Material / Textura de Reemplazo:</label>
                <select
                  value={remixTextureMaterial}
                  onChange={(e) => setRemixTextureMaterial(e.target.value)}
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="Cuero Nobuk Hidrófugo">Cuero Nobuk Hidrófugo</option>
                  <option value="Alcantara & Fibra de Carbono">Alcantara & Fibra de Carbono</option>
                  <option value="Madera Contrachapada Curvada 18mm">Madera Contrachapada Curvada 18mm</option>
                  <option value="Seda Japonesa Estampada">Seda Japonesa Estampada</option>
                  <option value="Titanio Pulido & Vidrio">Titanio Pulido & Vidrio</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] block">Acento Cromático Principal:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={remixColorTone}
                    onChange={(e) => setRemixColorTone(e.target.value)}
                    className="w-10 h-8 rounded-lg bg-cyber-950 border border-cyber-700 cursor-pointer"
                  />
                  <span className="text-xs text-cyan-300 font-mono font-bold">{remixColorTone.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 text-[11px] block">Prompt de Variación IA:</label>
              <textarea
                value={remixPrompt}
                onChange={(e) => setRemixPrompt(e.target.value)}
                rows={3}
                className="w-full bg-cyber-950 border border-cyber-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handleExecuteRemix}
                disabled={isGeneratingRemix}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all"
              >
                {isGeneratingRemix ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Renderizando Remix 3D con Atribución...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Generar & Publicar Remix en Comunidad</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
