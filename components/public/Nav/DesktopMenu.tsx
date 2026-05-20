"use client";

import * as React from "react";
import { useLenis } from "lenis/react";

import { sections, type SectionId } from "@/lib/public/sections";
import { scrollToSectionWithLenis } from "@/lib/public/scroll-to-section";
import { cn } from "@/lib/utils";

export type DesktopMenuProps = {
  /** Clases extra del contenedor (p. ej. `font-heading` desde el padre). */
  className?: string;
  /** Estilo según si el nav sigue fundido con el hero o ya hizo scroll. */
  variant?: "onHero" | "elevated";
};

/**
 * Enlaces de ancla en barra horizontal (solo lg+).
 * Usa la instancia global de Lenis (`ReactLenis root`) para scroll suave.
 */
export function DesktopMenu({
  className,
  variant = "elevated",
}: DesktopMenuProps) {
  const lenis = useLenis();

  const handleSection = (sectionId: SectionId) => {
    scrollToSectionWithLenis(lenis, sectionId);
  };

  return (
    <nav
      aria-label="Secciones"
      className={cn("hidden items-center lg:flex", className)}
    >
      <ul className="flex items-center gap-1">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              onClick={() => handleSection(section.id)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200",
                "hover:bg-white/10 hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2",
                variant === "onHero"
                  ? "text-white/90 focus-visible:ring-offset-transparent"
                  : "text-slate-200/90 focus-visible:ring-offset-slate-950/80",
              )}
            >
              {section.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
