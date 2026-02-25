import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";
import { siteSettingsSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await prisma.siteSettings.findFirst();
  return NextResponse.json(settings || {});
}

export async function PUT(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = siteSettingsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const existing = await prisma.siteSettings.findFirst();
    let settings;
    if (existing) {
      settings = await prisma.siteSettings.update({ where: { id: existing.id }, data: parsed.data });
    } else {
      settings = await prisma.siteSettings.create({ data: parsed.data });
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error("[SITE_SETTINGS PUT]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
