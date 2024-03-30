import express from "express";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();

const vite = await createViteServer({
  server: {
    middlewareMode: true,
  },
  appType: "custom",
});

app.use(vite.middlewares);

app.use("*", async (req, res) => {
  const url = req.originalUrl;

  try {
    let template = fs.readFileSync("./index.html", "utf-8");
    template = await vite.transformIndexHtml(url, template);

    const { render } = await vite.ssrLoadModule("./src/entry-server.tsx");

    const { appHtml, serializedStoreData } = await render(url);

    let html = template.replace(`<!--ssr-outlet-->`, appHtml);

    html = html.replace(
      `<!--store-data-outlet-->`,
      `<script id="__STORE_DATA__" type="application/json">${serializedStoreData}</script>`,
    );

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite.ssrFixStacktrace(e);
    res.status(500).end(e.stack);
  }
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is listening on http://localhost:${process.env.SERVER_PORT}`,
  );
});
