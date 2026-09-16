import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import type { SocialLink } from "@/types/content";

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/rafael-alfonso-corredor-gamb%C3%ADn-67a329274/",
    icon: FaLinkedinIn,
  },
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/rafapcjs",
    icon: FaGithub,
  },
];
