import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types/auth';
import {
  Layers,
  Video,
  Shirt,
  Footprints,
  Calendar,
  Globe2,
  Smile,
  ShieldAlert,
  Home,
  Lock,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Scan,
  Compass,
  Box,
  CheckSquare,
  Menu,
  X,
  Sparkles,
  Radio,
  Scissors
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

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const { role, hasAccess, promptUpgrade } = useAuth();
  const { t } = useLanguage();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'aurora3d', nameKey: 'sidebar.aurora3d', icon: Layers, requiredRole: 'free', badge: '3D' },
    { id: 'scanner3d', nameKey: 'sidebar.scanner3d', icon: Scan, requiredRole: 'pro', badge: 'PRO' },
    { id: 'adgen', nameKey: 'sidebar.adgen', icon: Video, requiredRole: 'pro', badge: 'PRO' },
    { id: 'clothify', nameKey: 'sidebar.clothify', icon: Shirt, requiredRole: 'pro', badge: 'PRO' },
    { id: 'pattern2d', nameKey: 'Patronaje 2D (DXF)', icon: Scissors, requiredRole: 'pro', badge: 'CAD', isLiteralLabel: true },
    { id: 'runway', nameKey: 'Pasarela en Vivo 3D', icon: Radio, requiredRole: 'pro', badge: 'LIVE', isLiteralLabel: true },
    { id: 'solesmith', nameKey: 'sidebar.solesmith', icon: Footprints, requiredRole: 'pro', badge: 'PRO' },
    { id: 'automo', nameKey: 'sidebar.automo', icon: Calendar, requiredRole: 'agency', badge: 'AGENCY' },
    { id: 'suppliers', nameKey: 'sidebar.suppliers', icon: Globe2, requiredRole: 'agency', badge: 'AGENCY' },
    { id: 'community', nameKey: 'Comunidad & Remix', icon: Sparkles, requiredRole: 'free', badge: 'OPEN', isLiteralLabel: true },
    { id: 'mascot', nameKey: 'sidebar.mascot', icon: Smile, requiredRole: 'free', badge: 'HUB' },
    { id: 'admin', nameKey: 'sidebar.admin', icon: ShieldAlert, requiredRole: 'admin', badge: 'ADMIN' },
    { id: 'roadmap', nameKey: 'Roadmap & Checklist', icon: CheckSquare, requiredRole: 'free', badge: 'PLAN', isLiteralLabel: true },
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
          <span>Módulos</span>
        </button>
      </div>

      {/* Mobile Drawer Modal */}
      {isMobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-cyber-950 border-r border-cyber-gold/40 p-4 flex flex-col h-full z-10 shadow-2xl animate-fadeIn">
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

            <div className="space-y-1.5 overflow-y-auto flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = currentView === item.id;
                const allowed = hasAccess(item.requiredRole);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-cyber-gold text-black shadow-gold-glow'
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
          </div>
        </div>
      )}

      {/* Desktop Persistent / Collapsible Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-cyber-950/80 border-r border-cyber-800/80 p-3 shrink-0 backdrop-blur-xl min-h-[calc(100vh-65px)] transition-all duration-300 ${
          isCollapsed ? 'w-20 items-center' : 'w-64'
        }`}
      >
        {/* Top Header with Collapse Button */}
        <div className="w-full flex items-center justify-between px-2 mb-3">
          {!isCollapsed && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {t('sidebar.title')}
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

        {/* Navigation Item Stack */}
        <div className="space-y-1.5 flex-1 w-full overflow-y-auto">
          {navItems.map((item) => {
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
                    : 'justify-between px-3 py-2.5 text-xs font-semibold'
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

        {/* Footer Tier Info in Sidebar */}
        {!isCollapsed && (
          <div className="pt-3 border-t border-cyber-850 mt-auto w-full">
            <div className="p-2.5 rounded-xl bg-cyber-900/60 border border-cyber-800 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-slate-400 block uppercase">
                  {t('sidebar.accessLevel')}
                </span>
                <span className="text-xs font-tech font-extrabold text-cyber-gold uppercase">
                  {role.toUpperCase()}
                </span>
              </div>
              {role !== 'agency' && role !== 'admin' && (
                <button
                  onClick={() => promptUpgrade('pro')}
                  className="text-[10px] font-tech font-bold uppercase px-2 py-1 rounded-lg bg-cyber-gold/20 text-cyber-gold border border-cyber-gold/50 hover:bg-cyber-gold hover:text-black transition-all"
                >
                  UPGRADE
                </button>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
