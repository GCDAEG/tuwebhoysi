/** Roles soportados por el shell del dashboard (JWT `app_metadata.role`). */
export type DashboardRole = "admin" | "client";

/** Sesión mínima expuesta al árbol del dashboard (servidor → cliente). */
export type DashboardSession = {
  role: DashboardRole;
  email: string | null;
  userId: string;
};

/** Normaliza el rol de Supabase (`app_metadata.role`); valores desconocidos → `null`. */
export function parseDashboardRole(raw: unknown): DashboardRole | null {
  if (raw === "admin" || raw === "client") return raw;
  return null;
}


export type ClientFormData = {
    email: string;
    storename: string;
    whatsapp: string;
    catalog: boolean;
    instagram_url?: string | undefined;
    facebook_url?: string | undefined;
    web?: string | undefined;
}


// types/admin.ts

export type UserRole = 'admin' | 'editor' | 'client';

export type Profile = {
  id: string; // uuid
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  website: string | null;
  role: UserRole; // Basado en tu CHECK constraint de Postgres
  updated_at: string | null; // Los timestamps de Postgres vienen como string (ISO) en JS
  instagram_url: string | null;
  facebook_url: string | null;
  whatsapp: string | null;
  web: string | null;
  catalog: boolean; // default false
}