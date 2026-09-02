import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Box,
  Video,
  Sparkles,
  Radio,
  Zap,
  Server,
  ShieldAlert,
  ShoppingBag,
  Layers,
  Camera,
  Film,
  Activity,
  Palette,
  Scissors,
  CheckCircle2,
  AlertCircle,
  Clock,
  Play,
  Key,
  ExternalLink,
  Save,
  RefreshCw,
  Search,
  Filter,
  Check,
  ChevronRight,
  TrendingUp,
  Download
} from 'lucide-react';
import { apiGateway } from '../../services/apiGateway';
import { APIServiceConfig, APICategory } from '../../types/apiGateway';

export const APIGatewayHub: React.FC = () => {
  const [services, setServices] = useState<APIServiceConfig[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [gatewayMode, setGatewayMode] = useState<'live_production' | 'simulated_fast'>('simulated_fast');
  const [editingKeyId, setEditingKeyId] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState<string>('');
  const [testResult, setTestResult] = useState<{ id: string; msg: string; success: boolean; latency: number } | null>(null);
  const [isTesting, setIsTesting] = useState<string | null>(null);

  // Live Playground Generation State
  const [activePlaygroundTab, setActivePlaygroundTab] = useState<'3d' | 'video' | 'music'>('3d');
  const [prompt3D, setPrompt3D] = useState<string>('Chaqueta bomber cyberpunk impermeable con detalles en oro y titanio');
  const [domain3D, setDomain3D] = useState<'clothing' | 'furniture' | 'footwear' | 'bags' | 'restaurant_food'>('clothing');
  const [result3D, setResult3D] = useState<any>(null);
  const [isGenerating3D, setIsGenerating3D] = useState<boolean>(false);

  const [promptVideo, setPromptVideo] = useState<string>('Toma macro cinemática 4K de comida gourmet con vapor saliendo del plato');
  const [resultVideo, setResultVideo] = useState<any>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);

  const [promptMusic, setPromptMusic] = useState<string>('Cyberpunk Phonk enérgico con bajos 808 para anuncio publicitario de TikTok');
  const [resultMusic, setResultMusic] = useState<any>(null);
  const [isGeneratingMusic, setIsGeneratingMusic] = useState<boolean>(false);

  useEffect(() => {
    loadServices();
    setGatewayMode(apiGateway.getGatewayMode());
  }, []);

  const loadServices = () => {
    setServices(apiGateway.getServices());
  };

  const handleToggleGatewayMode = () => {
    const newMode = gatewayMode === 'live_production' ? 'simulated_fast' : 'live_production';
    apiGateway.setGatewayMode(newMode);
    setGatewayMode(newMode);
    loadServices();
  };

  const handleSaveKey = (serviceId: string) => {
    apiGateway.saveKey(serviceId, inputKey);
    setEditingKeyId(null);
    setInputKey('');
    loadServices();
  };

  const handleTestConnection = async (serviceId: string) => {
    setIsTesting(serviceId);
    setTestResult(null);
    const res = await apiGateway.testConnection(serviceId);
    setIsTesting(null);
    setTestResult({
      id: serviceId,
      msg: res.message,
      success: res.success,
      latency: res.latencyMs
    });
    loadServices();
  };

  // Playground actions
  const handleRun3DGeneration = async () => {
    setIsGenerating3D(true);
    setResult3D(null);
    const res = await apiGateway.generate3DMesh({
      prompt: prompt3D,
      domain: domain3D,
      style: 'cyberpunk',
      outputFormat: 'glb',
      quality: 'production_quad'
    });
    setResult3D(res);
    setIsGenerating3D(false);
  };

  const handleRunVideoGeneration = async () => {
    setIsGeneratingVideo(true);
    setResultVideo(null);
    const res = await apiGateway.generateVideoAd({
      prompt: promptVideo,
      aspectRatio: '9:16',
      durationSeconds: 15,
      motionStyle: 'macro_food_steam',
      targetAudience: 'tiktok_viral'
    });
    setResultVideo(res);
    setIsGeneratingVideo(false);
  };

  const handleRunMusicGeneration = async () => {
    setIsGeneratingMusic(true);
    setResultMusic(null);
    const res = await apiGateway.generateMusic({
      prompt: promptMusic,
      genre: 'cyber_phonk',
      durationSeconds: 30,
      bpm: 128,
      hasVocals: false
    });
    setResultMusic(res);
    setIsGeneratingMusic(false);
  };

  const categoriesList = [
    { id: 'all', label: 'Todas las APIs' },
    { id: '3d_mesh', label: '3D & Modelado' },
    { id: 'video_ads', label: 'Video Ads 4K' },
    { id: 'image_generation', label: 'Imágenes & Arte' },
    { id: 'music_sound', label: 'Música & Sonido' },
    { id: 'voice_synthesis', label: 'Locución & JARVIS' },
    { id: 'llm_agents', label: 'Agentes Swarm' },
    { id: 'cloud_database', label: 'Cloud & Database' },
    { id: 'payments_ecommerce', label: 'Pagos & Shopify' }
  ];

  const domainsList = [
    { id: 'all', label: 'Todos los Dominios' },
    { id: 'Ropa', label: '👗 Ropa & Moda' },
    { id: 'Sillas', label: '🪑 Sillas & Muebles' },
    { id: 'Calzado', label: '👟 Calzado & Zapatos' },
    { id: 'Bolsos', label: '👜 Bolsos & Accesorios' },
    { id: 'Restaurante', label: '🍔 Restaurantes & Comida' },
    { id: 'Música', label: '🎵 Música & Audio' }
  ];

  const filteredServices = services.filter((svc) => {
    const matchesCategory = activeCategory === 'all' || svc.category === activeCategory;
    const matchesDomain =
      selectedDomain === 'all' ||
      svc.supportedDomains.some((d) => d.toLowerCase().includes(selectedDomain.toLowerCase()));
    const matchesSearch =
      svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDomain && matchesSearch;
  });

  const telemetry = apiGateway.getTelemetry();

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn text-white">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/95 p-6 rounded-3xl border border-cyber-gold/40 shadow-cyber-card backdrop-blur-2xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold shadow-gold-glow">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-widest">
                AETHER API GATEWAY & CONECTORES DE IA REAL
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50">
                18 ENGINES DISPONIBLES
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Centro de orquestación para 3D (ropa, muebles, calzado, comida), videos 4K, música, imágenes, agentes autónomos y pagos
            </p>
          </div>
        </div>

        {/* Live vs Simulator Mode Toggle */}
        <div className="flex items-center gap-3 bg-cyber-950 p-1.5 rounded-2xl border border-cyber-800">
          <button
            onClick={handleToggleGatewayMode}
            className={`px-4 py-2 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              gatewayMode === 'live_production'
                ? 'bg-rose-500 text-white shadow-[0_0_15px_#f43f5e]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${gatewayMode === 'live_production' ? 'bg-white animate-ping' : 'bg-slate-600'}`} />
            <span>🔴 Modo Producción en Vivo</span>
          </button>

          <button
            onClick={handleToggleGatewayMode}
            className={`px-4 py-2 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              gatewayMode === 'simulated_fast'
                ? 'bg-cyber-gold text-black shadow-gold-glow font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>⚡ Modo Simulado (Demo)</span>
          </button>
        </div>
      </div>

      {/* Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-cyber-900 border border-cyber-800 shadow-cyber-card flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Motores IA Registrados</span>
            <span className="text-2xl font-tech font-extrabold text-white">{services.length} Servicios</span>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyber-900 border border-cyber-800 shadow-cyber-card flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Dominios de Diseño</span>
            <span className="text-2xl font-tech font-extrabold text-cyber-gold">7 Especialidades</span>
          </div>
          <div className="p-2.5 rounded-xl bg-cyber-gold/20 text-cyber-gold">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyber-900 border border-cyber-800 shadow-cyber-card flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Latencia Media de Respuesta</span>
            <span className="text-2xl font-tech font-extrabold text-emerald-400">{telemetry.averageLatencyMs} ms</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyber-900 border border-cyber-800 shadow-cyber-card flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Presupuesto Mensual COGS</span>
            <span className="text-2xl font-tech font-extrabold text-purple-400">${telemetry.estimatedMonthSpendUSD.toFixed(2)} USD</span>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Interactive Live Testing Laboratory (Playground) */}
      <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-gold/40 shadow-cyber-card space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyber-800 pb-4">
          <div>
            <h3 className="font-tech font-bold text-lg text-white flex items-center gap-2">
              <Play className="w-5 h-5 text-cyber-gold" /> Laboratorio Interactivo de Prueba de Generación en Vivo
            </h3>
            <p className="text-xs text-slate-400">
              Prueba los conectores de IA para 3D (ropa, muebles, calzado, comida), videos publicitarios, música y voces
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: '3d', label: '🎮 Generar 3D' },
              { id: 'video', label: '🎬 Generar Video Ads' },
              { id: 'music', label: '🎵 Generar Música' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePlaygroundTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-tech font-bold transition-all ${
                  activePlaygroundTab === tab.id
                    ? 'bg-cyber-gold text-black shadow-gold-glow'
                    : 'bg-cyber-950 text-slate-400 hover:text-white border border-cyber-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: 3D Generation Test */}
        {activePlaygroundTab === '3d' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Selecciona el Dominio del Producto:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'clothing', label: '👗 Ropa & Moda' },
                    { id: 'furniture', label: '🪑 Sillas & Muebles' },
                    { id: 'footwear', label: '👟 Calzado Deportivo' },
                    { id: 'bags', label: '👜 Bolsos & Marroquinería' },
                    { id: 'restaurant_food', label: '🍔 Platos Gourmet' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDomain3D(d.id as any)}
                      className={`p-2 rounded-xl border text-[11px] font-bold transition-all ${
                        domain3D === d.id
                          ? 'bg-cyber-gold/20 border-cyber-gold text-cyber-gold'
                          : 'bg-cyber-950 border-cyber-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Prompt de Generación 3D:</label>
                <textarea
                  rows={3}
                  value={prompt3D}
                  onChange={(e) => setPrompt3D(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-cyber-950 border border-cyber-800 text-white font-mono text-xs focus:outline-none focus:border-cyber-gold"
                />
              </div>

              <button
                onClick={handleRun3DGeneration}
                disabled={isGenerating3D}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-cyber-gold text-black font-tech font-extrabold text-sm uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                {isGenerating3D ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Box className="w-4 h-4" />}
                <span>{isGenerating3D ? 'PROCESANDO EN NUBE 3D...' : 'EJECUTAR GENERACIÓN 3D (.GLB)'}</span>
              </button>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-cyber-950 border border-cyber-800 flex flex-col justify-between font-mono text-xs">
              <div>
                <span className="text-slate-400 block mb-2 text-[10px] uppercase font-bold text-cyber-gold">
                  Resultado de Telemetría 3D:
                </span>
                {result3D ? (
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xl bg-cyber-900 border border-cyber-750 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Motor Utilizado:</span>
                        <span className="text-emerald-400 font-bold">{result3D.engineUsed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Formato Generado:</span>
                        <span className="text-white font-bold">{result3D.format} (Malla Quad)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Polígonos:</span>
                        <span className="text-cyber-gold font-bold">{result3D.polygonCount.toLocaleString()} Polys</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Tiempo de Inferencia:</span>
                        <span className="text-cyan-400 font-bold">{result3D.generationTimeSeconds}s</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Malla 3D lista para descargar o renderizar en Aurora Studio.</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-500">
                    <Box className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <span>Presiona "Ejecutar Generación 3D" para probar el conector.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Video Generation Test */}
        {activePlaygroundTab === 'video' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Prompt para Video Ad (TikTok / Reels / Restaurante):</label>
                <textarea
                  rows={3}
                  value={promptVideo}
                  onChange={(e) => setPromptVideo(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-cyber-950 border border-cyber-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                onClick={handleRunVideoGeneration}
                disabled={isGeneratingVideo}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-tech font-extrabold text-sm uppercase tracking-wider shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                {isGeneratingVideo ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
                <span>{isGeneratingVideo ? 'RENDERIZANDO VIDEO 4K...' : 'GENERAR VIDEO AD 9:16 (RUNWAY/LUMA)'}</span>
              </button>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-cyber-950 border border-cyber-800 flex flex-col justify-between">
              {resultVideo ? (
                <div className="space-y-2.5">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block">Video Publicitario Renderizado:</span>
                  <div className="p-3 rounded-xl bg-cyber-900 border border-cyber-750 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Motor de Render:</span>
                      <span className="text-cyan-400 font-bold">{resultVideo.engineUsed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Resolución:</span>
                      <span className="text-white font-bold">{resultVideo.resolution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Predicción de Impacto:</span>
                      <span className="text-emerald-400 font-bold">{resultVideo.roasPredicted}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500">
                  <Video className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <span>Configura tu prompt y genera un video publicitario en vivo.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Music Generation Test */}
        {activePlaygroundTab === 'music' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Descripción de la Banda Sonora (Suno AI):</label>
                <textarea
                  rows={3}
                  value={promptMusic}
                  onChange={(e) => setPromptMusic(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-cyber-950 border border-cyber-800 text-white font-mono text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              <button
                onClick={handleRunMusicGeneration}
                disabled={isGeneratingMusic}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-tech font-extrabold text-sm uppercase tracking-wider shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                {isGeneratingMusic ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Radio className="w-4 h-4" />}
                <span>{isGeneratingMusic ? 'SINTETIZANDO AUDIO...' : 'GENERAR BANDA SONORA (SUNO AI)'}</span>
              </button>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-cyber-950 border border-cyber-800 flex flex-col justify-between">
              {resultMusic ? (
                <div className="space-y-2.5">
                  <span className="text-[10px] uppercase font-bold text-purple-400 block">Pista de Audio Generada:</span>
                  <div className="p-3 rounded-xl bg-cyber-900 border border-cyber-750 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Título:</span>
                      <span className="text-white font-bold">{resultMusic.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tempo:</span>
                      <span className="text-cyber-gold font-bold">{resultMusic.bpm} BPM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Motor:</span>
                      <span className="text-purple-400 font-bold">{resultMusic.engineUsed}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500">
                  <Radio className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <span>Crea música comercial para tus anuncios con Suno AI.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* API Filters & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyber-gold text-black shadow-gold-glow font-bold'
                  : 'bg-cyber-900 text-slate-400 hover:text-white border border-cyber-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Domain Filter & Search Input */}
        <div className="flex items-center gap-2">
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-3 py-2 rounded-xl bg-cyber-900 border border-cyber-800 text-white text-xs font-mono focus:outline-none focus:border-cyber-gold cursor-pointer"
          >
            {domainsList.map((dom) => (
              <option key={dom.id} value={dom.id}>
                {dom.label}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar API por nombre o proveedor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-2 rounded-xl bg-cyber-900 border border-cyber-800 text-white text-xs font-mono focus:outline-none focus:border-cyber-gold w-64"
            />
          </div>
        </div>
      </div>

      {/* Test Result Banner */}
      {testResult && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-mono animate-fadeIn ${
            testResult.success
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {testResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{testResult.msg}</span>
          </div>
          <span className="font-bold text-slate-400">Latencia: {testResult.latency} ms</span>
        </div>
      )}

      {/* Grid of All 18 Connected AI Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((svc) => {
          const isEditing = editingKeyId === svc.id;
          const hasKey = svc.isConfigured;

          return (
            <div
              key={svc.id}
              className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 hover:border-cyber-750 transition-all shadow-cyber-card flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Card Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-cyber-950 border border-cyber-800 text-cyber-gold group-hover:border-cyber-gold/50 transition-colors">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-tech font-bold text-sm text-white">{svc.name}</h4>
                      <span className="text-[11px] font-mono text-slate-400">{svc.provider}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      hasKey && gatewayMode === 'live_production'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {hasKey && gatewayMode === 'live_production' ? 'LIVE ACTIVA' : 'SIMULADA'}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{svc.description}</p>

                {/* Supported Domains Tag Pills */}
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block mb-1 uppercase font-bold">Dominios Soportados:</span>
                  <div className="flex flex-wrap gap-1">
                    {svc.supportedDomains.map((dom, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyber-950 text-slate-300 border border-cyber-800">
                        {dom}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cost per call */}
                <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-cyber-800">
                  <span className="text-slate-400">Costo Estimado:</span>
                  <span className="text-cyber-gold font-bold">{svc.estimatedCostPerCall}</span>
                </div>
              </div>

              {/* API Key Management Input */}
              <div className="space-y-2 pt-2 border-t border-cyber-800 font-mono text-xs">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="password"
                      placeholder={`Pega tu ${svc.envKey}...`}
                      value={inputKey}
                      onChange={(e) => setInputKey(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-cyber-950 border border-cyber-gold text-white text-xs focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveKey(svc.id)}
                        className="flex-1 py-1.5 rounded-xl bg-cyber-gold text-black font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" /> Guardar
                      </button>
                      <button
                        onClick={() => setEditingKeyId(null)}
                        className="px-3 py-1.5 rounded-xl bg-cyber-950 border border-cyber-800 text-slate-400 text-xs"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <Key className="w-3.5 h-3.5 text-cyber-gold" />
                      <span>{hasKey ? `Clave: ${svc.apiKey}` : 'Sin clave (Modo Demo)'}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingKeyId(svc.id);
                          setInputKey(apiGateway.getStoredKey(svc.id));
                        }}
                        className="px-2.5 py-1 rounded-lg bg-cyber-950 hover:bg-cyber-800 border border-cyber-800 text-slate-300 hover:text-white text-[10px] transition-colors"
                      >
                        {hasKey ? 'Editar' : 'Ingresar'}
                      </button>
                      <button
                        onClick={() => handleTestConnection(svc.id)}
                        disabled={isTesting === svc.id}
                        className="px-2.5 py-1 rounded-lg bg-cyber-950 hover:bg-emerald-500/20 border border-cyber-800 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 text-[10px] transition-colors flex items-center gap-1"
                      >
                        {isTesting === svc.id ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                        <span>Test</span>
                      </button>
                      <a
                        href={svc.docUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-cyber-950 hover:bg-cyber-800 border border-cyber-800 text-slate-400 hover:text-cyan-400 transition-colors"
                        title="Ver Documentación Oficial"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
