import React, { useState } from 'react';
import { Model3DCanvas, ModelType } from '../common/Model3DCanvas';
import { Layers, Palette, Sliders, Film, Play, Download, Eye, EyeOff, Sparkles, Check, Upload, Box, Shirt, Armchair, SlidersHorizontal, Coffee } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const Aurora3DStudio: React.FC = () => {
  const { consumeCredit, role } = useAuth();
  const { t } = useLanguage();

  const [activeNicheTab, setActiveNicheTab] = useState<'fashion' | 'interior' | 'instrumentation' | 'merch'>('fashion');
  const [productType, setProductType] = useState<ModelType>('jacket');
  const [primaryColor, setPrimaryColor] = useState('#1e293b');
  const [accentColor, setAccentColor] = useState('#e5a93c');
  const [outlineWidth, setOutlineWidth] = useState(2.5);
  const [intensity, setIntensity] = useState('High');
  const [shadingMode, setShadingMode] = useState('Sharp');
  const [selectedDecal, setSelectedDecal] = useState('Dragon 龍');
  const [activeFrame, setActiveFrame] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);

  const [layers, setLayers] = useState([
    { id: 'graphic', name: 'Graphic Decal [Active]', visible: true },
    { id: 'base_mesh', name: 'Base 3D Mesh (.GLB)', visible: true },
    { id: 'texture_map', name: 'Texture Map (PBR/Cel)', visible: true },
    { id: 'outline', name: 'Outline Toon Shader', visible: true },
    { id: 'grid', name: 'Grid Floor Floor3D', visible: true },
  ]);

  const toggleLayer = (id: string) => {
    setLayers(layers.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)));
  };

  const handleExport = () => {
    if (consumeCredit()) {
      alert(`¡Modelo 3D exportado con éxito en formato .GLB y render 360°! (${role === 'free' ? 'Con marca de agua Free' : 'Sin marcas de agua - Pro HD'})`);
    }
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn transition-colors">
      {/* Studio Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900 p-4 rounded-2xl border border-cyber-700/80 shadow-cyber-card">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-tech font-bold text-white tracking-wide">
                AURORA 3D MULTI-INDUSTRY STUDIO
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyber-800 text-cyber-gold border border-cyber-700">
                PRO ENGINE v3.2 • TOUCH OPTIMIZED
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Diseño, texturizado y simulación 3D para Moda, Decoración de Interiores e Instrumentalización
            </p>
          </div>
        </div>

        {/* Niche Tabs & Export */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-cyber-950 p-1 rounded-xl border border-cyber-800 text-xs shadow-sm">
            <button
              onClick={() => {
                setActiveNicheTab('fashion');
                setProductType('jacket');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeNicheTab === 'fashion' ? 'bg-cyber-gold text-black shadow-gold-glow font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shirt className="w-3.5 h-3.5" /> Moda
            </button>
            <button
              onClick={() => {
                setActiveNicheTab('interior');
                setProductType('chair');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeNicheTab === 'interior' ? 'bg-cyber-gold text-black shadow-gold-glow font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Armchair className="w-3.5 h-3.5" /> Interiores
            </button>
            <button
              onClick={() => {
                setActiveNicheTab('instrumentation');
                setProductType('synth');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeNicheTab === 'instrumentation' ? 'bg-cyber-gold text-black shadow-gold-glow font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Hardware
            </button>
            <button
              onClick={() => {
                setActiveNicheTab('merch');
                setProductType('tumbler');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeNicheTab === 'merch' ? 'bg-cyber-gold text-black shadow-gold-glow font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" /> Merch
            </button>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-gold to-amber-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Exportar .GLB 4K</span>
          </button>
        </div>
      </div>

      {/* Model Sub-Selector Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-tech font-bold uppercase text-slate-400 shrink-0">Modelos 3D Disponibles:</span>
        {activeNicheTab === 'fashion' && (
          <div className="flex gap-1.5">
            <button
              onClick={() => setProductType('jacket')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                productType === 'jacket' ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold' : 'bg-cyber-900 border-cyber-800 text-slate-300'
              }`}
            >
              🧥 Chaqueta Techwear
            </button>
            <button
              onClick={() => setProductType('hoodie')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                productType === 'hoodie' ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold' : 'bg-cyber-900 border-cyber-800 text-slate-300'
              }`}
            >
              👕 Hoodie Oversized
            </button>
            <button
              onClick={() => setProductType('sneaker')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                productType === 'sneaker' ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold' : 'bg-cyber-900 border-cyber-800 text-slate-300'
              }`}
            >
              👟 Sneaker Cyberpunk X-1
            </button>
          </div>
        )}

        {activeNicheTab === 'interior' && (
          <div className="flex gap-1.5">
            <button
              onClick={() => setProductType('chair')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                productType === 'chair' ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold' : 'bg-cyber-900 border-cyber-800 text-slate-300'
              }`}
            >
              🛋️ Sillón Lounge Escandinavo
            </button>
            <button
              onClick={() => setProductType('table')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                productType === 'table' ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold' : 'bg-cyber-900 border-cyber-800 text-slate-300'
              }`}
            >
              🪵 Mesa de Centro Minimalista
            </button>
          </div>
        )}

        {activeNicheTab === 'instrumentation' && (
          <div className="flex gap-1.5">
            <button
              onClick={() => setProductType('synth')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                productType === 'synth' ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold' : 'bg-cyber-900 border-cyber-800 text-slate-300'
              }`}
            >
              🎛️ Sintetizador Modular OLED
            </button>
            <button
              onClick={() => setProductType('speaker')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                productType === 'speaker' ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold' : 'bg-cyber-900 border-cyber-800 text-slate-300'
              }`}
            >
              🔊 Monitor de Estudio Audio
            </button>
          </div>
        )}

        {activeNicheTab === 'merch' && (
          <div className="flex gap-1.5">
            <button
              onClick={() => setProductType('tumbler')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                productType === 'tumbler' ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold' : 'bg-cyber-900 border-cyber-800 text-slate-300'
              }`}
            >
              ☕ Termo Térmico Merch
            </button>
          </div>
        )}
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Layer Stack & Colors */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-cyber-900 p-4 rounded-2xl border border-cyber-800 shadow-cyber-card">
            <div className="flex items-center justify-between mb-3">
              <span className="font-tech font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyber-gold" /> {t('aurora.layerStack')}
              </span>
              <span className="text-[10px] text-cyber-gold font-mono">{t('aurora.layersCount')}</span>
            </div>

            <div className="space-y-1.5">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-cyber-950 border border-cyber-800 text-xs hover:border-cyber-gold/40 transition-colors shadow-sm"
                >
                  <span className={layer.visible ? 'text-slate-200' : 'text-slate-600 line-through'}>
                    {layer.name}
                  </span>
                  <button
                    onClick={() => toggleLayer(layer.id)}
                    className="p-1 text-slate-400 hover:text-cyber-gold transition-colors"
                  >
                    {layer.visible ? <Eye className="w-3.5 h-3.5 text-cyber-gold" /> : <EyeOff className="w-3.5 h-3.5 text-slate-600" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cyber-900 p-4 rounded-2xl border border-cyber-800 shadow-cyber-card">
            <span className="font-tech font-bold text-xs uppercase tracking-wider text-slate-300 block mb-3 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-cyber-gold" /> {t('aurora.colors')}
            </span>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">{t('aurora.baseColor')}</label>
                <div className="flex items-center gap-2">
                  {['#171E2E', '#0F172A', '#27272A', '#831843', '#14532D', '#78350F'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setPrimaryColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-6 h-6 rounded-lg border transition-all ${
                        primaryColor === c ? 'border-cyber-gold scale-110 shadow-gold-glow' : 'border-cyber-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">{t('aurora.accentColor')}</label>
                <div className="flex items-center gap-2">
                  {['#E5A93C', '#F59E0B', '#06B6D4', '#A855F7', '#EF4444', '#10B981'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setAccentColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-6 h-6 rounded-lg border transition-all ${
                        accentColor === c ? 'border-white scale-110 shadow-gold-glow' : 'border-cyber-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: 3D Viewport with Multi-Touch & Exploded View */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <div className="h-[490px] w-full">
            <Model3DCanvas
              type={productType}
              primaryColor={primaryColor}
              accentColor={accentColor}
              celShaded={true}
              showDecal={layers.find((l) => l.id === 'graphic')?.visible}
            />
          </div>

          {/* Green Screen Chroma Key Timeline */}
          <div className="bg-cyber-900 p-4 rounded-2xl border border-cyber-800 shadow-cyber-card">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="font-tech font-bold text-white flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-cyber-gold" /> {t('aurora.chromaTitle')}
              </span>
              <span className="text-emerald-500 font-mono text-[11px]">{t('aurora.seq')}</span>
            </div>

            <div className="relative h-8 rounded-lg bg-emerald-600 border border-emerald-400 overflow-hidden flex items-center px-2 mb-3">
              <div
                className="absolute top-0 bottom-0 w-1 bg-cyber-gold shadow-gold-glow"
                style={{ left: `${(activeFrame / 120) * 100}%` }}
              />
              <div className="w-full flex justify-between text-[9px] font-mono text-black font-extrabold pointer-events-none">
                <span>00:00</span>
                <span>F45</span>
                <span>F90</span>
                <span>00:15 (F120)</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-lg bg-cyber-800 hover:bg-cyber-700 text-cyber-gold transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                </button>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={activeFrame}
                  onChange={(e) => setActiveFrame(Number(e.target.value))}
                  className="w-36 sm:w-48 accent-cyber-gold cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                <span>Touch Gestures: 1 Dedo Rotar • 2 Dedos Zoom & Pan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Material & Decal Properties */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-cyber-900 p-4 rounded-2xl border border-cyber-800 shadow-cyber-card">
            <span className="font-tech font-bold text-xs uppercase tracking-wider text-slate-300 block mb-3 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyber-gold" /> {t('aurora.shaderStyle')}
            </span>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Motor de Render</label>
                <div className="p-2 rounded-xl bg-cyber-950 border border-cyber-gold/40 text-cyber-gold font-bold font-mono">
                  Three.js v0.170 + Shader Multi-Nicho
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>{t('aurora.outlineThickness')}</span>
                  <span className="font-mono text-white">{outlineWidth}px</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={outlineWidth}
                  onChange={(e) => setOutlineWidth(Number(e.target.value))}
                  className="w-full accent-cyber-gold"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">{t('aurora.intensity')}</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Low', 'Medium', 'High'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setIntensity(lvl)}
                      className={`py-1.5 rounded-lg border font-semibold ${
                        intensity === lvl
                          ? 'bg-cyber-gold text-black border-cyber-gold shadow-gold-glow'
                          : 'bg-cyber-950 border-cyber-800 text-slate-400'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">{t('aurora.shadingMode')}</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['Sharp', 'Smooth'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setShadingMode(mode)}
                      className={`py-1.5 rounded-lg border font-semibold ${
                        shadingMode === mode
                          ? 'bg-cyber-gold text-black border-cyber-gold shadow-gold-glow'
                          : 'bg-cyber-950 border-cyber-800 text-slate-400'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Decal & Graphic Mapping */}
          <div className="bg-cyber-900 p-4 rounded-2xl border border-cyber-800 shadow-cyber-card">
            <span className="font-tech font-bold text-xs uppercase tracking-wider text-slate-300 block mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyber-gold" /> {t('aurora.decalGraphic')}
            </span>

            <div className="space-y-2 text-xs">
              {['Dragon 龍 (Aether Neo)', 'Akira Gear 2045', 'Cyber Tiger Tech', 'Minimalist Nordic Logo'].map((dec) => (
                <button
                  key={dec}
                  onClick={() => setSelectedDecal(dec)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                    selectedDecal === dec
                      ? 'bg-cyber-gold/20 border-cyber-gold text-cyber-gold font-bold'
                      : 'bg-cyber-950 border-cyber-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{dec}</span>
                  {selectedDecal === dec && <Check className="w-3.5 h-3.5 text-cyber-gold" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
