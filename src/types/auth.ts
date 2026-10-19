export type UserRole = 'guest' | 'free' | 'creator' | 'pro' | 'studio' | 'agency' | 'admin';

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

export interface OfficialPlanSpec {
  role: 'free' | 'pro' | 'agency';
  codeName: string;
  planLabel: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  aiCreditsTotal: number;
  licensesCount: number;
  summary: string;
  ctaText: string;
  highlighted?: boolean;
  features: string[];
}

export const OFFICIAL_PLANS: Record<'free' | 'pro' | 'agency', OfficialPlanSpec> = {
  free: {
    role: 'free',
    codeName: 'Boceto',
    planLabel: 'Free Starter ($0)',
    monthlyPrice: 0,
    annualMonthlyPrice: 0,
    aiCreditsTotal: 5,
    licensesCount: 1,
    summary: 'Comprueba si tu idea funciona en 3D antes de gastar en tela.',
    ctaText: 'Subir primer boceto — gratis',
    highlighted: false,
    features: [
      'Visor 3D de prendas en tiempo real',
      'Hasta 5 bocetos 3D al mes (con marca de agua)',
      'Prueba de caída, gramaje y color de tela',
      'Tus diseños son 100% tuyos (sin entrenamiento con tus archivos)'
    ]
  },
  pro: {
    role: 'pro',
    codeName: 'Colección',
    planLabel: 'Pro Studio ($49/mo)',
    monthlyPrice: 49,
    annualMonthlyPrice: 39,
    aiCreditsTotal: 500,
    licensesCount: 1,
    summary: 'Lanza un drop entero: prendas, fotos de producto y anuncios antes de fabricar.',
    ctaText: 'Empezar plan Colección',
    highlighted: true,
    features: [
      'Prendas 3D ilimitadas y exportación 4K (.GLB, .OBJ y patrones .DXF)',
      '≈ 25 videos de anuncio de 15 s al mes (motor Seedance 2.5)',
      'Fotos de producto editoriales sin muestra física',
      'Fichas técnicas (Tech Pack PDF) con medidas y consumo de tela',
      'Asistente técnico de taller por voz (KAI)'
    ]
  },
  agency: {
    role: 'agency',
    codeName: 'Taller',
    planLabel: 'Agency Enterprise ($149/mo)',
    monthlyPrice: 149,
    annualMonthlyPrice: 124,
    aiCreditsTotal: 9999,
    licensesCount: 5,
    summary: 'Para estudios con varias marcas que hablan con talleres cada semana.',
    ctaText: 'Activar plan Taller',
    highlighted: false,
    features: [
      'Todo lo de Colección + espacios para hasta 10 marcas',
      '5 licencias para tu equipo de diseño y patronaje',
      'Directorio de talleres verificados y cotización B2B directa',
      'Pasaporte Digital de Producto UE (normativa ESPR)',
      'Videos de campaña y calendario multicanal sin tope mensual'
    ]
  }
};
