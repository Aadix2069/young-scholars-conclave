"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormField } from "../forms/FormField";
import { useFormSubmit } from "../forms/useFormSubmit";
import { DURATIONS, EASE_SMOOTH } from "@/lib/motion";

// Only category currently accepted - the fee table on the Registration
// page already shows this, so it isn't repeated as a form field.
const FIXED_CATEGORY = "Research Scholars";

const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fields = {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  gender: string;
  country: string;
  dietaryRequirements: string;
};

const EMPTY_FIELDS: Fields = {
  fullName: "",
  email: "",
  phone: "",
  institution: "",
  gender: "",
  country: "",
  dietaryRequirements: "",
};

const REQUIRED: (keyof Fields)[] = ["fullName", "email", "phone", "institution", "gender"];

function validate(fields: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  for (const key of REQUIRED) {
    if (!fields[key].trim()) errors[key] = "This field is required.";
  }
  if (fields.email.trim() && !EMAIL_RE.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

export function RegistrationForm() {
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const { state, message, submit } = useFormSubmit("/api/register");
  const formRef = useRef<HTMLFormElement>(null);
  const reduceMotion = useReducedMotion();

  const successTransition = {
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

    const success = await submit({ ...fields, category: FIXED_CATEGORY });
    if (success) {
      setFields(EMPTY_FIELDS);
      setErrors({});
    }
  }

  if (state === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={successTransition}
        className="mx-auto max-w-xl rounded-xl border border-brand-green/40 bg-brand-green/10 p-8 text-center"
      >
        <p className="text-lg font-bold text-brand-green-dark">Registration received</p>
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="Full Name"
          name="fullName"
          required
          autoComplete="name"
          value={fields.fullName}
          onChange={(v) => setField("fullName", v)}
          onBlurValidate={() => validateField("fullName")}
          error={errors.fullName}
        />
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
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          value={fields.phone}
          onChange={(v) => setField("phone", v)}
          helperText=""
        />
        <FormField
          label="Country"
          name="country"
          autoComplete="country-name"
          value={fields.country}
          onChange={(v) => setField("country", v)}
          helperText="Optional"
        />
      </div>

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
        as="select"
        label="Gender"
        name="gender"
        required
        placeholder="Select your gender"
        options={GENDERS}
        value={fields.gender}
        onChange={(v) => setField("gender", v)}
        onBlurValidate={() => validateField("gender")}
        error={errors.gender}
      />

      <FormField
        as="textarea"
        label="Dietary Requirements"
        name="dietaryRequirements"
        rows={3}
        value={fields.dietaryRequirements}
        onChange={(v) => setField("dietaryRequirements", v)}
        helperText="Optional — let us know of any allergies or preferences"
      />

      <AnimatePresence initial={false}>
        {state === "error" && (
          <motion.p
            key="form-error"
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={successTransition}
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
          "Complete Registration"
        )}
      </button>
    </form>
  );
}
