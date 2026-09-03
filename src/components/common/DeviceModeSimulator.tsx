import React from 'react';
import {
  Smartphone,
  Tablet,
  Monitor,
  Cpu,
  X,
  RotateCw,
  Sliders,
  Sparkles,
  Zap
} from 'lucide-react';
import { useDeviceMode } from '../../context/DeviceModeContext';

export const DeviceModeSimulator: React.FC = () => {
  const { deviceMode, setDeviceMode } = useDeviceMode();

  if (deviceMode === 'auto' || deviceMode === 'desktop_standard' || deviceMode === 'desktop_ultrawide') {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-40 hidden sm:flex items-center gap-2 p-2 rounded-2xl bg-cyber-900/90 backdrop-blur-xl border border-cyber-gold/50 shadow-gold-glow text-xs font-mono text-white animate-fadeIn">
      <div className="flex items-center gap-1.5 px-2">
        {deviceMode === 'mobile_phone' && <Smartphone className="w-4 h-4 text-cyan-400" />}
        {deviceMode === 'tablet' && <Tablet className="w-4 h-4 text-purple-400" />}
        {deviceMode === 'android_emulator' && <Cpu className="w-4 h-4 text-emerald-400" />}
        <span className="font-tech font-bold uppercase text-[11px]">
          {deviceMode === 'mobile_phone' && '📱 Vista Móvil (PlayStore/AppStore)'}
          {deviceMode === 'tablet' && '📲 Vista Tablet / iPad'}
          {deviceMode === 'android_emulator' && '🕹️ Emulador Android 60 FPS'}
        </span>
      </div>

      <button
        onClick={() => setDeviceMode('auto')}
        className="px-2.5 py-1 rounded-xl bg-cyber-950 hover:bg-cyber-800 text-slate-300 hover:text-white border border-cyber-700 text-[10px] font-tech uppercase"
      >
        Salir a Desktop
      </button>
    </div>
  );
};
