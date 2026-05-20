"use server"
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { ProductFormValues } from "@/lib/zod/schemas";

export async function toggleProductAvailability(productId: string, isAvailable: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update({ is_available: isAvailable })
    .eq("id", productId);

  if (error) throw new Error("No se pudo actualizar el estado.");
  
  revalidatePath("/client/catalog");
  return { success: true };
}





export async function createProduct(data: ProductFormValues) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("No autorizado");

  const { error } = await supabase.from("products").insert({
    profile_id: user.id, // 👈 Lo atamos al usuario logueado, súper seguro
    name: data.name,
    description: data.description,
    price: data.price,
    discount_percent: data.discount_percent,
    category: data.category,
    image_url: data.image_url || null,
    is_available: true,
  });

  if (error) {
    console.error("Error BD:", error);
    throw new Error("No se pudo crear el producto");
  }

  revalidatePath("/client/catalog");
  return { success: true };
}

export async function updateProduct(productId: string, data: ProductFormValues) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("No autorizado");

  const { error } = await supabase
    .from("products")
    .update({
      name: data.name,
      description: data.description,
      price: data.price,
      discount_percent: data.discount_percent,
      category: data.category,
      image_url: data.image_url || null,
      updated_at: new Date().toISOString()
    })
    .eq("id", productId)
    .eq("profile_id", user.id); // Seguridad: solo el dueño puede actualizarlo

  if (error) {
    console.error("Error BD Update:", error);
    throw new Error("No se pudo actualizar el producto");
  }

  revalidatePath("/client/catalog");
  return { success: true };
}

// Acción para eliminar el producto
export async function deleteProduct(productId: string) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("No autorizado");

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .eq("profile_id", user.id); // Seguridad: solo el dueño puede eliminarlo

  if (error) {
    console.error("Error BD Delete:", error);
    throw new Error("No se pudo eliminar el producto");
  }

  revalidatePath("/client/catalog");
  return { success: true };
}