import { describe, expect, test } from "vitest";
import { buildCanonical, buildTitle } from "./seo";

describe("SEO helpers", () => {
  test("builds absolute canonical URLs without duplicate slashes", () => {
    expect(buildCanonical("/work/gardenview/")).toBe(
      "https://paller.dev/work/gardenview/",
    );
  });

  test("uses a focused home title and composes page titles", () => {
    expect(buildTitle()).toBe("Pablo Aller — Backend developer");
    expect(buildTitle("GardenView")).toBe("GardenView — Pablo Aller");
  });
});
