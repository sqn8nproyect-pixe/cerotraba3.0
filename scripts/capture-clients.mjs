import { chromium } from "playwright";

const targets = [
  { url: "https://sepulturasenoferta.cl", file: "shots/cliente-sepulturas.png" },
  { url: "https://www.funerariasangabriel.cl/", file: "shots/cliente-sangabriel.png" },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1.5,
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  locale: "es-CL",
});

for (const t of targets) {
  const page = await ctx.newPage();
  try {
    await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(6000); // deja cargar fuentes/imágenes perezosas
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    await page.screenshot({ path: t.file, clip: { x: 0, y: 0, width: 1280, height: 800 } });
    console.log("OK:", t.url);
  } catch (err) {
    console.log("FALLO:", t.url, String(err).slice(0, 120));
  }
  await page.close();
}
await browser.close();
