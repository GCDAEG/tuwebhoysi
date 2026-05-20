"use client";

import * as React from "react";

import type { DashboardSession } from "./types";

const DashboardSessionContext = React.createContext<DashboardSession | null>(
  null,
);

export type DashboardSessionProviderProps = {
  value: DashboardSession;
  children: React.ReactNode;
};

/**
 * Contexto con la sesión del panel (rol + datos mínimos), hidratada desde el servidor
 * tras leer Supabase (`getUser` + `app_metadata.role`).
 */
export function DashboardSessionProvider({
  value,
  children,
}: DashboardSessionProviderProps) {
  return (
    <DashboardSessionContext.Provider value={value}>
      {children}
    </DashboardSessionContext.Provider>
  );
}

export function useDashboardSession(): DashboardSession {
  const ctx = React.useContext(DashboardSessionContext);
  if (!ctx) {
    throw new Error(
      "useDashboardSession debe usarse dentro de DashboardSessionProvider",
    );
  }
  return ctx;
}
