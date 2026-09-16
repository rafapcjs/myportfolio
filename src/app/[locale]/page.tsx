import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <About locale={locale} dict={dict} />
      <Experience locale={locale} dict={dict} />
      <Projects locale={locale} dict={dict} />
      <Skills locale={locale} dict={dict} />
      <Education locale={locale} dict={dict} />
      <Contact locale={locale} dict={dict} />
    </>
  );
}
