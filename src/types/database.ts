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

export interface UserPaymentMethod {
  brand: 'visa' | 'mastercard' | 'amex' | 'paypal';
  last4: string;
  expMonth: number;
  expYear: number;
  holderName: string;
  autoRenew: boolean;
}

export interface BillingInvoice {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  planName: string;
  cardLast4: string;
  status: 'paid' | 'failed' | 'refunded';
  date: string;
  description: string;
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
  // Payment & Billing
  paymentCard?: UserPaymentMethod;
  subscriptionStatus?: 'active' | 'past_due' | 'expired' | 'canceled';
  subscriptionRenewalDate?: string;
  lastPaymentDate?: string;
  lastPaymentAmount?: number;
  billingFailuresCount?: number;
  phoneVerified?: boolean;
  emailVerified?: boolean;
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
