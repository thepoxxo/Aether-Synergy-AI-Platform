import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Layers, ShieldAlert, Globe2, Briefcase, Zap, Scissors, Code, Radar, Sparkles, Building2, ShoppingBag, QrCode } from 'lucide-react';

const SEARCHABLE_MODULES = [
  { id: 'aurora3d', title: 'Aurora 3D Studio', desc: 'Diseño de Ropa 3D', icon: <Layers className="w-4 h-4"/>, keywords: ['3d', 'ropa', 'diseño', 'aurora', 'prenda', 'tela'] },
  { id: 'scanner3d', title: 'Escáner 3D LiDAR', desc: 'Escaneo de prendas físicas', icon: <Zap className="w-4 h-4"/>, keywords: ['scan', 'lidar', 'escaner', 'foto', 'captura'] },
  { id: 'tiktok_feed', title: 'Poxxi Reels (TikTok Style)', desc: 'Feed de diseños comunitarios', icon: <Sparkles className="w-4 h-4"/>, keywords: ['tiktok', 'reels', 'feed', 'social', 'video'] },
  { id: 'admin', title: 'Admin Console (Super Admin)', desc: 'Métricas, Usuarios, Stripe', icon: <ShieldAlert className="w-4 h-4"/>, keywords: ['admin', 'facturacion', 'stripe', 'baneos', 'dashboard', 'graficos', 'telemetria'] },
  { id: 'globalsuppliers', title: 'Red Global de Proveedores', desc: 'Fábricas y Producción', icon: <Globe2 className="w-4 h-4"/>, keywords: ['proveedor', 'fabrica', 'produccion', 'china', 'esg', 'vetting', 'moq'] },
  { id: 'trend_spider', title: 'Trend Spider AI', desc: 'Scraping de Tendencias TikTok', icon: <Radar className="w-4 h-4"/>, keywords: ['trend', 'spider', 'tiktok', 'tendencias', 'scraping', 'viral'] },
  { id: 'dxf_engine', title: 'Motor Exportación .DXF', desc: '3D a Corte Láser 2D', icon: <Scissors className="w-4 h-4"/>, keywords: ['dxf', 'cad', 'corte', 'laser', 'planos', 'moldes', 'exportar'] },
  { id: 'shopify_widget', title: 'Generador Widget Shopify', desc: 'Probador Virtual AR', icon: <Code className="w-4 h-4"/>, keywords: ['shopify', 'widget', 'ecommerce', 'tienda', 'probador', 'ar'] },
  { id: 'dpp_eu', title: 'EU DPP Generator', desc: 'Pasaporte Digital Europa', icon: <QrCode className="w-4 h-4"/>, keywords: ['dpp', 'eu', 'europa', 'pasaporte', 'espr', 'qr', 'sostenibilidad'] },
  { id: 'revenue_engine', title: 'Poxxi Revenue Engine', desc: 'Monetización y Suscripciones', icon: <Briefcase className="w-4 h-4"/>, keywords: ['dinero', 'revenue', 'monetizacion', 'precios', 'suscripciones', 'planes'] },
  { id: 'agencyworkspaces', title: 'Espacios Agencia B2B', desc: 'Gestión Multi-Marca', icon: <Building2 className="w-4 h-4"/>, keywords: ['agencia', 'b2b', 'marcas', 'clientes', 'equipo'] },
  { id: 'shopifylanding', title: 'Constructor E-commerce AI', desc: 'Tiendas web en 1 clic', icon: <ShoppingBag className="w-4 h-4"/>, keywords: ['tienda', 'web', 'ecommerce', 'constructor', 'landing'] },
];

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    const handleOpenSearch = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('aether_open_search', handleOpenSearch);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('aether_open_search', handleOpenSearch);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredModules = SEARCHABLE_MODULES.filter(m => {
    const term = search.toLowerCase();
    return m.title.toLowerCase().includes(term) || 
           m.desc.toLowerCase().includes(term) ||
           m.keywords.some(k => k.includes(term));
  });

  const handleNavigate = (moduleId: string) => {
    window.dispatchEvent(new CustomEvent('aether_navigate', { detail: moduleId }));
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-cyber-950/95 border border-cyber-700 shadow-[0_0_50px_rgba(16,185,129,0.1)] rounded-2xl overflow-hidden backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-4 border-b border-cyber-800">
          <Search className="w-5 h-5 text-emerald-400" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Buscar por módulo, función, proveedor (Ej: 'stripe', 'dxf', 'tiktok')..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-slate-500 font-tech"
          />
          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
            <kbd className="px-1.5 py-0.5 bg-cyber-800 rounded">ESC</kbd> para salir
          </div>
        </div>

        <div className="p-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {filteredModules.length === 0 ? (
            <div className="text-center py-8 text-slate-500 font-mono text-sm">
              No se encontraron resultados para "{search}"
            </div>
          ) : (
            <div className="space-y-1">
              {filteredModules.map(mod => (
                <button 
                  key={mod.id}
                  onClick={() => handleNavigate(mod.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-cyber-800/80 rounded-xl group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyber-900 border border-cyber-700 text-emerald-400 rounded-lg group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
                      {mod.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-slate-200 font-bold group-hover:text-white font-tech">{mod.title}</p>
                      <p className="text-xs text-slate-500 font-mono">{mod.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1"/>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute inset-0 z-[-1]" onClick={() => setIsOpen(false)}></div>
    </div>
  );
};
