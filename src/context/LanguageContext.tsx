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
    'sidebar.upgradeBtn': 'プランをアップグレード',
    'aurora.layerStack': '3Dレイヤースタック',
    'aurora.layersCount': '5つのアクティブレイヤー',
    'aurora.colors': '製品カラーパレット',
    'aurora.baseColor': 'ベース生地カラー',
    'aurora.accentColor': 'アクセントカラー',
    'aurora.chromaTitle': 'クロマキータイムライン',
    'aurora.seq': 'シーケンス: 360°回転 [00:15]',
    'aurora.shaderStyle': 'シェーダースタイル',
    'aurora.outlineThickness': '輪郭線の太さ',
    'aurora.intensity': '強度',
    'aurora.shadingMode': 'シェーディングモード',
    'aurora.decalGraphic': 'グラフィック / デカール'
  },
  it: {
    'landing.badge': 'SUITE SAAS • DESIGN 3D + AI AVANZATA',
    'landing.title': 'DESIGN E MODA CON IA DI NUOVA GENERAZIONE',
    'landing.subtitle': 'Crea modelli 3D iperrealistici, video virali, interagisci con avatar vocali e quota con fornitori globali in tempo reale.',
    'landing.startFree': 'Inizia Prova Gratuita',
    'landing.explore3d': 'Esplora Studio 3D',
    'landing.login': 'Accedi',
    'landing.register': 'Registrati',
    'landing.pricing': 'Piani & Prezzi',
    'landing.about': 'Manifesto',
    'sidebar.title': 'Moduli Ecosistema',
    'sidebar.aurora3d': 'Motore 3D & Shader',
    'sidebar.scanner3d': 'Scanner 3D AI',
    'sidebar.adgen': 'Video Marketing (AdGen)',
    'sidebar.clothify': 'Sourcing Tessile (Clothify)',
    'sidebar.solesmith': 'Design Calzature (SoleSmith)',
    'sidebar.automo': 'Calendario Social',
    'sidebar.suppliers': 'Fornitori Globali B2B',
    'sidebar.mascot': 'Copilota & Mascotte',
    'sidebar.admin': 'Super Admin & Metriche',
    'sidebar.accessLevel': 'LIVELLO ACCESSO',
    'sidebar.upgradeBtn': 'AGGIORNA PIANO'
  },
  fr: {
    'landing.badge': 'SUITE SAAS • DESIGN 3D & IA DE POINTE',
    'landing.title': 'DESIGN ET MODE AVEC IA NOUVELLE GÉNÉRATION',
    'landing.subtitle': 'Créez des modèles 3D ultra-réalistes, des publicités vidéo virales et connectez-vous avec des usines mondiales.',
    'landing.startFree': 'Essai Gratuit',
    'landing.explore3d': 'Explorer le Studio 3D',
    'landing.login': 'Connexion',
    'landing.register': 'S\'inscrire',
    'landing.pricing': 'Tarifs & Plans',
    'landing.about': 'Manifeste',
    'sidebar.title': 'Modules de l\'Écosystème',
    'sidebar.aurora3d': 'Moteur 3D & Shaders',
    'sidebar.scanner3d': 'Scanner 3D IA',
    'sidebar.adgen': 'Marketing Vidéo (AdGen)',
    'sidebar.clothify': 'Sourcing Textile',
    'sidebar.solesmith': 'Design Chaussures',
    'sidebar.automo': 'Calendrier Réseaux',
    'sidebar.suppliers': 'Fournisseurs B2B',
    'sidebar.mascot': 'Copilote & Mascottes',
    'sidebar.admin': 'Super Admin & Métriques',
    'sidebar.accessLevel': 'NIVEAU D\'ACCÈS',
    'sidebar.upgradeBtn': 'AMÉLIORER MON PLAN'
  },
  zh: {
    'landing.badge': 'SaaS 平台 • 下一代 AI + 3D 设计套件',
    'landing.title': '下一代人工智能时尚与三维设计',
    'landing.subtitle': '创建超写实3D网格模型、社交媒体爆款视频、与语音助手互动并实时对接全球制造商。',
    'landing.startFree': '免费开始试用',
    'landing.explore3d': '进入 3D 工作室',
    'landing.login': '登录',
    'landing.register': '注册',
    'landing.pricing': '价格与方案',
    'landing.about': '设计宣言',
    'sidebar.title': '生态系统模块',
    'sidebar.aurora3d': '3D 引擎与着色器',
    'sidebar.scanner3d': '3D AI 扫描仪',
    'sidebar.adgen': '视频营销 (AdGen)',
    'sidebar.clothify': '面料与面辅料采购',
    'sidebar.solesmith': '鞋履设计 (SoleSmith)',
    'sidebar.automo': '社交媒体日历',
    'sidebar.suppliers': '全球 B2B 供应商',
    'sidebar.mascot': 'AI 伴侣与吉祥物',
    'sidebar.admin': '超级管理后台',
    'sidebar.accessLevel': '当前权限级别',
    'sidebar.upgradeBtn': '升级我的方案'
  },
  de: {
    'landing.badge': 'SAAS-PLATTFORM • KI + 3D-DESIGN-SUITE',
    'landing.title': 'KI-DESIGN & MODE DER NÄCHSTEN GENERATION',
    'landing.subtitle': 'Erstellen Sie ultra-realistische 3D-Modelle, virale Videoanzeigen und kalkulieren Sie in Echtzeit mit globalen Fabriken.',
    'landing.startFree': 'Kostenlos Testen',
    'landing.explore3d': '3D-Studio Erkunden',
    'landing.login': 'Anmelden',
    'landing.register': 'Registrieren',
    'landing.pricing': 'Preise & Tarife',
    'landing.about': 'Manifest',
    'sidebar.title': 'Ökosystem-Module',
    'sidebar.aurora3d': '3D-Engine & Shader',
    'sidebar.scanner3d': '3D-KI-Scanner',
    'sidebar.adgen': 'Video-Marketing (AdGen)',
    'sidebar.clothify': 'Textilbeschaffung',
    'sidebar.solesmith': 'Schuhdesign',
    'sidebar.automo': 'Social-Media-Kalender',
    'sidebar.suppliers': 'Globale B2B-Lieferanten',
    'sidebar.mascot': 'KI-Copilot & Maskottchen',
    'sidebar.admin': 'Super-Admin-Konsole',
    'sidebar.accessLevel': 'ZUGANGSSTUFE',
    'sidebar.upgradeBtn': 'PLAN UPGRADEN'
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
      return saved || 'es';
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
