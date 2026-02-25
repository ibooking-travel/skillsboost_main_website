import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/auth";
import { adminGetAllCategories } from "@/lib/db";
import CategoryManager from "@/components/admin/CategoryManager";

export default async function AdminCategoriesPage() {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const categories = await adminGetAllCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
          <p className="text-slate-500 mt-1">Manage course categories</p>
        </div>
      </div>
      <CategoryManager initialCategories={categories} />
    </div>
  );
}
