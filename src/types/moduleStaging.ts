export type ModuleAvailabilityStatus = 'active' | 'coming_soon' | 'maintenance' | 'disabled';

export interface ModuleStagingConfig {
  id: string;
  name: string;
  category: string;
  categoryTitle: string;
  status: ModuleAvailabilityStatus;
  version: string;
  phase: number; // 1: MVP Lanzamiento Inicial, 2: Expansión, 3: Enterprise
  maintenanceMessage?: string;
  estimatedAvailableDate?: string;
  estimatedMaintenanceEnd?: string;
  changelogNote?: string;
  allowedRolesOverride?: string[];
}

export interface StagingCategoryConfig {
  id: string;
  title: string;
  icon: string;
  status: ModuleAvailabilityStatus;
  defaultPhase: number;
}

export type RolloutPreset = 'initial_mvp_design_only' | 'all_enabled_production' | 'maintenance_lockdown';
