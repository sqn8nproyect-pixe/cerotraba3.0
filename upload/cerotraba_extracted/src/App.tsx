import { FormEvent, useEffect, useState } from "react";

type IconName =
  | "arrow"
  | "automation"
  | "camera"
  | "check"
  | "chevron"
  | "code"
  | "desktop"
  | "menu"
  | "network"
  | "shield"
  | "spark"
  | "x";

const services = [
  { number: "01", icon: "automation" as IconName, title: "Automatizaciones inteligentes", text: "Conectamos las tareas repetitivas de tu negocio para que los procesos sigan avanzando, incluso cuando tu equipo no esta frente a la pantalla.", detail: "Ventas, reportes, respuestas y seguimiento" },
  { number: "02", icon: "camera" as IconName, title: "CCTV que te da visibilidad", text: "Disenamos e implementamos sistemas de videovigilancia confiables para proteger tus instalaciones, activos y tranquilidad.", detail: "Diseno, instalacion y acceso remoto" },
  { number: "03", icon: "code" as IconName, title: "Paginas que convierten", text: "Creamos experiencias web rapidas, claras y pensadas para transformar una visita en una conversacion de ventas.", detail: "Estrategia, diseno y lanzamiento" },
  { number: "04", icon: "network" as IconName, title: "Redes con direccion", text: "Ordenamos tu presencia digital con contenido y canales que hacen que tu marca se vea, se entienda y se recuerde.", detail: "Contenido, comunidad y performance" },
  { number: "05", icon: "desktop" as IconName, title: "Soporte que resuelve", text: "Mantenemos los equipos de tu operacion listos para trabajar. Menos interrupciones, mas continuidad para tu dia a dia.", detail: "PC, redes, mantenimiento y respaldo" },
];

const plans = [
  { name: "Arranque", intro: "Para poner en marcha una necesidad puntual.", price: "A medida", items: ["Diagnostico de oportunidad", "Una solucion prioritaria", "Acompanamiento de lanzamiento"], featured: false },
  { name: "Impulso", intro: "Para empresas listas para conectar sus operaciones.", price: "Proyecto", items: ["Estrategia y hoja de ruta", "Implementacion integral", "Capacitacion de tu equipo", "Soporte post-lanzamiento"], featured: true },
  { name: "Continuidad", intro: "Para mantener tu tecnologia siempre a favor.", price: "Mensual", items: ["Soporte tecnico proactivo", "Mejoras continuas", "Monitoreo y reportes", "Canal de atencion directo"], featured: false },
];

const faqs = [
  { question: "Que tipo de empresas pueden trabajar con CeroTraba?", answer: "Trabajamos con negocios en crecimiento, equipos establecidos, profesionales independientes y estudiantes con proyectos digitales. Adaptamos el alcance a tu etapa y a la prioridad que quieras resolver primero." },
  { question: "Pueden ayudarme si todavia no tengo claro que necesito?", answer: "Si. Empezamos con un diagnostico breve para identificar donde se estan perdiendo horas, oportunidades o visibilidad. Luego te presentamos una ruta concreta y sin tecnicismos innecesarios." },
  { question: "Cuanto puede tardar una implementacion?", answer: "Depende del alcance. Un ajuste de soporte o una automatizacion puntual puede resolverse rapidamente; una web de conversion o una instalacion CCTV requiere una etapa de definicion, produccion y validacion. Te damos tiempos claros antes de comenzar." },
  { question: "Ofrecen soporte despues de entregar el proyecto?", answer: "Claro. Podemos acompanar tu operacion con soporte recurrente, capacitacion para el equipo y mejoras progresivas para que la solucion no se quede quieta mientras tu negocio evoluciona." },
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
    x: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function Brand({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? "brand--light" : ""}`} href="#inicio" aria-label="CeroTraba inicio"><span className="brand-mark">CeroTraba</span><span className="brand-dot" /></a>;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main id="inicio" className="site-shell">
      <header className="site-header">
        <div className="nav-wrap">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegacion principal"><a href="#servicios">Servicios</a><a href="#proceso">Como funciona</a><a href="#planes">Planes</a><a href="#faq">Preguntas</a></nav>
          <a className="nav-cta" href="#contacto">Hablemos <Icon name="arrow" size={15} /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "x" : "menu"} size={22} /></button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}><nav aria-label="Navegacion movil"><a onClick={() => setMenuOpen(false)} href="#servicios">Servicios</a><a onClick={() => setMenuOpen(false)} href="#proceso">Como funciona</a><a onClick={() => setMenuOpen(false)} href="#planes">Planes</a><a onClick={() => setMenuOpen(false)} href="#faq">Preguntas</a><a onClick={() => setMenuOpen(false)} href="#contacto">Agendar diagnostico <Icon name="arrow" size={16} /></a></nav></div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content page-width">
          <div className="hero-copy">
            <p className="hero-brand">CeroTraba<span>.</span></p>
            <h1 id="hero-title">Tu negocio avanza cuando la tecnologia deja de frenarte.</h1>
            <p className="hero-description">Automatizamos, protegemos y potenciamos lo que hace posible tu trabajo para que puedas concentrarte en hacerlo crecer.</p>
            <div className="hero-actions"><a className="button button--primary" href="#contacto">Agendar diagnostico <Icon name="arrow" size={18} /></a><a className="button button--ghost" href="#servicios">Explorar soluciones</a></div>
          </div>
          <a className="scroll-cue" href="#confianza" aria-label="Ver mas contenido"><span>Descubre CeroTraba</span><i /></a>
        </div>
      </section>

      <section id="confianza" className="trust-section page-width" aria-label="Para quienes construyen">
        <Reveal className="trust-copy"><p className="eyebrow">Tecnologia que acompana</p><h2>Hecho para quienes no pueden detenerse.</h2></Reveal>
        <Reveal className="audience-list" delay={120}><span>Empresas</span><span>Profesionales</span><span>Estudiantes</span><span>Equipos en crecimiento</span></Reveal>
      </section>

      <section id="servicios" className="services-section page-width section-space" aria-labelledby="services-title">
        <Reveal className="section-heading"><p className="eyebrow">Un aliado, cinco frentes</p><h2 id="services-title">Ponemos cada pieza de tu operacion a trabajar contigo.</h2><p>Soluciones claras para necesidades reales. Elegimos la tecnologia correcta, la implementamos bien y nos quedamos cerca.</p></Reveal>
        <div className="service-list">
          {services.map((service, index) => <Reveal className="service-row" delay={index * 85} key={service.number}>
            <span className="service-number">{service.number}</span><div className="service-icon"><Icon name={service.icon} size={24} /></div><div className="service-main"><h3>{service.title}</h3><p>{service.text}</p></div><p className="service-detail">{service.detail}</p><a className="service-link" href="#contacto" aria-label={`Consultar sobre ${service.title}`}><Icon name="arrow" size={20} /></a>
          </Reveal>)}
        </div>
      </section>

      <section id="proceso" className="showcase-section">
        <div className="showcase-wrap page-width">
          <Reveal className="showcase-copy"><p className="eyebrow eyebrow--light">Menos tareas sueltas</p><h2>Todo conectado. Nada te detiene.</h2><p>Convertimos la complejidad tecnica en un sistema simple para tu equipo: procesos que fluyen, informacion que llega y decisiones que pasan mas rapido.</p><ul className="check-list"><li><Icon name="check" size={18} /> Entiende primero, implementa despues.</li><li><Icon name="check" size={18} /> Sin soluciones infladas ni jerga innecesaria.</li><li><Icon name="check" size={18} /> Un equipo humano a un mensaje de distancia.</li></ul><a className="text-link text-link--light" href="#contacto">Quiero ordenar mi operacion <Icon name="arrow" size={17} /></a></Reveal>
          <Reveal className="interface-stage" delay={150}><div className="interface-glow" aria-hidden="true" /><div className="product-screen" aria-label="Vista conceptual de una operacion conectada"><div className="screen-top"><span className="screen-logo">CeroTraba</span><span className="screen-status"><i /> Todo en marcha</span></div><div className="screen-body"><div className="screen-sidebar"><span className="sidebar-active" /><span /><span /><span /><span /></div><div className="screen-content"><div className="screen-kicker">Operacion de hoy</div><div className="screen-title">Todo avanza.</div><div className="flow-line"><span className="flow-node flow-node--one" /><span className="flow-node flow-node--two" /><span className="flow-node flow-node--three" /><i /></div><div className="screen-cells"><span /><span /><span /></div></div></div></div></Reveal>
        </div>
      </section>

      <section className="outcomes-section page-width section-space" aria-labelledby="outcomes-title">
        <Reveal className="section-heading section-heading--narrow"><p className="eyebrow">El cambio se nota</p><h2 id="outcomes-title">Tu dia deberia sentirse mas ligero.</h2></Reveal>
        <div className="outcomes-grid">
          <Reveal className="outcome" delay={0}><span className="outcome-number">01</span><h3>Recupera tiempo</h3><p>Deja que las tareas repetitivas se resuelvan con procesos inteligentes y enfoca tu energia en lo que genera valor.</p></Reveal>
          <Reveal className="outcome" delay={100}><span className="outcome-number">02</span><h3>Trabaja con calma</h3><p>Ten control de tus espacios, equipos y canales digitales sin tener que perseguir problemas a diario.</p></Reveal>
          <Reveal className="outcome" delay={200}><span className="outcome-number">03</span><h3>Crece con base</h3><p>Construye una operacion que aguanta el siguiente nivel de tu negocio, no una que se rompe cuando llegan mas clientes.</p></Reveal>
        </div>
      </section>

      <section className="testimonial-section" aria-labelledby="testimonial-title"><div className="page-width testimonial-wrap"><Reveal className="quote-mark">&ldquo;</Reveal><Reveal className="testimonial-copy" delay={70}><p className="eyebrow eyebrow--light">Una relacion que funciona</p><h2 id="testimonial-title">No solo resolvieron lo tecnico. Nos ayudaron a trabajar de una forma mucho mas ordenada y segura.</h2><div className="person"><span className="person-avatar">MR</span><span><strong>Mariana R.</strong><small>Direccion de operaciones</small></span></div></Reveal><Reveal className="testimonial-index" delay={150}><span>01</span><i /><span>03</span></Reveal></div></section>

      <section id="planes" className="pricing-section page-width section-space" aria-labelledby="pricing-title">
        <Reveal className="pricing-intro"><p className="eyebrow">Sin soluciones enlatadas</p><h2 id="pricing-title">Elige como quieres empezar.</h2><p>Te proponemos un alcance ajustado a tu momento, tus prioridades y la velocidad que necesitas.</p></Reveal>
        <div className="pricing-grid">{plans.map((plan, index) => <Reveal className={`price-plan ${plan.featured ? "price-plan--featured" : ""}`} delay={index * 90} key={plan.name}>{plan.featured && <span className="plan-label">Mas elegido</span>}<h3>{plan.name}</h3><p className="plan-intro">{plan.intro}</p><p className="plan-price">{plan.price}<small>{plan.price === "Mensual" ? "/ acompanamiento" : ""}</small></p><ul>{plan.items.map((item) => <li key={item}><Icon name="check" size={16} />{item}</li>)}</ul><a className={plan.featured ? "button button--primary plan-button" : "button button--outline plan-button"} href="#contacto">Conocer propuesta <Icon name="arrow" size={16} /></a></Reveal>)}</div>
        <Reveal className="pricing-note" delay={80}><Icon name="spark" size={18} /> Todas las propuestas comienzan con una conversacion para entender tu necesidad real.</Reveal>
      </section>

      <section id="faq" className="faq-section page-width section-space" aria-labelledby="faq-title">
        <Reveal className="faq-intro"><p className="eyebrow">Preguntas frecuentes</p><h2 id="faq-title">Hablemos claro desde el principio.</h2><p>Si tienes otra pregunta, escribenos. Una persona de nuestro equipo te responde.</p><a className="text-link" href="#contacto">Contactar al equipo <Icon name="arrow" size={17} /></a></Reveal>
        <div className="faq-list">{faqs.map((faq, index) => <Reveal className="faq-item" delay={index * 65} key={faq.question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{faq.question}</span><i><Icon name="chevron" size={20} /></i></button><div className={`faq-answer ${openFaq === index ? "faq-answer--open" : ""}`}><p>{faq.answer}</p></div></Reveal>)}</div>
      </section>

      <section id="contacto" className="contact-section" aria-labelledby="contact-title"><div className="contact-wrap page-width"><Reveal className="contact-copy"><p className="eyebrow eyebrow--light">El siguiente paso empieza aqui</p><h2 id="contact-title">Tu negocio no tiene por que seguir adaptandose a la tecnologia.</h2><p>Cuentanos en que punto estas. Encontraremos la manera de quitar la traba.</p><div className="contact-points"><span><Icon name="shield" size={18} /> Conversacion sin compromiso</span><span><Icon name="spark" size={18} /> Propuesta clara y accionable</span></div></Reveal><Reveal className="lead-form-wrap" delay={120}>{submitted ? <div className="form-success" role="status"><div><Icon name="check" size={30} /></div><h3>Recibimos tu mensaje.</h3><p>Muy pronto un miembro de CeroTraba se pondra en contacto contigo para conocer tu necesidad.</p><button className="text-link text-link--light" onClick={() => setSubmitted(false)}>Enviar otra consulta <Icon name="arrow" size={17} /></button></div> : <form className="lead-form" onSubmit={handleSubmit}><div className="form-row"><label>Nombre<input required type="text" name="name" placeholder="Como te llamas?" /></label><label>WhatsApp<input required type="tel" name="phone" placeholder="Tu numero" /></label></div><label>Correo de trabajo<input required type="email" name="email" placeholder="tu@empresa.com" /></label><label>Que necesitas?<select required name="need" defaultValue=""><option value="" disabled>Elige una opcion</option><option>Automatizaciones</option><option>CCTV y seguridad</option><option>Pagina web de conversion</option><option>Redes y contenido</option><option>Soporte tecnico</option><option>No estoy seguro aun</option></select></label><label>Cuentanos brevemente<textarea name="message" rows={3} placeholder="Que te gustaria resolver?" /></label><button className="button button--primary form-submit" type="submit">Quiero mi diagnostico <Icon name="arrow" size={18} /></button></form>}</Reveal></div></section>

      <footer className="site-footer"><div className="page-width footer-top"><Brand light /><div className="footer-nav"><a href="#servicios">Servicios</a><a href="#planes">Planes</a><a href="#faq">FAQ</a><a href="#contacto">Contacto</a></div><a className="footer-mail" href="mailto:hola@cerotraba.com">hola@cerotraba.com <Icon name="arrow" size={16} /></a></div><div className="page-width footer-bottom"><span>2025 CeroTraba. Tecnologia sin trabas.</span><span>Hecho para avanzar.</span></div></footer>
    </main>
  );
}