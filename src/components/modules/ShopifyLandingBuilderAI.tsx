import React, { useState } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Layers,
  Globe,
  Palette,
  Eye,
  Download,
  Copy,
  Check,
  Zap,
  Sliders,
  CheckCircle2,
  Star,
  ShieldCheck,
  Truck,
  RotateCw,
  RefreshCw,
  Code,
  Smartphone,
  Monitor,
  ArrowRight,
  Flame,
  Clock
} from 'lucide-react';

interface MarketStyle {
  id: string;
  name: string;
  target: string;
  region: string;
  themeColors: { bg: string; text: string; accent: string; card: string; button: string };
  badge: string;
  headline: string;
  subheadline: string;
  promptStyle: string;
  image: string;
}

export const ShopifyLandingBuilderAI: React.FC = () => {
  const [productName, setProductName] = useState('Chaqueta Techwear Modular Cyber Gold X-1');
  const [selectedMarket, setSelectedMarket] = useState<string>('cyberpunk_tokyo');
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'prompt' | 'copy' | 'sections'>('preview');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Selected size & pricing
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState<number>(1);

  const marketStyles: Record<string, MarketStyle> = {
    cyberpunk_tokyo: {
      id: 'cyberpunk_tokyo',
      name: '🇯🇵 Tokio Streetwear / Gen-Z Cyberpunk',
      target: 'Jóvenes de 18-28 años, amantes del anime, techwear y cultura nocturna',
      region: 'Japón & Asia Pacífico',
      themeColors: {
        bg: '#090A0F',
        text: '#F8FAFC',
        accent: '#06B6D4',
        card: '#121520',
        button: '#06B6D4'
      },
      badge: '🔥 TENDENCIA SHIBUYA #1',
      headline: 'EL FUTURO DEL STREETWEAR TÉCNICO HA LLEGADO',
      subheadline: 'Nylon Ripstop hidrofóbico 3-capas con micro-filamentos reflectivos y capucha modular de desacople rápido en 0.4s.',
      promptStyle: 'Fotografía comercial editorial hiperrealista en Shibuya Tokio de noche, iluminación de neón cyan y magenta, modelo cyberpunk vistiendo la prenda técnica con gotas de agua, cámara Hasselblad 4K, 85mm f/1.4, contraste ultra nítido.',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&auto=format&fit=crop&q=80'
    },
    luxury_milan: {
      id: 'luxury_milan',
      name: '🇮🇹 Milán Alta Costura / Luxury Minimalist',
      target: 'Compradores de 28-45 años con alto poder adquisitivo que buscan sofisticación atemporal',
      region: 'Europa Occidental & EE. UU. Este',
      themeColors: {
        bg: '#FAFAFA',
        text: '#111111',
        accent: '#D97706',
        card: '#FFFFFF',
        button: '#111111'
      },
      badge: '✨ COLECCIÓN CÁPSULA MILÁN 2026',
      headline: 'INGENIERÍA TEXTIL DE LUJO SIN PRECEDENTES',
      subheadline: 'Confeccionada con algodón orgánico peinado de 460 GSM y herrajes de titanio pulido a mano en Oporto.',
      promptStyle: 'Fotografía de moda de lujo de estudio en Milán, fondo blanco marfil neutro de alta costura, modelo editorial europeo con pose elegante, luz suave de ventana natural, lente prime 50mm, textura de tela hiperdetallada, Vogue Runway style.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=80'
    },
    outdoor_nordic: {
      id: 'outdoor_nordic',
      name: '🇳🇴 Nordic Techwear / High Performance Outdoor',
      target: 'Entusiastas del senderismo urbano, condiciones climáticas extremas y sostenibilidad',
      region: 'Países Nórdicos, Canadá y Alemania',
      themeColors: {
        bg: '#0F172A',
        text: '#F1F5F9',
        accent: '#10B981',
        card: '#1E293B',
        button: '#10B981'
      },
      badge: '🏔️ CERTIFICADO 20,000 MM IMPERMEABLE',
      headline: 'RESISTE CUALQUIER TORMENTA CON TECNOLOGÍA AETHER-SHIELD',
      subheadline: 'Membrana microporosa transpirable que bloquea el viento helado y repele lluvia torrencial mientras evacúa el calor corporal.',
      promptStyle: 'Fotografía comercial en exteriores en los fiordos de Noruega, lluvia tenue y niebla atmosférica, modelo aventurero en acción, gotas de agua rebotando en el tejido hidrofóbico, luz fría polar, Leica SL2, 35mm f/2.',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&auto=format&fit=crop&q=80'
    },
    viral_tiktok: {
      id: 'viral_tiktok',
      name: '🇺🇸 TikTok Direct-to-Consumer / Viral Conversion',
      target: 'Impulso de compra rápido en redes sociales con alta urgencia y prueba social masiva',
      region: 'Estados Unidos & Latinoamérica',
      themeColors: {
        bg: '#0B0F19',
        text: '#FFFFFF',
        accent: '#F43F5E',
        card: '#161F30',
        button: '#F43F5E'
      },
      badge: '⚡ MÁS DE 14,000 UNIDADES VENDIDAS ESTA SEMANA',
      headline: 'LA PRENDA VIRAL DE LA QUE TODOS EN INTERNET ESTÁN HABLANDO',
      subheadline: 'Garantía de satisfacción de 30 días, envío express gratis y más de 3,200 reseñas de 5 estrellas verificadas.',
      promptStyle: 'Foto publicitaria de alto impacto para anuncio de Instagram/TikTok, colores saturados y llamativos, modelo carismático interactuando con la prenda, iluminación de estudio comercial con badges flotantes y alta energía visual.',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&auto=format&fit=crop&q=80'
    }
  };

  const activeMarket = marketStyles[selectedMarket] || marketStyles.cyberpunk_tokyo;

  const handleRegenerateWithAI = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      setIsGeneratingAI(false);
      alert(`¡Landing Page re-optimizada con IA para el mercado "${activeMarket.name}" con nuevo prompt publicitario y copy de conversión!`);
    }, 1200);
  };

  const handleCopyCode = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-6 rounded-3xl border border-cyan-500/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                CREADOR DE LANDINGS SHOPIFY CON IA (HIGH-CONVERSION)
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/50">
                PROMPT PUBLICITARIO + COPY MULTI-MERCADO
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Genera páginas de aterrizaje completas para Shopify a partir de tu modelo 3D, con prompts de imagen comercial, copy persuasivo y estilos por público objetivo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRegenerateWithAI}
            disabled={isGeneratingAI}
            className="px-4 py-2.5 rounded-2xl bg-cyber-950 border border-cyber-700 text-cyan-300 hover:text-white font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isGeneratingAI ? 'animate-spin' : ''}`} />
            <span>{isGeneratingAI ? 'Sintetizando IA...' : 'Re-Generar con IA'}</span>
          </button>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:opacity-90 transition-all flex items-center gap-2"
          >
            <Code className="w-4 h-4" />
            <span>Exportar Liquid / PageFly</span>
          </button>
        </div>
      </div>

      {/* Target Market Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.values(marketStyles).map((m) => (
          <div
            key={m.id}
            onClick={() => setSelectedMarket(m.id)}
            className={`p-4 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
              selectedMarket === m.id
                ? 'bg-cyber-900 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                : 'bg-cyber-950/80 border-cyber-800 hover:border-cyber-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-tech font-bold text-xs text-white block">{m.name}</span>
                {selectedMarket === m.id && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{m.target}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-cyber-800/80 text-[10px] font-mono text-cyan-300 font-bold">
              {m.region}
            </div>
          </div>
        ))}
      </div>

      {/* Tool Navigation Tabs & Device Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-cyber-950 p-2.5 rounded-2xl border border-cyber-800 text-xs">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'preview', label: 'Vista Previa en Vivo', icon: Eye },
            { id: 'prompt', label: 'Prompt Publicitario IA', icon: Sparkles },
            { id: 'copy', label: 'Copywriting & Textos', icon: Zap },
            { id: 'sections', label: 'Estructura de Secciones', icon: Layers }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl font-bold font-tech transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-cyber-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop / Mobile Switcher */}
        <div className="flex items-center gap-1 bg-cyber-900 p-1 rounded-xl border border-cyber-800">
          <button
            onClick={() => setDevicePreview('desktop')}
            className={`p-1.5 rounded-lg transition-all ${
              devicePreview === 'desktop' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'text-slate-400'
            }`}
            title="Vista de Escritorio"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevicePreview('mobile')}
            className={`p-1.5 rounded-lg transition-all ${
              devicePreview === 'mobile' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'text-slate-400'
            }`}
            title="Vista Móvil (iPhone / Android)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'preview' && (
        <div className="flex justify-center">
          <div
            className={`transition-all duration-300 rounded-3xl border border-cyber-800 shadow-2xl overflow-hidden ${
              devicePreview === 'mobile' ? 'w-full max-w-sm' : 'w-full'
            }`}
            style={{ backgroundColor: activeMarket.themeColors.bg, color: activeMarket.themeColors.text }}
          >
            {/* Top Store Notice Bar */}
            <div className="py-2 px-4 text-center text-[11px] font-mono font-bold bg-black/40 text-white flex items-center justify-center gap-2 border-b border-white/10">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeMarket.badge} • ENVÍO EXPRESS GRATIS POR TIEMPO LIMITADO</span>
            </div>

            {/* Hero Section */}
            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Product Visual Display (Left 6 Cols) */}
              <div className="lg:col-span-6 space-y-3">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/50">
                  <img
                    src={activeMarket.image}
                    alt={productName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>IMAGEN PUBLICITARIA IA 4K</span>
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-xl bg-emerald-500/90 text-black font-tech font-bold text-xs shadow-lg">
                    DISPONIBLE: 42 UNIDADES
                  </div>
                </div>

                {/* Micro Thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((idx) => (
                    <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-white/20 bg-black/40">
                      <img src={activeMarket.image} alt="thumb" className="w-full h-full object-cover opacity-80 hover:opacity-100 cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Sales & Buy Box (Right 6 Cols) */}
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-mono opacity-80">(3,482 reseñas verificadas)</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-tech font-extrabold tracking-wide leading-tight">
                    {activeMarket.headline}
                  </h1>

                  <p className="text-xs opacity-80 leading-relaxed font-sans">
                    {activeMarket.subheadline}
                  </p>
                </div>

                {/* Price & Offer Box */}
                <div className="p-4 rounded-2xl border border-white/10 bg-black/20 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-tech font-extrabold text-emerald-400">$128.00 USD</span>
                      <span className="text-sm font-mono opacity-50 line-through">$185.00</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">Ahorras $57.00 USD (30% OFF)</span>
                  </div>
                  <div className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
                    OFERTA TERMINA EN 04:32:10
                  </div>
                </div>

                {/* Size Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span>Talla Seleccionada: {selectedSize}</span>
                    <span className="text-cyan-400 cursor-pointer hover:underline">Guía de Tallas IA 3D</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-2 rounded-xl font-mono font-bold text-xs transition-all border ${
                          selectedSize === s
                            ? 'bg-cyan-500 text-black border-cyan-400 shadow-md'
                            : 'bg-black/30 border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buy Button CTA */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => alert('¡Simulación de Compra de Shopify activada! Procediendo al Checkout seguro.')}
                    className="w-full py-4 rounded-2xl font-tech font-extrabold text-sm uppercase tracking-wider shadow-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    style={{ backgroundColor: activeMarket.themeColors.button, color: selectedMarket === 'luxury_milan' ? '#FFFFFF' : '#000000' }}
                  >
                    <span>AÑADIR AL CARRITO • $128.00 USD</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono opacity-80 pt-2">
                    <div className="flex items-center justify-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Envío 24-48h</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Garantía 30D</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                      <span>Cambios Gratis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Proposition Grid */}
            <div className="p-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 bg-black/20">
              <div className="space-y-1">
                <span className="text-xl">🧵</span>
                <h4 className="font-tech font-bold text-sm">Materiales Certificados GOTS</h4>
                <p className="text-xs opacity-75">Fibras orgánicas tratadas con acabado hidrofóbico libre de fluorocarbonos perjudiciales.</p>
              </div>
              <div className="space-y-1">
                <span className="text-xl">⚡</span>
                <h4 className="font-tech font-bold text-sm">Cremalleras YKK Aquaguard</h4>
                <p className="text-xs opacity-75">Cierres termosellados resistentes al agua diseñados para resistir más de 10,000 ciclos de uso.</p>
              </div>
              <div className="space-y-1">
                <span className="text-xl">🏷️</span>
                <h4 className="font-tech font-bold text-sm">Pasaporte Digital EU 2026</h4>
                <p className="text-xs opacity-75">Código QR en la etiqueta con trazabilidad total de huella de carbono y reciclabilidad.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prompt View Tab */}
      {activeTab === 'prompt' && (
        <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
          <div className="flex items-center justify-between">
            <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> Prompt Publicitario Perfecto Generado por IA
            </h3>
            <button
              onClick={() => {
                navigator.clipboard.writeText(activeMarket.promptStyle);
                alert('¡Prompt publicitario copiado al portapapeles!');
              }}
              className="px-3 py-1.5 rounded-xl bg-cyber-950 border border-cyber-700 text-purple-300 font-bold text-xs uppercase flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar Prompt</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 font-mono text-xs text-slate-300 leading-relaxed">
            {activeMarket.promptStyle}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 bg-cyber-950 rounded-xl border border-cyber-800">
              <span className="text-slate-500 text-[10px] block">Motor de Render Recomendado:</span>
              <span className="text-white font-bold">Midjourney v6.1 / FLUX.1 Pro</span>
            </div>
            <div className="p-3 bg-cyber-950 rounded-xl border border-cyber-800">
              <span className="text-slate-500 text-[10px] block">Iluminación & Atmósfera:</span>
              <span className="text-cyan-400 font-bold">High Commercial Studio Key Light</span>
            </div>
            <div className="p-3 bg-cyber-950 rounded-xl border border-cyber-800">
              <span className="text-slate-500 text-[10px] block">Relación de Aspecto:</span>
              <span className="text-emerald-400 font-bold">--ar 4:5 (E-Commerce Standard)</span>
            </div>
          </div>
        </div>
      )}

      {/* Copywriting Tab */}
      {activeTab === 'copy' && (
        <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card font-mono text-xs">
          <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" /> Fórmulas de Persuasión AIDA / PAS
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
              <span className="text-amber-400 font-bold block">1. Gancho de Atención (Headline AIDA):</span>
              <p className="text-white text-sm font-tech">{activeMarket.headline}</p>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
              <span className="text-cyan-400 font-bold block">2. Interés & Deseo (Subheadline):</span>
              <p className="text-slate-300">{activeMarket.subheadline}</p>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
              <span className="text-emerald-400 font-bold block">3. Llamada a la Acción (CTA de Alta Conversión):</span>
              <p className="text-slate-300">AÑADIR AL CARRITO • $128.00 USD (30% DESCUENTO INMEDIATO)</p>
            </div>
          </div>
        </div>
      )}

      {/* Sections Tab */}
      {activeTab === 'sections' && (
        <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-3 font-mono text-xs">
          <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" /> Módulos Ensamblados en el Tema de Shopify
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Hero Section con Visor 3D Embebido y Zoom 4K',
              'Buy Box con Tallas y Selector de Cantidad Dinámico',
              'Barra de Confianza con Envíos, Garantía y Cambios',
              'Grilla de 3 Beneficios con Materiales y Certificados',
              'Tabla Comparativa Interactiva (Aether vs Otros)',
              'Acordeón de Preguntas Frecuentes (FAQ Dropdown)',
              'Sticky Add to Cart Bar fija en la parte inferior móvil',
              'Galería de Reseñas con Fotos de Clientes Verificados'
            ].map((sec, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">{sec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Exportar a Shopify */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl bg-cyber-900 border border-cyan-500/50 rounded-3xl p-6 shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-tech font-bold text-lg flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400" /> Exportar Landing Page a Shopify / PageFly
              </h3>
              <button onClick={() => setIsExportModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-400">
              Código Liquid listo para copiar y pegar en tu sección de Shopify Theme o importar directamente en PageFly, Shogun o GemPages.
            </p>

            <div className="relative">
              <pre className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-60">
{`<!-- AETHER SYNERGY SHOPIFY LANDING SECTION: ${activeMarket.id.toUpperCase()} -->
<div class="aether-landing-wrapper" style="background-color: ${activeMarket.themeColors.bg}; color: ${activeMarket.themeColors.text};">
  <div class="container mx-auto px-4 py-12">
    <span class="badge font-mono text-xs text-cyan-400">${activeMarket.badge}</span>
    <h1 class="text-4xl font-extrabold mt-2 leading-tight">${activeMarket.headline}</h1>
    <p class="text-base mt-4 opacity-80">${activeMarket.subheadline}</p>
    
    <div class="product-viewer-embed mt-8">
      <iframe src="https://aether.design/embed/3d/model?color=gold" width="100%" height="450px" frameborder="0"></iframe>
    </div>

    <form method="post" action="/cart/add" class="mt-6">
      <input type="hidden" name="id" value="{{ product.variants.first.id }}" />
      <button type="submit" class="w-full py-4 rounded-2xl font-bold uppercase" style="background: ${activeMarket.themeColors.button};">
        Añadir al Carrito - {{ product.price | money }}
      </button>
    </form>
  </div>
</div>`}
              </pre>

              <button
                onClick={handleCopyCode}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-cyan-500 text-black font-tech font-bold text-xs uppercase flex items-center gap-1.5 shadow-md"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? '¡Copiado!' : 'Copiar Liquid'}</span>
              </button>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  alert('¡Archivo de plantilla .liquid y paquete de assets descargado!');
                  setIsExportModalOpen(false);
                }}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-lg"
              >
                Descargar Archivo .Liquid (.ZIP)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
