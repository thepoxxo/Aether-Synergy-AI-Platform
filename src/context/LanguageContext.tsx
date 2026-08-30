import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, LanguageOption } from '../types/i18n';

export const POPULAR_LANGUAGES: LanguageOption[] = [
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸', isPopular: true },
  { code: 'en', name: 'Inglés', nativeName: 'English', flag: '🇺🇸', isPopular: true },
  { code: 'ja', name: 'Japonés', nativeName: '日本語', flag: '🇯🇵', isPopular: true },
  { code: 'it', name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹', isPopular: true },
  { code: 'fr', name: 'Francés', nativeName: 'Français', flag: '🇫🇷', isPopular: true },
  { code: 'zh', name: 'Chino', nativeName: '中文 (简体)', flag: '🇨🇳', isPopular: true },
  { code: 'de', name: 'Alemán', nativeName: 'Deutsch', flag: '🇩🇪', isPopular: true },
  { code: 'pt', name: 'Portugués', nativeName: 'Português', flag: '🇧🇷', isPopular: true },
  { code: 'ko', name: 'Coreano', nativeName: '한국어', flag: '🇰🇷', isPopular: true },
  { code: 'ru', name: 'Ruso', nativeName: 'Русский', flag: '🇷🇺', isPopular: true },
  { code: 'ar', name: 'Árabe', nativeName: 'العربية', flag: '🇸🇦', isPopular: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', isPopular: true },
  { code: 'nl', name: 'Holandés', nativeName: 'Nederlands', flag: '🇳🇱', isPopular: true },
  { code: 'tr', name: 'Turco', nativeName: 'Türkçe', flag: '🇹🇷', isPopular: true },
  { code: 'pl', name: 'Polaco', nativeName: 'Polski', flag: '🇵🇱', isPopular: true },
  { code: 'sv', name: 'Sueco', nativeName: 'Svenska', flag: '🇸🇪', isPopular: true },
];

export const ALL_WORLD_LANGUAGES: LanguageOption[] = [
  ...POPULAR_LANGUAGES,
  { code: 'el', name: 'Griego', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'he', name: 'Hebreo', nativeName: 'עברית', flag: '🇮🇱' },
  { code: 'da', name: 'Danés', nativeName: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Finlandés', nativeName: 'Suomi', flag: '🇫🇮' },
  { code: 'no', name: 'Noruego', nativeName: 'Norsk', flag: '🇳🇴' },
  { code: 'cs', name: 'Checo', nativeName: 'Čeština', flag: '🇨🇿' },
  { code: 'ro', name: 'Rumano', nativeName: 'Română', flag: '🇷🇴' },
  { code: 'hu', name: 'Húngaro', nativeName: 'Magyar', flag: '🇭🇺' },
  { code: 'uk', name: 'Ucraniano', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'id', name: 'Indonesio', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'th', name: 'Tailandés', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamita', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ms', name: 'Malayo', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'tl', name: 'Filipino / Tagalo', nativeName: 'Tagalog', flag: '🇵🇭' },
  { code: 'ca', name: 'Catalán', nativeName: 'Català', flag: '🇪🇸' },
  { code: 'eu', name: 'Vasco', nativeName: 'Euskara', flag: '🇪🇸' },
  { code: 'gl', name: 'Gallego', nativeName: 'Galego', flag: '🇪🇸' }
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  es: {
    'landing.badge': 'PLATAFORMA SAAS • IA + 3D DESIGN SUITE',
    'landing.title': 'DISEÑO Y MODA CON IA DE ÚLTIMA GENERACIÓN',
    'landing.subtitle': 'Crea mallas 3D hiperrealistas, videos virales para redes sociales, interactúa con avatares de voz y cotiza en tiempo real con fabricantes globales.',
    'landing.startFree': 'Comenzar Prueba Gratis',
    'landing.explore3d': 'Explorar Suite 3D',
    'landing.login': 'Iniciar Sesión',
    'landing.register': 'Registrarse',
    'landing.pricing': 'Precios & Planes',
    'landing.about': 'Manifiesto & Misión',

    // Hero Screen 1
    'hero.titleTop': 'EL MOTOR DEFINITIVO',
    'hero.titleBottom': 'DE MARKETING CON IA',
    'hero.subtitle': 'Transformando Mundos 3D en Campañas Cautivadoras',
    'hero.realtime': 'Datos en Tiempo Real',
    'hero.category': 'Moda & Streetwear 3D',
    'hero.followers': '+23% Seguidores',
    'hero.performance': 'Rendimiento de Campaña:',
    'hero.roi': '+189% ROI',
    'hero.tagline': 'REVOLUCIONANDO EL DISEÑO 3D & LA MODA URBANA',
    'hero.launchBtn': 'INGRESAR AL ESPACIO DE TRABAJO',
    'hero.integrated': 'MOTORES DE IA Y 3D INTEGRADOS',

    // Avantgarde Screen 2
    'avantgarde.badge': 'ESTÉTICA CEL-SHADED • DISEÑO DE VANGUARDIA',
    'avantgarde.title': 'EL FUTURO DEL STREETWEAR & HARDWARE',
    'avantgarde.desc': 'Fusionamos la precisión del modelado paramétrico con la estética cel-shaded anime, texturas PBR físicas y simulación en tiempo real.',
    'avantgarde.feature1': 'Shaders Toon Anime con Bordes de Tinta Regulables',
    'avantgarde.feature2': 'Modo Focus de Alta Densidad para Diseñadores',
    'avantgarde.feature3': 'Simulación de Iluminación de Estudio y Pasarela',
    'avantgarde.btn': 'Explorar Shaders 3D',

    // Pricing Screen 3
    'pricing.badge': 'PLANES & PRECIOS TRANSPARENTES',
    'pricing.title': 'ESCALA TU ESTUDIO DE DISEÑO',
    'pricing.subtitle': 'Desde creadores independientes hasta agencias globales de moda y producto.',
    'pricing.free': 'Free Starter',
    'pricing.freePrice': '$0',
    'pricing.freeDesc': 'Para probar el motor 3D y shaders en tiempo real.',
    'pricing.pro': 'Pro Designer',
    'pricing.proPrice': '$49',
    'pricing.proDesc': 'Para diseñadores y marcas que exportan en 4K y generan video ads.',
    'pricing.agency': 'Agencia Enterprise',
    'pricing.agencyPrice': '$149',
    'pricing.agencyDesc': 'Para agencias con equipo, conexión B2B con fábricas y Tech Packs.',
    'pricing.popular': 'MÁS POPULAR',

    // About Screen 4
    'about.badge': 'NUESTRA MISIÓN • ECOSISTEMA AETHER',
    'about.title': 'REDEFINIENDO EL CICLO DE CREACIÓN DE PRODUCTO',
    'about.desc': 'De la idea al render 3D, del video publicitario viral a la cotización con fábricas en minutos.',
    'about.pillar1': '1. Ideación & Modelado 3D',
    'about.pillar2': '2. Video Marketing con IA (Sora & Gen-3)',
    'about.pillar3': '3. Sourcing Global con Fábricas Auditadas',

    // Workspace & Sidebar
    'sidebar.title': 'Módulos del Ecosistema',
    'sidebar.aurora3d': 'Motor 3D & Shaders',
    'sidebar.scanner3d': 'Escáner 3D IA (Luma)',
    'sidebar.adgen': 'Video Marketing (AdGen)',
    'sidebar.clothify': 'Sourcing Textil (Clothify)',
    'sidebar.solesmith': 'Diseño Calzado (SoleSmith)',
    'sidebar.automo': 'Calendario Redes Sociales',
    'sidebar.suppliers': 'Proveedores Globales B2B',
    'sidebar.mascot': 'Copiloto & Mascotas',
    'sidebar.admin': 'Super Admin & Métricas',
    'sidebar.accessLevel': 'NIVEL DE ACCESO',
    'sidebar.upgradeBtn': 'MEJORAR MI PLAN',
    'aurora.layerStack': 'PILA DE CAPAS 3D',
    'aurora.layersCount': '5 Capas Activas',
    'aurora.colors': 'COLORES DEL PRODUCTO',
    'aurora.baseColor': 'Color Base Prenda',
    'aurora.accentColor': 'Color Acento & Bolsillos',
    'aurora.chromaTitle': 'Línea de Tiempo Chroma Key (Fondo Verde)',
    'aurora.seq': 'Secuencia: Giro 360° [00:15]',
    'aurora.shaderStyle': 'ESTILO DE SHADER & RENDER',
    'aurora.outlineThickness': 'Grosor de Contorno',
    'aurora.intensity': 'Intensidad',
    'aurora.shadingMode': 'Modo de Sombreado',
    'aurora.decalGraphic': 'GRÁFICO / CALCOMANÍA'
  },
  en: {
    'landing.badge': 'SAAS PLATFORM • NEXT-GEN AI + 3D DESIGN SUITE',
    'landing.title': 'AI DESIGN & FASHION FOR THE NEXT GENERATION',
    'landing.subtitle': 'Create hyper-realistic 3D meshes, viral video ads for social media, interact with voice avatars, and quote in real-time with global factories.',
    'landing.startFree': 'Start Free Trial',
    'landing.explore3d': 'Explore 3D Studio',
    'landing.login': 'Log In',
    'landing.register': 'Sign Up',
    'landing.pricing': 'Pricing & Plans',
    'landing.about': 'Manifesto & Mission',

    // Hero Screen 1
    'hero.titleTop': 'THE ULTIMATE',
    'hero.titleBottom': 'AI MARKETING ENGINE',
    'hero.subtitle': 'Transforming 3D Worlds into Captivating Campaigns',
    'hero.realtime': 'Real-time data',
    'hero.category': '3D Streetwear & Fashion',
    'hero.followers': '+23% Followers',
    'hero.performance': 'Campaign Performance:',
    'hero.roi': '+189% ROI',
    'hero.tagline': 'REVOLUTIONIZING 3D DESIGN & STREETWEAR',
    'hero.launchBtn': 'LAUNCH WORKSPACE',
    'hero.integrated': 'INTEGRATED AI & 3D ENGINES',

    // Avantgarde Screen 2
    'avantgarde.badge': 'CEL-SHADED AESTHETICS • AVANT-GARDE DESIGN',
    'avantgarde.title': 'THE FUTURE OF STREETWEAR & HARDWARE',
    'avantgarde.desc': 'We fuse the precision of parametric 3D modeling with cel-shaded anime aesthetics, physical PBR textures, and real-time cloth simulation.',
    'avantgarde.feature1': 'Toon Anime Shaders with Adjustable Ink Stroke Outlines',
    'avantgarde.feature2': 'High-Density Focus Mode for Professional Creators',
    'avantgarde.feature3': 'Studio & Runway Photorealistic Lighting Simulation',
    'avantgarde.btn': 'Explore 3D Shaders',

    // Pricing Screen 3
    'pricing.badge': 'TRANSPARENT PRICING & PLANS',
    'pricing.title': 'SCALE YOUR DESIGN STUDIO',
    'pricing.subtitle': 'From independent creators to global fashion & product design agencies.',
    'pricing.free': 'Free Starter',
    'pricing.freePrice': '$0',
    'pricing.freeDesc': 'Great for testing the 3D engine and shaders in real-time.',
    'pricing.pro': 'Pro Designer',
    'pricing.proPrice': '$49',
    'pricing.proDesc': 'For creators and brands exporting in 4K and generating video ads.',
    'pricing.agency': 'Agency Enterprise',
    'pricing.agencyPrice': '$149',
    'pricing.agencyDesc': 'For teams requiring B2B factory connections and Tech Pack PDF generation.',
    'pricing.popular': 'MOST POPULAR',

    // About Screen 4
    'about.badge': 'OUR MISSION • AETHER ECOSYSTEM',
    'about.title': 'REDEFINING THE PRODUCT CREATION LIFECYCLE',
    'about.desc': 'From concept to 3D render, from viral video ads to factory sourcing in minutes.',
    'about.pillar1': '1. 3D Ideation & Modeling',
    'about.pillar2': '2. Video Marketing with AI (Sora & Gen-3)',
    'about.pillar3': '3. Global Sourcing with Audited Factories',

    // Workspace & Sidebar
    'sidebar.title': 'Ecosystem Modules',
    'sidebar.aurora3d': '3D Engine & Shaders',
    'sidebar.scanner3d': '3D AI Scanner (Luma)',
    'sidebar.adgen': 'Video Marketing (AdGen)',
    'sidebar.clothify': 'Textile Sourcing (Clothify)',
    'sidebar.solesmith': 'Footwear Design (SoleSmith)',
    'sidebar.automo': 'Social Media Calendar',
    'sidebar.suppliers': 'Global B2B Suppliers',
    'sidebar.mascot': 'Copilot & Mascot Hub',
    'sidebar.admin': 'Super Admin & Telemetry',
    'sidebar.accessLevel': 'ACCESS TIER',
    'sidebar.upgradeBtn': 'UPGRADE PLAN',
    'aurora.layerStack': '3D LAYER STACK',
    'aurora.layersCount': '5 Active Layers',
    'aurora.colors': 'PRODUCT PALETTE',
    'aurora.baseColor': 'Base Fabric Color',
    'aurora.accentColor': 'Accent & Pocket Color',
    'aurora.chromaTitle': 'Chroma Key Timeline (Green Screen)',
    'aurora.seq': 'Sequence: 360° Spin [00:15]',
    'aurora.shaderStyle': 'SHADER STYLE & RENDER',
    'aurora.outlineThickness': 'Outline Stroke Width',
    'aurora.intensity': 'Intensity',
    'aurora.shadingMode': 'Shading Algorithm',
    'aurora.decalGraphic': 'GRAPHIC / UV DECAL'
  },
  ja: {
    'landing.badge': '次世代AIと3Dデザインスイート',
    'landing.title': '次世代AIファッション＆3Dデザイン',
    'landing.subtitle': '超リアルな3Dメッシュの作成、ソーシャルメディア向けバイラル動画の生成、音声アバターとの対話、グローバル工場との即時見積もり。',
    'landing.startFree': '無料トライアル開始',
    'landing.explore3d': '3Dスタジオを体験',
    'landing.login': 'ログイン',
    'landing.register': '新規登録',
    'landing.pricing': '料金プラン',
    'landing.about': 'マニフェスト',

    // Hero Screen 1
    'hero.titleTop': '究極の',
    'hero.titleBottom': 'AIマーケティングエンジン',
    'hero.subtitle': '3Dワールドを魅力的なキャンペーンに変革する',
    'hero.realtime': 'リアルタイムデータ',
    'hero.category': '3Dストリートウェア',
    'hero.followers': '+23% フォロワー増',
    'hero.performance': 'キャンペーン実績:',
    'hero.roi': '+189% ROI',
    'hero.tagline': '3Dデザインとストリートウェアの革命',
    'hero.launchBtn': 'ワークスペースを開く',
    'hero.integrated': '統合AI＆3Dエンジン',

    // Avantgarde Screen 2
    'avantgarde.badge': 'セルシェーディング美学 • アバンギャルド',
    'avantgarde.title': 'ストリートウェア＆ハードウェアの未来',
    'avantgarde.desc': '工業デザインの精度とアニメのセルルック、PBRテクスチャを融合。',
    'avantgarde.feature1': 'インクライン調節可能なトゥーンシェーダー',
    'avantgarde.feature2': '高密度フォーカスモード',
    'avantgarde.feature3': 'スタジオ＆ランウェイライティング',
    'avantgarde.btn': '3Dシェーダーを体験',

    // Pricing Screen 3
    'pricing.badge': '透明な料金プラン',
    'pricing.title': 'デザインスタジオをスケールアップ',
    'pricing.subtitle': 'インディーデザイナーからグローバルエージェンシーまで。',
    'pricing.free': 'Freeスターター',
    'pricing.freePrice': '$0',
    'pricing.freeDesc': '3Dエンジンとシェーダーの体験向け。',
    'pricing.pro': 'Proデザイナー',
    'pricing.proPrice': '$49',
    'pricing.proDesc': '4K書き出しと動画広告生成向け。',
    'pricing.agency': 'エンタープライズ',
    'pricing.agencyPrice': '$149',
    'pricing.agencyDesc': 'チーム利用、工場連携、Tech Pack生成。',
    'pricing.popular': '一番人気',

    // About Screen 4
    'about.badge': '私たちのミッション',
    'about.title': '製品開発サイクルを再定義する',
    'about.desc': 'アイデアから3Dレンダリング、バイラル動画から工場発注まで数分で完了。',
    'about.pillar1': '1. 3Dモデリング＆デザイン',
    'about.pillar2': '2. AI動画マーケティング (Sora & Gen-3)',
    'about.pillar3': '3. 認証済み工場とのグローバル調達',

    'sidebar.title': 'エコシステム機能',
    'sidebar.aurora3d': '3Dエンジン＆シェーダー',
    'sidebar.scanner3d': '3D AIスキャナー',
    'sidebar.adgen': '動画マーケティング (AdGen)',
    'sidebar.clothify': 'テキスタイル調達 (Clothify)',
    'sidebar.solesmith': 'フットウェアデザイン',
    'sidebar.automo': 'SNS投稿カレンダー',
    'sidebar.suppliers': 'グローバルB2Bサプライヤー',
    'sidebar.mascot': 'AIコパイロット＆マスコット',
    'sidebar.admin': 'スーパー管理者コンソール',
    'sidebar.accessLevel': 'アクセスプラン',
    'sidebar.upgradeBtn': 'プランをアップグレード'
  },
  pt: {
    'landing.badge': 'PLATAFORMA SAAS • SUÍTE DE DESIGN 3D E IA',
    'landing.title': 'DESIGN E MODA COM IA DE PRÓXIMA GERAÇÃO',
    'landing.subtitle': 'Crie malhas 3D hiper-realistas, anúncios em vídeo virais e faça cotações com fábricas globais em tempo real.',
    'landing.startFree': 'Iniciar Teste Grátis',
    'landing.explore3d': 'Explorar Estúdio 3D',
    'landing.login': 'Entrar',
    'landing.register': 'Cadastrar',
    'landing.pricing': 'Preços & Planos',
    'landing.about': 'Manifesto',

    'hero.titleTop': 'O MOTOR DEFINITIVO',
    'hero.titleBottom': 'DE MARKETING COM IA',
    'hero.subtitle': 'Transformando Mundos 3D em Campanhas Cativantes',
    'hero.realtime': 'Dados em Tempo Real',
    'hero.category': 'Moda & Streetwear 3D',
    'hero.followers': '+23% Seguidores',
    'hero.performance': 'Desempenho da Campanha:',
    'hero.roi': '+189% ROI',
    'hero.tagline': 'REVOLUCIONANDO O DESIGN 3D E O STREETWEAR',
    'hero.launchBtn': 'ENTRAR NO WORKSPACE',
    'hero.integrated': 'MOTORES DE IA E 3D INTEGRADOS',

    'avantgarde.badge': 'ESTÉTICA CEL-SHADED • DESIGN AVANÇADO',
    'avantgarde.title': 'O FUTURO DO STREETWEAR E HARDWARE',
    'avantgarde.desc': 'Combinamos a precisão do design industrial com sombreamento cel-shaded anime e simulação física de tecidos.',
    'avantgarde.btn': 'Explorar Shaders 3D',

    'pricing.badge': 'PLANOS TRANSPARENTES',
    'pricing.title': 'ESCALONE SEU ESTÚDIO',
    'pricing.subtitle': 'De criadores independentes a grandes marcas globais.',
    'pricing.free': 'Free Starter',
    'pricing.pro': 'Pro Designer',
    'pricing.agency': 'Agência Enterprise',

    'about.badge': 'NOSSA MISSÃO',
    'about.title': 'REDEFININDO O CICLO DE CRIAÇÃO',
    'about.desc': 'Do conceito ao render 3D, do anúncio viral à confecção em minutos.',

    'sidebar.title': 'Módulos do Ecossistema',
    'sidebar.aurora3d': 'Motor 3D & Shaders',
    'sidebar.scanner3d': 'Scanner 3D IA',
    'sidebar.adgen': 'Marketing em Vídeo (AdGen)',
    'sidebar.clothify': 'Sourcing Têxtil (Clothify)',
    'sidebar.solesmith': 'Design de Calçados',
    'sidebar.automo': 'Calendário de Redes Sociais',
    'sidebar.suppliers': 'Fornecedores Globais B2B',
    'sidebar.mascot': 'Copiloto & Mascotes',
    'sidebar.admin': 'Super Admin & Métricas',
    'sidebar.accessLevel': 'NÍVEL DE ACESSO',
    'sidebar.upgradeBtn': 'ATUALIZAR MEU PLANO'
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLanguageOption: LanguageOption;
  t: (key: string) => string;
  isWorldLanguageModalOpen: boolean;
  setIsWorldLanguageModalOpen: (open: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('aether_language');
      if (saved) return saved;
      // Auto-detect browser language
      if (typeof navigator !== 'undefined' && navigator.language) {
        const browserCode = navigator.language.slice(0, 2).toLowerCase();
        const found = ALL_WORLD_LANGUAGES.find((l) => l.code === browserCode);
        if (found) return found.code;
      }
      return 'es';
    } catch {
      return 'es';
    }
  });

  const [isWorldLanguageModalOpen, setIsWorldLanguageModalOpen] = useState(false);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('aether_language', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const currentLanguageOption =
    ALL_WORLD_LANGUAGES.find((l) => l.code === language) ||
    POPULAR_LANGUAGES[0];

  const t = (key: string): string => {
    // 1. Check active language
    if (TRANSLATIONS[language] && TRANSLATIONS[language][key]) {
      return TRANSLATIONS[language][key];
    }
    // 2. Fallback to English
    if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) {
      return TRANSLATIONS['en'][key];
    }
    // 3. Fallback to Spanish
    if (TRANSLATIONS['es'] && TRANSLATIONS['es'][key]) {
      return TRANSLATIONS['es'][key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLanguageOption,
        t,
        isWorldLanguageModalOpen,
        setIsWorldLanguageModalOpen
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
