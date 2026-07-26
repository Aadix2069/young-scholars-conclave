"use client";

import { useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

/**
 * Shared POST-and-track-status logic for the site's forms. Handles the
 * loading -> success/error lifecycle and surfaces the server's message
 * text so the form can show a clear, specific error (not just "failed").
 */
export function useFormSubmit(endpoint: string) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function submit(payload: Record<string, string>) {
    setState("submitting");
    setMessage("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      setState("error");
      setMessage("Something went wrong sending this. Please check your connection and try again.");
      return false;
    }
  }

  function reset() {
    setState("idle");
    setMessage("");
  }

  return { state, message, submit, reset };
}
