import React, { useState } from 'react';
import {
  Smartphone,
  X,
  RotateCcw,
  Sparkles,
  Layers,
  Box,
  Radio,
  Scissors,
  Globe2,
  Award
} from 'lucide-react';
import { useDeviceMode } from '../../context/DeviceModeContext';
import { MobileAurora3D } from '../mobile/MobileAurora3D';
import { AetherReelsTikTok } from '../modules/AetherReelsTikTok';
import { PatternCutting2D } from '../modules/PatternCutting2D';
import { GlobalSuppliers } from '../modules/GlobalSuppliers';
import { ExpertConsultationsHub } from '../modules/ExpertConsultationsHub';

export const DeviceModeSimulator: React.FC = () => {
  const { isSimulatorModalOpen, setIsSimulatorModalOpen, hapticFeedback } = useDeviceMode();
  const [activeMobileTab, setActiveMobileTab] = useState<'3d' | 'shorts' | 'patterns' | 'sourcing' | 'experts'>('3d');

  if (!isSimulatorModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      {/* Phone Mockup Frame (iPhone 16 Pro / Android Flagship) */}
      <div className="relative w-full max-w-[400px] h-[820px] bg-black rounded-[50px] border-[6px] border-stone-800 shadow-[0_0_80px_rgba(229,169,60,0.3)] flex flex-col overflow-hidden animate-scaleUp">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-between px-2.5 border border-stone-800">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-700" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>

        {/* Close Simulator Floating Button */}
        <button
          onClick={() => setIsSimulatorModalOpen(false)}
          className="absolute top-3 right-4 z-50 p-1.5 rounded-full bg-cyber-900/80 text-slate-300 hover:text-white border border-cyber-700"
          title="Cerrar Simulador"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mobile App Header */}
        <div className="pt-8 pb-2 px-4 bg-cyber-950/95 border-b border-cyber-900 flex items-center justify-between z-40">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyber-gold flex items-center justify-center text-black font-tech font-bold text-xs">
              A
            </div>
            <span className="font-tech font-bold text-xs text-white">AETHER SYNERGY APP</span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
            60 FPS
          </span>
        </div>

        {/* Mobile Viewport Screen Content */}
        <div className="flex-1 overflow-y-auto bg-cyber-950">
          {activeMobileTab === '3d' && <MobileAurora3D />}
          {activeMobileTab === 'shorts' && <AetherReelsTikTok />}
          {activeMobileTab === 'patterns' && <PatternCutting2D />}
          {activeMobileTab === 'sourcing' && <GlobalSuppliers />}
          {activeMobileTab === 'experts' && <ExpertConsultationsHub />}
        </div>

        {/* Mobile Bottom Dock Tabs */}
        <div className="py-2 px-3 bg-cyber-950 border-t border-cyber-900 flex items-center justify-around z-40">
          {[
            { id: '3d', label: 'Estudio 3D', icon: Box },
            { id: 'shorts', label: 'Poxxi 3D', icon: Radio },
            { id: 'patterns', label: 'Patrones', icon: Scissors },
            { id: 'sourcing', label: 'Sourcing', icon: Globe2 },
            { id: 'experts', label: 'Expertos', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeMobileTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  hapticFeedback();
                  setActiveMobileTab(tab.id as any);
                }}
                className={`flex flex-col items-center gap-0.5 text-[9px] font-tech font-bold transition-all ${
                  isSelected ? 'text-cyber-gold scale-105' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-cyber-gold/20 text-cyber-gold' : ''}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Home Bar Indicator (iOS / Android) */}
        <div className="pb-1.5 pt-0.5 flex justify-center bg-cyber-950">
          <div className="w-32 h-1 rounded-full bg-stone-700" />
        </div>
      </div>
    </div>
  );
};
