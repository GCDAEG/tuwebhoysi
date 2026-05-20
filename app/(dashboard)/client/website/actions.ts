"use server"

import { createClient } from "@/lib/supabase/server";

/**
 * Obtiene el slug (username) y nombre del comercio logueado
 */
export async function getClientWebConfig() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("username, full_name")
    .eq("id", user.id)
    .single();

  if (error || !data) {
    console.error("Error al obtener config web:", error);
    return null;
  }

  return {
    slug: data.username,
    business_name: data.full_name
  };
}