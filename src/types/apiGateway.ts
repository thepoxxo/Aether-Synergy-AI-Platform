export type APICategory =
  | '3d_mesh'
  | 'cloud_rendering'
  | 'video_ads'
  | 'image_generation'
  | 'sketch_to_design'
  | 'music_sound'
  | 'voice_synthesis'
  | 'llm_agents'
  | 'cloud_database'
  | 'payments_ecommerce';

export type APIStatus = 'connected' | 'simulated' | 'error' | 'pending';

export interface APIServiceConfig {
  id: string;
  name: string;
  provider: string;
  category: APICategory;
  categoryLabel: string;
  iconName: string;
  envKey: string;
  description: string;
  capabilities: string[];
  supportedDomains: string[]; // e.g. ["Ropa", "Sillas & Muebles", "Calzado", "Bolsos", "Restaurantes", "Música"]
  pricingTier: string;
  estimatedCostPerCall: string;
  status: APIStatus;
  latencyMs?: number;
  docUrl: string;
  apiKey?: string;
  isConfigured: boolean;
}

export interface GenerationRequest3D {
  prompt: string;
  domain: 'clothing' | 'furniture' | 'footwear' | 'bags' | 'restaurant_food' | 'industrial';
  style: 'cyberpunk' | 'luxury_minimal' | 'vintage_couture' | 'nordic_modern' | 'streetwear';
  outputFormat: 'glb' | 'obj' | 'fbx' | 'usdz';
  quality: 'draft' | 'production_quad' | 'nanite_8k';
  imageUrl?: string;
}

export interface GenerationRequestVideo {
  prompt: string;
  aspectRatio: '9:16' | '16:9' | '1:1';
  durationSeconds: 5 | 10 | 15;
  motionStyle: 'cinematic_turntable' | 'runway_walk' | 'macro_food_steam' | 'dynamic_zoom';
  targetAudience: 'tiktok_viral' | 'instagram_luxury' | 'tv_commercial';
  productImageUrl?: string;
}

export interface GenerationRequestMusic {
  prompt: string;
  genre: 'cyber_phonk' | 'luxury_lounge' | 'restaurant_ambient' | 'high_energy_trap' | 'lofi_chill';
  durationSeconds: number;
  bpm: number;
  hasVocals: boolean;
}

export interface GenerationRequestVoice {
  script: string;
  voiceId: 'jarvis_iron_man' | 'luxury_female' | 'urban_hype' | 'corporate_executive';
  language: 'es' | 'en' | 'fr' | 'it' | 'de' | 'ja';
}

export interface GenerationRequestImage {
  prompt: string;
  modelType: 'flux_pro' | 'midjourney_v6' | 'recraft_vector' | 'controlnet_sketch';
  aspectRatio: '1:1' | '9:16' | '16:9' | '4:5';
  lighting: 'studio_softbox' | 'neon_tokyo' | 'natural_golden_hour' | 'cinematic_dark';
}

export interface APIGatewayTelemetry {
  totalRequests: number;
  activeEnginesCount: number;
  averageLatencyMs: number;
  estimatedMonthSpendUSD: number;
  mode: 'live_production' | 'simulated_fast';
}
