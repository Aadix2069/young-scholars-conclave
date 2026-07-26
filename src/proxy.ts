import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ARCHIVE_SESSION_COOKIE, verifySessionToken } from "@/lib/archiveSession";

/**
 * Gates every /archive route behind the session cookie set by
 * /api/archive-login. Runs before the page renders, so an unauthenticated
 * visitor never sees archive content flash before redirecting.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/archive/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ARCHIVE_SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    const loginUrl = new URL("/archive/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/archive/:path*",
};
