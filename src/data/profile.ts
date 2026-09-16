import type { Profile } from "@/types/content";

export const profile: Profile = {
  fullName: "Rafael Alfonso Corredor Gambín",
  shortName: "Rafael Corredor",
  role: {
    es: "Desarrollador Full Stack & Ingeniero DevOps",
    en: "Full Stack Developer & DevOps Engineer",
  },
  tagline: {
    es: "Diseño, construyo y despliego plataformas de microservicios en la nube, e integro IA donde aporta valor real al producto.",
    en: "I design, build and ship cloud microservice platforms, and integrate AI where it adds real value to the product.",
  },
  location: {
    es: "Cereté, Córdoba, Colombia",
    en: "Cereté, Córdoba, Colombia",
  },
  email: "rafaelcorredorgambin1@gmail.com",
  phone: "+57 313 543 9677",
  summary: {
    es: [
      "Ingeniero de Sistemas con formación complementaria en Ingeniería de Software, especializado en el ciclo de vida completo del desarrollo: análisis, diseño, implementación, pruebas y despliegue de sistemas de información, aplicaciones móviles y arquitecturas de microservicios en la nube.",
      "Trabajo como Desarrollador Full Stack e Ingeniero DevOps en plataformas de microservicios con Spring Boot, PostgreSQL, Express.js, Angular y TypeScript, aplicando Arquitectura Hexagonal y principios SOLID, y gestionando pipelines de CI/CD en Azure DevOps con despliegues en AWS.",
      "Integro IA en producto mediante ingeniería de prompts, RAG, MCP y orquestación de agentes. Actualmente curso la Maestría en Ciberseguridad (UNIR) y la Especialización en Inteligencia Artificial (CUN).",
    ],
    en: [
      "Systems Engineer with complementary training in Software Engineering, specialized in the full development lifecycle: analysis, design, implementation, testing and deployment of information systems, mobile apps and cloud microservice architectures.",
      "I work as a Full Stack Developer and DevOps Engineer on microservice platforms built with Spring Boot, PostgreSQL, Express.js, Angular and TypeScript, applying Hexagonal Architecture and SOLID principles, and running CI/CD pipelines on Azure DevOps with deployments to AWS.",
      "I bring AI into products through prompt engineering, RAG, MCP and agent orchestration. Currently pursuing a Master's in Cybersecurity (UNIR) and a Graduate Specialization in Artificial Intelligence (CUN).",
    ],
  },
  languages: [
    { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
    { name: { es: "Inglés", en: "English" }, level: { es: "B1", en: "B1" } },
  ],
  coreStack: ["springboot", "angular", "typescript", "postgresql", "aws", "azuredevops"],
  cv: {
    es: "/cv/CV_Rafael_Corredor_Gambin_2026_Harvard.pdf",
    en: "/cv/CV_Rafael_Corredor_Gambin_2026_EN.pdf",
  },
  photo: {
    src: "/images/rafael.webp",
    alt: {
      es: "Retrato de Rafael Alfonso Corredor Gambín",
      en: "Portrait of Rafael Alfonso Corredor Gambín",
    },
    width: 640,
    height: 853,
  },
};
