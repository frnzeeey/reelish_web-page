// Serves a built site locally with the response headers from its _headers
// file, so the Content-Security-Policy can be tested before deploying.
//
//   node tools/serve-dist.js [dir] [port]      defaults: dist 8080

const fs = require("fs");
const http = require("http");
const path = require("path");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

// Netlify _headers format: an unindented path pattern followed by indented "Name: value" lines.
function readHeaderRules(dir) {
  const file = path.join(dir, "_headers");
  if (!fs.existsSync(file)) return [];
  const rules = [];
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      const pattern = new RegExp(`^${line.trim().replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`);
      rules.push({ pattern, headers: {} });
    } else if (rules.length) {
      const [, name, value] = line.trim().match(/^([^:]+):\s*(.*)$/);
      rules[rules.length - 1].headers[name] = value;
    }
  }
  return rules;
}

function createServer(dir) {
  const root = path.resolve(dir);
  const rules = readHeaderRules(root);

  return http.createServer((request, response) => {
    let urlPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (urlPath.endsWith("/")) urlPath += "index.html";
    const file = path.join(root, urlPath);
    const headers = {};
    rules.filter((rule) => rule.pattern.test(urlPath)).forEach((rule) => Object.assign(headers, rule.headers));

    if (!file.startsWith(root) || path.basename(file) === "_headers" || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      response.writeHead(404, { ...headers, "Content-Type": "text/plain" });
      response.end("Not found");
      return;
    }
    response.writeHead(200, { ...headers, "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(response);
  });
}

module.exports = { createServer };

if (require.main === module) {
  const dir = process.argv[2] || path.join(__dirname, "..", "dist");
  const port = Number(process.argv[3] || 8080);
  createServer(dir).listen(port, () => console.log(`Serving ${dir} at http://localhost:${port}/`));
}
