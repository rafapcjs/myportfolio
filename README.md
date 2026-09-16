# Portafolio · Rafael Corredor

Portafolio profesional de **Rafael Alfonso Corredor Gambín**, Full Stack Developer & DevOps Engineer.
Sitio estático bilingüe (ES/EN), modo oscuro por defecto, accesible y optimizado para SEO.

**Stack:** Next.js 16 (App Router, `output: 'export'`) · TypeScript estricto · Tailwind CSS 4 · Framer Motion · next-themes · react-hook-form + zod.

---

## Requisitos

- Node.js 20 o superior (recomendado 22).
- npm 10 o superior.

## Correr el proyecto

```bash
npm install          # instala dependencias
cp .env.example .env # opcional: configura URL del sitio, basePath y Formspree
npm run dev          # http://localhost:3000 → redirige a /es o /en
```

Scripts disponibles:

| Script                 | Qué hace                                             |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo.                              |
| `npm run build`        | Build de producción y exportación estática a `out/`. |
| `npm run start`        | Sirve la carpeta `out/` localmente (usa `serve`).    |
| `npm run lint`         | ESLint.                                              |
| `npm run typecheck`    | `tsc --noEmit`.                                      |
| `npm run format`       | Prettier (escribe cambios).                          |
| `npm run format:check` | Prettier (solo verifica).                            |

## Variables de entorno

Copia `.env.example` a `.env` y ajusta:

| Variable                   | Descripción                                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | URL pública sin barra final. Se usa en metadata, sitemap, Open Graph y JSON-LD.                     |
| `NEXT_PUBLIC_BASE_PATH`    | Vacío en Vercel. En GitHub Pages de proyecto: `/<nombre-del-repo>`.                                 |
| `NEXT_PUBLIC_FORMSPREE_ID` | ID del formulario en [Formspree](https://formspree.io). Si está vacío, el formulario usa `mailto:`. |

Todas son públicas (se inyectan en el build), no pongas secretos aquí.

---

## Editar el contenido

Todo el contenido vive en `src/data/` con tipos definidos en `src/types/content.ts`. No hace falta tocar componentes.

| Archivo                  | Contenido                                                                    |
| ------------------------ | ---------------------------------------------------------------------------- |
| `src/data/profile.ts`    | Nombre, rol, frase de valor, resumen, idiomas, stack principal, rutas de CV. |
| `src/data/experience.ts` | Línea de tiempo laboral (ordenada de más reciente a más antigua).            |
| `src/data/projects.ts`   | Tarjetas de proyectos, incluidas las dos plantillas para proyectos futuros.  |
| `src/data/skills.ts`     | Categorías de habilidades y qué tecnologías incluye cada una.                |
| `src/data/education.ts`  | Formación académica y certificaciones.                                       |
| `src/data/social.ts`     | Enlaces a LinkedIn y GitHub.                                                 |
| `src/data/tech.ts`       | Registro único de tecnologías: nombre e icono. Añade aquí antes de usar una. |

Los campos de texto que se muestran al usuario son **bilingües**: cada uno es un objeto `{ es: "...", en: "..." }`.
TypeScript avisa si falta un idioma.

Ejemplo, añadir un proyecto:

```ts
// src/data/projects.ts
{
  id: "mi-proyecto",
  title: { es: "Mi proyecto", en: "My project" },
  description: { es: "...", en: "..." },
  problem: { es: "...", en: "..." },
  stack: ["nextjs", "typescript", "postgresql"], // ids de src/data/tech.ts
  repoUrl: "https://github.com/usuario/repo",
  demoUrl: null,
  status: "done", // "done" | "in-progress" | "planned"
}
```

Para añadir una tecnología nueva, primero regístrala en `src/data/tech.ts`:

```ts
docker: { name: "Docker", icon: SiDocker }, // icono de react-icons/si, fa6, vsc o lucide-react
```

### Textos de la interfaz

Etiquetas, botones y mensajes viven en `src/i18n/dictionaries/es.ts` y `en.ts`.
El diccionario en español define el tipo; el inglés debe tener exactamente las mismas claves.

### CV en PDF

Los archivos viven en `public/cv/`:

- `CV_Rafael_Corredor_Gambin_2026_Harvard.pdf` (español)
- `CV_Rafael_Corredor_Gambin_2026_EN.pdf` (inglés)

Si cambias los nombres, actualiza `profile.cv` en `src/data/profile.ts`.

### Imagen Open Graph

`public/images/og.png` (1200×630 px) es la imagen que aparece al compartir el enlace. La foto de perfil está en `public/images/rafael.webp` y se referencia desde `profile.photo`.

---

## Desplegar

### Vercel

1. Importa el repositorio en [vercel.com/new](https://vercel.com/new). Vercel detecta Next.js automáticamente.
2. En _Environment Variables_ añade `NEXT_PUBLIC_SITE_URL` con tu dominio final (por ejemplo `https://rafaelcorredor.dev`). Deja `NEXT_PUBLIC_BASE_PATH` vacío.
3. Opcional: `NEXT_PUBLIC_FORMSPREE_ID` para activar el formulario.
4. Deploy. Cada push a `main` genera un nuevo despliegue.

### GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` ya está listo.

1. En el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. En **Settings → Secrets and variables → Actions → Variables** crea:
   - `NEXT_PUBLIC_SITE_URL` = `https://<usuario>.github.io`
   - `NEXT_PUBLIC_BASE_PATH` = `/<nombre-del-repo>` (déjala vacía si el repo se llama `<usuario>.github.io`).
   - `NEXT_PUBLIC_FORMSPREE_ID` (opcional).
3. Haz push a `main`. El sitio quedará en `https://<usuario>.github.io/<nombre-del-repo>/`.

Para probar el build de Pages en local:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
npx serve out
```

### Integración continua

`.github/workflows/ci.yml` ejecuta Prettier, ESLint, TypeScript y `next build` en cada push y pull request.

---

## Estructura

```
src/
├─ app/
│  ├─ (root)/            # "/" → redirige al idioma preferido
│  ├─ [locale]/          # /es y /en: layout raíz, metadata, JSON-LD y página
│  ├─ sitemap.ts · robots.ts · icon.svg · globals.css
├─ components/
│  ├─ layout/            # Navbar, Footer, ThemeToggle, LanguageSwitcher
│  ├─ sections/          # Hero, About, Experience, Projects, Skills, Education, Contact
│  ├─ ui/                # Button, Badge, Card, SectionHeading, TechChip, SocialLinks, CopyButton
│  ├─ motion/            # Reveal (Framer Motion)
│  └─ providers/         # ThemeProvider
├─ data/                 # Contenido tipado (edita aquí)
├─ i18n/                 # Locales, diccionarios y helpers
├─ hooks/                # useActiveSection, useCopyToClipboard
├─ lib/                  # seo, site, dates, fonts, sections, utils
└─ types/                # Tipos del contenido
```

## Accesibilidad y rendimiento

- HTML semántico, `aria-*` en controles, enlace "saltar al contenido", foco visible y `prefers-reduced-motion` respetado.
- Contraste AA en ambos temas.
- Fuentes autoalojadas con `next/font`, sin peticiones externas en runtime.
- Sin imágenes pesadas; los iconos son SVG en línea.

## SEO

Todo se genera en `src/lib/seo.ts` a partir de `src/data` y los diccionarios:

- Título, descripción y palabras clave por idioma (`meta` en `src/i18n/dictionaries`).
- `canonical`, `hreflang` (es, en, x-default), Open Graph tipo `profile`, Twitter Card y `theme-color`.
- Datos estructurados JSON-LD: `WebSite` → `ProfilePage` → `Person` (con foto, contacto, empleo actual, formación y habilidades).
- `sitemap.xml`, `robots.txt` y `manifest.webmanifest` generados en el build.

Para registrar el sitio en **Google Search Console**: elige "Etiqueta HTML", copia solo el valor de `content` y ponlo en la variable `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (en `.env` o en las variables del repo). Luego envía `https://<tu-dominio>/sitemap.xml` desde Search Console.

Para comprobar los datos estructurados: https://search.google.com/test/rich-results con la URL publicada.
