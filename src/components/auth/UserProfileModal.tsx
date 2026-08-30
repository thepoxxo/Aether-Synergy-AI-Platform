import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';
import { X, Sparkles, Shield, Building2, Zap, User as UserIcon, LogOut, CheckCircle2, RefreshCw } from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const { user, isProfileModalOpen, setProfileModalOpen, logout, switchRole } = useAuth();

  if (!isProfileModalOpen || !user) return null;

  const role = user.role;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-cyber-900 border border-cyber-700 rounded-3xl p-6 sm:p-8 shadow-cyber-card overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setProfileModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-cyber-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Card Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-cyber-gold shadow-gold-glow"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-tech font-bold text-white">{user.name}</h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                  role === 'admin'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : role === 'agency'
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                    : role === 'pro'
                    ? 'bg-cyber-gold/20 border-cyber-gold text-cyber-gold'
                    : 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                }`}
              >
                {role}
              </span>
            </div>
            <p className="text-xs text-slate-400">{user.email}</p>
            <p className="text-xs text-cyber-gold mt-0.5">{user.company || 'Estudio de Diseño'}</p>
          </div>
        </div>

        {/* Plan & Usage Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Plan Actual</span>
            <div className="font-tech font-bold text-base text-white mt-0.5">{user.planName}</div>
            <div className="text-[11px] text-cyber-gold font-mono">${user.planPrice} USD/mes</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Créditos de IA</span>
            <div className="font-tech font-bold text-base text-white mt-0.5">
              {user.aiCredits.total > 1000 ? 'Ilimitados ∞' : `${user.aiCredits.total - user.aiCredits.used} restantes`}
            </div>
            <div className="text-[11px] text-slate-400">{user.aiCredits.used} generados este mes</div>
          </div>
        </div>

        {/* Quick Plan Switcher for Demo testing */}
        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-2 flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-cyber-gold" /> Cambiar Plan en Vivo (Simulador Demo)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['free', 'pro', 'agency', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={`py-2 px-1 rounded-xl border text-xs font-bold capitalize transition-all ${
                  role === r
                    ? 'bg-cyber-gold text-black border-cyber-gold shadow-gold-glow'
                    : 'bg-cyber-950 border-cyber-800 text-slate-400 hover:text-white hover:border-cyber-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              logout();
              setProfileModalOpen(false);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-semibold text-xs hover:bg-rose-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
          <button
            onClick={() => setProfileModalOpen(false)}
            className="flex-1 py-2.5 rounded-xl bg-cyber-800 hover:bg-cyber-700 text-white font-semibold text-xs transition-all"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
