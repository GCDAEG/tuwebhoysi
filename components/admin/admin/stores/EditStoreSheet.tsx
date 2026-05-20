"use client";

import * as React from "react";
import {
  X,
  Save,
  Smartphone,
  Store,
  CheckCircle2,
  WholeWord,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Profile } from "../../types";
import { CiInstagram } from "react-icons/ci";
import { updateStoreProfile } from "@/app/(admin)/admin/action";
// La función que creamos antes

interface EditStoreSheetProps {
  profile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditStoreSheet({
  profile,
  isOpen,
  onClose,
}: EditStoreSheetProps) {
  const [isPending, setIsPending] = React.useTransition();
  const [formData, setFormData] = React.useState({
    full_name: "",
    whatsapp: "",
    instagram_url: "",
    website: "",
    catalog: false,
  });

  // Cargar datos cuando se selecciona un perfil
  React.useEffect(() => {
    const dataSet = () => {
      if (profile) {
        setFormData({
          full_name: profile.full_name || "",
          whatsapp: profile.whatsapp || "",
          instagram_url: profile.instagram_url || "",
          website: profile.website || "",
          catalog: !!profile.catalog,
        });
      }
    };
    dataSet();
  }, [profile]);

  if (!isOpen || !profile) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsPending(async () => {
      try {
        await updateStoreProfile({
          id: profile.id,
          ...formData,
        });
        // Aquí podrías agregar un toast de éxito
        onClose();
      } catch (error) {
        alert("Error al actualizar");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Overlay - Fondo oscuro */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Panel Lateral */}
      <div className="relative w-full max-w-md border-l border-white/10 bg-white dark:bg-zinc-950 shadow-2xl transition-transform duration-300">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 p-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                Editar Comercio
              </h2>
              <p className="text-sm text-zinc-500">
                Modifica la información de {profile.full_name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-white/5"
            >
              <X className="size-5 text-zinc-500" />
            </button>
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-6 space-y-6"
          >
            {/* Nombre del Negocio */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <Store className="size-4" /> Nombre del Negocio
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
                placeholder="Ej: Mi Tienda Pro"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <WholeWord className="size-4" /> Página Web
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
                placeholder="https://www.tuwebhoy.com"
                required
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <Smartphone className="size-4" /> WhatsApp de Contacto
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: e.target.value })
                }
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
                placeholder="Ej: 5491122334455"
              />
            </div>

            {/* Instagram */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <CiInstagram className="size-4" /> Instagram URL
              </label>
              <input
                type="url"
                value={formData.instagram_url}
                onChange={(e) =>
                  setFormData({ ...formData, instagram_url: e.target.value })
                }
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
                placeholder="https://instagram.com/tienda"
              />
            </div>

            {/* Estado del Catálogo (Toggle) */}
            <div className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50 p-4 dark:border-white/5 dark:bg-white/5">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  Función de Catálogo
                </p>
                <p className="text-xs text-zinc-500">
                  Activa o desactiva la vista de productos
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, catalog: !formData.catalog })
                }
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none",
                  formData.catalog
                    ? "bg-blue-600"
                    : "bg-zinc-300 dark:bg-zinc-700",
                )}
              >
                <span
                  className={cn(
                    "inline-block size-5 transform rounded-full bg-white transition duration-200 ease-in-out mt-0.5 ml-0.5",
                    formData.catalog ? "translate-x-5" : "translate-x-0",
                  )}
                />
              </button>
            </div>
          </form>

          {/* Footer - Botones */}
          <div className="border-t border-zinc-100 dark:border-white/10 p-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-all"
            >
              {isPending ? (
                <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  <Save className="size-4" /> Guardar Cambios
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
