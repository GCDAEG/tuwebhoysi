import React from "react";
import { createClient } from "@supabase/supabase-js";
import { Globe, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

// Inicializamos el cliente público de Supabase para lecturas rápidas en el servidor
const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

interface PortfolioDemo {
  id: string;
  name: string;
  category: string;
  image_url: string;
  demo_url: string;
}

export default async function Demos() {
  // 1. Traemos las maquetas desde Supabase
  const { data: demos, error } = await supabasePublic
    .from("portfolio_demos")
    .select("id, name, category, image_url, demo_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al cargar el portafolio de demos:", error);
  }

  // Estado vacío: Si no hay proyectos, te da el botón de crear en el centro
  if (!demos || demos.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/5 pb-4">
          <h2 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
            Modelos de Catálogo
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center text-center py-16 border border-dashed border-zinc-200 dark:border-white/10 rounded-3xl bg-zinc-50/30 dark:bg-zinc-950/10 p-6">
          <p className="text-sm text-zinc-500 mb-4 font-medium">
            Todavía no cargaste ningún modelo de demostración en el portafolio.
          </p>
          <Link
            href="demos/new-demo"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus className="size-4" /> Agregar mi primera Demo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Encabezado con el botón de acción principal 🚀 */}
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
            Modelos de Catálogo
          </h2>
          <p className="text-xs text-zinc-500 font-medium">
            Gestioná los ejemplos vivos que se muestran en la Landing Page.
          </p>
        </div>

        <Link
          href="admin/demos/new-demo"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm shrink-0"
        >
          <Plus className="size-4" /> Nueva Demo
        </Link>
      </div>

      {/* Grilla de Demos */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo: PortfolioDemo) => (
          <div
            key={demo.id}
            className="group relative flex flex-col overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/5 dark:bg-zinc-950"
          >
            {/* Contenedor de la imagen */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative">
              <span className="absolute left-4 top-4 z-20 rounded-xl bg-black/60 backdrop-blur-md px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-white select-none">
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
                <h3 className="text-base font-black text-zinc-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {demo.name}
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  Modelo de tienda online interactiva
                </p>
              </div>

              <div className="pt-5 border-t border-zinc-100 dark:border-white/5 mt-4">
                <a
                  href={demo.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-50 border border-zinc-200/60 px-4 py-2.5 text-xs font-bold text-zinc-900 transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:bg-zinc-900 dark:border-white/5 dark:text-zinc-100 dark:hover:bg-blue-600"
                >
                  <Globe className="size-3.5 shrink-0" />
                  Probar Catálogo Vivo
                  <ArrowUpRight className="size-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
