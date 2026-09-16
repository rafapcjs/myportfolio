import type { Locale } from "./config";

/** A value with one variant per supported locale. Used by content files in `src/data`. */
export type Localized<T = string> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
