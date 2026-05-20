import type { Metadata } from "next";
import { Geist_Mono, Merriweather, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Nav } from "@/components/public/Nav/Nav";

/** H1 y títulos principales (p. ej. hero). */
const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "700", "900"],
});

/** h2, h3, h4 y navegación pública. */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

/** Cuerpo, párrafos, UI y botones (vía `font-sans` en base). */
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tu Web Hoy",
    template: "%s | Tu Web Hoy",
  },

  description:
    "Creamos páginas web simples y modernas para emprendedores. Ideales para mostrar tu negocio y empezar a vender.",

  openGraph: {
    title: "Tu web lista en días 🚀",
    description:
      "Páginas web modernas, claras y accesibles. Ideal para emprendedores y negocios chicos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tu Web Hoy - Páginas web listas en días",
      },
    ],
    type: "website",
    locale: "es_AR",
  },

  twitter: {
    card: "summary_large_image",
    title: "Tu web lista en días",
    description:
      "Webs modernas y accesibles para emprendedores. Lista para compartir y vender.",
    images: ["/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(
        "h-full",
        "antialiased",
        merriweather.variable,
        montserrat.variable,
        roboto.variable,
        geistMono.variable,
        "font-sans",
      )}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
