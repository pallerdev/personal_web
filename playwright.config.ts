import { defineConfig, devices } from "@playwright/test";

const externalBaseUrl = process.env.PLAYWRIGHT_BASE_URL;

/**
 * The suite runs against the built site rather than the dev server: that is
 * the artefact that ships, and the dev toolbar is not part of it.
 */
export default defineConfig({
  testDir: "./tests",
  webServer: externalBaseUrl
    ? undefined
    : {
        /* Astro 7 backgrounds its servers when it detects a development
           agent; Playwright has to own the process to wait on it and to shut
           it down, so the background mode is switched off explicitly. */
        command:
          "npm run build && ASTRO_PREVIEW_BACKGROUND=0 npm run preview -- --host 127.0.0.1 --port 4327 --ignore-lock",
        url: "http://127.0.0.1:4327",
        reuseExistingServer: false,
        timeout: 180_000,
      },
  use: { baseURL: externalBaseUrl ?? "http://127.0.0.1:4327" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
