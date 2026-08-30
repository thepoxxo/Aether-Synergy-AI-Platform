import React, { useState, useRef } from 'react';
import { Model3DCanvas, ModelType } from '../common/Model3DCanvas';
import {
  Layers,
  Palette,
  Sliders,
  Film,
  Play,
  Download,
  Eye,
  EyeOff,
  Sparkles,
  Check,
  Upload,
  Box,
  Shirt,
  Armchair,
  SlidersHorizontal,
  Coffee,
  Wand2,
  Brush,
  RotateCcw,
  Pipette,
  Hash,
  Wind,
  Cpu,
  FileText,
  Image as ImageIcon,
  Move,
  Maximize2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const Aurora3DStudio: React.FC = () => {
  const { consumeCredit, role } = useAuth();
  const { t } = useLanguage();

  const [activeNicheTab, setActiveNicheTab] = useState<'fashion' | 'interior' | 'instrumentation' | 'merch'>('fashion');
  const [productType, setProductType] = useState<ModelType | string>('jacket');

  // Custom Colors & Hex Code
  const [primaryColor, setPrimaryColor] = useState('#1e293b');
  const [accentColor, setAccentColor] = useState('#e5a93c');
  const [primaryHexInput, setPrimaryHexInput] = useState('#1E293B');
  const [accentHexInput, setAccentHexInput] = useState('#E5A93C');

  // 💨 Cloth Physics & Wind State
  const [isClothWindActive, setIsClothWindActive] = useState(false);
  const [windIntensity, setWindIntensity] = useState<'gentle' | 'breeze' | 'gale'>('breeze');

  // 🎯 Decal & Logo Projector State
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [decalScale, setDecalScale] = useState(1.0);
  const [decalPosX, setDecalPosX] = useState(0);
  const [decalPosY, setDecalPosY] = useState(0);
  const [decalRotation, setDecalRotation] = useState(0);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Active AI Version
  const [activeVersion, setActiveVersion] = useState<string>('original');

  const [outlineWidth, setOutlineWidth] = useState(2.5);
  const [intensity, setIntensity] = useState('High');
  const [shadingMode, setShadingMode] = useState('Sharp');
  const [selectedDecal, setSelectedDecal] = useState('Dragon 龍');
  const [activeFrame, setActiveFrame] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);

  // AI Product Variations & Versions
  const productVersions = [
    {
      id: 'original',
      name: 'Original (Diseño Base)',
      tag: 'Diseño Base',
      primary: '#1E293B',
      accent: '#E5A93C',
      emoji: '🎨'
    },
    {
      id: 'cyberpunk',
      name: 'Variante 1: Cyberpunk Neon',
      tag: 'Cian & Negro',
      primary: '#0A0D14',
      accent: '#06B6D4',
      emoji: '⚡'
    },
    {
      id: 'nordic',
      name: 'Variante 2: Nordic Minimal',
      tag: 'Gris Ártico',
      primary: '#F1F5F9',
      accent: '#E5A93C',
      emoji: '❄️'
    },
    {
      id: 'techwear',
      name: 'Variante 3: Earthy Techwear',
      tag: 'Oliva & Grafito',
      primary: '#1C1917',
      accent: '#15803D',
      emoji: '🌲'
    },
    {
      id: 'luxury',
      name: 'Variante 4: Monochrome Luxury',
      tag: 'Oro & Obsidiana',
      primary: '#000000',
      accent: '#F59E0B',
      emoji: '👑'
    }
  ];

  const handleApplyVersion = (v: typeof productVersions[0]) => {
    setActiveVersion(v.id);
    setPrimaryColor(v.primary);
    setAccentColor(v.accent);
    setPrimaryHexInput(v.primary.toUpperCase());
    setAccentHexInput(v.accent.toUpperCase());
  };

  const handlePrimaryHexChange = (val: string) => {
    setPrimaryHexInput(val);
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      setPrimaryColor(val);
      setActiveVersion('custom');
    }
  };

  const handleAccentHexChange = (val: string) => {
    setAccentHexInput(val);
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      setAccentColor(val);
      setActiveVersion('custom');
    }
  };

  const handlePrimaryPickerChange = (val: string) => {
    setPrimaryColor(val);
    setPrimaryHexInput(val.toUpperCase());
    setActiveVersion('custom');
  };

  const handleAccentPickerChange = (val: string) => {
    setAccentColor(val);
    setAccentHexInput(val.toUpperCase());
    setActiveVersion('custom');
  };

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
          <div className="p-2.5 rounded-xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold shadow-gold-glow">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-tech font-bold text-white tracking-wide">
                AURORA 3D MULTI-INDUSTRY STUDIO
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyber-800 text-cyber-gold border border-cyber-700">
                PRO ENGINE v3.2 • COLOR LIBRE & VERSIONES IA
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Diseño, texturizado libre, círculo cromático, y simulación 3D para Moda, Interiores e Instrumentalización
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

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Color Wheel & AI Product Versions */}
        <div className="lg:col-span-4 space-y-4">
          {/* Total Color Freedom: Color Wheel & Hex Input */}
          <div className="bg-cyber-900 p-4 rounded-2xl border border-cyber-gold/50 shadow-cyber-card space-y-4">
            <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
              <span className="font-tech font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-cyber-gold" /> CÍRCULO CROMÁTICO & COLOR LIBRE
              </span>
              <span className="text-[10px] text-cyber-gold font-mono uppercase">{activeVersion}</span>
            </div>

            {/* Primary Fabric Color */}
            <div className="space-y-2">
              <label className="text-slate-300 font-tech font-bold text-xs flex items-center justify-between">
                <span>Color Base Prenda / Objeto:</span>
                <span className="font-mono text-[11px] text-cyber-gold">{primaryColor.toUpperCase()}</span>
              </label>

              <div className="flex items-center gap-2">
                <div className="relative w-12 h-10 rounded-xl overflow-hidden border-2 border-cyber-gold shadow-md shrink-0 cursor-pointer">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => handlePrimaryPickerChange(e.target.value)}
                    className="absolute -inset-2 w-16 h-16 cursor-pointer opacity-100"
                    title="Abrir Círculo Cromático"
                  />
                </div>

                <div className="relative flex-1">
                  <Hash className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={primaryHexInput}
                    onChange={(e) => handlePrimaryHexChange(e.target.value)}
                    placeholder="#1E293B"
                    maxLength={7}
                    className="w-full bg-cyber-950 border border-cyber-700 focus:border-cyber-gold rounded-xl pl-8 pr-3 py-2 text-xs font-mono text-white uppercase focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Accent & Trims Color */}
            <div className="space-y-2 pt-2 border-t border-cyber-800">
              <label className="text-slate-300 font-tech font-bold text-xs flex items-center justify-between">
                <span>Color Acento, Bolsillos & Avíos:</span>
                <span className="font-mono text-[11px] text-cyber-gold">{accentColor.toUpperCase()}</span>
              </label>

              <div className="flex items-center gap-2">
                <div className="relative w-12 h-10 rounded-xl overflow-hidden border-2 border-white shadow-md shrink-0 cursor-pointer">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => handleAccentPickerChange(e.target.value)}
                    className="absolute -inset-2 w-16 h-16 cursor-pointer opacity-100"
                    title="Abrir Círculo Cromático"
                  />
                </div>

                <div className="relative flex-1">
                  <Hash className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={accentHexInput}
                    onChange={(e) => handleAccentHexChange(e.target.value)}
                    placeholder="#E5A93C"
                    maxLength={7}
                    className="w-full bg-cyber-950 border border-cyber-700 focus:border-cyber-gold rounded-xl pl-8 pr-3 py-2 text-xs font-mono text-white uppercase focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Product Versions & Variants */}
          <div className="bg-cyber-900 p-4 rounded-2xl border border-cyber-800 shadow-cyber-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-tech font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-cyber-gold" /> VARIACIONES & VERSIONES IA
              </span>
              <span className="text-[10px] text-slate-400 font-mono">1 Clic</span>
            </div>

            <div className="space-y-2">
              {productVersions.map((v) => {
                const isSelected = activeVersion === v.id;

                return (
                  <button
                    key={v.id}
                    onClick={() => handleApplyVersion(v)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all group ${
                      isSelected
                        ? 'bg-cyber-gold/20 border-cyber-gold text-white shadow-gold-glow'
                        : 'bg-cyber-950 border-cyber-800 hover:border-cyber-gold/40 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{v.emoji}</span>
                      <div>
                        <div className="font-tech font-bold text-xs group-hover:text-cyber-gold transition-colors">
                          {v.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">{v.tag}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="w-3.5 h-3.5 rounded-full border border-cyber-700" style={{ backgroundColor: v.primary }} />
                      <div className="w-3.5 h-3.5 rounded-full border border-cyber-700" style={{ backgroundColor: v.accent }} />
                      {isSelected && <Check className="w-4 h-4 text-cyber-gold ml-1.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Column: 3D Viewport with Multi-Touch & Exploded View */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="h-[490px] w-full">
            <Model3DCanvas
              type={productType}
              primaryColor={primaryColor}
              accentColor={accentColor}
              onPrimaryColorChange={(newCol) => {
                setPrimaryColor(newCol);
                setPrimaryHexInput(newCol.toUpperCase());
                setActiveVersion('custom');
              }}
              celShaded={true}
              showDecal={layers.find((l) => l.id === 'graphic')?.visible}
              clothPhysicsEnabled={isClothWindActive}
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
                <span>Atajos: R (Giro) • S (Shader) • G (Rejilla) • F (Frontal)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Decal Projector, Cloth Physics & Shader Controls */}
        <div className="lg:col-span-3 space-y-4">
          {/* 💨 1. Cloth & Wind Physics Simulator */}
          <div className="bg-cyber-900 p-4 rounded-2xl border border-cyan-500/40 shadow-cyber-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-tech font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-cyan-400" /> FÍSICA DE TELA & VIENTO
              </span>
              <button
                onClick={() => setIsClothWindActive(!isClothWindActive)}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase transition-all ${
                  isClothWindActive
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                    : 'bg-cyber-950 text-slate-400 border border-cyber-700'
                }`}
              >
                {isClothWindActive ? '🌬️ Activo' : 'Pausado'}
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Simulación de caída textil y ondulación en tiempo real sobre los vértices 3D.
            </p>

            <div className="grid grid-cols-3 gap-1 text-[11px] font-mono">
              {(['gentle', 'breeze', 'gale'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setWindIntensity(mode);
                    setIsClothWindActive(true);
                  }}
                  className={`py-1.5 rounded-lg border capitalize transition-all ${
                    windIntensity === mode && isClothWindActive
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 font-bold'
                      : 'bg-cyber-950 border-cyber-800 text-slate-400'
                  }`}
                >
                  {mode === 'gentle' ? 'Suave' : mode === 'breeze' ? 'Brisa' : 'Fuerte'}
                </button>
              ))}
            </div>
          </div>

          {/* 🎯 2. Decal & Logo Projector on Mesh */}
          <div className="bg-cyber-900 p-4 rounded-2xl border border-cyber-800 shadow-cyber-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-tech font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyber-gold" /> ESTAMPADOR DE LOGOS 3D
              </span>
              <button
                onClick={() => logoInputRef.current?.click()}
                className="text-[10px] font-mono text-cyber-gold hover:underline flex items-center gap-1"
              >
                <Upload className="w-3 h-3" /> Subir PNG
              </button>
            </div>

            <input
              ref={logoInputRef}
              type="file"
              accept=".png,.svg,.webp,.jpg"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setCustomLogoUrl(url);
                }
              }}
            />

            {/* Decal Sliders */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Escala del Logo:</span>
                <span className="font-mono text-white">{decalScale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="2.0"
                step="0.1"
                value={decalScale}
                onChange={(e) => setDecalScale(Number(e.target.value))}
                className="w-full accent-cyber-gold"
              />

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Posición X</span>
                    <span>{decalPosX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={decalPosX}
                    onChange={(e) => setDecalPosX(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Posición Y</span>
                    <span>{decalPosY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={decalPosY}
                    onChange={(e) => setDecalPosY(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Preset Logos */}
            <div className="space-y-1.5 pt-2 border-t border-cyber-800">
              {['Dragon 龍 (Aether Neo)', 'Akira Gear 2045', 'Cyber Tiger Tech'].map((dec) => (
                <button
                  key={dec}
                  onClick={() => setSelectedDecal(dec)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl border text-left text-xs transition-all ${
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

          {/* 3. Shader Properties */}
          <div className="bg-cyber-900 p-4 rounded-2xl border border-cyber-800 shadow-cyber-card">
            <span className="font-tech font-bold text-xs uppercase tracking-wider text-slate-300 block mb-3 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyber-gold" /> {t('aurora.shaderStyle')}
            </span>

            <div className="space-y-4 text-xs">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
