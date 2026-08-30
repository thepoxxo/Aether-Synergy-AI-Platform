import React, { useState } from 'react';
import {
  TrendingUp,
  Flame,
  DollarSign,
  BarChart3,
  Sparkles,
  PieChart,
  Users,
  Target,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

export const TrendForecaster: React.FC = () => {
  const [selectedNiche, setSelectedNiche] = useState<string>('techwear');

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-6 rounded-3xl border border-emerald-500/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                PREDICTOR DE TENDENCIAS & VENTAS IA 2026/2027
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                WGSN + TIKTOK SIGNALS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Inteligencia comercial predictiva que calcula la probabilidad de éxito, precio óptimo y volumen de ventas de tu diseño
            </p>
          </div>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-cyber-950 border border-cyber-800 text-right">
          <span className="text-2xl font-tech font-extrabold text-emerald-400 block leading-none">96 / 100</span>
          <span className="text-[10px] font-mono text-slate-400">Score de Viralidad Comercial</span>
        </div>
      </div>

      {/* 4 Core Forecast KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        {/* KPI 1 */}
        <div className="p-4 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-1 shadow-cyber-card">
          <div className="flex items-center justify-between text-slate-400">
            <span>Precio Óptimo (MSRP)</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-tech font-extrabold text-white">$128.00 USD</div>
          <div className="text-[10px] text-emerald-400 font-bold">Margen Bruto: 77.7% ($99.50)</div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-1 shadow-cyber-card">
          <div className="flex items-center justify-between text-slate-400">
            <span>Proyección Ventas (30D)</span>
            <BarChart3 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-tech font-extrabold text-white">840 unidades</div>
          <div className="text-[10px] text-cyan-300 font-bold">~$107,520 USD Facturación</div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-1 shadow-cyber-card">
          <div className="flex items-center justify-between text-slate-400">
            <span>Volumen Social TikTok</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-tech font-extrabold text-white">2.8B Vistas</div>
          <div className="text-[10px] text-rose-400 font-bold">+184% Crecimiento Mensual</div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-1 shadow-cyber-card">
          <div className="flex items-center justify-between text-slate-400">
            <span>Demografía Clave</span>
            <Target className="w-4 h-4 text-cyber-gold" />
          </div>
          <div className="text-2xl font-tech font-extrabold text-white">18 - 32 años</div>
          <div className="text-[10px] text-cyber-gold font-bold">Gen-Z (58%) • Millennials (34%)</div>
        </div>
      </div>

      {/* Deep Analytics & Market Intelligence (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Trend Radar & Color Momentum */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
          <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyber-gold" /> Radar de Tendencias WGSN 2026/2027
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Color Primario: Cyber Gold (#E5A93C)</span>
                <span className="text-cyber-gold font-bold">98% Trending (Muy Alta Demanda)</span>
              </div>
              <div className="w-full h-2 bg-cyber-950 rounded-full overflow-hidden">
                <div className="h-full bg-cyber-gold w-[98%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Silueta: Oversized Boxy Cut con Capucha Modular</span>
                <span className="text-cyan-400 font-bold">92% Preferencia</span>
              </div>
              <div className="w-full h-2 bg-cyber-950 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-[92%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Material: Algodón Pesado 460 GSM + Acabado Hidrofóbico</span>
                <span className="text-emerald-400 font-bold">95% Aprobación</span>
              </div>
              <div className="w-full h-2 bg-cyber-950 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[95%]" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 text-xs">
            <span className="font-bold text-slate-300 block">Hashtags Recomendados para Campañas Virales:</span>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-cyan-300">
              {['#techwear2026', '#aether3d', '#streetwearluxury', '#gotsorganic', '#avantgarde', '#cyberpunk'].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-cyber-900 border border-cyber-700">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Competitor Benchmarking */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
          <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" /> Comparativa con el Mercado (Benchmark)
          </h3>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">Acronym / Errolson Hugh</span>
                <span className="text-slate-500 text-[10px]">Chaqueta Técnica Gore-Tex</span>
              </div>
              <span className="text-slate-300 font-bold">$1,250.00 USD</span>
            </div>

            <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">Balenciaga</span>
                <span className="text-slate-500 text-[10px]">Bomber Jacket Pasarela</span>
              </div>
              <span className="text-slate-300 font-bold">$1,850.00 USD</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-between">
              <div>
                <span className="text-emerald-400 font-bold block">Tu Marca con Aether Synergy</span>
                <span className="text-slate-400 text-[10px]">Landed $28.50 • Venta Directa</span>
              </div>
              <span className="text-emerald-300 font-bold text-base">$128.00 USD</span>
            </div>
          </div>

          <button
            onClick={() => alert('¡Estrategia de lanzamiento y calendario de precios exportado en PDF!')}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.4)] hover:opacity-90 transition-all"
          >
            Exportar Plan de Go-To-Market (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
