import { Activity, Globe, Users, Wallet } from "lucide-react";

import { StatsGrid } from "@/components/admin/common/StatsGrid";
import { StatCard } from "@/components/admin/ui/StatCard";
import { ClientsTable } from "@/components/admin/admin/ClientsTable";
import { RevenueStats } from "@/components/admin/admin/RevenueStats";

/**
 * Vista principal del rol **admin**: métricas globales, ingresos y tabla de clientes (MVP).
 */
export function AdminDashboard() {
  return (
    <div className="space-y-10">
      <StatsGrid>
        <StatCard
          label="Clientes activos"
          value="128"
          hint="+12 este mes"
          icon={Users}
        />
        <StatCard
          label="Webs publicadas"
          value="94"
          hint="Pipeline: 14"
          icon={Globe}
        />
        <StatCard
          label="Ingresos MRR"
          value="$ 42k"
          hint="Estimado"
          icon={Wallet}
        />
        <StatCard
          label="Salud sistema"
          value="99.2%"
          hint="uptime 30d"
          icon={Activity}
        />
      </StatsGrid>

      <RevenueStats />

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
          Últimos clientes
        </h2>
        <ClientsTable />
      </section>
    </div>
  );
}
