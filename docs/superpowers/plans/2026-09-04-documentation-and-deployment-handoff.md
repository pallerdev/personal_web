# Documentation and Deployment Handoff Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Leave the portfolio fully documented, verified, committed, and represented by a GitHub issue that Pablo can follow to publish it permanently on Vercel.

**Architecture:** Keep developer onboarding concise in `README.md` and move the provider-specific release procedure to `docs/DEPLOYMENT.md`. Treat GitHub Actions as the quality gate and Vercel as the only production host; the deployment issue mirrors the guide as an auditable checklist.

**Tech Stack:** Astro 7, Node.js 24 LTS, npm, GitHub Actions, GitHub Issues, Vercel

**Spec:** `docs/superpowers/specs/2026-09-04-portfolio-workbench-design.md`

## Global Constraints

- The portfolio remains a static Astro site with no runtime secrets or database.
- Node.js 24 LTS is the supported local, CI, and Vercel runtime.
- Vercel is the production platform; the inherited GitHub Pages/Jekyll deployment must be disabled during launch.
- The canonical URL, sitemap URL, robots sitemap, and Vercel domain must agree before production publication.
- Every completion claim requires a fresh local verification run and a successful GitHub Actions run.

---

### Task 1: Deployment runbook

**Files:**

- Create: `docs/DEPLOYMENT.md`
- Modify: `README.md`

**Interfaces:**

- Consumes: npm scripts from `package.json`, canonical configuration from `src/config.ts`, Astro site configuration from `astro.config.ts`
- Produces: one authoritative release procedure linked from the repository entry point

- [ ] **Step 1: Write the deployment runbook**

Document prerequisites, Vercel import settings, canonical-domain updates, preflight checks, domain configuration, post-deploy verification, analytics choices, rollback, and removal of the obsolete GitHub Pages configuration.

- [ ] **Step 2: Link the runbook from the README**

Replace the abbreviated deployment prose with a link to `docs/DEPLOYMENT.md`, while retaining the architectural decision to use Vercel.

- [ ] **Step 3: Validate formatting**

Run: `npm run format:check`

Expected: Prettier reports all matched files use its code style.

### Task 2: Node 24 and Playwright runtime alignment

**Files:**

- Modify: `package-lock.json` only if npm 11 under Node 24 changes it
- Modify: `playwright.config.ts`

**Interfaces:**

- Consumes: exact dependencies in `package.json`
- Produces: an npm lockfile accepted by `npm ci` on GitHub Actions with Node 24 and an E2E web server that remains in the foreground under agentic environments

- [ ] **Step 1: Regenerate lock metadata with the CI runtime**

Run: `mise exec node@24 -- npm install --package-lock-only --ignore-scripts`

Expected: npm exits with code 0 and the lockfile records all transitive optional dependencies.

- [ ] **Step 2: Verify a clean install**

Run: `mise exec node@24 -- npm ci`

Expected: npm exits with code 0 and reports no lockfile synchronization error.

- [ ] **Step 3: Keep Astro under Playwright's process control**

Configure Playwright's local web server command with `ASTRO_DEV_BACKGROUND=0`, `--ignore-lock`, and the dedicated port `4327`. Disable server reuse so each run owns the server it tests.

- [ ] **Step 4: Verify the browser test lifecycle**

Run: `mise exec node@24 -- npm run test:e2e`

Expected: Playwright starts and stops Astro itself, and all 14 desktop/mobile flow and WCAG checks pass.

### Task 3: Release verification and version control

**Files:**

- Modify: only files produced by Tasks 1 and 2

**Interfaces:**

- Consumes: documented npm commands and GitHub Actions workflow
- Produces: verified commits on `main`

- [ ] **Step 1: Run the complete local quality gate**

Run: `npm test && npm run lint && npm run format:check && npm run check && npm run build && npm run test:e2e`

Expected: unit tests, lint, format, Astro checks, production build, browser flows, and accessibility audits all pass.

- [ ] **Step 2: Review the final diff**

Run: `git diff --check && git diff --stat && git status --short`

Expected: no whitespace errors and only the planned documentation or lockfile changes.

- [ ] **Step 3: Commit and push**

```bash
git add package-lock.json playwright.config.ts
git commit -m "fix: stabilize Node 24 CI checks"
git add README.md docs/DEPLOYMENT.md docs/superpowers/plans/2026-09-04-documentation-and-deployment-handoff.md
git commit -m "docs: add production deployment runbook"
git push origin main
```

- [ ] **Step 4: Confirm continuous integration**

Run: `gh run watch <quality-run-id> --repo pallerdev/personal_web --exit-status`

Expected: the `Quality` workflow completes successfully.

### Task 4: Deployment tracking issue

**Files:**

- No repository files

**Interfaces:**

- Consumes: `docs/DEPLOYMENT.md` and the verified commit SHA
- Produces: a GitHub issue in `pallerdev/personal_web` with a complete manual launch checklist

- [ ] **Step 1: Create the GitHub issue**

Run `gh issue create` with the title `deploy: publish the portfolio permanently on Vercel` and include checkboxes for account connection, project import, Node 24, canonical-domain changes, domain DNS, production deployment, smoke tests, analytics decision, and disabling legacy GitHub Pages.

Expected: GitHub returns the new issue URL.

- [ ] **Step 2: Verify issue contents**

Run: `gh issue view <issue-number> --repo pallerdev/personal_web`

Expected: the rendered issue contains every deployment gate and links back to `docs/DEPLOYMENT.md`.
