import type { Localized } from "../i18n/config";

/**
 * What a line of the record represents.
 * - `shipped`  merged and running in production
 * - `review`   open, waiting on review
 * - `live`     a whole product that is publicly reachable
 */
export type EntryState = "shipped" | "review" | "live";

export interface LedgerEntry {
  /** ISO month. Used for the date column and for ordering. */
  date: string;
  /** The repository or surface the change landed in. */
  surface: string;
  summary: string;
  state: EntryState;
}

export interface LedgerProduct {
  id: string;
  name: string;
  /** Who the product belongs to. */
  context: string;
  /** One line on what the product is. */
  what: string;
  stack: string[];
  entries: LedgerEntry[];
  /** Public URL, when there is one. */
  href?: string;
  hrefLabel?: string;
}

export const stateLabel: Localized<Record<EntryState, string>> = {
  es: { shipped: "Integrada", review: "En revisión", live: "En producción" },
  en: { shipped: "Merged", review: "In review", live: "In production" },
};

/**
 * The work record. Every line here corresponds to a real pull request or a
 * real deployment. Changes to Continero's private repositories are described
 * at the level of the feature rather than quoting internal commit messages.
 */
export const ledger: Localized<LedgerProduct[]> = {
  es: [
    {
      id: "artima",
      name: "Artima",
      context: "Continero · producto propio",
      what: "Plataforma SaaS de gestión de redes sociales con IA: publicación, planificación, bandeja de comentarios y facturación por suscripción.",
      stack: ["C#", ".NET", "SQL Server", "React", "TypeScript", "Python"],
      href: "https://artima.ai",
      hrefLabel: "artima.ai",
      entries: [
        {
          date: "2026-09",
          surface: "backend",
          summary:
            "Concurrencia optimista en planes de contenido: RowVersion en las escrituras e If-Match en los borrados, para que dos ediciones simultáneas fallen con 412 en vez de sobrescribirse.",
          state: "shipped",
        },
        {
          date: "2026-09",
          surface: "backend",
          summary:
            "Paginación de la mediateca del workspace como un único conjunto ordenado globalmente, en lugar de ordenar cada página por separado.",
          state: "shipped",
        },
        {
          date: "2026-09",
          surface: "entrega",
          summary:
            "El despliegue depende de todos los niveles de test, no solo del contrato de API, y la notificación reporta el resultado real en vez de un éxito fijo.",
          state: "shipped",
        },
        {
          date: "2026-08",
          surface: "facturación",
          summary:
            "Corregidos tres fallos en los extras de suscripción: uno borraba de Stripe un concepto que otros extras seguían usando, otro reclamaba un crédito que nunca se emitía y otro repreciaba mal al cambiar a plan anual.",
          state: "shipped",
        },
        {
          date: "2026-08",
          surface: "autorización",
          summary:
            "Permisos por capacidad en las reglas de automatización, los ajustes de workspace y la conexión de cuentas, con el borrado reservado al propietario.",
          state: "shipped",
        },
        {
          date: "2026-08",
          surface: "autorización",
          summary:
            "La identidad de una cuenta vinculada se deriva del perfil del propio usuario, para que nadie pueda responder comentarios en nombre de otro workspace.",
          state: "shipped",
        },
        {
          date: "2026-08",
          surface: "backend",
          summary:
            "Las publicaciones programadas se validan antes de cancelar la programación externa, y los errores de validación llegan al cliente con su estructura intacta.",
          state: "shipped",
        },
        {
          date: "2026-07",
          surface: "extremo a extremo",
          summary:
            "Idioma de contenido por workspace: campo nuevo en el dominio, endpoint y selector en todos los generadores de IA de la interfaz.",
          state: "shipped",
        },
        {
          date: "2026-04",
          surface: "servicio de medios",
          summary:
            "Servicio de medios en FastAPI: deduplicación de subidas por checksum SHA-256, miniaturas automáticas de imagen y vídeo, extracción de metadatos en segundo plano y documentación OpenAPI.",
          state: "shipped",
        },
        {
          date: "2026-09",
          surface: "backend",
          summary:
            "El identificador real del medio viaja desde el cliente hasta los DTO de lectura, en vez de fabricarse en el servidor.",
          state: "review",
        },
      ],
    },
    {
      id: "mej",
      name: "MyEuropeanJourney",
      context: "Continero · cliente",
      what: "Plataforma de transporte y traslados: panel web en Blazor para las empresas y app Flutter para los conductores.",
      stack: ["C#", ".NET", "Blazor", "SQL Server", "Flutter", "Dart"],
      entries: [
        {
          date: "2026-08",
          surface: "backend",
          summary:
            "Analítica de audioguías: endpoint que registra los eventos de ofrecida, reproducida, omitida y completada.",
          state: "shipped",
        },
        {
          date: "2026-08",
          surface: "datos",
          summary:
            "Puntos de interés de la audioguía sembrados desde el CSV de paradas, con los textos de narración generados en inglés y checo.",
          state: "shipped",
        },
        {
          date: "2026-07",
          surface: "extremo a extremo",
          summary:
            "Ubicaciones estructuradas de origen y destino en la respuesta de empty-leg, para que el asistente de edición de la app llegue relleno.",
          state: "shipped",
        },
        {
          date: "2026-07",
          surface: "backend",
          summary:
            "Contenido legal servido por idioma: GDPR y notas de versión en checo e inglés, con endpoint propio.",
          state: "shipped",
        },
        {
          date: "2026-07",
          surface: "app Flutter",
          summary:
            "Bandeja de entrada con agrupación, filtro y búsqueda; contraste corregido en los filtros y traducciones completadas.",
          state: "shipped",
        },
        {
          date: "2026-07",
          surface: "app Flutter",
          summary:
            "Validación del formato de teléfono en cliente, pantalla de notas de versión y arreglo de desbordamiento al asignar coche y conductor.",
          state: "shipped",
        },
      ],
    },
    {
      id: "gardenview",
      name: "GardenView",
      context: "Proyecto propio · final de ciclo",
      what: "Gestión de huertos: cultivos sobre un mapa, tareas, riegos, fotos y alertas de clima reales.",
      stack: ["Java 21", "Spring Boot 3.3", "React 19", "PostgreSQL 17"],
      href: "https://gardenview-fe.onrender.com/",
      hrefLabel: "gardenview-fe.onrender.com",
      entries: [
        {
          date: "2026-06",
          surface: "producto",
          summary:
            "Entregado y desplegado: API REST en Spring Boot, interfaz React, PostgreSQL, todo en Docker Compose y publicado en Render.",
          state: "live",
        },
      ],
    },
    {
      id: "camaleon",
      name: "Camaleón Teatro",
      context: "Cliente · web pública",
      what: "Sitio de una compañía de teatro en inglés que actúa en colegios de toda España.",
      stack: ["Astro 7", "TypeScript", "Tailwind 4", "Vitest"],
      href: "https://camaleonteatro.es",
      hrefLabel: "camaleonteatro.es",
      entries: [
        {
          date: "2026-09",
          surface: "producción",
          summary:
            "Sitio publicado en camaleonteatro.es, con dominio propio y despliegue automático desde main.",
          state: "live",
        },
        {
          date: "2026-09",
          surface: "producción",
          summary:
            "Los scripts de progressive enhancement dejaban de ejecutarse en producción por la política de seguridad de contenido; corregido y verificado en el sitio desplegado.",
          state: "shipped",
        },
      ],
    },
  ],
  en: [
    {
      id: "artima",
      name: "Artima",
      context: "Continero · in-house product",
      what: "AI social media management SaaS: publishing, scheduling, a comment inbox and subscription billing.",
      stack: ["C#", ".NET", "SQL Server", "React", "TypeScript", "Python"],
      href: "https://artima.ai",
      hrefLabel: "artima.ai",
      entries: [
        {
          date: "2026-09",
          surface: "backend",
          summary:
            "Optimistic concurrency on content plans: RowVersion on writes and If-Match on deletes, so two simultaneous edits fail with a 412 instead of overwriting each other.",
          state: "shipped",
        },
        {
          date: "2026-09",
          surface: "backend",
          summary:
            "Workspace media paginated as one globally sorted set, rather than sorting each page on its own.",
          state: "shipped",
        },
        {
          date: "2026-09",
          surface: "delivery",
          summary:
            "The deploy now depends on every test tier, not just the API contract, and the notification reports the real outcome instead of a hardcoded success.",
          state: "shipped",
        },
        {
          date: "2026-08",
          surface: "billing",
          summary:
            "Fixed three faults in subscription add-ons: one deleted a Stripe line item other add-ons still used, one claimed a credit that was never issued, and one repriced incorrectly on the switch to a yearly plan.",
          state: "shipped",
        },
        {
          date: "2026-08",
          surface: "authorization",
          summary:
            "Capability-based permissions on automation rules, workspace settings and account connection, with deletion reserved for the owner.",
          state: "shipped",
        },
        {
          date: "2026-08",
          surface: "authorization",
          summary:
            "A linked account's identity is derived from the caller's own profile, so nobody can reply to comments on behalf of another workspace.",
          state: "shipped",
        },
        {
          date: "2026-08",
          surface: "backend",
          summary:
            "Scheduled posts are validated before the external schedule is cancelled, and validation failures reach the client with their structure intact.",
          state: "shipped",
        },
        {
          date: "2026-07",
          surface: "end to end",
          summary:
            "Per-workspace content language: a new domain field, its endpoint, and a selector across every AI generator in the interface.",
          state: "shipped",
        },
        {
          date: "2026-04",
          surface: "media service",
          summary:
            "FastAPI media service: upload deduplication by SHA-256 checksum, automatic image and video thumbnails, background metadata extraction and OpenAPI docs.",
          state: "shipped",
        },
        {
          date: "2026-09",
          surface: "backend",
          summary:
            "The real media identifier is threaded from the client through to the read DTOs, instead of being fabricated server-side.",
          state: "review",
        },
      ],
    },
    {
      id: "mej",
      name: "MyEuropeanJourney",
      context: "Continero · client",
      what: "Transfer and mobility platform: a Blazor web panel for the companies and a Flutter app for the drivers.",
      stack: ["C#", ".NET", "Blazor", "SQL Server", "Flutter", "Dart"],
      entries: [
        {
          date: "2026-08",
          surface: "backend",
          summary:
            "Audio-guide analytics: an endpoint that records offered, played, skipped and completed events.",
          state: "shipped",
        },
        {
          date: "2026-08",
          surface: "data",
          summary:
            "Audio-guide points of interest seeded from the stops CSV, with narration texts generated in English and Czech.",
          state: "shipped",
        },
        {
          date: "2026-07",
          surface: "end to end",
          summary:
            "Structured from and to locations in the empty-leg response, so the app's edit wizard opens already filled in.",
          state: "shipped",
        },
        {
          date: "2026-07",
          surface: "backend",
          summary:
            "Legal content served per language: GDPR text and release notes in Czech and English, behind their own endpoint.",
          state: "shipped",
        },
        {
          date: "2026-07",
          surface: "Flutter app",
          summary:
            "Inbox with grouping, filtering and search; filter contrast fixed and the missing translations completed.",
          state: "shipped",
        },
        {
          date: "2026-07",
          surface: "Flutter app",
          summary:
            "Client-side phone format validation, a release notes screen, and an overflow fix when assigning a car and a driver.",
          state: "shipped",
        },
      ],
    },
    {
      id: "gardenview",
      name: "GardenView",
      context: "Own project · final coursework",
      what: "Allotment management: crops on a map, tasks, watering, photos and real weather alerts.",
      stack: ["Java 21", "Spring Boot 3.3", "React 19", "PostgreSQL 17"],
      href: "https://gardenview-fe.onrender.com/",
      hrefLabel: "gardenview-fe.onrender.com",
      entries: [
        {
          date: "2026-06",
          surface: "product",
          summary:
            "Delivered and deployed: a Spring Boot REST API, a React interface and PostgreSQL, all in Docker Compose and published on Render.",
          state: "live",
        },
      ],
    },
    {
      id: "camaleon",
      name: "Camaleón Teatro",
      context: "Client · public site",
      what: "The site of an English-language theatre company that performs in schools across Spain.",
      stack: ["Astro 7", "TypeScript", "Tailwind 4", "Vitest"],
      href: "https://camaleonteatro.es",
      hrefLabel: "camaleonteatro.es",
      entries: [
        {
          date: "2026-09",
          surface: "production",
          summary:
            "Site launched on camaleonteatro.es, with its own domain and automatic deploys from main.",
          state: "live",
        },
        {
          date: "2026-09",
          surface: "production",
          summary:
            "Progressive enhancement scripts stopped running in production because of the content security policy; fixed and verified against the deployed site.",
          state: "shipped",
        },
      ],
    },
  ],
};

export const ledgerFor = (locale: keyof typeof ledger) => ledger[locale];
