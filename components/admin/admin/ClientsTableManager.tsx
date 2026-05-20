// components/admin/admin/ClientsTableManager.tsx
"use client";

import * as React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { DataTable } from "@/components/admin/ui/DataTable";

import { Profile } from "../types";
import { EditStoreSheet } from "./stores/EditStoreSheet";
import { deleteStoreClient } from "@/app/(admin)/admin/action";

interface ClientsTableManagerProps {
  initialProfiles: Profile[];
}

export function ClientsTableManager({
  initialProfiles,
}: ClientsTableManagerProps) {
  // Estado para capturar qué perfil se va a editar
  const [selectedProfile, setSelectedProfile] = React.useState<Profile | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = React.useState<string | null>(null);
  type DataTableProfile = Profile & Record<string, unknown>;

  const handleDelete = async (userId: string, storeName: string) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que querés eliminar a "${storeName}"? Esta acción borrará de forma permanente sus accesos y su perfil de TUWEBHOY.`,
    );

    if (!confirmed) return;

    setIsDeleting(userId);
    try {
      await deleteStoreClient(userId);
      // Opcional: Podés meter un toast o alerta de éxito acá
    } catch (error) {
      alert("Hubo un error al intentar eliminar el comercio.");
    } finally {
      setIsDeleting(null);
    }
  };
  return (
    <>
      <DataTable<DataTableProfile>
        rowKey={(r) => r.id}
        rows={initialProfiles}
        columns={[
          { key: "full_name", header: "Negocio" },
          { key: "whatsapp", header: "WhatsApp" },
          {
            key: "catalog",
            header: "Catálogo",
            // Si tu DataTable soporta funciones de renderizado, usás esto.
            // Si solo lee strings planos, podés mapear los rows antes de pasarlos.
            render: (val) => (val ? "✅ Activo" : "❌ Inactivo"),
          },
          {
            key: "website",
            header: "Página Web",
          },
          {
            key: "id", // Usamos el ID como llave de la columna de acciones
            header: "Acciones",
            render: (row) => (
              <div className="flex items-center gap-1">
                {/* Botón de Editar */}
                <button
                  type="button"
                  onClick={() => setSelectedProfile(row)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors flex items-center justify-center"
                  title="Editar comercio"
                >
                  <Edit2 className="size-4" />
                </button>

                {/* Botón de Eliminar */}
                <button
                  type="button"
                  disabled={isDeleting === row.id}
                  onClick={() =>
                    handleDelete(row.id, row.full_name || "Este comercio")
                  }
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
                  title="Eliminar comercio"
                >
                  {isDeleting === row.id ? (
                    <div className="size-4 animate-spin rounded-full border-2 border-red-600/30 border-t-red-600" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                </button>
              </div>
            ),
          },
        ]}
      />

      {/* El panel lateral flotante que se activa al clickear una fila */}
      <EditStoreSheet
        profile={selectedProfile}
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </>
  );
}
