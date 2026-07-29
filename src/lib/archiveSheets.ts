import { JWT } from "google-auth-library";

/**
 * Server-only read access to the Registrations / Abstract Submissions /
 * Paper Submissions tabs of a given year's Google Sheet, via a service
 * account (not a publish-to-web CSV link) - this data contains real
 * names, emails, and phone numbers, so access is controlled by Google
 * Sheets sharing permissions, not by an obscure URL. Only imported by
 * server components under src/app/archive/.
 *
 * Setup: see docs/archive-service-account-setup.md.
 */

export type SheetTable = {
  headers: string[];
  rows: string[][];
};

export type YearSubmissions = {
  registrations: SheetTable;
  abstracts: SheetTable;
  papers: SheetTable;
};

export class ArchiveSheetsError extends Error {}

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

/**
 * Sheet tab names, matching exactly what Code.gs creates via
 * getOrCreateSheet() - see google-apps-script/Code.gs.
 */
const RANGES = ["Registrations", "Abstract Submissions", "Paper Submissions"];

function getCredentials(): { email: string; key: string } | null {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "";
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "";
  if (!email || !rawKey) return null;
  // Private keys are stored with literal \n sequences in the env var
  // (multi-line PEM values don't survive most env var input fields
  // intact) and unescaped here.
  return { email, key: rawKey.replace(/\\n/g, "\n") };
}

export function isArchiveSheetsConfigured(): boolean {
  return getCredentials() !== null;
}

let cachedClient: JWT | null = null;

function getClient(): JWT {
  if (cachedClient) return cachedClient;
  const credentials = getCredentials();
  if (!credentials) {
    throw new ArchiveSheetsError("Google service account credentials are not configured.");
  }
  cachedClient = new JWT({
    email: credentials.email,
    key: credentials.key,
    scopes: SCOPES,
  });
  return cachedClient;
}

function toTable(values: string[][]): SheetTable {
  if (values.length === 0) return { headers: [], rows: [] };
  const [headers, ...rows] = values;
  return { headers, rows };
}

/**
 * Fetches all three sheet tabs for the given spreadsheet in one batched
 * request. Returns null if credentials aren't configured yet (the page
 * shows a "not connected" state rather than crashing). Throws
 * ArchiveSheetsError for any other failure - wrong ID, sheet not shared
 * with the service account, API/quota error - so the page can show the
 * specific reason (this is an admin-only page, unlike the public forms
 * which get generic error text).
 */
export async function getYearSubmissions(spreadsheetId: string): Promise<YearSubmissions | null> {
  if (!isArchiveSheetsConfigured()) return null;

  const client = getClient();
  const params = new URLSearchParams();
  RANGES.forEach((range) => params.append("ranges", range));

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?${params.toString()}`;

  let valueRanges: { values?: string[][] }[];
  try {
    const response = await client.request<{ valueRanges: { values?: string[][] }[] }>({ url });
    valueRanges = response.data.valueRanges;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    throw new ArchiveSheetsError(`Couldn't read the spreadsheet: ${message}`);
  }

  const [registrationValues, abstractValues, paperValues] = valueRanges.map((r) => r.values ?? []);

  return {
    registrations: toTable(registrationValues),
    abstracts: toTable(abstractValues),
    papers: toTable(paperValues),
  };
}
