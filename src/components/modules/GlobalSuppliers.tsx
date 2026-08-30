import React, { useState } from 'react';
import {
  Globe2,
  MapPin,
  Clock,
  ShieldCheck,
  Phone,
  MessageCircle,
  FileText,
  DollarSign,
  Package,
  Layers,
  ChevronRight,
  Sparkles,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  Download,
  Printer,
  X,
  Leaf
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface Supplier {
  id: string;
  name: string;
  country: string;
  flag: string;
  city: string;
  moq: number; // Minimum Order Quantity
  leadTime: string;
  pricePerUnit: number;
  rating: number;
  certifications: string[];
  specialty: string;
  whatsapp: string;
  image: string;
}

export const GlobalSuppliers: React.FC = () => {
  const { user } = useAuth();
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(250);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCert, setSelectedCert] = useState('all');
  const [isTechPackModalOpen, setIsTechPackModalOpen] = useState(false);

  const suppliers: Supplier[] = [
    {
      id: 'pt-porto-textiles',
      name: 'Porto Luxury Garments S.A.',
      country: 'Portugal',
      flag: '🇵🇹',
      city: 'Oporto',
      moq: 100,
      leadTime: '18 - 24 días',
      pricePerUnit: 24.50,
      rating: 4.9,
      certifications: ['GOTS Orgánico', 'OEKO-TEX 100', 'ISO 9001'],
      specialty: 'Algodón francés pesado 460 GSM y confección techwear premium.',
      whatsapp: '+351912345678',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'tr-istanbul-craft',
      name: 'Bosphorus Apparel & Denim Ltd.',
      country: 'Turquía',
      flag: '🇹🇷',
      city: 'Estambul',
      moq: 150,
      leadTime: '15 - 20 días',
      pricePerUnit: 18.20,
      rating: 4.8,
      certifications: ['OEKO-TEX 100', 'BSCI Audited'],
      specialty: 'Tejido técnico repelente al agua, lavados vintage y cremalleras selladas.',
      whatsapp: '+905321234567',
      image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'co-medellin-textiles',
      name: 'Andes Fabric & Tech S.A.S.',
      country: 'Colombia',
      flag: '🇨🇴',
      city: 'Medellín',
      moq: 80,
      leadTime: '12 - 16 días',
      pricePerUnit: 14.80,
      rating: 4.9,
      certifications: ['Fair Trade', 'GOTS Orgánico', 'Carbon Neutral'],
      specialty: 'Ropa urbana oversized, bordados de alta densidad y confección ágil.',
      whatsapp: '+573001234567',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'it-milan-atelier',
      name: 'Atelier Sartoriale Milano',
      country: 'Italia',
      flag: '🇮🇹',
      city: 'Milán',
      moq: 50,
      leadTime: '25 - 30 días',
      pricePerUnit: 48.00,
      rating: 5.0,
      certifications: ['Made in Italy Certified', 'B-Corp', 'OEKO-TEX 100'],
      specialty: 'Sastrería contemporánea, cueros de curtiduría toscana y piezas de pasarela.',
      whatsapp: '+390212345678',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&auto=format&fit=crop&q=80'
    }
  ];

  const filteredSuppliers = suppliers.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCountry = selectedCountry === 'all' || s.country.toLowerCase() === selectedCountry.toLowerCase();
    const matchCert = selectedCert === 'all' || s.certifications.some((c) => c.toLowerCase().includes(selectedCert.toLowerCase()));
    return matchSearch && matchCountry && matchCert;
  });

  const activeSupplier = selectedSupplier || suppliers[0];

  const totalProductionCost = activeSupplier.pricePerUnit * orderQuantity;
  const estimatedShippingAir = Math.round(orderQuantity * 3.2);
  const estimatedCustoms = Math.round(totalProductionCost * 0.08);
  const grandTotalCost = totalProductionCost + estimatedShippingAir + estimatedCustoms;
  const costPerPieceLanded = (grandTotalCost / orderQuantity).toFixed(2);

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `Hola ${activeSupplier.name}, soy ${user?.name || 'Diseñador'} de la marca ${user?.company || 'Aether Studio'}. Estoy interesado en cotizar un lote de ${orderQuantity} unidades con ficha técnica Tech Pack.`
    );
    window.open(`https://wa.me/${activeSupplier.whatsapp.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn transition-colors">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-6 rounded-3xl border border-cyber-gold/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold shadow-gold-glow">
            <Globe2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-tech font-extrabold text-white tracking-wider">
                GLOBAL SUPPLIERS B2B & TECH PACK SUITE
              </h2>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyber-800 text-cyber-gold border border-cyber-700">
                RED AUDITADA 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Directorio verificado de fábricas en Europa y América con cotizaciones de volumen y fichas técnicas
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsTechPackModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>Generar Tech Pack PDF</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-cyber-900/60 p-3 rounded-2xl border border-cyber-800">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar fábrica o tejido..."
              className="bg-cyber-950 border border-cyber-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyber-gold"
            />
          </div>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-cyber-950 border border-cyber-700 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
          >
            <option value="all">🌍 Todos los Países</option>
            <option value="portugal">🇵🇹 Portugal</option>
            <option value="turquía">🇹🇷 Turquía</option>
            <option value="colombia">🇨🇴 Colombia</option>
            <option value="italia">🇮🇹 Italia</option>
          </select>

          <select
            value={selectedCert}
            onChange={(e) => setSelectedCert(e.target.value)}
            className="bg-cyber-950 border border-cyber-700 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
          >
            <option value="all">🌿 Todos los Sellos</option>
            <option value="gots">GOTS Orgánico</option>
            <option value="oeko-tex">OEKO-TEX 100</option>
            <option value="fair trade">Fair Trade</option>
            <option value="b-corp">B-Corp</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Suppliers List + Live Quote Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Suppliers Cards */}
        <div className="lg:col-span-7 space-y-4">
          {filteredSuppliers.map((sup) => {
            const isSelected = activeSupplier.id === sup.id;

            return (
              <div
                key={sup.id}
                onClick={() => setSelectedSupplier(sup)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? 'bg-cyber-900 border-cyber-gold shadow-gold-glow-lg scale-101'
                    : 'bg-cyber-950/80 border-cyber-800 hover:border-cyber-gold/50 shadow-cyber-card'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={sup.image}
                      alt={sup.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-cyber-gold/50 shadow-md shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{sup.flag}</span>
                        <h3 className="font-tech font-bold text-base text-white">{sup.name}</h3>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-cyber-gold" /> {sup.city}, {sup.country}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Desde</span>
                    <span className="text-lg font-tech font-extrabold text-cyber-gold">${sup.pricePerUnit.toFixed(2)} USD</span>
                    <span className="text-[10px] text-slate-400 block font-mono">MOQ: {sup.moq} u.</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">{sup.specialty}</p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-cyber-850 text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {sup.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-2 py-0.5 rounded-md bg-cyber-900 border border-cyber-750 text-emerald-400 text-[10px] font-mono flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3" /> {cert}
                      </span>
                    ))}
                  </div>

                  <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" /> Lead Time: {sup.leadTime}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 5 Cols: Dynamic Sourcing Quote Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-cyber-900 border-2 border-cyber-gold/50 shadow-gold-glow-lg space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-cyber-800">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Fábrica Seleccionada:</span>
                <h3 className="font-tech font-bold text-base text-white">{activeSupplier.name}</h3>
              </div>
              <span className="text-2xl">{activeSupplier.flag}</span>
            </div>

            {/* Volume Quantity Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-tech font-bold uppercase">Volumen de Producción:</span>
                <span className="font-tech font-extrabold text-cyber-gold text-sm">{orderQuantity} piezas</span>
              </div>
              <input
                type="range"
                min={activeSupplier.moq}
                max="2500"
                step="50"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(Number(e.target.value))}
                className="w-full accent-cyber-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>MOQ ({activeSupplier.moq} u.)</span>
                <span>500 u.</span>
                <span>1,000 u.</span>
                <span>2,500 u.</span>
              </div>
            </div>

            {/* Cost Breakdown Table */}
            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Costo Confección ({orderQuantity} x ${activeSupplier.pricePerUnit}):</span>
                <span className="font-mono text-white">${totalProductionCost.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Flete Aéreo Express DHL:</span>
                <span className="font-mono text-white">${estimatedShippingAir.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimación Aranceles & Aduanas (8%):</span>
                <span className="font-mono text-white">${estimatedCustoms.toLocaleString()} USD</span>
              </div>

              <div className="pt-2 border-t border-cyber-800 flex justify-between items-center">
                <span className="font-tech font-bold text-white uppercase">Costo Total Puesto en Destino:</span>
                <span className="text-lg font-tech font-extrabold text-emerald-400">
                  ${grandTotalCost.toLocaleString()} USD
                </span>
              </div>

              <div className="text-right text-[11px] font-mono text-cyber-gold">
                Costo Unitario Final: ${costPerPieceLanded} USD / prenda
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleWhatsAppContact}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-tech font-bold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Contactar por WhatsApp Oficial</span>
              </button>

              <button
                onClick={() => setIsTechPackModalOpen(true)}
                className="w-full py-3 rounded-2xl bg-cyber-950 hover:bg-cyber-850 border border-cyber-700 text-white font-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <FileText className="w-4 h-4 text-cyber-gold" />
                <span>Ver Ficha Técnica Tech Pack</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TECH PACK MODAL */}
      {isTechPackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-white text-slate-900 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 block">
                  AETHER SYNERGY • SPECIFICATION SHEET
                </span>
                <h3 className="font-tech font-bold text-xl">FICHA TÉCNICA DE PRODUCCIÓN (TECH PACK)</h3>
              </div>
              <button
                onClick={() => setIsTechPackModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs font-sans">
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-100 rounded-2xl">
                <div>
                  <span className="text-slate-500 font-bold uppercase block text-[10px]">Producto:</span>
                  <span className="font-bold text-slate-800">Chaqueta Techwear Modular v1</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase block text-[10px]">Fábrica Asignada:</span>
                  <span className="font-bold text-slate-800">{activeSupplier.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase block text-[10px]">Lote / Cantidad:</span>
                  <span className="font-bold text-slate-800">{orderQuantity} unidades</span>
                </div>
              </div>

              {/* Size Chart Table */}
              <div>
                <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wider mb-2">
                  1. Tabla de Medidas (Grading Chart en cm):
                </h4>
                <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-200 text-slate-700 font-bold">
                    <tr>
                      <th className="p-2.5">Punto de Medida</th>
                      <th className="p-2.5 text-center">S</th>
                      <th className="p-2.5 text-center">M</th>
                      <th className="p-2.5 text-center">L</th>
                      <th className="p-2.5 text-center">XL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-2">Ancho de Pecho (Chest Width)</td>
                      <td className="p-2 text-center">56 cm</td>
                      <td className="p-2 text-center">58 cm</td>
                      <td className="p-2 text-center">61 cm</td>
                      <td className="p-2 text-center">64 cm</td>
                    </tr>
                    <tr>
                      <td className="p-2">Largo Total (Body Length)</td>
                      <td className="p-2 text-center">68 cm</td>
                      <td className="p-2 text-center">70 cm</td>
                      <td className="p-2 text-center">73 cm</td>
                      <td className="p-2 text-center">76 cm</td>
                    </tr>
                    <tr>
                      <td className="p-2">Largo de Manga (Sleeve Length)</td>
                      <td className="p-2 text-center">64 cm</td>
                      <td className="p-2 text-center">66 cm</td>
                      <td className="p-2 text-center">68 cm</td>
                      <td className="p-2 text-center">70 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bill of Materials (BOM) */}
              <div>
                <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wider mb-2">
                  2. Lista de Materiales & Avíos (BOM):
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-slate-50 border rounded-xl">
                    <span className="font-bold block">Tela Principal:</span>
                    <span>100% Nylon Ripstop 240 GSM con tratamiento DWR repelente al agua.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border rounded-xl">
                    <span className="font-bold block">Cremalleras:</span>
                    <span>YKK Aquaguard #5 impermeables con tiradores engomados.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Imprimir / Guardar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
