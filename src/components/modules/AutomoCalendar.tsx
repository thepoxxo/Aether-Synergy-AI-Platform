import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Share2,
  Plus,
  Clock,
  Play,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Video,
  Instagram,
  Facebook,
  Youtube,
  Send,
  Sparkles,
  Zap,
  Filter,
  Check,
  X,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Sliders,
  Copy,
  Layers,
  Image as ImageIcon,
  Flame,
  Radio,
  ExternalLink,
  RefreshCw,
  Eye,
  MessageCircle,
  ThumbsUp,
  DollarSign,
  Globe2,
  Tag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export type SocialPlatformId =
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'youtube'
  | 'pinterest'
  | 'linkedin'
  | 'x_twitter'
  | 'whatsapp_business';

export interface SocialAccountConnection {
  id: SocialPlatformId;
  name: string;
  handle: string;
  iconName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  isConnected: boolean;
  followersCount: string;
  tokenExpiry: string;
  apiProtocol: string;
}

export interface ScheduledPost {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  dayOfWeek: string;
  platforms: SocialPlatformId[];
  type: 'reel_916' | 'photo_4k' | 'carousel' | 'video_ad' | 'drop_launch' | 'b2b_offer';
  typeLabel: string;
  status: 'scheduled' | 'published' | 'draft' | 'processing';
  image: string;
  captionInstagram: string;
  captionFacebook: string;
  captionTiktok: string;
  estimatedReach: number;
  estimatedClicks: number;
  hashtags: string[];
}

const DEFAULT_ACCOUNTS: SocialAccountConnection[] = [
  {
    id: 'instagram',
    name: 'Instagram Business',
    handle: '@aether.cyberwear',
    iconName: 'Instagram',
    color: '#E1306C',
    bgColor: 'bg-pink-500/15',
    borderColor: 'border-pink-500/40',
    isConnected: true,
    followersCount: '48.5K',
    tokenExpiry: 'Válido (60 días)',
    apiProtocol: 'Instagram Graph API v20.0'
  },
  {
    id: 'facebook',
    name: 'Facebook Pages & Groups',
    handle: 'Aether Synergy Official (Página + 12 Grupos)',
    iconName: 'Facebook',
    color: '#1877F2',
    bgColor: 'bg-blue-500/15',
    borderColor: 'border-blue-500/40',
    isConnected: true,
    followersCount: '92.4K',
    tokenExpiry: 'Válido (Meta Token)',
    apiProtocol: 'Meta Graph API v20.0'
  },
  {
    id: 'tiktok',
    name: 'TikTok for Business',
    handle: '@aether_3d_fashion',
    iconName: 'Video',
    color: '#00F2FE',
    bgColor: 'bg-cyan-500/15',
    borderColor: 'border-cyan-500/40',
    isConnected: true,
    followersCount: '124.0K',
    tokenExpiry: 'Válido (OAuth 2.0)',
    apiProtocol: 'TikTok Content Posting API'
  },
  {
    id: 'youtube',
    name: 'YouTube Shorts & Channel',
    handle: 'Aether Synergy 3D Studio',
    iconName: 'Youtube',
    color: '#FF0000',
    bgColor: 'bg-rose-500/15',
    borderColor: 'border-rose-500/40',
    isConnected: true,
    followersCount: '34.2K',
    tokenExpiry: 'Válido (Google OAuth)',
    apiProtocol: 'YouTube Data API v3'
  },
  {
    id: 'pinterest',
    name: 'Pinterest Business Pins',
    handle: 'Aether Design Moodboards',
    iconName: 'Share2',
    color: '#BD081C',
    bgColor: 'bg-red-500/15',
    borderColor: 'border-red-500/40',
    isConnected: false,
    followersCount: '12.8K',
    tokenExpiry: 'Requiere Conexión',
    apiProtocol: 'Pinterest API v5'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Company Page',
    handle: 'Aether Synergy B2B & Textiles',
    iconName: 'Globe2',
    color: '#0A66C2',
    bgColor: 'bg-sky-500/15',
    borderColor: 'border-sky-500/40',
    isConnected: true,
    followersCount: '18.1K',
    tokenExpiry: 'Válido',
    apiProtocol: 'LinkedIn Marketing API'
  },
  {
    id: 'x_twitter',
    name: 'X (Twitter)',
    handle: '@AetherSynergy',
    iconName: 'Send',
    color: '#FFFFFF',
    bgColor: 'bg-slate-500/15',
    borderColor: 'border-slate-500/40',
    isConnected: false,
    followersCount: '8.4K',
    tokenExpiry: 'Requiere Conexión',
    apiProtocol: 'X API v2'
  },
  {
    id: 'whatsapp_business',
    name: 'WhatsApp Broadcast Catalog',
    handle: '+57 300 123 4567 (Lista VIP 1,420 Clientes)',
    iconName: 'MessageCircle',
    color: '#25D366',
    bgColor: 'bg-emerald-500/15',
    borderColor: 'border-emerald-500/40',
    isConnected: true,
    followersCount: '1.4K VIPs',
    tokenExpiry: 'Válido (Cloud API)',
    apiProtocol: 'WhatsApp Business Cloud API'
  }
];

const INITIAL_SCHEDULED_POSTS: ScheduledPost[] = [
  {
    id: 'post-001',
    title: 'Lanzamiento Drop: Chaqueta Cyberpunk Neón 2026',
    date: '2026-10-23',
    time: '19:30',
    dayOfWeek: 'Lunes',
    platforms: ['instagram', 'tiktok', 'facebook'],
    type: 'reel_916',
    typeLabel: '📱 Poxxi Short / Reel 9:16',
    status: 'scheduled',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80',
    captionInstagram: '🔥 El futuro llegó a la calle. Presentamos la Chaqueta Cyberpunk Neón con membranas LED reactivas. Disponible en unidades limitadas. Enlace en bio ⚡ #cyberpunk #streetwear #aether3d',
    captionFacebook: 'Descubre la nueva colección cápsula de chaquetas impermeables con tejido reflectante y patronaje 2D industrial. Compra directa en nuestra tienda oficial con envío global.',
    captionTiktok: '¿Usarías esta chaqueta en el 2026? Diseñada con inteligencia artificial y renderizada en 4K. ¡Comenta tu talla! 🔥👟 #fashion3d #techwear #fyp',
    estimatedReach: 24500,
    estimatedClicks: 1850,
    hashtags: ['#cyberpunk', '#streetwear', '#fashion3d', '#techwear', '#drops']
  },
  {
    id: 'post-002',
    title: 'Spot Cinemático: Sneakers Gravitacionales Apex Void V2',
    date: '2026-10-24',
    time: '21:15',
    dayOfWeek: 'Martes',
    platforms: ['tiktok', 'instagram', 'youtube'],
    type: 'video_ad',
    typeLabel: '🎬 Video Ad Cinemático 4K',
    status: 'scheduled',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80',
    captionInstagram: '👟 Física de retorno de energía y fibra de carbono. Los nuevos Apex Void V2 redefinen el rendimiento urbano.',
    captionFacebook: 'Calzado ergonómico para alto impacto. Conoce las especificaciones técnicas y solicita tu par en preventa.',
    captionTiktok: 'Probando la amortiguación de carbono en cámara lenta ⚡ #sneakers #kicks #futurekicks',
    estimatedReach: 42000,
    estimatedClicks: 3200,
    hashtags: ['#sneakers', '#kicks', '#apexvoid', '#footwear3d']
  },
  {
    id: 'post-003',
    title: 'Lookbook Editorial: Sillón Lounge Escandinavo en Roble',
    date: '2026-10-25',
    time: '12:45',
    dayOfWeek: 'Miércoles',
    platforms: ['instagram', 'pinterest', 'linkedin'],
    type: 'carousel',
    typeLabel: '🎠 Carrusel Lookbook HD',
    status: 'scheduled',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=80',
    captionInstagram: '🌿 Elegancia habitable. Curvas de madera moldeadas por algoritmos y cuero natural toscano.',
    captionFacebook: 'Mobiliario de diseño nórdico para espacios contemporáneos. Fabricación bajo demanda CNC.',
    captionTiktok: 'El proceso detrás de curvar madera de roble de 18mm con tecnología CNC 🪑✨ #woodworking #furniture',
    estimatedReach: 15400,
    estimatedClicks: 920,
    hashtags: ['#furniture', '#nordicdesign', '#woodwork', '#interior3d']
  },
  {
    id: 'post-004',
    title: 'Oferta B2B: Fichas Técnicas & Sourcing de Confección',
    date: '2026-10-26',
    time: '10:00',
    dayOfWeek: 'Jueves',
    platforms: ['linkedin', 'whatsapp_business', 'facebook'],
    type: 'b2b_offer',
    typeLabel: '📢 Anuncio B2B / Mayoristas',
    status: 'scheduled',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=80',
    captionInstagram: 'Conectamos tu marca con fábricas auditadas en Colombia, Portugal y Turquía con TechPacks listos para cortar.',
    captionFacebook: 'Optimiza tus costos de producción textil con nuestra red de proveedores internacionales.',
    captionTiktok: 'Cómo enviar una orden de compra internacional con TechPack oficial en 1 clic 🚀 #b2b #manufacturing',
    estimatedReach: 18900,
    estimatedClicks: 1450,
    hashtags: ['#b2b', '#sourcing', '#apparelmanufacturing', '#techpack']
  }
];

const STORAGE_KEY_POSTS = 'aether_automo_calendar_events_v1';
const STORAGE_KEY_ACCOUNTS = 'aether_social_accounts_v1';

export const AutomoCalendar: React.FC = () => {
  const { consumeCredit } = useAuth();

  // Navigation & View States
  const [activeTab, setActiveTab] = useState<'calendar_view' | 'connected_accounts' | 'analytics_forecast'>('calendar_view');
  const [calendarViewMode, setCalendarViewMode] = useState<'week' | 'month' | 'list'>('week');
  const [currentWeekLabel, setCurrentWeekLabel] = useState('OCTUBRE 23 - 29, 2026');

  // Accounts & Posts State with LocalStorage Persistence
  const [accounts, setAccounts] = useState<SocialAccountConnection[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ACCOUNTS;
  });

  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_POSTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SCHEDULED_POSTS;
  });

  // Filter States
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modal States
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState<boolean>(false);
  const [isConnectAccountModalOpen, setIsConnectAccountModalOpen] = useState<boolean>(false);
  const [selectedAccountToPair, setSelectedAccountToPair] = useState<SocialAccountConnection | null>(null);

  // New Post Form State
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDate, setNewPostDate] = useState('2026-10-27');
  const [newPostTime, setNewPostTime] = useState('19:30');
  const [newPostType, setNewPostType] = useState<any>('reel_916');
  const [newPostPlatforms, setNewPostPlatforms] = useState<SocialPlatformId[]>(['instagram', 'tiktok', 'facebook']);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [newPostImage, setNewPostImage] = useState('https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80');
  const [isGeneratingAiCopy, setIsGeneratingAiCopy] = useState(false);

  // Days of Week definition
  const weekDays = ['Lunes 23', 'Martes 24', 'Miércoles 25', 'Jueves 26', 'Viernes 27', 'Sábado 28', 'Domingo 29'];

  const handleTogglePlatformSelect = (pId: SocialPlatformId) => {
    setNewPostPlatforms((prev) =>
      prev.includes(pId) ? prev.filter((id) => id !== pId) : [...prev, pId]
    );
  };

  const handleToggleAccountConnection = (accountId: SocialPlatformId) => {
    const updated = accounts.map((acc) => {
      if (acc.id === accountId) {
        return {
          ...acc,
          isConnected: !acc.isConnected,
          tokenExpiry: !acc.isConnected ? 'Válido (Conectado Hoy)' : 'Desconectado'
        };
      }
      return acc;
    });
    setAccounts(updated);
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(updated));
  };

  const handleGenerateAiCopy = async () => {
    if (!newPostTitle.trim()) {
      alert('Por favor escribe un título o concepto de la publicación primero.');
      return;
    }
    setIsGeneratingAiCopy(true);
    await new Promise((r) => setTimeout(r, 1400));

    const generated = `🔥 ¡Llegó el momento! ${newPostTitle.toUpperCase()}\n\nDiseñado con inteligencia artificial en Aether Synergy Labs y fabricado bajo estándares de alta costura y precisión industrial.\n\n🛒 Disponible con stock limitado para envío mundial.\n👉 Toca el enlace en nuestra biografía para ordenar.\n\n#aether3d #streetwear #fashiontech #luxury #drops2026 #viral`;
    setNewPostCaption(generated);
    setIsGeneratingAiCopy(false);
  };

  const handleSaveScheduledPost = (e: React.FormEvent, publishImmediately = false) => {
    e.preventDefault();
    if (!newPostTitle.trim()) {
      alert('Ingresa el título del post.');
      return;
    }
    if (newPostPlatforms.length === 0) {
      alert('Selecciona al menos 1 red social para publicar.');
      return;
    }

    const createdPost: ScheduledPost = {
      id: 'post-' + Date.now(),
      title: newPostTitle.trim(),
      date: newPostDate,
      time: newPostTime,
      dayOfWeek: 'Viernes',
      platforms: newPostPlatforms,
      type: newPostType,
      typeLabel: newPostType === 'reel_916' ? '📱 Poxxi Short / Reel 9:16' : newPostType === 'photo_4k' ? '📸 Foto Estudio 4K' : '🎬 Video Ad 4K',
      status: publishImmediately ? 'published' : 'scheduled',
      image: newPostImage,
      captionInstagram: newPostCaption || newPostTitle,
      captionFacebook: newPostCaption || newPostTitle,
      captionTiktok: newPostCaption || newPostTitle,
      estimatedReach: Math.floor(Math.random() * 25000) + 10000,
      estimatedClicks: Math.floor(Math.random() * 2000) + 800,
      hashtags: ['#aether', '#design3d', '#viral', '#drop2026']
    };

    const updated = [createdPost, ...scheduledPosts];
    setScheduledPosts(updated);
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(updated));

    setIsCreatePostModalOpen(false);
    setNewPostTitle('');
    setNewPostCaption('');

    if (publishImmediately) {
      alert(`¡Publicación "${createdPost.title}" enviada y publicada inmediatamente en ${createdPost.platforms.join(', ')}!`);
    } else {
      alert(`¡Publicación programada exitosamente para el ${createdPost.date} a las ${createdPost.time}!`);
    }
  };

  const handleDeletePost = (postId: string) => {
    const updated = scheduledPosts.filter((p) => p.id !== postId);
    setScheduledPosts(updated);
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(updated));
  };

  // Filter logic
  const filteredPosts = scheduledPosts.filter((post) => {
    const matchPlatform = platformFilter === 'all' || post.platforms.includes(platformFilter as any);
    const matchStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchPlatform && matchStatus;
  });

  const totalMonthlyReach = scheduledPosts.reduce((acc, p) => acc + p.estimatedReach, 0);
  const totalMonthlyClicks = scheduledPosts.reduce((acc, p) => acc + p.estimatedClicks, 0);

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white font-mono text-xs select-none">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/95 p-6 rounded-3xl border border-cyber-gold/50 shadow-cyber-card backdrop-blur-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyber-gold/20 to-amber-500/10 border border-cyber-gold text-cyber-gold shadow-gold-glow">
            <CalendarIcon className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                AUTOMO • CALENDARIO & PILOTO AUTOMÁTICO DE REDES SOCIALES
              </h2>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/50">
                MULTI-CANAL 360°
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Programa, sincroniza y difunde automáticamente tus fotos de estudio, reels Poxxi 3D y spots cinemáticos en Instagram, TikTok, Facebook, YouTube y LinkedIn.
            </p>
          </div>
        </div>

        {/* Global Header Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsCreatePostModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Programar / Publicar Post</span>
          </button>
        </div>
      </div>

      {/* Navigation Mode Tabs */}
      <div className="flex flex-wrap gap-2 bg-cyber-900/90 p-2 rounded-2xl border border-cyber-800 shadow-cyber-card">
        <button
          onClick={() => setActiveTab('calendar_view')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all ${
            activeTab === 'calendar_view'
              ? 'bg-cyber-gold text-black shadow-gold-glow font-extrabold'
              : 'text-slate-400 hover:text-white bg-cyber-950/60 border border-cyber-800'
          }`}
        >
          <CalendarIcon className="w-4 h-4" />
          <span>📅 Calendario Editorial</span>
        </button>

        <button
          onClick={() => setActiveTab('connected_accounts')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all ${
            activeTab === 'connected_accounts'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md font-extrabold'
              : 'text-cyan-300 hover:text-white bg-cyan-500/10 border border-cyan-500/30'
          }`}
        >
          <Share2 className="w-4 h-4 text-cyan-400" />
          <span>🔌 Cuentas Conectadas ({accounts.filter((a) => a.isConnected).length}/{accounts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics_forecast')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all ${
            activeTab === 'analytics_forecast'
              ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md font-extrabold'
              : 'text-purple-300 hover:text-white bg-purple-500/10 border border-purple-500/30'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-purple-400" />
          <span>📊 Pronóstico de Alcance & Clicks</span>
        </button>
      </div>

      {/* =========================================================
          TAB 1: CALENDARIO EDITORIAL INTERACTIVO
          ========================================================= */}
      {activeTab === 'calendar_view' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Week Navigation Strip & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900 p-4 rounded-3xl border border-cyber-800 shadow-cyber-card">
            {/* Week Navigator */}
            <div className="flex items-center gap-2 bg-cyber-950 px-4 py-2 rounded-2xl border border-cyber-800">
              <button
                onClick={() => setCurrentWeekLabel('OCTUBRE 16 - 22, 2026')}
                className="p-1 text-slate-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-tech font-bold text-sm text-white px-2">{currentWeekLabel}</span>
              <button
                onClick={() => setCurrentWeekLabel('OCTUBRE 30 - NOV 05, 2026')}
                className="p-1 text-slate-400 hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Filter by Platform */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs">Filtrar Red:</span>
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="bg-cyber-950 border border-cyber-700 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
              >
                <option value="all">🌟 Todas las Redes</option>
                <option value="instagram">📸 Instagram</option>
                <option value="tiktok">🎵 TikTok</option>
                <option value="facebook">📘 Facebook</option>
                <option value="youtube">▶️ YouTube</option>
                <option value="linkedin">💼 LinkedIn</option>
              </select>
            </div>
          </div>

          {/* 7-Days Weekly Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {weekDays.map((dayLabel, idx) => {
              const dayPosts = filteredPosts.filter((p, i) => i % 7 === idx || (idx === 0 && i === 0));

              return (
                <div
                  key={dayLabel}
                  className="rounded-3xl bg-cyber-900/80 border border-cyber-800 p-3.5 space-y-3 flex flex-col min-h-[420px] shadow-cyber-card"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-cyber-800">
                    <span className="font-tech font-bold text-xs text-slate-200">{dayLabel}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Posts Cards inside Day */}
                  <div className="space-y-2.5 flex-1">
                    {dayPosts.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-3 text-slate-600 space-y-1">
                        <Clock className="w-5 h-5 text-slate-700" />
                        <span className="text-[10px]">Sin posts programados</span>
                      </div>
                    ) : (
                      dayPosts.map((post) => (
                        <div
                          key={post.id}
                          className="p-3 rounded-2xl bg-cyber-950 border border-cyber-700/80 space-y-2 relative group hover:border-cyber-gold transition-all shadow-md"
                        >
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="px-2 py-0.5 rounded bg-cyber-900 border border-cyber-700 text-cyber-gold font-bold">
                              {post.time}
                            </span>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="text-slate-500 hover:text-rose-400"
                              title="Eliminar post"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="aspect-video rounded-xl overflow-hidden bg-black/50">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                          </div>

                          <h4 className="font-tech font-bold text-xs text-white line-clamp-2">
                            {post.title}
                          </h4>

                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-cyber-900">
                            <span className="text-cyan-300 font-bold">{post.typeLabel}</span>
                            <span className="text-emerald-400 font-mono font-bold">
                              {(post.estimatedReach / 1000).toFixed(1)}k alcance
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Quick Add Button on Day */}
                  <button
                    onClick={() => {
                      setNewPostDate(`2026-10-${23 + idx}`);
                      setIsCreatePostModalOpen(true);
                    }}
                    className="w-full py-1.5 rounded-xl bg-cyber-950 hover:bg-cyber-800 text-slate-400 hover:text-white border border-cyber-800 text-[10px] font-bold transition-all"
                  >
                    + Añadir Post
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: CUENTAS DE REDES SOCIALES CONECTADAS (OAUTH 2.0)
          ========================================================= */}
      {activeTab === 'connected_accounts' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-cyber-900 p-5 rounded-3xl border border-cyber-800 shadow-cyber-card flex items-center justify-between">
            <div>
              <h3 className="font-tech font-bold text-base text-white">
                Centro de Vinculación de Cuentas Oficiales
              </h3>
              <p className="text-slate-400 text-xs">
                Tokens de acceso y permisos OAuth 2.0 para publicación desatendida y lectura de métricas
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
              {accounts.filter((a) => a.isConnected).length} CANALES ACTIVOS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {accounts.map((acc) => (
              <div
                key={acc.id}
                className={`p-5 rounded-3xl border transition-all space-y-4 shadow-cyber-card ${
                  acc.isConnected
                    ? 'bg-cyber-900 border-cyber-700 hover:border-cyber-gold'
                    : 'bg-cyber-950/80 border-cyber-800/80 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-md"
                    style={{ backgroundColor: acc.color }}
                  >
                    {acc.name.substring(0, 2).toUpperCase()}
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      acc.isConnected
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {acc.isConnected ? 'CONECTADO 🟢' : 'DESCONECTADO 🔴'}
                  </span>
                </div>

                <div>
                  <h4 className="font-tech font-bold text-sm text-white">{acc.name}</h4>
                  <span className="text-[11px] text-slate-400 block truncate">{acc.handle}</span>
                </div>

                <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1 font-mono text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Audiencia:</span>
                    <span className="text-white font-bold">{acc.followersCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">API:</span>
                    <span className="text-cyan-300">{acc.apiProtocol.split(' ')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Token:</span>
                    <span className="text-emerald-400 font-bold">{acc.tokenExpiry}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleAccountConnection(acc.id)}
                  className={`w-full py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all ${
                    acc.isConnected
                      ? 'bg-cyber-950 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-cyber-800'
                      : 'bg-cyber-gold text-black shadow-gold-glow'
                  }`}
                >
                  {acc.isConnected ? 'Desvincular Cuenta' : '⚡ Conectar con OAuth'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: PRONÓSTICO DE ALCANCE & CLICKS (ANALYTICS)
          ========================================================= */}
      {activeTab === 'analytics_forecast' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-2">
              <span className="text-slate-400 text-xs block font-bold uppercase">Alcance Mensual Proyectado:</span>
              <span className="text-3xl font-tech font-black text-emerald-400">
                {totalMonthlyReach.toLocaleString()} Impresiones
              </span>
              <p className="text-[11px] text-slate-500">Basado en la frecuencia de posts programados</p>
            </div>

            <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-2">
              <span className="text-slate-400 text-xs block font-bold uppercase">Tráfico Estimado a Tienda:</span>
              <span className="text-3xl font-tech font-black text-cyber-gold">
                {totalMonthlyClicks.toLocaleString()} Clicks
              </span>
              <p className="text-[11px] text-slate-500">Conversión estimada de enlaces y biografía</p>
            </div>

            <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-2">
              <span className="text-slate-400 text-xs block font-bold uppercase">Mejor Horario de Publicación:</span>
              <span className="text-3xl font-tech font-black text-purple-300">
                19:30 - 21:15
              </span>
              <p className="text-[11px] text-slate-500">Pico de mayor interacción en moda y diseño 3D</p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: PROGRAMAR / PUBLICAR POST CON COPYWRITING IA
          ========================================================= */}
      {isCreatePostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyber-gold/50 rounded-3xl p-6 max-w-2xl w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsCreatePostModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyber-gold/20 text-cyber-gold border border-cyber-gold">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">
                  CREAR PUBLICACIÓN MULTICANAL & COPYWRITING IA
                </h3>
                <p className="text-slate-400 text-xs">
                  Sincroniza y publica en múltiples redes simultáneamente con inteligencia artificial
                </p>
              </div>
            </div>

            <form className="space-y-4 pt-2">
              {/* Platforms Multi-Select Checkboxes */}
              <div>
                <label className="text-slate-300 font-bold block mb-1.5">Canales de Publicación:</label>
                <div className="flex flex-wrap gap-2">
                  {accounts.map((acc) => {
                    const isSelected = newPostPlatforms.includes(acc.id);
                    return (
                      <button
                        type="button"
                        key={acc.id}
                        onClick={() => handleTogglePlatformSelect(acc.id)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-cyber-gold text-black border-cyber-gold shadow-gold-glow'
                            : 'bg-cyber-950 border-cyber-800 text-slate-400'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{acc.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title & Format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Título / Concepto del Post:</label>
                  <input
                    type="text"
                    required
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="ej: Lanzamiento Colección Chaqueta Neón"
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyber-gold"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Formato de Contenido:</label>
                  <select
                    value={newPostType}
                    onChange={(e) => setNewPostType(e.target.value)}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-gold"
                  >
                    <option value="reel_916">📱 Poxxi Short / Reel Vertical 9:16</option>
                    <option value="photo_4k">📸 Foto Estudio 4K</option>
                    <option value="carousel">🎠 Carrusel Lookbook HD</option>
                    <option value="video_ad">🎬 Spot Cinemático Video Ad</option>
                    <option value="b2b_offer">📢 Anuncio B2B / Mayoristas</option>
                  </select>
                </div>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Fecha de Publicación:</label>
                  <input
                    type="date"
                    value={newPostDate}
                    onChange={(e) => setNewPostDate(e.target.value)}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyber-gold"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Hora de Lanzamiento:</label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      value={newPostTime}
                      onChange={(e) => setNewPostTime(e.target.value)}
                      className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyber-gold"
                    />
                    <button
                      type="button"
                      onClick={() => setNewPostTime('19:30')}
                      className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-bold shrink-0"
                      title="Hora de engagement pico sugerida por IA"
                    >
                      ⚡ Mejor Hora (19:30)
                    </button>
                  </div>
                </div>
              </div>

              {/* Caption with AI Copywriter */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-bold">Copywriting / Pie de Foto Multicanal:</label>
                  <button
                    type="button"
                    onClick={handleGenerateAiCopy}
                    disabled={isGeneratingAiCopy}
                    className="text-cyber-gold hover:underline text-xs flex items-center gap-1 font-bold"
                  >
                    {isGeneratingAiCopy ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Generando Copy Persuasivo...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Redactar con IA</span>
                      </>
                    )}
                  </button>
                </div>

                <textarea
                  value={newPostCaption}
                  onChange={(e) => setNewPostCaption(e.target.value)}
                  rows={4}
                  placeholder="Escribe el texto de la publicación o haz clic en 'Redactar con IA' para que J.A.R.V.I.S. cree el copy..."
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyber-gold font-mono"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={(e) => handleSaveScheduledPost(e, true)}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-tech font-extrabold text-xs uppercase tracking-wider shadow-md hover:opacity-95 transition-all"
                >
                  🚀 Publicar Ahora Inmediatamente
                </button>

                <button
                  type="button"
                  onClick={(e) => handleSaveScheduledPost(e, false)}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-extrabold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-all"
                >
                  🕒 Programar en Calendario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
