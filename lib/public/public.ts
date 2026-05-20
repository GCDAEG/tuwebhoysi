// lib/supabase/public.ts
import { Profile } from "@/components/admin/types";
import { createClient } from "@/lib/supabase/server"; // O tu inicializador público sin cookies si lo separaste
import { Product, ProductPublic } from "@/types/catalog";

interface PublicStoreData {
  store: Profile;
  products: ProductPublic[];
}

/**
 * Obtiene los datos públicos de una tienda y sus productos activos usando el username/slug
 */
export async function getPublicStoreData(slug: string): Promise<PublicStoreData | null> {
  const supabase = await createClient();

  // 1. Buscamos el perfil del comercio que coincida con el slug (username)
  const { data: store, error: storeError } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", slug)
    .single();

  if (storeError || !store) {
    console.error(`Tienda no encontrada para el slug: ${slug}`, storeError);
    return null;
  }

  // 2. Traemos SOLO los productos que están marcados como DISPONIBLES (is_available: true)
  // Dentro de tu función getPublicStoreData(slug) en lib/supabase/public.ts, cambiá la consulta de productos por esta:
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

  if (productsError) {
    console.error("Error al traer productos públicos:", productsError);
    return null;
  }

  return {
    store: store as Profile,
    products: products as ProductPublic[],
  };
}