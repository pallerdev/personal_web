import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://paller.dev",
  // Spanish lives at the root and English under /en/, so the alternate links
  // are emitted per page in BaseLayout rather than by the sitemap integration.
  integrations: [sitemap()],
  build: { inlineStylesheets: "auto" },
});
