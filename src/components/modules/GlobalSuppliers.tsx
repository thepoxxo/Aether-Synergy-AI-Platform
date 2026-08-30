import React, { useState } from 'react';
import { Globe2, ShieldCheck, Truck, Factory, ArrowUpRight, DollarSign, Download, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const GlobalSuppliers: React.FC = () => {
  const { t } = useLanguage();
  const [selectedHub, setSelectedHub] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantity, setQuantity] = useState<number>(200);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqSent, setRfqSent] = useState(false);

  const suppliers = [
    {
      id: 'sup_1',
      name: 'Porto Luxury Apparel Ltd',
      hub: 'Portugal (EU)',
      category: 'Streetwear & Denim',
      specialty: 'Heavyweight French Terry (460 GSM), Vintage Washes & High-end Embroidery',
      moq: 50,
      baseUnitCost: 24.50,
      leadTime: '18 Días',
      rating: 4.9,
      verified: true,
      whatsapp: '+351 912 345 678',
      email: 'production@portoluxury.pt',
      certifications: ['OEKO-TEX 100', 'GOTS Organic']
    },
    {
      id: 'sup_2',
      name: 'Istanbul Techwear Knitting Co',
      hub: 'Turquía',
      category: 'Streetwear & Denim',
      specialty: 'Nylon Ripstop, Windproof Membranes & Waterproof Taped Zippers',
      moq: 100,
      baseUnitCost: 19.80,
      leadTime: '21 Días',
      rating: 4.8,
      verified: true,
      whatsapp: '+90 532 123 4567',
      email: 'sourcing@istanbulknit.tr',
      certifications: ['ISO 9001', 'Sedex Audited']
    },
    {
      id: 'sup_3',
      name: 'Medellín Confecciones Pro',
      hub: 'Colombia (LATAM)',
      category: 'Streetwear & Denim',
      specialty: 'Algodón Pima Peruano, Serigrafía de Alta Densidad (High-Density Puff) & DTG',
      moq: 50,
      baseUnitCost: 14.20,
      leadTime: '12 Días',
      rating: 4.95,
      verified: true,
      whatsapp: '+57 310 987 6543',
      email: 'contacto@medellinconfecciones.co',
      certifications: ['Fair Trade', 'WRAP Certified']
    },
    {
      id: 'sup_4',
      name: 'Bologna Furniture Atelier',
      hub: 'Italia (EU)',
      category: 'Diseño de Interiores',
      specialty: 'Madera de Roble Macizo, Tapicería en Cuero Italiano & Estructuras Metálicas',
      moq: 10,
      baseUnitCost: 185.00,
      leadTime: '30 Días',
      rating: 5.0,
      verified: true,
      whatsapp: '+39 051 123 456',
      email: 'contract@bolognaatelier.it',
      certifications: ['FSC Certified Wood', 'Made in Italy']
    },
    {
      id: 'sup_5',
      name: 'Shenzhen CNC & Audio Hardware',
      hub: 'Asia (Shenzhen)',
      category: 'Instrumentalización',
      specialty: 'Mecanizado CNC Aluminio Anodizado, Montaje PCB SMT & Carcasas para Sintetizadores',
      moq: 25,
      baseUnitCost: 45.00,
      leadTime: '25 Días',
      rating: 4.85,
      verified: true,
      whatsapp: '+86 755 8888 9999',
      email: 'sales@shenzhenaudiohardware.com',
      certifications: ['RoHS Compliant', 'CE Mark']
    }
  ];

  const filteredSuppliers = suppliers.filter((s) => {
    const hubMatch = selectedHub === 'All' || s.hub.includes(selectedHub);
    const catMatch = selectedCategory === 'All' || s.category === selectedCategory;
    return hubMatch && catMatch;
  });

  const activeSup = suppliers.find((s) => s.id === (selectedSupplier || 'sup_1')) || suppliers[0];

  // Dynamic Volume Cost Discount Calculation
  const discountMultiplier = quantity >= 1000 ? 0.78 : quantity >= 200 ? 0.88 : 1.0;
  const calculatedUnitPrice = (activeSup.baseUnitCost * discountMultiplier).toFixed(2);
  const totalProductionCost = (parseFloat(calculatedUnitPrice) * quantity).toLocaleString();

  const handleSendRFQ = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSent(true);
    setTimeout(() => {
      setRfqSent(false);
      setRfqModalOpen(false);
      alert(`¡Solicitud de Cotización Oficial enviada con éxito a ${activeSup.name} con el Tech Pack 3D adjunto!`);
    }, 1500);
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn transition-colors">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900 p-4 rounded-2xl border border-purple-500/40 shadow-cyber-card">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500 text-purple-400">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-tech font-bold text-white tracking-wide">
                GLOBAL SUPPLIERS B2B & PRODUCTION SOURCING
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                VERIFIED FACTORY NETWORK
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Conexión directa con fábricas certificadas de confección textil, mobiliario y hardware con cotización en vivo
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-cyber-950 border border-cyber-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
          >
            <option value="All">Todos los Nichos</option>
            <option value="Streetwear & Denim">Moda & Streetwear</option>
            <option value="Diseño de Interiores">Diseño de Interiores</option>
            <option value="Instrumentalización">Instrumentalización & Audio</option>
          </select>

          <select
            value={selectedHub}
            onChange={(e) => setSelectedHub(e.target.value)}
            className="bg-cyber-950 border border-cyber-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
          >
            <option value="All">Todos los Países</option>
            <option value="Portugal">Portugal (UE)</option>
            <option value="Turquía">Turquía</option>
            <option value="Colombia">Colombia (LATAM)</option>
            <option value="Italia">Italia</option>
            <option value="Asia">Asia (Shenzhen)</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Suppliers Directory (Left) + Interactive Live Quotation Calculator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Factory Directory List */}
        <div className="lg:col-span-7 space-y-3.5">
          {filteredSuppliers.map((sup) => {
            const isSelected = (selectedSupplier || 'sup_1') === sup.id;
            return (
              <div
                key={sup.id}
                onClick={() => setSelectedSupplier(sup.id)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyber-900 border-cyber-gold shadow-gold-glow'
                    : 'bg-cyber-900/70 border-cyber-800 hover:border-cyber-700'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-tech font-bold text-base text-white">{sup.name}</h3>
                      {sup.verified && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          <ShieldCheck className="w-3 h-3" /> Verificado
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-cyber-gold font-semibold">{sup.hub} • {sup.category}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Precio Base Unitario:</span>
                    <span className="font-tech font-bold text-lg text-white">${sup.baseUnitCost} USD</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-3 font-sans leading-relaxed">
                  {sup.specialty}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-cyber-800 text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center gap-3">
                    <span>MOQ: <strong className="text-white">{sup.moq} pcs</strong></span>
                    <span>Lead Time: <strong className="text-emerald-400">{sup.leadTime}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {sup.certifications.map((c, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-cyber-950 text-slate-400 border border-cyber-800 text-[9px]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Live Cost Calculator & Request for Quote (RFQ) */}
        <div className="lg:col-span-5 space-y-4 sticky top-20">
          <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-gold/40 shadow-cyber-card space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Cotizador de Producción B2B en Tiempo Real
              </span>
              <h3 className="font-tech font-bold text-lg text-white">
                {activeSup.name}
              </h3>
              <p className="text-xs text-cyber-gold">{activeSup.hub} • Especialista en {activeSup.category}</p>
            </div>

            {/* Quantity Slider */}
            <div className="space-y-2 pt-2 border-t border-cyber-800">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Cantidad a Fabricar:</span>
                <span className="font-mono font-bold text-cyber-gold text-sm">{quantity} unidades</span>
              </div>
              <input
                type="range"
                min={activeSup.moq}
                max="2000"
                step="50"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-cyber-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>MOQ ({activeSup.moq})</span>
                <span>500 pcs</span>
                <span>1000 pcs (-22% dto)</span>
                <span>2000 pcs</span>
              </div>
            </div>

            {/* Financial Breakdown Table */}
            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Precio Unitario con Descuento:</span>
                <span className="font-mono text-white font-bold">${calculatedUnitPrice} USD / u</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tiempo de Entrega Estimado:</span>
                <span className="font-mono text-emerald-400">{activeSup.leadTime}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Ficha Técnica 3D Adjunta:</span>
                <span className="font-mono text-cyan-400 font-bold">TechPack_Aether_3D.pdf</span>
              </div>
              <div className="pt-2 border-t border-cyber-800 flex justify-between items-baseline">
                <span className="font-tech font-bold text-sm text-white">Costo Total de Orden:</span>
                <span className="font-tech font-extrabold text-2xl text-cyber-gold">${totalProductionCost} USD</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setRfqModalOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-sm uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>SOLICITAR COTIZACIÓN FORMAL (RFQ)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${activeSup.whatsapp.replace(/[^0-9]/g, '')}?text=Hola,%20solicito%20cotización%20para%20${quantity}%20unidades%20desde%20Aether%20Synergy.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Fábrica
                </a>

                <button
                  onClick={() => alert('Descargando Ficha Técnica Tech Pack 3D completa (.ZIP con medidas y BOM)...')}
                  className="py-2.5 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-slate-300 text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Descargar BOM
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RFQ Submission Modal */}
      {rfqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-cyber-900 border border-cyber-gold/50 rounded-3xl p-6 shadow-gold-glow-lg">
            <h3 className="font-tech font-bold text-xl text-white mb-1">
              Enviar Solicitud de Fabricación a {activeSup.name}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              La fábrica recibirá tu diseño 3D cel-shaded, curva de tallas y especificaciones de tela.
            </p>

            <form onSubmit={handleSendRFQ} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nombre del Proyecto / Drop</label>
                <input
                  type="text"
                  defaultValue="Neo Techwear Hoodie Fall/Winter"
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyber-gold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Notas Especiales o Acabados</label>
                <textarea
                  rows={3}
                  defaultValue="Requerimos estampado reflectivo 3M en mangas y cremalleras impermeables termoselladas."
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyber-gold"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setRfqModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-cyber-800 text-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={rfqSent}
                  className="flex-2 w-full py-3 rounded-xl bg-cyber-gold text-black font-tech font-bold text-sm uppercase tracking-wider shadow-gold-glow"
                >
                  {rfqSent ? 'Enviando Tech Pack...' : 'Confirmar y Enviar a Fábrica'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
