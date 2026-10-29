import { chromium } from 'playwright';

const browser = await chromium.launch();
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await mobile.locator('.project-card').scrollIntoViewIfNeeded();
await mobile.waitForTimeout(1500);
const info = await mobile.evaluate(() => {
  const card = document.querySelector('.project-card');
  const img = document.querySelector('.project-media img');
  if (!card) return { card: 'MISSING' };
  const r = card.getBoundingClientRect();
  const cs = getComputedStyle(card);
  return {
    classes: card.className,
    rect: { top: Math.round(r.top), height: Math.round(r.height) },
    opacity: cs.opacity,
    display: cs.display,
    gridCols: cs.gridTemplateColumns,
    imgNatural: img ? `${img.naturalWidth}x${img.naturalHeight}` : 'no-img',
    imgDisplay: img ? getComputedStyle(img).display : '',
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
