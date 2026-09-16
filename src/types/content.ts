import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import type { Localized } from "@/i18n/localized";
import type { TechId } from "@/data/tech";

/** ISO month, e.g. "2026-02". A `null` end date means "present". */
export type IsoMonth = `${number}-${string}`;

export type WorkMode = "remote" | "onsite" | "hybrid";

export type Tech = {
  name: string;
  /** Brand icon (Simple Icons / Font Awesome) or a generic Lucide icon when no logo exists. */
  icon: IconType | LucideIcon;
};

export type Profile = {
  fullName: string;
  shortName: string;
  role: Localized;
  tagline: Localized;
  location: Localized;
  email: string;
  /** International format, e.g. "+57 313 543 9677". */
  phone: string;
  summary: Localized<string[]>;
  languages: Array<{ name: Localized; level: Localized }>;
  /** Core technologies shown in the hero card. */
  coreStack: TechId[];
  /** Public paths of the downloadable CVs, one per locale. */
  cv: Localized;
  /** Profile photo in `public/`, with a localized alt text. */
  photo: { src: string; alt: Localized; width: number; height: number };
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: Localized;
  start: IsoMonth;
  end: IsoMonth | null;
  location: Localized;
  mode: WorkMode;
  highlights: Localized<string[]>;
  stack: TechId[];
};

export type ProjectStatus = "done" | "in-progress" | "planned";

export type Project = {
  id: string;
  title: Localized;
  description: Localized;
  problem: Localized;
  stack: TechId[];
  repoUrl: string | null;
  demoUrl: string | null;
  status: ProjectStatus;
  /** Work under NDA: the card states that details are intentionally omitted. */
  confidential?: boolean;
  /** Placeholder card for a future personal project. */
  placeholder?: boolean;
};

export type SkillCategory = {
  id: string;
  name: Localized;
  icon: LucideIcon;
  skills: TechId[];
};

export type EducationStatus = "in-progress" | "completed";

export type EducationItem = {
  id: string;
  degree: Localized;
  institution: string;
  country: Localized;
  start: IsoMonth | null;
  end: IsoMonth | null;
  status: EducationStatus;
  note?: Localized;
};

export type Certification = {
  id: string;
  name: Localized;
  issuer: string;
  url: string | null;
};

export type SocialLink = {
  id: "linkedin" | "github";
  label: string;
  url: string;
  icon: IconType | LucideIcon;
};
