import React, { useState } from 'react';
import {
  Box,
  Radio,
  Scissors,
  Globe2,
  Award,
  Menu,
  X,
  Sparkles,
  Zap,
  ShoppingBag,
  Building2,
  Calendar,
  Layers,
  ChevronRight,
  ShieldAlert,
  Sliders,
  CheckSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDeviceMode } from '../../context/DeviceModeContext';

interface MobileAppBottomNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const MobileAppBottomNav: React.FC<MobileAppBottomNavProps> = ({
  currentView,
  setCurrentView
}) => {
  const { role, hasAccess, switchRole } = useAuth();
  const { hapticFeedback } = useDeviceMode();
  const [isFullDrawerOpen, setIsFullDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'aurora3d', label: 'Estudio 3D', icon: Box, badge: '3D' },
    { id: 'tiktok_feed', label: 'Poxxi 3D', icon: Radio, badge: 'SHORTS' },
    { id: 'pattern2d', label: 'Patronaje', icon: Scissors, badge: 'CAD' },
    { id: 'suppliers', label: 'Sourcing', icon: Globe2, badge: 'B2B' },
    { id: 'expert_consultations', label: 'Expertos', icon: Award, badge: 'PRO' }
  ];

  const handleTabClick = (viewId: string) => {
    hapticFeedback();
    setCurrentView(viewId);
    setIsFullDrawerOpen(false);
  };

  const allModulesList = [
    { id: 'aurora3d', name: 'Aurora 3D Studio & Render WebGPU', category: '3D & Marca', icon: Box },
    { id: 'brandkit', name: 'BrandKit OS & 3D Mockups', category: '3D & Marca', icon: Sparkles },
    { id: 'pattern2d', name: 'Patronaje 2D Industrial & Moldería', category: 'Manufactura', icon: Scissors },
    { id: 'clothify', name: 'Clothify Sourcing & Telas Inteligentes', category: 'Manufactura', icon: Layers },
    { id: 'suppliers', name: 'Proveedores B2B & Escrow Fideicomiso', category: 'Manufactura', icon: Globe2 },
    { id: 'tiktok_feed', name: 'Poxxi 3D Shorts & Pasarela en Vivo', category: 'Marketing & Redes', icon: Radio },
    { id: 'photostudio_viral', name: 'Foto Estudio IA & Test A/B Meta', category: 'Marketing & Redes', icon: Sparkles },
    { id: 'automo', name: 'Automo Calendario Redes & Piloto', category: 'Marketing & Redes', icon: Calendar },
    { id: 'shopify_landing', name: 'Shopify 3D AR Builder & Tallas IA', category: 'Marketing & Redes', icon: ShoppingBag },
    { id: 'expert_consultations', name: 'Red de Expertos & Mentoría 1-on-1', category: 'Consultoría', icon: Award },
    { id: 'jarvis', name: 'J.A.R.V.I.S. Voz Holográfica Core', category: 'IA & Agentes', icon: Zap },
    { id: 'agentswarm', name: 'Enjambre Autónomo de 6 Agentes', category: 'IA & Agentes', icon: Sparkles },
    { id: 'admin', name: 'Consola Administrativa & Radar IA', category: 'Ecosistema', icon: ShieldAlert },
    { id: 'roadmap', name: 'Roadmap Maestro & Metas Personales', category: 'Ecosistema', icon: CheckSquare }
  ];

  const filteredModules = allModulesList.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* =========================================================
          NATIVE MOBILE BOTTOM NAVIGATION BAR (DOCK)
          ========================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-cyber-950/95 backdrop-blur-2xl border-t border-cyber-800/80 px-2 py-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] sm:hidden select-none">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all relative ${
                  isActive
                    ? 'text-cyber-gold font-bold scale-105'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-cyber-gold/20 border border-cyber-gold/50 shadow-gold-glow'
                      : 'bg-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cyber-gold' : 'text-slate-400'}`} />
                </div>
                <span className="text-[10px] font-tech font-bold tracking-tight mt-0.5">
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-gold absolute -bottom-0.5 shadow-gold-glow" />
                )}
              </button>
            );
          })}

          {/* More / Menu Drawer Trigger */}
          <button
            onClick={() => {
              hapticFeedback();
              setIsFullDrawerOpen(true);
            }}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all ${
              isFullDrawerOpen ? 'text-cyber-gold font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-cyber-900 border border-cyber-800 flex items-center justify-center">
              <Menu className="w-5 h-5 text-slate-300" />
            </div>
            <span className="text-[10px] font-tech font-bold tracking-tight mt-0.5">Menú</span>
          </button>
        </div>
      </nav>

      {/* =========================================================
          NATIVE FULLSCREEN APP DRAWER (MOBILE HUB)
          ========================================================= */}
      {isFullDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-cyber-950/98 backdrop-blur-2xl p-4 flex flex-col justify-between animate-fadeIn text-white font-mono text-xs select-none sm:hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyber-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyber-gold to-yellow-600 p-0.5 flex items-center justify-center shadow-gold-glow">
                <div className="w-full h-full bg-cyber-950 rounded-[9px] flex items-center justify-center">
                  <span className="font-tech font-bold text-cyber-gold text-lg">A</span>
                </div>
              </div>
              <div>
                <h3 className="font-tech font-bold text-base text-white">AETHER SYNERGY APP</h3>
                <span className="text-[10px] text-cyber-gold font-bold">PLATAFORMA NATIVA MÓVIL</span>
              </div>
            </div>

            <button
              onClick={() => setIsFullDrawerOpen(false)}
              className="p-2 rounded-xl bg-cyber-900 border border-cyber-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="my-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar módulo, herramientas o APIs..."
              className="w-full bg-cyber-900 border border-cyber-800 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-gold"
            />
          </div>

          {/* Modules List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 my-1">
            {filteredModules.map((mod) => {
              const Icon = mod.icon;
              const isSelected = currentView === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => handleTabClick(mod.id)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-cyber-gold/20 border-cyber-gold text-white font-bold shadow-gold-glow'
                      : 'bg-cyber-900/80 border-cyber-800 text-slate-300 hover:bg-cyber-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyber-950 border border-cyber-800 text-cyber-gold">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-tech text-xs text-white">{mod.name}</div>
                      <span className="text-[10px] text-slate-500">{mod.category}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              );
            })}
          </div>

          {/* Footer with Role Switcher & Close */}
          <div className="pt-3 border-t border-cyber-800 space-y-2">
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span>Rol Activo: <strong className="text-cyber-gold font-bold uppercase">{role}</strong></span>
              <div className="flex gap-1">
                <button onClick={() => switchRole('free')} className="px-2 py-0.5 rounded bg-cyber-900 border border-cyber-800 text-slate-300">Free</button>
                <button onClick={() => switchRole('pro')} className="px-2 py-0.5 rounded bg-cyber-gold text-black font-bold">Pro</button>
                <button onClick={() => switchRole('admin')} className="px-2 py-0.5 rounded bg-rose-500 text-white font-bold">Admin</button>
              </div>
            </div>
            <button
              onClick={() => setIsFullDrawerOpen(false)}
              className="w-full py-3 rounded-2xl bg-cyber-900 border border-cyber-800 text-slate-300 font-tech font-bold text-xs uppercase"
            >
              Cerrar Menú
            </button>
          </div>
        </div>
      )}
    </>
  );
};
