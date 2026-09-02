import React, { useState } from 'react';
import {
  ShieldAlert,
  Clock,
  Sparkles,
  ArrowLeft,
  Bell,
  CheckCircle2,
  Lock,
  Cpu,
  RefreshCw,
  Zap,
  Layers,
  ExternalLink
} from 'lucide-react';
import { ModuleStagingConfig } from '../../types/moduleStaging';
import { moduleStagingService } from '../../services/moduleStagingService';

interface ModuleMaintenanceScreenProps {
  moduleConfig: ModuleStagingConfig;
  userRole: string;
  onNavigateToDesign: () => void;
  onReload: () => void;
}

export const ModuleMaintenanceScreen: React.FC<ModuleMaintenanceScreenProps> = ({
  moduleConfig,
  userRole,
  onNavigateToDesign,
  onReload
}) => {
  const [emailSubscribed, setEmailSubscribed] = useState<boolean>(false);
  const [inputEmail, setInputEmail] = useState<string>('');
  const isMaintenance = moduleConfig.status === 'maintenance';
  const isComingSoon = moduleConfig.status === 'coming_soon';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputEmail.includes('@')) {
      setEmailSubscribed(true);
    }
  };

  const handleAdminBypass = () => {
    moduleStagingService.setAdminOverride(true);
    onReload();
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 lg:p-8 animate-fadeIn text-white font-sans">
      <div className="max-w-2xl w-full bg-cyber-900/95 border border-cyber-gold/40 rounded-3xl p-6 sm:p-10 shadow-cyber-card backdrop-blur-2xl text-center space-y-6 relative overflow-hidden">
        {/* Glow ambient circle */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyber-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Icon & Status Tag */}
        <div className="flex flex-col items-center gap-3">
          <div
            className={`p-4 rounded-3xl border shadow-gold-glow flex items-center justify-center ${
              isMaintenance
                ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                : 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
            }`}
          >
            {isMaintenance ? <RefreshCw className="w-10 h-10 animate-spin" /> : <Clock className="w-10 h-10" />}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-mono font-extrabold px-3 py-1 rounded-full border ${
                isMaintenance
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
              }`}
            >
              {isMaintenance ? '🛠️ ACTUALIZACIÓN EN PROGRESO' : `⏳ FASE ${moduleConfig.phase} - PRÓXIMAMENTE`}
            </span>
            <span className="text-[10px] font-mono text-slate-400 bg-cyber-950 px-2.5 py-1 rounded-full border border-cyber-800">
              v{moduleConfig.version}
            </span>
          </div>
        </div>

        {/* Title and message */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-tech font-extrabold text-white tracking-wide">
            {moduleConfig.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            {isMaintenance
              ? moduleConfig.maintenanceMessage ||
                'Estamos implementando mejoras y actualizando los conectores neuronales de IA en este módulo. Estará disponible en unos instantes sin afectar el resto de la plataforma.'
              : `Este módulo forma parte de la Fase ${moduleConfig.phase} del despliegue gradual de Aether Synergy. Actualmente el módulo central de Diseño 3D y el Núcleo JARVIS están activos.`}
          </p>
        </div>

        {/* Feature Teaser Note */}
        {moduleConfig.changelogNote && (
          <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 text-left font-mono text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-cyber-gold font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Novedades en desarrollo para este módulo:</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {moduleConfig.changelogNote}
            </p>
          </div>
        )}

        {/* Notification Subscription or Early Access */}
        <div className="pt-2">
          {emailSubscribed ? (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>¡Listo! Te notificaremos inmediatamente cuando este módulo se active.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ingresa tu email para aviso de lanzamiento..."
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-cyber-950 border border-cyber-800 text-white font-mono text-xs focus:outline-none focus:border-cyber-gold"
                required
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-2xl bg-cyber-gold text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                <Bell className="w-3.5 h-3.5" /> Notificarme
              </button>
            </form>
          )}
        </div>

        {/* Action Buttons: Return to 3D Design or Admin Override */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-cyber-800">
          <button
            onClick={onNavigateToDesign}
            className="px-5 py-2.5 rounded-2xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-800 text-slate-300 hover:text-white font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Ir a Aurora 3D Studio (Disponible)
          </button>

          {/* If the current user is an admin, show bypass button */}
          {userRole === 'admin' && (
            <button
              onClick={handleAdminBypass}
              className="px-4 py-2.5 rounded-2xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-300 font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" /> Modo Admin: Previsualizar Módulo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
