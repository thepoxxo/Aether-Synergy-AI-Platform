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
  Share2
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  module: string;
  category: 'basic' | 'intermediate' | 'advanced';
  title: string;
  desc: string;
}

const CHECKLIST_DATA: ChecklistItem[] = [
  // 1. Motor 3D
  {
    id: '3d_screenshot_4k',
    module: 'Motor 3D & Shaders',
    category: 'basic',
    title: 'Captura 4K con Fondo Transparente PNG',
    desc: 'Exportación instantánea en alta resolución sin fondo para catálogos.'
  },
  {
    id: '3d_eyedropper',
    module: 'Motor 3D & Shaders',
    category: 'basic',
    title: 'Selector de Color con Cuentagotas (Eyedropper API)',
    desc: 'Muestreo de colores exactos desde imágenes de inspiración del usuario.'
  },
  {
    id: '3d_keyboard_shortcuts',
    module: 'Motor 3D & Shaders',
    category: 'basic',
    title: 'Atajos de Teclado Profesionales (R, S, G, Space)',
    desc: 'Control rápido para diseñadores que usan atajos de Blender/Spline.'
  },
  {
    id: '3d_decal_interactive',
    module: 'Motor 3D & Shaders',
    category: 'intermediate',
    title: 'Estampador de Calcomanías Interactivo sobre Malla 3D',
    desc: 'Arrastrar y soltar logos PNG proyectándolos directamente sobre la geometría.'
  },
  {
    id: '3d_hdri_presets',
    module: 'Motor 3D & Shaders',
    category: 'intermediate',
    title: 'Entornos de Iluminación HDRi Conmutables',
    desc: 'Presets de estudio: Cyberpunk Tokyo, Nordic Studio, Golden Hour y Warehouse.'
  },
  {
    id: '3d_physics_cloth',
    module: 'Motor 3D & Shaders',
    category: 'intermediate',
    title: 'Simulador de Físicas de Tela y Viento en Tiempo Real',
    desc: 'Animación y caída realista de textiles pesados sobre el modelo 3D.'
  },
  {
    id: '3d_ar_webxr',
    module: 'Motor 3D & Shaders',
    category: 'advanced',
    title: 'Visor en Realidad Aumentada (WebXR & Quick Look)',
    desc: 'Ver la prenda o mueble en el espacio real a través de la cámara del iPhone o Android.'
  },
  {
    id: '3d_render_passes',
    module: 'Motor 3D & Shaders',
    category: 'advanced',
    title: 'Pases de Render para Unreal Engine 5 y Blender',
    desc: 'Exportación separada de mapas de Normales, AO, Rugosidad y Albedo.'
  },
  {
    id: '3d_sketch_to_3d_api',
    module: 'Motor 3D & Shaders',
    category: 'advanced',
    title: 'Generador de Mallas 3D desde Bocetos 2D (Sketch-to-3D)',
    desc: 'Conexión con IA de Tripo3D / Meshy para crear modelos desde dibujos en 30s.'
  },

  // 2. Video Marketing
  {
    id: 'ad_aspect_ratios',
    module: 'Video Marketing IA (AdGen)',
    category: 'basic',
    title: 'Selector Rápido de Proporciones (9:16, 16:9, 1:1, 4:5)',
    desc: 'Plantillas optimizadas para TikTok, YouTube Shorts, Reels e Instagram Feed.'
  },
  {
    id: 'ad_runway_gen3_api',
    module: 'Video Marketing IA (AdGen)',
    category: 'intermediate',
    title: 'Conexión Real con API de Runway Gen-3 Alpha',
    desc: 'Generación cinemática con aceleración GPU en la nube.'
  },
  {
    id: 'ad_sora_kling_api',
    module: 'Video Marketing IA (AdGen)',
    category: 'intermediate',
    title: 'Conexión con OpenAI Sora y Kling AI 1.5 HD',
    desc: 'Generación hiperrealista con modelos humanos en pasarela.'
  },
  {
    id: 'ad_elevenlabs_voiceover',
    module: 'Video Marketing IA (AdGen)',
    category: 'intermediate',
    title: 'Locuciones Publicitarias Multilingües (ElevenLabs)',
    desc: 'Voces comerciales hiperrealistas en 7 idiomas con música atenuada automáticamente.'
  },
  {
    id: 'ad_predictive_retention',
    module: 'Video Marketing IA (AdGen)',
    category: 'advanced',
    title: 'Analizador Predictivo de Retención con IA',
    desc: 'Mapa de calor de atención para evitar el abandono en los primeros 3 segundos.'
  },

  // 3. Proveedores B2B
  {
    id: 'b2b_country_filters',
    module: 'Proveedores Globales B2B',
    category: 'basic',
    title: 'Filtros Avanzados por País y Certificación Ecológica',
    desc: 'Fábricas en Portugal, Turquía, Colombia e Italia con sellos GOTS y OEKO-TEX.'
  },
  {
    id: 'b2b_techpack_pdf',
    module: 'Proveedores Globales B2B',
    category: 'intermediate',
    title: 'Generador Automático de Fichas Técnicas PDF (Tech Pack)',
    desc: 'PDF con vistas ortogonales 3D, tabla de medidas, BOM y colores Pantone.'
  },
  {
    id: 'b2b_dhl_freight_api',
    module: 'Proveedores Globales B2B',
    category: 'advanced',
    title: 'Cotización en Tiempo Real de Envíos y Aduanas (DHL/FedEx)',
    desc: 'Cálculo automático de aranceles y flete aéreo/marítimo por volumen.'
  },

  // 4. Avatar y Copiloto
  {
    id: 'avatar_moods',
    module: 'Copiloto IA & Mascotas',
    category: 'basic',
    title: 'Selector de Estados de Ánimo y Atuendos Guardados',
    desc: 'Personalizar el aspecto y expresiones del avatar en el perfil del usuario.'
  },
  {
    id: 'avatar_voice_commands',
    module: 'Copiloto IA & Mascotas',
    category: 'intermediate',
    title: 'Control por Voz (Speech-to-Text)',
    desc: 'Dictar instrucciones y cambios de diseño directamente por el micrófono.'
  },

  // 5. Consola Admin
  {
    id: 'admin_export_csv',
    module: 'Super Admin & Métricas',
    category: 'basic',
    title: 'Exportación de Usuarios y Finanzas a CSV / Excel',
    desc: 'Descarga de reportes contables con un solo clic.'
  },
  {
    id: 'admin_budget_alerts',
    module: 'Super Admin & Métricas',
    category: 'intermediate',
    title: 'Alertas Automáticas de Presupuesto y Consumo de APIs',
    desc: 'Notificaciones por Slack o correo cuando el gasto de GPUs supere el límite.'
  },

  // 6. Seguridad & Auth
  {
    id: 'auth_social_oauth',
    module: 'Seguridad & Autenticación',
    category: 'intermediate',
    title: 'Inicio de Sesión con Google, Apple y GitHub (OAuth 2.0)',
    desc: 'Acceso seguro con 1 clic sin necesidad de recordar contraseña.'
  },
  {
    id: 'auth_2fa_totp',
    module: 'Seguridad & Autenticación',
    category: 'intermediate',
    title: 'Autenticación en Dos Pasos (2FA con Google Authenticator)',
    desc: 'Protección para cuentas de Administrador y Agencias con códigos temporales.'
  },
  {
    id: 'auth_jwt_http_cookies',
    module: 'Seguridad & Autenticación',
    category: 'advanced',
    title: 'Cookies HttpOnly y Tokens de Sesión Blindados contra XSS/CSRF',
    desc: 'Arquitectura de seguridad bancaria para tokens de acceso y pagos.'
  },

  // 7. Base de Datos en la Nube
  {
    id: 'db_supabase_cloud',
    module: 'Base de Datos & Cloud',
    category: 'intermediate',
    title: 'Conexión a PostgreSQL en Supabase / Neon con RLS',
    desc: 'Base de datos en la nube con políticas de seguridad a nivel de fila.'
  },
  {
    id: 'db_s3_cloudflare_r2',
    module: 'Base de Datos & Cloud',
    category: 'intermediate',
    title: 'Bucket Cloudflare R2 / AWS S3 para Archivos 3D y Renders 4K',
    desc: 'Almacenamiento ilimitado y CDN global para cargas ultra rápidas.'
  },

  // 8. Experiencia Móvil & PWA
  {
    id: 'pwa_offline_install',
    module: 'Móvil & Rendimiento',
    category: 'intermediate',
    title: 'Progressive Web App (PWA) Instalable en Celular e iPad',
    desc: 'Icono en pantalla de inicio y modo sin conexión con Service Workers.'
  },
  {
    id: 'perf_webgpu_lod',
    module: 'Móvil & Rendimiento',
    category: 'advanced',
    title: 'Soporte WebGPU y Nivel de Detalle Adaptativo (LOD)',
    desc: '60 FPS estables en cualquier dispositivo ajustando polígonos automáticamente.'
  },

  // 9. Pagos & Facturación
  {
    id: 'payments_stripe_checkout',
    module: 'Pagos & Facturación Stripe',
    category: 'intermediate',
    title: 'Pasarela Stripe Checkout y Portal de Facturas PDF',
    desc: 'Cobro recurrente para planes Pro ($49) y Agencia ($149) con facturación fiscal.'
  },
  {
    id: 'payments_affiliates_system',
    module: 'Pagos & Facturación Stripe',
    category: 'advanced',
    title: 'Sistema de Afiliados y Comisiones Recurrentes (20%)',
    desc: 'Enlaces de referidos con panel de ganancias para diseñadores e influencers.'
  },

  // 10. Despliegue en Producción
  {
    id: 'deploy_vercel_custom_domain',
    module: 'Despliegue & CI/CD',
    category: 'intermediate',
    title: 'Despliegue Continuo en Vercel con Dominio Personalizado',
    desc: 'Sincronización automática de GitHub a la nube en 45 segundos con SSL.'
  }
];

export const ProjectRoadmapChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('aether_roadmap_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem('aether_roadmap_checklist', JSON.stringify(checkedItems));
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

  const modules = ['all', ...Array.from(new Set(CHECKLIST_DATA.map((i) => i.module)))];

  const filteredTasks = CHECKLIST_DATA.filter((task) => {
    const matchMod = selectedModule === 'all' || task.module === selectedModule;
    const matchCat = selectedCategory === 'all' || task.category === selectedCategory;
    return matchMod && matchCat;
  });

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'basic':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">Básico</span>;
      case 'intermediate':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">Intermedio</span>;
      case 'advanced':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase">Avanzado / Industrial</span>;
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
                  HOJA DE RUTA & CHECKLIST MAESTRO DE TAREAS
                </h2>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyber-800 text-cyber-gold border border-cyber-700">
                  {completedTasks} / {totalTasks} Tareas
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Plan interactivo de seguimiento desde lo más básico hasta lo más avanzado (IA, 3D, Seguridad y Cloud)
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block font-tech uppercase">Progreso Global:</span>
            <span className="text-3xl font-tech font-extrabold text-cyber-gold">{progressPercent}%</span>
          </div>
        </div>

        {/* Live Progress Bar */}
        <div className="relative h-3 w-full rounded-full bg-cyber-950 border border-cyber-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-cyber-gold to-emerald-400 shadow-gold-glow transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-cyber-900/60 p-3 rounded-2xl border border-cyber-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-tech font-bold uppercase text-slate-400 flex items-center gap-1.5 pl-2">
            <Filter className="w-3.5 h-3.5 text-cyber-gold" /> Filtrar Módulo:
          </span>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="bg-cyber-950 border border-cyber-700 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
          >
            {modules.map((m) => (
              <option key={m} value={m}>
                {m === 'all' ? '🔍 Todos los Módulos' : m}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-cyber-950 border border-cyber-700 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
          >
            <option value="all">⚡ Todos los Niveles</option>
            <option value="basic">🔹 Básico</option>
            <option value="intermediate">🔸 Intermedio</option>
            <option value="advanced">🚀 Avanzado / Industrial</option>
          </select>
        </div>

        <button
          onClick={() => {
            if (confirm('¿Deseas reiniciar todas las casillas marcadas?')) {
              setCheckedItems({});
            }
          }}
          className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors px-2"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reiniciar Checklist
        </button>
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
                  ? 'bg-cyber-950/90 border-emerald-500/50 shadow-md opacity-80'
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
                        isDone ? 'text-slate-400 line-through' : 'text-white group-hover:text-cyber-gold'
                      }`}
                    >
                      {task.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-cyber-950 px-2 py-0.5 rounded border border-cyber-800">
                      {task.module}
                    </span>
                  </div>
                  <p className={`text-xs ${isDone ? 'text-slate-500' : 'text-slate-300'}`}>
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
