/**
 * Shared file-handling helpers for the submission forms.
 *
 * Centralizes PDF validation, size formatting, and base64 encoding so the
 * frontend form, its dropzone, and (mirrored) the API route stay in sync
 * on limits and rules. The same constants are re-checked server-side in
 * src/app/api/submit-abstract/route.ts and in google-apps-script/Code.gs.
 */

export const PDF_EXTENSION = ".pdf";
export const PDF_MIME_TYPE = "application/pdf";

/** CV upload cap: 5MB raw. Base64 inflates the JSON payload ~33%, and the
 *  abstract route re-checks the decoded size before forwarding to Apps
 *  Script. */
export const MAX_CV_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/** ASCII PDF header magic bytes. A real PDF always starts with `%PDF-`. */
export const PDF_MAGIC = "%PDF-";

/**
 * Base64 of `%PDF-` (0x25 0x50 0x44 0x46 0x2D). The client checks the raw
 * base64 prefix after encoding, so we only need the unpadded head of the
 * first 8-character base64 group, not the full 8-char `JVBERi0=`.
 */
export const PDF_MAGIC_BASE64_PREFIX = "JVBERi0";

/** Human-readable byte count, e.g. 512 -> "512 B", 12288 -> "12 KB",
 *  5242880 -> "5 MB". */
export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb % 1 === 0 ? kb.toFixed(0) : kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb % 1 === 0 ? mb.toFixed(0) : mb.toFixed(1)} MB`;
}

export function hasPdfExtension(fileName: string): boolean {
  return fileName.toLowerCase().endsWith(PDF_EXTENSION);
}

export function hasPdfMimeType(mimeType: string): boolean {
  return mimeType === PDF_MIME_TYPE;
}

/** True when the base64 string begins with the `%PDF-` header. Catches
 *  renamed executables and truncated/corrupt files before the server
 *  round-trip. */
export function isPdfBase64(base64: string): boolean {
  return base64.trim().startsWith(PDF_MAGIC_BASE64_PREFIX);
}

/**
 * Synchronous client-side CV validation. Returns a user-facing error
 * message, or undefined when the file is acceptable.
 *
 * Note: a file whose `.type` is empty (some browsers/OSes omit it) passes
 * the MIME check here — it is still gated by the `%PDF-` magic-bytes check
 * during encoding, and again by the server and Apps Script.
 */
export function validatePdfFile(
  file: File | null,
  maxSize: number = MAX_CV_FILE_SIZE
): string | undefined {
  if (!file) return "Please upload your CV in PDF format.";
  if (file.size <= 0) return "This file appears to be empty.";
  if (!hasPdfExtension(file.name)) return "Only PDF files are accepted.";
  if (file.type && !hasPdfMimeType(file.type)) {
    return "This doesn't appear to be a PDF file.";
  }
  if (file.size > maxSize) {
    return `The CV must be ${formatFileSize(maxSize)} or smaller.`;
  }
  return undefined;
}

/** Reads a File as a data URL and returns the bare base64 payload (the
 *  `data:...;base64,` prefix is stripped). */
export function fileToBase64(file: File): Promise<string> {
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
