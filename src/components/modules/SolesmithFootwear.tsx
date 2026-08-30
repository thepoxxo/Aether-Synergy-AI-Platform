import React, { useState } from 'react';
import { Footprints, Sparkles, Layers, Sliders, Check } from 'lucide-react';
import { Model3DCanvas } from '../common/Model3DCanvas';
import { useAuth } from '../../context/AuthContext';

export const SolesmithFootwear: React.FC = () => {
  const { consumeCredit } = useAuth();
  const [activeMaterial, setActiveMaterial] = useState('Synthetic Leather (Gloss)');
  const [selectedLayer, setSelectedLayer] = useState('Laces (Selected)');
  const [sneakerColor, setSneakerColor] = useState('#F97316');
  const [accentColor, setAccentColor] = useState('#06B6D4');

  const layers = ['Uppers Mesh', 'Laces (Selected)', 'Tongue Padding', 'Midsole (Boost)', 'Outsole Rubber', 'Branding Tag'];

  const materials = [
    { name: 'SYNTHETIC LEATHER (GLOSS)', desc: 'Brillo premium y resistencia al agua' },
    { name: 'RECYCLED MESH 300D', desc: 'Malla transpirable ecológica' },
    { name: 'CARBON FIBER WEAVE', desc: 'Refuerzo ultra ligero y rígido' },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between bg-cyber-900/90 p-4 rounded-2xl border border-cyber-700/80 shadow-cyber-card">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500/20 border border-orange-500 text-orange-400">
            <Footprints className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-tech font-bold text-white tracking-wide">
              SOLESMITH STUDIO • FOOTWEAR 3D ENGINE
            </h2>
            <p className="text-xs text-slate-400">
              Model: <span className="text-cyber-gold font-mono">NEO-STREET X1</span> | Strictly Cel-Shaded Architecture
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Shoe Anatomy Layers (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-cyber-900/90 p-4 rounded-2xl border border-cyber-800 shadow-cyber-card">
            <span className="font-tech font-bold text-xs uppercase tracking-wider text-slate-300 block mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyber-gold" /> Shoe Anatomy (Active Layers)
            </span>

            <div className="space-y-1.5 text-xs">
              {layers.map((l) => (
                <button
                  key={l}
                  onClick={() => setSelectedLayer(l)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                    selectedLayer === l
                      ? 'bg-cyber-gold text-black font-bold border-cyber-gold shadow-gold-glow'
                      : 'bg-cyber-950 border-cyber-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{l}</span>
                  {selectedLayer === l && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes */}
          <div className="bg-cyber-900/90 p-4 rounded-2xl border border-cyber-800 shadow-cyber-card text-xs">
            <span className="font-tech font-bold text-xs uppercase tracking-wider text-slate-300 block mb-3">
              Color Primario de la Silueta
            </span>
            <div className="flex items-center gap-2">
              {['#F97316', '#EAB308', '#06B6D4', '#8B5CF6', '#10B981', '#18181B'].map((c) => (
                <button
                  key={c}
                  onClick={() => setSneakerColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-7 h-7 rounded-xl border transition-all ${
                    sneakerColor === c ? 'border-white scale-110 shadow-gold-glow' : 'border-cyber-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center: 3D Shoe Canvas (6 cols) */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <div className="h-[460px] w-full">
            <Model3DCanvas type="sneaker" primaryColor={sneakerColor} accentColor={accentColor} autoRotate={true} />
          </div>
        </div>

        {/* Right: AI Material Generator (3 cols - matching mockup 2/6.jpeg) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-cyber-900/90 p-4 rounded-2xl border border-cyber-800 shadow-cyber-card">
            <span className="font-tech font-bold text-xs uppercase tracking-wider text-slate-300 block mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyber-gold" /> AI Material Generator
            </span>

            <div className="space-y-3">
              {materials.map((m) => (
                <button
                  key={m.name}
                  onClick={() => setActiveMaterial(m.name)}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    activeMaterial === m.name
                      ? 'bg-cyber-gold/15 border-cyber-gold shadow-gold-glow'
                      : 'bg-cyber-950 border-cyber-800 hover:border-cyber-700'
                  }`}
                >
                  <div className={`font-tech font-bold text-xs uppercase ${activeMaterial === m.name ? 'text-cyber-gold' : 'text-slate-200'}`}>
                    {m.name}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-cyber-gold/20 border border-cyber-gold/30 text-center">
            <span className="text-3xl mb-1 block">🧑‍🎨</span>
            <div className="font-tech font-bold text-sm text-white">Solesmith Mascot Helper</div>
            <p className="text-[11px] text-slate-400 mt-1">
              "¡La combinación con cuero sintético y suela Boost genera +40% de tracción visual!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
