import React from 'react';
import { LandingNavbar } from './LandingNavbar';
import { Screen1Hero } from './Screen1Hero';
import { Screen2Avantgarde } from './Screen2Avantgarde';
import { Screen3Pricing } from './Screen3Pricing';
import { Screen4About } from './Screen4About';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

interface LandingPageProps {
  onExploreStudio: () => void;
  onOpenLogin: (mode?: 'login' | 'register') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onExploreStudio, onOpenLogin }) => {
  const { upgradePlan } = useAuth();

  return (
    <div className="relative w-full min-h-screen bg-cyber-950 text-slate-100 flex flex-col font-sans selection:bg-cyber-gold selection:text-black">
      {/* Header Navbar */}
      <LandingNavbar onOpenLogin={onOpenLogin} />

      {/* Screen 1: Hero — Garment Studio Promise */}
      <Screen1Hero onLaunch={onExploreStudio} />

      {/* Screen 2: 4-Step Garment-to-Factory Workflow */}
      <Screen2Avantgarde onSelectModule={() => onOpenLogin('login')} />

      {/* Screen 3: 3 Unified Plans (Boceto $0 / Colección $49 / Taller $149) */}
      <Screen3Pricing
        onSelectPlan={(role: UserRole) => {
          upgradePlan(role);
        }}
      />

      {/* Screen 4: Why POXXI & Founding Brands Program */}
      <Screen4About onGetStarted={() => onOpenLogin('register')} />
    </div>
  );
};
