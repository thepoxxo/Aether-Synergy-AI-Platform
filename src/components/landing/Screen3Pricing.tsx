import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole, OFFICIAL_PLANS } from '../../types/auth';
import { Check, Scissors, Layers, Building2 } from 'lucide-react';

interface Screen3PricingProps {
  onSelectPlan: (role: UserRole) => void;
}

export const Screen3Pricing: React.FC<Screen3PricingProps> = ({ onSelectPlan }) => {
  const { role } = useAuth();
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const planCards = [
    {
      ...OFFICIAL_PLANS.free,
      icon: Scissors
    },
    {
      ...OFFICIAL_PLANS.pro,
      icon: Layers
    },
    {
      ...OFFICIAL_PLANS.agency,
      icon: Building2
    }
  ];

  return (
    <section
      id="screen-pricing"
      className="relative py-20 px-4 lg:px-8 flex flex-col justify-center border-b border-cyber-800"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyber-900 border border-cyber-700 text-slate-300 font-mono text-xs">
            <span>{t('pricing.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t('pricing.title')}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-normal max-w-xl mx-auto">
            {t('pricing.subtitle')}
          </p>

          {/* Monthly / Annual Billing Toggle (2 months free) */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex items-center p-1 rounded-xl bg-cyber-900 border border-cyber-700 text-xs">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-cyber-800 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Pago mensual
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-cyber-gold text-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Pago anual</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    billingCycle === 'annual'
                      ? 'bg-black/20 text-black font-bold'
                      : 'bg-cyber-800 text-cyber-gold'
                  }`}
                >
                  2 meses gratis
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Unified Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch w-full">
          {planCards.map((p) => {
            const isCurrent = role === p.role;
            const Icon = p.icon;
            const displayedPrice =
              billingCycle === 'annual' ? p.annualMonthlyPrice : p.monthlyPrice;

            return (
              <div
                key={p.role}
                className={`relative flex flex-col justify-between p-7 rounded-2xl bg-cyber-900 transition-all text-left shadow-cyber-card ${
                  p.highlighted
                    ? 'border-2 border-cyber-gold'
                    : 'border border-cyber-700 hover:border-cyber-600'
                }`}
              >
                {/* Recommended Tag on Single Highlighted Plan */}
                {p.highlighted && (
                  <div className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-full bg-cyber-gold text-black font-mono font-bold text-[11px] tracking-wide">
                    {t('pricing.popular')}
                  </div>
                )}

                <div className="space-y-5">
                  {/* Plan Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-700 text-cyber-gold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-white leading-tight">
                          {p.codeName}
                        </h3>
                        <span className="text-[11px] font-mono text-slate-400">
                          {p.planLabel}
                        </span>
                      </div>
                    </div>

                    {isCurrent && (
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-cyber-950 text-cyber-emerald border border-cyber-700">
                        ACTIVO
                      </span>
                    )}
                  </div>

                  {/* Price Display */}
                  <div className="pt-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-extrabold tracking-tight text-white">
                        ${displayedPrice}
                      </span>
                      <span className="text-slate-400 text-xs font-mono">
                        USD / mes
                      </span>
                    </div>
                    {p.monthlyPrice > 0 && (
                      <span className="text-[11px] font-mono text-slate-400 block mt-1">
                        {billingCycle === 'annual'
                          ? `Facturado anualmente ($${displayedPrice * 12}/año · ahorras $${(p.monthlyPrice - p.annualMonthlyPrice) * 12})`
                          : 'Facturado mes a mes · cancela cuando quieras'}
                      </span>
                    )}
                    {p.monthlyPrice === 0 && (
                      <span className="text-[11px] font-mono text-slate-400 block mt-1">
                        Sin tarjeta de crédito
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed min-h-[36px]">
                    {p.summary}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 pt-4 border-t border-cyber-800 text-xs text-slate-300">
                    {p.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-cyber-gold shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-7 pt-4">
                  <button
                    onClick={() => onSelectPlan(p.role)}
                    className={`w-full py-3 rounded-xl font-bold text-xs tracking-wide transition-all ${
                      p.highlighted
                        ? 'bg-cyber-gold hover:bg-cyber-gold-light text-black shadow-gold-glow'
                        : 'bg-cyber-800 hover:bg-cyber-700 text-white border border-cyber-700'
                    }`}
                  >
                    {p.ctaText}
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
