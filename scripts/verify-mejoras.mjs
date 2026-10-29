import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3000";
const OUT = "shots/mejoras";
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

await page.goto(BASE, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);

// ---------- 1. Micro-interacciones en servicios ----------
const rows = await page.$$(".service-row");
log(rows.length === 8, "8 filas de servicio clicables", `encontradas: ${rows.length}`);

// hover: la fila cambia el fondo y la flecha toma acento
const row0 = rows[0];
const bgBefore = await row0.evaluate((el) => getComputedStyle(el).backgroundImage);
await row0.hover();
await page.waitForTimeout(400);
const bgAfter = await row0.evaluate((el) => getComputedStyle(el).backgroundImage);
log(bgBefore !== bgAfter, "Hover cambia el fondo de la fila");
const linkBg = await row0.$eval(".service-link", (el) => getComputedStyle(el).backgroundImage);
log(linkBg.includes("gradient"), "Flecha con acento en hover");

// clic en "Automatizaciones inteligentes" → scroll al formulario + select preseleccionado
await row0.click();
await page.waitForTimeout(1400);
const selectValue = await page.$eval("select[name='need']", (el) => el.value);
log(selectValue === "Automatizaciones", "Select preseleccionado tras clic", `valor="${selectValue}"`);
const hint = await page.$(".form-hint");
log(!!hint && hint.textContent().then ? (await hint.textContent()).includes("Automatizaciones") : false, "Hint de consulta visible");
const contactTop = await page.evaluate(() => {
  const rect = document.getElementById("contacto").getBoundingClientRect();
  return rect.top;
});
log(contactTop > -400 && contactTop < 500, "Página hizo scroll hasta #contacto", `top=${Math.round(contactTop)}px`);
await page.screenshot({ path: `${OUT}/form-preseleccionado.png` });

// clic en CCTV fila 2
await page.evaluate(() => document.getElementById("servicios").scrollIntoView());
await page.waitForTimeout(300);
await rows[1].click();
await page.waitForTimeout(1200);
const selectValue2 = await page.$eval("select[name='need']", (el) => el.value);
log(selectValue2 === "CCTV y seguridad", "Cambio a CCTV también preselecciona", `valor="${selectValue2}"`);

// ---------- 2. JSON-LD ProfessionalService ----------
const ldJson = await page.$$eval("script[type='application/ld+json']", (scripts) =>
  scripts.map((s) => JSON.parse(s.textContent))
);
const business = ldJson.find((obj) => obj["@type"] === "ProfessionalService");
log(!!business, "JSON-LD ProfessionalService presente");
log(business?.address?.addressLocality === "Los Teques", "Dirección: Los Teques, Miranda", JSON.stringify(business?.address));
log(Array.isArray(business?.areaServed) && business.areaServed.some((a) => a.name === "Chile"), "areaServed incluye Chile e internacional", business?.areaServed?.map((a) => a.name).join(", "));
log(business?.taxID === "J-508830466", "taxID (RIF) en JSON-LD", business?.taxID);
log(!!business?.geo, "GeoCoordinates presentes");
log(!!business?.logo, "Logo en JSON-LD");
log(Array.isArray(business?.hasOfferCatalog?.itemListElement) && business.hasOfferCatalog.itemListElement.length === 8, "Catálogo con 8 servicios");

// ---------- 3. next/image optimizado ----------
await page.evaluate(async () => {
  const step = 600;
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 50));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(800);
const imgReport = await page.$$eval("img", (imgs) => ({
  total: imgs.length,
  optimizadas: imgs.filter((i) => i.src.includes("/_next/image")).length,
  conSrcset: imgs.filter((i) => i.srcset.length > 0).length,
  rotas: imgs.filter((i) => i.naturalWidth === 0 && i.getAttribute("loading") !== "lazy").length,
}));
log(imgReport.total > 0 && imgReport.optimizadas === imgReport.total, "Todas las imágenes vía /_next/image (WebP/AVIF)", JSON.stringify(imgReport));
log(imgReport.conSrcset >= 8, "srcset responsive presente", `${imgReport.conSrcset}/${imgReport.total}`);

// overflow en 3 vistas
for (const [w, name] of [[1440, "desktop"], [768, "tablet"], [390, "movil"]]) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.waitForTimeout(300);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  log(overflow <= 0, `Landing sin overflow @${name}`, `delta=${overflow}px`);
}

// ---------- 4. RIF en footer y /nosotros ----------
await page.setViewportSize({ width: 1440, height: 900 });
const footerRif = await page.$(".footer-rif");
log(!!footerRif && (await footerRif.textContent()).includes("J-508830466"), "Sello RIF en footer");
const footerBox = await footerRif?.boundingBox();
if (footerBox) {
  await page.evaluate((y) => window.scrollTo(0, y), footerBox.y - 700);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/footer-rif.png` });
}

await page.goto(`${BASE}/nosotros`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);
const seal = await page.$(".rif-seal");
log(!!seal && (await seal.textContent()).includes("J-508830466"), "Sello RIF en /nosotros");
const sealBox = await seal?.boundingBox();
if (sealBox) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/nosotros-rif-seal.png` });
}

// ---------- 5. Blog con next/image ----------
await page.goto(`${BASE}/blog`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1800);
await page.evaluate(async () => {
  const step = 500;
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1200);
let blogImgs;
for (let attempt = 0; attempt < 6; attempt++) {
  blogImgs = await page.$$eval("img", (imgs) => ({
    total: imgs.length,
    optimizadas: imgs.filter((i) => i.src.includes("/_next/image")).length,
    rotas: imgs.filter((i) => i.naturalWidth === 0 && i.complete).length,
  }));
  if (blogImgs.rotas === 0) break;
  await page.waitForTimeout(1500);
}
log(blogImgs.total > 0 && blogImgs.optimizadas === blogImgs.total && blogImgs.rotas === 0, "Blog: imágenes optimizadas y sin rotas", JSON.stringify(blogImgs));

log(consoleErrors.length === 0, "Sin errores de consola", consoleErrors.slice(0, 3).join(" | "));

await browser.close();
console.log(results.join("\n"));
