import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronDown, Moon, Sun, Zap, Check } from 'lucide-react';

interface LandingNavbarProps {
  onOpenLogin: (initialMode?: 'login' | 'register') => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onOpenLogin }) => {
  const { theme, setTheme, themes } = useTheme();
  const { language, setLanguage, languages } = useLanguage();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === language);

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

        {/* Center: Top Navigation Capsule (Features | Pricing | Ecosystem as in image 1) */}
        <nav className="hidden md:flex items-center gap-1 bg-cyber-900/80 px-3 py-1.5 rounded-full border border-cyber-700/60 shadow-sm text-xs font-semibold text-slate-300">
          <button
            onClick={() => scrollToSection('capabilities-section')}
            className="px-4 py-1 rounded-full hover:bg-cyber-800 hover:text-white transition-all"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('pricing-section')}
            className="px-4 py-1 rounded-full hover:bg-cyber-800 hover:text-white transition-all"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('about-section')}
            className="px-4 py-1 rounded-full hover:bg-cyber-800 hover:text-white transition-all"
          >
            Ecosystem
          </button>
        </nav>

        {/* Right: Language + Theme + Login + Registrarse Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
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
              <span className="text-sm">{currentLang?.flag}</span>
              <span className="hidden sm:inline uppercase text-[11px]">{currentLang?.code}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-cyber-900 border border-cyber-gold/40 shadow-gold-glow-lg p-2 z-50 animate-fadeIn space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                  Seleccionar Idioma
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                      language === l.code
                        ? 'bg-cyber-gold/20 text-cyber-gold font-bold border border-cyber-gold/50'
                        : 'text-slate-300 hover:bg-cyber-850'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{l.flag}</span>
                      <span>{l.name}</span>
                    </div>
                    {language === l.code && <Check className="w-3.5 h-3.5 text-cyber-gold" />}
                  </button>
                ))}
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
              title="Cambiar Tema"
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
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-cyber-900 border border-cyber-gold/40 shadow-gold-glow-lg p-2 z-50 animate-fadeIn space-y-1">
                {themes.map((th) => (
                  <button
                    key={th.id}
                    onClick={() => {
                      setTheme(th.id);
                      setIsThemeOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                      theme === th.id
                        ? 'bg-cyber-gold/20 text-cyber-gold font-bold border border-cyber-gold/50'
                        : 'text-slate-300 hover:bg-cyber-850'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {th.id === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : th.id === 'neon' ? <Zap className="w-4 h-4 text-cyan-400" /> : <Moon className="w-4 h-4 text-cyber-gold" />}
                      <span>{th.name}</span>
                    </div>
                    {theme === th.id && <Check className="w-3.5 h-3.5 text-cyber-gold" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Login Button (As seen in image 1 top right) */}
          <button
            onClick={() => onOpenLogin('login')}
            className="px-4 py-1.5 rounded-xl bg-cyber-900 hover:bg-cyber-800 border border-cyber-700 hover:border-cyber-gold text-slate-200 hover:text-white font-tech font-bold text-xs uppercase tracking-wider transition-all"
          >
            Login
          </button>

          {/* Registrarse Button (Requested next to Login) */}
          <button
            onClick={() => onOpenLogin('register')}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyber-gold to-amber-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all"
          >
            Registrarse
          </button>
        </div>
      </div>
    </header>
  );
};
