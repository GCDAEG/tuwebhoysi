"use client";

import React, { useTransition } from "react";
import { Globe, ArrowUpRight, Trash2, Edit, Loader2 } from "lucide-react";
import Link from "next/link";
import { deleteDemo, PortfolioDemo } from "@/app/(admin)/admin/demos/actions";

interface DemoCardProps {
  demo: PortfolioDemo;
}

export function DemoCard({ demo }: DemoCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      `¿Estás seguro de que querés eliminar la demo "${demo.name}"? Esta acción no se puede deshacer.`,
    );

    if (confirmed) {
      startTransition(async () => {
        try {
          await deleteDemo(demo.id);
        } catch (error) {
          alert("Hubo un error al eliminar la demo.");
        }
      });
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/5 dark:bg-zinc-950">
      {/* Botones de Administración (Flotantes arriba a la derecha) */}
      <div className="absolute right-3 top-3 z-30 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Link
          href={`/admin/demos/${demo.id}/edit`}
          className="flex size-8 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-sm backdrop-blur-md transition-hover hover:bg-blue-50 hover:text-blue-600 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
          title="Editar Demo"
        >
          <Edit className="size-4" />
        </Link>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="flex size-8 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-sm backdrop-blur-md transition-hover hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-red-900/30 dark:hover:text-red-400"
          title="Eliminar Demo"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-4" />
          )}
        </button>
      </div>

      {/* Contenedor de la imagen */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100 relative dark:bg-zinc-900">
        <span className="absolute left-4 top-4 z-20 rounded-xl bg-black/60 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-white select-none backdrop-blur-md">
          {demo.category}
        </span>
        <img
          src={demo.image_url}
          alt={`Miniatura de ${demo.name}`}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      {/* Datos e Interacción */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-1">
          <h3 className="text-base font-black tracking-tight text-zinc-950 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {demo.name}
          </h3>
          <p className="text-xs font-medium text-zinc-500">
            Modelo de tienda online interactiva
          </p>
        </div>

        <div className="mt-4 border-t border-zinc-100 pt-5 dark:border-white/5">
          <a
            href={demo.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200/60 bg-zinc-50 px-4 py-2.5 text-xs font-bold text-zinc-900 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white dark:border-white/5 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-blue-600"
          >
            <Globe className="size-3.5 shrink-0" />
            Probar Catálogo Vivo
            <ArrowUpRight className="size-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
