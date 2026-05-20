import { Eye, MousePointerClick, Share2, Sparkles } from "lucide-react";

import { StatsGrid } from "@/components/admin/common/StatsGrid";
import { StatCard } from "@/components/admin/ui/StatCard";
import { MyWebsiteCard } from "@/components/admin/client/MyWebsiteCard";
import { AnalyticsCard } from "@/components/admin/client/AnalyticsCard";

/**
 * Vista principal del rol **client**: KPIs de su sitio y accesos rápidos.
 */
export function ClientDashboard() {
  return (
    <div className="space-y-10">
      <StatsGrid>
        <StatCard
          label="Visitas (7d)"
          value="2.4k"
          hint="Orgánico 62%"
          icon={Eye}
        />
        <StatCard
          label="Clicks CTA"
          value="186"
          hint="Formulario contacto"
          icon={MousePointerClick}
        />
        <StatCard
          label="Redes"
          value="12"
          hint="Publicaciones programadas"
          icon={Share2}
        />
        <StatCard
          label="Estado web"
          value="OK"
          hint="Sin incidencias"
          icon={Sparkles}
        />
      </StatsGrid>

      <div className="grid gap-6 lg:grid-cols-2">
        <MyWebsiteCard />
        <AnalyticsCard />
      </div>
    </div>
  );
}
