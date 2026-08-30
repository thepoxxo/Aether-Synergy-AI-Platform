import React, { useState } from 'react';
import { Sparkles, MessageSquare, Send, Heart, Award, Shield, Palette, Layers, Wand2, Zap, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SynthetixMascot: React.FC = () => {
  const { t } = useLanguage();

  // Customization States
  const [headgear, setHeadgear] = useState('headphones');
  const [outfit, setOutfit] = useState('tactical_vest');
  const [handItem, setHandItem] = useState('tablet');
  const [aura, setAura] = useState('gears');
  const [mascotName, setMascotName] = useState('Kai Cyber-Fox');

  // Interactive AI Assistant Chat
  const [messages, setMessages] = useState([
    {
      sender: 'kai',
      text: '¡Hola diseñador! Soy Kai, tu copiloto 3D y asesor de sourcing. ¿Qué prenda o producto estamos creando hoy? Puedo ayudarte con paletas de color, especificaciones de tela o cálculo de cotizaciones.'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '¡Excelente idea! Para ese concepto te sugiero utilizar French Terry de 460 GSM con costuras planas y un estampado reflectivo 3M en las mangas. Ya tengo listo el modelo 3D en el visor.';
      if (userMsg.toLowerCase().includes('precio') || userMsg.toLowerCase().includes('costo')) {
        reply = 'Basado en nuestras fábricas en Portugal y Colombia, fabricar 200 unidades te costaría aproximadamente $18.50 USD por unidad, con un tiempo de entrega de 18 días.';
      } else if (userMsg.toLowerCase().includes('color') || userMsg.toLowerCase().includes('paleta')) {
        reply = 'Te recomiendo una paleta Cyberpunk Luxury: Negro carbón (#0F172A), Dorado ámbar (#E5A93C) y toques de Cian neón (#38BDF8) para los acentos reflectivos.';
      }

      setMessages((prev) => [...prev, { sender: 'kai', text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  const headgearOptions = [
    { id: 'headphones', name: 'Auriculares Cyber Gold', emoji: '🎧' },
    { id: 'tech_cap', name: 'Gorra Táctica Techwear', emoji: '🧢' },
    { id: 'vr_glasses', name: 'Visor VR Holográfico', emoji: '🥽' },
    { id: 'horns', name: 'Cuernos Mech Neón', emoji: '⚡' }
  ];

  const outfitOptions = [
    { id: 'tactical_vest', name: 'Chaleco Táctico Modular', emoji: '🦺' },
    { id: 'hoodie', name: 'Hoodie Oversized Dragon', emoji: '🧥' },
    { id: 'cyber_jacket', name: 'Bomber Reflectiva 3M', emoji: '🥋' },
    { id: 'cape', name: 'Capa Holográfica Neon', emoji: '✨' }
  ];

  const handItemOptions = [
    { id: 'tablet', name: 'Tableta de Diseño 3D', emoji: '📱' },
    { id: 'spray', name: 'Lata Spray de Grafiti', emoji: '🎨' },
    { id: 'synth_mini', name: 'Sintetizador Portátil', emoji: '🎹' },
    { id: 'coffee', name: 'Termo Café Merch', emoji: '☕' }
  ];

  const auraOptions = [
    { id: 'gears', name: 'Engranajes Dorados', effect: 'animate-spin' },
    { id: 'particles', name: 'Partículas Cyberpunk', effect: 'animate-pulse' },
    { id: 'lightning', name: 'Rayos Eléctricos Neón', effect: 'animate-bounce' },
    { id: 'zen', name: 'Aura Zen Estelar', effect: '' }
  ];

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn transition-colors">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900 p-4 rounded-2xl border border-cyber-gold/40 shadow-cyber-card">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-tech font-bold text-white tracking-wide">
                SYNTHETIX MASCOT & AI DESIGN COPILOT
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyber-800 text-cyber-gold border border-cyber-700">
                HABITAT 3D v2.5
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Personaliza tu mascota y asistente de inteligencia artificial para diseño, patronaje y cotizaciones
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Mascot Avatar Studio (Left) + AI Copilot Chat (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Mascot Avatar Customization Stage */}
        <div className="lg:col-span-6 space-y-4">
          {/* Avatar Visual Showcase */}
          <div className="relative rounded-3xl bg-gradient-to-b from-cyber-900 to-cyber-950 border-2 border-cyber-gold/50 shadow-gold-glow-lg p-8 flex flex-col items-center justify-center overflow-hidden min-h-[380px]">
            {/* Background Aura Lighting */}
            <div className="absolute w-72 h-72 bg-cyber-gold/15 rounded-full blur-3xl pointer-events-none" />

            {/* Glowing Aura Ring */}
            <div className="relative z-10 w-48 h-48 rounded-full border-2 border-cyber-gold/60 shadow-gold-glow flex items-center justify-center bg-cyber-950/80 mb-4">
              {/* Mascot Main Face & Body */}
              <div className="text-7xl select-none animate-bounce">
                🦊
              </div>

              {/* Equipped Headgear Floating Badge */}
              <div className="absolute -top-3 -right-2 text-3xl p-1.5 rounded-full bg-cyber-900 border border-cyber-gold shadow-md">
                {headgearOptions.find((h) => h.id === headgear)?.emoji}
              </div>

              {/* Equipped Hand Item Badge */}
              <div className="absolute -bottom-2 -left-2 text-3xl p-1.5 rounded-full bg-cyber-900 border border-cyber-gold shadow-md">
                {handItemOptions.find((h) => h.id === handItem)?.emoji}
              </div>

              {/* Equipped Outfit Badge */}
              <div className="absolute -bottom-2 -right-2 text-3xl p-1.5 rounded-full bg-cyber-900 border border-cyan-400 shadow-md">
                {outfitOptions.find((o) => o.id === outfit)?.emoji}
              </div>
            </div>

            <div className="relative z-10 text-center space-y-1">
              <h3 className="font-tech font-extrabold text-2xl text-white">{mascotName}</h3>
              <div className="flex items-center justify-center gap-2 text-xs text-cyber-gold font-mono">
                <span>Nivel 42 Expert Copilot</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-rose-400 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-rose-400" /> 100% Lealtad
                </span>
              </div>
            </div>
          </div>

          {/* Accessory Selector Tabs */}
          <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-4 text-xs">
            {/* 1. Headgear */}
            <div>
              <label className="text-slate-300 font-bold uppercase tracking-wider block mb-2">
                Accesorios de Cabeza:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {headgearOptions.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setHeadgear(h.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      headgear === h.id
                        ? 'bg-cyber-gold text-black border-cyber-gold font-bold shadow-gold-glow'
                        : 'bg-cyber-950 border-cyber-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="text-xl mb-1">{h.emoji}</div>
                    <div className="text-[10px] truncate">{h.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Outfit */}
            <div>
              <label className="text-slate-300 font-bold uppercase tracking-wider block mb-2">
                Prendas & Ropa 3D:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {outfitOptions.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setOutfit(o.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      outfit === o.id
                        ? 'bg-cyber-gold text-black border-cyber-gold font-bold shadow-gold-glow'
                        : 'bg-cyber-950 border-cyber-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="text-xl mb-1">{o.emoji}</div>
                    <div className="text-[10px] truncate">{o.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Hand Item */}
            <div>
              <label className="text-slate-300 font-bold uppercase tracking-wider block mb-2">
                Accesorios en Mano:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {handItemOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setHandItem(item.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      handItem === item.id
                        ? 'bg-cyber-gold text-black border-cyber-gold font-bold shadow-gold-glow'
                        : 'bg-cyber-950 border-cyber-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="text-xl mb-1">{item.emoji}</div>
                    <div className="text-[10px] truncate">{item.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive AI Design Copilot Chat */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl bg-cyber-900 border border-cyber-gold/40 shadow-cyber-card p-5 flex flex-col h-[580px] justify-between">
            {/* Chat Header */}
            <div className="flex items-center justify-between pb-3 border-b border-cyber-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyber-gold/20 border border-cyber-gold flex items-center justify-center text-lg">
                  🦊
                </div>
                <div>
                  <div className="font-tech font-bold text-sm text-white">Kai Asistente IA 3D</div>
                  <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online & Listo para Asistir
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMessages([{ sender: 'kai', text: 'Chat reiniciado. ¿En qué nuevo diseño te gustaría trabajar?' }])}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-cyber-800 rounded-lg transition-colors"
                title="Reiniciar conversación"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto space-y-3 py-4 pr-1 text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cyber-gold text-black font-semibold rounded-br-none shadow-gold-glow'
                        : 'bg-cyber-950 text-slate-200 border border-cyber-800 rounded-bl-none shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-cyber-950 text-cyber-gold p-3 rounded-2xl border border-cyber-800 flex items-center gap-1 text-[11px] font-mono">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-100">●</span>
                    <span className="animate-bounce delay-200">●</span>
                    <span className="ml-1.5">Kai está analizando patrones...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestion Chips */}
            <div className="flex flex-wrap gap-1.5 pb-2 text-[11px]">
              <button
                onClick={() => setInputMessage('¿Cuál es la mejor tela para un hoodie pesado?')}
                className="px-2.5 py-1 rounded-lg bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-slate-300 transition-colors"
              >
                👕 Telas para Hoodie
              </button>
              <button
                onClick={() => setInputMessage('Recomiéndame una paleta de colores Cyberpunk')}
                className="px-2.5 py-1 rounded-lg bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-slate-300 transition-colors"
              >
                🎨 Paleta Cyberpunk
              </button>
              <button
                onClick={() => setInputMessage('¿Cuánto cuesta fabricar 500 unidades?')}
                className="px-2.5 py-1 rounded-lg bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-slate-300 transition-colors"
              >
                💰 Cotizar 500 pcs
              </button>
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Pregúntale a Kai sobre patronaje, colores o costos..."
                className="flex-1 bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyber-gold shadow-sm"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyber-gold to-amber-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
