import React, { useState } from 'react';
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
  Zap
} from 'lucide-react';

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

  const categories: NavCategory[] = [
    {
      id: 'studio',
      title: '3D & Brand Studio',
      icon: '🎨',
      items: [
        { id: 'aurora3d', nameKey: 'sidebar.aurora3d', icon: Layers, requiredRole: 'free', badge: '3D' },
        { id: 'brandkit', nameKey: 'Brand Kit & Identidad', icon: Palette, requiredRole: 'pro', badge: 'BRAND', isLiteralLabel: true },
        { id: 'scanner3d', nameKey: 'sidebar.scanner3d', icon: Scan, requiredRole: 'pro', badge: 'PRO' },
        { id: 'pattern2d', nameKey: 'Patronaje 2D (DXF)', icon: Scissors, requiredRole: 'pro', badge: 'CAD', isLiteralLabel: true },
        { id: 'clothify', nameKey: 'sidebar.clothify', icon: Shirt, requiredRole: 'pro', badge: 'PRO' },
        { id: 'solesmith', nameKey: 'sidebar.solesmith', icon: Footprints, requiredRole: 'pro', badge: 'PRO' },
        { id: 'versioncontrol', nameKey: 'Control Versiones 3D', icon: History, requiredRole: 'pro', badge: 'GIT 3D', isLiteralLabel: true }
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing & Video Ads',
      icon: '🎬',
      items: [
        { id: 'adgen', nameKey: 'sidebar.adgen', icon: Video, requiredRole: 'pro', badge: 'PRO' },
        { id: 'mediabuyer', nameKey: 'Media Buyer & ROAS Ads', icon: TrendingUp, requiredRole: 'pro', badge: 'ADS', isLiteralLabel: true },
        { id: 'turntable', nameKey: 'Video Cinemático 360°', icon: Film, requiredRole: 'pro', badge: 'CINEMA', isLiteralLabel: true },
        { id: 'lookbook', nameKey: 'Lookbook IA Modelos', icon: Camera, requiredRole: 'pro', badge: 'PHOTO', isLiteralLabel: true },
        { id: 'metaverse', nameKey: 'Gaming & Metaverso 3D', icon: Gamepad2, requiredRole: 'pro', badge: 'UNREAL', isLiteralLabel: true }
      ]
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce & Fábrica B2B',
      icon: '🛍️',
      items: [
        { id: 'shopifylanding', nameKey: 'Landings Shopify IA', icon: ShoppingBag, requiredRole: 'pro', badge: 'LANDING', isLiteralLabel: true },
        { id: 'suppliers', nameKey: 'sidebar.suppliers', icon: Globe2, requiredRole: 'agency', badge: 'AGENCY' },
        { id: 'textilelab', nameKey: 'Laboratorio Textil & B2B', icon: Activity, requiredRole: 'agency', badge: 'LAB', isLiteralLabel: true },
        { id: 'trendforecast', nameKey: 'Tendencias & Ventas IA', icon: TrendingUp, requiredRole: 'agency', badge: 'WGSN', isLiteralLabel: true },
        { id: 'automo', nameKey: 'sidebar.automo', icon: Calendar, requiredRole: 'agency', badge: 'AGENCY' }
      ]
    },
    {
      id: 'ai_teams',
      title: 'Agentes IA & Agencias',
      icon: '🤖',
      items: [
        { id: 'jarvis', nameKey: 'J.A.R.V.I.S. Voz & Arc Core', icon: Zap, requiredRole: 'free', badge: 'JARVIS', isLiteralLabel: true },
        { id: 'agentswarm', nameKey: 'Enjambre Agentes IA', icon: Cpu, requiredRole: 'free', badge: 'SWARM', isLiteralLabel: true },
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

                return (
                  <div key={category.id} className="space-y-1.5">
                    <div className="px-2 py-1 text-[10px] font-tech font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <span>{category.icon}</span>
                      <span>{category.title}</span>
                    </div>
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
                          {item.badge && (
                            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${getBadgeClass(item.badge)}`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Persistent / Collapsible Categorized Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-cyber-950/80 border-r border-cyber-800/80 p-3 shrink-0 backdrop-blur-xl min-h-[calc(100vh-65px)] transition-all duration-300 ${
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

        {/* Categorized Navigation Stack */}
        <div className="space-y-4 flex-1 w-full overflow-y-auto pr-1">
          {categories.map((category) => {
            const visibleItems = category.items.filter((item) => !filterMyPlanOnly || hasAccess(item.requiredRole));
            if (visibleItems.length === 0) return null;

            return (
              <div key={category.id} className="space-y-1">
                {!isCollapsed && (
                  <div className="px-2.5 py-1 text-[10px] font-tech font-extrabold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span>{category.icon}</span>
                      <span>{category.title}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 bg-cyber-900 px-1.5 py-0.2 rounded-md">
                      {visibleItems.length}
                    </span>
                  </div>
                )}

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
                          {item.badge && (
                            <span
                              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                                active
                                  ? 'bg-black text-cyber-gold border-black'
                                  : getBadgeClass(item.badge)
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        </div>
      </aside>
    </>
  );
};
