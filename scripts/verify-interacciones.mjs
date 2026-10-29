import { chromium } from "playwright";

/**
 * Verificación de micro-interacciones, animación interactiva e Instagram.
 * - Tarjetas de servicio: clic -> formulario con servicio preseleccionado
 * - Escenario "Menos tareas sueltas": typewriter, paquetes, surge al clic, tilt
 * - Footer: Instagram @cerotraba + WhatsApp
 * - JSON-LD: sameAs con Instagram
 */

const BASE = process.env.BASE_URL || "http://localhost:3000";
const shots = "/home/z/my-project/shots";
const results = [];
let page;
let context;

function check(name, ok, detail = "") {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

async function steppedScroll(targetY) {
  await page.evaluate(async (maxY) => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let y = 0; y <= maxY; y += 500) {
      window.scrollTo(0, y);
      await sleep(60);
    }
    window.scrollTo(0, maxY);
  }, targetY);
  await page.waitForTimeout(900);
}

async function overflowCheck(width, height, label) {
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(500);
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let y = 0; y <= document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await sleep(50);
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  check(`Sin overflow horizontal ${label}`, overflow <= 1, `exceso: ${overflow}px`);
}

const browser = await chromium.launch();
try {
  context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(String(err)));

  await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 60000 });

  // ---------- 1. Instagram en el footer ----------
  const ig = page.locator('.footer-social a[href*="instagram.com/cerotraba"]');
  check("Footer: enlace a Instagram @cerotraba", (await ig.count()) === 1);
  const igHref = (await ig.count()) ? await ig.getAttribute("href") : "";
  check(
    "Footer: Instagram href limpio (sin utm)",
    igHref === "https://www.instagram.com/cerotraba",
    igHref
  );
  check(
    "Footer: aria-label de Instagram",
    (await ig.count()) === 1 && (await ig.getAttribute("aria-label")).includes("Instagram"),
  );
  const wa = page.locator('.footer-social a[href*="wa.me/584220117206"]');
  check("Footer: enlace a WhatsApp junto a Instagram", (await wa.count()) === 1);

  // ---------- 2. JSON-LD con Instagram ----------
  const jsonld = await page.evaluate(() => {
    const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
    for (const s of scripts) {
      try {
        const data = JSON.parse(s.textContent);
        if (data["@type"] === "ProfessionalService") return data;
      } catch {}
    }
    return null;
  });
  check("JSON-LD ProfessionalService presente", !!jsonld);
  check(
    "JSON-LD sameAs incluye Instagram",
    !!jsonld && Array.isArray(jsonld.sameAs) && jsonld.sameAs.some((u) => u.includes("instagram.com/cerotraba")),
    jsonld ? JSON.stringify(jsonld.sameAs) : "sin json-ld",
  );

  // ---------- 3. Escenario interactivo ----------
  const stage = page.locator(".interface-stage-inner");
  check("Escenario interactivo presente", (await stage.count()) === 1);

  // Paquetes de datos
  check("Paquetes de datos en la línea de flujo (3)", (await page.locator(".flow-packet").count()) === 3);

  // Typewriter: el texto del titular cambia solo
  await page.locator("#proceso").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const titleBefore = await page.locator(".screen-title").innerText();
  await page.waitForTimeout(3500);
  const titleAfter = await page.locator(".screen-title").innerText();
  check(
    "Typewriter: el titular de la pantalla cambia con el tiempo",
    titleBefore !== titleAfter,
    `"${titleBefore.replace(/\s+/g, " ").trim()}" -> "${titleAfter.replace(/\s+/g, " ").trim()}"`,
  );

  // Tilt con el cursor (viewport desktop, puntero fino)
  const stageBox = await stage.boundingBox();
  if (stageBox) {
    await page.mouse.move(stageBox.x + stageBox.width * 0.75, stageBox.y + stageBox.height * 0.3, { steps: 8 });
    await page.waitForTimeout(350);
    const tilting = await page.locator(".product-screen.is-tilting").count();
    const inlineTransform = await page.locator(".product-screen").evaluate((el) => el.style.transform || "");
    check("Tilt 3D activo al mover el cursor", tilting === 1 && inlineTransform.includes("rotateY"), inlineTransform.slice(0, 60));
    await page.screenshot({ path: `${shots}/interaccion-tilt.png`, clip: stageBox });
  } else {
    check("Tilt 3D activo al mover el cursor", false, "escenario sin boundingBox");
  }

  // Clic -> surge + burst + status
  await stage.click({ position: { x: 120, y: 80 } });
  await page.waitForTimeout(250);
  const surging = await page.locator(".interface-stage-inner.is-surging").count();
  const burst = await page.locator(".click-burst").count();
  const status = await page.locator(".screen-status").innerText();
  check("Clic: clase is-surging activada", surging === 1);
  check("Clic: onda expansiva (.click-burst) visible", burst >= 1);
  check('Clic: estado cambia a "Flujo activado"', status.includes("Flujo activado"), status.trim());
  const stageBox2 = await stage.boundingBox();
  if (stageBox2) await page.screenshot({ path: `${shots}/interaccion-surge.png`, clip: stageBox2 });
  await page.waitForTimeout(1400);
  const statusCalm = await page.locator(".screen-status").innerText();
  check("Surge se apaga solo tras ~1.1s", statusCalm.includes("Todo en marcha"), statusCalm.trim());

  // Hint visible
  check("Hint de interacción visible", (await page.locator(".stage-hint").count()) === 1);

  // ---------- 4. Tarjeta de servicio -> formulario preseleccionado ----------
  const card = page.locator(".service-row").nth(0); // Automatizaciones inteligentes
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await card.click();
  await page.waitForTimeout(900);
  const selectValue = await page.locator('.lead-form select[name="need"]').inputValue();
  const hintText = (await page.locator(".form-hint").count())
    ? await page.locator(".form-hint").innerText()
    : "";
  check(
    "Clic en tarjeta: select del formulario preseleccionado",
    selectValue === "Automatizaciones",
    `valor: "${selectValue}"`,
  );
  check("Clic en tarjeta: hint de consulta visible", hintText.includes("Automatizaciones"), hintText.trim());
  const inView = await page.evaluate(() => {
    const el = document.getElementById("contacto");
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.top >= -80 && r.top < window.innerHeight;
  });
  check("Clic en tarjeta: scroll automático al formulario", inView);

  // ---------- 5. Overflow responsive ----------
  await overflowCheck(1440, 900, "1440px");
  await overflowCheck(768, 900, "768px");
  await overflowCheck(390, 844, "390px");

  // Captura móvil de la sección showcase
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const el = document.getElementById("proceso");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      for (let y = 0; y <= top; y += 400) {
        window.scrollTo(0, y);
        await sleep(50);
      }
      window.scrollTo(0, top - 40);
    }
  });
  await page.waitForTimeout(900);
  const mobBox = await page.locator(".interface-stage").boundingBox();
  if (mobBox) await page.screenshot({ path: `${shots}/interaccion-movil.png`, clip: mobBox });

  // Footer desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(900);
  const footBox = await page.locator(".site-footer").boundingBox();
  if (footBox) await page.screenshot({ path: `${shots}/footer-instagram.png`, clip: footBox });

  check("Sin errores de consola", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" | "));
} catch (err) {
  check("Script completo sin excepciones", false, String(err).slice(0, 300));
} finally {
  await browser?.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\nResultado: ${results.length - failed.length}/${results.length} PASS`);
if (failed.length) {
  console.log("FALLARON:");
  failed.forEach((f) => console.log(` - ${f.name}: ${f.detail}`));
  process.exit(1);
}
