import React, { useState } from 'react';
import {
  Monitor,
  Smartphone,
  Tablet,
  Cpu,
  Zap,
  Activity,
  Maximize2,
  Minus,
  X,
  Sliders,
  Sparkles,
  Search
} from 'lucide-react';
import { useDeviceMode, DeviceMode } from '../../context/DeviceModeContext';

export const DesktopWindowHeader: React.FC = () => {
  const { deviceMode, setDeviceMode, performanceProfile, setPerformanceProfile } = useDeviceMode();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="hidden lg:flex items-center justify-between px-4 py-1.5 bg-cyber-950 border-b border-cyber-900 text-slate-400 font-mono text-[11px] select-none">
      {/* Left: Window OS Controls (macOS/Windows style) */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:opacity-100 cursor-pointer shadow-sm" title="Cerrar Ventana" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:opacity-100 cursor-pointer shadow-sm" title="Minimizar" />
          <span onClick={toggleFullscreen} className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-100 cursor-pointer shadow-sm" title="Pantalla Completa" />
        </div>
        <span className="text-slate-500">•</span>
        <span className="text-slate-300 font-tech font-bold tracking-wider">
          AETHER SYNERGY DESKTOP WORKSPACE • V2.5.0 PRO
        </span>
      </div>

      {/* Center: Device Mode Viewport Switcher */}
      <div className="flex items-center gap-1 bg-cyber-900/80 px-2 py-0.5 rounded-xl border border-cyber-800">
        <span className="text-[10px] text-slate-500 mr-1 font-tech uppercase">Simulador Vista:</span>
        
        <button
          onClick={() => setDeviceMode('auto')}
          className={`px-2 py-0.5 rounded-lg text-[10px] transition-all ${
            deviceMode === 'auto' ? 'bg-cyber-gold text-black font-bold' : 'text-slate-400 hover:text-white'
          }`}
          title="Modo Automático según resolución de pantalla"
        >
          Auto
        </button>

        <button
          onClick={() => setDeviceMode('desktop_ultrawide')}
          className={`px-2 py-0.5 rounded-lg text-[10px] flex items-center gap-1 transition-all ${
            deviceMode === 'desktop_ultrawide' ? 'bg-cyber-gold text-black font-bold' : 'text-slate-400 hover:text-white'
          }`}
          title="Escritorio 4K / Ultrawide Studio"
        >
          <Monitor className="w-3 h-3" />
          <span>4K Studio</span>
        </button>

        <button
          onClick={() => setDeviceMode('tablet')}
          className={`px-2 py-0.5 rounded-lg text-[10px] flex items-center gap-1 transition-all ${
            deviceMode === 'tablet' ? 'bg-cyber-gold text-black font-bold' : 'text-slate-400 hover:text-white'
          }`}
          title="Tablet / iPad Pro"
        >
          <Tablet className="w-3 h-3" />
          <span>Tablet</span>
        </button>

        <button
          onClick={() => setDeviceMode('mobile_phone')}
          className={`px-2 py-0.5 rounded-lg text-[10px] flex items-center gap-1 transition-all ${
            deviceMode === 'mobile_phone' ? 'bg-cyber-gold text-black font-bold' : 'text-slate-400 hover:text-white'
          }`}
          title="Smartphone (PlayStore / AppStore Mobile Mode)"
        >
          <Smartphone className="w-3 h-3" />
          <span>Móvil App</span>
        </button>

        <button
          onClick={() => setDeviceMode('android_emulator')}
          className={`px-2 py-0.5 rounded-lg text-[10px] flex items-center gap-1 transition-all ${
            deviceMode === 'android_emulator' ? 'bg-cyber-gold text-black font-bold' : 'text-slate-400 hover:text-white'
          }`}
          title="Emulador Android (BlueStacks / Nox 60 FPS)"
        >
          <Cpu className="w-3 h-3" />
          <span>Emulador</span>
        </button>
      </div>

      {/* Right: Hardware & GPU Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>WebGPU HW-Accelerated (60 FPS)</span>
        </div>
        <span className="text-slate-600">|</span>
        <button
          onClick={toggleFullscreen}
          className="p-1 text-slate-400 hover:text-white transition-colors"
          title="Alternar Pantalla Completa (F11)"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
