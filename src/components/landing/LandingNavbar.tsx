import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronDown, Moon, Sun, Zap, Check, Globe } from 'lucide-react';

interface LandingNavbarProps {
  onOpenLogin: (initialMode?: 'login' | 'register') => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onOpenLogin }) => {
  const { theme, setTheme, themes } = useTheme();
  const { language, setLanguage, currentLanguageOption, setIsWorldLanguageModalOpen } = useLanguage();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-cyber-950/90 backdrop-blur-xl border-b border-cyber-800/80 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo (Aether Synergy) */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-gold to-amber-500 p-0.5 shadow-gold-glow flex items-center justify-center">
            <div className="w-full h-full bg-cyber-950 rounded-[6px] flex items-center justify-center">
              <span className="font-tech font-extrabold text-base text-cyber-gold">A</span>
            </div>
          </div>
          <span className="font-tech font-extrabold text-lg text-white tracking-widest uppercase">
            AETHER <span className="text-cyber-gold">SYNERGY</span>
          </span>
        </div>

        {/* Center: Clean Smooth-Scroll Links for the 4 Waterfall Screens */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-tech font-semibold tracking-wider text-slate-300">
          <button
            onClick={() => scrollToSection('screen-hero')}
            className="hover:text-cyber-gold transition-colors"
          >
            01 • INICIO
          </button>
          <button
            onClick={() => scrollToSection('screen-avantgarde')}
            className="hover:text-cyber-gold transition-colors"
          >
            02 • CEL-SHADED
          </button>
          <button
            onClick={() => scrollToSection('screen-pricing')}
            className="hover:text-cyber-gold transition-colors"
          >
            03 • PLANES & PRECIOS
          </button>
          <button
            onClick={() => scrollToSection('screen-about')}
            className="hover:text-cyber-gold transition-colors"
          >
            04 • ECOSISTEMA
          </button>
        </nav>

        {/* Right Controls: Language + Theme + Login/Register */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsThemeOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyber-900 border border-cyber-700/80 hover:border-cyber-gold text-xs font-bold text-slate-200 transition-colors shadow-sm"
              title="Cambiar Idioma"
            >
              <span className="text-sm">{currentLanguageOption.flag}</span>
              <span className="hidden sm:inline uppercase text-[11px]">{currentLanguageOption.code}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-cyber-900 border border-cyber-gold/40 shadow-gold-glow-lg p-2 z-50 animate-fadeIn space-y-1 max-h-80 overflow-y-auto">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center justify-between">
                  <span>Seleccionar Idioma</span>
                  <span className="text-cyber-gold font-mono">{currentLanguageOption.code.toUpperCase()}</span>
                </div>
                {['es', 'en', 'ja', 'it', 'fr', 'zh', 'de', 'pt'].map((code) => {
                  const l = {
                    es: { name: 'Español', flag: '🇪🇸' },
                    en: { name: 'English', flag: '🇺🇸' },
                    ja: { name: '日本語 (Japonés)', flag: '🇯🇵' },
                    it: { name: 'Italiano', flag: '🇮🇹' },
                    fr: { name: 'Français', flag: '🇫🇷' },
                    zh: { name: '中文 (Chino)', flag: '🇨🇳' },
                    de: { name: 'Deutsch (Alemán)', flag: '🇩🇪' },
                    pt: { name: 'Português', flag: '🇧🇷' },
                  }[code] || { name: code, flag: '🌐' };

                  return (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                        language === code
                          ? 'bg-cyber-gold/20 text-cyber-gold font-bold border border-cyber-gold/50'
                          : 'text-slate-300 hover:bg-cyber-850'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.name}</span>
                      </div>
                      {language === code && <Check className="w-3.5 h-3.5 text-cyber-gold" />}
                    </button>
                  );
                })}

                <div className="pt-1.5 border-t border-cyber-800">
                  <button
                    onClick={() => {
                      setIsLangOpen(false);
                      setIsWorldLanguageModalOpen(true);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-cyber-gold text-xs font-tech font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Ver Todos los Idiomas...</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setIsThemeOpen(!isThemeOpen);
                setIsLangOpen(false);
              }}
              className="p-2 rounded-xl bg-cyber-900 border border-cyber-700/80 hover:border-cyber-gold text-slate-200 transition-colors shadow-sm"
              title="Cambiar Tema Visual"
            >
              {theme === 'light' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : theme === 'neon' ? (
                <Zap className="w-4 h-4 text-cyan-400" />
              ) : (
                <Moon className="w-4 h-4 text-cyber-gold" />
              )}
            </button>

            {isThemeOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-cyber-900 border border-cyber-gold/40 shadow-gold-glow-lg p-2 z-50 animate-fadeIn space-y-1">
                {themes.map((tItem) => (
                  <button
                    key={tItem.id}
                    onClick={() => {
                      setTheme(tItem.id);
                      setIsThemeOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                      theme === tItem.id
                        ? 'bg-cyber-gold/20 text-cyber-gold font-bold border border-cyber-gold/50'
                        : 'text-slate-300 hover:bg-cyber-850'
                    }`}
                  >
                    <span>{tItem.name}</span>
                    {theme === tItem.id && <Check className="w-3.5 h-3.5 text-cyber-gold" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <button
            onClick={() => onOpenLogin('login')}
            className="hidden sm:block px-4 py-2 rounded-xl bg-cyber-900 hover:bg-cyber-850 border border-cyber-700 text-xs font-tech font-bold text-slate-200 hover:text-white transition-all shadow-sm"
          >
            Iniciar Sesión
          </button>

          <button
            onClick={() => onOpenLogin('register')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-extrabold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all"
          >
            Registrarse
          </button>
        </div>
      </div>
    </header>
  );
};
