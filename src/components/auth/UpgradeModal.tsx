import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Sparkles, Check, Zap, Building2 } from 'lucide-react';

export const UpgradeModal: React.FC = () => {
  const { isUpgradeModalOpen, setUpgradeModalOpen, upgradeTargetRole, upgradePlan } = useAuth();

  if (!isUpgradeModalOpen) return null;

  const targetRole = upgradeTargetRole || 'pro';
  const isAgencyTarget = targetRole === 'agency';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-cyber-900 border border-cyber-gold/50 rounded-3xl p-6 sm:p-8 shadow-gold-glow-lg overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setUpgradeModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-cyber-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Glow Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-gold/15 border border-cyber-gold/40 text-cyber-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Función Premium Bloqueada
          </div>
          <h2 className="text-2xl sm:text-3xl font-tech font-bold text-white tracking-wide">
            {isAgencyTarget ? 'Desbloquea el Plan Agencia' : 'Pasa al Nivel Pro Studio'}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {isAgencyTarget
              ? 'Conecta directamente con fabricantes globales y automatiza tus redes sociales.'
              : 'Desata todo el poder del motor 3D Cel-Shaded, videos 4K con IA y fichas técnicas.'}
          </p>
        </div>

        {/* Feature Highlights Card */}
        <div className="glass-panel-gold rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between pb-3 border-b border-cyber-gold/20 mb-4">
            <div className="flex items-center gap-2.5">
              {isAgencyTarget ? (
                <Building2 className="w-6 h-6 text-purple-400" />
              ) : (
                <Zap className="w-6 h-6 text-cyber-gold" />
              )}
              <span className="font-tech font-bold text-lg text-white">
                {isAgencyTarget ? 'Plan Agencia Enterprise' : 'Plan Pro Studio'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-tech font-bold text-cyber-gold">
                {isAgencyTarget ? '$149' : '$49'}
              </span>
              <span className="text-xs text-slate-400">/mes</span>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            {isAgencyTarget ? (
              <>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyber-gold shrink-0" />
                  <span><strong>Global Suppliers B2B:</strong> Envío directo de Tech Pack a fábricas (China, Italia, USA)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyber-gold shrink-0" />
                  <span><strong>Automo Calendar:</strong> Programación y publicación automática en TikTok, IG, YT</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyber-gold shrink-0" />
                  <span><strong>5 Licencias de Equipo:</strong> Espacios de trabajo compartidos y transferencias 3D</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyber-gold shrink-0" />
                  <span>Generaciones IA Ilimitadas + Soporte VIP prioritario</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyber-gold shrink-0" />
                  <span><strong>Aurora 3D Studio:</strong> Toon Shaders Cel-Shaded, timeline 360° y green screen</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyber-gold shrink-0" />
                  <span><strong>Ad-Gen AI:</strong> Generador de videos publicitarios 9:16 en Ultra HD 4K</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyber-gold shrink-0" />
                  <span><strong>Clothify AI:</strong> Asistente Kai para cálculo de telas, gramaje y cremalleras YKK</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyber-gold shrink-0" />
                  <span>Exportación de modelos 3D sin marcas de agua (.glb, .obj)</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Action Button */}
        <button
          onClick={() => upgradePlan(isAgencyTarget ? 'agency' : 'pro')}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-base uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-all active:scale-[0.98]"
        >
          {`Actualizar a ${isAgencyTarget ? 'Agencia ($149/mo)' : 'Pro Studio ($49/mo)'}`}
        </button>

        <p className="text-center text-[11px] text-slate-500 mt-3">
          Simulación de pago instantánea. No se requiere tarjeta de crédito real durante el demo.
        </p>
      </div>
    </div>
  );
};
