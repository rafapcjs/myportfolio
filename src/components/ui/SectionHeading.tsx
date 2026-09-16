import { Reveal } from "@/components/motion/Reveal";

type Props = {
  id: string;
  index: number;
  title: string;
  subtitle?: string;
};

/** Numbered section heading: "01 // Sobre mí". The id is used by `aria-labelledby` on the section. */
export function SectionHeading({ id, index, title, subtitle }: Props) {
  const number = String(index).padStart(2, "0");
  return (
    <Reveal className="mb-10 max-w-2xl">
      <h2
        id={id}
        className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        <span aria-hidden="true" className="font-mono text-base font-normal text-accent">
          {`${number} //`}
        </span>
        {title}
      </h2>
      {subtitle ? <p className="mt-3 text-base text-muted">{subtitle}</p> : null}
    </Reveal>
  );
}
