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
    // Top Navbar
    'nav.home': 'Portada',
    'nav.engine3d': 'Estudio 3D',
    'nav.videoAds': 'Video Ads',
    'nav.techPack': 'Sourcing B2B',
    'nav.mascot': 'Copiloto IA',
    'nav.tagline': 'AI + 3D DESIGN SUITE',
    'nav.testRole': 'Rol Activo:',

    // Landing General
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
    // Top Navbar
    'nav.home': 'Home',
    'nav.engine3d': '3D Studio',
    'nav.videoAds': 'Video Ads',
    'nav.techPack': 'B2B Sourcing',
    'nav.mascot': 'AI Copilot',
    'nav.tagline': 'AI + 3D DESIGN SUITE',
    'nav.testRole': 'Active Role:',

    // Landing General
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
    'nav.home': 'ホーム',
    'nav.engine3d': '3Dスタジオ',
    'nav.videoAds': '動画広告',
    'nav.techPack': 'B2B調達',
    'nav.mascot': 'AIコパイロット',
    'nav.tagline': '次世代AIデザインスイート',
    'nav.testRole': 'テスト権限:',

    'landing.badge': '次世代AIと3Dデザインスイート',
    'landing.title': '次世代AIファッション＆3Dデザイン',
    'landing.subtitle': '超リアルな3Dメッシュの作成、ソーシャルメディア向けバイラル動画の生成、音声アバターとの対話、グローバル工場との即時見積もり。',
    'landing.startFree': '無料トライアル開始',
    'landing.explore3d': '3Dスタジオを体験',
    'landing.login': 'ログイン',
    'landing.register': '新規登録',
    'landing.pricing': '料金プラン',
    'landing.about': 'マニフェスト',

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

    'avantgarde.badge': 'セルシェーディング美学 • アバンギャルド',
    'avantgarde.title': 'ストリートウェア＆ハードウェアの未来',
    'avantgarde.desc': '工業デザインの精度とアニメのセルルック、PBRテクスチャを融合。',
    'avantgarde.btn': '3Dシェーダーを体験',

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
    'nav.home': 'Início',
    'nav.engine3d': 'Estúdio 3D',
    'nav.videoAds': 'Anúncios Vídeo',
    'nav.techPack': 'Sourcing B2B',
    'nav.mascot': 'Copiloto IA',
    'nav.tagline': 'SUÍTE IA + DESIGN 3D',
    'nav.testRole': 'Função Teste:',

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
    'pricing.freePrice': '$0',
    'pricing.freeDesc': 'Para testar o motor 3D e shaders.',
    'pricing.pro': 'Pro Designer',
    'pricing.proPrice': '$49',
    'pricing.proDesc': 'Exportação 4K e criação de anúncios em vídeo.',
    'pricing.agency': 'Agência Enterprise',
    'pricing.agencyPrice': '$149',
    'pricing.agencyDesc': 'Conexão B2B com fábricas e fichas técnicas Tech Pack.',
    'pricing.popular': 'MAIS POPULAR',

    'about.badge': 'NOSSA MISSÃO',
    'about.title': 'REDEFININDO O CICLO DE CRIAÇÃO',
    'about.desc': 'Do conceito ao render 3D, do anúncio viral à confecção em minutos.',
    'about.pillar1': '1. Ideação & Modelagem 3D',
    'about.pillar2': '2. Video Marketing IA (Sora/Gen-3)',
    'about.pillar3': '3. Sourcing Global com Fábricas',

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
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.engine3d': 'Studio 3D',
    'nav.videoAds': 'Vidéos Ads',
    'nav.techPack': 'Sourcing B2B',
    'nav.mascot': 'Copilote IA',
    'nav.tagline': 'SUITE DESIGN IA + 3D',
    'nav.testRole': 'Rôle Test:',

    'landing.badge': 'SUITE SAAS • DESIGN 3D & IA DE POINTE',
    'landing.title': 'DESIGN ET MODE AVEC IA NOUVELLE GÉNÉRATION',
    'landing.subtitle': 'Créez des modèles 3D ultra-réalistes, des publicités vidéo virales et connectez-vous avec des usines mondiales.',
    'landing.startFree': 'Essai Gratuit',
    'landing.explore3d': 'Explorer le Studio 3D',
    'landing.login': 'Connexion',
    'landing.register': 'S\'inscrire',
    'landing.pricing': 'Tarifs & Plans',
    'landing.about': 'Manifeste',

    'hero.titleTop': 'LE MOTEUR ULTIME',
    'hero.titleBottom': 'DE MARKETING PAR IA',
    'hero.subtitle': 'Transformer des Mondes 3D en Campagnes Captivantes',
    'hero.realtime': 'Données en Temps Réel',
    'hero.category': 'Streetwear & Mode 3D',
    'hero.followers': '+23% Abonnés',
    'hero.performance': 'Performance de Campagne:',
    'hero.roi': '+189% ROI',
    'hero.tagline': 'RÉVOLUTION DU DESIGN 3D & DU STREETWEAR',
    'hero.launchBtn': 'LANCER LE WORKSPACE',
    'hero.integrated': 'MOTEURS IA & 3D INTÉGRÉS',

    'avantgarde.badge': 'ESTHÉTIQUE CEL-SHADED • AVANT-GARDE',
    'avantgarde.title': 'L\'AVENIR DU STREETWEAR & DU HARDWARE',
    'avantgarde.desc': 'Fusion de la précision industrielle avec l\'esthétique cel-shaded anime et simulation de tissus en temps réel.',
    'avantgarde.btn': 'Explorer les Shaders 3D',

    'pricing.badge': 'TARIFS CLAIRS & TRANSPARENTS',
    'pricing.title': 'DÉPLOYEZ VOTRE STUDIO',
    'pricing.subtitle': 'Des créateurs indépendants aux agences mondiales de mode.',
    'pricing.free': 'Free Starter',
    'pricing.freePrice': '$0',
    'pricing.freeDesc': 'Pour tester le moteur 3D et shaders.',
    'pricing.pro': 'Pro Designer',
    'pricing.proPrice': '$49',
    'pricing.proDesc': 'Export 4K et génération de vidéos publicitaires.',
    'pricing.agency': 'Agence Enterprise',
    'pricing.agencyPrice': '$149',
    'pricing.agencyDesc': 'Équipes, sourcing usines et génération de Tech Packs.',
    'pricing.popular': 'LE PLUS POPULAIRE',

    'about.badge': 'NOTRE MISSION',
    'about.title': 'REDÉFINIR LE CYCLE DE CRÉATION',
    'about.desc': 'Du concept au rendu 3D, de la vidéo virale à l\'usine en quelques minutes.',
    'about.pillar1': '1. Modélisation 3D & Idéation',
    'about.pillar2': '2. Vidéo Marketing IA (Sora/Gen-3)',
    'about.pillar3': '3. Sourcing Mondial d\'Usines',

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
  it: {
    'nav.home': 'Home',
    'nav.engine3d': 'Studio 3D',
    'nav.videoAds': 'Video Ads',
    'nav.techPack': 'Sourcing B2B',
    'nav.mascot': 'Copilota IA',
    'nav.tagline': 'SUITE DESIGN IA + 3D',
    'nav.testRole': 'Ruolo Test:',

    'landing.badge': 'SUITE SAAS • DESIGN 3D + AI AVANZATA',
    'landing.title': 'DESIGN E MODA CON IA DI NUOVA GENERAZIONE',
    'landing.subtitle': 'Crea modelli 3D iperrealistici, video virali e quota con fornitori globali in tempo reale.',
    'landing.startFree': 'Inizia Prova Gratuita',
    'landing.explore3d': 'Esplora Studio 3D',
    'landing.login': 'Accedi',
    'landing.register': 'Registrati',
    'landing.pricing': 'Piani & Prezzi',
    'landing.about': 'Manifesto',

    'hero.titleTop': 'IL MOTORE DEFINITIVO',
    'hero.titleBottom': 'DI MARKETING CON IA',
    'hero.subtitle': 'Trasforma Mondi 3D in Campagne Vincenti',
    'hero.realtime': 'Dati in Tempo Reale',
    'hero.category': 'Moda & Streetwear 3D',
    'hero.followers': '+23% Follower',
    'hero.performance': 'Performance Campagna:',
    'hero.roi': '+189% ROI',
    'hero.tagline': 'RIVOLUZIONE DEL DESIGN 3D E DELLO STREETWEAR',
    'hero.launchBtn': 'ACCEDI AL WORKSPACE',
    'hero.integrated': 'MOTORI IA E 3D INTEGRATI',

    'avantgarde.badge': 'ESTETICA CEL-SHADED • AVANGUARDIA',
    'avantgarde.title': 'IL FUTURO DELLO STREETWEAR E DELL\'HARDWARE',
    'avantgarde.desc': 'Unione di precisione ingegneristica con estetica cel-shaded anime e simulazione tessile.',
    'avantgarde.btn': 'Esplora Shader 3D',

    'pricing.badge': 'PIANI E PREZZI TRASPARENTI',
    'pricing.title': 'SCALA IL TUO STUDIO',
    'pricing.subtitle': 'Dai creator indipendenti alle agenzie di moda globali.',
    'pricing.free': 'Free Starter',
    'pricing.freePrice': '$0',
    'pricing.freeDesc': 'Per testare il motore 3D e shader.',
    'pricing.pro': 'Pro Designer',
    'pricing.proPrice': '$49',
    'pricing.proDesc': 'Export 4K e generazione video ads.',
    'pricing.agency': 'Agenzia Enterprise',
    'pricing.agencyPrice': '$149',
    'pricing.agencyDesc': 'Team, fabbriche B2B e schede Tech Pack.',
    'pricing.popular': 'PIÙ POPOLARE',

    'about.badge': 'LA NOSTRA MISSIONE',
    'about.title': 'RIDEFINIRE LA CREAZIONE PRODOTTO',
    'about.desc': 'Dall\'idea al render 3D, dal video virale alla produzione in pochi minuti.',
    'about.pillar1': '1. Modellazione 3D',
    'about.pillar2': '2. Video Marketing IA',
    'about.pillar3': '3. Sourcing Globale con Fabbriche',

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
  de: {
    'nav.home': 'Startseite',
    'nav.engine3d': '3D-Studio',
    'nav.videoAds': 'Video-Ads',
    'nav.techPack': 'B2B-Sourcing',
    'nav.mascot': 'KI-Copilot',
    'nav.tagline': 'KI + 3D DESIGN-SUITE',
    'nav.testRole': 'Test-Rolle:',

    'landing.badge': 'SAAS-PLATTFORM • KI + 3D-DESIGN-SUITE',
    'landing.title': 'KI-DESIGN & MODE DER NÄCHSTEN GENERATION',
    'landing.subtitle': 'Erstellen Sie ultra-realistische 3D-Modelle, virale Videoanzeigen und kalkulieren Sie in Echtzeit mit globalen Fabriken.',
    'landing.startFree': 'Kostenlos Testen',
    'landing.explore3d': '3D-Studio Erkunden',
    'landing.login': 'Anmelden',
    'landing.register': 'Registrieren',
    'landing.pricing': 'Preise & Tarife',
    'landing.about': 'Manifest',

    'hero.titleTop': 'DIE ULTIMATIVE',
    'hero.titleBottom': 'KI-MARKETING-ENGINE',
    'hero.subtitle': '3D-Welten in Fesselnde Kampagnen Verwandeln',
    'hero.realtime': 'Echtzeit-Daten',
    'hero.category': '3D Streetwear & Mode',
    'hero.followers': '+23% Follower',
    'hero.performance': 'Kampagnen-Performance:',
    'hero.roi': '+189% ROI',
    'hero.tagline': 'REVOLUTION IM 3D-DESIGN & STREETWEAR',
    'hero.launchBtn': 'WORKSPACE STARTEN',
    'hero.integrated': 'INTEGRIERTE KI- & 3D-ENGINES',

    'avantgarde.badge': 'CEL-SHADED ÄSTHETIK • AVANTGARDE',
    'avantgarde.title': 'DIE ZUKUNFT VON STREETWEAR & HARDWARE',
    'avantgarde.desc': 'Präzises 3D-Modeling kombiniert mit Cel-Shaded Anime-Ästhetik und physikalischer Stoffsimulation.',
    'avantgarde.btn': '3D-Shader Erkunden',

    'pricing.badge': 'TRANSPARENTE TARIFE',
    'pricing.title': 'SKALIEREN SIE IHR DESIGN-STUDIO',
    'pricing.subtitle': 'Von Solo-Designern bis hin zu globalen Mode-Agenturen.',
    'pricing.free': 'Free Starter',
    'pricing.freePrice': '$0',
    'pricing.freeDesc': 'Zum Testen der 3D-Engine.',
    'pricing.pro': 'Pro Designer',
    'pricing.proPrice': '$49',
    'pricing.proDesc': '4K-Export und Video-Ad-Generierung.',
    'pricing.agency': 'Agentur Enterprise',
    'pricing.agencyPrice': '$149',
    'pricing.agencyDesc': 'Teams, Fabrikvernetzung und Tech Pack PDF.',
    'pricing.popular': 'BELIEBTESTER PLAN',

    'about.badge': 'UNSERE MISSION',
    'about.title': 'PRODUKTENTWICKLUNG NEU DEFINIERT',
    'about.desc': 'Vom Konzept zum 3D-Render, vom viralen Video zur Fabrik in Minuten.',
    'about.pillar1': '1. 3D-Modellierung',
    'about.pillar2': '2. KI-Videomarketing',
    'about.pillar3': '3. Globales Sourcing mit Fabriken',

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
  zh: {
    'nav.home': '首页',
    'nav.engine3d': '3D 工作室',
    'nav.videoAds': '视频广告',
    'nav.techPack': 'B2B 采购',
    'nav.mascot': 'AI 伴侣',
    'nav.tagline': 'AI + 3D 设计套件',
    'nav.testRole': '测试权限:',

    'landing.badge': 'SaaS 平台 • 下一代 AI + 3D 设计套件',
    'landing.title': '下一代人工智能时尚与三维设计',
    'landing.subtitle': '创建超写实3D网格模型、社交媒体爆款视频、与语音助手互动并实时对接全球制造商。',
    'landing.startFree': '免费开始试用',
    'landing.explore3d': '进入 3D 工作室',
    'landing.login': '登录',
    'landing.register': '注册',
    'landing.pricing': '价格与方案',
    'landing.about': '设计宣言',

    'hero.titleTop': '终极',
    'hero.titleBottom': 'AI 营销引擎',
    'hero.subtitle': '将 3D 世界转化为极具吸引力的商业营销活动',
    'hero.realtime': '实时数据分析',
    'hero.category': '3D 街头潮流服饰',
    'hero.followers': '+23% 粉丝增长',
    'hero.performance': '营销效果回报:',
    'hero.roi': '+189% ROI',
    'hero.tagline': '颠覆 3D 设计与潮流时尚',
    'hero.launchBtn': '进入工作区',
    'hero.integrated': '整合 AI 与 3D 渲染引擎',

    'avantgarde.badge': '赛博卡通渲染 • 先锋设计',
    'avantgarde.title': '街头潮流与智能硬件的未来',
    'avantgarde.desc': '融合工业参数化建模精度与日系赛璐珞卡通渲染风格，支持实时物理布料解算。',
    'avantgarde.btn': '体验 3D 着色器',

    'pricing.badge': '透明价格与方案',
    'pricing.title': '赋能您的设计工作室',
    'pricing.subtitle': '从独立设计师到全球顶级时尚与产品设计机构。',
    'pricing.free': '免费体验版',
    'pricing.freePrice': '$0',
    'pricing.freeDesc': '体验实时 3D 引擎与着色器。',
    'pricing.pro': '专业设计师版',
    'pricing.proPrice': '$49',
    'pricing.proDesc': '4K超清导出与 AI 视频广告生成。',
    'pricing.agency': '企业机构版',
    'pricing.agencyPrice': '$149',
    'pricing.agencyDesc': '团队协同、全球代工厂直连与工艺制单生成。',
    'pricing.popular': '最受欢迎',

    'about.badge': '核心使命',
    'about.title': '重构产品设计与制造全生命周期',
    'about.desc': '数分钟内实现从概念草图到 3D 渲染、从爆款短视频到全球工厂打样。',
    'about.pillar1': '1. 3D 概念与模型设计',
    'about.pillar2': '2. AI 视频广告营销 (Sora/Gen-3)',
    'about.pillar3': '3. 优质认证代工厂全球直连',

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
    if (TRANSLATIONS[language] && TRANSLATIONS[language][key]) {
      return TRANSLATIONS[language][key];
    }
    if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) {
      return TRANSLATIONS['en'][key];
    }
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
