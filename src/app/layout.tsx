import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CeroTraba — Tecnología sin trabas",
  description:
    "Automatizaciones inteligentes, CCTV, páginas web que convierten, redes con dirección y soporte técnico. CeroTraba quita las trabas tecnológicas de tu negocio.",
  keywords: [
    "CeroTraba",
    "automatización",
    "CCTV",
    "videovigilancia",
    "páginas web",
    "soporte técnico",
    "redes sociales",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "CeroTraba — Tecnología sin trabas",
    description:
      "Tu negocio avanza cuando la tecnología deja de frenarte. Automatizamos, protegemos y potenciamos lo que hace posible tu trabajo.",
    siteName: "CeroTraba",
    type: "website",
    locale: "es_VE",
  },
  twitter: {
    card: "summary_large_image",
    title: "CeroTraba — Tecnología sin trabas",
    description:
      "Automatizaciones, CCTV, webs que convierten, redes y soporte técnico para tu negocio.",
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
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
