export type NodeType =
  | 'trigger_webhook'
  | 'trigger_cron'
  | 'trigger_event'
  | 'ai_gemini_vision'
  | 'ai_tripo_3d'
  | 'ai_runway_video'
  | 'ai_suno_music'
  | 'ai_elevenlabs_voice'
  | 'ai_flux_image'
  | 'logic_filter'
  | 'logic_router'
  | 'logic_js_code'
  | 'action_shopify'
  | 'action_tiktok_ads'
  | 'action_discord'
  | 'action_email_b2b'
  | 'action_supabase_db'
  | 'action_n8n_webhook';

export type NodeCategory = 'trigger' | 'ai_engine' | 'logic' | 'action' | 'output';

export interface WorkflowNode {
  id: string;
  type: NodeType;
  name: string;
  category: NodeCategory;
  icon: string;
  description: string;
  position: { x: number; y: number };
  status: 'idle' | 'running' | 'success' | 'error';
  lastRunTime?: string;
  executionDurationMs?: number;
  config: Record<string, any>;
  outputSample?: any;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface WorkflowExecutionLog {
  id: string;
  nodeId: string;
  nodeName: string;
  timestamp: string;
  status: 'success' | 'error' | 'info';
  durationMs: number;
  message: string;
  dataPayload?: any;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  tags: string[];
  isActive: boolean;
  totalExecutions: number;
  successRate: number;
  avgDurationSec: number;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  webhookUrl?: string;
  cronSchedule?: string;
}
