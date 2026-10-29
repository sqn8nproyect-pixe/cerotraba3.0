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
          <a href="/blog">Blog</a>
          <a href="/#planes">Planes</a>
          <a href="/#faq">FAQ</a>
          <a href="/privacidad">Privacidad</a>
        </div>
        <a className="footer-mail" href={`mailto:${siteConfig.contactEmail}`}>
          {siteConfig.contactEmail} <ArrowIcon size={16} />
        </a>
      </div>
      <div className="page-width footer-bottom">
        <span>2026 CeroTraba. Tecnología sin trabas.</span>
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
