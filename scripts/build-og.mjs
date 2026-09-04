/**
 * Renders the Open Graph cards to PNG.
 *
 * Social networks do not render SVG previews, and asking a rasteriser to find
 * a webfont on the build machine is not reproducible. So the text is converted
 * to glyph outlines here with fontkit — using the same Archivo the site uses,
 * vendored in `assets/fonts/` — and only then handed to sharp. The output is
 * identical on any machine, with no font installed.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { openSync } from "fontkit";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const outDir = join(root, "public", "og");

const WIDTH = 1200;
const HEIGHT = 630;

const COLOR = {
  ground: "#111417",
  ink: "#f3f5f4",
  quiet: "#a8b1b7",
  signal: "#dc3919",
};

const font = openSync(join(root, "assets", "fonts", "Archivo[wdth,wght].ttf"));

const faces = {
  display: font.getVariation({ wght: 800, wdth: 112 }),
  label: font.getVariation({ wght: 600, wdth: 100 }),
};

/**
 * Lays out one line of text and returns it as SVG paths plus its width, so
 * callers can right-align or measure without a second pass.
 */
const textPaths = (face, text, { size, x, y, tracking = 0, fill }) => {
  const scale = size / face.unitsPerEm;
  const run = face.layout(text);
  const parts = [];
  let penX = 0;

  run.glyphs.forEach((glyph, index) => {
    const d = glyph.path.toSVG();
    if (d) {
      const glyphX = (x + penX * scale).toFixed(2);
      parts.push(
        `<path d="${d}" transform="translate(${glyphX} ${y.toFixed(2)}) scale(${scale.toFixed(5)} ${(-scale).toFixed(5)})" fill="${fill}"/>`,
      );
    }
    penX += run.positions[index].xAdvance + tracking * face.unitsPerEm;
  });

  return { svg: parts.join(""), width: penX * scale };
};

/** Width of a line without emitting it, for right-aligned text. */
const measure = (face, text, size, tracking = 0) => {
  const scale = size / face.unitsPerEm;
  const run = face.layout(text);
  const advance = run.positions.reduce(
    (total, position) => total + position.xAdvance,
    0,
  );
  return advance * scale + tracking * size * Math.max(run.glyphs.length - 1, 0);
};

const cards = {
  es: {
    file: "card.png",
    eyebrow: "BACKEND DEVELOPER · BRNO · CONTINERO",
    headline: ["La parte del backend", "que no admite", "errores."],
    record: "120 PULL REQUESTS · 85 INTEGRADAS · 6 REPOSITORIOS",
  },
  en: {
    file: "card-en.png",
    eyebrow: "BACKEND DEVELOPER · BRNO · CONTINERO",
    headline: ["The part of the backend", "with no room", "for error."],
    record: "120 PULL REQUESTS · 85 MERGED · 6 REPOSITORIES",
  },
};

const renderCard = ({ eyebrow, headline, record }) => {
  const layers = [];

  /* Vermilion spine on the left edge, and the rule the headline sits under. */
  layers.push(
    `<rect x="0" y="0" width="18" height="${HEIGHT}" fill="${COLOR.signal}"/>`,
  );
  layers.push(
    `<rect x="78" y="52" width="132" height="10" fill="${COLOR.signal}"/>`,
  );

  layers.push(
    textPaths(faces.display, "PABLO ALLER", {
      size: 34,
      x: 78,
      y: 116,
      fill: COLOR.ink,
    }).svg,
  );

  layers.push(
    textPaths(faces.label, eyebrow, {
      size: 19,
      x: 78,
      y: 148,
      fill: COLOR.quiet,
    }).svg,
  );

  const lineHeight = 74;
  const firstBaseline = 276;
  headline.forEach((line, index) => {
    layers.push(
      textPaths(faces.display, line, {
        size: 68,
        x: 78,
        y: firstBaseline + index * lineHeight,
        fill: COLOR.ink,
      }).svg,
    );
  });

  layers.push(
    `<rect x="78" y="${HEIGHT - 96}" width="${WIDTH - 156}" height="3" fill="${COLOR.signal}"/>`,
  );

  layers.push(
    textPaths(faces.label, record, {
      size: 19,
      x: 78,
      y: HEIGHT - 56,
      fill: COLOR.signal,
    }).svg,
  );

  const domain = "paller.dev";
  const domainWidth = measure(faces.display, domain, 22);
  layers.push(
    textPaths(faces.display, domain, {
      size: 22,
      x: WIDTH - 78 - domainWidth,
      y: HEIGHT - 54,
      fill: COLOR.ink,
    }).svg,
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
<rect width="${WIDTH}" height="${HEIGHT}" fill="${COLOR.ground}"/>
${layers.join("\n")}
</svg>`;
};

await mkdir(outDir, { recursive: true });

for (const [locale, card] of Object.entries(cards)) {
  const svg = renderCard(card);
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(join(outDir, card.file));
  /* Keep the vector next to the PNG; useful when the wording changes. */
  await writeFile(
    join(outDir, card.file.replace(/\.png$/, ".svg")),
    svg,
    "utf8",
  );
  console.log(`og: ${locale} → public/og/${card.file}`);
}
