# 🌟 AETHER SYNERGY — DOCUMENTO MAESTRO DE CONTEXTO & ARQUITECTURA (MASTER CONTEXT)

> **Propósito de este documento:** Este archivo contiene el historial completo, arquitectura técnica, decisiones de diseño, módulos desarrollados, versiones y estado actual de la plataforma **Aether Synergy**. Al leer este documento en cualquier sesión o chat, cualquier agente de IA o desarrollador tendrá el 100% del contexto operativo y conceptual del proyecto.

---

## 📌 1. Visión General del Proyecto & Modelo de Negocio

**Aether Synergy** es una plataforma SaaS de diseño 3D e inteligencia artificial generativa orientada a tres industrias clave:
1. 👗 **Moda Urbana & Streetwear Cel-Shaded:** Chaquetas techwear con arneses y bolsillos modulares, hoodies oversized, sneakers cyberpunk.
2. 🛋️ **Diseño & Decoración de Interiores:** Muebles escandinavos, mesas minimalistas, iluminación de espacios.
3. 🎛️ **Instrumentalización & Hardware de Audio:** Sintetizadores modulares con pantallas OLED, monitores de estudio.
4. ☕ **Merchandising de Marca:** Botellas térmicas, packaging y accesorios.

### 💰 Niveles de Suscripción & Roles RBAC:
* **Free Starter ($0):** Acceso al visor 3D básico con marca de agua, 5 créditos de prueba de IA.
* **Pro Studio ($49 / mes):** Exportación 4K sin marcas de agua, 50 créditos de video con Sora/Gen-3, texturizado PBR/Cel-Shaded y descarga de archivos `.GLB`.
* **Agencia Enterprise ($149 / mes):** 5 licencias de equipo, módulo de Proveedores Globales B2B con conexión WhatsApp, generador de fichas técnicas (*Tech Packs*) y calendario de contenidos.
* **Super Admin (Root):** Acceso ilimitado a telemetría de usuarios en tiempo real, desglose de costos de APIs de IA y gestión de base de datos.

---

## 🗺️ 2. Flujo de Navegación & Experiencia de Usuario

La plataforma opera bajo una máquina de estados estricta en `src/context/AuthContext.tsx` con dos modos de vista (`viewMode`):

### 🌟 Modo 1: `viewMode: 'landing'` (Portada Pública Obligatoria de Entrada)
Al acceder a `http://localhost:5173`, lo primero que ve el usuario es la **secuencia vertical de 4 pantallas por scroll**:
- **Pantalla 1 (`Screen1Hero.tsx`):** Portada *Aether Synergy* con imagen `1 INTRO/1.jpeg`, selector de 7 idiomas, 3 temas visuales y botones `Iniciar Sesión` / `Registrarse`.
- **Pantalla 2 (`Screen2Avantgarde.tsx`):** Manifiesto de diseño con imagen `1 INTRO/2.jpeg`.
- **Pantalla 3 (`Screen3Pricing.tsx`):** Tabla de planes con imagen `1 INTRO/3.jpeg`.
- **Pantalla 4 (`Screen4About.tsx`):** Misión empresarial con imagen `1 INTRO/4.jpeg`.

### 🚀 Modo 2: `viewMode: 'app'` (Espacio de Trabajo Interno con Sidebar)
Se activa cuando el usuario inicia sesión, se registra o hace clic en ingresar. Muestra el Navbar superior y la barra lateral colapsable (*Sidebar*) con los siguientes módulos.

---

## 🛠️ 3. Módulos y Funcionalidades Desarrolladas

### 1. 🧊 Suite 3D Profesional Multi-Industria (`Aurora3DStudio.tsx` & `Model3DCanvas.tsx`)
- **Motor 3D Real Three.js (WebGL 2.0):** Soporte de carga de mallas nativas `.GLB`, `.GLTF` y `.OBJ` con Drag & Drop.
- **Ergonomía Táctil para Tablets / iPads / PC:** Controles multitouch sin lag (`touch-action: none`).
  - *1 Dedo / Ratón:* Rotación orbital 360°.
  - *2 Dedos:* Paneo y Zoom (Pinch-to-zoom) a 60 FPS estables.
- **Modo Focus (Mini-Dock):** Barra lateral colapsable para dejar más del **85% de la pantalla** al lienzo 3D.
- **5 Modos de Shader y Renderizado:**
  1. *Cel-Shaded:* Sombreado Toon anime con bordes de tinta regulables.
  2. *PBR Realista:* Reflexión física de metales, cueros y telas.
  3. *Clay Arcilla:* Esculpido gris mate estilo Nomad Sculpt / ZBrush.
  4. *Wireframe:* Visualización técnica de la malla de polígonos.
  5. *X-Ray:* Holograma futurista semi-transparente.
- **Cámaras Rápidas:** Frontal, Lateral, Superior, Isométrica y Perspectiva.
- **Despiece 3D (*Exploded View*):** Slider de 0% a 100% para desensamblar las piezas en el espacio.
- **Línea de Tiempo Chroma Key:** Simulador de rotación 360° para video con fondo verde.

---

### 2. 🗣️ Avatar Asistente con Voz Interactiva (`VoiceGuideAvatar.tsx`)
- **Sintetizador de Voz Nativo (Web Speech API):** Avatar flotante *🦊 Kai* que habla con voz natural en español (y configurable en los 7 idiomas).
- **Tour Interactivo Paso a Paso:**
  - *Paso 1:* Selección de Nicho y Modelo Base 3D.
  - *Paso 2:* Texturizado PBR & Shaders Anime.
  - *Paso 3:* Iluminación HDRi y Despiece 3D.
  - *Paso 4:* Generación de Video Ads en AdGen AI.
  - *Paso 5:* Cotización B2B con Fábricas.
- **Controles de Audio:** Botón flotante para pausar, silenciar o repetir la voz.

---

### 3. 🎬 Motor AdGen AI de Video Marketing Multi-Modelo (`AdGenAI.tsx`)
- **5 Motores de Video Generativo Integrados:**
  - 🌟 *OpenAI Sora v2 (Hiperrealismo 4K, física realista)*.
  - ⚡ *Runway Gen-3 Alpha Turbo (Movimientos de cámara cinemáticos)*.
  - 🤖 *Kling AI 1.5 HD (Animación natural de modelos humanos y ropa)*.
  - 🛸 *Luma Dream Machine 1.5 (Rotación orbital suave para catálogos)*.
  - 🎨 *Midjourney Video (Estilo anime y cómic)*.
- **Movimientos de Cámara:** *360° Drone Orbit, FPV Fly-Through, Dynamic Crash Zoom, Slow-Mo Whip Pan, Dutch Angle Tilt, Runway Dolly*.
- **Editor de Línea de Tiempo Multipista:**
  - Pista de Video (velocidades 0.5x, 1x, 2x).
  - Pista de Audio (Dark Synthwave / Phonk Drift con locución).
  - Pista de Texto / Subtítulos animados estilo TikTok.
- **Radar de Tendencias Virales:** Score viral (96/100), fórmula de retención de los primeros 3 segundos y hashtags recomendados.

---

### 4. 🌐 Directorio Global de Proveedores B2B (`GlobalSuppliers.tsx`)
- Directorio verificado de fabricantes textiles y de hardware en **Portugal, Turquía, Colombia, Italia y Asia**.
- Cotizador dinámico por volumen (50 a 5,000 unidades) con desglose de coste unitario, envío aéreo/marítimo y aranceles.
- Botones de contacto directo por WhatsApp y solicitud de cotización formal (*RFQ*).

---

### 5. 🦊 Estudio de Personalización de Mascotas IA (`SynthetixMascot.tsx`)
- Personalizador de avatares con accesorios para la cabeza, prendas cyberpunk y objetos de mano.
- Chat interactivo con copiloto IA de diseño.

---

### 6. 📊 Consola de Super Admin Empresarial Espaciosa (`AdminConsole.tsx`)
Organizada en **4 pestañas limpias sin amontonamiento**:
1. 👥 **Usuarios & Retención en Vivo:**
   - Contador en tiempo real de usuarios online (`Online Now: ~84`).
   - Conteo exacto por tipo de plan (*Free, Pro $49, Agencia $149, Admin*).
   - Tiempos de permanencia: **38.4 min/sesión en la app** y **16.8 min con la mascota/IA**.
   - Métricas de retención D1 (78%), D7 (64%), D30 (49.2%) y Churn mensual bajo de 2.1%.
2. 💰 **Finanzas & Costos de APIs de IA:**
   - Desglose de costes de GPUs NVIDIA H100, APIs 3D (Meshy/Tripo), APIs de video (Runway/Sora), CDN Cloudflare y base de datos Supabase ($1,511.50 USD/mes total estimado con 87.4% de margen).
   - Simulador interactivo de rentabilidad de 50 a 5,000 clientes.
3. ⚡ **Telemetría de Dispositivos & Rendimiento GPU:**
   - Distribución de accesos: 52% PC Desktop, 34% iPads/Tablets, 14% Móviles.
   - Rendimiento en clientes: 60 FPS en PC, 58.4 FPS en iPad Pro y 54.2 FPS en Android.
4. 🗄️ **Directorio de Clientes en Base de Datos:**
   - Buscador en vivo por nombre/estudio y selector de filtros por nicho.

---

## 🗄️ 4. Capa de Base de Datos & Persistencia

- **Almacenamiento Local Reactivo:** `src/services/db.ts` con eventos globales (`aether_database_updated`) para actualizar interfaces al instante.
- **Formulario de Registro Dual en `LoginModal.tsx`:**
  - *Registro Básico:* Nombre, correo, contraseña.
  - *Registro Profesional Completo:* Nombre de marca/estudio, nicho de diseño (*Moda, Interiores, Hardware*), país, WhatsApp/teléfono, rol y volumen estimado.
- **Esquema SQL de Producción (`schema.sql`):** Preparado con tablas normalizadas para PostgreSQL / Supabase:
  - `users`, `subscriptions`, `projects_3d`, `suppliers_rfq`, `video_renders`, `api_usage_logs`.

---

## 🌐 5. Internacionalización (i18n) & Temas Visuales

- **7 Idiomas Soportados (`src/context/LanguageContext.tsx`):**
  - 🇪🇸 Español (`es`)
  - 🇺🇸 Inglés (`en`)
  - 🇯🇵 Japonés (`ja`)
  - 🇮🇹 Italiano (`it`)
  - 🇫🇷 Francés (`fr`)
  - 🇨🇳 Chino Simplificado (`zh`)
  - 🇩🇪 Alemán (`de`)
- **3 Temas Visuales (`src/context/ThemeContext.tsx`):**
  - 🌙 **Cyber Dark (Cyberpunk Gold):** Fondo negro/azul oscuro `#0A0D14` con acentos dorados `#E5A93C`.
  - ☀️ **Clean Light:** Fondo blanco/gris perla para oficinas y presentaciones corporativas.
  - ✨ **Luxury Gold:** Estilo premium negro profundo con detalles dorados brillantes.

---

## 📦 6. Repositorio en GitHub & Control de Versiones

* 🌐 **URL Oficial del Repositorio:**
  👉 **[https://github.com/thepoxxo/Aether-Synergy-AI-Platform](https://github.com/thepoxxo/Aether-Synergy-AI-Platform)**
* 🏷️ **Versión Actual:** `v1.0.0`
* 🌿 **Ramas Activas:** `main` (rama principal sincronizada).
* 👤 **Usuario Autorizado:** `thepoxxo`

---

## 🚀 7. Comandos de Ejecución y Mantenimiento

```bash
# Iniciar la plataforma en local (disponible en http://localhost:5173)
npm run dev

# Compilar y verificar TypeScript para producción
npm run build

# Guardar una nueva versión en GitHub
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

---

*Documento generado y mantenido por el equipo de ingeniería de Aether Synergy. Última actualización: Agosto 2026.*
