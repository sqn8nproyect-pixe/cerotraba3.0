import { chromium } from 'playwright';

const browser = await chromium.launch();
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await mobile.locator('.project-card').scrollIntoViewIfNeeded();
await mobile.waitForTimeout(1500);
await mobile.screenshot({ path: 'scripts/verify-projects-mobile-card.png' });
// header check: no overlap with section when jumping via anchor
await mobile.locator('#proyectos').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
await mobile.waitForTimeout(600);
const overlap = await mobile.evaluate(() => {
  const heading = document.querySelector('#projects-title');
  const header = document.querySelector('.site-header');
  const h = header.getBoundingClientRect();
  const t = heading.getBoundingClientRect();
  return { headerBottom: h.bottom, headingTop: t.top, overlap: t.top < h.bottom };
});
console.log('anchor overlap check:', JSON.stringify(overlap));
await browser.close();
