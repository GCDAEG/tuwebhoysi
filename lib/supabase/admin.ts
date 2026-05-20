// lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js'

export async function createAdminClient() {
  // Usamos la librería base de supabase-js directamente para acciones de bypass
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // 👈 Clave secreta de servidor
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false // 👈 EVITA QUE SE GUARDE O ALTERE LA SESIÓN ACTUAL
      }
    }
  )
}