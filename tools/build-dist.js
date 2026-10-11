// Builds the production site into dist/, which is what Netlify publishes.
//
//   node tools/build-dist.js                  minified + obfuscated (production)
//   node tools/build-dist.js --no-obfuscate   minified only, readable names kept
//
// Only pages, assets and the processed script / stylesheet are copied, so the
// authoring tools, README and package files never reach visitors. No source
// maps are generated. The script and stylesheet get a content hash in their
// file names so they can be cached long-term (see _headers).

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const zlib = require("zlib");
const { minify } = require("terser");
const { transform } = require("lightningcss");
const JavaScriptObfuscator = require("javascript-obfuscator");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "dist");
const obfuscate = !process.argv.includes("--no-obfuscate");

// Balanced settings: hides names and string literals without the size and
// speed cost of control-flow flattening or dead-code injection. Property
// names, globals and browser APIs are never renamed.
const obfuscatorOptions = {
  target: "browser",
  seed: 7411, // fixed seed keeps builds reproducible
  compact: true,
  simplify: true,
  identifierNamesGenerator: "hexadecimal",
  renameGlobals: false,
  renameProperties: false,
  transformObjectKeys: false,
  stringArray: true,
  stringArrayThreshold: 0.75,
  stringArrayEncoding: ["base64"],
  stringArrayShuffle: true,
  stringArrayRotate: true,
  stringArrayIndexShift: true,
  stringArrayCallsTransform: false,
  stringArrayWrappersCount: 1,
  stringArrayWrappersType: "variable",
  splitStrings: false,
  numbersToExpressions: false,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  selfDefending: false,
  debugProtection: false,
  disableConsoleOutput: false,
  unicodeEscapeSequence: false,
  sourceMap: false,
};

// Pages and assets published as-is, relative to the repository root.
const pageGlobs = [
  { dir: ".", match: (name) => name.endsWith(".html") },
  { dir: "guides", match: (name) => name.endsWith(".html") },
];
const assetDir = "assets";
const staticFiles = ["_headers"];

const hash = (content) => crypto.createHash("sha256").update(content).digest("hex").slice(0, 10);
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
const gz = (content) => zlib.gzipSync(content, { level: 9 }).length;

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dest);
    else if (!entry.name.startsWith(".")) fs.copyFileSync(src, dest);
  }
}

async function buildScript() {
  const source = fs.readFileSync(path.join(root, "scripts/main.js"), "utf8");

  // Refuse to process output that has already been obfuscated.
  if (/\b_0x[0-9a-f]{4,}\b/.test(source)) {
    throw new Error("scripts/main.js looks obfuscated already; restore the original source first");
  }

  const minified = await minify(source, {
    ecma: 2020,
    module: false,
    toplevel: true, // main.js is the only script and no markup references its names
    compress: { passes: 2 },
    mangle: true,
    format: { comments: false },
    sourceMap: false,
  });
  if (!minified.code) throw new Error("terser produced no output for scripts/main.js");

  const code = obfuscate
    ? JavaScriptObfuscator.obfuscate(minified.code, obfuscatorOptions).getObfuscatedCode()
    : minified.code;

  return { source, minified: minified.code, code };
}

function buildStyle() {
  const source = fs.readFileSync(path.join(root, "style/main.css"));
  const { code } = transform({ filename: "main.css", code: source, minify: true, sourceMap: false });
  return { source, code };
}

async function main() {
  const started = performance.now();
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir);

  const script = await buildScript();
  const style = buildStyle();
  const scriptName = `scripts/main.${hash(script.code)}.js`;
  const styleName = `style/main.${hash(style.code)}.css`;

  fs.mkdirSync(path.join(outDir, "scripts"));
  fs.mkdirSync(path.join(outDir, "style"));
  fs.writeFileSync(path.join(outDir, scriptName), script.code);
  fs.writeFileSync(path.join(outDir, styleName), style.code);

  // Point every page at the hashed files; "../scripts/main.js" in guides/ keeps its prefix.
  let pageCount = 0;
  for (const { dir, match } of pageGlobs) {
    fs.mkdirSync(path.join(outDir, dir), { recursive: true });
    for (const name of fs.readdirSync(path.join(root, dir)).filter(match)) {
      const html = fs.readFileSync(path.join(root, dir, name), "utf8");
      if (!html.includes('scripts/main.js"') || !html.includes('style/main.css"')) {
        throw new Error(`${path.join(dir, name)} does not reference scripts/main.js and style/main.css`);
      }
      const out = html
        .replaceAll('scripts/main.js"', `${scriptName}"`)
        .replaceAll('style/main.css"', `${styleName}"`);
      fs.writeFileSync(path.join(outDir, dir, name), out);
      pageCount += 1;
    }
  }

  copyDir(path.join(root, assetDir), path.join(outDir, assetDir));
  for (const file of staticFiles) fs.copyFileSync(path.join(root, file), path.join(outDir, file));

  const seconds = ((performance.now() - started) / 1000).toFixed(2);
  console.log(`Built ${pageCount} pages into dist/ in ${seconds}s (${obfuscate ? "obfuscated" : "readable"})`);
  console.table({
    "main.js source": { raw: kb(script.source.length), gzip: kb(gz(script.source)) },
    "main.js minified": { raw: kb(script.minified.length), gzip: kb(gz(script.minified)) },
    [scriptName]: { raw: kb(script.code.length), gzip: kb(gz(script.code)) },
    "main.css source": { raw: kb(style.source.length), gzip: kb(gz(style.source)) },
    [styleName]: { raw: kb(style.code.length), gzip: kb(gz(style.code)) },
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
