import React, { useState, useEffect } from 'react';
import {
  Layers,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  RefreshCw,
  Lock,
  Sliders,
  Sparkles,
  Search,
  Filter,
  Eye,
  EyeOff,
  AlertTriangle,
  RotateCcw,
  Rocket,
  Check,
  ChevronDown,
  ChevronRight,
  Save
} from 'lucide-react';
import {
  ModuleAvailabilityStatus,
  ModuleStagingConfig,
  RolloutPreset
} from '../../types/moduleStaging';
import { moduleStagingService } from '../../services/moduleStagingService';

export const ModuleStagingAdmin: React.FC = () => {
  const [modules, setModules] = useState<ModuleStagingConfig[]>([]);
  const [activePreset, setActivePreset] = useState<RolloutPreset>('all_enabled_production');
  const [adminOverride, setAdminOverride] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [customMaintenanceMsg, setCustomMaintenanceMsg] = useState<string>('');
  const [customReleaseDate, setCustomReleaseDate] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('aether_staging_updated', handleUpdate);
    return () => window.removeEventListener('aether_staging_updated', handleUpdate);
  }, []);

  const loadData = () => {
    setModules(moduleStagingService.getModules());
    setActivePreset(moduleStagingService.getActivePreset());
    setAdminOverride(moduleStagingService.getAdminOverride());
  };

  const handlePresetSelect = (preset: RolloutPreset) => {
    moduleStagingService.applyPreset(preset);
    loadData();
    showFeedback();
  };

  const handleStatusChange = (moduleId: string, newStatus: ModuleAvailabilityStatus) => {
    moduleStagingService.updateModuleStatus(moduleId, newStatus);
    loadData();
  };

  const handleCategoryStatusChange = (category: string, newStatus: ModuleAvailabilityStatus) => {
    moduleStagingService.updateCategoryStatus(category, newStatus);
    loadData();
    showFeedback();
  };

  const handleToggleAdminOverride = () => {
    const newVal = !adminOverride;
    moduleStagingService.setAdminOverride(newVal);
    setAdminOverride(newVal);
  };

  const handleSaveDetails = (moduleId: string) => {
    moduleStagingService.updateModuleStatus(moduleId, moduleStagingService.getModuleStatus(moduleId), {
      maintenanceMessage: customMaintenanceMsg,
      estimatedAvailableDate: customReleaseDate
    });
    setEditingModuleId(null);
    loadData();
    showFeedback();
  };

  const showFeedback = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const categories = [
    { id: 'all', title: 'Todos los Módulos' },
    { id: 'design_studio', title: '🎨 3D & Brand Studio' },
    { id: 'marketing', title: '🎬 Marketing & Video Ads' },
    { id: 'ecommerce_factory', title: '🛍️ E-Commerce & Fábrica B2B' },
    { id: 'ai_teams', title: '🤖 Agentes IA & Agencias' },
    { id: 'ecosystem', title: '🌐 Ecosistema & Admin' }
  ];

  const filteredModules = modules.filter((mod) => {
    const matchesCat = selectedCategory === 'all' || mod.category === selectedCategory;
    const matchesSearch =
      mod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeCount = modules.filter((m) => m.status === 'active').length;
  const comingSoonCount = modules.filter((m) => m.status === 'coming_soon').length;
  const maintenanceCount = modules.filter((m) => m.status === 'maintenance').length;

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn text-white">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/95 p-6 rounded-3xl border border-cyber-gold/40 shadow-cyber-card backdrop-blur-2xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold shadow-gold-glow">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-widest">
                CONTROL DE DESPLIEGUE MODULAR & MANTENIMIENTO
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/50">
                FEATURE FLAGS V1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Administra la disponibilidad de cada módulo de forma 100% independiente para lanzamientos graduales y mantenimiento sin caídas
            </p>
          </div>
        </div>

        {/* Master Admin Bypass Switch */}
        <div className="flex items-center gap-3 bg-cyber-950 p-2 rounded-2xl border border-cyber-800">
          <div className="text-right">
            <span className="text-[11px] font-mono text-slate-300 block font-bold">Modo Bypass Admin:</span>
            <span className="text-[10px] text-slate-500 block">
              {adminOverride ? 'Viendo todos los módulos' : 'Vista idéntica a usuarios'}
            </span>
          </div>
          <button
            onClick={handleToggleAdminOverride}
            className={`px-3 py-1.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              adminOverride
                ? 'bg-purple-500 text-white shadow-[0_0_15px_#a855f7]'
                : 'bg-cyber-900 text-slate-400 hover:text-white border border-cyber-800'
            }`}
          >
            {adminOverride ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{adminOverride ? 'BYPASS ACTIVO' : 'NORMAL'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-cyber-900 border border-cyber-800 shadow-cyber-card flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Módulos Activos (Público)</span>
            <span className="text-2xl font-tech font-extrabold text-emerald-400">{activeCount} / {modules.length}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyber-900 border border-cyber-800 shadow-cyber-card flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">En Próximamente (Fase 2)</span>
            <span className="text-2xl font-tech font-extrabold text-cyan-400">{comingSoonCount} Módulos</span>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyber-900 border border-cyber-800 shadow-cyber-card flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">En Mantenimiento</span>
            <span className="text-2xl font-tech font-extrabold text-amber-400">{maintenanceCount} Módulos</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
            <RefreshCw className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyber-900 border border-cyber-800 shadow-cyber-card flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Preset Global Activo</span>
            <span className="text-sm font-tech font-extrabold text-cyber-gold truncate">
              {activePreset === 'initial_mvp_design_only'
                ? '🚀 Lanzamiento Inicial MVP'
                : activePreset === 'all_enabled_production'
                ? '🌟 Todos los Módulos Activos'
                : '🛠️ Mantenimiento Global'}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-cyber-gold/20 text-cyber-gold">
            <Rocket className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 1-Click Rollout Presets Card */}
      <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-gold/40 shadow-cyber-card space-y-4">
        <div>
          <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
            <Rocket className="w-5 h-5 text-cyber-gold" /> Ajustes Rápidos de Lanzamiento en 1 Clic (Presets)
          </h3>
          <p className="text-xs text-slate-400">
            Aplica configuraciones instantáneas para lanzar tu plataforma con solo el módulo de diseño activo y habilitar los demás cuando desees
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handlePresetSelect('initial_mvp_design_only')}
            className={`p-4 rounded-2xl border text-left transition-all space-y-2 relative group ${
              activePreset === 'initial_mvp_design_only'
                ? 'bg-cyber-gold/15 border-cyber-gold shadow-gold-glow'
                : 'bg-cyber-950 border-cyber-800 hover:border-cyber-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-tech font-extrabold text-cyber-gold">🚀 LANZAMIENTO INICIAL MVP</span>
              {activePreset === 'initial_mvp_design_only' && (
                <span className="text-[9px] font-mono bg-cyber-gold text-black px-2 py-0.5 rounded font-bold">ACTIVO</span>
              )}
            </div>
            <p className="text-[11px] text-slate-300">
              Solo activa el <strong>Estudio 3D, BrandKit y JARVIS</strong>. Todos los demás módulos mostrarán pantalla de "Próximamente Fase 2".
            </p>
          </button>

          <button
            onClick={() => handlePresetSelect('all_enabled_production')}
            className={`p-4 rounded-2xl border text-left transition-all space-y-2 relative group ${
              activePreset === 'all_enabled_production'
                ? 'bg-emerald-500/15 border-emerald-500 shadow-[0_0_15px_#10b98140]'
                : 'bg-cyber-950 border-cyber-800 hover:border-cyber-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-tech font-extrabold text-emerald-400">🌟 PRODUCCIÓN COMPLETA</span>
              {activePreset === 'all_enabled_production' && (
                <span className="text-[9px] font-mono bg-emerald-500 text-black px-2 py-0.5 rounded font-bold">ACTIVO</span>
              )}
            </div>
            <p className="text-[11px] text-slate-300">
              Habilita todos los 23 módulos de la plataforma simultáneamente para los usuarios según su plan de pago.
            </p>
          </button>

          <button
            onClick={() => handlePresetSelect('maintenance_lockdown')}
            className={`p-4 rounded-2xl border text-left transition-all space-y-2 relative group ${
              activePreset === 'maintenance_lockdown'
                ? 'bg-amber-500/15 border-amber-500 shadow-[0_0_15px_#f59e0b40]'
                : 'bg-cyber-950 border-cyber-800 hover:border-cyber-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-tech font-extrabold text-amber-400">🛠️ MANTENIMIENTO GLOBAL</span>
              {activePreset === 'maintenance_lockdown' && (
                <span className="text-[9px] font-mono bg-amber-500 text-black px-2 py-0.5 rounded font-bold">ACTIVO</span>
              )}
            </div>
            <p className="text-[11px] text-slate-300">
              Bloquea todos los módulos con aviso de mantenimiento por actualización mientras tú sigues con acceso como Administrador.
            </p>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyber-gold text-black shadow-gold-glow font-bold'
                  : 'bg-cyber-900 text-slate-400 hover:text-white border border-cyber-800'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Buscar módulo por nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-4 py-2 rounded-xl bg-cyber-900 border border-cyber-800 text-white text-xs font-mono focus:outline-none focus:border-cyber-gold w-64"
          />
        </div>
      </div>

      {/* Success Banner */}
      {savedSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>¡Estados de disponibilidad actualizados con éxito en toda la plataforma!</span>
        </div>
      )}

      {/* Granular Module Table / List */}
      <div className="space-y-3">
        {filteredModules.map((mod) => {
          const isEditing = editingModuleId === mod.id;

          const statusStyles: Record<ModuleAvailabilityStatus, { bg: string; text: string; border: string; label: string }> = {
            active: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/40', label: '🟢 Activo' },
            coming_soon: { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-500/40', label: '⏳ Próximamente' },
            maintenance: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/40', label: '🛠️ Mantenimiento' },
            disabled: { bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/40', label: '🔒 Deshabilitado' }
          };

          const currentStyle = statusStyles[mod.status];

          return (
            <div
              key={mod.id}
              className="p-4 sm:p-5 rounded-2xl bg-cyber-900 border border-cyber-800 hover:border-cyber-750 transition-all shadow-cyber-card space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h4 className="font-tech font-bold text-sm text-white">{mod.name}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-950 text-slate-400 border border-cyber-800">
                      ID: {mod.id}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-950 text-cyber-gold border border-cyber-800">
                      Fase {mod.phase}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    Categoría: <span className="text-slate-300">{mod.categoryTitle}</span>
                  </p>
                </div>

                {/* 4-State Quick Toggle Buttons */}
                <div className="flex items-center gap-1.5 bg-cyber-950 p-1.5 rounded-2xl border border-cyber-800">
                  {(['active', 'coming_soon', 'maintenance', 'disabled'] as ModuleAvailabilityStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(mod.id, st)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all ${
                        mod.status === st
                          ? `${statusStyles[st].bg} ${statusStyles[st].text} border ${statusStyles[st].border} shadow-sm`
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {statusStyles[st].label}
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      if (isEditing) {
                        setEditingModuleId(null);
                      } else {
                        setEditingModuleId(mod.id);
                        setCustomMaintenanceMsg(mod.maintenanceMessage || '');
                        setCustomReleaseDate(mod.estimatedAvailableDate || '');
                      }
                    }}
                    className="px-2.5 py-1.5 rounded-xl text-[11px] font-mono bg-cyber-900 hover:bg-cyber-800 text-slate-300 border border-cyber-800"
                  >
                    {isEditing ? 'Cerrar' : 'Detalles'}
                  </button>
                </div>
              </div>

              {/* Editing drawer for custom messages and dates */}
              {isEditing && (
                <div className="p-4 rounded-xl bg-cyber-950 border border-cyber-gold/30 font-mono text-xs space-y-3 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">Mensaje Personalizado de Mantenimiento:</label>
                      <input
                        type="text"
                        placeholder="Ej: Actualizando servidores de render 4K..."
                        value={customMaintenanceMsg}
                        onChange={(e) => setCustomMaintenanceMsg(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-cyber-900 border border-cyber-800 text-white text-xs focus:outline-none focus:border-cyber-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">Fecha / Texto Estimado de Disponibilidad:</label>
                      <input
                        type="text"
                        placeholder="Ej: Próximamente en Fase 2 (Noviembre 2026)"
                        value={customReleaseDate}
                        onChange={(e) => setCustomReleaseDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-cyber-900 border border-cyber-800 text-white text-xs focus:outline-none focus:border-cyber-gold"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleSaveDetails(mod.id)}
                      className="px-4 py-1.5 rounded-xl bg-cyber-gold text-black font-bold text-xs flex items-center gap-1 shadow-gold-glow"
                    >
                      <Save className="w-3.5 h-3.5" /> Guardar Mensajes
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
