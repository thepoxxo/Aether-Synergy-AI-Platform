import React, { useState } from 'react';
import { Sparkles, Linkedin, Twitter, Instagram, Youtube, MessageSquare, X, ShieldCheck, Scale, Globe2, Briefcase, Zap, FileText } from 'lucide-react';

const LEGAL_AND_INFO_DATA: Record<string, { title: string, icon: React.ReactNode, content: React.ReactNode }> = {
  'aurora3d': {
    title: 'Aurora 3D Studio',
    icon: <Zap className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300">
        <p><strong>Motor de Renderizado Neuronal (v5.2):</strong> Aurora 3D utiliza redes neuronales convolucionales para transformar bocetos 2D (texto o imagen) en mallas poligonales 3D (.obj, .gltf) en menos de 4.2 segundos.</p>
        <p><strong>Derechos de Propiedad Intelectual (IP):</strong> Todo diseño generado a través de Aurora 3D bajo una licencia <strong>PRO</strong> o <strong>AGENCIA</strong> otorga derechos de explotación comercial al 100% al usuario. La plataforma no retiene regalías sobre las ventas físicas.</p>
        <p><strong>Entrenamiento AI:</strong> En cumplimiento de la AI Act 2026, los diseños generados por los usuarios NO se utilizan para re-entrenar el motor fundacional a menos que el usuario marque explícitamente el "Opt-In de Entrenamiento Comunitario".</p>
      </div>
    )
  },
  'adgen': {
    title: 'Ad-Gen AI Video',
    icon: <Sparkles className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300">
        <p><strong>Generación Sintética de Video:</strong> Integración oficial con la API Seedance 2.5 Turbo. Permite generar avatares humanos sintéticos vistiendo las prendas renderizadas.</p>
        <p><strong>Deepfake y Leyes de Sintetización Visual 2026:</strong> Todos los anuncios generados incluyen una marca de agua criptográfica invisible (steganography) certificando que el humano es sintético. Esto cumple con las normativas de plataformas sociales para publicidad AI generada.</p>
      </div>
    )
  },
  'clothify': {
    title: 'Clothify Tech Pack',
    icon: <FileText className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300">
        <p>Generación automática de fichas técnicas industriales. Las medidas, consumo de tela, hilos, y tallaje se calculan mediante algoritmos de patronaje predictivo.</p>
        <p><strong>Tolerancia de Error:</strong> Aunque el margen de error es menor al 1.5%, la responsabilidad final sobre la orden de corte (Cut Order) y mermas recae sobre la fábrica. Se recomienda exportar en formato .DXF al motor de corte.</p>
      </div>
    )
  },
  'automo': {
    title: 'Automo Calendar',
    icon: <FileText className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300">
        <p>Orquestador automatizado de campañas de marketing. Sincronización directa con TikTok API y Meta Graph API.</p>
        <p><strong>Limites de API:</strong> Dependiendo del nivel de suscripción, los usuarios están limitados a publicar entre 10 y 500 post semanales automáticamente para evitar penalizaciones por comportamiento bot en redes sociales.</p>
      </div>
    )
  },
  'b2b': {
    title: 'B2B Suppliers Connect',
    icon: <Globe2 className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300">
        <p><strong>Auditoría KYC/ESG 2026:</strong> Todas las fábricas en la plataforma pasan por un protocolo estricto cruzado con bases de datos aduaneras para verificar estándares de gobernanza, condiciones laborales justas (Fair Trade) y emisiones (Scope 3).</p>
        <p><strong>Pagos Escrow:</strong> Las transacciones entre diseñador y fábrica se retienen en contratos inteligentes. Los fondos se liberan únicamente cuando el Control de Calidad en el país de destino certifica la orden.</p>
      </div>
    )
  },
  'about': {
    title: 'Sobre Nosotros',
    icon: <Globe2 className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300">
        <p><strong>POXXI STUDIO</strong> fue concebida como la cúspide de la integración AI para el diseño de moda. Lanzada en su arquitectura V2.5 a mediados de 2026, combinamos <strong>Aura Dynamics</strong> (motores predictivos) y <strong>Aether Synergy</strong> (conectividad y gestión blockchain de pasaportes europeos).</p>
        <p>Misión: Eliminar la fricción entre la conceptualización de una prenda y su distribución física, permitiendo que un equipo de una persona tenga la capacidad productiva de una corporación textil de 50 empleados.</p>
      </div>
    )
  },
  'pricing': {
    title: 'Precios y Licencias',
    icon: <Briefcase className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300">
        <h4 className="font-bold text-white mb-2">Estructura Tarifaria Oficial 2026:</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>FREE:</strong> Herramientas básicas de patronaje, renderizado limitado a 5 modelos 3D al mes. Marca de agua comercial.</li>
          <li><strong>PRO ($49/mes):</strong> Motor AI ilimitado. Seedance API integrada para 25 videos de anuncios mensuales. Fichas técnicas avanzadas y exportación DXF.</li>
          <li><strong>AGENCIA ($149/mes):</strong> Multi-espacios de trabajo (Manejo de hasta 10 marcas). Trend Spider ilimitado. Generación de EU Digital Product Passport (ESPR).</li>
          <li><strong>ADMIN (Custom):</strong> Rol de super administrador reservado para dueños de Poxxi, controlando telemetría, facturación global de Stripe y banneos.</li>
        </ul>
      </div>
    )
  },
  'agencies': {
    title: 'Red de Agencias',
    icon: <Briefcase className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300">
        <p>Las Agencias certificadas por POXXI operan bajo licencias de marca blanca, permitiéndoles ofrecer todo el stack de Inteligencia Artificial (Aura3D, AdGen) a sus clientes bajo su propia identidad corporativa.</p>
        <p>Para postularse al directorio oficial de Partners 2026, la agencia debe certificar ventas anuales de moda superiores a $200k USD y someterse a revisión de calidad comercial.</p>
      </div>
    )
  },
  'community': {
    title: 'Comunidad y Mascotas',
    icon: <Sparkles className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300">
        <p><strong>Poxxi Reels & Comunidad:</strong> El feed interno permite a los creadores mostrar sus activos 3D a la comunidad para generar validación antes de producir. Los usuarios pueden clonar (fork) diseños de otros, bajo la licencia <em>Creative Commons AI 4.0</em>, dando siempre el crédito en cadena de bloques al creador original.</p>
        <p><strong>Synthetix Mascot:</strong> El módulo de agentes conversacionales personalizados (Mascotas de Marca) permite a las tiendas e-commerce desplegar asistentes 3D impulsados por LLM GPT-6 Astra, entrenados exclusivamente en el inventario del usuario.</p>
      </div>
    )
  },
  'terms': {
    title: 'Términos de Servicio (TOS) & Políticas 2026',
    icon: <Scale className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300">
        <p><em>Última Actualización: Octubre 2026</em></p>
        <h4 className="font-bold text-white mb-2">1. Inteligencia Artificial y Regulación EU</h4>
        <p>En total cumplimiento de la directiva ESPR (Ecodesign for Sustainable Products Regulation) y la AI Act europea, declaramos que los sistemas de inferencia de Poxxi no presentan "Riesgo Inaceptable". Todos los Pasaportes de Producto Digital (DPP) generados son inmutables y registrados en ledger distribuido.</p>
        <h4 className="font-bold text-white mb-2 mt-4">2. Scraping y Web Data</h4>
        <p>El uso del módulo <em>Trend Spider AI</em> opera simulando la navegación de usuarios reales. Poxxi actúa únicamente como un "browser proxy" y el usuario final es responsable de cómo interpreta o replica las tendencias halladas. No violamos DMCA al no guardar videos crudos de TikTok, solo metadatos numéricos.</p>
        <h4 className="font-bold text-white mb-2 mt-4">3. Limitación de Responsabilidad</h4>
        <p>La plataforma no es responsable por disputas monetarias entre diseñadores y fábricas de la red B2B, sirviendo los "Smart Escrows" solo como herramienta técnica de facilitación. Para disputas, Poxxi emitirá un arbitraje digital vinculante.</p>
      </div>
    )
  },
  'privacy': {
    title: 'Privacidad y Ciberseguridad',
    icon: <ShieldCheck className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300">
        <p><strong>Cifrado PQC (Post-Quantum Cryptography):</strong> Todos los archivos industriales (.DXF, .OBJ) almacenados en Poxxi están protegidos con algoritmos resistentes a ataques cuánticos, asegurando que tu IP de diseño nunca sea sustraída industrialmente.</p>
        <p><strong>Biometría:</strong> Si utilizas el Escáner 3D LiDAR en personas físicas para medir tallaje, los datos topológicos se procesan localmente (Edge AI WebGPU) y nunca viajan a nuestros servidores en forma descifrada.</p>
      </div>
    )
  }
};

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleOpen = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    setActiveModal(key);
  };

  return (
    <>
      <footer className="w-full bg-cyber-950 border-t border-cyber-800/80 pt-12 pb-8 px-4 lg:px-8 mt-16 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Col 1: About */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyber-gold flex items-center justify-center text-black font-tech font-extrabold text-sm">
                  P
                </div>
                <span className="font-tech font-bold text-white text-base tracking-wider">
                  POXXI STUDIO & AETHER SYNERGY
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
                Plataforma digital de vanguardia que integra Inteligencia Artificial predictiva,
                modelado 3D en tiempo real, generación de anuncios de video (Seedance v2.5) y conexión directa con
                fabricantes B2B globales bajo estrictas normativas 2026 para revolucionar la moda urbana.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a href="#" className="p-2 rounded-xl bg-cyber-900 hover:bg-cyber-800 text-cyber-gold hover:text-white transition-colors border border-cyber-800">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-xl bg-cyber-900 hover:bg-cyber-800 text-cyber-gold hover:text-white transition-colors border border-cyber-800">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-xl bg-cyber-900 hover:bg-cyber-800 text-cyber-gold hover:text-white transition-colors border border-cyber-800">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-xl bg-cyber-900 hover:bg-cyber-800 text-cyber-gold hover:text-white transition-colors border border-cyber-800">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Platform */}
            <div>
              <h4 className="font-tech font-bold text-white uppercase tracking-wider mb-3 text-sm">
                Plataforma
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" onClick={(e) => handleOpen(e, 'aurora3d')} className="hover:text-cyber-gold transition-colors">Aurora 3D Studio</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'adgen')} className="hover:text-cyber-gold transition-colors">Ad-Gen AI Video</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'clothify')} className="hover:text-cyber-gold transition-colors">Clothify Tech Pack</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'automo')} className="hover:text-cyber-gold transition-colors">Automo Calendar</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'b2b')} className="hover:text-cyber-gold transition-colors">B2B Suppliers Connect</a></li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div>
              <h4 className="font-tech font-bold text-white uppercase tracking-wider mb-3 text-sm">
                Compañía
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" onClick={(e) => handleOpen(e, 'about')} className="hover:text-cyber-gold transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'pricing')} className="hover:text-cyber-gold transition-colors">Precios y Licencias</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'agencies')} className="hover:text-cyber-gold transition-colors">Red de Agencias</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'community')} className="hover:text-cyber-gold transition-colors">Comunidad y Mascotas</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'terms')} className="hover:text-cyber-gold transition-colors font-bold text-emerald-400">Términos y Políticas 2026</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-cyber-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2026 Poxxi Studio & Aether Synergy. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <a href="#" onClick={(e) => handleOpen(e, 'privacy')} className="hover:text-slate-300">Privacidad & PQC</a>
              <span>•</span>
              <a href="#" onClick={(e) => handleOpen(e, 'terms')} className="hover:text-slate-300">TOS (Leyes AI Act)</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Info/Legal Modal Pop-up */}
      {activeModal && LEGAL_AND_INFO_DATA[activeModal] && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn" onClick={() => setActiveModal(null)}>
          <div 
            className="w-full max-w-2xl bg-cyber-950 border border-cyber-700 shadow-[0_0_60px_rgba(16,185,129,0.15)] rounded-2xl overflow-hidden animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-cyber-800 bg-cyber-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                  {LEGAL_AND_INFO_DATA[activeModal].icon}
                </div>
                <h3 className="text-xl font-tech font-bold text-white tracking-wide">
                  {LEGAL_AND_INFO_DATA[activeModal].title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-2 hover:bg-cyber-800 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar bg-cyber-950">
              {LEGAL_AND_INFO_DATA[activeModal].content}
            </div>

            <div className="p-4 border-t border-cyber-800 bg-cyber-900/30 flex justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-6 py-2 bg-cyber-800 hover:bg-cyber-700 text-white font-bold rounded-lg border border-cyber-700 transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
