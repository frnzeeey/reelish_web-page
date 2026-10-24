# Building and deploying

The site's sources (HTML pages, `scripts/main.js`, `style/main.css`, `assets/`) stay readable in this repository. Netlify builds a production copy into `dist/` and publishes only that folder.

## Commands

| Command | What it does |
| --- | --- |
| `npm ci` | Installs the pinned build tools |
| `npm run build` | Publishes approved reviews into `index.html`, then builds `dist/`: minified + obfuscated script, minified stylesheet, content-hashed file names, pages and assets |
| `npm run build:readable` | Same, but the script is only minified (for debugging production issues) |
| `npm run verify` | Fails if `dist/` has unexpected files, source maps, broken links, a script syntax error or credential-like strings |
| `npm test` | Build + verify + loads every page in an installed Chrome/Edge with the `_headers` CSP applied and exercises the interactive features |
| `npm run serve` | Serves `dist/` at http://localhost:8080 with the `_headers` headers |

For local development, open the HTML files directly or serve the repository root as before. Nothing in the sources changed. `tools/build-guides.js` and `tools/build-pages.js` still generate the guide and legal pages into the repository, so run them before `npm run build` if you edit their content.

## Deploying

`netlify.toml` sets the build command (`npm run build && npm run verify`) and the publish folder (`dist`), and overrides any build settings in the Netlify UI. Run `npm test` locally, then push to `main`. A build or verification failure stops the deploy and the previous deploy stays live.

After deploying, check:

- `curl -sI https://reelishofficial.netlify.app/` shows `Content-Security-Policy`, `X-Frame-Options` and the other `_headers` headers
- `https://reelishofficial.netlify.app/tools/build-pages.js` and `/README.md` return 404
- the home page shows the latest release, and the changelog lists releases

## Reviews

The review form on the home page (`#reviews`) is a [Netlify Forms](https://docs.netlify.com/manage/forms/setup/) form named `review`. Submissions are stored in Netlify and are **not** published automatically.

**One-time setup:** in Netlify, open the site → **Forms** and choose **Enable form detection**, then redeploy. Netlify only finds forms in deploys made after detection is turned on. Optionally add a form notification (Forms → Form notifications) to get an email for each new review.

**Publishing a review:**

1. Open the site → **Forms** → **review** in Netlify and read the submission. Skip spam, abuse, personal information, piracy requests, and anything without `consent: yes`. Netlify's spam filter and the form's honeypot field catch most bots, but they can miss some.
2. Add the review to `tools/reviews-content.js`, newest first. The file lists the fields and limits.
3. Run `npm test`. The build runs `tools/build-reviews.js`, which writes the reviews into `index.html` and fails on a malformed entry. Check the section with `npm run serve`, then commit and push.

**Removing a review:** delete its entry, rebuild and push. If the reviewer asks for their data to be deleted, also delete the submission in Netlify (the privacy policy promises this).

After a successful submission, Netlify sends people to `review-thanks.html`, which `tools/build-reviews.js` also generates. The form is an ordinary HTML POST, so it needs no JavaScript and no Content-Security-Policy change.

## Download count

The home page shows the total downloads of the app files (`.apk`, `.exe`, `.zip`) across all published releases, as counted by GitHub. It comes from the release request the page already makes and stays hidden if GitHub can't be reached. GitHub counts every download, including the in-app updater's, so it's downloads, not people. One request covers 100 releases; past that, `getReleases()` in `scripts/main.js` needs to request more pages.

## Changing the headers

`_headers` holds the Content-Security-Policy. If you add a new external resource (a font, image host, embed or API), add its origin to the matching directive, or the browser will block it. `npm test` reports any CSP violation.

## Turning off obfuscation

Change the `build` script in `package.json` to `node tools/build-dist.js --no-obfuscate`. The site still gets minification, hashed file names, the headers and verification.

## Rolling back

- **Quick:** in Netlify, go to Deploys, open the last deploy from before this change, and choose "Publish deploy".
- **In the repository:** `git revert <commit>` the commit that added this pipeline, then push. Without `netlify.toml`, Netlify goes back to the build settings in its UI. If that publish directory was set to `dist`, change it back to the repository root.
