export type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft_light' | 'color_dodge';

export interface PbrLayer {
  id: string;
  name: string;
  channel: 'albedo' | 'normal' | 'roughness' | 'metallic' | 'emission' | 'height' | 'decal';
  visible: boolean;
  opacity: number; // 0 to 100
  blendMode: BlendMode;
  color?: string;
  textureUrl?: string;
  isLocked?: boolean;
}

export type ActiveStudioTool =
  | 'orbit'
  | 'vector_pen'
  | 'pbr_brush'
  | 'typography'
  | 'decal_projector'
  | 'photoshop_filters'
  | 'substance_materials'
  | 'ai_inpaint'
  | 'cloth_physics'
  | 'uv_unwrapper';

export type ViewportShadingMode = 'pbr_rendered' | 'wireframe' | 'solid_clay' | 'uv_texture' | 'normal_map';

export type LightingPreset = 'studio_soft' | 'cyber_neon' | 'golden_hour' | 'darkroom_spot' | 'daylight_hdri';

export interface VectorPathBevel {
  extrusionDepth: number; // mm
  bevelRadius: number; // mm
  strokeWeight: number; // pt
  isCurvedText: boolean;
  customText: string;
  patternRepeat: 'none' | 'monogram_grid' | 'carbon_weave' | 'houndstooth' | 'stripes';
  patternScale: number;
}

export interface SubstanceMaterialPreset {
  id: string;
  name: string;
  category: 'textile' | 'leather' | 'metal' | 'polymer' | 'stone';
  roughness: number;
  metalness: number;
  bumpIntensity: number;
  subsurfaceScattering: number;
  previewColor: string;
  normalTextureName: string;
}

export interface PhotoshopColorGrade {
  exposure: number; // -100 to 100
  contrast: number; // -100 to 100
  saturation: number; // -100 to 100
  vibrance: number; // -100 to 100
  hueShift: number; // -180 to 180
  curvesTone: 'neutral' | 'high_contrast' | 'film_matte' | 'cyber_pop';
}
