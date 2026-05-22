// lib/supabase/public.ts
import { Profile } from "@/components/admin/types";
import { createClient } from "@/lib/supabase/server"; 
import { ProductPublic } from "@/types/catalog";

interface PublicStoreData {
  store: Profile;
  products: ProductPublic[];
}

/**
 * Obtiene los datos públicos de una tienda y sus productos activos usando el username/slug
 */
export async function getPublicStoreData(slug: string): Promise<PublicStoreData | null> {
  const supabase = await createClient();

  // 1. Buscamos el perfil usando .maybeSingle() para evitar el error PGRST116 si no existe 🛡️
  const { data: store, error: storeError } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", slug)
    .maybeSingle();

  if (storeError || !store) {
    console.error(`Tienda no encontrada para el slug: ${slug}`, storeError);
    return null;
  }

  // 2. Traemos SOLO los productos disponibles con el JOIN de categorías
  const { data: products, error: productsError } = await supabase
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
    console.error("Error al traer productos públicos:", productsError);
    return null;
  }

  // 3. Mapeamos la data para que el e-commerce externo reciba la categoría directo como un texto chato
  const formattedProducts = products.map((p: any) => {
    const { categories, ...rest } = p;
    return {
      ...rest,
      category: categories?.name || "Sin categoría" // 👈 Así el frontend hace p.category directo y listo
    };
  });

  return {
    store: store as Profile,
    products: formattedProducts as unknown as ProductPublic[],
  };
}