import type { Certification, EducationItem } from "@/types/content";

export const education: EducationItem[] = [
  {
    id: "unir-cybersecurity",
    degree: { es: "Maestría en Ciberseguridad", en: "Master's Degree in Cybersecurity" },
    institution: "UNIR",
    country: { es: "España", en: "Spain" },
    start: "2026-09",
    end: "2027-12",
    status: "in-progress",
  },
  {
    id: "cun-ai",
    degree: {
      es: "Especialización en Inteligencia Artificial",
      en: "Graduate Specialization in Artificial Intelligence",
    },
    institution: "Universidad CUN",
    country: { es: "Colombia", en: "Colombia" },
    start: "2026-09",
    end: "2027-12",
    status: "in-progress",
  },
  {
    id: "unicartagena-software",
    degree: { es: "Ingeniería de Software", en: "Software Engineering" },
    institution: "Universidad de Cartagena",
    country: { es: "Colombia", en: "Colombia" },
    start: null,
    end: null,
    status: "in-progress",
    note: { es: "Noveno semestre", en: "Ninth semester" },
  },
  {
    id: "unicordoba-systems",
    degree: { es: "Ingeniería de Sistemas", en: "Systems Engineering" },
    institution: "Universidad de Córdoba",
    country: { es: "Colombia", en: "Colombia" },
    start: null,
    end: null,
    status: "completed",
    note: { es: "Título profesional", en: "Professional degree" },
  },
];

export const certifications: Certification[] = [
  {
    id: "one-spring-java",
    name: { es: "Desarrollador Junior Spring & Java", en: "Junior Spring & Java Developer" },
    issuer: "Oracle Next Education",
    url: null, // TODO: add credential URL
  },
  {
    id: "aws-cloud-practitioner",
    name: { es: "AWS Cloud Practitioner", en: "AWS Cloud Practitioner" },
    issuer: "Amazon Web Services",
    url: null, // TODO: add credential URL
  },
  {
    id: "software-architecture",
    name: { es: "Software Architecture", en: "Software Architecture" },
    issuer: "", // TODO: add issuer
    url: null, // TODO: add credential URL
  },
];
