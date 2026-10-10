// Builds the Resources and Legal pages linked from the footer
// (support.html, faq.html, privacy.html, …) into the site root.
//
//   node tools/build-pages.js
//
// Like build-guides.js, the site header and footer are copied from
// guide.html. Page text lives in tools/pages-content.js.

const fs = require("fs");
const path = require("path");
const { groups, pages } = require("./pages-content");

const root = path.join(__dirname, "..");
const hub = fs.readFileSync(path.join(root, "guide.html"), "utf8");

const icons = {
  help: '<circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 2.2-2.4 3.7M12 17h.01" />',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6Z" /><path d="m9 12 2 2 4-4" />',
};
const icon = (name) => `<svg aria-hidden="true" viewBox="0 0 24 24">${icons[name]}</svg>`;
const external = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></svg>';

const escapeHtml = (text) => text.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const stripTags = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const slugify = (text) => text.toLowerCase().replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Header and footer come from the guides hub page.
const hubHead = hub.slice(0, hub.indexOf("    <main"));
const hubFooter = hub.slice(hub.indexOf("    <!-- Site footer"), hub.indexOf("</footer>") + "</footer>".length);
if (!hubHead.includes("<header") || !hubFooter.includes("<footer")) {
  throw new Error("Could not find the header or footer in guide.html");
}

function pageHead(page) {
  return hubHead
    .replace(/<!-- Guides page metadata[^>]*-->/, `<!-- ${groups[page.group].label} page metadata and shared site assets -->`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)} — Reelish</title>`)
    .replace(/<!-- Shared site navigation[^>]*-->/, "<!-- Shared site navigation -->")
    // None of the main nav items is the current page.
    .replace(/class="nav-link is-active" (href="guide\.html") aria-current="page"/, 'class="nav-link" $1');
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

function renderPage(page) {
  const group = groups[page.group];
  const { html: body, toc } = withHeadingIds(page.body.trim());
  const siblings = pages.filter((item) => item.group === page.group);
  const groupLinks = [
    ...(page.group === "resources" ? ['<li><a href="guide.html">Guides</a></li>'] : []),
    ...siblings.map((item) =>
      item === page
        ? `<li><a href="${item.slug}.html" aria-current="page">${escapeHtml(item.title)}</a></li>`
        : `<li><a href="${item.slug}.html">${escapeHtml(item.title)}</a></li>`),
  ];

  return `${pageHead(page)}    <main id="main">
      <!-- ${group.label} article with table of contents and related pages -->
      <article class="guide-article" aria-labelledby="page-title">
        <div class="container guide-article-layout">
          <div class="guide-article-main">
            <nav class="guide-breadcrumb" aria-label="Breadcrumb">
              <ol>
                <li><a href="index.html#home">Home</a></li>
                <li>${group.label}</li>
                <li aria-current="page">${escapeHtml(page.title)}</li>
              </ol>
            </nav>

            <header class="guide-article-head">
              <span class="guide-article-category">${icon(group.icon)} ${group.label}</span>
              <h1 id="page-title">${escapeHtml(page.title)}</h1>
              <p class="guide-article-lead">${escapeHtml(page.description)}</p>
              ${page.updated ? `<p class="guide-article-meta">Last updated ${page.updated}</p>` : ""}
            </header>

            <div class="guide-prose">
              ${body}
            </div>

            <aside class="guide-help" aria-label="Questions?">
              <div>
                <h2>Questions?</h2>
                <p>Ask on GitHub, or see the support page for other ways to get help.</p>
              </div>
              <div class="guide-help-actions">
                <a class="button button-primary" href="https://github.com/frnzeeey/reelish/issues" target="_blank" rel="noopener noreferrer">Open an issue ${external}</a>
                <a class="button button-quiet" href="support.html">Support</a>
              </div>
            </aside>
          </div>

          <aside class="guide-article-aside">
            ${toc.length ? `<nav class="aside-card guide-toc" aria-label="On this page">
              <h2>On this page</h2>
              <ol>
                ${toc.map((item) => `<li><a href="#${item.id}">${escapeHtml(item.text)}</a></li>`).join("\n                ")}
              </ol>
            </nav>` : ""}
            <nav class="aside-card guide-related" aria-label="${group.label}">
              <h2>${icon(group.icon)} ${group.label}</h2>
              <ul>
                ${groupLinks.join("\n                ")}
              </ul>
            </nav>
          </aside>
        </div>
      </article>
    </main>

${hubFooter}

    <!-- Live feedback messages for button and navigation actions -->
    <div class="toast" role="status" aria-live="polite"></div>
  </body>
</html>
`;
}

pages.forEach((page) => {
  fs.writeFileSync(path.join(root, `${page.slug}.html`), renderPage(page));
});
console.log(`Built ${pages.length} pages: ${pages.map((page) => `${page.slug}.html`).join(", ")}`);
