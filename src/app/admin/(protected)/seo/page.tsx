import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search, AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react";

export default async function SeoOverviewPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      isPublished: true,
      robots: true,
      metaTitle: true,
      metaDescription: true,
      canonicalUrl: true,
    },
  });

  const published = courses.filter((c) => c.isPublished);
  const withMeta = published.filter((c) => c.metaTitle && c.metaDescription);
  const noMeta = published.filter((c) => !c.metaTitle || !c.metaDescription);
  const noindex = published.filter((c) => c.robots.includes("noindex"));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Search className="w-6 h-6 text-blue-600" />
          SEO Overview
        </h1>
        <p className="text-slate-500 text-sm mt-1">Monitor and manage SEO across all content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-2xl font-bold text-slate-900">{published.length}</p>
          <p className="text-sm text-slate-500 mt-1">Published Courses</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-2xl font-bold text-green-600">{withMeta.length}</p>
          <p className="text-sm text-slate-500 mt-1">With Meta Tags</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-2xl font-bold text-amber-600">{noMeta.length}</p>
          <p className="text-sm text-slate-500 mt-1">Missing Meta Tags</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-2xl font-bold text-red-600">{noindex.length}</p>
          <p className="text-sm text-slate-500 mt-1">Noindex Pages</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Link href="/admin/site-settings" className="bg-blue-50 border border-blue-200 rounded-xl p-5 hover:bg-blue-100 transition-colors">
          <h3 className="font-semibold text-blue-900">Site Settings</h3>
          <p className="text-sm text-blue-600 mt-1">Global SEO defaults, Organization schema, LocalBusiness</p>
        </Link>
        <Link href="/admin/page-seo" className="bg-violet-50 border border-violet-200 rounded-xl p-5 hover:bg-violet-100 transition-colors">
          <h3 className="font-semibold text-violet-900">Page SEO</h3>
          <p className="text-sm text-violet-600 mt-1">SEO for static pages: Home, About, Contact, etc.</p>
        </Link>
        <Link href="/admin/courses" className="bg-teal-50 border border-teal-200 rounded-xl p-5 hover:bg-teal-100 transition-colors">
          <h3 className="font-semibold text-teal-900">Course SEO</h3>
          <p className="text-sm text-teal-600 mt-1">Edit per-course meta tags, OG images, robots</p>
        </Link>
      </div>

      {/* Course SEO Table */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Course SEO Status</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                <th className="px-6 py-3 text-slate-500 font-medium">Course</th>
                <th className="px-6 py-3 text-slate-500 font-medium">Status</th>
                <th className="px-6 py-3 text-slate-500 font-medium">Meta Title</th>
                <th className="px-6 py-3 text-slate-500 font-medium">Meta Desc</th>
                <th className="px-6 py-3 text-slate-500 font-medium">Robots</th>
                <th className="px-6 py-3 text-slate-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium text-slate-900 max-w-xs truncate">{course.title}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${course.isPublished ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {course.metaTitle ? (
                      <span className="flex items-center gap-1 text-green-600"><CheckCircle2 className="w-3.5 h-3.5" /> Set</span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-500"><AlertTriangle className="w-3.5 h-3.5" /> Missing</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    {course.metaDescription ? (
                      <span className="flex items-center gap-1 text-green-600"><CheckCircle2 className="w-3.5 h-3.5" /> Set</span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-500"><AlertTriangle className="w-3.5 h-3.5" /> Missing</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-mono ${course.robots.includes("noindex") ? "text-red-500" : "text-slate-500"}`}>
                      {course.robots}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <Link href={`/admin/courses/${course.id}/edit`} className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                      Edit SEO <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
