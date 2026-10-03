# agents.md — POXXI STUDIO: Briefing Completo para Agentes de IA

> **Versión del documento:** 1.0.0 · Generado automáticamente el 3 de octubre de 2026  
> **Repositorio:** `thepoxxo/Aether-Synergy-AI-Platform` (rama `main`)  
> **Propósito:** Orientar a cualquier LLM/agente (Claude 5.5, GPT-6 Astra, Gemini 2.5 Pro) que tome este proyecto desde cero para que entienda su estructura, convenciones, límites y flujo de trabajo sin requerir contexto adicional.

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
| **Fundamento** | Prototipo React/Vite → Blueprint para migrar a producción real con modelos de 2026/2027 |

---

## 2. STACK TECNOLÓGICO

### Frontend (único stack — no hay backend separado)

```
React 18.3.1         → UI framework principal (SPA)
TypeScript 5.6.3     → Tipado estricto en todo el proyecto
Vite 6.0.1           → Bundler / Dev Server (puerto 5173)
Tailwind CSS 3.4.15  → Sistema de diseño (tema custom: "cyber")
Lucide React 0.468   → Iconografía única (NO usar otros icon packs)
Recharts 3.10.1      → Gráficas del Admin Console (SOLO esta librería)
Three.js 0.170.0     → Renderizado 3D WebGL
xlsx 0.18.5          → Exportación de reportes Excel
DOMPurify 3.4.16     → Sanitización de HTML (XSS prevention)
crypto-js 4.2.0      → Cifrado local de datos sensibles
canvas-confetti      → Animaciones de celebración (registro, upgrades)
```

### Servicios en la Nube (aún simulados en prototipo)

```
Supabase             → PostgreSQL + Auth + Storage (VITE_SUPABASE_URL)
Cloudflare R2        → CDN almacenamiento modelos .GLB y texturas 8K
Stripe               → Suscripciones SaaS (Pro $49/mo, Agency $149/mo)
LemonSqueezy         → Alternativa Stripe (Merchant of Record global)
Vercel               → Deploy y edge functions (vercel.json presente)
```

---

## 3. ESTRUCTURA DEL PROYECTO

```
PROYECTO WEB DE DISEÑO CON IA/
│
├── .vscode/                        # Configuración VS Code del equipo
│   ├── settings.json               # File nesting, formateo, temas
│   ├── extensions.json             # Extensiones recomendadas
│   ├── launch.json                 # Debug → Chrome en localhost:5173
│   └── tasks.json                  # Tareas: Dev, TSCheck, Build
│
├── docs/
│   ├── context/PROJECT_MASTER_CONTEXT.md  # Contexto maestro del proyecto
│   └── ROADMAP_CHECKLIST.md               # Lista de tareas pendientes
│
├── scripts/
│   ├── backup/                     # old_admin_source.txt, create_pdf_backup.py
│   └── utils/                      # analyze_channel.py, extract_systems.py
│
├── src/
│   ├── components/
│   │   ├── common/                 # Modales globales reutilizables
│   │   │   ├── CommandPalette.tsx  # Buscador universal Ctrl+K
│   │   │   ├── LoginModal.tsx
│   │   │   ├── UpgradeModal.tsx
│   │   │   ├── UserProfileModal.tsx
│   │   │   ├── AdminMasterModuleHubModal.tsx
│   │   │   └── ModuleMaintenanceScreen.tsx
│   │   │
│   │   ├── layout/                 # Estructura visual persistente
│   │   │   ├── Sidebar.tsx         # ← ARCHIVO CRÍTICO: categorías y permisos por rol
│   │   │   ├── Footer.tsx          # Pie con modales legales interactivos
│   │   │   ├── DesktopWindowHeader.tsx  # Barra superior estilo MacOS
│   │   │   └── MobileAppBottomNav.tsx
│   │   │
│   │   ├── mobile/                 # Versiones adaptadas para móvil
│   │   │   ├── MobileAurora3D.tsx
│   │   │   ├── MobilePoxxiReels.tsx
│   │   │   ├── MobileGlobalSuppliers.tsx
│   │   │   ├── MobileExpertConsultations.tsx
│   │   │   └── MobilePatternCutting2D.tsx
│   │   │
│   │   └── modules/                # ← 35+ MÓDULOS FUNCIONALES (core del producto)
│   │       ├── AdminConsole.tsx           # Solo admin — Recharts + métricas
│   │       ├── Aurora3DStudio.tsx         # Módulo principal MVP (Three.js)
│   │       ├── AdGenAI.tsx                # Generador de anuncios video Seedance
│   │       ├── AetherReelsTikTok.tsx      # Feed vertical 9:16
│   │       ├── AgencyWorkspaces.tsx       # Multi-marca (rol: agency)
│   │       ├── AILookbookStudio.tsx       # FLUX.1 modelos hiperrealistas
│   │       ├── APIGatewayHub.tsx          # 18 APIs con switch Live/Sim
│   │       ├── AutomoCalendar.tsx         # Publicación multicanal automática
│   │       ├── AutonomousAgentSwarm.tsx   # 4 agentes cooperando
│   │       ├── BrandKitStudio.tsx         # Paletas, logos, tipografía
│   │       ├── CinematicTurntable.tsx     # Loops 360° para anuncios
│   │       ├── ClothifySourcing.tsx       # Fichas técnicas y COGS
│   │       ├── CommunityExplore.tsx       # Galería pública + fork
│   │       ├── DigitalProductPassport.tsx # EU ESPR DPP QR blockchain
│   │       ├── DXFExportEngine.tsx        # AI → .DXF corte láser
│   │       ├── ExpertConsultationsHub.tsx # Red de expertos 1-on-1
│   │       ├── GlobalSuppliers.tsx        # Red B2B + vetting KYC/ESG
│   │       ├── JarvisHologramVoiceCore.tsx# Asistente voz bidireccional
│   │       ├── MediaBuyerCampaigns.tsx    # ROAS predictor, ads 4K
│   │       ├── MetaverseGamingExporter.tsx# Unreal / Roblox / Nanite USD
│   │       ├── ModuleStagingAdmin.tsx     # Control de despliegue gradual
│   │       ├── PatternCutting2D.tsx       # Patronaje con graduación XS-XXL
│   │       ├── PoxxiRevenueEngine.tsx     # Solo admin — Monetización
│   │       ├── ProductPhotoStudioViralPublisher.tsx # Facebook Graph API v20
│   │       ├── ProjectRoadmapChecklist.tsx# Estado del proyecto
│   │       ├── Scanner3D.tsx              # LiDAR escáner de prendas
│   │       ├── ShopifyLandingBuilderAI.tsx# Landing pages AI 1-clic
│   │       ├── ShopifyWidgetBuilder.tsx   # Generador iframe widget B2B
│   │       ├── SolesmithFootwear.tsx      # Calzado y suelas 3D
│   │       ├── SynthetixMascot.tsx        # Mascota animada asistente
│   │       ├── TextileEngineeringLab.tsx  # Simulación AATCC textil
│   │       ├── TrendForecaster.tsx        # Monitoreo pasarelas mundiales
│   │       ├── TrendSpiderAgent.tsx       # Scraping TikTok/Pinterest viral
│   │       ├── VersionControl3D.tsx       # Diff antes/después 3D
│   │       ├── VirtualRunwayLive.tsx      # Pasarela virtual con público
│   │       └── WorkflowAutomationsN8N.tsx # n8n orquestador visual
│   │
│   ├── context/
│   │   ├── AuthContext.tsx         # ← CENTRAL: roles, viewMode, user state
│   │   ├── DeviceModeContext.tsx   # Simulador: auto/mobile/tablet
│   │   ├── LanguageContext.tsx     # i18n (ES por defecto)
│   │   └── ThemeContext.tsx        # Tema visual (cyber dark)
│   │
│   ├── services/
│   │   ├── moduleStagingService.ts # Gestor de despliegue gradual (singleton)
│   │   ├── apiGateway.ts           # Centralizador de llamadas a APIs externas
│   │   ├── billingService.ts       # Lógica de Stripe y suscripciones
│   │   ├── db.ts                   # Abstracción de base de datos (Supabase/localStorage)
│   │   ├── excelReportGenerator.ts # Export XLSX para reportes admin
│   │   ├── facebookPublisherService.ts  # Graph API v20.0 publicación masiva
│   │   └── ambientAudio444Hz.ts    # Audio ambiente (ondas 444Hz en estudio)
│   │
│   ├── types/
│   │   ├── auth.ts                 # UserRole, User, DemoAccount, PlanFeature
│   │   ├── moduleStaging.ts        # ModuleAvailabilityStatus, RolloutPreset
│   │   ├── database.ts             # UserRegistrationData, StoredUser
│   │   ├── apiGateway.ts           # Tipos de respuesta de APIs
│   │   ├── adobe3dTools.ts         # Tipos 3D y mallas
│   │   ├── i18n.ts                 # Tipos de internacionalización
│   │   ├── theme.ts                # Tipos del sistema de temas
│   │   ├── productPhotoStudio.ts   # Tipos del estudio fotográfico
│   │   ├── userGoals.ts            # Objetivos y metas del usuario
│   │   └── workflowAutomation.ts   # Tipos de flujos n8n
│   │
│   ├── utils/
│   │   └── security.ts             # Utilidades DOMPurify y sanitización
│   │
│   ├── main.tsx                    # Punto de entrada React
│   └── vite-env.d.ts               # Declaraciones de env vars para TS
│
├── .env                            # Variables reales (NO committear)
├── .env.example                    # Plantilla de variables (sí committear)
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── schema.sql                      # Schema de Supabase PostgreSQL
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 4. SISTEMA DE ROLES Y ACCESO

El sistema de autorización está definido en [`src/types/auth.ts`](src/types/auth.ts) y orquestado por [`src/context/AuthContext.tsx`](src/context/AuthContext.tsx).

### Jerarquía de Roles (de menor a mayor privilegio)

```
guest → free → creator → pro → studio → agency → admin
```

### Planes Comerciales Activos

| Rol | Plan | Precio | Descripción |
|---|---|---|---|
| `free` | Free Starter | $0/mo | 5 modelos 3D/mes, marca de agua, 3 créditos IA/día |
| `pro` | Pro Studio | $49/mo | Motor 3D ilimitado, 25 videos Seedance, DXF export |
| `agency` | Agency Enterprise | $149/mo | Multi-marca (10), EU DPP, Trend Spider, 5 licencias |
| `admin` | Omni Admin Pass | $0 | Acceso total, Revenue Engine, AdminConsole, Banning |

### Cuentas Demo Precargadas

| Nombre | Email | Rol |
|---|---|---|
| Budon Master | admin@aethersynergy.ai | admin |
| Jane Doe | jane@quantumdigital.studio | agency |
| Sarah Connor | sarah.design@aurora.studio | pro |
| Alex Vance | alex.vance@freemail.com | free |

### Regla crítica de acceso

- El módulo `PoxxiRevenueEngine` y `AdminConsole` son **exclusivos del rol `admin`**.
- Los módulos Enterprise B2B (`trend_spider`, `dxf_engine`, `shopify_widget`, `dpp_eu`) también son `admin`-only en el prototipo.
- La función `hasAccess(requiredRole)` en AuthContext valida por jerarquía numérica, NO por string.

---

## 5. ARQUITECTURA DE ENRUTAMIENTO

No se usa React Router. El routing es **estado interno** en `App.tsx`:

```tsx
// src/App.tsx
const [currentView, setCurrentView] = useState<string>('aurora3d');
```

La vista cambia mediante:
1. **Sidebar** → `onModuleSelect(id)` → `setCurrentView(id)`
2. **CommandPalette (Ctrl+K)** → dispara `window.dispatchEvent(new CustomEvent('aether_navigate', { detail: moduleId }))`
3. **App.tsx** escucha `aether_navigate` con un `useEffect` y llama `setCurrentView`

El switch principal en `renderWorkspaceModule()` dentro de `App.tsx` mapea cada `currentView` string a su componente con `React.lazy()` + `<Suspense>`.

### Regla de rendimiento (OBLIGATORIA)

> **TODOS los módulos deben cargarse con `React.lazy()` y envolverse en `<Suspense>`**. Nunca importar módulos pesados directamente. Esto garantiza Code Splitting automático de Vite para bajo consumo de memoria.

---

## 6. SISTEMA DE MÓDULOS Y STAGING

Gestionado por el singleton [`src/services/moduleStagingService.ts`](src/services/moduleStagingService.ts).

### Estados de un módulo

```typescript
type ModuleAvailabilityStatus = 'active' | 'maintenance' | 'coming_soon' | 'beta' | 'deprecated';
```

### Presets de despliegue disponibles

| Preset | Descripción |
|---|---|
| `all_enabled_production` | Todos los módulos activos (estado actual) |
| `initial_mvp_design_only` | Solo Aurora3D, BrandKit, JARVIS, Admin activos |
| `maintenance_lockdown` | Todo en mantenimiento excepto Admin y Staging |

### Storage keys en localStorage

```
aether_module_staging_config_v1
aether_active_rollout_preset_v1
aether_admin_staging_override_v1
```

### Evento global de actualización

```
window.dispatchEvent(new Event('aether_staging_updated'))
```
`App.tsx` escucha este evento para re-renderizar el workspace.

---

## 7. CONVENCIONES DE CÓDIGO

### Nombrado de archivos

```
PascalCase para componentes:   Aurora3DStudio.tsx
camelCase para servicios:      moduleStagingService.ts
camelCase para hooks/utils:    useDeviceMode.ts
SCREAMING_SNAKE para constantes: DEFAULT_MODULE_CONFIGS, DEMO_ACCOUNTS
```

### Estructura de un módulo nuevo

Todo módulo debe:
1. **Exportar con named export** (`export const NombreModulo: React.FC`)
2. **Registrarse en `App.tsx`** con `React.lazy()` y un `case` en el switch
3. **Registrarse en `Sidebar.tsx`** bajo la categoría correcta con su `id`, `icon` de lucide-react y `requiredRole`
4. **Registrarse en `moduleStagingService.ts`** en `DEFAULT_MODULE_CONFIGS`
5. **Registrarse en `CommandPalette.tsx`** en `SEARCHABLE_MODULES` con keywords

### Sistema de diseño Tailwind (tema "cyber")

```
bg-cyber-950   → Fondo más oscuro (principal)
bg-cyber-900   → Fondo de paneles/cards
bg-cyber-800   → Hover de elementos
cyber-gold     → Color de acento primario (#E5A93C aprox.)
font-tech      → Fuente principal de títulos (monospace tech)
shadow-cyber-card      → Sombra estándar de cards
animate-fadeIn         → Transición de entrada de modales
```

> **NUNCA usar colores hex crudos** en los className. Siempre usar las variables del tema Tailwind definidas en `tailwind.config.js`.

### Iconografía

**Única librería de iconos:** `lucide-react`. No instalar ni usar `heroicons`, `react-icons`, `font-awesome` ni otros.

### Manipulación de archivos (regla crítica en Windows)

> **NUNCA usar PowerShell `Get-Content` / `Set-Content` para leer o escribir archivos `.tsx` o `.ts`** que contengan caracteres UTF-8 (ñ, é, ó, etc.). Esto corrompe el encoding. **Siempre usar Python** con `open(file, 'r', encoding='utf-8')` para operaciones masivas sobre archivos del proyecto.

---

## 8. APIs EXTERNAS INTEGRADAS

Todas las variables de entorno usan el prefijo `VITE_` (requerido por Vite para exponerlas al frontend).

### IA Central / LLMs

| Variable | Servicio | Uso en plataforma |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Google Gemini | Fichas técnicas, orquestador Swarm |
| `VITE_OPENAI_API_KEY` | OpenAI GPT-4o / Whisper | J.A.R.V.I.S. Speech-to-Text |
| `VITE_ANTHROPIC_API_KEY` | Claude Sonnet | Validación de moldes CAD y DXF |

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

> **Seedance 2.5** (API Pro/Turbo) es el motor de video preferido por el dueño para producción. Se menciona en el código como referencia principal.

### Imagen / Fotografía

| Variable | Servicio |
|---|---|
| `VITE_FAL_KEY` | FAL.ai → FLUX.1 Pro |
| `VITE_REPLICATE_API_TOKEN` | Replicate (FLUX, ControlNet) |
| `VITE_MIDJOURNEY_API_KEY` | Midjourney (via ImagineAPI) |
| `VITE_RECRAFT_API_KEY` | Vectores SVG y bordados |
| `VITE_STABILITY_API_KEY` | SDXL Turbo + ControlNet |

### Pagos e Infraestructura

| Variable | Servicio |
|---|---|
| `VITE_STRIPE_PUBLIC_KEY` | Suscripciones SaaS |
| `VITE_LEMONSQUEEZY_API_KEY` | Alternativa Stripe |
| `VITE_SHOPIFY_API_KEY/SECRET` | Exportación a tiendas |
| `VITE_SUPABASE_URL` | Base de datos + Auth |
| `VITE_SUPABASE_ANON_KEY` | Clave pública Supabase |
| `VITE_R2_*` | Cloudflare R2 CDN (modelos 3D) |

---

## 9. FLUJO DE TRABAJO DEL DESARROLLADOR / AGENTE

### Comandos disponibles

```bash
npm run dev          # Dev server en localhost:5173 (HMR activo)
npm run build        # Build producción (tsc && vite build)
npx tsc --noEmit     # Verificación de tipos SIN compilar
```

### Orden de trabajo para añadir un nuevo módulo

```
1. Crear src/components/modules/NuevoModulo.tsx
   └── export const NuevoModulo: React.FC = () => { ... }

2. Registrar en App.tsx (3 pasos):
   ├── Agregar: const NuevoModulo = lazy(() => import('./components/modules/NuevoModulo')...)
   ├── Agregar: case 'nuevo_id': return <NuevoModulo />;
   └── Verificar que esté dentro de <Suspense>

3. Registrar en Sidebar.tsx:
   └── Agregar ítem en la categoría correcta con icon de lucide-react

4. Registrar en moduleStagingService.ts:
   └── Agregar objeto en DEFAULT_MODULE_CONFIGS con id, name, category, status, version, phase

5. Registrar en CommandPalette.tsx:
   └── Agregar en SEARCHABLE_MODULES con title, desc, icon y keywords

6. Verificar: npx tsc --noEmit → debe salir código 0 sin errores

7. Commit: git add . && git commit -m "feat(módulo): descripción"
```

### Verificación obligatoria antes de cada commit

```bash
npx tsc --noEmit
# El comando DEBE retornar exit code 0.
# Si hay errores, NO se hace commit hasta resolverlos.
```

---

## 10. DATOS Y FECHAS CLAVE

| Evento | Fecha |
|---|---|
| Inicio del prototipo | Mid-2026 |
| Versión actual del prototipo | V2.5 (octubre 2026) |
| Arquitectura de React/Vite | Fase de blueprint |
| Migración planificada a producción real | Con Claude 5.5 + GPT-6 Astra (2027) |
| Regulación EU ESPR activa | 2026 (afecta módulo DPP) |
| AI Act Europea vigente | 2026 |
| Facebook Graph API utilizada | v20.0 |
| Versión de Tailwind usada | 3.x (NO 4.x — rompe clases actuales) |

---

## 11. LÍMITES Y RESTRICCIONES

### Lo que NO se debe hacer

| ❌ Prohibido | ✅ Correcto |
|---|---|
| Importar módulos sin `React.lazy()` | Siempre usar lazy + Suspense |
| Usar PowerShell para escribir archivos .tsx | Usar Python con UTF-8 encoding |
| Instalar otras librerías de iconos | Solo `lucide-react` |
| Usar colores hex crudos en Tailwind | Solo clases del tema `cyber-*` |
| Commitear `.env` con keys reales | Solo committear `.env.example` |
| Mostrar `PoxxiRevenueEngine` a roles no-admin | Verificar `role === 'admin'` |
| Usar `React Router` | El routing es por estado (`useState`) |
| Hacer `import` directo de módulos pesados | Siempre `lazy()` |
| Mezclar archivos Python/scripts en la raíz | Van en `scripts/utils/` o `scripts/backup/` |

### Límites técnicos del prototipo actual

- **Sin backend real:** Toda la autenticación es simulada vía `AuthContext` con `localStorage`. En producción usará Supabase.
- **Sin pagos reales:** Stripe está declarado pero no activo. En producción activar webhooks de Supabase.
- **Las APIs externas están simuladas:** La mayoría de módulos muestra UIs de simulación. Solo se activan con las keys del `.env`.
- **Tailwind 3.x — NO actualizar a 4.x** sin migrar todas las clases del tema custom primero.

---

## 12. VERIFICACIONES AUTOMÁTICAS

### Pre-commit checklist

```
□ npx tsc --noEmit → exit code 0
□ Nuevo módulo registrado en los 5 lugares (App.tsx, Sidebar, StagingService, CommandPalette + archivo)
□ Caracteres UTF-8 (ñ, é, ó) intactos en archivos .tsx
□ No se incluye .env en el commit
□ Los archivos scratch/Python van a scripts/, no a la raíz
□ Los modales de rol-admin tienen verificación: role === 'admin'
```

### Señales de que algo está mal

```
error TS2304: Cannot find name 'X'     → Falta import de lucide-react o estado useState
error TS1005: 'from' expected          → Import corrupto (víctima de PowerShell encoding)
error TS2322: Type 'string' not assignable → Literal type incorrecto en estado (usar type explícito)
Módulo no navega al cliquearlo         → Falta el case en el switch de App.tsx
Sidebar no muestra el módulo           → Falta el ítem en la categoría de Sidebar.tsx
CommandPalette no lo encuentra         → Falta en SEARCHABLE_MODULES de CommandPalette.tsx
```

---

## 13. CONTEXTO ESTRATÉGICO (PARA MODELOS SUCESORES)

Este repositorio es un **prototipo arquitectural de primer nivel**, no un producto final desplegado. Su propósito es:

1. **Demostrar la arquitectura completa** de una plataforma SaaS de moda con IA antes de integrar backends reales.
2. **Servir como blueprint** para que modelos más avanzados (Claude 5.5, GPT-6 Astra, Gemini 3) puedan retomar el trabajo sin empezar de cero.
3. **Validar UX y flujos de usuario** antes de invertir en infraestructura de producción costosa.
4. **La UI es el contrato:** Cada componente define exactamente qué API necesitará, qué datos espera, y qué flujo de negocio implementa.

### Instrucción directa al agente sucesor

> Cuando tomes este proyecto, **lee este archivo primero**. Luego lee `src/context/AuthContext.tsx`, `src/services/moduleStagingService.ts` y `src/App.tsx` en ese orden. Con esos tres archivos entenderás el 80% del sistema. El resto son módulos independientes que puedes explorar por demanda.

---

*© 2026 Poxxi Studio & Aether Synergy. Documento generado automáticamente por Antigravity AI Agent.*
