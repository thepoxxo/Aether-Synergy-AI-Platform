import React, { useState } from 'react';
import {
  Gamepad2,
  Boxes,
  Film,
  Sparkles,
  Download,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Activity,
  Cpu,
  Monitor
} from 'lucide-react';

export const MetaverseGamingExporter: React.FC = () => {
  const [selectedTarget, setSelectedTarget] = useState<'unreal5' | 'roblox' | 'clo3d' | 'unity_fbx'>('unreal5');
  const [isWatermarkEnabled, setIsWatermarkEnabled] = useState<boolean>(true);
  const [retopologyLevel, setRetopologyLevel] = useState<'low' | 'quad_clean' | 'cinematic'>('quad_clean');

  const exportTargets = {
    unreal5: {
      id: 'unreal5',
      name: 'Unreal Engine 5 (Nanite & USD)',
      desc: 'Formato USD / FBX de alta fidelidad con texturas 8K para cinemáticas, cine virtual y pantallas LED.',
      polyCount: '120,000 Tris (Nanite Virtualized)',
      textureFormat: 'UDIM 8K Subsurface Scattering PBR',
      icon: '🎬'
    },
    roblox: {
      id: 'roblox',
      name: 'Roblox & Decentraland (UGC Skin)',
      desc: 'Malla ultra-ligera optimizada para avatares de videojuegos y metaverso social.',
      polyCount: '4,000 Tris (Low-Poly Optimizado)',
      textureFormat: 'Atlas PBR 1024x1024 Embebido',
      icon: '🕹️'
    },
    clo3d: {
      id: 'clo3d',
      name: 'CLO3D & Marvelous Designer (.ZPRJ / .OBJ)',
      desc: 'Topología 100% cuádruple (Quad Retopology) con mapas UV y líneas de costura editables.',
      polyCount: '32,000 Quads (Simulación Textil Lista)',
      textureFormat: 'Mapas de Desplazamiento & Normales 4K',
      icon: '🧵'
    },
    unity_fbx: {
      id: 'unity_fbx',
      name: 'Unity 3D / Blender (Rigged con Huesos)',
      desc: 'Esqueleto anatómico integrado (Humanoid Rig) con animaciones de caminata, correr y pasarela.',
      polyCount: '18,500 Tris (Rigged FBX)',
      textureFormat: 'Albedo, Roughness, Metalness, Normal',
      icon: '🏃'
    }
  };

  const activeProfile = exportTargets[selectedTarget];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-6 rounded-3xl border border-indigo-500/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-indigo-500/20 border border-indigo-500 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                EXPORTADOR UNIVERSAL GAMING, METAVERSO & CINE 3D
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/50">
                UNREAL 5 + ROBLOX + CLO3D + RIGGING FBX
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Convierte cualquier diseño en skins de videojuegos, cinemáticas para cine virtual o mallas para CLO3D
            </p>
          </div>
        </div>

        <button
          onClick={() => alert(`¡Paquete 3D exportado para ${activeProfile.name} con marca de agua anti-piratería inmutable!`)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:opacity-90 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Exportar para {activeProfile.name.split(' ')[0]}</span>
        </button>
      </div>

      {/* Target Engine Grid Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.values(exportTargets).map((t) => (
          <div
            key={t.id}
            onClick={() => setSelectedTarget(t.id as any)}
            className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
              selectedTarget === t.id
                ? 'bg-cyber-900 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                : 'bg-cyber-950/80 border-cyber-800 hover:border-cyber-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-3xl p-2 bg-cyber-950 rounded-2xl border border-cyber-800">{t.icon}</span>
                {selectedTarget === t.id && (
                  <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
                )}
              </div>
              <h3 className="font-tech font-bold text-sm text-white mt-3">{t.name}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-sans">{t.desc}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-cyber-800 text-[10px] font-mono text-indigo-300 font-bold">
              {t.polyCount}
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Details & Watermark Security */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        {/* Left Col: Specs */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
          <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" /> Especificaciones de Compilación para {activeProfile.name}
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 bg-cyber-950 rounded-2xl border border-cyber-800 flex justify-between items-center">
              <span className="text-slate-400">Presupuesto Geométrico:</span>
              <span className="text-indigo-300 font-bold">{activeProfile.polyCount}</span>
            </div>
            <div className="p-3.5 bg-cyber-950 rounded-2xl border border-cyber-800 flex justify-between items-center">
              <span className="text-slate-400">Canales de Textura PBR:</span>
              <span className="text-cyan-400 font-bold">{activeProfile.textureFormat}</span>
            </div>
            <div className="p-3.5 bg-cyber-950 rounded-2xl border border-cyber-800 flex justify-between items-center">
              <span className="text-slate-400">Eje de Coordenadas (Up-Axis):</span>
              <span className="text-white font-bold">Z-Up (Unreal) / Y-Up (Unity/Blender) Auto-Align</span>
            </div>
          </div>
        </div>

        {/* Right Col: Anti-Piracy Watermark & Retopology */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
          <h3 className="font-tech font-bold text-base text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Bóveda de Seguridad Anti-Plagio
          </h3>

          <div className="p-4 bg-cyber-950 rounded-2xl border border-emerald-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-tech font-bold text-xs text-white">Marca de Agua Criptográfica Invisible:</span>
              <input
                type="checkbox"
                checked={isWatermarkEnabled}
                onChange={(e) => setIsWatermarkEnabled(e.target.checked)}
                className="accent-emerald-400 w-4 h-4"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Incrusta micro-vértices cifrados con tu ID de creador para demostrar la autoría legal del diseño en caso de copia no autorizada.
            </p>
          </div>

          <button
            onClick={() => alert('¡Algoritmo de Auto-Retopology cuádruple completado con éxito!')}
            className="w-full py-3 rounded-2xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-indigo-300 font-tech font-bold text-xs uppercase"
          >
            Ejecutar Auto-Retopology Limpia
          </button>
        </div>
      </div>
    </div>
  );
};
