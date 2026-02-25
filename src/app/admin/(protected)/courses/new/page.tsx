import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/auth";
import { getActiveCategories } from "@/lib/db";
import CourseForm from "@/components/admin/CourseForm";

export const metadata = { title: "New Course — Admin" };

export default async function NewCoursePage() {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const categories = await getActiveCategories();

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Create Course</h1>
        <p className="text-slate-500 mt-1">Add a new course to the platform</p>
      </div>
      <CourseForm categories={categories} />
    </div>
  );
}
