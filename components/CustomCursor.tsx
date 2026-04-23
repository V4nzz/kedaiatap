"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const curRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cur = curRef.current;
    if (!cur) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;

    const move = (e: MouseEvent) => {
      cur.style.left = e.clientX + "px";
      cur.style.top = e.clientY + "px";
    };
    document.addEventListener("mousemove", move);

    const hoverEls = document.querySelectorAll(
      "a,button,[data-nav],.m-filter,.faq-q,.pillar,.m-card,.kol-type,.lok-extra,.kon-ch,.art-card,.art-filter"
    );
    const addH = () => cur.classList.add("h");
    const remH = () => cur.classList.remove("h");

    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", addH);
      el.addEventListener("mouseleave", remH);
    });

    return () => {
      document.removeEventListener("mousemove", move);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", addH);
        el.removeEventListener("mouseleave", remH);
      });
    };
  }, []);

  return <div id="cur" ref={curRef} />;
}
