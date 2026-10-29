import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1.5,
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  locale: "es-CL",
});

const page = await ctx.newPage();
for (const wait of ["load", "domcontentloaded", "commit"]) {
  try {
    const resp = await page.goto("https://www.funerariasangabriel.cl/", {
      waitUntil: wait,
      timeout: 90000,
    });
    console.log("goto OK con:", wait, "status:", resp?.status());
    await page.waitForTimeout(10000);
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);
    await page.screenshot({ path: "shots/cliente-sangabriel.png", clip: { x: 0, y: 0, width: 1280, height: 800 } });
    console.log("SCREENSHOT OK");
    break;
  } catch (err) {
    console.log(`Intento con ${wait} falló:`, String(err).slice(0, 100));
  }
}
await browser.close();
