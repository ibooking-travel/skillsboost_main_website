"use client";

import { useState } from "react";
import { PageSEO } from "@prisma/client";
import SeoFields, { SeoState, defaultSeoState } from "./SeoFields";
import { ChevronDown, ChevronUp, Save, CheckCircle2 } from "lucide-react";

interface PageDef {
  pageName: string;
  label: string;
  path: string;
}

interface Props {
  pages: PageDef[];
  seoMap: Record<string, PageSEO>;
}

function toSeoState(seo: PageSEO | undefined): SeoState {
  if (!seo) return defaultSeoState;
  return {
    metaTitle: seo.metaTitle || "",
    metaDescription: seo.metaDescription || "",
    ogTitle: seo.ogTitle || "",
    ogDescription: seo.ogDescription || "",
    ogImage: seo.ogImage || "",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    canonicalUrl: seo.canonicalUrl || "",
    robots: seo.robots || "index, follow",
    focusKeyword: seo.focusKeyword || "",
  };
}

export default function PageSeoManager({ pages, seoMap }: Props) {
  const [states, setStates] = useState<Record<string, SeoState>>(
    Object.fromEntries(pages.map((p) => [p.pageName, toSeoState(seoMap[p.pageName])]))
  );
  const [openPage, setOpenPage] = useState<string | null>(pages[0]?.pageName || null);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setSeoField = (pageName: string, key: keyof SeoState, value: string) => {
    setStates((prev) => ({ ...prev, [pageName]: { ...prev[pageName], [key]: value } }));
  };

  const handleSave = async (pageName: string) => {
    setSaving(pageName);
    setErrors((prev) => ({ ...prev, [pageName]: "" }));
    try {
      const res = await fetch(`/api/admin/page-seo/${pageName}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(states[pageName]),
      });
      const data = await res.json();
      if (!res.ok) { setErrors((prev) => ({ ...prev, [pageName]: data.error })); return; }
      setSaved(pageName);
      setTimeout(() => setSaved(null), 3000);
    } catch {
      setErrors((prev) => ({ ...prev, [pageName]: "Network error" }));
    } finally {
      setSaving(null);
    }
  };

  const input = "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelCls = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <div className="space-y-3">
      {pages.map((page) => {
        const isOpen = openPage === page.pageName;
        const seo = states[page.pageName];
        const hasData = !!(seo.metaTitle || seo.metaDescription);

        return (
          <div key={page.pageName} className="bg-white rounded-xl border border-slate-200">
            <div
              className="flex items-center justify-between p-5 cursor-pointer"
              onClick={() => setOpenPage(isOpen ? null : page.pageName)}
            >
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-slate-900">{page.label}</h3>
                <span className="text-xs text-slate-400 font-mono">{page.path}</span>
                {hasData && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">Configured</span>
                )}
              </div>
              {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>

            {isOpen && (
              <div className="px-5 pb-5 space-y-4 border-t border-slate-100 pt-4">
                {errors[page.pageName] && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{errors[page.pageName]}</div>
                )}
                <SeoFields
                  seo={seo}
                  onChange={(key, value) => setSeoField(page.pageName, key, value)}
                  inputClass={input}
                  labelClass={labelCls}
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={saving === page.pageName}
                    onClick={() => handleSave(page.pageName)}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {saving === page.pageName ? "Saving..." : "Save"}
                  </button>
                  {saved === page.pageName && (
                    <span className="text-green-600 text-sm flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Saved!
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
