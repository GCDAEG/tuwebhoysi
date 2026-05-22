// app/api/catalog/[slug]/route.ts
import { getPublicStoreData } from "@/lib/public/public";
import { NextResponse } from "next/server";


export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // 1. Buscamos la data en la base de datos usando la función del servidor
    const data = await getPublicStoreData(slug);

    // 2. Si el slug no existe, devolvemos un error 404 estructurado en JSON
    if (!data) {
      return NextResponse.json(
        { error: "Comercio no encontrado" },
        { status: 404 }
      );
    }

    // 3. Si todo está bien, preparamos la respuesta con los datos limpios
    const response = NextResponse.json({
      store: {
        id: data.store.id,
        name: data.store.full_name,
        whatsapp: data.store.whatsapp,
        instagram: data.store.instagram_url,
        facebook: data.store.facebook_url,
        website: data.store.website,
      },
      products: data.products, // El array de productos con is_available: true
    });
    console.log("Respuesta de la API de catálogo público:", await response.clone().json());
    // 4. Habilitamos CORS para que la web externa del cliente pueda hacer el fetch sin problemas
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return response;
  } catch (error) {
    console.error("Error en API de catálogo público:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Manejador para las peticiones de tipo OPTIONS (requerido por CORS en ciertos navegadores)
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}