import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import { Aurora3DStudio } from './components/modules/Aurora3DStudio';
import { Scanner3D } from './components/modules/Scanner3D';
import { AdGenAI } from './components/modules/AdGenAI';
import { ClothifySourcing } from './components/modules/ClothifySourcing';
import { SolesmithFootwear } from './components/modules/SolesmithFootwear';
import { AutomoCalendar } from './components/modules/AutomoCalendar';
import { GlobalSuppliers } from './components/modules/GlobalSuppliers';
import { SynthetixMascot } from './components/modules/SynthetixMascot';
import { AdminConsole } from './components/modules/AdminConsole';
import { ProjectRoadmapChecklist } from './components/modules/ProjectRoadmapChecklist';
import { CommunityExplore } from './components/modules/CommunityExplore';
import { VirtualRunwayLive } from './components/modules/VirtualRunwayLive';
import { PatternCutting2D } from './components/modules/PatternCutting2D';
import { AILookbookStudio } from './components/modules/AILookbookStudio';
import { TrendForecaster } from './components/modules/TrendForecaster';
import { AgencyWorkspaces } from './components/modules/AgencyWorkspaces';
import { CinematicTurntable } from './components/modules/CinematicTurntable';
import { ShopifyLandingBuilderAI } from './components/modules/ShopifyLandingBuilderAI';
import { AutonomousAgentSwarm } from './components/modules/AutonomousAgentSwarm';
import { BrandKitStudio } from './components/modules/BrandKitStudio';
import { MediaBuyerCampaigns } from './components/modules/MediaBuyerCampaigns';
import { VersionControl3D } from './components/modules/VersionControl3D';
import { MetaverseGamingExporter } from './components/modules/MetaverseGamingExporter';
import { TextileEngineeringLab } from './components/modules/TextileEngineeringLab';
import { JarvisHologramVoiceCore } from './components/modules/JarvisHologramVoiceCore';
import { JarvisFloatingWidget } from './components/common/JarvisFloatingWidget';
import { APIGatewayHub } from './components/modules/APIGatewayHub';
import { WorkflowAutomationsN8N } from './components/modules/WorkflowAutomationsN8N';
import { ModuleMaintenanceScreen } from './components/common/ModuleMaintenanceScreen';
import { ModuleStagingAdmin } from './components/modules/ModuleStagingAdmin';
import { moduleStagingService } from './services/moduleStagingService';
import { ProductPhotoStudioViralPublisher } from './components/modules/ProductPhotoStudioViralPublisher';
import { AetherReelsTikTok } from './components/modules/AetherReelsTikTok';
import { ExpertConsultationsHub } from './components/modules/ExpertConsultationsHub';

const MainLayout: React.FC = () => {
  const { viewMode, setViewMode, role, switchRole, setLoginModalOpen, setAuthModalMode } = useAuth();
  const [currentView, setCurrentView] = useState<string>('aurora3d');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [stagingVersion, setStagingVersion] = useState<number>(0);

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
      case 'staging_manager':
        return <ModuleStagingAdmin />;
      case 'apigateway':
        return <APIGatewayHub />;
      case 'roadmap':
        return <ProjectRoadmapChecklist />;
      case 'expert_consultations':
        return <ExpertConsultationsHub />;
      default:
        return <Aurora3DStudio />;
    }
  };

  return (
    <div className="min-h-screen bg-cyber-950 text-slate-100 flex flex-col font-sans selection:bg-cyber-gold selection:text-black transition-colors duration-300">
      {/* Top Navbar inside workspace with button to return to Landing */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Workspace */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto">
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <main className="flex-1 min-w-0 pb-12 overflow-y-auto">
          {renderWorkspaceModule()}
        </main>
      </div>

      <Footer />

      {/* Interactive Voice Assistant & Step-by-Step Guide */}
      <VoiceGuideAvatar onNavigateToModule={setCurrentView} />

      <LoginModal />
      <UpgradeModal />
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
      </div>

      {/* Global Persistent Floating JARVIS Hologram Widget */}
      <JarvisFloatingWidget onNavigateView={(v) => setCurrentView(v)} />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <MainLayout />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
