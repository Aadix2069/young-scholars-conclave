"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DURATIONS, EASE_SMOOTH } from "@/lib/motion";
import { formatFileSize } from "@/lib/fileUtils";
import { CloseIcon, DocumentIcon, UploadIcon } from "../icons";

type FileDropzoneProps = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  accept?: string[];
  file: File | null;
  onFileChange: (file: File | null) => void;
  onBlurValidate?: () => void;
  disabled?: boolean;
};

/**
 * Drag-and-drop single-file upload field with a browse button, selected
 * file summary (name + size), remove control, and inline validation.
 *
 * The real <input type="file"> is visually hidden but focusable, so the
 * control stays keyboard-accessible (Tab to focus, Enter/Space to browse).
 * Drag-and-drop, browse, and remove all funnel through `onFileChange`,
 * keeping parent components in control of validation.
 */
export function FileDropzone({
  label,
  name,
  required = false,
  error,
  helperText,
  accept,
  file,
  onFileChange,
  onBlurValidate,
  disabled = false,
}: FileDropzoneProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const reduceMotion = useReducedMotion();

  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const feedbackTransition = {
    duration: reduceMotion ? 0 : DURATIONS.fast,
    ease: EASE_SMOOTH,
  };

  function openPicker() {
    if (!disabled && !file) inputRef.current?.click();
  }

  function handleClear() {
    if (disabled) return;
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    onFileChange(e.dataTransfer.files?.[0] ?? null);
  }

  const dropzoneClass =
    error
      ? "border-red-300 bg-red-50/40"
      : dragging
        ? "border-brand-blue bg-muted-blue"
        : "border-gray-300 bg-white hover:border-brand-blue/60";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gray-800">
        {label}
        {required && (
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={openPicker}
        className={`relative cursor-pointer rounded-lg border-2 border-dashed transition-[border-color,background-color] duration-200 ease-[var(--ease-smooth)] focus-within:ring-2 focus-within:ring-brand-gold focus-within:ring-offset-1 ${dropzoneClass}`}
      >
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept={accept?.join(",")}
          required={required}
          disabled={disabled}
          onChange={(e) => {
            onFileChange(e.target.files?.[0] ?? null);
            e.target.value = "";
          }}
          onBlur={onBlurValidate}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className="sr-only"
        />

        {file ? (
          <div className="flex w-full items-center gap-3 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green/15 text-brand-green-dark">
              <DocumentIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-medium text-brand-charcoal">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatFileSize(file.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              aria-label={`Remove ${file.name}`}
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors duration-200 ease-[var(--ease-smooth)] hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="w-full px-4 py-8 text-center">
            <span
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200 ease-[var(--ease-smooth)] ${
                dragging ? "bg-brand-blue text-white" : "bg-brand-blue/10 text-brand-blue"
              }`}
            >
              <UploadIcon className="h-6 w-6" />
            </span>
            <p className="mt-3 text-sm font-medium text-gray-700">
              Drag and drop your file here
            </p>
            <p className="mt-1 text-sm text-gray-500">
              or <span className="font-semibold text-brand-blue">click to browse</span>
            </p>
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            key="error"
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={feedbackTransition}
            className="mt-1.5 text-sm text-red-600"
          >
            {error}
          </motion.p>
        ) : helperText ? (
          <motion.p
            key="helper"
            id={helperId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={feedbackTransition}
            className="mt-1.5 text-sm text-gray-500"
          >
            {helperText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
