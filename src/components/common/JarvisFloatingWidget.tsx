import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Send
} from 'lucide-react';

interface JarvisFloatingWidgetProps {
  onNavigateView?: (viewId: string) => void;
}

export const JarvisFloatingWidget: React.FC<JarvisFloatingWidgetProps> = ({ onNavigateView }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [jarvisMsg, setJarvisMsg] = useState<string>(
    'Sistemas listos, creador. ¿Qué orden desea ejecutar?'
  );
  const [textInput, setTextInput] = useState<string>('');
  const recognitionRef = useRef<any>(null);

  // Speech Synthesis helper
  const speakJarvis = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1.05;
    utterance.pitch = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const processCommand = (command: string) => {
    const lower = command.toLowerCase().trim();
    let reply = '';

    if (lower.includes('hola') || lower.includes('quién eres') || lower.includes('quien eres')) {
      reply = 'Saludos, creador. Soy J.A.R.V.I.S., el asistente holográfico de Aether Synergy a sus órdenes.';
    } else if (lower.includes('pasarela') || lower.includes('runway')) {
      reply = 'Abriendo la Pasarela de Moda 3D en Vivo.';
      if (onNavigateView) onNavigateView('runway');
    } else if (lower.includes('shopify') || lower.includes('landing')) {
      reply = 'Cargando el creador de landings Shopify con IA.';
      if (onNavigateView) onNavigateView('shopifylanding');
    } else if (lower.includes('video') || lower.includes('adgen') || lower.includes('tiktok')) {
      reply = 'Accediendo a AdGen AI Video Marketing.';
      if (onNavigateView) onNavigateView('adgen');
    } else if (lower.includes('brand') || lower.includes('identidad')) {
      reply = 'Abriendo Brand Kit & Identidad Corporativa.';
      if (onNavigateView) onNavigateView('brandkit');
    } else if (lower.includes('3d') || lower.includes('estudio') || lower.includes('aurora')) {
      reply = 'Regresando a Aurora 3D Studio.';
      if (onNavigateView) onNavigateView('aurora3d');
    } else if (lower.includes('admin') || lower.includes('metricas') || lower.includes('finanzas')) {
      reply = 'Abriendo la Consola de Super Admin & Métricas.';
      if (onNavigateView) onNavigateView('admin');
    } else {
      reply = `Orden recibida: "${command}". Procesando con prioridad cuántica.`;
    }

    setJarvisMsg(reply);
    speakJarvis(reply);
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Reconocimiento de voz no soportado en este navegador.');
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'es-ES';
    rec.continuous = false;

    rec.onstart = () => setIsListening(true);
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      processCommand(text);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);

    recognitionRef.current = rec;
    rec.start();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    const cmd = textInput;
    setTextInput('');
    processCommand(cmd);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Expanded Hologram Mini Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-cyber-950/95 border-2 border-cyan-400/80 rounded-3xl p-5 shadow-[0_0_40px_rgba(6,182,212,0.4)] backdrop-blur-2xl animate-fadeIn text-white space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#06b6d4]" />
              <span className="font-tech font-extrabold text-sm tracking-wider text-cyan-300">
                J.A.R.V.I.S. HOLOGRAM COPILOT
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-500/30 font-mono text-xs text-cyan-300 min-h-[60px] flex items-center">
            {jarvisMsg}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-1.5">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Habla o escribe a JARVIS..."
              className="flex-1 px-3 py-2 rounded-xl bg-cyber-900 border border-cyber-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
            />
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-500 border-rose-400 text-white animate-pulse'
                  : 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
              }`}
            >
              {isListening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs uppercase"
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      {/* Floating Arc Reactor Orb Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) speakJarvis('A sus órdenes, creador.');
        }}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/90 border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all group relative"
        title="J.A.R.V.I.S. Asistente por Voz Holográfico"
      >
        {/* Pulsing Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/80 animate-spin group-hover:border-cyan-300" style={{ animationDuration: '8s' }} />

        {/* Central Arc Core */}
        <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-300 drop-shadow-[0_0_8px_#06b6d4]" />
      </button>
    </div>
  );
};
