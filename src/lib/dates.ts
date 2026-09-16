import type { Locale } from "@/i18n/config";
import type { IsoMonth } from "@/types/content";

/** "2026-02" -> "feb 2026" (es) / "Feb 2026" (en). */
export function formatMonth(iso: IsoMonth, locale: Locale): string {
  const [year, month] = iso.split("-").map(Number);
  if (!year || !month) return iso;
  const date = new Date(Date.UTC(year, month - 1, 1));
  const label = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
  return label.replace(".", "");
}

export function formatRange(
  start: IsoMonth | null,
  end: IsoMonth | null,
  locale: Locale,
  presentLabel: string,
): string {
  const from = start ? formatMonth(start, locale) : "";
  const to = end ? formatMonth(end, locale) : presentLabel;
  return from ? `${from} – ${to}` : to;
}
