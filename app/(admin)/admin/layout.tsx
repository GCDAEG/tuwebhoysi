import { AdminLayout } from "@/components/admin/layout/AdminLayout";

export default async function AdminSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout requiredRole="admin">{children}</AdminLayout>;
}
