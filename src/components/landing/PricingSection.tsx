import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types/auth';
import { Check, Sparkles } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { role, upgradePlan } = useAuth();
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      role: 'free' as UserRole,
      name: t('price.starterName'),
      tagline: t('price.starterTag'),
      price: billingCycle === 'monthly' ? 19 : 15,
      highlighted: false,
      color: 'border-cyan-500/30',
      badge: 'Básico',
      features: [
        '3 Generaciones IA diarias',
        'Visor 3D interactivo con rotación',
        'Exportación con marca de agua',
        'Acceso a la comunidad',
        '1 Licencia de usuario'
      ]
    },
    {
      role: 'pro' as UserRole,
      name: t('price.proName'),
      tagline: t('price.proTag'),
      price: billingCycle === 'monthly' ? 49 : 39,
      highlighted: true,
      color: 'border-cyber-gold shadow-gold-glow-lg',
      badge: t('price.popular'),
      features: [
        'UNLIMITED AI GENERATIONS',
        'FULL 3D CEL-SHADED ENGINE',
        'AD-GEN AI: Videos 9:16 en 4K',
        'CLOTHIFY: Fichas técnicas & Kai Copilot',
        'Solesmith: Generador de materiales IA',
        'Exportación .GLB/.OBJ sin marcas',
        'Soporte técnico prioritario'
      ]
    },
    {
      role: 'agency' as UserRole,
      name: t('price.agencyName'),
      tagline: t('price.agencyTag'),
      price: billingCycle === 'monthly' ? 149 : 119,
      highlighted: false,
      color: 'border-purple-500/40',
      badge: 'Enterprise',
      features: [
        'TODO LO INCLUIDO EN PRO',
        'AUTOMO: Auto-Posting en 4 plataformas',
        'GLOBAL SUPPLIERS: Conexión B2B fábricas',
        'Transferencia de activos a agencias aliadas',
        '5 LICENCIAS DE EQUIPO',
        'Mascotas y avatares personalizados',
        'Account Manager dedicado 24/7'
      ]
    }
  ];

  return (
    <section className="py-20 px-4 lg:px-8 max-w-7xl mx-auto transition-colors">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-gold/10 border border-cyber-gold/30 text-cyber-gold text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" /> {t('price.tag')}
        </div>
        <h2 className="text-3xl sm:text-5xl font-tech font-extrabold text-white tracking-wide uppercase">
          {t('price.title')} <span className="gold-gradient-text">{t('price.titleHighlight')}</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          {t('price.subtitle')}
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="inline-flex items-center bg-cyber-900 p-1 rounded-xl border border-cyber-800 mt-6 shadow-sm">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-cyber-gold text-black shadow-gold-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('price.monthly')}
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-cyber-gold text-black shadow-gold-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>{t('price.annual')}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const isCurrentRole = role === plan.role;

          return (
            <div
              key={plan.role}
              className={`relative flex flex-col justify-between p-8 rounded-3xl bg-cyber-900 border transition-all ${
                plan.highlighted
                  ? 'glass-panel-gold scale-105 z-10'
                  : `${plan.color} glass-panel hover:border-cyber-gold/40`
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-tech font-bold text-lg tracking-wider text-white">
                  {plan.name}
                </span>
                <span
                  className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase ${
                    plan.highlighted
                      ? 'bg-cyber-gold text-black border-cyber-gold shadow-gold-glow'
                      : 'bg-cyber-950 text-slate-300 border-cyber-800'
                  }`}
                >
                  {plan.badge}
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-tech font-extrabold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/ mes</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{plan.tagline}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? 'text-cyber-gold' : 'text-emerald-400'}`} />
                    <span className={idx === 0 && plan.highlighted ? 'font-bold text-white' : ''}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => upgradePlan(plan.role)}
                disabled={isCurrentRole}
                className={`w-full py-3.5 rounded-2xl font-tech font-bold text-sm uppercase tracking-wider transition-all ${
                  isCurrentRole
                    ? 'bg-cyber-800 text-slate-400 cursor-default border border-cyber-700'
                    : plan.highlighted
                    ? 'bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black shadow-gold-glow hover:scale-[1.02] active:scale-95'
                    : 'bg-cyber-950 hover:bg-cyber-800 text-white border border-cyber-700 hover:border-cyber-gold/40'
                }`}
              >
                {isCurrentRole ? t('price.activePlan') : `${t('price.selectPlan')} (${plan.name})`}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
