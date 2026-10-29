import { chromium } from 'playwright';

const browser = await chromium.launch();
// Desktop
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desktop.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await desktop.locator('#proyectos').scrollIntoViewIfNeeded();
await desktop.waitForTimeout(1200);
await desktop.locator('#proyectos').screenshot({ path: 'scripts/verify-projects-desktop.png' });
// Mobile
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await mobile.locator('#proyectos').scrollIntoViewIfNeeded();
await mobile.waitForTimeout(1200);
await mobile.locator('#proyectos').screenshot({ path: 'scripts/verify-projects-mobile.png' });
await browser.close();
console.log('screenshots ok');
