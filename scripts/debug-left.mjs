import { chromium } from "playwright";

const browser = await chromium.launch();
const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000/#clientes", { waitUntil: "networkidle" });
await p.waitForTimeout(1200);
const info = await p.evaluate(() => {
  const sec = document.querySelector(".clients-section").getBoundingClientRect();
  const intro = document.querySelector(".clients-section .projects-intro").getBoundingClientRect();
  const h2 = document.querySelector(".clients-section h2").getBoundingClientRect();
  const card = document.querySelector(".client-card").getBoundingClientRect();
  const projSec = document.querySelector(".projects-section").getBoundingClientRect();
  const projH2 = document.querySelector(".projects-section h2").getBoundingClientRect();
  return {
    sectionLeft: Math.round(sec.left),
    introLeft: Math.round(intro.left),
    h2Left: Math.round(h2.left),
    cardLeft: Math.round(card.left),
    projSectionLeft: Math.round(projSec.left),
    projH2Left: Math.round(projH2.left),
  };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
