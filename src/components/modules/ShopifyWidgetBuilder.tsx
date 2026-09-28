import React, { useState } from 'react';
import { Code, Layout, Copy, CheckCircle2, Box } from 'lucide-react';

export const ShopifyWidgetBuilder: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [btnColor, setBtnColor] = useState('#10b981');

  const snippet = `<!-- Poxxi 3D Try-On Widget -->
<script src="https://cdn.poxxi.studio/widget/v2.js" async></script>
<poxxi-try-on 
  product-id="px-8942-a" 
  theme-color="${btnColor}"
  button-text="PROBAR EN 3D">
</poxxi-try-on>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-cyber-950 text-slate-200 p-6 sm:p-8 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-tech font-bold text-white flex items-center gap-3">
          <Code className="w-8 h-8 text-emerald-400" />
          Shopify Widget Builder (B2B SaaS)
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Genera el código embebible para que tus clientes instalen el Probador Virtual 3D de Poxxi directamente en sus tiendas de Shopify, WooCommerce o Webflow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-cyber-900 border border-cyber-800 p-6 rounded-3xl space-y-6">
          <h3 className="font-tech font-bold text-lg text-white">Configuración Visual</h3>
          
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">Color del Botón Principal</label>
            <div className="flex gap-3">
              {['#10b981', '#3b82f6', '#f43f5e', '#a855f7', '#000000'].map(color => (
                <button 
                  key={color}
                  onClick={() => setBtnColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform ${btnColor === color ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            <label className="block text-xs font-mono text-slate-400 mb-2">Snippet HTML (Copiar y Pegar en Liquid)</label>
            <div className="bg-black rounded-xl p-4 font-mono text-[11px] text-emerald-400 overflow-x-auto border border-cyber-800">
              <pre>{snippet}</pre>
            </div>
            <button 
              onClick={handleCopy}
              className="absolute top-8 right-2 p-2 bg-cyber-800 rounded-lg hover:bg-cyber-700 text-white"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400"/> : <Copy className="w-4 h-4"/>}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center border-4 border-cyber-800 relative">
          <div className="absolute top-4 left-4 text-slate-400 text-xs font-bold flex items-center gap-1">
            <Layout className="w-4 h-4"/> PREVIEW TIENDA CLIENTE
          </div>
          
          <div className="w-full max-w-sm bg-slate-50 rounded-2xl p-4 shadow-xl border border-slate-200 mt-6">
             <div className="w-full h-48 bg-slate-200 rounded-xl mb-4 flex items-center justify-center">
               <Box className="w-12 h-12 text-slate-400" />
             </div>
             <h4 className="text-slate-800 font-bold text-lg">Chaqueta Neo-Tokyo</h4>
             <p className="text-slate-500 text-sm mb-4">$120.00 USD</p>
             <button 
               className="w-full py-3 rounded-lg text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-colors"
               style={{ backgroundColor: btnColor }}
             >
               <Box className="w-5 h-5" />
               PROBAR EN 3D (AR)
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
