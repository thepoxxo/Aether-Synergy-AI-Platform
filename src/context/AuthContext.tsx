import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, DemoAccount } from '../types/auth';
import { UserRegistrationData, StoredUser } from '../types/database';
import { dbService } from '../services/db';
import confetti from 'canvas-confetti';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  viewMode: 'landing' | 'app';
  setViewMode: (mode: 'landing' | 'app') => void;
  login: (role: UserRole, customName?: string, customEmail?: string) => void;
  register: (data: UserRegistrationData) => StoredUser;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  hasAccess: (requiredRole: UserRole) => boolean;
  upgradePlan: (targetRole: UserRole) => void;
  consumeCredit: () => boolean;
  demoAccounts: DemoAccount[];
  isLoginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  isUpgradeModalOpen: boolean;
  setUpgradeModalOpen: (open: boolean) => void;
  upgradeTargetRole: UserRole | null;
  promptUpgrade: (targetRole: UserRole) => void;
  isProfileModalOpen: boolean;
  setProfileModalOpen: (open: boolean) => void;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    label: 'Super Admin',
    role: 'admin',
    name: 'Budon Master',
    email: 'admin@aethersynergy.ai',
    plan: 'Omni Admin Pass',
    price: 0,
    color: '#EF4444',
    description: 'Acceso total sin restricciones, métricas globales y administración de usuarios.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    label: 'Plan Agencia',
    role: 'agency',
    name: 'Jane Doe (Quantum Labs)',
    email: 'jane@quantumdigital.studio',
    plan: 'Agency Enterprise ($149/mo)',
    price: 149,
    color: '#A855F7',
    description: 'Todas las herramientas Pro + Calendario Automo, B2B Manufacturers y 5 licencias.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    label: 'Pro Designer',
    role: 'pro',
    name: 'Sarah Connor',
    email: 'sarah.design@aurora.studio',
    plan: 'Pro Studio ($49/mo)',
    price: 49,
    color: '#E5A93C',
    description: 'Motor 3D Cel-Shaded ilimitado, Generador de Video Ads 9:16 y Asistente Kai Tech Pack.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    label: 'Usuario Gratuito',
    role: 'free',
    name: 'Alex Vance (Starter)',
    email: 'alex.vance@freemail.com',
    plan: 'Free Starter ($0)',
    price: 0,
    color: '#38BDF8',
    description: 'Vista previa de modelos 3D y 3 generaciones IA básicas diarias con marca de agua.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  }
];

const ROLE_PRIORITY: Record<UserRole, number> = {
  guest: 0,
  free: 1,
  pro: 2,
  agency: 3,
  admin: 99
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always initialize with null user and viewMode 'landing' when opening the site
  const [user, setUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [upgradeTargetRole, setUpgradeTargetRole] = useState<UserRole | null>(null);

  // Clear previous session from local storage on reload to guarantee 100% landing page first
  useEffect(() => {
    localStorage.removeItem('aether_active_user');
  }, []);

  const register = (data: UserRegistrationData): StoredUser => {
    const stored = dbService.registerUser(data);
    const appUser: User = {
      id: stored.id,
      name: stored.name,
      email: stored.email,
      role: stored.role,
      avatar: stored.avatar,
      company: stored.company,
      planName: stored.planName,
      planPrice: stored.planPrice,
      aiCredits: stored.aiCredits,
      licensesCount: stored.licensesCount,
      joinedDate: stored.createdAt
    };
    setUser(appUser);
    setViewMode('app');
    setLoginModalOpen(false);
    return stored;
  };

  const login = (targetRole: UserRole, customName?: string, customEmail?: string) => {
    if (targetRole === 'guest') {
      setUser(null);
      setViewMode('landing');
      setLoginModalOpen(false);
      return;
    }

    const demo = DEMO_ACCOUNTS.find(a => a.role === targetRole);
    const lookupEmail = customEmail || demo?.email || `${targetRole}@aethersynergy.ai`;
    const existing = dbService.getUserByEmail(lookupEmail);

    if (existing) {
      existing.role = targetRole;
      setUser({
        id: existing.id,
        name: customName || existing.name || demo?.name || 'Creador Aether',
        email: existing.email,
        role: targetRole,
        avatar: existing.avatar,
        company: existing.company,
        planName: demo?.plan || (targetRole === 'agency' ? 'Agency Enterprise ($149/mo)' : targetRole === 'pro' ? 'Pro Studio ($49/mo)' : 'Free Starter ($0)'),
        planPrice: demo?.price ?? (targetRole === 'agency' ? 149 : targetRole === 'pro' ? 49 : 0),
        aiCredits: existing.aiCredits,
        licensesCount: existing.licensesCount,
        joinedDate: existing.createdAt
      });
      setViewMode('app');
      setLoginModalOpen(false);
      return;
    }

    const stored = dbService.registerUser({
      name: customName || demo?.name || `Creador ${targetRole.toUpperCase()}`,
      email: lookupEmail,
      role: targetRole,
      registrationType: 'basic',
      termsAccepted: true
    });

    setUser({
      id: stored.id,
      name: stored.name,
      email: stored.email,
      role: targetRole,
      avatar: stored.avatar,
      company: stored.company,
      planName: stored.planName,
      planPrice: stored.planPrice,
      aiCredits: stored.aiCredits,
      licensesCount: stored.licensesCount,
      joinedDate: stored.createdAt
    });

    setViewMode('app');
    setLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setViewMode('landing');
  };

  const switchRole = (newRole: UserRole) => {
    if (user) {
      const demo = DEMO_ACCOUNTS.find(a => a.role === newRole);
      setUser({
        ...user,
        role: newRole,
        planName: demo?.plan || (newRole === 'agency' ? 'Agency Enterprise ($149/mo)' : newRole === 'pro' ? 'Pro Studio ($49/mo)' : 'Free Starter ($0)'),
        planPrice: demo?.price ?? (newRole === 'agency' ? 149 : newRole === 'pro' ? 49 : 0)
      });
      setViewMode('app');
    } else {
      login(newRole);
    }
  };

  const hasAccess = (requiredRole: UserRole): boolean => {
    if (!user) {
      return requiredRole === 'guest';
    }
    if (user.role === 'admin') return true;
    return ROLE_PRIORITY[user.role] >= ROLE_PRIORITY[requiredRole];
  };

  const promptUpgrade = (targetRole: UserRole) => {
    setUpgradeTargetRole(targetRole);
    setUpgradeModalOpen(true);
  };

  const upgradePlan = (targetRole: UserRole) => {
    if (!user) {
      login(targetRole);
    } else {
      const updated = dbService.updateUserRole(user.id, targetRole);
      if (updated) {
        setUser({
          ...user,
          role: targetRole,
          planName: updated.planName,
          planPrice: updated.planPrice,
          aiCredits: updated.aiCredits,
          licensesCount: updated.licensesCount
        });
      }
    }

    setUpgradeModalOpen(false);

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E5A93C', '#F59E0B', '#38BDF8', '#A855F7', '#10B981']
    });
  };

  const consumeCredit = (): boolean => {
    if (!user) {
      setAuthModalMode('login');
      setLoginModalOpen(true);
      return false;
    }
    if (user.role === 'admin' || user.role === 'agency') return true;
    if (user.aiCredits.used < user.aiCredits.total) {
      setUser({
        ...user,
        aiCredits: {
          ...user.aiCredits,
          used: user.aiCredits.used + 1
        }
      });
      return true;
    }
    promptUpgrade(user.role === 'free' ? 'pro' : 'agency');
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'guest',
        isAuthenticated: !!user,
        viewMode,
        setViewMode,
        login,
        register,
        logout,
        switchRole,
        hasAccess,
        upgradePlan,
        consumeCredit,
        demoAccounts: DEMO_ACCOUNTS,
        isLoginModalOpen,
        setLoginModalOpen,
        authModalMode,
        setAuthModalMode,
        isUpgradeModalOpen,
        setUpgradeModalOpen,
        upgradeTargetRole,
        promptUpgrade,
        isProfileModalOpen,
        setProfileModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
