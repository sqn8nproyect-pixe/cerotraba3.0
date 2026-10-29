"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

/**
 * Chrome compartido del sitio CeroTraba: marca, header con menú móvil,
 * footer y observador de animaciones Reveal.
 * Usado por la landing (/), /nosotros, /blog, /blog/[slug] y /privacidad.
 */

type NavItem = { label: string; key: string; page?: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: "Servicios", key: "servicios" },
  { label: "Cómo funciona", key: "proceso" },
  { label: "Nosotros", key: "nosotros", page: true },
  { label: "Proyectos", key: "proyectos" },
  { label: "Clientes", key: "clientes" },
  { label: "Planes", key: "planes" },
  { label: "Blog", key: "blog", page: true },
  { label: "Preguntas", key: "faq" },
];

function ArrowIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {open ? (
        <>
          <path d="m6 6 12 12" />
          <path d="m18 6-12 12" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8h.01" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
      <path d="M9.2 8.4c.2 2.9 3.5 6.2 6.4 6.4l.9-1.8-2.3-1.1-.9.7a5.6 5.6 0 0 1-1.9-1.9l.7-.9-1.1-2.3z" />
    </svg>
  );
}

export function Brand({ light = false, homeHref = "#inicio" }: { light?: boolean; homeHref?: string }) {
  return (
    <a className={`brand ${light ? "brand--light" : ""}`} href={homeHref} aria-label="CeroTraba inicio">
      <span className="brand-mark">CeroTraba</span>
      <span className="brand-dot" />
    </a>
  );
}

/**
 * @param prefix "" en la landing (anclas #servicios) o "/" en subpáginas (/#servicios).
 * @param active clave de la página actual para resaltar en la navegación.
 */
export function SiteHeader({ prefix = "", active }: { prefix?: string; active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const hrefFor = (item: NavItem) => (item.page ? `/${item.key}` : `${prefix}#${item.key}`);
  const contactHref = prefix ? "/#contacto" : "#contacto";

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""} ${menuOpen ? "site-header--menu-open" : ""}`}>
      <div className="nav-wrap">
        <Brand homeHref={prefix ? "/" : "#inicio"} />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={hrefFor(item)}
              aria-current={active === item.key ? "page" : undefined}
              className={active === item.key ? "is-active" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href={contactHref}>
          Hablemos <ArrowIcon size={15} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>
      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label="Navegación móvil">
          {NAV_ITEMS.map((item) => (
            <a key={item.key} onClick={() => setMenuOpen(false)} href={hrefFor(item)} aria-current={active === item.key ? "page" : undefined}>
              {item.label}
            </a>
          ))}
          <a onClick={() => setMenuOpen(false)} href={contactHref}>
            Agendar diagnóstico <ArrowIcon size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-top">
        <Brand light homeHref="/" />
        <div className="footer-nav">
          <a href="/#servicios">Servicios</a>
          <a href="/nosotros">Nosotros</a>
          <a href="/#proyectos">Proyectos</a>
          <a href="/#clientes">Clientes</a>
          <a href="/blog">Blog</a>
          <a href="/#planes">Planes</a>
          <a href="/#faq">FAQ</a>
          <a href="/privacidad">Privacidad</a>
        </div>
        <a className="footer-mail" href={`mailto:${siteConfig.contactEmail}`}>
          {siteConfig.contactEmail} <ArrowIcon size={16} />
        </a>
        <div className="footer-social">
          <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`Instagram de CeroTraba (${siteConfig.instagramHandle})`}>
            <InstagramIcon />
          </a>
          <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de CeroTraba">
            <WhatsAppIcon />
          </a>
        </div>
      </div>
      <div className="page-width footer-bottom">
        <span>2026 CeroTraba. Tecnología sin trabas.</span>
        <span className="footer-rif">
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3 20 6v5c0 5.3-3.4 8.6-8 10-4.6-1.4-8-4.7-8-10V6z" />
            <path d="m8.5 12 2.2 2.2 4.8-5" />
          </svg>
          Agencia registrada · RIF {siteConfig.rif}
        </span>
        <span>Hecho para avanzar.</span>
        <a className="footer-admin" href="/admin">
          Panel
        </a>
      </div>
    </footer>
  );
}

/** Activa las animaciones .reveal en páginas renderizadas en el servidor. */
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
