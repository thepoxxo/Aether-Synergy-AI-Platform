export type UserRole = 'guest' | 'free' | 'pro' | 'agency' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  company?: string;
  planName: string;
  planPrice: number;
  aiCredits: {
    total: number;
    used: number;
  };
  licensesCount?: number;
  joinedDate: string;
}

export interface PlanFeature {
  id: string;
  name: string;
  description: string;
  requiredRole: UserRole;
  badge?: string;
}

export interface DemoAccount {
  label: string;
  role: UserRole;
  name: string;
  email: string;
  plan: string;
  price: number;
  color: string;
  description: string;
  avatar: string;
}
