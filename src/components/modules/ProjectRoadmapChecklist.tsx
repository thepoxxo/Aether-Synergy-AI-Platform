import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Square,
  Sparkles,
  Layers,
  Video,
  Globe2,
  Smile,
  ShieldAlert,
  Lock,
  HardDrive,
  Smartphone,
  CreditCard,
  Cloud,
  ChevronDown,
  ChevronRight,
  Filter,
  RotateCcw,
  Download,
  Share2,
  Search,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Wind
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  module: string;
  category: 'basic' | 'intermediate' | 'advanced';
  title: string;
  desc: string;
  isInitialDone?: boolean;
}

const CHECKLIST_DATA: ChecklistItem[] = [
  // ==========================================
  // 🟢 1. NIVEL 1: BÁSICO (Fundamentos, Interfaz & Controles)
  // ==========================================
  {
    id: '3d_screenshot_4k',
    module: 'Motor 3D & Shaders',
    category: 'basic',
    title: 'Captura 4K con Fondo Transparente PNG',
    desc: 'Exportación instantánea en ultra alta resolución sin fondo para catálogos y e-commerce.',
    isInitialDone: true
  },
  {
    id: '3d_eyedropper',
    module: 'Motor 3D & Shaders',
    category: 'basic',
    title: 'Selector de Color con Cuentagotas (Eyedropper API)',
    desc: 'Muestreo de colores exactos desde cualquier píxel o imagen de inspiración en pantalla.',
    isInitialDone: true
  },
  {
    id: '3d_keyboard_shortcuts',
    module: 'Motor 3D & Shaders',
    category: 'basic',
    title: 'Atajos de Teclado Profesionales (R, S, G, Space, F, T)',
    desc: 'Control rápido para diseñadores que usan atajos de Blender y Spline.',
    isInitialDone: true
  },
  {
    id: 'ad_aspect_ratios',
    module: 'Video Marketing IA (AdGen)',
    category: 'basic',
    title: 'Selector Rápido de Proporciones (9:16, 16:9, 1:1, 4:5)',
    desc: 'Plantillas optimizadas para TikTok, YouTube Shorts, Reels e Instagram Feed.',
    isInitialDone: true
  },
  {
    id: 'b2b_country_filters',
    module: 'Proveedores Globales B2B',
    category: 'basic',
    title: 'Filtros Avanzados por País y Certificación Ecológica',
    desc: 'Fábricas auditadas en Portugal, Turquía, Colombia e Italia con sellos GOTS y OEKO-TEX.',
    isInitialDone: true
  },
  {
    id: 'avatar_moods',
    module: 'Copiloto IA & Mascotas',
    category: 'basic',
    title: 'Selector de Estados de Ánimo y Atuendos Guardados',
    desc: 'Personalizar el aspecto y expresiones del avatar en el perfil del usuario.',
    isInitialDone: true
  },
  {
    id: 'admin_export_csv',
    module: 'Super Admin & Métricas',
    category: 'basic',
    title: 'Exportación de Usuarios y Finanzas a CSV / Excel',
    desc: 'Descarga de reportes contables y analítica de uso con un solo clic.',
    isInitialDone: true
  },
  {
    id: 'landing_4screens',
    module: 'Landing & Experiencia Web',
    category: 'basic',
    title: 'Landing Page de 4 Pantallas en Cascada',
    desc: 'Flujo secuencial fluido (Inicio 3D -> Capacidades -> Precios -> Ecosistema) con navegación suave.',
    isInitialDone: true
  },
  {
    id: 'theme_dual_mode',
    module: 'Diseño & Sistema Visual',
    category: 'basic',
    title: 'Soporte Dual de Modo Día (Luxury Studio) y Modo Noche (Cyber Dark)',
    desc: 'Paleta adaptativa: blanco marfil de alto contraste en día y azabache neón en noche.',
    isInitialDone: true
  },
  {
    id: 'space_cosmic_galaxy',
    module: 'Fondo Cósmico & FX',
    category: 'basic',
    title: 'Onda Expansiva Supernova 10X & Galaxia Rotatoria',
    desc: 'Supernova con triple anillo de plasma de pantalla completa y rotación hipnótica.',
    isInitialDone: true
  },
  {
    id: 'space_ufo_fleet',
    module: 'Fondo Cósmico & FX',
    category: 'basic',
    title: 'Flota OVNI con Rayos Etéreos & Abducciones Ocasionales',
    desc: 'Naves espaciales compactas con haz volumétrico difuso y recuperación instantánea de números por clic.',
    isInitialDone: true
  },
  {
    id: 'space_watcher_beanie',
    module: 'Fondo Cósmico & FX',
    category: 'basic',
    title: 'Guardián Celestial con Gorrito de Lana y Expresiones Anime',
    desc: 'Gorro tejido con pompón flotante y reacciones faciales dinámicas que siguen el ratón.',
    isInitialDone: true
  },
  {
    id: 'ui_preset_bookmarks',
    module: 'Diseño & Sistema Visual',
    category: 'basic',
    title: 'Marcadores de Proyectos y Favoritos en 1 Clic',
    desc: 'Guardar combinaciones favoritas de colores, modelos y configuraciones de cámara en el navegador.',
    isInitialDone: true
  },
  {
    id: 'ui_multi_window_split',
    module: 'Motor 3D & Shaders',
    category: 'basic',
    title: 'Vista Dividida Multipantalla 3D (Frontal / Perfil / Isométrico)',
    desc: 'Visualizar el modelo desde múltiples ángulos simultáneamente para máxima precisión de diseño.',
    isInitialDone: true
  },

  // ==========================================
  // 🟡 2. NIVEL 2: INTERMEDIO (Motores IA, Shaders, Físicas & B2B)
  // ==========================================
  {
    id: '3d_universal_file_converter',
    module: '3D IA Scanner & Recon',
    category: 'intermediate',
    title: 'Escáner 3D IA & Conversor Universal (Video 360°, Archivos y APIs)',
    desc: 'Conversión automática de Video 360°, Imágenes (.PNG, .JPG), Vector (.SVG), Planos (.PDF) y conexión con APIs 3D (Tripo3D, Meshy).',
    isInitialDone: true
  },
  {
    id: '3d_decal_interactive',
    module: 'Motor 3D & Shaders',
    category: 'intermediate',
    title: 'Estampador de Calcomanías y Logos Interactivo sobre Malla 3D',
    desc: 'Arrastrar y soltar logos PNG proyectándolos con control de escala, rotación y posición X/Y.',
    isInitialDone: true
  },
  {
    id: '3d_physics_cloth',
    module: 'Motor 3D & Shaders',
    category: 'intermediate',
    title: 'Simulador de Físicas de Tela y Viento en Tiempo Real',
    desc: 'Ondulación sinusoidal de vértices textiles con intensidades regulables (Suave, Brisa, Fuerte).',
    isInitialDone: true
  },
  {
    id: '3d_hdri_presets',
    module: 'Motor 3D & Shaders',
    category: 'intermediate',
    title: 'Entornos de Iluminación HDRi Conmutables',
    desc: 'Presets de iluminación: Tokyo Cyberpunk, Nordic Studio, Golden Hour y Warehouse Industrial.',
    isInitialDone: true
  },
  {
    id: '3d_ai_texture_generator',
    module: 'Motor 3D & Shaders',
    category: 'intermediate',
    title: 'Generador de Texturas PBR con Prompt de Texto IA',
    desc: 'Síntesis de materiales procedurales (cuero desgastado, fibra de carbono, terciopelo, látex, metal cepillado) mediante IA.',
    isInitialDone: true
  },
  {
    id: '3d_avatar_tryon',
    module: 'Aurora 3D Studio',
    category: 'intermediate',
    title: 'Probador Virtual 3D & Maniquí Paramétrico con Tallas (XS a 3XL)',
    desc: 'Montar prendas sobre maniquíes animados con ajuste dinámico de proporciones corporales.',
    isInitialDone: true
  },
  {
    id: 'ad_runway_gen3_api',
    module: 'Video Marketing IA (AdGen)',
    category: 'intermediate',
    title: 'Conexión Real con API de Runway Gen-3 Alpha',
    desc: 'Generación cinemática de videos de producto con aceleración GPU en la nube.',
    isInitialDone: true
  },
  {
    id: 'ad_sora_kling_api',
    module: 'Video Marketing IA (AdGen)',
    category: 'intermediate',
    title: 'Conexión con OpenAI Sora y Kling AI 1.5 HD',
    desc: 'Generación hiperrealista con modelos humanos en pasarela para TikTok y Reels.',
    isInitialDone: true
  },
  {
    id: 'ad_elevenlabs_voiceover',
    module: 'Video Marketing IA (AdGen)',
    category: 'intermediate',
    title: 'Locuciones Publicitarias Multilingües (ElevenLabs)',
    desc: 'Voces comerciales hiperrealistas en 8 idiomas con música atenuada automáticamente.',
    isInitialDone: true
  },
  {
    id: 'ad_soundtrack_ai_synth',
    module: 'Video Marketing IA (AdGen)',
    category: 'intermediate',
    title: 'Generador de Bandas Sonoras & Beats con IA para Ads',
    desc: 'Música comercial royalty-free generada por IA (Trap, Synthwave, Lo-Fi, Cinematic) sincronizada al ritmo con Web Audio API.',
    isInitialDone: true
  },
  {
    id: 'b2b_techpack_pdf',
    module: 'Proveedores Globales B2B',
    category: 'intermediate',
    title: 'Generador Automático de Fichas Técnicas PDF (Tech Pack)',
    desc: 'PDF con vistas ortogonales 3D, tabla de medidas, desglose de materiales (BOM) y colores Pantone.',
    isInitialDone: true
  },
  {
    id: 'b2b_instant_rfq',
    module: 'Proveedores Globales B2B',
    category: 'intermediate',
    title: 'Envío Automatizado de Solicitudes de Cotización (RFQ) por WhatsApp & Email',
    desc: 'Despacho directo de ficha técnica y solicitud de muestras a directores de fábrica en 1 clic.',
    isInitialDone: true
  },
  {
    id: 'automo_auto_caption',
    module: 'Automo Calendar & Redes',
    category: 'intermediate',
    title: 'Generador de Subtítulos Dinámicos con Emojis para TikTok & Reels',
    desc: 'Transcripción palabra por palabra con resaltado neón animado para retención en redes.',
    isInitialDone: true
  },
  {
    id: 'mascot_voice_control',
    module: 'Copiloto IA & Mascotas (Kai)',
    category: 'intermediate',
    title: 'Control por Voz & Transcripción Continua (Speech-to-Text Universal)',
    desc: 'Compatibilidad total de micrófono con permisos de navegador en Chrome, Safari, Firefox y Edge.',
    isInitialDone: true
  },
  {
    id: 'admin_budget_alerts',
    module: 'Super Admin & Métricas',
    category: 'intermediate',
    title: 'Alertas Automáticas de Presupuesto y Consumo de GPUs',
    desc: 'Notificaciones en tiempo real cuando el consumo de APIs supere los límites de seguridad.',
    isInitialDone: true
  },
  {
    id: 'auth_social_oauth',
    module: 'Seguridad & Autenticación',
    category: 'intermediate',
    title: 'Inicio de Sesión con Google, Apple y GitHub (OAuth 2.0)',
    desc: 'Acceso seguro con 1 clic sin necesidad de recordar contraseñas complejas.',
    isInitialDone: true
  },
  {
    id: 'auth_2fa_totp',
    module: 'Seguridad & Autenticación',
    category: 'intermediate',
    title: 'Autenticación en Dos Pasos (2FA con Google Authenticator)',
    desc: 'Protección para cuentas de Administrador y Agencias con códigos temporales TOTP y QR.',
    isInitialDone: true
  },
  {
    id: 'db_supabase_cloud',
    module: 'Base de Datos & Cloud',
    category: 'intermediate',
    title: 'Conexión a PostgreSQL en Supabase / Neon con RLS',
    desc: 'Base de datos en la nube con políticas de seguridad a nivel de fila para guardar diseños y proyectos 3D.',
    isInitialDone: true
  },
  {
    id: 'db_s3_cloudflare_r2',
    module: 'Base de Datos & Cloud',
    category: 'intermediate',
    title: 'Bucket Cloudflare R2 / AWS S3 para Archivos 3D y Renders 4K',
    desc: 'Almacenamiento ilimitado y CDN global para cargas ultra rápidas de modelos (12ms edge).',
    isInitialDone: true
  },
  {
    id: 'pwa_offline_install',
    module: 'Móvil & Rendimiento',
    category: 'intermediate',
    title: 'Progressive Web App (PWA) Instalable en Celular e iPad',
    desc: 'Icono en pantalla de inicio y modo sin conexión con Service Workers.',
    isInitialDone: true
  },
  {
    id: 'payments_stripe_checkout',
    module: 'Pagos & Facturación Stripe',
    category: 'intermediate',
    title: 'Pasarela Stripe Checkout y Portal de Facturas PDF',
    desc: 'Cobro recurrente para planes Pro ($49) y Agencia ($149) con facturación fiscal y Apple/Google Pay.',
    isInitialDone: true
  },
  {
    id: 'deploy_vercel_custom_domain',
    module: 'Despliegue & CI/CD',
    category: 'intermediate',
    title: 'Despliegue Continuo en Vercel con Dominio Personalizado',
    desc: 'Sincronización automática de GitHub a la nube en 45 segundos con SSL y CDN.',
    isInitialDone: true
  },

  // ==========================================
  // 🟣 3. NIVEL 3: AVANZADO / INDUSTRIAL (WebXR, Automatización & Stripe)
  // ==========================================
  {
    id: '3d_sketch_to_3d_api',
    module: 'Motor 3D & Shaders',
    category: 'advanced',
    title: 'Generador de Mallas 3D desde Bocetos 2D (Sketch-to-3D)',
    desc: 'Reconstrucción de mallas completas desde dibujos y bocetos 2D con IA en 30s.',
    isInitialDone: true
  },
  {
    id: '3d_ar_webxr',
    module: 'Motor 3D & Shaders',
    category: 'advanced',
    title: 'Visor en Realidad Aumentada (WebXR & Apple Quick Look)',
    desc: 'Proyectar la prenda o mueble en el espacio real a través de la cámara del celular o iPad con QR y USDZ.',
    isInitialDone: true
  },
  {
    id: '3d_render_passes',
    module: 'Motor 3D & Shaders',
    category: 'advanced',
    title: 'Pases de Render para Unreal Engine 5 y Blender',
    desc: 'Exportación separada de mapas de Normales, AO, Rugosidad y Albedo.',
    isInitialDone: true
  },
  {
    id: '3d_print_slicing_gcode',
    module: 'Fabricación & Hardware 3D',
    category: 'advanced',
    title: 'Comprobador de Imprimibilidad 3D & Generador G-Code',
    desc: 'Análisis de grosor de pared, soportes de voladizo y preparación para impresoras 3D FDM/SLA.',
    isInitialDone: true
  },
  {
    id: 'ad_predictive_retention',
    module: 'Video Marketing IA (AdGen)',
    category: 'advanced',
    title: 'Analizador Predictivo de Retención con IA',
    desc: 'Mapa de calor de atención para evitar el abandono en los primeros 3 segundos del video.',
    isInitialDone: true
  },
  {
    id: 'b2b_dhl_freight_api',
    module: 'Proveedores Globales B2B',
    category: 'advanced',
    title: 'Cotización en Tiempo Real de Envíos y Aduanas (DHL/FedEx Freight)',
    desc: 'Cálculo automático de aranceles y flete aéreo/marítimo por volumen y peso.',
    isInitialDone: true
  },
  {
    id: 'b2b_smart_contracts_escrow',
    module: 'Proveedores Globales B2B',
    category: 'advanced',
    title: 'Sistema de Pagos en Escrow / Fideicomiso para Producción Segura',
    desc: 'Retención de fondos protegida que libera pagos al fabricante tras aprobación de control de calidad.',
    isInitialDone: true
  },
  {
    id: 'ai_multi_agent_brand_audit',
    module: 'Super Admin & Copiloto IA',
    category: 'advanced',
    title: 'Auditoría de Identidad de Marca con Enjambre de Agentes IA',
    desc: 'Revisión multi-agente que evalúa coherencia visual, viabilidad técnica de costura y márgenes de rentabilidad.',
    isInitialDone: true
  },
  {
    id: 'auth_jwt_http_cookies',
    module: 'Seguridad & Autenticación',
    category: 'advanced',
    title: 'Cookies HttpOnly y Tokens de Sesión Blindados contra XSS/CSRF',
    desc: 'Arquitectura de seguridad bancaria para tokens de acceso y pagos.',
    isInitialDone: true
  },
  {
    id: 'perf_webgpu_lod',
    module: 'Móvil & Rendimiento',
    category: 'advanced',
    title: 'Soporte WebGPU y Nivel de Detalle Adaptativo (LOD)',
    desc: '60 FPS estables en cualquier dispositivo ajustando polígonos automáticamente.',
    isInitialDone: true
  },
  {
    id: 'payments_affiliates_system',
    module: 'Pagos & Facturación Stripe',
    category: 'advanced',
    title: 'Sistema de Afiliados y Comisiones Recurrentes (20%)',
    desc: 'Enlaces de referidos con panel de ganancias para diseñadores e influencers.',
    isInitialDone: true
  },

  // ==========================================
  // 💎 4. NIVEL 4: ULTRA AVANZADO / ENTERPRISE & SOCIAL (Pasarela Multiusuario, Patronaje DXF, Clima & DPP)
  // ==========================================
  {
    id: 'fashion_runway_multicam_live',
    module: 'Pasarela Virtual en Vivo',
    category: 'advanced',
    title: 'Pasarela de Moda 3D Multicámara con Audiencia en Vivo, Chat, Fotos e "Inspira al Mundo"',
    desc: 'Desfile virtual 3D con cambio de 5 cámaras de TV, espectadores conectados en tiempo real, chat, reacciones emoji, fotos de primera fila y publicación comunitaria obligatoria para perder el miedo a mostrar tu talento.',
    isInitialDone: true
  },
  {
    id: 'pattern_cutting_dxf_aama',
    module: 'Fabricación & Hardware 3D',
    category: 'advanced',
    title: 'Exportador de Patrones de Costura 2D (Patronaje Industrial DXF / AAMA / PDF 1:1)',
    desc: 'Despiece plano con margen de costura de 1cm, marcas de piquete y formato universal para mesas de corte láser Gerber, Lectra y Optitex.',
    isInitialDone: true
  },
  {
    id: 'weather_rain_hydrophobic_shader',
    module: 'Motor 3D & Shaders',
    category: 'advanced',
    title: 'Simulador de Clima & Shader de Gotas de Agua en Tiempo Real',
    desc: 'Precipitación pluvial y condensación de microgotas esféricas para demostrar propiedades hidrofóbicas e impermeables del tejido.',
    isInitialDone: true
  },
  {
    id: 'spatial_apple_vision_pro_usdz',
    module: 'Motor 3D & Shaders',
    category: 'advanced',
    title: 'Soporte Espacial para Apple Vision Pro & Meta Quest (USDZ / Spatial 3D)',
    desc: 'Exportación con metadatos de computación espacial para proyectar el modelo holográfico en el espacio físico.',
    isInitialDone: true
  },
  {
    id: 'eu_dpp_digital_passport',
    module: 'Proveedores Globales B2B',
    category: 'advanced',
    title: 'Pasaporte Digital de Producto de la Unión Europea (EU DPP 2026 & QR)',
    desc: 'Certificado de trazabilidad ecológica con huella de carbono, procedencia textil y código QR de cumplimiento aduanero europeo.',
    isInitialDone: true
  }
];

export const ProjectRoadmapChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('aether_roadmap_checklist_v2');
      if (saved) return JSON.parse(saved);

      // Pre-mark default completed items
      const initial: Record<string, boolean> = {};
      CHECKLIST_DATA.forEach((item) => {
        if (item.isInitialDone) {
          initial[item.id] = true;
        }
      });
      return initial;
    } catch {
      return {};
    }
  });

  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('aether_roadmap_checklist_v2', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalTasks = CHECKLIST_DATA.length;
  const completedTasks = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  // Category counts
  const basicTasks = CHECKLIST_DATA.filter((i) => i.category === 'basic');
  const basicCompleted = basicTasks.filter((i) => checkedItems[i.id]).length;

  const interTasks = CHECKLIST_DATA.filter((i) => i.category === 'intermediate');
  const interCompleted = interTasks.filter((i) => checkedItems[i.id]).length;

  const advTasks = CHECKLIST_DATA.filter((i) => i.category === 'advanced');
  const advCompleted = advTasks.filter((i) => checkedItems[i.id]).length;

  const modules = ['all', ...Array.from(new Set(CHECKLIST_DATA.map((i) => i.module)))];

  const filteredTasks = CHECKLIST_DATA.filter((task) => {
    const matchMod = selectedModule === 'all' || task.module === selectedModule;
    const matchCat = selectedCategory === 'all' || task.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.module.toLowerCase().includes(searchQuery.toLowerCase());
    return matchMod && matchCat && matchSearch;
  });

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'basic':
        return (
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 uppercase tracking-wider flex items-center gap-1">
            🟢 Básico
          </span>
        );
      case 'intermediate':
        return (
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40 uppercase tracking-wider flex items-center gap-1">
            🟡 Intermedio
          </span>
        );
      case 'advanced':
        return (
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/40 uppercase tracking-wider flex items-center gap-1">
            🟣 Avanzado
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn transition-colors">
      {/* Header & Overall Progress */}
      <div className="bg-cyber-900/90 p-6 rounded-3xl border border-cyber-gold/50 shadow-cyber-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold shadow-gold-glow">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-tech font-extrabold text-white tracking-wider">
                  ROADMAP & CHECKLIST MAESTRO DE TAREAS
                </h2>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyber-800 text-cyber-gold border border-cyber-700">
                  {completedTasks} / {totalTasks} Completadas
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Categorizado por niveles: <strong className="text-emerald-400">Básico</strong>, <strong className="text-amber-400">Intermedio</strong> y <strong className="text-purple-400">Avanzado</strong>.
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block font-tech uppercase">Progreso Global:</span>
            <span className="text-3xl font-tech font-extrabold text-cyber-gold">{progressPercent}%</span>
          </div>
        </div>

        {/* Live Progress Bar */}
        <div className="relative h-3.5 w-full rounded-full bg-cyber-950 border border-cyber-800 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-cyber-gold shadow-gold-glow transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 3 Level Progress Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-2xl bg-cyber-950/80 border border-emerald-500/30 flex items-center justify-between">
            <span className="text-xs font-tech font-bold text-emerald-400 flex items-center gap-1.5">
              🟢 Nivel 1 (Básico)
            </span>
            <span className="text-xs font-mono font-bold text-white">
              {basicCompleted} / {basicTasks.length} ({Math.round((basicCompleted / basicTasks.length) * 100)}%)
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-cyber-950/80 border border-amber-500/30 flex items-center justify-between">
            <span className="text-xs font-tech font-bold text-amber-400 flex items-center gap-1.5">
              🟡 Nivel 2 (Intermedio)
            </span>
            <span className="text-xs font-mono font-bold text-white">
              {interCompleted} / {interTasks.length} ({Math.round((interCompleted / interTasks.length) * 100)}%)
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-cyber-950/80 border border-purple-500/30 flex items-center justify-between">
            <span className="text-xs font-tech font-bold text-purple-400 flex items-center gap-1.5">
              🟣 Nivel 3 (Avanzado)
            </span>
            <span className="text-xs font-mono font-bold text-white">
              {advCompleted} / {advTasks.length} ({Math.round((advCompleted / advTasks.length) * 100)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-cyber-900/80 p-4 rounded-2xl border border-cyber-800 shadow-md">
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar tarea, módulo o tecnología..."
              className="w-full bg-cyber-950 border border-cyber-700 focus:border-cyber-gold rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Module Filter */}
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="bg-cyber-950 border border-cyber-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
          >
            {modules.map((m) => (
              <option key={m} value={m}>
                {m === 'all' ? '🔍 Todos los Módulos' : m}
              </option>
            ))}
          </select>

          {/* Level Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-cyber-950 border border-cyber-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
          >
            <option value="all">⚡ Todos los Niveles</option>
            <option value="basic">🟢 Básico ({basicCompleted}/{basicTasks.length})</option>
            <option value="intermediate">🟡 Intermedio ({interCompleted}/{interTasks.length})</option>
            <option value="advanced">🟣 Avanzado ({advCompleted}/{advTasks.length})</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (confirm('¿Deseas restablecer las casillas al estado recomendado por defecto?')) {
                const initial: Record<string, boolean> = {};
                CHECKLIST_DATA.forEach((item) => {
                  if (item.isInitialDone) initial[item.id] = true;
                });
                setCheckedItems(initial);
              }
            }}
            className="text-xs text-slate-400 hover:text-cyber-gold flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-cyber-800"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restablecer
          </button>
        </div>
      </div>

      {/* Interactive Tasks Grid */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const isDone = Boolean(checkedItems[task.id]);

          return (
            <div
              key={task.id}
              onClick={() => toggleItem(task.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 group ${
                isDone
                  ? 'bg-cyber-950/90 border-emerald-500/50 shadow-md'
                  : 'bg-cyber-900 border-cyber-800 hover:border-cyber-gold/50 shadow-cyber-card'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  type="button"
                  className="mt-0.5 text-slate-400 group-hover:text-cyber-gold transition-colors shrink-0"
                >
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600 group-hover:text-cyber-gold" />
                  )}
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`font-tech font-bold text-sm transition-colors ${
                        isDone ? 'text-slate-300 font-extrabold' : 'text-white group-hover:text-cyber-gold'
                      }`}
                    >
                      {task.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-cyber-950 px-2 py-0.5 rounded border border-cyber-800">
                      {task.module}
                    </span>
                    {isDone && (
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> LISTO
                      </span>
                    )}
                  </div>
                  <p className={`text-xs ${isDone ? 'text-slate-400' : 'text-slate-300'}`}>
                    {task.desc}
                  </p>
                </div>
              </div>

              <div className="shrink-0 pt-0.5">
                {getCategoryBadge(task.category)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
