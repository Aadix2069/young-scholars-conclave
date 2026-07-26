import { cookies } from "next/headers";
import { ARCHIVE_SESSION_COOKIE } from "@/lib/archiveSession";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(ARCHIVE_SESSION_COOKIE);
  return Response.json({ success: true });
}
