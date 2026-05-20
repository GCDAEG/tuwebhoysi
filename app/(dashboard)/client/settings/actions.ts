"use server"

import { createClient } from "@/lib/supabase/server"; // Tu inicializador de cliente con cookies/headers
import { revalidatePath } from "next/cache";

export type UpdateSettingsInput = {
  id: string; // El id del perfil que se quiere editar
  full_name: string;
  whatsapp: string;
  instagram_url: string;
  facebook_url: string | null;
  website: string | null;
};

export async function updateClientProfile(data: UpdateSettingsInput) {
  const supabase = await createClient();

  // 1. Validar que el usuario tenga una sesión activa en el navegador
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error("No estás autorizado. Sesión inválida.");
  }

  // 2. Control de Seguridad Estricto: El cliente SOLO puede editar su propio ID
  if (user.id !== data.id) {
    throw new Error("Acción denegada. No podés modificar un perfil ajeno.");
  }

  // 3. Ejecutar el UPDATE
  // Gracias al RLS y a usar el cliente 'server' normal, Supabase frena cualquier intento fraudulento
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      full_name: data.full_name,
      whatsapp: data.whatsapp,
      instagram_url: data.instagram_url,
      facebook_url: data.facebook_url,
      website: data.website,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id);

  if (updateError) {
    console.error("Error al actualizar configuración:", updateError);
    throw new Error(`Error al guardar los cambios: ${updateError.message}`);
  }

  // 4. Purgamos la caché de la página de ajustes para que muestre los datos frescos
  revalidatePath("/client/settings");

  return { success: true };
}