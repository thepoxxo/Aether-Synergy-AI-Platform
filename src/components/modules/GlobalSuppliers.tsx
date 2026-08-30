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
  Leaf,
  Ruler,
  Tag,
  Barcode
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface Supplier {
  id: string;
  name: string;
  country: string;
  flag: string;
  city: string;
  moq: number;
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
  const [unitSystem, setUnitSystem] = useState<'both' | 'cm' | 'in'>('both');

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
          <span>Generar Tech Pack PDF (Dual CM / IN)</span>
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

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-cyber-855 text-xs">
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
                <span>Ver Ficha Técnica Tech Pack (CM / IN)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* INDUSTRIAL TECH PACK MODAL WITH WATERMARK & DUAL CM / INCH MEASUREMENTS */}
      {isTechPackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative bg-white text-slate-900 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Elegant Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] rotate-[-25deg] select-none z-0">
              <div className="text-center font-tech font-extrabold text-7xl text-slate-900 tracking-widest leading-none">
                AETHER SYNERGY <br />
                CONFIDENTIAL TECH PACK <br />
                B2B OFFICIAL SPECIFICATION
              </div>
            </div>

            {/* Modal Header */}
            <div className="relative z-10 p-6 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500 text-amber-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      DOC: TP-2026-X49
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">REV 3.2</span>
                  </div>
                  <h3 className="font-tech font-bold text-xl mt-0.5">
                    FICHA TÉCNICA DE PRODUCCIÓN INDUSTRIAL (TECH PACK)
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Unit Switcher */}
                <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setUnitSystem('both')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      unitSystem === 'both' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Dual (CM & IN)
                  </button>
                  <button
                    onClick={() => setUnitSystem('cm')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      unitSystem === 'cm' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Métrico (CM)
                  </button>
                  <button
                    onClick={() => setUnitSystem('in')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      unitSystem === 'in' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Imperial (IN)
                  </button>
                </div>

                <button
                  onClick={() => setIsTechPackModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="relative z-10 p-6 overflow-y-auto space-y-6 text-xs font-sans">
              {/* Product & Factory Header Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <span className="text-slate-500 font-bold uppercase block text-[10px]">Estilo / Prenda:</span>
                  <span className="font-bold text-slate-900 text-sm">Chaqueta Techwear Modular X-1</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase block text-[10px]">Fábrica Asignada:</span>
                  <span className="font-bold text-slate-900 text-sm">{activeSupplier.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase block text-[10px]">Volumen / Cantidad:</span>
                  <span className="font-bold text-slate-900 text-sm">{orderQuantity} unidades</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase block text-[10px]">Colores Pantone:</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#1E293B] border border-slate-400" title="19-4007 TCX" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#E5A93C] border border-slate-400" title="14-0848 TCX" />
                    <span className="text-[11px] font-mono font-bold text-slate-700">19-4007 / 14-0848</span>
                  </div>
                </div>
              </div>

              {/* 1. Complete Sizing Table with Dual Units (cm and inches) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-tech font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-amber-600" /> 1. TABLA DE MEDIDAS & GRADACIÓN INDUSTRIAL
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500">Tolerancia: +/- 0.5 cm (0.2 in)</span>
                </div>

                <div className="overflow-x-auto border border-slate-300 rounded-2xl shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-white font-tech uppercase text-[11px]">
                      <tr>
                        <th className="p-3">Punto de Medida (POM)</th>
                        <th className="p-3 text-center">S</th>
                        <th className="p-3 text-center">M (Muestra)</th>
                        <th className="p-3 text-center">L</th>
                        <th className="p-3 text-center">XL</th>
                        <th className="p-3 text-center">XXL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-800">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-semibold">Ancho de Pecho (Chest Width 2.5cm below armhole)</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '22.0 in' : unitSystem === 'cm' ? '56.0 cm' : '56 cm / 22.0"'}</td>
                        <td className="p-3 text-center font-mono font-bold bg-amber-50 text-amber-900">{unitSystem === 'in' ? '22.8 in' : unitSystem === 'cm' ? '58.0 cm' : '58 cm / 22.8"'}</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '24.0 in' : unitSystem === 'cm' ? '61.0 cm' : '61 cm / 24.0"'}</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '25.2 in' : unitSystem === 'cm' ? '64.0 cm' : '64 cm / 25.2"'}</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '26.4 in' : unitSystem === 'cm' ? '67.0 cm' : '67 cm / 26.4"'}</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-semibold">Largo Total Prenda (Body Length from HPS)</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '26.8 in' : unitSystem === 'cm' ? '68.0 cm' : '68 cm / 26.8"'}</td>
                        <td className="p-3 text-center font-mono font-bold bg-amber-50 text-amber-900">{unitSystem === 'in' ? '27.5 in' : unitSystem === 'cm' ? '70.0 cm' : '70 cm / 27.5"'}</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '28.7 in' : unitSystem === 'cm' ? '73.0 cm' : '73 cm / 28.7"'}</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '29.9 in' : unitSystem === 'cm' ? '76.0 cm' : '76 cm / 29.9"'}</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '31.1 in' : unitSystem === 'cm' ? '79.0 cm' : '79 cm / 31.1"'}</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-semibold">Largo de Manga Raglán (Sleeve Length from CB)</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '25.2 in' : unitSystem === 'cm' ? '64.0 cm' : '64 cm / 25.2"'}</td>
                        <td className="p-3 text-center font-mono font-bold bg-amber-50 text-amber-900">{unitSystem === 'in' ? '26.0 in' : unitSystem === 'cm' ? '66.0 cm' : '66 cm / 26.0"'}</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '26.8 in' : unitSystem === 'cm' ? '68.0 cm' : '68 cm / 26.8"'}</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '27.5 in' : unitSystem === 'cm' ? '70.0 cm' : '70 cm / 27.5"'}</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '28.3 in' : unitSystem === 'cm' ? '72.0 cm' : '72 cm / 28.3"'}</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-semibold">Ancho de Ruedo / Cintura (Bottom Hem Opening)</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '20.5 in' : unitSystem === 'cm' ? '52.0 cm' : '52 cm / 20.5"'}</td>
                        <td className="p-3 text-center font-mono font-bold bg-amber-50 text-amber-900">{unitSystem === 'in' ? '21.2 in' : unitSystem === 'cm' ? '54.0 cm' : '54 cm / 21.2"'}</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '22.4 in' : unitSystem === 'cm' ? '57.0 cm' : '57 cm / 22.4"'}</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '23.6 in' : unitSystem === 'cm' ? '60.0 cm' : '60 cm / 23.6"'}</td>
                        <td className="p-3 text-center font-mono">{unitSystem === 'in' ? '24.8 in' : unitSystem === 'cm' ? '63.0 cm' : '63 cm / 24.8"'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. Bill of Materials (BOM) & Stitching */}
              <div className="space-y-2">
                <h4 className="font-tech font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-amber-600" /> 2. LISTA DETALLADA DE MATERIALES, HILOS Y AVÍOS (BOM)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900 block">Tejido Exterior Principal:</span>
                    <p className="text-slate-600">100% Nylon Ripstop 240 GSM con recubrimiento DWR hidrófugo y acabado mate anti-abrasión.</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900 block">Forro Interno y Bolsillos:</span>
                    <p className="text-slate-600">Malla técnica CoolMax 120 GSM transpirable y micro-polar en bolsillos calientamanos.</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900 block">Cremalleras y Herrajes:</span>
                    <p className="text-slate-600">YKK Aquaguard #5 impermeables con costuras termoselladas y tiradores de cordón reflectivo.</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                    <span className="font-bold text-slate-900 block">Hilos y Costuras (Stitching SPI):</span>
                    <p className="text-slate-600">Hilo de nylon 60/2 reforzado con 12 puntadas por pulgada (12 SPI) y presillas Bar-Tack en bolsillos.</p>
                  </div>
                </div>
              </div>

              {/* 3. Packaging & Labeling Specifications */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-tech font-bold text-amber-400 uppercase">3. Instrucciones de Empaque y Etiquetado:</span>
                  <span className="font-mono text-[10px] text-slate-400 flex items-center gap-1">
                    <Barcode className="w-3.5 h-3.5" /> SKU: AET-JKT-2026-01
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Cada prenda debe doblarse individualmente en bolsa biodegradable compostable de 40 micras con orificios de ventilación, sobre desecante de gel de sílice y etiqueta de código de barras exterior visible. Cajas maestras de 25 unidades debidamente zunchadas.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="relative z-10 p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-slate-500 text-[11px] font-mono">
                Documento generado por Aether Synergy B2B Engine • Válido para producción en {activeSupplier.country}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>Imprimir / Guardar PDF Oficial</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
