import { CreditCard } from "lucide-react";

import { EmptyState } from "@/components/admin/ui/EmptyState";

export default function AdminBillingPage() {
  return (
    <EmptyState
      icon={CreditCard}
      title="Facturación"
      description="Suscripciones, facturas y métodos de pago."
    />
  );
}
