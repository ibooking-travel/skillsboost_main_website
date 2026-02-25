"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category, Course } from "@prisma/client";
import { Plus, Trash2 } from "lucide-react";
import SeoFields, { SeoState, defaultSeoState } from "./SeoFields";

interface CourseFormProps {
  categories: Category[];
  course?: Course;
}

type FormState = {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  categoryId: string;
  level: string;
  price: string;
  originalPrice: string;
  duration: string;
  modulesCount: string;
  studentsCount: string;
  rating: string;
  certificate: boolean;
  icon: string;
  highlights: string[];
  skills: string[];
  curriculum: { title: string; topics: string[]; duration: string }[];
  faqs: { question: string; answer: string }[];
  instructorName: string;
  instructorTitle: string;
  instructorInitials: string;
  instructorAvatarColor: string;
  colorFrom: string;
  colorTo: string;
  accentHex: string;
  badgeClass: string;
  isPublished: boolean;
} & SeoState;

function initForm(course?: Course): FormState {
  if (course) {
    return {
      title: course.title,
      slug: course.slug,
      tagline: course.tagline,
      description: course.description,
      categoryId: course.categoryId,
      level: course.level,
      price: course.price.toString(),
      originalPrice: course.originalPrice.toString(),
      duration: course.duration,
      modulesCount: course.modulesCount.toString(),
      studentsCount: course.studentsCount.toString(),
      rating: course.rating.toString(),
      certificate: course.certificate,
      icon: course.icon,
      highlights: (course.highlights as string[]) || [""],
      skills: (course.skills as string[]) || [""],
      curriculum: (course.curriculum as { title: string; topics: string[]; duration: string }[]) || [{ title: "", topics: [""], duration: "" }],
      faqs: (course.faqs as { question: string; answer: string }[]) || [{ question: "", answer: "" }],
      instructorName: course.instructorName,
      instructorTitle: course.instructorTitle,
      instructorInitials: course.instructorInitials,
      instructorAvatarColor: course.instructorAvatarColor,
      colorFrom: course.colorFrom,
      colorTo: course.colorTo,
      accentHex: course.accentHex,
      badgeClass: course.badgeClass,
      isPublished: course.isPublished,
      // SEO
      metaTitle: course.metaTitle || "",
      metaDescription: course.metaDescription || "",
      ogTitle: course.ogTitle || "",
      ogDescription: course.ogDescription || "",
      ogImage: course.ogImage || "",
      twitterTitle: course.twitterTitle || "",
      twitterDescription: course.twitterDescription || "",
      twitterImage: course.twitterImage || "",
      canonicalUrl: course.canonicalUrl || "",
      robots: course.robots || "index, follow",
      focusKeyword: course.focusKeyword || "",
    };
  }
  return {
    title: "", slug: "", tagline: "", description: "",
    categoryId: "", level: "Beginner",
    price: "", originalPrice: "", duration: "", modulesCount: "",
    studentsCount: "0", rating: "4.9",
    certificate: true, icon: "",
    highlights: [""],
    skills: [""],
    curriculum: [{ title: "", topics: [""], duration: "" }],
    faqs: [{ question: "", answer: "" }],
    instructorName: "", instructorTitle: "", instructorInitials: "",
    instructorAvatarColor: "#2563eb",
    colorFrom: "#2563eb", colorTo: "#7c3aed", accentHex: "#2563eb",
    badgeClass: "badge-blue",
    isPublished: true,
    ...defaultSeoState,
  };
}

export default function CourseForm({ categories, course }: CourseFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initForm(course));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: keyof FormState, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setSeo = (key: keyof SeoState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      ...form,
      price: parseInt(form.price),
      originalPrice: parseInt(form.originalPrice),
      modulesCount: parseInt(form.modulesCount),
      studentsCount: parseInt(form.studentsCount),
      rating: parseFloat(form.rating),
      highlights: form.highlights.filter(Boolean),
      skills: form.skills.filter(Boolean),
      curriculum: form.curriculum.filter((c) => c.title).map((c) => ({
        ...c,
        topics: c.topics.filter(Boolean),
      })),
      faqs: form.faqs.filter((f) => f.question),
    };

    try {
      const res = await fetch(
        course ? `/api/admin/courses/${course.id}` : "/api/admin/courses",
        {
          method: course ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      router.push("/admin/courses");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const input = "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const label = "block text-sm font-medium text-slate-700 mb-1.5";
  const section = "bg-white rounded-xl border border-slate-200 p-6 space-y-4";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      {/* Basic Info */}
      <div className={section}>
        <h2 className="font-semibold text-slate-900 text-lg">Basic Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={label}>Title *</label>
            <input required value={form.title} onChange={e => set("title", e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>Slug *</label>
            <input required value={form.slug} onChange={e => set("slug", e.target.value)} className={input} placeholder="e.g. full-stack" />
          </div>
          <div>
            <label className={label}>Icon (emoji) *</label>
            <input required value={form.icon} onChange={e => set("icon", e.target.value)} className={input} placeholder="💻" />
          </div>
          <div className="col-span-2">
            <label className={label}>Tagline *</label>
            <input required value={form.tagline} onChange={e => set("tagline", e.target.value)} className={input} />
          </div>
          <div className="col-span-2">
            <label className={label}>Description *</label>
            <textarea required rows={4} value={form.description} onChange={e => set("description", e.target.value)} className={input} />
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className={section}>
        <h2 className="font-semibold text-slate-900 text-lg">Course Details</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={label}>Category *</label>
            <select required value={form.categoryId} onChange={e => set("categoryId", e.target.value)} className={input}>
              <option value="">Select...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Level *</label>
            <select value={form.level} onChange={e => set("level", e.target.value)} className={input}>
              {["Beginner", "Intermediate", "Advanced", "All Levels"].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Duration *</label>
            <input required value={form.duration} onChange={e => set("duration", e.target.value)} className={input} placeholder="12 Weeks" />
          </div>
          <div>
            <label className={label}>Price (₹) *</label>
            <input required type="number" value={form.price} onChange={e => set("price", e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>Original Price (₹) *</label>
            <input required type="number" value={form.originalPrice} onChange={e => set("originalPrice", e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>Modules Count *</label>
            <input required type="number" value={form.modulesCount} onChange={e => set("modulesCount", e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>Students Count</label>
            <input type="number" value={form.studentsCount} onChange={e => set("studentsCount", e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>Rating</label>
            <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => set("rating", e.target.value)} className={input} />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={e => set("isPublished", e.target.checked)} className="w-4 h-4 rounded" />
              <span className="text-sm font-medium text-slate-700">Published</span>
            </label>
          </div>
        </div>
      </div>

      {/* Styling */}
      <div className={section}>
        <h2 className="font-semibold text-slate-900 text-lg">Styling</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className={label}>Color From</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={form.colorFrom} onChange={e => set("colorFrom", e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
              <input value={form.colorFrom} onChange={e => set("colorFrom", e.target.value)} className={`${input} flex-1`} />
            </div>
          </div>
          <div>
            <label className={label}>Color To</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={form.colorTo} onChange={e => set("colorTo", e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
              <input value={form.colorTo} onChange={e => set("colorTo", e.target.value)} className={`${input} flex-1`} />
            </div>
          </div>
          <div>
            <label className={label}>Accent Hex</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={form.accentHex} onChange={e => set("accentHex", e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
              <input value={form.accentHex} onChange={e => set("accentHex", e.target.value)} className={`${input} flex-1`} />
            </div>
          </div>
          <div>
            <label className={label}>Badge Class</label>
            <select value={form.badgeClass} onChange={e => set("badgeClass", e.target.value)} className={input}>
              {["badge-blue", "badge-violet", "badge-rose", "badge-amber", "badge-teal", "badge-green"].map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Highlights & Skills */}
      <div className={section}>
        <h2 className="font-semibold text-slate-900 text-lg">Highlights & Skills</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={label}>Highlights</label>
            {form.highlights.map((h, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={h} onChange={e => {
                  const arr = [...form.highlights]; arr[i] = e.target.value; set("highlights", arr);
                }} className={`${input} flex-1`} placeholder={`Highlight ${i + 1}`} />
                <button type="button" onClick={() => set("highlights", form.highlights.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => set("highlights", [...form.highlights, ""])} className="text-blue-600 text-sm flex items-center gap-1 hover:underline"><Plus className="w-3 h-3" /> Add Highlight</button>
          </div>
          <div>
            <label className={label}>Skills</label>
            {form.skills.map((s, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={s} onChange={e => {
                  const arr = [...form.skills]; arr[i] = e.target.value; set("skills", arr);
                }} className={`${input} flex-1`} placeholder={`Skill ${i + 1}`} />
                <button type="button" onClick={() => set("skills", form.skills.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => set("skills", [...form.skills, ""])} className="text-blue-600 text-sm flex items-center gap-1 hover:underline"><Plus className="w-3 h-3" /> Add Skill</button>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className={section}>
        <h2 className="font-semibold text-slate-900 text-lg">Curriculum</h2>
        {form.curriculum.map((mod, mi) => (
          <div key={mi} className="border border-slate-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">Module {mi + 1}</h3>
              <button type="button" onClick={() => set("curriculum", form.curriculum.filter((_, j) => j !== mi))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input value={mod.title} placeholder="Module Title" onChange={e => {
                const arr = [...form.curriculum]; arr[mi] = {...arr[mi], title: e.target.value}; set("curriculum", arr);
              }} className={input} />
              <input value={mod.duration} placeholder="Duration (e.g. 3 Weeks)" onChange={e => {
                const arr = [...form.curriculum]; arr[mi] = {...arr[mi], duration: e.target.value}; set("curriculum", arr);
              }} className={input} />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Topics</label>
              {mod.topics.map((t, ti) => (
                <div key={ti} className="flex gap-2 mb-1.5">
                  <input value={t} placeholder={`Topic ${ti + 1}`} onChange={e => {
                    const arr = [...form.curriculum];
                    const topics = [...arr[mi].topics]; topics[ti] = e.target.value;
                    arr[mi] = {...arr[mi], topics}; set("curriculum", arr);
                  }} className={`${input} flex-1`} />
                  <button type="button" onClick={() => {
                    const arr = [...form.curriculum];
                    arr[mi] = {...arr[mi], topics: arr[mi].topics.filter((_, j) => j !== ti)};
                    set("curriculum", arr);
                  }} className="text-red-400 hover:text-red-600"><Trash2 className="w-3 h-3" /></button>
                </div>
              ))}
              <button type="button" onClick={() => {
                const arr = [...form.curriculum];
                arr[mi] = {...arr[mi], topics: [...arr[mi].topics, ""]};
                set("curriculum", arr);
              }} className="text-blue-600 text-xs flex items-center gap-1 hover:underline"><Plus className="w-3 h-3" /> Add Topic</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => set("curriculum", [...form.curriculum, {title: "", topics: [""], duration: ""}])} className="text-blue-600 text-sm flex items-center gap-1 hover:underline"><Plus className="w-4 h-4" /> Add Module</button>
      </div>

      {/* FAQs */}
      <div className={section}>
        <h2 className="font-semibold text-slate-900 text-lg">FAQs</h2>
        {form.faqs.map((faq, fi) => (
          <div key={fi} className="border border-slate-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">FAQ {fi + 1}</h3>
              <button type="button" onClick={() => set("faqs", form.faqs.filter((_, j) => j !== fi))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
            <input value={faq.question} placeholder="Question" onChange={e => {
              const arr = [...form.faqs]; arr[fi] = {...arr[fi], question: e.target.value}; set("faqs", arr);
            }} className={input} />
            <textarea rows={3} value={faq.answer} placeholder="Answer" onChange={e => {
              const arr = [...form.faqs]; arr[fi] = {...arr[fi], answer: e.target.value}; set("faqs", arr);
            }} className={input} />
          </div>
        ))}
        <button type="button" onClick={() => set("faqs", [...form.faqs, {question: "", answer: ""}])} className="text-blue-600 text-sm flex items-center gap-1 hover:underline"><Plus className="w-4 h-4" /> Add FAQ</button>
      </div>

      {/* Instructor */}
      <div className={section}>
        <h2 className="font-semibold text-slate-900 text-lg">Instructor</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Name *</label>
            <input required value={form.instructorName} onChange={e => set("instructorName", e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>Title *</label>
            <input required value={form.instructorTitle} onChange={e => set("instructorTitle", e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>Initials</label>
            <input value={form.instructorInitials} onChange={e => set("instructorInitials", e.target.value)} className={input} maxLength={3} placeholder="AB" />
          </div>
          <div>
            <label className={label}>Avatar Color</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={form.instructorAvatarColor} onChange={e => set("instructorAvatarColor", e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
              <input value={form.instructorAvatarColor} onChange={e => set("instructorAvatarColor", e.target.value)} className={`${input} flex-1`} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Settings */}
      <SeoFields
        seo={{
          metaTitle: form.metaTitle,
          metaDescription: form.metaDescription,
          ogTitle: form.ogTitle,
          ogDescription: form.ogDescription,
          ogImage: form.ogImage,
          twitterTitle: form.twitterTitle,
          twitterDescription: form.twitterDescription,
          twitterImage: form.twitterImage,
          canonicalUrl: form.canonicalUrl,
          robots: form.robots,
          focusKeyword: form.focusKeyword,
        }}
        onChange={setSeo}
        slug={form.slug}
        inputClass={input}
        labelClass={label}
      />

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-8 py-3 rounded-lg transition-colors"
        >
          {loading ? "Saving..." : course ? "Update Course" : "Create Course"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/courses")}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
