"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // 👈 Agregamos useRouter
import { Globe, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { getNavSectionsForRole } from "@/components/admin/nav-config";
import { useDashboardSession } from "@/components/admin/DashboardSessionContext";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export type SidebarProps = {
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

export function Sidebar({ collapsed, onToggleCollapsed }: SidebarProps) {
  const { role, email } = useDashboardSession();
  const pathname = usePathname();
  const router = useRouter(); // 👈 Inicializamos el router para redirigir
  const sections = getNavSectionsForRole(role);

  // ✅ FUNCIÓN DE CIERRE DE SESIÓN
  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();

      // Forzamos un refresco y redirigimos a la raíz (Landing pública)
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/10 bg-white/70 shadow-sm backdrop-blur-xl dark:bg-zinc-950/80 lg:flex",
        "transition-[width] duration-300 ease-out",
        collapsed ? "w-[4.5rem]" : "w-64",
      )}
    >
      <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-3 dark:border-white/10">
        <Link
          href={role === "admin" ? "/admin/dashboard" : "/client/dashboard"}
          className={cn(
            "font-heading font-bold tracking-tight text-zinc-900 dark:text-white",
            collapsed
              ? "mx-auto flex size-10 items-center justify-center rounded-xl bg-blue-600/15 text-base text-blue-600"
              : "text-lg",
          )}
          aria-label="Inicio panel"
        >
          {collapsed ? (
            "T"
          ) : (
            <>
              TUWEB<span className="text-blue-600">HOY</span>
            </>
          )}
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4">
        {sections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="mb-2 px-2 font-heading text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 font-sans text-sm font-medium transition-colors",
                        collapsed && "justify-center px-0",
                        active
                          ? "bg-blue-600/12 text-blue-700 dark:text-blue-300"
                          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5",
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-4 shrink-0",
                          active
                            ? "text-blue-600"
                            : "text-zinc-500 dark:text-zinc-400",
                        )}
                      />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-auto space-y-1 border-t border-white/10 p-3 dark:border-white/10">
        <button
          type="button"
          onClick={onToggleCollapsed}
          className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg py-2 font-sans text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5"
          aria-label={
            collapsed ? "Expandir barra lateral" : "Colapsar barra lateral"
          }
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <>
              <PanelLeftClose className="size-4" />
              <span className="hidden xl:inline">Colapsar</span>
            </>
          )}
        </button>

        {!collapsed && (
          <p className="truncate px-2 pb-2 font-sans text-[10px] text-zinc-500 dark:text-zinc-400">
            {email}
          </p>
        )}

        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2 font-sans text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5",
            collapsed && "justify-center px-0",
          )}
          title={collapsed ? "Sitio público" : undefined}
        >
          <Globe className="size-4 shrink-0" />
          {!collapsed && <span>Sitio público</span>}
        </Link>

        {/* ✅ CAMBIO AQUÍ: Quitamos el <form> viejo y pasamos el evento onClick al botón */}
        <button
          type="button"
          onClick={handleSignOut}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2 font-sans text-sm text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30",
            collapsed && "justify-center px-0",
          )}
          title={collapsed ? "Cerrar sesión" : undefined}
        >
          <LogOut className="size-4 shrink-0" />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}
