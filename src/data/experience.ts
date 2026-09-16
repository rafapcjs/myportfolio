import type { ExperienceItem } from "@/types/content";

/** Ordered from most recent to oldest. */
export const experience: ExperienceItem[] = [
  {
    id: "seti",
    company: "SETI S.A.S",
    role: {
      es: "Desarrollador de Software / Ingeniero DevOps Junior",
      en: "Software Developer / Junior DevOps Engineer",
    },
    start: "2026-02",
    end: null,
    location: { es: "Medellín, Colombia", en: "Medellín, Colombia" },
    mode: "remote",
    highlights: {
      es: [
        "Desarrollo full-stack y evolución de una aplicación de microservicios en la nube.",
        "Diseño de servicios bajo Arquitectura Hexagonal y principios SOLID.",
        "Pruebas unitarias con JUnit, Mockito y Jest; revisión de código entre pares.",
        "Integración de IA: ingeniería de prompts, arquitecturas RAG y herramientas vía MCP.",
        "Orquestación de agentes de IA para automatizar tareas de desarrollo y soporte.",
        "Pipelines CI/CD en Azure DevOps, despliegues en AWS, automatización de releases y monitorización.",
      ],
      en: [
        "Full-stack development and evolution of a cloud microservices application.",
        "Service design following Hexagonal Architecture and SOLID principles.",
        "Unit testing with JUnit, Mockito and Jest; peer code reviews.",
        "AI integration: prompt engineering, RAG architectures and tools exposed via MCP.",
        "Orchestration of AI agents to automate development and support tasks.",
        "CI/CD pipelines on Azure DevOps, AWS deployments, release automation and monitoring.",
      ],
    },
    stack: ["springboot", "angular", "typescript", "postgresql", "azuredevops", "aws", "mcp"],
  },
  {
    id: "unicordoba-internship",
    company: "Universidad de Córdoba",
    role: {
      es: "Pasantía en Ingeniería de Sistemas",
      en: "Systems Engineering Internship",
    },
    start: "2025-08",
    end: "2025-12",
    location: { es: "Montería, Colombia", en: "Montería, Colombia" },
    mode: "remote",
    highlights: {
      es: [
        "Sistema IoT para monitoreo de variables climáticas en los umbráculos de la Facultad de Agronomía.",
        "APIs REST con Node.js (Express) y MongoDB.",
        "App móvil en Flutter para visualización en tiempo real y control remoto.",
        "Integración de ESP32 por sockets para riego automatizado.",
        "Notificaciones push con Firebase Cloud Messaging y despliegue en AWS.",
      ],
      en: [
        "IoT system to monitor climate variables in the shade houses of the Faculty of Agronomy.",
        "REST APIs with Node.js (Express) and MongoDB.",
        "Flutter mobile app for real-time visualization and remote control.",
        "ESP32 integration over sockets for automated irrigation.",
        "Push notifications with Firebase Cloud Messaging and deployment on AWS.",
      ],
    },
    stack: ["nodejs", "express", "mongodb", "flutter", "esp32", "firebase", "aws"],
  },
  {
    id: "unicartagena-internship",
    company: "Universidad de Cartagena · Sede Piedra Bolívar",
    role: {
      es: "Pasantía en Ingeniería de Software",
      en: "Software Engineering Internship",
    },
    start: "2025-05",
    end: "2025-08",
    location: { es: "Cartagena, Colombia", en: "Cartagena, Colombia" },
    mode: "remote",
    highlights: {
      es: [
        "APIs REST para datos de dispositivos IoT.",
        "Monitoreo en tiempo real de sistemas fotovoltaicos.",
        "Interfaces web responsivas para análisis de información energética.",
        "Bases de datos SQL y NoSQL, Git y metodologías ágiles.",
      ],
      en: [
        "REST APIs for IoT device data.",
        "Real-time monitoring of photovoltaic systems.",
        "Responsive web interfaces for energy data analysis.",
        "SQL and NoSQL databases, Git and agile methodologies.",
      ],
    },
    stack: ["nodejs", "javascript", "postgresql", "mongodb", "git"],
  },
  {
    id: "unicartagena-monitor",
    company: "Universidad de Cartagena · Centro Tutorial Cereté",
    role: { es: "Monitor Académico", en: "Academic Tutor" },
    start: "2024-09",
    end: "2024-12",
    location: { es: "Cereté, Colombia", en: "Cereté, Colombia" },
    mode: "onsite",
    highlights: {
      es: ["Acompañamiento a estudiantes en programación, estructuras de datos y POO en Java."],
      en: ["Tutored students in programming, data structures and OOP in Java."],
    },
    stack: ["java"],
  },
];
