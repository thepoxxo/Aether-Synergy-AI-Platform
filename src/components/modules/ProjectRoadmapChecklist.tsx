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
  Wind,
  Target,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  DollarSign,
  Plane,
  Brain,
  Zap,
  Award,
  Flame,
  ArrowUpRight,
  Check,
  X,
  FileText
} from 'lucide-react';
import { UserPersonalGoal, GoalCategory, GoalPriority, GoalSubtask } from '../../types/userGoals';

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
  },

  // ==========================================
  // 👑 5. NIVEL 5: MASTER ENTERPRISE & AI HYPER-GROWTH
  // ==========================================
  {
    id: 'ai_lookbook_photoshoot_studio',
    module: 'Estudio Lookbook IA',
    category: 'advanced',
    title: 'Estudio de Sesiones Fotográficas con Modelos Humanos IA (AI Lookbook)',
    desc: 'Generación de lookbooks editoriales de 4 tomas en alta resolución montando la prenda 3D sobre modelos hiperrealistas en locaciones de París, Tokio y NYC.',
    isInitialDone: true
  },
  {
    id: 'in_canvas_voice_text_modifier',
    module: 'Motor 3D & Shaders',
    category: 'advanced',
    title: 'Copiloto Diseñador IA en Tiempo Real por Voz y Texto (In-Canvas Modifier)',
    desc: 'Barra de comando conversacional por voz y texto que modifica materiales, colores y acabados de la prenda en el visor 3D instantáneamente.',
    isInitialDone: true
  },
  {
    id: 'trend_forecaster_sales_predictor',
    module: 'Predicción de Tendencias IA',
    category: 'advanced',
    title: 'Predictor de Tendencias & Pronóstico de Ventas IA (TrendForecaster 2026)',
    desc: 'Algoritmo de inteligencia de mercado que cruza señales de redes sociales para calcular el Score de Viralidad, precio MSRP óptimo y proyección de ventas.',
    isInitialDone: true
  },
  {
    id: 'shopify_1click_store_publisher',
    module: 'Integración E-Commerce',
    category: 'advanced',
    title: 'Sincronización Automática en 1 Clic con Tiendas Shopify & WooCommerce',
    desc: 'Publicación directa del producto con ficha técnica, tallas, fotos 4K y el visor 3D interactivo listo para vender.',
    isInitialDone: true
  },

  // ==========================================
  // ⚡ 6. NIVEL 6: AUTONOMOUS AI & GLOBAL MULTI-TENANT ECOSYSTEM
  // ==========================================
  {
    id: 'cinematic_3d_turntable_video',
    module: 'Video Marketing IA (AdGen)',
    category: 'advanced',
    title: 'Generador de Videos Cinemáticos 360° en 4K (Turntable MP4 a 60 FPS)',
    desc: 'Renderizado de video cinemático con rotación 360°, profundidad de campo bokeh e iluminación de estudio listo para TikTok y Reels.',
    isInitialDone: true
  },
  {
    id: 'multi_tenant_agency_workspaces',
    module: 'Super Admin & Multi-Marca',
    category: 'advanced',
    title: 'Espacios de Trabajo Multi-Marca para Agencias y Equipos con Roles',
    desc: 'Creación de sub-marcas independientes con gestión de roles de equipo (Director Creativo, Patronista, Comprador) y enlaces de revisión con contraseña.',
    isInitialDone: true
  },
  {
    id: 'ai_capsule_collection_generator',
    module: 'Aurora 3D Studio',
    category: 'advanced',
    title: 'Generador de Colecciones Cápsula Completas de 6 Prendas con 1 Clic',
    desc: 'Síntesis paralela de conjunto coordinado (Chaqueta, Hoodie, Pantalón Cargo, Sneaker, Camiseta y Beanie) con la misma paleta y estilo visual.',
    isInitialDone: true
  },
  {
    id: 'live_factory_material_stock_api',
    module: 'Proveedores Globales B2B',
    category: 'advanced',
    title: 'Conexión en Tiempo Real con Stock de Metraje Textil en Fábricas',
    desc: 'Consulta en vivo de metros lineales de algodón 460 GSM y nylon ripstop disponibles en almacenes de Portugal, Turquía y Colombia.',
    isInitialDone: true
  },
  {
    id: 'seam_stress_tensile_heatmap',
    module: 'Fabricación & Hardware 3D',
    category: 'advanced',
    title: 'Simulador de Tensión de Hilos & Mapa de Calor de Resistencia Textil',
    desc: 'Detección de puntos de tensión y riesgo de desgarro en costuras durante el movimiento articular del avatar.',
    isInitialDone: true
  },

  // ==========================================
  // 🚀 7. NIVEL 7: SHOPIFY AI LANDINGS & AUTONOMOUS AGENT SWARM
  // ==========================================
  {
    id: 'shopify_landing_builder_ai',
    module: 'Integración E-Commerce',
    category: 'advanced',
    title: 'Creador de Landing Pages Shopify con IA (Prompts Publicitarios & Multi-Mercado)',
    desc: 'Generación integral de landings para Shopify con prompts fotográficos comerciales, copy persuasivo AIDA adaptado a 4 mercados globales y exportación Liquid.',
    isInitialDone: true
  },
  {
    id: 'autonomous_ai_agent_swarm',
    module: 'Copiloto IA & Mascotas',
    category: 'advanced',
    title: 'Orquestador de Enjambre de Agentes Autónomos (6 Agentes Especializados 24/7)',
    desc: 'Sistema de agentes autónomos que supervisan en tiempo real optimización 3D, copywriting viral, aranceles de fábrica, predicción de tendencias y conversión.',
    isInitialDone: true
  },

  // ==========================================
  // 💎 8. NIVEL 8: PRODUCTION APIS, REALTIME WEBHOOKS & COMPETITIVE INTELLIGENCE
  // ==========================================
  {
    id: 'competitive_intelligence_market_radar',
    module: 'Super Admin & Métricas',
    category: 'advanced',
    title: 'Centro de Inteligencia Competitiva, Precios, Rumores de IA & Benchmark de Mercado',
    desc: 'Monitoreo estratégico y comparativa de costos vs CLO3D, Browzwear, Midjourney y Spline 3D, con radar de rumores y filtraciones de la industria.',
    isInitialDone: true
  },
  {
    id: 'realtime_api_gateway_readiness',
    module: 'Integración E-Commerce',
    category: 'advanced',
    title: 'Pasarela de Producción para APIs 100% Reales (Tripo3D, ElevenLabs, Shopify & Stripe)',
    desc: 'Arquitectura de endpoints desacoplados preparados para autenticación con claves API reales, Webhooks y pagos en vivo.',
    isInitialDone: true
  },
  {
    id: 'enterprise_webhook_event_system',
    module: 'Super Admin & Multi-Marca',
    category: 'advanced',
    title: 'Sistema de Webhooks en Tiempo Real para Eventos de Fabricación y Pedidos',
    desc: 'Despacho automatizado de notificaciones webhook ante cambios de estado en corte textil, pedidos Shopify y reservas de fábrica.',
    isInitialDone: true
  },
  {
    id: 'brand_assets_cloud_backup',
    module: 'Fabricación & Hardware 3D',
    category: 'advanced',
    title: 'Sincronización & Bóveda de Diseños 3D en la Nube (Cloud Assets Vault)',
    desc: 'Almacenamiento seguro e inmutable de geometrías .GLB, texturas PBR 4K y fichas técnicas exportables.',
    isInitialDone: true
  },

  // ==========================================
  // 👑 9. NIVEL 9: BRAND KIT, MEDIA BUYER & ROAS, GIT 3D, METAVERSE EXPORTER & LAB TEXTIL (50 HITOS GIGANTES)
  // ==========================================
  {
    id: 'brand_kit_corporate_global',
    module: 'Identidad & Brand Kit',
    category: 'advanced',
    title: 'Brand Kit Corporativo Global (Tipografías, SVG & Marcas de Agua)',
    desc: 'Centralización de ADN de marca con tipografías oficiales, logotipos vectoriales SVG y aplicación automática a todos los renders.',
    isInitialDone: true
  },
  {
    id: 'pantone_cmyk_converter',
    module: 'Identidad & Brand Kit',
    category: 'advanced',
    title: 'Conversor y Selector de Paletas Pantone / CMYK para Estampación',
    desc: 'Correspondencia de color exacta entre pantalla y tintas textiles para evitar variaciones en producción de fábrica.',
    isInitialDone: true
  },
  {
    id: 'ai_moodboard_extractor',
    module: 'Identidad & Brand Kit',
    category: 'advanced',
    title: 'Extractor de Moodboards & Tableros de Tendencias con IA',
    desc: 'Extracción inteligente de códigos Pantone y texturas a partir de imágenes de inspiración de moda.',
    isInitialDone: true
  },
  {
    id: 'parametric_3d_embroidery_patch',
    module: 'Identidad & Brand Kit',
    category: 'advanced',
    title: 'Bordador & Creador de Parches 3D Paramétrico con Hilos de Relieve',
    desc: 'Generación de hilos con brillo satinado, metálico y relieve volumétrico para escudos y parches.',
    isInitialDone: true
  },
  {
    id: 'printable_hangtags_barcode_generator',
    module: 'Identidad & Brand Kit',
    category: 'advanced',
    title: 'Generador de Hangtags Colgantes y Etiquetas con Código EAN-13',
    desc: 'Diseño automático de etiquetas de cuello y cartulinas colgantes de 300 DPI listas para imprenta con código de barras.',
    isInitialDone: true
  },
  {
    id: 'storyboard_3_acts_scriptwriter',
    module: 'Media Buying & Video Ads',
    category: 'advanced',
    title: 'Generador de Storyboards de 3 Actos con IA (Hook, Proof, CTA)',
    desc: 'Estructuración cinematográfica visual para anuncios de alta retención en TikTok y Reels con tiempos de locución.',
    isInitialDone: true
  },
  {
    id: 'hormozi_style_dynamic_subtitles',
    module: 'Media Buying & Video Ads',
    category: 'advanced',
    title: 'Creador de Subtítulos Animados Dinámicos Estilo Alex Hormozi',
    desc: 'Animación de subtítulos con palabras clave resaltadas en colores neón y escala interactiva.',
    isInitialDone: true
  },
  {
    id: 'sfx_audio_soundboard_library',
    module: 'Media Buying & Video Ads',
    category: 'advanced',
    title: 'Biblioteca de Efectos de Sonido SFX Textil y Transiciones',
    desc: 'Sonidos de cremalleras, lluvia, cortes y clics de cámara sincronizados con la edición de video.',
    isInitialDone: true
  },
  {
    id: 'hook_3s_retention_analyzer',
    module: 'Media Buying & Video Ads',
    category: 'advanced',
    title: 'Analizador y Calificador de Retención de los Primeros 3 Segundos',
    desc: 'Predicción de CTR y fuerza visual del frame de apertura para evitar que el usuario haga scroll.',
    isInitialDone: true
  },
  {
    id: 'high_ctr_thumbnails_generator',
    module: 'Media Buying & Video Ads',
    category: 'advanced',
    title: 'Generador de Portadas y Miniaturas de Alto CTR para TikTok/YouTube',
    desc: 'Miniaturas publicitarias con alto contraste, bordes iluminados y títulos de impacto.',
    isInitialDone: true
  },
  {
    id: 'tiktok_meta_campaign_pack_exporter',
    module: 'Media Buying & Video Ads',
    category: 'advanced',
    title: 'Exportador de Paquetes de Campaña Listos para TikTok/Meta Ads',
    desc: 'Archivo ZIP con videos, variantes de texto, llamados a la acción y segmentaciones sugeridas.',
    isInitialDone: true
  },
  {
    id: 'ad_ab_testing_variations_generator',
    module: 'Media Buying & Video Ads',
    category: 'advanced',
    title: 'Generador de 3 Variantes de Anuncio para A/B Testing',
    desc: 'Creación automática de 3 versiones con ganchos contrastantes para optimizar el costo por compra (CPA).',
    isInitialDone: true
  },
  {
    id: 'roas_budget_media_buying_calculator',
    module: 'Media Buying & Video Ads',
    category: 'advanced',
    title: 'Calculadora Predictiva de ROAS & Presupuesto Publicitario',
    desc: 'Simulación en vivo de ventas diarias, facturación a 30 días y beneficio neto según la inversión en pauta.',
    isInitialDone: true
  },
  {
    id: 'aida_pas_ad_copy_generator',
    module: 'Media Buying & Video Ads',
    category: 'advanced',
    title: 'Generador de Textos Publicitarios con Fórmulas AIDA / PAS',
    desc: 'Redacción persuasiva con escasez y prueba social para anuncios en Instagram, Facebook y Google Ads.',
    isInitialDone: true
  },
  {
    id: 'ad_policy_compliance_scanner',
    module: 'Media Buying & Video Ads',
    category: 'advanced',
    title: 'Escáner de Cumplimiento de Políticas Publicitarias de Meta/TikTok',
    desc: 'Verificación automática para prevenir rechazos y bloqueos de anuncios en plataformas de pauta.',
    isInitialDone: true
  },
  {
    id: 'git_3d_fashion_version_control',
    module: 'Control de Versiones & AR',
    category: 'advanced',
    title: 'Historial de Versiones & Puntos de Restauración Inmutables (Git 3D)',
    desc: 'Línea de tiempo de revisiones (v1.0, v1.2, v2.0) con rollback en 1 clic y autoría de cambios.',
    isInitialDone: true
  },
  {
    id: 'split_slider_visual_diff_comparator',
    module: 'Control de Versiones & AR',
    category: 'advanced',
    title: 'Comparador Visual de Pantalla Dividida (Antes vs Después 3D)',
    desc: 'Barra deslizable en tiempo real sobre el modelo para evaluar evoluciones de diseño.',
    isInitialDone: true
  },
  {
    id: 'spatial_3d_garment_pin_annotations',
    module: 'Control de Versiones & AR',
    category: 'advanced',
    title: 'Anotaciones y Marcadores Espaciales 3D para Equipos de Confección',
    desc: 'Notas y comentarios fijados directamente en coordenadas 3D de la prenda para el patronista.',
    isInitialDone: true
  },
  {
    id: 'executive_client_presentation_mode',
    module: 'Control de Versiones & AR',
    category: 'advanced',
    title: 'Modo Presentación Limpio para Reuniones y Clientes VIP',
    desc: 'Vista inmersiva a pantalla completa sin distracciones para juntas de aprobación de colección.',
    isInitialDone: true
  },
  {
    id: 'team_change_audit_activity_log',
    module: 'Control de Versiones & AR',
    category: 'advanced',
    title: 'Registro de Auditoría de Cambios de Diseño en la Agencia',
    desc: 'Trazabilidad de modificaciones de medidas, colores y materiales por cada miembro del equipo.',
    isInitialDone: true
  },
  {
    id: 'unreal_engine_5_nanite_usd_exporter',
    module: 'Gaming & Metaverso 3D',
    category: 'advanced',
    title: 'Exportador para Unreal Engine 5 con Nanite y Formato USD',
    desc: 'Compilación volumétrica con texturas 8K para producción cinematográfica y pasarelas LED gigantes.',
    isInitialDone: true
  },
  {
    id: 'roblox_decentraland_ugc_optimizer',
    module: 'Gaming & Metaverso 3D',
    category: 'advanced',
    title: 'Optimizador de Mallas Low-Poly para Roblox y Decentraland',
    desc: 'Reducción poligonal automática y atlas de textura empaquetado para avatares de videojuegos.',
    isInitialDone: true
  },
  {
    id: 'clo3d_marvelous_zprj_quad_bridge',
    module: 'Gaming & Metaverso 3D',
    category: 'advanced',
    title: 'Intercambio con CLO3D y Marvelous Designer (.ZPRJ Quad Retopo)',
    desc: 'Mallas 100% cuádruples con coordenadas UV limpias y líneas de costura editables.',
    isInitialDone: true
  },
  {
    id: 'rigged_fbx_humanoid_bone_hierarchy',
    module: 'Gaming & Metaverso 3D',
    category: 'advanced',
    title: 'Exportador con Esqueleto Anatómico Rigged FBX (Caminar / Bailar)',
    desc: 'Ropa adaptada a huesos humanoides con clips de animación listos para Unity y Blender.',
    isInitialDone: true
  },
  {
    id: 'vrchat_vtuber_secondary_physics',
    module: 'Gaming & Metaverso 3D',
    category: 'advanced',
    title: 'Exportador para VRChat & VTubers con Físicas Textiles Secundarias',
    desc: 'Assets optimizados para streamers virtuales con movimiento fluido de capas y cordones.',
    isInitialDone: true
  },
  {
    id: 'interactive_us_vs_others_table',
    module: 'Integración E-Commerce',
    category: 'advanced',
    title: 'Generador de Tablas Comparativas E-Commerce ("Nosotros vs Otros")',
    desc: 'Bloque persuasivo para tiendas online destacando ventajas de materiales, precio y garantías.',
    isInitialDone: true
  },
  {
    id: 'ai_height_weight_size_recommender',
    module: 'Integración E-Commerce',
    category: 'advanced',
    title: 'Recomendador de Tallas IA Basado en Estatura y Peso Corporal',
    desc: 'Widget interactivo para reducir la tasa de devoluciones recomendando la talla exacta al cliente.',
    isInitialDone: true
  },
  {
    id: 'aov_upselling_bundle_builder',
    module: 'Integración E-Commerce',
    category: 'advanced',
    title: 'Creador de Bundles de Compra y Descuentos por Volumen (Upselling)',
    desc: 'Configurador de paquetes coordinados (Chaqueta + Pantalón) para incrementar el ticket promedio.',
    isInitialDone: true
  },
  {
    id: 'high_converting_mobile_sticky_buy_bar',
    module: 'Integración E-Commerce',
    category: 'advanced',
    title: 'Barra de Compra Fija (Sticky Buy Bar) Móvil para Celulares',
    desc: 'Barra inferior de checkout que acompaña al usuario durante el scroll en dispositivos móviles.',
    isInitialDone: true
  },
  {
    id: 'amazon_mercadolibre_seo_sheet',
    module: 'Integración E-Commerce',
    category: 'advanced',
    title: 'Generador de Fichas de Producto Optimizadas para Amazon y Mercado Libre',
    desc: 'Títulos SEO, viñetas de especificaciones y descripción comercial para marketplaces globales.',
    isInitialDone: true
  },
  {
    id: 'auto_retopology_quad_cleaner',
    module: 'Fabricación & Hardware 3D',
    category: 'advanced',
    title: 'Optimizador Automático de Topología 3D Cuádruple (Auto-Retopology)',
    desc: 'Conversión de triángulos irregulares en mallas limpias de quads con 1 solo clic.',
    isInitialDone: true
  },
  {
    id: 'runway_photo_palette_extractor',
    module: 'Identidad & Brand Kit',
    category: 'advanced',
    title: 'Extractor de Paletas Cromáticas desde Fotos de Pasarela',
    desc: 'Mapeo instantáneo de colores dominantes y acentos a partir de imágenes de alta costura.',
    isInitialDone: true
  },
  {
    id: 'ai_creative_garment_name_generator',
    module: 'Copiloto IA & Mascotas',
    category: 'advanced',
    title: 'Generador de Nombres Comerciales Conceptuales de Prendas',
    desc: 'Nombres atractivos y futuristas para colecciones cápsula generados con inteligencia artificial.',
    isInitialDone: true
  },
  {
    id: 'lighting_shadow_studio_corrector',
    module: 'Fabricación & Hardware 3D',
    category: 'advanced',
    title: 'Corrector de Sombras e Iluminación de Estudio Comercial 4K',
    desc: 'Balance de iluminación de tres puntos (Key, Fill, Rim) para máxima calidad publicitaria.',
    isInitialDone: true
  },
  {
    id: 'multilingual_factory_po_assistant',
    module: 'Proveedores Globales B2B',
    category: 'advanced',
    title: 'Redactor Asistente de Términos de Compra para Fábricas (Inglés/Turco)',
    desc: 'Generación de órdenes de compra con términos claros para fábricas en Portugal, Turquía y Asia.',
    isInitialDone: true
  },
  {
    id: 'breathability_heat_cfm_simulator',
    module: 'Laboratorio Textil & B2B',
    category: 'advanced',
    title: 'Simulador de Transpirabilidad y Evacuación de Calor (CFM)',
    desc: 'Cálculo del flujo de aire y regulación térmica del tejido según el gramaje GSM.',
    isInitialDone: true
  },
  {
    id: 'post_wash_shrinkage_predictor',
    module: 'Laboratorio Textil & B2B',
    category: 'advanced',
    title: 'Predictor de Encogimiento Post-Lavado (Norma AATCC 135)',
    desc: 'Estimación de porcentaje de reducción longitudinal y transversal tras lavado.',
    isInitialDone: true
  },
  {
    id: 'nesting_fabric_waste_minimizer',
    module: 'Laboratorio Textil & B2B',
    category: 'advanced',
    title: 'Algoritmo de Acomodo de Patrones (Nesting 2D) Ahorro de Metraje',
    desc: 'Rotación y acomodo inteligente de piezas de moldería para reducir el desperdicio textil.',
    isInitialDone: true
  },
  {
    id: 'grs_gots_eco_badges_generator',
    module: 'Laboratorio Textil & B2B',
    category: 'advanced',
    title: 'Generador de Insignias Verificables de Sostenibilidad (GRS / GOTS)',
    desc: 'Sellos de algodón orgánico y reciclabilidad para etiquetas y empaques.',
    isInitialDone: true
  },
  {
    id: 'martindale_abrasion_friction_tester',
    module: 'Laboratorio Textil & B2B',
    category: 'advanced',
    title: 'Simulador de Ciclos de Fricción y Resistencia al Desgaste (Martindale)',
    desc: 'Cálculo de ciclos de desgaste (ISO 12947) para asegurar longevidad extrema de la prenda.',
    isInitialDone: true
  },
  {
    id: 'webcam_virtual_tryon_mirror',
    module: 'Control de Versiones & AR',
    category: 'advanced',
    title: 'Espejo Virtual Try-On con Cámara Frontal y Tracking Corporal',
    desc: 'Prueba virtual en tiempo real superponiendo la silueta de la prenda sobre la cámara.',
    isInitialDone: true
  },
  {
    id: 'camera_foot_shoe_size_scanner',
    module: 'Control de Versiones & AR',
    category: 'advanced',
    title: 'Medidor de Talla de Calzado con Foto de Pie',
    desc: 'Detección métrica de longitud y ancho del pie para sugerir la talla exacta en calzado.',
    isInitialDone: true
  },
  {
    id: 'webxr_ar_floor_scale_projector',
    module: 'Control de Versiones & AR',
    category: 'advanced',
    title: 'Proyector AR de Suelo a Escala 1:1 para Espacios Reales',
    desc: 'Visualización espacial WebXR en el suelo de la habitación para calzado y accesorios.',
    isInitialDone: true
  },
  {
    id: 'spark_ar_tiktok_effect_filters',
    module: 'Control de Versiones & AR',
    category: 'advanced',
    title: 'Generador de Filtros de Realidad Aumentada para Instagram y TikTok',
    desc: 'Exportación de paquetes .arexport y .ehproj para experiencias virales de marca.',
    isInitialDone: true
  },
  {
    id: 'offline_pwa_runway_booth_mode',
    module: 'Control de Versiones & AR',
    category: 'advanced',
    title: 'Modo Sin Conexión Offline para Ferias y Pasarelas Físicas',
    desc: 'Caché PWA para operar y tomar pedidos en eventos presenciales sin conexión a Internet.',
    isInitialDone: true
  },
  {
    id: 'international_commercial_proforma_invoice',
    module: 'Laboratorio Textil & B2B',
    category: 'advanced',
    title: 'Generador de Facturas Proforma Comerciales con Incoterms (FOB/CIF)',
    desc: 'Documentación comercial internacional con códigos arancelarios HTS y datos de exportación.',
    isInitialDone: true
  },
  {
    id: 'b2b_nda_confidentiality_contracts',
    module: 'Laboratorio Textil & B2B',
    category: 'advanced',
    title: 'Gestor de Contratos de Confidencialidad (NDA) para Diseños',
    desc: 'Generación y firma digital de acuerdos legales antes de enviar archivos 3D a fábricas.',
    isInitialDone: true
  },
  {
    id: 'physical_sample_approval_workflow',
    module: 'Laboratorio Textil & B2B',
    category: 'advanced',
    title: 'Flujo de Seguimiento y Aprobación de Muestras Físicas (Proto #1)',
    desc: 'Panel de control con estados de aprobación (Aprobada, Ajustar, Rechazada) con registro fotográfico.',
    isInitialDone: true
  },
  {
    id: 'anti_piracy_invisible_mesh_watermark',
    module: 'Gaming & Metaverso 3D',
    category: 'advanced',
    title: 'Bóveda de Protección con Marcas de Agua Criptográficas Invisibles',
    desc: 'Micro-vértices cifrados en mallas 3D para certificar autoría legal e inmutable.',
    isInitialDone: true
  },
  {
    id: 'quickbooks_xero_accounting_sync',
    module: 'Laboratorio Textil & B2B',
    category: 'advanced',
    title: 'Exportador Contable para QuickBooks y Xero con Márgenes y Fletes',
    desc: 'Reportes de costos de producción, fletes aduaneros y balance financiero listo para contabilidad.',
    isInitialDone: true
  },
  {
    id: 'api_gateway_multi_domain_hub',
    module: 'Master API Gateway & Conectores IA',
    category: 'advanced',
    title: 'Hub Maestro de 18 Motores de IA Real con Alternador Live/Demo',
    desc: 'Conexión y orquestación con Tripo3D, Meshy, Runway, Luma, Suno, ElevenLabs, Gemini, Fal.ai y Shopify.',
    isInitialDone: true
  },
  {
    id: 'api_gateway_clothing_3d_engine',
    module: 'Master API Gateway & Conectores IA',
    category: 'advanced',
    title: 'Conector 3D IA Especializado para Ropa, Alta Costura & Telas',
    desc: 'Generación de prendas con micro-texturas y topología cuádruple lista para manufactura y patronaje.',
    isInitialDone: true
  },
  {
    id: 'api_gateway_furniture_chair_engine',
    module: 'Master API Gateway & Conectores IA',
    category: 'advanced',
    title: 'Conector 3D IA para Sillas, Muebles & Mobiliario de Diseño',
    desc: 'Generación paramétrica de estructuras ergonómicas de madera, titanio y tapicería de lujo.',
    isInitialDone: true
  },
  {
    id: 'api_gateway_footwear_shoes_engine',
    module: 'Master API Gateway & Conectores IA',
    category: 'advanced',
    title: 'Conector 3D IA para Calzado Deportivo, Tacones & Sneakers',
    desc: 'Modelado volumétrico de suelas amortiguadas, empeines y mallas respirables con Tripo3D / Meshy.',
    isInitialDone: true
  },
  {
    id: 'api_gateway_bags_leather_engine',
    module: 'Master API Gateway & Conectores IA',
    category: 'advanced',
    title: 'Conector 3D IA para Bolsos, Mochilas & Artículos de Cuero',
    desc: 'Detalle de costuras reforzadas, herrajes metálicos dorados y texturas de cuero granulado.',
    isInitialDone: true
  },
  {
    id: 'api_gateway_restaurant_food_ads_engine',
    module: 'Master API Gateway & Conectores IA',
    category: 'advanced',
    title: 'Conector de Video 4K para Restaurantes & Anuncios Gastronómicos',
    desc: 'Tomas cinemáticas macro con vapor, movimiento de salsas y apetitocidad hiperrealista con Runway Gen-3.',
    isInitialDone: true
  },
  {
    id: 'api_gateway_suno_music_synthesis',
    module: 'Master API Gateway & Conectores IA',
    category: 'advanced',
    title: 'Conector de Síntesis Musical Comercial con Suno AI & Phonk 808',
    desc: 'Generación de pistas de audio libres de regalías y bandas sonoras dinámicas para campañas de TikTok/Reels.',
    isInitialDone: true
  },
  {
    id: 'api_gateway_live_playground_tester',
    module: 'Master API Gateway & Conectores IA',
    category: 'advanced',
    title: 'Laboratorio Interactivo de Prueba de Inferencia en Tiempo Real',
    desc: 'Consola de test de latencia, medidor de COGS por llamada y descarga de mallas GLB generadas.',
    isInitialDone: true
  },
  {
    id: 'n8n_visual_graph_canvas',
    module: 'Automatizaciones & Flujos n8n',
    category: 'advanced',
    title: 'Lienzo Visual de Nodos Interactivos (Estilo n8n / Make)',
    desc: 'Diseñador visual de grafos conectados con puertos de entrada/salida y estados en vivo.',
    isInitialDone: true
  },
  {
    id: 'n8n_ecommerce_viral_pipeline',
    module: 'Automatizaciones & Flujos n8n',
    category: 'advanced',
    title: 'Pipeline Viral Automático (3D -> Video 4K -> Suno -> Shopify -> TikTok Ads)',
    desc: 'Flujo completo automatizado desde el boceto hasta la pauta publicitaria en TikTok.',
    isInitialDone: true
  },
  {
    id: 'n8n_trend_scraper_cron',
    module: 'Automatizaciones & Flujos n8n',
    category: 'advanced',
    title: 'Monitor Programado de Tendencias Cron 08:00 AM con Gemini & FLUX.1',
    desc: 'Extracción diaria de micro-tendencias y generación automática de Lookbooks editoriales.',
    isInitialDone: true
  },
  {
    id: 'n8n_json_exporter_and_webhooks',
    module: 'Automatizaciones & Flujos n8n',
    category: 'advanced',
    title: 'Exportador JSON Nativo para Instancias n8n & Endpoints Webhook cURL',
    desc: 'Compatibilidad directa para importar los flujos en n8n self-hosted o dispararlos con Webhooks POST.',
    isInitialDone: true
  },
  {
    id: 'staging_independent_modules',
    module: 'Despliegue Gradual & Mantenimiento',
    category: 'advanced',
    title: 'Arquitectura Modular Independiente con Feature Flags por Módulo',
    desc: 'Control individual de estado (Activo, Próximamente Fase 2, Mantenimiento, Deshabilitado) para cada módulo.',
    isInitialDone: true
  },
  {
    id: 'staging_1click_mvp_preset',
    module: 'Despliegue Gradual & Mantenimiento',
    category: 'advanced',
    title: 'Preset en 1 Clic: Lanzamiento Inicial MVP (Solo Diseño 3D & JARVIS)',
    desc: 'Permite salir a producción con solo el módulo de diseño activo y el resto programado para futuras fases.',
    isInitialDone: true
  },
  {
    id: 'staging_zero_downtime_maintenance_screen',
    module: 'Despliegue Gradual & Mantenimiento',
    category: 'advanced',
    title: 'Pantalla de Mantenimiento / Próximamente con Suscripción a Avisos',
    desc: 'Aviso elegante sin caídas globales con teaser de novedades y botón "Notificarme por Email".',
    isInitialDone: true
  },
  {
    id: 'staging_admin_bypass_override',
    module: 'Despliegue Gradual & Mantenimiento',
    category: 'advanced',
    title: 'Conmutador Maestro de Bypass y Previsualización para Administradores',
    desc: 'Permite a los administradores probar cualquier módulo en desarrollo sin que los usuarios finales lo vean.',
    isInitialDone: true
  },
  {
    id: 'auth_real_email_and_phone_verification',
    module: 'Seguridad & Autenticación',
    category: 'advanced',
    title: 'Validación de Correo Electrónico en Tiempo Real y Verificación OTP SMS',
    desc: 'Soporte multi-canal para validar emails reales y enviar códigos OTP por SMS / WhatsApp con temporizador.',
    isInitialDone: true
  },
  {
    id: 'admin_delete_user_account',
    module: 'Consola Administrativa',
    category: 'advanced',
    title: 'Baja Permanente & Eliminación Segura de Usuarios',
    desc: 'Modal de confirmación para dar de baja usuarios, revocar licencias y limpiar bases de datos.',
    isInitialDone: true
  },
  {
    id: 'admin_recurring_auto_billing_engine',
    module: 'Consola Administrativa',
    category: 'advanced',
    title: 'Motor de Cobros Automáticos Recurrentes (Stripe / Recurrente Engine)',
    desc: 'Barrido automático de suscripciones vencidas, cobro a tarjeta de crédito registrada y generación de facturas.',
    isInitialDone: true
  },
  {
    id: 'admin_invoices_history_and_downgrade',
    module: 'Consola Administrativa',
    category: 'advanced',
    title: 'Historial de Invoices Stripe y Degradación Automática a Free por Fallo',
    desc: 'Registro auditable de facturas y degradación automática a Free Starter tras 3 intentos fallidos de tarjeta.',
    isInitialDone: true
  },
  {
    id: 'adobe_photoshop_pbr_layers_and_blend_modes',
    module: 'Aurora 3D Studio',
    category: 'advanced',
    title: 'Capas PBR & Modos de Fusión Adobe Photoshop (Multiply, Screen, Overlay, Soft Light)',
    desc: 'Jerarquía de capas Albedo, Normal, Roughness, Metallic y Decal con opacidad independiente y fusión Photoshop.',
    isInitialDone: true
  },
  {
    id: 'adobe_illustrator_bezier_curves_and_extrusion',
    module: 'Aurora 3D Studio',
    category: 'advanced',
    title: 'Escultor de Curvas Bézier Vectoriales & Extrusión 3D Adobe Illustrator',
    desc: 'Editor interactivo de curvas vectoriales, biselado paramétrico y extrusión 3D directa de moldes y nervaduras.',
    isInitialDone: true
  },
  {
    id: 'adobe_illustrator_curved_typography_and_monograms',
    module: 'Aurora 3D Studio',
    category: 'advanced',
    title: 'Tipografía Curva en Relieve 3D & Generador de Monogramas (Seamless Grid Pattern)',
    desc: 'Extrusión de textos tipográficos en mallas 3D y repetición de patrones monograma estilo LV / Gucci / Carbon Weave.',
    isInitialDone: true
  },
  {
    id: 'substance_3d_procedural_pbr_materials_suite',
    module: 'Aurora 3D Studio',
    category: 'advanced',
    title: 'Suite de Materiales Procedurales PBR Substance 3D & Filtros HSL Photoshop',
    desc: '8 materiales hiperrealistas (Cuero Vacuno, Denim, Carbono, Cromo, Seda, Terciopelo) con gradación de color y curvas.',
    isInitialDone: true
  },
  {
    id: 'multi_format_export_psd_ai_glb_usdz',
    module: 'Aurora 3D Studio',
    category: 'advanced',
    title: 'Exportador Multi-Formato Profesional (Adobe .PSD, .AI / .SVG, Blender .GLB, Apple .USDZ)',
    desc: 'Exportación directa de paquetes de capas PSD para Photoshop, vectores AI/SVG para Illustrator y modelos 3D listos para WebXR.',
    isInitialDone: true
  },
  {
    id: 'ai_product_photo_studio_scene_recreation',
    module: 'Foto Estudio IA & Viral Blast',
    category: 'advanced',
    title: 'Estudio Fotográfico de Producto con IA & Recreación de Escenarios Hiperrealistas 4K',
    desc: 'Captura con cámara web o subida de foto, eliminación de fondo Alpha Matte y recreación en 7 escenarios de alta conversión.',
    isInitialDone: true
  },
  {
    id: 'facebook_groups_bulk_auto_poster',
    module: 'Foto Estudio IA & Viral Blast',
    category: 'advanced',
    title: 'Publicador Masivo Automático en Cientos de Grupos de Facebook (Meta Graph API v20.0)',
    desc: 'Base de datos de cientos de grupos segmentados por ciudad/país, selección masiva con 1 clic y transmisión automática de posts.',
    isInitialDone: true
  },
  {
    id: 'meta_anti_spam_human_delay_and_text_spinning',
    module: 'Foto Estudio IA & Viral Blast',
    category: 'advanced',
    title: 'Algoritmo Anti-Ban Human Delay & Rotación de Textos (Text Spinning) de Meta',
    desc: 'Intervalos configurables (15s a 45s) y variaciones dinámicas de texto para proteger la cuenta y evadir filtros de spam.',
    isInitialDone: true
  },
  {
    id: 'multi_network_omni_publisher_instagram_tiktok_whatsapp',
    module: 'Foto Estudio IA & Viral Blast',
    category: 'advanced',
    title: 'Omni-Publicador Multi-Redes (Instagram, TikTok Shop, WhatsApp Difusión, Pinterest, Shopify)',
    desc: 'Sincronización simultánea en los principales canales sociales y catálogos de e-commerce con enlaces directos de compra.',
    isInitialDone: true
  },
  {
    id: 'realtime_campaign_live_telemetry_and_reach_metrics',
    module: 'Foto Estudio IA & Viral Blast',
    category: 'advanced',
    title: 'Consola de Telemetría en Vivo, Logs HTTP 200 y Métricas de Alcance y Clics WhatsApp',
    desc: 'Auditoría en tiempo real de posts emitidos con ID único, alcance de miembros y estimación de prospectos para ventas.',
    isInitialDone: true
  }
];

export const INITIAL_PERSONAL_GOALS: UserPersonalGoal[] = [
  {
    id: 'goal_001',
    title: 'Lanzar Colección Cápsula Cyberpunk Verano 2026',
    description: 'Diseñar 6 prendas completas en 3D con patrones de corte DXF y exportación de fichas técnicas para fábrica.',
    category: 'design_brand',
    priority: 'high',
    targetDate: '2026-10-15',
    isCompleted: false,
    subtasks: [
      { id: 'sub_001', title: 'Crear los 6 modelos 3D en Aurora Studio (Chaquetas, Hoodies, Pantalones)', completed: true },
      { id: 'sub_002', title: 'Simular caída de telas en CLO3D y texturas PBR Substance 3D', completed: true },
      { id: 'sub_003', title: 'Generar lookbook con modelos virtuales IA en FLUX.1', completed: false },
      { id: 'sub_004', title: 'Exportar paquetes master .PSD, .AI y .GLB para confección', completed: false }
    ],
    createdAt: '2026-09-01'
  },
  {
    id: 'goal_002',
    title: 'Fondo de Ahorro para Maquinaria de Bordado & Estampado Textil',
    description: 'Ahorro progresivo del 25% de los ingresos de ventas para adquirir máquina bordadora digital de 6 cabezales.',
    category: 'finance_savings',
    priority: 'high',
    targetDate: '2026-12-01',
    isCompleted: false,
    isFinancialGoal: true,
    targetAmount: 4500,
    currentAmount: 2850,
    currency: 'USD',
    subtasks: [
      { id: 'sub_005', title: 'Abrir cuenta de ahorros exclusiva para reinversión en taller', completed: true },
      { id: 'sub_006', title: 'Cotizar 3 proveedores de maquinaria textil en Medellín y Bogotá', completed: true },
      { id: 'sub_007', title: 'Alcanzar el 75% del capital antes de noviembre', completed: false },
      { id: 'sub_008', title: 'Efectuar la compra final y coordinar transporte e instalación', completed: false }
    ],
    createdAt: '2026-08-15'
  },
  {
    id: 'goal_003',
    title: 'Viaje & Stand Comercial en Colombiatex / Semana de la Moda de París',
    description: 'Presupuesto y agenda logística para asistir a la feria textil y presentar el catálogo 3D ante compradores internacionales.',
    category: 'travel_events',
    priority: 'medium',
    targetDate: '2026-11-20',
    isCompleted: false,
    isFinancialGoal: true,
    targetAmount: 2200,
    currentAmount: 1400,
    currency: 'USD',
    subtasks: [
      { id: 'sub_009', title: 'Comprar tiquetes aéreos y reservar hospedaje cerca del evento', completed: true },
      { id: 'sub_010', title: 'Diseñar tarjetas de presentación NFC y lookbooks impresos con QR 3D', completed: false },
      { id: 'sub_011', title: 'Agendar reuniones B2B con al menos 15 marcas y distribuidores', completed: false }
    ],
    createdAt: '2026-08-20'
  },
  {
    id: 'goal_004',
    title: 'Rutina Deep Work: 4 Horas Diarias de Enfoque sin Distracciones',
    description: 'Establecer bloques matutinos de alta productividad para diseño 3D y desarrollo de marca con cero notificaciones.',
    category: 'focus_habits',
    priority: 'medium',
    targetDate: '2026-10-30',
    isCompleted: false,
    subtasks: [
      { id: 'sub_012', title: 'Bloque 1 (8:00 AM - 10:00 AM): Modelado 3D puro en Aurora Studio', completed: true },
      { id: 'sub_013', title: 'Bloque 2 (10:30 AM - 12:30 PM): Creación de contenido y video ads', completed: true },
      { id: 'sub_014', title: 'Cierre de día (5:00 PM): Revisión de métricas de ventas y pedidos WhatsApp', completed: false }
    ],
    createdAt: '2026-09-01'
  },
  {
    id: 'goal_005',
    title: 'Campaña Viral en 200 Grupos de Facebook & TikTok Shop',
    description: 'Ejecutar difusión masiva automatizada con Meta Graph API v20.0 para generar $5,000 USD en ventas de temporada.',
    category: 'sales_marketing',
    priority: 'high',
    targetDate: '2026-09-30',
    isCompleted: false,
    subtasks: [
      { id: 'sub_015', title: 'Recrear 20 fotos de producto en escenarios fotorrealistas de estudio', completed: true },
      { id: 'sub_016', title: 'Generar variaciones de copys persuasivos AIDA con IA', completed: true },
      { id: 'sub_017', title: 'Programar difusión automática con Anti-Spam Human Delay de 20s', completed: false },
      { id: 'sub_018', title: 'Cerrar pedidos entrantes vía WhatsApp Business y Shopify', completed: false }
    ],
    createdAt: '2026-09-02'
  }
];

export const ProjectRoadmapChecklist: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<'personal_goals' | 'platform_roadmap'>('personal_goals');

  const [personalGoals, setPersonalGoals] = useState<UserPersonalGoal[]>(() => {
    try {
      const saved = localStorage.getItem('aether_user_personal_goals_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PERSONAL_GOALS;
  });

  const [selectedGoalCategory, setSelectedGoalCategory] = useState<string>('all');
  const [goalSearchQuery, setGoalSearchQuery] = useState<string>('');

  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<UserPersonalGoal | null>(null);
  const [isAiGoalModalOpen, setIsAiGoalModalOpen] = useState(false);
  const [aiGoalPrompt, setAiGoalPrompt] = useState('');
  const [isGeneratingAiGoal, setIsGeneratingAiGoal] = useState(false);

  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState<GoalCategory>('design_brand');
  const [formPriority, setFormPriority] = useState<GoalPriority>('high');
  const [formTargetDate, setFormTargetDate] = useState('2026-10-30');
  const [formIsFinancial, setFormIsFinancial] = useState(false);
  const [formTargetAmount, setFormTargetAmount] = useState(1000);
  const [formCurrentAmount, setFormCurrentAmount] = useState(0);
  const [formCurrency, setFormCurrency] = useState('USD');
  const [formSubtasks, setFormSubtasks] = useState<{ id: string; title: string; completed: boolean }[]>([
    { id: 'sub_1', title: 'Paso 1: Planificación inicial', completed: false },
    { id: 'sub_2', title: 'Paso 2: Ejecución de diseño', completed: false },
    { id: 'sub_3', title: 'Paso 3: Lanzamiento y ventas', completed: false }
  ]);
  const [newSubtaskInput, setNewSubtaskInput] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('aether_user_personal_goals_v1', JSON.stringify(personalGoals));
    } catch (e) {
      console.error(e);
    }
  }, [personalGoals]);

  const toggleGoalCompleted = (id: string) => {
    setPersonalGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isCompleted: !g.isCompleted } : g))
    );
  };

  const toggleSubtask = (goalId: string, subtaskId: string) => {
    setPersonalGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        const updatedSubs = g.subtasks.map((s) =>
          s.id === subtaskId ? { ...s, completed: !s.completed } : s
        );
        const allDone = updatedSubs.length > 0 && updatedSubs.every((s) => s.completed);
        return { ...g, subtasks: updatedSubs, isCompleted: allDone ? true : g.isCompleted };
      })
    );
  };

  const handleQuickAddFunds = (goalId: string, amount: number) => {
    setPersonalGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId || !g.isFinancialGoal) return g;
        const nextAmount = Math.min((g.currentAmount || 0) + amount, g.targetAmount || 999999);
        return {
          ...g,
          currentAmount: nextAmount,
          isCompleted: nextAmount >= (g.targetAmount || 0) ? true : g.isCompleted
        };
      })
    );
  };

  const handleDeleteGoal = (goalId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta meta?')) {
      setPersonalGoals((prev) => prev.filter((g) => g.id !== goalId));
    }
  };

  const handleOpenCreateGoalModal = () => {
    setEditingGoal(null);
    setFormTitle('');
    setFormDesc('');
    setFormCategory('design_brand');
    setFormPriority('high');
    setFormTargetDate('2026-10-30');
    setFormIsFinancial(false);
    setFormTargetAmount(1500);
    setFormCurrentAmount(0);
    setFormCurrency('USD');
    setFormSubtasks([
      { id: 'sub_' + Date.now() + '_1', title: 'Paso 1: Definir requerimientos', completed: false },
      { id: 'sub_' + Date.now() + '_2', title: 'Paso 2: Ejecutar desarrollo', completed: false }
    ]);
    setIsGoalModalOpen(true);
  };

  const handleOpenEditGoalModal = (goal: UserPersonalGoal) => {
    setEditingGoal(goal);
    setFormTitle(goal.title);
    setFormDesc(goal.description);
    setFormCategory(goal.category);
    setFormPriority(goal.priority);
    setFormTargetDate(goal.targetDate);
    setFormIsFinancial(Boolean(goal.isFinancialGoal));
    setFormTargetAmount(goal.targetAmount || 1500);
    setFormCurrentAmount(goal.currentAmount || 0);
    setFormCurrency(goal.currency || 'USD');
    setFormSubtasks([...goal.subtasks]);
    setIsGoalModalOpen(true);
  };

  const handleSaveGoal = () => {
    if (!formTitle.trim()) {
      alert('Por favor ingresa un título para la meta.');
      return;
    }

    if (editingGoal) {
      setPersonalGoals((prev) =>
        prev.map((g) =>
          g.id === editingGoal.id
            ? {
                ...g,
                title: formTitle,
                description: formDesc,
                category: formCategory,
                priority: formPriority,
                targetDate: formTargetDate,
                isFinancialGoal: formIsFinancial,
                targetAmount: formIsFinancial ? Number(formTargetAmount) : undefined,
                currentAmount: formIsFinancial ? Number(formCurrentAmount) : undefined,
                currency: formCurrency,
                subtasks: formSubtasks
              }
            : g
        )
      );
    } else {
      const newGoal: UserPersonalGoal = {
        id: 'goal_' + Date.now(),
        title: formTitle,
        description: formDesc,
        category: formCategory,
        priority: formPriority,
        targetDate: formTargetDate,
        isCompleted: false,
        isFinancialGoal: formIsFinancial,
        targetAmount: formIsFinancial ? Number(formTargetAmount) : undefined,
        currentAmount: formIsFinancial ? Number(formCurrentAmount) : undefined,
        currency: formCurrency,
        subtasks: formSubtasks,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setPersonalGoals((prev) => [newGoal, ...prev]);
    }

    setIsGoalModalOpen(false);
  };

  const handleGenerateAiGoal = async () => {
    if (!aiGoalPrompt.trim()) return;

    setIsGeneratingAiGoal(true);
    await new Promise((r) => setTimeout(r, 1200));

    const promptLower = aiGoalPrompt.toLowerCase();
    let generatedCat: GoalCategory = 'design_brand';
    let isFin = false;
    let targetMoney = 2500;

    if (promptLower.includes('ahorr') || promptLower.includes('dolar') || promptLower.includes('plata') || promptLower.includes('finanz')) {
      generatedCat = 'finance_savings';
      isFin = true;
      targetMoney = 3500;
    } else if (promptLower.includes('viaj') || promptLower.includes('feria') || promptLower.includes('paris') || promptLower.includes('colombia')) {
      generatedCat = 'travel_events';
      isFin = true;
      targetMoney = 2000;
    } else if (promptLower.includes('vent') || promptLower.includes('facebook') || promptLower.includes('marketing') || promptLower.includes('tiktok')) {
      generatedCat = 'sales_marketing';
    } else if (promptLower.includes('habito') || promptLower.includes('enfoque') || promptLower.includes('rutina')) {
      generatedCat = 'focus_habits';
    }

    const aiGoal: UserPersonalGoal = {
      id: 'goal_ai_' + Date.now(),
      title: aiGoalPrompt.length > 50 ? aiGoalPrompt.substring(0, 48) + '...' : aiGoalPrompt,
      description: 'Plan de acción generado automáticamente por la IA de Aether para cumplir: "' + aiGoalPrompt + '".',
      category: generatedCat,
      priority: 'high',
      targetDate: '2026-11-15',
      isCompleted: false,
      isFinancialGoal: isFin,
      targetAmount: isFin ? targetMoney : undefined,
      currentAmount: isFin ? 0 : undefined,
      currency: 'USD',
      subtasks: [
        { id: 'sub_' + Date.now() + '_1', title: 'Fase 1: Análisis y preparación de recursos', completed: true },
        { id: 'sub_' + Date.now() + '_2', title: 'Fase 2: Ejecución de diseño / ahorro prioritario', completed: false },
        { id: 'sub_' + Date.now() + '_3', title: 'Fase 3: Implementación en plataforma y canales de venta', completed: false },
        { id: 'sub_' + Date.now() + '_4', title: 'Fase 4: Evaluación de resultados y consolidación', completed: false }
      ],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPersonalGoals((prev) => [aiGoal, ...prev]);
    setIsGeneratingAiGoal(false);
    setIsAiGoalModalOpen(false);
    setAiGoalPrompt('');
  };

  const calculateDaysRemaining = (targetDateStr: string) => {
    const today = new Date();
    const target = new Date(targetDateStr);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalPersonalGoals = personalGoals.length;
  const completedPersonalGoals = personalGoals.filter((g) => g.isCompleted).length;
  const personalProgressPercent = totalPersonalGoals > 0 ? Math.round((completedPersonalGoals / totalPersonalGoals) * 100) : 0;
  const totalSavingsAccumulated = personalGoals
    .filter((g) => g.isFinancialGoal)
    .reduce((acc, g) => acc + (g.currentAmount || 0), 0);

  const filteredPersonalGoals = personalGoals.filter((goal) => {
    const matchCat = selectedGoalCategory === 'all' || goal.category === selectedGoalCategory;
    const matchSearch =
      goalSearchQuery === '' ||
      goal.title.toLowerCase().includes(goalSearchQuery.toLowerCase()) ||
      goal.description.toLowerCase().includes(goalSearchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const initial: Record<string, boolean> = {};
      CHECKLIST_DATA.forEach((item) => {
        if (item.isInitialDone) {
          initial[item.id] = true;
        }
      });

      const saved = localStorage.getItem('aether_roadmap_checklist_v6');
      if (saved) {
        return { ...initial, ...JSON.parse(saved) };
      }
      return initial;
    } catch {
      return {};
    }
  });

  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('aether_roadmap_checklist_v6', JSON.stringify(checkedItems));
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

  const getGoalCategoryLabel = (cat: GoalCategory) => {
    switch (cat) {
      case 'design_brand':
        return { label: 'Diseño & Marca', emoji: '🎨', color: 'text-pink-400 border-pink-500/40 bg-pink-500/10' };
      case 'finance_savings':
        return { label: 'Finanzas & Ahorro', emoji: '💰', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' };
      case 'travel_events':
        return { label: 'Viajes & Ferias', emoji: '✈️', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' };
      case 'focus_habits':
        return { label: 'Enfoque & Hábitos', emoji: '🧠', color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' };
      case 'sales_marketing':
        return { label: 'Marketing & Ventas', emoji: '🚀', color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' };
      case 'personal_lifestyle':
        return { label: 'Estilo de Vida', emoji: '⭐', color: 'text-yellow-300 border-yellow-500/40 bg-yellow-500/10' };
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn transition-colors text-slate-100">
      {/* Selector Principal de Modo */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-cyber-900/95 border border-cyber-gold/50 p-4 rounded-3xl shadow-gold-glow">
        <div className="flex items-center gap-2 bg-cyber-950 p-1.5 rounded-2xl border border-cyber-800 w-full sm:w-auto">
          <button
            onClick={() => setActiveMainTab('personal_goals')}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              activeMainTab === 'personal_goals'
                ? 'bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black shadow-gold-glow font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>🎯 Mis Metas & Checklist Personal (Life OS)</span>
          </button>

          <button
            onClick={() => setActiveMainTab('platform_roadmap')}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              activeMainTab === 'platform_roadmap'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>🚀 Roadmap Técnico Aether ({totalTasks} Hitos)</span>
          </button>
        </div>

        {activeMainTab === 'personal_goals' ? (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsAiGoalModalOpen(true)}
              className="px-4 py-2 rounded-2xl bg-purple-500/20 border border-purple-500 hover:bg-purple-500/30 text-purple-300 font-tech font-bold text-xs uppercase flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Crear con IA</span>
            </button>
            <button
              onClick={handleOpenCreateGoalModal}
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-cyber-gold to-amber-500 hover:opacity-95 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Meta</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              const exportJson = JSON.stringify(checkedItems, null, 2);
              const blob = new Blob([exportJson], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `Aether_Roadmap_Progress_${new Date().toISOString().split('T')[0]}.json`;
              a.click();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyber-950 border border-cyber-700 text-slate-300 hover:text-white hover:border-cyber-gold text-xs font-tech font-bold transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-cyber-gold" />
            <span>Exportar Progreso</span>
          </button>
        )}
      </div>

      {/* TAB 1: METAS PERSONALES */}
      {activeMainTab === 'personal_goals' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Metas Cumplidas</span>
                <Award className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-tech font-bold text-emerald-400">
                {completedPersonalGoals} / {totalPersonalGoals}
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                {personalProgressPercent}% de tasa de éxito global
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Ahorro & Finanzas</span>
                <DollarSign className="w-4 h-4 text-cyber-gold" />
              </div>
              <div className="text-2xl font-tech font-bold text-cyber-gold">
                ${totalSavingsAccumulated.toLocaleString()} USD
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                Capital acumulado en metas financieras
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Enfoque & Hábitos</span>
                <Flame className="w-4 h-4 text-pink-400" />
              </div>
              <div className="text-2xl font-tech font-bold text-pink-400">
                Racha Activa
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                7 Días consecutivos de disciplina
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Estado Global</span>
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-tech font-bold text-cyan-400">
                {personalProgressPercent >= 70 ? '🔥 Imparable' : personalProgressPercent >= 40 ? '⚡ Avanzando' : '🌱 Iniciando'}
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                Consistencia diaria garantizada
              </div>
            </div>
          </div>

          <div className="bg-cyber-900 p-4 rounded-3xl border border-cyber-800 shadow-cyber-card flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              {[
                { id: 'all', label: 'Todas las Metas', emoji: '🌟' },
                { id: 'design_brand', label: 'Diseño & Marca', emoji: '🎨' },
                { id: 'finance_savings', label: 'Finanzas & Ahorro', emoji: '💰' },
                { id: 'travel_events', label: 'Viajes & Ferias', emoji: '✈️' },
                { id: 'focus_habits', label: 'Enfoque & Hábitos', emoji: '🧠' },
                { id: 'sales_marketing', label: 'Marketing & Ventas', emoji: '🚀' },
                { id: 'personal_lifestyle', label: 'Estilo de Vida', emoji: '⭐' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedGoalCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    selectedGoalCategory === cat.id
                      ? 'bg-cyber-gold text-black font-bold shadow-gold-glow'
                      : 'bg-cyber-950 text-slate-400 hover:text-white border border-cyber-800'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={goalSearchQuery}
                onChange={(e) => setGoalSearchQuery(e.target.value)}
                placeholder="Buscar metas o tareas..."
                className="w-full bg-cyber-950 border border-cyber-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPersonalGoals.map((goal) => {
              const catInfo = getGoalCategoryLabel(goal.category);
              const daysLeft = calculateDaysRemaining(goal.targetDate);
              const completedSubs = goal.subtasks.filter((s) => s.completed).length;
              const subProgress = goal.subtasks.length > 0 ? Math.round((completedSubs / goal.subtasks.length) * 100) : 0;
              const financialProgress = goal.isFinancialGoal && goal.targetAmount
                ? Math.min(100, Math.round(((goal.currentAmount || 0) / goal.targetAmount) * 100))
                : 0;

              return (
                <div
                  key={goal.id}
                  className={`p-5 rounded-3xl border transition-all space-y-4 shadow-cyber-card ${
                    goal.isCompleted
                      ? 'bg-cyber-950/90 border-emerald-500/50 shadow-emerald-500/10'
                      : 'bg-cyber-900 border-cyber-800 hover:border-cyber-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleGoalCompleted(goal.id)}
                        className="mt-1 text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
                      >
                        {goal.isCompleted ? (
                          <CheckSquare className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-600 hover:text-cyber-gold" />
                        )}
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`font-tech font-bold text-base transition-colors ${
                              goal.isCompleted ? 'line-through text-slate-400' : 'text-white'
                            }`}
                          >
                            {goal.title}
                          </span>
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold border ${catInfo.color}`}>
                            {catInfo.emoji} {catInfo.label}
                          </span>
                          {goal.priority === 'high' && (
                            <span className="px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                              🔥 Alta
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{goal.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenEditGoalModal(goal)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-cyber-gold hover:bg-cyber-950 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-cyber-950 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {goal.isFinancialGoal && goal.targetAmount && (
                    <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-cyber-gold" /> Meta de Ahorro / Finanzas:
                        </span>
                        <span className="text-cyber-gold font-bold">
                          ${goal.currentAmount?.toLocaleString()} / ${goal.targetAmount.toLocaleString()} {goal.currency} ({financialProgress}%)
                        </span>
                      </div>
                      <div className="h-2 bg-cyber-900 rounded-full overflow-hidden border border-cyber-700">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-cyber-gold transition-all duration-500"
                          style={{ width: `${financialProgress}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[10px]">
                        <span className="text-slate-500">Aportar ahorro rápido:</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleQuickAddFunds(goal.id, 50)}
                            className="px-2 py-0.5 rounded bg-cyber-900 hover:bg-cyber-800 text-cyber-gold border border-cyber-700"
                          >
                            +$50
                          </button>
                          <button
                            onClick={() => handleQuickAddFunds(goal.id, 100)}
                            className="px-2 py-0.5 rounded bg-cyber-900 hover:bg-cyber-800 text-cyber-gold border border-cyber-700"
                          >
                            +$100
                          </button>
                          <button
                            onClick={() => handleQuickAddFunds(goal.id, 500)}
                            className="px-2 py-0.5 rounded bg-cyber-900 hover:bg-cyber-800 text-cyber-gold border border-cyber-700"
                          >
                            +$500
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {goal.subtasks.length > 0 && (
                    <div className="space-y-2 pt-1 border-t border-cyber-800/80">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>Checklist de Pasos ({completedSubs}/{goal.subtasks.length}):</span>
                        <span className="text-cyan-400 font-bold">{subProgress}% completado</span>
                      </div>
                      <div className="space-y-1.5">
                        {goal.subtasks.map((sub) => (
                          <div
                            key={sub.id}
                            onClick={() => toggleSubtask(goal.id, sub.id)}
                            className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                              sub.completed
                                ? 'bg-cyber-950/60 border-emerald-500/30 text-slate-400'
                                : 'bg-cyber-950 border-cyber-800 hover:border-cyber-700 text-slate-200'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                                sub.completed ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'
                              }`}
                            >
                              {sub.completed && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={sub.completed ? 'line-through text-slate-500 text-[11px]' : 'text-xs'}>
                              {sub.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-cyber-800 text-[11px] font-mono">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>Límite: {goal.targetDate}</span>
                    </div>

                    <div>
                      {daysLeft > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold">
                          ⏳ Faltan {daysLeft} días
                        </span>
                      ) : daysLeft === 0 ? (
                        <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/40 text-[10px] font-bold animate-pulse">
                          🚨 Vence Hoy
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/40 text-[10px] font-bold">
                          ⚠️ Plazo cumplido
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ROADMAP TÉCNICO DE LA PLATAFORMA */}
      {activeMainTab === 'platform_roadmap' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-cyber-900/90 p-6 rounded-3xl border border-cyan-500/50 shadow-cyber-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500 text-cyan-400 shadow-md">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-2xl font-tech font-extrabold text-white tracking-wider">
                      ROADMAP & CHECKLIST MAESTRO DE LA PLATAFORMA
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      SISTEMA 100% OPERATIVO
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs font-mono mt-1">
                    Auditoría exhaustiva de capacidades, motores 3D, agentes autónomos, facturación y despliegues.
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-tech font-black text-cyan-400">
                  {progressPercent}%
                </div>
                <div className="text-xs font-mono text-slate-400">
                  {completedTasks} de {totalTasks} Hitos Verificados
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="h-3 w-full bg-cyber-950 rounded-full overflow-hidden border border-cyber-800 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-cyber-950/80 border border-emerald-500/30 flex items-center justify-between">
                <span className="text-slate-300">🟢 Básico (Fundamentos)</span>
                <span className="font-bold text-emerald-400">{basicCompleted} / {basicTasks.length}</span>
              </div>
              <div className="p-3 rounded-2xl bg-cyber-950/80 border border-amber-500/30 flex items-center justify-between">
                <span className="text-slate-300">🟡 Intermedio (Inteligencia)</span>
                <span className="font-bold text-amber-300">{interCompleted} / {interTasks.length}</span>
              </div>
              <div className="p-3 rounded-2xl bg-cyber-950/80 border border-purple-500/30 flex items-center justify-between">
                <span className="text-slate-300">🟣 Avanzado (Agencia/B2B)</span>
                <span className="font-bold text-purple-300">{advCompleted} / {advTasks.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-cyber-900 p-4 rounded-3xl border border-cyber-800 shadow-cyber-card flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar función, módulo o hito..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-cyber-950 border border-cyber-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono w-48 sm:w-64"
                />
              </div>

              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400 font-mono"
              >
                {modules.map((mod) => (
                  <option key={mod} value={mod}>
                    {mod === 'all' ? '📁 Todos los Módulos' : mod}
                  </option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value="all">⚡ Todos los Niveles</option>
                <option value="basic">🟢 Básico</option>
                <option value="intermediate">🟡 Intermedio</option>
                <option value="advanced">🟣 Avanzado</option>
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
                className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-cyber-800"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restablecer
              </button>
            </div>
          </div>

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
                      : 'bg-cyber-900 border-cyber-800 hover:border-cyan-400/50 shadow-cyber-card'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      type="button"
                      className="mt-0.5 text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0"
                    >
                      {isDone ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-600 group-hover:text-cyan-400" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`font-tech font-bold text-sm transition-colors ${
                            isDone ? 'text-slate-300 font-extrabold' : 'text-white group-hover:text-cyan-400'
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
      )}

      {/* MODAL 1: CREAR O EDITAR META PERSONAL */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-mono text-xs">
          <div className="bg-cyber-900 border border-cyber-gold/50 rounded-3xl p-6 max-w-xl w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsGoalModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyber-gold/20 text-cyber-gold border border-cyber-gold">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg">
                  {editingGoal ? 'EDITAR META PERSONAL' : 'NUEVA META / ENFOQUE PERSONAL'}
                </h3>
                <p className="text-slate-400 text-[11px]">Diseño, finanzas, viajes, hábitos o metas de negocio</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] block">Título de la Meta:</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ej: Ahorrar para taller de confección o Lanzar Colección 3D..."
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-cyber-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] block">Descripción / Detalles:</label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  rows={2}
                  placeholder="Objetivos específicos, notas de enfoque o presupuesto..."
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyber-gold"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px] block">Categoría:</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as GoalCategory)}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="design_brand">🎨 Diseño & Marca</option>
                    <option value="finance_savings">💰 Finanzas & Ahorro</option>
                    <option value="travel_events">✈️ Viajes & Ferias</option>
                    <option value="focus_habits">🧠 Enfoque & Hábitos</option>
                    <option value="sales_marketing">🚀 Marketing & Ventas</option>
                    <option value="personal_lifestyle">⭐ Estilo de Vida</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px] block">Prioridad:</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as GoalPriority)}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="high">🔥 Alta</option>
                    <option value="medium">⚡ Media</option>
                    <option value="low">🌿 Baja</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px] block">Fecha Límite:</label>
                  <input
                    type="date"
                    value={formTargetDate}
                    onChange={(e) => setFormTargetDate(e.target.value)}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsFinancial}
                    onChange={(e) => setFormIsFinancial(e.target.checked)}
                    className="rounded accent-cyber-gold"
                  />
                  <span className="font-bold text-cyber-gold">¿Es una meta de ahorro o financiera ($)?</span>
                </label>

                {formIsFinancial && (
                  <div className="grid grid-cols-3 gap-2 pt-2 animate-fadeIn">
                    <div>
                      <label className="text-[10px] text-slate-400 block">Monto Meta:</label>
                      <input
                        type="number"
                        value={formTargetAmount}
                        onChange={(e) => setFormTargetAmount(Number(e.target.value))}
                        className="w-full bg-cyber-900 border border-cyber-700 rounded-xl px-2 py-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block">Ahorro Actual:</label>
                      <input
                        type="number"
                        value={formCurrentAmount}
                        onChange={(e) => setFormCurrentAmount(Number(e.target.value))}
                        className="w-full bg-cyber-900 border border-cyber-700 rounded-xl px-2 py-1.5 text-emerald-400 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block">Moneda:</label>
                      <select
                        value={formCurrency}
                        onChange={(e) => setFormCurrency(e.target.value)}
                        className="w-full bg-cyber-900 border border-cyber-700 rounded-xl px-2 py-1.5 text-white"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="COP">COP ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="MXN">MXN ($)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-1">
                <label className="text-slate-400 text-[11px] block">Sub-tareas & Pasos Accionables:</label>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {formSubtasks.map((st, idx) => (
                    <div key={st.id} className="flex items-center gap-2">
                      <span className="text-slate-500 text-[10px] w-4">{idx + 1}.</span>
                      <input
                        type="text"
                        value={st.title}
                        onChange={(e) => {
                          const updated = [...formSubtasks];
                          updated[idx].title = e.target.value;
                          setFormSubtasks(updated);
                        }}
                        className="flex-1 bg-cyber-950 border border-cyber-700 rounded-xl px-2.5 py-1 text-xs text-white"
                      />
                      <button
                        onClick={() => setFormSubtasks(formSubtasks.filter((_, i) => i !== idx))}
                        className="p-1 text-slate-500 hover:text-rose-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newSubtaskInput}
                    onChange={(e) => setNewSubtaskInput(e.target.value)}
                    placeholder="Escribir nuevo paso..."
                    className="flex-1 bg-cyber-950 border border-cyber-700 rounded-xl px-2.5 py-1 text-xs text-white"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newSubtaskInput.trim()) {
                        setFormSubtasks([
                          ...formSubtasks,
                          { id: 'sub_' + Date.now(), title: newSubtaskInput.trim(), completed: false }
                        ]);
                        setNewSubtaskInput('');
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (newSubtaskInput.trim()) {
                        setFormSubtasks([
                          ...formSubtasks,
                          { id: 'sub_' + Date.now(), title: newSubtaskInput.trim(), completed: false }
                        ]);
                        setNewSubtaskInput('');
                      }
                    }}
                    className="px-3 py-1 bg-cyber-800 hover:bg-cyber-700 text-slate-300 rounded-xl text-xs font-bold"
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 flex gap-2">
              <button
                onClick={handleSaveGoal}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-xs uppercase shadow-gold-glow"
              >
                {editingGoal ? 'Guardar Cambios' : 'Crear Meta Personal'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ASISTENTE IA DE METAS */}
      {isAiGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-mono text-xs">
          <div className="bg-cyber-900 border border-purple-500/50 rounded-3xl p-6 max-w-xl w-full shadow-cyber-card text-white space-y-4 relative">
            <button
              onClick={() => setIsAiGoalModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">ASISTENTE IA DE METAS & HÁBITOS</h3>
                <p className="text-slate-400 text-[11px]">Escribe tu objetivo y la IA desglosará el plan completo con presupuesto y pasos</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-slate-300 text-xs font-tech font-bold block">
                Describe lo que deseas lograr (diseño, ahorro, viajes, hábitos, ventas):
              </label>
              <textarea
                value={aiGoalPrompt}
                onChange={(e) => setAiGoalPrompt(e.target.value)}
                rows={3}
                placeholder="Ej: Quiero ahorrar $3,000 USD para comprar una máquina bordadora y lanzar mi tienda de streetwear en 60 días..."
                className="w-full bg-cyber-950 border border-cyber-700 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-purple-400"
              />

              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500">Inspiración rápida:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    '🎨 Lanzar colección 3D y vender 50 piezas en Shopify',
                    '💰 Ahorrar $2,500 USD para insumos textiles',
                    '✈️ Viajar a Colombiatex y tener 15 reuniones B2B',
                    '🧠 4 Horas de Deep Work diarias sin teléfono'
                  ].map((tpl) => (
                    <button
                      key={tpl}
                      onClick={() => setAiGoalPrompt(tpl)}
                      className="p-2 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-800 text-[10px] text-slate-300 text-left truncate"
                    >
                      {tpl}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateAiGoal}
                disabled={isGeneratingAiGoal || !aiGoalPrompt.trim()}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-700 hover:opacity-95 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isGeneratingAiGoal ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Desglosando Meta & Checklist con IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generar Meta Accionable con IA</span>
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
