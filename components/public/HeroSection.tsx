import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type HeroSectionProps = {
  title?: string;
  subtitle?: string;
  contactHref?: string;
  projectsHref?: string;
  className?: string;
};

const DEFAULT_TITLE = "Webs que venden. Experiencias que perduran.";
const DEFAULT_SUBTITLE =
  "Diseño y desarrollo a medida con enfoque en rendimiento, SEO y una presencia digital impecable. TUWEBHOY convierte visitas en clientes.";
const WHATSAPP_NUMBER = "543446648013"; // Reemplaza con tu número real
const WHATSAPP_MESSAGE = encodeURI(
  "¡Hola! Me interesa armar mi catálogo digital y empezar un proyecto con TUWEBHOY.",
);
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
export function HeroSection({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  contactHref = "/contacto",
  projectsHref = "#projects",
  className,
}: HeroSectionProps) {
  const projectsIsHash = projectsHref.startsWith("#");

  return (
    <Section
      id="hero"
      fullHeight
      className={cn(
        "relative flex flex-col justify-center bg-[#03060E] text-slate-50 selection:bg-blue-500 selection:text-white",
        className,
      )}
    >
      {/* Fondo arquitectónico: Grid nítido, sin difuminados excesivos */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:linear-gradient(to_bottom,white_20%,transparent_90%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          {/* Bloque principal (ocupa 8 columnas en desktop) */}
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* Tag estilo técnico en lugar de la típica píldora redonda */}
            <div className="mb-8 flex items-center gap-3 border-l-2 border-blue-500 pl-4">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Agencia Web // TUWEBHOY
              </span>
            </div>

            {/* Tipografía masiva y ajustada (tracking-tighter) para impacto editorial */}
            <h1 className="text-5xl font-extrabold tracking-tighter text-white sm:text-7xl lg:text-[5.5rem] leading-[0.95] mb-8">
              {/* Separamos la primera frase para darle el acento azul duro */}
              <span className="block text-blue-500">Webs que venden.</span>
              <span className="block text-slate-300">
                Experiencias que perduran.
              </span>
            </h1>
          </div>

          {/* Bloque secundario (ocupa 4 columnas) - Alineado a la derecha abajo */}
          <div className="lg:col-span-4 flex flex-col justify-end pb-2">
            <p className="text-lg font-light leading-relaxed text-slate-400 mb-8 border-t border-white/10 pt-6">
              {subtitle}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row w-full">
              {/* Botones con esquinas más marcadas para un look de software/dashboard */}
              <Button
                asChild
                size="lg"
                className="rounded-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold h-14 px-8 w-full sm:w-auto transition-colors"
              >
                {/* Cambiamos el <Link> de Next.js por un <a> estándar con target="_blank" */}
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Iniciar proyecto
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="ghost"
                className="group rounded-sm border border-slate-800 bg-transparent text-white hover:bg-slate-900 h-14 px-8 w-full sm:w-auto transition-all"
              >
                {projectsIsHash ? (
                  <a
                    href={projectsHref}
                    className="inline-flex items-center gap-3"
                  >
                    Ver el trabajo
                    <ArrowRight className="size-4 text-blue-500 transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <Link
                    href={projectsHref}
                    className="inline-flex items-center gap-3"
                  >
                    Ver el trabajo
                    <ArrowRight className="size-4 text-blue-500 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
