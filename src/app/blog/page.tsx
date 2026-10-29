import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppButton from "@/components/whatsapp-button";
import { RevealObserver, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { blogPosts, formatDate } from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site-config";

const SITE_TITLE = "Blog de CeroTraba — Tecnología sin trabas";
const SITE_DESCRIPTION =
  "Guías prácticas de automatización, CCTV, redes y páginas web para negocios en Venezuela. Contenido claro, sin jerga, escrito por el equipo de CeroTraba.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "CeroTraba",
    type: "website",
    locale: "es_VE",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <main className="site-shell cerotaba">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Blog de CeroTraba",
            description: SITE_DESCRIPTION,
            url: `${siteConfig.siteUrl}/blog`,
            publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.siteUrl },
            blogPost: blogPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: `${siteConfig.siteUrl}/blog/${post.slug}`,
              datePublished: post.date,
              image: `${siteConfig.siteUrl}${post.image}`,
            })),
          }),
        }}
      />
      <SiteHeader prefix="/" active="blog" />

      <section className="page-hero">
        <div className="page-width">
          <p className="eyebrow">Blog de CeroTraba</p>
          <h1>Ideas claras para negocios que no pueden detenerse.</h1>
          <p className="page-lead">
            Guías prácticas sobre automatización, seguridad, redes y páginas web, escritas desde nuestra experiencia
            trabajando con negocios de Venezuela. Sin jerga, sin humo.
          </p>
        </div>
      </section>

      <section className="blog-section page-width" aria-label="Artículos del blog">
        <Link className="blog-featured reveal" href={`/blog/${featured.slug}`}>
          <span className="blog-card-media">
            <img src={featured.image} alt={featured.imageAlt} width={960} height={600} />
          </span>
          <span className="blog-featured-body">
            <span className="blog-chip">{featured.category}</span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <span className="blog-meta">
              {formatDate(featured.date)} · {featured.readTime}
            </span>
            <span className="text-link">
              Leer artículo
              <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </span>
        </Link>

        <div className="blog-grid">
          {rest.map((post) => (
            <Link className="blog-card reveal" href={`/blog/${post.slug}`} key={post.slug}>
              <span className="blog-card-media">
                <img src={post.image} alt={post.imageAlt} loading="lazy" width={640} height={400} />
              </span>
              <span className="blog-card-body">
                <span className="blog-chip">{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="blog-meta">
                  {formatDate(post.date)} · {post.readTime}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="cta-band page-width" aria-label="Contacto">
        <div className="cta-band-inner reveal">
          <div>
            <h2>¿Prefieres resolverlo en persona?</h2>
            <p>Cuéntanos qué está frenando a tu negocio y armamos una propuesta a tu medida.</p>
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
