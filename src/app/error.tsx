"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-semibold text-gray-900">Something went wrong</h2>
      <p className="max-w-md text-gray-600">
        Sorry about that — please try again, or head back to the homepage.
      </p>
      <button
        onClick={() => unstable_retry()}
        className="rounded-full bg-brand-blue px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
      >
        Try again
      </button>
    </div>
  );
}
