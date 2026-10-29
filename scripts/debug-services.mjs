import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 768, height: 1024 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
const info = await page.evaluate(() => {
  const row = document.querySelector('.service-row');
  const cs = getComputedStyle(row);
  const kids = [...row.children].map((el) => {
    const r = el.getBoundingClientRect();
    const kcs = getComputedStyle(el);
    return {
      cls: el.className.split(' ')[0],
      x: Math.round(r.left), w: Math.round(r.width),
      colStart: kcs.gridColumnStart, colEnd: kcs.gridColumnEnd,
      display: kcs.display,
    };
  });
  return { cols: cs.gridTemplateColumns, gap: cs.gap, rowW: Math.round(row.getBoundingClientRect().width), kids };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
