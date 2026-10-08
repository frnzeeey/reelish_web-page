// Builds one page per guide into guides/<slug>.html.
//
//   node tools/build-guides.js
//
// The site header and footer are copied from guide.html, so nav or footer
// changes there carry over the next time this script runs. Guide text lives
// in tools/guides-content.js.

const fs = require("fs");
const path = require("path");
const { categories, guides } = require("./guides-content");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "guides");
const hub = fs.readFileSync(path.join(root, "guide.html"), "utf8");

const icons = {
  book: '<path d="M12 7v13M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3Z" />',
  download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 16v4h14v-4" />',
  puzzle: '<path d="M19.4 7.9c0 .3.1.6.3.9l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.6 1.6a1 1 0 0 1-.8.3c-.5-.1-.8-.5-1-.9a2.5 2.5 0 1 0-3.2 3.2c.4.2.9.5.9 1a1 1 0 0 1-.3.8l-1.6 1.6a2.4 2.4 0 0 1-3.4 0l-1.6-1.6a1 1 0 0 0-.9-.3c-.5.1-.8.5-1 1a2.5 2.5 0 1 1-3.2-3.3c.5-.2.9-.5 1-1a1 1 0 0 0-.3-.9l-1.6-1.6a2.4 2.4 0 0 1 0-3.4l1.5-1.5c.2-.2.6-.4.9-.3.5.1.9.5 1.1 1a2.5 2.5 0 1 0 3.3-3.3c-.5-.2-.9-.6-1-1.1 0-.3 0-.7.3-.9l1.5-1.5a2.4 2.4 0 0 1 3.4 0l1.6 1.6c.2.2.6.3.9.3.5-.1.8-.5 1-1a2.5 2.5 0 1 1 3.2 3.2c-.4.2-.9.5-.9 1Z" />',
  play: '<circle cx="12" cy="12" r="9" /><path d="m10 8.5 5.5 3.5-5.5 3.5v-7Z" />',
  help: '<circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 2.2-2.4 3.7M12 17h.01" />',
};
const icon = (name) => `<svg aria-hidden="true" viewBox="0 0 24 24">${icons[name]}</svg>`;
const arrowLeft = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M19 12H5m6-6-6 6 6 6" /></svg>';
const arrowRight = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>';
const external = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></svg>';

const escapeHtml = (text) => text.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const stripTags = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const slugify = (text) => text.toLowerCase().replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Pages in guides/ sit one folder down, so local URLs need a "../" prefix.
const toSubfolder = (html) =>
  html.replace(/\b(href|src)="(?!https?:|#|mailto:|data:|\/)([^"]*)"/g, '$1="../$2"');

// Header and footer come from the guides hub page.
const hubHead = hub.slice(0, hub.indexOf("    <main"));
const hubFooter = hub.slice(hub.indexOf("    <!-- Site footer"), hub.indexOf("</footer>") + "</footer>".length);
if (!hubHead.includes("<header") || !hubFooter.includes("<footer")) {
  throw new Error("Could not find the header or footer in guide.html");
}

function pageHead(guide) {
  return toSubfolder(hubHead)
    .replace(/<!-- Guides page metadata[^>]*-->/, "<!-- Guide article metadata and shared site assets -->")
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(guide.description)}" />`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(guide.title)} — Reelish Guides</title>`)
    // Keep Guides highlighted, but this page isn't the hub itself.
    .replace(/(href="\.\.\/guide\.html") aria-current="page"/, "$1");
}

// Give every <h2> an id and collect them for "On this page".
function withHeadingIds(body) {
  const toc = [];
  const used = new Set();
  const html = body.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    let id = slugify(stripTags(inner)) || "section";
    while (used.has(id)) id += "-2";
    used.add(id);
    toc.push({ id, text: stripTags(inner) });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html, toc };
}

function renderGuide(guide, index) {
  const category = categories[guide.category];
  const { html: body, toc } = withHeadingIds(guide.body.trim());
  const minutes = Math.max(1, Math.round(stripTags(body).split(" ").length / 200));
  const previous = guides[index - 1];
  const next = guides[index + 1];
  const siblings = guides.filter((item) => item.category === guide.category);

  const pagerLink = (item, direction) =>
    item
      ? `<a class="guide-pager-link guide-pager-${direction}" href="${item.slug}.html">
              <span>${direction === "prev" ? `${arrowLeft} Previous` : `Next ${arrowRight}`}</span>
              <strong>${escapeHtml(item.title)}</strong>
            </a>`
      : "<span></span>";

  return `${pageHead(guide)}    <main id="main">
      <!-- Guide article with table of contents and related guides -->
      <article class="guide-article" aria-labelledby="guide-title">
        <div class="container guide-article-layout">
          <div class="guide-article-main">
            <nav class="guide-breadcrumb" aria-label="Breadcrumb">
              <ol>
                <li><a href="../guide.html">Guides</a></li>
                <li><a href="../guide.html#group-${guide.category}">${category.label}</a></li>
                <li aria-current="page">${escapeHtml(guide.title)}</li>
              </ol>
            </nav>

            <header class="guide-article-head">
              <span class="guide-article-category">${icon(category.icon)} ${category.label}</span>
              <h1 id="guide-title">${escapeHtml(guide.title)}</h1>
              <p class="guide-article-lead">${escapeHtml(guide.description)}</p>
              <p class="guide-article-meta">${minutes} min read</p>
            </header>

            <div class="guide-prose">
              ${body}
            </div>

            <aside class="guide-help" aria-label="Need more help?">
              <div>
                <h2>Still need help?</h2>
                <p>Report a bug or ask a question on GitHub, or browse the rest of the guides.</p>
              </div>
              <div class="guide-help-actions">
                <a class="button button-primary" href="https://github.com/frnzeeey/reelish/issues" target="_blank" rel="noopener noreferrer">Open an issue ${external}</a>
                <a class="button button-quiet" href="../guide.html">All guides</a>
              </div>
            </aside>

            <nav class="guide-pager" aria-label="More guides">
              ${pagerLink(previous, "prev")}
              ${pagerLink(next, "next")}
            </nav>
          </div>

          <aside class="guide-article-aside">
            ${toc.length ? `<nav class="aside-card guide-toc" aria-label="On this page">
              <h2>On this page</h2>
              <ol>
                ${toc.map((item) => `<li><a href="#${item.id}">${escapeHtml(item.text)}</a></li>`).join("\n                ")}
              </ol>
            </nav>` : ""}
            <nav class="aside-card guide-related" aria-label="${category.label} guides">
              <h2>${icon(category.icon)} ${category.label}</h2>
              <ul>
                ${siblings
                  .map((item) =>
                    item === guide
                      ? `<li><a href="${item.slug}.html" aria-current="page">${escapeHtml(item.title)}</a></li>`
                      : `<li><a href="${item.slug}.html">${escapeHtml(item.title)}</a></li>`)
                  .join("\n                ")}
              </ul>
            </nav>
          </aside>
        </div>
      </article>
    </main>

${toSubfolder(hubFooter)}

    <!-- Live feedback messages for button and navigation actions -->
    <div class="toast" role="status" aria-live="polite"></div>
  </body>
</html>
`;
}

fs.mkdirSync(outDir, { recursive: true });
guides.forEach((guide, index) => {
  fs.writeFileSync(path.join(outDir, `${guide.slug}.html`), renderGuide(guide, index));
});
console.log(`Built ${guides.length} guides into guides/`);
