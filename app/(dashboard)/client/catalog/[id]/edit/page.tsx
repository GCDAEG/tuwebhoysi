import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { ProductForm } from "../../new/ProductForm";
import { Product } from "@/types/catalog";
import { getClientCategories } from "../../categories/actions";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const categories = await getClientCategories();
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Traemos el producto asegurando que el profile_id sea el del comercio logueado
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("profile_id", user.id)
    .single();

  if (error || !product) {
    notFound(); // Si el producto no existe o es de otra tienda, tira 404
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Editar Producto
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Modificá la información de tu producto o actualizá su precio y
          descuento.
        </p>
      </div>

      {/* Pasamos los datos del producto al formulario */}
      <ProductForm initialData={product as Product} categories={categories} />
    </div>
  );
}
