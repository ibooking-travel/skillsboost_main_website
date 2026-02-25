import { getSiteSettings } from "@/lib/db";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";

export default async function SiteSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
        <p className="text-slate-500 text-sm mt-1">
          Configure global SEO defaults, Organization schema, LocalBusiness schema, and site metadata.
        </p>
      </div>
      <SiteSettingsForm settings={settings} />
    </div>
  );
}
