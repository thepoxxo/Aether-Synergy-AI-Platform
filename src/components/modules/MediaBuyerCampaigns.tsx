import React, { useState } from 'react';
import {
  TrendingUp,
  Flame,
  Target,
  DollarSign,
  Film,
  Sparkles,
  Download,
  Copy,
  Layers,
  CheckCircle2,
  BarChart3,
  Sliders,
  Volume2,
  VolumeX,
  Smartphone,
  Eye,
  ArrowRight,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';

export const MediaBuyerCampaigns: React.FC = () => {
  const [dailyBudget, setDailyBudget] = useState<number>(50);
  const [productPrice, setProductPrice] = useState<number>(128);
  const [activeTab, setActiveTab] = useState<'roas' | 'storyboard' | 'subtitles' | 'comparison' | 'amazon'>('roas');

  // ROAS & Budget Calculator Metrics
  const estimatedCPA = 24.50; // Cost Per Acquisition
  const estimatedDailySales = Math.round((dailyBudget / estimatedCPA) * 10) / 10;
  const estimatedDailyRevenue = Math.round(estimatedDailySales * productPrice);
  const estimatedROAS = dailyBudget > 0 ? (estimatedDailyRevenue / dailyBudget).toFixed(2) : '0';
  const monthlyProfit = Math.round((estimatedDailyRevenue - dailyBudget - (estimatedDailySales * 28.5)) * 30);

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-6 rounded-3xl border border-rose-500/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                MEDIA BUYER & AI CAMPAIGN SUITE (META & TIKTOK ADS)
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/50">
                ROAS PREDICTOR + STORYBOARD 3-ACTOS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Optimización publicitaria de élite: calculadora de retorno de pauta, storyboards de conversión y paquetes listos para TikTok Ads
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('¡Paquete de Campaña para TikTok Ads & Meta Ads exportado (.ZIP con Videos, Ganchos, Copys y Segmentación)!')}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:opacity-90 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Campaña TikTok/Meta (.ZIP)</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-cyber-950 p-2 rounded-2xl border border-cyber-800 text-xs">
        {[
          { id: 'roas', label: 'Calculadora ROAS & Pauta', icon: DollarSign },
          { id: 'storyboard', label: 'Storyboard de 3 Actos', icon: Film },
          { id: 'subtitles', label: 'Subtítulos Hormozi Style', icon: Sparkles },
          { id: 'comparison', label: 'Comparador "Nosotros vs Otros"', icon: Layers },
          { id: 'amazon', label: 'Ficha Amazon / MercadoLibre', icon: ShoppingBag }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-tech font-bold transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-rose-500 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-cyber-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: ROAS & Media Buying Predictor */}
      {activeTab === 'roas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
          {/* Controls */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
            <h3 className="font-tech font-bold text-base text-white">Parámetros de Inversión Diaria</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Presupuesto Diario en Pauta:</span>
                  <span className="text-emerald-400 font-bold text-sm">${dailyBudget} USD / día</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={dailyBudget}
                  onChange={(e) => setDailyBudget(parseInt(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Precio de Venta Producto (MSRP):</span>
                  <span className="text-cyber-gold font-bold text-sm">${productPrice} USD</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="350"
                  step="5"
                  value={productPrice}
                  onChange={(e) => setProductPrice(parseInt(e.target.value))}
                  className="w-full accent-cyber-gold"
                />
              </div>

              <div className="p-3.5 bg-cyber-950 rounded-2xl border border-cyber-800 space-y-1 text-[11px] text-slate-400">
                <div className="flex justify-between text-white">
                  <span>CPA Estimado (Costo por Compra):</span>
                  <span className="text-rose-400 font-bold">${estimatedCPA} USD</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Costo Unitario Fábrica (Landed):</span>
                  <span className="text-slate-400">$28.50 USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results KPI Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-1 shadow-cyber-card flex flex-col justify-between">
              <span className="text-slate-400">ROAS Estimado (Retorno)</span>
              <span className="text-4xl font-tech font-extrabold text-emerald-400 leading-none">{estimatedROAS}x</span>
              <span className="text-[10px] text-emerald-300 font-bold">Por cada $1 inviertes obtienes ${estimatedROAS}</span>
            </div>

            <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-1 shadow-cyber-card flex flex-col justify-between">
              <span className="text-slate-400">Facturación Estimada (30D)</span>
              <span className="text-3xl font-tech font-extrabold text-cyan-300 leading-none">
                ${(estimatedDailyRevenue * 30).toLocaleString()} USD
              </span>
              <span className="text-[10px] text-cyan-400 font-bold">~{Math.round(estimatedDailySales * 30)} pedidos / mes</span>
            </div>

            <div className="p-5 rounded-3xl bg-cyber-900 border border-emerald-500/50 space-y-1 shadow-cyber-card sm:col-span-2 flex flex-col justify-between">
              <span className="text-slate-400">Beneficio Neto Limpio Mensual (Ganancia)</span>
              <span className="text-4xl font-tech font-extrabold text-emerald-400 leading-none">
                +${monthlyProfit.toLocaleString()} USD
              </span>
              <span className="text-[10px] text-slate-300">Descontando costos de pauta de Meta/TikTok y confección de fábrica</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 3-Act Storyboard Scriptwriter */}
      {activeTab === 'storyboard' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Act 1 */}
            <div className="p-5 rounded-3xl bg-cyber-900 border border-rose-500/50 space-y-2 shadow-cyber-card">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">ACTO 1 • 0 - 3 SEGUNDOS</span>
                <Flame className="w-4 h-4 text-rose-400" />
              </div>
              <h4 className="font-tech font-bold text-sm text-white">EL GANCHO DISRUPTIVO (HOOK)</h4>
              <p className="text-slate-300 text-[11px]">
                <strong>Visual:</strong> Modelo arrojando un vaso de agua con café directamente sobre la chaqueta. El líquido resbala sin manchar en cámara lenta 60 FPS.
              </p>
              <div className="p-2.5 bg-cyber-950 rounded-xl text-[10px] text-rose-300">
                <strong>Voz en Off:</strong> "¿Por qué las marcas de lujo te cobran $1,200 por esto cuando la tecnología textil real cuesta 10 veces menos?"
              </div>
            </div>

            {/* Act 2 */}
            <div className="p-5 rounded-3xl bg-cyber-900 border border-cyan-500/50 space-y-2 shadow-cyber-card">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">ACTO 2 • 3 - 10 SEGUNDOS</span>
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="font-tech font-bold text-sm text-white">DEMOSTRACIÓN TÉCNICA (PROOF)</h4>
              <p className="text-slate-300 text-[11px]">
                <strong>Visual:</strong> Zoom 3D a la cremallera YKK termosellada y despiece de la capucha modular desacoplándose con un clic magnético.
              </p>
              <div className="p-2.5 bg-cyber-950 rounded-xl text-[10px] text-cyan-300">
                <strong>Voz en Off:</strong> "Nylon ripstop de 3 capas, 20,000mm de impermeabilidad y confeccionada directamente en Oporto."
              </div>
            </div>

            {/* Act 3 */}
            <div className="p-5 rounded-3xl bg-cyber-900 border border-emerald-500/50 space-y-2 shadow-cyber-card">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">ACTO 3 • 10 - 15 SEGUNDOS</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="font-tech font-bold text-sm text-white">OFERTA IRRESISTIBLE (CTA)</h4>
              <p className="text-slate-300 text-[11px]">
                <strong>Visual:</strong> Modelo caminando con seguridad hacia cámara con badge flotante "30% OFF + Envío Express 24h".
              </p>
              <div className="p-2.5 bg-cyber-950 rounded-xl text-[10px] text-emerald-300">
                <strong>Voz en Off:</strong> "Solo 42 unidades disponibles en este lote. Toca el enlace abajo y pruébala sin riesgo por 30 días."
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Dynamic Animated Subtitles (Hormozi Style) */}
      {activeTab === 'subtitles' && (
        <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card font-mono text-xs">
          <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyber-gold" /> Subtítulos Dinámicos de Alto Impacto (CapCut / Hormozi Style)
          </h3>
          <div className="p-8 bg-black rounded-2xl border border-white/20 text-center space-y-4">
            <div className="text-xl sm:text-2xl font-tech font-extrabold tracking-wider leading-relaxed">
              ESTA PRENDA <span className="text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-lg border border-cyan-400">REPELERÁ</span> CUALQUIER TORMENTA CON <span className="text-cyber-gold bg-amber-950 px-2 py-0.5 rounded-lg border border-cyber-gold">20,000 MM</span>
            </div>
            <span className="text-[11px] text-slate-400 block">Animación de palabras clave con escala 1.2X y color contrastante sincronizado con la voz</span>
          </div>
        </div>
      )}

      {/* Tab 4: Interactive Comparison ("Us vs Others") */}
      {activeTab === 'comparison' && (
        <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card font-mono text-xs">
          <h3 className="font-tech font-bold text-base text-white">Tabla de Comparación para Tienda E-Commerce</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-cyber-800 text-slate-400">
                  <th className="pb-2 font-tech font-bold">Característica</th>
                  <th className="pb-2 font-tech font-bold text-emerald-400">Tu Marca (Aether Synergy)</th>
                  <th className="pb-2 font-tech font-bold text-slate-400">Marcas Tradicionales de Lujo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-800/60">
                <tr>
                  <td className="py-2.5 text-white">Precio al Consumidor</td>
                  <td className="py-2.5 text-emerald-400 font-bold">$128 USD (Justo)</td>
                  <td className="py-2.5 text-rose-400">$1,200+ USD (Sobreprecio)</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-white">Material & Gramaje</td>
                  <td className="py-2.5 text-emerald-400 font-bold">Algodón Orgánico 460 GSM GOTS</td>
                  <td className="py-2.5 text-slate-400">Poliéster sintético estándar</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-white">Pasaporte Digital EU 2026</td>
                  <td className="py-2.5 text-emerald-400 font-bold">✓ Código QR con trazabilidad</td>
                  <td className="py-2.5 text-rose-400">❌ Sin información ambiental</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-white">Garantía de Satisfacción</td>
                  <td className="py-2.5 text-emerald-400 font-bold">✓ 30 Días de Prueba Libre</td>
                  <td className="py-2.5 text-slate-400">14 días restrictivos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Amazon / MercadoLibre Product Sheet */}
      {activeTab === 'amazon' && (
        <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card font-mono text-xs">
          <h3 className="font-tech font-bold text-base text-white">Ficha de Producto Optimizada para Amazon & Mercado Libre</h3>
          <div className="space-y-3">
            <div className="p-3.5 bg-cyber-950 rounded-xl border border-cyber-800">
              <span className="text-slate-500 text-[10px] block">Título SEO Optimizado:</span>
              <p className="text-white font-bold text-xs mt-0.5">
                Chaqueta Techwear Impermeable para Hombre y Mujer • Cortavientos Modular con Capucha Desmontable 20,000mm
              </p>
            </div>
            <div className="p-3.5 bg-cyber-950 rounded-xl border border-cyber-800 space-y-1 text-slate-300">
              <span className="text-slate-500 text-[10px] block">Bullet Points de Amazon (5 Viñetas Clave):</span>
              <p>• 🌧️ <strong>100% IMPERMEABLE:</strong> Membrana de 3 capas que repele tormentas y viento.</p>
              <p>• 🧵 <strong>TEJIDO PESADO 460 GSM:</strong> Algodón orgánico premium peinado de tacto ultra suave.</p>
              <p>• ⚡ <strong>CREMALLERAS YKK TERMOSELLADAS:</strong> Deslizamiento suave sin filtraciones de agua.</p>
              <p>• 🔒 <strong>GARANTÍA TOTAL:</strong> Cambios y devoluciones gratis en 24-48 horas.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
