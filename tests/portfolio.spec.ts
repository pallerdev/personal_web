import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/**
 * The pages that must exist in both languages. Kept in one place so a new
 * route cannot be added without an accessibility pass covering it.
 */
const pages = [
  { path: "/", locale: "es", heading: /La parte del backend/ },
  { path: "/en/", locale: "en", heading: /The part of the backend/ },
  { path: "/trabajo/gardenview/", locale: "es", heading: "GardenView" },
  { path: "/en/work/gardenview/", locale: "en", heading: "GardenView" },
  {
    path: "/trabajo/camaleon-teatro/",
    locale: "es",
    heading: "Camaleón Teatro",
  },
  {
    path: "/en/work/camaleon-teatro/",
    locale: "en",
    heading: "Camaleón Teatro",
  },
] as const;

const analyze = (page: Page) =>
  new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

test.describe("every page", () => {
  for (const { path, locale, heading } of pages) {
    test(`${path} states who this is and passes an accessibility audit`, async ({
      page,
    }) => {
      await page.goto(path);

      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toHaveCount(1);
      await expect(h1).toContainText(heading);

      const results = await analyze(page);
      expect(
        results.violations.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => node.target).flat(),
        })),
      ).toEqual([]);
    });
  }
});

test.describe("navigation", () => {
  test("reaches the GardenView case and back again", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("#proyectos")
      .getByRole("link", { name: /Leer el caso/ })
      .first()
      .click();

    await expect(page).toHaveURL(/\/trabajo\/gardenview\/$/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://paller.dev/trabajo/gardenview/",
    );

    await page.getByRole("link", { name: /Volver a proyectos/ }).click();
    await expect(page).toHaveURL(/\/#proyectos$/);
  });

  test("switches language and keeps the reader on the same page", async ({
    page,
  }) => {
    await page.goto("/trabajo/gardenview/");
    await page
      .getByRole("link", { name: /View this page in Spanish|inglés/ })
      .click();
    await expect(page).toHaveURL(/\/en\/work\/gardenview\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await page.getByRole("link", { name: /Spanish/ }).click();
    await expect(page).toHaveURL(/\/trabajo\/gardenview\/$/);
  });

  test("declares both languages to search engines", async ({ page }) => {
    await page.goto("/");
    const hreflangs = await page
      .locator("link[rel=alternate]")
      .evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("hreflang")),
      );
    expect(hreflangs).toEqual(["es", "en", "x-default"]);
  });

  test("serves a 404 page that offers a way out", async ({ page }) => {
    const response = await page.goto("/no-existe/");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("link", { name: /Volver al inicio/ }),
    ).toBeVisible();
  });
});

test.describe("theme", () => {
  test("remembers an explicit choice and stays readable in both", async ({
    page,
  }) => {
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /tema|theme/i });
    await expect(toggle).toBeVisible();

    await toggle.click();
    const chosen = await page.locator("html").getAttribute("data-theme");
    expect(chosen).toMatch(/^(light|dark)$/);

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", chosen!);

    const results = await analyze(page);
    expect(results.violations.map((violation) => violation.id)).toEqual([]);
  });
});

test.describe("contact", () => {
  test("exposes direct, secure contact paths", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: /pablo\.aller\.moreno@gmail\.com/ }),
    ).toHaveAttribute("href", "mailto:pablo.aller.moreno@gmail.com");

    for (const link of await page
      .locator('a[target="_blank"]')
      .elementHandles()) {
      expect(await link.getAttribute("rel")).toContain("noreferrer");
      expect(await link.getAttribute("href")).toMatch(/^https:\/\//);
    }
  });
});
