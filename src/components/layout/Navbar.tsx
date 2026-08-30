import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types/auth';
import {
  Sparkles,
  Shield,
  Building2,
  Zap,
  ChevronDown,
  LogIn,
  Moon,
  Sun,
  Globe,
  Check,
  LayoutDashboard
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const { user, role, isAuthenticated, setLoginModalOpen, setProfileModalOpen, switchRole } = useAuth();
  const { theme, setTheme, themes } = useTheme();
  const { language, setLanguage, languages, t } = useLanguage();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const getRoleBadge = (r: UserRole) => {
    switch (r) {
      case 'admin':
        return { label: 'ADMIN', color: 'bg-rose-500/20 text-rose-300 border-rose-500/50' };
      case 'agency':
        return { label: 'AGENCIA', color: 'bg-purple-500/20 text-purple-300 border-purple-500/50' };
      case 'pro':
        return { label: 'PRO', color: 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold/50' };
      default:
        return { label: 'FREE', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' };
    }
  };

  const badge = getRoleBadge(role);
  const currentLang = languages.find((l) => l.code === language);

  return (
    <header className="sticky top-0 z-40 w-full bg-cyber-950/90 backdrop-blur-xl border-b border-cyber-800/80 px-4 lg:px-8 py-3 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-gold via-amber-500 to-yellow-600 p-0.5 shadow-gold-glow group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-cyber-950 rounded-[10px] flex items-center justify-center">
              <span className="font-tech font-bold text-xl text-cyber-gold">A</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-tech font-extrabold text-lg text-white tracking-wider">
                AETHER <span className="text-cyber-gold">SYNERGY</span>
              </span>
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest hidden sm:block">
              {t('nav.tagline')}
            </span>
          </div>
        </div>

        {/* Center Navigation (Available when authenticated or navigating landing) */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-1 bg-cyber-900/60 p-1 rounded-2xl border border-cyber-800">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'landing'
                  ? 'bg-cyber-gold text-black shadow-gold-glow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => setCurrentView('aurora3d')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'aurora3d'
                  ? 'bg-cyber-gold text-black shadow-gold-glow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t('nav.engine3d')}
            </button>
            <button
              onClick={() => setCurrentView('adgen')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'adgen'
                  ? 'bg-cyber-gold text-black shadow-gold-glow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t('nav.videoAds')}
            </button>
            <button
              onClick={() => setCurrentView('clothify')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'clothify'
                  ? 'bg-cyber-gold text-black shadow-gold-glow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t('nav.techPack')}
            </button>
            <button
              onClick={() => setCurrentView('mascot')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'mascot'
                  ? 'bg-cyber-gold text-black shadow-gold-glow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t('nav.mascot')}
            </button>
          </nav>
        )}

        {/* Right Controls: Theme + Language + Role Switcher + Auth */}
        <div className="flex items-center gap-2.5">
          {/* 1. Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsThemeOpen(false);
              }}
              className="flex items-center gap-1.5 p-2 rounded-xl bg-cyber-900 border border-cyber-700/80 hover:border-cyber-gold text-xs font-bold text-slate-200 transition-colors shadow-sm"
              title="Cambiar Idioma"
            >
              <span className="text-base leading-none">{currentLang?.flag}</span>
              <span className="hidden sm:inline uppercase">{currentLang?.code}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-cyber-900 border border-cyber-gold/40 shadow-gold-glow-lg p-2 z-50 animate-fadeIn space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                  Idiomas Clave en Diseño
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
                      <span className="text-base">{l.flag}</span>
                      <div className="text-left">
                        <div className="font-semibold">{l.name}</div>
                        <div className="text-[9px] text-slate-400">{l.category}</div>
                      </div>
                    </div>
                    {language === l.code && <Check className="w-3.5 h-3.5 text-cyber-gold" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Theme Switcher Dropdown (Noche, Día, Neón) */}
          <div className="relative">
            <button
              onClick={() => {
                setIsThemeOpen(!isThemeOpen);
                setIsLangOpen(false);
              }}
              className="flex items-center gap-1.5 p-2 rounded-xl bg-cyber-900 border border-cyber-700/80 hover:border-cyber-gold text-xs font-bold text-slate-200 transition-colors shadow-sm"
              title="Cambiar Tema Visual"
            >
              {theme === 'light' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : theme === 'neon' ? (
                <Zap className="w-4 h-4 text-cyan-400" />
              ) : (
                <Moon className="w-4 h-4 text-cyber-gold" />
              )}
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isThemeOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-cyber-900 border border-cyber-gold/40 shadow-gold-glow-lg p-2 z-50 animate-fadeIn space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                  Aspecto Visual
                </div>
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
                      {th.id === 'light' ? (
                        <Sun className="w-4 h-4 text-amber-500" />
                      ) : th.id === 'neon' ? (
                        <Zap className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <Moon className="w-4 h-4 text-cyber-gold" />
                      )}
                      <span>{th.name}</span>
                    </div>
                    {theme === th.id && <Check className="w-3.5 h-3.5 text-cyber-gold" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Demo Role Switcher Dropdown (when authenticated) */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-center gap-1.5 bg-cyber-900 border border-cyber-700/80 px-2.5 py-1.5 rounded-xl text-xs shadow-sm">
              <span className="text-slate-400 font-medium">{t('nav.testRole')}</span>
              <select
                value={role}
                onChange={(e) => switchRole(e.target.value as UserRole)}
                className="bg-cyber-950 text-cyber-gold font-bold text-xs rounded-lg px-2 py-1 border border-cyber-gold/30 focus:outline-none cursor-pointer"
              >
                <option value="free">Free Starter ($0)</option>
                <option value="pro">Pro Designer ($49)</option>
                <option value="agency">Agencia ($149)</option>
                <option value="admin">Super Admin (Root)</option>
              </select>
            </div>
          )}

          {/* 4. Auth Buttons / User Profile */}
          {isAuthenticated && user ? (
            <button
              onClick={() => setProfileModalOpen(true)}
              className="flex items-center gap-2 p-1.5 rounded-xl bg-cyber-900 hover:bg-cyber-800 border border-cyber-700 hover:border-cyber-gold/50 transition-all group shadow-sm"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-lg object-cover border border-cyber-gold/60 group-hover:scale-105 transition-transform"
              />
              <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border uppercase ${badge.color}`}>
                {badge.label}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setLoginModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-gold to-amber-500 text-black font-tech font-bold text-xs sm:text-sm uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>{t('nav.login')}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
