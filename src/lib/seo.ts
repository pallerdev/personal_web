import { SITE_NAME, SITE_URL } from "../config";
import {
  alternateOf,
  defaultLocale,
  locales,
  routeFor,
  type Locale,
  type RouteKey,
} from "../i18n/config";
import { role } from "../content/site";

export const buildCanonical = (pathname: string) =>
  new URL(pathname, SITE_URL).toString();

export const buildTitle = (pageTitle: string | undefined, locale: Locale) =>
  pageTitle ? `${pageTitle} — ${SITE_NAME}` : `${SITE_NAME} — ${role[locale]}`;

/**
 * The `hreflang` set for a page: both languages plus `x-default`, which points
 * at the Spanish version because that is where the root of the site lives.
 */
export const buildAlternates = (routeKey: RouteKey) => [
  ...locales.map((locale) => ({
    hreflang: locale,
    href: buildCanonical(routeFor(routeKey, locale)),
  })),
  {
    hreflang: "x-default",
    href: buildCanonical(routeFor(routeKey, defaultLocale)),
  },
];

export const buildLanguageSwitch = (routeKey: RouteKey, locale: Locale) =>
  alternateOf(routeKey, locale);
