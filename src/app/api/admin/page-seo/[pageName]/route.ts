import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";
import { pageSeoSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ pageName: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { pageName } = await params;
  const seo = await prisma.pageSEO.findUnique({ where: { pageName } });
  return NextResponse.json(seo || { pageName });
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { pageName } = await params;
    const body = await req.json();
    const parsed = pageSeoSchema.safeParse({ ...body, pageName });
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const seo = await prisma.pageSEO.upsert({
      where: { pageName },
      update: parsed.data,
      create: parsed.data,
    });
    return NextResponse.json(seo);
  } catch (error) {
    console.error("[PAGE_SEO PUT]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
