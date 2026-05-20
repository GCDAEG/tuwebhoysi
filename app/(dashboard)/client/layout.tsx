import { AdminLayout } from "@/components/admin/layout/AdminLayout";

export default async function ClientSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout requiredRole="client">{children}</AdminLayout>;
}
