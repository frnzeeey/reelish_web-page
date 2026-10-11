// Checks dist/ before it is published. Netlify runs this after the build, so
// any failure stops the deploy.
//
//   node tools/verify-dist.js
//
// - only page, image, script, stylesheet and _headers files are present
// - no source maps or sourceMappingURL references
// - every local href / src in every page points at a file in dist/
// - the script parses, and each page loads the hashed script and stylesheet
// - no credential-looking strings in dist/ or in the unobfuscated sources
//   (obfuscation encodes strings, so the sources are scanned too)
// - _headers carries the Content-Security-Policy

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const distDir = path.join(root, "dist");
const failures = [];
const fail = (message) => failures.push(message);

const allowedExtensions = new Set([".html", ".js", ".css", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico"]);
const secretPatterns = [
  [/gh[pousr]_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{40,}/, "GitHub token"],
  [/AKIA[0-9A-Z]{16}/, "AWS access key"],
  [/AIza[0-9A-Za-z_-]{35}/, "Google API key"],
  [/\bsk-[A-Za-z0-9_-]{20,}/, "secret key (sk-…)"],
  [/xox[abprs]-[A-Za-z0-9-]{10,}/, "Slack token"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "private key"],
  [/eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\./, "JWT / bearer token"],
  [/api[_-]?key["'\s:=]+[0-9a-f]{32}/i, "32-character API key"],
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function scanForSecrets(file) {
  const text = fs.readFileSync(file, "utf8");
  for (const [pattern, label] of secretPatterns) {
    if (pattern.test(text)) fail(`${path.relative(root, file)}: contains something that looks like a ${label}`);
  }
}

if (!fs.existsSync(distDir)) {
  console.error("dist/ does not exist; run `npm run build` first");
  process.exit(1);
}

const files = walk(distDir);
const rel = (file) => path.relative(distDir, file).split(path.sep).join("/");

// Only intended production files.
for (const file of files) {
  const name = rel(file);
  if (name === "_headers") continue;
  if (!allowedExtensions.has(path.extname(name).toLowerCase())) fail(`unexpected file in dist/: ${name}`);
  if (/^(tools|node_modules|\.git)\//.test(name)) fail(`private folder published: ${name}`);
}

const textFiles = files.filter((file) => /\.(html|js|css)$|_headers$/.test(file));
const scripts = files.filter((file) => file.endsWith(".js"));
const styles = files.filter((file) => file.endsWith(".css"));
const pages = files.filter((file) => file.endsWith(".html"));

// No source maps, inline or external.
for (const file of textFiles) {
  if (/sourceMappingURL|sourceURL=/.test(fs.readFileSync(file, "utf8"))) fail(`${rel(file)}: has a source map reference`);
}

// Exactly one hashed script and stylesheet, and the script must parse.
if (scripts.length !== 1 || !/^scripts\/main\.[0-9a-f]{10}\.js$/.test(rel(scripts[0] || ""))) {
  fail(`expected one scripts/main.<hash>.js, found: ${scripts.map(rel).join(", ") || "none"}`);
}
if (styles.length !== 1 || !/^style\/main\.[0-9a-f]{10}\.css$/.test(rel(styles[0] || ""))) {
  fail(`expected one style/main.<hash>.css, found: ${styles.map(rel).join(", ") || "none"}`);
}
for (const file of scripts) {
  try {
    new vm.Script(fs.readFileSync(file, "utf8"), { filename: rel(file) });
  } catch (error) {
    fail(`${rel(file)}: syntax error: ${error.message}`);
  }
}

// Every local reference in every page resolves, and pages use the hashed assets.
for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  for (const [, url] of html.matchAll(/\b(?:href|src)="([^"]*)"/g)) {
    if (!url || /^(https?:|mailto:|tel:|data:|#)/.test(url)) continue;
    const target = path.resolve(path.dirname(page), decodeURIComponent(url.split(/[?#]/)[0]));
    if (!target.startsWith(distDir) || !fs.existsSync(target)) fail(`${rel(page)}: broken link ${url}`);
  }
  if (!scripts.some((file) => html.includes(path.basename(file)))) fail(`${rel(page)}: does not load the built script`);
  if (!styles.some((file) => html.includes(path.basename(file)))) fail(`${rel(page)}: does not load the built stylesheet`);
}

// Credentials, in what ships and in the readable sources it was built from.
const sourceFiles = [
  ...walk(path.join(root, "scripts")),
  ...walk(path.join(root, "style")),
  ...fs.readdirSync(root).filter((name) => name.endsWith(".html")).map((name) => path.join(root, name)),
  ...walk(path.join(root, "guides")),
];
[...textFiles, ...sourceFiles].forEach(scanForSecrets);

// Security headers.
const headers = fs.existsSync(path.join(distDir, "_headers")) ? fs.readFileSync(path.join(distDir, "_headers"), "utf8") : "";
for (const name of ["Content-Security-Policy", "X-Content-Type-Options", "Referrer-Policy", "X-Frame-Options"]) {
  if (!headers.includes(`${name}:`)) fail(`_headers: missing ${name}`);
}

if (failures.length) {
  console.error(`dist/ verification failed (${failures.length}):`);
  failures.forEach((message) => console.error(`  - ${message}`));
  process.exit(1);
}
console.log(`dist/ verified: ${files.length} files, ${pages.length} pages, no source maps, no credentials found`);
