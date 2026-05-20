"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { getNavSectionsForRole } from "@/components/admin/nav-config";
import { useDashboardSession } from "@/components/admin/DashboardSessionContext";
import { cn } from "@/lib/utils";

export type MobileSidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Drawer móvil (< lg) con la misma navegación que `Sidebar` (misma config por rol).
 */
export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const { role } = useDashboardSession();
  const pathname = usePathname();
  const sections = getNavSectionsForRole(role);

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
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navegación"
    >
      <button
        type="button"
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
        aria-label="Cerrar menú"
        onClick={() => onOpenChange(false)}
      />

      <aside
        className={cn(
          "absolute inset-y-0 left-0 flex w-[min(100%,18rem)] flex-col border-r border-white/10",
          "bg-white/90 shadow-2xl backdrop-blur-xl dark:bg-zinc-950/95",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-white/10 px-4 dark:border-white/10">
          <span className="font-heading text-lg font-bold text-zinc-900 dark:text-white">
            TUWEB<span className="text-blue-600">HOY</span>
          </span>
          <button
            type="button"
            className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10"
            aria-label="Cerrar"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="mb-2 px-2 font-heading text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                {section.title}
              </p>
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
                        onClick={() => onOpenChange(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 font-sans text-sm font-medium transition-colors",
                          active
                            ? "bg-blue-600/12 text-blue-700 dark:text-blue-300"
                            : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5",
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
}
