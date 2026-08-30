import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Activity,
  Cpu,
  Radio,
  ShieldAlert,
  Sliders,
  Play,
  RotateCcw,
  CheckCircle2,
  Terminal,
  Compass,
  Layers,
  Send
} from 'lucide-react';

interface JarvisVoiceCoreProps {
  onExecutePlatformAction?: (actionName: string, payload?: any) => void;
  isFloatingWidget?: boolean;
}

export const JarvisHologramVoiceCore: React.FC<JarvisVoiceCoreProps> = ({
  onExecutePlatformAction,
  isFloatingWidget = false
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [transcript, setTranscript] = useState<string>('');
  const [jarvisResponse, setJarvisResponse] = useState<string>(
    'Sistemas en línea, creador. Todos los protocolos de diseño 3D, video marketing y manufactura de Aether Synergy están sincronizados al 100% de potencia.'
  );

  const [dialogHistory, setDialogHistory] = useState<{ sender: 'user' | 'jarvis'; text: string; time: string }[]>([
    {
      sender: 'jarvis',
      text: 'J.A.R.V.I.S. Holographic Core inicializado. ¿Qué orden desea ejecutar hoy?',
      time: '08:15 AM'
    }
  ]);

  const [audioLevel, setAudioLevel] = useState<number>(45);
  const [hudRotation, setHudRotation] = useState<number>(0);
  const [textInput, setTextInput] = useState<string>('');

  // Speech Recognition Reference
  const recognitionRef = useRef<any>(null);

  // Hologram rotation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setHudRotation((prev) => (prev + 1) % 360);
      if (isSpeaking) {
        setAudioLevel(Math.floor(Math.random() * 60) + 40);
      } else if (isListening) {
        setAudioLevel(Math.floor(Math.random() * 40) + 20);
      } else {
        setAudioLevel(15);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isSpeaking, isListening]);

  // Speech Synthesis helper
  const speakJarvis = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1.05; // Sophisticated, fast JARVIS pacing
    utterance.pitch = 0.95; // Slightly deeper, resonant tone

    // Try finding a rich Spanish or English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((v) => v.lang.includes('es') || v.name.includes('Jorge') || v.name.includes('David'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // AI Command Processor
  const processJarvisCommand = (command: string) => {
    const lower = command.toLowerCase().trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setDialogHistory((prev) => [...prev, { sender: 'user', text: command, time: timeStr }]);

    let reply = '';

    if (lower.includes('hola') || lower.includes('quién eres') || lower.includes('quien eres')) {
      reply = 'Saludos, creador. Soy J.A.R.V.I.S., la inteligencia artificial cuántica de Aether Synergy. Coordino sus modelos 3D, publicidad viral, proveedores B2B y finanzas en tiempo real.';
    } else if (lower.includes('dorado') || lower.includes('cyber gold') || lower.includes('color')) {
      reply = 'Entendido. Calibrando los shaders del modelo 3D con acabado metálico Cyber Gold y reflectividad de lujo al 95%.';
      if (onExecutePlatformAction) onExecutePlatformAction('change_color', 'gold');
    } else if (lower.includes('lluvia') || lower.includes('agua') || lower.includes('clima')) {
      reply = 'Activando simulación meteorológica de lluvia y gotas hidrofóbicas sobre la membrana ripstop del tejido en el visor 3D.';
      if (onExecutePlatformAction) onExecutePlatformAction('toggle_weather');
    } else if (lower.includes('pasarela') || lower.includes('runway') || lower.includes('desfile')) {
      reply = 'Abriendo la Pasarela de Moda 3D en Vivo. Los 142 espectadores y las 5 cámaras broadcast están conectados.';
      if (onExecutePlatformAction) onExecutePlatformAction('navigate', 'runway');
    } else if (lower.includes('shopify') || lower.includes('landing') || lower.includes('tienda')) {
      reply = 'Iniciando el Creador de Landings con IA para Shopify. Prompts publicitarios y código Liquid preparados para exportación.';
      if (onExecutePlatformAction) onExecutePlatformAction('navigate', 'shopifylanding');
    } else if (lower.includes('video') || lower.includes('anuncio') || lower.includes('tiktok') || lower.includes('adgen')) {
      reply = 'Accediendo a AdGen AI Video Marketing. Los algoritmos de retención y la pista de audio están listos para renderizar.';
      if (onExecutePlatformAction) onExecutePlatformAction('navigate', 'adgen');
    } else if (lower.includes('roas') || lower.includes('campaña') || lower.includes('media buyer')) {
      reply = 'Calculando el Retorno de Inversión Publicitaria. ROAS proyectado en 5.2x con una facturación estimada de $18,400 USD.';
      if (onExecutePlatformAction) onExecutePlatformAction('navigate', 'mediabuyer');
    } else if (lower.includes('patron') || lower.includes('dxf') || lower.includes('molderia') || lower.includes('corte')) {
      reply = 'Cargando planos CAD de patronaje industrial 2D con margen de costura de 1.0cm para corte láser Gerber.';
      if (onExecutePlatformAction) onExecutePlatformAction('navigate', 'pattern2d');
    } else if (lower.includes('estado') || lower.includes('diagnostico') || lower.includes('sistema')) {
      reply = 'Diagnóstico completado: Reactor Arc operando al 100%, 6 agentes autónomos activos, latencia de 14ms y 105 hitos ejecutados con éxito.';
    } else {
      reply = `He recibido su orden: "${command}". Ejecutando optimización en el núcleo neural de Aether Synergy con máxima prioridad.`;
    }

    setJarvisResponse(reply);
    setDialogHistory((prev) => [...prev, { sender: 'jarvis', text: reply, time: timeStr }]);
    speakJarvis(reply);
  };

  // Toggle Microphone (Speech Recognition)
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Tu navegador no soporta Web Speech Recognition API. Puedes escribir tus comandos por texto abajo.');
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'es-ES';
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart = () => {
      setIsListening(true);
      setTranscript('Escuchando al creador...');
    };

    rec.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      processJarvisCommand(text);
    };

    rec.onerror = () => {
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = rec;
    rec.start();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    const cmd = textInput;
    setTextInput('');
    processJarvisCommand(cmd);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Top Cockpit Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/95 p-6 rounded-3xl border border-cyan-400/50 shadow-cyber-card backdrop-blur-2xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-widest">
                A.E.T.H.E.R. J.A.R.V.I.S. VOZ & NÚCLEO HOLOGRÁFICO
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_10px_#06b6d4]">
                ARC REACTOR V8.4
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Asistente de inteligencia artificial por voz bidireccional, reconocimiento en tiempo real y HUD holográfico Iron Man
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2.5 rounded-2xl border transition-all ${
              voiceEnabled
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-cyber-950 border-cyber-800 text-slate-500'
            }`}
            title={voiceEnabled ? 'Voz de JARVIS Activada' : 'Voz Silenciada'}
          >
            {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <button
            onClick={toggleListening}
            className={`px-5 py-2.5 rounded-2xl font-tech font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-2xl ${
              isListening
                ? 'bg-rose-500 text-white shadow-[0_0_20px_#f43f5e] animate-pulse'
                : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-black shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:opacity-90'
            }`}
          >
            {isListening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isListening ? 'ESCUCHANDO...' : 'HABLAR CON J.A.R.V.I.S.'}</span>
          </button>
        </div>
      </div>

      {/* Main Hologram Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Holographic Arc Reactor Visualizer */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-cyber-950/90 border border-cyan-500/40 shadow-cyber-card relative overflow-hidden flex flex-col items-center justify-center min-h-[440px]">
          {/* Background Futuristic Grid & Brackets */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0,transparent_70%)] pointer-events-none" />
          <div className="absolute top-4 left-4 text-[10px] font-mono text-cyan-400 opacity-60">
            [SYS_ID: JARVIS_CORE_01] • CORE_TEMP: 34.2°C
          </div>
          <div className="absolute top-4 right-4 text-[10px] font-mono text-emerald-400 opacity-80">
            NEURAL_LOAD: {audioLevel}% • UPTIME: 100%
          </div>

          {/* Central Rotating Arc Reactor HUD Rings */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Outer Cyan Ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-transform duration-75"
              style={{ transform: `rotate(${hudRotation}deg)` }}
            />

            {/* Middle Gold Geometrical Ring */}
            <div
              className="absolute inset-4 rounded-full border border-cyber-gold/50 shadow-[0_0_20px_rgba(229,169,60,0.2)] transition-transform duration-75"
              style={{ transform: `rotate(-${hudRotation * 1.5}deg)` }}
            />

            {/* Inner Segmented Ring */}
            <div
              className="absolute inset-10 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-cyan-400 border-l-transparent transition-transform duration-75"
              style={{ transform: `rotate(${hudRotation * 2}deg)` }}
            />

            {/* Central Glowing Reactor Core */}
            <div
              onClick={toggleListening}
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full cursor-pointer transition-all duration-300 flex flex-col items-center justify-center border-2 z-10 ${
                isSpeaking
                  ? 'bg-cyan-400/30 border-cyan-300 shadow-[0_0_50px_#06b6d4] scale-110'
                  : isListening
                  ? 'bg-rose-500/30 border-rose-400 shadow-[0_0_50px_#f43f5e] scale-105'
                  : 'bg-black/80 border-cyan-400/70 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105'
              }`}
            >
              <Zap className={`w-8 h-8 ${isSpeaking ? 'text-cyan-200 animate-bounce' : isListening ? 'text-rose-300' : 'text-cyan-400'}`} />
              <span className="text-[10px] font-tech font-extrabold uppercase tracking-widest text-cyan-300 mt-1">
                {isSpeaking ? 'HABLANDO' : isListening ? 'ESCUCHANDO' : 'J.A.R.V.I.S.'}
              </span>
            </div>
          </div>

          {/* Audio Wave Frequency Bars */}
          <div className="flex items-center gap-1.5 mt-6 z-10">
            {[...Array(16)].map((_, i) => {
              const barHeight = Math.max(6, (audioLevel * ((i % 4) + 1)) / 4);
              return (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-cyan-500 via-cyan-400 to-cyber-gold shadow-[0_0_8px_#06b6d4] transition-all duration-75"
                  style={{ height: `${barHeight}px` }}
                />
              );
            })}
          </div>

          {/* Quick Voice Command Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 z-10 max-w-lg">
            {[
              'JARVIS, cambia el color a dorado',
              'JARVIS, activa lluvia en 3D',
              'JARVIS, abre la pasarela',
              'JARVIS, abre creador de Shopify',
              'JARVIS, diagnóstico de sistemas'
            ].map((cmd, i) => (
              <button
                key={i}
                onClick={() => processJarvisCommand(cmd)}
                className="px-3 py-1 rounded-full bg-cyber-900/80 hover:bg-cyan-500/20 border border-cyber-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-[11px] font-mono transition-all"
              >
                "{cmd}"
              </button>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Neural Dialog Terminal */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-cyber-800 pb-3">
              <span className="font-tech font-bold text-sm text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" /> Registro de Interacción Cuántica
              </span>
              <span className="text-[10px] font-mono text-cyan-300 font-bold">ONLINE</span>
            </div>

            {/* Dialogue Log */}
            <div className="space-y-3 max-h-72 overflow-y-auto pt-3 pr-1 font-mono text-xs">
              {dialogHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border transition-all ${
                    msg.sender === 'jarvis'
                      ? 'bg-cyber-950 border-cyan-500/40 text-cyan-300'
                      : 'bg-cyber-850 border-cyber-700 text-white ml-6'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-70 mb-1">
                    <span className="font-bold uppercase tracking-wider">
                      {msg.sender === 'jarvis' ? '🤖 J.A.R.V.I.S. AI' : '👤 Creador'}
                    </span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Text Command Input Form */}
          <form onSubmit={handleManualSubmit} className="flex gap-2 pt-2 border-t border-cyber-800">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Escribe una orden para J.A.R.V.I.S. (ej: 'cambia color')..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-cyber-950 border border-cyber-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="p-2.5 rounded-2xl bg-cyan-500 text-black font-bold hover:opacity-90 shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
