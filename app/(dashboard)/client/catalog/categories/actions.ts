"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { categorySchema, CategoryFormValues } from "@/lib/zod/schemas";

// 1. Obtener las categorías del comercio logueado
export async function getClientCategories() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .eq("profile_id", user.id)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error al traer categorías:", error);
    return [];
  }
  return data;
}

// 2. Crear una categoría
export async function createCategory(data: CategoryFormValues) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autorizado");

  const validated = categorySchema.parse(data);

  const { error } = await supabase.from("categories").insert({
    profile_id: user.id,
    name: validated.name,
  });

  if (error) throw new Error("No se pudo crear la categoría");

  revalidatePath("/client/catalog");
  return { success: true };
}

// 3. Eliminar una categoría
export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autorizado");

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id)
    .eq("profile_id", user.id); // Seguridad

  if (error) throw new Error("No se pudo eliminar la categoría");

  revalidatePath("/client/catalog");
  return { success: true };
}