import React, { useState } from 'react';
import {
  Building2,
  Users,
  Shield,
  Plus,
  Lock,
  Share2,
  CheckCircle2,
  Eye,
  Key,
  ExternalLink,
  Trash2,
  Sparkles,
  Layers,
  Palette
} from 'lucide-react';

interface BrandWorkspace {
  id: string;
  name: string;
  logo: string;
  category: string;
  designsCount: number;
  membersCount: number;
  palette: string[];
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'director' | 'patternmaker' | 'sourcing' | 'reviewer';
  avatar: string;
}

export const AgencyWorkspaces: React.FC = () => {
  const [brands, setBrands] = useState<BrandWorkspace[]>([
    {
      id: 'brand-1',
      name: 'Aether Cyberwear Labs',
      logo: '⚡',
      category: 'Techwear & Avant-Garde',
      designsCount: 14,
      membersCount: 5,
      palette: ['#E5A93C', '#111116', '#06B6D4']
    },
    {
      id: 'brand-2',
      name: 'Solesmith Athletic Footwear',
      logo: '👟',
      category: 'Calzado Paramétrico 3D',
      designsCount: 8,
      membersCount: 3,
      palette: ['#F43F5E', '#0F172A', '#38BDF8']
    },
    {
      id: 'brand-3',
      name: 'Oporto Luxury Knitwear',
      logo: '🧶',
      category: 'Alta Costura & Algodón Pesado',
      designsCount: 6,
      membersCount: 4,
      palette: ['#F8FAFC', '#D97706', '#334155']
    }
  ]);

  const [activeBrandId, setActiveBrandId] = useState<string>('brand-1');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [isShareReviewModalOpen, setIsShareReviewModalOpen] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState<string>('');
  const [inviteRole, setInviteRole] = useState<'director' | 'patternmaker' | 'sourcing' | 'reviewer'>('patternmaker');

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 'm1',
      name: 'Santiago V.',
      email: 'santiago@aether.ai',
      role: 'director',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'm2',
      name: 'Elena Rostova',
      email: 'elena.patrones@milan.it',
      role: 'patternmaker',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'm3',
      name: 'Kenji Sato',
      email: 'kenji.sourcing@tokyo.jp',
      role: 'sourcing',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'm4',
      name: 'Cliente VIP Fashion Week',
      email: 'buyer@luxuryparis.com',
      role: 'reviewer',
      avatar: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=150&auto=format&fit=crop&q=80'
    }
  ]);

  const activeBrand = brands.find((b) => b.id === activeBrandId) || brands[0];

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    const newM: TeamMember = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };
    setTeamMembers([...teamMembers, newM]);
    setInviteEmail('');
    setIsInviteModalOpen(false);
    alert(`¡Invitación enviada con éxito a ${inviteEmail} como ${inviteRole.toUpperCase()}!`);
  };

  const handleCreateBrand = () => {
    const brandName = prompt('Ingresa el nombre de la nueva Marca o Proyecto de Agencia:');
    if (!brandName) return;
    const newB: BrandWorkspace = {
      id: `brand-${Date.now()}`,
      name: brandName,
      logo: '✨',
      category: 'Nueva Colección 3D',
      designsCount: 1,
      membersCount: 1,
      palette: ['#06B6D4', '#111116', '#E5A93C']
    };
    setBrands([...brands, newB]);
    setActiveBrandId(newB.id);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-6 rounded-3xl border border-indigo-500/40 shadow-cyber-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-indigo-500/20 border border-indigo-500 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                ESPACIOS DE TRABAJO MULTI-MARCA & EQUIPOS
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/50">
                AGENCIA & ENTERPRISE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Gestiona múltiples marcas independientes, asigna roles de equipo y comparte revisiones 3D privadas con clientes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShareReviewModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-cyber-950 border border-cyber-700 text-cyan-300 hover:text-white font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Enlace de Revisión para Clientes</span>
          </button>

          <button
            onClick={handleCreateBrand}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:opacity-90 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Marca</span>
          </button>
        </div>
      </div>

      {/* Brand Switcher Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {brands.map((b) => (
          <div
            key={b.id}
            onClick={() => setActiveBrandId(b.id)}
            className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
              activeBrandId === b.id
                ? 'bg-cyber-900 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                : 'bg-cyber-950/80 border-cyber-800 hover:border-cyber-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-2xl bg-cyber-950 border border-cyber-800">{b.logo}</span>
                <div>
                  <h3 className="font-tech font-bold text-sm text-white">{b.name}</h3>
                  <span className="text-[11px] text-slate-400 block">{b.category}</span>
                </div>
              </div>
              {activeBrandId === b.id && (
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[9px] font-mono font-bold">
                  ACTIVA
                </span>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-cyber-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{b.designsCount} Diseños 3D</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">Paleta:</span>
                <div className="flex -space-x-1">
                  {b.palette.map((c, i) => (
                    <span key={i} className="w-3.5 h-3.5 rounded-full border border-black" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team & Permissions Panel for Active Brand */}
      <div className="p-6 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-5 shadow-cyber-card">
        <div className="flex items-center justify-between border-b border-cyber-800 pb-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-tech font-bold text-base text-white">
                Equipo de Trabajo & Permisos • {activeBrand.name}
              </h3>
              <p className="text-xs text-slate-400">Colaboradores con acceso a este espacio de trabajo</p>
            </div>
          </div>

          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500 text-indigo-300 font-tech font-bold text-xs uppercase flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Invitar Colaborador</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 flex items-center gap-3.5 hover:border-indigo-500/40 transition-colors"
            >
              <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-indigo-500/50" />
              <div className="flex-1 min-w-0">
                <h4 className="font-tech font-bold text-xs text-white truncate">{member.name}</h4>
                <p className="text-[10px] text-slate-500 truncate font-mono">{member.email}</p>
                <span
                  className={`mt-1 inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                    member.role === 'director'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : member.role === 'patternmaker'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : member.role === 'sourcing'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  }`}
                >
                  {member.role === 'director'
                    ? 'Director Creativo'
                    : member.role === 'patternmaker'
                    ? 'Patronista CAD 2D'
                    : member.role === 'sourcing'
                    ? 'Comprador B2B'
                    : 'Revisor de Cliente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Invitar Colaborador */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-cyber-900 border border-indigo-500/50 rounded-3xl p-6 shadow-cyber-card text-white space-y-4">
            <h3 className="font-tech font-bold text-lg">Invitar Miembro a {activeBrand.name}</h3>
            <form onSubmit={handleInviteMember} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Correo Electrónico:</label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@estudiodiseno.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Rol y Permisos Asignados:</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full bg-cyber-950 border border-cyber-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-400"
                >
                  <option value="director">Director Creativo (Acceso Total & Publicación)</option>
                  <option value="patternmaker">Patronista CAD 2D (Acceso a DXF & Moldería)</option>
                  <option value="sourcing">Comprador B2B (Cotizaciones & Fábricas)</option>
                  <option value="reviewer">Revisor de Cliente (Solo Visualización 3D & Comentarios)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-cyber-950 text-slate-400 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold"
                >
                  Enviar Invitación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Enlace de Revisión Privada */}
      {isShareReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-cyber-900 border border-cyan-500/50 rounded-3xl p-6 shadow-cyber-card text-white space-y-4">
            <h3 className="font-tech font-bold text-lg flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" /> Enlace de Revisión con Contraseña
            </h3>
            <p className="text-xs text-slate-400">
              Permite a clientes y marcas patrocinadoras revisar la colección 3D en tiempo real con anotaciones sin editar tus archivos.
            </p>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-cyber-950 rounded-xl border border-cyber-800">
                <span className="text-slate-500 text-[10px] block">URL de Revisión Segura:</span>
                <span className="text-cyan-300 text-xs truncate block">
                  https://aether.design/review/{activeBrand.id}/x94k-vip
                </span>
              </div>
              <div className="p-3 bg-cyber-950 rounded-xl border border-cyber-800">
                <span className="text-slate-500 text-[10px] block">Contraseña de Acceso del Cliente:</span>
                <span className="text-emerald-400 text-sm font-bold">AETHER-2026-CLIENT</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('¡Enlace y contraseña de revisión copiados al portapapeles!');
                setIsShareReviewModalOpen(false);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              Copiar Enlace & PIN de Acceso
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
