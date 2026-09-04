import { describe, expect, it } from "vitest";

import { education, languages } from "../content/education";
import { experience } from "../content/experience";
import { ledger, stateLabel } from "../content/ledger";
import { caseStudies, projects } from "../content/projects";
import {
  about,
  contact,
  facts,
  headline,
  identity,
  intro,
  metaDescription,
  nav,
  recordUpdated,
  stack,
} from "../content/site";
import { locales, routes, type Locale } from "../i18n/config";

/**
 * The content is the product here, so these tests guard the content rather
 * than the components: that both languages stay in step, that nothing claims
 * a link it does not have, and that the figures on the page match the record
 * they are drawn from.
 */

describe("locales", () => {
  it("covers every localised module in both languages", () => {
    const modules = {
      headline,
      intro,
      metaDescription,
      facts,
      nav,
      stack,
      about,
      contact,
      education,
      languages,
      experience,
      projects,
      ledger,
      stateLabel,
    };

    for (const [name, value] of Object.entries(modules)) {
      expect(Object.keys(value).sort(), `${name} locales`).toEqual(
        [...locales].sort(),
      );
    }
  });

  it("keeps list lengths equal across languages", () => {
    expect(projects.es).toHaveLength(projects.en.length);
    expect(ledger.es).toHaveLength(ledger.en.length);
    expect(experience.es).toHaveLength(experience.en.length);
    expect(education.es).toHaveLength(education.en.length);
    expect(stack.es).toHaveLength(stack.en.length);
    expect(facts.es).toHaveLength(facts.en.length);
    expect(nav.es).toHaveLength(nav.en.length);
  });
});

describe("projects", () => {
  it.each(locales)("has unique slugs in %s", (locale) => {
    const slugs = projects[locale].map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("pairs the same slugs in both languages", () => {
    expect(projects.es.map((project) => project.slug)).toEqual(
      projects.en.map((project) => project.slug),
    );
  });

  it("features exactly the projects that have a written case", () => {
    for (const locale of locales) {
      const featured = projects[locale]
        .filter((project) => project.featured)
        .map((project) => project.slug);
      expect(featured).toEqual([...caseStudies]);
    }
  });

  it("gives every case study a route, sections, decisions and a retrospective", () => {
    for (const locale of locales) {
      for (const project of projects[locale].filter((p) => p.featured)) {
        expect(routes[project.route], project.slug).toBeDefined();
        expect(project.sections.length, project.slug).toBeGreaterThan(0);
        expect(project.decisions.length, project.slug).toBeGreaterThan(0);
        expect(project.retrospective.length, project.slug).toBeGreaterThan(0);
        expect(project.spec.length, project.slug).toBeGreaterThan(0);
        expect(project.brief.length, project.slug).toBeGreaterThan(0);
      }
    }
  });

  it("labels every link and points it somewhere absolute", () => {
    for (const locale of locales) {
      for (const project of projects[locale]) {
        for (const link of project.links) {
          expect(link.label.trim(), project.slug).not.toBe("");
          expect(link.href, project.slug).toMatch(/^https:\/\//);
        }
      }
    }
  });

  it("never links a repository that is not public", () => {
    /* Private repositories are described, not linked. */
    const publicRepos = [
      "https://github.com/pallerdev/Proyecto_CRUD_Servidor",
      "https://github.com/pallerdev/personal_web",
    ];
    for (const locale of locales) {
      const githubLinks = projects[locale]
        .flatMap((project) => project.links)
        .map((link) => link.href)
        .filter((href) => href.startsWith("https://github.com/"));
      for (const href of githubLinks) {
        expect(publicRepos).toContain(href);
      }
    }
  });
});

describe("work record", () => {
  it("matches the pull-request figures quoted in the hero", () => {
    for (const locale of locales) {
      const byLabel = new Map(
        facts[locale].map((fact) => [fact.value, fact.label]),
      );
      expect([...byLabel.keys()]).toContain("120");
      expect([...byLabel.keys()]).toContain("85");
      expect([...byLabel.keys()]).toContain("6");
    }
  });

  it("was updated on a real, past date", () => {
    const updated = new Date(recordUpdated);
    expect(Number.isNaN(updated.getTime())).toBe(false);
    expect(updated.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it.each(locales)("dates every %s entry as a resolvable month", (locale) => {
    for (const product of ledger[locale]) {
      expect(product.entries.length, product.id).toBeGreaterThan(0);
      for (const entry of product.entries) {
        expect(entry.date, product.id).toMatch(/^\d{4}-\d{2}$/);
        const parsed = new Date(`${entry.date}-01T00:00:00Z`);
        expect(Number.isNaN(parsed.getTime()), entry.date).toBe(false);
        expect(parsed.getTime()).toBeLessThanOrEqual(Date.now());
      }
    }
  });

  it("pairs the same products in both languages", () => {
    expect(ledger.es.map((product) => product.id)).toEqual(
      ledger.en.map((product) => product.id),
    );
  });

  it("gives a link label to every product that has a link", () => {
    for (const locale of locales) {
      for (const product of ledger[locale]) {
        if (product.href) {
          expect(product.href, product.id).toMatch(/^https:\/\//);
          expect(product.hrefLabel, product.id).toBeTruthy();
        } else {
          expect(product.hrefLabel, product.id).toBeUndefined();
        }
      }
    }
  });

  it("keeps every state used in the ledger translated", () => {
    for (const locale of locales) {
      const used = new Set(
        ledger[locale].flatMap((product) =>
          product.entries.map((entry) => entry.state),
        ),
      );
      for (const state of used) {
        expect(stateLabel[locale][state], `${locale}/${state}`).toBeTruthy();
      }
    }
  });
});

describe("identity", () => {
  it("exposes only a professional contact surface", () => {
    expect(identity.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/);
    expect(identity.links.map((link) => link.label)).toEqual([
      "GitHub",
      "LinkedIn",
    ]);
    for (const link of identity.links) {
      expect(link.href).toMatch(/^https:\/\//);
    }
  });

  it("keeps the navigation pointing at sections that exist on the page", () => {
    const sections = new Set([
      "#registro",
      "#proyectos",
      "#experiencia",
      "#herramientas",
      "#sobre-mi",
      "#contacto",
    ]);
    for (const locale of locales) {
      for (const item of nav[locale]) {
        expect(sections, item.hash).toContain(item.hash);
      }
    }
  });

  it("does not publish a phone number or a date of birth", () => {
    const everything = JSON.stringify({
      about,
      contact,
      experience,
      education,
      identity,
      ledger,
      projects,
    });
    expect(everything).not.toMatch(/\+\d{2}\s?\d{3}\s?\d{3}\s?\d{3}/);
    expect(everything).not.toMatch(/\b\d{2}\/\d{2}\/\d{4}\b/);
  });
});

describe("routes", () => {
  it("keeps Spanish at the root and English under /en/", () => {
    for (const [key, paths] of Object.entries(routes)) {
      expect(paths.es, key).not.toMatch(/^\/en\//);
      expect(paths.en, key).toMatch(/^\/en\//);
      for (const locale of locales as readonly Locale[]) {
        expect(paths[locale], `${key}/${locale}`).toMatch(/\/$/);
      }
    }
  });
});
