export interface EducationItem {
  period: string;
  title: string;
  institution: string;
  detail?: string;
}

export const education: EducationItem[] = [
  {
    period: "2022 — actualidad",
    title: "Grado en Ingeniería Informática",
    institution: "Universitat Oberta de Catalunya",
  },
  {
    period: "2024 — 2026",
    title: "Desarrollo de Aplicaciones Web",
    institution: "CPIFP Los Enlaces",
    detail: "Técnico superior",
  },
  {
    period: "2018 — 2019",
    title: "Educación secundaria en Estados Unidos",
    institution: "Liberty-Eylau High School · Texas",
  },
];
