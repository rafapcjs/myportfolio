/** Anchor ids of the page sections, in display order. Used by the navbar, footer and active-section tracking. */
export const sectionIds = [
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];
