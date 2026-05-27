"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Link2,
  Image as ImageIcon,
  FolderHeart,
  Save,
  ArrowLeft,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// Esquema de validación con Zod
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

export function DemoForm() {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      name: "",
      slug: "",
      category: "",
      image_url: "",
      demo_url: "",
    },
  });

  const watchImageUrl = watch("image_url");

  React.useEffect(() => {
    setImageError(false);
  }, [watchImageUrl]);

  const onSubmit = async (data: DemoFormValues) => {
    setIsPending(true);
    try {
      const supabase = createClient();

      const { error } = await supabase.from("portfolio_demos").insert([
        {
          name: data.name,
          slug: data.slug.toLowerCase().replace(/\s+/g, "-"), // Asegura formato slug
          category: data.category,
          image_url: data.image_url,
          demo_url: data.demo_url,
        },
      ]);

      if (error) throw error;

      alert("¡Demo del portafolio creada con éxito!");
      router.push("/admin/demos"); // O la ruta de tu lista de demos
      router.refresh();
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
      {/* Botón de retorno */}
      <div className="flex items-center justify-between">
        <Link
          href="/client/dashboard" // Ajustalo a tu ruta de navegación
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="size-4" /> Volver al panel
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Vista previa de la imagen externa */}
        <div className="md:col-span-1 space-y-4">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-zinc-900/50 flex flex-col items-center justify-center text-zinc-400 relative">
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
                <span className="text-xs font-medium px-4 text-center">
                  {imageError
                    ? "URL de imagen rota o inválida"
                    : "Vista previa del enlace"}
                </span>
              </>
            )}
          </div>
          <p className="text-[11px] text-zinc-500 text-center leading-relaxed">
            Subí tu imagen a Postimages y pegá el{" "}
            <b>&quot;Enlace directo&quot;</b> (debe terminar en .jpg, .png o
            .webp).
          </p>
        </div>

        {/* Campos del Formulario */}
        <div className="md:col-span-2 space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-white/10 pb-3">
            Nueva Demo para la Landing
          </h2>

          <div className="space-y-4">
            {/* Nombre comercial */}
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
              {/* Identificador URL */}
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

              {/* Selector de Rubros */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Rubro / Categoría</label>
                <select
                  {...register("category")}
                  className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm dark:border-white/10 dark:text-white dark:bg-zinc-950"
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

            {/* URL Enlace de la Imagen Externa */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
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

            {/* URL Destino del catálogo vivo */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
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

      {/* Botón Guardar */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
        >
          {isPending ? (
            <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <>
              <Save className="size-4" /> Publicar en Portafolio
            </>
          )}
        </button>
      </div>
    </form>
  );
}
