import React, { createContext, useContext, useState } from 'react';
import { LanguageCode, LanguageOption, SUPPORTED_LANGUAGES } from '../types/i18n';

type Translations = Record<string, Record<LanguageCode, string>>;

export const TRANSLATIONS: Translations = {
  // Navigation
  'nav.brand': { es: 'AETHER SYNERGY', en: 'AETHER SYNERGY', ja: 'AETHER SYNERGY', it: 'AETHER SYNERGY', fr: 'AETHER SYNERGY', zh: 'AETHER SYNERGY', de: 'AETHER SYNERGY' },
  'nav.tagline': { es: 'AI 3D Design & Marketing Engine', en: 'AI 3D Design & Marketing Engine', ja: 'AI 3Dデザイン＆マーケティングエンジン', it: 'Motore di Design 3D & Marketing IA', fr: 'Moteur de Design 3D & Marketing IA', zh: 'AI 3D 设计与营销引擎', de: 'KI 3D-Design & Marketing Engine' },
  'nav.home': { es: 'Inicio & Intro', en: 'Home & Intro', ja: 'ホーム＆紹介', it: 'Home & Intro', fr: 'Accueil & Intro', zh: '首页与介绍', de: 'Start & Übersicht' },
  'nav.engine3d': { es: 'Motor 3D Cel', en: '3D Cel Studio', ja: '3Dセルスタジオ', it: 'Studio 3D Cel', fr: 'Studio 3D Cel', zh: '3D卡通渲染工作台', de: '3D Cel-Studio' },
  'nav.videoAds': { es: 'Video Ads IA', en: 'AI Video Ads', ja: 'AI動画広告', it: 'Video Ads IA', fr: 'Pubs Vidéo IA', zh: 'AI视频广告', de: 'KI Video-Ads' },
  'nav.techPack': { es: 'Tech Pack (Kai AI)', en: 'Tech Pack (Kai AI)', ja: '仕様書 (Kai AI)', it: 'Scheda Tecnica (Kai AI)', fr: 'Fiche Tech (Kai AI)', zh: '工艺资料包 (Kai AI)', de: 'Tech-Pack (Kai AI)' },
  'nav.mascot': { es: 'Mascotas & Hub', en: 'Mascots & Hub', ja: 'マスコット＆ハブ', it: 'Mascotte & Hub', fr: 'Mascottes & Hub', zh: '宠物与社区', de: 'Maskottchen & Hub' },
  'nav.testRole': { es: 'Probar Rol:', en: 'Test Role:', ja: 'ロール切替:', it: 'Prova Ruolo:', fr: 'Tester Rôle:', zh: '测试角色:', de: 'Rolle testen:' },
  'nav.login': { es: 'Iniciar Sesión / Registro', en: 'Sign In / Register', ja: 'ログイン / 新規登録', it: 'Accedi / Registrati', fr: 'Connexion / S’inscrire', zh: '登录 / 注册', de: 'Anmelden / Registrieren' },
  'nav.credits': { es: 'Créditos IA', en: 'AI Credits', ja: 'AIクレジット', it: 'Crediti IA', fr: 'Crédits IA', zh: 'AI 算力点数', de: 'KI-Guthaben' },

  // Sidebar
  'sidebar.title': { es: 'Módulos del Ecosistema', en: 'Ecosystem Modules', ja: 'エコシステムモジュール', it: 'Moduli Ecosistema', fr: 'Modules Écosystème', zh: '生态系统核心模块', de: 'Ökosystem-Module' },
  'sidebar.home': { es: 'Inicio & Intro', en: 'Home & Intro', ja: 'ホーム＆紹介', it: 'Home & Intro', fr: 'Accueil & Intro', zh: '首页与介绍', de: 'Start & Übersicht' },
  'sidebar.aurora3d': { es: 'Aurora 3D Studio', en: 'Aurora 3D Studio', ja: 'Aurora 3D Studio', it: 'Aurora 3D Studio', fr: 'Aurora 3D Studio', zh: 'Aurora 3D 渲染室', de: 'Aurora 3D Studio' },
  'sidebar.scanner3d': { es: 'Scanner 3D (Video)', en: '3D Scanner (Video)', ja: '3Dスキャナー (動画)', it: 'Scanner 3D (Video)', fr: 'Scanner 3D (Vidéo)', zh: '3D 视频扫描建模', de: '3D-Scanner (Video)' },
  'sidebar.adgen': { es: 'Ad-Gen Video AI', en: 'Ad-Gen Video AI', ja: 'Ad-Gen 動画AI', it: 'Ad-Gen Video IA', fr: 'Ad-Gen Vidéo IA', zh: 'Ad-Gen 营销视频 AI', de: 'Ad-Gen Video-KI' },
  'sidebar.clothify': { es: 'Clothify & Sourcing', en: 'Clothify & Sourcing', ja: 'Clothify＆調達', it: 'Clothify & Sourcing', fr: 'Clothify & Sourcing', zh: 'Clothify 面料与工艺', de: 'Clothify & Sourcing' },
  'sidebar.solesmith': { es: 'Solesmith Footwear', en: 'Solesmith Footwear', ja: 'Solesmith フットウェア', it: 'Solesmith Calzature', fr: 'Solesmith Chaussures', zh: 'Solesmith 3D鞋类设计', de: 'Solesmith Footwear' },
  'sidebar.automo': { es: 'Automo Social Media', en: 'Automo Social Media', ja: 'Automo SNS自動化', it: 'Automo Social Media', fr: 'Automo Réseaux', zh: 'Automo 社媒自动化', de: 'Automo Social Media' },
  'sidebar.suppliers': { es: 'Global Suppliers B2B', en: 'Global Suppliers B2B', ja: 'グローバルB2Bサプライヤー', it: 'Fornitori Globali B2B', fr: 'Fournisseurs B2B', zh: '全球 B2B 制造直连', de: 'Globale B2B-Lieferanten' },
  'sidebar.mascot': { es: 'Synthetix & Mascot', en: 'Synthetix & Mascot', ja: 'Synthetix＆マスコット', it: 'Synthetix & Mascotte', fr: 'Synthetix & Mascotte', zh: 'Synthetix 宠物社区', de: 'Synthetix & Maskottchen' },
  'sidebar.admin': { es: 'Admin Console', en: 'Admin Console', ja: '管理者コンソール', it: 'Console Admin', fr: 'Console Admin', zh: '超级管理员控制台', de: 'Admin-Konsole' },
  'sidebar.accessLevel': { es: 'Nivel de Acceso', en: 'Access Tier', ja: 'アクセスレベル', it: 'Livello Accesso', fr: 'Niveau d’Accès', zh: '当前访问级别', de: 'Zugriffsstufe' },
  'sidebar.upgradeBtn': { es: 'Mejorar Plan', en: 'Upgrade Plan', ja: 'プランをアップグレード', it: 'Aggiorna Piano', fr: 'Changer de Forfait', zh: '升级套餐', de: 'Plan upgraden' },

  // Hero Section
  'hero.tag': { es: 'Next-Gen AI 3D Fashion & Design Engine', en: 'Next-Gen AI 3D Fashion & Design Engine', ja: '次世代 AI 3D ファッション＆デザインエンジン', it: 'Motore di Design 3D e Moda IA di Nuova Generazione', fr: 'Moteur de Design 3D & Mode IA Nouvelle Génération', zh: '下一代 AI 3D 时尚与工业设计引擎', de: 'Next-Gen KI 3D-Fashion & Design Engine' },
  'hero.awwwards': { es: 'Ganador Awwwards • SOTO Neon Gold', en: 'Awwwards Winner • SOTO Neon Gold', ja: 'Awwwards受賞 • SOTO Neon Gold', it: 'Vincitore Awwwards • SOTO Neon Gold', fr: 'Lauréat Awwwards • SOTO Neon Gold', zh: 'Awwwards 获奖设计 • SOTO 霓虹金奖', de: 'Awwwards Gewinner • SOTO Neon Gold' },
  'hero.title1': { es: 'EL MOTOR DEFINITIVO DE', en: 'THE ULTIMATE', ja: '究極の', it: 'IL MOTORE DEFINITIVO DI', fr: 'LE MOTEUR ULTIME DE', zh: '终极', de: 'DIE ULTIMATIVE' },
  'hero.title2': { es: 'MARKETING CON IA', en: 'AI MARKETING ENGINE', ja: 'AIマーケティングエンジン', it: 'MARKETING CON IA', fr: 'MARKETING IA', zh: 'AI 营销引擎', de: 'KI-MARKETING-ENGINE' },
  'hero.subtitle': {
    es: 'Transformando mundos 3D en campañas cautivadoras. Desde la ideación cel-shaded hasta fichas técnicas y conexión directa con fabricantes B2B.',
    en: 'Transforming 3D Worlds into Captivating Campaigns. From cel-shaded ideation to tech packs and direct B2B manufacturer connections.',
    ja: '3Dの世界を魅惑的なキャンペーンへ。セルルックのデザインから仕様書作成、B2B工場への直接発注まで完全自動化。',
    it: 'Trasforma mondi 3D in campagne accattivanti. Dalla creazione cel-shaded alle schede tecniche e connessione diretta con i produttori B2B.',
    fr: 'Transformez vos univers 3D en campagnes captivantes. De l’idéation cel-shaded aux fiches techniques et à la connexion directe avec les fabricants B2B.',
    zh: '将 3D 世界转化为极具吸引力的营销活动。从卡通渲染设计到工艺资料包，直连全球 B2B 制造工厂。',
    de: 'Verwandeln Sie 3D-Welten in fesselnde Kampagnen. Vom Cel-Shading-Design über Tech-Packs bis zur direkten B2B-Herstelleranbindung.'
  },
  'hero.ctaLaunch': { es: 'LANZAR ECOSISTEMA', en: 'LAUNCH YOUR ECOSYSTEM', ja: 'エコシステムを起動', it: 'LANCIA IL TUO ECOSISTEMA', fr: 'LANCER L’ÉCOSYSTÈME', zh: '启动您的生态系统', de: 'ÖKOSYSTEM STARTEN' },
  'hero.ctaDemo': { es: 'Probar Roles Demo', en: 'Test Demo Roles', ja: 'デモ権限を試す', it: 'Prova Ruoli Demo', fr: 'Tester les Rôles Démo', zh: '体验演示角色', de: 'Demo-Rollen testen' },
  'hero.realtimeData': { es: 'Datos en Tiempo Real', en: 'Real-time Data', ja: 'リアルタイムデータ', it: 'Dati in Tempo Reale', fr: 'Données en Temps Réel', zh: '实时运行数据', de: 'Echtzeit-Daten' },
  'hero.reachStat': { es: '+23% Seguidores y Alcance', en: '+23% Followers & Reach', ja: '+23% フォロワー＆リーチ拡大', it: '+23% Follower e Copertura', fr: '+23% Followers & Portée', zh: '+23% 粉丝增长与触达', de: '+23% Follower & Reichweite' },
  'hero.series': { es: 'Serie Streetwear 33D', en: '33D Streetwear Series', ja: '33D ストリートウェアシリーズ', it: 'Serie Streetwear 33D', fr: 'Série Streetwear 33D', zh: '33D 街头服饰系列', de: '33D Streetwear-Serie' },
  'hero.roiStat': { es: '+189% Retorno de Inversión (ROI)', en: '+189% ROI Campaign Performance', ja: '+189% ROI 広告収益率', it: '+189% ROI Rendimento Campagna', fr: '+189% ROI Performance', zh: '+189% ROI 投资回报率', de: '+189% ROI Kampagnen-Performance' },
  'hero.pipeline': { es: 'Pipeline Automatizado', en: 'Automated Pipeline', ja: '全自動パイプライン', it: 'Pipeline Automatizzata', fr: 'Pipeline Automatisé', zh: '自动化生产线', de: 'Automatisierte Pipeline' },

  // Avantgarde 4 Capabilities
  'caps.tag': { es: 'Pila Tecnológica Avantgarde', en: 'Avantgarde Core Stack', ja: 'Avantgardeコアスタック', it: 'Stack Tecnologico Avantgarde', fr: 'Stack Technologique Avantgarde', zh: 'Avantgarde 核心技术栈', de: 'Avantgarde Core Stack' },
  'caps.title': { es: 'Nuestras Capacidades de Nueva Generación', en: 'Our Next-Gen Capabilities', ja: '次世代のコア機能', it: 'Le Nostre Funzionalità di Nuova Generazione', fr: 'Nos Capacités de Nouvelle Génération', zh: '我们的下一代核心能力', de: 'Unsere Next-Gen-Fähigkeiten' },
  'caps.subtitle': { es: 'Transformando ideas en innovación mediante potentes herramientas digitales.', en: 'Transforming Ideas into Innovation through Powerful Digital Tools.', ja: '強力なデジタルツールを通じて、アイデアを革新へと変換します。', it: 'Trasformare le idee in innovazione attraverso potenti strumenti digitali.', fr: 'Transformer les idées en innovation grâce à des outils numériques puissants.', zh: '通过强大的数字化工具，将创意转化为颠覆性创新。', de: 'Ideen durch leistungsstarke digitale Werkzeuge in Innovation verwandeln.' },
  'caps.c1Title': { es: 'Diseño y Renderizado 3D', en: '3D Design & Rendering', ja: '3Dデザイン＆レンダリング', it: 'Design e Rendering 3D', fr: 'Design & Rendu 3D', zh: '3D 设计与实时渲染', de: '3D-Design & Rendering' },
  'caps.c1Desc': { es: 'Crea visuales inmersivos y activos digitales con modelado cel-shaded avanzado.', en: 'Create immersive visuals and digital assets with advanced cel-shaded modeling.', ja: '高度なセルルックモデリングで没入感のあるビジュアルと3Dアセットを作成。', it: 'Crea immagini immersive e risorse digitali con modellazione cel-shaded avanzata.', fr: 'Créez des visuels immersifs et des actifs numériques avec un rendu cel-shaded.', zh: '借助先进的卡通渲染建模技术，创建沉浸式视觉资产。', de: 'Erstellen Sie immersive Visuals und digitale Assets mit Cel-Shading.' },
  'caps.c2Title': { es: 'Generación de Video con IA', en: 'AI Video Generation', ja: 'AI動画生成', it: 'Generazione Video con IA', fr: 'Génération Vidéo IA', zh: 'AI 营销视频生成', de: 'KI-Videogenerierung' },
  'caps.c2Desc': { es: 'Genera videos de marketing, promos y contenido 9:16 para TikTok al instante.', en: 'Generate high-quality marketing videos, promos, and short-form TikTok content instantly.', ja: '高品質なマーケティング動画、プロモーション、TikTok向け9:16動画を瞬時に生成。', it: 'Genera istantaneamente video di marketing e contenuti 9:16 per TikTok di alta qualità.', fr: 'Générez instantanément des vidéos marketing et des formats courts 9:16 pour TikTok.', zh: '瞬间生成高品质营销短片、宣传片及 9:16 TikTok 坚屏内容。', de: 'Erstellen Sie im Handumdrehen Marketingvideos und 9:16-TikTok-Inhalte.' },
  'caps.c3Title': { es: 'Automatización de Redes', en: 'Social Media Automation', ja: 'SNS投稿自動化', it: 'Automazione Social Media', fr: 'Automatisation Réseaux', zh: '社交媒体全自动排期', de: 'Social-Media-Automatisierung' },
  'caps.c3Desc': { es: 'Programa publicaciones, analiza tendencias y gestiona campañas multicanal sin esfuerzo.', en: 'Schedule posts, analyze trends, and manage multi-platform campaigns effortlessly.', ja: '投稿の予約、トレンド分析、複数プラットフォームでのキャンペーン管理を自動化。', it: 'Pianifica post, analizza tendenze e gestisci campagne multicanale senza sforzo.', fr: 'Programmez des publications, analysez les tendances et gérez vos campagnes multiplateformes.', zh: '轻松排期发布、分析热门趋势并全自动管理多平台营销活动。', de: 'Planen Sie Posts, analysieren Sie Trends und verwalten Sie Kampagnen mühelos.' },
  'caps.c4Title': { es: 'Proveedores Globales B2B', en: 'Global Suppliers & Sourcing', ja: 'グローバルB2B調達＆工場連携', it: 'Fornitori Globali & Sourcing', fr: 'Fournisseurs B2B & Sourcing', zh: '全球供应商与制造直连', de: 'Globale B2B-Lieferanten' },
  'caps.c4Desc': { es: 'Conecta con fabricantes verificados y optimiza tu cadena de suministro en todo el mundo.', en: 'Connect with verified manufacturers and streamline supply chains worldwide.', ja: '認証済み工場と直接連携し、世界規模のサプライチェーンを合理化。', it: 'Connettiti con produttori verificati e ottimizza le catene di fornitura in tutto il mondo.', fr: 'Connectez-vous à des fabricants certifiés et optimisez votre chaîne d’approvisionnement mondiale.', zh: '直连经过认证的全球制造商，大幅精简全球供应链协作流程。', de: 'Vernetzen Sie sich mit verifizierten Herstellern weltweit.' },
  'caps.explore': { es: 'Explorar Módulo', en: 'Explore Module', ja: 'モジュールを試す', it: 'Esplora Modulo', fr: 'Explorer le Module', zh: '探索此模块', de: 'Modul erkunden' },

  // Pricing
  'price.tag': { es: 'Precios Simples, Potencial Extraordinario', en: 'Simple Pricing, Extraordinary Potential', ja: 'シンプルな料金体系、無限の可能性', it: 'Prezzi Semplici, Potenziale Straordinario', fr: 'Tarifs Clairs, Potentiel Extraordinaire', zh: '透明定价，无限商业潜力', de: 'Einfache Preise, Außergewöhnliches Potenzial' },
  'price.title': { es: 'Planes Diseñados para tu', en: 'Plans Built for your', ja: '成長に合わせた', it: 'Piani Progettati per la tua', fr: 'Des Forfaits Conçus pour votre', zh: '专为规模化打造的', de: 'Pläne für Ihre' },
  'price.titleHighlight': { es: 'Escala', en: 'Scale', ja: 'スケーリング', it: 'Crescita', fr: 'Croissance', zh: '商业规模', de: 'Skalierung' },
  'price.subtitle': { es: 'Comienza gratis o desbloquea el motor de producción 3D y marketing automatizado.', en: 'Start for free or unlock the 3D production and automated marketing engine.', ja: '無料で始めるか、3D制作と自動マーケティングの全機能を解放しましょう。', it: 'Inizia gratis o sblocca il motore di produzione 3D e marketing automatizzato.', fr: 'Commencez gratuitement ou débloquez le moteur de production 3D et marketing automatisé.', zh: '免费开启体验，或立即解锁 3D 工业生产与全自动营销引擎。', de: 'Starten Sie kostenlos oder schalten Sie die 3D-Produktions-Engine frei.' },
  'price.monthly': { es: 'Facturación Mensual', en: 'Monthly Billing', ja: '月払い', it: 'Fatturazione Mensile', fr: 'Facturation Mensuelle', zh: '按月付费', de: 'Monatliche Abrechnung' },
  'price.annual': { es: 'Anual (-20% OFF)', en: 'Annual (-20% OFF)', ja: '年払い (20%OFF)', it: 'Annuale (-20% Sconto)', fr: 'Annuel (-20% Réduction)', zh: '按年付费 (省20%)', de: 'Jährlich (-20% Rabatt)' },
  'price.starterName': { es: 'STARTER', en: 'STARTER', ja: 'スターター', it: 'STARTER', fr: 'STARTER', zh: '入门版 (STARTER)', de: 'STARTER' },
  'price.starterTag': { es: 'Esenciales para creadores', en: 'Essentials for creators', ja: 'クリエイター向け基本機能', it: 'Funzioni essenziali per creator', fr: 'Essentiel pour créateurs', zh: '创作者入门必备', de: 'Grundausstattung für Creator' },
  'price.proName': { es: 'PRO STUDIO', en: 'PRO STUDIO', ja: 'プロスタジオ', it: 'PRO STUDIO', fr: 'PRO STUDIO', zh: '专业设计室 (PRO)', de: 'PRO STUDIO' },
  'price.proTag': { es: 'Maximiza Rendimiento y Crecimiento', en: 'Maximize Performance & Growth', ja: 'パフォーマンスと成長を最大化', it: 'Massimizza Prestazioni e Crescita', fr: 'Maximisez Performance & Croissance', zh: '极致性能与品牌增长', de: 'Maximale Leistung & Wachstum' },
  'price.agencyName': { es: 'AGENCIA ENTERPRISE', en: 'AGENCY ENTERPRISE', ja: 'エージェンシーエンタープライズ', it: 'AGENCY ENTERPRISE', fr: 'AGENCE ENTREPRISE', zh: '企业与机构旗舰版', de: 'AGENCY ENTERPRISE' },
  'price.agencyTag': { es: 'Potencia Total y Manufactura B2B', en: 'Scaling & Manufacturing Power', ja: 'スケーリングとB2B製造連携', it: 'Massima Potenza e Manifattura B2B', fr: 'Puissance Maximale & Fabrication B2B', zh: '规模化与全链路 B2B 制造直连', de: 'Skalierung & B2B-Fertigung' },
  'price.popular': { es: 'Más Popular', en: 'Most Popular', ja: '一番人気', it: 'Più Popolare', fr: 'Le Plus Populaire', zh: '最受欢迎', de: 'Sehr Beliebt' },
  'price.activePlan': { es: 'Plan Actualmente Activo', en: 'Current Active Plan', ja: '現在利用中のプラン', it: 'Piano Attualmente Attivo', fr: 'Forfait Actuellement Actif', zh: '当前已激活方案', de: 'Aktuell aktiver Plan' },
  'price.selectPlan': { es: 'Seleccionar Plan', en: 'Select Plan', ja: 'プランを選択', it: 'Seleziona Piano', fr: 'Choisir ce Forfait', zh: '选择此方案', de: 'Plan wählen' },

  // About Section
  'about.tag': { es: 'Sobre Nosotros • Aura Dynamics', en: 'About Us • Aura Dynamics', ja: '会社概要 • Aura Dynamics', it: 'Chi Siamo • Aura Dynamics', fr: 'À Propos • Aura Dynamics', zh: '关于我们 • Aura Dynamics', de: 'Über Uns • Aura Dynamics' },
  'about.title': { es: 'Revolucionando la Creación desde la', en: 'Revolutionizing Creation from', ja: 'アイデア発案から', it: 'Rivoluzionando la Creazione dalla', fr: 'Révolutionner la Création de', zh: '颠覆式重塑从', de: 'Revolutionierung der Kreation von' },
  'about.titleHighlight': { es: 'Ideación a la Manufactura', en: 'Ideation to Manufacturing', ja: '製造・生産までの完全自動化', it: 'Ideazione alla Manifattura', fr: 'l’Idéation à la Fabrication', zh: '创意灵感到实体制造的全流程', de: 'Idee bis zur Fertigung' },
  'about.whoWeAre': {
    es: 'Aura Dynamics y Aether Synergy es una plataforma de vanguardia que fusiona modelos generativos de IA, análisis predictivo y flujos 3D en tiempo real para empoderar estudios independientes y marcas de moda urbana.',
    en: 'Aura Dynamics and Aether Synergy is a cutting-edge platform merging generative AI, predictive analytics, and real-time 3D pipelines to empower independent studios and streetwear brands worldwide.',
    ja: 'Aura DynamicsとAether Synergyは、生成AI、予測分析、リアルタイム3Dを融合し、独立スタジオやストリートウェアブランドを支援する最先端プラットフォームです。',
    it: 'Aura Dynamics e Aether Synergy è una piattaforma all’avanguardia che unisce IA generativa, analisi predittiva e pipeline 3D in tempo reale.',
    fr: 'Aura Dynamics et Aether Synergy est une plateforme de pointe alliant IA générative, analyse prédictive et flux 3D en temps réel.',
    zh: 'Aura Dynamics 与 Aether Synergy 是一座前沿的 AI 3D 数字化基础设施，无缝融合生成式 AI、预测分析与实时 3D 渲染，赋能全球独立设计工作室与街头服饰品牌。',
    de: 'Aura Dynamics und Aether Synergy ist eine innovative Plattform, die generative KI, prädiktive Analysen und 3D-Pipelines kombiniert.'
  },
  'about.startFree': { es: 'Comenzar Prueba Gratuita', en: 'Start Free Trial', ja: '無料トライアルを開始', it: 'Inizia Prova Gratuita', fr: 'Commencer l’Essai Gratuit', zh: '立即开启免费体验', de: 'Kostenlose Testversion starten' },
  'about.noCard': { es: 'Sin tarjeta de crédito', en: 'No credit card required', ja: 'クレジットカード不要', it: 'Nessuna carta richiesta', fr: 'Aucune carte requise', zh: '无需绑定信用卡', de: 'Keine Kreditkarte erforderlich' },
  'about.cancelAnytime': { es: 'Cancela cuando quieras', en: 'Cancel anytime', ja: 'いつでも解約可能', it: 'Cancella quando vuoi', fr: 'Annulez à tout moment', zh: '随时可取消', de: 'Jederzeit kündbar' },
  'about.copilotTag': { es: 'Tus Copilotos de Diseño y Sourcing', en: 'Your Design & Sourcing Copilots', ja: 'デザイン＆調達コパイロット', it: 'I tuoi Copiloti di Design e Sourcing', fr: 'Vos Copilotes Design & Sourcing', zh: '您的智能设计与面料采购副驾驶', de: 'Ihre Design- & Sourcing-Copiloten' },
  'about.expertLevel': { es: 'Nivel de Asistencia: Experto', en: 'Assistance Level: Expert', ja: 'サポートレベル: エキスパート', it: 'Livello Assistenza: Esperto', fr: 'Niveau d’Assistance: Expert', zh: '助手能力等级: 行业专家', de: 'Assistenz-Level: Experte' },

  // Aurora 3D Studio
  'aurora.title': { es: 'AURORA 3D STUDIO', en: 'AURORA 3D STUDIO', ja: 'AURORA 3D STUDIO', it: 'AURORA 3D STUDIO', fr: 'AURORA 3D STUDIO', zh: 'AURORA 3D 渲染室', de: 'AURORA 3D STUDIO' },
  'aurora.version': { es: 'v2.4 Cel-Shaded', en: 'v2.4 Cel-Shaded', ja: 'v2.4 セルルック', it: 'v2.4 Cel-Shaded', fr: 'v2.4 Cel-Shaded', zh: 'v2.4 卡通着色版', de: 'v2.4 Cel-Shaded' },
  'aurora.project': { es: 'Proyecto:', en: 'Project:', ja: 'プロジェクト:', it: 'Progetto:', fr: 'Projet:', zh: '当前项目:', de: 'Projekt:' },
  'aurora.frame': { es: 'Fotograma:', en: 'Frame:', ja: 'フレーム:', it: 'Fotogramma:', fr: 'Image:', zh: '帧数:', de: 'Frame:' },
  'aurora.export': { es: 'Exportar 3D', en: 'Export 3D', ja: '3D書き出し', it: 'Esporta 3D', fr: 'Exporter 3D', zh: '导出 3D 资产', de: '3D exportieren' },
  'aurora.layerStack': { es: 'Pila de Capas', en: 'Layer Stack', ja: 'レイヤースタック', it: 'Pila di Livelli', fr: 'Pile de Calques', zh: '图层列表 (Layer Stack)', de: 'Ebenen-Stapel' },
  'aurora.layersCount': { es: '5 Capas Activas', en: '5 Active Layers', ja: '5つの有効レイヤー', it: '5 Livelli Attivi', fr: '5 Calques Actifs', zh: '5 个活动图层', de: '5 aktive Ebenen' },
  'aurora.colors': { es: 'Colores Principales', en: 'Main Colors', ja: 'メインカラー', it: 'Colori Principali', fr: 'Couleurs Principales', zh: '主色调配置', de: 'Hauptfarben' },
  'aurora.baseColor': { es: 'Color Base Prenda', en: 'Garment Base Color', ja: '服のベースカラー', it: 'Colore Base Capo', fr: 'Couleur Base Vêtement', zh: '服装基础底色', de: 'Kleidungsstück-Grundfarbe' },
  'aurora.accentColor': { es: 'Color Acento & Bolsillos', en: 'Accent & Pocket Color', ja: 'アクセント＆ポケット色', it: 'Colore Accento & Tasche', fr: 'Couleur Accent & Poches', zh: '口袋与装饰点缀色', de: 'Akzent- & Taschenfarbe' },
  'aurora.shaderStyle': { es: 'Estilo de Shader', en: 'Shader Style', ja: 'シェーダースタイル', it: 'Stile Shader', fr: 'Style de Shader', zh: '着色器风格 (Shader)', de: 'Shader-Stil' },
  'aurora.outlineThickness': { es: 'Grosor de Contorno', en: 'Outline Thickness', ja: '輪郭線の太さ', it: 'Spessore Contorno', fr: 'Épaisseur du Contour', zh: '描边粗细 (Outline)', de: 'Konturstärke' },
  'aurora.intensity': { es: 'Intensidad', en: 'Intensity', ja: '強度', it: 'Intensità', fr: 'Intensité', zh: '光影强度', de: 'Intensität' },
  'aurora.shadingMode': { es: 'Modo de Sombreado', en: 'Shading Mode', ja: 'シェーディングモード', it: 'Modalità Ombreggiatura', fr: 'Mode d’Ombrage', zh: '阴影模式', de: 'Schattierungsmodus' },
  'aurora.decalGraphic': { es: 'Gráfico / Calcomanía', en: 'Decal Graphic', ja: 'デカール／グラフィック', it: 'Grafica / Decalcomania', fr: 'Graphisme / Décalque', zh: '印花与徽标贴花 (Decal)', de: 'Grafik / Decal' },
  'aurora.chromaTitle': { es: 'Línea de Tiempo Chroma Key (Fondo Verde)', en: 'Green Screen Chroma Key Timeline', ja: 'クロマキー タイムライン (グリーンバック)', it: 'Timeline Chroma Key (Green Screen)', fr: 'Timeline Chroma Key (Fond Vert)', zh: '绿幕扣像时间轴 (Chroma Key)', de: 'Green-Screen Chroma-Key Timeline' },
  'aurora.seq': { es: 'Secuencia: Giro 360° [00:15]', en: 'Seq: 360° Turn [00:15]', ja: 'シーケンス: 360度回転 [00:15]', it: 'Seq: Rotazione 360° [00:15]', fr: 'Séquence: Rotation 360° [00:15]', zh: '序列: 360度旋转展示 [00:15]', de: 'Sequenz: 360°-Drehung [00:15]' },

  // Ad-Gen AI
  'adgen.title': { es: 'AD-GEN AI • MOTOR DE VIDEO MARKETING', en: 'AD-GEN AI • MARKETING VIDEO ENGINE', ja: 'AD-GEN AI • マーケティング動画エンジン', it: 'AD-GEN AI • MOTORE VIDEO MARKETING', fr: 'AD-GEN AI • MOTEUR VIDÉO MARKETING', zh: 'AD-GEN AI • 营销视频生成引擎', de: 'AD-GEN AI • MARKETING-VIDEO-ENGINE' },
  'adgen.project': { es: 'Proyecto:', en: 'Project:', ja: 'プロジェクト:', it: 'Progetto:', fr: 'Projet:', zh: '项目:', de: 'Projekt:' },
  'adgen.promptLabel': { es: 'Prompt de Campaña (AI Brief)', en: 'Campaign Brief Prompt', ja: 'キャンペーン指示プロンプト', it: 'Prompt della Campagna (AI Brief)', fr: 'Prompt de Campagne (AI Brief)', zh: '营销活动提示词 (Campaign Brief)', de: 'Kampagnen-Briefing Prompt' },
  'adgen.platformLabel': { es: 'Plataforma Objetivo', en: 'Target Platform', ja: '対象プラットフォーム', it: 'Piattaforma Destinazione', fr: 'Plateforme Cible', zh: '投放目标平台', de: 'Zielplattform' },
  'adgen.goalLabel': { es: 'Objetivo de Conversión', en: 'Conversion Goal', ja: 'コンバージョン目標', it: 'Obiettivo di Conversione', fr: 'Objectif de Conversion', zh: '转化目标', de: 'Konversionsziel' },
  'adgen.audienceLabel': { es: 'Audiencia Objetivo', en: 'Target Audience', ja: 'ターゲット層', it: 'Pubblico di Destinazione', fr: 'Public Cible', zh: '目标受众画像', de: 'Zielgruppe' },
  'adgen.musicLabel': { es: 'Banda Sonora IA', en: 'AI Soundtrack', ja: 'AIサウンドトラック', it: 'Colonna Sonora IA', fr: 'Bande Sonore IA', zh: 'AI 生成背景配乐', de: 'KI-Soundtrack' },
  'adgen.formatLabel': { es: 'Formato', en: 'Format', ja: 'フォーマット', it: 'Formato', fr: 'Format', zh: '视频画幅', de: 'Format' },
  'adgen.qualityLabel': { es: 'Calidad', en: 'Quality', ja: '画質', it: 'Qualità', fr: 'Qualité', zh: '视频清晰度', de: 'Qualität' },
  'adgen.lengthLabel': { es: 'Duración', en: 'Length', ja: '再生時間', it: 'Durata', fr: 'Durée', zh: '时长', de: 'Länge' },
  'adgen.generateBtn': { es: 'GENERAR VIDEO PUBLICITARIO', en: 'GENERATE AD VIDEO', ja: '広告動画を生成', it: 'GENERA VIDEO PUBBLICITARIO', fr: 'GÉNÉRER LA VIDÉO PUB', zh: '立即生成营销视频', de: 'WERBEVIDEO GENERIEREN' },
  'adgen.generating': { es: 'Sintetizando Video 4K con IA...', en: 'Synthesizing 4K Video with AI...', ja: '4K動画をAI合成中...', it: 'Sintetizzando Video 4K con IA...', fr: 'Synthèse de la vidéo 4K en cours...', zh: 'AI 正在极速渲染 4K 视频...', de: '4K-Video wird generiert...' },
  'adgen.shopNow': { es: 'COMPRAR AHORA • DROP LIMITADO', en: 'SHOP NOW • LIMITED DROP', ja: '今すぐ購入 • 数量限定', it: 'ACQUISTA ORA • DROP LIMITATO', fr: 'ACHETER MAINTENANT • ÉDITION LIMITÉE', zh: '立即抢购 • 限量发售', de: 'JETZT SHOPPEN • LIMITIERT' },

  // Auth & 2FA
  'auth.twoFactorTitle': { es: 'Verificación en Dos Pasos (2FA / OTP)', en: 'Two-Step Verification (2FA / OTP)', ja: '2段階認証 (2FA / OTP)', it: 'Verifica in Due Passaggi (2FA / OTP)', fr: 'Vérification en Deux Étapes (2FA / OTP)', zh: '两步安全验证 (2FA / OTP)', de: 'Zwei-Faktor-Authentifizierung (2FA / OTP)' },
  'auth.enterCode': { es: 'Ingresa el código de 6 dígitos enviado a tu dispositivo', en: 'Enter the 6-digit verification code sent to your device', ja: 'デバイスに送信された6桁の認証コードを入力してください', it: 'Inserisci il codice di 6 cifre inviato al tuo dispositivo', fr: 'Entrez le code à 6 chiffres envoyé à votre appareil', zh: '请输入发送至您安全设备的 6 位数字验证码', de: 'Geben Sie den 6-stelligen Verifizierungscode ein' },
  'auth.verifyBtn': { es: 'Verificar e Ingresar', en: 'Verify & Enter', ja: '認証してログイン', it: 'Verifica e Accedi', fr: 'Vérifier et Accéder', zh: '验证并安全登录', de: 'Verifizieren & Anmelden' }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('aether_language_code');
    return (saved as LanguageCode) || 'es';
  });

  const setLanguage = (newLang: LanguageCode) => {
    setLanguageState(newLang);
    localStorage.setItem('aether_language_code', newLang);
  };

  const t = (key: string): string => {
    if (TRANSLATIONS[key] && TRANSLATIONS[key][language]) {
      return TRANSLATIONS[key][language];
    }
    // Fallback to English, then Spanish
    if (TRANSLATIONS[key] && TRANSLATIONS[key]['en']) {
      return TRANSLATIONS[key]['en'];
    }
    if (TRANSLATIONS[key] && TRANSLATIONS[key]['es']) {
      return TRANSLATIONS[key]['es'];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: SUPPORTED_LANGUAGES }}>
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
