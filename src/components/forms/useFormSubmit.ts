"use client";

import { useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

/**
 * Shared POST-and-track-status logic for the site's forms. Handles the
 * loading -> success/error lifecycle and surfaces the server's message
 * text so the form can show a clear, specific error (not just "failed").
 *
 * `options.timeoutMs` optionally aborts a request that hangs (e.g. a large
 * base64-encoded file), surfacing a dedicated timeout message instead of
 * an indefinite spinner. Defaults to no timeout, so existing callers keep
 * their current behavior.
 */
export function useFormSubmit(endpoint: string, options?: { timeoutMs?: number }) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function submit(payload: Record<string, string>) {
    setState("submitting");
    setMessage("");

    const timeoutMs = options?.timeoutMs ?? 0;
    const controller = timeoutMs > 0 ? new AbortController() : undefined;
    const timer = controller
      ? setTimeout(() => controller.abort(), timeoutMs)
      : undefined;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller?.signal,
      });
      const result = (await res.json()) as { success: boolean; message: string };
      if (result.success) {
        setState("success");
        setMessage(result.message);
        return true;
      }
      setState("error");
      setMessage(result.message);
      return false;
    } catch {
      if (controller?.signal.aborted) {
        setState("error");
        setMessage("This is taking too long. Please check your connection and try again.");
      } else {
        setState("error");
        setMessage("Something went wrong sending this. Please check your connection and try again.");
      }
      return false;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  function reset() {
    setState("idle");
    setMessage("");
  }

  return { state, message, submit, reset };
}
