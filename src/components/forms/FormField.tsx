"use client";

import { useId, useState } from "react";

type BaseProps = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  onBlurValidate?: () => void;
};

type InputFieldProps = BaseProps & {
  as?: "input";
  type?: "text" | "email" | "tel" | "password";
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
};

type TextareaFieldProps = BaseProps & {
  as: "textarea";
  rows?: number;
  value: string;
  onChange: (value: string) => void;
};

type SelectFieldProps = BaseProps & {
  as: "select";
  options: string[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

type FileFieldProps = BaseProps & {
  as: "file";
  accept?: string;
  fileName?: string;
  onFileChange: (file: File | null) => void;
};

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps | FileFieldProps;

const FIELD_CLASSES =
  "block w-full min-h-11 rounded-lg border bg-white px-4 py-2.5 text-base text-brand-charcoal shadow-sm transition-colors duration-200 ease-[var(--ease-smooth)] focus:outline-none focus:ring-2 focus:ring-offset-1";

/**
 * Labeled form field with visible label, required indicator, and
 * below-field error message - per project's UX guidance: no placeholder
 * -only labels, validate on blur not keystroke, errors near the field.
 */
export function FormField(props: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword =
    props.as !== "textarea" && props.as !== "select" && props.as !== "file" && props.type === "password";
  const borderClass = props.error
    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
    : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue/20";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gray-800">
        {props.label}
        {props.required && (
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {props.as === "textarea" ? (
        <textarea
          id={id}
          name={props.name}
          rows={props.rows ?? 5}
          required={props.required}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          onBlur={props.onBlurValidate}
          aria-invalid={!!props.error}
          aria-describedby={props.error ? errorId : props.helperText ? helperId : undefined}
          className={`${FIELD_CLASSES} ${borderClass} resize-y`}
        />
      ) : props.as === "select" ? (
        <select
          id={id}
          name={props.name}
          required={props.required}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          onBlur={props.onBlurValidate}
          aria-invalid={!!props.error}
          aria-describedby={props.error ? errorId : props.helperText ? helperId : undefined}
          className={`${FIELD_CLASSES} ${borderClass}`}
        >
          <option value="" disabled>
            {props.placeholder ?? "Select an option"}
          </option>
          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : props.as === "file" ? (
        <div>
          <input
            id={id}
            name={props.name}
            type="file"
            accept={props.accept}
            required={props.required}
            onChange={(e) => props.onFileChange(e.target.files?.[0] ?? null)}
            onBlur={props.onBlurValidate}
            aria-invalid={!!props.error}
            aria-describedby={props.error ? errorId : props.helperText ? helperId : undefined}
            className={`${FIELD_CLASSES} ${borderClass} cursor-pointer file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-brand-blue file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white`}
          />
          {props.fileName && (
            <p className="mt-1.5 text-sm text-gray-600">Selected: {props.fileName}</p>
          )}
        </div>
      ) : isPassword ? (
        <div className="relative">
          <input
            id={id}
            name={props.name}
            type={showPassword ? "text" : "password"}
            required={props.required}
            autoComplete={props.autoComplete ?? "current-password"}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            onBlur={props.onBlurValidate}
            aria-invalid={!!props.error}
            aria-describedby={props.error ? errorId : props.helperText ? helperId : undefined}
            className={`${FIELD_CLASSES} ${borderClass} pr-16`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-xs font-semibold text-brand-blue hover:text-brand-green-dark"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      ) : (
        <input
          id={id}
          name={props.name}
          type={props.type ?? "text"}
          required={props.required}
          autoComplete={props.autoComplete}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          onBlur={props.onBlurValidate}
          aria-invalid={!!props.error}
          aria-describedby={props.error ? errorId : props.helperText ? helperId : undefined}
          className={`${FIELD_CLASSES} ${borderClass}`}
        />
      )}

      {props.error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-600">
          {props.error}
        </p>
      ) : props.helperText ? (
        <p id={helperId} className="mt-1.5 text-sm text-gray-500">
          {props.helperText}
        </p>
      ) : null}
    </div>
  );
}
