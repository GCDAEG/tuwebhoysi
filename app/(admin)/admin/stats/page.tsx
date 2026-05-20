import { BarChart3 } from "lucide-react";

import { EmptyState } from "@/components/admin/ui/EmptyState";

export default function AdminStatsPage() {
  return (
    <EmptyState
      icon={BarChart3}
      title="Estadísticas generales"
      description="Agrega aquí gráficos consolidados (tráfico, conversiones, cohortes)."
    />
  );
}
