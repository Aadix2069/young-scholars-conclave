import { APPS_SCRIPT_URL } from "@/lib/appsScript";

type AbstractPayload = {
  paperTitle: string;
  authorNames: string;
  email: string;
  institution: string;
  theme: string;
  abstract: string;
  cvFileName: string;
  cvFileMimeType: string;
  cvFileBase64: string;
};

const REQUIRED_FIELDS: (keyof AbstractPayload)[] = [
  "paperTitle",
  "authorNames",
  "email",
  "institution",
  "theme",
  "abstract",
  "cvFileName",
  "cvFileMimeType",
  "cvFileBase64",
];

const MAX_CV_FILE_SIZE = 5 * 1024 * 1024; // 5MB raw, matches the client-side cap
const PDF_EXTENSION = ".pdf";
const PDF_MIME_TYPE = "application/pdf";
const PDF_MAGIC = "%PDF-";

export async function POST(request: Request) {
  if (!APPS_SCRIPT_URL) {
    return Response.json(
      {
        success: false,
        message:
          "Abstract submission isn't connected yet. Please try again later or contact the organisers directly.",
      },
      { status: 503 }
    );
  }

  let body: AbstractPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !body[field]?.toString().trim());
  if (missing.length > 0) {
    return Response.json(
      { success: false, message: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const cvFileName = String(body.cvFileName).trim();
  if (!cvFileName.toLowerCase().endsWith(PDF_EXTENSION)) {
    return Response.json(
      { success: false, message: "Only PDF files are accepted for the CV." },
      { status: 400 }
    );
  }

  if (body.cvFileMimeType !== PDF_MIME_TYPE) {
    return Response.json(
      { success: false, message: "Only PDF files are accepted for the CV." },
      { status: 400 }
    );
  }

  if (!body.cvFileBase64.trim()) {
    return Response.json(
      { success: false, message: "The CV file appears to be empty." },
      { status: 400 }
    );
  }

  // base64 encodes 3 bytes as 4 chars, so decoded size ~= length * 0.75
  const approxDecodedSize = (body.cvFileBase64.length * 3) / 4;
  if (approxDecodedSize > MAX_CV_FILE_SIZE) {
    return Response.json(
      { success: false, message: "The CV must be 5MB or smaller." },
      { status: 400 }
    );
  }

  // Every PDF begins with the `%PDF-` header; decoding just the first base64
  // group rejects renamed executables and truncated/corrupt files without
  // buffering the whole payload in memory.
  const prefix = Buffer.from(body.cvFileBase64.slice(0, 12), "base64").toString("latin1");
  if (!prefix.startsWith(PDF_MAGIC)) {
    return Response.json(
      { success: false, message: "The uploaded file does not appear to be a valid PDF." },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType: "abstract", ...body }),
      redirect: "follow",
    });

    const text = await upstream.text();

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      console.error("Google Apps Script did not return valid JSON. Received:", text.slice(0, 300));
      return Response.json(
        { success: false, message: "Received invalid response format from Google Apps Script." },
        { status: 502 }
      );
    }

    return Response.json(result, { status: result.success ? 200 : 400 });
  } catch (err) {
    console.error("Apps Script Fetch Error:", err);
    return Response.json(
      { success: false, message: "Couldn't reach the submission server. Please try again." },
      { status: 502 }
    );
  }
}
