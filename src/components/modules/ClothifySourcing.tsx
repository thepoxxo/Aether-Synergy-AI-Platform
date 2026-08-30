import React, { useState } from 'react';
import { Shirt, Sparkles, Send, Bot, ExternalLink, DollarSign, Package, Layers, CheckCircle2 } from 'lucide-react';
import { Model3DCanvas } from '../common/Model3DCanvas';
import { useAuth } from '../../context/AuthContext';

export const ClothifySourcing: React.FC = () => {
  const { consumeCredit } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'kai',
      text: '¡Hola! El diseño "Viper Tech Jacket V4" se ve increíble. ¿Listo para analizar el aprovisionamiento (sourcing) de telas y herrajes?',
      time: '14:30'
    },
    {
      sender: 'user',
      text: 'Sí, revisemos las opciones de algodón pesado y cremalleras impermeables YKK.',
      time: '14:31'
    },
    {
      sender: 'kai',
      text: 'Análisis completado: Recomiendo Heavyweight Cotton de 400gsm (95% algodón / 5% spandex) y herrajes YKK Global portal con MOQ de 1,000 unidades. Costo estimado: $7.25 USD por unidad.',
      time: '14:32'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setInputMsg('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText, time: 'Ahora' }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'kai',
          text: `Entendido. He actualizado las especificaciones técnicas para "${userText}". El Tech Pack ha sincronizado la cotización en tiempo real.`,
          time: 'Ahora'
        }
      ]);
    }, 1000);
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between bg-cyber-900/90 p-4 rounded-2xl border border-cyber-700/80 shadow-cyber-card">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500 text-amber-300">
            <Shirt className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-tech font-bold text-white tracking-wide">
              CLOTHIFY • AI TECH PACK & SOURCING
            </h2>
            <p className="text-xs text-slate-400">
              Project: <span className="text-cyber-gold font-mono">Viper Tech Jacket V4</span> | Copilot: Kai AI (Material Specialist)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: 3D Technical Viewer with Interactive Callouts (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="relative h-[480px] w-full rounded-3xl overflow-hidden border border-cyber-700">
            <Model3DCanvas type="hoodie" primaryColor="#111827" accentColor="#E5A93C" autoRotate={false} />

            {/* Interactive Callout Badges floating over the 3D canvas (matching mockup 2/4.jpeg) */}
            <div className="absolute top-6 right-6 z-20 max-w-xs space-y-3 pointer-events-auto">
              {/* Callout 1: Fabric */}
              <div className="glass-panel p-3 rounded-xl border-cyber-gold/40 shadow-lg text-xs">
                <div className="flex items-center gap-1.5 text-cyber-gold font-bold uppercase text-[10px]">
                  <Layers className="w-3.5 h-3.5" /> Recommended Fabric:
                </div>
                <div className="font-tech font-bold text-white text-sm mt-0.5">Heavyweight Cotton</div>
                <div className="text-[11px] text-slate-300">
                  • 400gsm<br />
                  • 95% Cotton / 5% Spandex<br />
                  • Durable Tech Coating
                </div>
              </div>

              {/* Callout 2: Zipper */}
              <div className="glass-panel p-3 rounded-xl border-cyber-gold/40 shadow-lg text-xs">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase text-[10px]">
                  <Package className="w-3.5 h-3.5" /> Zipper Sourcing:
                </div>
                <div className="font-tech font-bold text-white text-sm mt-0.5">Global Supplier Link</div>
                <div className="text-[11px] text-slate-300">
                  • YKK Global portal<br />
                  • MOQ: 1,000 units
                </div>
                <a href="#" className="inline-flex items-center gap-1 text-[10px] text-cyber-gold font-bold mt-1 hover:underline">
                  <span>Live Link Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Callout 3: Estimated Cost */}
              <div className="glass-panel p-3 rounded-xl border-emerald-500/40 shadow-lg text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase text-[10px]">
                  <DollarSign className="w-3.5 h-3.5" /> Estimated Hardware Cost:
                </div>
                <div className="font-tech font-bold text-emerald-300 text-base mt-0.5">$7.25 USD / unit</div>
                <div className="text-[10px] text-slate-400">Covers snaps, buckles & adjustments</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Kai AI Copilot Chat (5 cols - matching mockup 2/4.jpeg) */}
        <div className="lg:col-span-5 flex flex-col bg-cyber-900/90 rounded-3xl border border-cyber-800 shadow-cyber-card overflow-hidden">
          {/* Kai Chat Header */}
          <div className="p-4 bg-cyber-950 border-b border-cyber-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xl shadow-md border border-purple-300">
                  👧
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-cyber-950" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-white text-base">KAI AI COPILOT</h3>
                <span className="text-[10px] text-cyber-gold font-mono">Expertise: Sourcing & Fabric Specs</span>
              </div>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[380px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-cyber-gold text-black font-medium shadow-gold-glow'
                      : 'bg-cyber-950 border border-cyber-800 text-slate-200 shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-3 bg-cyber-950 border-t border-cyber-800 flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Pregunta a Kai sobre telas, proveedores o costos..."
              className="flex-1 bg-cyber-900 border border-cyber-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyber-gold"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-cyber-gold text-black shadow-gold-glow hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
