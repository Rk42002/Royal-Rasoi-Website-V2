/**
 * Minimal static file server for Railway / any PaaS.
 * Uses only Node built-ins — reads PORT from the environment.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 3000;
const ROOT = path.resolve(__dirname);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const cleaned = path.normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, "");
  const abs = path.join(ROOT, cleaned);
  if (!abs.startsWith(ROOT)) return null;
  return abs;
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
    return;
  }

  let rel = req.url === "/" ? "index.html" : req.url.replace(/^\//, "");
  const abs = safePath(rel);

  if (!abs) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Bad path");
    return;
  }

  fs.stat(abs, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }

    const ext = path.extname(abs).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type, "Cache-Control": "public, max-age=3600" });

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    fs.createReadStream(abs).pipe(res);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Static server at http://0.0.0.0:${PORT}/ (root: ${ROOT})`);
});
