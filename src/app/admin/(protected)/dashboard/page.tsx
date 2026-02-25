import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Tag, Eye, EyeOff } from "lucide-react";

export default async function AdminDashboard() {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const [totalCourses, publishedCourses, totalCategories] =
    await Promise.all([
      prisma.course.count(),
      prisma.course.count({ where: { isPublished: true } }),
      prisma.category.count(),
      prisma.category.count({ where: { isActive: true } }),
    ]);

  const recentCourses = await prisma.course.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const stats = [
    { label: "Total Courses", value: totalCourses, icon: BookOpen, color: "bg-blue-500" },
    { label: "Published", value: publishedCourses, icon: Eye, color: "bg-green-500" },
    { label: "Unpublished", value: totalCourses - publishedCourses, icon: EyeOff, color: "bg-amber-500" },
    { label: "Categories", value: totalCategories, icon: Tag, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-8 mt-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back, {admin.name}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/admin/courses/new"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-6 transition-colors"
        >
          <h3 className="font-semibold text-lg mb-1">+ Add New Course</h3>
          <p className="text-blue-100 text-sm">Create and publish a new course</p>
        </Link>
        <Link
          href="/admin/categories"
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-6 transition-colors"
        >
          <h3 className="font-semibold text-lg mb-1">Manage Categories</h3>
          <p className="text-purple-100 text-sm">Add, edit, or reorder categories</p>
        </Link>
      </div>

      {/* Recent Courses */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Courses</h2>
          <Link href="/admin/courses" className="text-sm text-blue-600 hover:underline">
            View all →
          </Link>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="text-left px-6 py-3">Course</th>
              <th className="text-left px-6 py-3">Category</th>
              <th className="text-left px-6 py-3">Price</th>
              <th className="text-left px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {recentCourses.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{course.icon}</span>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{course.title}</p>
                      <p className="text-xs text-slate-400">{course.duration} · {course.level}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{course.category.name}</td>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">₹{course.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    course.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
