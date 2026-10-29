import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const browser = await chromium.launch();
const errors = [];

// 1. Sección clientes desktop completa
const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
d.on("pageerror", (e) => errors.push("desktop: " + String(e).slice(0, 150)));
await d.goto(BASE + "/#clientes", { waitUntil: "networkidle" });
await d.waitForTimeout(1000);
await d.evaluate(() => {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
});
await d.waitForTimeout(300);
const section = d.locator(".clients-section");
await section.screenshot({ path: "shots/clientes-desktop.png" });
console.log("desktop section capturada");

// 2. Nav a 1060px con 8 enlaces (¿overflow?)
const n = await browser.newPage({ viewport: { width: 1060, height: 700 } });
await n.goto(BASE + "/", { waitUntil: "networkidle" });
await n.waitForTimeout(500);
const navInfo = await n.evaluate(() => {
  const nav = document.querySelector(".desktop-nav");
  const wrap = document.querySelector(".nav-wrap");
  return {
    navRight: Math.round(nav.getBoundingClientRect().right),
    ctaLeft: Math.round(document.querySelector(".nav-cta").getBoundingClientRect().left),
    wrapRight: Math.round(wrap.getBoundingClientRect().right),
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
});
console.log("nav@1060:", JSON.stringify(navInfo), navInfo.ctaLeft - navInfo.navRight >= 8 ? "SIN COLISIÓN ✓" : "¡COLISIÓN!");
await n.screenshot({ path: "shots/nav-1060.png", clip: { x: 0, y: 0, width: 1060, height: 80 } });

// 3. Móvil 390px: sección clientes + página completa sin overflow
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
m.on("pageerror", (e) => errors.push("movil: " + String(e).slice(0, 150)));
await m.goto(BASE + "/", { waitUntil: "networkidle" });
await m.waitForTimeout(900);
await m.evaluate(() => {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  document.querySelector("#clientes").scrollIntoView();
});
await m.waitForTimeout(400);
const overflowM = await m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
console.log("móvil overflowX:", overflowM + "px", overflowM === 0 ? "✓" : "¡OVERFLOW!");
await m.locator(".clients-section").screenshot({ path: "shots/clientes-movil.png" });

// 4. Tablet 768px
const t = await browser.newPage({ viewport: { width: 768, height: 1024 } });
await t.goto(BASE + "/#clientes", { waitUntil: "networkidle" });
await t.waitForTimeout(800);
await t.evaluate(() => {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
});
await t.waitForTimeout(300);
const overflowT = await t.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
console.log("tablet overflowX:", overflowT + "px", overflowT === 0 ? "✓" : "¡OVERFLOW!");
await t.locator(".clients-section").screenshot({ path: "shots/clientes-tablet.png" });

// 5. Enlaces externos correctos
const links = await d.evaluate(() =>
  Array.from(document.querySelectorAll(".client-card a.client-link")).map((a) => a.href)
);
console.log("links clientes:", links.join(" | "));

await browser.close();
console.log("Errores:", errors.length ? errors.join("\n") : "NINGUNO ✓");
