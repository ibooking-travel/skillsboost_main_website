import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import PageLoader from "@/components/layout/PageLoader";
import { getSiteSettings } from "@/lib/db";
import { generateOrganizationSchema } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  let settings;
  try {
    settings = await getSiteSettings();
  } catch (error) {
    console.warn("Could not fetch site settings during build:", error);
    settings = null;
  }
  const siteUrl = settings?.siteUrl || "https://skillsboost.in";
  const siteName = settings?.siteName || "SkillsBoost";
  const defaultTitle = settings?.defaultTitle || "Skills Boost — Learn Digital, Earn Digital";
  const defaultDescription = settings?.defaultDescription || "Master in-demand tech skills with Skills Boost.";
  const defaultOgImage = settings?.defaultOgImage || "/og-image.png";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    authors: [{ name: siteName }],
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: siteUrl,
      siteName,
      title: defaultTitle,
      description: defaultDescription,
      images: [{ url: defaultOgImage, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      images: [defaultOgImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
    ...(settings?.googleVerificationCode ? { verification: { google: settings.googleVerificationCode } } : {}),
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = await generateOrganizationSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {orgSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
          />
        )}
      </head>
      <body className="antialiased">
        <PageLoader />
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
