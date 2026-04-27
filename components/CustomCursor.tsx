"use client";
import { useEffect, useRef } from "react";

// Selector untuk elemen hover — digunakan pada event delegation
const HOVER_SELECTOR =
  "a,button,[data-nav],.m-filter,.faq-q,.pillar,.m-card,.kol-type,.lok-extra,.kon-ch,.art-card,.art-filter";

export default function CustomCursor() {
  const curRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cur = curRef.current;
    if (!cur) return;
    // Jangan aktifkan pada layar sentuh / mobile
    if (window.matchMedia("(max-width: 900px)").matches) return;

    let rafId: number | null = null;

    // ─── RAF throttle: hanya update posisi 1x per animation frame ────────────
    const move = (e: MouseEvent) => {
      if (rafId !== null) return; // skip jika masih menunggu frame
      rafId = requestAnimationFrame(() => {
        cur.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
        rafId = null;
      });
    };

    // ─── Event delegation: 1 listener di document, bukan N listener ──────────
    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(HOVER_SELECTOR)) {
        cur.classList.add("h");
      }
    };
    const onLeave = (e: MouseEvent) => {
      const from = e.relatedTarget as Element | null;
      // Hapus class hanya jika kursor keluar dari seluruh elemen hover
      if (!from || !from.closest(HOVER_SELECTOR)) {
        cur.classList.remove("h");
      }
    };

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", onEnter, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  // Gunakan transform alih-alih left/top untuk menghindari layout reflow
  return (
    <div
      id="cur"
      ref={curRef}
      style={{ left: 0, top: 0 }}
    />
  );
}
