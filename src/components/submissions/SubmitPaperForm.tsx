"use client";

import { useRef, useState } from "react";
import { FormField } from "../forms/FormField";
import { useFormSubmit } from "../forms/useFormSubmit";
import { THEMES } from "@/lib/themes";

const THEME_TITLES = THEMES.map((t) => t.title);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB raw - keeps base64 payload under Vercel's request body limit
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

type Fields = {
  paperTitle: string;
  correspondingAuthor: string;
  coAuthors: string;
  institution: string;
  department: string;
  email: string;
  phone: string;
  researchDomain: string;
  keywords: string;
  additionalRemarks: string;
};

const EMPTY_FIELDS: Fields = {
  paperTitle: "",
  correspondingAuthor: "",
  coAuthors: "",
  institution: "",
  department: "",
  email: "",
  phone: "",
  researchDomain: "",
  keywords: "",
  additionalRemarks: "",
};

const REQUIRED: (keyof Fields)[] = [
  "paperTitle",
  "correspondingAuthor",
  "institution",
  "department",
  "email",
  "phone",
  "researchDomain",
  "keywords",
];

type ExtraErrors = { file?: string; declaration?: string };

function validateFields(fields: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  for (const key of REQUIRED) {
    if (!fields[key].trim()) errors[key] = "This field is required.";
  }
  if (fields.email.trim() && !EMAIL_RE.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

function validateFile(file: File | null): string | undefined {
  if (!file) return "Please upload your full paper.";
  const hasValidExtension = ACCEPTED_EXTENSIONS.some((ext) =>
    file.name.toLowerCase().endsWith(ext)
  );
  if (!hasValidExtension || (file.type && !ACCEPTED_MIME_TYPES.includes(file.type))) {
    return "Only PDF, DOC, or DOCX files are accepted.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File must be under 3MB.";
  }
  return undefined;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function SubmitPaperForm() {
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>> & ExtraErrors>({});
  const [file, setFile] = useState<File | null>(null);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [encoding, setEncoding] = useState(false);
  const { state, message, submit } = useFormSubmit("/api/submit-paper");
  const formRef = useRef<HTMLFormElement>(null);

  function setField(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function validateField(key: keyof Fields) {
    const fieldErrors = validateFields(fields);
    setErrors((prev) => ({ ...prev, [key]: fieldErrors[key] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validateFields(fields);
    const fileError = validateFile(file);
    const declarationError = declarationAccepted
      ? undefined
      : "You must accept the declaration to submit.";
    const allErrors = { ...fieldErrors, file: fileError, declaration: declarationError };
    setErrors(allErrors);

    if (Object.values(allErrors).some(Boolean)) {
      const firstInvalidKey = REQUIRED.find((key) => fieldErrors[key]);
      if (firstInvalidKey) {
        formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalidKey}"]`)?.focus();
      } else if (fileError) {
        formRef.current?.querySelector<HTMLElement>(`[name="paperFile"]`)?.focus();
      }
      return;
    }

    setEncoding(true);
    let fileBase64: string;
    try {
      fileBase64 = await fileToBase64(file as File);
    } catch {
      setEncoding(false);
      setErrors((prev) => ({ ...prev, file: "Couldn't read this file. Please try another." }));
      return;
    }
    setEncoding(false);

    const success = await submit({
      ...fields,
      fileName: (file as File).name,
      fileMimeType: (file as File).type || "application/octet-stream",
      fileBase64,
      declaration: "true",
    });
    if (success) {
      setFields(EMPTY_FIELDS);
      setErrors({});
      setFile(null);
      setDeclarationAccepted(false);
    }
  }

  const submitting = state === "submitting" || encoding;

  if (state === "success") {
    return (
      <div
        role="status"
        className="mx-auto max-w-xl rounded-xl border border-brand-green/40 bg-brand-green/10 p-8 text-center"
      >
        <p className="text-lg font-bold text-brand-green-dark">Full paper submitted</p>
        <p className="mt-2 text-sm text-gray-700">{message}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-2xl space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
    >
      <FormField
        label="Paper Title"
        name="paperTitle"
        required
        value={fields.paperTitle}
        onChange={(v) => setField("paperTitle", v)}
        onBlurValidate={() => validateField("paperTitle")}
        error={errors.paperTitle}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="Corresponding Author"
          name="correspondingAuthor"
          required
          autoComplete="name"
          value={fields.correspondingAuthor}
          onChange={(v) => setField("correspondingAuthor", v)}
          onBlurValidate={() => validateField("correspondingAuthor")}
          error={errors.correspondingAuthor}
        />
        <FormField
          label="Co-Author(s)"
          name="coAuthors"
          value={fields.coAuthors}
          onChange={(v) => setField("coAuthors", v)}
          helperText="Optional — separate multiple with commas"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="Institution / Affiliation"
          name="institution"
          required
          autoComplete="organization"
          value={fields.institution}
          onChange={(v) => setField("institution", v)}
          onBlurValidate={() => validateField("institution")}
          error={errors.institution}
        />
        <FormField
          label="Department"
          name="department"
          required
          value={fields.department}
          onChange={(v) => setField("department", v)}
          onBlurValidate={() => validateField("department")}
          error={errors.department}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={fields.email}
          onChange={(v) => setField("email", v)}
          onBlurValidate={() => validateField("email")}
          error={errors.email}
        />
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          value={fields.phone}
          onChange={(v) => setField("phone", v)}
          onBlurValidate={() => validateField("phone")}
          error={errors.phone}
        />
      </div>

      <FormField
        as="select"
        label="Research Domain"
        name="researchDomain"
        required
        placeholder="Select the closest theme"
        options={THEME_TITLES}
        value={fields.researchDomain}
        onChange={(v) => setField("researchDomain", v)}
        onBlurValidate={() => validateField("researchDomain")}
        error={errors.researchDomain}
      />

      <FormField
        label="Keywords"
        name="keywords"
        required
        value={fields.keywords}
        onChange={(v) => setField("keywords", v)}
        onBlurValidate={() => validateField("keywords")}
        error={errors.keywords}
        helperText="Separate multiple keywords with commas"
      />

      <FormField
        as="file"
        label="Full Paper"
        name="paperFile"
        required
        accept=".pdf,.doc,.docx"
        fileName={file?.name}
        onFileChange={(f) => {
          setFile(f);
          setErrors((prev) => ({ ...prev, file: validateFile(f) }));
        }}
        error={errors.file}
        helperText="PDF, DOC, or DOCX — max 3MB"
      />

      <FormField
        as="textarea"
        label="Additional Remarks"
        name="additionalRemarks"
        rows={4}
        value={fields.additionalRemarks}
        onChange={(v) => setField("additionalRemarks", v)}
        helperText="Optional"
      />

      <div>
        <label className="flex items-start gap-2.5 text-sm text-gray-800">
          <input
            type="checkbox"
            name="declaration"
            checked={declarationAccepted}
            onChange={(e) => {
              setDeclarationAccepted(e.target.checked);
              setErrors((prev) => ({
                ...prev,
                declaration: e.target.checked ? undefined : prev.declaration,
              }));
            }}
            aria-invalid={!!errors.declaration}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-brand-blue focus:ring-brand-blue/20"
          />
          <span>
            I confirm this is original, unpublished work and consent to its review.
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          </span>
        </label>
        {errors.declaration && (
          <p role="alert" className="mt-1.5 text-sm text-red-600">
            {errors.declaration}
          </p>
        )}
      </div>

      {state === "error" && (
        <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-8 py-3.5 text-base font-bold text-white shadow-md transition duration-200 ease-[var(--ease-smooth)] hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
      >
        {submitting ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              aria-hidden="true"
            />
            Submitting&hellip;
          </>
        ) : (
          "Submit Full Paper"
        )}
      </button>
    </form>
  );
}
