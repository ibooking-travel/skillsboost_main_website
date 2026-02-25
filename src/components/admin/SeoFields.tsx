"use client";

import { useState } from "react";
import { Search, Eye, ChevronDown, ChevronUp } from "lucide-react";

export interface SeoState {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  canonicalUrl: string;
  robots: string;
  focusKeyword: string;
}

export const defaultSeoState: SeoState = {
  metaTitle: "",
  metaDescription: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  canonicalUrl: "",
  robots: "index, follow",
  focusKeyword: "",
};

interface SeoFieldsProps {
  seo: SeoState;
  onChange: (key: keyof SeoState, value: string) => void;
  siteUrl?: string;
  slug?: string;
  inputClass: string;
  labelClass: string;
}

export default function SeoFields({ seo, onChange, siteUrl = "https://skillsboost.in", slug, inputClass, labelClass }: SeoFieldsProps) {
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const section = "bg-white rounded-xl border border-slate-200 p-6 space-y-4";

  const previewTitle = seo.metaTitle || "Page Title";
  const previewDesc = seo.metaDescription || "Page description will appear here...";
  const previewUrl = seo.canonicalUrl || (slug ? `${siteUrl}/courses/${slug}` : siteUrl);

  const metaTitleLen = seo.metaTitle.length;
  const metaDescLen = seo.metaDescription.length;

  return (
    <div className={section}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-slate-900 text-lg">SEO Settings</h2>
          {seo.metaTitle && (
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">Configured</span>
          )}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </div>

      {open && (
        <div className="space-y-6 pt-2">
          {/* Google Preview */}
          <div>
            <button
              type="button"
              onClick={() => setPreviewOpen((v) => !v)}
              className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-3"
            >
              <Eye className="w-4 h-4" />
              {previewOpen ? "Hide" : "Show"} Google Preview
            </button>
            {previewOpen && (
              <div className="border border-slate-200 rounded-lg p-4 bg-white">
                <p className="text-xs text-slate-400 mb-2">Google Search Preview</p>
                <div className="max-w-xl">
                  <p className="text-xs text-emerald-700 truncate">{previewUrl}</p>
                  <p className="text-blue-700 text-lg font-medium leading-tight mt-1 truncate">
                    {previewTitle.length > 60 ? previewTitle.slice(0, 60) + "..." : previewTitle}
                  </p>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {previewDesc.length > 160 ? previewDesc.slice(0, 160) + "..." : previewDesc}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Core SEO */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-2">Core SEO</h3>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={labelClass}>Meta Title <span className="text-slate-400 font-normal">(recommended: 50-60 chars)</span></label>
                <span className={`text-xs font-medium ${metaTitleLen > 60 ? "text-red-500" : metaTitleLen > 45 ? "text-amber-500" : "text-slate-400"}`}>
                  {metaTitleLen}/60
                </span>
              </div>
              <input
                value={seo.metaTitle}
                onChange={(e) => onChange("metaTitle", e.target.value)}
                className={inputClass}
                placeholder="e.g. Full Stack Development Course — SkillsBoost"
                maxLength={70}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={labelClass}>Meta Description <span className="text-slate-400 font-normal">(recommended: 120-160 chars)</span></label>
                <span className={`text-xs font-medium ${metaDescLen > 160 ? "text-red-500" : metaDescLen > 130 ? "text-amber-500" : "text-slate-400"}`}>
                  {metaDescLen}/160
                </span>
              </div>
              <textarea
                rows={3}
                value={seo.metaDescription}
                onChange={(e) => onChange("metaDescription", e.target.value)}
                className={inputClass}
                placeholder="Brief description of this page for search engines..."
                maxLength={170}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Focus Keyword</label>
                <input
                  value={seo.focusKeyword}
                  onChange={(e) => onChange("focusKeyword", e.target.value)}
                  className={inputClass}
                  placeholder="e.g. full stack development"
                />
              </div>
              <div>
                <label className={labelClass}>Robots</label>
                <select value={seo.robots} onChange={(e) => onChange("robots", e.target.value)} className={inputClass}>
                  <option value="index, follow">index, follow (default)</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Canonical URL</label>
              <input
                value={seo.canonicalUrl}
                onChange={(e) => onChange("canonicalUrl", e.target.value)}
                className={inputClass}
                placeholder={slug ? `${siteUrl}/courses/${slug}` : siteUrl}
                type="url"
              />
              <p className="text-xs text-slate-400 mt-1">Leave empty to auto-generate from page URL</p>
            </div>
          </div>

          {/* Open Graph */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-2">Open Graph (Facebook / LinkedIn)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>OG Title</label>
                <input
                  value={seo.ogTitle}
                  onChange={(e) => onChange("ogTitle", e.target.value)}
                  className={inputClass}
                  placeholder="Defaults to meta title"
                />
              </div>
              <div>
                <label className={labelClass}>OG Image URL</label>
                <input
                  value={seo.ogImage}
                  onChange={(e) => onChange("ogImage", e.target.value)}
                  className={inputClass}
                  placeholder="https://... (1200×630px recommended)"
                  type="url"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>OG Description</label>
              <textarea
                rows={2}
                value={seo.ogDescription}
                onChange={(e) => onChange("ogDescription", e.target.value)}
                className={inputClass}
                placeholder="Defaults to meta description"
              />
            </div>
          </div>

          {/* Twitter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-2">Twitter / X Card</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Twitter Title</label>
                <input
                  value={seo.twitterTitle}
                  onChange={(e) => onChange("twitterTitle", e.target.value)}
                  className={inputClass}
                  placeholder="Defaults to OG title"
                />
              </div>
              <div>
                <label className={labelClass}>Twitter Image URL</label>
                <input
                  value={seo.twitterImage}
                  onChange={(e) => onChange("twitterImage", e.target.value)}
                  className={inputClass}
                  placeholder="https://... (defaults to OG image)"
                  type="url"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Twitter Description</label>
              <textarea
                rows={2}
                value={seo.twitterDescription}
                onChange={(e) => onChange("twitterDescription", e.target.value)}
                className={inputClass}
                placeholder="Defaults to OG description"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
