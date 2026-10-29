import { chromium } from 'playwright';

const browser = await chromium.launch();

const VIEWPORTS = [
  { w: 360, h: 740, name: 'm360' },
  { w: 390, h: 844, name: 'm390' },
  { w: 768, h: 1024, name: 't768' },
  { w: 1024, h: 768, name: 't1024' },
];

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Scroll through the whole page to trigger all reveals, then back to top
  await page.evaluate(async () => {
    const total = document.body.scrollHeight;
    for (let y = 0; y < total; y += 280) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 45));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);

  // Full page screenshot
  await page.screenshot({ path: `scripts/audit-${vp.name}.png`, fullPage: true });

  // Diagnostics: overflow, tap targets, form font-size, key element boxes
  const diag = await page.evaluate(() => {
    const doc = document.documentElement;
    const overflowX = doc.scrollWidth - doc.clientWidth;

    // find elements wider than viewport
    const wide = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > doc.clientWidth + 1 || r.left < -1)) {
        const cls = (el.className && typeof el.className === 'string') ? el.className.split(' ')[0] : el.tagName;
        if (wide.length < 6) wide.push(`${el.tagName.toLowerCase()}.${cls} L${Math.round(r.left)} R${Math.round(r.right)}`);
      }
    });

    // small tap targets among interactive elements (mobile only relevant)
    const smallTaps = [];
    document.querySelectorAll('a, button, input, select, textarea').forEach((el) => {
      const r = el.getBoundingClientRect();
      const visible = r.width > 0 && r.height > 0;
      if (visible && (r.height < 40 && r.width < 40)) {
        const cls = (el.className && typeof el.className === 'string') ? el.className.split(' ')[0] : '';
        if (smallTaps.length < 5) smallTaps.push(`${el.tagName.toLowerCase()}.${cls} ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
    });

    // form input font size (iOS zoom threshold 16px)
    const input = document.querySelector('.lead-form input');
    const inputFs = input ? getComputedStyle(input).fontSize : 'n/a';

    const heroH1 = document.querySelector('.hero h1');
    const heroSize = heroH1 ? getComputedStyle(heroH1).fontSize : 'n/a';

    return { overflowX, wide, smallTaps, inputFs, heroSize };
  });

  console.log(`--- ${vp.name} (${vp.w}x${vp.h}) ---`);
  console.log(JSON.stringify(diag, null, 1));
  await page.close();
}

await browser.close();
console.log('audit done');
