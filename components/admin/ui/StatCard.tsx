import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: LucideIcon;
  className?: string;
};

/** Tarjeta de métrica con estilo minimal y acento azul. */
export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/15 bg-white/60 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/50",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-heading text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            {label}
          </p>
          <p className="mt-1 font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {value}
          </p>
          {hint ? (
            <p className="mt-1 font-sans text-xs text-zinc-500 dark:text-zinc-400">
              {hint}
            </p>
          ) : null}
        </div>
        {Icon ? (
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/12 text-blue-600">
            <Icon className="size-5" />
          </span>
        ) : null}
      </div>
    </div>
  );
}
