import * as React from "react";

import { cn } from "@/lib/utils";

export type DataTableColumn<T> = {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

export type DataTableProps<T extends Record<string, unknown>> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
  className?: string;
};

/**
 * Tabla genérica tipada; usa `render` por columna o muestra `row[key]` como texto.
 */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  rowKey,
  emptyMessage = "Sin datos",
  className,
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300/80 py-10 text-center font-sans text-sm text-zinc-500 dark:border-white/15 dark:text-zinc-400">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div
      className={cn(
        "overflow-x-auto rounded-2xl border border-white/15 bg-white/50 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/40",
        className,
      )}
    >
      <table className="w-full min-w-lg border-collapse font-sans text-sm">
        <thead>
          <tr className="border-b border-zinc-200/80 text-left dark:border-white/10">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  "px-4 py-3 font-heading text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400",
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className="border-b border-zinc-100 last:border-0 dark:border-white/5"
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 text-zinc-800 dark:text-zinc-200">
                  {col.render
                    ? col.render(row)
                    : String(row[col.key as keyof T] ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
