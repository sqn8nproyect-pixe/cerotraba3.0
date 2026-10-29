import type { Metadata } from "next";
import WhatsAppButton from "@/components/whatsapp-button";
import { RevealObserver, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { siteConfig } from "@/lib/site-config";

const SITE_TITLE = "Quiénes somos — CeroTraba";
const SITE_DESCRIPTION =
  "Conoce a CeroTraba: el equipo de Los Teques, Venezuela que quita las trabas tecnológicas de tu negocio con automatizaciones, CCTV, redes y páginas web.";

const values = [
  {
    number: "01",
    title: "Claridad antes que jerga",
    text: "Explicamos cada propuesta en lenguaje que puedas repetirle a tu socio. Si una solución no se puede explicar simple, no está bien pensada todavía.",
  },
  {
    number: "02",
    title: "Diagnóstico antes que propuesta",
    text: "Nunca recomendamos antes de entender. Conocemos tu operación, tus equipos y tus procesos reales para proponer lo que necesitas, no lo que tenemos en inventario.",
  },
  {
    number: "03",
    title: "Soluciones a la medida",
    text: "Nada de paquetes inflados con funciones que nunca vas a usar. Cada proyecto se dimensiona según tu momento, tu prioridad y tu presupuesto.",
  },
  {
    number: "04",
    title: "Compromiso después de la instalación",
    text: "Entregar el proyecto es la mitad del trabajo. Nos quedamos cerca: mantenimiento, soporte y respuestas rápidas cuando algo necesita atención.",
  },
  {
    number: "05",
    title: "Transparencia en costos y alcances",
    text: "Presupuestos claros, alcances por escrito y avisos oportunos si algo cambia. Las sorpresas desagradables no deberían venir de tu proveedor de tecnología.",
  },
  {
    number: "06",
    title: "Mejora continua",
    text: "La tecnología cambia rápido y nosotros también. Formación constante para que lo que instalemos hoy siga siendo la mejor decisión el próximo año.",
  },
];

const steps = [
  {
    number: "01",
    title: "Conversamos",
    text: "Escuchamos tu necesidad sin tecnicismos y sin compromiso. Queremos entender el problema, no vender el primer servicio que se nos ocurra.",
  },
  {
    number: "02",
    title: "Diagnosticamos",
    text: "Revisamos tu espacio, tus equipos y tus procesos. Identificamos la causa real del problema, no solo el síntoma que se ve a simple vista.",
  },
  {
    number: "03",
    title: "Implementamos",
    text: "Ejecutamos con equipos adecuados y trabajo ordenado, cuidando tu operación para que el negocio siga funcionando mientras trabajamos.",
  },
  {
    number: "04",
    title: "Acompañamos",
    text: "Capacitamos a tu equipo, dejamos todo documentado y mantenemos contacto. Un sistema que nadie sabe usar es un sistema que falla.",
  },
];

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/nosotros",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "CeroTraba",
    type: "website",
    locale: "es_VE",
    url: "/nosotros",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function NosotrosPage() {
  return (
    <main className="site-shell cerotaba">
      <SiteHeader prefix="/" active="nosotros" />

      <section className="page-hero">
        <div className="page-width">
          <p className="eyebrow">Quiénes somos</p>
          <h1>Somos el equipo que le quita las trabas a tu tecnología.</h1>
          <p className="page-lead">
            CeroTraba nació en Los Teques con una convicción simple: la tecnología debe empujar tu negocio hacia
            adelante, no frenarlo. Y cuando algo se traba, lo arreglamos.
          </p>
        </div>
      </section>

      <section className="about-story page-width" aria-labelledby="story-title">
        <div className="about-story-grid">
          <div className="about-story-copy reveal">
            <p className="eyebrow">Nuestra historia</p>
            <h2 id="story-title">De Los Teques, para los negocios de Venezuela.</h2>
            <p>
              CeroTraba nació en Los Teques, estado Miranda, después de años de ver el mismo patrón repetirse: negocios
              serios, con buen producto y clientes fieles, frenados por tecnología que no funciona. Cámaras que grababan
              mal, redes que se caían a la hora pico, computadoras lentas que hacían esperar al cliente, procesos que se
              resolvían con papel y memoria.
            </p>
            <p>
              Decidimos construir una empresa distinta: un equipo que combina técnicos de redes y seguridad con
              desarrolladores y diseñadores, para resolver la tecnología de un negocio de punta a punta. Esa mezcla es
              nuestra ventaja: entendemos tanto el cable que corre por el techo como el software que corre en la
              pantalla, y sabemos que la mayoría de los problemas están justamente en la unión de los dos mundos.
            </p>
            <p>
              Hoy acompañamos a empresas, profesionales y equipos en crecimiento de toda Venezuela, con servicios que van
              desde CCTV y cableado estructurado hasta automatizaciones y páginas web. Pero el criterio con el que
              empezamos sigue siendo el mismo: la tecnología se adapta a tu operación, nunca al revés.
            </p>
          </div>
          <div className="about-facts reveal">
            <div className="about-fact">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3 20 6v5c0 5.3-3.4 8.6-8 10-4.6-1.4-8-4.7-8-10V6z" />
                <path d="m8.5 12 2.2 2.2 4.8-5" />
              </svg>
              <div>
                <strong>Tecnología sin trabas</strong>
                <p>Nuestro eslogan es también nuestra forma de medir el trabajo: si algo sigue frenando tu operación, no hemos terminado.</p>
              </div>
            </div>
            <div className="about-fact">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3.5 9h17M3.5 15h17M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
              </svg>
              <div>
                <strong>Base en Los Teques, alcance nacional</strong>
                <p>Trabajamos de forma presencial en Miranda y Caracas, y de forma remota en todo el país.</p>
              </div>
            </div>
            <div className="about-fact">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="6" cy="12" r="2.5" />
                <circle cx="18" cy="6" r="2.5" />
                <circle cx="18" cy="18" r="2.5" />
                <path d="m8.4 11 7.1-3.7M8.4 13l7.1 3.7" />
              </svg>
              <div>
                <strong>Un solo punto de contacto</strong>
                <p>Redes, seguridad, automatización y web en un mismo equipo. Sin coordinar tres proveedores distintos para resolver un problema.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values page-width section-space" aria-labelledby="values-title">
        <div className="section-heading section-heading--narrow reveal">
          <p className="eyebrow">Cómo pensamos</p>
          <h2 id="values-title">Seis principios que no negociamos.</h2>
          <p>
            Los valores de una empresa se notan en cómo responde cuando algo sale mal, no en el discurso de venta. Estos
            son los nuestros.
          </p>
        </div>
        <div className="values-grid">
          {values.map((value, index) => (
            <div className="value-card reveal" key={value.number} style={{ transitionDelay: `${index * 70}ms` }}>
              <span className="value-number">{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-steps" aria-labelledby="steps-title">
        <div className="page-width">
          <div className="section-heading section-heading--narrow reveal">
            <p className="eyebrow eyebrow--light">Nuestro método</p>
            <h2 id="steps-title">Así trabajamos con cada cliente.</h2>
            <p>El mismo proceso para un router o para un sistema completo: claro, ordenado y sin sorpresas.</p>
          </div>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div className="step-card reveal" key={step.number} style={{ transitionDelay: `${index * 80}ms` }}>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band page-width" aria-label="Contacto">
        <div className="cta-band-inner reveal">
          <div>
            <h2>Conversemos sobre tu negocio.</h2>
            <p>Escríbenos por WhatsApp al +{siteConfig.whatsappNumber.slice(0, 2)} {siteConfig.whatsappNumber.slice(2)} o déjanos tu mensaje en el formulario.</p>
          </div>
          <a className="button button--primary" href="/#contacto">
            Agendar diagnóstico
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>
        </div>
      </section>

      <RevealObserver />
      <WhatsAppButton />
      <SiteFooter />
    </main>
  );
}
