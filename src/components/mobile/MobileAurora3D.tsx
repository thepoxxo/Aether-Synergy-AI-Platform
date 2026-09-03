import React, { useState } from 'react';
import {
  Box,
  Sparkles,
  Layers,
  Palette,
  Eye,
  Download,
  RotateCcw,
  Zap,
  Sliders,
  Maximize2,
  Camera,
  Shirt,
  ShoppingBag,
  Cpu,
  ChevronUp,
  Sun,
  Moon,
  Flame,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDeviceMode } from '../../context/DeviceModeContext';

export const MobileAurora3D: React.FC = () => {
  const { hapticFeedback } = useDeviceMode();
  const [selectedModel, setSelectedModel] = useState<'jacket' | 'sneaker' | 'chair' | 'bag' | 'box' | 'car'>('jacket');
  const [selectedMaterial, setSelectedMaterial] = useState<'pbr_gold' | 'neon_cyber' | 'leather_matte' | 'denim' | 'metallic'>('pbr_gold');
  const [selectedColor, setSelectedColor] = useState('#E5A93C');
  const [shaderMode, setShaderMode] = useState<'pbr' | 'clay' | 'wireframe'>('pbr');
  const [lightingMode, setLightingMode] = useState<'studio' | 'neon' | 'sun'>('studio');
  const [activeSheet, setActiveSheet] = useState<'none' | 'models' | 'materials' | 'colors' | 'ai_prompt'>('none');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const modelsList = [
    {
      id: 'jacket',
      name: 'Chaqueta Bomber Techwear',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
      badge: 'Moda 3D',
      polyCount: '48.2K Polígonos'
    },
    {
      id: 'sneaker',
      name: 'Sneakers Cyberpunk Pro',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
      badge: 'Calzado',
      polyCount: '62.4K Polígonos'
    },
    {
      id: 'chair',
      name: 'Sillón Lounge Nórdico',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
      badge: 'Mobiliario',
      polyCount: '34.8K Polígonos'
    },
    {
      id: 'bag',
      name: 'Bolso de Cuero Minimal',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
      badge: 'Marroquinería',
      polyCount: '28.1K Polígonos'
    },
    {
      id: 'box',
      name: 'Packaging Troquelado Kraft',
      image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
      badge: 'Packaging',
      polyCount: '12.5K Polígonos'
    },
    {
      id: 'car',
      name: 'Butaca Recaro Alcantara',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80',
      badge: 'Automotriz',
      polyCount: '74.6K Polígonos'
    }
  ];

  const materialsList = [
    { id: 'pbr_gold', name: 'Cyber Gold PBR 8K', color: 'from-amber-400 to-yellow-600', roughness: '0.15', metalness: '0.90' },
    { id: 'neon_cyber', name: 'Neón Reactivo Emisivo', color: 'from-cyan-400 to-blue-600', roughness: '0.05', metalness: '0.30' },
    { id: 'leather_matte', name: 'Cuero Nappa Grano Mate', color: 'from-stone-700 to-stone-900', roughness: '0.65', metalness: '0.05' },
    { id: 'denim', name: 'Denim Pesado 460 GSM', color: 'from-blue-700 to-indigo-950', roughness: '0.85', metalness: '0.00' },
    { id: 'metallic', name: 'Titanio Aeroespacial', color: 'from-slate-400 to-slate-700', roughness: '0.25', metalness: '0.95' }
  ];

  const colorPalette = [
    { name: 'Cyber Gold', hex: '#E5A93C' },
    { name: 'Obsidian Black', hex: '#0B0B0F' },
    { name: 'Neon Cyan', hex: '#06B6D4' },
    { name: 'Crimson Red', hex: '#EF4444' },
    { name: 'Royal Purple', hex: '#A855F7' },
    { name: 'Pure White', hex: '#F8FAFC' }
  ];

  const currentModelData = modelsList.find((m) => m.id === selectedModel) || modelsList[0];

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) return;
    hapticFeedback();
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1600));
    setIsGenerating(false);
    setActiveSheet('none');
    alert('¡Diseño 3D re-renderizado con éxito mediante Gemini & Tripo AI!');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] bg-cyber-950 text-white font-mono text-xs select-none relative overflow-hidden">
      {/* 1. Mobile Top HUD (Status & Lighting Mode) */}
      <div className="flex items-center justify-between px-3 py-2 bg-cyber-950/90 border-b border-cyber-800 z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <span className="font-tech font-bold text-xs text-white block leading-tight">{currentModelData.name}</span>
            <span className="text-[9px] text-cyber-gold font-mono">{currentModelData.polyCount} • WebGPU</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Shaders toggle */}
          <div className="flex bg-cyber-900 p-0.5 rounded-lg border border-cyber-800 text-[9px] font-bold">
            <button
              onClick={() => { hapticFeedback(); setShaderMode('pbr'); }}
              className={`px-1.5 py-0.5 rounded ${shaderMode === 'pbr' ? 'bg-cyber-gold text-black' : 'text-slate-400'}`}
            >
              PBR
            </button>
            <button
              onClick={() => { hapticFeedback(); setShaderMode('wireframe'); }}
              className={`px-1.5 py-0.5 rounded ${shaderMode === 'wireframe' ? 'bg-cyber-gold text-black' : 'text-slate-400'}`}
            >
              CAD
            </button>
          </div>

          <button
            onClick={() => alert('¡Proyección AR QuickLook iniciada en tu entorno real!')}
            className="px-2 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500 text-cyan-300 font-tech font-bold text-[9px] uppercase flex items-center gap-1 ml-1"
          >
            <Eye className="w-3 h-3" />
            <span>AR</span>
          </button>
        </div>
      </div>

      {/* 2. Fullscreen Immersive 3D Viewport */}
      <div className="flex-1 relative flex items-center justify-center bg-gradient-to-b from-black via-cyber-950 to-black overflow-hidden">
        {/* Background Ambient Studio Lighting effect */}
        <div
          className="absolute inset-0 opacity-40 blur-3xl pointer-events-none"
          style={{
            background: lightingMode === 'neon'
              ? 'radial-gradient(circle, #06b6d4 0%, #a855f7 40%, transparent 70%)'
              : lightingMode === 'sun'
              ? 'radial-gradient(circle, #f59e0b 0%, #ea580c 40%, transparent 70%)'
              : 'radial-gradient(circle, #e5a93c 0%, #1e1b4b 50%, transparent 75%)'
          }}
        />

        {/* 3D Model Interactive Mockup with Transform */}
        <div
          style={{
            transform: `rotateY(${rotationAngle}deg) scale(${zoomLevel})`,
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          className="relative w-72 h-80 flex flex-col items-center justify-center z-10"
        >
          {/* Pedestal Glow */}
          <div
            className="absolute -bottom-4 w-56 h-8 rounded-full blur-xl"
            style={{ backgroundColor: selectedColor, opacity: 0.4 }}
          />

          {/* Model Image Frame */}
          <div className="relative w-64 h-72 rounded-3xl overflow-hidden border-2 border-cyber-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-cyber-900 group">
            <img
              src={currentModelData.image}
              alt={currentModelData.name}
              className={`w-full h-full object-cover object-center transition-all duration-300 ${
                shaderMode === 'wireframe' ? 'invert opacity-70 contrast-200' : ''
              }`}
            />

            {/* Live Shader Tint Overlay */}
            <div
              className="absolute inset-0 mix-blend-color opacity-30 pointer-events-none"
              style={{ backgroundColor: selectedColor }}
            />

            {/* Specular Light Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />

            {/* Floating Model Badge */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/70 backdrop-blur-md p-2 rounded-xl border border-white/10">
              <span className="text-[10px] font-tech font-bold text-white uppercase">{currentModelData.badge}</span>
              <span className="text-[9px] font-mono font-bold text-cyber-gold">60 FPS</span>
            </div>
          </div>
        </div>

        {/* Floating Quick Action Controls (Left & Right Rails) */}
        <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
          <button
            onClick={() => {
              hapticFeedback();
              setRotationAngle((prev) => prev - 45);
            }}
            className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-cyber-800 text-white active:scale-95"
            title="Rotar Izquierda"
          >
            ↺
          </button>
          <button
            onClick={() => {
              hapticFeedback();
              setRotationAngle((prev) => prev + 45);
            }}
            className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-cyber-800 text-white active:scale-95"
            title="Rotar Derecha"
          >
            ↻
          </button>
        </div>

        <div className="absolute right-3 top-3 z-20 flex flex-col gap-2">
          <button
            onClick={() => {
              hapticFeedback();
              setZoomLevel((prev) => (prev >= 1.3 ? 1.0 : prev + 0.15));
            }}
            className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-cyber-800 text-white active:scale-95 font-bold"
            title="Zoom"
          >
            🔍
          </button>
          <button
            onClick={() => alert('¡Captura 4K HDR exportada!')}
            className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-cyber-800 text-white active:scale-95"
            title="Foto 4K"
          >
            <Camera className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert('¡Archivo .GLB descargado!')}
            className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-cyber-800 text-white active:scale-95"
            title="Descargar GLB"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Floating Mobile Action Bar (Bottom Quick Tools) */}
      <div className="p-2 bg-cyber-950/95 border-t border-cyber-800 flex items-center justify-around gap-1 z-20">
        <button
          onClick={() => { hapticFeedback(); setActiveSheet('models'); }}
          className={`flex-1 py-2 px-1 rounded-xl flex flex-col items-center gap-1 border transition-all ${
            activeSheet === 'models' ? 'bg-cyber-gold text-black border-cyber-gold font-bold' : 'bg-cyber-900 border-cyber-800 text-slate-300'
          }`}
        >
          <Box className="w-4 h-4" />
          <span className="text-[9px] font-tech uppercase">Modelos</span>
        </button>

        <button
          onClick={() => { hapticFeedback(); setActiveSheet('materials'); }}
          className={`flex-1 py-2 px-1 rounded-xl flex flex-col items-center gap-1 border transition-all ${
            activeSheet === 'materials' ? 'bg-cyber-gold text-black border-cyber-gold font-bold' : 'bg-cyber-900 border-cyber-800 text-slate-300'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span className="text-[9px] font-tech uppercase">Texturas</span>
        </button>

        <button
          onClick={() => { hapticFeedback(); setActiveSheet('colors'); }}
          className={`flex-1 py-2 px-1 rounded-xl flex flex-col items-center gap-1 border transition-all ${
            activeSheet === 'colors' ? 'bg-cyber-gold text-black border-cyber-gold font-bold' : 'bg-cyber-900 border-cyber-800 text-slate-300'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full border border-white" style={{ backgroundColor: selectedColor }} />
          <span className="text-[9px] font-tech uppercase">Color</span>
        </button>

        <button
          onClick={() => { hapticFeedback(); setActiveSheet('ai_prompt'); }}
          className={`flex-1 py-2 px-1 rounded-xl flex flex-col items-center gap-1 border transition-all ${
            activeSheet === 'ai_prompt'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-pink-400 font-bold'
              : 'bg-cyber-900 border-cyber-800 text-purple-300'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-[9px] font-tech uppercase">Prompt IA</span>
        </button>
      </div>

      {/* 4. Native Slide-Up Bottom Sheets for Tools */}
      {activeSheet !== 'none' && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/65 backdrop-blur-sm animate-fadeIn">
          <div className="bg-cyber-900 border-t-2 border-cyber-gold rounded-t-3xl p-4 max-h-[65vh] overflow-y-auto space-y-3 animate-slideUp">
            {/* Sheet Header */}
            <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
              <span className="font-tech font-bold text-sm uppercase text-white">
                {activeSheet === 'models' && '📦 Seleccionar Modelo 3D'}
                {activeSheet === 'materials' && '🎨 Shaders & Materiales PBR'}
                {activeSheet === 'colors' && '🎨 Paleta Cromática 3D'}
                {activeSheet === 'ai_prompt' && '🪄 Rediseño con Prompt de IA'}
              </span>
              <button
                onClick={() => setActiveSheet('none')}
                className="p-1.5 rounded-xl bg-cyber-950 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sheet Content: Models */}
            {activeSheet === 'models' && (
              <div className="grid grid-cols-2 gap-2">
                {modelsList.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      hapticFeedback();
                      setSelectedModel(m.id as any);
                      setActiveSheet('none');
                    }}
                    className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 ${
                      selectedModel === m.id
                        ? 'bg-cyber-gold/20 border-cyber-gold text-white font-bold shadow-gold-glow'
                        : 'bg-cyber-950 border-cyber-800 text-slate-400'
                    }`}
                  >
                    <img src={m.image} alt={m.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <div className="font-tech text-xs text-white leading-tight">{m.name}</div>
                      <span className="text-[9px] text-cyber-gold font-bold">{m.badge}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Sheet Content: Materials */}
            {activeSheet === 'materials' && (
              <div className="space-y-2">
                {materialsList.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => {
                      hapticFeedback();
                      setSelectedMaterial(mat.id as any);
                      setActiveSheet('none');
                    }}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between ${
                      selectedMaterial === mat.id
                        ? 'bg-cyber-gold/20 border-cyber-gold text-white font-bold'
                        : 'bg-cyber-950 border-cyber-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${mat.color} border border-white/20 shadow-md`} />
                      <div>
                        <div className="font-tech text-xs text-white">{mat.name}</div>
                        <span className="text-[10px] text-slate-400 font-mono">Rough: {mat.roughness} • Metal: {mat.metalness}</span>
                      </div>
                    </div>
                    {selectedMaterial === mat.id && (
                      <span className="text-cyber-gold font-bold text-xs">ACTIVO ✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Sheet Content: Colors */}
            {activeSheet === 'colors' && (
              <div className="grid grid-cols-3 gap-2.5 py-1">
                {colorPalette.map((col) => (
                  <button
                    key={col.hex}
                    onClick={() => {
                      hapticFeedback();
                      setSelectedColor(col.hex);
                      setActiveSheet('none');
                    }}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 ${
                      selectedColor === col.hex
                        ? 'bg-cyber-gold/20 border-cyber-gold text-white font-bold'
                        : 'bg-cyber-950 border-cyber-800 text-slate-400'
                    }`}
                  >
                    <span className="w-8 h-8 rounded-full border-2 border-white/30 shadow-md" style={{ backgroundColor: col.hex }} />
                    <span className="text-[10px] font-tech text-center">{col.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Sheet Content: AI Prompt */}
            {activeSheet === 'ai_prompt' && (
              <div className="space-y-3">
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Ej: Chaqueta con reflectivo cyberpunk, tela impermeable ripstop negra y detalles dorados..."
                  className="w-full bg-cyber-950 border border-cyber-800 rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-gold h-24 resize-none"
                />
                <button
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGenerating ? 'Generando Modelo 3D...' : 'Re-Generar Diseño con IA'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
