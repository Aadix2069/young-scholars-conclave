import { APPS_SCRIPT_URL } from "@/lib/appsScript";

type PaperPayload = {
  paperTitle: string;
  correspondingAuthor: string;
  coAuthors?: string;
  institution: string;
  department: string;
  email: string;
  phone: string;
  researchDomain: string;
  keywords: string;
  additionalRemarks?: string;
  declaration: string;
  fileName: string;
  fileMimeType: string;
  fileBase64: string;
};

const REQUIRED_FIELDS: (keyof PaperPayload)[] = [
  "paperTitle",
  "correspondingAuthor",
  "institution",
  "department",
  "email",
  "phone",
  "researchDomain",
  "keywords",
  "declaration",
  "fileName",
  "fileMimeType",
  "fileBase64",
];

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB raw, matches client-side cap
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  if (!APPS_SCRIPT_URL) {
    return Response.json(
      {
        success: false,
        message:
          "Full paper submission isn't connected yet. Please try again later or contact the organisers directly.",
      },
      { status: 503 }
    );
  }

  let body: PaperPayload;
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

  const hasValidExtension = ACCEPTED_EXTENSIONS.some((ext) =>
    body.fileName.toLowerCase().endsWith(ext)
  );
  if (!hasValidExtension || !ACCEPTED_MIME_TYPES.includes(body.fileMimeType)) {
    return Response.json(
      { success: false, message: "Only PDF, DOC, or DOCX files are accepted." },
      { status: 400 }
    );
  }

  // base64 encodes 3 bytes as 4 chars, so decoded size ~= length * 0.75
  const approxDecodedSize = (body.fileBase64.length * 3) / 4;
  if (approxDecodedSize > MAX_FILE_SIZE) {
    return Response.json(
      { success: false, message: "File must be under 3MB." },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType: "paper", ...body }),
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
