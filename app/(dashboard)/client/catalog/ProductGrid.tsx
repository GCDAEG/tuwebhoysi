"use client";

import * as React from "react";
import {
  Edit3,
  PackageX,
  Tag,
  Search,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductCatalog } from "@/types/catalog";
import { toggleProductAvailability } from "./actions";
import { cn } from "@/lib/utils";

export function ProductGrid({
  initialProducts,
}: {
  initialProducts: ProductCatalog[];
}) {
  // Estados para los filtros
  const [searchQuery, setSearchQuery] = React.useState("");
  const [stockFilter, setStockFilter] = React.useState<
    "all" | "available" | "ordered"
  >("all");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");

  // 1. Extraer categorías únicas (ID y Nombre real) para armar el filtro dinámico
  const uniqueCategories = React.useMemo(() => {
    const catMap = new Map<string, string>(); // Usamos un Map para evitar duplicados

    initialProducts.forEach((p) => {
      console.log("FOREACH", p.category);
      // Si el producto tiene una categoría asignada y nos llegó el JOIN
      if (p.category?.id && p.category?.name) {
        catMap.set(p.category.id, p.category.name);
      }
    });

    return Array.from(catMap.entries()).map(([id, name]) => ({ id, name }));
  }, [initialProducts]);

  // 2. Lógica de Filtrado combinada en tiempo real
  const filteredProducts = React.useMemo(() => {
    return initialProducts.filter((product) => {
      // Filtro por Buscador (Nombre o Descripción)
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description?.toLowerCase() || "").includes(
          searchQuery.toLowerCase(),
        );

      // Filtro por Estado de Disponibilidad
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "available" && product.is_available) ||
        (stockFilter === "ordered" && !product.is_available);

      // Filtro por Categoría
      const matchesCategory =
        categoryFilter === "all" || product.category?.id === categoryFilter;

      return matchesSearch && matchesStock && matchesCategory;
    });
  }, [initialProducts, searchQuery, stockFilter, categoryFilter]);

  // Caso: El comercio está totalmente vacío (Sin ningún producto creado)
  if (initialProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 p-12 text-center dark:border-white/10">
        <PackageX className="mb-4 size-12 text-zinc-400" />
        <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
          No hay productos
        </h3>
        <p className="mb-6 text-sm text-zinc-500">
          Empezá cargando tu primer producto al catálogo.
        </p>
        <Link
          href="/client/catalog/new"
          className="text-sm font-bold text-blue-600 hover:underline"
        >
          Crear producto ahora
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 🛠️ BARRA DE FILTROS Y BUSCADOR */}
      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950 md:flex-row md:items-center">
        {/* Input de Búsqueda */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-transparent pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
          />
        </div>

        {/* Selectores de Filtro */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filtro de Stock */}
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 dark:border-white/10">
            <SlidersHorizontal className="size-3.5 text-zinc-400" />
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="bg-transparent text-xs font-medium focus:outline-none dark:text-white dark:bg-zinc-950"
            >
              <option value="all">Todos los estados</option>
              <option value="available">Disponibles</option>
              <option value="ordered">Sin Stock</option>
            </select>
          </div>

          {/* Filtro de Categorías (Sólo se muestra si el comercio maneja categorías) */}
          {uniqueCategories.length > 1 && (
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 dark:border-white/10">
              <Filter className="size-3.5 text-zinc-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-transparent text-xs font-medium focus:outline-none dark:text-white dark:bg-zinc-950"
              >
                <option value="all">Todas las categorías</option>
                {uniqueCategories.map((cat) => {
                  if (cat.name === "all") return null;
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* 📭 CASO: Filtros activos sin resultados */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-zinc-100 bg-zinc-50/50 py-16 text-center dark:border-white/5 dark:bg-zinc-900/20">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            No se encontraron productos que coincidan con los filtros aplicados.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setStockFilter("all");
              setCategoryFilter("all");
            }}
            className="mt-3 text-xs font-bold text-blue-600 hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        /* 📦 GRID DE TARJETAS FILTRADAS */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: ProductCatalog }) {
  const [isAvailable, setIsAvailable] = React.useState(product.is_available);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const hasDiscount = product.discount_percent > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discount_percent / 100)
    : product.price;

  const handleToggle = async () => {
    setIsUpdating(true);
    try {
      const newStatus = !isAvailable;
      await toggleProductAvailability(product.id, newStatus);
      setIsAvailable(newStatus);
    } catch (err) {
      alert("Error al actualizar");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all hover:shadow-md dark:border-white/10 dark:bg-zinc-950",
        !isAvailable && "opacity-75 grayscale-[0.5]",
      )}
    >
      {/* Imagen del Producto */}
      <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            // 'fill' en Next.js equivale a estas clases de posicionamiento absoluto:
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            // Recomendado para performance (reemplaza parte de la optimización de Next.js):
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-400">
            <Tag className="size-8 opacity-20" />
          </div>
        )}

        {hasDiscount && isAvailable && (
          <div className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg">
            {product.discount_percent}% OFF
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-bold text-zinc-900 dark:text-white">
            {product.name}
          </h3>
          <Link
            href={`/client/catalog/${product.id}/edit`}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-blue-600 dark:hover:bg-white/5"
          >
            <Edit3 className="size-4" />
          </Link>
        </div>

        <p className="mb-4 line-clamp-2 text-xs text-zinc-500">
          {product.description || "Sin descripción"}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <div>
            {hasDiscount && (
              <p className="text-[10px] text-zinc-400 line-through">
                ${product.price.toLocaleString()}
              </p>
            )}
            <p className="text-lg font-black text-zinc-900 dark:text-white">
              ${finalPrice.toLocaleString()}
            </p>
          </div>

          <button
            onClick={handleToggle}
            disabled={isUpdating}
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold transition-colors",
              isAvailable
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "bg-zinc-100 text-zinc-500 dark:bg-white/5 dark:text-zinc-400",
            )}
          >
            <div
              className={cn(
                "size-1.5 rounded-full",
                isAvailable ? "bg-emerald-500" : "bg-zinc-400",
              )}
            />
            {isAvailable ? "Disponible" : "Sin Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
