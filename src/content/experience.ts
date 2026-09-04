import type { Localized } from "../i18n/config";

export interface ExperienceItem {
  period: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  /** Where the work actually landed, product by product. */
  surfaces?: { name: string; detail: string }[];
  technologies?: string[];
}

export const experience: Localized<ExperienceItem[]> = {
  es: [
    {
      period: "Mar. 2026 — actualidad",
      title: "Developer",
      organization: "Continero",
      location: "Brno, República Checa",
      description:
        "Desarrollo backend en .NET sobre dos productos con usuarios reales. Mi trabajo se concentra en la parte del sistema que decide y cobra: autorización por capacidades, concurrencia en escrituras simultáneas, facturación por suscripción y contratos de API. Cuando una funcionalidad cruza capas, la termino en la interfaz React o en la app Flutter en lugar de dejarla a medias.",
      surfaces: [
        {
          name: "Artima",
          detail:
            "Backend .NET del producto propio: permisos, concurrencia, facturación y publicación. También la interfaz React y un servicio de medios en FastAPI.",
        },
        {
          name: "MyEuropeanJourney",
          detail:
            "Backend .NET y app Flutter de una plataforma de transporte: analítica de audioguías, contenido legal por idioma y pantallas de la app de conductores.",
        },
        {
          name: "Entrega",
          detail:
            "Endurecí el pipeline de CI para que ningún despliegue pueda saltarse un nivel de test y para que la notificación diga el resultado real.",
        },
      ],
      technologies: [
        "C#",
        ".NET",
        "Entity Framework",
        "SQL Server",
        "React",
        "TypeScript",
        "Flutter",
        "Python",
        "Docker",
      ],
    },
    {
      period: "2022 — 2024",
      title: "Atención al cliente",
      organization: "Hostelería y turismo",
      location: "España",
      description:
        "Turnos con público internacional. Es donde aprendí a explicar algo complicado en una frase, a decir «no lo sé, lo compruebo» sin perder la credibilidad y a trabajar bien cuando el plan del día se ha caído a las once de la mañana.",
    },
  ],
  en: [
    {
      period: "Mar 2026 — present",
      title: "Developer",
      organization: "Continero",
      location: "Brno, Czech Republic",
      description:
        "Backend development in .NET across two products with real users. My work concentrates on the part of the system that decides and charges: capability-based authorization, concurrency on simultaneous writes, subscription billing and API contracts. When a feature crosses layers, I finish it myself in the React interface or the Flutter app rather than hand it over half-done.",
      surfaces: [
        {
          name: "Artima",
          detail:
            "The .NET backend of the in-house product: permissions, concurrency, billing and publishing. Also its React interface and a FastAPI media service.",
        },
        {
          name: "MyEuropeanJourney",
          detail:
            "The .NET backend and Flutter app of a transfer platform: audio-guide analytics, legal content per language and driver-app screens.",
        },
        {
          name: "Delivery",
          detail:
            "Hardened the CI pipeline so no deploy can skip a test tier and the notification reports the real outcome.",
        },
      ],
      technologies: [
        "C#",
        ".NET",
        "Entity Framework",
        "SQL Server",
        "React",
        "TypeScript",
        "Flutter",
        "Python",
        "Docker",
      ],
    },
    {
      period: "2022 — 2024",
      title: "Customer-facing work",
      organization: "Hospitality and tourism",
      location: "Spain",
      description:
        "Shifts with an international public. That is where I learned to explain something complicated in one sentence, to say 'I don't know, let me check' without losing credibility, and to work well after the plan for the day collapsed at eleven in the morning.",
    },
  ],
};
