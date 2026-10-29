import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
const cssInfo = await page.evaluate(() => {
  const results = [];
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; }
    const walk = (ruleList, media) => {
      for (const rule of ruleList) {
        if (rule.type === CSSRule.MEDIA_RULE) { walk(rule.cssRules, rule.conditionText); continue; }
        if (rule.selectorText && rule.selectorText.includes('project-card')) {
          results.push({ media: media || 'base', css: rule.style.cssText.slice(0, 120) });
        }
      }
    };
    walk(rules, null);
  }
  // also check service-detail as sanity: 820px block active?
  const sd = document.querySelector('.service-detail');
  return { projectCardRules: results, serviceDetailDisplay: sd ? getComputedStyle(sd).display : 'n/a' };
});
console.log(JSON.stringify(cssInfo, null, 2));
await browser.close();
