import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types/auth';
import {
  Layers,
  Scan,
  Video,
  Shirt,
  Footprints,
  Calendar,
  Globe2,
  Smile,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Lock,
  Compass,
  Box,
  CheckSquare,
  Menu,
  X,
  Sparkles,
  Radio,
  Scissors,
  Camera,
  TrendingUp,
  Film,
  Building2,
  ShoppingBag,
  Cpu,
  Palette,
  Gamepad2,
  History,
  Activity,
  ChevronDown,
  Zap,
  Workflow,
  Sliders
} from 'lucide-react';
import { moduleStagingService } from '../../services/moduleStagingService';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItem {
  id: string;
  nameKey: string;
  icon: React.ElementType;
  requiredRole: UserRole;
  badge?: string;
  isLiteralLabel?: boolean;
}

interface NavCategory {
  id: string;
  title: string;
  icon: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const { role, hasAccess, promptUpgrade } = useAuth();
  const { t } = useLanguage();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [filterMyPlanOnly, setFilterMyPlanOnly] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [, setStagingTick] = useState<number>(0);

  useEffect(() => {
    const handleStaging = () => setStagingTick((t) => t + 1);
    window.addEventListener('aether_staging_updated', handleStaging);
    return () => window.removeEventListener('aether_staging_updated', handleStaging);
  }, []);

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const categories: NavCategory[] = [
    {
      id: 'design_studio',
      title: '3D & Brand Studio',
      icon: '🎨',
      items: [
        { id: 'aurora3d', nameKey: 'sidebar.aurora3d', icon: Box, requiredRole: 'free', badge: '3D IA' },
        { id: 'scanner3d', nameKey: 'sidebar.scanner3d', icon: Camera, requiredRole: 'pro', badge: 'PRO' },
        { id: 'brandkit', nameKey: 'Identidad & Brand Kit', icon: Palette, requiredRole: 'free', badge: 'KIT', isLiteralLabel: true },
        { id: 'versioncontrol', nameKey: 'Control de Versiones & AR', icon: History, requiredRole: 'free', badge: 'GIT 3D', isLiteralLabel: true },
        { id: 'metaverse', nameKey: 'Gaming & Metaverso 3D', icon: Gamepad2, requiredRole: 'agency', badge: 'USD/FBX', isLiteralLabel: true }
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing & Video Ads',
      icon: '🎬',
      items: [
        { id: 'tiktok_feed', nameKey: 'Poxxi 3D Shorts', icon: Film, requiredRole: 'free', badge: 'POXXI', isLiteralLabel: true },
        { id: 'photostudio_viral', nameKey: 'Foto Estudio IA & Viral Blast', icon: Camera, requiredRole: 'free', badge: 'META FB', isLiteralLabel: true },
        { id: 'mediabuyer', nameKey: 'Media Buying & Video Ads', icon: Film, requiredRole: 'free', badge: 'ADS 4K', isLiteralLabel: true },
        { id: 'turntable', nameKey: 'Giro Cinemático 360°', icon: Radio, requiredRole: 'free', badge: '360°', isLiteralLabel: true },
        { id: 'lookbook', nameKey: 'Lookbook Editorial IA', icon: Sparkles, requiredRole: 'pro', badge: 'HD', isLiteralLabel: true },
        { id: 'trendforecast', nameKey: 'sidebar.trendforecast', icon: TrendingUp, requiredRole: 'free', badge: 'TRENDS' }
      ]
    },
    {
      id: 'ecommerce_factory',
      title: 'E-Commerce & Fábrica B2B',
      icon: '🛍️',
      items: [
        { id: 'shopifylanding', nameKey: 'Shopify Landing Builder', icon: ShoppingBag, requiredRole: 'free', badge: 'STORE', isLiteralLabel: true },
        { id: 'clothify', nameKey: 'Costos & Fichas Tech Pack', icon: Scissors, requiredRole: 'free', badge: 'B2B', isLiteralLabel: true },
        { id: 'pattern2d', nameKey: 'Patronaje 2D & Moldería', icon: Scissors, requiredRole: 'pro', badge: 'DXF', isLiteralLabel: true },
        { id: 'textilelab', nameKey: 'Laboratorio Textil & B2B', icon: Activity, requiredRole: 'pro', badge: 'TECH', isLiteralLabel: true },
        { id: 'solesmith', nameKey: 'Calzado & Suelas SoleSmith', icon: Scissors, requiredRole: 'pro', badge: 'SHOES', isLiteralLabel: true },
        { id: 'suppliers', nameKey: 'sidebar.suppliers', icon: Compass, requiredRole: 'agency', badge: 'AGENCY' },
        { id: 'automo', nameKey: 'sidebar.automo', icon: Compass, requiredRole: 'free', badge: 'CALENDAR' }
      ]
    },
    {
      id: 'ai_teams',
      title: 'Agentes IA & Agencias',
      icon: '🤖',
      items: [
        { id: 'jarvis', nameKey: 'J.A.R.V.I.S. Voz & Arc Core', icon: Zap, requiredRole: 'free', badge: 'JARVIS', isLiteralLabel: true },
        { id: 'agentswarm', nameKey: 'Enjambre Agentes IA', icon: Cpu, requiredRole: 'free', badge: 'SWARM', isLiteralLabel: true },
        { id: 'automations', nameKey: 'Automatizaciones n8n & Flujos', icon: Workflow, requiredRole: 'free', badge: 'FLOW', isLiteralLabel: true },
        { id: 'workspaces', nameKey: 'Espacios Multi-Marca', icon: Building2, requiredRole: 'agency', badge: 'TEAMS', isLiteralLabel: true },
        { id: 'runway', nameKey: 'Pasarela en Vivo 3D', icon: Radio, requiredRole: 'pro', badge: 'LIVE', isLiteralLabel: true }
      ]
    },
    {
      id: 'ecosystem',
      title: 'Ecosistema & Admin',
      icon: '🌐',
      items: [
        { id: 'community', nameKey: 'Comunidad & Remix', icon: Sparkles, requiredRole: 'free', badge: 'OPEN', isLiteralLabel: true },
        { id: 'mascot', nameKey: 'sidebar.mascot', icon: Smile, requiredRole: 'free', badge: 'HUB' },
        { id: 'admin', nameKey: 'sidebar.admin', icon: ShieldAlert, requiredRole: 'admin', badge: 'ADMIN' },
        { id: 'staging_manager', nameKey: 'Control Módulos & Rollout', icon: Sliders, requiredRole: 'admin', badge: 'STAGING', isLiteralLabel: true },
        { id: 'apigateway', nameKey: 'Conectores & APIs de IA', icon: Cpu, requiredRole: 'admin', badge: '18 APIS', isLiteralLabel: true },
        { id: 'roadmap', nameKey: 'Roadmap & Checklist', icon: CheckSquare, requiredRole: 'free', badge: 'PLAN', isLiteralLabel: true }
      ]
    }
  ];

  const handleNavClick = (item: NavItem) => {
    if (hasAccess(item.requiredRole)) {
      setCurrentView(item.id);
      setIsMobileDrawerOpen(false);
    } else {
      promptUpgrade(item.requiredRole);
    }
  };

  const getStagingBadge = (itemId: string) => {
    const status = moduleStagingService.getModuleStatus(itemId);
    if (status === 'coming_soon') {
      return { label: 'FASE 2', class: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
    }
    if (status === 'maintenance') {
      return { label: 'UPDATE', class: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
    }
    if (status === 'disabled') {
      return { label: 'LOCK', class: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
    }
    return null;
  };

  const getBadgeClass = (badge?: string) => {
    if (badge === 'ADMIN') return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
    if (badge === 'AGENCY') return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
    if (badge === 'PRO') return 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold/40';
    return 'bg-cyber-800 text-slate-400 border-cyber-700';
  };

  return (
    <>
      {/* Mobile Floating Drawer Trigger Button (Only visible on screens < md) */}
      <div className="md:hidden fixed top-16 left-3 z-30">
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyber-900/90 border border-cyber-gold/60 text-cyber-gold font-tech font-bold text-xs shadow-gold-glow backdrop-blur-md"
        >
          <Menu className="w-4 h-4" />
          <span>Módulos ({categories.reduce((acc, cat) => acc + cat.items.length, 0)})</span>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md animate-fadeIn flex">
          <div className="w-4/5 max-w-xs bg-cyber-950 border-r border-cyber-800 p-4 flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-cyber-800 mb-3">
              <span className="font-tech font-bold text-sm text-white uppercase tracking-wider">
                {t('sidebar.title')}
              </span>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 rounded-xl bg-cyber-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto flex-1">
              <button
                onClick={() => setFilterMyPlanOnly(!filterMyPlanOnly)}
                className={`w-full py-2 px-3 rounded-xl border text-[10px] font-tech font-bold uppercase tracking-wider flex items-center justify-between transition-all mb-2 ${
                  filterMyPlanOnly
                    ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold/50 shadow-gold-glow'
                    : 'bg-cyber-900 text-slate-400 border-cyber-800'
                }`}
              >
                <span>{filterMyPlanOnly ? `Solo Plan ${role.toUpperCase()}` : 'Todos los Módulos'}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/50 font-mono">
                  {filterMyPlanOnly ? 'Filtrado' : 'Ver Todos'}
                </span>
              </button>

              {categories.map((category) => {
                const visibleItems = category.items.filter((item) => !filterMyPlanOnly || hasAccess(item.requiredRole));
                if (visibleItems.length === 0) return null;
                const isCatCollapsed = !!collapsedCategories[category.id];

                return (
                  <div key={category.id} className="space-y-1.5">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full px-2 py-1.5 rounded-xl hover:bg-cyber-900 text-[10px] font-tech font-extrabold uppercase tracking-wider text-slate-400 hover:text-cyber-gold flex items-center justify-between transition-all group"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{category.icon}</span>
                        <span className="group-hover:text-cyber-gold transition-colors">{category.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono text-slate-400 bg-cyber-900 px-1.5 py-0.2 rounded-md">
                          {visibleItems.length}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-slate-400 group-hover:text-cyber-gold transition-transform duration-300 ${
                            isCatCollapsed ? '-rotate-90' : 'rotate-0'
                          }`}
                        />
                      </div>
                    </button>

                    {!isCatCollapsed && (
                      <div className="space-y-1 pl-1">
                        {visibleItems.map((item) => {
                          const Icon = item.icon;
                          const active = currentView === item.id;
                          const allowed = hasAccess(item.requiredRole);

                          return (
                            <button
                              key={item.id}
                              onClick={() => handleNavClick(item)}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                                active
                                  ? 'bg-cyber-gold text-black shadow-gold-glow font-bold'
                                  : 'text-slate-300 hover:text-white hover:bg-cyber-900'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <Icon className="w-4 h-4" />
                                <span>{item.isLiteralLabel ? item.nameKey : t(item.nameKey)}</span>
                              </div>
                              {(() => {
                                const stagingBadge = getStagingBadge(item.id);
                                if (stagingBadge) {
                                  return (
                                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${stagingBadge.class}`}>
                                      {stagingBadge.label}
                                    </span>
                                  );
                                }
                                if (item.badge) {
                                  return (
                                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${getBadgeClass(item.badge)}`}>
                                      {item.badge}
                                    </span>
                                  );
                                }
                                return null;
                              })()}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Persistent / Collapsible Categorized Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-cyber-950/90 border-r border-cyber-800/80 p-3 shrink-0 backdrop-blur-2xl sticky top-[65px] h-[calc(100vh-65px)] overflow-hidden transition-all duration-300 z-20 ${
          isCollapsed ? 'w-20 items-center' : 'w-72'
        }`}
      >
        {/* Top Header with Collapse Button */}
        <div className="w-full flex items-center justify-between px-2 mb-2">
          {!isCollapsed && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>MÓDULOS DE LA PLATAFORMA</span>
            </span>
          )}

          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-xl bg-cyber-900 hover:bg-cyber-800 border border-cyber-700 text-slate-300 hover:text-cyber-gold transition-colors ml-auto"
              title={isCollapsed ? 'Expandir Menú Completo' : 'Ocultar Módulos (Modo Pantalla Completa)'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Plan Filter Toggle (Desktop) */}
        {!isCollapsed && (
          <div className="w-full px-1 mb-3">
            <button
              onClick={() => setFilterMyPlanOnly(!filterMyPlanOnly)}
              className={`w-full py-1.5 px-2.5 rounded-xl border text-[10px] font-tech font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                filterMyPlanOnly
                  ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold/50 shadow-gold-glow'
                  : 'bg-cyber-900 text-slate-400 border-cyber-800 hover:text-white'
              }`}
            >
              <span>{filterMyPlanOnly ? `Solo Plan ${role.toUpperCase()}` : 'Todos los Módulos'}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/50 font-mono">
                {filterMyPlanOnly ? 'Activo' : 'Ver Todos'}
              </span>
            </button>
          </div>
        )}

        {/* Categorized Navigation Stack with Independent Scroll */}
        <div className="space-y-4 flex-1 w-full overflow-y-auto overscroll-contain pr-1.5">
          {categories.map((category) => {
            const visibleItems = category.items.filter((item) => !filterMyPlanOnly || hasAccess(item.requiredRole));
            if (visibleItems.length === 0) return null;
            const isCatCollapsed = !!collapsedCategories[category.id];

            return (
              <div key={category.id} className="space-y-1">
                {!isCollapsed && (
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-2.5 py-1.5 rounded-xl hover:bg-cyber-900/60 text-[10px] font-tech font-extrabold uppercase tracking-wider text-slate-400 hover:text-cyber-gold flex items-center justify-between transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{category.icon}</span>
                      <span className="group-hover:text-cyber-gold transition-colors">{category.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono text-slate-400 bg-cyber-900 px-1.5 py-0.2 rounded-md">
                        {visibleItems.length}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 group-hover:text-cyber-gold transition-transform duration-300 ${
                          isCatCollapsed ? '-rotate-90' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </button>
                )}

                {(!isCatCollapsed || isCollapsed) && (
                  <div className="space-y-1">
                    {visibleItems.map((item) => {
                      const Icon = item.icon;
                      const allowed = hasAccess(item.requiredRole);
                      const active = currentView === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item)}
                          title={isCollapsed ? (item.isLiteralLabel ? item.nameKey : t(item.nameKey)) : undefined}
                          className={`w-full flex items-center rounded-xl transition-all group ${
                            isCollapsed
                              ? 'justify-center p-3'
                              : 'justify-between px-3 py-2 text-xs font-semibold'
                          } ${
                            active
                              ? 'bg-cyber-gold text-black shadow-gold-glow font-bold'
                              : allowed
                              ? 'text-slate-300 hover:text-white hover:bg-cyber-900/90 border border-transparent hover:border-cyber-750'
                              : 'text-slate-500 hover:text-slate-300 hover:bg-cyber-950/60 opacity-60 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon
                              className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                                active ? 'text-black' : allowed ? 'text-cyber-gold' : 'text-slate-500'
                              }`}
                            />
                            {!isCollapsed && (
                              <span className="truncate">
                                {item.isLiteralLabel ? item.nameKey : t(item.nameKey)}
                              </span>
                            )}
                          </div>

                          {!isCollapsed && (
                            <div className="flex items-center gap-1">
                              {!allowed && <Lock className="w-3 h-3 text-slate-500" />}
                              {(() => {
                                const stagingBadge = getStagingBadge(item.id);
                                if (stagingBadge) {
                                  return (
                                    <span
                                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                                        active ? 'bg-black text-cyber-gold border-black' : stagingBadge.class
                                      }`}
                                    >
                                      {stagingBadge.label}
                                    </span>
                                  );
                                }
                                if (item.badge) {
                                  return (
                                    <span
                                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                                        active ? 'bg-black text-cyber-gold border-black' : getBadgeClass(item.badge)
                                      }`}
                                    >
                                      {item.badge}
                                    </span>
                                  );
                                }
                                return null;
                              })()}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};
