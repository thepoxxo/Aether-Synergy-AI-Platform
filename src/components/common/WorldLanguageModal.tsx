import React, { useState } from 'react';
import { Globe, Search, X, Check } from 'lucide-react';
import { useLanguage, ALL_WORLD_LANGUAGES, POPULAR_LANGUAGES } from '../../context/LanguageContext';

export const WorldLanguageModal: React.FC = () => {
  const { language, setLanguage, isWorldLanguageModalOpen, setIsWorldLanguageModalOpen } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isWorldLanguageModalOpen) return null;

  const filteredLanguages = ALL_WORLD_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (code: string) => {
    setLanguage(code);
    setIsWorldLanguageModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-cyber-900 border-2 border-cyber-gold/50 rounded-3xl w-full max-w-xl shadow-gold-glow-lg overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-cyber-800 flex items-center justify-between bg-cyber-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold shadow-gold-glow">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-tech font-bold text-base text-white tracking-wide">
                SELECTOR GLOBAL DE IDIOMAS DEL MUNDO
              </h3>
              <p className="text-xs text-slate-400">
                Selecciona cualquier lengua para adaptar la interfaz de Aether Synergy
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWorldLanguageModalOpen(false)}
            className="p-2 rounded-xl bg-cyber-900 hover:bg-cyber-800 border border-cyber-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-cyber-950/60 border-b border-cyber-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar idioma por nombre (ej: Español, Japanese, Français, Deutsch)..."
              className="w-full bg-cyber-900 border border-cyber-700 focus:border-cyber-gold rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Popular Languages Quick Bar */}
        <div className="px-5 py-3 bg-cyber-950/40 border-b border-cyber-800 flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[11px] font-tech font-bold uppercase text-slate-400 shrink-0 mr-1">
            Populares:
          </span>
          {POPULAR_LANGUAGES.slice(0, 8).map((pop) => (
            <button
              key={pop.code}
              onClick={() => handleSelect(pop.code)}
              className={`px-2.5 py-1 rounded-xl text-xs flex items-center gap-1.5 shrink-0 border transition-all ${
                language === pop.code
                  ? 'bg-cyber-gold text-black border-cyber-gold font-bold shadow-gold-glow'
                  : 'bg-cyber-900 border-cyber-800 text-slate-300 hover:text-white'
              }`}
            >
              <span>{pop.flag}</span>
              <span>{pop.name}</span>
            </button>
          ))}
        </div>

        {/* All Languages Grid */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredLanguages.map((lang) => {
            const isSelected = language === lang.code;

            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all group ${
                  isSelected
                    ? 'bg-cyber-gold/20 border-cyber-gold text-white shadow-gold-glow'
                    : 'bg-cyber-950/70 border-cyber-800 hover:border-cyber-gold/40 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <div className="font-tech font-bold text-xs group-hover:text-cyber-gold transition-colors">
                      {lang.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {lang.nativeName} ({lang.code.toUpperCase()})
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-cyber-gold text-black flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
