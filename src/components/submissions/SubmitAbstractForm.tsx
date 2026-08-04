"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormField } from "../forms/FormField";
import { useFormSubmit } from "../forms/useFormSubmit";
import { THEMES } from "@/lib/themes";
import { DURATIONS, EASE_SMOOTH } from "@/lib/motion";

const THEME_TITLES = THEMES.map((t) => t.title);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fields = {
  paperTitle: string;
  authorNames: string;
  email: string;
  institution: string;
  theme: string;
  abstract: string;
};

const EMPTY_FIELDS: Fields = {
  paperTitle: "",
  authorNames: "",
  email: "",
  institution: "",
  theme: "",
  abstract: "",
};

const REQUIRED: (keyof Fields)[] = [
  "paperTitle",
  "authorNames",
  "email",
  "institution",
  "theme",
  "abstract",
];

function validate(fields: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  for (const key of REQUIRED) {
    if (!fields[key].trim()) errors[key] = "This field is required.";
  }
  if (fields.email.trim() && !EMAIL_RE.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (fields.abstract.trim() && fields.abstract.trim().split(/\s+/).length < 50) {
    errors.abstract = "Please provide at least 50 words for the abstract.";
  }
  return errors;
}

export function SubmitAbstractForm() {
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const { state, message, submit } = useFormSubmit("/api/submit-abstract");
  const formRef = useRef<HTMLFormElement>(null);
  const reduceMotion = useReducedMotion();

  const feedbackTransition = {
    duration: reduceMotion ? 0 : DURATIONS.slow,
    ease: EASE_SMOOTH,
  };

  function setField(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function validateField(key: keyof Fields) {
    const fieldErrors = validate(fields);
    setErrors((prev) => ({ ...prev, [key]: fieldErrors[key] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate(fields);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      const firstInvalidKey = REQUIRED.find((key) => fieldErrors[key]) ?? "email";
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalidKey}"]`)?.focus();
      return;
    }

    const success = await submit(fields);
    if (success) {
      setFields(EMPTY_FIELDS);
      setErrors({});
    }
  }

  const wordCount = fields.abstract.trim() ? fields.abstract.trim().split(/\s+/).length : 0;

  if (state === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={feedbackTransition}
        className="mx-auto max-w-xl rounded-xl border border-brand-green/40 bg-brand-green/10 p-8 text-center"
      >
        <p className="text-lg font-bold text-brand-green-dark">Abstract submitted</p>
        <p className="mt-2 text-sm text-gray-700">{message}</p>
      </motion.div>
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

      <FormField
        label="Author Name(s)"
        name="authorNames"
        required
        autoComplete="name"
        value={fields.authorNames}
        onChange={(v) => setField("authorNames", v)}
        onBlurValidate={() => validateField("authorNames")}
        error={errors.authorNames}
        helperText="Separate multiple authors with commas"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="Corresponding Email"
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
          label="Institution / Affiliation"
          name="institution"
          required
          autoComplete="organization"
          value={fields.institution}
          onChange={(v) => setField("institution", v)}
          onBlurValidate={() => validateField("institution")}
          error={errors.institution}
        />
      </div>

      <FormField
        as="select"
        label="Theme"
        name="theme"
        required
        placeholder="Select the closest theme"
        options={THEME_TITLES}
        value={fields.theme}
        onChange={(v) => setField("theme", v)}
        onBlurValidate={() => validateField("theme")}
        error={errors.theme}
      />

      <FormField
        as="textarea"
        label="Abstract"
        name="abstract"
        required
        rows={8}
        value={fields.abstract}
        onChange={(v) => setField("abstract", v)}
        onBlurValidate={() => validateField("abstract")}
        error={errors.abstract}
        helperText={`${wordCount} word${wordCount === 1 ? "" : "s"} (minimum 50)`}
      />

      <AnimatePresence initial={false}>
        {state === "error" && (
          <motion.p
            key="form-error"
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={feedbackTransition}
            className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-blue px-8 py-3.5 text-base font-bold text-white shadow-md transition duration-200 ease-[var(--ease-smooth)] hover:-translate-y-0.5 hover:bg-brand-blue/90 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-brand-blue sm:w-auto"
      >
        {state === "submitting" ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              aria-hidden="true"
            />
            Submitting&hellip;
          </>
        ) : (
          "Submit Abstract"
        )}
      </button>
    </form>
  );
}
