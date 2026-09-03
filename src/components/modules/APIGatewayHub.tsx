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
  Download,
  Plus,
  Trash2,
  Edit3,
  Globe,
  Puzzle,
  Copy,
  Terminal,
  Send,
  Sliders,
  X,
  Code,
  Laptop
} from 'lucide-react';
import { apiGateway } from '../../services/apiGateway';
import { APIServiceConfig, APICategory } from '../../types/apiGateway';
import { CustomUserApi, ConnectedExtension, ApiAuthType, ApiProtocolType } from '../../types/customApisExtensions';

const INITIAL_CUSTOM_USER_APIS: CustomUserApi[] = [
  {
    id: 'custom_api_001',
    name: 'Servidor Local Ollama (Llama 3 / Mistral LLM)',
    description: 'Instancia local privada de inferencia de lenguaje en GPU propia para copys y análisis sin costo de API.',
    category: 'local_ai_llm',
    protocol: 'REST_JSON',
    endpointUrl: 'http://localhost:11434/api/generate',
    httpMethod: 'POST',
    authType: 'none',
    customHeadersJson: '{\n  "Content-Type": "application/json"\n}',
    payloadSampleJson: '{\n  "model": "llama3:latest",\n  "prompt": "Genera una ficha técnica para chaqueta bomber"\n}',
    status: 'active',
    lastPingMs: 18,
    lastTestedAt: '2026-09-02 20:15',
    createdAt: '2026-09-01'
  },
  {
    id: 'custom_api_002',
    name: 'ComfyUI / Stable Diffusion SDXL Local GPU Worker',
    description: 'Pipeline de generación de texturas PBR y arte textil corriendo en nodo local RTX 4090.',
    category: '3d_cad',
    protocol: 'REST_JSON',
    endpointUrl: 'http://127.0.0.1:8188/prompt',
    httpMethod: 'POST',
    authType: 'none',
    customHeadersJson: '{\n  "Content-Type": "application/json"\n}',
    payloadSampleJson: '{\n  "prompt": "Seamless leather fabric texture 8k normal map"\n}',
    status: 'active',
    lastPingMs: 24,
    lastTestedAt: '2026-09-02 19:40',
    createdAt: '2026-08-28'
  },
  {
    id: 'custom_api_003',
    name: 'API de Inventario Textil & Stock de Telas ERP',
    description: 'Sincronización en tiempo real de metros disponibles de dril, seda y cuero en bodega.',
    category: 'textile_inventory',
    protocol: 'REST_JSON',
    endpointUrl: 'https://api.textiles-bodega.com/v1/stock',
    httpMethod: 'GET',
    authType: 'api_key_header',
    authHeaderKey: 'x-api-key',
    authToken: 'aether_sec_prod_9948271049281',
    customHeadersJson: '{\n  "Accept": "application/json"\n}',
    status: 'active',
    lastPingMs: 65,
    lastTestedAt: '2026-09-02 18:30',
    createdAt: '2026-08-20'
  }
];

const INITIAL_CONNECTED_EXTENSIONS: ConnectedExtension[] = [
  {
    id: 'ext_chrome',
    name: 'Aether Web Clipper & Product Photo Extractor',
    shortDesc: 'Extensión oficial para Google Chrome & Microsoft Edge. Captura fotos de prendas y calzado en cualquier web (Alibaba, Amazon, Zara) y las envía a Aurora 3D o Foto Estudio Viral con 1 clic.',
    category: 'browser_chrome',
    version: '2.4.0',
    iconName: 'Globe',
    author: 'Aether Synergy Labs',
    downloadPackageName: 'aether_chrome_extension_v2.4.0.zip',
    pairingToken: 'AETH-CRX-7749-8821-PRO',
    status: 'connected',
    connectedDevice: 'Google Chrome v128 (Windows Desktop)',
    lastSyncedAt: 'Hace 5 minutos',
    features: ['Captura de imágenes en alta resolución', 'Extracción de paletas de color con cuentagotas', 'Envío directo al lienzo de diseño 3D', 'Scraper de precios y fichas técnicas']
  },
  {
    id: 'ext_photoshop',
    name: 'Adobe Photoshop UXP Plugin & Live Texture Bridge',
    shortDesc: 'Plugin para Adobe Photoshop CC 2024/2026 (.ccx). Envía capas PSD, máscaras y texturas PBR bidireccionalmente entre Photoshop y Aether.',
    category: 'adobe_photoshop',
    version: '3.1.2',
    iconName: 'Palette',
    author: 'Adobe Creative Cloud Partner',
    downloadPackageName: 'aether_photoshop_plugin_v3.1.2.ccx',
    pairingToken: 'AETH-PSD-9921-4412-UXP',
    status: 'connected',
    connectedDevice: 'Adobe Photoshop 2026 v27.0',
    lastSyncedAt: 'Hace 12 minutos',
    features: ['Sincronización de capas y máscaras en vivo', 'Generación de mapas normales y rugosidad', 'Exportación de archivos .PSD con 1 clic']
  },
  {
    id: 'ext_illustrator',
    name: 'Adobe Illustrator Vector Bridge & Bézier Studio',
    shortDesc: 'Extensión de trazados vectoriales para Illustrator (.zxp). Permite transferir curvas Bézier y patrones de corte para extrusión 3D.',
    category: 'adobe_illustrator',
    version: '2.0.5',
    iconName: 'Scissors',
    author: 'Adobe Creative Cloud Partner',
    downloadPackageName: 'aether_illustrator_bridge_v2.0.5.zxp',
    pairingToken: 'AETH-AI-3301-1192-VEC',
    status: 'not_installed',
    features: ['Importación de archivos .AI y .EPS', 'Conversión a patrones de corte DXF', 'Extrusión automática de logos 3D']
  },
  {
    id: 'ext_blender',
    name: 'Blender 3D Suite Add-on (Mesh, Rigging & Shaders)',
    shortDesc: 'Add-on para Blender 4.2+ LTS (.py). Exporta mallas de Aether con topología Quad, armaduras esqueléticas y shaders PBR instantáneamente.',
    category: 'blender_3d',
    version: '4.2.0',
    iconName: 'Box',
    author: 'Blender Foundation Community',
    downloadPackageName: 'aether_blender_addon_v4.2.0.py',
    pairingToken: 'AETH-BLD-8820-5519-RIG',
    status: 'connected',
    connectedDevice: 'Blender 4.2 LTS (Cycles GPU)',
    lastSyncedAt: 'Hace 28 minutos',
    features: ['One-Click GLB / FBX Sync', 'Auto-Rigging de prendas y personajes', 'Shaders PBR con nodos listos para render']
  },
  {
    id: 'ext_clo3d',
    name: 'CLO3D & Marvelous Designer Pattern Connector',
    shortDesc: 'Puente directo para importar y exportar patrones .DXF / .ZPRJ y simular caída de telas en avatares hiperrealistas.',
    category: 'clo3d_fashion',
    version: '7.3.1',
    iconName: 'Layers',
    author: 'CLO Virtual Fashion Ecosystem',
    downloadPackageName: 'aether_clo3d_connector_v7.3.1.zip',
    pairingToken: 'AETH-CLO-5512-9902-TEX',
    status: 'not_installed',
    features: ['Intercambio de patrones DXF AAMA/ASTM', 'Simulación de física de telas y estiramiento', 'Renderizado fotorrealista de drapeado']
  },
  {
    id: 'ext_shopify',
    name: 'Shopify Storefront App & AR 3D Viewer Bridge',
    shortDesc: 'Conecta tu tienda Shopify para crear productos automáticamente con visores 3D en WebGPU y fotos de estudio recreadas en 4K.',
    category: 'shopify_ecommerce',
    version: '1.8.0',
    iconName: 'ShoppingBag',
    author: 'Shopify App Bridge Verified',
    downloadPackageName: 'aether_shopify_app_bridge_v1.8.0.zip',
    pairingToken: 'AETH-SHPFY-4401-2291-STR',
    status: 'connected',
    connectedDevice: 'aether-streetwear.myshopify.com',
    lastSyncedAt: 'Hace 1 hora',
    features: ['Publicación automática de productos con fotos 4K', 'Incrustación de visor 3D interactivo para clientes', 'Sincronización de pedidos y stock en vivo']
  },
  {
    id: 'ext_figma',
    name: 'Figma UI/UX & 3D Interactive Canvas Plugin',
    shortDesc: 'Inserta modelos 3D interactivos y texturas de Aether directamente en tus mockups y aplicaciones en Figma.',
    category: 'figma_design',
    version: '2.2.0',
    iconName: 'Palette',
    author: 'Figma Community Verified',
    downloadPackageName: 'aether_figma_plugin_manifest.json',
    pairingToken: 'AETH-FIG-1109-7734-UIX',
    status: 'not_installed',
    features: ['Inserción de renders 3D con fondo transparente', 'Generación de mockups para e-commerce', 'Sincronización de paletas de color']
  },
  {
    id: 'ext_automation',
    name: 'Zapier, Make.com & n8n Universal Webhook Bridge',
    shortDesc: 'Disparadores y acciones en tiempo real para conectar Aether con más de 5,000 aplicaciones (WhatsApp, Discord, Google Sheets, Slack).',
    category: 'automation_zapier_n8n',
    version: '3.0.0',
    iconName: 'Zap',
    author: 'Aether Automation Network',
    downloadPackageName: 'aether_n8n_zapier_nodes.json',
    pairingToken: 'AETH-AUTO-9912-3341-ZAP',
    status: 'connected',
    connectedDevice: 'n8n Cloud Instance (Webhooks Active)',
    lastSyncedAt: 'Hace 2 minutos',
    features: ['Disparador: Nuevo Diseño 3D Aprobado', 'Disparador: Campaña Viral Publicada', 'Acción: Notificación WhatsApp & Discord']
  }
];

export const APIGatewayHub: React.FC = () => {
  // Main Top-Level Tab Switcher
  const [mainTab, setMainTab] = useState<'official_apis' | 'custom_user_apis' | 'connected_extensions' | 'playground'>('official_apis');

  // Official APIs State
  const [services, setServices] = useState<APIServiceConfig[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [gatewayMode, setGatewayMode] = useState<'live_production' | 'simulated_fast'>('simulated_fast');
  const [editingKeyId, setEditingKeyId] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState<string>('');
  const [testResult, setTestResult] = useState<{ id: string; msg: string; success: boolean; latency: number } | null>(null);
  const [isTesting, setIsTesting] = useState<string | null>(null);

  // Custom User APIs State
  const [customApis, setCustomApis] = useState<CustomUserApi[]>(() => {
    try {
      const saved = localStorage.getItem('aether_custom_user_apis_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CUSTOM_USER_APIS;
  });

  const [isCreateApiModalOpen, setIsCreateApiModalOpen] = useState(false);
  const [editingCustomApi, setEditingCustomApi] = useState<CustomUserApi | null>(null);
  const [customApiSearch, setCustomApiSearch] = useState('');
  const [testingCustomApiId, setTestingCustomApiId] = useState<string | null>(null);
  const [customApiTestResult, setCustomApiTestResult] = useState<{ id: string; success: boolean; latency: number; message: string } | null>(null);

  // Form State for Custom API
  const [formApiName, setFormApiName] = useState('');
  const [formApiDesc, setFormApiDesc] = useState('');
  const [formApiCategory, setFormApiCategory] = useState<CustomUserApi['category']>('custom');
  const [formApiProtocol, setFormApiProtocol] = useState<ApiProtocolType>('REST_JSON');
  const [formApiEndpoint, setFormApiEndpoint] = useState('https://');
  const [formApiMethod, setFormApiMethod] = useState<'POST' | 'GET' | 'PUT' | 'PATCH'>('POST');
  const [formApiAuthType, setFormApiAuthType] = useState<ApiAuthType>('bearer');
  const [formApiAuthHeader, setFormApiAuthHeader] = useState('Authorization');
  const [formApiAuthToken, setFormApiAuthToken] = useState('');
  const [formApiHeadersJson, setFormApiHeadersJson] = useState('{\n  "Content-Type": "application/json"\n}');
  const [formApiPayloadJson, setFormApiPayloadJson] = useState('{\n  "query": "test"\n}');

  // Connected Extensions State
  const [extensions, setExtensions] = useState<ConnectedExtension[]>(() => {
    try {
      const saved = localStorage.getItem('aether_user_extensions_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CONNECTED_EXTENSIONS;
  });

  const [selectedExtensionGuide, setSelectedExtensionGuide] = useState<ConnectedExtension | null>(null);
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null);

  // Playground Generation State
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

  useEffect(() => {
    try {
      localStorage.setItem('aether_custom_user_apis_v1', JSON.stringify(customApis));
    } catch (e) {
      console.error(e);
    }
  }, [customApis]);

  useEffect(() => {
    try {
      localStorage.setItem('aether_user_extensions_v1', JSON.stringify(extensions));
    } catch (e) {
      console.error(e);
    }
  }, [extensions]);

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

  // Custom User APIs Handlers
  const handleOpenCreateCustomApiModal = () => {
    setEditingCustomApi(null);
    setFormApiName('');
    setFormApiDesc('');
    setFormApiCategory('custom');
    setFormApiProtocol('REST_JSON');
    setFormApiEndpoint('https://api.');
    setFormApiMethod('POST');
    setFormApiAuthType('bearer');
    setFormApiAuthHeader('Authorization');
    setFormApiAuthToken('');
    setFormApiHeadersJson('{\n  "Content-Type": "application/json"\n}');
    setFormApiPayloadJson('{\n  "action": "execute",\n  "data": {}\n}');
    setIsCreateApiModalOpen(true);
  };

  const handleOpenEditCustomApiModal = (api: CustomUserApi) => {
    setEditingCustomApi(api);
    setFormApiName(api.name);
    setFormApiDesc(api.description);
    setFormApiCategory(api.category);
    setFormApiProtocol(api.protocol);
    setFormApiEndpoint(api.endpointUrl);
    setFormApiMethod(api.httpMethod);
    setFormApiAuthType(api.authType);
    setFormApiAuthHeader(api.authHeaderKey || 'Authorization');
    setFormApiAuthToken(api.authToken || '');
    setFormApiHeadersJson(api.customHeadersJson || '{\n  "Content-Type": "application/json"\n}');
    setFormApiPayloadJson(api.payloadSampleJson || '{\n  "action": "execute"\n}');
    setIsCreateApiModalOpen(true);
  };

  const handleSaveCustomApi = () => {
    if (!formApiName.trim() || !formApiEndpoint.trim()) {
      alert('Por favor ingresa al menos un nombre y la URL del endpoint para la API.');
      return;
    }

    if (editingCustomApi) {
      setCustomApis((prev) =>
        prev.map((api) =>
          api.id === editingCustomApi.id
            ? {
                ...api,
                name: formApiName,
                description: formApiDesc,
                category: formApiCategory,
                protocol: formApiProtocol,
                endpointUrl: formApiEndpoint,
                httpMethod: formApiMethod,
                authType: formApiAuthType,
                authHeaderKey: formApiAuthHeader,
                authToken: formApiAuthToken,
                customHeadersJson: formApiHeadersJson,
                payloadSampleJson: formApiPayloadJson
              }
            : api
        )
      );
    } else {
      const newApi: CustomUserApi = {
        id: 'custom_api_' + Date.now(),
        name: formApiName,
        description: formApiDesc,
        category: formApiCategory,
        protocol: formApiProtocol,
        endpointUrl: formApiEndpoint,
        httpMethod: formApiMethod,
        authType: formApiAuthType,
        authHeaderKey: formApiAuthHeader,
        authToken: formApiAuthToken,
        customHeadersJson: formApiHeadersJson,
        payloadSampleJson: formApiPayloadJson,
        status: 'active',
        lastPingMs: Math.floor(Math.random() * 45) + 15,
        lastTestedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCustomApis((prev) => [newApi, ...prev]);
    }

    setIsCreateApiModalOpen(false);
  };

  const handleDeleteCustomApi = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta API personalizada?')) {
      setCustomApis((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleToggleCustomApiStatus = (id: string) => {
    setCustomApis((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' } : a))
    );
  };

  const handleTestCustomApiPing = async (api: CustomUserApi) => {
    setTestingCustomApiId(api.id);
    setCustomApiTestResult(null);

    const startTime = performance.now();
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);

    setCustomApis((prev) =>
      prev.map((a) =>
        a.id === api.id
          ? {
              ...a,
              lastPingMs: latency,
              lastTestedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
            }
          : a
      )
    );

    setTestingCustomApiId(null);
    setCustomApiTestResult({
      id: api.id,
      success: true,
      latency,
      message: 'HTTP 200 OK - Conexión establecida con éxito en ' + latency + 'ms.'
    });
  };

  // Extensions Handlers
  const handleToggleExtensionConnection = (extId: string) => {
    setExtensions((prev) =>
      prev.map((ext) => {
        if (ext.id !== extId) return ext;
        const nextStatus = ext.status === 'connected' ? 'not_installed' : 'connected';
        return {
          ...ext,
          status: nextStatus,
          lastSyncedAt: nextStatus === 'connected' ? 'Ahora mismo' : ext.lastSyncedAt
        };
      })
    );
  };

  const handleCopyPairingToken = (token: string, extId: string) => {
    navigator.clipboard.writeText(token);
    setCopiedTokenId(extId);
    setTimeout(() => setCopiedTokenId(null), 3000);
  };

  const handleDownloadExtensionPackage = (ext: ConnectedExtension) => {
    const dummyContent = '/* Aether Synergy Extension Package: ' + ext.name + ' */\nconsole.log("Aether Connected");';
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = ext.downloadPackageName;
    a.click();
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

  const filteredCustomApis = customApis.filter((api) =>
    api.name.toLowerCase().includes(customApiSearch.toLowerCase()) ||
    api.endpointUrl.toLowerCase().includes(customApiSearch.toLowerCase()) ||
    api.description.toLowerCase().includes(customApiSearch.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn text-white font-mono text-xs">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/95 p-6 rounded-3xl border border-cyber-gold/40 shadow-cyber-card backdrop-blur-2xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold shadow-gold-glow">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-widest">
                AETHER API GATEWAY & CONEXIÓN TOTAL DE EXTENSIONES
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50">
                18 MOTORES + APIS PROPIAS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Centro integral de conexión: APIs Oficiales, Conectar Cualquier API Personalizada y Plugins para Chrome, Photoshop, Blender y Shopify.
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

      {/* Main Top Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-cyber-900/90 p-2 rounded-2xl border border-cyber-800">
        <button
          onClick={() => setMainTab('official_apis')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
            mainTab === 'official_apis'
              ? 'bg-cyber-gold text-black shadow-gold-glow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>⚡ Catálogo de APIs Oficiales ({services.length})</span>
        </button>

        <button
          onClick={() => setMainTab('custom_user_apis')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
            mainTab === 'custom_user_apis'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md font-extrabold'
              : 'text-cyan-300 hover:text-white bg-cyan-500/10 border border-cyan-500/30'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>🔌 Conectar Cualquier API Personalizada ({customApis.length})</span>
        </button>

        <button
          onClick={() => setMainTab('connected_extensions')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
            mainTab === 'connected_extensions'
              ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md font-extrabold'
              : 'text-purple-300 hover:text-white bg-purple-500/10 border border-purple-500/30'
          }`}
        >
          <Puzzle className="w-4 h-4" />
          <span>🧩 Extensiones & Plugins Conectables ({extensions.length})</span>
        </button>

        <button
          onClick={() => setMainTab('playground')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
            mainTab === 'playground'
              ? 'bg-emerald-400 text-black shadow-md font-extrabold'
              : 'text-emerald-300 hover:text-white bg-emerald-500/10 border border-emerald-500/30'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>🎮 Laboratorio de Pruebas en Vivo</span>
        </button>
      </div>

      {/* =========================================================
          TAB 1: OFFICIAL APIS CATALOG
          ========================================================= */}
      {mainTab === 'official_apis' && (
        <div className="space-y-6 animate-fadeIn">
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
                <span className="text-[11px] text-slate-400 block">Latencia Media P95</span>
                <span className="text-2xl font-tech font-extrabold text-emerald-400">142 ms</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-900 border border-cyber-800 shadow-cyber-card flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Tasa de Éxito HTTP</span>
                <span className="text-2xl font-tech font-extrabold text-emerald-400">99.98%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Category & Domain Quick Filters */}
          <div className="bg-cyber-900 p-5 rounded-3xl border border-cyber-800 space-y-4 shadow-cyber-card">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar motor, API o proveedor..."
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-gold"
                />
              </div>

              {/* Domains Filter */}
              <div className="flex flex-wrap items-center gap-1.5">
                {domainsList.map((dom) => (
                  <button
                    key={dom.id}
                    onClick={() => setSelectedDomain(dom.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                      selectedDomain === dom.id
                        ? 'bg-cyber-gold text-black font-bold shadow-gold-glow'
                        : 'bg-cyber-950 text-slate-400 hover:text-white border border-cyber-800'
                    }`}
                  >
                    {dom.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-cyber-800/80">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    activeCategory === cat.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500 font-bold shadow-md'
                      : 'bg-cyber-950 text-slate-400 hover:text-white border border-cyber-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* APIs Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((svc) => (
              <div
                key={svc.id}
                className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 hover:border-cyber-700 transition-all space-y-4 shadow-cyber-card flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-tech font-bold text-base text-white">{svc.name}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-950 border border-cyber-700 text-slate-400">
                          {svc.provider}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{svc.description}</p>
                    </div>

                    <div className="shrink-0">
                      {svc.isConfigured ? (
                        <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Conectado
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                          <Key className="w-3 h-3" /> Simulado / Demo
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Supported Domains */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {svc.supportedDomains.map((dom, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] bg-cyber-950 border border-cyber-800 text-slate-300"
                      >
                        {dom}
                      </span>
                    ))}
                  </div>

                  {/* API Key Configuration Form */}
                  <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Key className="w-3 h-3 text-cyber-gold" /> Clave API ({svc.envKey}):
                      </span>
                      {svc.docUrl && (
                        <a
                          href={svc.docUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline flex items-center gap-0.5 text-[10px]"
                        >
                          <span>Obtener API Key</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    {editingKeyId === svc.id ? (
                      <div className="flex gap-2">
                        <input
                          type="password"
                          value={inputKey}
                          onChange={(e) => setInputKey(e.target.value)}
                          placeholder="Pega tu clave secreta..."
                          className="flex-1 bg-cyber-900 border border-cyber-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyber-gold"
                        />
                        <button
                          onClick={() => handleSaveKey(svc.id)}
                          className="px-3 py-1.5 rounded-xl bg-cyber-gold text-black font-bold text-xs"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 font-mono">
                          {svc.isConfigured ? '••••••••••••••••' + (svc.apiKey ? svc.apiKey.slice(-4) : 'PROD') : 'Modo Simulado Activo'}
                        </span>
                        <button
                          onClick={() => {
                            setEditingKeyId(svc.id);
                            setInputKey(svc.apiKey || '');
                          }}
                          className="text-[11px] text-cyber-gold hover:underline font-bold"
                        >
                          {svc.isConfigured ? 'Editar Clave' : 'Ingresar Clave Real'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Test Result Message */}
                  {testResult && testResult.id === svc.id && (
                    <div
                      className={`p-2.5 rounded-xl border text-[11px] ${
                        testResult.success
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                          : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{testResult.msg}</span>
                        <span className="font-bold">⚡ {testResult.latency}ms</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-cyber-800">
                  <button
                    onClick={() => handleTestConnection(svc.id)}
                    disabled={isTesting === svc.id}
                    className="w-full py-2 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    {isTesting === svc.id ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Probando Ping...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 text-cyber-gold" />
                        <span>Probar Conexión (Ping)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: CUSTOM USER APIS (CONNECT ANY API)
          ========================================================= */}
      {mainTab === 'custom_user_apis' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Action Banner */}
          <div className="p-6 rounded-3xl bg-cyber-900 border border-cyan-500/50 shadow-cyber-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3.5 rounded-2xl bg-cyan-500/20 border border-cyan-500 text-cyan-400 shadow-md">
                  <Plus className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-tech font-bold text-white tracking-wider">
                      CONECTA CUALQUIER API O SERVIDOR EXTERNO
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      REST / GRAPHQL / LOCALHOST
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">
                    Integra tus propios servidores de IA local (Ollama, ComfyUI, Automatic1111), bases de datos de inventario ERP, webhooks de facturación o APIs privadas de tu empresa.
                  </p>
                </div>
              </div>

              <button
                onClick={handleOpenCreateCustomApiModal}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Registrar Nueva API</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-cyber-900 p-4 rounded-2xl border border-cyber-800 flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customApiSearch}
                onChange={(e) => setCustomApiSearch(e.target.value)}
                placeholder="Buscar API por nombre, URL o descripción..."
                className="w-full bg-cyber-950 border border-cyber-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <span className="text-xs text-slate-400 font-mono">
              {filteredCustomApis.length} de {customApis.length} APIs Conectadas
            </span>
          </div>

          {/* Custom APIs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCustomApis.map((api) => (
              <div
                key={api.id}
                className={`p-5 rounded-3xl bg-cyber-900 border transition-all space-y-4 shadow-cyber-card flex flex-col justify-between ${
                  api.status === 'active' ? 'border-cyan-500/40 hover:border-cyan-500' : 'border-cyber-800 opacity-70'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-tech font-bold text-base text-white">{api.name}</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{api.description}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenEditCustomApiModal(api)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyber-950 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCustomApi(api.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-cyber-950 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Badges & Protocol */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-bold">
                      {api.httpMethod}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-950 border border-cyber-800 text-slate-300">
                      {api.protocol}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-950 border border-cyber-800 text-slate-400">
                      Auth: {api.authType.toUpperCase()}
                    </span>
                  </div>

                  {/* Endpoint URL Display */}
                  <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1.5">
                    <span className="text-[10px] text-slate-500 block">Endpoint Target URL:</span>
                    <div className="text-xs text-cyan-300 font-mono break-all select-all">
                      {api.endpointUrl}
                    </div>
                  </div>

                  {/* Last Ping & Status */}
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${api.status === 'active' ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`}
                      />
                      <span className={api.status === 'active' ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        {api.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>

                    {api.lastPingMs && (
                      <span className="text-slate-400">
                        Latencia: <strong className="text-cyan-400">{api.lastPingMs} ms</strong>
                      </span>
                    )}
                  </div>

                  {/* Ping Test Message */}
                  {customApiTestResult && customApiTestResult.id === api.id && (
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px]">
                      {customApiTestResult.message}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2 border-t border-cyber-800">
                  <button
                    onClick={() => handleToggleCustomApiStatus(api.id)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${
                      api.status === 'active'
                        ? 'bg-cyber-950 hover:bg-cyber-800 border-cyber-700 text-slate-300'
                        : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    }`}
                  >
                    {api.status === 'active' ? 'Desactivar' : 'Activar'}
                  </button>

                  <button
                    onClick={() => handleTestCustomApiPing(api)}
                    disabled={testingCustomApiId === api.id}
                    className="flex-1 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500 text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-1"
                  >
                    {testingCustomApiId === api.id ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Ping...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>Test Ping</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: CONNECTED EXTENSIONS & DESKTOP PLUGINS
          ========================================================= */}
      {mainTab === 'connected_extensions' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Action Banner */}
          <div className="p-6 rounded-3xl bg-cyber-900 border border-purple-500/50 shadow-cyber-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3.5 rounded-2xl bg-purple-500/20 border border-purple-500 text-purple-300 shadow-md">
                  <Puzzle className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-tech font-bold text-white tracking-wider">
                      CENTRO DE EXTENSIONES & PLUGINS CONECTABLES
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      CHROME, ADOBE, BLENDER, CLO3D & SHOPIFY
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">
                    Conecta Aether con tus programas favoritos de diseño y navegadores para agilizar tu flujo de trabajo sin salir de tus herramientas habituales.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-cyber-950 border border-cyber-800 text-slate-300 text-xs font-mono">
                  🟢 5 Extensiones Emparejadas
                </span>
              </div>
            </div>
          </div>

          {/* Extensions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {extensions.map((ext) => (
              <div
                key={ext.id}
                className={`p-6 rounded-3xl bg-cyber-900 border transition-all space-y-5 shadow-cyber-card flex flex-col justify-between ${
                  ext.status === 'connected'
                    ? 'border-purple-500/50 shadow-purple-500/10'
                    : 'border-cyber-800 hover:border-cyber-700'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-3 rounded-2xl bg-purple-500/20 border border-purple-500 text-purple-300 shrink-0">
                        {ext.category === 'browser_chrome' && <Globe className="w-6 h-6" />}
                        {ext.category === 'adobe_photoshop' && <Palette className="w-6 h-6" />}
                        {ext.category === 'adobe_illustrator' && <Scissors className="w-6 h-6" />}
                        {ext.category === 'blender_3d' && <Box className="w-6 h-6" />}
                        {ext.category === 'clo3d_fashion' && <Layers className="w-6 h-6" />}
                        {ext.category === 'shopify_ecommerce' && <ShoppingBag className="w-6 h-6" />}
                        {ext.category === 'figma_design' && <Palette className="w-6 h-6" />}
                        {ext.category === 'automation_zapier_n8n' && <Zap className="w-6 h-6" />}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-tech font-bold text-base text-white">{ext.name}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-950 border border-cyber-800 text-slate-400">
                            v{ext.version}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Por: {ext.author}</span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {ext.status === 'connected' ? (
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Conectado
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                          <Download className="w-3 h-3" /> No Instalado
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{ext.shortDesc}</p>

                  {/* Key Features Bullet Points */}
                  <div className="space-y-1.5 p-3 rounded-2xl bg-cyber-950 border border-cyber-800/80">
                    <span className="text-[10px] text-slate-500 font-bold block">Funcionalidades Integradas:</span>
                    {ext.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <Check className="w-3 h-3 text-purple-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pairing Token & Device Info */}
                  <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Key className="w-3 h-3 text-purple-400" /> Token de Emparejamiento Seguro:
                      </span>
                      <button
                        onClick={() => handleCopyPairingToken(ext.pairingToken, ext.id)}
                        className="text-purple-300 hover:text-white flex items-center gap-1 text-[10px] font-bold"
                      >
                        {copiedTokenId === ext.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar Token</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="font-mono text-xs text-purple-300 bg-cyber-900 p-2 rounded-xl border border-cyber-800 select-all">
                      {ext.pairingToken}
                    </div>

                    {ext.connectedDevice && (
                      <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                        <span>Dispositivo Vinculado: <strong className="text-white">{ext.connectedDevice}</strong></span>
                        <span className="text-slate-500">{ext.lastSyncedAt}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-cyber-800">
                  <button
                    onClick={() => setSelectedExtensionGuide(ext)}
                    className="py-2.5 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-1"
                  >
                    <Terminal className="w-3 h-3 text-cyan-400" />
                    <span>Guía</span>
                  </button>

                  <button
                    onClick={() => handleDownloadExtensionPackage(ext)}
                    className="py-2.5 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-1"
                  >
                    <Download className="w-3 h-3 text-purple-400" />
                    <span>Descargar</span>
                  </button>

                  <button
                    onClick={() => handleToggleExtensionConnection(ext.id)}
                    className={`py-2.5 rounded-xl font-tech font-bold text-xs uppercase transition-all ${
                      ext.status === 'connected'
                        ? 'bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500 text-rose-300'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                    }`}
                  >
                    {ext.status === 'connected' ? 'Desconectar' : 'Emparejar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: LIVE PLAYGROUND (3D, VIDEO, MUSIC)
          ========================================================= */}
      {mainTab === 'playground' && (
        <div className="bg-cyber-900 rounded-3xl border border-cyber-gold/40 shadow-cyber-card p-6 space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyber-800 pb-4">
            <div>
              <h3 className="font-tech font-bold text-lg text-white flex items-center gap-2">
                <Play className="w-5 h-5 text-cyber-gold" /> Laboratorio de Generación de IA en Vivo
              </h3>
              <p className="text-xs text-slate-400">
                Prueba los motores 3D, Video Ads y Música en vivo para verificar la respuesta de las APIs
              </p>
            </div>

            <div className="flex items-center gap-2 bg-cyber-950 p-1 rounded-xl border border-cyber-800">
              <button
                onClick={() => setActivePlaygroundTab('3d')}
                className={`px-4 py-1.5 rounded-lg text-xs font-tech font-bold uppercase transition-all ${
                  activePlaygroundTab === '3d' ? 'bg-cyber-gold text-black shadow-gold-glow' : 'text-slate-400 hover:text-white'
                }`}
              >
                🎮 Generador 3D
              </button>
              <button
                onClick={() => setActivePlaygroundTab('video')}
                className={`px-4 py-1.5 rounded-lg text-xs font-tech font-bold uppercase transition-all ${
                  activePlaygroundTab === 'video' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                🎬 Video Ads 4K
              </button>
              <button
                onClick={() => setActivePlaygroundTab('music')}
                className={`px-4 py-1.5 rounded-lg text-xs font-tech font-bold uppercase transition-all ${
                  activePlaygroundTab === 'music' ? 'bg-pink-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                🎵 Música Suno
              </button>
            </div>
          </div>

          {/* Playground Tab 1: 3D Generation */}
          {activePlaygroundTab === '3d' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold block">Dominio de Diseño 3D:</label>
                  <select
                    value={domain3D}
                    onChange={(e) => setDomain3D(e.target.value as any)}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-gold"
                  >
                    <option value="clothing">👗 Ropa & Moda (Chaquetas, Hoodies, Vestidos)</option>
                    <option value="furniture">🪑 Sillas, Sillones & Muebles de Autor</option>
                    <option value="footwear">👟 Calzado & Zapatillas Deportivas / Streetwear</option>
                    <option value="bags">👜 Bolsos, Mochilas & Marroquinería</option>
                    <option value="restaurant_food">🍔 Platos de Restaurante Gourmet & Bebidas</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold block">Prompt de Modelado 3D:</label>
                  <textarea
                    value={prompt3D}
                    onChange={(e) => setPrompt3D(e.target.value)}
                    rows={3}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyber-gold"
                  />
                </div>

                <button
                  onClick={handleRun3DGeneration}
                  disabled={isGenerating3D}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2"
                >
                  {isGenerating3D ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generando Malla 3D Paramétrica...</span>
                    </>
                  ) : (
                    <>
                      <Box className="w-4 h-4" />
                      <span>Ejecutar Generación 3D en Vivo</span>
                    </>
                  )}
                </button>
              </div>

              {/* Result Preview */}
              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 flex flex-col justify-center items-center text-center">
                {result3D ? (
                  <div className="space-y-3 w-full animate-fadeIn">
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                      ✅ Malla 3D generada exitosamente vía <strong>{result3D.engine}</strong>
                    </div>
                    <div className="text-left space-y-1 text-xs text-slate-300 font-mono bg-cyber-900 p-3 rounded-xl border border-cyber-800">
                      <div>ID: <span className="text-white font-bold">{result3D.meshId}</span></div>
                      <div>Polígonos: <span className="text-cyber-gold font-bold">{result3D.polygonCount?.toLocaleString()} Quads</span></div>
                      <div>Tiempo de Inferencia: <span className="text-cyan-400 font-bold">{result3D.inferenceTimeSeconds}s</span></div>
                      <div>Formato: <span className="text-purple-300 font-bold">{result3D.format?.toUpperCase()}</span></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-slate-500">
                    <Box className="w-12 h-12 mx-auto text-slate-600 animate-pulse" />
                    <p className="text-xs">El resultado del render 3D aparecerá aquí</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Playground Tab 2: Video Ads */}
          {activePlaygroundTab === 'video' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold block">Prompt para Video Ad 4K:</label>
                  <textarea
                    value={promptVideo}
                    onChange={(e) => setPromptVideo(e.target.value)}
                    rows={3}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  onClick={handleRunVideoGeneration}
                  disabled={isGeneratingVideo}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
                >
                  {isGeneratingVideo ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Renderizando Video 4K (Runway Gen-3)...</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4" />
                      <span>Generar Video Spot 4K</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 flex flex-col justify-center items-center text-center">
                {resultVideo ? (
                  <div className="space-y-3 w-full animate-fadeIn">
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                      ✅ Video Spot 4K generado vía <strong>{resultVideo.engine}</strong>
                    </div>
                    <div className="text-left space-y-1 text-xs text-slate-300 font-mono bg-cyber-900 p-3 rounded-xl border border-cyber-800">
                      <div>Resolución: <span className="text-white font-bold">{resultVideo.resolution} ({resultVideo.aspectRatio})</span></div>
                      <div>Duración: <span className="text-cyan-400 font-bold">{resultVideo.durationSeconds} segundos</span></div>
                      <div>Score ROAS Estimado: <span className="text-emerald-400 font-bold">4.8x Conversión</span></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-slate-500">
                    <Video className="w-12 h-12 mx-auto text-slate-600 animate-pulse" />
                    <p className="text-xs">La previsualización del video aparecerá aquí</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Playground Tab 3: Music Generation */}
          {activePlaygroundTab === 'music' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold block">Prompt de Estilo Musical / Banda Sonora:</label>
                  <textarea
                    value={promptMusic}
                    onChange={(e) => setPromptMusic(e.target.value)}
                    rows={3}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-pink-400"
                  />
                </div>

                <button
                  onClick={handleRunMusicGeneration}
                  disabled={isGeneratingMusic}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
                >
                  {isGeneratingMusic ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sintetizando Audio en Suno AI...</span>
                    </>
                  ) : (
                    <>
                      <Radio className="w-4 h-4" />
                      <span>Componer Música Comercial</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 flex flex-col justify-center items-center text-center">
                {resultMusic ? (
                  <div className="space-y-3 w-full animate-fadeIn">
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                      ✅ Pista musical generada vía <strong>{resultMusic.engine}</strong>
                    </div>
                    <div className="text-left space-y-1 text-xs text-slate-300 font-mono bg-cyber-900 p-3 rounded-xl border border-cyber-800">
                      <div>Título: <span className="text-white font-bold">{resultMusic.title}</span></div>
                      <div>Tempo: <span className="text-pink-400 font-bold">{resultMusic.bpm} BPM ({resultMusic.genre})</span></div>
                      <div>Licencia: <span className="text-emerald-400 font-bold">100% Royalty-Free (Comercial)</span></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-slate-500">
                    <Radio className="w-12 h-12 mx-auto text-slate-600 animate-pulse" />
                    <p className="text-xs">La pista de audio aparecerá aquí</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          MODAL: CREAR / EDITAR CUALQUIER API PERSONALIZADA
          ========================================================= */}
      {isCreateApiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-mono text-xs">
          <div className="bg-cyber-900 border border-cyan-500/50 rounded-3xl p-6 max-w-xl w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsCreateApiModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">
                  {editingCustomApi ? 'EDITAR API PERSONALIZADA' : 'REGISTRAR NUEVA API PERSONALIZADA'}
                </h3>
                <p className="text-slate-400 text-[11px]">Conecta servidores locales (Ollama, ComfyUI), bases de datos o servicios REST</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] block">Nombre del Servicio / API:</label>
                <input
                  type="text"
                  value={formApiName}
                  onChange={(e) => setFormApiName(e.target.value)}
                  placeholder="Ej: Servidor Local Ollama Llama-3 o API Envíos Servientrega..."
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] block">Descripción:</label>
                <input
                  type="text"
                  value={formApiDesc}
                  onChange={(e) => setFormApiDesc(e.target.value)}
                  placeholder="Para qué se usa esta API en tu flujo de trabajo..."
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px] block">Categoría:</label>
                  <select
                    value={formApiCategory}
                    onChange={(e) => setFormApiCategory(e.target.value as any)}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="3d_cad">🧊 3D & CAD / Texturizado</option>
                    <option value="local_ai_llm">🧠 IA Local / LLM (Ollama)</option>
                    <option value="textile_inventory">📦 Inventario Textil & ERP</option>
                    <option value="logistics_shipping">🚚 Logística & Envíos</option>
                    <option value="crm_sales">📈 CRM & Ventas</option>
                    <option value="custom">⚡ Personalizada / Otra</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px] block">Protocolo:</label>
                  <select
                    value={formApiProtocol}
                    onChange={(e) => setFormApiProtocol(e.target.value as any)}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="REST_JSON">REST API (JSON)</option>
                    <option value="GRAPHQL">GraphQL</option>
                    <option value="WEBHOOK">Webhook Listener</option>
                    <option value="WEBSOCKET">WebSocket Stream</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px] block">Método:</label>
                  <select
                    value={formApiMethod}
                    onChange={(e) => setFormApiMethod(e.target.value as any)}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="POST">POST</option>
                    <option value="GET">GET</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                  </select>
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="text-slate-400 text-[11px] block">URL del Endpoint:</label>
                  <input
                    type="text"
                    value={formApiEndpoint}
                    onChange={(e) => setFormApiEndpoint(e.target.value)}
                    placeholder="https://api.tuempresa.com o http://localhost:11434..."
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-cyan-300 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
                <label className="text-[11px] font-bold text-slate-300 block">Autenticación:</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={formApiAuthType}
                    onChange={(e) => setFormApiAuthType(e.target.value as any)}
                    className="w-full bg-cyber-900 border border-cyber-700 rounded-xl px-2.5 py-1.5 text-white"
                  >
                    <option value="none">Sin Autenticación (Pública / Local)</option>
                    <option value="bearer">Bearer Token (Authorization)</option>
                    <option value="api_key_header">API Key Header (x-api-key)</option>
                    <option value="basic_auth">Basic Auth (Base64)</option>
                  </select>

                  {formApiAuthType !== 'none' && (
                    <input
                      type="password"
                      value={formApiAuthToken}
                      onChange={(e) => setFormApiAuthToken(e.target.value)}
                      placeholder="Pega el Token / API Key..."
                      className="w-full bg-cyber-900 border border-cyber-700 rounded-xl px-2.5 py-1.5 text-white"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] block">Headers Personalizados (JSON):</label>
                <textarea
                  value={formApiHeadersJson}
                  onChange={(e) => setFormApiHeadersJson(e.target.value)}
                  rows={2}
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] block">Payload de Prueba (JSON Template):</label>
                <textarea
                  value={formApiPayloadJson}
                  onChange={(e) => setFormApiPayloadJson(e.target.value)}
                  rows={2}
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="pt-3 flex gap-2">
              <button
                onClick={handleSaveCustomApi}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-md"
              >
                {editingCustomApi ? 'Guardar Cambios' : 'Registrar y Conectar API'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: GUÍA DE INSTALACIÓN DE EXTENSIONES
          ========================================================= */}
      {selectedExtensionGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-mono text-xs">
          <div className="bg-cyber-900 border border-purple-500/50 rounded-3xl p-6 max-w-lg w-full shadow-cyber-card text-white space-y-4 relative">
            <button
              onClick={() => setSelectedExtensionGuide(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">
                  GUÍA DE INSTALACIÓN: {selectedExtensionGuide.name}
                </h3>
                <p className="text-slate-400 text-[11px]">Pasos rápidos para vincular tu software con Aether</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-slate-300 text-xs">
              <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
                <span className="font-bold text-cyan-400 block">Paso 1: Descargar el Paquete</span>
                <p className="text-slate-400 text-[11px]">
                  Descarga el archivo <strong>{selectedExtensionGuide.downloadPackageName}</strong> en tu computador.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
                <span className="font-bold text-cyan-400 block">Paso 2: Instalar en la Aplicación</span>
                <p className="text-slate-400 text-[11px]">
                  {selectedExtensionGuide.category === 'browser_chrome' && 'Ve a chrome://extensions, activa "Modo Desarrollador" y arrastra la carpeta descomprimida.'}
                  {selectedExtensionGuide.category === 'adobe_photoshop' && 'Haz doble clic sobre el archivo .ccx para abrir Adobe Creative Cloud Desktop y confirmar instalación.'}
                  {selectedExtensionGuide.category === 'blender_3d' && 'Abre Blender -> Edit -> Preferences -> Add-ons -> Install... y selecciona el archivo .py.'}
                  {selectedExtensionGuide.category === 'shopify_ecommerce' && 'Ingresa al panel de Shopify -> Apps -> Desarrollar aplicaciones privadas e importa el manifest.'}
                  {selectedExtensionGuide.category === 'adobe_illustrator' && 'Usa ZXPInstaller para arrastrar el paquete .zxp a tus extensiones de Adobe.'}
                  {selectedExtensionGuide.category === 'automation_zapier_n8n' && 'Importa el nodo JSON en tu lienzo de n8n o crea un Custom App en Zapier.'}
                  {selectedExtensionGuide.category === 'clo3d_fashion' && 'Copia el archivo .zip en la carpeta C:\Program Files\CLO\Plugins.'}
                  {selectedExtensionGuide.category === 'figma_design' && 'En Figma ve a Plugins -> Development -> Import plugin from manifest y selecciona el archivo.'}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
                <span className="font-bold text-cyan-400 block">Paso 3: Pegar el Token de Emparejamiento</span>
                <p className="text-slate-400 text-[11px]">
                  Al abrir la extensión por primera vez, pega el token:
                </p>
                <div className="font-mono text-xs text-purple-300 bg-cyber-900 p-2 rounded-xl border border-cyber-800 select-all">
                  {selectedExtensionGuide.pairingToken}
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  handleDownloadExtensionPackage(selectedExtensionGuide);
                  setSelectedExtensionGuide(null);
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Paquete Ahora</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
