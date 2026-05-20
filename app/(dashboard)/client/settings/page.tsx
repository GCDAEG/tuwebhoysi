import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "./settingsForm";
import { Profile } from "@/components/admin/types";

export default async function SettingsPage() {
  const supabase = await createClient();

  // 1. Obtener el usuario logueado
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login"); // Si no hay sesión, al login
  }

  // 2. Traer el perfil del comercio correspondiente a ese ID
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return (
      <div className="p-6 text-red-500">
        Error al cargar el perfil de la tienda. Por favor, contactá a soporte.
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Configuración de la Tienda
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Personalizá los datos públicos de tu comercio, tus redes sociales y
          enlaces de contacto.
        </p>
      </div>

      {/* Le pasamos el perfil de la base de datos al formulario interactivo */}
      <SettingsForm profile={profile as Profile} />
    </div>
  );
}
