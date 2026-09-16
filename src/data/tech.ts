import {
  SiAngular,
  SiBootstrap,
  SiClaude,
  SiCss,
  SiDjango,
  SiEspressif,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiJavascript,
  SiJest,
  SiJunit5,
  SiLaravel,
  SiModelcontextprotocol,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSass,
  SiSocketdotio,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { VscAzureDevops } from "react-icons/vsc";
import {
  Activity,
  Bot,
  Boxes,
  Cpu,
  FlaskConical,
  GitPullRequest,
  Hexagon,
  Network,
  Sparkles,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";
import type { Tech } from "@/types/content";

/**
 * Single registry of every technology mentioned across the site.
 * Add an entry here first, then reference its key from skills, projects or experience.
 */
export const techRegistry = {
  // Backend
  springboot: { name: "Spring Boot", icon: SiSpringboot },
  java: { name: "Java", icon: SiOpenjdk },
  nodejs: { name: "Node.js", icon: SiNodedotjs },
  express: { name: "Express.js", icon: SiExpress },
  nestjs: { name: "NestJS", icon: SiNestjs },
  python: { name: "Python", icon: SiPython },
  laravel: { name: "Laravel", icon: SiLaravel },
  django: { name: "Django", icon: SiDjango },
  php: { name: "PHP", icon: SiPhp },
  // Frontend
  angular: { name: "Angular", icon: SiAngular },
  react: { name: "React", icon: SiReact },
  nextjs: { name: "Next.js", icon: SiNextdotjs },
  typescript: { name: "TypeScript", icon: SiTypescript },
  javascript: { name: "JavaScript", icon: SiJavascript },
  css: { name: "CSS", icon: SiCss },
  sass: { name: "SASS", icon: SiSass },
  tailwind: { name: "Tailwind CSS", icon: SiTailwindcss },
  bootstrap: { name: "Bootstrap", icon: SiBootstrap },
  // Mobile
  flutter: { name: "Flutter", icon: SiFlutter },
  // Databases
  postgresql: { name: "PostgreSQL", icon: SiPostgresql },
  mongodb: { name: "MongoDB", icon: SiMongodb },
  // Architecture & quality
  hexagonal: { name: "Hexagonal Architecture", icon: Hexagon },
  microservices: { name: "Microservices", icon: Boxes },
  solid: { name: "SOLID", icon: Wrench },
  junit: { name: "JUnit", icon: SiJunit5 },
  mockito: { name: "Mockito", icon: FlaskConical },
  jest: { name: "Jest", icon: SiJest },
  // DevOps & Cloud
  azuredevops: { name: "Azure DevOps", icon: VscAzureDevops },
  aws: { name: "AWS", icon: FaAws },
  git: { name: "Git", icon: SiGit },
  cicd: { name: "CI/CD", icon: Workflow },
  monitoring: { name: "Monitoring", icon: Activity },
  // Applied AI
  prompting: { name: "Prompt Engineering", icon: Sparkles },
  rag: { name: "RAG", icon: Network },
  mcp: { name: "MCP", icon: SiModelcontextprotocol },
  agents: { name: "AI Agents", icon: Bot },
  claudecode: { name: "Claude Code", icon: SiClaude },
  // Methodologies
  scrum: { name: "Scrum", icon: Workflow },
  teamwork: { name: "Teamwork", icon: Users },
  codereview: { name: "Code Review", icon: GitPullRequest },
  // IoT
  esp32: { name: "ESP32", icon: SiEspressif },
  sockets: { name: "Sockets", icon: SiSocketdotio },
  firebase: { name: "Firebase (FCM)", icon: SiFirebase },
  iot: { name: "IoT", icon: Cpu },
} satisfies Record<string, Tech>;

export type TechId = keyof typeof techRegistry;

export function getTech(id: TechId): Tech {
  return techRegistry[id];
}
