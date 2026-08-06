"use client";

import "./globals.css";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center font-sans">
        <h2 className="text-2xl font-semibold text-gray-900">Something went wrong</h2>
        <p className="max-w-md text-gray-600">
          Sorry about that — please try again, or head back to the homepage.
        </p>
        <button
          onClick={() => unstable_retry()}
          className="rounded-full bg-blue-900 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
