import React, { useState } from 'react';
import {
  Palette,
  Type,
  Image as ImageIcon,
  Sparkles,
  Download,
  Copy,
  Check,
  Plus,
  Trash2,
  Lock,
  Tag,
  Barcode,
  Layers,
  Upload,
  RefreshCw,
  Sun
} from 'lucide-react';

interface BrandColor {
  id: string;
  name: string;
  hex: string;
  pantone: string;
  cmyk: string;
  isPrimary?: boolean;
}

export const BrandKitStudio: React.FC = () => {
  const [brandName, setBrandName] = useState('Aether Cyberwear Labs');
  const [selectedFont, setSelectedFont] = useState('Space Grotesk');
  const [secondaryFont, setSecondaryFont] = useState('JetBrains Mono');
  const [activeTab, setActiveTab] = useState<'colors' | 'embroidery' | 'hangtags' | 'moodboard'>('colors');

  const [colors, setColors] = useState<BrandColor[]>([
    { id: '1', name: 'Cyber Gold', hex: '#E5A93C', pantone: 'PANTONE 123 C', cmyk: '0/30/90/10', isPrimary: true },
    { id: '2', name: 'Negro Azabache', hex: '#111116', pantone: 'PANTONE Black 6 C', cmyk: '70/60/50/90' },
    { id: '3', name: 'Cyan Eléctrico', hex: '#06B6D4', pantone: 'PANTONE 3115 C', cmyk: '70/0/10/0' },
    { id: '4', name: 'Blanco Marfil', hex: '#F8FAFC', pantone: 'PANTONE 11-0601 TPG', cmyk: '0/0/0/2' }
  ]);

  const [embroideryRelief, setEmbroideryRelief] = useState<number>(3.5);
  const [embroideryThread, setEmbroideryThread] = useState<'satin' | 'metallic' | 'matte'>('metallic');
  const [isExtractingMoodboard, setIsExtractingMoodboard] = useState<boolean>(false);

  const handleAddColor = () => {
    const hex = prompt('Ingresa el código Hexadecimal (ej: #F43F5E):');
    if (!hex) return;
    const newColor: BrandColor = {
      id: Date.now().toString(),
      name: 'Color Corporativo ' + (colors.length + 1),
      hex: hex.toUpperCase(),
      pantone: 'PANTONE Custom',
      cmyk: 'Custom/Print'
    };
    setColors([...colors, newColor]);
  };

  const handleExtractMoodboard = () => {
    setIsExtractingMoodboard(true);
    setTimeout(() => {
      setIsExtractingMoodboard(false);
      alert('¡Moodboard analizado con éxito! 4 colores Pantone y texturas extraídas al Brand Kit.');
    }, 1200);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-6 rounded-3xl border border-cyber-gold/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold shadow-gold-glow">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                BRAND KIT & IDENTIDAD CORPORATIVA 3D
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyber-gold/20 text-cyber-gold border border-cyber-gold/50">
                PANTONE + TIPOGRAFÍAS + HANGTAGS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Centraliza el ADN de tu marca: paletas Pantone bloqueadas, bordados 3D, tipografías y etiquetas automáticas
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('¡Brand Kit completo (Guía de Estilo PDF + Archivo .ASE Pantone + Assets) descargado!')}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Manual de Marca (.PDF + .ASE)</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-cyber-950 p-2 rounded-2xl border border-cyber-800 text-xs">
        {[
          { id: 'colors', label: 'Paletas Pantone & CMYK', icon: Palette },
          { id: 'embroidery', label: 'Bordados & Parches 3D', icon: Layers },
          { id: 'hangtags', label: 'Etiquetas & Hangtags con Barcode', icon: Tag },
          { id: 'moodboard', label: 'Moodboard AI Extractor', icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-tech font-bold transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-cyber-gold text-black shadow-gold-glow font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-cyber-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Colors & Pantone Matching */}
      {activeTab === 'colors' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyber-gold" /> Paleta de Colores Corporativos Bloqueados
            </h3>
            <button
              onClick={handleAddColor}
              className="px-3 py-1.5 rounded-xl bg-cyber-900 hover:bg-cyber-800 border border-cyber-700 text-cyber-gold font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Color</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {colors.map((c) => (
              <div key={c.id} className="bg-cyber-900 rounded-3xl border border-cyber-800 p-4 space-y-3 shadow-cyber-card">
                <div className="w-full h-24 rounded-2xl border border-white/10 shadow-inner flex items-end p-2" style={{ backgroundColor: c.hex }}>
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-white">
                    {c.hex}
                  </span>
                </div>
                <div>
                  <h4 className="font-tech font-bold text-sm text-white">{c.name}</h4>
                  <div className="text-[11px] font-mono text-slate-400 space-y-0.5 mt-1">
                    <div>Pantone: <span className="text-cyber-gold font-bold">{c.pantone}</span></div>
                    <div>CMYK: <span className="text-slate-300">{c.cmyk}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Typography Pairings */}
          <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4">
            <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
              <Type className="w-4 h-4 text-cyan-400" /> Tipografías Oficiales de la Marca
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
                <span className="text-slate-500 font-mono text-[10px] block">Tipografía de Titulares (Headlines):</span>
                <span className="text-xl font-tech font-extrabold text-white block">{selectedFont}</span>
                <span className="text-xs text-slate-400">ABCDEFGHIJKLM 0123456789</span>
              </div>
              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
                <span className="text-slate-500 font-mono text-[10px] block">Tipografía de Cuerpo & Fichas (Body & Mono):</span>
                <span className="text-base font-mono font-bold text-cyan-300 block">{secondaryFont}</span>
                <span className="text-xs font-mono text-slate-400">abcdefghijklm 0123456789</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 3D Embroidery & Patch Relief */}
      {activeTab === 'embroidery' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-cyber-900 border border-cyber-800 rounded-3xl p-6 flex flex-col justify-between shadow-cyber-card">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-cyber-950 border border-cyber-800 flex items-center justify-center">
              <div className="text-center space-y-2 p-6">
                <span className="text-6xl animate-pulse block">🛡️</span>
                <span className="text-sm font-tech font-bold text-cyber-gold uppercase block">
                  PARCHE BORDADO CON HILO {embroideryThread.toUpperCase()}
                </span>
                <span className="text-[11px] font-mono text-slate-400 block">
                  Relieve: {embroideryRelief}mm • Puntada Satín de 120 hilos/cm²
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-xs font-mono text-slate-400">
              <span>Simulación de Brillo Textil: 88%</span>
              <span>Norma de Confección: ISO 4915</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4">
            <h3 className="font-tech font-bold text-base text-white">Parámetros del Parche Bordado</h3>
            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-slate-300 block mb-1">Tipo de Hilo Bordador:</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['satin', 'metallic', 'matte'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setEmbroideryThread(t)}
                      className={`py-2 rounded-xl font-bold capitalize transition-all ${
                        embroideryThread === t ? 'bg-cyber-gold text-black shadow-gold-glow' : 'bg-cyber-950 text-slate-400 border border-cyber-800'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Grosor de Relieve (mm): {embroideryRelief} mm</label>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="0.5"
                  value={embroideryRelief}
                  onChange={(e) => setEmbroideryRelief(parseFloat(e.target.value))}
                  className="w-full accent-cyber-gold"
                />
              </div>

              <button
                onClick={() => alert('¡Parche bordado 3D renderizado y mapeado en la prenda!')}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyber-gold to-amber-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow"
              >
                Aplicar Bordado a Prenda 3D
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Hangtags & Barcodes */}
      {activeTab === 'hangtags' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Neck Label */}
          <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
            <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-cyan-400" /> Etiqueta Interior de Cuello (Neck Label)
            </h3>
            <div className="p-5 bg-cyber-950 rounded-2xl border border-white/20 font-mono text-center space-y-2 text-xs">
              <span className="text-base font-tech font-extrabold text-white tracking-widest block">{brandName.toUpperCase()}</span>
              <span className="text-cyan-300 font-bold block">SIZE: M • 100% ORGANIC COTTON 460 GSM</span>
              <span className="text-[10px] text-slate-400 block">MADE IN OPORTO (PORTUGAL) • RN# 84920</span>
              <div className="flex justify-center gap-3 text-sm pt-1">
                <span>🧺 30°C</span>
                <span>🚫 Cloro</span>
                <span>💨 Secado Aire</span>
                <span>🔥 Plancha Suave</span>
              </div>
            </div>
            <button
              onClick={() => alert('¡Plano de corte de etiqueta de cuello exportado en vector SVG!')}
              className="w-full py-2.5 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-cyan-300 font-bold text-xs uppercase"
            >
              Exportar Etiqueta Cuello (SVG 1:1)
            </button>
          </div>

          {/* Hangtag Card with Barcode */}
          <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
            <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
              <Barcode className="w-4 h-4 text-cyber-gold" /> Hangtag Colgante con Código EAN-13
            </h3>
            <div className="p-5 bg-cyber-950 rounded-2xl border border-cyber-gold/50 font-mono text-center space-y-2 text-xs">
              <span className="text-base font-tech font-extrabold text-cyber-gold tracking-widest block">{brandName}</span>
              <span className="text-white font-bold block">STYLE: CYBER BOMBER X-1</span>
              <span className="text-emerald-400 font-bold text-sm block">MSRP: $128.00 USD</span>
              <div className="p-2 bg-white text-black rounded-lg font-mono text-xs font-extrabold tracking-widest inline-block">
                |||| ||| ||||| || |||||| 750123849102
              </div>
            </div>
            <button
              onClick={() => alert('¡Hangtag de cartulina 400g con perforación exportado en PDF listo para imprenta!')}
              className="w-full py-2.5 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-cyber-gold font-bold text-xs uppercase"
            >
              Exportar Hangtag para Imprenta (PDF 300 DPI)
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Moodboard AI Extractor */}
      {activeTab === 'moodboard' && (
        <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" /> Extractor de Moodboards & Tendencias IA
              </h3>
              <p className="text-xs text-slate-400">Sube imágenes de inspiración y la IA extraerá automáticamente la paleta Pantone y los materiales</p>
            </div>
            <button
              onClick={handleExtractMoodboard}
              disabled={isExtractingMoodboard}
              className="px-4 py-2 rounded-xl bg-purple-500 text-white font-bold text-xs uppercase flex items-center gap-1.5 shadow-md"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isExtractingMoodboard ? 'animate-spin' : ''}`} />
              <span>{isExtractingMoodboard ? 'Analizando IA...' : 'Extraer Paleta de Moodboard'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&fit=crop&q=80'
            ].map((img, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-cyber-800 bg-black">
                <img src={img} alt="moodboard" className="w-full h-full object-cover opacity-85 hover:opacity-100 hover:scale-105 transition-all" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
