import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  Mic,
  MicOff,
  Smile,
  Zap,
  Target,
  BrainCircuit,
  Send,
  MessageSquare,
  Bot
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface VoiceGuideStep {
  title: string;
  desc: string;
  speechText: string;
}

export type AvatarMood = 'focused' | 'creative' | 'happy' | 'analytical';

interface ChatMessage {
  sender: 'user' | 'kai';
  text: string;
  time: string;
}

export const VoiceGuideAvatar: React.FC<{ onNavigateToModule?: (mod: string) => void }> = ({ onNavigateToModule }) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [mood, setMood] = useState<AvatarMood>('creative');
  const [micStatusText, setMicStatusText] = useState<string | null>(null);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: 'kai',
      text: '¡Hola! Soy Kai, tu copiloto inteligente de diseño 3D, video marketing y sourcing. Puedes hablarme por micrófono o escribir tu consulta.',
      time: 'Ahora'
    }
  ]);

  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const guideSteps: VoiceGuideStep[] = [
    {
      title: 'Paso 1: Selección de Nicho y Modelo 3D Base',
      desc: 'Elige entre Moda & Streetwear (chaqueta techwear, hoodie, sneaker), Diseño de Interiores (sillón nórdico, mesa) o Hardware de Audio.',
      speechText: 'Bienvenido a Aether Synergy. Para comenzar, selecciona tu nicho de diseño y tu modelo 3D en la barra superior del estudio.'
    },
    {
      title: 'Paso 2: Círculo Cromático y Versiones IA',
      desc: 'Usa el nuevo círculo cromático, ingresa códigos Hexadecimales (#E5A93C) y prueba las variantes estilísticas de IA con 1 clic.',
      speechText: 'En el panel izquierdo tienes total libertad de color con el círculo cromático y puedes alternar entre las versiones IA de tu producto.'
    },
    {
      title: 'Paso 3: Entornos HDRi & Despiece 3D',
      desc: 'Prueba la iluminación Tokyo Cyberpunk, Nordic Studio o Golden Hour, y desliza el control de despiece 3D para ver las capas internas.',
      speechText: 'Explora tu modelo con los controles táctiles, prueba la iluminación de estudio y desliza el control de despiece.'
    },
    {
      title: 'Paso 4: Video Marketing con Sora & Gen-3 en AdGen',
      desc: 'Genera anuncios en video 9:16 para TikTok y Reels con movimientos de cámara cinemáticos (FPV Drone, 360 Orbit).',
      speechText: 'En AdGen AI puedes crear videos publicitarios cinematográficos conectando con los mejores modelos de video de inteligencia artificial.'
    },
    {
      title: 'Paso 5: Sourcing Global B2B & Ficha Técnica Tech Pack',
      desc: 'Genera la ficha técnica en PDF con medidas duales (cm/pulgadas) y cotiza directo por WhatsApp con fábricas en Portugal, Turquía y Colombia.',
      speechText: 'Finalmente, conecta con nuestra red auditada de fabricantes y genera tu ficha técnica oficial para iniciar producción.'
    }
  ];

  const currentStep = guideSteps[currentStepIndex];

  // Scroll to bottom of chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isOpen]);

  // Speech Synthesis
  const speakText = (text: string) => {
    if (!isVoiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang =
        language === 'en' ? 'en-US' : language === 'ja' ? 'ja-JP' : language === 'fr' ? 'fr-FR' : language === 'it' ? 'it-IT' : language === 'pt' ? 'pt-BR' : 'es-ES';
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn(e);
      setIsSpeaking(false);
    }
  };

  // Safe & Robust Speech Recognition
  const startListening = () => {
    setMicStatusText('Iniciando micrófono...');
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    // Silence any speech synthesis first
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);

    if (!SpeechRec) {
      setMicStatusText('Navegador sin Web Speech. Usa la casilla de texto.');
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }

      const rec = new SpeechRec();
      recognitionRef.current = rec;

      rec.lang = language === 'en' ? 'en-US' : language === 'ja' ? 'ja-JP' : language === 'pt' ? 'pt-BR' : 'es-ES';
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => {
        setIsListening(true);
        setMicStatusText('🎙️ Escuchando tu voz... Habla ahora');
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        setMicStatusText(null);
        handleUserMessage(transcript);
      };

      rec.onerror = (e: any) => {
        console.warn('SpeechRecognition status:', e.error);
        setIsListening(false);
        if (e.error === 'not-allowed') {
          setMicStatusText('⚠️ Permiso de micrófono denegado. Permítelo en tu navegador o escribe abajo.');
        } else if (e.error === 'no-speech') {
          setMicStatusText('No se detectó audio. Pulsa el micro para reintentar.');
        } else {
          setMicStatusText(null);
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.start();
    } catch (err) {
      console.error('Error starting SpeechRecognition:', err);
      setIsListening(false);
      setMicStatusText('Usa la casilla de texto abajo.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    setIsListening(false);
    setMicStatusText(null);
  };

  const handleUserMessage = (msg: string) => {
    if (!msg.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Append user message
    const updatedHistory: ChatMessage[] = [...chatHistory, { sender: 'user', text: msg, time }];
    setChatHistory(updatedHistory);
    setTextInput('');

    // 2. Generate intelligent response
    let responseText = '';
    const lower = msg.toLowerCase();

    if (lower.includes('color') || lower.includes('hex') || lower.includes('paleta')) {
      responseText = 'Para ajustar los colores, abre el nuevo Círculo Cromático en el panel izquierdo o escribe directamente el código Hexadecimal (ej: #E5A93C). También puedes alternar entre las Variantes IA del producto.';
    } else if (lower.includes('shader') || lower.includes('cel') || lower.includes('pbr') || lower.includes('3d')) {
      responseText = 'Puedes presionar la tecla S en tu teclado para rotar entre los 5 shaders (Cel-Shaded, PBR, Clay, Wireframe y X-Ray) o presionar R para girar en 360 grados.';
    } else if (lower.includes('fabrica') || lower.includes('proveedor') || lower.includes('tech pack') || lower.includes('precio')) {
      responseText = 'En el módulo de Proveedores Globales B2B puedes generar tu Ficha Técnica Tech Pack con medidas duales en centímetros y pulgadas, y contactar a las fábricas de Portugal, Turquía y Colombia por WhatsApp.';
    } else if (lower.includes('video') || lower.includes('sora') || lower.includes('tiktok') || lower.includes('adgen')) {
      responseText = 'En AdGen AI puedes conectar con OpenAI Sora v2, Runway Gen-3 o Kling AI para generar comerciales cinematográficos en formato vertical 9:16 con movimientos de cámara tipo FPV Drone.';
    } else {
      responseText = `Entendido: "${msg}". Estoy a tu servicio para asistirte en modelado 3D, video marketing con IA y conexión con fabricantes globales.`;
    }

    setTimeout(() => {
      setChatHistory((prev) => [...prev, { sender: 'kai', text: responseText, time }]);
      speakText(responseText);
    }, 400);
  };

  const handleNextStep = () => {
    if (currentStepIndex < guideSteps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      speakText(guideSteps[nextIdx].speechText);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      speakText(guideSteps[prevIdx].speechText);
    }
  };

  const getMoodIcon = () => {
    switch (mood) {
      case 'focused':
        return <Target className="w-3.5 h-3.5 text-cyan-400" />;
      case 'happy':
        return <Smile className="w-3.5 h-3.5 text-amber-400" />;
      case 'analytical':
        return <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />;
      case 'creative':
      default:
        return <Zap className="w-3.5 h-3.5 text-cyber-gold" />;
    }
  };

  return (
    <>
      {/* Floating Trigger */}
      {!isOpen && (
        <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(true);
              speakText(currentStep.speechText);
            }}
            className="group flex items-center gap-2.5 p-2 pr-4 rounded-full bg-cyber-900/90 hover:bg-cyber-850 border-2 border-cyber-gold/50 shadow-gold-glow-lg transition-all backdrop-blur-xl"
          >
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-cyber-gold flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
              🦊
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-cyber-950 animate-ping" />
            </div>
            <div className="text-left">
              <div className="font-tech font-bold text-xs text-white group-hover:text-cyber-gold transition-colors flex items-center gap-1">
                <span>Kai Copiloto & Voz</span>
                <Sparkles className="w-3 h-3 text-cyber-gold" />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Micrófono & Asistente</span>
            </div>
          </button>
        </div>
      )}

      {/* Expanded Interactive Voice Guide & Chat Modal */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-6 left-4 sm:left-6 z-50 w-[92vw] sm:w-full max-w-sm sm:max-w-md bg-cyber-900/95 border-2 border-cyber-gold/60 rounded-3xl p-4 sm:p-5 shadow-gold-glow-lg backdrop-blur-2xl animate-fadeIn space-y-3 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-cyber-800">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-cyber-gold flex items-center justify-center text-xl shadow-gold-glow shrink-0">
                🦊
                {isSpeaking && (
                  <span className="absolute -bottom-1 -right-1 text-xs animate-bounce">💬</span>
                )}
              </div>
              <div>
                <div className="font-tech font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Kai Copiloto IA</span>
                  <div className="flex items-center gap-1 bg-cyber-950 px-2 py-0.5 rounded-full border border-cyber-800">
                    {getMoodIcon()}
                    <span className="text-[9px] font-mono text-slate-300 capitalize">{mood}</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400">Guía Interactiva • Paso {currentStepIndex + 1} de {guideSteps.length}</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isVoiceEnabled) {
                    window.speechSynthesis?.cancel();
                    setIsSpeaking(false);
                    setIsVoiceEnabled(false);
                  } else {
                    setIsVoiceEnabled(true);
                    speakText(currentStep.speechText);
                  }
                }}
                className={`p-2 rounded-xl border transition-all ${
                  isVoiceEnabled ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold' : 'bg-cyber-950 text-slate-500 border-cyber-800'
                }`}
                title={isVoiceEnabled ? 'Silenciar Voz' : 'Activar Voz'}
              >
                {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  window.speechSynthesis?.cancel();
                  if (recognitionRef.current) {
                    try { recognitionRef.current.abort(); } catch (_) {}
                  }
                  setIsOpen(false);
                }}
                className="p-2 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Step Banner */}
          <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-tech font-bold text-cyber-gold">{currentStep.title}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  speakText(currentStep.speechText);
                }}
                className="p-1 text-slate-400 hover:text-cyber-gold"
                title="Repetir audio del paso"
              >
                <Play className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">{currentStep.desc}</p>
          </div>

          {/* Step Navigation Bar */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-cyber-800 text-xs">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevStep();
              }}
              disabled={currentStepIndex === 0}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1 border transition-all ${
                currentStepIndex === 0 ? 'opacity-40 cursor-not-allowed border-cyber-800 text-slate-600' : 'bg-cyber-950 border-cyber-700 text-slate-300 hover:text-white'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Anterior
            </button>

            <div className="flex gap-1">
              {guideSteps.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentStepIndex ? 'bg-cyber-gold w-4' : 'bg-cyber-800'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNextStep();
              }}
              disabled={currentStepIndex === guideSteps.length - 1}
              className={`px-3 py-1.5 rounded-xl font-tech font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                currentStepIndex === guideSteps.length - 1
                  ? 'bg-cyber-800 text-slate-500 cursor-not-allowed border border-cyber-700'
                  : 'bg-cyber-gold text-black shadow-gold-glow hover:opacity-90'
              }`}
            >
              <span>Siguiente</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Live Interactive Chat Area */}
          <div className="flex-1 overflow-y-auto space-y-2 p-2.5 rounded-2xl bg-cyber-950/80 border border-cyber-800 min-h-[120px] max-h-[180px]">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 text-xs ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'kai' && (
                  <div className="w-6 h-6 rounded-full bg-cyber-gold/20 border border-cyber-gold text-cyber-gold flex items-center justify-center text-[10px] shrink-0">
                    🦊
                  </div>
                )}
                <div
                  className={`p-2.5 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-cyber-gold text-black font-semibold rounded-br-none shadow-sm'
                      : 'bg-cyber-900 border border-cyber-750 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`text-[9px] block mt-1 ${msg.sender === 'user' ? 'text-black/60' : 'text-slate-500 font-mono'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Mic Status Banner if any */}
          {micStatusText && (
            <div className="text-[10px] font-mono px-3 py-1 rounded-xl bg-cyber-950 text-amber-400 border border-amber-500/30 animate-pulse">
              {micStatusText}
            </div>
          )}

          {/* Microphone & Chat Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleUserMessage(textInput);
            }}
            className="flex items-center gap-2 pt-1"
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isListening) {
                  stopListening();
                } else {
                  startListening();
                }
              }}
              className={`p-2.5 rounded-2xl border transition-all shrink-0 ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-400 animate-pulse shadow-lg ring-4 ring-rose-500/30'
                  : 'bg-cyber-950 border-cyber-700 text-cyber-gold hover:border-cyber-gold shadow-sm'
              }`}
              title={isListening ? 'Detener micrófono' : 'Hablar por Micrófono'}
            >
              {isListening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={isListening ? '🎙️ Escuchando... habla' : 'Escribe o háblale a Kai...'}
              className="flex-1 bg-cyber-950 border border-cyber-700 focus:border-cyber-gold rounded-2xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />

            <button
              type="submit"
              disabled={!textInput.trim()}
              className={`p-2.5 rounded-2xl transition-all shrink-0 ${
                textInput.trim()
                  ? 'bg-cyber-gold text-black font-bold shadow-gold-glow'
                  : 'bg-cyber-950 border border-cyber-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
