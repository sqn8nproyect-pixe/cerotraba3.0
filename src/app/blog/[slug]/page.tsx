import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WhatsAppButton from "@/components/whatsapp-button";
import { RevealObserver, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { blogPosts, formatDate, getPostBySlug } from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site-config";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado — CeroTraba" };

  const title = `${post.title} — Blog CeroTraba`;
  return {
    title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      siteName: "CeroTraba",
      type: "article",
      locale: "es_VE",
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      images: [{ url: post.image, width: 1200, height: 750, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const articleUrl = `${siteConfig.siteUrl}/blog/${post.slug}`;

  return (
    <main className="site-shell cerotaba">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: `${siteConfig.siteUrl}${post.image}`,
            datePublished: post.date,
            inLanguage: "es-VE",
            author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.siteUrl },
            publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.siteUrl },
            mainEntityOfPage: articleUrl,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.siteUrl },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.siteUrl}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: articleUrl },
            ],
          }),
        }}
      />
      <SiteHeader prefix="/" active="blog" />

      <section className="page-hero page-hero--article">
        <div className="page-width">
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <a href="/">Inicio</a>
            <i aria-hidden="true" />
            <a href="/blog">Blog</a>
            <i aria-hidden="true" />
            <span className="crumb-current">{post.category}</span>
          </nav>
          <h1>{post.title}</h1>
          <p className="article-meta">
            Publicado el {formatDate(post.date)} · {post.readTime}
          </p>
        </div>
      </section>

      <article className="article-section">
        <div className="article-wrap">
          <figure className="article-image reveal">
            <Image src={post.image} alt={post.imageAlt} width={1200} height={675} priority sizes="(max-width: 820px) 92vw, 760px" />
          </figure>

          <p className="article-lead reveal">{post.intro}</p>

          <div className="article-body reveal">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 40)}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <aside className="article-callout">
              <strong>En resumen:</strong> {post.takeaway}
            </aside>

            <div className="author-box">
              <span className="author-avatar" aria-hidden="true">
                CT
              </span>
              <div>
                <strong>Equipo CeroTraba</strong>
                <p>
                  Tecnología sin trabas desde Los Teques, Venezuela. Automatizaciones, CCTV, redes y páginas web para
                  negocios que quieren avanzar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="related-posts page-width" aria-label="Otros artículos">
        <h2>Sigue leyendo</h2>
        <div className="related-grid">
          {related.map((item) => (
            <Link className="blog-card reveal" href={`/blog/${item.slug}`} key={item.slug}>
              <span className="blog-card-media">
                <Image src={item.image} alt={item.imageAlt} loading="lazy" width={640} height={400} sizes="(max-width: 820px) 92vw, (max-width: 1050px) 45vw, 340px" />
              </span>
              <span className="blog-card-body">
                <span className="blog-chip">{item.category}</span>
                <h3>{item.title}</h3>
                <span className="blog-meta">
                  {formatDate(item.date)} · {item.readTime}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="cta-band page-width" aria-label="Contacto">
        <div className="cta-band-inner reveal">
          <div>
            <h2>¿Quieres esto funcionando en tu negocio?</h2>
            <p>Conversemos sobre tu caso: diagnóstico inicial sin compromiso.</p>
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
