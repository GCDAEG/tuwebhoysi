"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { UserMenu } from "@/components/admin/common/UserMenu";
import { useDashboardSession } from "@/components/admin/DashboardSessionContext";
import { cn } from "@/lib/utils";

export type HeaderProps = {
  onOpenMobileNav: () => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
};

/** Títulos legibles por segmento de ruta (MVP). */
function titleFromPath(pathname: string): string {
  if (pathname.includes("/dashboard")) return "Dashboard";
  if (pathname.includes("/clients")) return "Clientes";
  if (pathname.includes("/revenue")) return "Ingresos";
  if (pathname.includes("/stats")) return "Estadísticas";
  if (pathname.includes("/websites")) return "Webs";
  if (pathname.includes("/new-store")) return "Alta de negocio";
  if (pathname.includes("/billing")) return "Facturación";
  if (pathname.includes("/website")) return "Mi página web";
  if (pathname.includes("/catalog")) return "Catálogo";
  if (pathname.includes("/social")) return "Redes sociales";
  if (pathname.includes("/analytics")) return "Analíticas";
  if (pathname.includes("/content")) return "Contenido";
  return "Panel";
}

/**
 * Cabecera fija con glass: acciones móvil / colapso desktop y menú de usuario.
 */
export function Header({
  onOpenMobileNav,
  sidebarCollapsed,
  onToggleSidebar,
}: HeaderProps) {
  const pathname = usePathname();
  const { role } = useDashboardSession();
  const title = titleFromPath(pathname);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 sm:px-6",
        "bg-white/65 shadow-sm backdrop-blur-xl dark:bg-zinc-950/70",
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 lg:hidden dark:text-zinc-200 dark:hover:bg-white/10"
          aria-label="Abrir menú"
          onClick={onOpenMobileNav}
        >
          <Menu className="size-5" />
        </button>

        <button
          type="button"
          className="hidden rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 lg:inline-flex dark:text-zinc-300 dark:hover:bg-white/10"
          aria-label={
            sidebarCollapsed ? "Expandir barra lateral" : "Colapsar barra lateral"
          }
          onClick={onToggleSidebar}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className="size-5" />
          ) : (
            <PanelLeftClose className="size-5" />
          )}
        </button>

        <div className="min-w-0">
          <p className="font-heading text-[10px] font-semibold uppercase tracking-widest text-blue-600">
            {role === "admin" ? "Administración" : "Tu web"}
          </p>
          <p className="font-display truncate text-lg font-bold tracking-tight text-zinc-900 dark:text-white sm:text-xl">
            {title}
          </p>
        </div>
      </div>

      <UserMenu />
    </header>
  );
}
