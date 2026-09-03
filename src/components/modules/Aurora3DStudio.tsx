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
  Move,
  X,
  PenTool,
  Type,
  Sun,
  Moon,
  Sunset,
  Contrast,
  RefreshCw,
  Zap,
  Disc,
  CheckCircle2,
  Wind,
  FolderDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  BlendMode,
  PbrLayer,
  ActiveStudioTool,
  ViewportShadingMode,
  LightingPreset,
  VectorPathBevel,
  SubstanceMaterialPreset,
  PhotoshopColorGrade
} from '../../types/adobe3dTools';

export const Aurora3DStudio: React.FC = () => {
  const { consumeCredit, role } = useAuth();
  const { t } = useLanguage();

  const [activeNicheTab, setActiveNicheTab] = useState<'fashion' | 'interior' | 'instrumentation' | 'merch'>('fashion');
  const [productType, setProductType] = useState<ModelType | string>('jacket');
  const [isCapsuleModalOpen, setIsCapsuleModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const [activeTool, setActiveTool] = useState<ActiveStudioTool>('orbit');
  const [activeInspectorTab, setActiveInspectorTab] = useState<'layers' | 'illustrator' | 'substance' | 'photoshop_filters' | 'decals_physics' | 'ai_texture'>('layers');
  const [viewportShading, setViewportShading] = useState<ViewportShadingMode>('pbr_rendered');
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('studio_soft');

  const [primaryColor, setPrimaryColor] = useState('#1e293b');
  const [accentColor, setAccentColor] = useState('#e5a93c');
  const [primaryHexInput, setPrimaryHexInput] = useState('#1E293B');
  const [accentHexInput, setAccentHexInput] = useState('#E5A93C');
  const [activeVersion, setActiveVersion] = useState<string>('original');

  const [pbrLayers, setPbrLayers] = useState<PbrLayer[]>([
    { id: 'albedo', name: '🎨 Albedo Base (Color)', channel: 'albedo', visible: true, opacity: 100, blendMode: 'normal', color: primaryColor },
    { id: 'normal_map', name: '🗺️ Normal Bump (Relieve)', channel: 'normal', visible: true, opacity: 85, blendMode: 'overlay' },
    { id: 'roughness', name: '✨ Roughness / Especular', channel: 'roughness', visible: true, opacity: 90, blendMode: 'multiply' },
    { id: 'metallic', name: '🛡️ Metallic Map', channel: 'metallic', visible: true, opacity: 40, blendMode: 'screen' },
    { id: 'displacement', name: '💎 Displacement 3D', channel: 'height', visible: true, opacity: 70, blendMode: 'soft_light' },
    { id: 'decal_layer', name: '🐉 Decal Gráfico & Logo', channel: 'decal', visible: true, opacity: 100, blendMode: 'normal' },
    { id: 'stitches', name: '🧵 Costuras & Bordados Hilo', channel: 'albedo', visible: true, opacity: 95, blendMode: 'multiply' }
  ]);

  const toggleLayerVisibility = (layerId: string) => {
    setPbrLayers((prev) => prev.map((l) => (l.id === layerId ? { ...l, visible: !l.visible } : l)));
  };

  const updateLayerOpacity = (layerId: string, opacity: number) => {
    setPbrLayers((prev) => prev.map((l) => (l.id === layerId ? { ...l, opacity } : l)));
  };

  const updateLayerBlendMode = (layerId: string, blendMode: BlendMode) => {
    setPbrLayers((prev) => prev.map((l) => (l.id === layerId ? { ...l, blendMode } : l)));
  };

  const [psFilters, setPsFilters] = useState<PhotoshopColorGrade>({
    exposure: 5,
    contrast: 15,
    saturation: 10,
    vibrance: 20,
    hueShift: 0,
    curvesTone: 'neutral'
  });

  const [vectorBevel, setVectorBevel] = useState<VectorPathBevel>({
    extrusionDepth: 3.5,
    bevelRadius: 1.2,
    strokeWeight: 2.0,
    isCurvedText: true,
    customText: 'AETHER • SYNERGY 2026',
    patternRepeat: 'monogram_grid',
    patternScale: 1.5
  });

  const [bezierPoints, setBezierPoints] = useState<Array<{ x: number; y: number }>>([
    { x: 30, y: 80 }, { x: 90, y: 30 }, { x: 170, y: 130 }, { x: 230, y: 70 }
  ]);

  const substanceMaterials: SubstanceMaterialPreset[] = [
    { id: 'italian_leather', name: '🐂 Cuero Italiano Vacuno', category: 'leather', roughness: 0.42, metalness: 0.05, bumpIntensity: 1.4, subsurfaceScattering: 0.15, previewColor: '#3d2314', normalTextureName: 'full_grain_leather_norm.png' },
    { id: 'raw_denim', name: '👖 Denim Sarga Japonesa', category: 'textile', roughness: 0.85, metalness: 0.0, bumpIntensity: 1.8, subsurfaceScattering: 0.05, previewColor: '#1e3a8a', normalTextureName: 'twill_denim_norm.png' },
    { id: 'carbon_fiber', name: '🏎️ Fibra Carbono Aeroespacial', category: 'polymer', roughness: 0.18, metalness: 0.75, bumpIntensity: 2.1, subsurfaceScattering: 0.0, previewColor: '#111827', normalTextureName: 'carbon_weave_norm.png' },
    { id: 'brushed_chrome', name: '🛡️ Cromo Anodizado Mate', category: 'metal', roughness: 0.22, metalness: 0.95, bumpIntensity: 0.8, subsurfaceScattering: 0.0, previewColor: '#94a3b8', normalTextureName: 'brushed_metal_norm.png' },
    { id: 'royal_silk', name: '👘 Seda Satén Real Lustre', category: 'textile', roughness: 0.28, metalness: 0.2, bumpIntensity: 0.6, subsurfaceScattering: 0.4, previewColor: '#4c1d95', normalTextureName: 'silk_satin_norm.png' },
    { id: 'crushed_velvet', name: '👑 Terciopelo Machacado', category: 'textile', roughness: 0.88, metalness: 0.1, bumpIntensity: 2.4, subsurfaceScattering: 0.65, previewColor: '#831843', normalTextureName: 'velvet_crush_norm.png' },
    { id: 'gold_leaf', name: '🪙 Pan de Oro 24K & Obsidiana', category: 'metal', roughness: 0.12, metalness: 0.98, bumpIntensity: 1.2, subsurfaceScattering: 0.0, previewColor: '#eab308', normalTextureName: 'gold_leaf_norm.png' },
    { id: 'ripstop_nylon', name: '🏕️ Nylon Ripstop Militar', category: 'textile', roughness: 0.55, metalness: 0.15, bumpIntensity: 1.9, subsurfaceScattering: 0.1, previewColor: '#14532d', normalTextureName: 'ripstop_grid_norm.png' }
  ];

  const [activeMaterial, setActiveMaterial] = useState<SubstanceMaterialPreset>(substanceMaterials[0]);

  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [decalScale, setDecalScale] = useState(1.0);
  const [decalPosX, setDecalPosX] = useState(0);
  const [decalPosY, setDecalPosY] = useState(0);
  const [selectedDecal, setSelectedDecal] = useState('Dragon 龍 (Aether Neo)');
  const [isClothWindActive, setIsClothWindActive] = useState(false);
  const [windIntensity, setWindIntensity] = useState<'gentle' | 'breeze' | 'gale'>('breeze');
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [aiPrompt, setAiPrompt] = useState('Cuero negro envejecido con costuras doradas y desgaste vintage en bordes');
  const [isGeneratingTexture, setIsGeneratingTexture] = useState(false);
  const [generatedTextureSuccess, setGeneratedTextureSuccess] = useState(false);

  const [activeFrame, setActiveFrame] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleApplyVersion = (v: any) => {
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

  const handleGenerateAiTexture = () => {
    if (!aiPrompt.trim()) return;
    setIsGeneratingTexture(true);
    setGeneratedTextureSuccess(false);
    setTimeout(() => {
      setIsGeneratingTexture(false);
      setGeneratedTextureSuccess(true);
      setPrimaryColor('#2b1d14');
      setAccentColor('#eab308');
      setPrimaryHexInput('#2B1D14');
      setAccentHexInput('#EAB308');
      setActiveVersion('ai_synth');
    }, 2000);
  };

  const handleExportSuite = (format: 'psd' | 'ai' | 'glb' | 'usdz' | 'all') => {
    if (consumeCredit()) {
      setIsExportModalOpen(false);
      const formatNames: Record<string, string> = {
        psd: 'Adobe Photoshop (.PSD Multi-Capa PBR)',
        ai: 'Adobe Illustrator (.AI & .SVG Vectorial)',
        glb: 'Blender & CLO3D (.GLB 3D)',
        usdz: 'Apple Vision Pro & Unreal Engine (.USDZ)',
        all: 'Paquete Master Completo (.ZIP)'
      };
      alert(`¡Archivo exportado exitosamente!\nFormato: ${formatNames[format]}`);
    }
  };

  return (
    <div className="p-3 sm:p-5 max-w-[1600px] mx-auto space-y-4 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-cyber-900 p-3 sm:p-4 rounded-2xl border border-cyber-800 shadow-cyber-card">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold shadow-gold-glow">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-tech font-bold text-white tracking-wide">AURORA 3D CREATIVE SUITE</h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyber-800 text-cyber-gold border border-cyber-700">PHOTOSHOP • ILLUSTRATOR • SUBSTANCE 3D</span>
            </div>
            <p className="text-[11px] text-slate-400">Modelado paramétrico, curvas Bézier, capas PBR y simulación de física en tiempo real</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-cyber-950 p-1 rounded-xl border border-cyber-800 text-xs shadow-sm">
            {[
              { id: 'fashion', label: 'Moda', icon: Shirt },
              { id: 'interior', label: 'Interiores', icon: Armchair },
              { id: 'instrumentation', label: 'Hardware', icon: SlidersHorizontal },
              { id: 'merch', label: 'Merch', icon: Coffee }
            ].map((n) => (
              <button
                key={n.id}
                onClick={() => { setActiveNicheTab(n.id as any); setProductType(n.id === 'fashion' ? 'jacket' : n.id === 'interior' ? 'chair' : n.id === 'instrumentation' ? 'synth' : 'tumbler'); }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${activeNicheTab === n.id ? 'bg-cyber-gold text-black shadow-gold-glow font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                <n.icon className="w-3.5 h-3.5" /> {n.label}
              </button>
            ))}
          </div>
          <button onClick={() => setIsCapsuleModalOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500 text-purple-300 font-tech font-bold text-xs uppercase tracking-wider transition-all">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Cápsula 6 Prendas IA</span>
          </button>
          <button onClick={() => setIsExportModalOpen(true)} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyber-gold to-amber-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all">
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Suite</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-1 flex lg:flex-col items-center justify-between lg:justify-start gap-2 bg-cyber-900 p-2.5 rounded-2xl border border-cyber-800 shadow-cyber-card overflow-x-auto">
          {[
            { id: 'orbit', icon: Move, label: 'Orbitar 3D', tab: 'layers' },
            { id: 'vector_pen', icon: PenTool, label: 'Pluma Bézier', tab: 'illustrator' },
            { id: 'typography', icon: Type, label: 'Tipografía', tab: 'illustrator' },
            { id: 'pbr_layers', icon: Layers, label: 'Capas PS', tab: 'layers' },
            { id: 'photoshop_filters', icon: Contrast, label: 'Filtros HSL', tab: 'photoshop_filters' },
            { id: 'substance_materials', icon: Palette, label: 'Materiales PBR', tab: 'substance' },
            { id: 'decal_projector', icon: Disc, label: 'Decals', tab: 'decals_physics' },
            { id: 'cloth_physics', icon: Wind, label: 'Física CLO3D', tab: 'decals_physics' },
            { id: 'ai_inpaint', icon: Wand2, label: 'IA Textura', tab: 'ai_texture' }
          ].map((tItem) => {
            const Icon = tItem.icon;
            const isActive = activeTool === tItem.id;
            return (
              <button key={tItem.id} onClick={() => { setActiveTool(tItem.id as ActiveStudioTool); setActiveInspectorTab(tItem.tab as any); }} className={`p-2.5 rounded-xl transition-all relative group flex flex-col items-center justify-center shrink-0 ${isActive ? 'bg-cyber-gold text-black shadow-gold-glow font-bold' : 'bg-cyber-950 text-slate-400 hover:text-white hover:bg-cyber-800 border border-cyber-800'}`}>
                <Icon className="w-4 h-4" />
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-cyber-950 border border-cyber-gold/40 text-cyber-gold font-mono text-[10px] rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-cyber-card">{tItem.label}</div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-cyber-900 px-3 py-2 rounded-2xl border border-cyber-800 text-xs font-mono">
            <div className="flex items-center gap-1">
              <span className="text-slate-400 text-[10px] mr-1">Shading:</span>
              {(['pbr_rendered', 'wireframe', 'solid_clay', 'uv_texture'] as ViewportShadingMode[]).map((shMode) => (
                <button key={shMode} onClick={() => setViewportShading(shMode)} className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${viewportShading === shMode ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500' : 'text-slate-400 hover:text-white'}`}>
                  {shMode === 'pbr_rendered' ? 'PBR' : shMode === 'wireframe' ? 'Wire' : shMode === 'solid_clay' ? 'Clay' : 'UV'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[ { id: 'studio_soft', icon: Sun }, { id: 'cyber_neon', icon: Zap }, { id: 'golden_hour', icon: Sunset }, { id: 'darkroom_spot', icon: Moon } ].map((lit) => (
                <button key={lit.id} onClick={() => setLightingPreset(lit.id as LightingPreset)} className={`p-1 rounded text-[10px] font-bold transition-all ${lightingPreset === lit.id ? 'bg-cyber-gold/20 text-cyber-gold border border-cyber-gold' : 'text-slate-400'}`}>
                  <lit.icon className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-[480px] w-full rounded-3xl overflow-hidden border border-cyber-800 shadow-cyber-card bg-cyber-950">
            <Model3DCanvas
              type={productType}
              primaryColor={primaryColor}
              accentColor={accentColor}
              onPrimaryColorChange={(newCol) => { setPrimaryColor(newCol); setPrimaryHexInput(newCol.toUpperCase()); setActiveVersion('custom'); }}
              celShaded={viewportShading === 'solid_clay' ? false : true}
              showDecal={pbrLayers.find((l) => l.id === 'decal_layer')?.visible}
              clothPhysicsEnabled={isClothWindActive}
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none font-mono text-[10px]">
              <div className="bg-cyber-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cyber-700/60 text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>WebGPU 60 FPS</span>
              </div>
            </div>
          </div>

          <div className="bg-cyber-900 p-3.5 rounded-2xl border border-cyber-800 shadow-cyber-card space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-tech font-bold text-white flex items-center gap-1.5"><Film className="w-3.5 h-3.5 text-cyber-gold" /> {t('aurora.chromaTitle')}</span>
              <span className="text-emerald-400 font-mono text-[11px] font-bold">F{activeFrame} / 120</span>
            </div>
            <div className="relative h-6 rounded-lg bg-emerald-700/80 border border-emerald-500 overflow-hidden flex items-center px-2">
              <div className="absolute top-0 bottom-0 w-1 bg-cyber-gold shadow-gold-glow" style={{ left: `${(activeFrame / 120) * 100}%` }} />
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <button onClick={() => setIsPlaying(!isPlaying)} className="p-1.5 rounded-lg bg-cyber-800 hover:bg-cyber-700 text-cyber-gold"><Play className="w-3.5 h-3.5" /></button>
              <input type="range" min="1" max="120" value={activeFrame} onChange={(e) => setActiveFrame(Number(e.target.value))} className="w-36 accent-cyber-gold cursor-pointer" />
            </div>
          </div>
        </div>

        {/* =========================================================
            RIGHT INSPECTOR PANEL (ADOBE & SUBSTANCE TOOL TABS)
            ========================================================= */}
        <div className="lg:col-span-5 bg-cyber-900 p-4 rounded-3xl border border-cyber-800 shadow-cyber-card space-y-4 max-h-[660px] overflow-y-auto">
          {/* Top Inspector Tabs */}
          <div className="flex bg-cyber-950 p-1 rounded-2xl border border-cyber-800 text-[11px] font-tech font-bold overflow-x-auto">
            {[
              { id: 'layers', label: 'Capas PS', icon: Layers },
              { id: 'illustrator', label: 'Vectores AI', icon: PenTool },
              { id: 'substance', label: 'Materiales 3D', icon: Palette },
              { id: 'photoshop_filters', label: 'Filtros HSL', icon: Contrast },
              { id: 'decals_physics', label: 'Logos & Física', icon: Disc },
              { id: 'ai_texture', label: 'IA Textura', icon: Wand2 }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeInspectorTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveInspectorTab(tab.id as any)}
                  className={`flex-1 py-1.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1 whitespace-nowrap ${
                    isSelected
                      ? 'bg-cyber-gold text-black shadow-gold-glow font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <TabIcon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* =========================================================
              TAB 1: ADOBE PHOTOSHOP PBR LAYERS & BLENDING MODES
              ========================================================= */}
          {activeInspectorTab === 'layers' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
                <span className="font-tech font-bold text-xs uppercase text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyber-gold" /> JERARQUÍA DE CAPAS PBR (PHOTOSHOP)
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">MODOS DE FUSIÓN ACTIVOS</span>
              </div>

              {/* Color Wheel & Custom Palette */}
              <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3">
                <div className="text-[11px] font-tech font-bold text-slate-300">Círculo Cromático & Selección Libre:</div>
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Primary Color Picker */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono block">Color Base: {primaryHexInput}</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => handlePrimaryPickerChange(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-cyber-700"
                      />
                      <input
                        type="text"
                        value={primaryHexInput}
                        onChange={(e) => handlePrimaryHexChange(e.target.value)}
                        className="w-full bg-cyber-900 border border-cyber-700 rounded-lg px-2 py-1 text-xs font-mono text-white"
                      />
                    </div>
                  </div>

                  {/* Accent Color Picker */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono block">Color Acento: {accentHexInput}</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => handleAccentPickerChange(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-cyber-700"
                      />
                      <input
                        type="text"
                        value={accentHexInput}
                        onChange={(e) => handleAccentHexChange(e.target.value)}
                        className="w-full bg-cyber-900 border border-cyber-700 rounded-lg px-2 py-1 text-xs font-mono text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer Stack */}
              <div className="space-y-2">
                {pbrLayers.map((layer) => (
                  <div
                    key={layer.id}
                    className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-800 hover:border-cyber-700 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleLayerVisibility(layer.id)}
                          className={`p-1 rounded ${layer.visible ? 'text-cyber-gold' : 'text-slate-600'}`}
                        >
                          {layer.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <span className="text-xs font-tech font-bold text-white">{layer.name}</span>
                      </div>

                      {/* Blend Mode Dropdown */}
                      <select
                        value={layer.blendMode}
                        onChange={(e) => updateLayerBlendMode(layer.id, e.target.value as BlendMode)}
                        className="bg-cyber-900 border border-cyber-700 rounded-lg px-2 py-0.5 text-[10px] font-mono text-cyan-300 focus:outline-none cursor-pointer"
                      >
                        <option value="normal">Normal</option>
                        <option value="multiply">Multiplicar (Multiply)</option>
                        <option value="screen">Trama (Screen)</option>
                        <option value="overlay">Superponer (Overlay)</option>
                        <option value="soft_light">Luz Suave (Soft Light)</option>
                        <option value="color_dodge">Sobreexposición (Dodge)</option>
                      </select>
                    </div>

                    {/* Opacity Slider */}
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 pl-6">
                      <span>Opacidad:</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={layer.opacity}
                        onChange={(e) => updateLayerOpacity(layer.id, Number(e.target.value))}
                        className="w-full accent-cyber-gold cursor-pointer"
                      />
                      <span className="w-8 text-right text-white">{layer.opacity}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 2: ADOBE ILLUSTRATOR BÉZIER CURVES & PATH EXTRUSION
              ========================================================= */}
          {activeInspectorTab === 'illustrator' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
                <span className="font-tech font-bold text-xs uppercase text-white flex items-center gap-1.5">
                  <PenTool className="w-4 h-4 text-cyber-gold" /> TRAZADO VECTORIAL & BÉZIER (ILLUSTRATOR)
                </span>
                <span className="text-[10px] font-mono text-purple-300 font-bold">EXTRUSIÓN 3D DIRECTA</span>
              </div>

              {/* Bézier Curve Canvas Simulator */}
              <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-tech font-bold">Escultor de Curva Bézier Vectorial:</span>
                  <button
                    onClick={() => setBezierPoints([{ x: 30, y: 80 }, { x: 90, y: 20 }, { x: 170, y: 140 }, { x: 230, y: 70 }])}
                    className="text-[10px] font-mono text-cyber-gold hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Resetear Puntos
                  </button>
                </div>

                <div className="relative h-32 bg-cyber-900 rounded-xl border border-cyber-700/70 overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 260 150">
                    <defs>
                      <linearGradient id="vectorGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#e5a93c" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="75" x2="260" y2="75" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="130" y1="0" x2="130" y2="150" stroke="#334155" strokeDasharray="3 3" />
                    <path
                      d={`M ${bezierPoints[0].x} ${bezierPoints[0].y} C ${bezierPoints[1].x} ${bezierPoints[1].y}, ${bezierPoints[2].x} ${bezierPoints[2].y}, ${bezierPoints[3].x} ${bezierPoints[3].y}`}
                      fill="none"
                      stroke="url(#vectorGrad)"
                      strokeWidth={vectorBevel.strokeWeight}
                    />
                    {bezierPoints.map((pt, idx) => (
                      <circle
                        key={idx}
                        cx={pt.x}
                        cy={pt.y}
                        r="5"
                        fill="#e5a93c"
                        stroke="#000"
                        strokeWidth="1.5"
                        className="cursor-pointer hover:scale-125 transition-transform"
                      />
                    ))}
                  </svg>
                </div>
                <p className="text-[10px] text-slate-400 font-mono">
                  Curva SVG evaluada en tiempo real para generar nervaduras y relieves de molde 3D.
                </p>
              </div>

              {/* 3D Extrusion & Bevel Sliders */}
              <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Profundidad de Extrusión 3D:</span>
                    <span className="text-cyber-gold font-bold">{vectorBevel.extrusionDepth} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="15.0"
                    step="0.5"
                    value={vectorBevel.extrusionDepth}
                    onChange={(e) => setVectorBevel({ ...vectorBevel, extrusionDepth: Number(e.target.value) })}
                    className="w-full accent-cyber-gold"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Bisel / Redondeo de Esquina (Bevel):</span>
                    <span className="text-cyan-400 font-bold">{vectorBevel.bevelRadius} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="5.0"
                    step="0.2"
                    value={vectorBevel.bevelRadius}
                    onChange={(e) => setVectorBevel({ ...vectorBevel, bevelRadius: Number(e.target.value) })}
                    className="w-full accent-cyan-400"
                  />
                </div>
              </div>

              {/* Vector Typography & Monogram Pattern Generator */}
              <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 text-xs">
                <span className="font-tech font-bold text-slate-300 flex items-center gap-1">
                  <Type className="w-3.5 h-3.5 text-purple-400" /> Tipografía Vectorial en Relieve 3D:
                </span>
                <input
                  type="text"
                  value={vectorBevel.customText}
                  onChange={(e) => setVectorBevel({ ...vectorBevel, customText: e.target.value })}
                  placeholder="Texto a extruir..."
                  className="w-full bg-cyber-900 border border-cyber-700 rounded-xl px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyber-gold"
                />

                <div className="pt-2 border-t border-cyber-800 space-y-1.5">
                  <span className="text-[11px] font-tech font-bold text-slate-300 block">Patrón Repetitivo Monograma (Seamless Grid):</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'monogram_grid', label: 'Monograma LV Grid' },
                      { id: 'carbon_weave', label: 'Tejido Carbono' },
                      { id: 'houndstooth', label: 'Pata de Gallo' },
                      { id: 'stripes', label: 'Líneas Tácticas' }
                    ].map((pat) => (
                      <button
                        key={pat.id}
                        onClick={() => setVectorBevel({ ...vectorBevel, patternRepeat: pat.id as any })}
                        className={`p-1.5 rounded-lg border text-[10px] font-mono text-left transition-all ${
                          vectorBevel.patternRepeat === pat.id
                            ? 'bg-cyber-gold/20 border-cyber-gold text-cyber-gold font-bold'
                            : 'bg-cyber-900 border-cyber-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {pat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 3: SUBSTANCE 3D PAINTER & PROCEDURAL MATERIALS
              ========================================================= */}
          {activeInspectorTab === 'substance' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
                <span className="font-tech font-bold text-xs uppercase text-white flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-cyber-gold" /> MATERIALES PROCEDURALES (SUBSTANCE 3D)
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">PBR 8K READY</span>
              </div>

              {/* Material Preset Selector Grid */}
              <div className="grid grid-cols-2 gap-2">
                {substanceMaterials.map((mat) => {
                  const isSelected = activeMaterial.id === mat.id;

                  return (
                    <button
                      key={mat.id}
                      onClick={() => {
                        setActiveMaterial(mat);
                        setPrimaryColor(mat.previewColor);
                        setPrimaryHexInput(mat.previewColor.toUpperCase());
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all space-y-1 ${
                        isSelected
                          ? 'bg-cyber-gold/20 border-cyber-gold text-white shadow-gold-glow'
                          : 'bg-cyber-950 border-cyber-800 text-slate-400 hover:border-cyber-700 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-tech font-bold text-xs">{mat.name}</span>
                        <div className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: mat.previewColor }} />
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 uppercase flex justify-between">
                        <span>Rugosidad: {mat.roughness}</span>
                        <span>Metal: {mat.metalness}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Material Fine-Tuning Sliders */}
              <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3 font-mono text-xs">
                <div className="font-tech font-bold text-slate-200">Ajustes Micro-Especulares del Material:</div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Rugosidad (Roughness):</span>
                    <span className="text-white">{activeMaterial.roughness}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={activeMaterial.roughness}
                    onChange={(e) => setActiveMaterial({ ...activeMaterial, roughness: Number(e.target.value) })}
                    className="w-full accent-cyber-gold"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Metalicidad (Metalness):</span>
                    <span className="text-white">{activeMaterial.metalness}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={activeMaterial.metalness}
                    onChange={(e) => setActiveMaterial({ ...activeMaterial, metalness: Number(e.target.value) })}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Intensidad de Relieve (Bump Intensity):</span>
                    <span className="text-white">{activeMaterial.bumpIntensity}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.1"
                    value={activeMaterial.bumpIntensity}
                    onChange={(e) => setActiveMaterial({ ...activeMaterial, bumpIntensity: Number(e.target.value) })}
                    className="w-full accent-purple-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 4: ADOBE PHOTOSHOP SMART FILTERS & CURVES
              ========================================================= */}
          {activeInspectorTab === 'photoshop_filters' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
                <span className="font-tech font-bold text-xs uppercase text-white flex items-center gap-1.5">
                  <Contrast className="w-4 h-4 text-cyber-gold" /> FILTROS & GRADACIÓN HSL (PHOTOSHOP)
                </span>
                <button
                  onClick={() => setPsFilters({ exposure: 0, contrast: 0, saturation: 0, vibrance: 0, hueShift: 0, curvesTone: 'neutral' })}
                  className="text-[10px] font-mono text-cyber-gold hover:underline"
                >
                  Restablecer
                </button>
              </div>

              {/* Photoshop Adjustment Sliders */}
              <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3 font-mono text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Exposición:</span>
                    <span className="text-cyber-gold">{psFilters.exposure}%</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={psFilters.exposure}
                    onChange={(e) => setPsFilters({ ...psFilters, exposure: Number(e.target.value) })}
                    className="w-full accent-cyber-gold"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Contraste:</span>
                    <span className="text-cyber-gold">{psFilters.contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={psFilters.contrast}
                    onChange={(e) => setPsFilters({ ...psFilters, contrast: Number(e.target.value) })}
                    className="w-full accent-cyber-gold"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Saturación de Color:</span>
                    <span className="text-cyan-400">{psFilters.saturation}%</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={psFilters.saturation}
                    onChange={(e) => setPsFilters({ ...psFilters, saturation: Number(e.target.value) })}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Rueda de Tono (Hue Shift):</span>
                    <span className="text-purple-400">{psFilters.hueShift}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={psFilters.hueShift}
                    onChange={(e) => setPsFilters({ ...psFilters, hueShift: Number(e.target.value) })}
                    className="w-full accent-purple-400"
                  />
                </div>
              </div>

              {/* Photoshop Tone Curves Presets */}
              <div className="space-y-2">
                <span className="text-[11px] font-tech font-bold text-slate-300 block">Curvas Tonales de Photoshop:</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'neutral', name: 'Curva Neutra', desc: 'Respuesta lineal 1:1' },
                    { id: 'high_contrast', name: 'Alto Contraste S-Curve', desc: 'Negros profundos y brillo alto' },
                    { id: 'film_matte', name: 'Look Fílmico Mate', desc: 'Negros lavados tipo editorial' },
                    { id: 'cyber_pop', name: 'Cyberpunk Pop', desc: 'Realce cromático cian y oro' }
                  ].map((cur) => (
                    <button
                      key={cur.id}
                      onClick={() => setPsFilters({ ...psFilters, curvesTone: cur.id as any })}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        psFilters.curvesTone === cur.id
                          ? 'bg-cyber-gold/20 border-cyber-gold text-white font-bold'
                          : 'bg-cyber-950 border-cyber-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-tech text-white text-xs">{cur.name}</div>
                      <div className="text-[9px] text-slate-500 font-mono">{cur.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 5: LOGOS, DECALS & CLO3D CLOTH PHYSICS
              ========================================================= */}
          {activeInspectorTab === 'decals_physics' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Decal Projector */}
              <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3">
                <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
                  <span className="font-tech font-bold text-xs uppercase text-white flex items-center gap-1.5">
                    <Disc className="w-4 h-4 text-cyber-gold" /> PROYECTOR DE LOGOS & ESTAMPADOS
                  </span>
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    className="text-[10px] font-mono text-cyber-gold hover:underline flex items-center gap-1"
                  >
                    <Upload className="w-3 h-3" /> Subir PNG/SVG
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
                      setCustomLogoUrl(URL.createObjectURL(file));
                    }
                  }}
                />

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Escala del Logo:</span>
                    <span className="text-white">{decalScale.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.3"
                    max="2.5"
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

                {/* Preset Vector Decals */}
                <div className="space-y-1.5 pt-2 border-t border-cyber-800">
                  {['Dragon 龍 (Aether Neo)', 'Akira Gear 2045', 'Cyber Tiger Tech'].map((dec) => (
                    <button
                      key={dec}
                      onClick={() => setSelectedDecal(dec)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl border text-left text-xs transition-all ${
                        selectedDecal === dec
                          ? 'bg-cyber-gold/20 border-cyber-gold text-cyber-gold font-bold'
                          : 'bg-cyber-900 border-cyber-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{dec}</span>
                      {selectedDecal === dec && <Check className="w-3.5 h-3.5 text-cyber-gold" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* CLO3D Cloth Physics & Wind */}
              <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-tech font-bold text-xs uppercase text-white flex items-center gap-1.5">
                    <Wind className="w-4 h-4 text-cyan-400" /> FÍSICA DE TELA & CAÍDA (CLO3D)
                  </span>
                  <button
                    onClick={() => setIsClothWindActive(!isClothWindActive)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border transition-all ${
                      isClothWindActive
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 shadow-sm'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {isClothWindActive ? 'VIENTO: ACTIVO' : 'VIENTO: PAUSA'}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(['gentle', 'breeze', 'gale'] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() => { setWindIntensity(w); setIsClothWindActive(true); }}
                      className={`p-2 rounded-xl border text-center text-xs font-mono uppercase transition-all ${
                        windIntensity === w && isClothWindActive
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                          : 'bg-cyber-900 border-cyber-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {w === 'gentle' ? 'Suave' : w === 'breeze' ? 'Brisa 15km/h' : 'Ráfaga 40km/h'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 6: GENERATIVE AI TEXTURE SYNTHESIZER
              ========================================================= */}
          {activeInspectorTab === 'ai_texture' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
                <span className="font-tech font-bold text-xs uppercase text-white flex items-center gap-1.5">
                  <Wand2 className="w-4 h-4 text-cyber-gold" /> GENERADOR DE TEXTURAS PBR CON IA
                </span>
                <span className="text-[10px] font-mono text-purple-300 font-bold">PROMPT TO PBR</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3">
                <label className="text-xs font-tech font-bold text-slate-300 block">
                  Describe el material, textura o patrón deseado:
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={3}
                  className="w-full bg-cyber-900 border border-cyber-700 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-cyber-gold"
                  placeholder="Ej: Cuero negro desgastado con monogramas dorados..."
                />

                <button
                  onClick={handleGenerateAiTexture}
                  disabled={isGeneratingTexture}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 hover:opacity-95 transition-all disabled:opacity-50"
                >
                  {isGeneratingTexture ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sintetizando Mapas PBR 4K...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generar & Aplicar al Modelo 3D</span>
                    </>
                  )}
                </button>

                {generatedTextureSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>¡Textura PBR sintética 4K aplicada con éxito al render 3D!</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================
          MODAL 1: EXPORT SUITE (PHOTOSHOP PSD, ILLUSTRATOR AI, BLENDER GLB)
          ========================================================= */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyber-gold/50 rounded-3xl p-6 max-w-xl w-full shadow-gold-glow-lg space-y-4 relative">
            <button
              onClick={() => setIsExportModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyber-gold/20 text-cyber-gold border border-cyber-gold shadow-gold-glow">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">EXPORTAR SUITE PROFESIONAL MULTI-FORMATO</h3>
                <p className="text-xs text-slate-400 font-mono">Compatible con Adobe Creative Cloud, Blender, CLO3D y Unreal Engine</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleExportSuite('psd')}
                className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 hover:border-blue-400 text-left transition-all group space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-tech font-bold text-blue-400 text-sm">Adobe Photoshop (.PSD)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">8K PBR</span>
                </div>
                <p className="text-[11px] text-slate-400">Capas separadas: Albedo, Normal, Roughness y Decal con modos de fusión intactos.</p>
              </button>

              <button
                onClick={() => handleExportSuite('ai')}
                className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 hover:border-orange-400 text-left transition-all group space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-tech font-bold text-orange-400 text-sm">Adobe Illustrator (.AI / .SVG)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">VECTORES</span>
                </div>
                <p className="text-[11px] text-slate-400">Curvas Bézier puras, patrones de corte y tipografía en curvas extruibles.</p>
              </button>

              <button
                onClick={() => handleExportSuite('glb')}
                className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 hover:border-emerald-400 text-left transition-all group space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-tech font-bold text-emerald-400 text-sm">Blender & CLO3D (.GLB / .OBJ)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">3D MESH</span>
                </div>
                <p className="text-[11px] text-slate-400">Malla poligonal optimizada con materiales PBR y simulación de tela.</p>
              </button>

              <button
                onClick={() => handleExportSuite('usdz')}
                className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 hover:border-purple-400 text-left transition-all group space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-tech font-bold text-purple-400 text-sm">Apple Vision Pro (.USDZ)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">AR & XR</span>
                </div>
                <p className="text-[11px] text-slate-400">Realidad Aumentada para compras virtuales en WebXR y tiendas Shopify 3D.</p>
              </button>
            </div>

            <button
              onClick={() => handleExportSuite('all')}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 hover:opacity-95 transition-all"
            >
              <FolderDown className="w-4 h-4" />
              <span>Descargar Paquete Master Completo (.ZIP)</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 2: 6-PIECE COORDINATED CAPSULE COLLECTION
          ========================================================= */}
      {isCapsuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-cyber-900 border border-purple-500/50 rounded-3xl p-6 shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCapsuleModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-xl">COLECCIÓN CÁPSULA COORDENADA IA (6 PIEZAS)</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Conjunto estilístico unificado con paleta de color ({primaryHexInput} / {accentHexInput})
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
              {[
                { name: 'Chaqueta Modular Techwear', type: 'jacket', emoji: '🧥', fabric: 'Nylon Ripstop 3-Capas' },
                { name: 'Hoodie Boxy 460 GSM', type: 'hoodie', emoji: '👕', fabric: 'Algodón Pesado Orgánico' },
                { name: 'Pantalón Cargo Táctico', type: 'pants', emoji: '👖', fabric: 'Cordura Hidrofóbica' },
                { name: 'Sneaker Solesmith 3D Pro', type: 'sneaker', emoji: '👟', fabric: 'Suela Paramétrica TPU' },
                { name: 'Camiseta Oversized Drop-Shoulder', type: 'tee', emoji: '🎽', fabric: 'Jersey Peinado 260 GSM' },
                { name: 'Gorro Beanie Flotante / Balaclava', type: 'beanie', emoji: '🧢', fabric: 'Lana Merino Canalé' }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 hover:border-purple-500/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[9px] font-bold">PIEZA 0{i + 1}</span>
                  </div>
                  <h4 className="font-tech font-bold text-white text-sm">{item.name}</h4>
                  <p className="text-[11px] text-slate-400">{item.fabric}</p>
                  <button
                    onClick={() => {
                      setProductType(item.type);
                      setIsCapsuleModalOpen(false);
                    }}
                    className="w-full py-1.5 rounded-xl bg-cyber-900 hover:bg-cyber-800 border border-cyber-700 text-purple-300 font-bold text-[10px] uppercase transition-colors"
                  >
                    Cargar en Visor 3D
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  alert('¡Paquete completo de Colección Cápsula (6 Modelos 3D + Fichas Técnicas) descargado en .ZIP!');
                  setIsCapsuleModalOpen(false);
                }}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Cápsula Completa (6 Fichas Tech Pack + .GLB)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
