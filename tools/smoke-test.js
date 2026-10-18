// Loads every page of a built site in a real browser, with the _headers
// security policy applied, and exercises the interactive features.
//
//   node tools/smoke-test.js                 tests dist/
//   node tools/smoke-test.js --dir <folder>  tests another build or the raw sources
//
// Uses an installed Chrome (or Edge) through playwright-core. Fails on page
// errors, console errors, CSP violations or broken same-origin requests.
// GitHub API problems (offline, rate limited) are reported as warnings,
// because the pages keep their static fallback in that case.

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright-core");
const { createServer } = require("./serve-dist");

const dirFlag = process.argv.indexOf("--dir");
const siteDir = path.resolve(dirFlag > -1 ? process.argv[dirFlag + 1] : path.join(__dirname, "..", "dist"));
const failures = [];
const warnings = [];

async function launch() {
  for (const channel of ["chrome", "msedge"]) {
    try {
      return await chromium.launch({ channel });
    } catch {
      // try the next installed browser
    }
  }
  throw new Error("No installed Chrome or Edge found for playwright-core");
}

// Open a page and record anything that goes wrong while it loads and is used.
async function openPage(context, origin, pagePath, problems) {
  const page = await context.newPage();
  page.on("pageerror", (error) => problems.push(`page error: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error" && !/api\.github\.com/.test(message.text())) problems.push(`console: ${message.text()}`);
  });
  page.on("response", (response) => {
    const url = response.url();
    if (url.startsWith(origin) && response.status() >= 400) problems.push(`HTTP ${response.status()} ${url}`);
    if (url.startsWith("https://api.github.com") && response.status() >= 400) warnings.push(`GitHub API ${response.status()} on ${pagePath}`);
  });
  page.on("requestfailed", (request) => {
    const url = request.url();
    // The browser cancels an image load when the playback preview swaps its src.
    if (request.failure()?.errorText === "net::ERR_ABORTED") return;
    if (url.startsWith("https://api.github.com")) warnings.push(`GitHub API unreachable on ${pagePath}`);
    else problems.push(`request failed: ${url} (${request.failure()?.errorText})`);
  });
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      console.error(`CSP violation: ${event.violatedDirective} blocked ${event.blockedURI || "inline code"}`);
    });
  });
  await page.goto(`${origin}/${pagePath}`, { waitUntil: "networkidle" });
  return page;
}

function check(problems, condition, message) {
  if (!condition) problems.push(message);
}

// Feature checks for pages with interactive behavior.
const interactions = {
  async "index.html"(page, problems) {
    const title = page.locator(".showcase-slide-title");
    check(problems, (await title.textContent()) === "Home Screen", "carousel did not start on Home Screen");
    check(problems, (await page.locator(".showcase-dot").count()) === 5, "carousel dots not rendered");
    await page.click(".showcase-next");
    check(problems, (await title.textContent()) === "Movie Details", "carousel next button did not advance");
    await page.click(".showcase-previous");
    check(problems, (await title.textContent()) === "Home Screen", "carousel previous button did not go back");

    await page.click(".playback-main-toggle");
    check(problems, await page.locator("#playback-player.is-playing").count(), "playback preview did not start");
    await page.click(".playback-skip-forward");
    check(problems, /^0:1\d|^\d+:\d\d/.test(await page.locator(".playback-time").textContent()), "playback time not shown");
    await page.click(".playback-captions");
    check(problems, await page.locator(".playback-subtitle.is-hidden").count(), "captions toggle did not hide subtitles");
    await page.click(".playback-settings-toggle");
    const option = page.locator(".playback-options [data-scale]").last();
    const scale = (await option.getAttribute("data-scale")).toLowerCase();
    await option.click();
    check(problems, (await page.locator("#playback-player").getAttribute("data-scale")) === scale, "scale option not applied");

    // Platform download menu in the hero.
    const heroMenu = page.locator(".hero-actions .download-menu");
    const heroToggle = heroMenu.locator(".download-menu-toggle");
    check(problems, (await page.locator(".download-menu").count()) === 3, "expected 3 download menus (nav, hero, final CTA)");
    check(problems, (await heroToggle.getAttribute("aria-haspopup")) === "menu", "download toggle lacks aria-haspopup");
    await heroToggle.click();
    check(problems, (await heroToggle.getAttribute("aria-expanded")) === "true", "download menu did not open on click");
    const options = heroMenu.locator('[role="menuitem"]');
    check(problems, (await options.count()) === 3, "download menu does not list 3 platforms");
    await page.waitForFunction(() => !document.querySelector(".download-option-meta")?.textContent.includes("Checking"), null, { timeout: 8000 }).catch(() => {});
    const allowed = /^https:\/\/github\.com\/frnzeeey\/reelish\/releases(\/latest\/download\/|\/download\/v\d+\.\d+\.\d+\/|$)/;
    const targets = {};
    for (const option of await options.all()) {
      const platform = await option.getAttribute("data-download");
      targets[platform] = await option.getAttribute("href");
      check(problems, allowed.test(targets[platform]), `untrusted ${platform} download URL: ${targets[platform]}`);
    }
    check(problems, /\/reelish\.apk$/.test(targets.android || ""), `Android option is not the APK: ${targets.android}`);
    check(problems, targets.tv === targets.android, "Android TV option is not the same APK as Android");
    check(problems, /\/Reelish-Setup-x64\.exe$/.test(targets.windows || ""), `Windows option is not the installer: ${targets.windows}`);
    const windowsCta = await page.locator('#windows [data-download="windows"]').getAttribute("href");
    check(problems, windowsCta === targets.windows, "Windows section CTA and menu point at different files");
    if (await page.locator(".download-menu-status:not([hidden])").count()) {
      warnings.push("index.html: download menu kept its latest-release fallback links (GitHub API not available)");
    }
    await heroToggle.click();
    check(problems, (await heroToggle.getAttribute("aria-expanded")) === "false", "download menu did not close on second click");
    await heroToggle.focus();
    await page.keyboard.press("ArrowDown");
    check(problems, (await page.evaluate(() => document.activeElement.dataset.download)) === "android", "ArrowDown did not focus the first platform");
    await page.keyboard.press("ArrowDown");
    check(problems, (await page.evaluate(() => document.activeElement.dataset.download)) === "tv", "ArrowDown did not move to the next platform");
    await page.keyboard.press("End");
    check(problems, (await page.evaluate(() => document.activeElement.dataset.download)) === "windows", "End did not focus the last platform");
    await page.keyboard.press("Escape");
    check(problems, (await heroToggle.getAttribute("aria-expanded")) === "false", "Escape did not close the download menu");
    check(problems, await heroToggle.evaluate((el) => el === document.activeElement), "Escape did not return focus to the toggle");
    await heroToggle.click();
    await page.mouse.click(5, 600);
    check(problems, (await heroToggle.getAttribute("aria-expanded")) === "false", "outside click did not close the download menu");

    // Layout: no sideways scroll, and an open menu stays inside the viewport.
    for (const width of [320, 375, 480, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.locator("#home").scrollIntoViewIfNeeded();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      check(problems, overflow <= 0, `horizontal overflow of ${overflow}px at ${width}px`);
      await heroToggle.click();
      await page.waitForTimeout(350);
      const box = await heroMenu.locator(".download-menu-panel").boundingBox();
      check(problems, box && box.x >= 0 && box.x + box.width <= width, `download menu clipped at ${width}px`);
      await page.keyboard.press("Escape");
    }
    await page.setViewportSize({ width: 1280, height: 900 });

    if (await page.locator("#latest-release.is-loaded").count()) {
      check(problems, await page.locator("[data-latest-version]:not([hidden])").count(), "latest version chip not shown");
    } else {
      warnings.push("index.html: latest release card kept its static fallback (GitHub API not available)");
    }

    await page.setViewportSize({ width: 390, height: 800 });
    await page.click(".menu-toggle");
    check(problems, await page.locator(".nav-panel.is-open").count(), "mobile menu did not open");
    // The header download menu expands inside the mobile panel.
    const navToggle = page.locator(".nav-panel .download-menu-toggle");
    await navToggle.click();
    await page.waitForTimeout(350);
    check(problems, await page.locator('.nav-panel [data-download="windows"]').isVisible(), "Windows option not visible in the mobile menu");
    await page.keyboard.press("Escape");
    await page.keyboard.press("Escape");
    check(problems, !(await page.locator(".nav-panel.is-open").count()), "Escape did not close the mobile menu");
  },

  async "guide.html"(page, problems) {
    const status = page.locator("#guides-status");
    const visible = () => page.locator(".guide-card:visible").count();
    const total = await visible();
    await page.fill("#guide-search", "subtitle");
    const filtered = await visible();
    check(problems, filtered > 0 && filtered < total, `guide search did not filter (${total} → ${filtered})`);
    check(problems, (await status.textContent()).startsWith(`${filtered} `), "guide status text not updated");
    await page.fill("#guide-search", "zzzz-no-match");
    check(problems, await page.locator("#guides-empty:visible").count(), "empty state not shown");
    await page.fill("#guide-search", "");
    await page.locator(".guide-filter").nth(1).click();
    const byCategory = await visible();
    check(problems, byCategory > 0 && byCategory < total, "category filter did not filter");
  },

  async "changelog.html"(page, problems) {
    const entries = await page.locator("#release-timeline .release-entry").count();
    if (entries) {
      check(problems, !(await page.locator("#release-index").getAttribute("hidden")), "release index not shown");
    } else {
      warnings.push("changelog.html: no releases rendered (GitHub API not available)");
    }
  },
};

// Median script time and DOMContentLoaded for the guides hub, which runs no network requests.
async function measure(context, origin) {
  const runs = [];
  for (let i = 0; i < 7; i += 1) {
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send("Performance.enable");
    await page.goto(`${origin}/guide.html`, { waitUntil: "load" });
    const { metrics } = await cdp.send("Performance.getMetrics");
    const dcl = await page.evaluate(() => performance.getEntriesByType("navigation")[0].domContentLoadedEventEnd);
    runs.push({ script: metrics.find((m) => m.name === "ScriptDuration").value * 1000, dcl });
    await page.close();
  }
  const median = (values) => values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
  return { script: median(runs.map((r) => r.script)), dcl: median(runs.map((r) => r.dcl)) };
}

async function main() {
  const server = createServer(siteDir);
  await new Promise((resolve) => server.listen(0, resolve));
  const origin = `http://localhost:${server.address().port}`;
  const browser = await launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

  const pages = [
    ...fs.readdirSync(siteDir).filter((name) => name.endsWith(".html")),
    ...fs.readdirSync(path.join(siteDir, "guides")).filter((name) => name.endsWith(".html")).map((name) => `guides/${name}`),
  ];

  try {
    for (const pagePath of pages) {
      const problems = [];
      const page = await openPage(context, origin, pagePath, problems);
      if (interactions[pagePath]) await interactions[pagePath](page, problems);
      await page.close();
      problems.forEach((problem) => failures.push(`${pagePath}: ${problem}`));
      console.log(`${problems.length ? "FAIL" : "ok  "} ${pagePath}`);
    }
    const timing = await measure(context, origin);
    console.log(`guide.html median over 7 loads: script ${timing.script.toFixed(1)} ms, DOMContentLoaded ${timing.dcl.toFixed(1)} ms`);
  } finally {
    await browser.close();
    server.close();
  }

  [...new Set(warnings)].forEach((warning) => console.warn(`warning: ${warning}`));
  if (failures.length) {
    console.error(`\nSmoke test failed (${failures.length}):`);
    failures.forEach((failure) => console.error(`  - ${failure}`));
    process.exit(1);
  }
  console.log(`\nSmoke test passed: ${pages.length} pages in ${path.relative(process.cwd(), siteDir) || "."}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
