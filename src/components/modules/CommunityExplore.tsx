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
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface CommunityDesign {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  category: 'streetwear' | 'footwear' | 'interior' | 'hardware';
  image: string;
  likes: number;
  views: number;
  remixes: number;
  modelType: string;
  primaryColor: string;
  tags: string[];
}

interface CommunityExploreProps {
  onRemixDesign?: (design: CommunityDesign) => void;
}

export const CommunityExplore: React.FC<CommunityExploreProps> = ({ onRemixDesign }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const communityDesigns: CommunityDesign[] = [
    {
      id: 'des-001',
      title: 'Chaqueta Cyberpunk Neo-Tokyo Modular',
      author: 'Kaito Tanaka (Tokyo)',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      category: 'streetwear',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
      likes: 342,
      views: 1840,
      remixes: 48,
      modelType: 'jacket',
      primaryColor: '#e5a93c',
      tags: ['#cyberpunk', '#techwear', '#tokyo', '#pbr']
    },
    {
      id: 'des-002',
      title: 'Sneaker Gravitacional Apex Void V2',
      author: 'Elena Rostova (Milán)',
      authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
      category: 'footwear',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
      likes: 512,
      views: 2950,
      remixes: 82,
      modelType: 'sneaker',
      primaryColor: '#06b6d4',
      tags: ['#sneakers', '#futuristic', '#footwear', '#carbon']
    },
    {
      id: 'des-003',
      title: 'Hoodie Oversize GOTS Orgánico Antracita',
      author: 'Mateo Silva (Oporto)',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      category: 'streetwear',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
      likes: 218,
      views: 1204,
      remixes: 31,
      modelType: 'hoodie',
      primaryColor: '#1e293b',
      tags: ['#organic', '#cotton460', '#minimalist']
    },
    {
      id: 'des-004',
      title: 'Silla Paramétrica Avant-Garde Nórdica',
      author: 'Sven Lindqvist (Estocolmo)',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      category: 'interior',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
      likes: 189,
      views: 940,
      remixes: 19,
      modelType: 'chair',
      primaryColor: '#d97706',
      tags: ['#interior', '#furniture', '#nordic', '#3dprint']
    },
    {
      id: 'des-005',
      title: 'Sintetizador Analógico Modular Neón 808',
      author: 'DJ Nyx (Berlín)',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      category: 'hardware',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
      likes: 427,
      views: 2410,
      remixes: 64,
      modelType: 'synth',
      primaryColor: '#a855f7',
      tags: ['#synth', '#audiotech', '#berlin', '#webaudio']
    }
  ];

  const filteredDesigns = communityDesigns.filter((d) => {
    const matchCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const toggleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn transition-colors">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-6 rounded-3xl border border-cyan-500/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500 text-cyan-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-tech font-extrabold text-white tracking-wider">
                AETHER COMMUNITY HUB • EXPLORADOR GLOBAL DE DISEÑO
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/50">
                OPEN INNOVATION
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Descubre creaciones de diseñadores de todo el mundo, remezcla configuraciones en 1 clic y publica tus modelos 3D
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => alert('¡Tu diseño actual en 3D se ha publicado en la galería comunitaria con éxito!')}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyber-gold to-yellow-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Publicar mi Diseño 3D</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-950 p-4 rounded-2xl border border-cyber-800">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por prenda, autor (#techwear, #sneakers, #cyberpunk)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-cyber-900 border border-cyber-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyber-gold"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          {[
            { id: 'all', label: 'Todos los Diseños' },
            { id: 'streetwear', label: '👗 Streetwear & Moda' },
            { id: 'footwear', label: '👟 Calzado & Sneakers' },
            { id: 'interior', label: '🛋️ Mobiliario' },
            { id: 'hardware', label: '🎛️ Hardware & Audio' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyber-gold text-black shadow-gold-glow font-bold'
                  : 'bg-cyber-900 border border-cyber-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Community Designs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDesigns.map((des) => {
          const isLiked = likedMap[des.id];
          return (
            <div
              key={des.id}
              className="bg-cyber-900 border border-cyber-800 hover:border-cyber-gold/50 rounded-3xl overflow-hidden shadow-cyber-card group transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-cyber-950">
                <img
                  src={des.image}
                  alt={des.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono text-cyber-gold font-bold uppercase">
                    {des.category}
                  </span>

                  <button
                    onClick={() => toggleLike(des.id)}
                    className={`p-2 rounded-full backdrop-blur-md transition-all ${
                      isLiked
                        ? 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                        : 'bg-black/60 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Color Hex Pill */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: des.primaryColor }} />
                  <span>{des.primaryColor}</span>
                </div>
              </div>

              {/* Design Meta & Author */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={des.authorAvatar}
                    alt={des.author}
                    className="w-7 h-7 rounded-full object-cover border border-cyber-gold/50"
                  />
                  <span className="text-xs text-slate-400 font-medium">{des.author}</span>
                </div>

                <h3 className="font-tech font-bold text-base text-white group-hover:text-cyber-gold transition-colors">
                  {des.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 font-mono text-[10px] text-cyan-300">
                  {des.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-cyber-950 border border-cyber-800">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Metrics Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-cyber-800">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400" /> {des.likes + (isLiked ? 1 : 0)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" /> {des.views}
                  </span>
                  <span className="flex items-center gap-1 text-cyber-gold">
                    <RotateCcw className="w-3.5 h-3.5" /> {des.remixes} remixes
                  </span>
                </div>

                {/* 1-Click Remix CTA */}
                <button
                  onClick={() => {
                    if (onRemixDesign) {
                      onRemixDesign(des);
                    } else {
                      alert(`¡Diseño "${des.title}" cargado en Aurora 3D Studio para editar y remezclar!`);
                    }
                  }}
                  className="w-full py-2.5 rounded-2xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-gold/50 text-cyber-gold hover:text-white font-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm group-hover:bg-cyber-gold group-hover:text-black"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>⚡ 1-Click Remix & Editar en 3D</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
