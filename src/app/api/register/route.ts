import { APPS_SCRIPT_URL } from "@/lib/appsScript";

type RegistrationPayload = {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  category: string;
  country?: string;
  dietaryRequirements?: string;
};

const REQUIRED_FIELDS: (keyof RegistrationPayload)[] = [
  "fullName",
  "email",
  "phone",
  "institution",
  "category",
];

export async function POST(request: Request) {
  if (!APPS_SCRIPT_URL) {
    return Response.json(
      {
        success: false,
        message:
          "Registration isn't connected yet. Please try again later or contact the organisers directly.",
      },
      { status: 503 }
    );
  }

  let body: RegistrationPayload;
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
      body: JSON.stringify({ formType: "registration", ...body }),
      redirect: "follow",
    });

    const text = await upstream.text();
    
    // Parse JSON safely
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
      { success: false, message: "Couldn't reach the registration server. Please try again." },
      { status: 502 }
    );
  }
}