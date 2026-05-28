import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DemoCard } from "./DemoCard";
import { getDemos } from "@/app/(admin)/admin/demos/actions";

export default async function Demos() {
  const demos = await getDemos();

  if (!demos || demos.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-white/5">
          <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
            Modelos de Catálogo
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/30 p-6 py-16 text-center dark:border-white/10 dark:bg-zinc-950/10">
          <p className="mb-4 text-sm font-medium text-zinc-500">
            Todavía no cargaste ningún modelo de demostración en el portafolio.
          </p>
          <Link
            href="/admin/demos/new-demo"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-blue-700"
          >
            <Plus className="size-4" /> Agregar mi primera Demo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-white/5">
        <div>
          <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
            Modelos de Catálogo
          </h2>
          <p className="text-xs font-medium text-zinc-500">
            Gestioná los ejemplos vivos que se muestran en la Landing Page.
          </p>
        </div>

        <Link
          href="/admin/demos/new-demo"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-blue-700"
        >
          <Plus className="size-4" /> Nueva Demo
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo) => (
          <DemoCard key={demo.id} demo={demo} />
        ))}
      </div>
    </div>
  );
}
