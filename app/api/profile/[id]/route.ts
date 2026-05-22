// app/api/profile/[id]/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Inicializamos un cliente puro para lectura pública (evita errores 500 en Vercel)
const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

// Headers CORS para permitir peticiones desde dominios externos
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extraemos el ID de la URL
    const { id } = await params;

    // Consultamos la base de datos usando .maybeSingle() por seguridad
    const { data: profile, error } = await supabasePublic
      .from("profiles")
      .select(`
        id,
        full_name,
        username,
        avatar_url,
        banner_url,
        whatsapp,
        instagram_url,
        facebook_url,
        website,
        welcome_message,
        catalog
      `)
      .eq("id", id)
      .maybeSingle();

    if (error || !profile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Estructuramos la respuesta con nombres de propiedades limpios para el frontend
    return NextResponse.json({
      id: profile.id,
      name: profile.full_name,
      username: profile.username,
      logo: profile.avatar_url,
      banner: profile.banner_url,
      whatsapp: profile.whatsapp,
      instagram: profile.instagram_url,
      facebook: profile.facebook_url,
      website: profile.website,
      welcome_message: profile.welcome_message,
      has_catalog_active: profile.catalog
    }, { 
      status: 200, 
      headers: corsHeaders 
    });

  } catch (error) {
    console.error("Error crítico al obtener el perfil:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Manejador obligatorio para las peticiones preflight de los navegadores (CORS)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}