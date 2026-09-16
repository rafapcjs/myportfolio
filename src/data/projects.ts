import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    id: "iot-shade-houses",
    title: {
      es: "Sistema IoT de monitoreo climático para umbráculos",
      en: "IoT climate monitoring system for shade houses",
    },
    description: {
      es: "Plataforma IoT completa: sensores en ESP32, API REST, app móvil en Flutter con datos en tiempo real, notificaciones push y riego automatizado.",
      en: "End-to-end IoT platform: ESP32 sensors, REST API, Flutter mobile app with real-time data, push notifications and automated irrigation.",
    },
    problem: {
      es: "La Facultad de Agronomía no tenía visibilidad de temperatura, humedad y riego en sus umbráculos; el control era manual y sin histórico.",
      en: "The Faculty of Agronomy had no visibility of temperature, humidity or irrigation in its shade houses; control was manual with no history.",
    },
    stack: ["flutter", "nodejs", "express", "mongodb", "esp32", "sockets", "firebase", "aws"],
    repoUrl: null, // TODO: add repository URL
    demoUrl: null, // TODO: add demo URL
    status: "done",
  },
  {
    id: "photovoltaic-monitoring",
    title: {
      es: "Plataforma de monitoreo de sistemas fotovoltaicos",
      en: "Photovoltaic systems monitoring platform",
    },
    description: {
      es: "APIs REST para ingesta de datos de dispositivos IoT y frontend responsive para analizar la generación energética en tiempo real.",
      en: "REST APIs ingesting IoT device data and a responsive frontend to analyze energy generation in real time.",
    },
    problem: {
      es: "Los datos de los paneles se recogían de forma dispersa; se necesitaba una fuente única, persistencia SQL/NoSQL y visualización útil para tomar decisiones.",
      en: "Panel data was collected in a scattered way; a single source of truth with SQL/NoSQL persistence and useful visualizations was needed.",
    },
    stack: ["nodejs", "javascript", "postgresql", "mongodb", "iot"],
    repoUrl: null, // TODO: add repository URL
    demoUrl: null, // TODO: add demo URL
    status: "done",
  },
  {
    id: "ai-microservices",
    title: {
      es: "Integración de IA en plataforma de microservicios",
      en: "AI integration in a microservices platform",
    },
    description: {
      es: "Capacidades de IA sobre una plataforma Spring Boot + Angular: RAG sobre conocimiento del dominio, herramientas expuestas vía MCP y agentes que automatizan tareas de desarrollo y soporte.",
      en: "AI capabilities on top of a Spring Boot + Angular platform: RAG over domain knowledge, tools exposed through MCP and agents automating development and support tasks.",
    },
    problem: {
      es: "Procesos de soporte y desarrollo repetitivos que consumían tiempo del equipo y dependían de conocimiento disperso en la documentación.",
      en: "Repetitive support and development processes that consumed team time and depended on knowledge scattered across documentation.",
    },
    stack: ["springboot", "angular", "rag", "mcp", "agents", "claudecode"],
    repoUrl: null,
    demoUrl: null,
    status: "in-progress",
    confidential: true,
  },
  {
    id: "placeholder-1",
    title: { es: "Próximo proyecto personal", en: "Upcoming personal project" },
    description: {
      es: "Espacio reservado. Edita src/data/projects.ts para añadir aquí tu siguiente proyecto.",
      en: "Reserved slot. Edit src/data/projects.ts to add your next project here.",
    },
    problem: { es: "Por definir.", en: "To be defined." },
    stack: ["nextjs", "typescript"],
    repoUrl: null,
    demoUrl: null,
    status: "planned",
    placeholder: true,
  },
  {
    id: "placeholder-2",
    title: { es: "Próximo proyecto personal", en: "Upcoming personal project" },
    description: {
      es: "Espacio reservado. Edita src/data/projects.ts para añadir aquí tu siguiente proyecto.",
      en: "Reserved slot. Edit src/data/projects.ts to add your next project here.",
    },
    problem: { es: "Por definir.", en: "To be defined." },
    stack: ["springboot", "postgresql"],
    repoUrl: null,
    demoUrl: null,
    status: "planned",
    placeholder: true,
  },
];
