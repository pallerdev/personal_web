export interface Link {
  label: string;
  href: string;
}
export interface StackGroup {
  label: string;
  note: string;
  items: string[];
}

export const site = {
  name: "Pablo Aller",
  role: "Backend developer",
  headline:
    "Construyo backend para productos que tienen que funcionar de verdad.",
  intro:
    "Soy developer en Continero. Trabajo principalmente con .NET y Java, y salto al frontend cuando el producto lo necesita.",
  email: "pablo.aller.moreno@gmail.com",
  location: "Brno, República Checa",
  links: [
    { label: "GitHub", href: "https://github.com/pallerdev" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pablo-aller-350463278/",
    },
  ] satisfies Link[],
  stack: [
    {
      label: "Trabajo diario",
      note: "Tecnologías presentes en mi trabajo profesional.",
      items: ["C#", ".NET", "React", "Docker"],
    },
    {
      label: "He construido con",
      note: "Herramientas usadas en proyectos profesionales o formativos.",
      items: [
        "Java",
        "Spring Boot",
        "TypeScript",
        "Laravel",
        "SQL",
        "GitHub Actions",
      ],
    },
    {
      label: "Explorando",
      note: "Tecnologías y prácticas en las que sigo profundizando.",
      items: ["Rust", "Flutter", "Automatización", "IA aplicada al desarrollo"],
    },
  ] satisfies StackGroup[],
} as const;
