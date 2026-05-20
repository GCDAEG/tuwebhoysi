// components/admin/admin/ClientsTable.tsx
import { getGlobalStores } from "@/lib/supabase/profiles";

import { Profile } from "../types";
import { ClientsTableManager } from "./ClientsTableManager";

export async function ClientsTable() {
  // 1. Buscamos la data fresca en el servidor 🚀
  const profiles: Profile[] = await getGlobalStores();
  console.log(profiles);
  // 2. Se la inyectamos al manager encargado de la interacción
  return <ClientsTableManager initialProfiles={profiles} />;
}
