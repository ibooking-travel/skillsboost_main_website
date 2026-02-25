import { redirect, notFound } from "next/navigation";
import { getAdminFromCookies } from "@/lib/auth";
import { getActiveCategories } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import CourseForm from "@/components/admin/CourseForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: Props) {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const { id } = await params;
  const [course, categories] = await Promise.all([
    prisma.course.findUnique({ where: { id } }),
    getActiveCategories(),
  ]);

  if (!course) notFound();

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Edit Course</h1>
        <p className="text-slate-500 mt-1">{course.title}</p>
      </div>
      <CourseForm categories={categories} course={course} />
    </div>
  );
}
