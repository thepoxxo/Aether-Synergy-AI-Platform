import React, { useState } from 'react';
import {
  Globe2,
  ShieldCheck,
  Star,
  MessageCircle,
  FileText,
  DollarSign,
  Search,
  CheckCircle2,
  QrCode
} from 'lucide-react';
import { useDeviceMode } from '../../context/DeviceModeContext';

export const MobileGlobalSuppliers: React.FC = () => {
  const { hapticFeedback } = useDeviceMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const suppliers = [
    {
      id: 1,
      name: 'Porto Luxury Garments S.A.',
      country: '🇵🇹 Portugal',
      city: 'Oporto',
      specialty: 'Algodón francés pesado 460 GSM & Techwear',
      moq: '50 unidades',
      leadTime: '18-24 días',
      rating: 4.9,
      unitPrice: '$18 - $24 USD',
      certifications: ['GOTS Orgánico', 'OEKO-TEX 100', 'ISO 9001'],
      whatsapp: '+351912345678'
    },
    {
      id: 2,
      name: 'Bosphorus Apparel & Denim Ltd.',
      country: '🇹🇷 Turquía',
      city: 'Estambul',
      specialty: 'Denim técnico repelente, lavados vintage',
      moq: '100 unidades',
      leadTime: '15-20 días',
      rating: 4.8,
      unitPrice: '$14 - $19 USD',
      certifications: ['OEKO-TEX 100', 'BSCI Audited'],
      whatsapp: '+905321234567'
    },
    {
      id: 3,
      name: 'Confecciones Antioquia Pro',
      country: '🇨🇴 Colombia',
      city: 'Medellín',
      specialty: 'Ropa deportiva compresión & fajas sin costura',
      moq: '30 unidades',
      leadTime: '10-14 días',
      rating: 4.9,
      unitPrice: '$12 - $16 USD',
      certifications: ['Invima', 'B-Corp', 'Hecho en Colombia'],
      whatsapp: '+573001234567'
    }
  ];

  const filtered = suppliers.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || s.country.includes(selectedCountry);
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] bg-cyber-950 text-white font-mono text-xs select-none p-3 space-y-3 overflow-y-auto">
      {/* 1. Search & Country Filters */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar fábricas o telas..."
            className="w-full bg-cyber-900 border border-cyber-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-gold"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'Portugal', label: '🇵🇹 Portugal' },
            { id: 'Turquía', label: '🇹🇷 Turquía' },
            { id: 'Colombia', label: '🇨🇴 Colombia' }
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => {
                hapticFeedback();
                setSelectedCountry(c.id);
              }}
              className={`px-3 py-1 rounded-xl text-[10px] font-tech font-bold shrink-0 border ${
                selectedCountry === c.id
                  ? 'bg-cyber-gold text-black border-cyber-gold'
                  : 'bg-cyber-900 border-cyber-800 text-slate-400'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Single-Column Factory Cards */}
      <div className="space-y-3">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-cyber-900 border border-cyber-800 rounded-2xl p-3.5 space-y-2.5 shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] text-cyber-gold font-bold">{s.country} • {s.city}</span>
                <h4 className="font-tech font-bold text-sm text-white">{s.name}</h4>
              </div>
              <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-0.5 rounded-lg border border-amber-500/40 text-amber-300 font-bold text-[10px]">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{s.rating}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 font-sans">{s.specialty}</p>

            <div className="grid grid-cols-2 gap-2 text-[10px] bg-cyber-950 p-2 rounded-xl border border-cyber-800">
              <div>
                <span className="text-slate-500 block">Pedido Mínimo:</span>
                <strong className="text-slate-200">{s.moq}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Tiempo Entrega:</span>
                <strong className="text-slate-200">{s.leadTime}</strong>
              </div>
            </div>

            {/* Certifications badges */}
            <div className="flex flex-wrap gap-1">
              {s.certifications.map((cert) => (
                <span key={cert} className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  ✓ {cert}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  hapticFeedback();
                  window.open(`https://wa.me/${s.whatsapp}?text=Hola,%20vi%20su%20fabrica%20en%20Aether%20Synergy%20y%20deseo%20cotizar`, '_blank');
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-tech font-bold text-xs uppercase flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Fábrica</span>
              </button>

              <button
                onClick={() => {
                  hapticFeedback();
                  alert('¡Solicitud de Fideicomiso Escrow enviada para ' + s.name + '!');
                }}
                className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-gold text-cyber-gold"
                title="Fideicomiso Seguro Escrow"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
