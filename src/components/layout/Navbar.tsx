"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Button } from "@/components/ui/Button";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { sectionIds, type SectionId } from "@/lib/sections";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  nav: Dictionary["nav"];
  theme: Dictionary["theme"];
  languageLabel: string;
};

export function Navbar({ locale, nav, theme, languageLabel }: Props) {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Escape closes the mobile menu; body scroll is locked while it is open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const links = sectionIds.map((id, index) => ({
    id,
    label: nav[id],
    number: String(index + 1).padStart(2, "0"),
  }));

  const renderLink = (
    { id, label, number }: { id: SectionId; label: string; number: string },
    mobile: boolean,
    index: number,
  ) => {
    const isActive = active === id;
    return (
      <a
        ref={mobile && index === 0 ? firstLinkRef : undefined}
        href={`#${id}`}
        aria-current={isActive ? "true" : undefined}
        onClick={() => mobile && setOpen(false)}
        className={cn(
          "group relative inline-flex items-center gap-2 rounded-md text-sm transition-colors duration-200",
          mobile ? "w-full px-3 py-3 text-base" : "px-3 py-2",
          isActive ? "text-fg" : "text-muted hover:text-fg",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "font-mono text-xs",
            isActive ? "text-accent" : "text-muted/70 group-hover:text-accent",
          )}
        >
          {number}.
        </span>
        <span
          className={cn(mobile && isActive && "underline decoration-accent underline-offset-8")}
        >
          {label}
        </span>
        {!mobile && isActive ? (
          <motion.span
            aria-hidden="true"
            layoutId="nav-active-indicator"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
          />
        ) : null}
      </a>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#home"
          className="font-mono text-sm font-medium tracking-tight text-fg"
          aria-label={nav.home}
        >
          <span className="text-muted">~/</span>rafael
          <span className="text-accent">_</span>
        </a>

        <nav aria-label={nav.mainNavigation} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link, index) => (
              <li key={link.id}>{renderLink(link, false, index)}</li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle labels={theme} />
          <LanguageSwitcher current={locale} label={languageLabel} />
          <Button
            ref={toggleRef}
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <div id={menuId} hidden={!open} className="border-t border-border bg-bg md:hidden">
        <nav aria-label={nav.mainNavigation} className="container-page py-3">
          <ul className="flex flex-col">
            {links.map((link, index) => (
              <li key={link.id}>{renderLink(link, true, index)}</li>
            ))}
          </ul>
        </nav>
      </div>
      <ScrollProgress />
    </header>
  );
}
