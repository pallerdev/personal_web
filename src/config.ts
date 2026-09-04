import type { Localized } from "./i18n/config";

export const SITE_URL = "https://paller.dev";
export const SITE_NAME = "Pablo Aller";

/** Rasterised from the vendored Archivo by `npm run og`. */
export const OG_IMAGE: Localized<string> = {
  es: "/og/card.png",
  en: "/og/card-en.png",
};
