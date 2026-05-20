"use client";

import * as React from "react";
import { FolderPlus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getClientCategories, createCategory, deleteCategory } from "./actions";

export default function CategoriesPage() {
  const [categories, setCategories] = React.useState<
    { id: string; name: string }[]
  >([]);
  const [newCategoryName, setNewCategoryName] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  // Cargar categorías iniciales al montar el cliente
  const loadCategories = async () => {
    const data = await getClientCategories();
    setCategories(data);
  };

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getClientCategories();
      if (!mounted) return;
      startTransition(() => setCategories(data));
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    startTransition(async () => {
      try {
        await createCategory({ name: newCategoryName });
        setNewCategoryName("");
        await loadCategories(); // Recarga local rápida
      } catch (err) {
        alert("Error al crear la categoría.");
      }
    });
  };

  const handleDelete = (id: string, name: string) => {
    const confirm = window.confirm(
      `¿Seguro que querés eliminar "${name}"? Los productos vinculados quedarán sin categoría.`,
    );
    if (!confirm) return;

    startTransition(async () => {
      try {
        await deleteCategory(id);
        await loadCategories();
      } catch (err) {
        alert("No se pudo eliminar.");
      }
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      {/* Botón Volver */}
      <Link
        href="/client/catalog"
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
      >
        <ArrowLeft className="size-4" /> Volver al catálogo
      </Link>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Categorías del Catálogo
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Organizá tu menú creando secciones (Ej: Hamburguesas, Bebidas,
          Postres).
        </p>
      </div>

      {/* Formulario de Alta Rápida */}
      <form
        onSubmit={handleAddCategory}
        className="flex gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950"
      >
        <input
          type="text"
          required
          disabled={isPending}
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Ej: Pizzas Especiales"
          className="flex-1 rounded-xl border border-zinc-200 bg-transparent px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 dark:border-white/10 dark:text-white"
        />
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <FolderPlus className="size-4" /> Agregar
        </button>
      </form>

      {/* Lista de Categorías Existentes */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-950 overflow-hidden">
        <div className="border-b border-zinc-100 p-4 dark:border-white/10">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
            Tus Secciones Activas
          </h2>
        </div>

        {categories.length === 0 ? (
          <p className="p-8 text-center text-sm text-zinc-500">
            Todavía no creaste ninguna categoría.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-white/5">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-sm font-medium text-zinc-900 dark:text-white">
                  {cat.name}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="rounded-lg p-2 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
