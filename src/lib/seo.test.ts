import { describe, expect, it } from "vitest";

import { locales } from "../i18n/config";
import { buildAlternates, buildCanonical, buildTitle } from "./seo";

describe("buildCanonical", () => {
  it("resolves a path against the production origin", () => {
    expect(buildCanonical("/")).toBe("https://paller.dev/");
    expect(buildCanonical("/en/work/gardenview/")).toBe(
      "https://paller.dev/en/work/gardenview/",
    );
  });
});

describe("buildTitle", () => {
  it("names the role when there is no page title", () => {
    expect(buildTitle(undefined, "es")).toBe("Pablo Aller — Backend developer");
    expect(buildTitle(undefined, "en")).toBe("Pablo Aller — Backend developer");
  });

  it("puts the page first when there is one", () => {
    expect(buildTitle("GardenView", "es")).toBe("GardenView — Pablo Aller");
  });
});

describe("buildAlternates", () => {
  it("declares both languages plus an x-default", () => {
    const alternates = buildAlternates("gardenview");
    expect(alternates.map((entry) => entry.hreflang)).toEqual([
      ...locales,
      "x-default",
    ]);
  });

  it("points x-default at the Spanish page, which is the site root", () => {
    const alternates = buildAlternates("home");
    const fallback = alternates.find((entry) => entry.hreflang === "x-default");
    expect(fallback?.href).toBe("https://paller.dev/");
  });

  it("uses absolute URLs everywhere", () => {
    for (const entry of buildAlternates("camaleon")) {
      expect(entry.href).toMatch(/^https:\/\/paller\.dev\//);
    }
  });
});
