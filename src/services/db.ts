import { StoredUser, UserRegistrationData, CloudProject, R2BucketAsset } from '../types/database';
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
    status: 'active',
    subscriptionStatus: 'active',
    emailVerified: true,
    phoneVerified: true
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
    status: 'active',
    paymentCard: {
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2028,
      holderName: 'Jane Doe',
      autoRenew: true
    },
    subscriptionStatus: 'active',
    subscriptionRenewalDate: '2026-09-10',
    lastPaymentDate: '2026-08-10 14:32:00',
    lastPaymentAmount: 149,
    billingFailuresCount: 0,
    emailVerified: true,
    phoneVerified: true
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
    status: 'active',
    paymentCard: {
      brand: 'mastercard',
      last4: '8821',
      expMonth: 9,
      expYear: 2027,
      holderName: 'Sarah Connor',
      autoRenew: true
    },
    subscriptionStatus: 'active',
    subscriptionRenewalDate: '2026-09-15',
    lastPaymentDate: '2026-08-15 09:15:00',
    lastPaymentAmount: 49,
    billingFailuresCount: 0,
    emailVerified: true,
    phoneVerified: true
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
    status: 'active',
    subscriptionStatus: 'active',
    billingFailuresCount: 0,
    emailVerified: true,
    phoneVerified: false
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

  // =========================================
  // ☁️ SUPABASE CLOUD 3D PROJECTS (POSTGRESQL + RLS)
  // =========================================
  public getAllProjects(): CloudProject[] {
    const raw = localStorage.getItem('aether_cloud_projects_v1');
    if (!raw) {
      const initial: CloudProject[] = [
        {
          id: 'proj_cyber_jacket_01',
          userId: 'usr_pro_01',
          title: 'Cyber Bomber Jacket 2045',
          type: 'jacket',
          primaryColor: '#1E293B',
          accentColor: '#E5A93C',
          fileSizeMb: 4.8,
          createdAt: '2026-08-25',
          updatedAt: '2026-08-29',
          status: 'synced'
        },
        {
          id: 'proj_sneaker_chunky_02',
          userId: 'usr_agency_01',
          title: 'Chunky Sneaker Neo-Pulse',
          type: 'sneaker',
          primaryColor: '#0F172A',
          accentColor: '#38BDF8',
          fileSizeMb: 8.2,
          createdAt: '2026-08-27',
          updatedAt: '2026-08-30',
          status: 'synced'
        }
      ];
      localStorage.setItem('aether_cloud_projects_v1', JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public saveProject(project: Omit<CloudProject, 'id' | 'createdAt' | 'updatedAt' | 'status'>): CloudProject {
    const projects = this.getAllProjects();
    const newProject: CloudProject = {
      ...project,
      id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      status: 'synced'
    };
    projects.unshift(newProject);
    localStorage.setItem('aether_cloud_projects_v1', JSON.stringify(projects));
    window.dispatchEvent(new Event('aether_cloud_projects_updated'));
    return newProject;
  }

  public deleteProject(id: string): boolean {
    const projects = this.getAllProjects();
    const filtered = projects.filter((p) => p.id !== id);
    localStorage.setItem('aether_cloud_projects_v1', JSON.stringify(filtered));
    window.dispatchEvent(new Event('aether_cloud_projects_updated'));
    return true;
  }

  // =========================================
  // 📦 CLOUDFLARE R2 & S3 BUCKET ASSETS
  // =========================================
  public getR2BucketAssets(): R2BucketAsset[] {
    return [
      {
        id: 'r2_01',
        name: 'Cyber_Bomber_Jacket_4K.glb',
        format: 'glb',
        size: '4.8 MB',
        cdnUrl: 'https://pub-r2.aethersynergy.ai/models/jacket_4k.glb',
        latencyMs: 11,
        uploadedAt: '2026-08-28 14:20'
      },
      {
        id: 'r2_02',
        name: 'Sneaker_NeoPulse_PBR.usdz',
        format: 'usdz',
        size: '7.1 MB',
        cdnUrl: 'https://pub-r2.aethersynergy.ai/ar/sneaker_ar.usdz',
        latencyMs: 9,
        uploadedAt: '2026-08-29 18:45'
      },
      {
        id: 'r2_03',
        name: 'TechPack_Production_Spec.pdf',
        format: 'pdf',
        size: '1.4 MB',
        cdnUrl: 'https://pub-r2.aethersynergy.ai/docs/techpack_894.pdf',
        latencyMs: 14,
        uploadedAt: '2026-08-30 02:10'
      }
    ];
  }
}

export const dbService = new DatabaseService();
