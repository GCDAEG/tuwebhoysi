import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { DashboardSessionProvider } from "@/components/admin/DashboardSessionContext";
import { DashboardShell } from "@/components/admin/layout/DashboardShell";
import {
  parseDashboardRole,
  type DashboardRole,
} from "@/components/admin/types";

export type AdminLayoutProps = {
  children: React.ReactNode;
  /** Si se define, solo ese rol puede ver estas rutas (p. ej. `admin` en `/admin/*`). */
  requiredRole?: DashboardRole;
};

/**
 * Layout del área de panel: valida sesión Supabase y rol, inyecta contexto
 * y delega la cáscara visual en `DashboardShell`.
 */
export async function AdminLayout({
  children,
  requiredRole,
}: AdminLayoutProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const role = parseDashboardRole(user.app_metadata?.role);
  if (!role) {
    redirect("/account");
  }

  if (requiredRole && role !== requiredRole) {
    redirect(requiredRole === "admin" ? "/client/dashboard" : "/admin/dashboard");
  }

  const session = {
    role,
    email: user.email ?? null,
    userId: user.id,
  };

  return (
    <DashboardSessionProvider value={session}>
      <DashboardShell>{children}</DashboardShell>
    </DashboardSessionProvider>
  );
}
