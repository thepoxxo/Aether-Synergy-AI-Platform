import React, { useState, useEffect } from 'react';
import {
  Award,
  ShieldCheck,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  FileText,
  MessageCircle,
  Search,
  Filter,
  Globe2,
  MapPin,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Plus,
  X,
  Send,
  Sparkles,
  DollarSign,
  ThumbsUp,
  UserCheck,
  Scale,
  Leaf,
  Layers,
  Check,
  Copy,
  ChevronRight,
  HelpCircle,
  Paperclip
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface CertifiedExpertReview {
  id: string;
  expertId: string;
  clientName: string;
  clientCompany: string;
  ratingTechnical: number;
  ratingPunctuality: number;
  ratingClarity: number;
  ratingValue: number;
  overallRating: number;
  consultationType: string;
  comment: string;
  date: string;
  wouldRecommend: boolean;
}

export interface CertifiedExpert {
  id: string;
  name: string;
  title: string;
  country: string;
  flag: string;
  city: string;
  domain: 'fashion' | 'footwear' | 'furniture' | 'leather' | 'packaging' | 'legal_patents' | 'sustainability' | 'ai_3d_cgi';
  domainLabel: string;
  avatar: string;
  yearsOfExperience: number;
  rating: number;
  reviewsCount: number;
  hourlyRateUSD: number;
  verifiedDocuments: {
    degree: string;
    licenseNumber: string;
    university: string;
    certifiedBy: string;
  };
  languages: string[];
  bio: string;
  completedConsultations: number;
  isAvailableToday: boolean;
  linkedinUrl?: string;
  portfolioUrl?: string;
  isUserRegistered?: boolean;
}

export interface ConsultationBooking {
  id: string;
  expertId: string;
  expertName: string;
  clientName: string;
  date: string;
  time: string;
  consultationType: 'video_call_45' | 'techpack_audit_24h' | 'legal_patent_check' | 'factory_sourcing_negotiation';
  consultationTypeLabel: string;
  priceUSD: number;
  status: 'confirmed' | 'completed' | 'in_review';
  meetingRoomUrl: string;
  notes: string;
  createdAt: string;
}

const BASE_EXPERTS: CertifiedExpert[] = [
  {
    id: 'expert-01',
    name: 'Dra. Valentina Rossi',
    title: 'Master en Alta Costura & Moldería Industrial 3D',
    country: 'Italia',
    flag: '🇮🇹',
    city: 'Milán',
    domain: 'fashion',
    domainLabel: '👗 Moda & Patronaje Industrial',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    yearsOfExperience: 14,
    rating: 5.0,
    reviewsCount: 84,
    hourlyRateUSD: 75,
    verifiedDocuments: {
      degree: 'Master of Arts in Pattern Engineering & Haute Couture',
      licenseNumber: 'IT-ORD-DES-84920',
      university: 'Istituto Marangoni Milano',
      certifiedBy: 'Associazione Italiana Modellisti Sartoriali'
    },
    languages: ['Italiano', 'Español', 'English'],
    bio: 'Ex-jefa de patronaje para firmas de la Semana de la Moda de Milán. Especialista en graduación de tallas complejas, aplomo de manga sastre y optimización de corte textil en CLO3D.',
    completedConsultations: 142,
    isAvailableToday: true,
    linkedinUrl: 'https://linkedin.com/in/valentina-rossi-design',
    portfolioUrl: 'https://behance.net/valentinarossi'
  },
  {
    id: 'expert-02',
    name: 'Ing. Mateo Arboleda S.',
    title: 'Ingeniero Textil & Auditor de Calidad AQL 2.5',
    country: 'Colombia',
    flag: '🇨🇴',
    city: 'Medellín',
    domain: 'fashion',
    domainLabel: '🧵 Confección & Telas Técnicas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    yearsOfExperience: 11,
    rating: 4.9,
    reviewsCount: 63,
    hourlyRateUSD: 50,
    verifiedDocuments: {
      degree: 'Ingeniería Textil & Procesos de Tintura Sostenible',
      licenseNumber: 'CO-CPIT-59218',
      university: 'Universidad Pontificia Bolivariana',
      certifiedBy: 'Consejo Profesional de Ingeniería Textil'
    },
    languages: ['Español', 'English'],
    bio: 'Auditor líder de maquilas y talleres de confección. Especializado en análisis de rendimiento de gramajes, solidez al lavado AATCC y cálculo de costos COGS para exportación.',
    completedConsultations: 118,
    isAvailableToday: true,
    linkedinUrl: 'https://linkedin.com/in/mateo-arboleda-textil'
  },
  {
    id: 'expert-03',
    name: 'Alejandro Morales G.',
    title: 'Modelista Senior de Calzado & Hormas Ortopédicas',
    country: 'México',
    flag: '🇲🇽',
    city: 'León, Guanajuato',
    domain: 'footwear',
    domainLabel: '👟 Calzado & Hormas Técnicas',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    yearsOfExperience: 16,
    rating: 4.9,
    reviewsCount: 52,
    hourlyRateUSD: 60,
    verifiedDocuments: {
      degree: 'Lic. en Diseño de Calzado & Modelado de Suelas EVA',
      licenseNumber: 'MX-SEP-748910',
      university: 'Centro de Innovación Aplicada en Tecnologías Competitivas (CIATEC)',
      certifiedBy: 'Cámara de la Industria del Calzado de Guanajuato (CICEG)'
    },
    languages: ['Español', 'English'],
    bio: 'Más de 15 años diseñando sneakers urbanos y botas de trabajo con certificación de absorción de impacto. Experto en despieces de cuero vacuno y moldes de inyección TPU/EVA.',
    completedConsultations: 95,
    isAvailableToday: false,
    portfolioUrl: 'https://artstation.com/alejandromorales'
  },
  {
    id: 'expert-04',
    name: 'Lic. Helena De la Torre',
    title: 'Abogada Especialista en Patentes & Marcas de Moda',
    country: 'España',
    flag: '🇪🇸',
    city: 'Madrid',
    domain: 'legal_patents',
    domainLabel: '⚖️ Propiedad Intelectual & Patentes',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    yearsOfExperience: 12,
    rating: 5.0,
    reviewsCount: 71,
    hourlyRateUSD: 90,
    verifiedDocuments: {
      degree: 'Licenciatura en Derecho & Máster en Propiedad Intelectual',
      licenseNumber: 'ES-ICAM-93481',
      university: 'Universidad Complutense de Madrid',
      certifiedBy: 'Ilustre Colegio de la Abogacía de Madrid (ICAM)'
    },
    languages: ['Español', 'English', 'Français'],
    bio: 'Registro internacional de marcas (Protocolo de Madrid), protección de diseños industriales frente a copias y contratos de licencia y confidencialidad NDA para manufactura.',
    completedConsultations: 156,
    isAvailableToday: true,
    linkedinUrl: 'https://linkedin.com/in/helena-delatorre-ip'
  },
  {
    id: 'expert-05',
    name: 'Jean-Luc Dupont',
    title: 'Diseñador Industrial & Especialista en Madera CNC 5 Ejes',
    country: 'Francia',
    flag: '🇫🇷',
    city: 'Lyon / París',
    domain: 'furniture',
    domainLabel: '🪑 Mobiliario & Ergonomía CNC',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    yearsOfExperience: 15,
    rating: 4.9,
    reviewsCount: 44,
    hourlyRateUSD: 70,
    verifiedDocuments: {
      degree: 'Diplôme Supérieur d\'Arts Appliqués en Design de Mobilier',
      licenseNumber: 'FR-ENSCI-38291',
      university: 'École Nationale Supérieure de Création Industrielle (ENSCI-Les Ateliers)',
      certifiedBy: 'Fédération Française de l\'Ameublement'
    },
    languages: ['Français', 'English', 'Español'],
    bio: 'Desarrollo de sillas y mesas ergonómicas en contrachapado curvado, ensamble Minifix y despieces para centros de mecanizado CNC router de 3 y 5 ejes.',
    completedConsultations: 82,
    isAvailableToday: true,
    portfolioUrl: 'https://jeanlucdupont-design.fr'
  }
];

const INITIAL_REVIEWS: CertifiedExpertReview[] = [
  {
    id: 'rev-01',
    expertId: 'expert-01',
    clientName: 'Santiago Mejía',
    clientCompany: 'Aether Cyberwear Labs',
    ratingTechnical: 5,
    ratingPunctuality: 5,
    ratingClarity: 5,
    ratingValue: 5,
    overallRating: 5.0,
    consultationType: 'Auditoría de Moldería Bomber Oversized',
    comment: 'Valentina nos corrigió la curva de la sisa y la caída de la capucha en 30 minutos. Evitamos un error de producción que nos hubiera costado miles de dólares en la fábrica.',
    date: '28 Ago 2026',
    wouldRecommend: true
  },
  {
    id: 'rev-02',
    expertId: 'expert-04',
    clientName: 'Carolina Beltrán',
    clientCompany: 'Aura Luxury Footwear',
    ratingTechnical: 5,
    ratingPunctuality: 5,
    ratingClarity: 5,
    ratingValue: 5,
    overallRating: 5.0,
    consultationType: 'Registro de Marca & Protección de Suela',
    comment: 'Excelente asesoría legal. Nos redactó las cláusulas de cesión de derechos con la fábrica y realizó la búsqueda fonética en tiempo récord.',
    date: '01 Sep 2026',
    wouldRecommend: true
  }
];

const STORAGE_KEY_EXPERTS = 'aether_certified_experts_v1';
const STORAGE_KEY_BOOKINGS = 'aether_expert_bookings_v1';
const STORAGE_KEY_REVIEWS = 'aether_expert_reviews_v1';

export const ExpertConsultationsHub: React.FC = () => {
  const { user } = useAuth();

  // State with LocalStorage Persistence
  const [experts, setExperts] = useState<CertifiedExpert[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_EXPERTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        return [...BASE_EXPERTS, ...parsed];
      }
    } catch (e) {
      console.error(e);
    }
    return BASE_EXPERTS;
  });

  const [reviews, setReviews] = useState<CertifiedExpertReview[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_REVIEWS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REVIEWS;
  });

  const [bookings, setBookings] = useState<ConsultationBooking[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Filter States
  const [selectedExpert, setSelectedExpert] = useState<CertifiedExpert>(experts[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  // Modals
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isMyBookingsModalOpen, setIsMyBookingsModalOpen] = useState(false);
  const [isWhiteboardModalOpen, setIsWhiteboardModalOpen] = useState(false);
  const [isArbitrationModalOpen, setIsArbitrationModalOpen] = useState(false);
  const [isExamCertModalOpen, setIsExamCertModalOpen] = useState(false);
  const [examPassed, setExamPassed] = useState(false);

  // New Booking Form State
  const [bookDate, setBookDate] = useState('2026-10-25');
  const [bookTime, setBookTime] = useState('16:00');
  const [bookType, setBookType] = useState<any>('video_call_45');
  const [bookNotes, setBookNotes] = useState('');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regTitle, setRegTitle] = useState('');
  const [regCountry, setRegCountry] = useState('Colombia');
  const [regFlag, setRegFlag] = useState('🇨🇴');
  const [regCity, setRegCity] = useState('');
  const [regDomain, setRegDomain] = useState<any>('fashion');
  const [regExperience, setRegExperience] = useState(8);
  const [regDegree, setRegDegree] = useState('');
  const [regUniversity, setRegUniversity] = useState('');
  const [regLicense, setRegLicense] = useState('');
  const [regHourlyRate, setRegHourlyRate] = useState(60);
  const [regLanguages, setRegLanguages] = useState('Español, English');
  const [regBio, setRegBio] = useState('');
  const [regLinkedin, setRegLinkedin] = useState('');
  const [regPortfolio, setRegPortfolio] = useState('');

  // Rate Form State
  const [rateTech, setRateTech] = useState(5);
  const [ratePunctual, setRatePunctual] = useState(5);
  const [rateClarity, setRateClarity] = useState(5);
  const [rateValue, setRateValue] = useState(5);
  const [rateComment, setRateComment] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(true);

  // Handle Save New Booking
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabels: Record<string, string> = {
      video_call_45: '🎥 Videollamada Técnica 1-on-1 (45 Min)',
      techpack_audit_24h: '📋 Auditoría Express de TechPack (24h)',
      legal_patent_check: '⚖️ Validación Legal de Marca & Patente',
      factory_sourcing_negotiation: '🏭 Acompañamiento en Negociación con Fábrica'
    };

    const newBooking: ConsultationBooking = {
      id: 'book-' + Date.now(),
      expertId: selectedExpert.id,
      expertName: selectedExpert.name,
      clientName: user?.name || 'Diseñador Aether',
      date: bookDate,
      time: bookTime,
      consultationType: bookType,
      consultationTypeLabel: typeLabels[bookType] || 'Consulta Técnica',
      priceUSD: selectedExpert.hourlyRateUSD,
      status: 'confirmed',
      meetingRoomUrl: `https://meet.aethersynergy.ai/room-${Date.now().toString(36)}`,
      notes: bookNotes.trim(),
      createdAt: new Date().toLocaleDateString()
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(updated));

    setIsBookModalOpen(false);
    setBookNotes('');
    alert(`¡Consulta agendada con éxito con ${selectedExpert.name}! Tu sala virtual de reunión es: ${newBooking.meetingRoomUrl}`);
  };

  // Handle Save Register Expert
  const handleRegisterExpert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regTitle.trim() || !regCity.trim() || !regDegree.trim()) {
      alert('Por favor completa los campos obligatorios y la información de tu título.');
      return;
    }

    const domainLabels: Record<string, string> = {
      fashion: '👗 Moda & Patronaje Industrial',
      footwear: '👟 Calzado & Hormas Técnicas',
      furniture: '🪑 Mobiliario & Ergonomía CNC',
      leather: '👜 Marroquinería & Cuero de Lujo',
      packaging: '📦 Packaging & Troquelado',
      legal_patents: '⚖️ Propiedad Intelectual & Patentes',
      sustainability: '🌿 Sostenibilidad & Certificaciones',
      ai_3d_cgi: '🤖 Inteligencia Artificial & Renders 3D'
    };

    const newExpert: CertifiedExpert = {
      id: 'user-expert-' + Date.now(),
      name: regName.trim(),
      title: regTitle.trim(),
      country: regCountry,
      flag: regFlag,
      city: regCity.trim(),
      domain: regDomain,
      domainLabel: domainLabels[regDomain] || 'Consultoría Especializada',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      yearsOfExperience: Number(regExperience) || 5,
      rating: 5.0,
      reviewsCount: 1,
      hourlyRateUSD: Number(regHourlyRate) || 50,
      verifiedDocuments: {
        degree: regDegree.trim(),
        licenseNumber: regLicense.trim() || 'VERIFICADO-AETHER-2026',
        university: regUniversity.trim() || 'Universidad Acreditada',
        certifiedBy: 'Colegio / Asociación Profesional Oficial'
      },
      languages: regLanguages.split(',').map((l) => l.trim()).filter(Boolean),
      bio: regBio.trim() || 'Profesional colegiado verificado en la red de consultoría de Aether Synergy.',
      completedConsultations: 0,
      isAvailableToday: true,
      linkedinUrl: regLinkedin.trim(),
      portfolioUrl: regPortfolio.trim(),
      isUserRegistered: true
    };

    const updated = [newExpert, ...experts];
    setExperts(updated);
    setSelectedExpert(newExpert);

    const userOnly = updated.filter((ex) => ex.isUserRegistered);
    localStorage.setItem(STORAGE_KEY_EXPERTS, JSON.stringify(userOnly));

    setIsRegisterModalOpen(false);
    alert(`¡Felicitaciones ${newExpert.name}! Tu perfil profesional ha sido verificado y publicado en la Red de Consultoría Global.`);
  };

  // Handle Submit Review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rateComment.trim()) {
      alert('Por favor escribe tu opinión sobre la consulta.');
      return;
    }

    const overall = (rateTech + ratePunctual + rateClarity + rateValue) / 4;

    const newReview: CertifiedExpertReview = {
      id: 'rev-' + Date.now(),
      expertId: selectedExpert.id,
      clientName: user?.name || 'Cliente Verificado',
      clientCompany: user?.company || 'Marca de Diseño',
      ratingTechnical: rateTech,
      ratingPunctuality: ratePunctual,
      ratingClarity: rateClarity,
      ratingValue: rateValue,
      overallRating: overall,
      consultationType: 'Asesoría Técnica 1-on-1',
      comment: rateComment.trim(),
      date: 'Hoy (' + new Date().toLocaleDateString() + ')',
      wouldRecommend: wouldRecommend
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(updatedReviews));

    // Recalculate average
    const currentExpReviews = updatedReviews.filter((r) => r.expertId === selectedExpert.id);
    const avg = currentExpReviews.reduce((acc, r) => acc + r.overallRating, 0) / currentExpReviews.length;

    setExperts((list) =>
      list.map((ex) =>
        ex.id === selectedExpert.id
          ? { ...ex, rating: Number(avg.toFixed(1)), reviewsCount: currentExpReviews.length }
          : ex
      )
    );

    setIsRateModalOpen(false);
    setRateComment('');
    alert('¡Tu calificación y reseña técnica ha sido publicada con sello de Cliente Verificado!');
  };

  // Filter Logic
  const filteredExperts = experts.filter((ex) => {
    const matchSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDomain = selectedDomain === 'all' || ex.domain === selectedDomain;
    const matchCountry = selectedCountry === 'all' || ex.country.toLowerCase() === selectedCountry.toLowerCase();
    return matchSearch && matchDomain && matchCountry;
  });

  const selectedExpertReviews = reviews.filter((r) => r.expertId === selectedExpert.id);

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white font-mono text-xs select-none">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/95 p-6 rounded-3xl border border-cyber-gold/50 shadow-cyber-card backdrop-blur-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-cyber-gold/10 border border-cyber-gold text-cyber-gold shadow-gold-glow">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                RED DE PROFESIONALES CERTIFICADOS & MENTORÍA TÉCNICA
              </h2>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                TÍTULOS & DOCUMENTOS AUDITADOS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Consulta en vivo con ingenieros textiles, patronistas senior, abogados de marcas y modelistas de calzado para auditar tus diseños y evitar fallas de producción.
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsMyBookingsModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-cyber-950 hover:bg-cyber-800 text-slate-300 hover:text-white border border-cyber-700 font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Calendar className="w-4 h-4 text-cyber-gold" />
            <span>Mis Consultas ({bookings.length})</span>
          </button>

          <button
            onClick={() => setIsWhiteboardModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500 text-cyan-300 font-tech font-bold text-xs uppercase flex items-center gap-1.5 transition-all"
            title="Abrir sala de reunión con pizarra y anotaciones 3D en vivo"
          >
            <Video className="w-4 h-4 text-cyan-400" />
            <span>Pizarra 3D en Vivo</span>
          </button>

          <button
            onClick={() => setIsArbitrationModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500 text-purple-300 font-tech font-bold text-xs uppercase flex items-center gap-1.5 transition-all"
            title="Tribunal colegiado para resolución de disputas técnicas con fábricas"
          >
            <Scale className="w-4 h-4 text-purple-400" />
            <span>Tribunal Arbitraje</span>
          </button>

          <button
            onClick={() => setIsExamCertModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500 text-emerald-300 font-tech font-bold text-xs uppercase flex items-center gap-1.5 transition-all"
            title="Validación oficial de habilidades y certificado con QR"
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Certificado Aether</span>
          </button>

          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-extrabold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-all flex items-center gap-1.5"
          >
            <GraduationCap className="w-4 h-4" />
            <span>+ Postularme como Profesional</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-cyber-900/90 p-4 rounded-3xl border border-cyber-800 shadow-cyber-card">
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por especialidad, nombre o ciudad..."
              className="w-full bg-cyber-950 border border-cyber-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-gold"
            />
          </div>

          {/* Domain Filter */}
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="bg-cyber-950 border border-cyber-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
          >
            <option value="all">🎓 Todas las Disciplinas</option>
            <option value="fashion">👗 Moda & Patronaje Industrial</option>
            <option value="footwear">👟 Calzado & Hormas Técnicas</option>
            <option value="furniture">🪑 Mobiliario & Madera CNC</option>
            <option value="leather">👜 Marroquinería & Cuero</option>
            <option value="legal_patents">⚖️ Propiedad Intelectual & Marcas</option>
            <option value="sustainability">🌿 Sostenibilidad & Auditoría</option>
            <option value="ai_3d_cgi">🤖 IA & Renders 3D</option>
          </select>

          {/* Country Filter */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-cyber-950 border border-cyber-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyber-gold cursor-pointer"
          >
            <option value="all">🌍 Todos los Países</option>
            <option value="colombia">🇨🇴 Colombia</option>
            <option value="méxico">🇲🇽 México</option>
            <option value="españa">🇪🇸 España</option>
            <option value="italia">🇮🇹 Italia</option>
            <option value="francia">🇫🇷 Francia</option>
            <option value="estados unidos">🇺🇸 Estados Unidos</option>
          </select>
        </div>

        <div className="text-slate-400 text-[11px] font-mono">
          Mostrando <strong className="text-cyber-gold">{filteredExperts.length}</strong> mentores certificados
        </div>
      </div>

      {/* Main Grid: Experts Cards (7 Cols) + Active Expert Details & Booking (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Experts List */}
        <div className="lg:col-span-7 space-y-4">
          {filteredExperts.map((exp) => {
            const isSelected = selectedExpert.id === exp.id;
            const expReviews = reviews.filter((r) => r.expertId === exp.id);

            return (
              <div
                key={exp.id}
                onClick={() => setSelectedExpert(exp)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3.5 ${
                  isSelected
                    ? 'bg-cyber-900 border-cyber-gold shadow-gold-glow-lg'
                    : 'bg-cyber-950 border-cyber-800 hover:border-cyber-700 shadow-cyber-card'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="relative shrink-0">
                      <img
                        src={exp.avatar}
                        alt={exp.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-cyber-gold/50 shadow-md"
                      />
                      <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-black">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{exp.flag}</span>
                        <h3 className="font-tech font-bold text-base text-white">{exp.name}</h3>
                        {exp.isUserRegistered && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                            NUEVO MENTOR
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-amber-300 font-bold mt-0.5">{exp.title}</p>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span><MapPin className="w-3 h-3 text-cyber-gold inline" /> {exp.city}, {exp.country}</span>
                        <span>•</span>
                        <span className="text-cyan-300">{exp.yearsOfExperience} años exp.</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-center justify-end gap-1 text-cyber-gold font-bold text-sm">
                      <Star className="w-4 h-4 fill-cyber-gold text-cyber-gold" />
                      <span>{exp.rating.toFixed(1)}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({expReviews.length || exp.reviewsCount})</span>
                    </div>
                    <span className="text-base font-tech font-extrabold text-white block mt-0.5">
                      ${exp.hourlyRateUSD} USD / sesión
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">
                      {exp.isAvailableToday ? '⚡ Disponible Hoy' : '📅 Agenda Abierta'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">{exp.bio}</p>

                {/* Verified Credentials Badge Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-cyber-800 text-[10px]">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{exp.verifiedDocuments.degree}</span>
                  </div>

                  <span className="text-slate-400 font-mono">
                    {exp.completedConsultations} consultas realizadas
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 5 Cols: Selected Expert Dossier & Booking Station */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-cyber-900 border-2 border-cyber-gold/60 shadow-gold-glow-lg space-y-5">
            {/* Header with Avatar & Flag */}
            <div className="flex items-center justify-between pb-3 border-b border-cyber-800">
              <div className="flex items-center gap-3">
                <img
                  src={selectedExpert.avatar}
                  alt={selectedExpert.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-cyber-gold/50"
                />
                <div>
                  <h3 className="font-tech font-bold text-lg text-white">{selectedExpert.name}</h3>
                  <span className="text-xs text-cyan-300">{selectedExpert.domainLabel}</span>
                </div>
              </div>
              <span className="text-3xl">{selectedExpert.flag}</span>
            </div>

            {/* Verified Academic & Professional Credentials Card */}
            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2.5 text-xs font-mono">
              <span className="text-cyber-gold font-bold text-[10px] uppercase block tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" /> CREDENCIALES & TÍTULOS VERIFICADOS
              </span>

              <div className="space-y-1 text-slate-300">
                <p>🎓 <strong>Título:</strong> {selectedExpert.verifiedDocuments.degree}</p>
                <p>🏛️ <strong>Institución:</strong> {selectedExpert.verifiedDocuments.university}</p>
                <p>📜 <strong>Cédula / Licencia:</strong> <span className="text-emerald-400 font-bold">{selectedExpert.verifiedDocuments.licenseNumber}</span></p>
                <p>🌐 <strong>Idiomas de Consulta:</strong> {selectedExpert.languages.join(', ')}</p>
              </div>
            </div>

            {/* Ratings Breakdown */}
            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-cyber-gold">
                    {[1, 2, 3, 4, 5].map((st) => (
                      <Star
                        key={st}
                        className={`w-4 h-4 ${
                          st <= Math.round(selectedExpert.rating) ? 'fill-cyber-gold text-cyber-gold' : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-tech font-extrabold text-base text-white">{selectedExpert.rating.toFixed(1)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsReviewsModalOpen(true)}
                    className="text-cyan-400 hover:underline text-[11px] font-bold"
                  >
                    Ver {selectedExpertReviews.length} Reseñas
                  </button>

                  <button
                    onClick={() => setIsRateModalOpen(true)}
                    className="px-2.5 py-1 rounded-lg bg-cyber-gold/20 text-cyber-gold border border-cyber-gold/40 text-[10px] font-bold hover:bg-cyber-gold hover:text-black transition-all"
                  >
                    ⭐ Calificar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1 border-t border-cyber-800/80">
                <div>🧠 Dominio Técnico: <strong className="text-emerald-400">5.0 / 5.0</strong></div>
                <div>⏱️ Puntualidad: <strong className="text-cyan-300">4.9 / 5.0</strong></div>
                <div>💡 Claridad Asesoría: <strong className="text-purple-300">5.0 / 5.0</strong></div>
                <div>🌟 Recomendación: <strong className="text-cyber-gold">100%</strong></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-extrabold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 hover:opacity-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consulta con {selectedExpert.name.split(' ')[0]} (${selectedExpert.hourlyRateUSD} USD)</span>
              </button>

              {selectedExpert.linkedinUrl && (
                <a
                  href={selectedExpert.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 rounded-xl bg-cyber-950 hover:bg-cyber-800 border border-cyber-700 text-slate-300 hover:text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver Perfil Profesional & Portfolio Externo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MODAL 1: AGENDAR CONSULTA TÉCNICA 1-ON-1
          ========================================================= */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyber-gold/50 rounded-3xl p-6 max-w-xl w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsBookModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyber-gold/20 text-cyber-gold border border-cyber-gold">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">
                  AGENDAR CONSULTA TÉCNICA EN VIVO
                </h3>
                <p className="text-slate-400 text-xs">
                  Sesión privada con: <strong>{selectedExpert.name} ({selectedExpert.flag} {selectedExpert.title})</strong>
                </p>
              </div>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-3.5 pt-2">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Modalidad de Consulta:</label>
                <select
                  value={bookType}
                  onChange={(e) => setBookType(e.target.value)}
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyber-gold"
                >
                  <option value="video_call_45">🎥 Videollamada Técnica 1-on-1 (45 Min con Pantalla Compartida)</option>
                  <option value="techpack_audit_24h">📋 Auditoría Express de Ficha Técnica / TechPack (Respuesta en 24h)</option>
                  <option value="legal_patent_check">⚖️ Validación Legal de Marca & Patente de Diseño</option>
                  <option value="factory_sourcing_negotiation">🏭 Acompañamiento en Negociación con Fábrica</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Fecha de la Cita:</label>
                  <input
                    type="date"
                    required
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyber-gold"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Hora (Horario Local):</label>
                  <input
                    type="time"
                    required
                    value={bookTime}
                    onChange={(e) => setBookTime(e.target.value)}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyber-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Notas / Temas a Tratar en la Consulta:</label>
                <textarea
                  required
                  value={bookNotes}
                  onChange={(e) => setBookNotes(e.target.value)}
                  rows={3}
                  placeholder="Describe las dudas sobre moldería, materiales, tolerancias o problemas de costura..."
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyber-gold font-mono"
                />
              </div>

              <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Total a Invertir:</span>
                <span className="text-base font-tech font-extrabold text-cyber-gold">
                  ${selectedExpert.hourlyRateUSD} USD (Garantía de Satisfacción 100%)
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-extrabold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-all"
              >
                🚀 Confirmar Cita & Generar Sala Virtual
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 2: POSTULARME COMO PROFESIONAL CERTIFICADO
          ========================================================= */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-emerald-500/50 rounded-3xl p-6 max-w-2xl w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">
                  POSTULACIÓN DE PROFESIONAL CERTIFICADO
                </h3>
                <p className="text-slate-400 text-xs">
                  Únete a la red global de mentores y monetiza tus conocimientos técnicos asesorando a marcas
                </p>
              </div>
            </div>

            <form onSubmit={handleRegisterExpert} className="space-y-3.5 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Nombre Completo:</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="ej: Lic. Sofía Hernández"
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Título Profesional / Especialidad:</label>
                  <input
                    type="text"
                    required
                    value={regTitle}
                    onChange={(e) => setRegTitle(e.target.value)}
                    placeholder="ej: Especialista en Patronaje 3D & Confección"
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">País:</label>
                  <select
                    value={regCountry}
                    onChange={(e) => {
                      setRegCountry(e.target.value);
                      const flags: Record<string, string> = {
                        'Colombia': '🇨🇴', 'México': '🇲🇽', 'España': '🇪🇸', 'Italia': '🇮🇹',
                        'Francia': '🇫🇷', 'Estados Unidos': '🇺🇸', 'Perú': '🇵🇪', 'Argentina': '🇦🇷'
                      };
                      setRegFlag(flags[e.target.value] || '🌍');
                    }}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Colombia">🇨🇴 Colombia</option>
                    <option value="México">🇲🇽 México</option>
                    <option value="España">🇪🇸 España</option>
                    <option value="Italia">🇮🇹 Italia</option>
                    <option value="Francia">🇫🇷 Francia</option>
                    <option value="Estados Unidos">🇺🇸 Estados Unidos</option>
                    <option value="Perú">🇵🇪 Perú</option>
                    <option value="Argentina">🇦🇷 Argentina</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Ciudad:</label>
                  <input
                    type="text"
                    required
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    placeholder="ej: Bogotá, Guadalajara..."
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Disciplina Principal:</label>
                  <select
                    value={regDomain}
                    onChange={(e) => setRegDomain(e.target.value)}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="fashion">👗 Moda & Confección</option>
                    <option value="footwear">👟 Calzado & Suelas</option>
                    <option value="furniture">🪑 Mobiliario & CNC</option>
                    <option value="leather">👜 Cuero & Bolsos</option>
                    <option value="legal_patents">⚖️ Marcas & Patentes</option>
                    <option value="sustainability">🌿 Sostenibilidad</option>
                    <option value="ai_3d_cgi">🤖 IA & Renders 3D</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Título Universitario / Diplomado:</label>
                  <input
                    type="text"
                    required
                    value={regDegree}
                    onChange={(e) => setRegDegree(e.target.value)}
                    placeholder="ej: Lic. Diseño Industrial / Moda"
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Universidad / Institución Emisora:</label>
                  <input
                    type="text"
                    required
                    value={regUniversity}
                    onChange={(e) => setRegUniversity(e.target.value)}
                    placeholder="ej: Universidad de Buenos Aires / Politécnico"
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Cédula / Registro Profesional:</label>
                  <input
                    type="text"
                    value={regLicense}
                    onChange={(e) => setRegLicense(e.target.value)}
                    placeholder="ej: MAT-84920"
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Años Experiencia:</label>
                  <input
                    type="number"
                    value={regExperience}
                    onChange={(e) => setRegExperience(Number(e.target.value))}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Tarifa por Sesión ($ USD):</label>
                  <input
                    type="number"
                    value={regHourlyRate}
                    onChange={(e) => setRegHourlyRate(Number(e.target.value))}
                    className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Biografía & Trayectoria Profesional:</label>
                <textarea
                  required
                  value={regBio}
                  onChange={(e) => setRegBio(e.target.value)}
                  rows={2}
                  placeholder="Detalla tu experiencia con marcas, fábricas, software CAD y logros profesionales..."
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 text-black font-tech font-extrabold text-xs uppercase tracking-wider shadow-md hover:opacity-95 transition-all"
              >
                🏅 Enviar Postulación & Activar Perfil Verificado
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 3: MIS CONSULTAS & CITAS AGENDADAS
          ========================================================= */}
      {isMyBookingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyber-800 rounded-3xl p-6 max-w-xl w-full shadow-2xl text-white space-y-4 max-h-[85vh] overflow-y-auto relative">
            <button
              onClick={() => setIsMyBookingsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-cyber-800 pb-3">
              <h3 className="font-tech font-bold text-lg text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyber-gold" /> Mis Citas & Consultas Técnicas ({bookings.length})
              </h3>
              <p className="text-xs text-slate-400">Historial y salas de videollamada activas</p>
            </div>

            <div className="space-y-3">
              {bookings.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No tienes consultas agendadas actualmente. Explora la red de mentores y reserva tu primera sesión.
                </div>
              ) : (
                bookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-tech font-bold text-sm text-white">{b.consultationTypeLabel}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        CONFIRMADA 🟢
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">
                      Mentor: <strong>{b.expertName}</strong> • {b.date} a las {b.time}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-cyber-800">
                      <a
                        href={b.meetingRoomUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Entrar a la Sala Virtual</span>
                      </a>

                      <span className="font-mono text-cyber-gold font-bold">${b.priceUSD} USD</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 4: CALIFICAR Y RESEÑAR CONSULTA
          ========================================================= */}
      {isRateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyber-gold/50 rounded-3xl p-6 max-w-md w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsRateModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyber-gold/20 text-cyber-gold border border-cyber-gold">
                <Star className="w-6 h-6 fill-cyber-gold" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">
                  CALIFICAR ASESORÍA TÉCNICA
                </h3>
                <p className="text-slate-400 text-xs">
                  Evaluando a: <strong>{selectedExpert.name}</strong>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 pt-2">
              <div className="space-y-3 p-4 rounded-2xl bg-cyber-950 border border-cyber-800 text-xs">
                <div className="flex justify-between items-center">
                  <span>🧠 Dominio Técnico:</span>
                  <div className="flex gap-1 text-cyber-gold">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button type="button" key={s} onClick={() => setRateTech(s)}>
                        <Star className={`w-4 h-4 ${s <= rateTech ? 'fill-cyber-gold text-cyber-gold' : 'text-slate-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span>⏱️ Puntualidad:</span>
                  <div className="flex gap-1 text-cyber-gold">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button type="button" key={s} onClick={() => setRatePunctual(s)}>
                        <Star className={`w-4 h-4 ${s <= ratePunctual ? 'fill-cyber-gold text-cyber-gold' : 'text-slate-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span>💡 Claridad & Utilidad:</span>
                  <div className="flex gap-1 text-cyber-gold">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button type="button" key={s} onClick={() => setRateClarity(s)}>
                        <Star className={`w-4 h-4 ${s <= rateClarity ? 'fill-cyber-gold text-cyber-gold' : 'text-slate-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Comentario & Feedback:</label>
                <textarea
                  required
                  value={rateComment}
                  onChange={(e) => setRateComment(e.target.value)}
                  rows={3}
                  placeholder="Explica qué problemas pudiste solucionar y cómo fue el trato del mentor..."
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyber-gold font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyber-gold via-amber-400 to-yellow-500 text-black font-tech font-extrabold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-all"
              >
                ⭐ Publicar Reseña Verificada
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 5: VER RESEÑAS VERIFICADAS
          ========================================================= */}
      {isReviewsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyber-800 rounded-3xl p-6 max-w-xl w-full shadow-2xl text-white space-y-4 max-h-[85vh] overflow-y-auto relative">
            <button
              onClick={() => setIsReviewsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between border-b border-cyber-800 pb-3">
              <div>
                <h3 className="font-tech font-bold text-lg text-white">
                  Reseñas Verificadas ({selectedExpertReviews.length})
                </h3>
                <span className="text-xs text-cyber-gold">{selectedExpert.name} ({selectedExpert.title})</span>
              </div>
              <button
                onClick={() => {
                  setIsReviewsModalOpen(false);
                  setIsRateModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-cyber-gold text-black font-bold text-xs"
              >
                + Escribir Reseña
              </button>
            </div>

            <div className="space-y-3">
              {selectedExpertReviews.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  Aún no hay reseñas registradas para este mentor.
                </div>
              ) : (
                selectedExpertReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-tech font-bold text-xs text-amber-300">{rev.consultationType}</span>
                      <div className="flex items-center text-cyber-gold">
                        <Star className="w-3.5 h-3.5 fill-cyber-gold" />
                        <span className="text-xs font-bold ml-1">{rev.overallRating.toFixed(1)}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-cyber-900">
                      <span>Por <strong>{rev.clientName}</strong> ({rev.clientCompany})</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      {/* =========================================================
          MODAL: PIZARRA VIRTUAL 3D EN VIVO
          ========================================================= */}
      {isWhiteboardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyan-500/50 rounded-3xl p-6 max-w-2xl w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative font-mono text-xs">
            <button
              onClick={() => setIsWhiteboardModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-base text-white">SALA VIRTUAL & PIZARRA 3D EN TIEMPO REAL</h3>
                <p className="text-slate-400 text-[10px]">Herramientas de dibujo, flechas de aplomo y notas sobre mallas 3D</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3">
              <div className="aspect-video bg-black/80 rounded-xl border border-cyber-700 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500 text-black font-bold text-[9px]">EN VIVO 🟢</span>
                  <span className="px-2 py-0.5 rounded bg-cyber-900 border border-cyber-700 text-white font-bold text-[9px]">HD 1080p 60fps</span>
                </div>
                <Sparkles className="w-10 h-10 text-cyan-400 animate-pulse mb-2" />
                <span className="text-slate-300 font-bold">Malla 3D Sincronizada con el Mentor</span>
                <span className="text-[10px] text-slate-500">Latencia WebRTC: 24ms • Cifrado de Punto a Punto</span>
              </div>

              <div className="flex flex-wrap gap-2 text-[10px]">
                <button className="px-3 py-1.5 rounded-lg bg-cyber-900 border border-cyan-400 text-cyan-300 font-bold">✏️ Dibujar Trazo</button>
                <button className="px-3 py-1.5 rounded-lg bg-cyber-900 border border-cyber-700 text-slate-300 font-bold">📏 Medir Distancia</button>
                <button className="px-3 py-1.5 rounded-lg bg-cyber-900 border border-cyber-700 text-slate-300 font-bold">💬 Chat Técnico</button>
                <button className="px-3 py-1.5 rounded-lg bg-cyber-900 border border-cyber-700 text-slate-300 font-bold">📷 Captura de Corrección</button>
              </div>
            </div>

            <button
              onClick={() => alert('¡Sesión grabada y exportada con resumen automático de IA!')}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-tech font-extrabold text-xs uppercase shadow-md transition-all"
            >
              💾 Guardar Minuta de Sesión & Capturas de Corrección
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: TRIBUNAL DE ARBITRAJE B2B
          ========================================================= */}
      {isArbitrationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-purple-500/50 rounded-3xl p-6 max-w-lg w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative font-mono text-xs">
            <button
              onClick={() => setIsArbitrationModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-base text-white">TRIBUNAL DE ARBITRAJE TÉCNICO B2B</h3>
                <p className="text-slate-400 text-[10px]">Resolución de controversias y peritajes de calidad con fábricas</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 text-slate-300">
              <p>⚖️ <strong>Panel Arbitral:</strong> 3 Peritos Colegiados en Ingeniería Textil & Legal</p>
              <p>📋 <strong>Protocolo:</strong> Revisión de TechPack original vs muestras físicas con defecto</p>
              <p>⏱️ <strong>Tiempo de Dictamen:</strong> 72 Horas hábiles</p>
              <p>🛡️ <strong>Efecto Legal:</strong> Vinculante para liberación o reembolso de fondos Escrow</p>
            </div>

            <button
              onClick={() => alert('¡Expediente arbitral iniciado! Se han asignado 3 peritos colegiados para emitir dictamen.')}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-tech font-extrabold text-xs uppercase shadow-md transition-all"
            >
              ⚖️ Abrir Expediente de Arbitraje Técnico
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: CERTIFICACIÓN OFICIAL AETHER & EXAMEN
          ========================================================= */}
      {isExamCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-emerald-500/50 rounded-3xl p-6 max-w-lg w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative font-mono text-xs">
            <button
              onClick={() => setIsExamCertModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-base text-white">CERTIFICACIÓN OFICIAL AETHER DESIGNER</h3>
                <p className="text-slate-400 text-[10px]">Acreditación técnica en patronaje industrial, 3D WebGPU y TechPacks</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 text-slate-300">
              <p>📜 <strong>Evaluación:</strong> 25 Preguntas de tolerancias, encogimiento AATCC y cálculo de mermas</p>
              <p>🏅 <strong>Puntaje Mínimo de Aprobación:</strong> 85% / 100%</p>
              <p>🔍 <strong>Beneficio:</strong> Insignia de Diseñador Certificado y acceso prioritario a clientes B2B</p>
            </div>

            <button
              onClick={() => {
                setExamPassed(true);
                alert('¡Examen completado con 96/100! Tu Certificado Oficial Aether Certified Designer ha sido emitido con código QR verificable.');
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 text-black font-tech font-extrabold text-xs uppercase shadow-md transition-all"
            >
              {examPassed ? '✅ Certificado Emitido (Descargar PDF)' : '🎓 Iniciar Evaluación de Certificación'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
