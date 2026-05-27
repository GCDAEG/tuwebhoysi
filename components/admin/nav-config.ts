import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CreditCard,
  FileEdit,
  Globe,
  LayoutDashboard,
  LineChart,
  Package,
  PlusCircle,
  Share2,
  Users,
  Wallet,
} from "lucide-react";

import type { DashboardRole } from "./types";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

const adminSections: NavSection[] = [
  {
    title: "Principal",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/clients", label: "Gestión de clientes", icon: Users },
      { href: "/admin/revenue", label: "Ingresos", icon: Wallet },
      { href: "/admin/stats", label: "Estadísticas generales", icon: BarChart3 },
      { href: "/admin/websites", label: "Todas las webs", icon: Globe },
      { href: "/admin/demos", label: "Demos", icon: Globe },
    ],
  },
  {
    title: "Operaciones",
    items: [
      { href: "/admin/new-store", label: "Alta de negocio", icon: PlusCircle },
      { href: "/admin/billing", label: "Facturación", icon: CreditCard },
    ],
  },
];

const clientSections: NavSection[] = [
  {
    title: "Tu negocio",
    items: [
      { href: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/client/website", label: "Mi página web", icon: Globe },
      { href: "/client/catalog", label: "Catálogo", icon: Package },
      { href: "/client/social", label: "Redes sociales", icon: Share2 },
      { href: "/client/analytics", label: "Analíticas", icon: LineChart },
      { href: "/client/content", label: "Editar contenido", icon: FileEdit },
    ],
  },
];

/** Secciones de navegación según rol (una sola fuente de verdad para Sidebar / Mobile). */
export function getNavSectionsForRole(role: DashboardRole): NavSection[] {
  return role === "admin" ? adminSections : clientSections;
}
