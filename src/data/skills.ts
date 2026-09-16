import { Bot, Cloud, Database, Layers, Server, Smartphone, Terminal, Users } from "lucide-react";
import type { SkillCategory } from "@/types/content";

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    name: { es: "Backend", en: "Backend" },
    icon: Server,
    skills: [
      "springboot",
      "java",
      "nodejs",
      "express",
      "nestjs",
      "python",
      "laravel",
      "django",
      "php",
    ],
  },
  {
    id: "frontend",
    name: { es: "Frontend", en: "Frontend" },
    icon: Terminal,
    skills: [
      "angular",
      "react",
      "nextjs",
      "typescript",
      "javascript",
      "css",
      "sass",
      "tailwind",
      "bootstrap",
    ],
  },
  {
    id: "mobile",
    name: { es: "Móvil", en: "Mobile" },
    icon: Smartphone,
    skills: ["flutter"],
  },
  {
    id: "databases",
    name: { es: "Bases de datos", en: "Databases" },
    icon: Database,
    skills: ["postgresql", "mongodb"],
  },
  {
    id: "architecture",
    name: { es: "Arquitectura y calidad", en: "Architecture & quality" },
    icon: Layers,
    skills: ["hexagonal", "microservices", "solid", "junit", "mockito", "jest"],
  },
  {
    id: "devops",
    name: { es: "DevOps y Cloud", en: "DevOps & Cloud" },
    icon: Cloud,
    skills: ["azuredevops", "aws", "git", "cicd", "monitoring"],
  },
  {
    id: "ai",
    name: { es: "IA aplicada", en: "Applied AI" },
    icon: Bot,
    skills: ["prompting", "rag", "mcp", "agents", "claudecode"],
  },
  {
    id: "methodologies",
    name: { es: "Metodologías", en: "Methodologies" },
    icon: Users,
    skills: ["scrum", "teamwork", "codereview"],
  },
];
