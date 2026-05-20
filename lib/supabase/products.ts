import { createClient } from "@/lib/supabase/server";
import { ProductCatalog } from "@/types/catalog"; 

export async function getClientProducts(): Promise<ProductCatalog[]> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Error de autenticación al traer productos:", authError);
    return [];
  }

  // 1. Hacemos la consulta usando el JOIN
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });
      
  if (productsError) {
    console.error("Error al obtener los productos:", productsError);
    throw new Error(`No se pudieron cargar los productos: ${productsError.message}`);
  }

  // 2. Transformamos el array para que "category" sea el objeto integrado
  const formattedProducts = products.map((product) => {
    // Extraemos la columna 'category' (el UUID suelto) y 'categories' (el objeto del JOIN)
    const { category, categories, ...rest } = product;
    
    return {
      ...rest,
      // Asignamos el objeto limpio a la propiedad "category"
      category: categories || null 
    };
  });

  return formattedProducts as ProductCatalog[];
}