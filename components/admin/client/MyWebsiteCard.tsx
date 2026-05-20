import Link from "next/link";
import { ExternalLink, Globe } from "lucide-react";

/**
 * Tarjeta de acceso a la gestión de la web del cliente.
 */
export function MyWebsiteCard() {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/50">
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/12 text-blue-600">
          <Globe className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-heading text-lg font-semibold text-zinc-900 dark:text-white">
            Tu página web
          </h2>
          <p className="mt-1 font-sans text-sm text-zinc-600 dark:text-zinc-400">
            Dominio, tema, secciones y textos desde un solo lugar.
          </p>
          <Link
            href="/client/website"
            className="mt-4 inline-flex items-center gap-2 font-sans text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Gestionar sitio
            <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
