import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (err) => errors.push(String(err).slice(0, 200)));

await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(600);

// 1. FAQ: abrir el segundo ítem
const faqButtons = page.locator(".faq-item button");
await faqButtons.nth(1).click();
await page.waitForTimeout(300);
const faqOpen = await faqButtons.nth(1).getAttribute("aria-expanded");
console.log("FAQ toggle:", faqOpen === "true" ? "OK" : "FALLO");

// 2. Testimonios: botón siguiente
await page.locator(".testimonial-controls button").nth(1).click();
await page.waitForTimeout(200);
const activeIdx = await page.locator(".testimonial-index-active").textContent();
console.log("Testimonio siguiente:", activeIdx === "02" ? "OK" : `FALLO (${activeIdx})`);

// 3. Formulario: enviar lead de prueba
await page.fill('input[name="name"]', "Prueba Responsive");
await page.fill('input[name="phone"]', "04141234567");
await page.fill('input[name="email"]', "prueba@cerotraba.io");
await page.selectOption('select[name="need"]', "Soporte técnico");
await page.fill('textarea[name="message"]', "Mensaje de prueba post-refactor.");
await page.click(".form-submit");
await page.waitForSelector(".form-success", { timeout: 10000 });
console.log("Formulario guarda lead:", "OK");

// 4. Header -> Blog: navega y el artículo abre
await page.click('.desktop-nav a[href="/blog"]');
await page.waitForURL("**/blog", { timeout: 10000 });
await page.waitForTimeout(1200);
await page.waitForTimeout(400);
const blogTitle = await page.locator("h1").first().textContent();
console.log("Navegación a /blog:", blogTitle?.includes("Ideas claras") ? "OK" : `FALLO (${blogTitle})`);

// 5. Tarjeta destacada -> artículo
await page.click(".blog-featured");
await page.waitForURL("**/blog/**", { timeout: 10000 });
await page.waitForTimeout(1200);
console.log("Artículo abre desde tarjeta:", "OK");

// 6. Footer -> Privacidad
await page.click('.footer-nav a[href="/privacidad"]');
await page.waitForURL("**/privacidad", { timeout: 10000 });
await page.waitForTimeout(1200);
const privTitle = await page.locator("h1").first().textContent();
console.log("Footer -> /privacidad:", privTitle?.includes("privacidad") ? "OK" : `FALLO (${privTitle})`);

// 7. Brand -> volver a inicio
await page.click(".brand");
await page.waitForURL(BASE + "/", { timeout: 10000 });
console.log("Brand vuelve a inicio:", "OK");

// 8. Menú móvil: links y cierre
const mp = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mp.goto(BASE + "/nosotros", { waitUntil: "networkidle" });
await mp.click(".menu-toggle");
await mp.waitForTimeout(350);
await mp.click('.mobile-menu a[href="/#planes"]');
await mp.waitForTimeout(900);
const url = mp.url();
console.log("Menú móvil navega a /#planes:", url.endsWith("/#planes") ? "OK" : `FALLO (${url})`);

await browser.close();
console.log("\nErrores pageerror:", errors.length ? errors.join("\n") : "NINGUNO ✓");
