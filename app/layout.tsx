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
  // Define la URL base de tu sitio para que las imágenes se carguen correctamente
  metadataBase: new URL("https://tuwebhoysi.com.ar"),

  title: {
    default: "TUWEBHOY | Páginas web que sirven",
    template: "%s | TUWEBHOY",
  },

  description:
    "Digitalizá tu emprendimiento. Recibí pedidos organizados directo en tu WhatsApp. Sin comisiones, rápido y autogestionable.",

  keywords: [
    "catálogo digital",
    "pedidos por whatsapp",
    "menú online",
    "ecommerce para pizzerías",
    "Gualeguaychú",
    "ventas online",
    "portfolio",
    "diseño web",
    "desarrollo web",
    "agencia web",
    "catálogo interactivo",
    "digitalización de comercios",
    "ventas por whatsapp",
    "menú digital",
    "ecommerce para restaurantes",
    "Gualeguaychú",
    "ventas online",
  ],

  openGraph: {
    title: "Tu negocio en el celular de tus clientes 📲",
    description:
      "Transformá tu lista de precios en un catálogo interactivo. Pedidos automáticos a tu WhatsApp sin vueltas.",
    url: "https://tuwebhoysi.com.ar",
    siteName: "TUWEBHOY",
    images: [
      {
        url: "/og-image.png", // Debes tener este archivo en tu carpeta /public
        width: 1200,
        height: 630,
        alt: "Vista previa de catálogos digitales TUWEBHOY",
      },
    ],
    type: "website",
    locale: "es_AR",
  },

  twitter: {
    card: "summary_large_image",
    title: "TUWEBHOY | Páginas web que sirven",
    description:
      "Digitalizá tu emprendimiento. La forma más fácil de vender por WhatsApp.",
    images: ["/og-image.png"],
  },

  // Esto ayuda a que el color de la barra del navegador en el celular combine con tu marca
  themeColor: "#2563eb",
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
