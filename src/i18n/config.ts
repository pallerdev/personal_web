export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/** Content that exists once per language. */
export type Localized<T> = Record<Locale, T>;

export const htmlLang: Localized<string> = { es: "es", en: "en" };
export const ogLocale: Localized<string> = { es: "es_ES", en: "en_GB" };

/**
 * Every route in both languages. Spanish lives at the root, English under
 * `/en/`, so the canonical URL and the language switcher can be derived from
 * one place instead of being retyped in each page.
 */
export const routes = {
  home: { es: "/", en: "/en/" },
  gardenview: { es: "/trabajo/gardenview/", en: "/en/work/gardenview/" },
  camaleon: {
    es: "/trabajo/camaleon-teatro/",
    en: "/en/work/camaleon-teatro/",
  },
} as const satisfies Record<string, Localized<string>>;

export type RouteKey = keyof typeof routes;

export const routeFor = (key: RouteKey, locale: Locale) => routes[key][locale];

/** The same page in the other language, for the switcher. */
export const alternateOf = (key: RouteKey, locale: Locale) =>
  routes[key][locale === "es" ? "en" : "es"];

export const otherLocale = (locale: Locale): Locale =>
  locale === "es" ? "en" : "es";
