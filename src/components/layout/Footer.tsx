import React, { useState } from 'react';
import { Linkedin, Twitter, Instagram, Youtube, X, ShieldCheck, Scale, Globe2, Briefcase, Scissors, FileText, Video } from 'lucide-react';
import { OFFICIAL_PLANS } from '../../types/auth';

const LEGAL_AND_INFO_DATA: Record<string, { title: string; icon: React.ReactNode; content: React.ReactNode }> = {
  aurora3d: {
    title: 'Estudio de Prenda 3D (Aurora)',
    icon: <Scissors className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <p>
          <strong>Visor y Simulación WebGL:</strong> Permite visualizar prendas en 3D, probar combinaciones de color, gramaje de tejido (GSM) y ubicación de gráficos antes de encargar muestras físicas.
        </p>
        <p>
          <strong>Propiedad Intelectual (100% tuya):</strong> Todos los bocetos, texturas y archivos 3D (.GLB, .OBJ) que crees en POXXI STUDIO te pertenecen. No reclamamos derechos ni regalías sobre tus ventas comerciales.
        </p>
        <p>
          <strong>Privacidad de Diseño:</strong> Tus archivos privados no se utilizan para entrenar modelos generativos de terceros.
        </p>
      </div>
    )
  },
  adgen: {
    title: 'Campañas de Video (AdGen)',
    icon: <Video className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <p>
          <strong>Dirección Audiovisual para Pre-venta:</strong> Integra motores de generación de video (como Seedance 2.5) con plantillas de dirección de arte pensadas para moda independiente: planos cortos de 2 a 3 segundos, luz natural de taller y grano de 35 mm.
        </p>
        <p>
          <strong>Transparencia (AI Act UE, Art. 50):</strong> De acuerdo con las obligaciones de transparencia vigentes desde agosto de 2026, recomendamos incluir la etiqueta <em>"Contiene imágenes generadas"</em> cuando publiques escenas sintéticas que puedan confundirse con grabaciones reales.
        </p>
      </div>
    )
  },
  clothify: {
    title: 'Fichas Técnicas y Patronaje (.DXF)',
    icon: <FileText className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <p>
          <strong>Tech Pack en PDF y Moldería:</strong> Calcula tablas de medidas graduadas (XS a XXL), consumo estimado de tela por prenda y costos de confección (COGS) para enviar a tu taller.
        </p>
        <p>
          <strong>Nota de Taller:</strong> Las medidas generadas sirven como ficha base de cotización. Antes de lanzar una orden de corte industrial masiva, el patronista del taller debe validar el encogimiento real del rollo de tela seleccionado.
        </p>
      </div>
    )
  },
  automo: {
    title: 'Calendario de Lanzamientos (Automo)',
    icon: <FileText className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <p>
          Organiza el calendario de contenido de cada drop para Instagram, TikTok y YouTube Shorts desde un solo panel.
        </p>
        <p>
          <strong>Buenas Prácticas de Publicación:</strong> El programador respeta los límites de frecuencia de cada red social para proteger el alcance orgánico de tu cuenta.
        </p>
      </div>
    )
  },
  b2b: {
    title: 'Directorio de Talleres B2B',
    icon: <Globe2 className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <p>
          <strong>Registro Documental de Proveedores:</strong> El módulo de proveedores solicita identificación fiscal, cantidades mínimas de pedido (MOQ), tiempos de muestra y certificaciones textiles (como OEKO-TEX o GOTS cuando aplican) antes de listar un taller.
        </p>
        <p>
          <strong>Alcance del Prototipo:</strong> POXXI STUDIO facilita el envío de fichas técnicas y la comparación de cotizaciones; los acuerdos de producción y pagos se formalizan directamente entre la marca y el taller.
        </p>
      </div>
    )
  },
  about: {
    title: 'Por qué construimos POXXI STUDIO',
    icon: <Globe2 className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <p>
          <strong>POXXI STUDIO</strong> nació para resolver un problema concreto de las marcas de ropa independientes: el capital que se pierde encargando 4 o 5 muestras físicas a ciegas antes de saber cómo cae la prenda o si el público la quiere comprar.
        </p>
        <p>
          Reunimos en un solo archivo el visor 3D de la prenda, la ficha técnica para el taller y el material visual de preventa.
        </p>
      </div>
    )
  },
  pricing: {
    title: 'Precios y Planes Oficiales',
    icon: <Briefcase className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <h4 className="font-bold text-white mb-2">3 Planes Claros (sin costos ocultos):</h4>
        <ul className="list-disc pl-5 space-y-2.5">
          <li>
            <strong>{OFFICIAL_PLANS.free.codeName} (${OFFICIAL_PLANS.free.monthlyPrice}/mes):</strong>{' '}
            {OFFICIAL_PLANS.free.summary} Incluye visor 3D y hasta 5 bocetos mensuales con marca de agua.
          </li>
          <li>
            <strong>{OFFICIAL_PLANS.pro.codeName} (${OFFICIAL_PLANS.pro.monthlyPrice}/mes o ${OFFICIAL_PLANS.pro.annualMonthlyPrice}/mes anual):</strong>{' '}
            {OFFICIAL_PLANS.pro.summary} Exportación 4K, Tech Pack PDF, patrones .DXF y ≈ 25 videos de anuncio al mes.
          </li>
          <li>
            <strong>{OFFICIAL_PLANS.agency.codeName} (${OFFICIAL_PLANS.agency.monthlyPrice}/mes o ${OFFICIAL_PLANS.agency.annualMonthlyPrice}/mes anual):</strong>{' '}
            {OFFICIAL_PLANS.agency.summary} Hasta 10 marcas, 5 licencias de equipo y Pasaporte Digital de Producto UE (ESPR).
          </li>
        </ul>
      </div>
    )
  },
  agencies: {
    title: 'Programa para Estudios y Talleres',
    icon: <Briefcase className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <p>
          Los estudios de diseño y talleres de confección que gestionan varias marcas pueden centralizar las fichas técnicas, revisiones 3D y entregas de cada cliente en espacios separados con el plan <strong>Taller ($149/mes)</strong>.
        </p>
      </div>
    )
  },
  community: {
    title: 'Comunidad y Asistente KAI',
    icon: <Scissors className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <p>
          <strong>Galería de Creadores:</strong> Comparte vistas 3D opcionalmente con otros diseñadores para recibir feedback de corte y proporción antes de producir.
        </p>
        <p>
          <strong>Asistente Técnico KAI:</strong> Copiloto de voz e interfaz diseñado para responder dudas de gramaje, costuras, márgenes de merma y navegación rápida dentro del estudio.
        </p>
      </div>
    )
  },
  terms: {
    title: 'Términos de Servicio y Transparencia',
    icon: <Scale className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <p><em>Última actualización: Octubre 2026</em></p>
        <h4 className="font-bold text-white mb-1">1. Titularidad de los Diseños</h4>
        <p>
          El usuario conserva el 100% de la titularidad sobre sus bocetos, patrones y prendas 3D. En los planes de pago (Colección y Taller), el uso comercial es completo y sin marcas de agua.
        </p>
        <h4 className="font-bold text-white mb-1 mt-3">2. Normativa Europea (AI Act & ESPR)</h4>
        <p>
          POXXI STUDIO proporciona herramientas de etiquetado de contenido generado por IA (Art. 50 AI Act) y plantillas para el Pasaporte Digital de Producto (ESPR). La veracidad de los datos de origen textil declarados en el pasaporte es responsabilidad de la marca comercializadora.
        </p>
        <h4 className="font-bold text-white mb-1 mt-3">3. Relación con Talleres B2B</h4>
        <p>
          POXXI STUDIO actúa como herramienta de software para creación de fichas técnicas y contacto. No somos parte contractual en las órdenes de manufactura entre marcas y fábricas.
        </p>
      </div>
    )
  },
  privacy: {
    title: 'Privacidad y Seguridad de Archivos',
    icon: <ShieldCheck className="w-5 h-5" />,
    content: (
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <p>
          <strong>Protección de Archivos de Diseño:</strong> Tus fichas técnicas (.PDF), patrones (.DXF) y mallas (.GLB/.OBJ) se transmiten mediante conexiones cifradas TLS 1.3 y se almacenan de forma privada por cuenta.
        </p>
        <p>
          <strong>Sin Entrenamiento con tu IP:</strong> No vendemos ni utilizamos tus moldes o bocetos privados para entrenar modelos públicos.
        </p>
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
      <footer className="w-full bg-cyber-950 border-t border-cyber-800 pt-12 pb-8 px-4 lg:px-8 mt-16 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Col 1: Brand Summary */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyber-gold flex items-center justify-center text-black font-extrabold text-sm">
                  P
                </div>
                <span className="font-bold text-white text-base tracking-wide">
                  POXXI STUDIO
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                Estudio digital para marcas de ropa independientes. Pasa tu boceto a prenda 3D, genera la ficha técnica de taller y prepara la campaña de preventa desde un mismo archivo.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a href="#" className="p-2 rounded-xl bg-cyber-900 hover:bg-cyber-800 text-slate-300 hover:text-cyber-gold transition-colors border border-cyber-800">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-xl bg-cyber-900 hover:bg-cyber-800 text-slate-300 hover:text-cyber-gold transition-colors border border-cyber-800">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-xl bg-cyber-900 hover:bg-cyber-800 text-slate-300 hover:text-cyber-gold transition-colors border border-cyber-800">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-xl bg-cyber-900 hover:bg-cyber-800 text-slate-300 hover:text-cyber-gold transition-colors border border-cyber-800">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Herramientas */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
                Plataforma
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" onClick={(e) => handleOpen(e, 'aurora3d')} className="hover:text-cyber-gold transition-colors">Estudio de Prenda 3D</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'clothify')} className="hover:text-cyber-gold transition-colors">Tech Pack y Patrones .DXF</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'adgen')} className="hover:text-cyber-gold transition-colors">Campañas de Video (AdGen)</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'automo')} className="hover:text-cyber-gold transition-colors">Calendario de Drops</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'b2b')} className="hover:text-cyber-gold transition-colors">Directorio de Talleres B2B</a></li>
              </ul>
            </div>

            {/* Col 3: Compañía */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
                Compañía
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" onClick={(e) => handleOpen(e, 'about')} className="hover:text-cyber-gold transition-colors">Por qué POXXI</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'pricing')} className="hover:text-cyber-gold transition-colors">Precios y Planes</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'agencies')} className="hover:text-cyber-gold transition-colors">Para Estudios y Talleres</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'community')} className="hover:text-cyber-gold transition-colors">Comunidad y Asistente KAI</a></li>
                <li><a href="#" onClick={(e) => handleOpen(e, 'terms')} className="hover:text-cyber-gold transition-colors font-semibold text-slate-200">Términos y Transparencia</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-cyber-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2026 POXXI STUDIO. Tus diseños son tuyos.</p>
            <div className="flex items-center gap-4">
              <a href="#" onClick={(e) => handleOpen(e, 'privacy')} className="hover:text-slate-300">Privacidad de Archivos</a>
              <span>•</span>
              <a href="#" onClick={(e) => handleOpen(e, 'terms')} className="hover:text-slate-300">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Info/Legal Modal Pop-up */}
      {activeModal && LEGAL_AND_INFO_DATA[activeModal] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-2xl bg-cyber-900 border border-cyber-700 shadow-cyber-card rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-cyber-800 bg-cyber-950">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyber-900 border border-cyber-700 text-cyber-gold rounded-lg">
                  {LEGAL_AND_INFO_DATA[activeModal].icon}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {LEGAL_AND_INFO_DATA[activeModal].title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 hover:bg-cyber-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto bg-cyber-900">
              {LEGAL_AND_INFO_DATA[activeModal].content}
            </div>

            <div className="p-4 border-t border-cyber-800 bg-cyber-950 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-cyber-800 hover:bg-cyber-700 text-white font-semibold text-xs rounded-lg border border-cyber-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
