"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { storeContentSchema, StoreContentFormValues } from "@/lib/zod/schemas";

/**
 * Trae los datos de branding actuales del comercio logueado
 */
export async function getClientStoreContent() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Traemos los campos correspondientes al contenido de la tienda
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, welcome_message, logo_url, banner_url")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error al traer contenido de tienda:", error);
    return null;
  }

  return {
    business_name: data.full_name || "",
    welcome_message: data.welcome_message || "",
    logo_url: data.logo_url || "",
    banner_url: data.banner_url || "",
  };
}

/**
 * Actualiza la información de branding y perfil del comercio
 */
export async function updateClientStoreContent(data: StoreContentFormValues) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("No autorizado");

  const validated = storeContentSchema.parse(data);

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: validated.business_name, // Mapea a la columna name de tu tabla profiles
      welcome_message: validated.welcome_message || null,
      logo_url: validated.logo_url || null,
      banner_url: validated.banner_url || null,
    })
    .eq("id", user.id);

  if (error) {
    console.error("Error BD Content:", error);
    throw new Error("No se pudieron guardar los cambios");
  }

  revalidatePath("/client/content");
  return { success: true };
}