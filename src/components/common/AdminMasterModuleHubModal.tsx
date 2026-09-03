import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Box,
  Radio,
  Scissors,
  Globe2,
  Award,
  Sparkles,
  Layers,
  Calendar,
  ShoppingBag,
  Zap,
  TrendingUp,
  Camera,
  Users,
  Film,
  Database,
  Cpu,
  CheckCircle2,
  ChevronRight,
  X,
  Sliders,
  Eye
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDeviceMode } from '../../context/DeviceModeContext';

interface AdminMasterModuleHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (moduleId: string) => void;
  currentView: string;
}

export const AdminMasterModuleHubModal: React.FC<AdminMasterModuleHubModalProps> = ({
  isOpen,
  onClose,
  onSelectModule,
  currentView
}) => {
  const { role } = useAuth();
  const { hapticFeedback } = useDeviceMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const allModules = [
    {
      id: 'aurora3d',
      name: 'Aurora 3D Studio & WebGPU Shader Engine',
      category: '3D & Modelado',
      icon: Box,
      status: 'Operativo 100%',
      desc: 'Renderizado 3D en tiempo real, shaders PBR 8K, proyección WebXR / AR QuickLook y exportación .GLB.'
    },
    {
      id: 'brandkit',
      name: 'BrandKit OS & 3D Mockup Generator',
      category: '3D & Modelado',
      icon: Sparkles,
      status: 'Operativo 100%',
      desc: 'Generador de identidad visual, packaging 3D, guías de estilo y exportación de manuales de marca.'
    },
    {
      id: 'scanner3d',
      name: 'Escáner 3D & Fotogrametría Neural NeRF',
      category: '3D & Modelado',
      icon: Eye,
      status: 'Operativo 100%',
      desc: 'Reconstrucción de objetos reales a malla 3D hermética mediante capturas de fotos o video.'
    },
    {
      id: 'turntable',
      name: 'Cinematic 360° Turntable & Luces de Estudio',
      category: '3D & Modelado',
      icon: Film,
      status: 'Operativo 100%',
      desc: 'Giros 360° en 4K HDR para e-commerce con sombras de contacto y fondos dinámicos.'
    },
    {
      id: 'metaverse',
      name: 'Metaverse & Gaming Exporter (Unreal / Unity)',
      category: '3D & Modelado',
      icon: Cpu,
      status: 'Operativo 100%',
      desc: 'Optimización de LODs, rigging esquelético y exportación directa en formato USDz y FBX.'
    },
    {
      id: 'version_control',
      name: 'Version Control 3D (Git para Mallas .GLB)',
      category: '3D & Modelado',
      icon: Database,
      status: 'Operativo 100%',
      desc: 'Historial de versiones de diseño, comparativa visual diff y control de cambios en equipo.'
    },
    {
      id: 'pattern2d',
      name: 'Patronaje 2D Industrial & Moldería CAD/CAM',
      category: 'Manufactura & Fichas',
      icon: Scissors,
      status: 'Operativo 100%',
      desc: 'Corte a escala 1:1, tizada genética (<5.2% merma), tablas de escalado .RUL y exportación .DXF.'
    },
    {
      id: 'clothify',
      name: 'Clothify Sourcing & Telas Inteligentes',
      category: 'Manufactura & Fichas',
      icon: Layers,
      status: 'Operativo 100%',
      desc: 'Catálogo de telas técnicas (ripstop, seda, denim, impermeables) con cálculo de gramos/m2.'
    },
    {
      id: 'textile_lab',
      name: 'Laboratorio de Ingeniería Textil & Ensayos',
      category: 'Manufactura & Fichas',
      icon: Sliders,
      status: 'Operativo 100%',
      desc: 'Simulación de encogimiento, solidez de color, tensión de costura ISO y compensación de urdimbre.'
    },
    {
      id: 'solesmith',
      name: 'Solesmith Footwear & Matrices de Calzado',
      category: 'Manufactura & Fichas',
      icon: Box,
      status: 'Operativo 100%',
      desc: 'Modelado de suelas de inyección, amortiguación de nitrógeno y hormas ergonómicas.'
    },
    {
      id: 'suppliers',
      name: 'Proveedores B2B & Protocolo Escrow Fideicomiso',
      category: 'Manufactura & Fichas',
      icon: Globe2,
      status: 'Operativo 100%',
      desc: 'Directorio de fábricas homologadas (Portugal, Turquía, Colombia), pagos con custodia y Pasaporte Digital DPP.'
    },
    {
      id: 'tiktok_feed',
      name: 'Poxxi 3D Shorts & Pasarela en Vivo (TikTok 9:16)',
      category: 'Marketing & Redes',
      icon: Radio,
      status: 'Operativo 100%',
      desc: 'Feed vertical edge-to-edge con propinas para creadores, botón Remix 3D y certificado SHA-256.'
    },
    {
      id: 'photostudio_viral',
      name: 'Foto Estudio IA & Test A/B Meta Ads',
      category: 'Marketing & Redes',
      icon: Camera,
      status: 'Operativo 100%',
      desc: 'Generación de lookbooks fotográficos hiperrealistas, predicción de CTR de anuncios y catálogo PDF.'
    },
    {
      id: 'adgen',
      name: 'AdGen AI • Generador de Video Marketing (Sora/Runway)',
      category: 'Marketing & Redes',
      icon: Film,
      status: 'Operativo 100%',
      desc: 'Creación de spots publicitarios en 9:16 y 16:9 con locución multilingüe y música original.'
    },
    {
      id: 'automo',
      name: 'Automo Calendario Redes & Piloto Automático',
      category: 'Marketing & Redes',
      icon: Calendar,
      status: 'Operativo 100%',
      desc: 'Programación multicanal en Instagram, TikTok, Pinterest y LinkedIn con Copywriting IA.'
    },
    {
      id: 'shopify_landing',
      name: 'Shopify 3D AR Builder & Escáner de Tallas IA',
      category: 'Marketing & Redes',
      icon: ShoppingBag,
      status: 'Operativo 100%',
      desc: 'Widget 3D AR de 1 línea JS para tiendas online y recomendador corporal para reducir devoluciones.'
    },
    {
      id: 'lookbook',
      name: 'AI Lookbook Studio & Editor Editorial',
      category: 'Marketing & Redes',
      icon: Camera,
      status: 'Operativo 100%',
      desc: 'Sesiones de fotos virtuales sobre modelos humanos diversos con iluminación de revista.'
    },
    {
      id: 'trends',
      name: 'Trend Forecaster & Radar Predictivo WGSN',
      category: 'Marketing & Redes',
      icon: TrendingUp,
      status: 'Operativo 100%',
      desc: 'Predicción de tendencias de moda, paletas de color Pantone y microtendencias virales.'
    },
    {
      id: 'media_buyer',
      name: 'Media Buyer AI & ROAS Optimization Hub',
      category: 'Marketing & Redes',
      icon: TrendingUp,
      status: 'Operativo 100%',
      desc: 'Optimización de presupuestos publicitarios en Meta, TikTok y Google Ads con cálculo de retorno.'
    },
    {
      id: 'expert_consultations',
      name: 'Red de Expertos & Mentoría 1-on-1 Pro',
      category: 'Consultoría & Peritaje',
      icon: Award,
      status: 'Operativo 100%',
      desc: 'Contratación de peritos textiles y patronistas colegiados con pizarra virtual 3D y arbitraje B2B.'
    },
    {
      id: 'agency_workspaces',
      name: 'Agency Workspaces & Multi-Tenant Studio',
      category: 'Agencias & Equipos',
      icon: Users,
      status: 'Operativo 100%',
      desc: 'Espacios de trabajo separados por clientes con roles de diseñador, cliente y aprobador.'
    },
    {
      id: 'community',
      name: 'Comunidad Creativa & Remix Colaborativo',
      category: 'Agencias & Equipos',
      icon: Users,
      status: 'Operativo 100%',
      desc: 'Galería pública de creaciones, bifurcación de mallas 3D y concursos de diseño.'
    },
    {
      id: 'virtual_runway',
      name: 'Pasarela Virtual en Vivo & Eventos 3D',
      category: 'Agencias & Equipos',
      icon: Radio,
      status: 'Operativo 100%',
      desc: 'Desfiles de moda digitales con avatares animados y contadores de pre-venta en directo.'
    },
    {
      id: 'jarvis',
      name: 'J.A.R.V.I.S. Voz Holográfica Core & Copiloto',
      category: 'IA & Agentes',
      icon: Zap,
      status: 'Operativo 100%',
      desc: 'Asistente de diseño por voz con reconocimiento de intenciones y automatización de comandos.'
    },
    {
      id: 'agentswarm',
      name: 'Enjambre Autónomo de 6 Agentes IA 24/7',
      category: 'IA & Agentes',
      icon: Sparkles,
      status: 'Operativo 100%',
      desc: 'Colaboración entre agente diseñador, patronista, comprador de telas, copywriter y media buyer.'
    },
    {
      id: 'apigateway',
      name: 'APIGateway Hub & Conector de Modelos IA',
      category: 'Ecosistema & Admin',
      icon: Database,
      status: 'Operativo 100%',
      desc: 'Gestión de claves de API (Gemini, OpenAI, Replicate, Suno, ElevenLabs) y límites de cuota.'
    },
    {
      id: 'workflow_n8n',
      name: 'Automatizaciones de Flujo N8N & Webhooks',
      category: 'Ecosistema & Admin',
      icon: Zap,
      status: 'Operativo 100%',
      desc: 'Disparadores automáticos entre pedidos de e-commerce, renderizado 3D y notificaciones de WhatsApp.'
    },
    {
      id: 'admin',
      name: 'Consola Administrativa, Finanzas & Radar IA 24/7',
      category: 'Ecosistema & Admin',
      icon: ShieldCheck,
      status: 'Operativo 100%',
      desc: 'Métricas de usuarios, costos unitarios por API, facturación Stripe y agente autónomo de noticias de IA.'
    },
    {
      id: 'roadmap',
      name: 'Roadmap Maestro de Desarrollo & Metas',
      category: 'Ecosistema & Admin',
      icon: CheckCircle2,
      status: 'Operativo 100%',
      desc: 'Lista de verificación integral de arquitectura, lanzamientos y auditoría empresarial.'
    }
  ];

  const categories = ['all', '3D & Modelado', 'Manufactura & Fichas', 'Marketing & Redes', 'Consultoría & Peritaje', 'Agencias & Equipos', 'IA & Agentes', 'Ecosistema & Admin'];

  const filtered = allModules.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelect = (modId: string) => {
    hapticFeedback();
    onSelectModule(modId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-3 sm:p-6 animate-fadeIn font-mono text-xs text-white">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-cyber-950 border-2 border-cyber-gold rounded-3xl shadow-[0_0_80px_rgba(229,169,60,0.3)] flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-cyber-900 border-b border-cyber-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyber-gold to-yellow-600 p-0.5 flex items-center justify-center shadow-gold-glow">
              <div className="w-full h-full bg-cyber-950 rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-cyber-gold" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-tech font-extrabold text-base sm:text-lg text-white">
                  POXXI STUDIO • PANEL MAESTRO DE AUDITORÍA
                </h3>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-bold">
                  ADMIN MASTER
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Acceso directo a los {allModules.length} módulos de la plataforma para inspección, diagnóstico y pruebas en tiempo real.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-cyber-950 border border-cyber-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Pills */}
        <div className="p-4 bg-cyber-900/60 border-b border-cyber-800 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar entre los 29 módulos (ej: 3D, Patronaje, Sourcing, Video, Proveedores, Agentes...)"
              className="w-full bg-cyber-950 border border-cyber-700/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-gold"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  hapticFeedback();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1 rounded-xl text-[10px] font-tech font-bold shrink-0 border transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyber-gold text-black border-cyber-gold shadow-gold-glow'
                    : 'bg-cyber-900 border-cyber-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? '🌟 Todos (' + allModules.length + ')' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((mod) => {
            const Icon = mod.icon;
            const isCurrentlyActive = currentView === mod.id;
            return (
              <div
                key={mod.id}
                onClick={() => handleSelect(mod.id)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between group ${
                  isCurrentlyActive
                    ? 'bg-cyber-gold/15 border-cyber-gold shadow-gold-glow'
                    : 'bg-cyber-900/80 border-cyber-800 hover:border-cyber-gold/60 hover:bg-cyber-900'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-800 text-cyber-gold group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-cyber-gold font-bold block">{mod.category}</span>
                      <h4 className="font-tech font-bold text-sm text-white group-hover:text-cyber-gold transition-colors">
                        {mod.name}
                      </h4>
                    </div>
                  </div>

                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono font-bold shrink-0">
                    {mod.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 font-sans leading-relaxed mb-3">
                  {mod.desc}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-cyber-800/80 text-[10px]">
                  <span className="text-slate-500 font-mono">ID: {mod.id}</span>
                  <button className="px-3 py-1 rounded-lg bg-cyber-950 border border-cyber-700 text-cyber-gold font-tech font-bold uppercase group-hover:bg-cyber-gold group-hover:text-black transition-all flex items-center gap-1">
                    <span>{isCurrentlyActive ? 'En Pantalla Actual' : 'Abrir & Auditar'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-cyber-900 border-t border-cyber-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Mostrando <strong>{filtered.length}</strong> de {allModules.length} módulos</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-cyber-800 hover:bg-cyber-700 text-white font-tech font-bold text-xs uppercase"
          >
            Cerrar Panel
          </button>
        </div>
      </div>
    </div>
  );
};
