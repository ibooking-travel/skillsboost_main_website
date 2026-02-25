"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Plus, Check, X, ChevronUp, ChevronDown } from "lucide-react";
import { Category } from "@prisma/client";

type CategoryWithCount = Category & { _count: { courses: number } };

interface CategoryManagerProps {
  initialCategories: CategoryWithCount[];
}

const emptyForm = { name: "", slug: "", description: "", icon: "", order: 0, isActive: true };

export default function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const router = useRouter();
  const [categories] = useState(initialCategories);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setShowAdd(false);
      setForm(emptyForm);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: string) => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setEditId(null);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) { alert(data.error); return; }
    router.refresh();
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await fetch(`/api/admin/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    router.refresh();
  };

  const changeOrder = async (id: string, direction: "up" | "down") => {
    const idx = categories.findIndex((c) => c.id === id);
    const newOrder = direction === "up" ? categories[idx].order - 1 : categories[idx].order + 1;
    await fetch(`/api/admin/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: newOrder }),
    });
    router.refresh();
  };

  const startEdit = (cat: CategoryWithCount) => {
    setEditId(cat.id);
    setEditForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      icon: cat.icon || "",
      order: cat.order,
      isActive: cat.isActive,
    });
  };

  const inputClass = "w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      <button
        onClick={() => setShowAdd(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Category
      </button>

      {/* Add form */}
      {showAdd && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">New Category</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Name *</label>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Slug *</label>
              <input required value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className={inputClass} placeholder="e.g. data-ai" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Icon (emoji)</label>
              <input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className={inputClass} placeholder="💻" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Order</label>
              <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)})} className={inputClass} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
              <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={inputClass} />
            </div>
            <div className="col-span-2 flex gap-2">
              <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1">
                <Check className="w-4 h-4" /> Save
              </button>
              <button type="button" onClick={() => setShowAdd(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1">
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories list */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100 bg-slate-50">
              <th className="text-left px-6 py-4">Category</th>
              <th className="text-left px-6 py-4">Courses</th>
              <th className="text-left px-6 py-4">Order</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                {editId === cat.id ? (
                  <td colSpan={5} className="px-6 py-4">
                    <div className="grid grid-cols-5 gap-3 items-end">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Name</label>
                        <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Slug</label>
                        <input value={editForm.slug} onChange={e => setEditForm({...editForm, slug: e.target.value})} className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Icon</label>
                        <input value={editForm.icon} onChange={e => setEditForm({...editForm, icon: e.target.value})} className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Order</label>
                        <input type="number" value={editForm.order} onChange={e => setEditForm({...editForm, order: parseInt(e.target.value)})} className={inputClass} />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(cat.id)} disabled={loading} className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs flex items-center gap-1">
                          <Check className="w-3 h-3" /> Save
                        </button>
                        <button onClick={() => setEditId(null)} className="bg-slate-100 text-slate-600 px-3 py-2 rounded-lg text-xs flex items-center gap-1">
                          <X className="w-3 h-3" /> Cancel
                        </button>
                      </div>
                    </div>
                  </td>
                ) : (
                  <>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{cat.icon}</span>
                        <div>
                          <p className="font-medium text-slate-900">{cat.name}</p>
                          <p className="text-xs text-slate-400">/{cat.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{cat._count.courses}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-slate-600">{cat.order}</span>
                        <div className="flex flex-col">
                          <button onClick={() => changeOrder(cat.id, "up")} className="text-slate-400 hover:text-slate-700"><ChevronUp className="w-3 h-3" /></button>
                          <button onClick={() => changeOrder(cat.id, "down")} className="text-slate-400 hover:text-slate-700"><ChevronDown className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleActive(cat.id, cat.isActive)} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer ${cat.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                        {cat.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => startEdit(cat)} className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
