"use client";

import { useEffect } from "react";

const SCROLL_OFFSET = 96; // matches html's scroll-padding-top in globals.css

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

/**
 * Handles in-page hash links (navbar/footer anchors like "/#contact")
 * explicitly instead of relying on the browser's native fragment-scroll.
 * That native behavior is unreliable here: `scroll-smooth` on <html>
 * (globals.css) combined with Next.js's client-side routing for
 * same-page hash links means the browser's automatic jump-to-fragment
 * frequently never fires at all - reproducible even loading
 * "/#contact" fresh - silently leaving scroll position unchanged.
 * Reported as "clicking Contact does nothing / lands in the wrong
 * place".
 */
export function HashScrollHandler() {
  useEffect(() => {
    // Arriving with a hash already in the URL (fresh load, or a full
    // page navigation from another route) - the browser's own fragment
    // scroll isn't reliable, so scroll explicitly once layout settles.
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const timeout = setTimeout(() => scrollToId(id), 150);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#")) return;

      const [path, hash] = href.split("#");
      const onCurrentPage = path === "" || path === window.location.pathname;
      if (!onCurrentPage || !hash) return;

      event.preventDefault();
      history.pushState(null, "", `${window.location.pathname}#${hash}`);
      scrollToId(hash);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
