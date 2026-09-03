import React, { useState } from 'react';
import {
  Palette,
  Type,
  Image as ImageIcon,
  Sparkles,
  Download,
  Copy,
  Check,
  Plus,
  Trash2,
  Lock,
  Tag,
  Barcode,
  Layers,
  Upload,
  RefreshCw,
  Sun,
  Box,
  ShoppingBag,
  CreditCard,
  Shirt,
  Package,
  BookOpen,
  Sliders,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Flame,
  Award
} from 'lucide-react';

export interface BrandColor {
  id: string;
  name: string;
  hex: string;
  pantone: string;
  cmyk: string;
  rgb: string;
  role: 'primary' | 'secondary' | 'accent' | 'dark' | 'light';
}

export interface FontPairing {
  name: string;
  headingFont: string;
  bodyFont: string;
  styleDesc: string;
  category: string;
}

export interface MockupPreset {
  id: string;
  title: string;
  category: string;
  icon: any;
  bgGradient: string;
}

export const BrandKitStudio: React.FC = () => {
  const [brandName, setBrandName] = useState('Aether Cyberwear Labs');
  const [brandSlogan, setBrandSlogan] = useState('Haute Couture Meets Cybernetic Parametric Engineering');
  const [brandDomain, setBrandDomain] = useState<'fashion' | 'furniture' | 'footwear' | 'bags' | 'restaurant'>('fashion');
  
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'identity_logos' | 'colors_pantone' | 'typography' | 'brand_voice' | 'mockups_3d' | 'embroidery_hangtags'>('identity_logos');

  // Colors State
  const [colors, setColors] = useState<BrandColor[]>([
    { id: '1', name: 'Cyber Gold Real', hex: '#E5A93C', pantone: 'PANTONE 123 C', cmyk: '0 / 32 / 92 / 10', rgb: '229, 169, 60', role: 'primary' },
    { id: '2', name: 'Negro Azabache Espacial', hex: '#0F172A', pantone: 'PANTONE Black 6 C', cmyk: '75 / 65 / 55 / 90', rgb: '15, 23, 42', role: 'dark' },
    { id: '3', name: 'Cyan Eléctrico Neón', hex: '#06B6D4', pantone: 'PANTONE 3115 C', cmyk: '72 / 0 / 12 / 0', rgb: '6, 182, 212', role: 'accent' },
    { id: '4', name: 'Púrpura Holográfico', hex: '#A855F7', pantone: 'PANTONE 2665 C', cmyk: '55 / 75 / 0 / 0', rgb: '168, 85, 247', role: 'secondary' },
    { id: '5', name: 'Blanco Titanio Mate', hex: '#F8FAFC', pantone: 'PANTONE 11-0601 TPG', cmyk: '0 / 0 / 0 / 2', rgb: '248, 250, 252', role: 'light' }
  ]);

  // Typography State
  const fontPairings: FontPairing[] = [
    { name: 'Futurista & High-Tech', headingFont: 'Space Grotesk', bodyFont: 'JetBrains Mono', styleDesc: 'Geométrica con terminaciones angulares, perfecta para Streetwear y Tecnología', category: 'Moda & Tech' },
    { name: 'Lujo & Editorial Avant-Garde', headingFont: 'Syne', bodyFont: 'Inter', styleDesc: 'Curvas artísticas de alto contraste combinadas con legibilidad limpia', category: 'Alta Costura' },
    { name: 'Arquitectura & Muebles Nórdicos', headingFont: 'Clash Display', bodyFont: 'Satoshi', styleDesc: 'Sólida y equilibrada con proporciones monumentales', category: 'Mobiliario & Espacios' },
    { name: 'Gourmet Sensorial & Alta Cocina', headingFont: 'Cinzel Decorative', bodyFont: 'Montserrat', styleDesc: 'Clásica refinada con remates romanos para restaurantes de autor', category: 'Gastro & Vinos' }
  ];

  const [selectedPairing, setSelectedPairing] = useState<FontPairing>(fontPairings[0]);

  // Brand Voice State
  const [brandTone, setBrandTone] = useState<'vanguard' | 'luxury' | 'urban' | 'sensory' | 'technical'>('vanguard');
  const [aiClaims, setAiClaims] = useState<string[]>([
    'Diseño sin límites físicos. Viste el futuro hoy.',
    'Ingeniería textil de precisión quirúrgica.',
    'Materiales inteligentes para mentes creativas.'
  ]);
  const [isGeneratingClaims, setIsGeneratingClaims] = useState(false);

  // Embroidery & Hangtag Settings
  const [embroideryRelief, setEmbroideryRelief] = useState<number>(3.5);
  const [embroideryThread, setEmbroideryThread] = useState<'metallic' | 'satin' | 'matte' | 'glow'>('metallic');
  const [hangtagMaterial, setHangtagMaterial] = useState<'kraft_600gsm' | 'cotton_paper' | 'acrylic_frosted'>('kraft_600gsm');
  const [foilFinish, setFoilFinish] = useState<'gold_foil' | 'holographic' | 'silver' | 'blind_deboss'>('gold_foil');

  // Copy State
  const [copiedColorHex, setCopiedColorHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColorHex(hex);
    setTimeout(() => setCopiedColorHex(null), 2500);
  };

  const handleAddColor = () => {
    const hex = prompt('Ingresa el código Hexadecimal del nuevo color (ej: #F43F5E):');
    if (!hex) return;
    const cleanHex = hex.startsWith('#') ? hex.toUpperCase() : '#' + hex.toUpperCase();
    const newColor: BrandColor = {
      id: Date.now().toString(),
      name: 'Color Personalizado ' + (colors.length + 1),
      hex: cleanHex,
      pantone: 'PANTONE Custom Lab',
      cmyk: '20 / 40 / 60 / 10',
      rgb: '200, 150, 100',
      role: 'secondary'
    };
    setColors([...colors, newColor]);
  };

  const handleDeleteColor = (id: string) => {
    if (colors.length <= 2) {
      alert('Debes mantener al menos 2 colores en el Brand Kit.');
      return;
    }
    setColors(colors.filter((c) => c.id !== id));
  };

  const handleGenerateAiClaims = async () => {
    setIsGeneratingClaims(true);
    await new Promise((r) => setTimeout(r, 1200));

    if (brandDomain === 'fashion') {
      setAiClaims([
        'Haute couture con ADN bio-paramétrico.',
        'La intersección entre la calle y el ciberespacio.',
        'Prendas diseñadas para desafiar la gravedad.'
      ]);
    } else if (brandDomain === 'furniture') {
      setAiClaims([
        'Muebles que transforman el espacio en arte habitable.',
        'Curvas de madera esculpidas por inteligencia algorítmica.',
        'Ergonomía perfecta, presencia escénica inolvidable.'
      ]);
    } else if (brandDomain === 'footwear') {
      setAiClaims([
        'Cada pisada, una declaración de estilo e impacto cero.',
        'Suelas diseñadas con física de retorno de energía.',
        'El calzado que define la estética del nuevo siglo.'
      ]);
    } else if (brandDomain === 'restaurant') {
      setAiClaims([
        'Sabores que desafían los sentidos y la memoria.',
        'Gastronomía de autor con diseño molecular.',
        'Una experiencia culinaria memorable en cada bocado.'
      ]);
    } else {
      setAiClaims([
        'Marroquinería de lujo con costuras de titanio.',
        'Elegancia atemporal que viaja contigo.',
        'Piezas icónicas hechas para durar generaciones.'
      ]);
    }

    setIsGeneratingClaims(false);
  };

  const handleExportBrandGuidelinesPDF = () => {
    alert(`¡Manual de Identidad Visual Completo descargado en PDF + Paleta Adobe .ASE!\nMarca: ${brandName}\nColores: ${colors.length} Tonos Pantone\nTipografía: ${selectedPairing.headingFont} + ${selectedPairing.bodyFont}\nMockups: 5 Soportes Listos`);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white font-mono text-xs">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/95 p-6 rounded-3xl border border-cyber-gold/50 shadow-cyber-card backdrop-blur-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 rounded-2xl bg-cyber-gold/20 border border-cyber-gold text-cyber-gold shadow-gold-glow">
            <Palette className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                BRANDKIT STUDIO & SISTEMA DE IDENTIDAD DE MARCA
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyber-gold/20 text-cyber-gold border border-cyber-gold/50">
                PRO IDENTITY OS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              ADN integral de marca: Logotipos vectoriales, paletas Pantone® PMS, parejas tipográficas, voz de marca y mockups 3D hiperrealistas.
            </p>
          </div>
        </div>

        <button
          onClick={handleExportBrandGuidelinesPDF}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-all flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Exportar Manual de Marca (.PDF + .ASE)</span>
        </button>
      </div>

      {/* Brand Identity Selector Bar */}
      <div className="p-4 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-slate-400 font-bold block text-xs">Nombre de la Marca:</label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-1.5 text-white font-tech font-bold text-sm focus:outline-none focus:border-cyber-gold w-64"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-slate-400 text-xs">Sector:</label>
          <select
            value={brandDomain}
            onChange={(e) => setBrandDomain(e.target.value as any)}
            className="bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-1.5 text-white text-xs focus:outline-none focus:border-cyber-gold"
          >
            <option value="fashion">👗 Moda & Streetwear</option>
            <option value="furniture">🪑 Muebles & Mobiliario</option>
            <option value="footwear">👟 Calzado & Sneakers</option>
            <option value="bags">👜 Bolsos & Marroquinería</option>
            <option value="restaurant">🍔 Restaurante & Gastro</option>
          </select>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-cyber-900/90 p-2 rounded-2xl border border-cyber-800">
        {[
          { id: 'identity_logos', label: 'Logotipos & Submarcas', icon: Sparkles },
          { id: 'colors_pantone', label: 'Paleta Cromática Pantone®', icon: Palette },
          { id: 'typography', label: 'Tipografía & Jerarquías', icon: Type },
          { id: 'brand_voice', label: 'Voz de Marca & Claims IA', icon: MessageSquare },
          { id: 'mockups_3d', label: 'Mockup Studio 3D', icon: ShoppingBag },
          { id: 'embroidery_hangtags', label: 'Bordados 3D & Hangtags', icon: Tag }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-cyber-gold text-black shadow-gold-glow font-extrabold'
                  : 'text-slate-400 hover:text-white bg-cyber-950/60 border border-cyber-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================
          TAB 1: LOGOTIPOS, SUBMARCAS & ISOTIPOS
          ========================================================= */}
      {activeTab === 'identity_logos' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Logo on Dark */}
            <div className="p-6 rounded-3xl bg-cyber-950 border border-cyber-gold/40 shadow-cyber-card flex flex-col justify-between space-y-4 text-center">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-cyber-gold/20 text-cyber-gold border border-cyber-gold/40 font-bold">
                  LOGO PRINCIPAL (DARK MODE)
                </span>
                <p className="text-[11px] text-slate-400">Para fondos oscuros, packaging y tiendas web</p>
              </div>

              <div className="py-10 px-4 bg-slate-950 rounded-2xl border border-cyber-800 flex flex-col items-center justify-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-cyber-gold flex items-center justify-center text-black font-tech font-black text-2xl shadow-gold-glow">
                  {brandName.substring(0, 2).toUpperCase()}
                </div>
                <h3 className="font-tech font-black text-2xl text-white tracking-widest uppercase">
                  {brandName}
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-cyber-gold uppercase">
                  STUDIO ARCHITECT
                </span>
              </div>

              <button
                onClick={() => alert('¡Logo Vectorial Primario SVG descargado!')}
                className="w-full py-2.5 rounded-xl bg-cyber-900 hover:bg-cyber-800 border border-cyber-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-cyber-gold" />
                <span>Descargar SVG / PNG 4K</span>
              </button>
            </div>

            {/* Inverted Logo on Light */}
            <div className="p-6 rounded-3xl bg-cyber-950 border border-cyber-800 shadow-cyber-card flex flex-col justify-between space-y-4 text-center">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                  LOGO INVERSO (LIGHT MODE)
                </span>
                <p className="text-[11px] text-slate-400">Para papelería blanca, facturas y bolsas de papel</p>
              </div>

              <div className="py-10 px-4 bg-slate-100 rounded-2xl border border-slate-300 flex flex-col items-center justify-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-amber-400 font-tech font-black text-2xl shadow-md">
                  {brandName.substring(0, 2).toUpperCase()}
                </div>
                <h3 className="font-tech font-black text-2xl text-slate-950 tracking-widest uppercase">
                  {brandName}
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-slate-700 uppercase">
                  STUDIO ARCHITECT
                </span>
              </div>

              <button
                onClick={() => alert('¡Logo Inverso Vectorial SVG descargado!')}
                className="w-full py-2.5 rounded-xl bg-cyber-900 hover:bg-cyber-800 border border-cyber-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Descargar SVG / PNG 4K</span>
              </button>
            </div>

            {/* Submark & Monogram Icon */}
            <div className="p-6 rounded-3xl bg-cyber-950 border border-purple-500/40 shadow-cyber-card flex flex-col justify-between space-y-4 text-center">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                  SUBMARCA & ISOTIPO / FAVICON
                </span>
                <p className="text-[11px] text-slate-400">Para botones de prendas, herrajes y perfiles sociales</p>
              </div>

              <div className="py-10 px-4 bg-gradient-to-br from-cyber-900 to-purple-950 rounded-2xl border border-purple-500/40 flex flex-col items-center justify-center space-y-3">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-purple-400 flex items-center justify-center relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-cyber-gold flex items-center justify-center text-black font-tech font-black text-xl shadow-lg">
                    {brandName.substring(0, 1).toUpperCase()}
                  </div>
                </div>
                <span className="text-xs font-mono text-purple-200 tracking-widest font-bold">
                  • EST. 2026 •
                </span>
              </div>

              <button
                onClick={() => alert('¡Isotipo y Monograma SVG descargado!')}
                className="w-full py-2.5 rounded-xl bg-cyber-900 hover:bg-cyber-800 border border-cyber-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-purple-400" />
                <span>Descargar Isotipo (.ICO + .SVG)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: PALETA PANTONE & SISTEMA CROMÁTICO
          ========================================================= */}
      {activeTab === 'colors_pantone' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900 p-4 rounded-2xl border border-cyber-800">
            <div>
              <h3 className="font-tech font-bold text-sm text-white">
                Paleta Cromática de Producción ({colors.length} Tonos Bloqueados)
              </h3>
              <p className="text-slate-400 text-[11px]">Códigos exactos para imprenta offset, serigrafía textil y tintorería industrial</p>
            </div>

            <button
              onClick={handleAddColor}
              className="px-4 py-2 rounded-xl bg-cyber-gold text-black font-tech font-bold text-xs uppercase flex items-center gap-1.5 shadow-gold-glow"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Color</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {colors.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-4 transition-all hover:border-cyber-700"
              >
                {/* Color Swatch Box */}
                <div
                  className="h-28 rounded-2xl shadow-inner border border-white/10 flex items-end p-3"
                  style={{ backgroundColor: c.hex }}
                >
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 backdrop-blur-md text-white">
                    {c.role.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-tech font-bold text-base text-white">{c.name}</h4>
                    <button
                      onClick={() => handleDeleteColor(c.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-2xl bg-cyber-950 border border-cyber-800/80 font-mono text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">HEX:</span>
                      <button
                        onClick={() => handleCopyHex(c.hex)}
                        className="text-cyber-gold font-bold hover:underline flex items-center gap-1"
                      >
                        <span>{c.hex}</span>
                        {copiedColorHex === c.hex ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">PANTONE®:</span>
                      <span className="text-white font-bold">{c.pantone}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">CMYK (Print):</span>
                      <span className="text-cyan-300">{c.cmyk}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">RGB (Pantalla):</span>
                      <span className="text-slate-300">{c.rgb}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: TIPOGRAFÍA & PAREJAS TIPOGRÁFICAS
          ========================================================= */}
      {activeTab === 'typography' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fontPairings.map((pair, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPairing(pair)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-4 shadow-cyber-card ${
                  selectedPairing.name === pair.name
                    ? 'bg-cyber-950 border-cyber-gold shadow-gold-glow'
                    : 'bg-cyber-900 border-cyber-800 hover:border-cyber-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-tech font-bold text-base text-white">{pair.name}</h4>
                    <span className="text-[10px] text-slate-400">{pair.category}</span>
                  </div>
                  {selectedPairing.name === pair.name && (
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-cyber-gold text-black shadow-sm">
                      ACTIVA
                    </span>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-cyber-900 border border-cyber-800 space-y-2">
                  <div className="text-2xl text-white font-bold tracking-tight">
                    {pair.headingFont}: Aa Bb Gg 123
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    {pair.bodyFont}: {pair.styleDesc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: VOZ DE MARCA & CLAIMS IA
          ========================================================= */}
      {activeTab === 'brand_voice' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-3xl bg-cyber-900 border border-purple-500/40 shadow-cyber-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-tech font-bold text-lg text-white">
                    MATRIZ DE VOZ DE MARCA & COPYWRITING IA
                  </h3>
                  <p className="text-slate-400 text-xs">Define el tono persuasivo de tus anuncios, etiquetas y catálogos comerciales</p>
                </div>
              </div>

              <button
                onClick={handleGenerateAiClaims}
                disabled={isGeneratingClaims}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 text-white font-tech font-bold text-xs uppercase flex items-center gap-1.5 shadow-md"
              >
                {isGeneratingClaims ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generando Claims...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Regenerar Claims con IA</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-slate-300 font-bold block">Eslogans & Claims Publicitarios Generados:</label>
              <div className="space-y-2">
                {aiClaims.map((claim, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 flex items-center justify-between text-xs text-slate-200"
                  >
                    <span>"{claim}"</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(claim);
                        alert('¡Claim copiado al portapapeles!');
                      }}
                      className="text-purple-400 hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: MOCKUP STUDIO 3D MULTI-SOPORTE
          ========================================================= */}
      {activeTab === 'mockups_3d' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Mockup 1: Shopping Bag */}
            <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-3 text-center">
              <div className="h-44 rounded-2xl bg-gradient-to-br from-amber-950/40 via-cyber-950 to-slate-950 border border-amber-500/30 flex flex-col items-center justify-center p-4 relative">
                <ShoppingBag className="w-16 h-16 text-amber-400/80 mb-2" />
                <span className="font-tech font-extrabold text-white text-base tracking-wider uppercase">
                  {brandName}
                </span>
                <span className="text-[9px] text-cyber-gold tracking-widest uppercase">
                  HAUTE COUTURE LUXURY BAG
                </span>
              </div>
              <h4 className="font-tech font-bold text-sm text-white">Bolsa Kraft de Lujo con Foil</h4>
              <button
                onClick={() => alert('¡Mockup de Bolsa Kraft 3D en alta resolución descargado!')}
                className="w-full py-2 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-xs text-slate-300 font-bold"
              >
                Descargar Mockup 4K
              </button>
            </div>

            {/* Mockup 2: Hangtag Card */}
            <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-3 text-center">
              <div className="h-44 rounded-2xl bg-gradient-to-br from-slate-900 via-cyber-950 to-slate-950 border border-cyan-500/30 flex flex-col items-center justify-center p-4 relative">
                <Tag className="w-16 h-16 text-cyan-400/80 mb-2" />
                <span className="font-tech font-extrabold text-white text-base tracking-wider uppercase">
                  {brandName}
                </span>
                <span className="text-[9px] text-cyan-300 tracking-widest uppercase">
                  PREMIUM 600 GSM HANGTAG
                </span>
              </div>
              <h4 className="font-tech font-bold text-sm text-white">Etiqueta Colgante Hangtag</h4>
              <button
                onClick={() => alert('¡Mockup de Hangtag 3D en alta resolución descargado!')}
                className="w-full py-2 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-xs text-slate-300 font-bold"
              >
                Descargar Mockup 4K
              </button>
            </div>

            {/* Mockup 3: E-Commerce Box */}
            <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-3 text-center">
              <div className="h-44 rounded-2xl bg-gradient-to-br from-purple-950/40 via-cyber-950 to-slate-950 border border-purple-500/30 flex flex-col items-center justify-center p-4 relative">
                <Package className="w-16 h-16 text-purple-400/80 mb-2" />
                <span className="font-tech font-extrabold text-white text-base tracking-wider uppercase">
                  {brandName}
                </span>
                <span className="text-[9px] text-purple-300 tracking-widest uppercase">
                  FEFCO 0427 SHIPPING BOX
                </span>
              </div>
              <h4 className="font-tech font-bold text-sm text-white">Caja Packaging E-Commerce</h4>
              <button
                onClick={() => alert('¡Mockup de Caja Packaging 3D descargado!')}
                className="w-full py-2 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-xs text-slate-300 font-bold"
              >
                Descargar Mockup 4K
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 6: BORDADOS 3D & HANGTAGS PARAMÉTRICOS
          ========================================================= */}
      {activeTab === 'embroidery_hangtags' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
          {/* Embroidery Studio */}
          <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
            <h3 className="font-tech font-bold text-sm text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyber-gold" /> Simulador de Bordado 3D de Alta Densidad
            </h3>

            <div className="p-8 rounded-2xl bg-slate-950 border border-cyber-800 flex items-center justify-center text-center">
              <div className="p-6 rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-transparent shadow-[0_0_25px_rgba(229,169,60,0.3)]">
                <h4 className="font-tech font-black text-3xl text-amber-400 tracking-widest uppercase">
                  {brandName}
                </h4>
                <span className="text-[10px] text-slate-400 font-mono tracking-widest">
                  RELIEVE {embroideryRelief}mm • HILO {embroideryThread.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Relieve de Bordado (Espuma EVA 3D):</span>
                  <span className="text-cyber-gold font-bold">{embroideryRelief} mm</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="6.0"
                  step="0.5"
                  value={embroideryRelief}
                  onChange={(e) => setEmbroideryRelief(Number(e.target.value))}
                  className="w-full accent-cyber-gold cursor-pointer"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Tipo de Hilo de Bordado:</label>
                <div className="grid grid-cols-4 gap-2 text-center font-bold">
                  {(['metallic', 'satin', 'matte', 'glow'] as const).map((th) => (
                    <button
                      key={th}
                      onClick={() => setEmbroideryThread(th)}
                      className={`py-2 rounded-xl border text-[11px] uppercase ${
                        embroideryThread === th
                          ? 'bg-cyber-gold text-black border-cyber-gold font-extrabold shadow-gold-glow'
                          : 'bg-cyber-950 border-cyber-800 text-slate-400'
                      }`}
                    >
                      {th}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hangtag Specs */}
          <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card">
            <h3 className="font-tech font-bold text-sm text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-cyan-400" /> Especificaciones de Hangtag & Etiqueta de Cartón
            </h3>

            <div className="p-6 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Material de Cartón:</span>
                <span className="text-white font-bold">Cartulina Sulfatada 600 GSM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Acabado de Estampado:</span>
                <span className="text-cyber-gold font-bold">Hot Stamping Foil Dorado</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ojalillo Metálico:</span>
                <span className="text-cyan-400 font-bold">Bronce Envejecido 4mm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cordón de Fijación:</span>
                <span className="text-purple-300 font-bold">Algodón Encerado Negro</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
