// lib/public/public.ts
import { createClient } from "@supabase/supabase-js";
import { ProductPublic } from "@/types/catalog"; // Asegurate de que esta ruta sea la tuya

// Inicializamos un cliente puro y sin cookies para lecturas públicas rápidas
const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function getPublicStoreData(slug: string) {
  // 1. Buscamos el perfil usando el slug exacto
  const { data: store, error: storeError } = await supabasePublic
    .from("profiles")
    .select("*")
    .eq("username", slug)
    .maybeSingle();

  if (storeError || !store) {
    return null;
  }

  // 2. Traemos SOLO los productos disponibles con sus categorías
  const { data: products, error: productsError } = await supabasePublic
    .from("products")
    .select(`
      id,
      name,
      description,
      price,
      discount_percent,
      image_url,
      is_available,
      categories (
        name
      )
    `)
    .eq("profile_id", store.id)
    .eq("is_available", true);

  if (productsError || !products) {
    return null;
  }

  // 3. Aplanamos la categoría para que el front-end la consuma fácil
  const formattedProducts = products.map((p: any) => {
    const { categories, ...rest } = p;
    return {
      ...rest,
      category: categories?.name || "Sin categoría"
    };
  });

  return {
    store,
    products: formattedProducts as unknown as ProductPublic[],
  };
}