import { useEffect } from "react";

/* Documentation-style motion: rules slide in, stamps press, counters count.
   Re-scans the page on every route change. */
export function useReveal(key) {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll(".reveal, .slots, [data-count]");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(el => el.classList.add("is-in"));
      return;
    }
    const timers = [];
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        io.unobserve(el);
        timers.push(setTimeout(() => {
          el.classList.add("is-in");
          if (el.hasAttribute("data-count")) count(el, reduced);
        }, reduced ? 0 : +(el.dataset.delay || 0)));
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach(el => { if (!el.classList.contains("is-in")) io.observe(el); });
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, [key]);
}

function count(el, reduced) {
  const target = +el.dataset.count;
  const pad = (el.dataset.pad || "").length;
  const fmt = n => String(n).padStart(pad, "0");
  if (reduced) { el.textContent = fmt(target); return; }
  const t0 = performance.now(), dur = 900;
  const step = t => {
    const p = Math.min(1, (t - t0) / dur);
    el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
