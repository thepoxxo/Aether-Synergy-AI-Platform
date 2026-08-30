import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types/auth';
import { Check, Sparkles } from 'lucide-react';

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
      tagline: t('pricing.freeDesc'),
      borderClass: 'border-cyan-500/50 shadow-cyan-glow',
      glowColor: 'cyan',
      highlighted: false,
      btnText: t('landing.startFree'),
      features: [
        'Visor 3D WebGL con Shaders Cel & PBR',
        'Exportación con marca de agua',
        '5 Créditos mensuales de prueba IA',
        'Soporte comunitario'
      ]
    },
    {
      role: 'pro' as UserRole,
      name: t('pricing.pro'),
      price: '$49',
      period: '/mo',
      tagline: t('pricing.proDesc'),
      borderClass: 'border-cyber-gold shadow-gold-glow-lg bg-gradient-to-b from-cyber-gold/15 to-cyber-950',
      glowColor: 'gold',
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
      tagline: t('pricing.agencyDesc'),
      borderClass: 'border-purple-500/60 shadow-lg bg-gradient-to-b from-purple-500/10 to-cyber-950',
      glowColor: 'purple',
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
    <section id="pricing-section" className="relative min-h-[90vh] py-20 px-4 lg:px-8 cyber-grid flex flex-col justify-center border-t border-cyber-800/80">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-gold/10 border border-cyber-gold/30 text-cyber-gold font-tech font-bold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('pricing.badge')}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-tech font-extrabold text-white tracking-wide">
            {t('pricing.title')}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 font-normal">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((p) => {
            const isCurrent = role === p.role;

            return (
              <div
                key={p.role}
                className={`relative flex flex-col justify-between p-8 rounded-3xl border ${p.borderClass} backdrop-blur-2xl transition-all duration-300 ${
                  p.highlighted ? 'scale-105 z-20' : 'hover:border-cyber-gold/60'
                }`}
              >
                {p.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-cyber-gold text-black font-tech font-extrabold text-[11px] uppercase tracking-wider shadow-gold-glow">
                    {t('pricing.popular')}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-tech font-bold text-xl text-white tracking-wide">{p.name}</h3>
                    {isCurrent && (
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                        PLAN ACTIVO
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl sm:text-5xl font-tech font-extrabold text-white">{p.price}</span>
                    <span className="text-slate-400 text-xs font-mono">{p.period}</span>
                  </div>

                  <p className="text-xs text-slate-400 mb-6 font-sans min-h-[32px]">{p.tagline}</p>

                  <div className="space-y-3 pt-4 border-t border-cyber-800 text-xs text-slate-300">
                    {p.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-cyber-gold shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onSelectPlan(p.role)}
                    className={`w-full py-3.5 rounded-2xl font-tech font-extrabold text-xs uppercase tracking-wider transition-all ${
                      p.highlighted
                        ? 'bg-gradient-to-r from-cyber-gold to-amber-500 text-black shadow-gold-glow hover:opacity-90'
                        : 'bg-cyber-900 hover:bg-cyber-850 border border-cyber-700 text-white hover:border-cyber-gold'
                    }`}
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
