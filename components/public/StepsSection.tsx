import * as React from "react";

import { Section } from "@/components/Section";
import { cn } from "@/lib/utils";

/** Un paso del proceso (título + descripción corta). */
export type ProcessStep = {
  id: string;
  /** Número mostrado en el badge (ej. "01"). */
  step: string;
  title: string;
  description: string;
};

export type StepsSectionProps = {
  sectionTitle?: string;
  /** Pasos del proceso; por defecto los 3 definidos en el brief. */
  steps?: ProcessStep[];
  className?: string;
};

const DEFAULT_STEPS: ProcessStep[] = [
  {
    id: "1",
    step: "01",
    title: "Consulta inicial",
    description:
      "Escuchamos objetivos, público y referencias. Alineamos expectativas y calendario.",
  },
  {
    id: "2",
    step: "02",
    title: "Definimos tu web",
    description:
      "Arquitectura de información, wireframes ligeros y diseño UI con tu marca en el centro.",
  },
  {
    id: "3",
    step: "03",
    title: "Tu web lista",
    description:
      "Desarrollo, pruebas, SEO básico y puesta en marcha. Formación breve para que mandes tú.",
  },
];

/**
 * Proceso en tres hitos: en mobile, columna con timeline vertical;
 * en desktop, tres columnas con barra horizontal sutil entre badges.
 */
export function StepsSection({
  sectionTitle = "Nuestro Proceso",
  steps = DEFAULT_STEPS,
  className,
}: StepsSectionProps) {
  return (
    <Section
      id="steps"
      className={cn(
        "border-y border-border/60 bg-muted/30 dark:bg-slate-950/50",
        className,
      )}
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {sectionTitle}
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Tres fases claras. Sin sorpresas: entregas parciales y feedback continuo.
        </p>
      </div>

      <div className="relative">
        {/* Timeline vertical solo en pantallas estrechas */}
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-4.5 w-px bg-linear-to-b from-blue-600/45 via-border to-transparent lg:hidden"
        />

        {/* Barra horizontal entre pasos en desktop (no ocupa celdas del grid) */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-4.5 right-[10%] left-[10%] hidden h-px bg-linear-to-r from-transparent via-blue-600/35 to-transparent lg:block"
        />

        <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
          {steps.map((item) => (
            <li
              key={item.id}
              className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-6 lg:text-center"
            >
              <div className="flex shrink-0 justify-center lg:w-full">
                <span
                  className={cn(
                    "relative z-1 flex size-9 items-center justify-center rounded-full border text-xs font-bold tracking-widest",
                    "border-blue-600/30 bg-background text-blue-600 shadow-sm ring-4 ring-muted/30 dark:bg-slate-950 dark:ring-slate-900/80",
                  )}
                >
                  {item.step}
                </span>
              </div>

              <div className="min-w-0 flex-1 space-y-2 rounded-2xl border border-border/70 bg-card/90 p-6 text-left shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-600/25 hover:shadow-md lg:text-center">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
