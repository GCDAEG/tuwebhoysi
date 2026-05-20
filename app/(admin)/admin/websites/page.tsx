import { Globe } from "lucide-react";

import { EmptyState } from "@/components/admin/ui/EmptyState";

export default function AdminWebsitesPage() {
  return (
    <EmptyState
      icon={Globe}
      title="Todas las webs"
      description="Listado global de sitios publicados y borradores."
    />
  );
}
