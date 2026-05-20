import * as React from "react";

import { cn } from "@/lib/utils";

export type StatsGridProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Rejilla responsive para tarjetas de métricas (`StatCard` u otros hijos).
 */
export function StatsGrid({ children, className }: StatsGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
