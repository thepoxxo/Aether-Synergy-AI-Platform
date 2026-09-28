import React, { useState, Suspense, lazy, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DeviceModeProvider, useDeviceMode } from './context/DeviceModeContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { LoginModal } from './components/auth/LoginModal';
import { UpgradeModal } from './components/auth/UpgradeModal';
import { UserProfileModal } from './components/auth/UserProfileModal';
import { VoiceGuideAvatar } from './components/common/VoiceGuideAvatar';
import { WorldLanguageModal } from './components/common/WorldLanguageModal';

// Landing Page (1 INTRO: Exactly screens 1, 2, 3, 4 with vertical mouse scroll)
import { LandingPage } from './components/landing/LandingPage';

// Internal Workspace Modules
const Aurora3DStudio = lazy(() => import('./components/modules/Aurora3DStudio').then(m => ({ default: m.Aurora3DStudio })));
import { MobileAurora3D } from './components/mobile/MobileAurora3D';
import { MobilePoxxiReels } from './components/mobile/MobilePoxxiReels';
import { MobilePatternCutting2D } from './components/mobile/MobilePatternCutting2D';
import { MobileGlobalSuppliers } from './components/mobile/MobileGlobalSuppliers';
import { MobileExpertConsultations } from './components/mobile/MobileExpertConsultations';
const Scanner3D = lazy(() => import('./components/modules/Scanner3D').then(m => ({ default: m.Scanner3D })));
const AdGenAI = lazy(() => import('./components/modules/AdGenAI').then(m => ({ default: m.AdGenAI })));
const ClothifySourcing = lazy(() => import('./components/modules/ClothifySourcing').then(m => ({ default: m.ClothifySourcing })));
const SolesmithFootwear = lazy(() => import('./components/modules/SolesmithFootwear').then(m => ({ default: m.SolesmithFootwear })));
const AutomoCalendar = lazy(() => import('./components/modules/AutomoCalendar').then(m => ({ default: m.AutomoCalendar })));
const GlobalSuppliers = lazy(() => import('./components/modules/GlobalSuppliers').then(m => ({ default: m.GlobalSuppliers })));
const SynthetixMascot = lazy(() => import('./components/modules/SynthetixMascot').then(m => ({ default: m.SynthetixMascot })));
const AdminConsole = lazy(() => import('./components/modules/AdminConsole').then(m => ({ default: m.AdminConsole })));
const PoxxiRevenueEngine = lazy(() => import('./components/modules/PoxxiRevenueEngine').then(m => ({ default: m.PoxxiRevenueEngine })));
const ProjectRoadmapChecklist = lazy(() => import('./components/modules/ProjectRoadmapChecklist').then(m => ({ default: m.ProjectRoadmapChecklist })));
const CommunityExplore = lazy(() => import('./components/modules/CommunityExplore').then(m => ({ default: m.CommunityExplore })));
const VirtualRunwayLive = lazy(() => import('./components/modules/VirtualRunwayLive').then(m => ({ default: m.VirtualRunwayLive })));
const PatternCutting2D = lazy(() => import('./components/modules/PatternCutting2D').then(m => ({ default: m.PatternCutting2D })));
const AILookbookStudio = lazy(() => import('./components/modules/AILookbookStudio').then(m => ({ default: m.AILookbookStudio })));
const TrendForecaster = lazy(() => import('./components/modules/TrendForecaster').then(m => ({ default: m.TrendForecaster })));
const AgencyWorkspaces = lazy(() => import('./components/modules/AgencyWorkspaces').then(m => ({ default: m.AgencyWorkspaces })));
const CinematicTurntable = lazy(() => import('./components/modules/CinematicTurntable').then(m => ({ default: m.CinematicTurntable })));
const ShopifyLandingBuilderAI = lazy(() => import('./components/modules/ShopifyLandingBuilderAI').then(m => ({ default: m.ShopifyLandingBuilderAI })));
const AutonomousAgentSwarm = lazy(() => import('./components/modules/AutonomousAgentSwarm').then(m => ({ default: m.AutonomousAgentSwarm })));
const BrandKitStudio = lazy(() => import('./components/modules/BrandKitStudio').then(m => ({ default: m.BrandKitStudio })));
const MediaBuyerCampaigns = lazy(() => import('./components/modules/MediaBuyerCampaigns').then(m => ({ default: m.MediaBuyerCampaigns })));
const VersionControl3D = lazy(() => import('./components/modules/VersionControl3D').then(m => ({ default: m.VersionControl3D })));
const MetaverseGamingExporter = lazy(() => import('./components/modules/MetaverseGamingExporter').then(m => ({ default: m.MetaverseGamingExporter })));
const TextileEngineeringLab = lazy(() => import('./components/modules/TextileEngineeringLab').then(m => ({ default: m.TextileEngineeringLab })));
const JarvisHologramVoiceCore = lazy(() => import('./components/modules/JarvisHologramVoiceCore').then(m => ({ default: m.JarvisHologramVoiceCore })));
const APIGatewayHub = lazy(() => import('./components/modules/APIGatewayHub').then(m => ({ default: m.APIGatewayHub })));
const WorkflowAutomationsN8N = lazy(() => import('./components/modules/WorkflowAutomationsN8N').then(m => ({ default: m.WorkflowAutomationsN8N })));
import { ModuleMaintenanceScreen } from './components/common/ModuleMaintenanceScreen';
const ModuleStagingAdmin = lazy(() => import('./components/modules/ModuleStagingAdmin').then(m => ({ default: m.ModuleStagingAdmin })));
import { moduleStagingService } from './services/moduleStagingService';
const ProductPhotoStudioViralPublisher = lazy(() => import('./components/modules/ProductPhotoStudioViralPublisher').then(m => ({ default: m.ProductPhotoStudioViralPublisher })));
const AetherReelsTikTok = lazy(() => import('./components/modules/AetherReelsTikTok').then(m => ({ default: m.AetherReelsTikTok })));
const ExpertConsultationsHub = lazy(() => import('./components/modules/ExpertConsultationsHub').then(m => ({ default: m.ExpertConsultationsHub })));

const DigitalProductPassport = lazy(() => import('./components/modules/DigitalProductPassport').then(m => ({ default: m.DigitalProductPassport })));
const DXFExportEngine = lazy(() => import('./components/modules/DXFExportEngine').then(m => ({ default: m.DXFExportEngine })));
const ShopifyWidgetBuilder = lazy(() => import('./components/modules/ShopifyWidgetBuilder').then(m => ({ default: m.ShopifyWidgetBuilder })));
const TrendSpiderAgent = lazy(() => import('./components/modules/TrendSpiderAgent').then(m => ({ default: m.TrendSpiderAgent })));

import { MobileAppBottomNav } from './components/layout/MobileAppBottomNav';
import { CommandPalette } from './components/common/CommandPalette';

import { DesktopWindowHeader } from './components/layout/DesktopWindowHeader';
import { DeviceModeSimulator } from './components/common/DeviceModeSimulator';
import { AdminMasterModuleHubModal } from './components/common/AdminMasterModuleHubModal';

const MainLayout: React.FC = () => {
  const { viewMode, setViewMode, role, switchRole, setLoginModalOpen, setAuthModalMode } = useAuth();
  const { deviceMode, isMobile } = useDeviceMode();
  const [currentView, setCurrentView] = useState<string>('aurora3d');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [stagingVersion, setStagingVersion] = useState<number>(0);
  const [isAdminHubModalOpen, setIsAdminHubModalOpen] = useState(false);

  useEffect(() => {
    const handleNavigate = (e: any) => setCurrentView(e.detail);
    window.addEventListener('aether_navigate', handleNavigate);
    return () => window.removeEventListener('aether_navigate', handleNavigate);
  }, []);


  useEffect(() => {
    const handleStagingUpdate = () => setStagingVersion((v) => v + 1);
    window.addEventListener('aether_staging_updated', handleStagingUpdate);
    return () => window.removeEventListener('aether_staging_updated', handleStagingUpdate);
  }, []);

  const handleOpenAuth = (mode?: 'login' | 'register') => {
    setAuthModalMode(mode || 'login');
    setLoginModalOpen(true);
  };

  // 1. If viewMode is 'landing' (DEFAULT FOR EVERYONE ENTERING THE LINK):
  // Show ONLY the sequential 4 screens from 1 INTRO (Image 1 -> Image 2 -> Image 3 -> Image 4)
  if (viewMode === 'landing') {
    return (
      <div className="min-h-screen bg-cyber-950 text-slate-100 font-sans selection:bg-cyber-gold selection:text-black">
        <LandingPage
          onExploreStudio={() => handleOpenAuth('login')}
          onOpenLogin={handleOpenAuth}
        />
        <LoginModal />
        <UpgradeModal />
        <CommandPalette />
        <UserProfileModal />

        {/* Floating Quick Demo Access Pill for Direct Testing (Mobile Optimized) */}
        <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 flex items-center gap-1.5 p-1.5 sm:p-2 rounded-2xl bg-cyber-900/90 backdrop-blur-xl border border-cyber-gold/50 shadow-gold-glow-lg text-[11px] sm:text-xs max-w-[95vw]">
          <span className="text-cyber-gold font-tech font-bold uppercase hidden md:inline px-1">
            Probar Demo:
          </span>
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            <button
              onClick={() => switchRole('free')}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl font-bold uppercase bg-cyber-950 text-slate-300 hover:text-white hover:border-cyan-400 border border-transparent transition-all shrink-0"
            >
              Free
            </button>
            <button
              onClick={() => switchRole('pro')}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl font-bold uppercase bg-cyber-gold text-black shadow-gold-glow transition-all shrink-0"
            >
              Pro ($49)
            </button>
            <button
              onClick={() => switchRole('agency')}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl font-bold uppercase bg-purple-500 text-white shadow-lg transition-all shrink-0"
            >
              Agencia
            </button>
            <button
              onClick={() => switchRole('admin')}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl font-bold uppercase bg-rose-500 text-white shadow-lg transition-all shrink-0"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. If viewMode is 'app' (User logged in or registered):
  // Show the internal dashboard workspace with Sidebar
  const renderWorkspaceModule = () => {
    const isAccessible = moduleStagingService.isModuleAccessible(currentView, role);
    if (!isAccessible && currentView !== 'staging_manager' && currentView !== 'admin') {
      const modConfig = moduleStagingService.getModuleById(currentView) || {
        id: currentView,
        name: 'Módulo en Mantenimiento',
        category: 'general',
        categoryTitle: 'Plataforma',
        status: moduleStagingService.getModuleStatus(currentView),
        version: '1.0.0',
        phase: 2,
        changelogNote: 'Actualización y optimización de rendimiento en progreso.'
      };
      return (
        <ModuleMaintenanceScreen
          moduleConfig={modConfig}
          userRole={role}
          onNavigateToDesign={() => setCurrentView('aurora3d')}
          onReload={() => setStagingVersion((v) => v + 1)}
        />
      );
    }

    switch (currentView) {
      case 'tiktok_feed':
        return <AetherReelsTikTok onNavigateToModule={(mod) => setCurrentView(mod)} />;
      case 'photostudio_viral':
        return <ProductPhotoStudioViralPublisher />;
      case 'aurora3d':
        return <Aurora3DStudio />;
      case 'scanner3d':
        return <Scanner3D />;
      case 'adgen':
        return <AdGenAI />;
      case 'brandkit':
        return <BrandKitStudio />;
      case 'mediabuyer':
        return <MediaBuyerCampaigns />;
      case 'versioncontrol':
        return <VersionControl3D />;
      case 'metaverse':
        return <MetaverseGamingExporter />;
      case 'textilelab':
        return <TextileEngineeringLab />;
      case 'shopifylanding':
        return <ShopifyLandingBuilderAI />;
      case 'agentswarm':
        return <AutonomousAgentSwarm />;
      case 'automations':
        return <WorkflowAutomationsN8N />;
      case 'jarvis':
        return <JarvisHologramVoiceCore onExecutePlatformAction={(act, p) => act === 'navigate' && setCurrentView(p)} />;
      case 'turntable':
        return <CinematicTurntable />;
      case 'lookbook':
        return <AILookbookStudio />;
      case 'trendforecast':
        return <TrendForecaster />;
      case 'workspaces':
        return <AgencyWorkspaces />;
      case 'clothify':
        return <ClothifySourcing />;
      case 'pattern2d':
        return <PatternCutting2D />;
      case 'runway':
        return <VirtualRunwayLive />;
      case 'solesmith':
        return <SolesmithFootwear />;
      case 'automo':
        return <AutomoCalendar />;
      case 'suppliers':
        return <GlobalSuppliers />;
      case 'community':
        return <CommunityExplore onRemixDesign={() => setCurrentView('aurora3d')} />;
      case 'mascot':
        return <SynthetixMascot />;
      case 'admin':
        return <AdminConsole />;
      case 'dpp_eu':
        return <DigitalProductPassport />;
      case 'dxf_engine':
        return <DXFExportEngine />;
      case 'shopify_widget':
        return <ShopifyWidgetBuilder />;
      case 'trend_spider':
        return <TrendSpiderAgent />;

      case 'staging_manager':
        return <ModuleStagingAdmin />;
      case 'apigateway':
        return <APIGatewayHub />;
      case 'roadmap':
        return <ProjectRoadmapChecklist />;
      case 'revenue_engine':
        return <PoxxiRevenueEngine />;
      case 'expert_consultations':
        return isMobile ? <MobileExpertConsultations /> : <ExpertConsultationsHub />;
      default:
        return isMobile ? <MobileAurora3D /> : <Aurora3DStudio />;
    }
  };

  return (
    <div className="min-h-screen bg-cyber-950 text-slate-100 flex flex-col font-sans selection:bg-cyber-gold selection:text-black transition-colors duration-300 w-full overflow-x-hidden">
      {/* Desktop App Window Header Bar (Windows/macOS style with GPU telemetry) */}
      <DesktopWindowHeader />

      {/* Device Viewport Mode Simulator Badge */}
      <DeviceModeSimulator />
      <AdminMasterModuleHubModal
        isOpen={isAdminHubModalOpen}
        onClose={() => setIsAdminHubModalOpen(false)}
        onSelectModule={(modId) => setCurrentView(modId)}
        currentView={currentView}
      />

      {/* Top Navbar inside workspace with button to return to Landing */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Workspace */}
      <div className="flex-1 flex w-full max-w-[1920px] mx-auto min-w-0">
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <main className="flex-1 min-w-0 pb-20 sm:pb-12 overflow-y-auto">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full w-full">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-cyber-800 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="text-emerald-400 font-tech font-bold text-sm tracking-widest animate-pulse">OPTIMIZANDO MÓDULO...</p>
              </div>
            </div>
          }>
            {renderWorkspaceModule()}
          </Suspense>
        </main>
      </div>

      <Footer />

      {/* Interactive Voice Assistant & Step-by-Step Guide */}
      <VoiceGuideAvatar onNavigateToModule={setCurrentView} />

      <LoginModal />
      <UpgradeModal />
        <CommandPalette />
      <UserProfileModal />
      <WorldLanguageModal />

      {/* Floating Role Switcher inside Workspace */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 p-2 rounded-2xl bg-cyber-900/90 backdrop-blur-xl border border-cyber-gold/50 shadow-gold-glow-lg text-xs">
        <button
          onClick={() => setViewMode('landing')}
          className="px-3 py-1 rounded-xl bg-cyber-800 hover:bg-cyber-700 text-slate-200 font-semibold border border-cyber-600 mr-1 transition-all"
        >
          ← Ver Portada Intro
        </button>
        <span className="text-cyber-gold font-tech font-bold uppercase hidden sm:inline px-1">
          Rol:
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => switchRole('free')}
            className={`px-2.5 py-1 rounded-xl font-bold uppercase transition-all ${
              role === 'free' ? 'bg-cyan-400 text-black shadow-cyan-glow' : 'bg-cyber-950 text-slate-400 hover:text-white'
            }`}
          >
            Free
          </button>
          <button
            onClick={() => switchRole('pro')}
            className={`px-2.5 py-1 rounded-xl font-bold uppercase transition-all ${
              role === 'pro' ? 'bg-cyber-gold text-black shadow-gold-glow' : 'bg-cyber-950 text-slate-400 hover:text-white'
            }`}
          >
            Pro ($49)
          </button>
          <button
            onClick={() => switchRole('agency')}
            className={`px-2.5 py-1 rounded-xl font-bold uppercase transition-all ${
              role === 'agency' ? 'bg-purple-400 text-black shadow-lg' : 'bg-cyber-950 text-slate-400 hover:text-white'
            }`}
          >
            Agencia ($149)
          </button>
          <button
            onClick={() => switchRole('admin')}
            className={`px-2.5 py-1 rounded-xl font-bold uppercase transition-all ${
              role === 'admin' ? 'bg-rose-500 text-white shadow-lg' : 'bg-cyber-950 text-slate-400 hover:text-white'
            }`}
          >
            Admin
          </button>
        </div>
        {role === 'admin' && (
          <button
            onClick={() => setIsAdminHubModalOpen(true)}
            className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-tech font-extrabold uppercase shadow-gold-glow ml-1 flex items-center gap-1 active:scale-95 transition-all"
            title="Abrir Panel Maestro de los 29 Módulos para Auditoría"
          >
            <span>🎛️ Auditar 29 Módulos</span>
          </button>
        )}
      </div>

      {/* Native Mobile App Bottom Navigation Bar (Dock) */}
      <MobileAppBottomNav currentView={currentView} setCurrentView={setCurrentView} />

      
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <DeviceModeProvider>
            <MainLayout />
          </DeviceModeProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
