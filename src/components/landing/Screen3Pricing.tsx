import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types/auth';
import { Check, Sparkles, Zap, Crown, Shield, Palette, Building2 } from 'lucide-react';

interface Screen3PricingProps {
  onSelectPlan: (role: UserRole) => void;
}

export const Screen3Pricing: React.FC<Screen3PricingProps> = ({ onSelectPlan }) => {
  const { role } = useAuth();
  const { t } = useLanguage();

  const plans = [
    {
      role: 'free' as UserRole,
      name: 'Starter',
      price: '$0',
      period: '/mo',
      icon: Zap,
      tagline: 'Para explorar la plataforma y bocetar ideas básicas.',
      neonBorder: 'border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]',
      cardBg: 'bg-gradient-to-b from-cyan-950/20 via-cyber-900 to-cyber-950',
      badgeColor: 'bg-cyan-500/10 text-cyan-500 border-cyan-400/30',
      priceColor: 'text-cyan-500',
      checkColor: 'text-cyan-500',
      btnClass: 'bg-cyber-800 hover:bg-cyan-500 hover:text-slate-950 text-white font-bold transition-all',
      highlighted: false,
      btnText: 'Empezar Gratis',
      features: [
        'Visor 3D WebGL Básico',
        'Exportación con marca de agua',
        '5 Créditos mensuales de Diseño IA',
        'Soporte comunitario en Discord'
      ]
    },
    {
      role: 'creator' as UserRole,
      name: 'Creator',
      price: '$19',
      period: '/mo',
      icon: Palette,
      tagline: 'Ideal para diseñadores independientes y hobbies.',
      neonBorder: 'border border-blue-500/40 hover:border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]',
      cardBg: 'bg-gradient-to-b from-blue-950/30 via-cyber-900 to-cyber-950',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-400/30',
      priceColor: 'text-blue-400',
      checkColor: 'text-blue-400',
      btnClass: 'bg-blue-600/20 hover:bg-blue-500 text-blue-100 hover:text-white border border-blue-500/50 font-bold transition-all',
      highlighted: false,
      btnText: 'Empezar Plan Creator',
      features: [
        'Exportación 1080p sin marca de agua',
        '25 Créditos de Diseño IA (GPT-6 Astra)',
        '5 Créditos Video AdGen (Seedance 2.5)',
        'Texturizado Cel-Shaded Básico',
        'Soporte por Email'
      ]
    },
    {
      role: 'pro' as UserRole,
      name: 'Pro',
      price: '$49',
      period: '/mo',
      icon: Crown,
      tagline: 'Para profesionales que monetizan sus marcas.',
      neonBorder: 'border-2 border-amber-400 hover:border-amber-300 shadow-[0_0_45px_rgba(245,158,11,0.5)] z-10',
      cardBg: 'bg-gradient-to-b from-amber-500/20 via-cyber-900 to-cyber-950',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-400/60',
      priceColor: 'text-amber-400',
      checkColor: 'text-amber-500',
      btnClass: 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-extrabold shadow-gold-glow hover:scale-105',
      highlighted: true,
      btnText: 'Comenzar Plan Pro',
      features: [
        'Exportación 4K & Modelos 3D (.GLB/.OBJ)',
        '50 Créditos Video AdGen (Seedance 2.5)',
        'Texturizado PBR Fotorrealista',
        'Copiloto IA Kai con Voz Ilimitada',
        'Flujo de publicaciones TikTok nativo'
      ]
    },
    {
      role: 'studio' as UserRole,
      name: 'Studio',
      price: '$99',
      period: '/mo',
      icon: Building2,
      tagline: 'Para estudios de diseño y equipos pequeños.',
      neonBorder: 'border border-rose-500/40 hover:border-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.3)]',
      cardBg: 'bg-gradient-to-b from-rose-950/30 via-cyber-900 to-cyber-950',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-400/30',
      priceColor: 'text-rose-400',
      checkColor: 'text-rose-400',
      btnClass: 'bg-rose-600/20 hover:bg-rose-500 text-rose-100 hover:text-white border border-rose-500/50 font-bold transition-all',
      highlighted: false,
      btnText: 'Empezar Plan Studio',
      features: [
        '100 Créditos Video AdGen (Seedance Pro)',
        'Generador Fichas Técnicas Tech Pack PDF',
        'Radar de Tendencias (Trend Forecaster)',
        '2 Licencias de Equipo Colaborativo',
        'Soporte Prioritario 24h'
      ]
    },
    {
      role: 'agency' as UserRole,
      name: 'Agency',
      price: '$199',
      period: '/mo',
      icon: Shield,
      tagline: 'Solución B2B corporativa para gran escala.',
      neonBorder: 'border border-purple-500/40 hover:border-purple-400 shadow-[0_0_35px_rgba(168,85,247,0.3)]',
      cardBg: 'bg-gradient-to-b from-purple-950/30 via-cyber-900 to-cyber-950',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-400/30',
      priceColor: 'text-purple-400',
      checkColor: 'text-purple-400',
      btnClass: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)]',
      highlighted: false,
      btnText: 'Empezar Plan Agencia',
      features: [
        'Video AdGen Ilimitado (Seedance Turbo)',
        'Directorio Global de Fábricas B2B',
        'Automatizaciones n8n nativas integradas',
        '5 Licencias de Equipo',
        'Soporte VIP Dedicado 24/7'
      ]
    }
  ];

  return (
    <section id="screen-pricing" className="relative min-h-[90vh] py-20 px-4 lg:px-8 cyber-grid flex flex-col justify-center border-t border-amber-500/20">
      <div className="max-w-[1400px] mx-auto w-full relative z-10 space-y-12">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-tech font-bold text-xs uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>5 PLANES ESTRATÉGICOS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-tech font-extrabold text-white tracking-wide">
            Ecosistema de Precios
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-normal max-w-xl mx-auto">
            Escala desde tus primeros bocetos hasta la producción industrial de tu marca. Elige el plan que mejor se adapte a tu crecimiento.
          </p>
        </div>

        {/* 5 Centered 3D Neon Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch w-full">
          {plans.map((p) => {
            const isCurrent = role === p.role;
            const Icon = p.icon;

            return (
              <div
                key={p.role}
                className={`relative flex flex-col justify-between p-6 rounded-3xl ${p.neonBorder} ${p.cardBg} backdrop-blur-2xl transition-all duration-300 text-left ${
                  p.highlighted ? 'scale-105 md:-translate-y-2 z-20' : 'hover:scale-[1.02]'
                }`}
              >
                {/* Most Popular Floating Tag */}
                {p.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-tech font-extrabold text-[10px] uppercase tracking-wider shadow-gold-glow whitespace-nowrap">
                    Más Popular
                  </div>
                )}

                <div className="space-y-4">
                  {/* Top Tier Name & Icon */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${p.badgeColor} border`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-tech font-bold text-lg text-white tracking-wide leading-tight">
                        {p.name}
                      </h3>
                      {isCurrent && (
                        <span className="inline-block text-[9px] font-mono font-bold px-2 py-0.5 mt-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                          PLAN ACTIVO
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="flex items-end gap-1 pt-1">
                    <span className={`text-4xl font-tech font-extrabold tracking-tight leading-none ${p.priceColor}`}>
                      {p.price}
                    </span>
                    <span className="text-slate-400 text-xs font-mono font-bold mb-1">{p.period}</span>
                  </div>

                  <p className="text-xs text-slate-400 font-sans min-h-[32px]">
                    {p.tagline}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 pt-4 border-t border-cyber-800 text-[11px] text-slate-300">
                    {p.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className={`w-3.5 h-3.5 ${p.checkColor} shrink-0 mt-0.5`} />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6 pt-4">
                  <button
                    onClick={() => onSelectPlan(p.role)}
                    className={`w-full py-2.5 rounded-xl font-tech font-bold text-[11px] uppercase tracking-wider transition-all ${p.btnClass}`}
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
