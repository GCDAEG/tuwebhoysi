"use client";

import * as React from "react";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";

import { sections, type SectionId } from "@/lib/public/sections";
import { scrollToSectionWithLenis } from "@/lib/public/scroll-to-section";
import { cn } from "@/lib/utils";

export type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Panel móvil a pantalla completa: lista de secciones con el mismo comportamiento
 * de scroll que el menú desktop (Lenis + offset del navbar).
 */
export function MobileMenu({
  open,
  onOpenChange,
}: MobileMenuProps) {
  const lenis = useLenis();

  const close = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handlePick = (sectionId: SectionId) => {
    scrollToSectionWithLenis(lenis, sectionId);
    close();
  };

  /* Evita scroll de fondo mientras el menú está abierto */
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      id="public-mobile-menu"
      className="fixed inset-0 z-100 lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Capa oscura con blur */}
      <button
        type="button"
        aria-label="Cerrar menú"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={close}
      />

      <div
        className={cn(
          "absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-white/10 font-heading",
          "bg-slate-950/95 shadow-2xl shadow-blue-950/40 backdrop-blur-xl",
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Menú
          </span>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav aria-label="Secciones" className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="flex flex-col gap-1">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => handlePick(section.id)}
                  className={cn(
                    "w-full rounded-xl px-4 py-3 text-left text-base font-medium text-slate-100",
                    "transition-colors hover:bg-white/10 hover:text-white",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
                  )}
                >
                  {section.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
