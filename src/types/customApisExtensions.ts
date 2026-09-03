export type ApiAuthType = 'bearer' | 'api_key_header' | 'basic_auth' | 'none';
export type ApiProtocolType = 'REST_JSON' | 'GRAPHQL' | 'WEBSOCKET' | 'WEBHOOK';

export interface CustomUserApi {
  id: string;
  name: string;
  description: string;
  category: '3d_cad' | 'textile_inventory' | 'logistics_shipping' | 'crm_sales' | 'local_ai_llm' | 'custom';
  protocol: ApiProtocolType;
  endpointUrl: string;
  httpMethod: 'POST' | 'GET' | 'PUT' | 'PATCH';
  authType: ApiAuthType;
  authHeaderKey?: string; // e.g., 'Authorization' or 'x-api-key'
  authToken?: string; // e.g. Bearer token
  customHeadersJson?: string; // e.g. '{"Content-Type": "application/json"}'
  payloadSampleJson?: string; // template json
  status: 'active' | 'inactive' | 'testing';
  lastPingMs?: number;
  lastTestedAt?: string;
  createdAt: string;
}

export type ExtensionCategory =
  | 'browser_chrome'
  | 'adobe_photoshop'
  | 'adobe_illustrator'
  | 'blender_3d'
  | 'clo3d_fashion'
  | 'figma_design'
  | 'shopify_ecommerce'
  | 'automation_zapier_n8n';

export interface ConnectedExtension {
  id: string;
  name: string;
  shortDesc: string;
  category: ExtensionCategory;
  version: string;
  iconName: string;
  author: string;
  installGuideUrl?: string;
  downloadPackageName: string;
  pairingToken: string;
  status: 'connected' | 'not_installed' | 'update_available';
  connectedDevice?: string;
  lastSyncedAt?: string;
  features: string[];
}
