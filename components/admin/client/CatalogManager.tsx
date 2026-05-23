import { Plus, FolderTree } from "lucide-react";
import Link from "next/link";
import { getClientProducts } from "@/lib/supabase/products";
import { ProductGrid } from "@/app/(dashboard)/client/catalog/ProductGrid";
import { ProductCatalog } from "@/types/catalog";

/**
 * Placeholder del gestor de catálogo (productos / servicios).
 */
export async function CatalogManager() {
  const products: ProductCatalog[] = await getClientProducts();
  console.log("PRODUCTOS OBTENIDOS", products);
  return (
    <div className="space-y-6">
      {/* Header del Catálogo */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Mi Catálogo
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Gestioná tus productos, controlá el stock y configurá descuentos.
          </p>
        </div>

        {/* Acciones del Header */}
        <div className="flex items-center gap-3">
          {/* Botón Gestionar Categorías */}
          <Link
            href="/client/catalog/categories"
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-all shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <FolderTree className="size-4" /> Categorías
          </Link>

          {/* Botón Nuevo Producto */}
          <Link
            href="/client/catalog/new"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus className="size-4" /> Nuevo Producto
          </Link>
        </div>
      </div>

      {/* Grid Interactivo */}
      <ProductGrid initialProducts={products} />
    </div>
  );
}
