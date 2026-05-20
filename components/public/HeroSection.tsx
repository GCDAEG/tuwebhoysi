import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type HeroSectionProps = {
  /** Título principal del hero (impacto / H1 semántico). */
  title?: string;
  /** Texto de apoyo bajo el título. */
  subtitle?: string;
  /** Destino del CTA principal (contacto). */
  contactHref?: string;
  /** Destino del CTA secundario: ancla (`#projects`) o ruta interna. */
  projectsHref?: string;
  className?: string;
};

const DEFAULT_TITLE = "Webs que venden. Experiencias que perduran.";
const DEFAULT_SUBTITLE =
  "Diseño y desarrollo a medida con enfoque en rendimiento, SEO y una presencia digital impecable. TUWEBHOY convierte visitas en clientes.";

/**
 * Hero de landing: viewport completo; el nav fijo va encima del gradiente y el
 * contenido lleva `pt-16` para no solaparse con la barra.
 */
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
        "relative flex flex-col justify-center overflow-hidden bg-linear-to-b from-slate-950 via-[#071225] to-slate-950 text-slate-50",
        /* Halos suaves usando tokens del tema (`globals.css`) para coherencia con la marca */
        "before:pointer-events-none before:absolute before:-left-1/4 before:top-0 before:h-[min(520px,55vh)] before:w-[min(720px,70vw)] before:rounded-full before:bg-(--public-hero-glow-soft) before:blur-3xl",
        "after:pointer-events-none after:absolute after:-right-1/4 after:bottom-0 after:h-[min(480px,50vh)] after:w-[min(640px,65vw)] after:rounded-full after:bg-(--public-hero-glow) after:opacity-50 after:blur-3xl",
        className,
      )}
    >
      {/* Capa de ruido / grid muy sutil para profundidad sin recargar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.03)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl space-y-10 pt-16 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-(--public-glass-border) bg-(--public-glass-bg) px-4 py-1.5 text-xs font-medium tracking-wide text-slate-200 backdrop-blur-md lg:justify-start">
          <span className="size-1.5 rounded-full bg-blue-500 shadow-[0_0_12px_oklch(0.55_0.2_262)]" />
          TUWEBHOY — agencia web
        </div>

        <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        <p className="text-lg leading-relaxed text-slate-400 sm:text-xl">
          {subtitle}
        </p>

        <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
          <Button asChild size="lg" className="shadow-lg shadow-blue-600/25">
            <Link href={contactHref}>Contactar</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white backdrop-blur-md hover:border-white/35 hover:bg-white/10 hover:text-white"
          >
            {projectsIsHash ? (
              <a
                href={projectsHref}
                className="inline-flex items-center gap-2"
              >
                Ver proyectos
                <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
              </a>
            ) : (
              <Link
                href={projectsHref}
                className="inline-flex items-center gap-2"
              >
                Ver proyectos
                <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
              </Link>
            )}
          </Button>
        </div>
      </div>
    </Section>
  );
}
