import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

interface Screen3PricingProps {
  onSelectPlan: (role: UserRole) => void;
}

export const Screen3Pricing: React.FC<Screen3PricingProps> = ({ onSelectPlan }) => {
  const { role } = useAuth();

  const plans = [
    {
      role: 'free' as UserRole,
      name: 'STARTER',
      price: '$19',
      period: '/mo',
      tagline: 'Essentials',
      borderClass: 'border-cyan-500/50 shadow-cyan-glow',
      glowColor: 'cyan',
      highlighted: false,
      btnText: 'Get Starter Now',
      features: [
        'UNLIMITED AI GENERATIONS',
        'FULL AUTO-POSTING',
        'ADVANCED ANALYTICS',
        '5 USER LICENSES',
        'DEDICATED SUPPORT'
      ]
    },
    {
      role: 'pro' as UserRole,
      name: 'PRO',
      price: '$49',
      period: '/mo',
      tagline: 'Maximize Performance & Growth',
      borderClass: 'border-cyber-gold shadow-gold-glow-lg bg-gradient-to-b from-cyber-gold/15 to-cyber-950',
      glowColor: 'gold',
      highlighted: true,
      btnText: 'Get Pro Now',
      features: [
        'UNLIMITED AI GENERATIONS',
        'FULL AUTO-POSTING',
        'ADVANCED ANALYTICS',
        '5 USER LICENSES',
        'DEDICATED SUPPORT'
      ]
    },
    {
      role: 'agency' as UserRole,
      name: 'AGENCY',
      price: '$149',
      period: '/mo',
      tagline: 'Scaling',
      borderClass: 'border-purple-500/60 shadow-lg bg-gradient-to-b from-purple-500/10 to-cyber-950',
      glowColor: 'purple',
      highlighted: false,
      btnText: 'Get Agency Now',
      features: [
        'UNLIMITED AI GENERATIONS',
        'FULL AUTO-POSTING',
        'ADVANCED ANALYTICS',
        '5 USER LICENSES',
        'DEDICATED SUPPORT'
      ]
    }
  ];

  return (
    <section id="pricing-section" className="relative min-h-[90vh] py-20 px-4 lg:px-8 cyber-grid flex flex-col justify-center border-t border-cyber-800/80">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Top Mini Brand */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-cyber-gold flex items-center justify-center text-black font-tech font-extrabold text-xs">
              A
            </div>
            <span className="font-tech font-bold text-base text-white tracking-wider">Aether AI</span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-xs text-slate-400">
            <span>FEATURES</span>
            <span>SOLUTIONS</span>
            <span>DEMO</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-tech font-extrabold text-white tracking-wide">
            Simple Pricing, Extraordinary Potential
          </h2>
        </div>

        {/* 3 Illuminated Cards (Exact Image 3 Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.role}
              className={`relative flex flex-col justify-between p-8 rounded-3xl border-2 transition-all duration-300 ${
                plan.borderClass
              } ${plan.highlighted ? 'scale-105 z-10 py-10' : 'bg-cyber-900/90'}`}
            >
              <div className="text-center mb-6">
                <span className="font-tech font-bold text-sm tracking-widest text-slate-200 uppercase">
                  {plan.name}
                </span>

                <div className="flex items-baseline justify-center gap-1 mt-2">
                  <span className="text-5xl font-tech font-extrabold text-white">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{plan.period}</span>
                </div>

                <p className="text-xs text-slate-400 mt-1">{plan.tagline}</p>
              </div>

              {/* Features List in exact uppercase style */}
              <div className="space-y-3 py-6 border-y border-cyber-800 text-center font-mono text-[11px] font-bold text-slate-300">
                {plan.features.map((f, i) => (
                  <div key={i} className={i === 0 && plan.highlighted ? 'text-cyber-gold font-extrabold' : ''}>
                    {f}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => onSelectPlan(plan.role)}
                  className={`w-full py-3.5 rounded-2xl font-tech font-bold text-xs uppercase tracking-wider transition-all shadow-md ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black shadow-gold-glow hover:scale-105'
                      : 'bg-cyber-950 hover:bg-cyber-800 text-white border border-cyber-700 hover:border-cyber-gold/40'
                  }`}
                >
                  {plan.btnText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
