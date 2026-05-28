"use server";

import { createClient } from "@/lib/supabase/server"; // Asegurate de usar tu cliente de servidor
import { revalidatePath } from "next/cache";

// Tipo de dato para TypeScript
export interface PortfolioDemo {
  id: string;
  name: string;
  category: string;
  image_url: string;
  demo_url: string;
}

// 1. OBTENER DEMOS
export async function getDemos(): Promise<PortfolioDemo[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolio_demos")
    .select("id, name, category, image_url, demo_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error obteniendo demos:", error);
    throw new Error("No se pudieron cargar las demos");
  }

  return data || [];
}

// 2. ELIMINAR DEMO
export async function deleteDemo(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("portfolio_demos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error eliminando demo:", error);
    throw new Error("No se pudo eliminar la demo");
  }

  // Refresca la ruta del admin para actualizar la vista
  revalidatePath("/admin/demos");
}

// 3. EDITAR DEMO (Si vas a usar un formulario de edición en el futuro)
export async function createDemo(data: Partial<PortfolioDemo>) {
  const supabase = await createClient();
  const { error } = await supabase.from("portfolio_demos").insert([data]);

  if (error) {
    console.error("Error creando demo:", error);
    throw new Error("No se pudo crear la demo");
  }

  revalidatePath("/admin/demos");
}

// 🚀 ACTUALIZAR DEMO
export async function updateDemo(id: string, data: Partial<PortfolioDemo>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("portfolio_demos")
    .update(data)
    .eq("id", id);

  if (error) {
    console.error("Error actualizando demo:", error);
    throw new Error("No se pudo actualizar la demo");
  }

  revalidatePath("/admin/demos");
}