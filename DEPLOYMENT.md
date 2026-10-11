# Building and deploying

The site's sources (HTML pages, `scripts/main.js`, `style/main.css`, `assets/`) stay readable in this repository. Netlify builds a production copy into `dist/` and publishes only that folder.

## Commands

| Command | What it does |
| --- | --- |
| `npm ci` | Installs the pinned build tools |
| `npm run build` | Builds `dist/`: minified + obfuscated script, minified stylesheet, content-hashed file names, pages and assets |
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

## Changing the headers

`_headers` holds the Content-Security-Policy. If you add a new external resource (a font, image host, embed or API), add its origin to the matching directive, or the browser will block it. `npm test` reports any CSP violation.

## Turning off obfuscation

Change the `build` script in `package.json` to `node tools/build-dist.js --no-obfuscate`. The site still gets minification, hashed file names, the headers and verification.

## Rolling back

- **Quick:** in Netlify, go to Deploys, open the last deploy from before this change, and choose "Publish deploy".
- **In the repository:** `git revert <commit>` the commit that added this pipeline, then push. Without `netlify.toml`, Netlify goes back to the build settings in its UI. If that publish directory was set to `dist`, change it back to the repository root.
