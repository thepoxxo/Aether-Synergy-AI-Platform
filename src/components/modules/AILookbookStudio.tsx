import React, { useState } from 'react';
import {
  Camera,
  Sparkles,
  Download,
  Share2,
  Layers,
  MapPin,
  User,
  Sliders,
  CheckCircle2,
  ShoppingBag,
  Maximize2,
  RefreshCw,
  Image as ImageIcon,
  Sun
} from 'lucide-react';

interface LookbookPhoto {
  id: string;
  title: string;
  angle: string;
  image: string;
}

export const AILookbookStudio: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<'female' | 'male' | 'unisex'>('female');
  const [selectedEthnicity, setSelectedEthnicity] = useState<string>('asian');
  const [selectedLocation, setSelectedLocation] = useState<string>('paris');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [lightingPreset, setLightingPreset] = useState<string>('studio_flash');

  const locationPhotos: Record<string, LookbookPhoto[]> = {
    paris: [
      {
        id: 'p1',
        title: 'Toma Frontal Editorial - París Fashion Week',
        angle: 'Cuerpo Completo (Full Body)',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 'p2',
        title: 'Detalle de Textura & Cremallera',
        angle: 'Plano Medio / Detalle Pecho',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 'p3',
        title: 'Caminata Dinámica en Pasarela',
        angle: 'Travelling 3/4 Dinámico',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 'p4',
        title: 'Vista Trasera & Capucha Ergonómica',
        angle: 'Espalda & Detalles Posteriores',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80'
      }
    ],
    tokyo: [
      {
        id: 't1',
        title: 'Shibuya Crossing Neón Cyberpunk',
        angle: 'Cuerpo Completo Nocturno',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 't2',
        title: 'Primer Plano Calzado & Pantalón',
        angle: 'Close-up Textil',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 't3',
        title: 'Pose Streetwear Underground',
        angle: 'Ángulo Contrapicado 3/4',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 't4',
        title: 'Retrato de Espalda Silueta',
        angle: 'Espalda Iluminación Neón',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'
      }
    ],
    studio: [
      {
        id: 's1',
        title: 'Catálogo E-Commerce Fondo Blanco Puro',
        angle: 'Frontal E-Commerce 100% Neutro',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 's2',
        title: 'Perfil Lateral Estándar',
        angle: 'Perfil 90°',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 's3',
        title: 'Macro Detalle Costuras & Decals',
        angle: 'Macro Zoom 4K',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 's4',
        title: 'Espalda Limpia E-Commerce',
        angle: 'Posterior Neutro',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80'
      }
    ]
  };

  const currentPhotos = locationPhotos[selectedLocation] || locationPhotos.paris;

  const handleGenerateLookbook = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('¡Sesión fotográfica con modelo IA generada con éxito en resolución 4K!');
    }, 1200);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-6 rounded-3xl border border-cyber-gold/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold shadow-gold-glow">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                AI LOOKBOOK & PHOTOSHOOT STUDIO
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyber-gold/20 text-cyber-gold border border-cyber-gold/50">
                FOTOGRAFÍA HIPERREALISTA
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Monta tu prenda 3D sobre modelos humanos generados por IA en sesiones editoriales de alta costura sin costos de producción
            </p>
          </div>
        </div>

        {/* Global Download Lookbook */}
        <button
          onClick={() => alert('¡Paquete completo de Lookbook (4 Fotos 4K + Formatos E-Commerce) descargado!')}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Descargar Lookbook Completo (.ZIP 4K)</span>
        </button>
      </div>

      {/* Control Panel Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-cyber-950 p-4 rounded-3xl border border-cyber-800 text-xs">
        {/* Model Gender */}
        <div>
          <label className="font-tech font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-cyber-gold" /> Género del Modelo:
          </label>
          <div className="grid grid-cols-3 gap-1">
            {[
              { id: 'female', label: 'Femenino' },
              { id: 'male', label: 'Masculino' },
              { id: 'unisex', label: 'Unisex' }
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGender(g.id as any)}
                className={`py-2 rounded-xl font-bold transition-all text-[11px] ${
                  selectedGender === g.id
                    ? 'bg-cyber-gold text-black shadow-gold-glow'
                    : 'bg-cyber-900 border border-cyber-800 text-slate-400'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ethnicity / Persona */}
        <div>
          <label className="font-tech font-bold text-slate-300 block mb-1.5">Etnia & Estilo:</label>
          <select
            value={selectedEthnicity}
            onChange={(e) => setSelectedEthnicity(e.target.value)}
            className="w-full bg-cyber-900 border border-cyber-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyber-gold"
          >
            <option value="asian">Asiático / Tokio Editorial</option>
            <option value="caucasian">Europeo / Milán High Fashion</option>
            <option value="latino">Latino / Streetwear Vanguardia</option>
            <option value="black">Afrodescendiente / NYC Avant-Garde</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="font-tech font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Locación de la Sesión:
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full bg-cyber-900 border border-cyber-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="paris">🇫🇷 París • Pasarela Fashion Week</option>
            <option value="tokyo">🇯🇵 Tokio • Shibuya Street Neón</option>
            <option value="studio">🏢 Soho NYC • Estudio Minimalista Blanco</option>
          </select>
        </div>

        {/* Generate Button */}
        <div className="flex items-end">
          <button
            onClick={handleGenerateLookbook}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Sintetizando IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generar Lookbook IA</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4-Photo Editorial Lookbook Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {currentPhotos.map((photo, idx) => (
          <div
            key={photo.id}
            className="bg-cyber-900 border border-cyber-800 hover:border-cyber-gold/50 rounded-3xl overflow-hidden shadow-cyber-card group transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-cyber-950">
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Photo Shot Number */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-cyber-gold uppercase">
                TOMA 0{idx + 1} • {photo.angle}
              </div>

              {/* Resolution Tag */}
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-mono font-bold">
                4K HDR
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="font-tech font-bold text-xs text-white leading-snug">{photo.title}</h4>
              </div>
            </div>

            <div className="p-3.5 bg-cyber-950 flex items-center justify-between gap-2 border-t border-cyber-800">
              <button
                onClick={() => alert(`¡Toma "${photo.title}" descargada en resolución 4K!`)}
                className="flex-1 py-2 rounded-xl bg-cyber-900 hover:bg-cyber-800 border border-cyber-700 text-slate-300 hover:text-white font-tech font-bold text-[10px] uppercase flex items-center justify-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-cyber-gold" />
                <span>Descargar 4K</span>
              </button>

              <button
                onClick={() => alert('¡Foto enviada al canal de marketing de Shopify e Instagram!')}
                className="p-2 rounded-xl bg-cyber-900 hover:bg-cyber-800 border border-cyber-700 text-cyan-300"
                title="Publicar en Redes Sociales"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
