import { APPS_SCRIPT_URL } from "@/lib/appsScript";

type AbstractPayload = {
  paperTitle: string;
  authorNames: string;
  email: string;
  institution: string;
  theme: string;
  abstract: string;
};

const REQUIRED_FIELDS: (keyof AbstractPayload)[] = [
  "paperTitle",
  "authorNames",
  "email",
  "institution",
  "theme",
  "abstract",
];

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

  try {
    const upstream = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType: "abstract", ...body }),
    });
    const result = await upstream.json();
    return Response.json(result, { status: result.success ? 200 : 400 });
  } catch {
    return Response.json(
      { success: false, message: "Couldn't reach the submission server. Please try again." },
      { status: 502 }
    );
  }
}
