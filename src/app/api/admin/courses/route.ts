import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";
import { courseSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = courseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    // Validate: if published and robots=index,follow, require metaTitle
    if (parsed.data.isPublished && parsed.data.robots === "index, follow" && !parsed.data.metaTitle) {
      return NextResponse.json({ error: "Meta title is required before publishing an indexed page" }, { status: 400 });
    }

    // Check unique slug
    const existing = await prisma.course.findUnique({ where: { slug: parsed.data.slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const category = await prisma.category.findUnique({ where: { id: parsed.data.categoryId } });
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 400 });
    }

    // Trim SEO fields
    const data = {
      ...parsed.data,
      metaTitle: parsed.data.metaTitle?.trim() || null,
      metaDescription: parsed.data.metaDescription?.trim() || null,
      ogTitle: parsed.data.ogTitle?.trim() || null,
      ogDescription: parsed.data.ogDescription?.trim() || null,
      twitterTitle: parsed.data.twitterTitle?.trim() || null,
      twitterDescription: parsed.data.twitterDescription?.trim() || null,
      ogImage: parsed.data.ogImage?.trim() || null,
      twitterImage: parsed.data.twitterImage?.trim() || null,
      canonicalUrl: parsed.data.canonicalUrl?.trim() || null,
      focusKeyword: parsed.data.focusKeyword?.trim() || null,
    };

    const course = await prisma.course.create({ data });
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("[COURSES POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
