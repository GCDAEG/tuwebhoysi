"use client";

import * as React from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image as ImageIcon,
  Save,
  ArrowLeft,
  Link as LinkIcon,
  Trash2,
  FolderTree, // 👈 Agregamos el ícono
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createProduct, updateProduct, deleteProduct } from "../actions";
import { productSchema, ProductFormValues } from "@/lib/zod/schemas";
import { Product } from "@/types/catalog";

interface ProductFormProps {
  initialData?: Product;
  categories: { id: string; name: string }[];
}

export function ProductForm({ initialData, categories }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      discount_percent: initialData?.discount_percent || 0,
      category: initialData?.category || "",
      image_url: initialData?.image_url || "",
    },
  });
  const watchImageUrl = watch("image_url");

  React.useEffect(() => {
    setImageError(false);
  }, [watchImageUrl]);

  const onSubmit = (data: ProductFormValues) => {
    startTransition(async () => {
      try {
        if (isEditMode && initialData) {
          await updateProduct(initialData.id, data);
        } else {
          await createProduct(data);
        }
        router.push("/client/catalog");
      } catch (error) {
        console.log(error);
        alert("Hubo un error al procesar el producto.");
      }
    });
  };

  const handleDelete = async () => {
    if (!initialData) return;
    const confirmed = window.confirm(
      `¿Estás seguro de que querés eliminar "${initialData.name}" permanente del catálogo?`,
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteProduct(initialData.id);
      router.push("/client/catalog");
    } catch (error) {
      alert("No se pudo eliminar el producto.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-3xl space-y-6"
    >
      {/* Header del Formulario con botones de navegación */}
      <div className="flex items-center justify-between">
        <Link
          href="/client/catalog"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="size-4" /> Volver al catálogo
        </Link>

        {/* Botón rápido para ir a categorías 🚀
        <Link
          href="/client/catalog/categories"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-lg"
        >
          <FolderTree className="size-3.5" /> Gestionar Categorías
        </Link> */}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Columna Izquierda: Vista Previa */}
        <div className="md:col-span-1 space-y-4">
          <div className="aspect-square w-full overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-zinc-900/50 flex flex-col items-center justify-center text-zinc-400 relative">
            {watchImageUrl && !imageError ? (
              <img
                src={watchImageUrl}
                alt="Vista previa"
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <>
                <ImageIcon className="mb-2 size-10 opacity-20" />
                <span className="text-xs font-medium px-4 text-center">
                  {imageError
                    ? "URL de imagen inválida"
                    : "Vista previa de la imagen"}
                </span>
              </>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <LinkIcon className="size-4 text-zinc-500" /> URL de la Imagen
            </label>
            <input
              {...register("image_url")}
              type="url"
              className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 dark:border-white/10 dark:text-white"
              placeholder="https://ejemplo.com/foto.jpg"
            />
            {errors.image_url && (
              <p className="text-xs text-red-500">{errors.image_url.message}</p>
            )}
          </div>
        </div>

        {/* Columna Derecha: Campos */}
        <div className="md:col-span-2 space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-white/10 pb-3">
            {isEditMode ? "Modificar Producto" : "Detalles del Producto"}
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre</label>
              <input
                {...register("name")}
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm dark:border-white/10 dark:text-white"
                placeholder="Ej: Pizza Muzzarella"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción</label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm dark:border-white/10 dark:text-white resize-none"
                placeholder="Ingredientes, tamaño..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Precio Base ($)</label>
                <input
                  {...register("price")}
                  type="number"
                  step="0.01"
                  className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm dark:border-white/10 dark:text-white"
                />
                {errors.price && (
                  <p className="text-xs text-red-500">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descuento (%)</label>
                <input
                  {...register("discount_percent")}
                  type="number"
                  min="0"
                  max="100"
                  className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm dark:border-white/10 dark:text-white"
                />
                {errors.discount_percent && (
                  <p className="text-xs text-red-500">
                    {errors.discount_percent.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Categoría del Menú
              </label>
              <select
                {...register("category")}
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 dark:border-white/10 dark:text-white dark:bg-zinc-950"
              >
                <option value="" className="text-zinc-400">
                  -- Seleccioná una categoría --
                </option>
                {categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    className="text-zinc-900 dark:text-white"
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botones de acción del Footer */}
      <div className="flex justify-between items-center pt-4">
        <div>
          {isEditMode && (
            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-50 text-red-600 border border-red-200 px-4 py-3 text-sm font-medium hover:bg-red-100 transition-all shadow-sm disabled:opacity-50 dark:bg-red-950/20 dark:text-red-400 dark:border-red-500/20"
            >
              <Trash2 className="size-4" /> Eliminar Producto
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
        >
          {isPending ? (
            <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <>
              <Save className="size-4" />{" "}
              {isEditMode ? "Guardar Cambios" : "Crear Producto"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
