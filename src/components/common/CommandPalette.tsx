import React, { useState, useEffect } from 'react';
import { Search, Command, ArrowRight, User, Settings, Globe2, Briefcase } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Escuchar Cmd+K o Ctrl+K
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
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl bg-cyber-950/90 border border-cyber-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden animate-fadeIn backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-4 border-b border-cyber-800">
          <Search className="w-5 h-5 text-slate-400" />
          <input 
            autoFocus
            type="text" 
            placeholder="Buscar diseños, proveedores, herramientas..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-slate-500 font-tech"
          />
          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
            <kbd className="px-1.5 py-0.5 bg-cyber-800 rounded">ESC</kbd> para salir
          </div>
        </div>

        <div className="p-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {!search && (
            <div className="px-3 py-2 text-xs font-bold text-slate-500 font-mono uppercase tracking-wider">
              Accesos Rápidos
            </div>
          )}
          
          <div className="space-y-1">
            <button className="w-full flex items-center justify-between p-3 hover:bg-cyber-800 rounded-xl group transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><Globe2 className="w-4 h-4"/></div>
                <span className="text-slate-200 font-bold group-hover:text-white">Red Global de Proveedores</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all"/>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-cyber-800 rounded-xl group transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Briefcase className="w-4 h-4"/></div>
                <span className="text-slate-200 font-bold group-hover:text-white">Mi Bóveda de Diseños 3D</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all"/>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-cyber-800 rounded-xl group transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg"><Settings className="w-4 h-4"/></div>
                <span className="text-slate-200 font-bold group-hover:text-white">Configuración del Workspace</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-all"/>
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 z-[-1]" onClick={() => setIsOpen(false)}></div>
    </div>
  );
};
