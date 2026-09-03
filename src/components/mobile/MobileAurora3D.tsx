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
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDeviceMode } from '../../context/DeviceModeContext';

export const MobileAurora3D: React.FC = () => {
  const { promptUpgrade, hasAccess } = useAuth();
  const { hapticFeedback } = useDeviceMode();
  const [selectedModel, setSelectedModel] = useState<'jacket' | 'sneaker' | 'chair' | 'bag' | 'box' | 'car'>('jacket');
  const [selectedMaterial, setSelectedMaterial] = useState<'pbr_gold' | 'neon_cyber' | 'leather_matte' | 'denim' | 'metallic'>('pbr_gold');
  const [activeSheet, setActiveSheet] = useState<'none' | 'models' | 'materials' | 'ai_prompt' | 'layers'>('none');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const modelsList = [
    { id: 'jacket', name: 'Chaqueta Bomber 3D', icon: '🧥', badge: 'Moda' },
    { id: 'sneaker', name: 'Sneakers Cyberpunk', icon: '👟', badge: 'Calzado' },
    { id: 'chair', name: 'Sillón Lounge Nórdico', icon: '🪑', badge: 'Muebles' },
    { id: 'bag', name: 'Bolso de Cuero Minimal', icon: '👜', badge: 'Marroquinería' },
    { id: 'box', name: 'Caja Packaging Gourmet', icon: '🍔', badge: 'Packaging' },
    { id: 'car', name: 'Asiento Deportivo Auto', icon: '🚗', badge: 'Tapicería' }
  ];

  const materialsList = [
    { id: 'pbr_gold', name: 'Cyber Gold PBR', color: 'from-amber-400 to-yellow-600', desc: 'Reflejos metálicos 8K' },
    { id: 'neon_cyber', name: 'Neón Holográfico', color: 'from-cyan-400 to-blue-600', desc: 'Textura emisiva' },
    { id: 'leather_matte', name: 'Cuero Nappa Mate', color: 'from-stone-700 to-stone-900', desc: 'Grano natural' },
    { id: 'denim', name: 'Denim Pesado 460 GSM', color: 'from-blue-700 to-indigo-950', desc: 'Sarga diagonal' },
    { id: 'metallic', name: 'Titanio Anodizado', color: 'from-slate-400 to-slate-700', desc: 'Acabado aeroespacial' }
  ];

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) return;
    hapticFeedback();
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsGenerating(false);
    setActiveSheet('none');
    alert('¡Diseño 3D re-renderizado con éxito mediante IA!');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] bg-black text-white font-mono text-xs select-none relative overflow-hidden">
      {/* 1. Mobile Top Status Bar & Quick Presets */}
      <div className="flex items-center justify-between px-3 py-2 bg-cyber-950/90 border-b border-cyber-800 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-tech font-bold text-xs uppercase text-slate-200">
            {modelsList.find((m) => m.id === selectedModel)?.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              hapticFeedback();
              setRotationAngle((prev) => prev + 45);
            }}
            className="p-1.5 rounded-xl bg-cyber-900 border border-cyber-800 text-slate-300 active:scale-95"
            title="Rotar 45°"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert('¡Modo Realidad Aumentada (AR QuickLook) activado! Apunta tu cámara a una superficie plana.')}
            className="px-2.5 py-1 rounded-xl bg-cyan-500/20 border border-cyan-500 text-cyan-300 font-tech font-bold text-[10px] uppercase flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver AR</span>
          </button>
        </div>
      </div>

      {/* 2. Main Fullscreen 3D Viewport with Touch Drag & Pinch */}
      <div className="flex-1 relative flex items-center justify-center bg-gradient-to-b from-cyber-950 via-black to-cyber-950 overflow-hidden">
        {/* Visual 3D Product Canvas Mockup */}
        <div
          style={{ transform: `rotateY(${rotationAngle}deg)`, transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center"
        >
          {/* Glowing pedestal shadow */}
          <div className="absolute -bottom-6 w-48 h-8 rounded-full bg-gradient-to-r from-cyber-gold/30 via-cyan-500/20 to-purple-500/30 blur-xl" />
          
          {selectedModel === 'jacket' && (
            <div className="w-56 h-64 rounded-3xl bg-gradient-to-br from-cyber-gold/90 via-amber-600 to-cyber-950 p-1 border-2 border-cyber-gold/60 shadow-[0_0_50px_rgba(229,169,60,0.3)] flex flex-col items-center justify-center relative">
              <div className="text-6xl mb-2 animate-pulse">🧥</div>
              <span className="font-tech font-bold text-xs text-white">Chaqueta Techwear X-1</span>
              <span className="text-[10px] text-cyber-gold font-bold">PBR 8K WebGPU</span>
            </div>
          )}

          {selectedModel === 'sneaker' && (
            <div className="w-64 h-44 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-700 to-black p-1 border-2 border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.3)] flex flex-col items-center justify-center">
              <div className="text-6xl mb-1">👟</div>
              <span className="font-tech font-bold text-xs text-white">Cyber Runner Pro</span>
              <span className="text-[10px] text-cyan-300 font-bold">Suela Nitrógeno</span>
            </div>
          )}

          {selectedModel === 'chair' && (
            <div className="w-56 h-60 rounded-3xl bg-gradient-to-br from-stone-800 via-stone-900 to-black p-1 border-2 border-amber-500/60 shadow-lg flex flex-col items-center justify-center">
              <div className="text-6xl mb-2">🪑</div>
              <span className="font-tech font-bold text-xs text-white">Sillón Lounge Nórdico</span>
              <span className="text-[10px] text-amber-300 font-bold">Madera CNC & Cuero</span>
            </div>
          )}

          {selectedModel === 'bag' && (
            <div className="w-52 h-56 rounded-3xl bg-gradient-to-br from-stone-900 via-amber-950 to-black p-1 border-2 border-cyber-gold/50 shadow-lg flex flex-col items-center justify-center">
              <div className="text-6xl mb-2">👜</div>
              <span className="font-tech font-bold text-xs text-white">Tote Bag Minimal</span>
              <span className="text-[10px] text-cyber-gold font-bold">Cuero Italiano 1.4mm</span>
            </div>
          )}

          {selectedModel === 'box' && (
            <div className="w-56 h-52 rounded-3xl bg-gradient-to-br from-amber-900 via-stone-900 to-black p-1 border-2 border-amber-400 shadow-lg flex flex-col items-center justify-center">
              <div className="text-6xl mb-2">🍔</div>
              <span className="font-tech font-bold text-xs text-white">Packaging Kraft Gourmet</span>
              <span className="text-[10px] text-amber-400 font-bold">Troquel ECT 44</span>
            </div>
          )}

          {selectedModel === 'car' && (
            <div className="w-56 h-64 rounded-3xl bg-gradient-to-br from-red-950 via-stone-950 to-black p-1 border-2 border-red-500 shadow-lg flex flex-col items-center justify-center">
              <div className="text-6xl mb-2">🚗</div>
              <span className="font-tech font-bold text-xs text-white">Butaca Recaro Alcantara</span>
              <span className="text-[10px] text-red-400 font-bold">Costura Airbag</span>
            </div>
          )}
        </div>

        {/* Floating Controls HUD over 3D Canvas */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-cyber-800 text-[10px] text-slate-300">
            60 FPS • WebGPU
          </span>
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button
            onClick={() => alert('¡Captura 4K guardada en tu galería de fotos!')}
            className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-cyber-800 text-slate-300 active:scale-95"
            title="Tomar Foto 4K"
          >
            <Camera className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert('¡Archivo .GLB 3D exportado!')}
            className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-cyber-800 text-slate-300 active:scale-95"
            title="Descargar GLB"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Floating Mobile Action Bar (Bottom Quick Tools) */}
      <div className="p-2 bg-cyber-950/95 border-t border-cyber-800 flex items-center justify-around gap-1">
        <button
          onClick={() => {
            hapticFeedback();
            setActiveSheet('models');
          }}
          className={`flex-1 py-2 px-1 rounded-xl flex flex-col items-center gap-1 border transition-all ${
            activeSheet === 'models'
              ? 'bg-cyber-gold text-black border-cyber-gold font-bold'
              : 'bg-cyber-900 border-cyber-800 text-slate-300'
          }`}
        >
          <Box className="w-4 h-4" />
          <span className="text-[9px] font-tech uppercase">Modelos</span>
        </button>

        <button
          onClick={() => {
            hapticFeedback();
            setActiveSheet('materials');
          }}
          className={`flex-1 py-2 px-1 rounded-xl flex flex-col items-center gap-1 border transition-all ${
            activeSheet === 'materials'
              ? 'bg-cyber-gold text-black border-cyber-gold font-bold'
              : 'bg-cyber-900 border-cyber-800 text-slate-300'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span className="text-[9px] font-tech uppercase">Material</span>
        </button>

        <button
          onClick={() => {
            hapticFeedback();
            setActiveSheet('ai_prompt');
          }}
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
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-cyber-900 border-t-2 border-cyber-gold rounded-t-3xl p-4 max-h-[60vh] overflow-y-auto space-y-3 animate-slideUp">
            {/* Sheet Header */}
            <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
              <span className="font-tech font-bold text-sm uppercase text-white">
                {activeSheet === 'models' && '📦 Cambiar Modelo 3D Base'}
                {activeSheet === 'materials' && '🎨 Texturas & Shaders PBR'}
                {activeSheet === 'ai_prompt' && '🪄 Rediseño con Prompt de IA'}
              </span>
              <button
                onClick={() => setActiveSheet('none')}
                className="p-1.5 rounded-xl bg-cyber-950 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sheet Content: Models Selector */}
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
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 ${
                      selectedModel === m.id
                        ? 'bg-cyber-gold/20 border-cyber-gold text-white font-bold shadow-gold-glow'
                        : 'bg-cyber-950 border-cyber-800 text-slate-400'
                    }`}
                  >
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <div className="font-tech text-xs text-white">{m.name}</div>
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
                        <span className="text-[10px] text-slate-400">{mat.desc}</span>
                      </div>
                    </div>
                    {selectedMaterial === mat.id && (
                      <span className="text-cyber-gold font-bold text-xs">ACTIVO ✓</span>
                    )}
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
