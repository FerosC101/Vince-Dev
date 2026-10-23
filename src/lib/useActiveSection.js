import { useEffect, useState } from "react";

/* Tracks which report section is in the reading band of the viewport. */
export function useActiveSection(ids, key) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px" });
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}
