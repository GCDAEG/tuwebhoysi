import AccountForm from "./account-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Account() {
  const supabase = await createClient();

  // Obtenemos el usuario actual desde el servidor
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si no hay usuario (alguien intenta entrar por URL), lo mandamos al login
  if (!user) {
    redirect("/login");
  }

  // Mapeamos los datos para que coincidan con la interfaz Claims del componente
  const claimsData = {
    sub: user.id,
    email: user.email,
  };
  redirect("/login");
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
      <AccountForm claims={claimsData} />
    </div>
  );
}
