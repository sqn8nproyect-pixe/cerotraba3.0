import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const shots = [
  { path: "/nosotros", name: "nosotros" },
  { path: "/blog", name: "blog" },
  { path: "/blog/cctv-antes-de-comprar-camaras", name: "blog-post" },
  { path: "/privacidad", name: "privacidad" },
];

const viewports = [
  { w: 1440, h: 900, tag: "desktop" },
  { w: 768, h: 1024, tag: "tablet" },
  { w: 390, h: 844, tag: "movil" },
];

const browser = await chromium.launch();
const errors = [];

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[${vp.tag}] console: ${msg.text().slice(0, 160)}`);
  });
  page.on("pageerror", (err) => errors.push(`[${vp.tag}] pageerror: ${String(err).slice(0, 160)}`));

  for (const s of shots) {
    await page.goto(BASE + s.path, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    // revelar animaciones para la captura completa
    await page.evaluate(() => {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    });
    await page.waitForTimeout(250);
    await page.screenshot({ path: `shots/${vp.tag}-${s.name}-full.png`, fullPage: true });
    const h = await page.evaluate(() => document.body.scrollHeight);
    // detectar overflow horizontal
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    console.log(`${vp.tag} ${s.path}: alto=${h}px overflowX=${overflow}px`);
  }
  await page.close();
}

// Captura del header de la landing (nav con 7 enlaces) a 1100px de ancho
const page2 = await browser.newPage({ viewport: { width: 1100, height: 800 } });
await page2.goto(BASE + "/", { waitUntil: "networkidle" });
await page2.waitForTimeout(400);
await page2.screenshot({ path: "shots/landing-header-1100.png", clip: { x: 0, y: 0, width: 1100, height: 90 } });

// menú móvil abierto en la página blog
const page3 = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page3.goto(BASE + "/blog", { waitUntil: "networkidle" });
await page3.click(".menu-toggle");
await page3.waitForTimeout(400);
await page3.screenshot({ path: "shots/movil-menu-abierto.png" });

await browser.close();
console.log("\nErrores de consola:", errors.length ? errors.join("\n") : "NINGUNO ✓");
console.log("Capturas guardadas en shots/");
