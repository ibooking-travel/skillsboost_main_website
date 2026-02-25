# SkillsBoost — Dynamic SEO Management System

## What Was Added

### 1. Database (Prisma Schema)

**Course model** — Extended with SEO fields:
- `metaTitle`, `metaDescription` — Core meta tags
- `ogTitle`, `ogDescription`, `ogImage` — Open Graph
- `twitterTitle`, `twitterDescription`, `twitterImage` — Twitter Cards
- `canonicalUrl` — Canonical URL (prevents duplicate content)
- `robots` — Indexing control (`index, follow` / `noindex, follow` / `noindex, nofollow`)
- `focusKeyword` — Target keyword tracking

**SiteSettings model** (new) — Global site configuration:
- Site name, URL, default title/description, OG image
- Contact info (phone, email, address) → powers LocalBusiness schema
- Geo coordinates (latitude, longitude)
- Social links (sameAs in Organization schema)
- Google verification code
- Theme color

**PageSEO model** (new) — Per static-page SEO:
- Covers: home, about, contact, courses, privacy, terms
- All standard SEO fields

### 2. Admin Panel Pages

| Path | Purpose |
|------|---------|
| `/admin/seo` | SEO health overview — missing tags, noindex pages |
| `/admin/site-settings` | Global SEO & Organization/LocalBusiness schema |
| `/admin/page-seo` | Static page SEO editor |
| `/admin/courses/[id]/edit` | Course SEO section (within existing form) |

### 3. SEO Features

**Live Google Preview** — See how your page appears in search results as you type

**Character Counters** — Color-coded limits for meta title (60 chars) and meta description (160 chars)

**Robots Control** — Dropdown to set index/noindex per page

**Fallback Chain** — If a field is empty, falls back to:
1. Page-level SEO from DB
2. Global site defaults from SiteSettings
3. Hardcoded defaults

### 4. Structured Data (JSON-LD)

| Schema | Where |
|--------|-------|
| Organization | Every page (from SiteSettings) |
| LocalBusiness | Added to Organization if address exists |
| Course | Each course detail page |
| FAQPage | Course pages with FAQs |
| BreadcrumbList | Course detail pages |

### 5. Sitemap & Robots

- **Sitemap** — Dynamically generated from DB; excludes noindex/draft content
- **Robots.txt** — Generated from SiteSettings.siteUrl; blocks `/api/` and `/admin/`

### 6. Validation

- Published + indexed courses require a meta title
- Duplicate slugs blocked at API level
- SEO fields auto-trimmed before save
- Character limits enforced on frontend and backend

---

## Setup

### 1. Update database

```bash
npx prisma db push
npx prisma generate
npx ts-node prisma/seed.ts
```

### 2. Environment variables

```env
DATABASE_URL=mongodb+srv://...
ADMIN_EMAIL=admin@skillsboost.in
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-jwt-secret
```

### 3. Run

```bash
npm run dev
```

### 4. Configure SEO

1. Go to `/admin/site-settings` — Set site name, URL, contact info
2. Go to `/admin/page-seo` — Set SEO for each static page
3. Edit each course → scroll to "SEO Settings" section

---

## Files Changed / Added

### New Files
- `src/lib/seo.ts` — SEO utility functions & schema generators
- `src/components/admin/SeoFields.tsx` — Reusable SEO form component
- `src/components/admin/SiteSettingsForm.tsx` — Site settings form
- `src/components/admin/PageSeoManager.tsx` — Page-level SEO manager
- `src/app/admin/(protected)/seo/page.tsx` — SEO overview dashboard
- `src/app/admin/(protected)/site-settings/page.tsx` — Site settings page
- `src/app/admin/(protected)/page-seo/page.tsx` — Page SEO admin page
- `src/app/api/admin/site-settings/route.ts` — API: GET/PUT site settings
- `src/app/api/admin/page-seo/route.ts` — API: GET all page SEOs
- `src/app/api/admin/page-seo/[pageName]/route.ts` — API: GET/PUT page SEO

### Modified Files
- `prisma/schema.prisma` — Added SEO fields + SiteSettings + PageSEO models
- `prisma/seed.ts` — Seeds default SiteSettings and PageSEO
- `src/lib/db.ts` — Added getSiteSettings, getPageSEO, upsert helpers
- `src/lib/validations.ts` — Added SEO schemas
- `src/types/index.ts` — Added SEO fields to Course type
- `src/app/layout.tsx` — Dynamic metadata + Organization schema injection
- `src/app/page.tsx` — Dynamic page metadata
- `src/app/about/page.tsx` — Dynamic page metadata
- `src/app/contact/page.tsx` — Dynamic page metadata
- `src/app/courses/page.tsx` — Dynamic page metadata
- `src/app/courses/[slug]/page.tsx` — Full dynamic SEO + all schemas
- `src/app/privacy-policy/page.tsx` — Dynamic page metadata
- `src/app/terms-conditions/page.tsx` — Dynamic page metadata
- `src/app/sitemap.ts` — DB-driven, respects noindex/draft exclusions
- `src/app/robots.ts` — Dynamic from SiteSettings
- `src/components/admin/AdminSidebar.tsx` — Added SEO nav items
- `src/components/admin/CourseForm.tsx` — Integrated SEO section
- `src/app/api/admin/courses/route.ts` — SEO field handling + validation
- `src/app/api/admin/courses/[id]/route.ts` — SEO field handling + validation
