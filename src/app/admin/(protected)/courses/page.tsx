import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/auth";
import { adminGetAllCourses } from "@/lib/db";
import Link from "next/link";
import CourseActions from "@/components/admin/CourseActions";

export default async function AdminCoursesPage() {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const courses = await adminGetAllCourses();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Courses</h1>
          <p className="text-slate-500 mt-1">{courses.length} courses total</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="bg-blue-600 hover:bg-blue-700 z-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Add Course
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100 bg-slate-50">
              <th className="text-left px-6 py-4">Course</th>
              <th className="text-left px-6 py-4">Category</th>
              <th className="text-left px-6 py-4">Price</th>
              <th className="text-left px-6 py-4">Students</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{course.icon}</span>
                    <div>
                      <p className="font-medium text-slate-900">{course.title}</p>
                      <p className="text-xs text-slate-400">/{course.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{course.category.name}</td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">₹{course.price.toLocaleString()}</p>
                  <p className="text-xs text-slate-400 line-through">₹{course.originalPrice.toLocaleString()}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{course.studentsCount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    course.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <CourseActions courseId={course.id} isPublished={course.isPublished} slug={course.slug} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
