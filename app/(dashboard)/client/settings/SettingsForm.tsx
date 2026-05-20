"use client";

import * as React from "react";
import { Store, Smartphone, Globe, Save } from "lucide-react";
import { updateClientProfile } from "./actions";
import { Profile } from "@/components/admin/types";
import { CiFacebook, CiInstagram } from "react-icons/ci";
import { unknown } from "zod";

interface SettingsFormProps {
  profile: Profile;
}

export function SettingsForm({ profile }: SettingsFormProps) {
  const [isPending, startTransition] = React.useTransition();
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const [formData, setFormData] = React.useState({
    full_name: profile.full_name || "",
    whatsapp: profile.whatsapp || "",
    instagram_url: profile.instagram_url || "",
    facebook_url: profile.facebook_url || "",
    website: profile.website || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    startTransition(async () => {
      try {
        await updateClientProfile({
          id: profile.id,
          ...formData,
        });
        setSuccessMessage("¡Configuración guardada con éxito!");

        // Limpiar el mensaje de éxito a los 4 segundos
        setTimeout(() => setSuccessMessage(null), 4000);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Hubo un error al guardar los cambios.";
        setErrorMessage(errorMessage);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Caja Principal: Datos del Negocio */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950 space-y-6">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-white/10 pb-3">
          Datos Públicos
        </h2>

        {/* Grid de Inputs */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Nombre de la Tienda */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <Store className="size-4 text-zinc-500" /> Nombre del Comercio
            </label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
              placeholder="Ej: Pizzería Gualeguaychú"
            />
          </div>

          {/* WhatsApp de Pedidos */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <Smartphone className="size-4 text-zinc-500" /> WhatsApp para
              Pedidos
            </label>
            <input
              type="text"
              required
              value={formData.whatsapp}
              onChange={(e) =>
                setFormData({ ...formData, whatsapp: e.target.value })
              }
              className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
              placeholder="Ej: 5493446123456"
            />
            <p className="text-[11px] text-zinc-500">
              Incluí código de país sin el signo + (Ej: 549...)
            </p>
          </div>

          {/* Instagram */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <CiInstagram className="size-4 text-zinc-500" /> Instagram URL
            </label>
            <input
              type="url"
              value={formData.instagram_url}
              onChange={(e) =>
                setFormData({ ...formData, instagram_url: e.target.value })
              }
              className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
              placeholder="https://instagram.com/tu_comercio"
            />
          </div>

          {/* Facebook */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <CiFacebook className="size-4 text-zinc-500" /> Facebook URL
              (Opcional)
            </label>
            <input
              type="url"
              value={formData.facebook_url}
              onChange={(e) =>
                setFormData({ ...formData, facebook_url: e.target.value })
              }
              className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
              placeholder="https://facebook.com/tu_comercio"
            />
          </div>

          {/* Sitio Web Propio */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <Globe className="size-4 text-zinc-500" /> Web Personalizada /
              Link Externo (Opcional)
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
              placeholder="https://www.tucomercio.com"
            />
          </div>
        </div>
      </div>

      {/* Alertas de Estado */}
      {successMessage && (
        <div className="rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-800 dark:bg-red-950/30 dark:text-red-400 border border-red-200/50 dark:border-red-500/20">
          {errorMessage}
        </div>
      )}

      {/* Botón Guardar */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
        >
          {isPending ? (
            <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <>
              <Save className="size-4" /> Guardar Configuración
            </>
          )}
        </button>
      </div>
    </form>
  );
}
