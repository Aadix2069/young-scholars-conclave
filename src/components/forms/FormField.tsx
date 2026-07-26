"use client";

import { useId } from "react";

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
  type?: "text" | "email" | "tel";
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

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

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
