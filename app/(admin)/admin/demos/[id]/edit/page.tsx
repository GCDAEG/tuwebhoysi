import React from "react";
import { notFound } from "next/navigation";
import { DemoForm } from "@/components/admin/demos/DemoForm"; // Ajustá esta importación a tu ruta real
import { createClient } from "@/lib/supabase/server";

export default async function EditDemoPage({
  params,
}: {
  params: { id: string };
}) {
  // 1. Capturamos el ID de la URL dinámica
  const { id } = await params;

  // 2. Instanciamos el cliente de servidor para buscar la demo
  const supabase = await createClient(); // Poné 'await createClient()' si tu versión de Supabase SSR lo exige

  const { data: demo, error } = await supabase
    .from("portfolio_demos")
    .select("id, name, slug, category, image_url, demo_url")
    .eq("id", id)
    .single();

  // 3. Si hay un error de conexión o la demo no existe (ID falso), tiramos un 404
  if (error || !demo) {
    notFound();
  }

  // 4. Renderizamos tu formulario inyectándole los datos actuales
  return <DemoForm initialData={demo} />;
}
