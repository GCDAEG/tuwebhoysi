"use client";

import * as React from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Phone } from "lucide-react";
import { socialMediaSchema, SocialMediaFormValues } from "@/lib/zod/schemas";
import { updateClientSocialMedia } from "@/app/(dashboard)/client/social/actions";
import { CiFacebook, CiInstagram } from "react-icons/ci";

interface SocialMediaManagerProps {
  initialData: {
    whatsapp: string;
    instagram_url: string | null;
    facebook_url: string | null;
  } | null;
}

export function SocialMediaManager({ initialData }: SocialMediaManagerProps) {
  const [isPending, startTransition] = React.useTransition();
  const [successMessage, setSuccessMessage] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialMediaFormValues>({
    resolver: zodResolver(socialMediaSchema) as Resolver<SocialMediaFormValues>,
    defaultValues: {
      whatsapp: initialData?.whatsapp || "",
      instagram_url: initialData?.instagram_url || "",
      facebook_url: initialData?.facebook_url || "",
    },
  });

  const onSubmit = (data: SocialMediaFormValues) => {
    setSuccessMessage(false);
    startTransition(async () => {
      try {
        await updateClientSocialMedia(data);
        setSuccessMessage(true);
        // Ocultar mensaje de éxito después de 3 segundos
        setTimeout(() => setSuccessMessage(false), 3000);
      } catch (error) {
        alert("Hubo un problema al guardar los enlaces.");
      }
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Redes Sociales y Contacto
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Configurá los canales donde tus clientes van a enviar los pedidos y
          seguir tu marca.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950"
      >
        {/* Campo CANAL DE PEDIDOS (WhatsApp) */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
            <Phone className="size-4 text-emerald-500" /> WhatsApp para Pedidos
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400 select-none">
              +
            </span>
            <input
              {...register("whatsapp")}
              type="text"
              placeholder="Ej: 5493446123456"
              className="w-full rounded-xl border border-zinc-200 bg-transparent pl-8 pr-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
            />
          </div>
          {errors.whatsapp && (
            <p className="text-xs text-red-500">{errors.whatsapp.message}</p>
          )}
          <p className="text-[11px] text-zinc-500 leading-normal">
            ⚠️ **Crucial:** Ingresá el código de país completo sin el signo + ni
            espacios (Ej: para Argentina arranca con `549` seguido del área y
            número sin el 15). Acá es donde van a caer los carritos armados.
          </p>
        </div>

        <hr className="border-zinc-100 dark:border-white/10" />

        {/* Campo INSTAGRAM */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
            <CiInstagram className="size-4 text-pink-500" /> Enlace de Instagram
            (Opcional)
          </label>
          <input
            {...register("instagram_url")}
            type="url"
            placeholder="https://instagram.com/tu_negocio"
            className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
          />
          {errors.instagram_url && (
            <p className="text-xs text-red-500">
              {errors.instagram_url.message}
            </p>
          )}
        </div>

        {/* Campo FACEBOOK */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
            <CiFacebook className="size-4 text-blue-600" /> Enlace de Facebook
            (Opcional)
          </label>
          <input
            {...register("facebook_url")}
            type="url"
            placeholder="https://facebook.com/tu_negocio"
            className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
          />
          {errors.facebook_url && (
            <p className="text-xs text-red-500">
              {errors.facebook_url.message}
            </p>
          )}
        </div>

        {/* Footer del Formulario */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-white/10">
          <div>
            {successMessage && (
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 animate-fade-in">
                ¡Cambios guardados con éxito!
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
                <Save className="size-4" /> Guardar Redes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
