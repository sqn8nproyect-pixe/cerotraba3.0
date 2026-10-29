"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import WhatsAppButton from "@/components/whatsapp-button";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { siteConfig } from "@/lib/site-config";

type IconName =
  | "arrow"
  | "automation"
  | "cable"
  | "camera"
  | "check"
  | "chevron"
  | "code"
  | "desktop"
  | "link"
  | "menu"
  | "network"
  | "shield"
  | "spark"
  | "warning"
  | "wifi"
  | "x";

const services = [
  { number: "01", icon: "automation" as IconName, image: "/servicios/automatizacion.jpg", alt: "Monitor con una red de automatización de tareas conectada", title: "Automatizaciones inteligentes", text: "Conectamos las tareas repetitivas de tu negocio para que los procesos sigan avanzando, incluso cuando tu equipo no está frente a la pantalla.", detail: "Ventas, reportes, respuestas y seguimiento", need: "Automatizaciones" },
  { number: "02", icon: "camera" as IconName, image: "/servicios/cctv.jpg", alt: "Cámara de seguridad CCTV instalada en un local comercial", title: "CCTV que te da visibilidad", text: "Diseñamos e implementamos sistemas de videovigilancia confiables para proteger tus instalaciones, activos y tranquilidad.", detail: "Diseño, instalación y acceso remoto", need: "CCTV y seguridad" },
  { number: "03", icon: "code" as IconName, image: "/servicios/web.jpg", alt: "Laptop mostrando el diseño de una página web moderna", title: "Páginas que convierten", text: "Creamos experiencias web rápidas, claras y pensadas para transformar una visita en una conversación de ventas.", detail: "Estrategia, diseño y lanzamiento", need: "Página web de conversión" },
  { number: "04", icon: "network" as IconName, image: "/servicios/redes.jpg", alt: "Smartphone con gráficos de crecimiento en redes sociales", title: "Redes con dirección", text: "Ordenamos tu presencia digital con contenido y canales que hacen que tu marca se vea, se entienda y se recuerde.", detail: "Contenido, comunidad y performance", need: "Redes sociales y contenido" },
  { number: "05", icon: "desktop" as IconName, image: "/servicios/soporte.jpg", alt: "Técnico de soporte reparando una computadora de escritorio", title: "Soporte que resuelve", text: "Mantenemos los equipos de tu operación listos para trabajar. Menos interrupciones, más continuidad para tu día a día.", detail: "PC, redes, mantenimiento y respaldo", need: "Soporte técnico" },
  { number: "06", icon: "cable" as IconName, image: "/servicios/cableado.jpg", alt: "Rack de red organizado con cables etiquetados", title: "Cableado estructurado", text: "Diseñamos e instalamos la red de cableado de tu oficina o local: ordenada, etiquetada y lista para crecer sin cables sueltos ni puntos muertos.", detail: "Diseño, instalación y etiquetado", need: "Cableado estructurado" },
  { number: "07", icon: "link" as IconName, image: "/servicios/interconexion.jpg", alt: "Dos edificios conectados por un enlace de datos luminoso", title: "Interconexiones entre sedes", text: "Unimos tus sucursales, oficinas y puntos de venta con enlaces seguros para que la información viaje como si todo estuviera en el mismo lugar.", detail: "Enlaces punto a punto y VPN", need: "Interconexiones y enlaces" },
  { number: "08", icon: "wifi" as IconName, image: "/servicios/wifi.jpg", alt: "Router WiFi irradiando señal en una oficina", title: "Router WiFi y conectividad", text: "Configuramos tu red inalámbrica para que haya señal estable en cada rincón: routers, access points y una red protegida para tu equipo y tus clientes.", detail: "Cobertura, configuración y seguridad", need: "Router WiFi" },
];

const plans = [
  { name: "Arranque", intro: "Para poner en marcha una necesidad puntual.", price: "A medida", items: ["Diagnóstico de oportunidad", "Una solución prioritaria", "Acompañamiento de lanzamiento"], featured: false },
  { name: "Impulso", intro: "Para empresas listas para conectar sus operaciones.", price: "Proyecto", items: ["Estrategia y hoja de ruta", "Implementación integral", "Capacitación de tu equipo", "Soporte post-lanzamiento"], featured: true },
  { name: "Continuidad", intro: "Para mantener tu tecnología siempre a favor.", price: "Mensual", items: ["Soporte técnico proactivo", "Mejoras continuas", "Monitoreo y reportes", "Canal de atención directo"], featured: false },
];

const testimonials = [
  { quote: "No solo resolvieron lo técnico. Nos ayudaron a trabajar de una forma mucho más ordenada y segura.", name: "Mariana R.", role: "Dirección de operaciones", initials: "MR" },
  { quote: "La automatización de reportes nos devolvió horas cada semana. El equipo ahora se enfoca en vender, no en copiar datos.", name: "Carlos M.", role: "Gerencia comercial", initials: "CM" },
  { quote: "Instalaron el CCTV y ordenaron toda la red de una vez: sin cables sueltos, con acceso remoto y todo documentado.", name: "Valeria P.", role: "Propietaria de comercio", initials: "VP" },
];

const faqs = [
  { question: "¿Qué tipo de empresas pueden trabajar con CeroTraba?", answer: "Trabajamos con negocios en crecimiento, equipos establecidos, profesionales independientes y estudiantes con proyectos digitales. Adaptamos el alcance a tu etapa y a la prioridad que quieras resolver primero." },
  { question: "¿Pueden ayudarme si todavía no tengo claro qué necesito?", answer: "Sí. Empezamos con un diagnóstico breve para identificar dónde se están perdiendo horas, oportunidades o visibilidad. Luego te presentamos una ruta concreta y sin tecnicismos innecesarios." },
  { question: "¿Cuánto puede tardar una implementación?", answer: "Depende del alcance. Un ajuste de soporte o una automatización puntual puede resolverse rápidamente; una web de conversión, un proyecto CCTV o un cableado estructurado requiere una etapa de definición, producción y validación. Te damos tiempos claros antes de comenzar." },
  { question: "¿Ofrecen soporte después de entregar el proyecto?", answer: "Claro. Podemos acompañar tu operación con soporte recurrente, capacitación para el equipo y mejoras progresivas para que la solución no se quede quieta mientras tu negocio evoluciona." },
];

const projects = [
  {
    name: "Conecta-Lt",
    tag: "Proyecto insignia",
    tagline: "Conecta con lo nuestro",
    domain: "conectalt.com",
    url: "https://conectalt.com",
    image: "/proyectos/conectalt-logo.jpg",
    alt: "Logo 3D de Conecta-Lt: pin de ubicación con letra C y arquitectura colonial de Los Teques, rodeado de íconos de comercio, gastronomía y comunidad",
    text: "El directorio digital de Los Teques: comercios, servicios, gastronomía y personas de la ciudad reunidos en una sola plataforma. En CeroTraba desarrollamos la marca, la identidad 3D y el producto digital completo de este proyecto insignia.",
  },
];

const clients = [
  {
    name: "Sepulturas en Oferta",
    country: "Chile",
    domain: "sepulturasenoferta.cl",
    url: "https://sepulturasenoferta.cl",
    image: "/clientes/sepulturas-en-oferta.jpg",
    alt: "Sitio web de Sepulturas en Oferta: página con fondo de parque y el título Sepulturas en el Parque El Recuerdo Américo Vespucio, Precios de Oportunidad",
    text: "Plataforma de compra-venta de sepulturas en el Parque El Recuerdo Américo Vespucio, Santiago de Chile. Diseñamos una página clara y confiable, con proceso notarial explicado paso a paso y contacto directo por WhatsApp.",
  },
  {
    name: "Funeraria San Gabriel",
    country: "Chile",
    domain: "funerariasangabriel.cl",
    url: "https://www.funerariasangabriel.cl/",
    image: "/clientes/funeraria-san-gabriel.jpg",
    alt: "Sitio web de Funeraria San Gabriel: marca en verde azulado con el mensaje Dignidad y Respeto y acompañamiento profesional las 24 horas en Región Metropolitana",
    text: "Servicios funerarios con acompañamiento profesional las 24 horas en la Región Metropolitana de Santiago. Construimos su presencia digital con planes claros, secciones de ayuda inmediata y una navegación sobria y respetuosa.",
  },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    automation: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><path d="M10 6.5h3.5A3.5 3.5 0 0 1 17 10v4" /><path d="M7 10v4a3.5 3.5 0 0 0 3.5 3.5H14" /></>,
    camera: <><path d="M3 8.5h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H3z" /><path d="m17 12 4-2v7l-4-2" /><circle cx="10" cy="13.5" r="2.5" /></>,
    check: <path d="m5 12 4.2 4L19 6.5" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    code: <><path d="m8 9-3 3 3 3" /><path d="m16 9 3 3-3 3" /><path d="m14 5-4 14" /></>,
    desktop: <><rect x="3" y="4" width="18" height="13" rx="1.5" /><path d="M8 21h8" /><path d="M12 17v4" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    network: <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.4 11 7.1-3.7" /><path d="m8.4 13 7.1 3.7" /></>,
    shield: <><path d="M12 3 20 6v5c0 5.3-3.4 8.6-8 10-4.6-1.4-8-4.7-8-10V6z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    spark: <><path d="m12 3 1.2 5.1L18 9.5l-4.8 1.4L12 16l-1.2-5.1L6 9.5l4.8-1.4z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6z" /></>,
    cable: <><path d="M9 7V3" /><path d="M15 7V3" /><path d="M6 7h12v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4z" /><path d="M12 15v6" /></>,
    link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
    wifi: <><path d="M12 19h.01" /><path d="M8.5 16a5 5 0 0 1 7 0" /><path d="M5 12.55a11 11 0 0 1 14 0" /><path d="M2 8.82a15 15 0 0 1 20 0" /></>,
    warning: <><path d="M12 4 2.8 20h18.4z" /><path d="M12 10v4.5" /><path d="M12 17.6v.1" /></>,
    x: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const SCREEN_PHRASES = ["Todo avanza.", "Todo conectado.", "Nada te detiene."];

/**
 * Escenario interactivo de la sección "Menos tareas sueltas":
 * - Tilt 3D que sigue el cursor (solo punteros finos; respeta prefers-reduced-motion).
 * - Titular con efecto máquina de escribir que rota tres frases.
 * - Paquetes de datos viajando por la línea de flujo, nodos y barras latiendo.
 * - Clic o toque en cualquier parte: onda expansiva + "surge" que acelera el flujo.
 */
function OperationStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number } | null>(null);
  const [surging, setSurging] = useState(false);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [typed, setTyped] = useState(SCREEN_PHRASES[0]);
  const motionRef = useRef({ fine: false, reduced: true });
  const surgeTimer = useRef<number | null>(null);
  const burstId = useRef(0);

  useEffect(() => {
    motionRef.current = {
      fine: window.matchMedia("(hover: hover) and (pointer: fine)").matches,
      reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number;
    let phase: "hold" | "typing" | "deleting" = "hold";
    let char = SCREEN_PHRASES[0].length;
    let index = 0;
    const tick = () => {
      if (phase === "hold") {
        phase = "deleting";
        timer = window.setTimeout(tick, 1700);
      } else if (phase === "deleting") {
        char -= 1;
        setTyped(SCREEN_PHRASES[index].slice(0, char));
        if (char <= 0) {
          phase = "typing";
          index = (index + 1) % SCREEN_PHRASES.length;
          timer = window.setTimeout(tick, 420);
        } else {
          timer = window.setTimeout(tick, 26);
        }
      } else {
        char += 1;
        setTyped(SCREEN_PHRASES[index].slice(0, char));
        if (char >= SCREEN_PHRASES[index].length) {
          phase = "hold";
          timer = window.setTimeout(tick, 1700);
        } else {
          timer = window.setTimeout(tick, 55);
        }
      }
    };
    timer = window.setTimeout(tick, 1700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => () => {
    if (surgeTimer.current) window.clearTimeout(surgeTimer.current);
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const { fine, reduced } = motionRef.current;
    const stage = stageRef.current;
    if (!fine || reduced || !stage) return;
    const rect = stage.getBoundingClientRect();
    const x = Math.min(0.5, Math.max(-0.5, (event.clientX - rect.left) / rect.width - 0.5));
    const y = Math.min(0.5, Math.max(-0.5, (event.clientY - rect.top) / rect.height - 0.5));
    setTilt({ x, y });
  }

  function handlePointerLeave() {
    setTilt(null);
  }

  function handleSurge(event: React.PointerEvent<HTMLDivElement>) {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const id = (burstId.current += 1);
    const burst = { id, x: event.clientX - rect.left, y: event.clientY - rect.top };
    setBursts((current) => [...current.slice(-4), burst]);
    window.setTimeout(() => setBursts((current) => current.filter((item) => item.id !== id)), 950);
    setSurging(true);
    if (surgeTimer.current) window.clearTimeout(surgeTimer.current);
    surgeTimer.current = window.setTimeout(() => setSurging(false), 1150);
  }

  const tiltStyle = tilt
    ? { transform: `perspective(1000px) rotateY(${(tilt.x * 9).toFixed(2)}deg) rotateX(${(-tilt.y * 7).toFixed(2)}deg) translateY(-6px)` }
    : undefined;

  return (
    <div
      ref={stageRef}
      className={`interface-stage-inner ${surging ? "is-surging" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handleSurge}
    >
      <div className="interface-glow" aria-hidden="true" />
      <div className={`product-screen ${tilt ? "is-tilting" : ""}`} style={tiltStyle} aria-label="Vista conceptual e interactiva de una operación conectada">
        <div className="screen-top">
          <span className="screen-logo">CeroTraba</span>
          <span className="screen-status"><i /> {surging ? "Flujo activado" : "Todo en marcha"}</span>
        </div>
        <div className="screen-body">
          <div className="screen-sidebar"><span className="sidebar-active" /><span /><span /><span /><span /></div>
          <div className="screen-content">
            <div className="screen-kicker">Operación de hoy</div>
            <div className="screen-title">{typed}<span className="type-caret" aria-hidden="true" /></div>
            <div className="flow-line">
              <span className="flow-node flow-node--one" />
              <span className="flow-node flow-node--two" />
              <span className="flow-node flow-node--three" />
              <i aria-hidden="true" />
              <span className="flow-packet flow-packet--one" aria-hidden="true" />
              <span className="flow-packet flow-packet--two" aria-hidden="true" />
              <span className="flow-packet flow-packet--three" aria-hidden="true" />
            </div>
            <div className="screen-cells"><span /><span /><span /></div>
          </div>
        </div>
      </div>
      <p className="stage-hint" aria-hidden="true"><Icon name="spark" size={13} /> Pásale el cursor o tócalo: así se ve tu operación con CeroTraba.</p>
      {bursts.map((burst) => (
        <span key={burst.id} className="click-burst" style={{ left: burst.x, top: burst.y }} aria-hidden="true" />
      ))}
    </div>
  );
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [formNeed, setFormNeed] = useState("");
  const [formFlash, setFormFlash] = useState(false);
  const autoRef = useRef(true);
  const flashRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (autoRef.current && document.visibilityState === "visible") {
        setActiveTestimonial((current) => (current + 1) % testimonials.length);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  function goToTestimonial(index: number) {
    autoRef.current = false;
    setActiveTestimonial((index + testimonials.length) % testimonials.length);
  }

  function requestService(need: string) {
    setFormNeed(need);
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setFormFlash(false);
    if (flashRef.current) window.clearTimeout(flashRef.current);
    flashRef.current = window.setTimeout(() => setFormFlash(true), 420);
    window.setTimeout(() => setFormFlash(false), 2200);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setFormError("");

    const data = new FormData(event.currentTarget);
    const payload = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      need: data.get("need"),
      message: data.get("message"),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        setFormError(result?.error || `No pudimos enviar tu mensaje. Revisa los datos e inténtalo de nuevo, o escríbenos a ${siteConfig.contactEmail}.`);
        return;
      }
      setSubmitted(true);
    } catch {
      setFormError("Tuvimos un problema de conexión. Inténtalo de nuevo en unos segundos.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main id="inicio" className="site-shell cerotaba">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": `${siteConfig.siteUrl}/#negocio`,
            name: siteConfig.name,
            slogan: siteConfig.tagline,
            description: "Servicios tecnológicos para empresas en Venezuela: automatizaciones inteligentes, CCTV, páginas web, redes sociales, soporte técnico, cableado estructurado, interconexiones entre sedes y router WiFi. Proyectos digitales en producción también en Chile.",
            url: siteConfig.siteUrl,
            email: siteConfig.contactEmail,
            telephone: "+584220117206",
            image: `${siteConfig.siteUrl}/og-cerotraba.jpg`,
            logo: `${siteConfig.siteUrl}/logo.svg`,
            priceRange: "$$",
            taxID: "J-508830466",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Los Teques",
              addressRegion: "Miranda",
              addressCountry: "VE",
            },
            geo: { "@type": "GeoCoordinates", latitude: 10.3439, longitude: -66.0433 },
            areaServed: [
              { "@type": "City", name: "Los Teques" },
              { "@type": "City", name: "Caracas" },
              { "@type": "AdministrativeArea", name: "Estado Miranda" },
              { "@type": "Country", name: "Venezuela" },
              { "@type": "Country", name: "Chile" },
            ],
            sameAs: [`https://wa.me/${siteConfig.whatsappNumber}`, siteConfig.instagramUrl],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Servicios tecnológicos",
              itemListElement: services.map((service) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: service.title, description: service.text },
              })),
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content page-width">
          <div className="hero-copy">
            <p className="hero-brand">CeroTraba<span>.</span></p>
            <h1 id="hero-title">Tu negocio avanza cuando la tecnología deja de frenarte.</h1>
            <p className="hero-description">Automatizamos, protegemos y potenciamos lo que hace posible tu trabajo para que puedas concentrarte en hacerlo crecer.</p>
            <div className="hero-actions"><a className="button button--primary" href="#contacto">Agendar diagnóstico <Icon name="arrow" size={18} /></a><a className="button button--ghost" href="#servicios">Explorar soluciones</a></div>
          </div>
          <a className="scroll-cue" href="#confianza" aria-label="Ver más contenido"><span>Descubre CeroTraba</span><i /></a>
        </div>
      </section>

      <section id="confianza" className="trust-section page-width" aria-label="Para quienes construimos">
        <Reveal className="trust-copy"><p className="eyebrow">Tecnología que acompaña</p><h2>Hecho para quienes no pueden detenerse.</h2></Reveal>
        <Reveal className="audience-list" delay={120}><span>Empresas</span><span>Profesionales</span><span>Estudiantes</span><span>Equipos en crecimiento</span></Reveal>
      </section>

      <section id="servicios" className="services-section page-width section-space" aria-labelledby="services-title">
        <Reveal className="section-heading"><p className="eyebrow">Un aliado, ocho frentes</p><h2 id="services-title">Ponemos cada pieza de tu operación a trabajar contigo.</h2><p>Soluciones claras para necesidades reales. Elegimos la tecnología correcta, la implementamos bien y nos quedamos cerca. Haz clic en el servicio que necesitas y te llevamos directo a la consulta.</p></Reveal>
        <div className="service-list">
          {services.map((service, index) => <Reveal className="service-item" delay={index * 85} key={service.number}>
            <button type="button" className="service-row" onClick={() => requestService(service.need)} aria-label={`Consultar sobre ${service.title} — llena el formulario con este servicio preseleccionado`}>
              <span className="service-number">{service.number}</span><div className="service-thumb"><Image src={service.image} alt={service.alt} width={576} height={432} sizes="(max-width: 480px) calc(100vw - 32px), (max-width: 820px) 136px, (max-width: 1050px) 160px, 206px" /><span className="service-thumb-icon" aria-hidden="true"><Icon name={service.icon} size={14} /></span></div><div className="service-main"><h3>{service.title}</h3><p>{service.text}</p></div><p className="service-detail">{service.detail}</p><span className="service-link" aria-hidden="true"><Icon name="arrow" size={20} /></span>
            </button>
          </Reveal>)}
        </div>
      </section>

      <section id="proceso" className="showcase-section">
        <div className="showcase-wrap page-width">
          <Reveal className="showcase-copy"><p className="eyebrow eyebrow--light">Menos tareas sueltas</p><h2>Todo conectado. Nada te detiene.</h2><p>Convertimos la complejidad técnica en un sistema simple para tu equipo: procesos que fluyen, información que llega y decisiones que pasan más rápido.</p><ul className="check-list"><li><Icon name="check" size={18} /> Entiende primero, implementa después.</li><li><Icon name="check" size={18} /> Sin soluciones infladas ni jerga innecesaria.</li><li><Icon name="check" size={18} /> Un equipo humano a un mensaje de distancia.</li></ul><a className="text-link text-link--light" href="#contacto">Quiero ordenar mi operación <Icon name="arrow" size={17} /></a></Reveal>
          <Reveal className="interface-stage" delay={150}><OperationStage /></Reveal>
        </div>
      </section>

      <section className="outcomes-section page-width section-space" aria-labelledby="outcomes-title">
        <Reveal className="section-heading section-heading--narrow"><p className="eyebrow">El cambio se nota</p><h2 id="outcomes-title">Tu día debería sentirse más ligero.</h2></Reveal>
        <div className="outcomes-grid">
          <Reveal className="outcome" delay={0}><span className="outcome-number">01</span><h3>Recupera tiempo</h3><p>Deja que las tareas repetitivas se resuelvan con procesos inteligentes y enfoca tu energía en lo que genera valor.</p></Reveal>
          <Reveal className="outcome" delay={100}><span className="outcome-number">02</span><h3>Trabaja con calma</h3><p>Ten control de tus espacios, equipos y canales digitales sin tener que perseguir problemas a diario.</p></Reveal>
          <Reveal className="outcome" delay={200}><span className="outcome-number">03</span><h3>Crece con base</h3><p>Construye una operación que aguanta el siguiente nivel de tu negocio, no una que se rompe cuando llegan más clientes.</p></Reveal>
        </div>
      </section>

      <section className="testimonial-section" aria-labelledby="testimonial-title"><div className="page-width testimonial-wrap"><Reveal className="quote-mark">&ldquo;</Reveal><Reveal className="testimonial-copy" delay={70}><p className="eyebrow eyebrow--light">Una relación que funciona</p>
        <div className="testimonial-stage">
          {testimonials.map((testimonial, index) => (
            <figure key={testimonial.name} className={`testimonial-slide ${index === activeTestimonial ? "is-active" : ""}`} aria-hidden={index !== activeTestimonial}>
              <h2 id={index === activeTestimonial ? "testimonial-title" : undefined}>{testimonial.quote}</h2>
              <figcaption className="person"><span className="person-avatar">{testimonial.initials}</span><span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span></figcaption>
            </figure>
          ))}
        </div>
        <div className="testimonial-controls">
          <button type="button" onClick={() => goToTestimonial(activeTestimonial - 1)} aria-label="Testimonio anterior"><span style={{ display: "grid", transform: "rotate(180deg)" }}><Icon name="arrow" size={17} /></span></button>
          <button type="button" onClick={() => goToTestimonial(activeTestimonial + 1)} aria-label="Testimonio siguiente"><Icon name="arrow" size={17} /></button>
        </div>
      </Reveal><Reveal className="testimonial-index" delay={150}><span className="testimonial-index-active">{String(activeTestimonial + 1).padStart(2, "0")}</span><i /><span>{String(testimonials.length).padStart(2, "0")}</span></Reveal></div></section>

      <section id="proyectos" className="projects-section page-width section-space" aria-labelledby="projects-title">
        <Reveal className="projects-intro"><p className="eyebrow">Trabajo real</p><h2 id="projects-title">Proyectos que ya están en la calle.</h2><p>Nuestra mejor carta de presentación es lo que ya construimos y funciona. Estos son los proyectos insignia de la casa.</p><a className="text-link" href="#contacto">Quiero un proyecto así <Icon name="arrow" size={17} /></a></Reveal>
        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal className="project-card" delay={index * 90} key={project.name}>
              <div className="project-media"><Image src={project.image} alt={project.alt} loading="lazy" width={576} height={576} sizes="(max-width: 820px) 92vw, (max-width: 1050px) 170px, 280px" /></div>
              <div className="project-main">
                <span className="project-tag">{project.tag}</span>
                <h3>{project.name}</h3>
                <p className="project-tagline">{project.tagline} · Los Teques, Venezuela</p>
                <p className="project-text">{project.text}</p>
                <a className="text-link project-link" href={project.url} target="_blank" rel="noopener noreferrer">Visitar {project.domain} <Icon name="arrow" size={16} /></a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="clientes" className="clients-section page-width section-space" aria-labelledby="clients-title">
        <Reveal className="projects-intro"><p className="eyebrow">Alcance internacional</p><h2 id="clients-title">Clientes que ya confían en nuestro trabajo.</h2><p>Nuestro trabajo cruza fronteras: junto a Conecta-Lt acompañamos también a clientes en Chile, con sitios web que generan confianza desde el primer clic.</p><a className="text-link" href="#contacto">Quiero ser el próximo <Icon name="arrow" size={17} /></a></Reveal>
        <div className="client-list">
          {clients.map((client, index) => (
            <Reveal className="client-card" delay={index * 90} key={client.name}>
              <div className="client-media"><Image src={client.image} alt={client.alt} loading="lazy" width={576} height={360} sizes="(max-width: 820px) 92vw, (max-width: 1050px) 170px, 265px" /><span className="client-country"><svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3.5 9h17M3.5 15h17M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></svg>{client.country}</span></div>
              <div className="client-main">
                <h3>{client.name}</h3>
                <p className="client-domain">{client.domain}</p>
                <p className="client-text">{client.text}</p>
                <a className="text-link client-link" href={client.url} target="_blank" rel="noopener noreferrer">Visitar {client.domain} <Icon name="arrow" size={16} /></a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="planes" className="pricing-section page-width section-space" aria-labelledby="pricing-title">
        <Reveal className="pricing-intro"><p className="eyebrow">Sin soluciones enlatadas</p><h2 id="pricing-title">Elige cómo quieres empezar.</h2><p>Te proponemos un alcance ajustado a tu momento, tus prioridades y la velocidad que necesitas.</p></Reveal>
        <div className="pricing-grid">{plans.map((plan, index) => <Reveal className={`price-plan ${plan.featured ? "price-plan--featured" : ""}`} delay={index * 90} key={plan.name}>{plan.featured && <span className="plan-label">Más elegido</span>}<h3>{plan.name}</h3><p className="plan-intro">{plan.intro}</p><p className="plan-price">{plan.price}<small>{plan.price === "Mensual" ? "/ acompañamiento" : ""}</small></p><ul>{plan.items.map((item) => <li key={item}><Icon name="check" size={16} />{item}</li>)}</ul><a className={plan.featured ? "button button--primary plan-button" : "button button--outline plan-button"} href="#contacto">Conocer propuesta <Icon name="arrow" size={16} /></a></Reveal>)}</div>
        <Reveal className="pricing-note" delay={80}><Icon name="spark" size={18} /> Todas las propuestas comienzan con una conversación para entender tu necesidad real.</Reveal>
      </section>

      <section id="faq" className="faq-section page-width section-space" aria-labelledby="faq-title">
        <Reveal className="faq-intro"><p className="eyebrow">Preguntas frecuentes</p><h2 id="faq-title">Hablemos claro desde el principio.</h2><p>Si tienes otra pregunta, escríbenos. Una persona de nuestro equipo te responde.</p><a className="text-link" href="#contacto">Contactar al equipo <Icon name="arrow" size={17} /></a></Reveal>
        <div className="faq-list">{faqs.map((faq, index) => <Reveal className="faq-item" delay={index * 65} key={faq.question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{faq.question}</span><i><Icon name="chevron" size={20} /></i></button><div className={`faq-answer ${openFaq === index ? "faq-answer--open" : ""}`}><p>{faq.answer}</p></div></Reveal>)}</div>
      </section>

      <section id="contacto" className="contact-section" aria-labelledby="contact-title"><div className="contact-wrap page-width"><Reveal className="contact-copy"><p className="eyebrow eyebrow--light">El siguiente paso empieza aquí</p><h2 id="contact-title">Tu negocio no tiene por qué seguir adaptándose a la tecnología.</h2><p>Cuéntanos en qué punto estás. Encontraremos la manera de quitar la traba.</p><div className="contact-points"><span><Icon name="shield" size={18} /> Conversación sin compromiso</span><span><Icon name="spark" size={18} /> Propuesta clara y accionable</span></div></Reveal><Reveal className={`lead-form-wrap ${formFlash ? "lead-form-wrap--glow" : ""}`} delay={120}>{submitted ? <div className="form-success" role="status"><div><Icon name="check" size={30} /></div><h3>Recibimos tu mensaje.</h3><p>Muy pronto un miembro de CeroTraba se pondrá en contacto contigo para conocer tu necesidad.</p><button className="text-link text-link--light" onClick={() => setSubmitted(false)}>Enviar otra consulta <Icon name="arrow" size={17} /></button></div> : <form className="lead-form" onSubmit={handleSubmit} noValidate={false}>{formNeed && !submitted && <p className="form-hint" role="status"><Icon name="check" size={14} /> Consulta lista para: <strong>{formNeed}</strong></p>}<div className="form-row"><label>Nombre<input required type="text" name="name" placeholder="¿Cómo te llamas?" maxLength={120} /></label><label>WhatsApp<input required type="tel" name="phone" placeholder="Tu número" maxLength={40} /></label></div><label>Correo de trabajo<input required type="email" name="email" placeholder="tu@empresa.com" maxLength={160} /></label><label>¿Qué necesitas?<select required name="need" value={formNeed} onChange={(event) => setFormNeed(event.target.value)}><option value="" disabled>Elige una opción</option><option>Automatizaciones</option><option>CCTV y seguridad</option><option>Cableado estructurado</option><option>Interconexiones y enlaces</option><option>Router WiFi</option><option>Página web de conversión</option><option>Redes sociales y contenido</option><option>Soporte técnico</option><option>No estoy seguro aún</option></select></label><label>Cuéntanos brevemente<textarea name="message" rows={3} placeholder="¿Qué te gustaría resolver?" maxLength={2000} /></label>{formError && <p className="form-error" role="alert"><Icon name="warning" size={15} /> {formError}</p>}<button className="button button--primary form-submit" type="submit" disabled={sending}>{sending ? "Enviando…" : <>Quiero mi diagnóstico <Icon name="arrow" size={18} /></>}</button></form>}</Reveal></div></section>

      <WhatsAppButton />

      <SiteFooter />
    </main>
  );
}
