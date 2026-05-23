"use client";

import * as React from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image as ImageIcon,
  Save,
  ArrowLeft,
  Trash2,
  UploadCloud, // 👈 Nuevo ícono para subir
  Loader2, // 👈 Ícono de carga
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import imageCompression from "browser-image-compression";
import { createClient } from "@/lib/supabase/client"; // Tu cliente de frontend
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

  // 🚀 Nuevo estado para bloquear la UI mientras comprime y sube
  const [isUploading, setIsUploading] = React.useState(false);

  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    watch,
    setValue, // 👈 Clave para inyectar la URL devuelta por Supabase
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

  // 📸 FUNCIÓN MÁGICA: Comprime y sube a Supabase
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // 1. Compresión en el celular
      const options = {
        maxSizeMB: 0.2, // 200 KB max
        maxWidthOrHeight: 1080,
        useWebWorker: true,
        fileType: "image/webp",
      };
      const compressedFile = await imageCompression(file, options);

      // 2. Subida a Supabase
      const supabase = createClient();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.webp`;
      const filePath = `productos/${fileName}`;

      const { error } = await supabase.storage
        // Asegurate de que el bucket se llame "tuwebhoy-assets" o cambialo acá
        .from("tuwebhoy-assets")
        .upload(filePath, compressedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // 3. Obtener URL pública
      const {
        data: { publicUrl },
      } = supabase.storage.from("tuwebhoy-assets").getPublicUrl(filePath);

      // 4. Inyectamos la URL en el formulario
      setValue("image_url", publicUrl, { shouldValidate: true });
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("Hubo un error al procesar la imagen. Intentá de nuevo.");
    } finally {
      setIsUploading(false);
    }
  };

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
      <div className="flex items-center justify-between">
        <Link
          href="/client/catalog"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="size-4" /> Volver al catálogo
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* COLUMNA IZQUIERDA: Imagen y Botón de Subida */}
        <div className="md:col-span-1 space-y-4">
          <div className="aspect-square w-full overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-zinc-900/50 flex flex-col items-center justify-center text-zinc-400 relative">
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 text-blue-500">
                <Loader2 className="size-8 animate-spin" />
                <span className="text-xs font-bold">Optimizando...</span>
              </div>
            ) : watchImageUrl && !imageError ? (
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
                  {imageError ? "Error al cargar" : "Sin imagen"}
                </span>
              </>
            )}
          </div>

          {/* Botón nativo para Celular / PC */}
          <div className="space-y-2 relative">
            <label
              htmlFor="file-upload"
              className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400 ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
            >
              <UploadCloud className="size-5" />
              {watchImageUrl ? "Cambiar foto" : "Subir foto"}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
            {/* Input oculto para que react-hook-form siga validando */}
            <input type="hidden" {...register("image_url")} />

            {errors.image_url && (
              <p className="text-xs text-red-500 text-center">
                {errors.image_url.message}
              </p>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: Resto de los campos (Sin cambios) */}
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

      {/* FOOTER */}
      <div className="flex justify-between items-center pt-4">
        <div>
          {isEditMode && (
            <button
              type="button"
              disabled={isDeleting || isUploading}
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-50 text-red-600 border border-red-200 px-4 py-3 text-sm font-medium hover:bg-red-100 transition-all shadow-sm disabled:opacity-50 dark:bg-red-950/20 dark:text-red-400 dark:border-red-500/20"
            >
              <Trash2 className="size-4" /> Eliminar
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending || isUploading}
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
