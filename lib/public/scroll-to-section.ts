import type Lenis from "lenis";

import { SECTION_SCROLL_OFFSET_PX, type SectionId } from "@/lib/public/sections";

/**
 * Desplaza la vista hasta la sección con Lenis (suavizado + offset = nav + margen de encuadre).
 * Si Lenis aún no está montado, no hace nada.
 */
export function scrollToSectionWithLenis(
  lenis: Lenis | undefined | null,
  sectionId: SectionId,
): void {
  if (!lenis) return;
  lenis.scrollTo(`#${sectionId}`, {
    offset: -SECTION_SCROLL_OFFSET_PX,
  });
}
