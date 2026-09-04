import { SITE_NAME, SITE_URL } from "../config";

export const buildCanonical = (pathname: string) =>
  new URL(pathname, SITE_URL).toString();
export const buildTitle = (pageTitle?: string) =>
  pageTitle
    ? `${pageTitle} — ${SITE_NAME}`
    : `${SITE_NAME} — Backend developer`;
