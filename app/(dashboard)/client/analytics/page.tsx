import { LineChart } from "lucide-react";

import { EmptyState } from "@/components/admin/ui/EmptyState";

export default function ClientAnalyticsPage() {
  return (
    <EmptyState
      icon={LineChart}
      title="Analíticas"
      description="Integración con GA4 / Plausible y embudos de conversión."
    />
  );
}
