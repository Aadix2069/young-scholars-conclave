import { parseCsv } from "@/lib/csv";

/**
 * Reads a year's Registration/Abstract/Paper submission data for the
 * archive, the same way the site's "List of Scholars" section already
 * reads its Sheet: each tab is published to the web as CSV (Sheet -> File
 * -> Share -> Publish to web -> select the tab -> CSV -> Publish), and
 * the site fetches that public CSV URL. No Google Cloud project, no
 * service account, no credentials - just a link, same as everywhere
 * else on this site that pulls from a Sheet.
 *
 * Expected first row of each CSV = headers (whatever columns Code.gs
 * currently writes for that sheet), everything else = data rows.
 */

export type SheetTable = {
  headers: string[];
  rows: string[][];
};

const EMPTY_TABLE: SheetTable = { headers: [], rows: [] };

async function fetchTable(csvUrl: string | undefined): Promise<SheetTable> {
  if (!csvUrl) return EMPTY_TABLE;

  const res = await fetch(csvUrl, { next: { revalidate: 300 } });
  if (!res.ok) return EMPTY_TABLE;

  const rows = parseCsv(await res.text());
  if (rows.length === 0) return EMPTY_TABLE;

  const [headers, ...dataRows] = rows;
  return { headers, rows: dataRows };
}

export type YearCsvUrls = {
  registrations?: string;
  abstracts?: string;
  papers?: string;
};

export type YearSubmissions = {
  registrations: SheetTable;
  abstracts: SheetTable;
  papers: SheetTable;
};

export async function getYearSubmissions(urls: YearCsvUrls): Promise<YearSubmissions> {
  const [registrations, abstracts, papers] = await Promise.all([
    fetchTable(urls.registrations),
    fetchTable(urls.abstracts),
    fetchTable(urls.papers),
  ]);
  return { registrations, abstracts, papers };
}
