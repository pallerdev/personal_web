# Pablo Aller — Portfolio

Portfolio profesional de Pablo Aller, backend developer en Continero. Presenta experiencia, herramientas de trabajo y proyectos mediante una interfaz editorial inspirada en herramientas de desarrollo.

## Stack

- Astro con salida estática
- TypeScript estricto
- Tailwind CSS 4 y design tokens propios
- Vitest para lógica y contenido
- Playwright para recorridos de navegador

No utiliza un framework de cliente, CMS, base de datos ni formulario de contacto.

## Desarrollo

Requiere Node.js 24 LTS.

```bash
npm install
npm run dev
```

Comprobaciones disponibles:

```bash
npm test
npm run check
npm run build
npm run test:e2e
npm run format:check
```

Para repetir las pruebas contra una preview o producción:

```bash
PLAYWRIGHT_BASE_URL=https://preview.example.com npm run test:e2e
```

En local, Playwright levanta Astro en el puerto dedicado `4327`. La configuración fuerza el modo foreground porque Astro 7 inicia el servidor en segundo plano cuando detecta un agente de desarrollo; Playwright necesita controlar el ciclo de vida del proceso para esperar a que esté listo y cerrarlo al terminar.

## Contenido

La información editable vive en `src/content/`:

- `site.ts`: identidad, enlaces y stack.
- `projects.ts`: proyectos y casos de estudio.
- `experience.ts`: experiencia profesional.
- `education.ts`: formación.

Los componentes de `src/components/` solo se ocupan de presentar esos datos.

## SEO

La URL canónica se define en `src/config.ts` y `astro.config.ts`. Antes del lanzamiento, sustituye `https://paller.dev` en ambos archivos y en `public/robots.txt` si el dominio final es diferente.

El build genera sitemap y contiene metadata Open Graph, Twitter cards y datos estructurados para `Person` y `SoftwareSourceCode`.

## Despliegue

La plataforma prevista es Vercel: `main` se publica en producción y las pull requests generan previews. El procedimiento completo —dominio canónico, configuración del proyecto, DNS, retirada del GitHub Pages antiguo, verificación y rollback— está en [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Privacidad

El sitio publica email profesional y enlaces públicos. No almacena datos de visitantes ni incluye teléfono, fecha de nacimiento u otros datos personales del CV.
