import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files (index.html) - dynamically find the build output folder
  let staticPath = path.resolve(__dirname, "..", "dist");
  const possiblePaths = [
    path.resolve(__dirname, ".."), // relative to dist/server/index.js -> dist
    path.resolve(__dirname, "..", "dist"), // relative to server/index.ts -> dist
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(path.join(p, "index.html"))) {
      staticPath = p;
      break;
    }
  }

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
