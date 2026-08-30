import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Sparkles,
  Check,
  Zap,
  Building2,
  CreditCard,
  Lock,
  Download,
  FileText,
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const UpgradeModal: React.FC = () => {
  const { isUpgradeModalOpen, setUpgradeModalOpen, upgradeTargetRole, upgradePlan, user } = useAuth();

  const [paymentStep, setPaymentStep] = useState<'checkout' | 'success'>('checkout');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'COP'>('USD');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('894');
  const [cardHolder, setCardHolder] = useState(user?.name || 'Creador Aether');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!isUpgradeModalOpen) return null;

  const targetRole = upgradeTargetRole || 'pro';
  const isAgencyTarget = targetRole === 'agency';

  // Currency multiplier
  const priceUSD = isAgencyTarget ? 149 : 49;
  const displayPrice =
    currency === 'EUR'
      ? `€${Math.round(priceUSD * 0.92)}`
      : currency === 'COP'
      ? `$${(priceUSD * 4200).toLocaleString('es-CO')}`
      : `$${priceUSD}`;

  const handleProcessStripePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      upgradePlan(isAgencyTarget ? 'agency' : 'pro');
      setPaymentStep('success');
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E5A93C', '#F59E0B', '#38BDF8', '#A855F7', '#10B981']
      });
    }, 1400);
  };

  const handleDownloadInvoicePDF = () => {
    const invoiceContent = `=====================================================
FACTURA FISCAL OFICIAL / INVOICE
AETHER SYNERGY AI PLATFORM INC.
Silicon Valley & Global Cloud Operations
=====================================================
Factura Nº:        INV-2026-8942-${Date.now().toString().slice(-4)}
Fecha de Emisión:  ${new Date().toLocaleDateString()}
ID Transacción:    ch_3M8a92Lkd901KjL782_stripe
Método de Pago:    Stripe Checkout (Visa •••• 4242)

CLIENTE FACTURADO:
Nombre:            ${cardHolder}
Email:             ${user?.email || 'cliente@aethersynergy.ai'}
Plan Adquirido:    ${isAgencyTarget ? 'Agency Enterprise ($149/mo)' : 'Pro Designer Studio ($49/mo)'}

DESGLOSE:
Subtotal:          ${displayPrice} ${currency}
IVA / Tax (19%):   Incluido
TOTAL PAGADO:      ${displayPrice} ${currency}

Estado:            ✓ PAGADO / TRANSACCIÓN COMPLETADA
=====================================================
Gracias por crear el futuro con Aether Synergy.`;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Factura_AetherSynergy_${isAgencyTarget ? 'Agency' : 'Pro'}_${Date.now()}.txt`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-cyber-900 border border-cyber-gold/50 rounded-3xl p-5 sm:p-8 shadow-gold-glow-lg overflow-hidden my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            setUpgradeModalOpen(false);
            setPaymentStep('checkout');
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-cyber-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {paymentStep === 'checkout' ? (
          <>
            {/* Glow Header */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-gold/15 border border-cyber-gold/40 text-cyber-gold text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Pasarela Stripe Checkout
              </div>
              <h2 className="text-2xl sm:text-3xl font-tech font-bold text-white tracking-wide">
                {isAgencyTarget ? 'Desbloquea el Plan Agencia' : 'Pasa al Nivel Pro Studio'}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                {isAgencyTarget
                  ? 'Conecta con fabricantes globales B2B y automatiza tus redes con 5 licencias.'
                  : 'Desata el motor 3D Cel-Shaded ilimitado, videos 4K con IA y exportación sin marcas de agua.'}
              </p>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-cyber-950 border border-cyber-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-tech font-bold text-white uppercase">Moneda de Pago:</span>
                <span className="text-[11px] font-mono text-cyber-gold font-bold">{displayPrice} / mes</span>
              </div>

              <div className="flex bg-cyber-900 p-1 rounded-xl border border-cyber-700 text-xs font-mono">
                {(['USD', 'EUR', 'COP'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      currency === curr ? 'bg-cyber-gold text-black shadow-gold-glow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* 1-Click Apple Pay / Google Pay Button */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <button
                type="button"
                onClick={() => {
                  setCardHolder('Apple Pay Customer');
                  handleProcessStripePayment({ preventDefault: () => {} } as any);
                }}
                className="py-2.5 rounded-xl bg-white hover:bg-slate-100 text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span> Pay</span>
                <span className="text-[10px] text-slate-600 font-mono">1-Clic</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCardHolder('Google Pay Customer');
                  handleProcessStripePayment({ preventDefault: () => {} } as any);
                }}
                className="py-2.5 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>G Pay</span>
                <span className="text-[10px] text-slate-400 font-mono">1-Clic</span>
              </button>
            </div>

            <div className="relative flex py-1 items-center mb-4">
              <div className="flex-grow border-t border-cyber-800"></div>
              <span className="flex-shrink mx-3 text-[10px] font-mono text-slate-500 uppercase">O Paga con Tarjeta</span>
              <div className="flex-grow border-t border-cyber-800"></div>
            </div>

            {/* Stripe Card Form */}
            <form onSubmit={handleProcessStripePayment} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Nombre en la Tarjeta</label>
                <input
                  type="text"
                  required
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full bg-cyber-950 border border-cyber-700 focus:border-cyber-gold rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span>Número de Tarjeta de Crédito</span>
                  <span className="font-mono text-[10px] text-cyber-gold">Visa / MasterCard / AMEX</span>
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-cyber-950 border border-cyber-700 focus:border-cyber-gold rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Expiración (MM/AA)</label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full bg-cyber-950 border border-cyber-700 focus:border-cyber-gold rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">CVC / CVV</label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="w-full bg-cyber-950 border border-cyber-700 focus:border-cyber-gold rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessingPayment}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-sm uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-all mt-2 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {isProcessingPayment
                    ? 'Procesando en Stripe...'
                    : `Pagar ${displayPrice} / mes`}
                </span>
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500 mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cifrado SSL 256-bit • Cumplimiento PCI-DSS Nivel 1</span>
            </div>
          </>
        ) : (
          /* =========================================================
             PANTALLA DE PAGO EXITOSO & FACTURA FISCAL EN PDF
             ========================================================= */
          <div className="text-center space-y-5 py-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-tech font-bold text-white tracking-wide">
                ¡SUSCRIPCIÓN STRIPE ACTIVADA CON ÉXITO!
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Tu cuenta ha sido actualizada al <strong className="text-cyber-gold">{isAgencyTarget ? 'Plan Agencia Enterprise' : 'Plan Pro Studio'}</strong>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 text-left space-y-2 text-xs max-w-sm mx-auto font-mono">
              <div className="flex justify-between border-b border-cyber-800 pb-2">
                <span className="text-slate-400">ID de Cargo Stripe:</span>
                <span className="text-white font-bold">ch_3M8a92Lkd901KjL782</span>
              </div>
              <div className="flex justify-between border-b border-cyber-800 pb-2">
                <span className="text-slate-400">Monto Cobrado:</span>
                <span className="text-cyber-gold font-bold">{displayPrice} {currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estado de Cuenta:</span>
                <span className="text-emerald-400 font-bold">✓ Activo / VIP Prioritario</span>
              </div>
            </div>

            {/* Download Invoice PDF */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadInvoicePDF}
                className="w-full py-3 rounded-2xl bg-cyber-800 hover:bg-cyber-700 border border-cyber-gold text-cyber-gold font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-gold-glow"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Factura Fiscal Oficial (PDF / TXT)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setUpgradeModalOpen(false);
                  setPaymentStep('checkout');
                }}
                className="w-full py-2.5 rounded-xl bg-cyber-950 hover:bg-cyber-900 border border-cyber-800 text-slate-300 font-semibold text-xs transition-colors"
              >
                Continuar a la Plataforma
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
