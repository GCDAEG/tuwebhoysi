// lib/services/stores.ts
import { createClient } from '@/lib/supabase/server';

export async function getGlobalStores() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('profiles') // Tu tabla de comercios
    .select('*')
    .eq("role", "client")
    .order('updated_at', { ascending: false });
    
  if (error) {
    console.error("Error cargando comercios globales:", error);
    return [];
  }
  
  return data;
}