import React, { useState } from 'react';
import {
  ShieldAlert, Activity, DollarSign, Cpu, Users, Server, CloudLightning,
  TrendingUp, HardDrive, BarChart3, Database, Globe2, AlertTriangle, Zap
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

const mrrData = [
  { mes: 'Ene', MRR: 4500, Gastos: 1200 },
  { mes: 'Feb', MRR: 6200, Gastos: 1500 },
  { mes: 'Mar', MRR: 8500, Gastos: 2100 },
  { mes: 'Abr', MRR: 11200, Gastos: 2800 },
  { mes: 'May', MRR: 15800, Gastos: 3200 },
  { mes: 'Jun', MRR: 24500, Gastos: 4100 },
];

const apiSpendData = [
  { name: 'Seedance 2.5', cost: 1450 },
  { name: 'GPT-6 Astra', cost: 850 },
  { name: 'Claude 5.5', cost: 620 },
  { name: 'N8N Nodes', cost: 310 },
  { name: 'Stripe Fee', cost: 740 },
];

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f43f5e', '#f59e0b'];

export const AdminConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'servers' | 'financials' | 'security'>('overview');

  return (
    <div className="h-full flex flex-col bg-cyber-950 text-slate-200 overflow-y-auto custom-scrollbar">
      
      {/* HEADER */}
      <div className="shrink-0 p-6 sm:p-8 bg-gradient-to-b from-rose-950/40 to-transparent border-b border-rose-900/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-rose-500/20 text-rose-400 text-[10px] font-mono font-bold uppercase tracking-wider rounded border border-rose-500/30">
                ACCESO CLASIFICADO: NIVEL 5
              </span>
            </div>
            <h1 className="text-3xl font-tech font-bold text-white flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-rose-400" />
              POXXI COMMAND CENTER
            </h1>
            <p className="text-slate-400 text-sm max-w-xl mt-2">
              Telemetría global, analítica visual de ingresos (MRR), carga de GPUs y auditoría de seguridad del ecosistema.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-cyber-900 p-3 rounded-xl border border-emerald-500/30 text-right">
              <p className="text-[9px] text-emerald-400 font-mono mb-1">SISTEMA CORE</p>
              <p className="text-lg font-tech font-bold text-emerald-400 flex items-center gap-2">
                <Activity className="w-4 h-4" /> 100% ONLINE
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="border-b border-cyber-800 bg-cyber-950 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto custom-scrollbar">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'overview' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50' : 'text-slate-500 hover:text-slate-300'}`}><BarChart3 className="w-4 h-4"/> Overview Visual</button>
          <button onClick={() => setActiveTab('financials')} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'financials' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'text-slate-500 hover:text-slate-300'}`}><DollarSign className="w-4 h-4"/> Flujos Stripe & MRR</button>
          <button onClick={() => setActiveTab('servers')} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'servers' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'text-slate-500 hover:text-slate-300'}`}><Server className="w-4 h-4"/> Gráficos WebGPU & APIs</button>
        </div>
      </div>

      {/* DASHBOARD CONTENT */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* TOP METRICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-cyber-900 border border-cyber-800 p-4 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10"><DollarSign className="w-16 h-16"/></div>
            <p className="text-[10px] text-slate-400 font-mono">RECURRENTE MENSUAL (MRR)</p>
            <p className="text-2xl font-tech font-bold text-white mt-1">$24,500</p>
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2"><TrendingUp className="w-3 h-3"/> +34.2% vs mes anterior</p>
          </div>
          <div className="bg-cyber-900 border border-cyber-800 p-4 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10"><Users className="w-16 h-16"/></div>
            <p className="text-[10px] text-slate-400 font-mono">USUARIOS ACTIVOS (MAU)</p>
            <p className="text-2xl font-tech font-bold text-white mt-1">12,482</p>
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2"><TrendingUp className="w-3 h-3"/> +1,240 esta semana</p>
          </div>
          <div className="bg-cyber-900 border border-cyber-800 p-4 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10"><CloudLightning className="w-16 h-16"/></div>
            <p className="text-[10px] text-slate-400 font-mono">VIDEOS SEEDANCE GENERADOS</p>
            <p className="text-2xl font-tech font-bold text-white mt-1">84,201</p>
            <p className="text-xs text-rose-400 flex items-center gap-1 mt-2"><Zap className="w-3 h-3"/> 94% Cuota API consumida</p>
          </div>
          <div className="bg-cyber-900 border border-cyber-800 p-4 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10"><Database className="w-16 h-16"/></div>
            <p className="text-[10px] text-slate-400 font-mono">CARGA DE DB VECTORIAL</p>
            <p className="text-2xl font-tech font-bold text-white mt-1">42.5 GB</p>
            <p className="text-xs text-cyan-400 flex items-center gap-1 mt-2"><Activity className="w-3 h-3"/> 14ms Latencia</p>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* MRR AREA CHART */}
            <div className="lg:col-span-2 bg-cyber-900 border border-cyber-800 p-5 rounded-3xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-tech font-bold text-lg text-white">Crecimiento de Ingresos (MRR vs Gastos)</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Evolución de los últimos 6 meses</p>
                </div>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mrrData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorMRR" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis dataKey="mes" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" fontSize={10} tickFormatter={(val) => `$${val/1000}k`} tickLine={false} axisLine={false} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px', fontSize: '12px' }}
                      itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="MRR" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorMRR)" />
                    <Area type="monotone" dataKey="Gastos" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorGastos)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* API COSTS PIE CHART */}
            <div className="bg-cyber-900 border border-cyber-800 p-5 rounded-3xl flex flex-col">
              <h3 className="font-tech font-bold text-lg text-white mb-1">Distribución Costos API</h3>
              <p className="text-[10px] text-slate-400 font-mono mb-4">Gasto mensual por Inteligencia Artificial</p>
              <div className="flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={apiSpendData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="cost"
                    >
                      {apiSpendData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value) => `$${value}`}
                      contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px', fontSize: '11px' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {apiSpendData.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] font-mono">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                      {item.name}
                    </span>
                    <span className="font-bold text-white">${item.cost}</span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        )}

        {/* FACTORY FULFILLMENT & N8N NODES (Visual list) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-cyber-900 border border-cyber-800 p-5 rounded-3xl">
            <h3 className="font-tech font-bold text-lg text-white mb-4 flex items-center gap-2"><Globe2 className="w-5 h-5 text-blue-400"/> Status de Fábricas (Global)</h3>
            <div className="space-y-3">
              <div className="p-3 bg-cyber-950 rounded-xl border border-cyber-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div>
                    <p className="font-bold text-sm text-white">Cluster Textil Portugal</p>
                    <p className="text-[10px] text-slate-400">14 pedidos en confección</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">OPERACIONAL</span>
              </div>
              <div className="p-3 bg-cyber-950 rounded-xl border border-cyber-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div>
                    <p className="font-bold text-sm text-white">Medellín Moda Hub</p>
                    <p className="text-[10px] text-slate-400">8 pedidos procesados</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">OPERACIONAL</span>
              </div>
              <div className="p-3 bg-cyber-950 rounded-xl border border-rose-500/20 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <div>
                    <p className="font-bold text-sm text-white">Shenzhen Apparel</p>
                    <p className="text-[10px] text-slate-400">Retraso logístico detectado</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-rose-500/20 text-rose-400 text-[10px] font-bold rounded">ALERTA</span>
              </div>
            </div>
          </div>

          <div className="bg-cyber-900 border border-cyber-800 p-5 rounded-3xl">
            <h3 className="font-tech font-bold text-lg text-white mb-4 flex items-center gap-2"><Cpu className="w-5 h-5 text-purple-400"/> N8N Workflow Nodes</h3>
            <div className="space-y-3">
              <div className="p-3 bg-cyber-950 rounded-xl border border-cyber-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm text-white">Auto-Publish TikTok Bot</p>
                  <p className="text-[10px] text-slate-400 font-mono">1,204 ejecuciones hoy</p>
                </div>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">ACTIVO</span>
              </div>
              <div className="p-3 bg-cyber-950 rounded-xl border border-cyber-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm text-white">Shopify Price FOMO AI</p>
                  <p className="text-[10px] text-slate-400 font-mono">34 ajustes de precio dinámicos</p>
                </div>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">ACTIVO</span>
              </div>
              <div className="p-3 bg-cyber-950 rounded-xl border border-cyber-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm text-white">Instagram DM Closer AI</p>
                  <p className="text-[10px] text-slate-400 font-mono">420 mensajes respondidos</p>
                </div>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">ACTIVO</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
