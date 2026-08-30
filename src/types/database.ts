import { UserRole } from './auth';

export type DesignNiche = 'fashion_streetwear' | 'interior_design' | 'instrumentation_hardware' | 'agency_marketing';
export type CompanyRole = 'founder_ceo' | 'creative_director' | 'indie_designer' | 'sourcing_lead' | 'agency_partner';
export type ProductionVolume = '1_5_monthly' | '6_20_monthly' | '20_plus_monthly' | 'exploring';

export interface UserRegistrationData {
  // Datos Básicos
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  registrationType: 'basic' | 'complete';

  // Datos Completos / Profesionales
  brandOrStudioName?: string;
  niche?: DesignNiche;
  country?: string;
  phone?: string;
  companyRole?: CompanyRole;
  estimatedVolume?: ProductionVolume;
  termsAccepted: boolean;
  marketingConsent?: boolean;
}

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  company: string;
  niche: DesignNiche;
  country: string;
  phone: string;
  companyRole: CompanyRole;
  estimatedVolume: ProductionVolume;
  planName: string;
  planPrice: number;
  aiCredits: {
    total: number;
    used: number;
  };
  licensesCount: number;
  registrationType: 'basic' | 'complete';
  createdAt: string;
  status: 'active' | 'suspended' | 'pending_verification';
}

export interface CloudProject {
  id: string;
  userId: string;
  title: string;
  type: string;
  primaryColor: string;
  accentColor: string;
  thumbnailUrl?: string;
  fileSizeMb: number;
  createdAt: string;
  updatedAt: string;
  status: 'synced' | 'local';
}

export interface R2BucketAsset {
  id: string;
  name: string;
  format: 'glb' | 'obj' | 'png' | 'pdf' | 'usdz';
  size: string;
  cdnUrl: string;
  latencyMs: number;
  uploadedAt: string;
}
