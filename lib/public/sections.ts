/**
 * Secciones ancla de la landing pública.
 * Los `id` deben coincidir con los atributos `id` en el DOM (Hero, proyectos, etc.).
 */
export const sections = [
  { id: "hero", name: "Inicio" },
  { id: "projects", name: "Proyectos" },
  { id: "features", name: "Por qué nosotros" },
  { id: "steps", name: "Proceso" },
  // Agrega más si es necesario
] as const;

/** Un ítem del menú de navegación (inferido desde `sections`). */
export type SectionEntry = (typeof sections)[number];

/** Identificador de sección válido para scroll y tipado estricto. */
export type SectionId = SectionEntry["id"];

/** Altura del navbar (`h-16` = 4rem). */
export const NAV_BAR_HEIGHT_PX = 64;

/**
 * Aire extra bajo el nav al encuadrar anclas (títulos no pegados al borde inferior del nav).
 * Debe coincidir con `scroll-padding-top` en `app/globals.css` y con el offset de Lenis.
 */
export const NAV_ANCHOR_GAP_PX = 12;

/** Offset total para `lenis.scrollTo` y enlaces `#` (altura nav + respiro). */
export const SECTION_SCROLL_OFFSET_PX = NAV_BAR_HEIGHT_PX + NAV_ANCHOR_GAP_PX;
