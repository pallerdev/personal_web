import type { Localized } from "../i18n/config";

export interface Link {
  label: string;
  href: string;
}

export interface FactRow {
  label: string;
  value: string;
  note?: string;
}

export interface StackGroup {
  label: string;
  note: string;
  items: string[];
}

export interface NavItem {
  label: string;
  hash: string;
}

/** Identity, contact and links. The same in every language. */
export const identity = {
  name: "Pablo Aller",
  initials: "PA",
  email: "pablo.aller.moreno@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/pallerdev" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pablo-aller-350463278/",
    },
  ] satisfies Link[],
} as const;

export const role: Localized<string> = {
  es: "Backend developer",
  en: "Backend developer",
};

export const location: Localized<string> = {
  es: "Brno, República Checa",
  en: "Brno, Czech Republic",
};

export const tagline: Localized<string> = {
  es: "Backend · Brno · Continero",
  en: "Backend · Brno · Continero",
};

export const headline: Localized<string> = {
  es: "La parte del backend que no admite errores.",
  en: "The part of the backend with no room for error.",
};

export const intro: Localized<string> = {
  es: "Permisos, concurrencia y facturación en dos productos en producción. Escribo el código que decide quién puede hacer qué, y qué ocurre cuando dos personas editan lo mismo a la vez.",
  en: "Permissions, concurrency and billing across two products in production. I write the code that decides who is allowed to do what — and what happens when two people edit the same thing at once.",
};

export const metaDescription: Localized<string> = {
  es: "Pablo Aller, backend developer en Continero (Brno). .NET, C# y SQL en producción, con React, Flutter y Python cuando la funcionalidad cruza capas.",
  en: "Pablo Aller, backend developer at Continero (Brno). .NET, C# and SQL in production, with React, Flutter and Python when a feature crosses layers.",
};

/**
 * Headline figures. Counted from the pull requests authored on
 * github.com/pallerdev across the Continero repositories he has access to,
 * measured on the date in `recordUpdated`.
 */
export const recordUpdated = "2026-09-04";

export const facts: Localized<FactRow[]> = {
  es: [
    { label: "Pull requests", value: "120", note: "en Continero" },
    { label: "Integradas", value: "85", note: "en master" },
    { label: "Repositorios", value: "6", note: "backend, web y móvil" },
    { label: "Desde", value: "mar. 2026", note: "Brno, en producción" },
  ],
  en: [
    { label: "Pull requests", value: "120", note: "at Continero" },
    { label: "Merged", value: "85", note: "into master" },
    { label: "Repositories", value: "6", note: "backend, web and mobile" },
    { label: "Since", value: "Mar 2026", note: "Brno, in production" },
  ],
};

export const nav: Localized<NavItem[]> = {
  es: [
    { label: "Registro", hash: "#registro" },
    { label: "Proyectos", hash: "#proyectos" },
    { label: "Herramientas", hash: "#herramientas" },
    { label: "Sobre mí", hash: "#sobre-mi" },
  ],
  en: [
    { label: "Record", hash: "#registro" },
    { label: "Projects", hash: "#proyectos" },
    { label: "Tools", hash: "#herramientas" },
    { label: "About", hash: "#sobre-mi" },
  ],
};

/**
 * Tools grouped by how much of my actual work they carry, not by a
 * self-assigned skill level.
 */
export const stack: Localized<StackGroup[]> = {
  es: [
    {
      label: "Todos los días",
      note: "El backend que mantengo y amplío en Continero.",
      items: [
        "C#",
        ".NET",
        "Entity Framework",
        "SQL Server",
        "Docker",
        "Git",
        "GitHub Actions",
      ],
    },
    {
      label: "Cuando la función cruza capas",
      note: "Interfaz, app móvil y servicios auxiliares del mismo producto.",
      items: [
        "TypeScript",
        "React",
        "Flutter",
        "Dart",
        "Python",
        "FastAPI",
        "Blazor",
      ],
    },
    {
      label: "Pruebas y entrega",
      note: "Cómo compruebo que un cambio no rompe nada antes de desplegarlo.",
      items: [
        "xUnit",
        "Hurl",
        "Robot Framework",
        "Maestro",
        "Playwright",
        "Azure Pipelines",
      ],
    },
    {
      label: "En mis propios proyectos",
      note: "Lo que elijo cuando la decisión técnica es mía.",
      items: [
        "Java 21",
        "Spring Boot",
        "PostgreSQL",
        "Astro",
        "Laravel",
        "nginx",
        "Linux",
      ],
    },
  ],
  en: [
    {
      label: "Every day",
      note: "The backend I maintain and extend at Continero.",
      items: [
        "C#",
        ".NET",
        "Entity Framework",
        "SQL Server",
        "Docker",
        "Git",
        "GitHub Actions",
      ],
    },
    {
      label: "When a feature crosses layers",
      note: "The interface, the mobile app and the side services of the same product.",
      items: [
        "TypeScript",
        "React",
        "Flutter",
        "Dart",
        "Python",
        "FastAPI",
        "Blazor",
      ],
    },
    {
      label: "Testing and delivery",
      note: "How I check that a change breaks nothing before it ships.",
      items: [
        "xUnit",
        "Hurl",
        "Robot Framework",
        "Maestro",
        "Playwright",
        "Azure Pipelines",
      ],
    },
    {
      label: "In my own projects",
      note: "What I pick when the technical call is mine.",
      items: [
        "Java 21",
        "Spring Boot",
        "PostgreSQL",
        "Astro",
        "Laravel",
        "nginx",
        "Linux",
      ],
    },
  ],
};

export const about: Localized<{ title: string; body: string[] }> = {
  es: {
    title: "De Zaragoza a Brno.",
    body: [
      "Estudié Desarrollo de Aplicaciones Web en Zaragoza y terminé el ciclo con GardenView, una aplicación completa con backend en Spring Boot y frontend en React. Antes de eso pasé un curso de instituto en Texas, que es donde aprendí inglés de verdad.",
      "Hoy vivo en Brno y trabajo en Continero sobre dos productos con usuarios reales. La mayor parte de lo que hago vive detrás de un endpoint: autorización, concurrencia, facturación y contratos de API. Es la parte del sistema donde un fallo no se ve, pero se paga.",
      "Fuera del código: Linux, viajar y música. También sistemas, en el fondo.",
    ],
  },
  en: {
    title: "From Zaragoza to Brno.",
    body: [
      "I studied Web Application Development in Zaragoza and finished the programme with GardenView, a full application with a Spring Boot backend and a React frontend. Before that I spent a school year in Texas, which is where I actually learned English.",
      "I now live in Brno and work at Continero on two products with real users. Most of what I do lives behind an endpoint: authorization, concurrency, billing and API contracts. It is the part of a system where a mistake is invisible until it costs something.",
      "Away from code: Linux, travelling and music. Systems too, in their own way.",
    ],
  },
};

export const contact: Localized<{ title: string; body: string }> = {
  es: {
    title: "Si el problema es interesante, escríbeme.",
    body: "Respondo a todo. Me interesan equipos donde el backend se toma en serio y donde se puede discutir una decisión técnica sin ganarla por antigüedad.",
  },
  en: {
    title: "If the problem is interesting, write to me.",
    body: "I answer everything. I am interested in teams that take the backend seriously, and where a technical decision can be argued on its merits rather than on seniority.",
  },
};

export const footerStatement: Localized<string> = {
  es: "Escrito a mano.\nSin plantilla, sin CMS\ny sin framework de cliente.",
  en: "Written by hand.\nNo template, no CMS\nand no client framework.",
};
