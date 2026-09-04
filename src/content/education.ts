import type { Localized } from "../i18n/config";

export interface EducationItem {
  period: string;
  title: string;
  institution: string;
  detail?: string;
}

export const education: Localized<EducationItem[]> = {
  es: [
    {
      period: "2024 — 2026",
      title: "Desarrollo de Aplicaciones Web",
      institution: "CPIFP Los Enlaces · Zaragoza",
      detail: "Técnico superior. Proyecto final: GardenView.",
    },
    {
      period: "2022 — actualidad",
      title: "Grado en Ingeniería Informática",
      institution: "Universitat Oberta de Catalunya",
      detail: "En curso, a distancia.",
    },
    {
      period: "2018 — 2019",
      title: "Curso de secundaria en Estados Unidos",
      institution: "Liberty-Eylau High School · Texas",
      detail: "Un año completo en inglés.",
    },
  ],
  en: [
    {
      period: "2024 — 2026",
      title: "Web Application Development",
      institution: "CPIFP Los Enlaces · Zaragoza",
      detail: "Higher technician diploma. Final project: GardenView.",
    },
    {
      period: "2022 — present",
      title: "BSc Computer Engineering",
      institution: "Universitat Oberta de Catalunya",
      detail: "In progress, part time.",
    },
    {
      period: "2018 — 2019",
      title: "High-school year in the United States",
      institution: "Liberty-Eylau High School · Texas",
      detail: "A full year taught in English.",
    },
  ],
};

export interface LanguageSkill {
  name: string;
  level: string;
}

export const languages: Localized<LanguageSkill[]> = {
  es: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "Profesional" },
  ],
  en: [
    { name: "Spanish", level: "Native" },
    { name: "English", level: "Professional" },
  ],
};
