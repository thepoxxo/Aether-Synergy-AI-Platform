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
  CheckSquare
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

  const navItems: NavItem[] = [
    { id: 'aurora3d', nameKey: 'sidebar.aurora3d', icon: Layers, requiredRole: 'free', badge: '3D' },
    { id: 'scanner3d', nameKey: 'sidebar.scanner3d', icon: Scan, requiredRole: 'pro', badge: 'PRO' },
    { id: 'adgen', nameKey: 'sidebar.adgen', icon: Video, requiredRole: 'pro', badge: 'PRO' },
    { id: 'clothify', nameKey: 'sidebar.clothify', icon: Shirt, requiredRole: 'pro', badge: 'PRO' },
    { id: 'solesmith', nameKey: 'sidebar.solesmith', icon: Footprints, requiredRole: 'pro', badge: 'PRO' },
    { id: 'automo', nameKey: 'sidebar.automo', icon: Calendar, requiredRole: 'agency', badge: 'AGENCY' },
    { id: 'suppliers', nameKey: 'sidebar.suppliers', icon: Globe2, requiredRole: 'agency', badge: 'AGENCY' },
    { id: 'mascot', nameKey: 'sidebar.mascot', icon: Smile, requiredRole: 'free', badge: 'HUB' },
    { id: 'admin', nameKey: 'sidebar.admin', icon: ShieldAlert, requiredRole: 'admin', badge: 'ADMIN' },
    { id: 'roadmap', nameKey: 'Roadmap & Checklist', icon: CheckSquare, requiredRole: 'free', badge: 'PLAN', isLiteralLabel: true },
  ];

  const handleNavClick = (item: NavItem) => {
    if (hasAccess(item.requiredRole)) {
      setCurrentView(item.id);
    } else {
      promptUpgrade(item.requiredRole);
    }
  };

  return (
    <aside
      className={`hidden md:flex flex-col bg-cyber-950/80 border-r border-cyber-800/80 p-3 shrink-0 backdrop-blur-xl min-h-[calc(100vh-65px)] transition-all duration-300 ${
        isCollapsed ? 'w-18 items-center' : 'w-64'
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
            className="p-1.5 rounded-xl bg-cyber-900 hover:bg-cyber-800 border border-cyber-700 text-slate-300 hover:text-cyber-gold transition-colors mx-auto"
            title={isCollapsed ? 'Expandir Menú' : 'Minimizar a Barra Delgada (Modo Focus)'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Navigation Item Stack */}
      <div className="space-y-1.5 flex-1 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const allowed = hasAccess(item.requiredRole);
          const active = currentView === item.id;

          const getBadgeClass = () => {
            if (item.badge === 'ADMIN') return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
            if (item.badge === 'AGENCY') return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
            if (item.badge === 'PRO') return 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold/40';
            return 'bg-cyber-800 text-slate-400 border-cyber-700';
          };

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              title={isCollapsed ? t(item.nameKey) : undefined}
              className={`w-full flex items-center rounded-xl transition-all group ${
                isCollapsed
                  ? 'justify-center p-3'
                  : 'justify-between px-3 py-2.5 text-xs font-semibold'
              } ${
                active
                  ? 'bg-cyber-gold text-black shadow-gold-glow font-bold'
                  : allowed
                  ? 'text-slate-300 hover:bg-cyber-900 hover:text-white'
                  : 'text-slate-500 hover:bg-cyber-900/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    active
                      ? 'text-black'
                      : allowed
                      ? 'text-cyber-gold group-hover:text-amber-300'
                      : 'text-slate-600'
                  }`}
                />
                {!isCollapsed && (
                  <span className="truncate">
                    {item.isLiteralLabel ? item.nameKey : t(item.nameKey)}
                  </span>
                )}
              </div>

              {!isCollapsed && (
                <div className="flex items-center gap-1.5">
                  {!allowed && <Lock className="w-3.5 h-3.5 text-amber-500/80" />}
                  {item.badge && (
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border uppercase ${
                        active ? 'bg-black text-cyber-gold border-black' : getBadgeClass()
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

      {/* Plan Status Widget in Sidebar Footer (Only when expanded) */}
      {!isCollapsed ? (
        <div className="mt-4 p-3 rounded-2xl bg-cyber-900/90 border border-cyber-gold/20 w-full">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">{t('sidebar.accessLevel')}</span>
            <span className="text-[10px] font-mono text-cyber-gold font-extrabold uppercase">
              {role}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mb-2.5 line-clamp-2">
            {role === 'admin'
              ? 'Super Admin con acceso total a métricas.'
              : role === 'agency'
              ? 'Plan Agencia: B2B Sourcing y Red Social.'
              : role === 'pro'
              ? 'Plan Pro: Motor 3D y Video Ads.'
              : 'Plan Gratuito básico.'}
          </p>

          {role !== 'admin' && role !== 'agency' && (
            <button
              onClick={() => promptUpgrade(role === 'free' ? 'pro' : 'agency')}
              className="w-full py-1.5 rounded-lg bg-cyber-gold/15 hover:bg-cyber-gold hover:text-black border border-cyber-gold/40 text-cyber-gold font-tech font-bold text-xs uppercase tracking-wider transition-all"
            >
              {t('sidebar.upgradeBtn')}
            </button>
          )}
        </div>
      ) : (
        <div className="mt-auto py-2">
          <button
            onClick={() => promptUpgrade(role === 'free' ? 'pro' : 'agency')}
            className="w-10 h-10 rounded-xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold flex items-center justify-center font-tech font-bold text-xs hover:bg-cyber-gold hover:text-black transition-all"
            title="Mejorar Plan"
          >
            ★
          </button>
        </div>
      )}
    </aside>
  );
};
