import React, { useState } from 'react';
import { 
  LineChart, Wallet, ShoppingCart, Globe2, Sparkles, 
  TrendingUp, RefreshCw, Box, Gamepad2, Factory, Zap 
} from 'lucide-react';

export const PoxxiRevenueEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brokerage' | 'tryon' | 'gaming' | 'fomo'>('brokerage');

  return (
    <div className="h-full flex flex-col bg-cyber-950 text-slate-200 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="shrink-0 p-6 sm:p-8 bg-gradient-to-b from-emerald-950/40 to-transparent border-b border-emerald-900/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider rounded border border-emerald-500/30">
                MONETIZACIÓN 360° (v2026)
              </span>
            </div>
            <h1 className="text-3xl font-tech font-bold text-white flex items-center gap-3">
              <Wallet className="w-8 h-8 text-emerald-400" />
              Poxxi Revenue Engine
            </h1>
            <p className="text-slate-400 text-sm max-w-xl mt-2">
              Vías de monetización no convencionales. La IA no solo diseña, sino que vende, subasta, licencia y altera los precios en tiempo real para maximizar tus márgenes de ganancia y los de la plataforma.
            </p>
          </div>
          
          <div className="bg-cyber-900 p-4 rounded-2xl border border-cyber-800 text-right">
            <p className="text-[10px] text-slate-400 font-mono mb-1">PROYECCIÓN DE INGRESOS PASIVOS</p>
            <p className="text-2xl font-tech font-bold text-emerald-400">+$12,450.00 <span className="text-sm text-slate-500">USD/mes</span></p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 sm:p-8 max-w-6xl mx-auto w-full">
        
        {/* Nav Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-cyber-800 pb-4">
          <button
            onClick={() => setActiveTab('brokerage')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'brokerage' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.15)]' : 'text-slate-500 hover:text-slate-300 hover:bg-cyber-900'
            }`}
          >
            <Factory className="w-4 h-4" /> Bidding de Fábricas (B2B)
          </button>
          <button
            onClick={() => setActiveTab('gaming')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'gaming' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'text-slate-500 hover:text-slate-300 hover:bg-cyber-900'
            }`}
          >
            <Gamepad2 className="w-4 h-4" /> Licencias Web3 & Gaming
          </button>
          <button
            onClick={() => setActiveTab('fomo')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'fomo' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]' : 'text-slate-500 hover:text-slate-300 hover:bg-cyber-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Dynamic FOMO Pricing
          </button>
          <button
            onClick={() => setActiveTab('tryon')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'tryon' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'text-slate-500 hover:text-slate-300 hover:bg-cyber-900'
            }`}
          >
            <Globe2 className="w-4 h-4" /> Widget SaaS Shopify
          </button>
        </div>

        {/* Tab Contents */}
        <div className="space-y-6">
          {activeTab === 'brokerage' && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-cyber-900 p-6 rounded-3xl border border-cyber-800">
                <h3 className="text-xl font-tech font-bold text-white mb-2">Reverse-Manufacturing & Subastas IA</h3>
                <p className="text-sm text-slate-400 mb-6">
                  La IA desglosa tu modelo 3D en patrones de corte y calcula la tela (GSM). Luego, lanza una subasta inversa y silenciosa a más de 400 fábricas verificadas en el mundo. La fábrica que ofrezca la mejor relación calidad-tiempo-precio gana.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-cyber-950 p-5 rounded-2xl border border-emerald-500/20">
                    <p className="text-[10px] text-emerald-400 font-mono mb-2">OFERTA #1: GANADORA</p>
                    <p className="text-lg font-bold text-white">Fábrica "Textiles Guimarães"</p>
                    <p className="text-xs text-slate-400 mb-3">📍 Porto, Portugal • 100% Algodón Orgánico</p>
                    <div className="flex justify-between items-center text-sm border-t border-cyber-800 pt-3">
                      <span>Costo x Unidad:</span>
                      <span className="font-bold text-emerald-400">$12.50 USD</span>
                    </div>
                  </div>
                  <div className="bg-cyber-950 p-5 rounded-2xl border border-cyber-800 opacity-60">
                    <p className="text-[10px] text-slate-500 font-mono mb-2">OFERTA #2</p>
                    <p className="text-lg font-bold text-white">Medellín Moda S.A.</p>
                    <p className="text-xs text-slate-400 mb-3">📍 Antioquia, Colombia • French Terry</p>
                    <div className="flex justify-between items-center text-sm border-t border-cyber-800 pt-3">
                      <span>Costo x Unidad:</span>
                      <span className="font-bold">$14.20 USD</span>
                    </div>
                  </div>
                  <div className="bg-cyber-950 p-5 rounded-2xl border border-cyber-800 opacity-60">
                    <p className="text-[10px] text-slate-500 font-mono mb-2">OFERTA #3</p>
                    <p className="text-lg font-bold text-white">Shenzhen Apparel</p>
                    <p className="text-xs text-slate-400 mb-3">📍 Guangdong, China • Poliéster Mezcla</p>
                    <div className="flex justify-between items-center text-sm border-t border-cyber-800 pt-3">
                      <span>Costo x Unidad:</span>
                      <span className="font-bold">$9.80 USD (Lento)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-emerald-400">Modelo de Negocio para Poxxi (Escrow)</p>
                    <p className="text-xs text-slate-300">Poxxi retiene el pago como garantía y cobra un <span className="font-bold text-white">3% de fee (Comisión)</span> al cerrar el trato entre el diseñador y la fábrica.</p>
                  </div>
                  <button className="px-6 py-2 bg-emerald-500 text-black font-bold text-xs uppercase rounded-lg hover:bg-emerald-400">Aprobar Producción</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gaming' && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-cyber-900 p-6 rounded-3xl border border-cyber-800">
                <h3 className="text-xl font-tech font-bold text-white mb-2">Monetización del Gemelo Digital (Metaverso & Gaming)</h3>
                <p className="text-sm text-slate-400 mb-6">
                  ¿Por qué vender solo ropa física? Al crear un diseño en Poxxi, la IA lo convierte automáticamente en un "Asset (Activo) de Videojuego". Vende tu ropa como "Skins" en plataformas digitales con 1 solo clic.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 bg-cyber-950 p-4 rounded-2xl border border-cyber-800">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                      <Gamepad2 className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Roblox Creator Store</p>
                      <p className="text-xs text-slate-400">Exporta como archivo .RBXM rigging automático.</p>
                      <p className="text-[10px] text-purple-400 mt-1 font-mono">Poxxi cobra 10% de royalties por cada venta.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-cyber-950 p-4 rounded-2xl border border-cyber-800">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Box className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Unreal Engine (GTA 6 RP)</p>
                      <p className="text-xs text-slate-400">Exportación .FBX optimizada para MetaHumans.</p>
                      <p className="text-[10px] text-blue-400 mt-1 font-mono">Licencia B2B: $50 USD por servidor.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fomo' && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-cyber-900 p-6 rounded-3xl border border-cyber-800">
                <h3 className="text-xl font-tech font-bold text-white mb-2">Motor de Escasez y Precios Dinámicos (FOMO AI)</h3>
                <p className="text-sm text-slate-400 mb-6">
                  La IA rastrea el rendimiento de tus videos generados con Seedance en TikTok. Si un video se vuelve viral, la IA entra a tu tienda Shopify y aumenta el precio $5 USD automáticamente, limitando el stock visible para generar Compras por Pánico (FOMO).
                </p>
                
                <div className="relative h-48 bg-cyber-950 rounded-2xl border border-cyber-800 p-4 flex flex-col justify-end overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent"></div>
                  
                  {/* Fake Chart Lines */}
                  <div className="absolute bottom-12 left-0 w-full h-16 flex items-end justify-between px-4 opacity-50">
                    <div className="w-1/6 h-full bg-gradient-to-t from-rose-500 to-transparent rounded-t-sm"></div>
                    <div className="w-1/6 h-3/4 bg-gradient-to-t from-rose-500 to-transparent rounded-t-sm"></div>
                    <div className="w-1/6 h-1/2 bg-gradient-to-t from-rose-500 to-transparent rounded-t-sm"></div>
                    <div className="w-1/6 h-[90%] bg-gradient-to-t from-emerald-500 to-transparent rounded-t-sm"></div>
                    <div className="w-1/6 h-full bg-gradient-to-t from-emerald-500 to-transparent rounded-t-sm scale-y-125 origin-bottom"></div>
                  </div>

                  <div className="relative z-10 flex justify-between items-center border-t border-rose-500/30 pt-3">
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono">ESTADO DEL ALGORITMO</p>
                      <p className="text-sm font-bold text-rose-400 flex items-center gap-1"><Zap className="w-3 h-3" /> Pico Viral Detectado (+450% Vistas)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-mono">ACCIÓN EN SHOPIFY</p>
                      <p className="text-sm font-bold text-emerald-400">Precio aumentado a $89.99</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tryon' && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-cyber-900 p-6 rounded-3xl border border-cyber-800">
                <h3 className="text-xl font-tech font-bold text-white mb-2">Micro-SaaS: Widget de "AI Try-On" para E-Commerce</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Poxxi no solo es para ti. Genera un fragmento de código (Widget) y véndeselo a otras marcas para que lo peguen en sus tiendas. Sus clientes podrán subir una foto de cuerpo entero y probarse la ropa 3D usando la IA de la plataforma.
                </p>
                
                <div className="bg-black p-4 rounded-xl font-mono text-xs text-emerald-400 border border-cyber-700 overflow-x-auto">
                  <code>
                    &lt;script src="https://api.poxxi.studio/v1/try-on-widget.js" data-shop-id="your-store-123"&gt;&lt;/script&gt;<br/>
                    &lt;div id="poxxi-virtual-mirror"&gt;&lt;/div&gt;
                  </code>
                </div>

                <div className="mt-4 flex gap-4">
                  <div className="flex-1 bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20 text-center">
                    <p className="text-[10px] text-cyan-400 font-mono">SUSCRIPCIÓN B2B</p>
                    <p className="text-2xl font-bold text-white mt-1">$29<span className="text-sm text-slate-500">/mes</span></p>
                    <p className="text-xs text-slate-400 mt-1">Ingreso pasivo mensual por cada tienda Shopify que instale tu Widget.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
