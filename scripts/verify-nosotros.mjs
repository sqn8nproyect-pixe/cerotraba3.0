import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3000";
const OUT = "shots/nosotros";
mkdirSync(OUT, { recursive: true });

const results = [];
const log = (ok, label, extra = "") => {
  results.push(`${ok ? "PASS" : "FAIL"} · ${label}${extra ? ` — ${extra}` : ""}`);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(String(err)));

await page.goto(`${BASE}/nosotros`, { waitUntil: "networkidle" });

// 1. Contenido clave visible
for (const text of [
  "Local, nacional e internacional.",
  "Clientes consolidados y proyectos en marcha.",
  "Nacidos en Los Teques, probados en dos países.",
  "Proyectos ya en marcha",
  "Conecta-Lt",
  "Sepulturas en Oferta",
  "Funeraria San Gabriel",
]) {
  const count = await page.getByText(text, { exact: false }).count();
  log(count > 0, `Texto visible: "${text}"`);
}

// 2. Enlaces externos correctos
const expectedLinks = [
  "https://conectalt.com",
  "https://sepulturasenoferta.cl",
  "https://www.funerariasangabriel.cl/",
];
for (const href of expectedLinks) {
  const el = await page.$(`a[href="${href}"]`);
  log(!!el, `Enlace presente: ${href}`);
}

// 3. Imágenes de clientes cargan (naturalWidth > 0)
const imgs = await page.$$eval(".client-media img", (els) =>
  els.map((img) => ({ src: img.getAttribute("src"), ok: img.naturalWidth > 0 }))
);
log(imgs.length === 3, "3 imágenes de tarjetas", JSON.stringify(imgs.map((i) => i.src)));
log(imgs.every((i) => i.ok), "Todas las imágenes cargan");

// 4. Overflow horizontal en 3 viewports
for (const [w, h, name] of [
  [1440, 900, "desktop"],
  [768, 1024, "tablet"],
  [390, 844, "movil"],
]) {
  await page.setViewportSize({ width: w, height: h });
  await page.waitForTimeout(350);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  log(overflow <= 0, `Sin overflow horizontal @${name}`, `delta=${overflow}px`);
}

// 5. Capturas (desktop completo, tablet sección alcance, móvil tarjetas)
await page.setViewportSize({ width: 1440, height: 900 });
await page.waitForTimeout(500);
// forzar visibilidad de reveals para la captura completa
await page.evaluate(async () => {
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise((r) => setTimeout(r, 400));
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 400));
});
await page.screenshot({ path: `${OUT}/nosotros-desktop-full.png`, fullPage: true });

const reach = await page.$(".about-reach");
if (reach) await reach.screenshot({ path: `${OUT}/reach-desktop.png` });
const proof = await page.$(".clients-section");
if (proof) await proof.screenshot({ path: `${OUT}/proof-desktop.png` });

await page.setViewportSize({ width: 768, height: 1024 });
await page.waitForTimeout(400);
await page.evaluate(async () => {
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise((r) => setTimeout(r, 400));
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 300));
});
await page.screenshot({ path: `${OUT}/nosotros-tablet-full.png`, fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(400);
await page.evaluate(async () => {
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise((r) => setTimeout(r, 400));
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 300));
});
await page.screenshot({ path: `${OUT}/nosotros-movil-full.png`, fullPage: true });

log(consoleErrors.length === 0, "Sin errores de consola", consoleErrors.slice(0, 3).join(" | "));

// 6. Revelado por pasos + verificación de opacidad de las secciones nuevas
await page.evaluate(async () => {
  const step = 500;
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
});
await page.waitForTimeout(900);
const opacities = await page.$$eval(
  [".about-reach .reveal", ".clients-section .reveal"].join(","),
  (els) => els.map((el) => getComputedStyle(el).opacity)
);
log(opacities.length > 0 && opacities.every((o) => o === "1"), "Todos los reveals visibles tras scroll", `${opacities.length} elementos`);
await page.setViewportSize({ width: 1440, height: 900 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);

await page.screenshot({ path: `${OUT}/nosotros-desktop-full.png`, fullPage: true });
const reach2 = await page.$(".about-reach");
if (reach2) await reach2.screenshot({ path: `${OUT}/reach-desktop.png` });
const proof2 = await page.$(".clients-section");
if (proof2) await proof2.screenshot({ path: `${OUT}/proof-desktop.png` });

await browser.close();
console.log(results.join("\n"));
