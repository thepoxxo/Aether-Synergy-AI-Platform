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
  Download
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';
import { dbService } from '../../services/db';
import { StoredUser } from '../../types/database';
import { generateExecutiveExcelReport } from '../../services/excelReportGenerator';

export const AdminConsole: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'analytics' | 'financials' | 'telemetry' | 'users'>('analytics');
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
    </div>
  );
};
