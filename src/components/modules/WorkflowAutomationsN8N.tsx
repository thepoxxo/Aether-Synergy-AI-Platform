import React, { useState, useEffect } from 'react';
import {
  Workflow,
  Zap,
  Play,
  Pause,
  Plus,
  Trash2,
  Settings,
  Code,
  Box,
  Video,
  Radio,
  Sparkles,
  ShoppingBag,
  Send,
  Database,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Layers,
  ArrowRight,
  Filter,
  Terminal,
  Share2,
  Download,
  Flame,
  Sliders,
  Maximize2
} from 'lucide-react';
import {
  AutomationWorkflow,
  WorkflowNode,
  WorkflowEdge,
  WorkflowExecutionLog,
  NodeType,
  NodeCategory
} from '../../types/workflowAutomation';

export const WorkflowAutomationsN8N: React.FC = () => {
  // Preset Templates
  const PRESET_WORKFLOWS: AutomationWorkflow[] = [
    {
      id: 'wf_ecommerce_viral',
      name: '🚀 Lanzamiento Viral Automático E-Commerce',
      description: 'Trigger por diseño aprobado -> Generación 3D GLB -> Video Ad 4K 9:16 -> Música Phonk -> Creación de Producto Shopify -> Campaña TikTok Ads.',
      tags: ['E-Commerce', 'Shopify', 'TikTok Ads', 'Tripo3D', 'Runway Gen-3'],
      isActive: true,
      totalExecutions: 148,
      successRate: 98.6,
      avgDurationSec: 18.4,
      webhookUrl: 'https://api.aether.ai/v1/webhooks/wf_ecommerce_viral_789a',
      cronSchedule: 'Manual / On-Demand',
      nodes: [
        {
          id: 'node_1',
          type: 'trigger_webhook',
          name: 'Webhook: Diseño 3D Aprobado',
          category: 'trigger',
          icon: 'Zap',
          description: 'Recibe payload JSON cuando un diseñador aprueba un modelo en Aurora 3D.',
          position: { x: 50, y: 150 },
          status: 'idle',
          config: { method: 'POST', auth: 'Bearer Token', path: '/webhook/design-approved' },
          outputSample: { designId: 'DES-892', title: 'Cyberpunk Bomber Titanium', category: 'clothing', price: 189.0 }
        },
        {
          id: 'node_2',
          type: 'ai_tripo_3d',
          name: 'Tripo3D: Generar Malla Quad .GLB',
          category: 'ai_engine',
          icon: 'Box',
          description: 'Genera la geometría 3D y texturas PBR listas para la tienda y AR.',
          position: { x: 300, y: 150 },
          status: 'idle',
          config: { format: 'glb', quality: 'production_quad', textureResolution: '4k' },
          outputSample: { modelUrl: 'https://assets.aether.ai/models/bomber_v2.glb', polyCount: 34200, texturePBR: true }
        },
        {
          id: 'node_3',
          type: 'ai_runway_video',
          name: 'Runway Gen-3: Video Ad 4K (9:16)',
          category: 'ai_engine',
          icon: 'Video',
          description: 'Crea un comercial vertical cinemático de 15s para TikTok y Reels.',
          position: { x: 560, y: 80 },
          status: 'idle',
          config: { duration: 15, resolution: '2160x3840', cameraMovement: 'orbital_slow' },
          outputSample: { videoUrl: 'https://assets.aether.ai/videos/bomber_ad_4k.mp4', aspect: '9:16', durationSec: 15 }
        },
        {
          id: 'node_4',
          type: 'ai_suno_music',
          name: 'Suno AI: Banda Sonora Phonk 808',
          category: 'ai_engine',
          icon: 'Radio',
          description: 'Sintetiza música comercial de alta energía libre de royalties.',
          position: { x: 560, y: 250 },
          status: 'idle',
          config: { genre: 'Cyberpunk Phonk', bpm: 128, lengthSec: 30 },
          outputSample: { audioUrl: 'https://assets.aether.ai/music/phonk_beat.mp3', bpm: 128, license: 'Commercial_Full' }
        },
        {
          id: 'node_5',
          type: 'action_shopify',
          name: 'Shopify: Publicar Producto 3D & AR',
          category: 'action',
          icon: 'ShoppingBag',
          description: 'Sube automáticamente el artículo a la tienda Shopify con visor 3D embebido.',
          position: { x: 820, y: 80 },
          status: 'idle',
          config: { store: 'aether-luxury.myshopify.com', status: 'active', tags: ['3D_AR', 'AI_Design'] },
          outputSample: { productId: 'shp_904812', handle: 'cyberpunk-bomber-titanium', url: 'https://aether-luxury.com/products/cyberpunk-bomber' }
        },
        {
          id: 'node_6',
          type: 'action_tiktok_ads',
          name: 'TikTok Ads: Lanzar Campaña CPA',
          category: 'action',
          icon: 'Flame',
          description: 'Publica el anuncio con el video de Runway y la música de Suno con $50/día.',
          position: { x: 820, y: 250 },
          status: 'idle',
          config: { dailyBudgetUSD: 50, objective: 'CONVERSIONS', pixelId: 'TT_PIXEL_884' },
          outputSample: { campaignId: 'tt_camp_192', adgroupId: 'ag_883', status: 'ACTIVE_REVIEW' }
        }
      ],
      edges: [
        { id: 'e1_2', source: 'node_1', target: 'node_2' },
        { id: 'e2_3', source: 'node_2', target: 'node_3' },
        { id: 'e2_4', source: 'node_2', target: 'node_4' },
        { id: 'e3_5', source: 'node_3', target: 'node_5' },
        { id: 'e4_6', source: 'node_4', target: 'node_6' }
      ]
    },
    {
      id: 'wf_trend_lookbook',
      name: '📈 Trend Scraper & Auto-Lookbook Diario',
      description: 'Cron diario 08:00 AM -> Gemini 1.5 Vision Scraper -> FLUX.1 Lookbook -> Notificación Discord a Directores.',
      tags: ['Tendencias', 'Gemini Pro', 'FLUX.1', 'Discord', 'Cron'],
      isActive: true,
      totalExecutions: 89,
      successRate: 100,
      avgDurationSec: 12.1,
      webhookUrl: 'https://api.aether.ai/v1/webhooks/wf_trend_lookbook_452b',
      cronSchedule: '0 8 * * * (Todos los días a las 08:00 AM)',
      nodes: [
        {
          id: 'node_t1',
          type: 'trigger_cron',
          name: 'Cron: Diario 08:00 AM',
          category: 'trigger',
          icon: 'Clock',
          description: 'Disparador programado todas las mañanas automáticamente.',
          position: { x: 50, y: 150 },
          status: 'idle',
          config: { cron: '0 8 * * *', timezone: 'America/Bogota' },
          outputSample: { triggeredAt: '2026-09-02T08:00:00Z', runId: 'cron_884' }
        },
        {
          id: 'node_t2',
          type: 'ai_gemini_vision',
          name: 'Gemini 1.5 Pro: Trend Scraper',
          category: 'ai_engine',
          icon: 'Sparkles',
          description: 'Analiza las micro-tendencias virales en Pinterest, TikTok y pasarelas de Milán.',
          position: { x: 300, y: 150 },
          status: 'idle',
          config: { sources: ['TikTok Trends', 'Pinterest Fashion', 'WGSN 2026'], model: 'gemini-1.5-pro' },
          outputSample: { dominantTrend: 'Neo-Gothic High-Tech Luxury', dominantColor: '#1A0B2E', viralScore: 94 }
        },
        {
          id: 'node_t3',
          type: 'ai_flux_image',
          name: 'FLUX.1 Pro: Lookbook Editorial 8K',
          category: 'ai_engine',
          icon: 'Sparkles',
          description: 'Genera 4 imágenes hiperrealistas de modelos luciendo la tendencia detectada.',
          position: { x: 560, y: 150 },
          status: 'idle',
          config: { numImages: 4, lighting: 'Studio Vogue Lighting', quality: '8k' },
          outputSample: { images: ['https://assets.aether.ai/lookbooks/lb_1.jpg', 'https://assets.aether.ai/lookbooks/lb_2.jpg'] }
        },
        {
          id: 'node_t4',
          type: 'action_discord',
          name: 'Discord: Alerta al Canal #directores',
          category: 'action',
          icon: 'Send',
          description: 'Envía el reporte y lookbook al canal privado de diseñadores con botón de remix.',
          position: { x: 820, y: 150 },
          status: 'idle',
          config: { channelId: '1098293849', botName: 'Aether Synergy Sentinel' },
          outputSample: { messageId: 'msg_9921', delivered: true, channel: '#directores-creativos' }
        }
      ],
      edges: [
        { id: 'et1_2', source: 'node_t1', target: 'node_t2' },
        { id: 'et2_3', source: 'node_t2', target: 'node_t3' },
        { id: 'et3_4', source: 'node_t3', target: 'node_t4' }
      ]
    },
    {
      id: 'wf_restaurant_macro_video',
      name: '🍔 Restaurante & Gastro-Ads Express',
      description: 'Webhook Nuevo Plato en Carta -> Luma Dream Machine (Vapor & Macro) -> Copy AIDA -> Publicación Instagram & Reels.',
      tags: ['Restaurante', 'Luma AI', 'Copywriting', 'Instagram', 'Meta Ads'],
      isActive: false,
      totalExecutions: 64,
      successRate: 96.8,
      avgDurationSec: 15.6,
      webhookUrl: 'https://api.aether.ai/v1/webhooks/wf_restaurant_gastro_991c',
      cronSchedule: 'Manual / POS Webhook',
      nodes: [
        {
          id: 'node_r1',
          type: 'trigger_webhook',
          name: 'Webhook: Plato Registrado en Menú',
          category: 'trigger',
          icon: 'Zap',
          description: 'Disparado por el sistema de cocina o POS al añadir un plato especial.',
          position: { x: 50, y: 150 },
          status: 'idle',
          config: { system: 'Square / Toast POS / Manual' },
          outputSample: { dishName: 'Wagyu Burger Truffle Gold', price: '$28', chef: 'Chef Alejandro' }
        },
        {
          id: 'node_r2',
          type: 'ai_runway_video',
          name: 'Luma Dream: Video Macro con Vapor',
          category: 'ai_engine',
          icon: 'Video',
          description: 'Renderiza tomas cinematográficas macro con movimiento de queso y vapor caliente.',
          position: { x: 300, y: 150 },
          status: 'idle',
          config: { effect: 'hot_steam_slowmo', duration: 10, resolution: '4K' },
          outputSample: { videoUrl: 'https://assets.aether.ai/videos/burger_macro_steam.mp4', duration: 10 }
        },
        {
          id: 'node_r3',
          type: 'action_tiktok_ads',
          name: 'Meta Ads: Anuncio Geofencing 5km',
          category: 'action',
          icon: 'Flame',
          description: 'Activa anuncio en Instagram Reels para personas a menos de 5km del restaurante.',
          position: { x: 600, y: 150 },
          status: 'idle',
          config: { radiusKm: 5, budgetUSD: 30, objective: 'REACH_RESERVATIONS' },
          outputSample: { adId: 'meta_ad_7721', reachEstimate: '12,000 personas/día' }
        }
      ],
      edges: [
        { id: 'er1_2', source: 'node_r1', target: 'node_r2' },
        { id: 'er2_3', source: 'node_r2', target: 'node_r3' }
      ]
    }
  ];

  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(PRESET_WORKFLOWS);
  const [selectedWfId, setSelectedWfId] = useState<string>(PRESET_WORKFLOWS[0].id);
  const [activeTab, setActiveTab] = useState<'canvas' | 'logs' | 'n8n_export' | 'webhook_test'>('canvas');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentRunningNodeId, setCurrentRunningNodeId] = useState<string | null>(null);
  const [executionLogs, setExecutionLogs] = useState<WorkflowExecutionLog[]>([]);
  const [copiedWebhook, setCopiedWebhook] = useState<boolean>(false);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  const activeWorkflow = workflows.find((w) => w.id === selectedWfId) || workflows[0];

  const handleSelectWorkflow = (id: string) => {
    setSelectedWfId(id);
    setSelectedNodeId(null);
    setExecutionLogs([]);
  };

  const handleToggleWorkflowActive = (wfId: string) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === wfId ? { ...w, isActive: !w.isActive } : w))
    );
  };

  // Live Workflow Runner Simulator
  const handleExecuteWorkflow = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setExecutionLogs([]);
    setActiveTab('canvas');

    // Reset all nodes to idle
    setWorkflows((prev) =>
      prev.map((wf) => {
        if (wf.id !== activeWorkflow.id) return wf;
        return {
          ...wf,
          nodes: wf.nodes.map((n) => ({ ...n, status: 'idle' as const }))
        };
      })
    );

    const logs: WorkflowExecutionLog[] = [];
    const orderedNodes = [...activeWorkflow.nodes];

    for (let i = 0; i < orderedNodes.length; i++) {
      const node = orderedNodes[i];
      setCurrentRunningNodeId(node.id);

      // Set node running
      setWorkflows((prev) =>
        prev.map((wf) => {
          if (wf.id !== activeWorkflow.id) return wf;
          return {
            ...wf,
            nodes: wf.nodes.map((n) => (n.id === node.id ? { ...n, status: 'running' as const } : n))
          };
        })
      );

      const delay = Math.floor(Math.random() * 800) + 700;
      await new Promise((r) => setTimeout(r, delay));

      // Add log
      const logItem: WorkflowExecutionLog = {
        id: `log_${Date.now()}_${i}`,
        nodeId: node.id,
        nodeName: node.name,
        timestamp: new Date().toLocaleTimeString(),
        status: 'success',
        durationMs: delay,
        message: `Paso completado exitosamente: ${node.name}`,
        dataPayload: node.outputSample || { status: 'OK', processedAt: new Date().toISOString() }
      };
      logs.push(logItem);
      setExecutionLogs([...logs]);

      // Set node success
      setWorkflows((prev) =>
        prev.map((wf) => {
          if (wf.id !== activeWorkflow.id) return wf;
          return {
            ...wf,
            nodes: wf.nodes.map((n) =>
              n.id === node.id
                ? {
                    ...n,
                    status: 'success' as const,
                    lastRunTime: 'Hace unos segundos',
                    executionDurationMs: delay
                  }
                : n
            )
          };
        })
      );
    }

    setCurrentRunningNodeId(null);
    setIsRunning(false);

    // Update execution stats
    setWorkflows((prev) =>
      prev.map((wf) => {
        if (wf.id !== activeWorkflow.id) return wf;
        return {
          ...wf,
          totalExecutions: wf.totalExecutions + 1
        };
      })
    );
  };

  const handleCopyWebhook = () => {
    if (activeWorkflow.webhookUrl) {
      navigator.clipboard.writeText(activeWorkflow.webhookUrl);
      setCopiedWebhook(true);
      setTimeout(() => setCopiedWebhook(false), 2000);
    }
  };

  // Generate n8n compatible JSON format
  const generateN8NJson = () => {
    const n8nData = {
      name: `Aether - ${activeWorkflow.name}`,
      nodes: activeWorkflow.nodes.map((n, idx) => ({
        parameters: n.config,
        id: n.id,
        name: n.name,
        type: `n8n-nodes-base.${n.type}`,
        typeVersion: 1,
        position: [n.position.x * 2, n.position.y * 2]
      })),
      connections: activeWorkflow.edges.reduce((acc: any, edge) => {
        if (!acc[edge.source]) {
          acc[edge.source] = { main: [[]] };
        }
        acc[edge.source].main[0].push({
          node: edge.target,
          type: 'main',
          index: 0
        });
        return acc;
      }, {})
    };
    return JSON.stringify(n8nData, null, 2);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(generateN8NJson());
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const selectedNode = activeWorkflow.nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/95 p-6 rounded-3xl border border-cyber-gold/40 shadow-cyber-card backdrop-blur-2xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold shadow-gold-glow">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-widest">
                AETHER WORKFLOWS AI (ESTILO N8N / MAKE)
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/50">
                ORQUESTADOR DE NODOS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Automatiza flujos completos de diseño 3D, videos 4K con IA, síntesis musical, publicación en Shopify y pauta en TikTok
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleExecuteWorkflow}
            disabled={isRunning}
            className={`px-5 py-2.5 rounded-2xl font-tech font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50 animate-pulse'
                : 'bg-gradient-to-r from-amber-500 to-cyber-gold text-black shadow-gold-glow hover:opacity-90'
            }`}
          >
            {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-black" />}
            <span>{isRunning ? 'EJECUTANDO FLUJO...' : 'PROBAR FLUJO EN VIVO'}</span>
          </button>
        </div>
      </div>

      {/* Workflow Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {workflows.map((wf) => {
          const isSelected = wf.id === selectedWfId;
          return (
            <div
              key={wf.id}
              onClick={() => handleSelectWorkflow(wf.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-cyber-900 border-cyber-gold shadow-gold-glow'
                  : 'bg-cyber-950/80 border-cyber-800 hover:border-cyber-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <h4 className="font-tech font-bold text-sm text-white">{wf.name}</h4>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleWorkflowActive(wf.id);
                  }}
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    wf.isActive
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {wf.isActive ? 'ACTIVO' : 'PAUSADO'}
                </button>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2">{wf.description}</p>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-cyber-800/80">
                <span>{wf.nodes.length} Nodos Conectados</span>
                <span className="text-emerald-400 font-bold">{wf.successRate}% Éxito ({wf.totalExecutions} runs)</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Automation Workspace */}
      <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-gold/30 shadow-cyber-card space-y-6">
        {/* Navigation Tabs inside workflow */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyber-800 pb-4">
          <div className="flex items-center gap-2">
            {[
              { id: 'canvas', label: '🎨 Lienzo de Nodos (Visual Graph)', icon: Workflow },
              { id: 'logs', label: `📋 Registro de Ejecución (${executionLogs.length})`, icon: Terminal },
              { id: 'n8n_export', label: '📤 Exportar a n8n / Make JSON', icon: Code },
              { id: 'webhook_test', label: '🔗 Webhook Trigger URL', icon: Zap }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-tech font-bold transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-cyber-gold text-black shadow-gold-glow'
                      : 'bg-cyber-950 text-slate-400 hover:text-white border border-cyber-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Clock className="w-3.5 h-3.5 text-cyber-gold" />
            <span>Frecuencia: {activeWorkflow.cronSchedule}</span>
          </div>
        </div>

        {/* TAB 1: Visual Graph Node Canvas */}
        {activeTab === 'canvas' && (
          <div className="space-y-4">
            {/* Visual Canvas Area */}
            <div className="relative min-h-[420px] bg-cyber-950/90 rounded-2xl border border-cyber-800 p-6 overflow-x-auto overflow-y-hidden shadow-inner">
              {/* Background Grid Dots */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Node Cards */}
              <div className="relative z-10 flex flex-wrap lg:flex-nowrap items-center gap-8 min-w-max">
                {activeWorkflow.nodes.map((node, index) => {
                  const isRunningThis = currentRunningNodeId === node.id;
                  const isSelected = selectedNodeId === node.id;

                  const categoryColors: Record<NodeCategory, string> = {
                    trigger: 'border-amber-500 bg-amber-500/10 text-amber-400',
                    ai_engine: 'border-cyan-500 bg-cyan-500/10 text-cyan-400',
                    logic: 'border-purple-500 bg-purple-500/10 text-purple-400',
                    action: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
                    output: 'border-rose-500 bg-rose-500/10 text-rose-400'
                  };

                  return (
                    <div key={node.id} className="flex items-center gap-4">
                      {/* Node Box */}
                      <div
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`w-64 p-4 rounded-2xl border transition-all cursor-pointer relative bg-cyber-900 shadow-cyber-card ${
                          isSelected
                            ? 'ring-2 ring-cyber-gold border-cyber-gold'
                            : 'border-cyber-800 hover:border-cyber-700'
                        } ${isRunningThis ? 'ring-2 ring-cyan-400 animate-pulse' : ''}`}
                      >
                        {/* Status Indicator Pill */}
                        <div className="flex items-center justify-between mb-2.5">
                          <span
                            className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                              categoryColors[node.category]
                            }`}
                          >
                            {node.category.toUpperCase()}
                          </span>

                          <div className="flex items-center gap-1">
                            {node.status === 'running' && (
                              <span className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono font-bold animate-pulse">
                                <RefreshCw className="w-3 h-3 animate-spin" /> Running
                              </span>
                            )}
                            {node.status === 'success' && (
                              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-bold">
                                <CheckCircle2 className="w-3 h-3" /> Done
                              </span>
                            )}
                            {node.status === 'idle' && (
                              <span className="text-[10px] text-slate-500 font-mono">Idle</span>
                            )}
                          </div>
                        </div>

                        <h5 className="font-tech font-bold text-xs text-white mb-1">{node.name}</h5>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{node.description}</p>

                        {/* Node Footer with Parameters Badge */}
                        <div className="mt-3 pt-2 border-t border-cyber-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>{Object.keys(node.config).length} Parámetros</span>
                          {node.executionDurationMs && (
                            <span className="text-emerald-400">{node.executionDurationMs}ms</span>
                          )}
                        </div>

                        {/* Node Connector Port (Right) */}
                        {index < activeWorkflow.nodes.length - 1 && (
                          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyber-gold border-2 border-black flex items-center justify-center shadow-gold-glow" />
                        )}
                      </div>

                      {/* Animated Connector Arrow between nodes */}
                      {index < activeWorkflow.nodes.length - 1 && (
                        <div className="flex items-center text-cyber-gold/80 animate-pulse">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Node Inspector Drawer */}
            {selectedNode && (
              <div className="p-5 rounded-2xl bg-cyber-950 border border-cyber-gold/40 shadow-cyber-card space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-cyber-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-cyber-gold" />
                    <h4 className="font-tech font-bold text-sm text-white">
                      Inspector del Nodo: <span className="text-cyber-gold">{selectedNode.name}</span>
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-900 text-slate-400 border border-cyber-800">
                    ID: {selectedNode.id}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1 font-bold">Parámetros de Configuración (JSON):</label>
                    <pre className="p-3 rounded-xl bg-cyber-900 border border-cyber-800 text-cyan-300 text-[11px] overflow-x-auto">
                      {JSON.stringify(selectedNode.config, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1 font-bold">Payload de Salida Simulado / Real:</label>
                    <pre className="p-3 rounded-xl bg-cyber-900 border border-cyber-800 text-emerald-300 text-[11px] overflow-x-auto">
                      {JSON.stringify(selectedNode.outputSample || { status: 'idle' }, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Execution Logs & Live Terminal */}
        {activeTab === 'logs' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Consola de Ejecución en Tiempo Real:</span>
              <button
                onClick={() => setExecutionLogs([])}
                className="text-[10px] text-slate-400 hover:text-white underline"
              >
                Limpiar Consola
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 max-h-96 overflow-y-auto">
              {executionLogs.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <Terminal className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <span>No hay ejecuciones recientes. Haz clic en "Probar Flujo en Vivo" para ver el trace.</span>
                </div>
              ) : (
                executionLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-cyber-900 border border-cyber-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-white font-bold">{log.nodeName}</span>
                      </div>
                      <span className="text-slate-500 text-[10px]">{log.timestamp} ({log.durationMs}ms)</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{log.message}</p>
                    {log.dataPayload && (
                      <pre className="text-[10px] text-cyan-400 bg-cyber-950 p-2 rounded border border-cyber-800/60 overflow-x-auto">
                        {JSON.stringify(log.dataPayload, null, 2)}
                      </pre>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: n8n Export JSON */}
        {activeTab === 'n8n_export' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-tech font-bold text-sm text-white">Exportador Nativo para n8n & Make.com</h4>
                <p className="text-xs text-slate-400 font-sans">
                  Copia este JSON e impórtalo directamente en tu instancia de n8n (Menú &rarr; Import from JSON) o en Make.
                </p>
              </div>

              <button
                onClick={handleCopyJson}
                className="px-4 py-2 rounded-xl bg-cyber-gold text-black font-tech font-bold text-xs flex items-center gap-1.5 shadow-gold-glow"
              >
                {copiedJson ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedJson ? '¡JSON COPIADO!' : 'COPIAR JSON DE N8N'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 text-cyan-300 text-[11px] overflow-x-auto max-h-96">
              {generateN8NJson()}
            </pre>
          </div>
        )}

        {/* TAB 4: Webhook Trigger URL & Bridge */}
        {activeTab === 'webhook_test' && (
          <div className="space-y-4 font-mono text-xs">
            <div>
              <h4 className="font-tech font-bold text-sm text-white">URL de Endpoint Webhook del Flujo</h4>
              <p className="text-xs text-slate-400 font-sans">
                Envía una petición POST desde tu tienda Shopify, tu servidor externo o tu aplicación móvil para disparar este flujo automáticamente.
              </p>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-2xl bg-cyber-950 border border-cyber-gold/40">
              <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-[10px]">POST</span>
              <input
                type="text"
                readOnly
                value={activeWorkflow.webhookUrl}
                className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none"
              />
              <button
                onClick={handleCopyWebhook}
                className="px-3 py-1.5 rounded-xl bg-cyber-900 hover:bg-cyber-800 text-cyber-gold border border-cyber-800 text-xs flex items-center gap-1"
              >
                {copiedWebhook ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedWebhook ? 'Copiado' : 'Copiar URL'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
              <span className="text-slate-400 block font-bold">Ejemplo de Solicitud con cURL:</span>
              <pre className="text-[11px] text-amber-300 overflow-x-auto">
{`curl -X POST "${activeWorkflow.webhookUrl}" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer AETHER_SECRET_KEY" \\
  -d '{
    "designId": "DES-994",
    "prompt": "Vestido de gala cibernético con seda luminiscente",
    "autoPublishShopify": true,
    "tiktokAdBudgetUSD": 50
  }'`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
