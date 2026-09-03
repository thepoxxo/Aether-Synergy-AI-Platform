import {
  ModuleAvailabilityStatus,
  ModuleStagingConfig,
  StagingCategoryConfig,
  RolloutPreset
} from '../types/moduleStaging';

const STORAGE_KEY_MODULES = 'aether_module_staging_config_v1';
const STORAGE_KEY_PRESET = 'aether_active_rollout_preset_v1';
const STORAGE_KEY_ADMIN_OVERRIDE = 'aether_admin_staging_override_v1';

export const DEFAULT_MODULE_CONFIGS: ModuleStagingConfig[] = [
  // Categoria 1: 3D & Brand Studio
  {
    id: 'aurora3d',
    name: 'Aurora 3D Studio & IA',
    category: 'design_studio',
    categoryTitle: '3D & Brand Studio',
    status: 'active', // MÓDULO PRINCIPAL MVP
    version: '2.4.0',
    phase: 1,
    changelogNote: 'Motor 3D central con vista 360°, texturas PBR y exportación GLB.'
  },
  {
    id: 'brandkit',
    name: 'Kit de Marca & Paletas',
    category: 'design_studio',
    categoryTitle: '3D & Brand Studio',
    status: 'active',
    version: '1.8.0',
    phase: 1,
    changelogNote: 'Sincronización de logotipos, tipografías y colores de colección.'
  },
  {
    id: 'versioncontrol',
    name: 'Control Versiones & Diff 3D',
    category: 'design_studio',
    categoryTitle: '3D & Brand Studio',
    status: 'active',
    version: '1.5.0',
    phase: 1,
    changelogNote: 'Comparador deslizable antes/después y guardado inmutable.'
  },
  {
    id: 'metaverse',
    name: 'Exportador Unreal & Roblox',
    category: 'design_studio',
    categoryTitle: '3D & Brand Studio',
    status: 'active',
    version: '1.2.0',
    phase: 2,
    changelogNote: 'Nanite USD y mallas optimizadas para avatares y gaming.'
  },

  // Categoria 2: Marketing & Video Ads
  {
    id: 'tiktok_feed',
    name: 'Poxxi 3D • Shorts & Pasarelas',
    category: 'marketing',
    categoryTitle: 'Marketing & Video Ads',
    status: 'active',
    version: '1.2.0',
    phase: 1,
    changelogNote: 'Feed vertical 9:16 de videos y pasarelas 3D con doble tap, comentarios y remix 3D directo.'
  },
  {
    id: 'photostudio_viral',
    name: 'Estudio Foto IA & Viral Blast Facebook',
    category: 'marketing',
    categoryTitle: 'Marketing & Video Ads',
    status: 'active',
    version: '2.5.0',
    phase: 1,
    changelogNote: 'Recreación de fotos en escenarios de estudio y publicación masiva automática en grupos de Facebook vía Graph API v20.0.'
  },
  {
    id: 'mediabuyer',
    name: 'Media Buyer Video Ads 4K',
    category: 'marketing',
    categoryTitle: 'Marketing & Video Ads',
    status: 'active',
    version: '2.0.0',
    phase: 2,
    changelogNote: 'Generador de anuncios 9:16 y cálculo predictivo de ROAS.'
  },
  {
    id: 'turntable',
    name: 'Giro Cinemático 360°',
    category: 'marketing',
    categoryTitle: 'Marketing & Video Ads',
    status: 'active',
    version: '1.4.0',
    phase: 2,
    changelogNote: 'Loops de cámara orbital para anuncios en alta definición.'
  },
  {
    id: 'lookbook',
    name: 'Lookbook Editorial IA',
    category: 'marketing',
    categoryTitle: 'Marketing & Video Ads',
    status: 'active',
    version: '1.6.0',
    phase: 2,
    changelogNote: 'Modelos hiperrealistas generados con FLUX.1.'
  },
  {
    id: 'trendforecast',
    name: 'Pronóstico de Tendencias',
    category: 'marketing',
    categoryTitle: 'Marketing & Video Ads',
    status: 'active',
    version: '1.9.0',
    phase: 2,
    changelogNote: 'Monitoreo de pasarelas mundiales y colores virales.'
  },

  // Categoria 3: E-Commerce & Fábrica B2B
  {
    id: 'shopifylanding',
    name: 'Landing Shopify 3D & AR',
    category: 'ecommerce_factory',
    categoryTitle: 'E-Commerce & Fábrica B2B',
    status: 'active',
    version: '2.1.0',
    phase: 2,
    changelogNote: 'Creador de páginas de venta con checkout rápido.'
  },
  {
    id: 'clothify',
    name: 'Costos & Fichas Tech Pack',
    category: 'ecommerce_factory',
    categoryTitle: 'E-Commerce & Fábrica B2B',
    status: 'active',
    version: '1.7.0',
    phase: 2,
    changelogNote: 'Cálculo de margen bruto, desglose COGS y consumo de tela.'
  },
  {
    id: 'pattern2d',
    name: 'Patronaje 2D & Moldería DXF',
    category: 'ecommerce_factory',
    categoryTitle: 'E-Commerce & Fábrica B2B',
    status: 'active',
    version: '1.5.0',
    phase: 2,
    changelogNote: 'Graduación de tallas (XS a XXL) y curvas de costura.'
  },
  {
    id: 'textilelab',
    name: 'Laboratorio Textil & B2B',
    category: 'ecommerce_factory',
    categoryTitle: 'E-Commerce & Fábrica B2B',
    status: 'active',
    version: '1.3.0',
    phase: 3,
    changelogNote: 'Simulación de encogimiento AATCC y transpirabilidad CFM.'
  },
  {
    id: 'solesmith',
    name: 'Calzado & Suelas SoleSmith',
    category: 'ecommerce_factory',
    categoryTitle: 'E-Commerce & Fábrica B2B',
    status: 'active',
    version: '1.4.0',
    phase: 2,
    changelogNote: 'Modelado volumétrico de calzado deportivo y tacones.'
  },
  {
    id: 'suppliers',
    name: 'Proveedores Globales B2B & Sourcing',
    category: 'ecommerce_factory',
    categoryTitle: 'E-Commerce & Fábrica B2B',
    status: 'active',
    version: '2.0.0',
    phase: 2,
    changelogNote: 'Directorio internacional, registro de fábricas propias de cualquier país y sistema de calificación B2B en 4 dimensiones.'
  },
  {
    id: 'automo',
    name: 'Automo • Calendario Redes & Piloto Automático',
    category: 'ecommerce_factory',
    categoryTitle: 'E-Commerce & Fábrica B2B',
    status: 'active',
    version: '2.0.0',
    phase: 2,
    changelogNote: 'Programación multicanal para Instagram, TikTok, Facebook, YouTube y LinkedIn con Copywriting IA.'
  },

  // Categoria 4: Agentes IA & Agencias
  {
    id: 'jarvis',
    name: 'J.A.R.V.I.S. Voz & Arc Core',
    category: 'ai_teams',
    categoryTitle: 'Agentes IA & Agencias',
    status: 'active',
    version: '3.0.0',
    phase: 1,
    changelogNote: 'Núcleo de voz bidireccional y comandos por lenguaje natural.'
  },
  {
    id: 'agentswarm',
    name: 'Enjambre Agentes IA',
    category: 'ai_teams',
    categoryTitle: 'Agentes IA & Agencias',
    status: 'active',
    version: '2.2.0',
    phase: 1,
    changelogNote: '4 agentes autónomos cooperando en tiempo real.'
  },
  {
    id: 'automations',
    name: 'Automatizaciones n8n & Flujos',
    category: 'ai_teams',
    categoryTitle: 'Agentes IA & Agencias',
    status: 'active',
    version: '2.0.0',
    phase: 2,
    changelogNote: 'Orquestador visual de nodos y exportador nativo JSON.'
  },
  {
    id: 'workspaces',
    name: 'Espacios Multi-Marca',
    category: 'ai_teams',
    categoryTitle: 'Agentes IA & Agencias',
    status: 'active',
    version: '1.5.0',
    phase: 3,
    changelogNote: 'Gestión multi-agencia y roles de equipo con permisos.'
  },
  {
    id: 'runway',
    name: 'Pasarela en Vivo 3D',
    category: 'ai_teams',
    categoryTitle: 'Agentes IA & Agencias',
    status: 'active',
    version: '1.8.0',
    phase: 2,
    changelogNote: 'Desfile virtual interactivo con público y música.'
  },

  // Categoria 5: Ecosistema & Admin
  {
    id: 'community',
    name: 'Comunidad & Remix',
    category: 'ecosystem',
    categoryTitle: 'Ecosistema & Admin',
    status: 'active',
    version: '1.5.0',
    phase: 1,
    changelogNote: 'Galería pública y fork de diseños 3D.'
  },
  {
    id: 'mascot',
    name: 'Mascota Asistente Synthetix',
    category: 'ecosystem',
    categoryTitle: 'Ecosistema & Admin',
    status: 'active',
    version: '1.3.0',
    phase: 1,
    changelogNote: 'Guía interactiva animada y ayuda rápida.'
  },
  {
    id: 'admin',
    name: 'Consola Administrativa',
    category: 'ecosystem',
    categoryTitle: 'Ecosistema & Admin',
    status: 'active',
    version: '2.5.0',
    phase: 1,
    changelogNote: 'Métricas, usuarios y configuración global del sistema.'
  },
  {
    id: 'apigateway',
    name: 'Conectores & APIs de IA',
    category: 'ecosystem',
    categoryTitle: 'Ecosistema & Admin',
    status: 'active',
    version: '2.0.0',
    phase: 1,
    changelogNote: '18 motores de IA real con alternador Live/Simulator.'
  },
  {
    id: 'staging_manager',
    name: 'Control de Módulos & Mantenimiento',
    category: 'ecosystem',
    categoryTitle: 'Ecosistema & Admin',
    status: 'active',
    version: '1.0.0',
    phase: 1,
    changelogNote: 'Gestor de despliegue gradual y bloqueo individual por mantenimiento.'
  },
  {
    id: 'roadmap',
    name: 'Roadmap & Checklist',
    category: 'ecosystem',
    categoryTitle: 'Ecosistema & Admin',
    status: 'active',
    version: '2.0.0',
    phase: 1,
    changelogNote: 'Checklist maestro de todas las funcionalidades.'
  }
];

class ModuleStagingService {
  private moduleConfigs: ModuleStagingConfig[] = [];
  private activePreset: RolloutPreset = 'all_enabled_production';
  private adminOverride: boolean = false;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_MODULES);
      if (stored) {
        const parsed: ModuleStagingConfig[] = JSON.parse(stored);
        // Merge with defaults in case new modules were added
        this.moduleConfigs = DEFAULT_MODULE_CONFIGS.map((def) => {
          const match = parsed.find((p) => p.id === def.id);
          return match ? { ...def, ...match } : def;
        });
      } else {
        this.moduleConfigs = [...DEFAULT_MODULE_CONFIGS];
      }

      const storedPreset = localStorage.getItem(STORAGE_KEY_PRESET) as RolloutPreset | null;
      if (storedPreset) {
        this.activePreset = storedPreset;
      }

      const storedOverride = localStorage.getItem(STORAGE_KEY_ADMIN_OVERRIDE);
      if (storedOverride !== null) {
        this.adminOverride = storedOverride === 'true';
      }
    } catch (e) {
      this.moduleConfigs = [...DEFAULT_MODULE_CONFIGS];
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_MODULES, JSON.stringify(this.moduleConfigs));
      localStorage.setItem(STORAGE_KEY_PRESET, this.activePreset);
      localStorage.setItem(STORAGE_KEY_ADMIN_OVERRIDE, String(this.adminOverride));
      window.dispatchEvent(new Event('aether_staging_updated'));
    } catch (e) {
      console.error('Error saving module staging config', e);
    }
  }

  public getModules(): ModuleStagingConfig[] {
    return [...this.moduleConfigs];
  }

  public getModuleById(moduleId: string): ModuleStagingConfig | undefined {
    return this.moduleConfigs.find((m) => m.id === moduleId);
  }

  public getModuleStatus(moduleId: string): ModuleAvailabilityStatus {
    const mod = this.getModuleById(moduleId);
    if (!mod) return 'active';
    return mod.status;
  }

  public isModuleAccessible(moduleId: string, userRole: string): boolean {
    if (this.adminOverride && userRole === 'admin') {
      return true;
    }
    const status = this.getModuleStatus(moduleId);
    return status === 'active';
  }

  public updateModuleStatus(
    moduleId: string,
    status: ModuleAvailabilityStatus,
    details?: {
      maintenanceMessage?: string;
      estimatedAvailableDate?: string;
      estimatedMaintenanceEnd?: string;
    }
  ) {
    this.moduleConfigs = this.moduleConfigs.map((mod) => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          status,
          ...(details || {})
        };
      }
      return mod;
    });
    this.saveToStorage();
  }

  public updateCategoryStatus(categoryId: string, status: ModuleAvailabilityStatus) {
    this.moduleConfigs = this.moduleConfigs.map((mod) => {
      if (mod.category === categoryId) {
        return { ...mod, status };
      }
      return mod;
    });
    this.saveToStorage();
  }

  // Presets
  public applyPreset(preset: RolloutPreset) {
    this.activePreset = preset;

    if (preset === 'initial_mvp_design_only') {
      // ONLY 3D Design Studio, Brandkit, JARVIS and Admin are active.
      // Other modules are marked as "coming_soon" (Próximamente / Fase 2)
      this.moduleConfigs = this.moduleConfigs.map((mod) => {
        if (['aurora3d', 'brandkit', 'jarvis', 'mascot', 'admin', 'staging_manager', 'roadmap', 'apigateway'].includes(mod.id)) {
          return { ...mod, status: 'active' as const };
        } else {
          return {
            ...mod,
            status: 'coming_soon' as const,
            estimatedAvailableDate: 'Fase 2 - Próximamente en las próximas semanas'
          };
        }
      });
    } else if (preset === 'all_enabled_production') {
      this.moduleConfigs = this.moduleConfigs.map((mod) => ({ ...mod, status: 'active' as const }));
    } else if (preset === 'maintenance_lockdown') {
      this.moduleConfigs = this.moduleConfigs.map((mod) => {
        if (['admin', 'staging_manager'].includes(mod.id)) {
          return { ...mod, status: 'active' as const };
        }
        return {
          ...mod,
          status: 'maintenance' as const,
          maintenanceMessage: 'Actualización mayor de infraestructura de IA en progreso. Volvemos en breve.'
        };
      });
    }

    this.saveToStorage();
  }

  public getActivePreset(): RolloutPreset {
    return this.activePreset;
  }

  public setAdminOverride(enabled: boolean) {
    this.adminOverride = enabled;
    this.saveToStorage();
  }

  public getAdminOverride(): boolean {
    return this.adminOverride;
  }

  public resetToDefaults() {
    this.moduleConfigs = [...DEFAULT_MODULE_CONFIGS];
    this.activePreset = 'all_enabled_production';
    this.adminOverride = false;
    this.saveToStorage();
  }
}

export const moduleStagingService = new ModuleStagingService();
