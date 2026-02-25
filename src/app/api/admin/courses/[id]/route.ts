import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";
import { courseSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(course);
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = courseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    // Validate: if published and indexable, require metaTitle
    if (parsed.data.isPublished && parsed.data.robots === "index, follow" && !parsed.data.metaTitle) {
      return NextResponse.json({ error: "Meta title is required before publishing an indexed page" }, { status: 400 });
    }

    // Check slug uniqueness (excluding current)
    const existing = await prisma.course.findFirst({
      where: { slug: parsed.data.slug, NOT: { id } },
    });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

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

    const course = await prisma.course.update({ where: { id }, data });
    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE PUT]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const course = await prisma.course.update({ where: { id }, data: body });
    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE PATCH]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.course.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[COURSE DELETE]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
