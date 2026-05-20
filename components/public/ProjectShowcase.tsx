import * as React from "react";
import Image from "next/image";

import { Section } from "@/components/Section";
import { cn } from "@/lib/utils";

/** Un ítem de proyecto listo para mapear en la rejilla. */
export type ProjectShowcaseItem = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type ProjectShowcaseProps = {
  /** Colección de proyectos a mostrar. */
  projects: ProjectShowcaseItem[];
  /** Título de sección opcional. */
  heading?: string;
  /** Subtítulo breve bajo el encabezado. */
  subheading?: string;
  className?: string;
};

/** Datos de ejemplo (Unsplash) — sustituir por CMS o props reales en producción. */
export const DEMO_PROJECTS: ProjectShowcaseItem[] = [
  {
    id: "1",
    title: "E-commerce premium",
    description: "Checkout fluido, catálogo veloz y diseño minimal orientado a conversión.",
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    imageAlt: "Panel de analítica en pantalla",
  },
  {
    id: "2",
    title: "Marca corporativa",
    description: "Identidad digital coherente, tipografía contundente y espacio en blanco.",
    imageSrc:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80",
    imageAlt: "Diseño en mesa de trabajo",
  },
  {
    id: "3",
    title: "Web producto SaaS",
    description: "Landing modular, pruebas sociales y secciones con glass sutil.",
    imageSrc:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80",
    imageAlt: "Equipo revisando producto en laptop",
  },
];

/**
 * Rejilla responsive de tarjetas de proyecto: hover con escala + overlay legible.
 */
export function ProjectShowcase({
  projects,
  heading = "Proyectos destacados",
  subheading = "Selección de piezas recientes con foco en claridad, rendimiento y detalle.",
  className,
}: ProjectShowcaseProps) {
  return (
    <Section
      id="projects"
      className={cn(
        "bg-slate-50/80 dark:bg-slate-950/40",
        className,
      )}
    >
      <div className="mx-auto mb-14 max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subheading}
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {projects.map((project) => (
          <li key={project.id}>
            <article
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm ring-1 ring-black/5 transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/10 hover:ring-blue-600/15 dark:ring-white/10 dark:hover:shadow-blue-500/10",
              )}
            >
              {/* Contenedor de imagen: escala suave al hover */}
              <div className="relative aspect-4/3 overflow-hidden bg-muted">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                {/* Overlay con gradiente para contraste del texto al hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-medium text-white drop-shadow-sm">
                    Ver detalle
                  </p>
                </div>
              </div>

              <div className="space-y-2 p-6">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
