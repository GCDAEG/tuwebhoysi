import Link from "next/link";
import { BarChart3 } from "lucide-react";

/** Resumen de analíticas con enlace a la sección completa. */
export function AnalyticsCard() {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/50">
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/12 text-blue-600">
          <BarChart3 className="size-6" />
        </span>
        <div>
          <h2 className="font-heading text-lg font-semibold text-zinc-900 dark:text-white">
            Analíticas
          </h2>
          <p className="mt-1 font-sans text-sm text-zinc-600 dark:text-zinc-400">
            Tráfico, conversiones y embudo. Integración pendiente (GA4 / Plausible).
          </p>
          <Link
            href="/client/analytics"
            className="mt-4 inline-block font-sans text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Ver informes
          </Link>
        </div>
      </div>
    </div>
  );
}
