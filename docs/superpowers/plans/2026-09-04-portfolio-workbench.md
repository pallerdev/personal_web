# Portfolio Workbench Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the unfinished Next.js prototype with a production-ready Astro portfolio that presents Pablo's professional profile and GardenView case study through the approved Workbench direction.

**Architecture:** A static Astro site renders typed local content through focused layout and section components. Shared SEO helpers and JSON-LD keep metadata consistent, while CSS tokens and a small set of primitives implement the visual system without a client framework.

**Tech Stack:** Astro, TypeScript strict mode, Tailwind CSS 4, Vitest, Playwright, Astro sitemap, local fonts and images.

**Spec:** `docs/superpowers/specs/2026-09-04-portfolio-workbench-design.md`

## Global Constraints

- Spanish-first static site with `/`, `/work/gardenview/`, and a useful 404 page.
- Use Astro components by default and no React dependency.
- Keep all professional claims in typed local content and avoid confidential or unsupported claims.
- Do not publish phone number, birth date, gender, nationality, driving licence, or detailed availability.
- Default light experience with Ink `#111315`, Paper `#F4F5F2`, Steel `#667078`, Signal `#356AE6`, Status `#2F7D5A`, and Rule `#D5D9D6`.
- Meet WCAG 2.2 AA, respect reduced motion, and support keyboard-only navigation.
- Use `https://paller.dev` as the replaceable temporary canonical origin.
- No CMS, contact backend, live GitHub graph, theme switcher, or decorative terminal.

---

### Task 1: Astro foundation and automated checks

**Files:**

- Delete: `src/app/page.js`, `src/app/layout.js`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.mjs`, `jsconfig.json`
- Modify: `package.json`, `package-lock.json`, `.gitignore`, `README.md`
- Create: `astro.config.ts`, `tsconfig.json`, `src/styles/global.css`, `src/pages/index.astro`, `vitest.config.ts`, `playwright.config.ts`

**Interfaces:**

- Produces: Astro build commands `dev`, `build`, `preview`, `check`, `test`, and `test:e2e`.
- Produces: global CSS token names consumed by every later component.

- [ ] Replace framework dependencies with Astro, Tailwind 4, sitemap, local font packages, Vitest, Playwright, and type-check tooling.
- [ ] Create a minimal `src/pages/index.astro` containing a Spanish document shell and visible heading.
- [ ] Define the six palette tokens, type roles, focus styles, container widths, spacing rhythm, reduced motion rule, and base element styles in `src/styles/global.css`.
- [ ] Run `npm install`, `npm run check`, and `npm run build`; confirm the generated index succeeds with no Next.js artifact dependency.
- [ ] Commit with `chore: rebuild portfolio foundation with astro`.

### Task 2: Typed content and validation

**Files:**

- Create: `src/content/site.ts`, `src/content/projects.ts`, `src/content/experience.ts`, `src/content/education.ts`, `src/lib/content.test.ts`

**Interfaces:**

- Produces: `site: SiteContent`, `projects: Project[]`, `experience: ExperienceItem[]`, `education: EducationItem[]`.
- `Project` includes `slug`, `title`, `summary`, `problem`, `solution`, `role`, `decisions`, `lessons`, `technologies`, `repository`, and `featured`.

- [ ] Write Vitest assertions that every external URL uses HTTPS, every project has a unique slug, GardenView is featured, and no forbidden personal-data labels occur in serialized public content.
- [ ] Run `npm test`; verify failure because content modules do not yet exist.
- [ ] Implement the content types and factual Spanish copy for profile, Continero, earlier experience, education, technologies, GardenView, Laravel CRUD, GitHub, LinkedIn, and email.
- [ ] Run `npm test`; verify all content assertions pass.
- [ ] Commit with `feat: add typed portfolio content`.

### Task 3: Shared document shell and SEO

**Files:**

- Create: `src/config.ts`, `src/lib/seo.ts`, `src/lib/seo.test.ts`, `src/layouts/BaseLayout.astro`, `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro`, `src/components/ExternalLink.astro`, `public/robots.txt`, `public/favicon.svg`
- Modify: `astro.config.ts`, `src/pages/index.astro`

**Interfaces:**

- Produces: `SITE_URL`, `SITE_NAME`, and `DEFAULT_DESCRIPTION` from `src/config.ts`.
- Produces: `buildCanonical(pathname: string): string` and `buildTitle(pageTitle?: string): string`.
- `BaseLayout` accepts `title`, `description`, `canonicalPath`, `image`, and `jsonLd` props.

- [ ] Write SEO unit tests for absolute canonicals, the home title, and composed page titles.
- [ ] Run the SEO test and verify it fails because helpers are absent.
- [ ] Implement SEO helpers and `BaseLayout` with canonical, description, Open Graph, Twitter card, theme color, favicon, and JSON-LD support.
- [ ] Add a keyboard-visible skip link, landmark-based header/footer, and mobile-safe navigation without a JavaScript menu.
- [ ] Configure sitemap generation and a robots file that points at the sitemap.
- [ ] Run tests, Astro checks, and build; inspect generated HTML for canonical, JSON-LD, `lang="es"`, and semantic landmarks.
- [ ] Commit with `feat: add accessible shell and seo metadata`.

### Task 4: Workbench home page

**Files:**

- Create: `src/components/SectionHeading.astro`, `src/components/StatusPanel.astro`, `src/components/Hero.astro`, `src/components/FeaturedWork.astro`, `src/components/ExperienceTimeline.astro`, `src/components/StackGroups.astro`, `src/components/About.astro`, `src/components/Contact.astro`
- Modify: `src/pages/index.astro`, `src/styles/global.css`

**Interfaces:**

- Consumes: typed content modules and `BaseLayout`.
- Produces: fragment targets `#work`, `#experience`, `#about`, and `#contact`.

- [ ] Compose the hero around “Construyo backend para productos que tienen que funcionar de verdad” and a stable status panel for Continero, Brno, backend focus, and tools.
- [ ] Implement selected work as one dominant GardenView editorial feature plus a compact Laravel CRUD record; avoid equal cards.
- [ ] Implement experience as a clear chronological narrative with Continero prominent and hospitality grouped as transferable experience.
- [ ] Implement contextual stack groups, education, current focus, personal context, and direct contact links.
- [ ] Add a restrained initial hero sequence with a no-motion equivalent.
- [ ] Verify heading order, all fragment targets, visible focus, 44px touch targets, and reading order at 320, 768, and 1440px.
- [ ] Run unit tests, check, and build.
- [ ] Commit with `feat: build workbench portfolio home`.

### Task 5: GardenView case study and visuals

**Files:**

- Create: `src/pages/work/gardenview.astro`, `src/components/ProjectHero.astro`, `src/components/ProjectFacts.astro`, `src/components/SystemDiagram.astro`, `public/images/gardenview-system.svg`, `public/images/gardenview-preview.svg`
- Modify: `src/styles/global.css`

**Interfaces:**

- Consumes: `projects`, `BaseLayout`, and global visual tokens.
- Produces: `/work/gardenview/` with `SoftwareSourceCode` JSON-LD and a return path to `/#work`.

- [ ] Create an honest product preview illustration from GardenView's public domain model instead of inventing a screenshot.
- [ ] Build a semantic system diagram showing User → Orchard → Plant and Laravel → Inertia → React.
- [ ] Write the case narrative: problem, built scope, responsibilities, architecture, authorization boundary, decisions, lessons, and improvements.
- [ ] Add repository links and explicitly label the project as an educational full-stack application.
- [ ] Verify image alternatives, readable diagram fallback text, narrow-screen overflow, canonical metadata, and source-code structured data.
- [ ] Run unit tests, check, and build.
- [ ] Commit with `feat: publish gardenview case study`.

### Task 6: Error page, social asset, and browser tests

**Files:**

- Create: `src/pages/404.astro`, `public/og/workbench.svg`, `tests/portfolio.spec.ts`
- Modify: `src/layouts/BaseLayout.astro`, `package.json`

**Interfaces:**

- Consumes: built routes and shared shell.
- Produces: Playwright coverage for home navigation, case-study navigation, external links, metadata, and 404 recovery.

- [ ] Write browser tests that open the home page, follow GardenView, return to work, verify email/GitHub/LinkedIn hrefs, and confirm the 404 page offers recovery.
- [ ] Run the browser test and verify it fails before the 404 and social asset are complete.
- [ ] Add a branded but quiet 404 page and a 1200×630 Workbench social image.
- [ ] Wire the social image as the default Open Graph and Twitter image.
- [ ] Run Playwright at desktop and mobile viewport projects; resolve accessibility or overflow defects found by the flows.
- [ ] Run the full test, check, and build suite.
- [ ] Commit with `test: cover portfolio navigation and recovery`.

### Task 7: CI, documentation, and production readiness

**Files:**

- Create: `.github/workflows/quality.yml`
- Modify: `README.md`, `.gitignore`

**Interfaces:**

- Produces: CI quality gate on pushes and pull requests.
- Produces: operator instructions for local development, content updates, domain replacement, and Vercel deployment.

- [ ] Add GitHub Actions steps for Node setup with npm cache, `npm ci`, unit tests, Astro check, production build, and Playwright browser installation/tests.
- [ ] Rewrite README around project purpose, architecture, scripts, content ownership, SEO, and deployment rather than generic framework claims.
- [ ] Document `SITE_URL` replacement and the optional Vercel Web Analytics and Speed Insights launch steps without hard-coding credentials.
- [ ] Run `npm ci`, tests, check, and build from the committed lockfile.
- [ ] Start the production preview and inspect home, GardenView, and 404 at the required viewport widths; confirm no horizontal overflow or console errors.
- [ ] Run a final placeholder/private-data scan and `git diff --check`.
- [ ] Commit with `ci: add portfolio quality gates`.

### Task 8: Final verification

**Files:**

- Modify only files required to correct observed defects.

**Interfaces:**

- Consumes: the complete production build.
- Produces: verified handoff with remaining account-dependent deployment actions clearly identified.

- [ ] Run `npm test`, `npm run check`, `npm run build`, and `npm run test:e2e` from a clean process.
- [ ] Inspect generated metadata, sitemap, robots, JSON-LD, all internal links, and all external URLs.
- [ ] Audit keyboard order, focus visibility, reduced motion, contrast, and responsive layouts.
- [ ] Confirm Git contains no secrets, private personal data, build output, or accidental IDE files.
- [ ] Record exact verification results and any Vercel/domain action that cannot be completed without account access.
