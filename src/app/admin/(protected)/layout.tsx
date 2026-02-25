import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin — SkillsBoost",
  robots: { index: false, follow: false },
};

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-auto my-24 bg-slate-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
