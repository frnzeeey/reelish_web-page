// Publishes approved reviews and builds the review confirmation page.
//
//   node tools/build-reviews.js
//
// - Renders tools/reviews-content.js into index.html between the
//   <!-- reviews:start --> and <!-- reviews:end --> markers.
// - Writes review-thanks.html, where the Netlify review form sends people
//   after a successful submission. Its header and footer come from
//   guide.html, as in build-pages.js.
//
// Fails on a malformed review rather than publishing it. `npm run build`
// runs this first, so the deployed page always matches the content file.

const fs = require("fs");
const path = require("path");
const { reviews } = require("./reviews-content");

const root = path.join(__dirname, "..");
const indexPath = path.join(root, "index.html");
const START = "<!-- reviews:start -->";
const END = "<!-- reviews:end -->";

const PLATFORMS = { android: "Android", tv: "Android TV / Google TV", windows: "Windows" };
const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

function validate(review, index) {
  const where = `tools/reviews-content.js, review ${index + 1}`;
  const problems = [];
  if (typeof review.name !== "string" || !review.name.trim() || review.name.length > 40) problems.push("name must be 1–40 characters");
  if (!Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) problems.push("rating must be a whole number from 1 to 5");
  if (!(review.platform in PLATFORMS)) problems.push(`platform must be one of ${Object.keys(PLATFORMS).join(", ")}`);
  if (typeof review.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(review.date) || Number.isNaN(Date.parse(review.date))) problems.push("date must be YYYY-MM-DD");
  if (typeof review.text !== "string" || !review.text.trim() || review.text.length > 600) problems.push("text must be 1–600 characters");
  if (problems.length) throw new Error(`${where}: ${problems.join("; ")}`);
}

const stars = (rating) =>
  `<p class="review-stars" role="img" aria-label="Rated ${rating} out of 5">${"★".repeat(rating)}<span aria-hidden="true">${"★".repeat(5 - rating)}</span></p>`;

function renderReview(review) {
  const paragraphs = review.text
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.trim()).replace(/\n/g, "<br />")}</p>`)
    .join("");
  return `
            <li class="review-card">
              ${stars(review.rating)}
              <blockquote>${paragraphs}</blockquote>
              <p class="review-author">
                <strong>${escapeHtml(review.name.trim())}</strong>
                <span>${PLATFORMS[review.platform]} · <time datetime="${review.date}">${dateFormat.format(new Date(review.date))}</time></span>
              </p>
            </li>`;
}

function renderReviews() {
  if (!reviews.length) {
    return `
          <div class="reviews-empty">
            <p>No reviews have been published yet. Be the first to share yours below.</p>
          </div>`;
  }
  return `
          <ul class="reviews-grid" role="list">${reviews.map(renderReview).join("")}
          </ul>`;
}

reviews.forEach(validate);

// Approved reviews into the home page.
const index = fs.readFileSync(indexPath, "utf8");
const start = index.indexOf(START);
const end = index.indexOf(END);
if (start === -1 || end === -1 || end < start) throw new Error(`index.html is missing the ${START} / ${END} markers`);
const updated = `${index.slice(0, start + START.length)}${renderReviews()}\n          ${index.slice(end)}`;
if (updated !== index) fs.writeFileSync(indexPath, updated);

// Confirmation page, with the shared header and footer from guide.html.
const hub = fs.readFileSync(path.join(root, "guide.html"), "utf8");
const hubHead = hub.slice(0, hub.indexOf("    <main"));
const hubFooter = hub.slice(hub.indexOf("    <!-- Site footer"), hub.indexOf("</footer>") + "</footer>".length);
if (!hubHead.includes("<header") || !hubFooter.includes("<footer")) {
  throw new Error("Could not find the header or footer in guide.html");
}

const head = hubHead
  .replace(/<!-- Guides page metadata[^>]*-->/, "<!-- Review confirmation page metadata and shared site assets -->")
  .replace(/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="Thanks for reviewing Reelish." />\n    <meta name="robots" content="noindex" />')
  .replace(/<title>[^<]*<\/title>/, "<title>Thanks for your review — Reelish</title>")
  .replace(/<!-- Shared site navigation[^>]*-->/, "<!-- Shared site navigation -->")
  .replace(/class="nav-link is-active" (href="guide\.html") aria-current="page"/, 'class="nav-link" $1');

const thanks = `${head}    <main id="main">
      <!-- Shown by Netlify after a review is submitted -->
      <section class="section review-thanks" aria-labelledby="thanks-title">
        <div class="container">
          <div class="review-thanks-card">
            <span class="review-thanks-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.7 2.7L16 9.8" /></svg>
            </span>
            <h1 id="thanks-title">Thanks for your review!</h1>
            <p>It has been sent for approval. Approved reviews appear on the home page, usually within a few days. Not every review is published.</p>
            <div class="review-thanks-actions">
              <a class="button button-primary" href="index.html#reviews">Back to reviews</a>
              <a class="button button-quiet" href="index.html#home">Home</a>
            </div>
          </div>
        </div>
      </section>
    </main>

${hubFooter}

    <!-- Live feedback messages for button and navigation actions -->
    <div class="toast" role="status" aria-live="polite"></div>
  </body>
</html>
`;
fs.writeFileSync(path.join(root, "review-thanks.html"), thanks);

console.log(`Published ${reviews.length} ${reviews.length === 1 ? "review" : "reviews"} into index.html; built review-thanks.html`);
