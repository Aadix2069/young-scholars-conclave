import { cookies } from "next/headers";
import { ARCHIVE_PASSWORD, ARCHIVE_SESSION_COOKIE, createSessionToken } from "@/lib/archiveSession";

export async function POST(request: Request) {
  if (!ARCHIVE_PASSWORD) {
    return Response.json(
      { success: false, message: "Archive access hasn't been configured yet." },
      { status: 503 }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  if (body.password !== ARCHIVE_PASSWORD) {
    return Response.json({ success: false, message: "Incorrect password." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ARCHIVE_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    // Only require HTTPS in production - localhost dev serves plain HTTP,
    // and a `secure` cookie is silently dropped there.
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 12 * 60 * 60,
  });

  return Response.json({ success: true, message: "Signed in." });
}
