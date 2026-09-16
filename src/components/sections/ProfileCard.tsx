import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { getTech, profile } from "@/data";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/** Terminal-style "profile.json" card with key facts. */
export function ProfileCard({ locale, dict }: Props) {
  const t = dict.hero.card;
  const rows: Array<{ key: string; value: string | string[] }> = [
    { key: t.status, value: t.statusValue },
    { key: t.location, value: profile.location[locale] },
    { key: t.stack, value: profile.coreStack.map((id) => getTech(id).name) },
    {
      key: t.languages,
      value: profile.languages.map((l) => `${l.name[locale]} (${l.level[locale]})`),
    },
    { key: t.focus, value: t.focusValue },
  ];

  return (
    <div className="rounded-lg border border-border bg-surface shadow-2xl shadow-black/20 dark:shadow-black/50">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <span className="ml-2 font-mono text-xs text-muted">{t.title}</span>
      </div>
      <Stagger as="div" stagger={0.09} className="space-y-3 p-5 font-mono text-sm leading-6">
        <span aria-hidden="true" className="text-muted">
          {"{"}
        </span>
        <dl className="contents">
          {rows.map((row) => (
            <StaggerItem key={row.key} className="grid grid-cols-[auto_1fr] gap-x-3 pl-4">
              <dt className="text-accent-2">
                &quot;{row.key}&quot;<span className="text-muted">:</span>
              </dt>
              <dd className="text-fg">
                {Array.isArray(row.value) ? (
                  <span className="flex flex-wrap gap-x-1">
                    <span className="text-muted">[</span>
                    {row.value.map((item, index) => (
                      <span key={item}>
                        &quot;{item}&quot;
                        {index < row.value.length - 1 ? (
                          <span className="text-muted">,</span>
                        ) : null}
                      </span>
                    ))}
                    <span className="text-muted">]</span>
                  </span>
                ) : (
                  <>&quot;{row.value}&quot;</>
                )}
              </dd>
            </StaggerItem>
          ))}
        </dl>
        <span aria-hidden="true" className="text-muted">
          {"}"}
        </span>
      </Stagger>
    </div>
  );
}
