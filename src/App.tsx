import React, { useState } from 'react';
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

const MainLayout: React.FC = () => {
  const { viewMode, setViewMode, role, switchRole, setLoginModalOpen, setAuthModalMode } = useAuth();
  const [currentView, setCurrentView] = useState<string>('aurora3d');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

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
    switch (currentView) {
      case 'aurora3d':
        return <Aurora3DStudio />;
      case 'scanner3d':
        return <Scanner3D />;
      case 'adgen':
        return <AdGenAI />;
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
      case 'roadmap':
        return <ProjectRoadmapChecklist />;
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
