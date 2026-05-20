import * as React from "react";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

/** Bloque vacío reutilizable (listas, tablas, secciones sin datos). */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300/90 bg-white/40 px-6 py-14 text-center dark:border-white/15 dark:bg-zinc-900/30",
        className,
      )}
    >
      {Icon ? (
        <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600">
          <Icon className="size-6" />
        </span>
      ) : null}
      <h2 className="font-heading text-lg font-semibold text-zinc-900 dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-sm font-sans text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
