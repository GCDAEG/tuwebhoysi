import * as React from "react";
import { createClient } from "@supabase/supabase-js";
import { Section } from "@/components/Section";
import { cn } from "@/lib/utils";

// Inicializamos el cliente público de Supabase para lectura en servidor
const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export type ProjectShowcaseProps = {
  heading?: string;
  subheading?: string;
  className?: string;
};

// Tipo basado en tu tabla portfolio_demos
type PortfolioDemo = {
  id: string;
  name: string;
  category: string;
  image_url: string;
  demo_url: string;
};

/**
 * Rejilla responsive de tarjetas de proyecto conectada a Supabase.
 */
export default async function ProjectShowcase({
  heading = "Catálogos de demostración en vivo",
  subheading = "Explorá nuestros modelos de tiendas online adaptados a diferentes rubros. Tocá cualquiera para probar la experiencia.",
  className,
}: ProjectShowcaseProps) {
  // Fetch a la base de datos (se ejecuta en el servidor)
  const { data: projects, error } = await supabasePublic
    .from("portfolio_demos")
    .select("id, name, category, image_url, demo_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando demos:", error);
  }

  return (
    <Section
      id="projects"
      className={cn("bg-slate-50/80 dark:bg-slate-950/40", className)}
    >
      <div className="mx-auto mb-14 max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subheading}
        </p>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-zinc-300 dark:border-white/10 rounded-2xl">
          <p className="text-muted-foreground">
            Las demostraciones estarán disponibles pronto.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {projects.map((project: PortfolioDemo) => (
            <li key={project.id}>
              {/* Envolvemos el article en un link para ir al catálogo */}
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <article
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm ring-1 ring-black/5 transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/10 hover:ring-blue-600/15 dark:ring-white/10 dark:hover:shadow-blue-500/10",
                  )}
                >
                  {/* Contenedor de imagen: escala suave al hover */}
                  <div className="relative aspect-4/3 overflow-hidden bg-muted">
                    <img
                      src={project.image_url}
                      alt={`Demo de ${project.name}`}
                      className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    {/* Overlay con gradiente para contraste del texto al hover */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-sm font-medium text-white drop-shadow-sm">
                        Probar catálogo en vivo
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {project.name}
                    </h3>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {project.category}
                    </p>
                  </div>
                </article>
              </a>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
