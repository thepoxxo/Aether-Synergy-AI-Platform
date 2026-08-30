import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types/auth';
import { DesignNiche, CompanyRole, ProductionVolume, UserRegistrationData } from '../../types/database';
import {
  X,
  Sparkles,
  Shield,
  Building2,
  Zap,
  User as UserIcon,
  Mail,
  ArrowRight,
  KeyRound,
  Fingerprint,
  CheckCircle2,
  Smartphone,
  Briefcase,
  Globe,
  Phone,
  Layers,
  ChevronRight,
  Lock,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setLoginModalOpen, authModalMode, login, register, demoAccounts } = useAuth();
  const { t } = useLanguage();

  // Mode: 'login' vs 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginTab, setLoginTab] = useState<'demo' | 'social' | 'custom'>('demo');
  const [registrationMode, setRegistrationMode] = useState<'basic' | 'complete'>('complete');
  const [step, setStep] = useState<'form' | '2fa'>('form');

  useEffect(() => {
    if (authModalMode) {
      setAuthMode(authModalMode);
    }
  }, [authModalMode, isLoginModalOpen]);

  // Form State
  const [formData, setFormData] = useState<UserRegistrationData>({
    name: '',
    email: '',
    password: '',
    role: 'pro',
    registrationType: 'complete',
    brandOrStudioName: '',
    niche: 'fashion_streetwear',
    country: 'Colombia',
    phone: '',
    companyRole: 'indie_designer',
    estimatedVolume: '1_5_monthly',
    termsAccepted: true,
    marketingConsent: true
  });

  // 2FA OTP State
  const [otp, setOtp] = useState(['7', '7', '7', '2', '0', '4']);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (step === '2fa' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isLoginModalOpen) return null;

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Por favor completa tu nombre y correo electrónico.');
      return;
    }
    setStep('2fa');
    setTimer(59);
  };

  const handleQuickLogin = (roleToLogin: UserRole, name?: string, email?: string) => {
    setFormData((prev) => ({
      ...prev,
      name: name || '',
      email: email || '',
      role: roleToLogin
    }));
    setStep('2fa');
    setTimer(59);
  };

  const complete2FAVerification = () => {
    if (authMode === 'register') {
      register({
        ...formData,
        registrationType: registrationMode
      });
    } else {
      login(formData.role, formData.name || undefined, formData.email || undefined);
    }

    setStep('form');
    setLoginModalOpen(false);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-cyber-900 border border-cyber-gold/40 rounded-3xl p-5 sm:p-8 shadow-gold-glow-lg overflow-hidden my-auto max-h-[92vh] overflow-y-auto">
        {/* Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyber-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            setLoginModalOpen(false);
            setStep('form');
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-cyber-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <>
            {/* Header with Mode Switcher (Login vs Registro) */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-gold/10 border border-cyber-gold/30 text-cyber-gold text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Ecosistema Aether Synergy
              </div>

              {/* Main Tab Toggle: Iniciar Sesión vs Registro */}
              <div className="inline-flex bg-cyber-950 p-1 rounded-2xl border border-cyber-800 shadow-sm mt-1">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-tech font-bold uppercase tracking-wider transition-all ${
                    authMode === 'login'
                      ? 'bg-cyber-gold text-black shadow-gold-glow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setAuthMode('register')}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-tech font-bold uppercase tracking-wider transition-all ${
                    authMode === 'register'
                      ? 'bg-cyber-gold text-black shadow-gold-glow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Crear Cuenta Nueva (Registro)
                </button>
              </div>
            </div>

            {/* =========================================================
                SECCIÓN: CREAR CUENTA NUEVA (REGISTRO BÁSICO O COMPLETO)
                ========================================================= */}
            {authMode === 'register' ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {/* Switcher: Básico vs Completo */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-cyber-950 border border-cyber-800">
                  <div>
                    <span className="text-xs font-tech font-bold text-white block">Tipo de Registro de Cliente</span>
                    <span className="text-[11px] text-slate-400">
                      {registrationMode === 'complete' ? 'Perfil profesional completo para sourcing y producción' : 'Registro rápido en 1 minuto'}
                    </span>
                  </div>

                  <div className="flex bg-cyber-900 p-1 rounded-xl border border-cyber-700 text-xs">
                    <button
                      type="button"
                      onClick={() => setRegistrationMode('basic')}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                        registrationMode === 'basic'
                          ? 'bg-cyan-400 text-black shadow-cyan-glow font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Básico
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegistrationMode('complete')}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                        registrationMode === 'complete'
                          ? 'bg-cyber-gold text-black shadow-gold-glow font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Completo (Recomendado)
                    </button>
                  </div>
                </div>

                {/* Grid de Campos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Nombre */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Carlos Mendoza"
                      className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyber-gold shadow-sm"
                    />
                  </div>

                  {/* Correo */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="carlos@tumarca.com"
                      className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyber-gold shadow-sm"
                    />
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Contraseña Segura *</label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyber-gold shadow-sm"
                    />
                  </div>

                  {/* Plan Deseado */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Plan a Iniciar</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                      className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyber-gold shadow-sm cursor-pointer"
                    >
                      <option value="free">Free Starter ($0/mes)</option>
                      <option value="pro">Pro Designer Studio ($49/mes)</option>
                      <option value="agency">Agency Enterprise ($149/mes)</option>
                    </select>
                  </div>

                  {/* =========================================
                      CAMPOS ADICIONALES (REGISTRO COMPLETO)
                      ========================================= */}
                  {registrationMode === 'complete' && (
                    <>
                      {/* Marca o Estudio */}
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Nombre de Marca o Estudio</label>
                        <input
                          type="text"
                          value={formData.brandOrStudioName}
                          onChange={(e) => setFormData({ ...formData, brandOrStudioName: e.target.value })}
                          placeholder="Ej: Neo Techwear Studio"
                          className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyber-gold shadow-sm"
                        />
                      </div>

                      {/* Nicho de Diseño */}
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Nicho Principal de Diseño</label>
                        <select
                          value={formData.niche}
                          onChange={(e) => setFormData({ ...formData, niche: e.target.value as DesignNiche })}
                          className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyber-gold shadow-sm cursor-pointer"
                        >
                          <option value="fashion_streetwear">👗 Moda Urbana & Streetwear Techwear</option>
                          <option value="interior_design">🛋️ Diseño & Decoración de Interiores</option>
                          <option value="instrumentation_hardware">🎛️ Instrumentalización & Producto Físico</option>
                          <option value="agency_marketing">🚀 Agencia de Marketing y Publicidad 3D</option>
                        </select>
                      </div>

                      {/* País */}
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">País / Región</label>
                        <input
                          type="text"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          placeholder="Ej: Colombia, México, España..."
                          className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyber-gold shadow-sm"
                        />
                      </div>

                      {/* Teléfono / WhatsApp */}
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Teléfono / WhatsApp (para 2FA)</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+57 300 000 0000"
                          className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyber-gold shadow-sm"
                        />
                      </div>

                      {/* Rol en Empresa */}
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Tu Rol en el Proyecto</label>
                        <select
                          value={formData.companyRole}
                          onChange={(e) => setFormData({ ...formData, companyRole: e.target.value as CompanyRole })}
                          className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyber-gold shadow-sm cursor-pointer"
                        >
                          <option value="founder_ceo">Fundador / CEO</option>
                          <option value="creative_director">Director Creativo</option>
                          <option value="indie_designer">Diseñador Independiente</option>
                          <option value="sourcing_lead">Líder de Compras y Sourcing</option>
                          <option value="agency_partner">Socio de Agencia</option>
                        </select>
                      </div>

                      {/* Volumen de Producción Estimado */}
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Volumen Mensual Estimado</label>
                        <select
                          value={formData.estimatedVolume}
                          onChange={(e) => setFormData({ ...formData, estimatedVolume: e.target.value as ProductionVolume })}
                          className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyber-gold shadow-sm cursor-pointer"
                        >
                          <option value="1_5_monthly">1 - 5 Diseños / Proyectos al mes</option>
                          <option value="6_20_monthly">6 - 20 Diseños / Proyectos al mes</option>
                          <option value="20_plus_monthly">Más de 20 (Producción Continua)</option>
                          <option value="exploring">Solo explorando la plataforma</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                {/* Consent & Submit */}
                <div className="pt-2">
                  <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                      className="accent-cyber-gold rounded"
                    />
                    <span>Acepto los Términos de Servicio y la Política de Protección de Datos.</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-base uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>REGISTRAR CLIENTE Y VERIFICAR 2FA</span>
                </button>
              </form>
            ) : (
              /* =========================================================
                 SECCIÓN: INICIAR SESIÓN (DEMOS / SOCIAL / LOGIN RÁPIDO)
                 ========================================================= */
              <div className="space-y-4">
                <div className="flex bg-cyber-950 p-1 rounded-xl border border-cyber-800 text-xs">
                  <button
                    onClick={() => setLoginTab('demo')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                      loginTab === 'demo'
                        ? 'bg-cyber-gold text-black font-semibold shadow-gold-glow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ⚡ Perfiles Demo (1 Clic)
                  </button>
                  <button
                    onClick={() => setLoginTab('social')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                      loginTab === 'social'
                        ? 'bg-cyber-gold text-black font-semibold shadow-gold-glow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🌐 Google / Apple / GitHub
                  </button>
                </div>

                {loginTab === 'demo' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {demoAccounts.map((acc) => {
                      const getBadgeColor = () => {
                        switch (acc.role) {
                          case 'admin':
                            return 'bg-rose-500/20 border-rose-500/40 text-rose-300';
                          case 'agency':
                            return 'bg-purple-500/20 border-purple-500/40 text-purple-300';
                          case 'pro':
                            return 'bg-cyber-gold/20 border-cyber-gold/40 text-cyber-gold';
                          default:
                            return 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300';
                        }
                      };

                      return (
                        <button
                          key={acc.role}
                          onClick={() => handleQuickLogin(acc.role, acc.name, acc.email)}
                          className="group relative flex flex-col items-start p-4 rounded-2xl bg-cyber-850 border border-cyber-700/60 hover:border-cyber-gold/60 hover:bg-cyber-800 transition-all text-left shadow-md hover:shadow-gold-glow"
                        >
                          <div className="flex items-center justify-between w-full mb-2">
                            <div className="flex items-center gap-2">
                              <img
                                src={acc.avatar}
                                alt={acc.name}
                                className="w-8 h-8 rounded-xl object-cover border border-cyber-gold"
                              />
                              <div>
                                <div className="font-tech font-bold text-white text-sm group-hover:text-cyber-gold transition-colors">
                                  {acc.label}
                                </div>
                                <div className="text-[11px] text-slate-400">{acc.name}</div>
                              </div>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeColor()}`}>
                              {acc.price === 0 && acc.role !== 'admin' ? 'FREE' : acc.role === 'admin' ? 'ROOT' : `$${acc.price}/mo`}
                            </span>
                          </div>

                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                            {acc.description}
                          </p>

                          <div className="mt-3 w-full flex items-center justify-between text-[11px] text-slate-400">
                            <span className="flex items-center gap-1 text-emerald-400">
                              <Shield className="w-3 h-3" /> Verificación 2FA
                            </span>
                            <span className="font-semibold text-cyber-gold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              Ingresar <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => handleQuickLogin('pro', 'Google Designer', 'designer@gmail.com')}
                        className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-cyber-950 hover:bg-cyber-850 border border-cyber-700 hover:border-cyber-gold text-xs font-semibold text-white transition-all shadow-sm"
                      >
                        <span className="text-base">🌐</span>
                        <span>Google One / Workspace</span>
                      </button>

                      <button
                        onClick={() => handleQuickLogin('pro', 'Apple Creator', 'creator@icloud.com')}
                        className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-cyber-950 hover:bg-cyber-850 border border-cyber-700 hover:border-cyber-gold text-xs font-semibold text-white transition-all shadow-sm"
                      >
                        <span className="text-base">🍎</span>
                        <span>Apple ID (FaceID)</span>
                      </button>

                      <button
                        onClick={() => handleQuickLogin('agency', 'GitHub 3D Lead', 'dev3d@github.com')}
                        className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-cyber-950 hover:bg-cyber-850 border border-cyber-700 hover:border-cyber-gold text-xs font-semibold text-white transition-all shadow-sm"
                      >
                        <span className="text-base">🐙</span>
                        <span>GitHub OAuth</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-gold/30 space-y-2 text-xs">
                      <div className="text-cyber-gold font-tech font-bold flex items-center gap-1.5">
                        <Fingerprint className="w-4 h-4" /> Base de Datos & Privacidad Garantizada
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        Tus proyectos 3D, archivos .GLB y fichas técnicas se almacenan bajo cifrado AES-256 en la base de datos empresarial de Aether Synergy.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* =========================================================
             PASO 2: VERIFICACIÓN 2FA OTP CON GOOGLE AUTHENTICATOR
             ========================================================= */
          <div className="text-center space-y-4 py-2">
            <div className="w-14 h-14 rounded-2xl bg-cyber-gold/20 border border-cyber-gold flex items-center justify-center text-cyber-gold mx-auto shadow-gold-glow">
              <Smartphone className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-tech font-bold text-white tracking-wide">
                {t('auth.twoFactorTitle')}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Escanea con Google Authenticator o ingresa el código OTP enviado a <strong className="text-white">{formData.email || 'tu dispositivo'}</strong>.
              </p>
            </div>

            {/* QR Code Authenticator Simulator Card */}
            <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-gold/30 max-w-xs mx-auto flex items-center gap-3 text-left">
              <div className="w-16 h-16 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center">
                {/* SVG QR Code Pattern */}
                <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 4h4v4h-4v-4zm4-4h4v4h-4v-4zm-4-4h4v4h-4v-4zm-4 4h4v4h-4v-4z" />
                </svg>
              </div>
              <div className="space-y-0.5 text-[11px] font-mono">
                <span className="text-slate-400 block font-tech uppercase text-[10px]">Clave Secreta TOTP:</span>
                <span className="text-cyber-gold font-bold select-all">AETH-7772-0499-SYNC</span>
                <span className="text-emerald-400 text-[10px] block">✓ Algoritmo SHA-256</span>
              </div>
            </div>

            {/* 6 Digit OTP Input Boxes */}
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 pt-1">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-10 h-12 sm:w-11 sm:h-13 bg-cyber-950 border-2 border-cyber-gold/50 focus:border-cyber-gold rounded-xl text-center text-lg sm:text-xl font-mono font-bold text-cyber-gold focus:outline-none shadow-gold-glow transition-all"
                />
              ))}
            </div>

            {/* Auto-fill demo button */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={() => setOtp(['7', '7', '7', '2', '0', '4'])}
                className="text-xs text-cyber-gold font-mono hover:underline flex items-center gap-1"
              >
                <KeyRound className="w-3.5 h-3.5" /> Autocompletar Código Demo (777-204)
              </button>
              <span className="text-[10px] text-slate-500 font-mono">
                Reenviar código en {timer}s
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="flex-1 py-3 rounded-xl bg-cyber-800 hover:bg-cyber-700 text-slate-300 font-semibold text-xs transition-all"
              >
                Volver al Formulario
              </button>
              <button
                type="button"
                onClick={complete2FAVerification}
                className="flex-2 w-full py-3 rounded-xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-sm uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{authMode === 'register' ? 'Completar Registro y Entrar' : t('auth.verifyBtn')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
