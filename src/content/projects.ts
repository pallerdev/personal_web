export interface Project {
  slug: string;
  title: string;
  type: string;
  year: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  decisions: string[];
  lessons: string[];
  technologies: string[];
  repository: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "gardenview",
    title: "GardenView",
    type: "Aplicación full-stack formativa",
    year: "2026",
    summary:
      "Una aplicación para organizar huertos y hacer seguimiento de sus plantas, construida de extremo a extremo.",
    problem:
      "La información de un huerto suele quedar repartida entre notas, calendarios y memoria. GardenView reúne cada huerto, sus condiciones y sus plantas bajo una cuenta privada.",
    solution:
      "Modelé usuarios, huertos y plantas como recursos relacionados. Construí autenticación, autorización, validación y CRUD con una interfaz React conectada al backend mediante Inertia.",
    role: "Diseño del modelo de datos, backend Laravel, interfaz React, entorno Docker y documentación técnica.",
    decisions: [
      "Mantener backend y frontend en una sola aplicación con Inertia para evitar una API innecesaria.",
      "Asociar cada huerto a su propietario y validar el acceso en cada operación.",
      "Representar las relaciones en la base de datos mediante migraciones reproducibles.",
    ],
    lessons: [
      "Separar validación, autorización y persistencia hace más predecible cada flujo.",
      "Hoy añadiría tests de integración desde el primer recurso y automatizaría la entrega continua.",
    ],
    technologies: ["Laravel 12", "PHP", "React", "Inertia", "SQLite", "Docker"],
    repository: "https://github.com/pallerdev/Proyecto_CRUD_GardenView",
    featured: true,
  },
  {
    slug: "crud-servidor",
    title: "CRUD multilingüe con Laravel",
    type: "Práctica de backend web",
    year: "2026",
    summary:
      "Autenticación, recursos protegidos, paginación y traducciones completas en español, inglés y francés.",
    problem:
      "Construir una aplicación web mantenible que cubriera el ciclo completo de acceso y gestión de datos.",
    solution:
      "Organicé la aplicación alrededor de controladores, modelos, migraciones, vistas Blade y middleware de idioma.",
    role: "Implementación completa y configuración Docker.",
    decisions: [
      "Persistir el idioma seleccionado mediante middleware.",
      "Generar datos repetibles con migraciones y seeders.",
    ],
    lessons: [
      "Las traducciones funcionan mejor cuando forman parte del diseño de componentes desde el inicio.",
    ],
    technologies: ["Laravel", "Blade", "MySQL", "Docker"],
    repository: "https://github.com/pallerdev/Proyecto_CRUD_Servidor",
    featured: false,
  },
];
