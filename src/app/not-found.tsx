import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page Not Found — SkillsBoost " };

export default function NotFound() {
  return (
    <div className="min-h-screen mesh-bg flex flex-col items-center justify-center text-center pt-20 pb-20">
      <div className="section-container max-w-lg">
        <p className="font-display text-8xl font-800 gradient-text mb-4">404</p>
        <h1 className="font-display text-3xl font-700 text-slate-900 mb-4">Page Not Found</h1>
        <p className="text-slate-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/courses" className="btn-outline">Browse Courses</Link>
        </div>
      </div>
    </div>
  );
}
