import { createHmac, timingSafeEqual } from "crypto";

/**
 * Password for the Conference Archive, set only by the designated
 * administrator via the ARCHIVE_PASSWORD environment variable (Vercel
 * dashboard in production, .env.local for development). Never hardcoded.
 */
export const ARCHIVE_PASSWORD = process.env.ARCHIVE_PASSWORD ?? "";

export const ARCHIVE_SESSION_COOKIE = "archive_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

/**
 * Stateless signed session token: `${expiryTimestamp}.${hmacSignature}`.
 * No server-side session store needed - the signature (keyed on the
 * archive password itself, since this protects a single-administrator
 * area rather than multiple user accounts) proves the token wasn't
 * forged, and the embedded expiry makes it self-limiting.
 */
function sign(payload: string): string {
  return createHmac("sha256", ARCHIVE_PASSWORD).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const expiry = String(Date.now() + SESSION_TTL_MS);
  return `${expiry}.${sign(expiry)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !ARCHIVE_PASSWORD) return false;
  const [expiry, signature] = token.split(".");
  if (!expiry || !signature) return false;
  if (Date.now() > Number(expiry)) return false;

  const expected = sign(expiry);
  const expectedBuf = Buffer.from(expected);
  const actualBuf = Buffer.from(signature);
  if (expectedBuf.length !== actualBuf.length) return false;
  return timingSafeEqual(expectedBuf, actualBuf);
}
