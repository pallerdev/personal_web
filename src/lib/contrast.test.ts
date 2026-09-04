import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * The palette is defined once, in CSS. These tests read it back and check the
 * pairs that actually carry text, so a colour cannot be nudged into failing
 * WCAG AA without a test failing first. The browser audit in the Playwright
 * suite catches what this cannot: blended and inherited colours.
 */

const css = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "..", "styles", "global.css"),
  "utf8",
);

/** Reads the declarations of one rule block, given a unique selector. */
const tokensIn = (selector: string) => {
  const start = css.indexOf(selector);
  expect(start, `selector ${selector}`).toBeGreaterThan(-1);
  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  const block = css.slice(open + 1, close);
  return Object.fromEntries(
    [...block.matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6})/gi)].map(
      ([, name, value]) => [name, value.toLowerCase()],
    ),
  ) as Record<string, string>;
};

const channel = (value: number) =>
  value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((offset) =>
    channel(Number.parseInt(hex.slice(offset, offset + 2), 16) / 255),
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrast = (a: string, b: string) => {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
};

const light = tokensIn(":root {");
const dark = tokensIn(':root[data-theme="dark"] {');

/** AA needs 4.5:1 for body text and 3:1 for large text and UI borders. */
const BODY = 4.5;
const LARGE = 3;

const themes = [
  ["light", light],
  ["dark", dark],
] as const;

describe.each(themes)("%s theme", (name, tokens) => {
  it("declares every token the stylesheet relies on", () => {
    for (const token of [
      "--ground",
      "--ground-2",
      "--ink",
      "--ink-2",
      "--ink-3",
      "--signal",
      "--signal-ink",
      "--on-signal",
      "--invert-ground",
      "--invert-ink",
      "--invert-ink-2",
      "--invert-signal",
    ]) {
      expect(tokens[token], `${name} ${token}`).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("passes AA for body text on both grounds", () => {
    for (const ground of [tokens["--ground"], tokens["--ground-2"]]) {
      for (const ink of [
        tokens["--ink"],
        tokens["--ink-2"],
        tokens["--ink-3"],
        tokens["--signal-ink"],
      ]) {
        expect(
          contrast(ink, ground),
          `${name}: ${ink} on ${ground}`,
        ).toBeGreaterThanOrEqual(BODY);
      }
    }
  });

  it("passes AA for text on the inverted projects band", () => {
    for (const ink of [
      tokens["--invert-ink"],
      tokens["--invert-ink-2"],
      tokens["--invert-signal"],
    ]) {
      expect(
        contrast(ink, tokens["--invert-ground"]),
        `${name}: ${ink} on invert ground`,
      ).toBeGreaterThanOrEqual(BODY);
    }
  });

  it("keeps text legible on a vermilion fill", () => {
    /* The brand mark and the hovered button both put text on --signal. */
    expect(
      contrast(tokens["--on-signal"], tokens["--signal"]),
      `${name}: on-signal over signal`,
    ).toBeGreaterThanOrEqual(BODY);
  });

  it("keeps rules and marks visible as non-text elements", () => {
    expect(
      contrast(tokens["--signal"], tokens["--ground"]),
      `${name}: signal rule on ground`,
    ).toBeGreaterThanOrEqual(LARGE);
    expect(
      contrast(tokens["--rule-strong"], tokens["--ground"]),
      `${name}: strong rule on ground`,
    ).toBeGreaterThanOrEqual(LARGE);
  });
});

describe("the dark theme", () => {
  it("is defined identically for the toggle and for the system preference", () => {
    /* Two blocks carry the dark palette; drift between them is a real bug. */
    const media = css.slice(css.indexOf("@media (prefers-color-scheme: dark)"));
    const systemDark = tokensIn.call(null, ':root:not([data-theme="light"]) {');
    expect(media.length).toBeGreaterThan(0);
    expect(systemDark).toEqual(dark);
  });
});
