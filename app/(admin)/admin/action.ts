"use server"

import { ClientFormData } from '@/components/admin/types';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

// Definimos un tipo con los campos que permitiremos editar desde el panel
export type UpdateProfileInput = {
  id: string;
  full_name?: string;
  whatsapp?: string;
  instagram_url?: string;
  catalog?: boolean;
  role?: 'admin' | 'editor' | 'client';
  website?: string;
};

export async function updateStoreProfile(data: UpdateProfileInput) {
  const supabase = await createAdminClient();

  // Desestructuramos el ID para usarlo en el filtro y no pisarlo en el update
  const { id, ...fieldsToUpdate } = data;

  // Realizamos la actualización usando el cliente admin con superpoderes (Bypassea RLS)
  const { error } = await supabase
    .from('profiles')
    .update({
      ...fieldsToUpdate,
      updated_at: new Date().toISOString() // Actualizamos el timestamp manualmente si es necesario
    })
    .eq('id', id);

  if (error) {
    console.error("Error al actualizar el perfil:", error);
    throw new Error(`No se pudo actualizar el perfil: ${error.message}`);
  }

  // 🔄 Clave para Next.js 16: Forzamos a que la tabla de clientes se refresque
  // y muestre los datos nuevos al instante sin tener que recargar la página a mano.
  revalidatePath('/admin/dashboard'); 

  return { success: true };
}


export async function newStore(data: ClientFormData) {
  const supabase = await createAdminClient();
  const password = Math.random().toString(36).slice(-10) + "Ab1!"; 

  // 1. Generar el username base a partir del nombre del negocio
  // - .normalize("NFD"): Descompone caracteres con tildes (ej: 'ó' pasa a 'o' + tilde flotante)
  // - .replace(/[\u0300-\u036f]/g, ""): Remueve las tildes flotantes
  // - .toLowerCase(): Todo a minúsculas
  // - .trim(): Saca espacios fantasmas al principio y al final
  // - .replace(/\s+/g, "_"): Reemplaza uno o más espacios por un solo guión bajo
  // - .replace(/[^a-z0-9_-]/g, ""): Limpia cualquier otro caracter raro que no sirva para URL
  const generatedUsername = data.storename
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_-]/g, "");

  // 2. Creamos al usuario y le pasamos los metadatos que el Trigger necesita
  const { error: authError } = await supabase.auth.admin.createUser({
    email: data.email,
    password: password,
    email_confirm: true, 
    user_metadata: { // 👈 Estos datos viajan directo a 'new.raw_user_meta_data' en Postgres
      storename: data.storename,
      username: generatedUsername, // 👈 Enviamos el slug limpio listo para el Trigger
      whatsapp: data.whatsapp,
      instagram_url: data.instagram_url,
      catalog: data.catalog
    }
  });

  if (authError) {
    throw new Error(`Error al crear accesos: ${authError.message}`);
  }

  // ✅ ¡YA NO HAY PASO 2! El trigger handle_new_user se encarga de crear el perfil
  // de forma nativa e inmediata en Postgres usando los datos de arriba.

  return { success: true, password: password, username: generatedUsername }; // Devolvemos la contraseña generada para mostrarla en el panel
}


export async function deleteStoreClient(userId: string) {
  const supabase = await createAdminClient();

  // 1. Borramos el usuario directamente de Supabase Auth
  // Al hacer esto, el 'on delete CASCADE' de Postgres borra automáticamente su fila en 'profiles'
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    console.error("Error al eliminar el cliente:", error);
    throw new Error(`No se pudo eliminar el cliente: ${error.message}`);
  }

  // 2. Refrescamos la caché de la página para que desaparezca de la tabla al instante
  revalidatePath('/admin/dashboard');

  return { success: true };
}