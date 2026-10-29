import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_TITLE = "CeroTraba — CCTV, Redes, Web y Soporte Técnico en Venezuela";
const SITE_DESCRIPTION =
  "Automatizaciones, CCTV, páginas web, cableado estructurado y soporte técnico para empresas en Venezuela. Tecnología sin trabas: cotiza por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "CeroTraba",
    "servicios tecnológicos Venezuela",
    "instalación CCTV Venezuela",
    "cableado estructurado",
    "interconexiones entre sedes",
    "router WiFi",
    "automatización de procesos",
    "diseño de páginas web Venezuela",
    "soporte técnico Venezuela",
    "redes para empresas",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "CeroTraba",
    type: "website",
    locale: "es_VE",
    url: "/",
    images: [
      {
        url: "/og-cerotraba.jpg",
        width: 1200,
        height: 630,
        alt: "CeroTraba — Tecnología sin trabas: CCTV, Redes, Web y Soporte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-cerotraba.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101d34",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-VE" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
