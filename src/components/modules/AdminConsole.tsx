import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Sliders,
  Layers3,
  Camera,
  Scissors,
  Palette,
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
  Trophy,
  Trash2,
  CreditCard,
  Receipt,
  AlertTriangle,
  RotateCw,
  X,
  FileText,
  Mail,
  Film,
  Globe2,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';
import { dbService } from '../../services/db';
import { StoredUser, BillingInvoice } from '../../types/database';
import { generateExecutiveExcelReport } from '../../services/excelReportGenerator';
import { billingService, AutoBillingResult } from '../../services/billingService';

export const AdminConsole: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'analytics' | 'financials' | 'module_costs' | 'telemetry' | 'users' | 'audit' | 'affiliates' | 'intelligence'>('analytics');
  const [usersList, setUsersList] = useState<StoredUser[]>(() => dbService.getAllUsers());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterNiche, setFilterNiche] = useState('all');
  const [simulatedUsers, setSimulatedUsers] = useState<number>(500);

  // Module Cost Breakdown Timeframe and Search
  const [costTimeframe, setCostTimeframe] = useState<'today' | 'week' | 'month' | 'year'>('month');
  const [isProcurementModalOpen, setIsProcurementModalOpen] = useState(false);
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [moduleCostSearch, setModuleCostSearch] = useState('');
  const [costAlertThreshold, setCostAlertThreshold] = useState<number>(800);

  // User Deletion & Billing Action States
  const [userToDelete, setUserToDelete] = useState<StoredUser | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [autoBillingSummary, setAutoBillingSummary] = useState<AutoBillingResult | null>(null);
  const [showInvoicesModal, setShowInvoicesModal] = useState<boolean>(false);
  const [invoicesList, setInvoicesList] = useState<BillingInvoice[]>(() => billingService.getInvoices());

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
      showToast('Rol de usuario actualizado con éxito.', 'success');
    }
  };

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const confirmDeleteUser = () => {
    if (!userToDelete) return;
    const res = billingService.deleteUser(userToDelete.id);
    if (res.success) {
      setUsersList(dbService.getAllUsers());
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
    setUserToDelete(null);
  };

  const handleChargeUser = (userId: string) => {
    const res = billingService.chargeUser(userId);
    if (res.success) {
      setUsersList(dbService.getAllUsers());
      setInvoicesList(billingService.getInvoices());
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleRunAutoBillingSweep = () => {
    const res = billingService.runAutoBillingSweep();
    setUsersList(dbService.getAllUsers());
    setInvoicesList(billingService.getInvoices());
    setAutoBillingSummary(res);
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
      category: 'API Generación Video Ads & Turntables 4K',
      provider: 'Runway Gen-3 / Luma Dream Machine API',
      usage: '1,450 clips de 15 segundos',
      unitCost: '$0.25 / clip 4K',
      totalCost: 362.50,
      icon: Video,
      color: 'text-cyan-400'
    },
    {
      category: 'Cloud Baking Unreal Engine 5 Nanite & USD',
      provider: 'AWS EC2 G5 GPU Cluster',
      usage: '95 compilaciones cinemáticas',
      unitCost: '$1.50 / bake 8K',
      totalCost: 142.50,
      icon: Layers,
      color: 'text-indigo-400'
    },
    {
      category: 'Orquestador Swarm 6 Agentes IA 24/7',
      provider: 'OpenAI GPT-4o / Gemini 1.5 Pro Interconnect',
      usage: '1.2M tokens / mes',
      unitCost: '$0.10 / 1K tokens',
      totalCost: 120.00,
      icon: Sparkles,
      color: 'text-purple-400'
    },
    {
      category: 'Cloud Storage & CDN (Mallas 3D & Texturas 8K)',
      provider: 'Cloudflare R2 + AWS S3 Global CDN',
      usage: '4.8 TB tráfico transferido',
      unitCost: '$0.015 / GB',
      totalCost: 72.00,
      icon: HardDrive,
      color: 'text-blue-400'
    },
    {
      category: 'Locuciones IA Multilingües & Voiceover',
      provider: 'ElevenLabs Enterprise Voice API',
      usage: '850 locuciones publicitarias',
      unitCost: '$0.08 / locución',
      totalCost: 68.00,
      icon: Activity,
      color: 'text-amber-400'
    },
    {
      category: 'Base de Datos Transaccional & Webhooks',
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


  interface ModuleCostMetric {
    id: string;
    name: string;
    category: string;
    icon: any;
    color: string;
    borderColor: string;
    bgColor: string;
    monthlyCostUSD: number;
    monthlyGenerations: number;
    unitCostUSD: number;
    primaryAPIs: string[];
    hardwareUsage: string;
    profitContributionMargin: number;
    trend: string;
    trendType: 'up' | 'down' | 'neutral';
    status: 'optimal' | 'warning' | 'high_volume';
    desc: string;
  }

  const moduleCostsList: ModuleCostMetric[] = [
    {
      id: 'aurora_3d',
      name: 'Aurora 3D Studio & Modelado Paramétrico',
      category: 'Moda, Calzado, Muebles & Platos',
      icon: Box,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      bgColor: 'bg-amber-500/10',
      monthlyCostUSD: 648.50,
      monthlyGenerations: 5404,
      unitCostUSD: 0.12,
      primaryAPIs: ['Tripo3D Fast GLB', 'Meshy Quad Retopo', 'Substance 3D PBR', 'Unreal Engine 5 Cloud'],
      hardwareUsage: '142.5 Horas GPU H100 (WebGPU Clusters)',
      profitContributionMargin: 88.4,
      trend: '+12.4%',
      trendType: 'up',
      status: 'high_volume',
      desc: 'Generación de mallas 3D .glb, suelas de calzado, costuras y renderizado WebGPU en tiempo real.'
    },
    {
      id: 'product_photo_studio',
      name: 'Foto Estudio IA & Viral Blast (Facebook & Redes)',
      category: 'E-Commerce & Publicidad Viral',
      icon: Camera,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      bgColor: 'bg-cyan-500/10',
      monthlyCostUSD: 315.00,
      monthlyGenerations: 9000,
      unitCostUSD: 0.035,
      primaryAPIs: ['Fal.ai FLUX.1 Pro', 'Alpha Matte Inpainting', 'Meta Graph API v20.0'],
      hardwareUsage: '68.2 Horas GPU A100 TensorRT',
      profitContributionMargin: 92.1,
      trend: '+24.8%',
      trendType: 'up',
      status: 'optimal',
      desc: 'Extracción de producto con cámara, 7 escenarios de estudio 4K y difusión en cientos de grupos de Facebook.'
    },
    {
      id: 'video_commercials',
      name: 'Generador de Video Ads 4K & Spots Cinemáticos',
      category: 'Pasarelas & Spots Publicitarios',
      icon: Video,
      color: 'text-rose-400',
      borderColor: 'border-rose-500/40',
      bgColor: 'bg-rose-500/10',
      monthlyCostUSD: 412.00,
      monthlyGenerations: 1648,
      unitCostUSD: 0.25,
      primaryAPIs: ['Runway Gen-3 Alpha', 'Luma Dream Machine', 'Kling AI 4K', 'Cloud ffmpeg'],
      hardwareUsage: '95.0 Horas H100 NVENC Render Farm',
      profitContributionMargin: 81.6,
      trend: '+8.2%',
      trendType: 'up',
      status: 'optimal',
      desc: 'Producción de comerciales de 15s-30s para TikTok Ads, Reels y anuncios de comida con efectos de vapor.'
    },
    {
      id: 'suno_audio_studio',
      name: 'Suno AI Music Studio & Locuciones ElevenLabs',
      category: 'Bandas Sonoras & Audio Ads',
      icon: Radio,
      color: 'text-pink-400',
      borderColor: 'border-pink-500/40',
      bgColor: 'bg-pink-500/10',
      monthlyCostUSD: 186.00,
      monthlyGenerations: 2100,
      unitCostUSD: 0.088,
      primaryAPIs: ['Suno AI v3.5 / v4 API', 'ElevenLabs Multilingual Voice Clone'],
      hardwareUsage: '4.2M Tokens Audio Synthesis',
      profitContributionMargin: 89.5,
      trend: '+5.4%',
      trendType: 'up',
      status: 'optimal',
      desc: 'Música Phonk, Lo-Fi y comercial con bajos 808 libre de derechos más voiceover ultra-realista.'
    },
    {
      id: 'jarvis_core_agents',
      name: 'Núcleo Holográfico J.A.R.V.I.S. & Swarm 6 Agentes',
      category: 'Inteligencia & Orquestación Autónoma',
      icon: Sparkles,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/40',
      bgColor: 'bg-purple-500/10',
      monthlyCostUSD: 185.20,
      monthlyGenerations: 23150,
      unitCostUSD: 0.008,
      primaryAPIs: ['Google Gemini 1.5 Pro / Flash', 'OpenAI GPT-4o', 'Pinecone Vector DB'],
      hardwareUsage: '62.8M LLM Context Tokens',
      profitContributionMargin: 94.2,
      trend: '+18.1%',
      trendType: 'up',
      status: 'optimal',
      desc: 'Toma de decisiones autónomas, auditoría de precios, predicción de tendencias de moda y copys AIDA.'
    },
    {
      id: 'techpack_studio',
      name: 'TechPack Studio (Patronaje 2D DXF & Fichas B2B)',
      category: 'Confección & Fábrica Textil',
      icon: Scissors,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      bgColor: 'bg-emerald-500/10',
      monthlyCostUSD: 62.40,
      monthlyGenerations: 4160,
      unitCostUSD: 0.015,
      primaryAPIs: ['CLO3D Cloud DXF Parser', 'Bézier Vector CAD Engine', 'PDF Generation Engine'],
      hardwareUsage: '24.5 Horas CPU Compute Instance',
      profitContributionMargin: 96.8,
      trend: '-2.1%',
      trendType: 'down',
      status: 'optimal',
      desc: 'Gradación de tallas (XS a XXL), consumos de tela por metro cuadrado y fichas técnicas listas para corte.'
    },
    {
      id: 'brandkit_logo_studio',
      name: 'BrandKit Studio & Logos Vectoriales SVG',
      category: 'Identidad de Marca & Packaging',
      icon: Palette,
      color: 'text-yellow-400',
      borderColor: 'border-yellow-500/40',
      bgColor: 'bg-yellow-500/10',
      monthlyCostUSD: 94.00,
      monthlyGenerations: 2350,
      unitCostUSD: 0.040,
      primaryAPIs: ['Recraft.ai Vector SVG', 'Midjourney High Fashion Proxy'],
      hardwareUsage: '18.2 Horas GPU T4 Worker',
      profitContributionMargin: 93.5,
      trend: '+3.5%',
      trendType: 'up',
      status: 'optimal',
      desc: 'Logotipos vectoriales limpios, patrones textiles repetibles y guías de paletas cromáticas pantone.'
    },
    {
      id: 'fashion_virtual_runway',
      name: 'Pasarela de Moda Virtual & Modelos Holográficos',
      category: 'Alta Costura & Lookbooks 8K',
      icon: Layers,
      color: 'text-indigo-400',
      borderColor: 'border-indigo-500/40',
      bgColor: 'bg-indigo-500/10',
      monthlyCostUSD: 148.00,
      monthlyGenerations: 2960,
      unitCostUSD: 0.050,
      primaryAPIs: ['FLUX.1 Fashion LoRA', 'Virtual Draping Cloth Simulator'],
      hardwareUsage: '32.4 Horas GPU A100',
      profitContributionMargin: 90.2,
      trend: '+11.0%',
      trendType: 'up',
      status: 'optimal',
      desc: 'Modelos virtuales multiétnicos posando con colecciones de ropa en escenarios de pasarela internacional.'
    },
    {
      id: 'n8n_automations',
      name: 'Automatizaciones n8n & Flujos Visuales por Nodos',
      category: 'Integraciones & Webhooks',
      icon: Zap,
      color: 'text-orange-400',
      borderColor: 'border-orange-500/40',
      bgColor: 'bg-orange-500/10',
      monthlyCostUSD: 42.10,
      monthlyGenerations: 42100,
      unitCostUSD: 0.001,
      primaryAPIs: ['n8n Self-Hosted Node Runner', 'Webhook Receiver Cluster', 'Shopify Storefront Webhooks'],
      hardwareUsage: '8 GB RAM Micro-Services Cluster',
      profitContributionMargin: 98.2,
      trend: '+31.2%',
      trendType: 'up',
      status: 'optimal',
      desc: 'Disparo de eventos automáticos desde Shopify, Discord, TikTok Ads y pipelines de datos sin código.'
    },
    {
      id: 'tiktok_poxxi_3d',
      name: 'Poxxi 3D • Shorts & Pasarelas Verticales 9:16',
      category: 'Marketing & Comunidad Viral',
      icon: Film,
      color: 'text-rose-400',
      borderColor: 'border-rose-500/40',
      bgColor: 'bg-rose-500/10',
      monthlyCostUSD: 135.00,
      monthlyGenerations: 6750,
      unitCostUSD: 0.020,
      primaryAPIs: ['WebGPU Video Canvas', 'Suno AI Soundtrack Sync', 'Cloudflare Stream CDN'],
      hardwareUsage: '45.0 Horas Video Transcoding & HLS Streaming',
      profitContributionMargin: 91.5,
      trend: '+45.2%',
      trendType: 'up',
      status: 'optimal',
      desc: 'Feed vertical 9:16 para pasarelas de moda, calzado 360°, doble tap de corazón y remix 3D en vivo.'
    },
    {
      id: 'global_suppliers_b2b',
      name: 'Directorio Global de Proveedores & TechPacks B2B',
      category: 'E-Commerce & Fábrica B2B',
      icon: Globe2,
      color: 'text-teal-400',
      borderColor: 'border-teal-500/40',
      bgColor: 'bg-teal-500/10',
      monthlyCostUSD: 48.00,
      monthlyGenerations: 3200,
      unitCostUSD: 0.015,
      primaryAPIs: ['WhatsApp Business API', 'PDFKit Spec Generator', 'Currency Converter Live'],
      hardwareUsage: '12.0 Horas Serverless Execution',
      profitContributionMargin: 97.0,
      trend: '+15.4%',
      trendType: 'up',
      status: 'optimal',
      desc: 'Sourcing internacional de fábricas de cualquier país, cotizaciones de volumen y reseñas comunitarias en 4 dimensiones.'
    },
    {
      id: 'automo_calendar_marketing',
      name: 'Automo • Calendario Multicanal & Piloto Automático',
      category: 'Marketing & Video Ads',
      icon: Calendar,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/40',
      bgColor: 'bg-purple-500/10',
      monthlyCostUSD: 54.00,
      monthlyGenerations: 4500,
      unitCostUSD: 0.012,
      primaryAPIs: ['Meta Graph API v20.0', 'TikTok Open API', 'YouTube Data API v3', 'LinkedIn Marketing API'],
      hardwareUsage: 'CRON Scheduler & Token Refresh Workers',
      profitContributionMargin: 96.5,
      trend: '+28.0%',
      trendType: 'up',
      status: 'optimal',
      desc: 'Programación automática de publicaciones multicanal en Instagram, TikTok, Facebook, YouTube y LinkedIn con Copywriting IA.'
    },
    {
      id: 'base_infrastructure',
      name: 'Infraestructura Cloud, Base de Datos & Storage R2',
      category: 'Hosting, CDN & Auth',
      icon: Server,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/40',
      bgColor: 'bg-blue-500/10',
      monthlyCostUSD: 117.00,
      monthlyGenerations: 1,
      unitCostUSD: 117.00,
      primaryAPIs: ['Cloudflare R2 (4.8 TB)', 'Supabase PostgreSQL HA', 'Twilio SMS OTP Verify', 'Stripe Connect'],
      hardwareUsage: 'Multi-Region High Availability Storage',
      profitContributionMargin: 95.0,
      trend: '+1.5%',
      trendType: 'up',
      status: 'optimal',
      desc: 'Almacenamiento de archivos 3D pesados, autenticación con OTP, sincronización multi-dispositivo y base de datos.'
    }
  ];

  const getTimeframeMultiplier = (tf: 'today' | 'week' | 'month' | 'year') => {
    switch (tf) {
      case 'today': return 0.033;
      case 'week': return 0.23;
      case 'month': return 1.0;
      case 'year': return 12.0;
    }
  };

  const currentMultiplier = getTimeframeMultiplier(costTimeframe);
  const totalCalculatedModuleCost = moduleCostsList.reduce((acc, m) => acc + (m.monthlyCostUSD * currentMultiplier), 0);
  const totalGenerationsTimeframe = moduleCostsList.reduce((acc, m) => acc + Math.round(m.monthlyGenerations * currentMultiplier), 0);
  const avgProfitMarginGlobal = (moduleCostsList.reduce((acc, m) => acc + m.profitContributionMargin, 0) / moduleCostsList.length).toFixed(1);

  const filteredModuleCosts = moduleCostsList.filter((m) =>
    m.name.toLowerCase().includes(moduleCostSearch.toLowerCase()) ||
    m.category.toLowerCase().includes(moduleCostSearch.toLowerCase()) ||
    m.primaryAPIs.some((api) => api.toLowerCase().includes(moduleCostSearch.toLowerCase()))
  );

  const handleExportModuleCostsCSV = () => {
    const headers = ['Modulo', 'Categoria', 'Costo USD (' + costTimeframe + ')', 'Generaciones', 'Costo Unitario USD', 'Margen %', 'APIs Principales', 'Hardware GPU'];
    const rows = moduleCostsList.map((m) => [
      '"' + m.name + '"',
      '"' + m.category + '"',
      (m.monthlyCostUSD * currentMultiplier).toFixed(2),
      Math.round(m.monthlyGenerations * currentMultiplier),
      m.unitCostUSD.toFixed(4),
      m.profitContributionMargin + '%',
      '"' + m.primaryAPIs.join(', ') + '"',
      '"' + m.hardwareUsage + '"'
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Aether_Module_Costs_Report_' + costTimeframe + '_' + new Date().toISOString().split('T')[0] + '.csv';
    link.click();
  };

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
          onClick={() => setActiveTab('module_costs')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
            activeTab === 'module_costs'
              ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black shadow-gold-glow font-extrabold'
              : 'text-amber-300 hover:text-white bg-amber-500/10 border border-amber-500/30'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" /> Costos por Módulo & Consumo IA
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

          {/* Statistical Visual Bar Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: API & GPU Cost Distribution */}
            <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card font-mono text-xs">
              <div className="flex items-center justify-between border-b border-cyber-800 pb-3">
                <h4 className="font-tech font-bold text-sm text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-rose-400" /> Distribución de Costos de APIs ($1,887.00 USD/m)
                </h4>
                <span className="text-[10px] text-slate-400">Consumo Real</span>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Inferencia GPU H100 (Aurora 3D)', cost: 576, pct: 30.5, color: 'bg-emerald-400' },
                  { name: 'API Generación 3D (Tripo3D/Meshy)', cost: 456, pct: 24.2, color: 'bg-amber-400' },
                  { name: 'Video Ads & Turntables 4K (Runway)', cost: 362.5, pct: 19.2, color: 'bg-cyan-400' },
                  { name: 'Cloud Baking Unreal Engine 5 Nanite', cost: 142.5, pct: 7.5, color: 'bg-indigo-400' },
                  { name: 'Orquestador Swarm 6 Agentes IA', cost: 120, pct: 6.4, color: 'bg-purple-400' },
                  { name: 'Cloud Storage & CDN (Cloudflare R2)', cost: 72, pct: 3.8, color: 'bg-blue-400' },
                  { name: 'Locuciones IA ElevenLabs Multilingüe', cost: 68, pct: 3.6, color: 'bg-pink-400' },
                  { name: 'Supabase Database & Webhooks', cost: 45, pct: 2.4, color: 'bg-rose-400' }
                ].map((bar, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-300">{bar.name}</span>
                      <span className="text-white font-bold">${bar.cost.toFixed(2)} ({bar.pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-cyber-950 rounded-full overflow-hidden border border-white/5">
                      <div className={`h-full ${bar.color} rounded-full transition-all duration-500`} style={{ width: `${bar.pct * 2.8}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Monthly MRR & Client Growth */}
            <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card font-mono text-xs">
              <div className="flex items-center justify-between border-b border-cyber-800 pb-3">
                <h4 className="font-tech font-bold text-sm text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> Crecimiento de Facturación MRR (Ene - Ago 2026)
                </h4>
                <span className="text-[10px] text-emerald-400 font-bold">+3,343% ARR</span>
              </div>

              <div className="space-y-3">
                {[
                  { month: 'Enero 2026', mrr: '$1,420 USD', clients: '32 clientes', pct: 8 },
                  { month: 'Febrero 2026', mrr: '$2,890 USD', clients: '64 clientes', pct: 15 },
                  { month: 'Marzo 2026', mrr: '$4,980 USD', clients: '112 clientes', pct: 24 },
                  { month: 'Abril 2026', mrr: '$8,450 USD', clients: '190 clientes', pct: 36 },
                  { month: 'Mayo 2026', mrr: '$14,200 USD', clients: '320 clientes', pct: 52 },
                  { month: 'Junio 2026', mrr: '$22,800 USD', clients: '510 clientes', pct: 68 },
                  { month: 'Julio 2026', mrr: '$34,600 USD', clients: '780 clientes', pct: 84 },
                  { month: 'Agosto 2026 (Actual)', mrr: '$48,900 USD', clients: '1,100 clientes', pct: 100 }
                ].map((bar, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-300">{bar.month}</span>
                      <span className="text-emerald-400 font-bold">{bar.mrr} <span className="text-slate-500 font-normal">({bar.clients})</span></span>
                    </div>
                    <div className="w-full h-2 bg-cyber-950 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500" style={{ width: `${bar.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* =========================================================
          TAB: INDEPENDENT MODULE COSTS & AI CONSUMPTION ANALYTICS
          ========================================================= */}
      {activeTab === 'module_costs' && (
        <div className="space-y-6 animate-fadeIn font-mono text-xs">
          {/* Executive Header Banner */}
          <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-gold/50 shadow-cyber-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-cyber-gold text-cyber-gold shadow-gold-glow">
                  <Zap className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-tech font-bold text-white tracking-wider">
                      DESGLOSE INDEPENDIENTE DE COSTOS & CONSUMO POR MÓDULO
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      TELEMETRÍA EN VIVO 2026
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">
                    Monitoreo granular de tokens LLM, horas GPU H100/A100, llamadas API externas y márgenes de rentabilidad de cada módulo.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center bg-cyber-950 p-1 rounded-xl border border-cyber-800">
                  {(['today', 'week', 'month', 'year'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setCostTimeframe(tf)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-tech font-bold uppercase transition-all ${
                        costTimeframe === tf
                          ? 'bg-cyber-gold text-black shadow-gold-glow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tf === 'today' ? 'Hoy' : tf === 'week' ? '7 Días' : tf === 'month' ? 'Mes Actual' : 'Anual (x12)'}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleExportModuleCostsCSV}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-tech font-bold text-xs uppercase shadow-md transition-all"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Exportar CSV</span>
                </button>
              </div>
            </div>

            {/* Quick KPI Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-cyber-950 border border-amber-500/30 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Gasto Total de APIs:</span>
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                </span>
                <span className="text-2xl font-tech font-extrabold text-amber-400 block">
                  ${totalCalculatedModuleCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                </span>
                <span className="text-[10px] text-slate-500">Periodo seleccionado: {costTimeframe}</span>
              </div>

              <div className="p-4 rounded-2xl bg-cyber-950 border border-cyan-500/30 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Invocaciones / Tareas:</span>
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                </span>
                <span className="text-2xl font-tech font-extrabold text-cyan-400 block">
                  {totalGenerationsTimeframe.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">Mallas 3D, fotos, videos y copys</span>
              </div>

              <div className="p-4 rounded-2xl bg-cyber-950 border border-emerald-500/30 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Margen Promedio:</span>
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                </span>
                <span className="text-2xl font-tech font-extrabold text-emerald-400 block">
                  {avgProfitMarginGlobal}%
                </span>
                <span className="text-[10px] text-slate-500">Retorno vs precio suscripción</span>
              </div>

              <div className="p-4 rounded-2xl bg-cyber-950 border border-purple-500/30 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Módulo Más Usado:</span>
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                </span>
                <span className="text-lg font-tech font-extrabold text-purple-300 block truncate">
                  Aurora 3D Studio
                </span>
                <span className="text-[10px] text-slate-500">29.1% del consumo global</span>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900 p-4 rounded-2xl border border-cyber-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={moduleCostSearch}
                onChange={(e) => setModuleCostSearch(e.target.value)}
                placeholder="Buscar módulo, API (ej: Tripo3D, Runway, H100)..."
                className="w-full bg-cyber-950 border border-cyber-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-gold"
              />
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>Límite de Alerta de Consumo:</span>
              <span className="font-bold text-cyber-gold font-tech text-sm">${costAlertThreshold} USD</span>
              <input
                type="range"
                min="300"
                max="2000"
                step="50"
                value={costAlertThreshold}
                onChange={(e) => setCostAlertThreshold(Number(e.target.value))}
                className="w-32 accent-cyber-gold cursor-pointer"
              />
            </div>
          </div>

          {/* Grid of Independent Module Cost Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredModuleCosts.map((mod) => {
              const IconComponent = mod.icon;
              const calculatedCost = mod.monthlyCostUSD * currentMultiplier;
              const calculatedGenerations = Math.round(mod.monthlyGenerations * currentMultiplier);
              const costPercentOfTotal = totalCalculatedModuleCost > 0 ? ((calculatedCost / totalCalculatedModuleCost) * 100).toFixed(1) : '0';
              const isOverAlert = calculatedCost > costAlertThreshold;

              return (
                <div
                  key={mod.id}
                  className={`p-5 rounded-3xl border transition-all space-y-4 shadow-cyber-card bg-cyber-900 ${
                    isOverAlert ? 'border-rose-500/70 shadow-rose-500/10' : mod.borderColor
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-2xl border ${mod.bgColor} ${mod.borderColor} ${mod.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-tech font-bold text-base text-white">{mod.name}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-950 border border-cyber-800 text-slate-400">
                            {mod.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{mod.desc}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xl font-tech font-extrabold text-amber-400 block">
                        ${calculatedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-[10px] text-slate-500">{costPercentOfTotal}% del gasto total</span>
                    </div>
                  </div>

                  {/* Cost Details Grid */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-cyber-950 border border-cyber-800/80 text-center">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Invocaciones</span>
                      <span className="text-sm font-tech font-bold text-white">{calculatedGenerations.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Costo Unitario</span>
                      <span className="text-sm font-tech font-bold text-cyan-400">${mod.unitCostUSD.toFixed(3)} USD</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Margen Neto</span>
                      <span className="text-sm font-tech font-bold text-emerald-400">{mod.profitContributionMargin}%</span>
                    </div>
                  </div>

                  {/* APIs & Hardware Infrastructure Used */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>APIs & Modelos Conectados:</span>
                      <span className="text-purple-300 font-bold">{mod.hardwareUsage}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {mod.primaryAPIs.map((api, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-cyber-950 border border-cyber-700 text-[10px] text-slate-300 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> {api}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Visual Cost Fill Bar */}
                  <div className="space-y-1 pt-1 border-t border-cyber-800">
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Proporción de Consumo:</span>
                      <span className="text-amber-400 font-bold">{costPercentOfTotal}% del presupuesto</span>
                    </div>
                    <div className="h-1.5 bg-cyber-950 rounded-full overflow-hidden border border-cyber-800">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-cyber-gold rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Number(costPercentOfTotal) * 2.5)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
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
          TAB 4: CLIENT DATABASE & RECURRING AUTO-BILLING HUB
          ========================================================= */}
      {activeTab === 'users' && (
        <div className="bg-cyber-900 rounded-3xl border border-cyber-800 shadow-cyber-card overflow-hidden space-y-5 p-5 sm:p-6 animate-fadeIn">
          {/* Header & Main Auto-Billing Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyber-800 pb-5">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="font-tech font-bold text-lg text-white">
                  Directorio de Clientes, Suscripciones & Cobros Automáticos
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  STRIPE & RECURRENTE v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Control de licencias, pasarela de cobro recurrente al vencimiento y eliminación de usuarios
              </p>
            </div>

            {/* Top Auto-Billing & Invoices Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleRunAutoBillingSweep}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-cyber-gold text-black text-xs font-tech font-bold uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all"
                title="Escanea todas las cuentas vencidas y ejecuta el cobro a sus tarjetas registradas"
              >
                <Zap className="w-4 h-4" />
                <span>Ejecutar Barrido de Cobros Recurrentes</span>
              </button>

              <button
                onClick={() => setShowInvoicesModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-slate-200 text-xs font-mono font-bold transition-all shadow-sm"
              >
                <Receipt className="w-3.5 h-3.5 text-cyber-gold" />
                <span>Facturas / Invoices ({invoicesList.length})</span>
              </button>

              <button
                onClick={() => generateExecutiveExcelReport(usersList)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/60 text-emerald-300 text-xs font-tech font-bold transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Excel (.xlsx)</span>
              </button>
            </div>
          </div>

          {/* Search & Niche Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre, correo o estudio..."
                  className="bg-cyber-950 border border-cyber-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyber-gold w-72"
                />
              </div>

              <select
                value={filterNiche}
                onChange={(e) => setFilterNiche(e.target.value)}
                className="bg-cyber-950 border border-cyber-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
              >
                <option value="all">Todos los Nichos</option>
                <option value="fashion_streetwear">Moda & Streetwear</option>
                <option value="interior_design">Diseño de Interiores</option>
                <option value="instrumentation_hardware">Instrumentalización</option>
              </select>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Mostrando <strong className="text-white">{filteredUsers.length}</strong> de <strong className="text-white">{usersList.length}</strong> clientes registrados
            </div>
          </div>

          {/* Comprehensive Users Table */}
          <div className="overflow-x-auto rounded-2xl border border-cyber-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-cyber-950 text-slate-400 uppercase tracking-wider font-tech border-b border-cyber-800">
                <tr>
                  <th className="py-3 px-4">Cliente / Estudio</th>
                  <th className="py-3 px-4">Nicho & Contacto</th>
                  <th className="py-3 px-4">Suscripción & Estado</th>
                  <th className="py-3 px-4">Método de Pago</th>
                  <th className="py-3 px-4">Uso de IA</th>
                  <th className="py-3 px-4">Rol & Permisos</th>
                  <th className="py-3 px-4 text-center">Acciones de Cobro & Baja</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-800 text-slate-200">
                {filteredUsers.map((u) => {
                  const hasCard = !!u.paymentCard;
                  const isPaidPlan = u.role !== 'free' && u.planPrice > 0;
                  const isExpired = u.subscriptionStatus === 'expired' || u.subscriptionStatus === 'past_due';

                  return (
                    <tr key={u.id} className="hover:bg-cyber-850/50 transition-colors">
                      {/* 1. Cliente / Estudio */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-9 h-9 rounded-xl object-cover border border-cyber-gold shrink-0"
                          />
                          <div>
                            <div className="font-tech font-bold text-sm text-white">{u.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-500" /> {u.email}
                            </div>
                            <div className="text-[10px] text-cyber-gold font-semibold">{u.company}</div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Nicho & Contacto */}
                      <td className="py-3.5 px-4 space-y-0.5">
                        <div className="text-[11px] font-semibold text-slate-200">{getNicheLabel(u.niche)}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Globe className="w-3 h-3 text-slate-500" /> {u.country || 'Global'}
                        </div>
                        {u.phone && (
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                            <Phone className="w-3 h-3 text-slate-500" /> {u.phone}
                          </div>
                        )}
                      </td>

                      {/* 3. Suscripción & Estado */}
                      <td className="py-3.5 px-4 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
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
                        </div>

                        <div className="text-[10px] font-mono">
                          {isPaidPlan ? (
                            isExpired ? (
                              <span className="text-amber-400 font-bold block">⚠️ Cobro Vencido</span>
                            ) : (
                              <span className="text-emerald-400 block">
                                🟢 Activa (Renueva: {u.subscriptionRenewalDate || '2026-09-30'})
                              </span>
                            )
                          ) : (
                            <span className="text-slate-400">Plan Gratuito Permanente</span>
                          )}
                        </div>
                      </td>

                      {/* 4. Tarjeta / Método de Pago */}
                      <td className="py-3.5 px-4">
                        {u.paymentCard ? (
                          <div className="p-2 rounded-xl bg-cyber-950 border border-cyber-700 font-mono text-[11px] space-y-0.5">
                            <div className="flex items-center gap-1.5 text-white font-bold uppercase">
                              <CreditCard className="w-3.5 h-3.5 text-cyber-gold" />
                              <span>{u.paymentCard.brand} •••• {u.paymentCard.last4}</span>
                            </div>
                            <div className="text-[9px] text-slate-400 flex items-center justify-between">
                              <span>Exp: {u.paymentCard.expMonth}/{u.paymentCard.expYear}</span>
                              <span className="text-emerald-400">Auto-Cobro: Sí</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-mono italic">Sin tarjeta registrada</span>
                        )}
                      </td>

                      {/* 5. Uso de IA */}
                      <td className="py-3.5 px-4 font-mono text-cyber-gold text-xs">
                        <strong>{u.aiCredits?.used || 0}</strong> / {u.aiCredits?.total || 3} renders
                      </td>

                      {/* 6. Rol & Permisos */}
                      <td className="py-3.5 px-4">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                          className="bg-cyber-950 border border-cyber-700 text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
                        >
                          <option value="free">Free Starter</option>
                          <option value="pro">Pro Designer ($49)</option>
                          <option value="agency">Agencia ($149)</option>
                          <option value="admin">Super Admin</option>
                        </select>
                      </td>

                      {/* 7. Acciones de Cobro & Baja */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Botón Cobrar Ahora (si tiene tarjeta y es de pago) */}
                          {isPaidPlan && hasCard && (
                            <button
                              onClick={() => handleChargeUser(u.id)}
                              className="px-2.5 py-1.5 rounded-lg bg-cyber-gold/20 hover:bg-cyber-gold/30 border border-cyber-gold/60 text-cyber-gold text-[10px] font-tech font-bold uppercase transition-all flex items-center gap-1"
                              title="Ejecutar cobro recurrente inmediato con Stripe"
                            >
                              <Zap className="w-3 h-3" /> Cobrar
                            </button>
                          )}

                          {/* Botón Eliminar Usuario */}
                          <button
                            onClick={() => setUserToDelete(u)}
                            className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 hover:text-rose-200 transition-all"
                            title="Eliminar usuario permanentemente"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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

      {/* =========================================================
          MODAL 1: CONFIRMACIÓN DE ELIMINACIÓN DE USUARIO
          ========================================================= */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-rose-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[0_0_50px_rgba(244,63,94,0.3)] text-center space-y-5 relative">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/50 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-tech font-bold text-white">¿Eliminar Usuario Permanentemente?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Estás a punto de dar de baja a <strong className="text-white font-tech">{userToDelete.name}</strong> ({userToDelete.email}). Se revocarán todas sus licencias, proyectos 3D y accesos de IA.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-cyber-950 border border-cyber-800 text-left text-xs font-mono space-y-1">
              <div className="text-slate-400">ID Usuario: <span className="text-white">{userToDelete.id}</span></div>
              <div className="text-slate-400">Plan Actual: <span className="text-rose-400 font-bold">{userToDelete.planName}</span></div>
              <div className="text-slate-400">Empresa: <span className="text-slate-300">{userToDelete.company}</span></div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setUserToDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-cyber-800 hover:bg-cyber-700 text-slate-300 font-semibold text-xs transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteUser}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_#f43f5e] transition-all flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Confirmar Baja
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 2: RESULTADO DE BARRIDO DE COBROS RECURRENTES
          ========================================================= */}
      {autoBillingSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyber-gold/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-gold-glow-lg space-y-5 relative max-h-[88vh] overflow-y-auto">
            <button
              onClick={() => setAutoBillingSummary(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyber-gold/20 text-cyber-gold border border-cyber-gold shadow-gold-glow">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">Reporte de Cobros Automáticos Recurrentes</h3>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">EJECUCIÓN CRON EXITOSA</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-cyber-950 border border-emerald-500/30 text-center">
                <span className="text-[10px] text-slate-400 block font-tech">COBRADOS</span>
                <span className="text-lg font-tech font-extrabold text-emerald-400">{autoBillingSummary.chargedCount}</span>
              </div>
              <div className="p-3 rounded-xl bg-cyber-950 border border-cyber-gold/30 text-center">
                <span className="text-[10px] text-slate-400 block font-tech">RECAUDO</span>
                <span className="text-lg font-tech font-extrabold text-cyber-gold">${autoBillingSummary.totalCollected}</span>
              </div>
              <div className="p-3 rounded-xl bg-cyber-950 border border-amber-500/30 text-center">
                <span className="text-[10px] text-slate-400 block font-tech">FALLIDOS</span>
                <span className="text-lg font-tech font-extrabold text-amber-400">{autoBillingSummary.failedCount}</span>
              </div>
              <div className="p-3 rounded-xl bg-cyber-950 border border-cyan-500/30 text-center">
                <span className="text-[10px] text-slate-400 block font-tech">A FREE</span>
                <span className="text-lg font-tech font-extrabold text-cyan-400">{autoBillingSummary.downgradedCount}</span>
              </div>
            </div>

            {/* Detailed Log List */}
            <div className="space-y-2">
              <span className="text-xs font-tech font-bold text-white block">Trazabilidad de Ejecución Stripe:</span>
              <div className="p-3 rounded-xl bg-cyber-950 border border-cyber-800 space-y-1.5 font-mono text-xs max-h-48 overflow-y-auto">
                {autoBillingSummary.logs.length > 0 ? (
                  autoBillingSummary.logs.map((log, idx) => (
                    <div key={idx} className="text-slate-300 text-[11px] leading-relaxed border-b border-white/5 pb-1 last:border-0">
                      {log}
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500 text-[11px]">Todas las suscripciones se encuentran al día. No se requirieron cobros inmediatos.</div>
                )}
              </div>
            </div>

            <button
              onClick={() => setAutoBillingSummary(null)}
              className="w-full py-2.5 rounded-xl bg-cyber-gold text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow"
            >
              Cerrar Reporte
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 3: HISTORIAL DE FACTURAS & INVOICES STRIPE
          ========================================================= */}
      {showInvoicesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyber-800 rounded-3xl p-6 max-w-2xl w-full shadow-cyber-card space-y-4 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-cyber-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Receipt className="w-5 h-5 text-cyber-gold" />
                <h3 className="font-tech font-bold text-base text-white">Historial de Facturación & Cobros Recurrentes</h3>
              </div>
              <button
                onClick={() => setShowInvoicesModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-cyber-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-cyber-950 text-slate-400 uppercase border-b border-cyber-800">
                  <tr>
                    <th className="py-2.5 px-3">Invoice ID</th>
                    <th className="py-2.5 px-3">Cliente</th>
                    <th className="py-2.5 px-3">Fecha & Hora</th>
                    <th className="py-2.5 px-3">Tarjeta</th>
                    <th className="py-2.5 px-3 text-right">Monto</th>
                    <th className="py-2.5 px-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-800 text-slate-300">
                  {invoicesList.map((inv) => (
                    <tr key={inv.id} className="hover:bg-cyber-850/50">
                      <td className="py-2.5 px-3 font-bold text-cyber-gold">{inv.id}</td>
                      <td className="py-2.5 px-3 font-sans font-semibold text-white">{inv.userName}</td>
                      <td className="py-2.5 px-3 text-slate-400 text-[11px]">{inv.date}</td>
                      <td className="py-2.5 px-3">•••• {inv.cardLast4}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-emerald-400">${inv.amount} USD</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                          PAGADO
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowInvoicesModal(false)}
                className="px-5 py-2 rounded-xl bg-cyber-950 border border-cyber-700 hover:border-cyber-gold text-slate-200 text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl border shadow-gold-glow max-w-sm animate-fadeIn flex items-center gap-3 font-mono text-xs ${
            toastMessage.type === 'success'
              ? 'bg-cyber-900/95 border-emerald-500/60 text-emerald-300'
              : 'bg-cyber-900/95 border-rose-500/60 text-rose-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage.text}</span>
        </div>
      )}
      {/* =========================================================
          MODAL: AGENTE AUTÓNOMO DE COMPRAS & NEGOCIACIÓN J.A.R.V.I.S.
          ========================================================= */}
      {isProcurementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-purple-500/50 rounded-3xl p-6 max-w-xl w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative font-mono text-xs">
            <button
              onClick={() => setIsProcurementModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500">
                <Cpu className="w-6 h-6 text-cyber-gold" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-base text-white">AGENTE AUTÓNOMO DE COMPRAS J.A.R.V.I.S.</h3>
                <p className="text-slate-400 text-[10px]">Negociación algorítmica de cotizaciones masivas con fábricas</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 text-slate-300">
              <p>🤖 <strong>Estado:</strong> Activo • Monitoreando 14 talleres B2B</p>
              <p>📉 <strong>Ahorro Promedio Obtenido:</strong> -14.2% por volumen de lote</p>
              <p>✉️ <strong>Correos Enviados en Piloto Automático:</strong> 86 solicitudes RFQ</p>
              <p>⚡ <strong>Tiempo de Respuesta:</strong> &lt; 3 minutos por ronda de negociación</p>
            </div>

            <button
              onClick={() => {
                alert('¡Agente de Compras ejecutando ronda de contraofertas para órdenes pendientes!');
                setIsProcurementModalOpen(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-tech font-extrabold text-xs uppercase shadow-md transition-all"
            >
              ⚡ Ejecutar Ronda de Negociación Autónoma
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: FACTURACIÓN STRIPE BILLING & TAX ENGINE
          ========================================================= */}
      {isStripeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-emerald-500/50 rounded-3xl p-6 max-w-lg w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative font-mono text-xs">
            <button
              onClick={() => setIsStripeModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-base text-white">STRIPE BILLING & TAX AUTOMATION</h3>
                <p className="text-slate-400 text-[10px]">Emisión de facturas fiscales internacionales (DIAN / SAT / FacturaE)</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 text-slate-300">
              <p>💳 <strong>Pasarela Activa:</strong> Stripe Connect Custom</p>
              <p>📑 <strong>Cálculo Automático de Impuestos:</strong> Stripe Tax en 45 países</p>
              <p>🔄 <strong>Tasa de Cobro Exitoso:</strong> 99.2% con Smart Retries de IA</p>
            </div>

            <button
              onClick={() => {
                alert('¡Sincronización con Stripe Dashboard completada exitosamente!');
                setIsStripeModalOpen(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-tech font-extrabold text-xs uppercase shadow-md transition-all"
            >
              📊 Abrir Stripe Billing Dashboard
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: MONITOR DE SALUD & STATUS PAGE EN VIVO
          ========================================================= */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyan-500/50 rounded-3xl p-6 max-w-lg w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative font-mono text-xs">
            <button
              onClick={() => setIsStatusModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-base text-white">ESTADO DE INFRAESTRUCTURA EN TIEMPO REAL</h3>
                <p className="text-slate-400 text-[10px]">Monitoreo de clusters WebGPU, APIs y almacenamiento R2</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-cyber-950 border border-cyber-800 flex justify-between items-center">
                <span>Cluster WebGPU Aurora 3D</span>
                <span className="text-emerald-400 font-bold">OPERACIONAL 🟢 (22ms)</span>
              </div>
              <div className="p-3 rounded-xl bg-cyber-950 border border-cyber-800 flex justify-between items-center">
                <span>Motor de Moldería CAD 2D</span>
                <span className="text-emerald-400 font-bold">OPERACIONAL 🟢 (15ms)</span>
              </div>
              <div className="p-3 rounded-xl bg-cyber-950 border border-cyber-800 flex justify-between items-center">
                <span>Poxxi 3D HLS Streaming</span>
                <span className="text-emerald-400 font-bold">OPERACIONAL 🟢 (48ms)</span>
              </div>
              <div className="p-3 rounded-xl bg-cyber-950 border border-cyber-800 flex justify-between items-center">
                <span>Fideicomiso B2B Escrow API</span>
                <span className="text-emerald-400 font-bold">OPERACIONAL 🟢 (19ms)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
