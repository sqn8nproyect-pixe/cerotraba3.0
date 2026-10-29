import { chromium } from 'playwright';

const browser = await chromium.launch();

async function shot(w, h, scrollSel, path, name) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.locator(scrollSel).first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(1300);
  await page.screenshot({ path });
  await page.close();
  console.log('ok', name);
}

// Tablet 768: services row and project card
await shot(768, 1024, '.service-row:nth-child(2)', 'scripts/verify-t768-services.png', 't768 services');
await shot(768, 1024, '.project-card', 'scripts/verify-t768-project.png', 't768 project');
// Mobile 390: project card + form
await shot(390, 844, '.project-card', 'scripts/verify-m390-project.png', 'm390 project');
await shot(390, 844, '.lead-form', 'scripts/verify-m390-form.png', 'm390 form');
// Mobile menu open check
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.locator('.menu-toggle').click();
await page.waitForTimeout(600);
await page.screenshot({ path: 'scripts/verify-m390-menu.png' });
const menuH = await page.evaluate(() => document.querySelector('.mobile-menu').scrollHeight);
console.log('menu scrollHeight:', menuH, '(cap 420)');
await browser.close();
