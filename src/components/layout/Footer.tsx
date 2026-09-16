import { ArrowUpRight } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { sectionIds } from "@/lib/sections";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_auto]">
        <div className="space-y-4">
          <p className="font-mono text-sm">
            <span className="text-muted">~/</span>rafael<span className="text-accent">_</span>
          </p>
          <p className="max-w-sm text-sm text-muted">{profile.tagline[locale]}</p>
          <SocialLinks newTabLabel={dict.common.opensInNewTab} />
        </div>

        <nav aria-label={dict.footer.navigation}>
          <h2 className="font-mono text-xs tracking-wider text-muted uppercase">
            {dict.footer.navigation}
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-muted transition-colors duration-200 hover:text-accent"
                >
                  {dict.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <LanguageSwitcher current={locale} label={dict.language.label} />
          <a
            href="#home"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors duration-200 hover:text-accent"
          >
            {dict.footer.backToTop}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.fullName}. {dict.footer.rights}
          </p>
          <p>{dict.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
