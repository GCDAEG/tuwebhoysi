"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useLenis } from "lenis/react";

import { cn } from "@/lib/utils";
import { scrollToSectionWithLenis } from "@/lib/public/scroll-to-section";

import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

/** Píxeles de scroll antes de “separar” el nav del hero (solo en `/`). */
const HERO_MERGE_SCROLL_THRESHOLD = 28;

/**
 * Barra fija sobre el contenido: en la home, fundida con el hero hasta hacer scroll;
 * luego pasa a barra con glass más marcado. En otras rutas siempre va en modo “elevado”.
 */
export function Nav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isHome = pathname === "/";

  /**
   * `true` = aún “dentro” del hero visualmente (nav casi transparente).
   * En rutas distintas de `/` nunca se fusiona con un hero de landing.
   */
  const [mergedWithHero, setMergedWithHero] = React.useState(isHome);

  React.useEffect(() => {
    setMergedWithHero(isHome);
  }, [isHome]);

  React.useEffect(() => {
    if (!lenis) return;

    const syncMerged = () => {
      if (!isHome) {
        setMergedWithHero(false);
        return;
      }
      setMergedWithHero(lenis.scroll <= HERO_MERGE_SCROLL_THRESHOLD);
    };

    syncMerged();
    const unsubscribe = lenis.on("scroll", syncMerged);
    return unsubscribe;
  }, [lenis, isHome]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    e.preventDefault();
    scrollToSectionWithLenis(lenis, "hero");
  };

  const showHeroMerge = isHome && mergedWithHero;

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-out",
          showHeroMerge
            ? "border-b border-white/6 bg-slate-950/20 shadow-none backdrop-blur-md supports-backdrop-filter:bg-slate-950/10"
            : "border-b border-white/10 bg-slate-950/70 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.45)] backdrop-blur-xl supports-backdrop-filter:bg-slate-950/55",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex shrink-0 items-center gap-0.5 font-heading text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90"
          >
            TUWEB
            <span className="text-blue-500">HOY</span>
          </Link>

          <DesktopMenu
            className="font-heading"
            variant={showHeroMerge ? "onHero" : "elevated"}
          />

          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-lg p-2.5 lg:hidden",
              "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
              showHeroMerge
                ? "text-white hover:bg-white/10"
                : "text-slate-200 hover:bg-white/10 hover:text-white",
            )}
            aria-expanded={mobileOpen}
            aria-controls="public-mobile-menu"
            aria-label="Abrir menú"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}
