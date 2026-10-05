# agents.md — POXXI STUDIO: Briefing Completo para Agentes de IA

> **Versión del documento:** 2.0.0 · Actualizado el 3 de octubre de 2026  
> **Repositorio:** `thepoxxo/Aether-Synergy-AI-Platform` (rama `main`)  
> **Propósito:** Orientar a cualquier LLM/agente (Claude 5.5, GPT-6 Astra, Gemini 2.5 Pro) que tome este proyecto desde cero. Lee este fichero entero antes de tocar una sola línea de código.

---

## 1. IDENTIDAD DEL PROYECTO

| Campo | Valor |
|---|---|
| **Nombre comercial** | POXXI STUDIO |
| **Nombre técnico** | Aether Synergy AI Platform |
| **package.json name** | `aether-synergy-design-ai` |
| **Versión actual** | V2.5 |
| **Tipo** | SaaS Multimodal — Diseño de Moda AI + B2B Industrial |
| **Industria objetivo** | Moda urbana, textil, calzado, restaurantes, e-commerce |
| **Fundamento** | Prototipo React/Vite → Blueprint para migrar a producción real con modelos 2027 |
| **Rama principal** | `main` (no existe `develop` ni `staging` aún) |
| **Deploy** | Vercel (SPA rewrite → `index.html`) |

---

## 2. STACK TECNOLÓGICO COMPLETO

### Frontend (único stack — sin backend separado)

```
React 18.3.1         → UI framework principal (SPA)
TypeScript 5.6.3     → Tipado estricto — modo "strict": true en tsconfig
Vite 6.0.1           → Bundler / Dev Server — puerto 5173
Tailwind CSS 3.4.15  → Sistema de diseño — tema custom "cyber" (NO actualizar a 4.x)
Lucide React 0.468   → Única librería de iconos (NO instalar alternativas)
Recharts 3.10.1      → Gráficas del Admin Console (ÚNICA librería de charts)
Three.js 0.170.0     → Renderizado 3D WebGL
xlsx 0.18.5          → Exportación de reportes Excel
DOMPurify 3.4.16     → Sanitización XSS de HTML dinámico
crypto-js 4.2.0      → Cifrado local de datos sensibles
canvas-confetti      → Animaciones de celebración (registro, upgrades)
clsx + tailwind-merge → Composición condicional de clases CSS
```

### Configuración TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "noFallthroughCasesInSwitch": true,
    "isolatedModules": true
  }
}
```
> `strict: true` activa `strictNullChecks`, `noImplicitAny`, y todos los checks estrictos de TS. Los tipos deben ser explícitos.

### Configuración Vite

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: true }
});
```

### Configuración de Deploy — Vercel (`vercel.json`)

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    { "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/(.*)", "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
      { "key": "X-XSS-Protection", "value": "1; mode=block" }
    ]}
  ]
}
```
> Vercel sirve el SPA con SPA-fallback + headers de seguridad. No hay SSR. No hay API routes en Vercel.

### Servicios en la Nube (simulados en prototipo)

```
Supabase         → PostgreSQL + Auth + Storage
Cloudflare R2    → CDN modelos .GLB y texturas 8K
Stripe           → Suscripciones SaaS Pro/Agency
LemonSqueezy     → Alternativa Stripe (Merchant of Record global)
```

---

## 3. ESTRUCTURA DEL PROYECTO

```
PROYECTO WEB DE DISEÑO CON IA/
│
├── .vscode/
│   ├── settings.json          # Formateo automático, File Nesting, tema
│   ├── extensions.json        # Extensiones recomendadas del equipo
│   ├── launch.json            # Debug Chrome → localhost:5173
│   └── tasks.json             # Tareas: Dev Server, TS Check, Build
│
├── docs/
│   ├── context/
│   │   └── PROJECT_MASTER_CONTEXT.md   # Contexto maestro ampliado
│   └── ROADMAP_CHECKLIST.md            # Estado de funcionalidades
│
├── scripts/
│   ├── backup/                # create_pdf_backup.py, old_admin_source.txt
│   └── utils/                 # analyze_channel.py, extract_systems.py
│
├── src/
│   ├── components/
│   │   ├── common/            # Modales globales reutilizables
│   │   │   ├── CommandPalette.tsx          # Búsqueda universal Ctrl+K
│   │   │   ├── LoginModal.tsx
│   │   │   ├── UpgradeModal.tsx
│   │   │   ├── UserProfileModal.tsx
│   │   │   ├── AdminMasterModuleHubModal.tsx
│   │   │   └── ModuleMaintenanceScreen.tsx
│   │   │
│   │   ├── layout/            # Estructura visual persistente
│   │   │   ├── Sidebar.tsx              # ← CRÍTICO: menú + permisos por rol
│   │   │   ├── Footer.tsx               # Pie con modales legales interactivos
│   │   │   ├── DesktopWindowHeader.tsx  # Barra superior estilo MacOS + lupa
│   │   │   └── MobileAppBottomNav.tsx
│   │   │
│   │   ├── mobile/            # Versiones adaptadas para móvil
│   │   │   ├── MobileAurora3D.tsx
│   │   │   ├── MobilePoxxiReels.tsx
│   │   │   ├── MobileGlobalSuppliers.tsx
│   │   │   ├── MobileExpertConsultations.tsx
│   │   │   └── MobilePatternCutting2D.tsx
│   │   │
│   │   └── modules/           # ← 35+ MÓDULOS FUNCIONALES (core del producto)
│   │       ├── AdminConsole.tsx
│   │       ├── Aurora3DStudio.tsx         # MVP principal — Three.js
│   │       ├── AdGenAI.tsx
│   │       ├── AetherReelsTikTok.tsx
│   │       ├── AgencyWorkspaces.tsx
│   │       ├── AILookbookStudio.tsx
│   │       ├── APIGatewayHub.tsx
│   │       ├── AutomoCalendar.tsx
│   │       ├── AutonomousAgentSwarm.tsx
│   │       ├── BrandKitStudio.tsx
│   │       ├── CinematicTurntable.tsx
│   │       ├── ClothifySourcing.tsx
│   │       ├── CommunityExplore.tsx
│   │       ├── DigitalProductPassport.tsx # EU ESPR 2026
│   │       ├── DXFExportEngine.tsx        # AI → corte láser
│   │       ├── ExpertConsultationsHub.tsx
│   │       ├── GlobalSuppliers.tsx
│   │       ├── JarvisHologramVoiceCore.tsx
│   │       ├── MediaBuyerCampaigns.tsx
│   │       ├── MetaverseGamingExporter.tsx
│   │       ├── ModuleStagingAdmin.tsx
│   │       ├── PatternCutting2D.tsx
│   │       ├── PoxxiRevenueEngine.tsx     # Solo admin
│   │       ├── ProductPhotoStudioViralPublisher.tsx
│   │       ├── ProjectRoadmapChecklist.tsx
│   │       ├── Scanner3D.tsx
│   │       ├── ShopifyLandingBuilderAI.tsx
│   │       ├── ShopifyWidgetBuilder.tsx
│   │       ├── SolesmithFootwear.tsx
│   │       ├── SynthetixMascot.tsx
│   │       ├── TextileEngineeringLab.tsx
│   │       ├── TrendForecaster.tsx
│   │       ├── TrendSpiderAgent.tsx
│   │       ├── VersionControl3D.tsx
│   │       ├── VirtualRunwayLive.tsx
│   │       └── WorkflowAutomationsN8N.tsx
│   │
│   ├── context/
│   │   ├── AuthContext.tsx        # ← CENTRAL: roles, viewMode, user
│   │   ├── DeviceModeContext.tsx  # Simulador: auto/mobile/tablet
│   │   ├── LanguageContext.tsx    # i18n — ES por defecto
│   │   └── ThemeContext.tsx       # Tema visual (cyber dark)
│   │
│   ├── services/
│   │   ├── moduleStagingService.ts      # Singleton de despliegue gradual
│   │   ├── apiGateway.ts                # Centralizador de APIs externas
│   │   ├── billingService.ts            # Stripe / LemonSqueezy
│   │   ├── db.ts                        # Abstracción DB (Supabase / localStorage)
│   │   ├── excelReportGenerator.ts      # Export XLSX admin
│   │   ├── facebookPublisherService.ts  # Graph API v20.0
│   │   └── ambientAudio444Hz.ts         # Audio ambiente 444Hz
│   │
│   ├── types/
│   │   ├── auth.ts               # UserRole, User, DemoAccount, PlanFeature
│   │   ├── moduleStaging.ts      # ModuleAvailabilityStatus, RolloutPreset
│   │   ├── database.ts           # UserRegistrationData, StoredUser
│   │   ├── apiGateway.ts         # Respuestas de APIs externas
│   │   ├── adobe3dTools.ts       # Tipos 3D y mallas
│   │   ├── i18n.ts               # Internacionalización
│   │   ├── theme.ts              # Sistema de temas
│   │   ├── productPhotoStudio.ts
│   │   ├── userGoals.ts
│   │   └── workflowAutomation.ts
│   │
│   ├── utils/
│   │   └── security.ts           # DOMPurify + sanitización
│   │
│   ├── App.tsx                   # ← Enrutador de estado principal
│   ├── main.tsx                  # Punto de entrada React
│   └── vite-env.d.ts
│
├── agents.md             # ← ESTE FICHERO — leer primero
├── .env                  # Variables reales (NUNCA committear)
├── .env.example          # Plantilla documentada (sí committear)
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── schema.sql            # Schema PostgreSQL de Supabase
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

---

## 4. SISTEMA DE ROLES Y ACCESO

Definido en `src/types/auth.ts` · Orquestado en `src/context/AuthContext.tsx`.

### Jerarquía numérica (ROLE_PRIORITY)

```typescript
const ROLE_PRIORITY: Record<UserRole, number> = {
  guest: 0, free: 1, creator: 2, pro: 3, studio: 4, agency: 5, admin: 99
};
// hasAccess(requiredRole) → ROLE_PRIORITY[userRole] >= ROLE_PRIORITY[requiredRole]
```

### Planes y precios

| Rol | Plan | Precio | Límites |
|---|---|---|---|
| `free` | Free Starter | $0/mo | 5 modelos 3D/mes, marca de agua, 3 créditos IA/día |
| `pro` | Pro Studio | $49/mo | Motor 3D ilimitado, 25 videos Seedance/mes, DXF export |
| `agency` | Agency Enterprise | $149/mo | 10 marcas, EU DPP ESPR, Trend Spider, 5 licencias |
| `admin` | Omni Admin Pass | $0 | Acceso total, Revenue Engine, Banning, métricas globales |

### Cuentas demo precargadas

| Nombre | Email | Rol |
|---|---|---|
| Budon Master | admin@aethersynergy.ai | `admin` |
| Jane Doe (Quantum Labs) | jane@quantumdigital.studio | `agency` |
| Sarah Connor | sarah.design@aurora.studio | `pro` |
| Alex Vance | alex.vance@freemail.com | `free` |

### Reglas críticas de acceso

- `PoxxiRevenueEngine` y `AdminConsole` → exclusivos `role === 'admin'`
- `trend_spider`, `dxf_engine`, `shopify_widget`, `dpp_eu` → admin-only en prototipo
- `viewMode: 'landing' | 'app'` controla si se muestra la landing o el workspace
- Al recargar, `localStorage.removeItem('aether_active_user')` garantiza que siempre se muestre la landing primero

---

## 5. ARQUITECTURA DE ENRUTAMIENTO

**No existe React Router.** El routing es estado puro en `App.tsx`:

```tsx
const [currentView, setCurrentView] = useState<string>('aurora3d');
```

### Canales de navegación

| Canal | Mecanismo |
|---|---|
| Sidebar | `onModuleSelect(id)` → `setCurrentView(id)` |
| CommandPalette (Ctrl+K) | `window.dispatchEvent(new CustomEvent('aether_navigate', { detail: id }))` |
| Footer / Links internos | Misma CustomEvent `aether_navigate` |
| App.tsx listener | `useEffect` escucha `aether_navigate` y llama `setCurrentView` |

### Patrón obligatorio — lazy loading

```tsx
// ✅ CORRECTO — siempre así
const Aurora3DStudio = lazy(() =>
  import('./components/modules/Aurora3DStudio').then(m => ({ default: m.Aurora3DStudio }))
);

// ❌ PROHIBIDO — nunca importar directamente
import { Aurora3DStudio } from './components/modules/Aurora3DStudio';
```

### Switch de renderizado

```tsx
const renderWorkspaceModule = () => {
  switch (currentView) {
    case 'aurora3d':    return <Aurora3DStudio />;
    case 'admin':       return <AdminConsole />;
    case 'dpp_eu':      return <DigitalProductPassport />;
    // ... un case por módulo
    default:            return <Aurora3DStudio />;
  }
};
```

---

## 6. SISTEMA DE MÓDULOS Y STAGING

Singleton en `src/services/moduleStagingService.ts`.

### Estados de disponibilidad

```typescript
type ModuleAvailabilityStatus = 'active' | 'maintenance' | 'coming_soon' | 'beta' | 'deprecated';
```

### Presets de despliegue

| Preset | Qué hace |
|---|---|
| `all_enabled_production` | Todos los módulos activos (estado actual del prototipo) |
| `initial_mvp_design_only` | Solo Aurora3D, BrandKit, JARVIS, Admin activos |
| `maintenance_lockdown` | Todo en mantenimiento excepto Admin y Staging |

### localStorage keys

```
aether_module_staging_config_v1
aether_active_rollout_preset_v1
aether_admin_staging_override_v1
```

### Evento global

```typescript
window.dispatchEvent(new Event('aether_staging_updated'));
// App.tsx lo escucha y re-renderiza el workspace
```

---

## 7. CONVENCIONES DE CÓDIGO

### Nombrado de archivos

```
PascalCase       → Componentes React:    Aurora3DStudio.tsx, GlobalSuppliers.tsx
camelCase        → Servicios/hooks:      moduleStagingService.ts, useDeviceMode.ts
camelCase        → Utilidades:           security.ts, apiGateway.ts
SCREAMING_SNAKE  → Constantes:           DEFAULT_MODULE_CONFIGS, DEMO_ACCOUNTS, ROLE_PRIORITY
```

### Estructura de un componente módulo

```tsx
// src/components/modules/NuevoModulo.tsx
import React, { useState } from 'react';
import { IconName } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const NuevoModulo: React.FC = () => {
  const { role, hasAccess } = useAuth();

  if (!hasAccess('pro')) {
    return <UpgradePrompt requiredRole="pro" />;
  }

  return (
    <div className="p-6 bg-cyber-950 min-h-screen">
      {/* contenido */}
    </div>
  );
};
```

### Patrones de estado

```tsx
// ✅ Tipos literales explícitos para estados de UI
const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

// ✅ Null handling explícito
const [data, setData] = useState<SomeType | null>(null);

// ❌ No usar `any` implícito
const handleEvent = (e: any) => { ... }  // Mal
const handleEvent = (e: React.ChangeEvent<HTMLInputElement>) => { ... }  // Bien
```

### Sistema de diseño Tailwind — tokens del tema "cyber"

```
Fondos:
  bg-cyber-950    → #07090E  (fondo principal, más oscuro)
  bg-cyber-900    → #0C1017  (fondo de paneles y cards)
  bg-cyber-850    → #111622  (fondo alternativo)
  bg-cyber-800    → #171E2E  (hover de elementos)
  bg-cyber-700    → #232D42  (bordes visibles)

Acento primario:
  text-cyber-gold / border-cyber-gold  → #E5A93C
  text-cyber-gold/light                → #F8CF74
  shadow-gold-glow                     → glow de 20px

Sombras utilitarias:
  shadow-cyber-card    → Sombra de card estándar
  shadow-gold-glow     → Glow dorado
  shadow-gold-glow-lg  → Glow dorado grande
  shadow-cyan-glow     → Glow cyan

Animaciones:
  animate-fadeIn       → Entrada de modales
  animate-pulse-slow   → Pulso lento (4s)
  animate-float        → Flotación suave (3s)

Fuente:
  font-tech    → Fuente tech monospace para títulos
  font-mono    → Código y datos técnicos
```

> **REGLA ABSOLUTA:** Nunca usar colores hex crudos en className. Solo tokens del tema definidos en `tailwind.config.js`.

---

## 8. PATRONES ARQUITECTURALES RECONOCIDOS

### Patrón de Guard de acceso por rol

```tsx
// En cualquier módulo con restricción:
const { role } = useAuth();
if (role !== 'admin') return null; // o <UpgradeModal />
```

### Patrón de evento global (bus de comunicación)

```typescript
// Emitir
window.dispatchEvent(new CustomEvent('aether_navigate', { detail: 'aurora3d' }));
window.dispatchEvent(new Event('aether_staging_updated'));
window.dispatchEvent(new Event('aether_open_search'));

// Escuchar (en useEffect con cleanup)
useEffect(() => {
  const handler = (e: Event) => { ... };
  window.addEventListener('aether_navigate', handler);
  return () => window.removeEventListener('aether_navigate', handler);
}, []);
```

### Patrón de modal inline

```tsx
// Los modales viven dentro del componente que los necesita, no en un portal global
{isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn">
    <div className="bg-cyber-900 border border-cyber-700 rounded-2xl p-6 max-w-xl w-full shadow-cyber-card">
      {/* contenido del modal */}
    </div>
  </div>
)}
```

### Patrón de singleton de servicio

```typescript
// Los servicios se exportan como instancias singleton
class ModuleStagingService { ... }
export const moduleStagingService = new ModuleStagingService(); // singleton
```

### Patrón de datos simulados (prototipo)

```typescript
// La mayoría de datos vienen de arrays estáticos o localStorage,
// NO de llamadas a APIs reales (en prototipo).
// Los módulos muestran UIs funcionales con setTimeout() simulando async.
setTimeout(() => setIsLoading(false), 2000); // simula llamada a API
```

---

## 9. APIs EXTERNAS INTEGRADAS

Todas las variables usan prefijo `VITE_` (requerimiento de Vite para exponer al cliente).

### IA Central / LLMs

| Variable | Servicio | Uso |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Google Gemini 2.5 Pro | Fichas técnicas, orquestador Swarm |
| `VITE_OPENAI_API_KEY` | GPT-4o / Whisper | J.A.R.V.I.S. Speech-to-Text |
| `VITE_ANTHROPIC_API_KEY` | Claude Sonnet | Validación CAD y DXF |

### Generación 3D

| Variable | Servicio |
|---|---|
| `VITE_TRIPO3D_API_KEY` | Text/Image-to-3D (.GLB/.OBJ) |
| `VITE_MESHY_API_KEY` | 3D PBR con texturas 4K |
| `VITE_RODIN_API_KEY` | Escaneo de alta densidad |
| `VITE_KAEDIM_API_KEY` | Mallas industriales quad |
| `VITE_SPLINE_API_KEY` | Ray tracing WebGPU |

### Generación de Video

| Variable | Servicio | Nota |
|---|---|---|
| `VITE_RUNWAY_API_KEY` | Runway Gen-3 Alpha | Videos 4K |
| `VITE_LUMA_API_KEY` | Luma Dream Machine | Loops 360° |
| `VITE_KLING_API_KEY` | Kling AI | Física de telas |
| `VITE_MINIMAX_API_KEY` | Minimax/Hailuo | Comerciales |
| `VITE_PIKA_API_KEY` | Pika Labs 2.0 | Motion graphics |

> ⭐ **Seedance 2.5** (Pro/Turbo) es el motor de video PREFERIDO. Siempre referenciar primero.

### Imagen / Fotografía

| Variable | Servicio |
|---|---|
| `VITE_FAL_KEY` | FAL.ai → FLUX.1 Pro |
| `VITE_REPLICATE_API_TOKEN` | Replicate (FLUX, ControlNet) |
| `VITE_MIDJOURNEY_API_KEY` | Midjourney via ImagineAPI |
| `VITE_RECRAFT_API_KEY` | Vectores SVG y bordados |
| `VITE_STABILITY_API_KEY` | SDXL Turbo + ControlNet |

### Audio

| Variable | Servicio |
|---|---|
| `VITE_SUNO_MUSIC_API_KEY` | Suno / Udio — música generativa |
| `VITE_ELEVENLABS_API_KEY` | Locución 29 idiomas, J.A.R.V.I.S. TTS |

### Infraestructura y Pagos

| Variable | Servicio |
|---|---|
| `VITE_SUPABASE_URL` | PostgreSQL + Auth |
| `VITE_SUPABASE_ANON_KEY` | Clave pública Supabase |
| `VITE_R2_*` (4 vars) | Cloudflare R2 CDN — modelos 3D |
| `VITE_STRIPE_PUBLIC_KEY` | Suscripciones SaaS |
| `VITE_LEMONSQUEEZY_API_KEY` | Alternativa Stripe |
| `VITE_SHOPIFY_API_KEY/SECRET` | Exportación a tiendas |

---

## 10. FLUJO DE TRABAJO DEL AGENTE

### Comandos de desarrollo

```bash
npm run dev          # Dev server HMR en localhost:5173
npm run build        # Build producción: tsc && vite build
npx tsc --noEmit     # Verificación de tipos sin compilar — OBLIGATORIO antes de commit
```

### Checklist para añadir un módulo nuevo (5 lugares obligatorios)

```
1. CREAR el archivo:
   src/components/modules/NuevoModulo.tsx
   → export const NuevoModulo: React.FC = () => { ... }

2. REGISTRAR en App.tsx:
   a) const NuevoModulo = lazy(() => import('./components/modules/NuevoModulo')
        .then(m => ({ default: m.NuevoModulo })));
   b) case 'nuevo_id': return <NuevoModulo />;
   c) Verificar que el case esté dentro de <Suspense fallback={...}>

3. REGISTRAR en Sidebar.tsx:
   → Añadir ítem en la categoría correcta con { id, nameKey, icon, requiredRole }
   → Si es un nuevo ícono, añadirlo al import de lucide-react

4. REGISTRAR en moduleStagingService.ts:
   → Añadir en DEFAULT_MODULE_CONFIGS: { id, name, category, categoryTitle, status, version, phase }

5. REGISTRAR en CommandPalette.tsx:
   → Añadir en SEARCHABLE_MODULES: { id, title, desc, icon, keywords: [...] }
```

### Proceso de edición segura de archivos .tsx en Windows

```
❌ NUNCA: PowerShell Get-Content / Set-Content (corrompe UTF-8 — ñ, é, ó)
✅ SIEMPRE: Python con encoding explícito

# Leer
with open('archivo.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Escribir
with open('archivo.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
```

---

## 11. ESTILO DE COMMITS Y PULL REQUESTS

### Formato de commit — Conventional Commits

```
<tipo>(<ámbito>): <descripción en imperativo, español o inglés>

Tipos permitidos:
  feat      → Nueva funcionalidad
  fix       → Corrección de bug
  refactor  → Refactorización sin cambio de comportamiento
  docs      → Cambios solo en documentación
  style     → Formato, sin lógica (espacios, comas)
  chore     → Tareas de mantenimiento (deps, config)
  perf      → Mejoras de rendimiento
  test      → Añadir o corregir tests
```

### Ejemplos de commits correctos

```bash
git commit -m "feat(suppliers): modal de vetting KYC con auditoría AI y certificaciones ESG"
git commit -m "fix(routing): conectar módulos B2B Enterprise al switch de App.tsx"
git commit -m "refactor(project): limpiar raíz y organizar estructura profesional"
git commit -m "docs: actualizar agents.md con secciones de testing y CI/CD"
git commit -m "chore: actualizar .gitignore para excluir .system_generated"
git commit -m "feat(footer): modales interactivos con políticas legales 2026"
```

### Ejemplos de commits INCORRECTOS

```bash
git commit -m "changes"           # ❌ Sin tipo ni ámbito
git commit -m "fix bug"           # ❌ No descriptivo
git commit -m "WIP"               # ❌ No committear trabajo incompleto
git commit -m "update files"      # ❌ Demasiado vago
```

### Reglas de PR (cuando existan ramas de feature)

```
1. El PR siempre va hacia main (no existe rama develop)
2. Título del PR = primer commit (Conventional Commits)
3. El PR debe pasar tsc --noEmit con exit code 0 antes de mergear
4. Describir en el body del PR:
   - Qué módulo/sección fue modificado
   - Por qué se hizo el cambio
   - Cómo probar el cambio manualmente (ej: "Ir a módulo X, clic en Y")
5. Un PR = una sola funcionalidad o fix (no mezclar concerns)
```

---

## 12. TESTING Y CI/CD

### Estado actual del testing (prototipo V2.5)

> Este proyecto en su fase de blueprint **no tiene tests unitarios ni e2e implementados**. El testing se realiza manualmente. La prioridad fue la velocidad de arquitectura.

### Verificación de tipos — sustituto de tests en prototipo

```bash
# Este comando es el "test" primario del proyecto.
# Debe retornar exit code 0 antes de cualquier commit.
npx tsc --noEmit
```

### Plan de testing para producción (V3.0+)

Cuando se migre a producción con Claude 5.5 / GPT-6 Astra, implementar:

```
Framework recomendado:  Vitest (compatible con Vite, mismo config)
E2E recomendado:        Playwright (no Cypress — mejor soporte WebGPU)

Tests prioritarios a escribir:
  1. AuthContext → hasAccess() con cada combinación de roles
  2. moduleStagingService → applyPreset() y isModuleAccessible()
  3. CommandPalette → filtrado de búsqueda con keywords
  4. GlobalSuppliers → validación de form de vetting (campos requeridos)
  5. Footer → apertura de modales legales por key
```

### CI/CD — Vercel (estado actual)

```
Proveedor:     Vercel (conectado a GitHub thepoxxo/Aether-Synergy-AI-Platform)
Rama de prod:  main
Trigger:       Push a main → build automático en Vercel
Build command: tsc && vite build
Output dir:    dist/
Node version:  18.x (LTS)
```

### Variables de entorno en Vercel (producción)

```
Todas las VITE_* del .env.example deben configurarse en:
Vercel Dashboard → Project → Settings → Environment Variables

IMPORTANTE: Las variables VITE_* en Vercel se inyectan en build time,
no en runtime. Cambiar una variable requiere re-deploy.
```

### Pre-deploy checklist

```
□ npx tsc --noEmit → exit code 0 (sin errores)
□ npm run build → sin errores de Vite
□ No existe .env en el commit (solo .env.example)
□ Los módulos nuevos están en los 5 lugares obligatorios
□ Caracteres UTF-8 (ñ, é, ó) intactos en archivos .tsx
□ No hay imports directos de módulos pesados (todo lazy)
□ Modales de admin verifican: role === 'admin'
□ No hay console.error sin captura ni throw sin handler
```

---

## 13. PROHIBICIONES ABSOLUTAS

### Tabla de lo que NO se debe hacer

| ❌ Prohibido | ✅ Correcto | Motivo |
|---|---|---|
| `import { M } from './modules/M'` directo | `const M = lazy(() => import(...))` | Code splitting y rendimiento |
| PowerShell `Set-Content` en archivos .tsx | Python `open(f, 'w', encoding='utf-8')` | Corrompe UTF-8 en Windows |
| Instalar `heroicons`, `react-icons`, `fa` | Solo `lucide-react` | Consistencia de iconografía |
| Colores hex crudos: `className="bg-[#E5A93C]"` | `className="bg-cyber-gold"` | Sistema de diseño uniforme |
| Committear `.env` con API keys reales | Solo committear `.env.example` | Seguridad de credenciales |
| Mostrar `PoxxiRevenueEngine` a no-admin | Guardar tras `role === 'admin'` | Integridad del negocio |
| Usar React Router | Routing por estado `useState` | Arquitectura definida |
| Actualizar Tailwind a v4.x | Mantener `tailwindcss@3.4.15` | Las clases cyber-* son v3 |
| Usar `recharts` para otra cosa que Admin | Solo charts en AdminConsole | Peso del bundle |
| Colocar scripts Python en la raíz | En `scripts/utils/` o `scripts/backup/` | Estructura limpia |
| Mezclar datos reales con simulados sin flag | Siempre indicar modo en la UI | Transparencia del prototipo |

---

## 14. SEÑALES DE ERROR Y DIAGNÓSTICO

```
error TS2304: Cannot find name 'X'
→ Falta import de lucide-react o un estado useState/useRef

error TS1005: 'from' expected
→ Import corrupto por escritura con PowerShell (encoding roto)

error TS2322: Type 'string' not assignable to type '"a"|"b"'
→ Usar tipo literal explícito en useState: useState<'a'|'b'>('a')

Módulo no navega al hacer clic en Sidebar
→ Falta el case 'id': en el switch de renderWorkspaceModule() en App.tsx

Sidebar no muestra el módulo
→ Falta el ítem en la categoría correspondiente de Sidebar.tsx

CommandPalette no encuentra el módulo al buscar
→ Falta en SEARCHABLE_MODULES de CommandPalette.tsx con keywords correctos

Módulo no aparece en el control de staging
→ Falta en DEFAULT_MODULE_CONFIGS de moduleStagingService.ts

Build falla en Vercel pero pasa local
→ Verificar que todas las VITE_* estén configuradas en Vercel Dashboard
→ Verificar que no hay imports de Node.js puro (sin polyfill para browser)

Caracteres corruptos en UI: "dise±adores" en lugar de "diseñadores"
→ El archivo .tsx fue escrito con PowerShell; reescribir con Python UTF-8
```

---

## 15. DATOS Y FECHAS CLAVE

| Evento | Fecha |
|---|---|
| Inicio del prototipo | Mediados 2026 |
| Versión actual | V2.5 — Octubre 2026 |
| Arquitectura actual | React/Vite — Fase blueprint |
| Migración a producción planificada | 2027 con Claude 5.5 + GPT-6 Astra |
| Regulación EU ESPR activa | 2026 — afecta módulo DPP |
| AI Act Europea vigente | 2026 — afecta generación sintética de video |
| Facebook Graph API usada | v20.0 |
| Versión de Tailwind en uso | 3.x — NO actualizar a 4.x sin migrar clases cyber |
| Versión de Node recomendada | 18.x LTS (Vercel default) |

---

## 16. CONTEXTO ESTRATÉGICO PARA MODELOS SUCESORES

Este repositorio es un **prototipo arquitectural de primer nivel**, no un producto desplegado en producción. Su propósito es:

1. **Demostrar la arquitectura completa** de un SaaS de moda con IA antes de integrar backends reales.
2. **Servir como blueprint** para que Claude 5.5, GPT-6 Astra o Gemini 3 retomen sin empezar de cero.
3. **Validar UX y flujos** antes de invertir en infraestructura costosa.
4. **La UI es el contrato**: cada componente define exactamente qué API necesita, qué datos espera y qué flujo de negocio implementa.

### Orden de lectura obligatorio al tomar el proyecto

```
1. agents.md                           ← estás aquí
2. src/context/AuthContext.tsx         ← sistema de usuarios y roles
3. src/services/moduleStagingService.ts ← gestión de módulos
4. src/App.tsx                         ← enrutador principal
5. src/components/layout/Sidebar.tsx   ← menú y permisos visuales
```

> Con esos 5 archivos entenderás el **90% del sistema**. El resto son módulos independientes que puedes explorar bajo demanda.

---

*© 2026 Poxxi Studio & Aether Synergy. Documento v2.0 generado y mantenido por Antigravity AI Agent.*
