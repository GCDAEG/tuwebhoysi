import { TrendingUp } from "lucide-react";

import { StatCard } from "@/components/admin/ui/StatCard";

/**
 * Bloque resumido de ingresos (placeholders; sustituir por datos reales).
 */
export function RevenueStats() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <StatCard
        label="Ingresos del mes"
        value="$ 18.400"
        hint="vs. mes anterior +6%"
        icon={TrendingUp}
      />
      <StatCard
        label="Ticket medio"
        value="$ 320"
        hint="Contratos firmados"
        icon={TrendingUp}
      />
    </section>
  );
}
