import React from 'react';
import { Sparkles, Linkedin, Twitter, Instagram, Youtube, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-cyber-950 border-t border-cyber-800/80 pt-12 pb-8 px-4 lg:px-8 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: About */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyber-gold flex items-center justify-center text-black font-tech font-extrabold text-sm">
                A
              </div>
              <span className="font-tech font-bold text-white text-base tracking-wider">
                AURA DYNAMICS & AETHER SYNERGY
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
              Plataforma digital de vanguardia que integra Inteligencia Artificial predictiva,
              modelado 3D en tiempo real, generación de anuncios de video y conexión directa con
              fabricantes B2B globales para revolucionar el diseño y la moda urbana.
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
              <a href="#" className="p-2 rounded-xl bg-cyber-900 hover:bg-cyber-800 text-cyber-gold hover:text-white transition-colors border border-cyber-800">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Platform */}
          <div>
            <h4 className="font-tech font-bold text-white uppercase tracking-wider mb-3 text-sm">
              Plataforma
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-cyber-gold transition-colors">Aurora 3D Studio</a></li>
              <li><a href="#" className="hover:text-cyber-gold transition-colors">Ad-Gen AI Video</a></li>
              <li><a href="#" className="hover:text-cyber-gold transition-colors">Clothify Tech Pack</a></li>
              <li><a href="#" className="hover:text-cyber-gold transition-colors">Automo Calendar</a></li>
              <li><a href="#" className="hover:text-cyber-gold transition-colors">B2B Suppliers Connect</a></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="font-tech font-bold text-white uppercase tracking-wider mb-3 text-sm">
              Compañía
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-cyber-gold transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-cyber-gold transition-colors">Precios y Licencias</a></li>
              <li><a href="#" className="hover:text-cyber-gold transition-colors">Red de Agencias</a></li>
              <li><a href="#" className="hover:text-cyber-gold transition-colors">Comunidad y Mascotas</a></li>
              <li><a href="#" className="hover:text-cyber-gold transition-colors">Términos de Servicio</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-cyber-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Aura Dynamics & Aether Synergy. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300">Privacidad</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Seguridad</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">API Documentation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
