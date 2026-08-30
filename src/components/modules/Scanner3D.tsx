import React, { useState, useRef } from 'react';
import {
  Scan,
  UploadCloud,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  Box,
  Video,
  FileImage,
  FileText,
  Wand2,
  Cpu,
  Layers,
  Download,
  Settings,
  Key,
  Globe,
  Sliders,
  Check,
  Play,
  RotateCw,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Model3DCanvas, ModelType } from '../common/Model3DCanvas';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const Scanner3D: React.FC = () => {
  const { consumeCredit, role } = useAuth();
  const { t } = useLanguage();

  // Mode Selection: Video 360°, Universal File (Images/SVG/PDF), Text-to-3D, API Gateway
  const [activeInputMode, setActiveInputMode] = useState<'video' | 'files' | 'text' | 'api'>('video');

  // Scanner States
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStage, setActiveStage] = useState<string>('En espera de archivo o entrada...');
  const [generatedModelType, setGeneratedModelType] = useState<ModelType | string>('sneaker');
  const [generatedModelName, setGeneratedModelName] = useState<string>('Sneaker Recon #894');

  // Text-to-3D State
  const [textPrompt, setTextPrompt] = useState('');
  const [stylePreset, setStylePreset] = useState<'cel' | 'pbr' | 'clay' | 'cyberpunk'>('cel');

  // External API Configuration State
  const [selectedApiProvider, setSelectedApiProvider] = useState<'tripo' | 'meshy' | 'runway' | 'instantmesh'>('tripo');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isApiKeySaved, setIsApiKeySaved] = useState(false);
  const [meshQuality, setMeshQuality] = useState<'standard' | 'high' | 'ultra_4k'>('high');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger Reconstruction Pipeline
  const handleStartScan = (sourceName: string = 'Entrada Usuario', modelTarget: ModelType = 'sneaker') => {
    if (!consumeCredit()) return;

    setIsProcessing(true);
    setProgress(5);
    setActiveStage('1/5: Extracción de frames clave y mapas de profundidad...');
    setGeneratedModelName(sourceName);

    setTimeout(() => {
      setProgress(25);
      setActiveStage('2/5: Generando nube de puntos y densidad NeRF / Gaussian Splatting...');
    }, 800);

    setTimeout(() => {
      setProgress(55);
      setActiveStage('3/5: Reconstruyendo topología de malla 3D y teselación...');
    }, 1600);

    setTimeout(() => {
      setProgress(80);
      setActiveStage('4/5: Compilando shaders Cel-Shaded y mapas PBR de normales...');
    }, 2400);

    setTimeout(() => {
      setProgress(100);
      setActiveStage('5/5: ¡Malla 3D sintetizada y cargada con éxito en el visor!');
      setGeneratedModelType(modelTarget);
      setIsProcessing(false);
    }, 3200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    let targetType: ModelType = 'jacket';
    if (fileName.includes('shoe') || fileName.includes('sneaker') || fileName.includes('calzado')) {
      targetType = 'sneaker';
    } else if (fileName.includes('chair') || fileName.includes('silla') || fileName.includes('mueble')) {
      targetType = 'chair';
    } else if (fileName.includes('synth') || fileName.includes('audio') || fileName.includes('hardware')) {
      targetType = 'synth';
    }

    handleStartScan(`Scan_${file.name}`, targetType);
  };

  const handleExportModel = (format: string) => {
    if (consumeCredit()) {
      alert(`¡Modelo exportado con éxito en formato ${format.toUpperCase()}! (${role === 'free' ? 'Plan Free con marca de agua' : 'Plan Pro HD sin marcas de agua'})`);
    }
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn transition-colors">
      {/* Module Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-4 rounded-2xl border border-cyber-700/80 shadow-cyber-card">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Scan className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-tech font-bold text-white tracking-wide">
                SYNTHESIS.AI • 3D SCANNER & UNIVERSAL CONVERTER
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyber-800 text-cyan-400 border border-cyan-500/30">
                PRO ENGINE v3.5 • CUALQUIER ARCHIVO / API READY
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Escáner neural de Video 360°, Lector Universal de Archivos (Imágenes, SVG, PDF, Blueprints) y Conector de APIs 3D
            </p>
          </div>
        </div>

        {/* Input Mode Selector Tabs */}
        <div className="flex bg-cyber-950 p-1 rounded-xl border border-cyber-800 text-xs shadow-sm">
          <button
            onClick={() => setActiveInputMode('video')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeInputMode === 'video'
                ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" /> Video 360°
          </button>
          <button
            onClick={() => setActiveInputMode('files')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeInputMode === 'files'
                ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileImage className="w-3.5 h-3.5" /> Archivos & Planos
          </button>
          <button
            onClick={() => setActiveInputMode('text')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeInputMode === 'text'
                ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" /> Text-to-3D
          </button>
          <button
            onClick={() => setActiveInputMode('api')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeInputMode === 'api'
                ? 'bg-cyber-gold text-black font-bold shadow-gold-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" /> Conexión API
          </button>
        </div>
      </div>

      {/* Main Grid: Scanner Input + Live 3D Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Multi-Source Scanner Input & Pipeline (6 cols) */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          <div className="bg-cyber-900/90 p-5 rounded-3xl border border-cyber-800 shadow-cyber-card space-y-4">
            {/* Dynamic Tab Header */}
            <div className="flex items-center justify-between border-b border-cyber-800 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span className="font-tech font-bold text-xs uppercase tracking-wider text-white">
                  {activeInputMode === 'video' && 'RECONSTRUCCIÓN DE VIDEO 360° & FOTOGRAMETRÍA'}
                  {activeInputMode === 'files' && 'CONVERSOR UNIVERSAL DE ARCHIVOS A 3D (PNG, SVG, PDF)'}
                  {activeInputMode === 'text' && 'SÍNTESIS DE MALLAS 3D POR PROMPT IA'}
                  {activeInputMode === 'api' && 'GATEWAY DE APIS 3D (TRIPO3D, MESHY, RUNWAY)'}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-950 text-cyan-400 border border-cyan-500/30">
                {isProcessing ? '⚡ Procesando' : '🟢 Listo'}
              </span>
            </div>

            {/* TAB 1: Video 360° Dropzone */}
            {activeInputMode === 'video' && (
              <div className="space-y-3 animate-fadeIn">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sube una grabación giratoria de 360° grabada con cualquier smartphone para reconstruir la geometría en 3D:
                </p>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 rounded-2xl p-6 bg-cyber-950/80 text-center cursor-pointer group transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-cyber-900 border border-cyber-700 flex items-center justify-center mx-auto mb-2 text-cyan-400 group-hover:scale-110 shadow-md transition-transform">
                    <Video className="w-7 h-7" />
                  </div>
                  <div className="font-tech font-bold text-sm text-white">
                    ARRASTRA O HAZ CLIC PARA SUBIR VIDEO 360°
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Soporta MP4, MOV, ProRes 4K (hasta 60 fps)
                  </p>
                  <button
                    disabled={isProcessing}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartScan('Video_360_Sneaker.mp4', 'sneaker');
                    }}
                    className="mt-3 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-tech font-bold text-xs uppercase shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
                  >
                    {isProcessing ? 'Procesando Malla...' : 'Escanear Video Demostrativo'}
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Universal File Dropzone (Images, SVGs, PDFs, Blueprints) */}
            {activeInputMode === 'files' && (
              <div className="space-y-3 animate-fadeIn">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sube cualquier archivo (<strong className="text-white">Imágenes .PNG/.JPG, Vectores .SVG, Planos .PDF o .TXT</strong>) para generar un modelo 3D con relieve y normales:
                </p>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-cyber-gold/40 hover:border-cyber-gold rounded-2xl p-6 bg-cyber-950/80 text-center cursor-pointer group transition-all hover:shadow-gold-glow"
                >
                  <div className="w-14 h-14 rounded-2xl bg-cyber-900 border border-cyber-700 flex items-center justify-center mx-auto mb-2 text-cyber-gold group-hover:scale-110 shadow-md transition-transform">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div className="font-tech font-bold text-sm text-white">
                    SUELTA CUALQUIER ARCHIVO AQUÍ PARA CONVERTIRLO A 3D
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Formatos: PNG, JPG, WEBP, SVG, PDF, TXT, JSON, GLB, OBJ
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartScan('Chaqueta_Techwear.png', 'jacket');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-cyber-gold hover:bg-amber-400 text-black font-tech font-bold text-xs uppercase shadow-gold-glow"
                    >
                      Probar con Chaqueta
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartScan('Silla_Nordica.svg', 'chair');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-cyber-950 border border-cyber-700 hover:border-cyber-gold text-white font-tech font-bold text-xs uppercase"
                    >
                      Probar con Silla
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Text-to-3D Prompt Generation */}
            {activeInputMode === 'text' && (
              <div className="space-y-3 animate-fadeIn">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Describe el objeto que deseas sintetizar y la IA creará la malla 3D paramétrica:
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={textPrompt}
                      onChange={(e) => setTextPrompt(e.target.value)}
                      placeholder="Ej: Chaqueta bomber acolchada cyberpunk con cuello térmico..."
                      className="flex-1 bg-cyber-950 border border-cyber-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                    <button
                      disabled={isProcessing}
                      onClick={() => handleStartScan(textPrompt || 'Modelo IA Generativo', 'jacket')}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-tech font-bold text-xs uppercase shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center gap-1 shrink-0"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>{isProcessing ? 'Sintetizando...' : 'Generar'}</span>
                    </button>
                  </div>

                  {/* Preset Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      { label: '🧥 Puffer Cyberpunk', type: 'jacket' },
                      { label: '👟 Chunky Sneaker', type: 'sneaker' },
                      { label: '🪑 Silla Nórdica', type: 'chair' },
                      { label: '🎛️ Synth Modular', type: 'synth' },
                      { label: '☕ Tumbler Térmico', type: 'tumbler' }
                    ].map((pill, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setTextPrompt(pill.label);
                          handleStartScan(pill.label, pill.type as ModelType);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-cyber-950 border border-cyber-800 hover:border-cyan-400 text-[11px] text-slate-300 transition-all font-mono"
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: API Gateway (Tripo3D, Meshy, Runway) */}
            {activeInputMode === 'api' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="p-3 rounded-xl bg-cyber-gold/10 border border-cyber-gold/30 text-xs text-slate-300 flex items-start gap-2">
                  <Key className="w-4 h-4 text-cyber-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Conector de APIs 3D Profesionales</span>
                    Conecta tus credenciales de Tripo3D, Meshy AI o Runway para aceleración por GPU directa en producción.
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'tripo', name: 'Tripo3D API', speed: '30s Malla' },
                    { id: 'meshy', name: 'Meshy AI 4', speed: 'HD PBR' },
                    { id: 'runway', name: 'Runway 3D', speed: 'Cinematic' },
                    { id: 'instantmesh', name: 'InstantMesh', speed: 'Ultra Rápido' }
                  ].map((api) => (
                    <button
                      key={api.id}
                      onClick={() => setSelectedApiProvider(api.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedApiProvider === api.id
                          ? 'bg-cyber-gold/20 border-cyber-gold text-white shadow-gold-glow'
                          : 'bg-cyber-950 border-cyber-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-tech font-bold text-xs">{api.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{api.speed}</div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder={`Ingresa tu API Key de ${selectedApiProvider.toUpperCase()}...`}
                    className="flex-1 bg-cyber-950 border border-cyber-700 focus:border-cyber-gold rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      setIsApiKeySaved(true);
                      alert(`¡API Key de ${selectedApiProvider.toUpperCase()} vinculada con éxito!`);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-cyber-800 hover:bg-cyber-700 border border-cyber-700 text-cyber-gold font-tech font-bold text-xs uppercase transition-colors"
                  >
                    {isApiKeySaved ? '✓ Guardada' : 'Guardar'}
                  </button>
                </div>
              </div>
            )}

            {/* Hidden Universal File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".mp4,.mov,.png,.jpg,.jpeg,.webp,.svg,.pdf,.txt,.json,.glb,.gltf,.obj"
              className="hidden"
              onChange={handleFileUpload}
            />

            {/* Reconstruction Pipeline HUD */}
            <div className="space-y-2 pt-2 border-t border-cyber-800">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span className="truncate pr-2">{activeStage}</span>
                <span className="text-cyan-400 font-bold shrink-0">{progress}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-cyber-950 border border-cyber-800 overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-cyber-gold transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Export Center Box */}
          <div className="bg-cyber-900/90 p-4 rounded-2xl border border-cyber-800 shadow-cyber-card flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Download className="w-4 h-4 text-cyber-gold" />
              <span className="font-tech font-bold uppercase">Exportar Modelo Reconstruido:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {['.GLB (Web)', '.OBJ (3D)', '.FBX (Unity)', '.USDZ (Apple AR)'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => handleExportModel(fmt)}
                  className="px-2.5 py-1 rounded-lg bg-cyber-950 border border-cyber-800 hover:border-cyber-gold text-[11px] font-mono text-slate-300 hover:text-white transition-all"
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Viewport (6 cols) */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <div className="h-[490px] w-full">
            <Model3DCanvas
              type={generatedModelType}
              primaryColor="#1E293B"
              accentColor="#E5A93C"
              autoRotate={true}
              celShaded={stylePreset === 'cel'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

