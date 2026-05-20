"use client";

import * as React from "react";
import { ReactLenis } from "lenis/react";

import { SECTION_SCROLL_OFFSET_PX } from "@/lib/public/sections";

type LenisProviderProps = {
  children: React.ReactNode;
};

/**
 * Proveedor global de Lenis para la zona pública:
 * - `root`: instancia asociada al documento (scroll vertical de la página).
 * - `autoRaf`: loop de animación gestionado por Lenis.
 * - `anchors`: enlaces `#...` respetan el offset del navbar (misma UX que el menú).
 */
export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.09,
        smoothWheel: true,
        anchors: {
          offset: -SECTION_SCROLL_OFFSET_PX,
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}
