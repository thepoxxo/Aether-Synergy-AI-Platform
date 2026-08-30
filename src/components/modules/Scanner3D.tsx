import React, { useState } from 'react';
import { Scan, UploadCloud, RefreshCw, CheckCircle2, Sparkles, Box } from 'lucide-react';
import { Model3DCanvas } from '../common/Model3DCanvas';
import { useAuth } from '../../context/AuthContext';

export const Scanner3D: React.FC = () => {
  const { consumeCredit } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(68);
  const [scanType, setScanType] = useState<'sneaker' | 'hoodie' | 'interior'>('sneaker');

  const handleStartScan = () => {
    if (!consumeCredit()) return;
    setIsProcessing(true);
    setProgress(15);
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setIsProcessing(false);
          alert('¡Objeto 3D reconstruido con éxito a partir del video 360°!');
          return 100;
        }
        return p + 20;
      });
    }, 500);
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between bg-cyber-900/90 p-4 rounded-2xl border border-cyber-700/80 shadow-cyber-card">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500 text-cyan-300">
            <Scan className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-tech font-bold text-white tracking-wide">
              SYNTHESIS.AI • 3D VIDEO SCANNER & RECONSTRUCTION
            </h2>
            <p className="text-xs text-slate-400">
              Transform standard 360° smartphone video into cel-shaded 3D meshes (.glb, .obj)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Video Drop Area & Progress (6 cols - matching mockup 2/3.jpeg) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-cyber-900/90 p-6 rounded-3xl border border-cyber-800 shadow-cyber-card space-y-5">
            <div className="flex items-center justify-between">
              <span className="font-tech font-bold text-sm text-white">Sneaker Recon (Project #894)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-950 text-cyber-gold border border-cyber-700">
                .glb, .obj | Cel-Shaded Style
              </span>
            </div>

            {/* Drag and Drop Zone */}
            <div
              onClick={handleStartScan}
              className="border-2 border-dashed border-cyber-gold/40 hover:border-cyber-gold rounded-3xl p-8 bg-cyber-950/80 text-center cursor-pointer group transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-cyber-900 border border-cyber-700 flex items-center justify-center mx-auto mb-3 text-cyber-gold group-hover:scale-110 shadow-gold-glow transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div className="font-tech font-bold text-base text-white">
                DRAG & DROP OR CLICK TO UPLOAD 360 VIDEO
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Supports MP4, MOV, ProRes (Up to 4K / 60fps)
              </p>
              <button className="mt-4 px-5 py-2 rounded-xl bg-cyber-gold text-black font-tech font-bold text-xs uppercase shadow-gold-glow">
                {isProcessing ? 'Procesando Malla...' : 'Generar Objeto 3D'}
              </button>
            </div>

            {/* Reconstruction Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Reconstructing & Converting to Cel-Shaded 3D Mesh (Step 3/5)...</span>
                <span className="text-cyber-gold font-bold">{progress}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-cyber-950 border border-cyber-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyber-gold to-amber-400 transition-all duration-300 shadow-gold-glow"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">UPLOADING 10.4 GB...</div>
            </div>
          </div>
        </div>

        {/* Right: 3D Model Preview (6 cols - matching mockup 2/3.jpeg) */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <div className="h-[460px] w-full">
            <Model3DCanvas type="sneaker" primaryColor="#1E293B" accentColor="#E5A93C" autoRotate={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
