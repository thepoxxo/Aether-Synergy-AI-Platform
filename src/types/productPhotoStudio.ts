export type ProductCategory =
  | 'fashion_apparel'
  | 'footwear_shoes'
  | 'furniture_interior'
  | 'bottles_beverages'
  | 'tech_gadgets'
  | 'jewelry_luxury'
  | 'cosmetics_beauty'
  | 'food_restaurant';

export type StudioSceneTheme =
  | 'cyberpunk_urban'
  | 'botanical_minimal'
  | 'luxury_marble'
  | 'golden_hour_beach'
  | 'nordic_coffee'
  | 'futuristic_podium'
  | 'boutique_showroom';

export interface StudioScenePreset {
  id: StudioSceneTheme;
  name: string;
  category: string;
  emoji: string;
  description: string;
  lightingType: string;
  recommendedFor: string;
  bgImageUrl: string;
  accentColor: string;
}

export type PresentationAngle =
  | 'front_commercial'
  | 'flat_lay_top'
  | 'virtual_human_model'
  | 'macro_texture_detail'
  | 'lifestyle_action';

export interface FacebookGroupTarget {
  id: string;
  name: string;
  category: 'fashion' | 'buy_sell' | 'tech' | 'home' | 'wholesale' | 'general';
  city: string;
  country: string;
  membersCount: number;
  url: string;
  autoApprove: boolean;
  selected: boolean;
}

export interface SocialNetworkTarget {
  id: 'facebook_groups' | 'facebook_marketplace' | 'instagram_feed' | 'tiktok_shop' | 'whatsapp_broadcast' | 'pinterest_pins' | 'shopify_store';
  name: string;
  icon: string;
  enabled: boolean;
  reachEstimate: string;
  connected: boolean;
}

export interface ProductPhotoProject {
  id: string;
  productName: string;
  category: ProductCategory;
  originalImageUrl: string;
  cleanedImageAlphaUrl?: string;
  recreatedImageUrl?: string;
  activeScene: StudioSceneTheme;
  presentationAngle: PresentationAngle;
  regularPrice: number;
  promoPrice: number;
  currency: string;
  whatsappNumber: string;
  salesCopy: string;
  hashtags: string[];
  createdAt: string;
}

export interface PublishingLogItem {
  id: string;
  timestamp: string;
  network: string;
  targetName: string;
  status: 'pending' | 'in_progress' | 'published' | 'rate_limited' | 'error';
  postUrl?: string;
  reachCount?: number;
  message: string;
}

export interface AutoPublishCampaignResult {
  campaignId: string;
  totalTargetedGroups: number;
  publishedCount: number;
  failedCount: number;
  estimatedTotalReach: number;
  estimatedClicks: number;
  durationSeconds: number;
  logs: PublishingLogItem[];
}
