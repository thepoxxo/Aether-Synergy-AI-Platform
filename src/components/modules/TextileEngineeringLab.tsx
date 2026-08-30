import React, { useState } from 'react';
import {
  Scissors,
  FileText,
  Activity,
  Wind,
  ShieldCheck,
  Download,
  Flame,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Building,
  DollarSign,
  Send,
  Lock
} from 'lucide-react';

export const TextileEngineeringLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lab' | 'nesting' | 'proforma' | 'samples'>('lab');
  const [fabricGSM, setFabricGSM] = useState<number>(460);
  const [fabricComposition, setFabricComposition] = useState<string>('100% Algodón Orgánico Peinado');

  // Shrinkage & Breathability metrics
  const estimatedShrinkageLength = '2.1%';
  const estimatedShrinkageWidth = '1.4%';
  const breathabilityCFM = Math.max(12, Math.round((600 - fabricGSM) / 8));
  const martindaleCycles = '45,000 Ciclos (Resistencia Extrema Grado Industrial)';

  const [sampleStatus, setSampleStatus] = useState<'approved' | 'adjust' | 'rejected'>('approved');

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-6 rounded-3xl border border-emerald-500/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                LABORATORIO TEXTIL & FACTURACIÓN PROFORMA B2B
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                MARTINDALE + ENCOGIMIENTO + FACTURA INCOTERMS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulaciones de laboratorio textil de alto rigor, optimización de corte (nesting) y facturas proforma internacionales
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('¡Dossier Técnico de Laboratorio Textil y Factura Proforma FOB descargada en PDF!')}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:opacity-90 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Certificado Textil (PDF)</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-cyber-950 p-2 rounded-2xl border border-cyber-800 text-xs">
        {[
          { id: 'lab', label: 'Pruebas de Laboratorio & Fricción', icon: Activity },
          { id: 'nesting', label: 'Optimización de Corte (Nesting)', icon: Scissors },
          { id: 'proforma', label: 'Factura Proforma & Incoterms', icon: FileText },
          { id: 'samples', label: 'Aprobación de Muestras Físicas', icon: CheckCircle2 }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-tech font-bold transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-emerald-400 text-black shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-cyber-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Lab Tests & Friction */}
      {activeTab === 'lab' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
          {/* Controls */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
            <h3 className="font-tech font-bold text-base text-white">Configuración del Tejido</h3>
            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Gramaje Textil (GSM): {fabricGSM} g/m²</label>
                <input
                  type="range"
                  min="180"
                  max="600"
                  step="10"
                  value={fabricGSM}
                  onChange={(e) => setFabricGSM(parseInt(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div className="p-3.5 bg-cyber-950 rounded-2xl border border-cyber-800 space-y-1 text-slate-300">
                <span className="text-slate-500 text-[10px] block">Composición Química:</span>
                <p className="font-bold text-white text-xs">{fabricComposition}</p>
              </div>

              <div className="p-3.5 bg-cyber-950 rounded-2xl border border-cyber-800 space-y-1 text-slate-300">
                <span className="text-slate-500 text-[10px] block">Prueba de Encogimiento (AATCC 135):</span>
                <p>• Largo: <strong className="text-emerald-400">{estimatedShrinkageLength}</strong> (Excelente)</p>
                <p>• Ancho: <strong className="text-emerald-400">{estimatedShrinkageWidth}</strong> (Estable)</p>
              </div>
            </div>
          </div>

          {/* Results KPI Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-1 shadow-cyber-card flex flex-col justify-between">
              <span className="text-slate-400">Resistencia a la Abrasión (Martindale)</span>
              <span className="text-3xl font-tech font-extrabold text-emerald-400 leading-none">45,000</span>
              <span className="text-[10px] text-emerald-300 font-bold">Ciclos sin pilling ni rotura (ISO 12947)</span>
            </div>

            <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-1 shadow-cyber-card flex flex-col justify-between">
              <span className="text-slate-400">Transpirabilidad & Flujo de Aire</span>
              <span className="text-3xl font-tech font-extrabold text-cyan-300 leading-none">{breathabilityCFM} CFM</span>
              <span className="text-[10px] text-cyan-400 font-bold">Evacuación térmica de alto rendimiento</span>
            </div>

            <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-1 shadow-cyber-card sm:col-span-2">
              <span className="text-slate-400">Certificaciones Ambientales Asignadas:</span>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 text-[10px] font-bold">
                  🌱 GOTS Organic Certified (CU 8492)
                </span>
                <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 text-[10px] font-bold">
                  💧 OEKO-TEX Standard 100 Class I
                </span>
                <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/50 text-[10px] font-bold">
                  ♻️ Global Recycled Standard (GRS)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Nesting Fabric Waste Optimizer */}
      {activeTab === 'nesting' && (
        <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card font-mono text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-tech font-bold text-base text-white">Algoritmo de Acomodo de Patrones (Nesting 2D)</h3>
            <span className="text-xs text-emerald-400 font-bold">Aprovechamiento de Tela: 88.4% (Desperdicio: 11.6%)</span>
          </div>

          <div className="p-6 bg-cyber-950 rounded-2xl border border-cyber-800 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-2xl font-tech font-extrabold text-white">
              <span>📐 AHORRO ESTIMADO EN FÁBRICA:</span>
              <span className="text-emerald-400">142 Metros Lineales de Algodón ($1,136 USD)</span>
            </div>
            <p className="text-slate-400 text-xs max-w-xl mx-auto">
              El algoritmo de optimización geométrica rota y encaja automáticamente las 6 piezas de moldería para reducir el metraje requerido antes del corte láser.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Proforma Invoice & Incoterms */}
      {activeTab === 'proforma' && (
        <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card font-mono text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-tech font-bold text-base text-white">Factura Proforma Comercial Internacional</h3>
            <span className="px-3 py-1 rounded-xl bg-cyber-gold/20 text-cyber-gold font-bold text-[10px]">
              INCOTERMS 2026: FOB OPORTO (PORTUGAL)
            </span>
          </div>

          <div className="p-5 bg-cyber-950 rounded-2xl border border-cyber-800 space-y-3">
            <div className="grid grid-cols-2 gap-4 pb-3 border-b border-cyber-800">
              <div>
                <span className="text-slate-500 block">Exportador / Fábrica:</span>
                <strong className="text-white">Oporto Textile Mills Lda (Portugal)</strong>
                <span className="text-slate-400 block text-[10px]">VAT PT509823412</span>
              </div>
              <div>
                <span className="text-slate-500 block">Importador / Marca:</span>
                <strong className="text-white">Aether Synergy Global LLC</strong>
                <span className="text-slate-400 block text-[10px]">Tax ID: US-94820194</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>500u Chaqueta Techwear Cyber Gold X-1 (HTS 6201.90):</span>
                <span className="text-white font-bold">$14,250.00 USD</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Gastos de Embalaje & Flete Local Puerto Leixões:</span>
                <span className="text-white font-bold">$350.00 USD</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold pt-2 border-t border-cyber-800 text-sm">
                <span>TOTAL VALOR FOB:</span>
                <span>$14,600.00 USD</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Physical Sample Approval Tracking */}
      {activeTab === 'samples' && (
        <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card font-mono text-xs">
          <h3 className="font-tech font-bold text-base text-white">Seguimiento y Aprobación de Muestra Física (Proto Sample #1)</h3>

          <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-tech font-bold text-sm text-white">Muestra Proto #1 (Llegada vía DHL Express #84920)</span>
                <span className="text-[10px] text-slate-400 block">Recibida en oficinas centrales el 29 de Agosto</span>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setSampleStatus('approved')}
                  className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all ${
                    sampleStatus === 'approved' ? 'bg-emerald-400 text-black shadow-md' : 'bg-cyber-900 text-slate-400'
                  }`}
                >
                  ✓ Aprobada
                </button>
                <button
                  onClick={() => setSampleStatus('adjust')}
                  className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all ${
                    sampleStatus === 'adjust' ? 'bg-amber-400 text-black shadow-md' : 'bg-cyber-900 text-slate-400'
                  }`}
                >
                  ⚠ Ajustar
                </button>
                <button
                  onClick={() => setSampleStatus('rejected')}
                  className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all ${
                    sampleStatus === 'rejected' ? 'bg-rose-500 text-white shadow-md' : 'bg-cyber-900 text-slate-400'
                  }`}
                >
                  ✕ Rechazada
                </button>
              </div>
            </div>

            <p className="text-slate-300 text-[11px]">
              {sampleStatus === 'approved' && '✅ Muestra aprobada para dar luz verde al corte de producción de 500 unidades.'}
              {sampleStatus === 'adjust' && '⚠️ Se solicitó al patronista corregir la curva de sisa en 0.5cm antes del corte definitivo.'}
              {sampleStatus === 'rejected' && '❌ Rechazada. La fábrica debe confeccionar un nuevo prototipo Proto #2.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
