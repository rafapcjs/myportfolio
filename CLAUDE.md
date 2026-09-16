# CLAUDE.md

Convenciones del proyecto para futuras sesiones. Léelo antes de tocar código.

## Qué es

Portafolio personal de Rafael Corredor. Next.js 16 App Router con `output: 'export'` (sitio 100 % estático), TypeScript estricto, Tailwind CSS 4, Framer Motion, next-themes, react-hook-form + zod. Bilingüe ES/EN. Modo oscuro por defecto.

## Comandos

```bash
npm run dev          # desarrollo
npm run build        # build + export a out/  ← debe pasar antes de dar por terminada cualquier tarea
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run format       # prettier --write
```

Al terminar cambios: `npm run format && npm run lint && npm run build`.

## Reglas de contenido

- **Nada de texto hardcodeado en componentes.** Etiquetas de UI → `src/i18n/dictionaries/{es,en}.ts`. Contenido (experiencia, proyectos, skills, formación, perfil) → `src/data/*.ts`.
- Todo texto visible es `Localized` (`{ es, en }`). `es.ts` define el tipo `Dictionary`; `en.ts` debe tener las mismas claves (TypeScript lo verifica).
- Las tecnologías se registran una sola vez en `src/data/tech.ts` y se referencian por id (`TechId`) desde skills, proyectos y experiencia.
- Los tipos del contenido están en `src/types/content.ts`. Si añades un campo, añádelo ahí primero.

## Arquitectura

- Rutas: `src/app/(root)` es solo la redirección de `/` al idioma preferido (cliente). `src/app/[locale]` es el layout raíz real (define `<html lang>`, metadata, JSON-LD, navbar y footer). Ambos son root layouts distintos por diseño; no crees `src/app/layout.tsx`.
- Locales soportados en `src/i18n/config.ts`. `generateStaticParams` + `dynamicParams = false` generan `/es` y `/en`.
- Secciones (`src/components/sections/*`) son server components que reciben `locale` y `dict` por props. Solo son client components los que necesitan estado o APIs del navegador (`Navbar`, `ThemeToggle`, `LanguageSwitcher`, `ContactForm`, `CopyButton`, `Reveal`).
- Ids de sección y su orden: `src/lib/sections.ts`. El navbar, el footer y el resaltado activo se derivan de ahí.
- SEO centralizado en `src/lib/seo.ts` (`buildMetadata`, `buildPersonJsonLd`). `sitemap.ts` y `robots.ts` en `src/app`.
- `basePath` sale de `NEXT_PUBLIC_BASE_PATH`. Usa `withBasePath()` de `src/lib/site.ts` para rutas a archivos de `public/` en etiquetas `<a>` o `<img>` (next/link ya lo aplica solo).

## Estilo y diseño

- Tokens de color en `src/app/globals.css` (`:root` claro, `.dark` oscuro) expuestos a Tailwind como `bg-bg`, `bg-surface`, `bg-surface-2`, `border-border`, `text-fg`, `text-muted`, `text-accent`, `text-accent-2`, `text-accent-fg`. No uses colores de Tailwind sueltos salvo para estados de error (`red-500`).
- Tipografía: Inter (`font-sans`) para texto, JetBrains Mono (`font-mono`) para etiquetas, fechas, badges, navegación y detalles "técnicos".
- Animaciones solo con `Reveal` (fade + 12px) y transiciones de color. Nada llamativo. Respeta `useReducedMotion`.
- Componentes UI reutilizables en `src/components/ui`. Antes de crear uno nuevo, revisa si existe.
- Responsive mobile-first. Contenedor: clase `container-page`.

## Accesibilidad (obligatorio)

- HTML semántico: `<section aria-labelledby>`, listas reales (`ul/ol`), `<time dateTime>`, `<dl>` para pares clave-valor.
- Iconos decorativos con `aria-hidden="true"`; enlaces solo-icono con texto `sr-only`.
- Enlaces externos: `target="_blank" rel="noopener noreferrer"` + aviso `sr-only` de nueva pestaña (`dict.common.opensInNewTab`).
- Controles con `aria-label`, `aria-expanded`, `aria-controls`, `aria-current` cuando aplique. Foco visible (definido globalmente).
- Contraste AA en ambos temas; verifica si cambias tokens.

## Código

- TypeScript estricto con `noUncheckedIndexedAccess`; no uses `any` ni `!`.
- Imports con alias `@/`. Imports de tipos con `import type`.
- Prettier manda el formato (100 columnas, comillas dobles, plugin de Tailwind ordena clases).
- Nombres: componentes en PascalCase, hooks `useX`, helpers en camelCase, archivos de datos en minúsculas.

## Pendientes conocidos

Ver README → sección "Editar el contenido". URLs de LinkedIn/GitHub, CVs en PDF, imagen OG y enlaces de repos/demos son placeholders marcados con `TODO`.
