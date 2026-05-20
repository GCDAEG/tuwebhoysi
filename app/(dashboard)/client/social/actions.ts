"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { socialMediaSchema, SocialMediaFormValues } from "@/lib/zod/schemas";

/**
 * Obtiene las redes sociales actuales del perfil logueado
 */
export async function getClientSocialMedia() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("whatsapp, instagram_url, facebook_url")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error al traer redes sociales:", error);
    return null;
  }

  return data;
}

/**
 * Actualiza los enlaces de contacto en el perfil
 */
export async function updateClientSocialMedia(data: SocialMediaFormValues) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("No autorizado");

  // Validamos los datos en el servidor
  const validated = socialMediaSchema.parse(data);

  const { error } = await supabase
    .from("profiles")
    .update({
      whatsapp: validated.whatsapp,
      instagram_url: validated.instagram_url || null,
      facebook_url: validated.facebook_url || null,
    })
    .eq("id", user.id);

  if (error) {
    console.error("Error BD Social:", error);
    throw new Error("No se pudieron guardar los cambios");
  }

  revalidatePath("/client/social");
  return { success: true };
}


