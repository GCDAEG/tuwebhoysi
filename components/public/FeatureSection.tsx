import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Gauge, Headphones, Rocket, Shield } from "lucide-react";

import { Section } from "@/components/Section";
import { cn } from "@/lib/utils";

/** Cada beneficio: icono de Lucide + copy corto. */
export type FeatureItem = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export type FeatureSectionProps = {
  /** Título visible de la sección. */
  sectionTitle?: string;
  /** Lista de beneficios a renderizar (3–4 recomendado). */
  features: FeatureItem[];
  className?: string;
};

/** Beneficios por defecto alineados con propuesta TUWEBHOY. */
export const DEFAULT_FEATURES: FeatureItem[] = [
  {
    id: "speed",
    icon: Rocket,
    title: "Velocidad real",
    description:
      "Core Web Vitals en mente desde el primer commit: menos rebote, más conversión.",
  },
  {
    id: "quality",
    icon: Gauge,
    title: "Calidad técnica",
    description:
      "TypeScript, accesibilidad y componentes reutilizables para escalar sin deuda.",
  },
  {
    id: "support",
    icon: Headphones,
    title: "Acompañamiento",
    description:
      "Te explicamos cada fase con claridad: sin jerga innecesaria, con decisiones medibles.",
  },
  {
    id: "security",
    icon: Shield,
    title: "Base sólida",
    description:
      "Buenas prácticas de seguridad y despliegues estables para dormir tranquilo.",
  },
];

/**
 * Bloque “Por qué elegirnos”: rejilla de cards con icono, vidrio sutil y mucho aire.
 */
export function FeatureSection({
  sectionTitle = "Por qué elegir TUWEBHOY",
  features,
  className,
}: FeatureSectionProps) {
  return (
    <Section id="features" className={cn("bg-background", className)}>
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {sectionTitle}
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Menos ruido, más impacto: diseño sobrio con acentos en azul marca.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <li key={feature.id}>
              <article
                className={cn(
                  "flex h-full flex-col gap-4 rounded-2xl border border-border/80 p-6 transition-all duration-300",
                  "bg-(--public-glass-bg) backdrop-blur-md",
                  "hover:-translate-y-0.5 hover:border-blue-600/25 hover:shadow-lg hover:shadow-blue-600/5",
                )}
              >
                <div
                  className={cn(
                    "inline-flex size-12 items-center justify-center rounded-xl border border-blue-600/15",
                    "bg-blue-600/10 text-blue-600 dark:text-blue-400",
                  )}
                >
                  <Icon className="size-6" aria-hidden />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
