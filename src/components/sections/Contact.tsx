import { Mail, Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { CopyButton } from "@/components/ui/CopyButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { siteConfig } from "@/lib/site";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Contact({ locale, dict }: Props) {
  const t = dict.contact;

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="contact-title" index={6} title={t.title} subtitle={t.subtitle} />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="space-y-8">
            <div>
              <h3 className="font-mono text-xs tracking-wider text-muted uppercase">
                {t.emailLabel}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 font-mono text-sm break-all text-fg transition-colors duration-200 hover:text-accent sm:text-base"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                  {profile.email}
                </a>
                <CopyButton value={profile.email} label={t.copy} copiedLabel={t.copied} />
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs tracking-wider text-muted uppercase">
                {t.phoneLabel}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 font-mono text-sm text-fg transition-colors duration-200 hover:text-accent sm:text-base"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                  {profile.phone}
                </a>
                <CopyButton value={profile.phone} label={t.copyPhone} copiedLabel={t.copied} />
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs tracking-wider text-muted uppercase">
                {t.socialTitle}
              </h3>
              <SocialLinks className="mt-3" size="lg" newTabLabel={dict.common.opensInNewTab} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm
              labels={t.form}
              email={profile.email}
              formspreeId={siteConfig.formspreeId}
              locale={locale}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
