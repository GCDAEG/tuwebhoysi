"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Image as ImageIcon, Save, ArrowLeft, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createDemo, updateDemo } from "@/app/(admin)/admin/demos/actions";

// 👈 Importamos las Server Actions en lugar del cliente de Supabase

const demoSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  slug: z
    .string()
    .min(3, { message: "El slug debe tener al menos 3 caracteres" }),
  category: z.string().min(2, { message: "Seleccioná un rubro o categoría" }),
  image_url: z
    .string()
    .url({ message: "Ingresá una URL válida de la imagen (ej: Postimages)" }),
  demo_url: z
    .string()
    .url({ message: "Ingresá una URL válida del catálogo vivo" }),
});

type DemoFormValues = z.infer<typeof demoSchema>;

export interface DemoFormProps {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    category: string;
    image_url: string;
    demo_url: string;
  };
}

export function DemoForm({ initialData }: DemoFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      category: initialData?.category || "",
      image_url: initialData?.image_url || "",
      demo_url: initialData?.demo_url || "",
    },
  });

  const watchImageUrl = watch("image_url");

  React.useEffect(() => {
    setImageError(false);
  }, [watchImageUrl]);

  const onSubmit = async (data: DemoFormValues) => {
    setIsPending(true);
    try {
      // 1. Preparamos los datos limpios
      const formattedData = {
        name: data.name,
        slug: data.slug.toLowerCase().replace(/\s+/g, "-"),
        category: data.category,
        image_url: data.image_url,
        demo_url: data.demo_url,
      };

      // 2. Llamamos a la Server Action correspondiente
      if (isEditMode && initialData) {
        await updateDemo(initialData.id, formattedData);
        alert("¡Demo actualizada con éxito!");
      } else {
        await createDemo(formattedData);
        alert("¡Demo del portafolio creada con éxito!");
      }

      // 3. Volvemos al panel (la caché ya se limpió por revalidatePath)
      router.push("/admin/demos");
    } catch (error: any) {
      console.error(error);
      alert("Hubo un error al guardar la demo: " + error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-3xl space-y-6"
    >
      <div className="flex items-center justify-between">
        <Link
          href="/admin/demos"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors dark:hover:text-white"
        >
          <ArrowLeft className="size-4" /> Volver a Demos
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Columna Izquierda: Vista Previa */}
        <div className="md:col-span-1 space-y-4">
          <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-white/10 dark:bg-zinc-900/50">
            {watchImageUrl && !imageError ? (
              <img
                src={watchImageUrl}
                alt="Vista previa de la maqueta"
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <>
                <ImageIcon className="mb-2 size-10 opacity-20" />
                <span className="px-4 text-center text-xs font-medium">
                  {imageError
                    ? "URL de imagen rota o inválida"
                    : "Vista previa del enlace"}
                </span>
              </>
            )}
          </div>
          <p className="text-center text-[11px] leading-relaxed text-zinc-500">
            Subí tu imagen a Postimages y pegá el{" "}
            <b>&quot;Enlace directo&quot;</b> (debe terminar en .jpg, .png o
            .webp).
          </p>
        </div>

        {/* Columna Derecha: Campos del Formulario */}
        <div className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:col-span-2 dark:border-white/10 dark:bg-zinc-950">
          <h2 className="border-b border-zinc-100 pb-3 text-lg font-bold text-zinc-900 dark:border-white/10 dark:text-white">
            {isEditMode
              ? "Editar Demo Existente"
              : "Nueva Demo para la Landing"}
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre de la Demo</label>
              <input
                {...register("name")}
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm dark:border-white/10 dark:text-white"
                placeholder="Ej: Pizzería Lo de Luigi"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug (Filtro URL)</label>
                <input
                  {...register("slug")}
                  className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm dark:border-white/10 dark:text-white"
                  placeholder="ej: luigi-pizzeria"
                />
                {errors.slug && (
                  <p className="text-xs text-red-500">{errors.slug.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Rubro / Categoría</label>
                <select
                  {...register("category")}
                  className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm dark:border-white/10 dark:bg-zinc-950 dark:text-white"
                >
                  <option value="">-- Seleccioná --</option>
                  <option value="Gastronomía">Gastronomía</option>
                  <option value="Indumentaria">Indumentaria</option>
                  <option value="Estética / Salud">Estética / Salud</option>
                  <option value="Servicios">Servicios</option>
                </select>
                {errors.category && (
                  <p className="text-xs text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <ImageIcon className="size-4 text-zinc-400" /> Enlace de la
                Imagen (Postimages)
              </label>
              <input
                {...register("image_url")}
                type="url"
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm dark:border-white/10 dark:text-white"
                placeholder="https://i.postimg.cc/cambiar/imagen.png"
              />
              {errors.image_url && (
                <p className="text-xs text-red-500">
                  {errors.image_url.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Globe className="size-4 text-zinc-400" /> URL del Catálogo
                Activo
              </label>
              <input
                {...register("demo_url")}
                type="url"
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm dark:border-white/10 dark:text-white"
                placeholder="https://tuwebhoysi.vercel.app/api/catalog/pizzeria_luis"
              />
              {errors.demo_url && (
                <p className="text-xs text-red-500">
                  {errors.demo_url.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? (
            <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <>
              <Save className="size-4" />
              {isEditMode ? "Guardar Cambios" : "Publicar en Portafolio"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
