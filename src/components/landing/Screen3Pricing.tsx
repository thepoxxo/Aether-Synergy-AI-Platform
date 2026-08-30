import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types/auth';
import { Check, Sparkles, Zap, Crown, Shield } from 'lucide-react';

interface Screen3PricingProps {
  onSelectPlan: (role: UserRole) => void;
}

export const Screen3Pricing: React.FC<Screen3PricingProps> = ({ onSelectPlan }) => {
  const { role } = useAuth();
  const { t } = useLanguage();

  const plans = [
    {
      role: 'free' as UserRole,
      name: t('pricing.free'),
      price: '$0',
      period: '/mo',
      icon: Zap,
      tagline: t('pricing.freeDesc'),
      neonBorder: 'border-2 border-cyan-400/80 hover:border-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.35)]',
      cardBg: 'bg-gradient-to-b from-cyan-500/15 via-white to-cyan-50/40 dark:from-cyan-950/30 dark:via-cyber-900 dark:to-cyber-950',
      badgeColor: 'bg-cyan-500/20 text-cyan-500 border-cyan-400/60',
      priceColor: 'text-cyan-600 dark:text-cyan-400',
      checkColor: 'text-cyan-500',
      btnClass: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)]',
      highlighted: false,
      btnText: t('landing.startFree'),
      features: [
        'Visor 3D WebGL con Shaders Cel & PBR',
        'Exportación con marca de agua',
        '5 Créditos mensuales de prueba IA',
        'Soporte comunitario en Discord'
      ]
    },
    {
      role: 'pro' as UserRole,
      name: t('pricing.pro'),
      price: '$49',
      period: '/mo',
      icon: Crown,
      tagline: t('pricing.proDesc'),
      neonBorder: 'border-2 border-amber-400 hover:border-amber-300 shadow-[0_0_45px_rgba(245,158,11,0.5)]',
      cardBg: 'bg-gradient-to-b from-amber-500/20 via-white to-amber-50/50 dark:from-amber-950/40 dark:via-cyber-900 dark:to-cyber-950',
      badgeColor: 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-400/60',
      priceColor: 'text-amber-600 dark:text-amber-400',
      checkColor: 'text-amber-500',
      btnClass: 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-extrabold shadow-gold-glow hover:scale-105',
      highlighted: true,
      btnText: 'Comenzar Plan Pro',
      features: [
        'Exportación 4K sin marcas de agua (.GLB / PNG)',
        '50 Créditos de Video AdGen con Sora & Gen-3',
        'Texturizado PBR & Cel-Shaded Pro',
        'Copiloto IA Kai con voz ilimitada'
      ]
    },
    {
      role: 'agency' as UserRole,
      name: t('pricing.agency'),
      price: '$149',
      period: '/mo',
      icon: Shield,
      tagline: t('pricing.agencyDesc'),
      neonBorder: 'border-2 border-purple-400/80 hover:border-purple-300 shadow-[0_0_35px_rgba(168,85,247,0.35)]',
      cardBg: 'bg-gradient-to-b from-purple-500/15 via-white to-purple-50/40 dark:from-purple-950/30 dark:via-cyber-900 dark:to-cyber-950',
      badgeColor: 'bg-purple-500/20 text-purple-600 dark:text-purple-300 border-purple-400/60',
      priceColor: 'text-purple-600 dark:text-purple-400',
      checkColor: 'text-purple-500',
      btnClass: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)]',
      highlighted: false,
      btnText: 'Comenzar Plan Agencia',
      features: [
        '5 Licencias de equipo colaborativo',
        'Directorio Global de Fábricas B2B & WhatsApp',
        'Generador de Fichas Técnicas Tech Pack PDF',
        'Calendario de Redes & Soporte VIP 24/7'
      ]
    }
  ];

  return (
    <section id="screen-pricing" className="relative min-h-[90vh] py-20 px-4 lg:px-8 cyber-grid flex flex-col justify-center border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-tech font-bold text-xs uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('pricing.badge')}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-tech font-extrabold text-slate-900 dark:text-white tracking-wide">
            {t('pricing.title')}
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-normal max-w-xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* 3 Centered 3D Neon Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((p) => {
            const isCurrent = role === p.role;
            const Icon = p.icon;

            return (
              <div
                key={p.role}
                className={`relative flex flex-col justify-between p-8 rounded-3xl ${p.neonBorder} ${p.cardBg} backdrop-blur-2xl transition-all duration-300 text-center ${
                  p.highlighted ? 'scale-105 md:-translate-y-2 z-20' : 'hover:scale-[1.02]'
                }`}
              >
                {/* Most Popular Floating Tag */}
                {p.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-tech font-extrabold text-[11px] uppercase tracking-wider shadow-gold-glow">
                    {t('pricing.popular')}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Top Tier Name & Icon */}
                  <div className="flex items-center justify-center gap-2">
                    <div className={`p-2 rounded-xl ${p.badgeColor} border`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-tech font-bold text-xl text-slate-900 dark:text-white tracking-wide">
                      {p.name}
                    </h3>
                  </div>

                  {isCurrent && (
                    <div className="inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/50">
                      PLAN ACTIVO
                    </div>
                  )}

                  {/* Centered Price Display */}
                  <div className="flex items-center justify-center gap-1.5 pt-2">
                    <span className={`text-5xl sm:text-6xl font-tech font-extrabold tracking-tight ${p.priceColor}`}>
                      {p.price}
                    </span>
                    <span className="text-slate-400 text-xs font-mono font-bold">{p.period}</span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans min-h-[32px] max-w-xs mx-auto">
                    {p.tagline}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-cyber-800 text-left text-xs text-slate-700 dark:text-slate-300">
                    {p.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 ${p.checkColor} shrink-0 mt-0.5`} />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Centered CTA Button */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onSelectPlan(p.role)}
                    className={`w-full py-3.5 rounded-2xl font-tech font-extrabold text-xs uppercase tracking-wider transition-all ${p.btnClass}`}
                  >
                    {p.btnText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
