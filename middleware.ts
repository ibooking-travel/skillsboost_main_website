import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "./src/lib/auth";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Protect all /admin routes except /admin/login and /admin (redirect)
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    pathname !== "/admin"
  ) {
    const admin = await getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
