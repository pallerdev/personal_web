# Portfolio Workbench — Design Specification

## Purpose

Build Pablo Aller's professional home on the web: a fast, accessible portfolio that makes a recruiter or collaborator understand within seconds that Pablo is a backend developer with full-stack product awareness, professional experience at Continero, strong English, and an international perspective.

The site must feel like a considered developer workspace, not a web CV, a terminal simulation, or a generic portfolio template.

## Audience and primary journey

The primary audience is technical recruiters, engineering managers, and potential collaborators in Spain and Europe. Their essential journey is:

1. Understand Pablo's current role and technical focus.
2. Inspect two representative pieces of work.
3. See credible experience and technologies in context.
4. Learn enough personal context to remember him.
5. Reach GitHub, LinkedIn, email, or the downloadable CV.

## Positioning and voice

Primary positioning: backend developer building dependable web products with .NET and Java, with practical experience across React, Docker, Flutter, Laravel, and developer tooling.

Copy is Spanish-first, direct, specific, and written in short sentences. It avoids unsupported metrics, inflated seniority, corporate filler, and repeated claims about passion. Technical claims must be supported by a public project, Pablo's public professional profiles, or content Pablo later confirms.

The current public evidence does not support publishing confidential details of Continero products. The first version therefore describes the role and tools without inventing client names, architecture, or outcomes.

## Information architecture

The initial release has one long-form home page and one detailed public project page:

- `/`: introduction, selected work, experience, working stack, trajectory, current focus, personal context, and contact.
- `/work/gardenview/`: GardenView case study covering context, scope, system model, decisions, lessons, and links.
- `/404.html`: useful recovery page.

The home navigation links to `#work`, `#experience`, `#about`, and `#contact`. A future professional case study may be added only after Pablo provides publishable details.

## Visual direction: Workbench

### Palette

- Ink `#111315`: primary foreground and dark surfaces.
- Paper `#F4F5F2`: primary background.
- Steel `#667078`: secondary text.
- Signal `#356AE6`: links, focus, and active states.
- Status `#2F7D5A`: current role and availability signals.
- Rule `#D5D9D6`: structural separators.

The default experience is light. Dark areas are reserved for the introduction and footer to create deliberate rhythm; there is no automatic dark theme in version one.

### Typography

Use self-hosted or package-resolved IBM Plex Sans for display and body copy and IBM Plex Mono only for dates, technology labels, code-like metadata, and status information. Body line length stays below 72 characters. Labels use sentence case, not tracked uppercase.

### Layout

Desktop uses a 12-column grid with a maximum content width of 1200px. Main narratives occupy 7–8 columns and contextual metadata 3–4 columns. Sections use rules and whitespace instead of repeated cards. Projects deliberately have unequal visual weight.

Mobile changes reading order rather than compressing desktop: context follows the headline, project metadata follows its summary, timelines become stacked records, and all interactions work without hover.

### Memorable element

The introduction includes a compact live-looking work status panel containing only stable, honest information: current role, location, focus, and selected tools. It visually references product observability without pretending to be a terminal or fetching live private data.

### Motion and interaction

- One restrained introduction sequence on initial load.
- Direct feedback for navigation, expandable project details, and links.
- No per-section scroll reveals, cursor effects, parallax, decorative marquees, or continuous animation.
- All motion respects `prefers-reduced-motion`.

## Content

### Introduction

Lead with the work, not a greeting:

> Construyo backend para productos que tienen que funcionar de verdad.

Supporting copy identifies Pablo as a developer at Continero, based in Brno, working primarily with .NET and Java while contributing across the product when necessary.

Calls to action: "Ver trabajo" and "Contactar". GitHub and LinkedIn are quieter text links.

### Selected work

GardenView is the principal public case. It is presented through the problem, the application model, Pablo's responsibilities, technical choices, and what he would improve today. The existing Laravel CRUD practice appears as a compact secondary record. Continero appears as professional experience rather than a fabricated public case study.

### Experience

Continero receives prominence. Previous hospitality roles are grouped into a short earlier-experience entry that explains transferable communication, adaptability, and cross-cultural teamwork without reproducing the CV.

### Stack

Technologies are classified by context rather than skill level bars:

- Daily work: C#, .NET, React, Docker.
- Built with: Java, Spring Boot, TypeScript, Laravel, SQL, GitHub Actions.
- Exploring: Rust, Flutter, AI-assisted development and automation.

These labels are provisional where public evidence is incomplete and must remain easy to edit in one content file.

### Trajectory and personal context

Education includes the UOC Computer Engineering degree, completed DAW training, and the year at Liberty-Eylau High School in Texas. Personal context mentions Linux, travel, music, and learning through building. It occupies one concise section and does not become a lifestyle blog.

### Contact and privacy

Publish email, GitHub, LinkedIn, and a CV download only after a developer-focused CV is available. Do not publish phone number, birth date, gender, nationality, driving licence, or detailed availability. Version one has no contact form.

## Technical architecture

- Astro in static output mode.
- TypeScript with strict checking.
- Tailwind CSS 4 for utility composition, backed by named CSS design tokens.
- Content stored in typed local data modules; no CMS or database.
- Astro components by default; no client framework dependency.
- Minimal vanilla scripts only when semantic HTML cannot provide the interaction.
- Local project imagery processed by Astro's image pipeline.
- GitHub links and selected repository facts are stored locally for build reliability; no visitor-time API request.

Components are grouped by responsibility: global shell and SEO, navigation, home sections, project presentation, and small primitives. Content and URLs are separated from layout so they can be corrected without editing component markup.

## Accessibility and responsive requirements

- WCAG 2.2 AA target.
- Semantic landmarks and heading order.
- Skip link and visible `:focus-visible` styles.
- Complete keyboard navigation.
- Minimum 44px touch targets where practical.
- Text and interactive contrast checked against final colors.
- No essential content hidden behind motion, hover, or JavaScript.
- Layout verified at 320, 375, 768, 1024, 1440, and 1920px widths.
- Reduced-motion support and no forced smooth scrolling for those users.

## SEO and discovery

- Unique titles and descriptions.
- Absolute canonical URLs based on a single site configuration value.
- Open Graph and Twitter card metadata.
- Generated social image with Pablo's name and positioning.
- Sitemap and robots file.
- `Person` JSON-LD on the home page.
- `SoftwareSourceCode` JSON-LD on GardenView.
- Meaningful image alternative text and link labels.
- Spanish document language.

The temporary canonical origin is `https://paller.dev`; it must be replaceable in one configuration value if Pablo selects another domain.

## Quality and deployment

- Unit tests cover content schemas and SEO helpers.
- Browser tests cover primary navigation, case-study access, external contact links, and mobile menu behavior if a menu is needed.
- Automated checks run formatting, linting, Astro type checks, tests, and production build.
- Performance budget: no general-purpose client framework, minimal JavaScript, optimized images, and no third-party font request.
- Target Lighthouse scores: 95+ Performance and 100 Accessibility, Best Practices, and SEO on representative production pages, with failures investigated rather than hidden.
- Preferred hosting: Vercel via Git integration, with preview deployments on pull requests and production from `main`.
- Vercel Web Analytics and Speed Insights are optional launch integrations, enabled only during deployment configuration.

## Explicit non-goals

- Blog or CMS.
- Contact backend.
- Authentication or persistence.
- Live GitHub contribution graph.
- Theme switcher.
- Multilingual content in version one.
- Confidential Continero case studies.
- Decorative terminal emulator.

## Acceptance criteria

The project is complete when the old Next.js prototype has been replaced by a production-buildable Astro site, the home page and GardenView case are responsive and accessible, all links and metadata are correct, tests and build pass, and the implementation has no placeholder content presented as fact. Deployment requiring Pablo's Vercel account or domain remains a documented handoff if credentials are unavailable.
