"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";

interface CourseActionsProps {
  courseId: string;
  isPublished: boolean;
  slug: string;
}

export default function CourseActions({ courseId, isPublished, slug }: CourseActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const togglePublish = async () => {
    setLoading("publish");
    try {
      await fetch(`/api/admin/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  const deleteCourse = async () => {
    if (!confirm("Are you sure you want to delete this course? This cannot be undone.")) return;
    setLoading("delete");
    try {
      await fetch(`/api/admin/courses/${courseId}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/courses/${slug}`}
        target="_blank"
        className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
        title="View course"
      >
        <Eye className="w-4 h-4" />
      </Link>

      <Link
        href={`/admin/courses/${courseId}/edit`}
        className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
        title="Edit course"
      >
        <Edit className="w-4 h-4" />
      </Link>

      <button
        onClick={togglePublish}
        disabled={loading === "publish"}
        className="p-1.5 text-slate-400 hover:text-amber-600 transition-colors"
        title={isPublished ? "Unpublish" : "Publish"}
      >
        {isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>

      <button
        onClick={deleteCourse}
        disabled={loading === "delete"}
        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
        title="Delete course"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
