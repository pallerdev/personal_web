import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("presents the professional story and navigates to GardenView", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Construyo backend",
  );
  await expect(
    page.getByRole("navigation", { name: "Navegación principal" }),
  ).toBeVisible();
  await page.getByRole("link", { name: /Leer el caso/ }).click();
  await expect(page).toHaveURL(/\/work\/gardenview\/$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "GardenView" }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://paller.dev/work/gardenview/",
  );
});

test("exposes direct, secure contact paths", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: /pablo\.aller\.moreno@gmail\.com/ }),
  ).toHaveAttribute("href", "mailto:pablo.aller.moreno@gmail.com");
  await expect(
    page.getByRole("link", { name: /GitHub/ }).last(),
  ).toHaveAttribute("href", "https://github.com/pallerdev");
  await expect(
    page.getByRole("link", { name: /LinkedIn/ }).last(),
  ).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/pablo-aller-350463278/",
  );
});

test("keeps the mobile page inside the viewport", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(
    page.getByRole("link", { name: "Saltar al contenido" }),
  ).toBeAttached();
});

test("offers a useful recovery route", async ({ page }) => {
  await page.goto("/missing-page");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "camino no lleva",
  );
  await expect(
    page.getByRole("link", { name: "Volver al inicio" }),
  ).toHaveAttribute("href", "/");
});

for (const route of ["/", "/work/gardenview/", "/missing-page"]) {
  test(`${route} has no detectable WCAG A or AA violations`, async ({
    page,
  }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
