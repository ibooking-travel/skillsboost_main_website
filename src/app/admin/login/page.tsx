import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin Login — SkillsBoost",
};

export default async function AdminLoginPage() {
  const admin = await getAdminFromCookies();
  if (admin) redirect("/admin/dashboard");

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">SkillsBoost Admin</h1>
          <p className="text-slate-400">Sign in to manage your platform</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
