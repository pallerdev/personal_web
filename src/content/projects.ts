import type { Localized, RouteKey } from "../i18n/config";

export interface ProjectLink {
  label: string;
  href: string;
  /** `true` when the link leaves the site. */
  external?: boolean;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface CaseSection {
  label: string;
  title: string;
  body: string[];
}

export interface Project {
  slug: string;
  route: RouteKey;
  title: string;
  context: string;
  period: string;
  /** One line for the card. */
  summary: string;
  /** The reason the project exists, for the case study. */
  brief: string;
  /** Everything the reader needs before deciding to read on. */
  spec: SpecRow[];
  technologies: string[];
  sections: CaseSection[];
  /** Concrete calls made while building, and the reason for each. */
  decisions: { title: string; body: string }[];
  /** What I would do differently. Kept honest on purpose. */
  retrospective: string[];
  links: ProjectLink[];
  /** Highlighted on the home page. */
  featured: boolean;
}

export const projects: Localized<Project[]> = {
  es: [
    {
      slug: "gardenview",
      route: "gardenview",
      title: "GardenView",
      context: "Proyecto propio · final de ciclo",
      period: "Oct. 2025 — jun. 2026",
      summary:
        "Aplicación completa para gestionar huertos: cultivos sobre un mapa, tareas, riegos, fotos y alertas de clima reales.",
      brief:
        "El seguimiento de un huerto acaba repartido entre notas, fotos del móvil y memoria. GardenView reúne cada huerto, sus cultivos y su historial en un solo sitio, y avisa cuando el clima va a hacer daño.",
      spec: [
        { label: "Tipo", value: "Aplicación web full-stack" },
        { label: "Alcance", value: "Diseño, backend, frontend y despliegue" },
        { label: "Equipo", value: "Individual" },
        { label: "Estado", value: "Desplegada y en funcionamiento" },
      ],
      technologies: [
        "Java 21",
        "Spring Boot 3.3",
        "React 19",
        "PostgreSQL 17",
        "Docker Compose",
        "nginx",
        "OAuth 2.0",
        "OpenAPI",
      ],
      sections: [
        {
          label: "El problema",
          title: "Un huerto genera datos que nadie guarda.",
          body: [
            "Un cultivo tiene fecha de siembra, riegos, cosechas, plagas y fotos. Esa información existe, pero vive en sitios que no se hablan entre sí, así que nunca se puede responder a la pregunta útil: ¿qué le pasó a este tomate el año pasado?",
            "El otro problema es el tiempo. Una helada nocturna o cuatro días sin lluvia deciden la temporada, y para cuando se nota ya es tarde.",
          ],
        },
        {
          label: "La solución",
          title: "Una API REST, un mapa y alertas que llegan antes.",
          body: [
            "El backend es una API REST en Spring Boot sobre PostgreSQL, documentada con OpenAPI. El frontend es una aplicación React independiente que la consume: dos piezas separadas, cada una con su propio contenedor y su propio ciclo de vida.",
            "Cada huerto se representa como una cuadrícula donde los cultivos se colocan arrastrándolos, y cada cultivo tiene su ficha con historial de riegos, cosechas, incidencias de plagas y galería de fotos.",
            "Un servicio consulta la previsión a siete días de Open-Meteo con las coordenadas del huerto y genera alertas de helada, calor extremo, índice UV alto y sequía. La alerta se calcula en el servidor, no en la interfaz, para que el mismo dato valga para la app y para cualquier cliente futuro.",
          ],
        },
        {
          label: "Alcance",
          title: "Lo que hay dentro.",
          body: [
            "Registro y acceso con email y contraseña o con Google mediante OAuth 2.0. Panel de administración para gestionar usuarios y el catálogo de especies. Subida de fotos a un almacenamiento externo con límite de tamaño. Interfaz en español, inglés y alemán, y tema claro y oscuro que recuerda la elección.",
            "Todo el entorno arranca con un solo comando: base de datos, backend, frontend y proxy definidos en Docker Compose.",
          ],
        },
      ],
      decisions: [
        {
          title: "API separada en lugar de una aplicación monolítica",
          body: "Costaba más al principio, pero deja el contrato explícito y documentado. Cuando el frontend necesitó cambiar la forma de una pantalla, no hubo que tocar el backend.",
        },
        {
          title: "Las alertas se calculan en el servidor",
          body: "La regla que decide si hay riesgo de helada es una decisión de dominio. Si vive en el componente de React, deja de existir para cualquier otro cliente y no se puede probar sin abrir un navegador.",
        },
        {
          title: "PostgreSQL desde el primer día, no SQLite",
          body: "El entorno local y el desplegado usan el mismo motor. No hay una clase de error que solo aparece en producción.",
        },
        {
          title: "Docker Compose como definición del entorno",
          body: "El tribunal del proyecto tenía que poder levantarlo sin instalar Java ni Node. Un comando, cuatro servicios.",
        },
      ],
      retrospective: [
        "El frontend creció más rápido que su estructura. Empezaría dividiendo por dominio en lugar de por tipo de fichero, porque a partir de cierto tamaño «components» y «pages» dejan de decir nada.",
        "Escribí los tests después de que funcionara. Se nota: cubren lo que ya sabía que estaba bien, no los casos que me habrían dolido.",
        "El alojamiento gratuito de Render duerme el servicio cuando nadie lo usa, así que la primera carga tarda. Es una decisión de coste, pero conviene saberlo antes de enseñarle la demo a alguien.",
      ],
      links: [
        {
          label: "Ver la demo",
          href: "https://gardenview-fe.onrender.com/",
          external: true,
        },
      ],
      featured: true,
    },
    {
      slug: "camaleon-teatro",
      route: "camaleon",
      title: "Camaleón Teatro",
      context: "Cliente · en producción",
      period: "Sep. 2026",
      summary:
        "Sitio de una compañía de teatro en inglés, publicado con su dominio propio y con el contenido tipado como código.",
      brief:
        "Camaleón Teatro representa funciones interactivas, escape rooms y talleres en inglés en colegios de toda España. Necesitaban un sitio que explicara la oferta por etapa educativa y que un profesor pudiera entender en un minuto.",
      spec: [
        { label: "Tipo", value: "Sitio estático de cliente" },
        { label: "Alcance", value: "Arquitectura, maquetación, SEO y entrega" },
        { label: "Equipo", value: "Individual, con la compañía" },
        { label: "Estado", value: "En producción en camaleonteatro.es" },
      ],
      technologies: [
        "Astro 7",
        "TypeScript",
        "Tailwind CSS 4",
        "Vitest",
        "sharp",
        "Netlify",
      ],
      sections: [
        {
          label: "El problema",
          title:
            "El contenido cambia cada curso; el sitio no puede romperse por eso.",
          body: [
            "Las obras, las etapas educativas y el equipo cambian todos los años. Un CMS habría añadido una cuenta que mantener, un panel que enseñar y una dependencia externa para un sitio de nueve páginas.",
            "Y el público es un profesor con cinco minutos entre clases, muchas veces desde el móvil del colegio.",
          ],
        },
        {
          label: "La solución",
          title: "El contenido vive tipado, y el build lo comprueba.",
          body: [
            "Todo el contenido —obras, actividades, equipo, preguntas frecuentes— está en módulos TypeScript. Cambiar un texto o una foto pasa siempre por ahí, nunca por dentro de una página, y el compilador rechaza el cambio si falta un campo o un texto alternativo.",
            "Los tests de Vitest no comprueban componentes: comprueban el contenido. Que cada obra tenga slug único, que las rutas existan, que ninguna imagen se quede sin alt, que los datos de contacto sean los buenos.",
            "Después del build, un script propio abre cada página generada y falla si falta el title, la meta description, la URL canónica o si hay más de un h1. El SEO deja de ser una intención y pasa a ser una condición para desplegar.",
          ],
        },
        {
          label: "Entrega",
          title: "Cero JavaScript por defecto, y lo que hay es opcional.",
          body: [
            "Astro genera HTML estático. Las dos piezas interactivas —el filtro por etapa y la carga diferida del vídeo— están escritas como mejora progresiva: sin JavaScript el contenido sigue estando visible y navegable.",
            "Las fuentes son variables y autoalojadas, así que no hay una llamada a un dominio de terceros para pintar el primer texto. El formulario de contacto envía a un servicio externo, sin backend que mantener.",
          ],
        },
      ],
      decisions: [
        {
          title: "Contenido como código en lugar de CMS",
          body: "El cliente edita a través de mí una o dos veces por curso. Un CMS habría sido más infraestructura para un problema que no tenían.",
        },
        {
          title: "Los tests apuntan al contenido, no a los componentes",
          body: "En un sitio estático lo que se rompe no es el render: es un enlace muerto, un alt vacío o un teléfono viejo. Los tests cubren eso.",
        },
        {
          title: "El SEO se comprueba después del build",
          body: "Revisar el código fuente no dice si la página generada tiene canonical. Abrir el HTML de salida, sí.",
        },
      ],
      retrospective: [
        "La política de seguridad de contenido rompió los scripts de mejora progresiva solo en producción: en local todo funcionaba. El aviso fue que hay que verificar contra el sitio desplegado, no contra el servidor de desarrollo.",
        "Añadiría una comprobación automática de contraste en el pipeline. Los colores de marca los validé a mano contra WCAG AA, y eso no escala a la siguiente paleta.",
      ],
      links: [
        {
          label: "Visitar el sitio",
          href: "https://camaleonteatro.es",
          external: true,
        },
      ],
      featured: true,
    },
    {
      slug: "crud-laravel",
      route: "home",
      title: "CRUD multilingüe en Laravel",
      context: "Práctica de ciclo · código abierto",
      period: "Ene. 2026",
      summary:
        "Autenticación, recursos protegidos, paginación y traducciones en español, inglés y francés, con el entorno en Docker.",
      brief:
        "Práctica de la asignatura de desarrollo web en entorno servidor: cubrir el ciclo completo de acceso y gestión de datos en una aplicación mantenible.",
      spec: [],
      technologies: ["Laravel", "PHP", "Blade", "MySQL", "Docker"],
      sections: [],
      decisions: [],
      retrospective: [],
      links: [
        {
          label: "Ver el repositorio",
          href: "https://github.com/pallerdev/Proyecto_CRUD_Servidor",
          external: true,
        },
      ],
      featured: false,
    },
    {
      slug: "personal-web",
      route: "home",
      title: "Este sitio",
      context: "Proyecto propio · código abierto",
      period: "2026",
      summary:
        "Astro estático, sin framework de cliente, con el contenido tipado y comprobado por tests y por accesibilidad en cada push.",
      brief: "",
      spec: [],
      technologies: ["Astro 7", "TypeScript", "Vitest", "Playwright", "axe"],
      sections: [],
      decisions: [],
      retrospective: [],
      links: [
        {
          label: "Ver el repositorio",
          href: "https://github.com/pallerdev/personal_web",
          external: true,
        },
      ],
      featured: false,
    },
  ],
  en: [
    {
      slug: "gardenview",
      route: "gardenview",
      title: "GardenView",
      context: "Own project · final coursework",
      period: "Oct 2025 — Jun 2026",
      summary:
        "A full application for managing allotments: crops on a map, tasks, watering, photos and real weather alerts.",
      brief:
        "Tracking an allotment ends up split between notes, phone photos and memory. GardenView keeps each plot, its crops and their history in one place, and warns you when the weather is about to do damage.",
      spec: [
        { label: "Type", value: "Full-stack web application" },
        { label: "Scope", value: "Design, backend, frontend and deployment" },
        { label: "Team", value: "Solo" },
        { label: "Status", value: "Deployed and running" },
      ],
      technologies: [
        "Java 21",
        "Spring Boot 3.3",
        "React 19",
        "PostgreSQL 17",
        "Docker Compose",
        "nginx",
        "OAuth 2.0",
        "OpenAPI",
      ],
      sections: [
        {
          label: "The problem",
          title: "An allotment produces data nobody keeps.",
          body: [
            "A crop has a sowing date, waterings, harvests, pests and photos. That information exists, but it lives in places that never talk to each other, so the useful question never gets answered: what happened to this tomato last year?",
            "The other problem is weather. One night of frost or four days without rain decides the season, and by the time it shows it is too late.",
          ],
        },
        {
          label: "The solution",
          title: "A REST API, a map, and alerts that arrive early.",
          body: [
            "The backend is a Spring Boot REST API over PostgreSQL, documented with OpenAPI. The frontend is a separate React application that consumes it: two pieces, each with its own container and its own lifecycle.",
            "Every plot is drawn as a grid where crops are placed by dragging them, and every crop has a record of its waterings, harvests, pest incidents and photos.",
            "A service reads the seven-day Open-Meteo forecast for the plot's coordinates and raises frost, extreme heat, high UV and drought alerts. The alert is computed on the server, not in the interface, so the same data serves the app and any future client.",
          ],
        },
        {
          label: "Scope",
          title: "What is inside.",
          body: [
            "Sign-up and sign-in with email and password or with Google over OAuth 2.0. An admin panel for users and the species catalogue. Photo uploads to external storage with a size limit. The interface in Spanish, English and German, and a light and dark theme that remembers the choice.",
            "The whole environment starts with one command: database, backend, frontend and proxy all defined in Docker Compose.",
          ],
        },
      ],
      decisions: [
        {
          title: "A separate API rather than one monolithic app",
          body: "More work up front, but the contract is explicit and documented. When the frontend needed to reshape a screen, the backend did not have to move.",
        },
        {
          title: "Alerts are computed on the server",
          body: "The rule that decides whether there is a frost risk is a domain decision. Inside a React component it stops existing for any other client and cannot be tested without a browser.",
        },
        {
          title: "PostgreSQL from day one, not SQLite",
          body: "Local and deployed environments run the same engine. There is no class of bug that only appears in production.",
        },
        {
          title: "Docker Compose as the definition of the environment",
          body: "The assessment panel had to be able to run it without installing Java or Node. One command, four services.",
        },
      ],
      retrospective: [
        "The frontend grew faster than its structure. I would start by splitting along domains instead of file types, because past a certain size 'components' and 'pages' stop telling you anything.",
        "I wrote the tests after it worked, and it shows: they cover what I already knew was fine, not the cases that would have hurt.",
        "Render's free tier sleeps the service when nobody uses it, so the first load is slow. That is a cost decision, but worth knowing before you send someone the demo.",
      ],
      links: [
        {
          label: "Open the demo",
          href: "https://gardenview-fe.onrender.com/",
          external: true,
        },
      ],
      featured: true,
    },
    {
      slug: "camaleon-teatro",
      route: "camaleon",
      title: "Camaleón Teatro",
      context: "Client · in production",
      period: "Sep 2026",
      summary:
        "The site of an English-language theatre company, launched on its own domain with the content typed as code.",
      brief:
        "Camaleón Teatro performs interactive plays, escape rooms and workshops in English in schools across Spain. They needed a site that explained the offer by school stage and that a teacher could understand in a minute.",
      spec: [
        { label: "Type", value: "Static client site" },
        { label: "Scope", value: "Architecture, layout, SEO and delivery" },
        { label: "Team", value: "Solo, with the company" },
        { label: "Status", value: "In production at camaleonteatro.es" },
      ],
      technologies: [
        "Astro 7",
        "TypeScript",
        "Tailwind CSS 4",
        "Vitest",
        "sharp",
        "Netlify",
      ],
      sections: [
        {
          label: "The problem",
          title:
            "The content changes every year; the site cannot break because of it.",
          body: [
            "The plays, the school stages and the team change every school year. A CMS would have added an account to maintain, a panel to teach and an external dependency, for a nine-page site.",
            "And the audience is a teacher with five minutes between classes, often on a school phone.",
          ],
        },
        {
          label: "The solution",
          title: "The content is typed, and the build checks it.",
          body: [
            "All content — plays, activities, team, FAQ — lives in TypeScript modules. Changing a text or a photo always goes through there, never inside a page, and the compiler rejects the change if a field or an alt text is missing.",
            "The Vitest tests do not check components: they check content. That every play has a unique slug, that the routes exist, that no image is left without alt text, that the contact details are the right ones.",
            "After the build, a small script opens every generated page and fails if the title, the meta description or the canonical URL is missing, or if there is more than one h1. SEO stops being an intention and becomes a condition for deploying.",
          ],
        },
        {
          label: "Delivery",
          title:
            "Zero JavaScript by default, and what there is stays optional.",
          body: [
            "Astro emits static HTML. The two interactive pieces — the stage filter and the deferred video — are written as progressive enhancement: without JavaScript the content is still visible and navigable.",
            "The fonts are variable and self-hosted, so no third-party domain is called to paint the first line of text. The contact form posts to an external service, with no backend to maintain.",
          ],
        },
      ],
      decisions: [
        {
          title: "Content as code instead of a CMS",
          body: "The client edits through me once or twice a year. A CMS would have been more infrastructure for a problem they did not have.",
        },
        {
          title: "The tests target content, not components",
          body: "On a static site what breaks is not the render: it is a dead link, an empty alt or an old phone number. The tests cover that.",
        },
        {
          title: "SEO is checked after the build",
          body: "Reading the source does not tell you whether the generated page has a canonical URL. Opening the output HTML does.",
        },
      ],
      retrospective: [
        "The content security policy broke the progressive enhancement scripts in production only — locally everything worked. The lesson was to verify against the deployed site, not the dev server.",
        "I would add an automated contrast check to the pipeline. I validated the brand colours against WCAG AA by hand, and that does not scale to the next palette.",
      ],
      links: [
        {
          label: "Visit the site",
          href: "https://camaleonteatro.es",
          external: true,
        },
      ],
      featured: true,
    },
    {
      slug: "crud-laravel",
      route: "home",
      title: "Multilingual CRUD in Laravel",
      context: "Coursework · open source",
      period: "Jan 2026",
      summary:
        "Authentication, protected resources, pagination and translations in Spanish, English and French, with the environment in Docker.",
      brief:
        "Coursework for the server-side web development module: cover the full cycle of access and data management in a maintainable application.",
      spec: [],
      technologies: ["Laravel", "PHP", "Blade", "MySQL", "Docker"],
      sections: [],
      decisions: [],
      retrospective: [],
      links: [
        {
          label: "View the repository",
          href: "https://github.com/pallerdev/Proyecto_CRUD_Servidor",
          external: true,
        },
      ],
      featured: false,
    },
    {
      slug: "personal-web",
      route: "home",
      title: "This site",
      context: "Own project · open source",
      period: "2026",
      summary:
        "Static Astro, no client framework, with typed content checked by tests and by an accessibility pass on every push.",
      brief: "",
      spec: [],
      technologies: ["Astro 7", "TypeScript", "Vitest", "Playwright", "axe"],
      sections: [],
      decisions: [],
      retrospective: [],
      links: [
        {
          label: "View the repository",
          href: "https://github.com/pallerdev/personal_web",
          external: true,
        },
      ],
      featured: false,
    },
  ],
};

export const caseStudies = ["gardenview", "camaleon-teatro"] as const;

export const projectBySlug = (locale: keyof typeof projects, slug: string) => {
  const found = projects[locale].find((project) => project.slug === slug);
  if (!found) throw new Error(`Unknown project "${slug}" for locale ${locale}`);
  return found;
};
