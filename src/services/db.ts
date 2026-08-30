import { StoredUser, UserRegistrationData } from '../types/database';
import { UserRole } from '../types/auth';

const DB_KEY = 'aether_users_database_v1';

const INITIAL_USERS: StoredUser[] = [
  {
    id: 'usr_admin_01',
    name: 'Budon Master',
    email: 'admin@aethersynergy.ai',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    company: 'Aether Core Lab',
    niche: 'agency_marketing',
    country: 'Estados Unidos',
    phone: '+1 415 890 2045',
    companyRole: 'founder_ceo',
    estimatedVolume: '20_plus_monthly',
    planName: 'Omni Admin Pass',
    planPrice: 0,
    aiCredits: { total: 9999, used: 142 },
    licensesCount: 99,
    registrationType: 'complete',
    createdAt: '2026-08-01',
    status: 'active'
  },
  {
    id: 'usr_agency_01',
    name: 'Jane Doe',
    email: 'jane@quantumdigital.studio',
    role: 'agency',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    company: 'Quantum Digital Corp',
    niche: 'fashion_streetwear',
    country: 'Reino Unido',
    phone: '+44 20 7946 0912',
    companyRole: 'creative_director',
    estimatedVolume: '20_plus_monthly',
    planName: 'Agency Enterprise ($149/mo)',
    planPrice: 149,
    aiCredits: { total: 9999, used: 312 },
    licensesCount: 5,
    registrationType: 'complete',
    createdAt: '2026-08-10',
    status: 'active'
  },
  {
    id: 'usr_pro_01',
    name: 'Sarah Connor',
    email: 'sarah.design@aurora.studio',
    role: 'pro',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    company: 'Aurora Streetwear Lab',
    niche: 'fashion_streetwear',
    country: 'Francia',
    phone: '+33 1 42 68 55 00',
    companyRole: 'indie_designer',
    estimatedVolume: '6_20_monthly',
    planName: 'Pro Studio ($49/mo)',
    planPrice: 49,
    aiCredits: { total: 500, used: 84 },
    licensesCount: 1,
    registrationType: 'complete',
    createdAt: '2026-08-15',
    status: 'active'
  },
  {
    id: 'usr_free_01',
    name: 'Alex Vance',
    email: 'alex.vance@freemail.com',
    role: 'free',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    company: 'Vance Design Freelance',
    niche: 'interior_design',
    country: 'Colombia',
    phone: '+57 300 123 4567',
    companyRole: 'indie_designer',
    estimatedVolume: '1_5_monthly',
    planName: 'Free Starter ($0)',
    planPrice: 0,
    aiCredits: { total: 3, used: 2 },
    licensesCount: 1,
    registrationType: 'basic',
    createdAt: '2026-08-22',
    status: 'active'
  }
];

class DatabaseService {
  private getStorage(): StoredUser[] {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      this.saveStorage(INITIAL_USERS);
      return INITIAL_USERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_USERS;
    }
  }

  private saveStorage(users: StoredUser[]) {
    localStorage.setItem(DB_KEY, JSON.stringify(users));
    window.dispatchEvent(new Event('aether_database_updated'));
  }

  public getAllUsers(): StoredUser[] {
    return this.getStorage();
  }

  public getUserById(id: string): StoredUser | undefined {
    return this.getStorage().find((u) => u.id === id);
  }

  public getUserByEmail(email: string): StoredUser | undefined {
    return this.getStorage().find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  public registerUser(data: UserRegistrationData): StoredUser {
    const users = this.getStorage();

    // Check if email already exists
    const existing = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      return existing;
    }

    const newUser: StoredUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: data.name,
      email: data.email,
      role: data.role || 'free',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(data.name)}`,
      company: data.brandOrStudioName || (data.registrationType === 'complete' ? 'Estudio Profesional' : 'Indie Creator'),
      niche: data.niche || 'fashion_streetwear',
      country: data.country || 'Global',
      phone: data.phone || 'No especificado',
      companyRole: data.companyRole || 'indie_designer',
      estimatedVolume: data.estimatedVolume || '1_5_monthly',
      planName: data.role === 'agency' ? 'Agency Enterprise ($149/mo)' : data.role === 'pro' ? 'Pro Studio ($49/mo)' : 'Free Starter ($0)',
      planPrice: data.role === 'agency' ? 149 : data.role === 'pro' ? 49 : 0,
      aiCredits: {
        total: data.role === 'agency' ? 9999 : data.role === 'pro' ? 500 : 3,
        used: 0
      },
      licensesCount: data.role === 'agency' ? 5 : 1,
      registrationType: data.registrationType,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    users.unshift(newUser);
    this.saveStorage(users);
    return newUser;
  }

  public updateUserRole(userId: string, newRole: UserRole): StoredUser | null {
    const users = this.getStorage();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) return null;

    users[index] = {
      ...users[index],
      role: newRole,
      planName: newRole === 'agency' ? 'Agency Enterprise ($149/mo)' : newRole === 'pro' ? 'Pro Studio ($49/mo)' : newRole === 'admin' ? 'Omni Admin Pass' : 'Free Starter ($0)',
      planPrice: newRole === 'agency' ? 149 : newRole === 'pro' ? 49 : 0,
      aiCredits: {
        total: newRole === 'admin' || newRole === 'agency' ? 9999 : newRole === 'pro' ? 500 : 3,
        used: users[index].aiCredits.used
      },
      licensesCount: newRole === 'agency' ? 5 : 1
    };

    this.saveStorage(users);
    return users[index];
  }

  public deleteUser(userId: string): boolean {
    const users = this.getStorage();
    const filtered = users.filter((u) => u.id !== userId);
    if (filtered.length === users.length) return false;
    this.saveStorage(filtered);
    return true;
  }
}

export const dbService = new DatabaseService();
