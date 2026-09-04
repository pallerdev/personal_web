import { describe, expect, test } from "vitest";
import { education } from "../content/education";
import { experience } from "../content/experience";
import { projects } from "../content/projects";
import { site } from "../content/site";

describe("public portfolio content", () => {
  test("uses secure external URLs", () => {
    const serialized = JSON.stringify({
      site,
      projects,
      experience,
      education,
    });
    const urls = serialized.match(/https?:\/\/[^"\s]+/g) ?? [];
    expect(urls.length).toBeGreaterThan(0);
    expect(urls.every((url) => url.startsWith("https://"))).toBe(true);
  });

  test("uses unique project slugs and features GardenView", () => {
    expect(new Set(projects.map(({ slug }) => slug)).size).toBe(
      projects.length,
    );
    expect(projects.find(({ slug }) => slug === "gardenview")?.featured).toBe(
      true,
    );
  });

  test("does not expose private CV fields", () => {
    const publicContent = JSON.stringify({
      site,
      projects,
      experience,
      education,
    }).toLowerCase();
    for (const forbidden of [
      "671215801",
      "08-12-2003",
      "fecha de nacimiento",
      "permiso de conducir",
    ]) {
      expect(publicContent).not.toContain(forbidden);
    }
  });
});
