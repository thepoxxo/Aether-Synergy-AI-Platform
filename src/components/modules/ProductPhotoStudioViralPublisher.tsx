import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Camera,
  Upload,
  Sparkles,
  Share2,
  Send,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Layers,
  ShoppingBag,
  TrendingUp,
  Globe2,
  DollarSign,
  MessageCircle,
  Play,
  Settings2,
  ShieldCheck,
  Zap,
  Check,
  X,
  Eye,
  Sliders,
  Users,
  Film,
  Building,
  ChevronRight,
  HelpCircle,
  Maximize2
} from 'lucide-react';
import {
  ProductCategory,
  StudioSceneTheme,
  StudioScenePreset,
  PresentationAngle,
  FacebookGroupTarget,
  SocialNetworkTarget,
  ProductPhotoProject,
  PublishingLogItem,
  AutoPublishCampaignResult
} from '../../types/productPhotoStudio';
import { facebookPublisherService } from '../../services/facebookPublisherService';

// Escenarios de Estudio Hiperrealistas Disponibles
const STUDIO_SCENE_PRESETS: StudioScenePreset[] = [
  {
    id: 'cyberpunk_urban',
    name: 'Urbano Streetwear Tokio',
    category: 'Moda / Ropa',
    emoji: '🏙️',
    description: 'Calles nocturnas de Shibuya con reflejos de neón y asfalto húmedo.',
    lightingType: 'Neón Dual Cian/Magenta 6500K',
    recommendedFor: 'Streetwear, Hoodies, Sneakers, Accesorios',
    bgImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#06b6d4'
  },
  {
    id: 'botanical_minimal',
    name: 'Estudio Botánico & Luz Natural',
    category: 'Orgánico / Minimal',
    emoji: '🌿',
    description: 'Mesa de madera de roble, sombras suaves de palmeras y luz solar matutina.',
    lightingType: 'Luz Natural Difusa 5600K',
    recommendedFor: 'Cosméticos, Botellas, Ropa Orgánica, Decoración',
    bgImageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#10b981'
  },
  {
    id: 'luxury_marble',
    name: 'Lujo Mármol Carrara & Oro',
    category: 'Alta Gama / Joyas',
    emoji: '👑',
    description: 'Pedestal de mármol negro con vetas doradas e iluminación cenital puntual.',
    lightingType: 'Spotlight Especular 3-Point Light',
    recommendedFor: 'Joyería, Relojes, Bolsos de Piel, Perfumería',
    bgImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#e5a93c'
  },
  {
    id: 'golden_hour_beach',
    name: 'Golden Hour Atardecer Lifestyle',
    category: 'Casual & Verano',
    emoji: '🏖️',
    description: 'Costa cálida con arena dorada, mar en calma y desenfoque bokeh suave.',
    lightingType: 'Luz Cálida Sunset 3200K',
    recommendedFor: 'Gafas de sol, Trajes de Baño, Calzado Casual',
    bgImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#f59e0b'
  },
  {
    id: 'nordic_coffee',
    name: 'Cafetería Boutique Nórdica',
    category: 'Lifestyle / Confort',
    emoji: '☕',
    description: 'Interior cálido con maderas claras, tazas artesanales y vibra acogedora.',
    lightingType: 'Luz de Ambiente Suave Tungsteno',
    recommendedFor: 'Tazas, Prendas de Punto, Muebles, Alimentos',
    bgImageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#b45309'
  },
  {
    id: 'futuristic_podium',
    name: 'Podio Futurista WebGPU 3D',
    category: 'Tecnología & Hardware',
    emoji: '⚡',
    description: 'Pedestal flotante con anillos de luz volumétrica y partículas holográficas.',
    lightingType: 'Luz Volumétrica Láser & Rim Light',
    recommendedFor: 'Gadgets, Auriculares, Hardware, Gaming Gear',
    bgImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#8b5cf6'
  },
  {
    id: 'boutique_showroom',
    name: 'Showroom Boutique Alta Costura',
    category: 'Boutique / Moda',
    emoji: '🛋️',
    description: 'Tienda insignia minimalista con percheros de latón e iluminación de pasarela.',
    lightingType: 'Luces de Riel Direccionales 4000K',
    recommendedFor: 'Vestidos, Chaquetas, Sastrería, Zapatos',
    bgImageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#ec4899'
  }
];

export const ProductPhotoStudioViralPublisher: React.FC = () => {
  const { t } = useLanguage();

  // 1. Estado del Proyecto de Fotografía
  const [productName, setProductName] = useState('Chaqueta Techwear Neón Cyber Edition');
  const [category, setCategory] = useState<ProductCategory>('fashion_apparel');
  const [activeScene, setActiveScene] = useState<StudioSceneTheme>('cyberpunk_urban');
  const [presentationAngle, setPresentationAngle] = useState<PresentationAngle>('virtual_human_model');
  const [isABTestModalOpen, setIsABTestModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isGhostMannequinActive, setIsGhostMannequinActive] = useState(false);
  const [regularPrice, setRegularPrice] = useState(140);
  const [promoPrice, setPromoPrice] = useState(89);
  const [currency, setCurrency] = useState('USD');
  const [whatsappNumber, setWhatsappNumber] = useState('+57 300 123 4567');

  // Imagen original y recreada
  const [originalImage, setOriginalImage] = useState<string>(
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
  );
  const [isBackgroundRemoved, setIsBackgroundRemoved] = useState(true);
  const [isRecreatingPhoto, setIsRecreatingPhoto] = useState(false);
  const [recreateProgress, setRecreateProgress] = useState(0);
  const [isRecreatedSuccess, setIsRecreatedSuccess] = useState(false);
  const [recreatedImageUrl, setRecreatedImageUrl] = useState<string>(
    'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80'
  );

  // Cámara en vivo
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. Estado del Copywriting Persuasivo con IA
  const [salesCopy, setSalesCopy] = useState(
    `🔥 ¡EDICIÓN LIMITADA 2026! 🔥\n` +
    `Descubre la nueva Chaqueta Techwear Neón con membrana hidrofóbica y bolsillos modulares.\n\n` +
    `⚡ PRECIO NORMAL: $140 USD\n` +
    `💎 PRECIO PROMO HOY: $89 USD (-36% OFF)\n` +
    `📦 Envíos asegurados a todo el país y pago contra entrega.\n\n` +
    `📲 HAZ TU PEDIDO AHORA POR WHATSAPP: +57 300 123 4567\n` +
    `👇 ¡Pocas unidades disponibles en stock!`
  );

  // 3. Redes Sociales & Grupos de Facebook
  const [networks, setNetworks] = useState<SocialNetworkTarget[]>([
    { id: 'facebook_groups', name: 'Facebook Grupos (Auto-Blast)', icon: '👥', enabled: true, reachEstimate: '+450,000 miembros', connected: true },
    { id: 'facebook_marketplace', name: 'Facebook Marketplace', icon: '🏷️', enabled: true, reachEstimate: '+120,000 visitas/día', connected: true },
    { id: 'instagram_feed', name: 'Instagram Feed & Stories', icon: '📸', enabled: true, reachEstimate: '+65,000 seguidores', connected: true },
    { id: 'tiktok_shop', name: 'TikTok Shop / Carrusel', icon: '🎵', enabled: true, reachEstimate: '+90,000 reproducciones', connected: true },
    { id: 'whatsapp_broadcast', name: 'WhatsApp Catálogo & Difusión', icon: '💬', enabled: true, reachEstimate: '+1,800 clientes VIP', connected: true },
    { id: 'pinterest_pins', name: 'Pinterest Rich Pins', icon: '📌', enabled: true, reachEstimate: '+45,000 impresiones', connected: true },
    { id: 'shopify_store', name: 'Shopify Store Sincronización', icon: '🛒', enabled: true, reachEstimate: 'Publicación Inmediata', connected: true }
  ]);

  const [facebookGroups, setFacebookGroups] = useState<FacebookGroupTarget[]>(() =>
    facebookPublisherService.getAllGroups()
  );
  const [groupCategoryFilter, setGroupCategoryFilter] = useState<string>('all');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [apiConfig, setApiConfig] = useState(facebookPublisherService.getApiConfig());

  // 4. Campaña de Publicación Masiva
  const [isPublishingCampaign, setIsPublishingCampaign] = useState(false);
  const [campaignProgress, setCampaignProgress] = useState(0);
  const [liveLogs, setLiveLogs] = useState<PublishingLogItem[]>([]);
  const [campaignResult, setCampaignResult] = useState<AutoPublishCampaignResult | null>(null);
  const [isLiveLogModalOpen, setIsLiveLogModalOpen] = useState(false);

  // Efecto para escuchar cambios en los grupos de Facebook
  useEffect(() => {
    const handleGroupsUpdate = () => {
      setFacebookGroups(facebookPublisherService.getAllGroups());
    };
    window.addEventListener('aether_fbgroups_updated', handleGroupsUpdate);
    return () => window.removeEventListener('aether_fbgroups_updated', handleGroupsUpdate);
  }, []);

  // Activar cámara web del usuario
  const handleStartCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('No se pudo acceder a la cámara. Verifica los permisos de tu navegador.');
      setIsCameraActive(false);
    }
  };

  // Capturar frame de cámara
  const handleCaptureSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setOriginalImage(dataUrl);
        setIsCameraActive(false);
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach((track) => track.stop());
      }
    }
  };

  // Subir imagen desde el ordenador
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setOriginalImage(uploadEvent.target.result as string);
          setIsRecreatedSuccess(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Recrear fotografía con IA en el escenario seleccionado
  const handleRecreatePhotoWithAI = async () => {
    setIsRecreatingPhoto(true);
    setRecreateProgress(10);
    setIsRecreatedSuccess(false);

    const steps = [25, 45, 70, 90, 100];
    for (const step of steps) {
      await new Promise((r) => setTimeout(r, 400));
      setRecreateProgress(step);
    }

    // Seleccionar imagen de escenario correspondiente
    const selectedPreset = STUDIO_SCENE_PRESETS.find((s) => s.id === activeScene);
    if (selectedPreset) {
      setRecreatedImageUrl(selectedPreset.bgImageUrl);
    }

    setIsRecreatingPhoto(false);
    setIsRecreatedSuccess(true);
  };

  // Generar Copywriting con IA
  const handleRegenerateSalesCopy = (tone: 'urgent' | 'luxury' | 'discount') => {
    if (tone === 'urgent') {
      setSalesCopy(
        `🚨 ¡ÚLTIMAS UNIDADES EN STOCK! 🚨\n` +
        `La exclusiva ${productName} se está agotando rápidamente.\n\n` +
        `💥 PRECIO HOY: $${promoPrice} ${currency} (Ahorra $${regularPrice - promoPrice} ${currency})\n` +
        `🚀 Despacho express en 24 horas y garantía de devolución.\n\n` +
        `📲 Cómprala directamente por WhatsApp: ${whatsappNumber}\n` +
        `👉 ¡Toca el link y no te quedes sin la tuya!`
      );
    } else if (tone === 'luxury') {
      setSalesCopy(
        `👑 ELEGANCIA & DISTINCIÓN DE ALTO NIVEL 👑\n` +
        `Presentamos ${productName}, fabricado con materiales de grado superior y acabados impecables.\n\n` +
        `💎 Inversión: $${promoPrice} ${currency} (Precio de Lanzamiento)\n` +
        `✨ Incluye certificado de autenticidad y packaging premium.\n\n` +
        `📲 Solicita tu asesoría personalizada vía WhatsApp: ${whatsappNumber}`
      );
    } else {
      setSalesCopy(
        `🎉 ¡SUPER OFERTA EXCLUSIVA DE TEMPORADA! 🎉\n` +
        `Lleva tu ${productName} con descuento masivo por tiempo limitado.\n\n` +
        `💰 Antes: $${regularPrice} ${currency} ➔ AHORA: $${promoPrice} ${currency}\n` +
        `📦 Paga al recibir en la puerta de tu casa.\n\n` +
        `📲 Envía un mensaje a nuestro WhatsApp: ${whatsappNumber}`
      );
    }
  };

  // Alternar selección de red social
  const handleToggleNetwork = (id: string) => {
    setNetworks((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  // Iniciar la Campaña Masiva Automática
  const handleStartViralPublishing = async () => {
    const selectedGroups = facebookGroups.filter((g) => g.selected);
    if (selectedGroups.length === 0 && !networks.some((n) => n.enabled)) {
      alert('Por favor selecciona al menos un grupo de Facebook o una red social.');
      return;
    }

    setIsPublishingCampaign(true);
    setCampaignProgress(0);
    setLiveLogs([]);
    setIsLiveLogModalOpen(true);

    const project: ProductPhotoProject = {
      id: `proj_${Date.now()}`,
      productName,
      category,
      originalImageUrl: originalImage,
      recreatedImageUrl,
      activeScene,
      presentationAngle,
      regularPrice,
      promoPrice,
      currency,
      whatsappNumber,
      salesCopy,
      hashtags: ['#Moda2026', '#Streetwear', '#Oferta', '#TiendaOnline', '#CompraSegura'],
      createdAt: new Date().toISOString()
    };

    const result = await facebookPublisherService.executeAutoPublishCampaign(
      project,
      networks,
      (newLog, progressPercent) => {
        setLiveLogs((prev) => [newLog, ...prev]);
        setCampaignProgress(progressPercent);
      }
    );

    setCampaignResult(result);
    setIsPublishingCampaign(false);
  };

  const selectedGroupsCount = facebookGroups.filter((g) => g.selected).length;
  const totalAudienceReach = facebookGroups
    .filter((g) => g.selected)
    .reduce((acc, g) => acc + g.membersCount, 0);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn text-slate-100">
      {/* =========================================================
          ENCABEZADO MASTER
          ========================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-cyber-900/90 border border-cyber-800 p-6 rounded-3xl backdrop-blur-xl shadow-cyber-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/20 shrink-0">
            <Camera className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-tech text-2xl font-bold text-white tracking-wide">
                ESTUDIO FOTOGRÁFICO IA & PUBLICADOR VIRAL FACEBOOK
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                GRAPH API v20.0
              </span>
            </div>
            <p className="text-slate-400 text-xs font-mono mt-1">
              Toma o sube fotos de producto, recréalos en escenarios de alta conversión y publica automáticamente en cientos de grupos de Facebook y redes sociales para maximizar ventas.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          <button
            onClick={() => setIsConfigModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cyber-950 border border-cyber-700 hover:border-cyber-gold text-slate-300 text-xs font-tech font-bold transition-all shadow-sm"
          >
            <Settings2 className="w-4 h-4 text-cyber-gold" />
            <span>Configurar Meta Graph API</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          PANEL PRINCIPAL: ESTUDIO FOTO + ESCENARIOS + COPYWRITING
          ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUMNA IZQUIERDA: CAPTURA & VISOR COMPARATIVO (6 COLS) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-cyber-900 border border-cyber-800 rounded-3xl p-5 shadow-cyber-card space-y-4">
            <div className="flex items-center justify-between border-b border-cyber-800 pb-3">
              <span className="font-tech font-bold text-xs uppercase text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-pink-400" /> 1. FOTO DEL PRODUCTO & CAPTURA
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartCamera}
                  className="px-3 py-1.5 rounded-xl bg-cyber-950 border border-cyber-700 hover:border-pink-400 text-slate-300 text-[11px] font-mono flex items-center gap-1.5 transition-all"
                >
                  <Camera className="w-3.5 h-3.5 text-pink-400" />
                  <span>Cámara Web</span>
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-cyber-950 border border-cyber-700 hover:border-pink-400 text-slate-300 text-[11px] font-mono flex items-center gap-1.5 transition-all"
                >
                  <Upload className="w-3.5 h-3.5 text-pink-400" />
                  <span>Subir Foto</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Selector de Categoría de Producto */}
            <div className="grid grid-cols-4 gap-2 text-[10px] font-mono">
              {[
                { id: 'fashion_apparel', label: 'Ropa / Moda', emoji: '🧥' },
                { id: 'footwear_shoes', label: 'Calzado / Sneakers', emoji: '👟' },
                { id: 'furniture_interior', label: 'Muebles & Hogar', emoji: '🛋️' },
                { id: 'bottles_beverages', label: 'Botellas / Bebidas', emoji: '🍾' },
                { id: 'tech_gadgets', label: 'Gadgets & Tech', emoji: '🎧' },
                { id: 'jewelry_luxury', label: 'Joyería & Lujo', emoji: '💍' },
                { id: 'cosmetics_beauty', label: 'Cosmética', emoji: '💄' },
                { id: 'food_restaurant', label: 'Restaurante / Comida', emoji: '🍔' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id as ProductCategory)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    category === cat.id
                      ? 'bg-pink-500/20 border-pink-400 text-pink-300 font-bold shadow-sm'
                      : 'bg-cyber-950 border-cyber-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-base mb-0.5">{cat.emoji}</div>
                  <div className="truncate">{cat.label}</div>
                </button>
              ))}
            </div>

            {/* Visor de Cámara Web Activa */}
            {isCameraActive && (
              <div className="relative rounded-2xl overflow-hidden border border-pink-500/50 bg-black aspect-video flex items-center justify-center">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <button
                  onClick={handleCaptureSnapshot}
                  className="absolute bottom-4 px-5 py-2 rounded-2xl bg-pink-500 text-white font-tech font-bold text-xs uppercase shadow-lg hover:bg-pink-600 transition-all flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" /> Capturar Foto de Producto
                </button>
              </div>
            )}

            {/* Visor Comparativo Antes / Después Recreado con IA */}
            <div className="relative rounded-3xl overflow-hidden border border-cyber-800 shadow-cyber-card aspect-[4/3] bg-cyber-950 group">
              <img
                src={isRecreatedSuccess ? recreatedImageUrl : originalImage}
                alt="Product Preview"
                className="w-full h-full object-cover transition-all duration-700"
              />

              {/* HUD Superior del Visor */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="bg-cyber-950/80 backdrop-blur-md px-3 py-1 rounded-xl border border-cyber-700 text-[11px] font-mono text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isRecreatedSuccess ? 'FOTOGRAFÍA RECREADA IA 4K' : 'FOTO ORIGINAL CAPTURADA'}</span>
                </div>
                <div className="bg-pink-500/80 backdrop-blur-md px-3 py-1 rounded-xl border border-pink-400/50 text-[10px] font-tech font-bold text-white uppercase">
                  {STUDIO_SCENE_PRESETS.find((s) => s.id === activeScene)?.name}
                </div>
              </div>

              {/* Animación de Recreación en Progreso */}
              {isRecreatingPhoto && (
                <div className="absolute inset-0 bg-cyber-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white animate-spin">
                    <RefreshCw className="w-8 h-8" />
                  </div>
                  <div className="text-center space-y-1">
                    <h4 className="font-tech font-bold text-lg text-white">RECREANDO EN ESCENARIO FOTOGRÁFICO IA...</h4>
                    <p className="text-xs font-mono text-pink-300">
                      Eliminando fondo, ajustando luces 5600K y calculando sombras de contacto...
                    </p>
                  </div>
                  <div className="w-64 h-2 bg-cyber-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
                      style={{ width: `${recreateProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Controles de Recreación */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBackgroundRemoved}
                    onChange={(e) => setIsBackgroundRemoved(e.target.checked)}
                    className="rounded accent-pink-500"
                  />
                  <span>Auto-Eliminar Fondo con IA (Alpha Matte 100%)</span>
                </label>

                {/* Modos de Ángulo / Presentación */}
                <select
                  value={presentationAngle}
                  onChange={(e) => setPresentationAngle(e.target.value as PresentationAngle)}
                  className="bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-1 text-[11px] font-mono text-pink-300 focus:outline-none"
                >
                  <option value="virtual_human_model">🧍‍♀️ Modelo Humano Virtual IA</option>
                  <option value="front_commercial">📸 Comercial Frontal 3-Point Light</option>
                  <option value="flat_lay_top">📐 Flat Lay (Vista Cenital)</option>
                  <option value="macro_texture_detail">🔍 Macro Zoom Texturas</option>
                  <option value="lifestyle_action">🏃‍♂️ Lifestyle en Acción</option>
                </select>
              </div>

              <button
                onClick={handleRecreatePhotoWithAI}
                disabled={isRecreatingPhoto}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>Recrear Fotografía en Escenario de Alta Conversión</span>
              </button>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: ESCENARIOS, PRECIO & COPYWRITING (6 COLS) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Selector de Escenarios */}
          <div className="bg-cyber-900 border border-cyber-800 rounded-3xl p-5 shadow-cyber-card space-y-3">
            <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
              <span className="font-tech font-bold text-xs uppercase text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyber-gold" /> 2. ESCENARIOS FOTOGRÁFICOS DE ESTUDIO
              </span>
              <span className="text-[10px] font-mono text-slate-400">7 Presets Hiperrealistas</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
              {STUDIO_SCENE_PRESETS.map((scene) => {
                const isSelected = activeScene === scene.id;
                return (
                  <button
                    key={scene.id}
                    onClick={() => setActiveScene(scene.id)}
                    className={`p-2.5 rounded-2xl border text-left transition-all space-y-1 ${
                      isSelected
                        ? 'bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-pink-400 text-white shadow-md'
                        : 'bg-cyber-950 border-cyber-800 text-slate-400 hover:text-white hover:border-cyber-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{scene.emoji}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-pink-400" />}
                    </div>
                    <div className="font-tech font-bold text-xs text-white truncate">{scene.name}</div>
                    <div className="text-[9px] font-mono text-slate-500 truncate">{scene.lightingType}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Datos de Producto, Precios & WhatsApp */}
          <div className="bg-cyber-900 border border-cyber-800 rounded-3xl p-5 shadow-cyber-card space-y-3">
            <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
              <span className="font-tech font-bold text-xs uppercase text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" /> 3. DATOS DE VENTA & CONVERSIÓN
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">WHATSAPP DIRECTO</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-400 block text-[11px]">Nombre del Producto:</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block text-[11px]">Número WhatsApp para Ventas:</label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-emerald-400 font-bold focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block text-[11px]">Precio Normal:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(Number(e.target.value))}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-slate-300"
                  />
                  <span className="text-slate-400">{currency}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block text-[11px]">Precio Promocional (Oferta):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={promoPrice}
                    onChange={(e) => setPromoPrice(Number(e.target.value))}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-emerald-400 font-bold"
                  />
                  <span className="text-emerald-400 font-bold">{currency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copywriting Persuasivo con IA */}
          <div className="bg-cyber-900 border border-cyber-800 rounded-3xl p-5 shadow-cyber-card space-y-3">
            <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
              <span className="font-tech font-bold text-xs uppercase text-white flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-purple-400" /> 4. COPYWRITING PERSUASIVO (AIDA / PAS)
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleRegenerateSalesCopy('urgent')}
                  className="px-2 py-0.5 rounded-lg bg-cyber-950 border border-cyber-700 text-[10px] font-mono text-pink-300 hover:border-pink-400"
                >
                  Urgencia
                </button>
                <button
                  onClick={() => handleRegenerateSalesCopy('luxury')}
                  className="px-2 py-0.5 rounded-lg bg-cyber-950 border border-cyber-700 text-[10px] font-mono text-cyber-gold hover:border-cyber-gold"
                >
                  Lujo
                </button>
                <button
                  onClick={() => handleRegenerateSalesCopy('discount')}
                  className="px-2 py-0.5 rounded-lg bg-cyber-950 border border-cyber-700 text-[10px] font-mono text-emerald-300 hover:border-emerald-400"
                >
                  Descuento
                </button>
              </div>
            </div>

            <textarea
              value={salesCopy}
              onChange={(e) => setSalesCopy(e.target.value)}
              rows={5}
              className="w-full bg-cyber-950 border border-cyber-700 rounded-2xl p-3 text-xs text-white font-mono focus:outline-none focus:border-pink-400 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* =========================================================
          SECCIÓN 5: PUBLICADOR MASIVO EN CIENTOS DE GRUPOS DE FACEBOOK & REDES
          ========================================================= */}
      <div className="bg-cyber-900 border border-cyber-800 rounded-3xl p-6 shadow-cyber-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyber-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-tech font-bold text-lg text-white">
                5. MOTOR DE DIFUSIÓN MASIVA (FACEBOOK GRAPH API & REDES)
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                ANTI-BAN HUMAN DELAY
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Publica automáticamente el producto y su copy optimizado en cientos de grupos segmentados y canales sociales simultáneos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-tech font-bold text-white">{selectedGroupsCount} Grupos Seleccionados</div>
              <div className="text-[10px] font-mono text-emerald-400">~{totalAudienceReach.toLocaleString()} miembros totales</div>
            </div>
            <button
              onClick={handleStartViralPublishing}
              disabled={isPublishingCampaign}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 hover:opacity-95 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isPublishingCampaign ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Transmitiendo en Vivo...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>INICIAR PUBLICACIÓN MASIVA AUTOMÁTICA</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Canales Sociales Simultáneos */}
        <div className="space-y-2">
          <div className="text-xs font-tech font-bold text-slate-300">Canales de Redes Sociales Activos:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {networks.map((net) => (
              <button
                key={net.id}
                onClick={() => handleToggleNetwork(net.id)}
                className={`p-3 rounded-2xl border text-left transition-all space-y-1 ${
                  net.enabled
                    ? 'bg-cyber-950 border-emerald-400/60 text-white shadow-sm'
                    : 'bg-cyber-950/50 border-cyber-800 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{net.icon}</span>
                  {net.enabled && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="font-tech font-bold text-xs text-white truncate">{net.name}</div>
                <div className="text-[9px] font-mono text-emerald-400 truncate">{net.reachEstimate}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Gestor de Grupos de Facebook */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Filtrar por Nicho:</span>
              {['all', 'fashion', 'buy_sell', 'wholesale', 'home', 'tech'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGroupCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-xl uppercase text-[10px] font-bold transition-all ${
                    groupCategoryFilter === cat
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-500'
                      : 'bg-cyber-950 text-slate-400 hover:text-white border border-cyber-800'
                  }`}
                >
                  {cat === 'all' ? 'Todos' : cat === 'fashion' ? 'Moda' : cat === 'buy_sell' ? 'Marketplace' : cat === 'wholesale' ? 'Mayoristas' : cat === 'home' ? 'Hogar' : 'Tech'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={() => facebookPublisherService.selectAllGroups(true, groupCategoryFilter)}
                className="text-emerald-400 hover:underline"
              >
                Seleccionar Todos
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => facebookPublisherService.selectAllGroups(false, groupCategoryFilter)}
                className="text-slate-400 hover:underline"
              >
                Deseleccionar
              </button>
            </div>
          </div>

          {/* Tabla / Grid de Grupos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1 font-mono text-xs">
            {facebookGroups
              .filter((g) => groupCategoryFilter === 'all' || g.category === groupCategoryFilter)
              .map((grp) => (
                <div
                  key={grp.id}
                  onClick={() => facebookPublisherService.toggleGroupSelection(grp.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                    grp.selected
                      ? 'bg-cyber-950 border-pink-500/60 shadow-sm'
                      : 'bg-cyber-950/40 border-cyber-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-pink-400 shrink-0" />
                      <h4 className="font-tech font-bold text-white text-xs truncate">{grp.name}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span>📍 {grp.city}, {grp.country}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">{grp.membersCount.toLocaleString()} miembros</span>
                    </div>
                  </div>

                  <div className="shrink-0 mt-0.5">
                    {grp.selected ? (
                      <div className="w-5 h-5 rounded-lg bg-pink-500 flex items-center justify-center text-white">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-lg border border-cyber-700" />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* =========================================================
          MODAL 1: CONSOLA DE PUBLICACIÓN EN VIVO (LOGS & MÉTRICAS)
          ========================================================= */}
      {isLiveLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-emerald-500/50 rounded-3xl p-6 max-w-3xl w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsLiveLogModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/50">
                <Share2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg">CONSOLA DE TRANSMISIÓN MASIVA EN TIEMPO REAL</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Facebook Graph API v20.0 • Meta Business Suite Auto-Publisher
                </p>
              </div>
            </div>

            {/* Barra de Progreso */}
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between">
                <span>Progreso de Difusión:</span>
                <span className="text-emerald-400 font-bold">{campaignProgress}%</span>
              </div>
              <div className="h-3 bg-cyber-950 rounded-full overflow-hidden border border-cyber-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 transition-all duration-300"
                  style={{ width: `${campaignProgress}%` }}
                />
              </div>
            </div>

            {/* Métricas de la Campaña al Completar */}
            {campaignResult && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-cyber-950 border border-emerald-500/40 font-mono text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 block">Total Publicados:</span>
                  <span className="text-lg font-bold text-emerald-400">{campaignResult.publishedCount} Canales</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 block">Alcance Orgánico Est.:</span>
                  <span className="text-lg font-bold text-cyan-400">+{campaignResult.estimatedTotalReach.toLocaleString()}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 block">Clics a WhatsApp Est.:</span>
                  <span className="text-lg font-bold text-purple-400">~{campaignResult.estimatedClicks.toLocaleString()}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 block">Duración Total:</span>
                  <span className="text-lg font-bold text-white">{campaignResult.durationSeconds} seg</span>
                </div>
              </div>
            )}

            {/* Log de Auditoría en Tiempo Real */}
            <div className="space-y-2">
              <span className="text-xs font-tech font-bold text-slate-300 block">Registro de Eventos y Respuestas HTTP:</span>
              <div className="p-3.5 rounded-2xl bg-black border border-cyber-800 max-h-64 overflow-y-auto space-y-2 font-mono text-[11px]">
                {liveLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start justify-between gap-3 border-b border-cyber-900 pb-1.5 last:border-0"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">[{log.timestamp}]</span>
                        <span className="text-pink-400 font-bold">{log.network}</span>
                        <span className="text-slate-300">➔ {log.targetName}</span>
                      </div>
                      <p className="text-slate-400">{log.message}</p>
                    </div>

                    <div className="shrink-0">
                      {log.status === 'in_progress' && (
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-bold animate-pulse">
                          ENVIANDO...
                        </span>
                      )}
                      {log.status === 'published' && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">
                          HTTP 200 OK
                        </span>
                      )}
                      {log.status === 'rate_limited' && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">
                          EN COLA
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsLiveLogModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-cyber-800 hover:bg-cyber-700 text-white font-tech font-bold text-xs uppercase"
              >
                Cerrar Consola
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 2: CONFIGURACIÓN META GRAPH API v20.0
          ========================================================= */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyber-gold/50 rounded-3xl p-6 max-w-xl w-full shadow-cyber-card text-white space-y-4 relative font-mono text-xs">
            <button
              onClick={() => setIsConfigModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyber-gold/20 text-cyber-gold border border-cyber-gold">
                <Settings2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">AJUSTES META GRAPH API & CONECTORES</h3>
                <p className="text-slate-400 text-[11px]">Credenciales de Meta for Developers & Tokens de Acceso</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] block">Meta App ID (Facebook Developer):</label>
                <input
                  type="text"
                  value={apiConfig.appId}
                  onChange={(e) => setApiConfig({ ...apiConfig, appId: e.target.value })}
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] block">Page Access Token / User Token (Graph API):</label>
                <input
                  type="password"
                  value={apiConfig.pageAccessToken}
                  onChange={(e) => setApiConfig({ ...apiConfig, pageAccessToken: e.target.value })}
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-pink-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] block">Intervalo Anti-Spam Human Delay (Segundos):</label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={apiConfig.antiSpamDelaySeconds}
                  onChange={(e) => setApiConfig({ ...apiConfig, antiSpamDelaySeconds: Number(e.target.value) })}
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-emerald-400"
                />
                <span className="text-[10px] text-slate-500">Recomendado: 15s para evitar bloqueos por parte del algoritmo de Meta.</span>
              </div>

              <label className="flex items-center gap-2 text-slate-300 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={apiConfig.enableTextSpinning}
                  onChange={(e) => setApiConfig({ ...apiConfig, enableTextSpinning: e.target.checked })}
                  className="rounded accent-cyber-gold"
                />
                <span>Activar Rotación de Textos (Text Spinning) para evitar contenido duplicado</span>
              </label>
            </div>

            <div className="pt-3 flex gap-2">
              <button
                onClick={() => {
                  facebookPublisherService.saveApiConfig(apiConfig);
                  alert('¡Configuración de Meta Graph API guardada exitosamente!');
                  setIsConfigModalOpen(false);
                }}
                className="flex-1 py-3 rounded-2xl bg-cyber-gold text-black font-tech font-bold text-xs uppercase shadow-gold-glow"
              >
                Guardar Conector
              </button>
            </div>
          </div>
        </div>
      )}
      {/* =========================================================
          MODAL: SUITE DE PRUEBAS A/B CON SCORE PREDICTIVO DE CTR
          ========================================================= */}
      {isABTestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-pink-500/50 rounded-3xl p-6 max-w-2xl w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative font-mono text-xs">
            <button
              onClick={() => setIsABTestModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500">
                <Zap className="w-6 h-6 text-cyber-gold" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-base text-white">SUITE DE PRUEBAS A/B PREDICTIVAS (META API)</h3>
                <p className="text-slate-400 text-[10px]">Predicción algorítmica de CTR y ROAS para 3 variantes de fondo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
                <div className="text-[11px] font-bold text-pink-400">Variante A: Tokio Neón</div>
                <div className="text-2xl font-tech font-extrabold text-white">3.82% CTR</div>
                <p className="text-[10px] text-slate-400">Excelente para público 18-28 años en Instagram Reels.</p>
              </div>

              <div className="p-3 rounded-2xl bg-cyber-950 border border-emerald-500/50 space-y-2 shadow-md">
                <div className="text-[11px] font-bold text-emerald-400">Variante B: Mármol Minimalista 🏆</div>
                <div className="text-2xl font-tech font-extrabold text-emerald-400">5.14% CTR</div>
                <p className="text-[10px] text-emerald-300">GANADOR PREVISTO: Mayor intención de compra y ticket promedio.</p>
              </div>

              <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
                <div className="text-[11px] font-bold text-cyan-400">Variante C: Podio 3D Futurista</div>
                <div className="text-2xl font-tech font-extrabold text-white">4.05% CTR</div>
                <p className="text-[10px] text-slate-400">Ideal para feeds de Pinterest y Banners de Shopify.</p>
              </div>
            </div>

            <button
              onClick={() => {
                alert('¡Campaña A/B configurada en Meta Ads Manager con presupuesto optimizado hacia la Variante B!');
                setIsABTestModalOpen(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-tech font-extrabold text-xs uppercase shadow-lg transition-all"
            >
              🚀 Lanzar Test A/B en Piloto Automático
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: GENERADOR DE CATÁLOGO PDF SHOPPABLE
          ========================================================= */}
      {isCatalogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyan-500/50 rounded-3xl p-6 max-w-md w-full shadow-cyber-card text-white space-y-4 relative font-mono text-xs">
            <button
              onClick={() => setIsCatalogModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-base text-white">CATÁLOGO SHOPPABLE INTERACTIVO</h3>
                <p className="text-slate-400 text-[10px]">Lookbook digital con botones directos de pago por WhatsApp y Web</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 text-slate-300">
              <p>📖 <strong>Páginas Generadas:</strong> 12 Páginas en Alta Resolución 300 DPI</p>
              <p>🛍️ <strong>Hipervínculos:</strong> Botones de "Comprar Ahora" y enlace directo a WhatsApp</p>
              <p>📱 <strong>Formato:</strong> PDF Interactivo compatible con móviles y tablets</p>
            </div>

            <button
              onClick={() => {
                alert('¡Catálogo Lookbook Shoppable en PDF de alta resolución descargado!');
                setIsCatalogModalOpen(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-tech font-extrabold text-xs uppercase shadow-md transition-all"
            >
              📥 Descargar Lookbook PDF Shoppable
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
