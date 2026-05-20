import { FolderTree } from "lucide-react";
import Link from "next/link";
import { getClientCategories } from "../categories/actions";
import { ProductForm } from "./ProductForm";

export default async function NewProductPage() {
  // 1. Hacemos el fetch de las categorías del comercio directo en el servidor 🚀
  const categories = await getClientCategories();

  return (
    <div className="p-6">
      {/* Header con título y botón de acción */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Agregar Producto
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Completá los datos para publicar un nuevo artículo en tu catálogo.
          </p>
        </div>

        {/* Botón rápido para gestionar categorías */}
        <Link
          href="/client/catalog/categories"
          className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-all shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <FolderTree className="size-4" /> Categorías
        </Link>
      </div>

      {/* 2. Le pasamos el array de categorías al formulario */}
      <ProductForm categories={categories} />
    </div>
  );
}
