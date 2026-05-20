"use client";

import * as React from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Save,
  Store,
  MessageSquare,
  Image as ImageIcon,
  Eye,
} from "lucide-react";
import { storeContentSchema, StoreContentFormValues } from "@/lib/zod/schemas";
import { updateClientStoreContent } from "@/app/(dashboard)/client/content/actions";

interface StoreContentManagerProps {
  initialData: StoreContentFormValues | null;
}

export function StoreContentManager({ initialData }: StoreContentManagerProps) {
  const [isPending, startTransition] = React.useTransition();
  const [successMessage, setSuccessMessage] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StoreContentFormValues>({
    resolver: zodResolver(
      storeContentSchema,
    ) as Resolver<StoreContentFormValues>,
    defaultValues: {
      business_name: initialData?.business_name || "",
      welcome_message: initialData?.welcome_message || "",
      logo_url: initialData?.logo_url || "",
      banner_url: initialData?.banner_url || "",
    },
  });

  // Observamos las URLs en tiempo real para armar la vista previa interactiva
  const watchLogoUrl = watch("logo_url");
  const watchBannerUrl = watch("banner_url");
  const watchBusinessName = watch("business_name");
  const watchMessage = watch("welcome_message");

  const onSubmit = (data: StoreContentFormValues) => {
    setSuccessMessage(false);
    startTransition(async () => {
      try {
        await updateClientStoreContent(data);
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 3000);
      } catch (error) {
        alert("Hubo un problema al guardar el contenido.");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-5">
      {/* 📝 COLUMNA FORMULARIO (Ocupa 3 columnas en pantallas grandes) */}
      <div className="space-y-6 lg:col-span-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Editar Contenido
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Personalizá la identidad visual, el banner y los textos principales
            de tu menú web.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950"
        >
          {/* Nombre del Comercio */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <Store className="size-4 text-blue-500" /> Nombre del Negocio
            </label>
            <input
              {...register("business_name")}
              type="text"
              placeholder="Ej: Pizzería Don Tomás"
              className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
            />
            {errors.business_name && (
              <p className="text-xs text-red-500">
                {errors.business_name.message}
              </p>
            )}
          </div>

          {/* Mensaje de Bienvenida */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <MessageSquare className="size-4 text-purple-500" /> Mensaje de
              Bienvenida / Info
            </label>
            <textarea
              {...register("welcome_message")}
              rows={3}
              placeholder="Ej: ¡Hola! Hacé tu pedido online y te lo mandamos al toque. Aceptamos efectivo y transferencia."
              className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white resize-none"
            />
            {errors.welcome_message && (
              <p className="text-xs text-red-500">
                {errors.welcome_message.message}
              </p>
            )}
          </div>

          {/* URL del Logo */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <ImageIcon className="size-4 text-pink-500" /> Logo del Comercio
              (Isotipo)
            </label>
            <input
              {...register("logo_url")}
              type="url"
              placeholder="https://ejemplo.com/tu-logo.png"
              className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
            />
            {errors.logo_url && (
              <p className="text-xs text-red-500">{errors.logo_url.message}</p>
            )}
            <p className="text-[11px] text-zinc-500">
              Se utilizará en el encabezado principal del catálogo y al
              compartir el enlace de tu web.
            </p>
          </div>

          {/* URL del Banner de Portada */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <ImageIcon className="size-4 text-orange-500" /> Banner
              Promocional / Slider de Inicio
            </label>
            <input
              {...register("banner_url")}
              type="url"
              placeholder="https://ejemplo.com/banner-descuento.jpg"
              className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
            />
            {errors.banner_url && (
              <p className="text-xs text-red-500">
                {errors.banner_url.message}
              </p>
            )}
            <p className="text-[11px] text-zinc-500">
              Aparecerá arriba de todo al abrir tu e-commerce. Ideal para
              anunciar ofertas, combos destacados o avisos importantes (Ej:
              &quot;Envío Gratis este finde&quot;).
            </p>
          </div>

          {/* Botón de Guardado */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-white/10">
            <div>
              {successMessage && (
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  ¡Contenido actualizado correctamente!
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
            >
              {isPending ? (
                <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  <Save className="size-4" /> Guardar Contenido
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 👀 COLUMNA PREVIEW VIVO (Ocupa 2 columnas, simula el celular del cliente final) */}
      <div className="space-y-4 lg:col-span-2">
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-500 dark:text-zinc-400">
          <Eye className="size-4" /> Vista previa del catálogo público
        </div>

        {/* Contenedor Mockup Celular */}
        <div className="overflow-hidden rounded-[32px] border border-zinc-200 bg-zinc-50 shadow-inner dark:border-white/10 dark:bg-zinc-900">
          {/* Banner de portada */}
          <div className="relative h-32 bg-zinc-200 dark:bg-zinc-800">
            {watchBannerUrl ? (
              <img
                src={watchBannerUrl}
                alt="Portada"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-zinc-400 text-xs">
                {" "}
                Sin banner de portada{" "}
              </div>
            )}

            {/* Logo superpuesto */}
            <div className="absolute -bottom-8 left-6 size-16 overflow-hidden rounded-2xl border-2 border-white bg-white shadow-md dark:border-zinc-900 dark:bg-zinc-800">
              {watchLogoUrl ? (
                <img
                  src={watchLogoUrl}
                  alt="Logo"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-zinc-400 text-[10px] text-center font-bold">
                  Logo
                </div>
              )}
            </div>
          </div>

          {/* Textos simulados en el catálogo */}
          <div className="p-6 pt-12 space-y-3 bg-white dark:bg-zinc-950">
            <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
              {watchBusinessName || "Nombre del negocio"}
            </h2>

            <div className="rounded-xl bg-zinc-50 p-3 text-xs text-zinc-600 dark:bg-white/5 dark:text-zinc-400 leading-relaxed">
              {watchMessage ||
                "Acá se mostrará tu mensaje de bienvenida o los detalles operativos del día..."}
            </div>

            {/* Mocks de la UI pública suelta */}
            <div className="h-2 w-1/3 rounded bg-zinc-100 dark:bg-white/5 mt-6" />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="h-20 rounded-2xl bg-zinc-100/70 dark:bg-white/5" />
              <div className="h-20 rounded-2xl bg-zinc-100/70 dark:bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
