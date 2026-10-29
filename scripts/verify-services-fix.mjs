import { chromium } from 'playwright';

const browser = await chromium.launch();
async function shot(w, h, sel, path) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.locator(sel).first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.screenshot({ path });
  await page.close();
}
await shot(768, 1024, '.service-row:nth-child(2)', 'scripts/fix-t768-services.png');
await shot(390, 844, '.service-row:nth-child(2)', 'scripts/fix-m390-services.png');
await browser.close();
console.log('done');
