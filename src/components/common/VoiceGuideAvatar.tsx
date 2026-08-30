import React, { useState, useEffect } from 'react';
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
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface VoiceGuideStep {
  title: string;
  desc: string;
  speechText: string;
  highlightId?: string;
}

export type AvatarMood = 'focused' | 'creative' | 'happy' | 'analytical';

export const VoiceGuideAvatar: React.FC<{ onNavigateToModule?: (mod: string) => void }> = ({ onNavigateToModule }) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [mood, setMood] = useState<AvatarMood>('creative');

  const guideSteps: VoiceGuideStep[] = [
    {
      title: 'Paso 1: Selecciona tu Nicho y Modelo 3D',
      desc: 'Elige entre Moda & Streetwear (chaquetas, hoodies, sneakers), Diseño de Interiores (muebles lounge) o Instrumentalización (hardware de audio).',
      speechText: 'Bienvenido a Aether Synergy. Para comenzar, selecciona tu nicho de diseño y tu modelo 3D en la barra superior del estudio.'
    },
    {
      title: 'Paso 2: Texturizado PBR & Shaders Anime',
      desc: 'Personaliza los colores de base y acento, ajusta el grosor de los bordes de tinta y elige entre Cel-Shaded o PBR Realista.',
      speechText: 'En el panel derecho puedes ajustar las propiedades del shader, cambiar entre Cel-Shaded anime y PBR hiperrealista, y añadir calcomanías personalizadas.'
    },
    {
      title: 'Paso 3: Entornos HDRi & Despiece 3D',
      desc: 'Usa las cámaras rápidas frontal, superior o isométrica, y desliza el control de despiece para ver la estructura interna.',
      speechText: 'Explora tu modelo con los controles táctiles o el ratón, prueba las diferentes cámaras de estudio y usa el deslizador de despiece para ver los componentes internos.'
    },
    {
      title: 'Paso 4: Generación de Video Ads en AdGen AI',
      desc: 'Conecta con OpenAI Sora, Runway Gen-3, Kling o Luma para crear anuncios de video 9:16 con movimientos de cámara cinemáticos.',
      speechText: 'Cuando tu modelo 3D esté listo, ve a AdGen AI para generar videos publicitarios hiperrealistas con movimientos de cámara cinematográficos.'
    },
    {
      title: 'Paso 5: Cotización y Conexión con Fábricas B2B',
      desc: 'Cotiza en tiempo real con fábricas en Portugal, Turquía, Colombia y Asia para producir tus piezas a escala.',
      speechText: 'Finalmente, conecta con nuestra red de proveedores globales verificados para cotizar y fabricar tu producción con ficha técnica 3D.'
    }
  ];

  const currentStep = guideSteps[currentStepIndex];

  // Speech Synthesis
  const speakCurrentStep = (text: string) => {
    if (!isVoiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : language === 'ja' ? 'ja-JP' : language === 'fr' ? 'fr-FR' : language === 'it' ? 'it-IT' : 'es-ES';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Speech Recognition (Microphone listening)
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('El reconocimiento de voz está soportado en navegadores Google Chrome, Brave y Edge.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'en' ? 'en-US' : 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setRecognizedText('Escuchando tu voz por el micrófono...');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedText(`"${transcript}"`);
        setIsListening(false);
        speakCurrentStep(`Entendido. Analizando tu instrucción sobre ${transcript}.`);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const handleToggleVoice = () => {
    if (isVoiceEnabled) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      setIsVoiceEnabled(false);
    } else {
      setIsVoiceEnabled(true);
      speakCurrentStep(currentStep.speechText);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < guideSteps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      speakCurrentStep(guideSteps[nextIdx].speechText);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      speakCurrentStep(guideSteps[prevIdx].speechText);
    }
  };

  const handleOpenGuide = () => {
    setIsOpen(true);
    speakCurrentStep(currentStep.speechText);
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
      {/* Floating Avatar Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
          <button
            onClick={handleOpenGuide}
            className="group flex items-center gap-2.5 p-2 pr-4 rounded-full bg-cyber-900/90 hover:bg-cyber-850 border-2 border-cyber-gold/50 shadow-gold-glow-lg transition-all backdrop-blur-xl"
          >
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-cyber-gold flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
              🦊
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-cyber-950 animate-ping" />
            </div>
            <div className="text-left">
              <div className="font-tech font-bold text-xs text-white group-hover:text-cyber-gold transition-colors flex items-center gap-1">
                <span>Kai Copiloto IA</span>
                <Sparkles className="w-3 h-3 text-cyber-gold" />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Voz & Micrófono Activo</span>
            </div>
          </button>
        </div>
      )}

      {/* Expanded Interactive Voice Guide Modal / HUD */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-full max-w-sm sm:max-w-md bg-cyber-900/95 border-2 border-cyber-gold/60 rounded-3xl p-5 shadow-gold-glow-lg backdrop-blur-2xl animate-fadeIn space-y-3.5">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-cyber-800">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-cyber-gold flex items-center justify-center text-xl shadow-gold-glow">
                🦊
                {isSpeaking && (
                  <span className="absolute -bottom-1 -right-1 text-xs animate-bounce">
                    💬
                  </span>
                )}
              </div>
              <div>
                <div className="font-tech font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Kai Copiloto & Guía de Diseño</span>
                  <div className="flex items-center gap-1 bg-cyber-950 px-2 py-0.5 rounded-full border border-cyber-800">
                    {getMoodIcon()}
                    <span className="text-[9px] font-mono text-slate-300 capitalize">{mood}</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400">Paso {currentStepIndex + 1} de {guideSteps.length}</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Mic Button */}
              <button
                onClick={toggleListening}
                className={`p-2 rounded-xl border transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white border-rose-400 animate-pulse shadow-lg'
                    : 'bg-cyber-950 text-slate-400 border-cyber-800 hover:text-white'
                }`}
                title="Hablar por Micrófono (Speech-to-Text)"
              >
                {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              {/* Voice toggle */}
              <button
                onClick={handleToggleVoice}
                className={`p-2 rounded-xl border transition-all ${
                  isVoiceEnabled
                    ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold'
                    : 'bg-cyber-950 text-slate-500 border-cyber-800'
                }`}
                title={isVoiceEnabled ? 'Silenciar Voz' : 'Activar Voz'}
              >
                {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setIsOpen(false);
                }}
                className="p-2 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mood Selector Buttons */}
          <div className="flex items-center justify-between text-[10px] bg-cyber-950 p-1 rounded-xl border border-cyber-850">
            <span className="text-slate-500 font-tech font-bold uppercase px-1">Mood:</span>
            {(['creative', 'focused', 'analytical', 'happy'] as AvatarMood[]).map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`px-2 py-0.5 rounded-lg capitalize transition-all ${
                  mood === m ? 'bg-cyber-gold text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Current Step Content */}
          <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-1.5">
            <div className="font-tech font-bold text-xs sm:text-sm text-cyber-gold flex items-center gap-1.5">
              <span>{currentStep.title}</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {currentStep.desc}
            </p>
          </div>

          {/* Recognized Voice Transcript Bar */}
          {recognizedText && (
            <div className="p-2 rounded-xl bg-cyber-950/80 border border-cyan-500/40 text-[11px] text-cyan-300 font-mono">
              🎙️ {recognizedText}
            </div>
          )}

          {/* Controls: Prev / Replay Voice / Next */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-all ${
                currentStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-cyber-800 text-slate-600'
                  : 'bg-cyber-950 border-cyber-700 text-slate-300 hover:text-white'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Anterior
            </button>

            <button
              onClick={() => speakCurrentStep(currentStep.speechText)}
              className="p-2 rounded-xl bg-cyber-950 hover:bg-cyber-850 border border-cyber-700 text-cyber-gold transition-colors"
              title="Repetir audio"
            >
              <Play className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStepIndex === guideSteps.length - 1}
              className={`px-4 py-2 rounded-xl font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition-all ${
                currentStepIndex === guideSteps.length - 1
                  ? 'bg-cyber-800 text-slate-500 cursor-not-allowed border border-cyber-700'
                  : 'bg-gradient-to-r from-cyber-gold to-amber-500 text-black shadow-gold-glow hover:opacity-90'
              }`}
            >
              <span>Siguiente</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
