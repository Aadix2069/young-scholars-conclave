"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ArchiveLogoutButton() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/archive-logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loggingOut}
      className="shrink-0 rounded-full border-2 border-brand-blue/30 px-5 py-2 text-sm font-semibold text-brand-blue transition-colors duration-200 ease-[var(--ease-smooth)] hover:bg-brand-blue/5 disabled:opacity-60"
    >
      {loggingOut ? "Signing out…" : "Sign Out"}
    </button>
  );
}
