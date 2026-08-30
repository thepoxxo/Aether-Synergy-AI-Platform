import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Bot,
  Zap,
  Activity,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  RefreshCw,
  Layers,
  Sparkles,
  Shield,
  Sliders,
  Terminal,
  Clock,
  ArrowRight
} from 'lucide-react';

interface AgentNode {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'busy' | 'idle';
  moduleTarget: string;
  health: number;
  tasksCompleted: number;
  currentTask: string;
  avatar: string;
  color: string;
}

export const AutonomousAgentSwarm: React.FC = () => {
  const [isAutoPilot, setIsAutoPilot] = useState<boolean>(true);
  const [selectedAgentId, setSelectedAgentId] = useState<string>('agent-1');

  const [agents, setAgents] = useState<AgentNode[]>([
    {
      id: 'agent-1',
      name: 'Agent Aegis 3D',
      role: 'Optimizador de Geometría, Shaders & WebGPU 60 FPS',
      status: 'active',
      moduleTarget: 'Aurora 3D Studio & WebGPU',
      health: 99.8,
      tasksCompleted: 1420,
      currentTask: 'Supervisando presupuesto de polígonos LOD y tasa de refresco a 60 FPS...',
      avatar: '💎',
      color: '#06B6D4'
    },
    {
      id: 'agent-2',
      name: 'Agent Viral Hook',
      role: 'Copywriting Publicitario & Síntesis de Video',
      status: 'active',
      moduleTarget: 'AdGen AI Video Marketing',
      health: 98.5,
      tasksCompleted: 980,
      currentTask: 'Generando ganchos de 3s para TikTok con retención estimada del 88%...',
      avatar: '🎬',
      color: '#F43F5E'
    },
    {
      id: 'agent-3',
      name: 'Agent Sourcing Guard',
      role: 'Auditoría Textil B2B, Aranceles & Contratos Escrow',
      status: 'active',
      moduleTarget: 'Proveedores Globales B2B',
      health: 100,
      tasksCompleted: 640,
      currentTask: 'Verificando certificación GOTS en Oporto y aranceles HTS 6201...',
      avatar: '🛡️',
      color: '#10B981'
    },
    {
      id: 'agent-4',
      name: 'Agent Trend Oracle',
      role: 'Predicción de Demanda WGSN & Fijación de Precios MSRP',
      status: 'active',
      moduleTarget: 'TrendForecaster 2026/2027',
      health: 99.2,
      tasksCompleted: 2150,
      currentTask: 'Indexando 2.8B de vistas en TikTok #techwear para actualizar MSRP...',
      avatar: '📈',
      color: '#E5A93C'
    },
    {
      id: 'agent-5',
      name: 'Agent Conversion Flow',
      role: 'Optimizador de Landing Pages Shopify & Checkout',
      status: 'active',
      moduleTarget: 'Shopify Landing Builder AI',
      health: 99.6,
      tasksCompleted: 870,
      currentTask: 'A/B testing de titulares AIDA y sticky buy box para dispositivos móviles...',
      avatar: '🛍️',
      color: '#8B5CF6'
    },
    {
      id: 'agent-6',
      name: 'Agent Pattern CAD',
      role: 'Verificador de Tolerancias de Costura & Moldería 2D',
      status: 'idle',
      moduleTarget: 'Patronaje Industrial 2D DXF',
      health: 100,
      tasksCompleted: 430,
      currentTask: 'Calibrando margen de costura de 1.0cm para corte láser Gerber...',
      avatar: '✂️',
      color: '#3B82F6'
    }
  ]);

  const [logs, setLogs] = useState<string[]>([
    '[06:50:12] [Agent Aegis 3D] Malla optimizada a 18,400 polígonos. WebGPU estable a 60 FPS.',
    '[06:50:35] [Agent Trend Oracle] Score de viralidad calculado en 96/100 para el tono Cyber Gold.',
    '[06:51:04] [Agent Sourcing Guard] Cotización FOB actualizada para fábrica Oporto: $28.50/prenda.',
    '[06:51:22] [Agent Conversion Flow] Plantilla Liquid de Shopify compilada con éxito sin errores de sintaxis.'
  ]);

  useEffect(() => {
    if (!isAutoPilot) return;
    const interval = setInterval(() => {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      const actions = [
        `Verificación de integridad completada en ${randomAgent.moduleTarget}.`,
        `Optimización de latencia en milisegundos ejecutada con éxito.`,
        `Monitoreo de telemetría: 100% de operatividad y recursos estables.`,
        `Parámetros sincronizados con el núcleo de Aether Synergy.`
      ];
      const newLog = `[${new Date().toLocaleTimeString()}] [${randomAgent.name}] ${actions[Math.floor(Math.random() * actions.length)]}`;
      setLogs((prev) => [newLog, ...prev.slice(0, 15)]);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPilot, agents]);

  const activeAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-6 rounded-3xl border border-purple-500/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-purple-500/20 border border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                ORQUESTADOR DE ENJAMBRE DE AGENTES AUTÓNOMOS (AI SWARM)
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/50">
                6 AGENTES ESPECIALIZADOS 24/7
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Supervisión autónoma continua de modelos 3D, video marketing, proveedores B2B, predicción de tendencias y landings Shopify
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoPilot(!isAutoPilot)}
            className={`px-4 py-2.5 rounded-2xl font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md ${
              isAutoPilot
                ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-cyber-950 border border-cyber-700 text-slate-400'
            }`}
          >
            {isAutoPilot ? <Play className="w-4 h-4 fill-emerald-300" /> : <Pause className="w-4 h-4" />}
            <span>{isAutoPilot ? 'Auto-Piloto Activo (24/7)' : 'Auto-Piloto Pausado'}</span>
          </button>
        </div>
      </div>

      {/* 6 Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => setSelectedAgentId(agent.id)}
            className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
              selectedAgentId === agent.id
                ? 'bg-cyber-900 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                : 'bg-cyber-950/80 border-cyber-800 hover:border-cyber-700'
            }`}
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2.5 rounded-2xl bg-cyber-950 border border-cyber-800">{agent.avatar}</span>
                  <div>
                    <h3 className="font-tech font-bold text-sm text-white">{agent.name}</h3>
                    <span className="text-[11px] font-mono text-purple-300 block">{agent.moduleTarget}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-3 font-medium">{agent.role}</p>

              <div className="p-3 bg-cyber-950 rounded-xl border border-cyber-800/80 text-[11px] font-mono text-slate-400 mt-3">
                <span className="text-purple-400 font-bold block mb-0.5">Acción en Curso:</span>
                <p className="truncate">{agent.currentTask}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-cyber-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Salud: <strong className="text-emerald-400">{agent.health}%</strong></span>
              <span>{agent.tasksCompleted.toLocaleString()} Tareas OK</span>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Telemetry Terminal & Manual Dispatch */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        {/* Left 7 Cols: Live Swarm Terminal Logs */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-3 shadow-cyber-card flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-cyber-800 pb-3">
            <span className="font-tech font-bold text-sm text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-400" /> Registro de Actividad del Enjambre (Live Terminal)
            </span>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Streaming en Tiempo Real
            </span>
          </div>

          <div className="bg-cyber-950 p-4 rounded-2xl border border-cyber-800/80 space-y-1.5 text-[11px] text-purple-300/90 max-h-56 overflow-y-auto font-mono">
            {logs.map((log, i) => (
              <div key={i} className="leading-relaxed hover:text-white transition-colors">
                {log}
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between items-center text-slate-500 text-[11px]">
            <span>Latencia Promedio: 14ms</span>
            <span>Uptime: 99.98%</span>
          </div>
        </div>

        {/* Right 5 Cols: Selected Agent Control Panel */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-2xl bg-cyber-950 border border-cyber-800">{activeAgent.avatar}</span>
            <div>
              <h3 className="font-tech font-bold text-base text-white">{activeAgent.name}</h3>
              <p className="text-xs text-slate-400">{activeAgent.role}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-cyber-950 rounded-xl border border-cyber-800 flex justify-between items-center">
              <span className="text-slate-400">Módulo Asignado:</span>
              <span className="text-purple-300 font-bold">{activeAgent.moduleTarget}</span>
            </div>
            <div className="p-3 bg-cyber-950 rounded-xl border border-cyber-800 flex justify-between items-center">
              <span className="text-slate-400">Rendimiento & Precisión:</span>
              <span className="text-emerald-400 font-bold">100% Sin Fallos</span>
            </div>
          </div>

          <button
            onClick={() => alert(`¡Agente ${activeAgent.name} disparó ciclo de auto-optimización inmediata sobre ${activeAgent.moduleTarget}!`)}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>Ejecutar Tarea Inmediata</span>
          </button>
        </div>
      </div>
    </div>
  );
};
