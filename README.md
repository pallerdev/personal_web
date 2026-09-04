# Pablo Aller — Portfolio

Portfolio de Pablo Aller, backend developer en Continero (Brno). Publicado en español e inglés.

La pieza central son **dos proyectos contados de principio a fin**: el problema, la arquitectura, las decisiones y lo que cambiaría. El resto de la página existe para dar contexto a esos dos casos.

## Stack

- **Astro 7** con salida estática. Sin framework de cliente.
- **TypeScript** estricto. El contenido vive tipado en `src/content/`.
- **CSS escrito a mano** con design tokens. Sin Tailwind ni utilidades generadas.
- **Vitest** para el contenido, las rutas, el SEO y el contraste de la paleta.
- **Playwright + axe-core** para los recorridos y la auditoría de accesibilidad.

Lo que se envía al navegador: HTML, una hoja de estilos, seis subconjuntos de fuente y **menos de 1,3 KB de JavaScript** (solo el conmutador de tema). Sin CMS, sin base de datos, sin analítica, sin cookies.

## Desarrollo

Requiere Node.js 24 LTS.

```bash
npm install
npm run dev
```

Comprobaciones:

```bash
npm test           # contenido, rutas, SEO y contraste
npm run check      # tipos, incluidas las plantillas .astro
npm run lint
npm run format:check
npm run build      # genera las tarjetas OG, comprueba tipos y compila
npm run test:e2e   # compila, sirve dist/ y audita con axe
```

`npm run test:e2e` corre contra el sitio **compilado**, no contra el servidor de desarrollo: es el artefacto que se publica. Astro 7 lanza sus servidores en segundo plano cuando detecta un agente de desarrollo, así que la configuración de Playwright fuerza `ASTRO_PREVIEW_BACKGROUND=0` para poder esperar al proceso y cerrarlo al terminar.

Para repetir las pruebas contra una preview o producción:

```bash
PLAYWRIGHT_BASE_URL=https://preview.example.com npm run test:e2e
```

## Contenido

Todo lo editable vive en `src/content/`, con una entrada por idioma:

| Archivo         | Qué contiene                                         |
| --------------- | ---------------------------------------------------- |
| `site.ts`       | Identidad, titular, cifras, herramientas y contacto. |
| `projects.ts`   | Proyectos y casos de estudio.                        |
| `experience.ts` | Experiencia profesional.                             |
| `education.ts`  | Formación e idiomas.                                 |

Los componentes de `src/components/` solo presentan esos datos. Un cambio de texto no debería tocar nunca un `.astro`.

### Reglas del contenido

- Solo se enlazan repositorios públicos. El trabajo en repositorios privados de
  Continero se describe, nunca se enlaza, y un test unitario mantiene esa lista
  cerrada.
- Las cifras del titular (`facts` en `site.ts`) se cuentan desde las pull
  requests firmadas en GitHub. La fecha de recuento está en `recordUpdated` y se
  muestra en la página.
- Nada se afirma sin poder señalar el repositorio, el despliegue o la pull
  request de donde sale.

## Idiomas

El español vive en la raíz y el inglés bajo `/en/`. Las rutas de los dos idiomas están declaradas en `src/i18n/config.ts`; de ahí salen la URL canónica, los enlaces `hreflang` (`es`, `en` y `x-default`) y el conmutador de idioma, que lleva al lector a la **misma** página en el otro idioma.

Añadir una página exige registrar su ruta en ambos idiomas y añadirla a la lista de `tests/portfolio.spec.ts`, que audita cada página con axe en escritorio y móvil.

## Diseño

Dirección: diseño de información checo. Brno es una ciudad funcionalista y el trabajo que se muestra es trabajo de contratos —permisos, concurrencia, facturación— así que la página está construida como un catálogo: columna de índice fija, filetes de dos grosores, un único acento bermellón y cifras tratadas como objetos.

- Tipografías autoalojadas: **Archivo** (titulares, usando el eje de anchura), **Instrument Sans** (texto) y **JetBrains Mono** (fechas, etiquetas y datos).
- Tema claro y oscuro. Sin elección explícita se sigue al sistema; el conmutador guarda la preferencia en `localStorage`.
- La banda de proyectos es el único sitio donde la página levanta la voz: fondo invertido y filete bermellón, con todo lo demás en calma.
- La paleta se define una sola vez, en `src/styles/global.css`. `src/lib/contrast.test.ts` la lee de vuelta y comprueba cada par que lleva texto contra WCAG AA, así que un color no puede degradarse sin romper un test.
- La única animación es el filete rojo del encabezado dibujándose al cargar. Es decorativo y no contiene texto, así que nada queda oculto esperando a que termine.

## Tarjetas de Open Graph

`npm run og` genera `public/og/card.png` y `card-en.png` (1200×630).

Las redes sociales no renderizan SVG, y pedirle a un rasterizador que encuentre una webfont en la máquina de build no es reproducible. Así que `scripts/build-og.mjs` convierte el texto a contornos con fontkit —usando el Archivo variable incluido en `assets/fonts/`, bajo licencia OFL— y solo entonces se lo pasa a sharp. El resultado es idéntico en cualquier máquina, sin instalar ninguna fuente.

El script forma parte de `npm run build`, así que las tarjetas nunca quedan desincronizadas del titular.

## Accesibilidad

- Auditoría axe-core (`wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`) sobre las seis páginas, en escritorio y móvil, en tema claro y oscuro. Cero incidencias.
- Un solo `h1` por página, encabezados en orden y regiones etiquetadas.
- Foco visible en todo elemento interactivo y objetivos de al menos 44 px.
- `prefers-reduced-motion` respetado.

## Privacidad

El sitio publica un email de contacto y enlaces públicos. No almacena datos de visitantes, no incluye analítica ni cookies, y no publica teléfono, dirección postal ni fecha de nacimiento. Un test unitario comprueba lo último.

## Despliegue

Vercel: `main` publica producción y cada pull request genera una preview. El procedimiento completo —dominio canónico, configuración del proyecto, DNS, retirada del GitHub Pages antiguo, verificación y rollback— está en [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
