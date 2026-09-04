export interface ExperienceItem {
  period: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  technologies?: string[];
}

export const experience: ExperienceItem[] = [
  {
    period: "Jul. 2026 — actualidad",
    title: "Developer",
    organization: "Continero",
    location: "Brno, República Checa",
    description:
      "Desarrollo soluciones de software en un equipo de producto. Trabajo en backend con .NET y colaboro en otras capas cuando el contexto lo requiere.",
    technologies: ["C#", ".NET", "React", "Docker", "Flutter"],
  },
  {
    period: "2022 — 2024",
    title: "Experiencia previa de cara al público",
    organization: "Hostelería y turismo",
    location: "España",
    description:
      "Trabajar con clientes y equipos internacionales me enseñó a comunicar con claridad, reaccionar ante imprevistos y mantener la calma cuando el contexto cambia.",
  },
];
