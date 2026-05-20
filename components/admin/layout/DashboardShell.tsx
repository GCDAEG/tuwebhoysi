"use client";

import * as React from "react";

import { Header } from "@/components/admin/common/Header";
import { MobileSidebar } from "@/components/admin/common/MobileSidebar";
import { Sidebar } from "@/components/admin/common/Sidebar";
import { cn } from "@/lib/utils";

export type DashboardShellProps = {
  children: React.ReactNode;
};

/**
 * Estructura del panel: sidebar desktop colapsable, header con glass, drawer móvil
 * y área principal para `children` (páginas bajo `/admin/*` o `/client/*`).
 */
export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed((c) => !c)}
      />

      <MobileSidebar open={mobileNavOpen} onOpenChange={setMobileNavOpen} />

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col transition-[margin] duration-300 ease-out",
          sidebarCollapsed ? "lg:ml-[4.5rem]" : "lg:ml-64",
        )}
      >
        <Header
          onOpenMobileNav={() => setMobileNavOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
        />

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
