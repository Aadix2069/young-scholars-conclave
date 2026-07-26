"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FormField } from "@/components/forms/FormField";

function ArchiveLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/archive-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await res.json();
      if (result.success) {
        router.push(searchParams.get("next") || "/archive");
        router.refresh();
      } else {
        setError(result.message);
        setSubmitting(false);
      }
    } catch {
      setError("Couldn't reach the server. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-sm space-y-5 rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-brand-blue">Conference Archive</h1>
        <p className="mt-2 text-sm text-gray-500">
          Restricted to the designated archive administrator.
        </p>
      </div>

      <FormField
        label="Password"
        name="password"
        type="password"
        required
        value={password}
        onChange={setPassword}
        error={error}
      />

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-8 py-3.5 text-base font-bold text-white shadow-md transition duration-200 ease-[var(--ease-smooth)] hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {submitting ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

export default function ArchiveLoginPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main id="main-content" className="flex flex-1 items-center bg-brand-sand/20 px-4 py-20">
        <Suspense fallback={null}>
          <ArchiveLoginForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
