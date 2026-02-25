import { getAllPageSEO } from "@/lib/db";
import PageSeoManager from "@/components/admin/PageSeoManager";

const STATIC_PAGES = [
  { pageName: "home", label: "Home Page", path: "/" },
  { pageName: "courses", label: "Courses Listing", path: "/courses" },
  { pageName: "about", label: "About Page", path: "/about" },
  { pageName: "contact", label: "Contact Page", path: "/contact" },
  { pageName: "privacy", label: "Privacy Policy", path: "/privacy-policy" },
  { pageName: "terms", label: "Terms & Conditions", path: "/terms-conditions" },
];

export default async function PageSeoPage() {
  const allPageSEO = await getAllPageSEO();
  const seoMap = Object.fromEntries(allPageSEO.map((p) => [p.pageName, p]));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Page SEO</h1>
        <p className="text-slate-500 text-sm mt-1">
          Configure SEO metadata for each static page. Overrides global defaults.
        </p>
      </div>
      <PageSeoManager pages={STATIC_PAGES} seoMap={seoMap} />
    </div>
  );
}
