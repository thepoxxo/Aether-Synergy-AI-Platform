# POXXI STUDIO — AI 3D Design & Industrial Workspace

> **Plataforma de vanguardia 2026** que integra IA predictiva, modelado 3D, generación de anuncios (Seedance 2.5), conexión B2B con fábricas globales y cumplimiento normativo EU (AI Act, ESPR, DPP).

---

## 🗂️ Estructura del Proyecto

```
PROYECTO WEB DE DISEÑO CON IA/
├── .vscode/                    # Configuración VS Code (settings, tasks, launch)
├── docs/
│   ├── context/
│   │   └── PROJECT_MASTER_CONTEXT.md
│   └── ROADMAP_CHECKLIST.md
├── public/                     # Assets estáticos
├── scripts/
│   ├── backup/                 # Scripts de backup y fuentes antiguas
│   └── utils/                  # Scripts de análisis y utilidades
├── src/
│   ├── components/
│   │   ├── common/             # Modales, paletas de búsqueda, etc.
│   │   ├── layout/             # Sidebar, Header, Footer
│   │   ├── mobile/             # Vistas móviles adaptadas
│   │   └── modules/            # ✨ Módulos principales de la plataforma
│   ├── context/                # AuthContext, LanguageContext, DeviceMode
│   ├── services/               # moduleStagingService, etc.
│   └── types/                  # Tipos TypeScript (auth, etc.)
├── .env                        # Variables de entorno (API Keys)
├── .env.example                # Plantilla de variables (commitable)
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Arrancar el Servidor de Desarrollo

```bash
npm run dev
```
> Disponible en: **http://localhost:5173**

---

## 🛠️ Comandos Clave

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo HMR (Vite) |
| `npm run build` | Build de producción optimizado |
| `npx tsc --noEmit` | Verificación de tipos TypeScript |

---

## 🧩 Módulos de la Plataforma

| Módulo | ID | Plan Requerido |
|---|---|---|
| Aurora 3D Studio | `aurora3d` | Free+ |
| Ad-Gen AI Video | `adgen` | Pro+ |
| Trend Spider AI | `trend_spider` | Admin |
| Red de Proveedores B2B | `globalsuppliers` | Free+ |
| EU DPP Generator (ESPR) | `dpp_eu` | Agencia |
| Motor .DXF Export | `dxf_engine` | Admin |
| Shopify Widget Builder | `shopify_widget` | Admin |
| Admin Console | `admin` | Admin |
| Revenue Engine | `revenue_engine` | Admin |

---

*© 2026 Poxxi Studio & Aether Synergy. Todos los derechos reservados.*
