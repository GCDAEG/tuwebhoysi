// app/api/catalog/[slug]/route.ts
import { getPublicStoreData } from "@/lib/public/public";
import { NextResponse } from "next/server";

// Headers CORS reutilizables
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const data = await getPublicStoreData(slug);

    if (!data) {
      return NextResponse.json(
        { error: "Comercio no encontrado" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Armamos el objeto limpio con los nombres exactos de tu base de datos
    return NextResponse.json({
      store: {
        id: data.store.id,
        name: data.store.full_name,
        slug: data.store.username,
        whatsapp: data.store.whatsapp,
        instagram: data.store.instagram_url,
        facebook: data.store.facebook_url,
        website: data.store.website,
        logo: data.store.avatar_url,
        banner: data.store.banner_url,
        welcome_message: data.store.welcome_message,
      },
      products: data.products,
    }, { 
      status: 200, 
      headers: corsHeaders 
    });

  } catch (error) {
    console.error("Error crítico en API:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Manejador obligatorio para las peticiones preflight (CORS)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}