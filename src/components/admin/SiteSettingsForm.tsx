"use client";

import { useState } from "react";
import { SiteSettings } from "@prisma/client";

interface Props {
  settings: SiteSettings | null;
}

type FormState = {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  twitterUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  googleVerificationCode: string;
  themeColor: string;
};

function initForm(s: SiteSettings | null): FormState {
  const social = (s?.socialLinks as Record<string, string>) || {};
  return {
    siteName: s?.siteName || "SkillsBoost",
    siteUrl: s?.siteUrl || "https://skillsboost.in",
    defaultTitle: s?.defaultTitle || "Skills Boost — Learn Digital, Earn Digital",
    defaultDescription: s?.defaultDescription || "Master in-demand tech skills with Skills Boost.",
    defaultOgImage: s?.defaultOgImage || "",
    logo: s?.logo || "",
    phone: s?.phone || "",
    email: s?.email || "",
    address: s?.address || "",
    city: s?.city || "",
    state: s?.state || "",
    country: s?.country || "IN",
    postalCode: s?.postalCode || "",
    latitude: s?.latitude?.toString() || "",
    longitude: s?.longitude?.toString() || "",
    twitterUrl: social.twitter || "",
    facebookUrl: social.facebook || "",
    linkedinUrl: social.linkedin || "",
    instagramUrl: social.instagram || "",
    youtubeUrl: social.youtube || "",
    googleVerificationCode: s?.googleVerificationCode || "",
    themeColor: s?.themeColor || "#2563eb",
  };
}

export default function SiteSettingsForm({ settings }: Props) {
  const [form, setForm] = useState<FormState>(initForm(settings));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const set = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const payload = {
      siteName: form.siteName,
      siteUrl: form.siteUrl,
      defaultTitle: form.defaultTitle,
      defaultDescription: form.defaultDescription,
      defaultOgImage: form.defaultOgImage || undefined,
      logo: form.logo || undefined,
      phone: form.phone || undefined,
      email: form.email || undefined,
      address: form.address || undefined,
      city: form.city || undefined,
      state: form.state || undefined,
      country: form.country || undefined,
      postalCode: form.postalCode || undefined,
      latitude: form.latitude ? parseFloat(form.latitude) : undefined,
      longitude: form.longitude ? parseFloat(form.longitude) : undefined,
      socialLinks: {
        ...(form.twitterUrl ? { twitter: form.twitterUrl } : {}),
        ...(form.facebookUrl ? { facebook: form.facebookUrl } : {}),
        ...(form.linkedinUrl ? { linkedin: form.linkedinUrl } : {}),
        ...(form.instagramUrl ? { instagram: form.instagramUrl } : {}),
        ...(form.youtubeUrl ? { youtube: form.youtubeUrl } : {}),
      },
      googleVerificationCode: form.googleVerificationCode || undefined,
      themeColor: form.themeColor,
    };

    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setMessage("Settings saved successfully!");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const input = "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const label = "block text-sm font-medium text-slate-700 mb-1.5";
  const section = "bg-white rounded-xl border border-slate-200 p-6 space-y-4";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {message && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{message}</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

      {/* Basic */}
      <div className={section}>
        <h2 className="font-semibold text-slate-900 text-lg">Basic Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Site Name *</label>
            <input required value={form.siteName} onChange={e => set("siteName", e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>Site URL *</label>
            <input required value={form.siteUrl} onChange={e => set("siteUrl", e.target.value)} className={input} placeholder="https://skillsboost.in" />
          </div>
          <div className="col-span-2">
            <label className={label}>Default Title *</label>
            <input required value={form.defaultTitle} onChange={e => set("defaultTitle", e.target.value)} className={input} />
            <p className="text-xs text-slate-400 mt-1">{form.defaultTitle.length}/100 chars — Used when no page-specific title is set</p>
          </div>
          <div className="col-span-2">
            <label className={label}>Default Description *</label>
            <textarea rows={3} required value={form.defaultDescription} onChange={e => set("defaultDescription", e.target.value)} className={input} />
            <p className="text-xs text-slate-400 mt-1">{form.defaultDescription.length}/300 chars</p>
          </div>
          <div>
            <label className={label}>Default OG Image URL</label>
            <input value={form.defaultOgImage} onChange={e => set("defaultOgImage", e.target.value)} className={input} placeholder="https://.../og-image.png" />
          </div>
          <div>
            <label className={label}>Logo URL</label>
            <input value={form.logo} onChange={e => set("logo", e.target.value)} className={input} placeholder="/img/logo.png" />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className={section}>
        <h2 className="font-semibold text-slate-900 text-lg">Contact & Address <span className="text-sm font-normal text-slate-500">(powers LocalBusiness schema)</span></h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Phone</label>
            <input value={form.phone} onChange={e => set("phone", e.target.value)} className={input} placeholder="+91 9650249028" />
          </div>
          <div>
            <label className={label}>Email</label>
            <input type="email" value={form.email} onChange={e => set("email", e.target.value)} className={input} placeholder="info@skillsboost.in" />
          </div>
          <div className="col-span-2">
            <label className={label}>Street Address</label>
            <input value={form.address} onChange={e => set("address", e.target.value)} className={input} placeholder="NM22, 2nd Floor, M Block Old DLF Colony" />
          </div>
          <div>
            <label className={label}>City</label>
            <input value={form.city} onChange={e => set("city", e.target.value)} className={input} placeholder="Gurugram" />
          </div>
          <div>
            <label className={label}>State</label>
            <input value={form.state} onChange={e => set("state", e.target.value)} className={input} placeholder="Haryana" />
          </div>
          <div>
            <label className={label}>Country</label>
            <input value={form.country} onChange={e => set("country", e.target.value)} className={input} placeholder="IN" />
          </div>
          <div>
            <label className={label}>Postal Code</label>
            <input value={form.postalCode} onChange={e => set("postalCode", e.target.value)} className={input} placeholder="122007" />
          </div>
          <div>
            <label className={label}>Latitude</label>
            <input type="number" step="any" value={form.latitude} onChange={e => set("latitude", e.target.value)} className={input} placeholder="28.4595" />
          </div>
          <div>
            <label className={label}>Longitude</label>
            <input type="number" step="any" value={form.longitude} onChange={e => set("longitude", e.target.value)} className={input} placeholder="77.0266" />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className={section}>
        <h2 className="font-semibold text-slate-900 text-lg">Social Links <span className="text-sm font-normal text-slate-500">(used in Organization schema sameAs)</span></h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: "twitterUrl" as keyof FormState, label: "Twitter / X" },
            { key: "facebookUrl" as keyof FormState, label: "Facebook" },
            { key: "linkedinUrl" as keyof FormState, label: "LinkedIn" },
            { key: "instagramUrl" as keyof FormState, label: "Instagram" },
            { key: "youtubeUrl" as keyof FormState, label: "YouTube" },
          ].map(({ key, label: lbl }) => (
            <div key={key}>
              <label className={label}>{lbl}</label>
              <input value={form[key]} onChange={e => set(key, e.target.value)} className={input} placeholder="https://..." />
            </div>
          ))}
        </div>
      </div>

      {/* SEO & Verification */}
      <div className={section}>
        <h2 className="font-semibold text-slate-900 text-lg">SEO & Verification</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Google Verification Code</label>
            <input value={form.googleVerificationCode} onChange={e => set("googleVerificationCode", e.target.value)} className={input} placeholder="google-site-verification code" />
            <p className="text-xs text-slate-400 mt-1">Meta name=&quot;google-site-verification&quot; content value</p>
          </div>
          <div>
            <label className={label}>Theme Color</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={form.themeColor} onChange={e => set("themeColor", e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
              <input value={form.themeColor} onChange={e => set("themeColor", e.target.value)} className={`${input} flex-1`} />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-8 py-3 rounded-lg transition-colors"
      >
        {saving ? "Saving..." : "Save Site Settings"}
      </button>
    </form>
  );
}
