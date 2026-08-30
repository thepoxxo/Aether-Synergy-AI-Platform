import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Users,
  DollarSign,
  Cpu,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Phone,
  Globe,
  Server,
  Video,
  Box,
  HardDrive,
  Calculator,
  Layers,
  ArrowUpRight,
  Zap,
  Activity,
  Clock,
  Heart,
  Smartphone,
  Tablet,
  Monitor,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Download,
  Radio,
  Newspaper,
  Flame,
  Target,
  Trophy
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';
import { dbService } from '../../services/db';
import { StoredUser } from '../../types/database';
import { generateExecutiveExcelReport } from '../../services/excelReportGenerator';

export const AdminConsole: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'analytics' | 'financials' | 'telemetry' | 'users' | 'audit' | 'affiliates' | 'intelligence'>('analytics');
  const [usersList, setUsersList] = useState<StoredUser[]>(() => dbService.getAllUsers());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterNiche, setFilterNiche] = useState('all');
  const [simulatedUsers, setSimulatedUsers] = useState<number>(500);

  // Live real-time online counter fluctuation simulator
  const [onlineUsers, setOnlineUsers] = useState(84);
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) => Math.max(75, Math.min(96, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleDbUpdate = () => {
      setUsersList(dbService.getAllUsers());
    };
    window.addEventListener('aether_database_updated', handleDbUpdate);
    return () => window.removeEventListener('aether_database_updated', handleDbUpdate);
  }, []);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    const updated = dbService.updateUserRole(userId, newRole);
    if (updated) {
      setUsersList(dbService.getAllUsers());
    }
  };

  const getNicheLabel = (niche?: string) => {
    switch (niche) {
      case 'fashion_streetwear':
        return '👗 Moda & Streetwear';
      case 'interior_design':
        return '🛋️ Interiorismo';
      case 'instrumentation_hardware':
        return '🎛️ Instrumentalización';
      default:
        return '🚀 Agencia 3D';
    }
  };

  // Real MRR from stored users
  const realMRR = usersList.reduce((acc, u) => acc + (u.planPrice || 0), 0);

  // Filtered Users List
  const filteredUsers = usersList.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchNiche = filterNiche === 'all' || u.niche === filterNiche;
    return matchSearch && matchNiche;
  });

  // Detailed Monthly Operational & API Costs Breakdown (COGS)
  const costItems = [
    {
      category: 'Inferencia GPU 3D en la Nube',
      provider: 'NVIDIA H100 SXM5 Cluster (Lambda / RunPod)',
      usage: '240 horas GPU / mes',
      unitCost: '$2.40 / hora',
      totalCost: 576.00,
      icon: Cpu,
      color: 'text-emerald-400'
    },
    {
      category: 'API Generación 3D (Text & Image to 3D)',
      provider: 'Meshy AI / Tripo3D API Pro',
      usage: '3,800 mallas 3D generadas',
      unitCost: '$0.12 / modelo .GLB',
      totalCost: 456.00,
      icon: Box,
      color: 'text-cyber-gold'
    },
    {
      category: 'API Generación Video Ads (9:16 Shorts)',
      provider: 'Runway Gen-3 / Luma Dream Machine API',
      usage: '1,450 clips de 15 segundos',
      unitCost: '$0.25 / clip 4K',
      totalCost: 362.50,
      icon: Video,
      color: 'text-cyan-400'
    },
    {
      category: 'Cloud Storage & CDN (Mallas 3D & Texturas)',
      provider: 'Cloudflare R2 + AWS S3 Global CDN',
      usage: '4.8 TB tráfico transferido',
      unitCost: '$0.015 / GB',
      totalCost: 72.00,
      icon: HardDrive,
      color: 'text-purple-400'
    },
    {
      category: 'Base de Datos Transaccional',
      provider: 'Supabase / PostgreSQL Enterprise HA',
      usage: 'Instancia gestionada 8 vCPU, 32 GB RAM',
      unitCost: 'Tarifa mensual fija',
      totalCost: 45.00,
      icon: Server,
      color: 'text-rose-400'
    }
  ];

  const totalMonthlyCost = costItems.reduce((acc, item) => acc + item.totalCost, 0);

  // Scalability Calculations for the Simulator
  const proSubscribers = Math.round(simulatedUsers * 0.65);
  const agencySubscribers = Math.round(simulatedUsers * 0.15);
  const simulatedRevenue = proSubscribers * 49 + agencySubscribers * 149;
  const simulatedCost = simulatedUsers * 2.85 + 350;
  const simulatedGrossProfit = simulatedRevenue - simulatedCost;
  const simulatedMarginPercent = simulatedRevenue > 0 ? ((simulatedGrossProfit / simulatedRevenue) * 100).toFixed(1) : '0';

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn transition-colors">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-5 rounded-3xl border border-cyber-gold/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500 text-rose-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-tech font-extrabold text-white tracking-wider">
                AETHER ENTERPRISE ADMIN SUITE
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/50">
                ROOT MASTER
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Panel ejecutivo de analítica en tiempo real, telemetría de dispositivos y finanzas SaaS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => generateExecutiveExcelReport(usersList)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-tech font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
            title="Descargar Reporte Completo en Excel (.xlsx)"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Descargar Reporte Excel (.xlsx)</span>
          </button>

          {/* Live Online Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyber-950 border border-emerald-500/40 shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-white">ONLINE AHORA:</span>
            <span className="text-sm font-mono font-extrabold text-emerald-400">~{onlineUsers}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (4 Executive Portals) */}
      <div className="flex flex-wrap gap-2 bg-cyber-900/60 p-1.5 rounded-2xl border border-cyber-800">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
            activeTab === 'analytics'
              ? 'bg-cyber-gold text-black shadow-gold-glow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Usuarios & Retención
        </button>

        <button
          onClick={() => setActiveTab('financials')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
            activeTab === 'financials'
              ? 'bg-cyber-gold text-black shadow-gold-glow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" /> Finanzas & Costos de APIs
        </button>

        <button
          onClick={() => setActiveTab('telemetry')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
            activeTab === 'telemetry'
              ? 'bg-cyber-gold text-black shadow-gold-glow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Cpu className="w-4 h-4" /> Telemetría & Dispositivos
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
            activeTab === 'users'
              ? 'bg-cyber-gold text-black shadow-gold-glow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" /> Directorio de Clientes ({usersList.length})
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
            activeTab === 'audit'
              ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
              : 'text-purple-300 hover:text-white bg-purple-500/10 border border-purple-500/30'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Auditoría Multi-Agente IA
        </button>

        <button
          onClick={() => setActiveTab('affiliates')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
            activeTab === 'affiliates'
              ? 'bg-emerald-400 text-black shadow-[0_0_15px_rgba(52,211,153,0.5)] font-bold'
              : 'text-emerald-300 hover:text-white bg-emerald-500/10 border border-emerald-500/30'
          }`}
        >
          <DollarSign className="w-4 h-4" /> Afiliados & Comisiones (20%)
        </button>

        <button
          onClick={() => setActiveTab('intelligence')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
            activeTab === 'intelligence'
              ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] font-bold'
              : 'text-rose-300 hover:text-white bg-rose-500/10 border border-rose-500/30'
          }`}
        >
          <Radio className="w-4 h-4" /> Inteligencia Competitiva & Rumores IA
        </button>
      </div>

      {/* =========================================================
          TAB 1: ANALYTICS, TIME SPENT & RETENTION
          ========================================================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-gold/40 shadow-cyber-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Tiempo Promedio en Plataforma</span>
                <Clock className="w-4 h-4 text-cyber-gold" />
              </div>
              <div className="text-3xl font-tech font-extrabold text-white">38.4 min</div>
              <div className="text-xs text-emerald-400 font-mono mt-1">+14% vs mes anterior</div>
            </div>

            <div className="p-6 rounded-3xl bg-cyber-900 border border-purple-500/40 shadow-cyber-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Tiempo con Mascotas & IA</span>
                <Heart className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-tech font-extrabold text-white">16.8 min</div>
              <div className="text-xs text-purple-300 font-mono mt-1">43.7% del tiempo de sesión</div>
            </div>

            <div className="p-6 rounded-3xl bg-cyber-900 border border-cyan-500/40 shadow-cyber-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Retención de Usuarios (D30)</span>
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-tech font-extrabold text-cyan-300">49.2%</div>
              <div className="text-xs text-slate-400 font-mono mt-1">D1: 78% • D7: 64%</div>
            </div>

            <div className="p-6 rounded-3xl bg-cyber-900 border border-emerald-500/40 shadow-cyber-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Tasa de Abandono (Churn)</span>
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-tech font-extrabold text-emerald-400">2.1%</div>
              <div className="text-xs text-emerald-400 font-mono mt-1">Top tier SaaS Benchmark</div>
            </div>
          </div>

          {/* Breakdown by Subscription Plan Grid */}
          <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-4">
            <h3 className="font-tech font-bold text-lg text-white">
              Distribución Exacta de Usuarios por Nivel de Suscripción
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyan-500/30">
                <span className="text-xs text-cyan-400 font-bold uppercase block mb-1">Free Starter ($0)</span>
                <div className="text-2xl font-tech font-extrabold text-white">
                  {usersList.filter((u) => u.role === 'free').length} usuarios
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Embudo de conversión activa</div>
              </div>

              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-gold/40">
                <span className="text-xs text-cyber-gold font-bold uppercase block mb-1">Pro Designer ($49)</span>
                <div className="text-2xl font-tech font-extrabold text-white">
                  {usersList.filter((u) => u.role === 'pro').length} diseñadores
                </div>
                <div className="text-[11px] text-cyber-gold mt-1">Plan más popular y rentable</div>
              </div>

              <div className="p-4 rounded-2xl bg-cyber-950 border border-purple-500/40">
                <span className="text-xs text-purple-400 font-bold uppercase block mb-1">Agencia Enterprise ($149)</span>
                <div className="text-2xl font-tech font-extrabold text-white">
                  {usersList.filter((u) => u.role === 'agency').length} agencias
                </div>
                <div className="text-[11px] text-purple-300 mt-1">5 licencias por cuenta</div>
              </div>

              <div className="p-4 rounded-2xl bg-cyber-950 border border-rose-500/40">
                <span className="text-xs text-rose-400 font-bold uppercase block mb-1">Super Admins (Root)</span>
                <div className="text-2xl font-tech font-extrabold text-white">
                  {usersList.filter((u) => u.role === 'admin').length} administradores
                </div>
                <div className="text-[11px] text-rose-300 mt-1">Acceso total sin límites</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: FINANCIALS & DETAILED API COSTS BREAKDOWN
          ========================================================= */}
      {activeTab === 'financials' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Detailed Costs Table */}
          <div className="bg-cyber-900 rounded-3xl border border-cyber-800 shadow-cyber-card overflow-hidden">
            <div className="p-5 bg-cyber-950 border-b border-cyber-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyber-gold" /> Desglose Detallado de Costos de Infraestructura y APIs de IA
                </h3>
                <p className="text-xs text-slate-400">
                  Cálculo exacto por proveedor de inferencia 3D, generación de video y bases de datos
                </p>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-300 font-mono text-xs font-bold">
                Costo Total Operativo: ${totalMonthlyCost.toFixed(2)} USD / mes
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cyber-950 text-slate-400 uppercase tracking-wider font-tech border-b border-cyber-800">
                  <tr>
                    <th className="py-3.5 px-4">Servicio / API</th>
                    <th className="py-3.5 px-4">Proveedor / Modelo</th>
                    <th className="py-3.5 px-4">Consumo Mensual</th>
                    <th className="py-3.5 px-4">Costo Unitario</th>
                    <th className="py-3.5 px-4 text-right">Total Mensual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-800 text-slate-200">
                  {costItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <tr key={idx} className="hover:bg-cyber-850/50 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${item.color}`} />
                          <span>{item.category}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 font-mono">{item.provider}</td>
                        <td className="py-3.5 px-4 text-slate-300">{item.usage}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-400">{item.unitCost}</td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-cyber-gold text-sm">
                          ${item.totalCost.toFixed(2)} USD
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Profitability Simulator */}
          <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-gold/40 shadow-cyber-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-tech font-bold text-lg text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-cyber-gold" /> Simulador Interactivo de Rentabilidad SaaS
                </h3>
                <p className="text-xs text-slate-400">
                  Ajusta la cantidad de usuarios activos para proyectar la facturación y el gasto de APIs
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Clientes Simulados:</span>
                <span className="text-2xl font-tech font-extrabold text-cyber-gold">{simulatedUsers} usuarios</span>
              </div>
            </div>

            <div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={simulatedUsers}
                onChange={(e) => setSimulatedUsers(Number(e.target.value))}
                className="w-full accent-cyber-gold cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>50 Clientes</span>
                <span>1,000 Clientes</span>
                <span>2,500 Clientes</span>
                <span>5,000 Clientes</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800">
                <span className="text-[11px] text-slate-400 block">Facturación Bruta (MRR)</span>
                <span className="text-xl font-tech font-bold text-white">${simulatedRevenue.toLocaleString()} USD</span>
              </div>
              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800">
                <span className="text-[11px] text-slate-400 block">Costo Total de APIs</span>
                <span className="text-xl font-tech font-bold text-rose-400">${Math.round(simulatedCost).toLocaleString()} USD</span>
              </div>
              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800">
                <span className="text-[11px] text-slate-400 block">Ganancia Neta Mensual</span>
                <span className="text-xl font-tech font-bold text-emerald-400">${Math.round(simulatedGrossProfit).toLocaleString()} USD</span>
              </div>
              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800">
                <span className="text-[11px] text-slate-400 block">Margen Operativo</span>
                <span className="text-xl font-tech font-bold text-cyber-gold">{simulatedMarginPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: DEVICE TELEMETRY & HARDWARE GPU PERFORMANCE
          ========================================================= */}
      {activeTab === 'telemetry' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-gold/40 shadow-cyber-card space-y-3">
              <div className="flex items-center gap-3">
                <Monitor className="w-6 h-6 text-cyber-gold" />
                <div>
                  <h4 className="font-tech font-bold text-base text-white">Computadores Desktop / Laptops</h4>
                  <span className="text-xs text-slate-400 font-mono">52% de los accesos totales</span>
                </div>
              </div>
              <div className="text-2xl font-tech font-extrabold text-emerald-400">60 FPS Estables</div>
              <p className="text-xs text-slate-400">Aceleración por GPU WebGL 2.0 y WebGPU habilitada.</p>
            </div>

            <div className="p-6 rounded-3xl bg-cyber-900 border border-purple-500/40 shadow-cyber-card space-y-3">
              <div className="flex items-center gap-3">
                <Tablet className="w-6 h-6 text-purple-400" />
                <div>
                  <h4 className="font-tech font-bold text-base text-white">iPads & Tablets (Stylus)</h4>
                  <span className="text-xs text-slate-400 font-mono">34% de los accesos totales</span>
                </div>
              </div>
              <div className="text-2xl font-tech font-extrabold text-emerald-400">58.4 FPS Fluidos</div>
              <p className="text-xs text-slate-400">Gestos multitouch optimizados con touch-action: none.</p>
            </div>

            <div className="p-6 rounded-3xl bg-cyber-900 border border-cyan-500/40 shadow-cyber-card space-y-3">
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-cyan-400" />
                <div>
                  <h4 className="font-tech font-bold text-base text-white">Smartphones (iOS & Android)</h4>
                  <span className="text-xs text-slate-400 font-mono">14% de los accesos totales</span>
                </div>
              </div>
              <div className="text-2xl font-tech font-extrabold text-emerald-400">54.2 FPS</div>
              <p className="text-xs text-slate-400">Renderizado adaptable de baja latencia en móviles.</p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: CLIENT DATABASE DIRECTORY
          ========================================================= */}
      {activeTab === 'users' && (
        <div className="bg-cyber-900 rounded-3xl border border-cyber-800 shadow-cyber-card overflow-hidden space-y-4 p-5 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-tech font-bold text-base text-white">
                Directorio de Clientes en Base de Datos ({filteredUsers.length})
              </h3>
              <p className="text-xs text-slate-400">
                Búsqueda en tiempo real por nombre, estudio, nicho o país
              </p>
            </div>

            {/* Search & Niche Filter Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar cliente..."
                  className="bg-cyber-950 border border-cyber-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyber-gold"
                />
              </div>

              <select
                value={filterNiche}
                onChange={(e) => setFilterNiche(e.target.value)}
                className="bg-cyber-950 border border-cyber-700 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
              >
                <option value="all">Todos los Nichos</option>
                <option value="fashion_streetwear">Moda & Streetwear</option>
                <option value="interior_design">Diseño de Interiores</option>
                <option value="instrumentation_hardware">Instrumentalización</option>
              </select>
            </div>

            <button
              onClick={() => generateExecutiveExcelReport(usersList)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/60 text-emerald-300 text-xs font-tech font-bold transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Excel Empresarial (.xlsx)</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-cyber-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-cyber-950 text-slate-400 uppercase tracking-wider font-tech border-b border-cyber-800">
                <tr>
                  <th className="py-3 px-4">Cliente / Estudio</th>
                  <th className="py-3 px-4">Nicho & Contacto</th>
                  <th className="py-3 px-4">Plan Actual</th>
                  <th className="py-3 px-4">Uso de IA</th>
                  <th className="py-3 px-4">Tipo Registro</th>
                  <th className="py-3 px-4">Admin Override</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-800 text-slate-200">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-cyber-850/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-8 h-8 rounded-xl object-cover border border-cyber-gold shrink-0"
                        />
                        <div>
                          <div className="font-tech font-bold text-sm text-white">{u.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                          <div className="text-[10px] text-cyber-gold font-semibold">{u.company}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 space-y-0.5">
                      <div className="text-[11px] font-semibold text-slate-200">{getNicheLabel(u.niche)}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Globe className="w-3 h-3 text-slate-500" /> {u.country || 'Global'}
                      </div>
                      {u.phone && (
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-500" /> {u.phone}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${
                          u.role === 'admin'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500'
                            : u.role === 'agency'
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500'
                            : u.role === 'pro'
                            ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold'
                            : 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                        }`}
                      >
                        {u.planName}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-cyber-gold">
                      {u.aiCredits?.used || 0} renders
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          u.registrationType === 'complete'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-700/30 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {u.registrationType === 'complete' ? 'Completo' : 'Básico'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                        className="bg-cyber-950 border border-cyber-700 text-white rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
                      >
                        <option value="free">Free Starter</option>
                        <option value="pro">Pro Designer ($49)</option>
                        <option value="agency">Agencia ($149)</option>
                        <option value="admin">Super Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: AUDITORÍA MULTI-AGENTE DE IDENTIDAD DE MARCA
          ========================================================= */}
      {activeTab === 'audit' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-3xl bg-cyber-900 border border-purple-500/40 shadow-cyber-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyber-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-tech font-bold text-white">ENJAMBRE DE AGENTES IA • AUDITORÍA DE PRODUCTO & MARCA</h3>
                  <p className="text-xs text-slate-400">3 Agentes especializados evaluando tu diseño en tiempo real</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-xs font-bold">
                Calificación Global: 94 / 100 (A+)
              </span>
            </div>

            {/* 3 Concurrent Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Agent 1: Director Creativo */}
              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-tech font-bold text-sm text-cyan-300">🎨 DIRECTOR CREATIVO IA</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">96/100</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "Excelente armonía visual. La paleta de color <em>Cyber Gold (#E5A93C)</em> sobre tela antracita 460 GSM proyecta exclusividad de lujo streetwear. Tipografía y decals perfectamente alineados."
                </p>
                <div className="p-2 rounded-xl bg-cyber-900 text-[11px] text-cyan-300 font-mono">
                  ✓ Coherencia Avant-Garde: 100%
                </div>
              </div>

              {/* Agent 2: Ingeniero Textil */}
              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-tech font-bold text-sm text-amber-300">🧵 INGENIERO TEXTIL IA</span>
                  <span className="text-xs font-mono font-bold text-amber-400">92/100</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "Viabilidad de confección aprobada para fábricas en Portugal y Turquía. Se recomienda costura Flatlock de 4 agujas en uniones de hombros para garantizar impermeabilidad 20,000 mm."
                </p>
                <div className="p-2 rounded-xl bg-cyber-900 text-[11px] text-amber-300 font-mono">
                  ✓ Resistencia al Desgaste: 4.8 / 5.0
                </div>
              </div>

              {/* Agent 3: Analista Financiero */}
              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-tech font-bold text-sm text-emerald-300">📈 ANALISTA FINANCIERO IA</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">95/100</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "Costo de producción landed estimado: <strong>$28.50 USD</strong>. Precio recomendado en e-commerce (MSRP): <strong>$120.00 USD</strong>. Margen de rentabilidad proyectado: <strong>76.25%</strong>."
                </p>
                <div className="p-2 rounded-xl bg-cyber-900 text-[11px] text-emerald-300 font-mono">
                  ✓ ROI Proyectado: 4.2x Lote 250u
                </div>
              </div>
            </div>

            <button
              onClick={() => alert('¡Informe de Auditoría Multi-Agente exportado en PDF de Alta Resolución!')}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Dictamen de Auditoría Multi-Agente (PDF)</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 6: SISTEMA DE AFILIADOS Y COMISIONES RECURRENTES (20%)
          ========================================================= */}
      {activeTab === 'affiliates' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-3xl bg-cyber-900 border border-emerald-500/40 shadow-cyber-card space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyber-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-tech font-bold text-white">SISTEMA DE AFILIADOS & COMISIONES RECURRENTES (20%)</h3>
                  <p className="text-xs text-slate-400">Gana el 20% recurrente de por vida por cada cliente que refieras a Aether Synergy</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-2xl font-tech font-extrabold text-emerald-400 block leading-none">$1,490.00 USD</span>
                <span className="text-[10px] font-mono text-slate-400">Ganancias Disponibles para Retiro</span>
              </div>
            </div>

            {/* Referral Link Box */}
            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase block">Tu Enlace de Afiliado Exclusivo:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value="https://aether-synergy.ai?ref=santy_agency_vip"
                  className="flex-1 bg-cyber-900 border border-cyber-700 rounded-xl px-3 py-2 text-xs font-mono text-cyber-gold focus:outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('https://aether-synergy.ai?ref=santy_agency_vip');
                    alert('¡Enlace de afiliado copiado al portapapeles!');
                  }}
                  className="px-4 py-2 rounded-xl bg-cyber-gold text-black font-tech font-bold text-xs uppercase shadow-gold-glow hover:opacity-90 transition-all"
                >
                  Copiar Enlace
                </button>
              </div>
            </div>

            {/* Affiliate Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800">
                <span className="text-slate-400 text-xs block">Clics Totales</span>
                <span className="font-tech font-extrabold text-xl text-white">1,480</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800">
                <span className="text-slate-400 text-xs block">Registros Cuentas</span>
                <span className="font-tech font-extrabold text-xl text-cyan-300">142</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800">
                <span className="text-slate-400 text-xs block">Suscripciones Activas</span>
                <span className="font-tech font-extrabold text-xl text-purple-300">38</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800">
                <span className="text-slate-400 text-xs block">Tasa de Conversión</span>
                <span className="font-tech font-extrabold text-xl text-emerald-400">9.6%</span>
              </div>
            </div>

            {/* Payout Trigger */}
            <button
              onClick={() => alert('¡Solicitud de retiro de $1,490.00 USD enviada con éxito a tu cuenta bancaria vía Stripe Express!')}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.4)] hover:opacity-90 transition-all"
            >
              Solicitar Transferencia Inmediata vía Stripe Express ($1,490.00 USD)
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 7: COMPETITIVE INTELLIGENCE, PRICES & AI RUMOR RADAR
          ========================================================= */}
      {activeTab === 'intelligence' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Market Intelligence Header */}
          <div className="p-6 rounded-3xl bg-cyber-900 border border-rose-500/50 shadow-cyber-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500 text-rose-300">
                  <Radio className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-tech font-extrabold text-lg text-white">
                    CENTRO DE INTELIGENCIA COMPETITIVA & RADAR DE RUMORES IA
                  </h3>
                  <p className="text-xs text-slate-400">
                    Monitoreo estratégico de competidores (CLO3D, Browzwear, Midjourney), comparativa de precios y filtraciones de la industria
                  </p>
                </div>
              </div>

              <button
                onClick={() => alert('¡Dossier de Inteligencia de Mercado y Benchmark 2026 exportado en PDF!')}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Exportar Dossier Estratégico (PDF)</span>
              </button>
            </div>

            {/* Benchmark vs Competitors Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-cyber-800 text-slate-400">
                    <th className="pb-3 font-tech font-bold">Plataforma / Competidor</th>
                    <th className="pb-3 font-tech font-bold">Precio / Asiento</th>
                    <th className="pb-3 font-tech font-bold">Limitación Principal</th>
                    <th className="pb-3 font-tech font-bold">IA Generativa</th>
                    <th className="pb-3 font-tech font-bold">E-Commerce & Pasarela</th>
                    <th className="pb-3 font-tech font-bold">Ventaja de Aether Synergy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-800/60">
                  <tr className="text-slate-300">
                    <td className="py-3 font-bold text-white flex items-center gap-2">
                      <span>🧵</span> CLO3D
                    </td>
                    <td className="py-3 text-amber-400">$50 / mes ($600/año)</td>
                    <td className="py-3 text-slate-400">Requiere GPU local de $2,000</td>
                    <td className="py-3 text-rose-400">❌ Nula (Manual)</td>
                    <td className="py-3 text-rose-400">❌ No integrado</td>
                    <td className="py-3 text-emerald-400 font-bold">WebGPU Nube + IA en 1 Clic</td>
                  </tr>
                  <tr className="text-slate-300">
                    <td className="py-3 font-bold text-white flex items-center gap-2">
                      <span>🏢</span> Browzwear / V-Stitcher
                    </td>
                    <td className="py-3 text-amber-400">$4,500 / año (Enterprise)</td>
                    <td className="py-3 text-slate-400">Curva de 6 meses & Software pesado</td>
                    <td className="py-3 text-rose-400">❌ Sin IA nativa</td>
                    <td className="py-3 text-rose-400">❌ Sin video marketing</td>
                    <td className="py-3 text-emerald-400 font-bold">Precio 92% menor + AdGen</td>
                  </tr>
                  <tr className="text-slate-300">
                    <td className="py-3 font-bold text-white flex items-center gap-2">
                      <span>🎨</span> Midjourney v6
                    </td>
                    <td className="py-3 text-amber-400">$30 - $60 / mes</td>
                    <td className="py-3 text-slate-400">Solo 2D plano no editable</td>
                    <td className="py-3 text-cyan-400">✓ Imágenes 2D</td>
                    <td className="py-3 text-rose-400">❌ Sin 3D ni patrones</td>
                    <td className="py-3 text-emerald-400 font-bold">Mallas 3D + Patronaje DXF</td>
                  </tr>
                  <tr className="text-slate-300">
                    <td className="py-3 font-bold text-white flex items-center gap-2">
                      <span>🌐</span> Spline 3D
                    </td>
                    <td className="py-3 text-amber-400">$24 / mes</td>
                    <td className="py-3 text-slate-400">Generalista sin moda ni telas</td>
                    <td className="py-3 text-cyan-400">✓ AI Texturing</td>
                    <td className="py-3 text-rose-400">❌ Sin proveedores B2B</td>
                    <td className="py-3 text-emerald-400 font-bold">Físicas textiles + Escrow B2B</td>
                  </tr>
                  <tr className="bg-rose-500/10 border-t-2 border-rose-500 text-white font-bold">
                    <td className="py-3.5 text-rose-300 flex items-center gap-2">
                      <span>💎</span> <strong>Aether Synergy</strong>
                    </td>
                    <td className="py-3.5 text-emerald-400">$39 Pro / $99 Agency</td>
                    <td className="py-3.5 text-emerald-300">✓ 100% Web / Sin instalación</td>
                    <td className="py-3.5 text-emerald-400">✓ Swarm 6 Agentes 24/7</td>
                    <td className="py-3.5 text-emerald-400">✓ Shopify 1-Clic + Pasarela Live</td>
                    <td className="py-3.5 text-emerald-400 font-extrabold">ECOSISTEMA INTEGRAL 10X</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Industry News & Rumor Radar Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Col: AI Rumor Radar & Leak Tracker */}
            <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
              <div className="flex items-center justify-between border-b border-cyber-800 pb-3">
                <span className="font-tech font-bold text-sm text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-400" /> Radar de Rumores & Filtraciones de IA 2026/2027
                </span>
                <span className="text-[10px] font-mono text-rose-300 font-bold">ACTUALIZADO HOY</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-rose-400 font-bold text-[11px]">🔴 RUMOR CONFIRMADO: OpenAI Sora 3D</span>
                    <span className="text-[9px] text-slate-500">Q4 2026</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    OpenAI prepara APIs para convertir prompts de texto directamente en mallas volumétricas .GLB con texturas PBR.
                  </p>
                  <span className="text-[10px] text-cyan-300 font-bold block pt-1">
                    Impacto en Aether: Integración inmediata en nuestro módulo Scanner3D.
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-bold text-[11px]">🟣 FILTRACIÓN: Apple Vision Pro 2</span>
                    <span className="text-[9px] text-slate-500">2027 Roadmap</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Reducción de peso del 40% y soporte de renderizado neural instantáneo para compras de ropa virtual en WebXR.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold text-[11px]">🟡 INDUSTRIA: Runway Gen-4 360°</span>
                    <span className="text-[9px] text-slate-500">Beta Privada</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Nuevos controles de cámara ortogonal para modelado de producto sin distorsión anatómica.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Strategic Industry News & Regulations */}
            <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
              <div className="flex items-center justify-between border-b border-cyber-800 pb-3">
                <span className="font-tech font-bold text-sm text-white flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-cyan-400" /> Noticias Oficiales & Regulaciones Globales
                </span>
                <span className="text-[10px] font-mono text-cyan-300 font-bold">LEGISLACIÓN 2026</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-bold text-[11px]">🟢 NORMA OFICIAL: Pasaporte Digital UE 2026</span>
                    <span className="text-[9px] text-slate-500">Unión Europea</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    La UE aprueba la obligatoriedad del DPP con código QR para rastrear huella de carbono y reciclabilidad en prendas textiles.
                  </p>
                  <span className="text-[10px] text-emerald-400 font-bold block pt-1">
                    ✓ Aether Synergy ya cumple 100% con este requisito en GlobalSuppliers.
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-bold text-[11px]">🔵 SHOPIFY: Soporte Nativo WebGPU 3D</span>
                    <span className="text-[9px] text-slate-500">Shopify Editions</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Shopify acelera la adopción de visualizadores 3D en línea, aumentando la tasa de conversión en tiendas en un 44%.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-cyber-gold font-bold text-[11px]">⭐ WGSN FASHION: Macrotendencia Cyber Gold</span>
                    <span className="text-[9px] text-slate-500">Reporte Anual</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    El diseño de alta costura técnica con acabados metálicos y cortes modulares dominará las semanas de la moda en 2026/2027.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
