"use client";

import * as React from "react";
import { ChevronDown, LogOut, User } from "lucide-react";

import { useDashboardSession } from "@/components/admin/DashboardSessionContext";
import { cn } from "@/lib/utils";

/**
 * Menú compacto del usuario: email, rol y cierre de sesión (POST `/auth/signout`).
 */
export function UserMenu() {
  const { email, role } = useDashboardSession();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const initial = (email?.[0] ?? "?").toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-xl border border-white/15 bg-white/40 px-2 py-1.5 font-sans text-sm shadow-sm backdrop-blur-md transition-colors hover:bg-white/60 dark:border-white/10 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/80",
        )}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="flex size-8 items-center justify-center rounded-lg bg-blue-600 font-heading text-xs font-bold text-white">
          {initial}
        </span>
        <span className="hidden max-w-[10rem] truncate text-left text-zinc-800 dark:text-zinc-100 sm:block">
          {email ?? "Usuario"}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-zinc-500 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div
          className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-white/15 bg-white/90 py-1 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/95"
          role="menu"
        >
          <div className="border-b border-zinc-200/80 px-3 py-2 dark:border-white/10">
            <p className="truncate font-sans text-xs text-zinc-500 dark:text-zinc-400">
              {email}
            </p>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-wider text-blue-600">
              {role === "admin" ? "Administrador" : "Cliente"}
            </p>
          </div>

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-2 px-3 py-2 font-sans text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
              role="menuitem"
            >
              <LogOut className="size-4" />
              Cerrar sesión
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
