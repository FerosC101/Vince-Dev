import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { SITE } from "../config.js";
import Clock from "./Clock.jsx";
import Bench from "./Bench.jsx";
import { useReveal } from "../lib/useReveal.js";

const NAV = [["WORK", "/work"], ["ABOUT", "/about"], ["LOG", "/log"]];

function readBench() {
  const q = new URLSearchParams(window.location.search).get("view");
  if (q) return q === "bench";
  try { return localStorage.getItem("vince.view") === "bench"; } catch { return false; }
}

/* Header shows at the top and when scrolling up; hides while reading down. */
function useHeaderState() {
  const [state, setState] = useState({ solid: false, hidden: false });
  useEffect(() => {
    let last = window.scrollY, raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setState({ solid: y > 40, hidden: y > 240 && y > last + 2 });
        if (Math.abs(y - last) > 2) last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return state;
}

export default function Layout() {
  const location = useLocation();
  const [bench, setBenchState] = useState(readBench);
  const [lightbox, setLightbox] = useState(null);
  const hdr = useHeaderState();

  const setBench = useCallback(on => {
    setBenchState(on);
    try { localStorage.setItem("vince.view", on ? "bench" : "archive"); } catch { /* storage unavailable */ }
  }, []);

  useEffect(() => { document.body.classList.toggle("is-bench", bench); }, [bench]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key.toLowerCase() !== "b" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (/input|textarea|select/i.test(e.target.tagName)) return;
      setBench(!bench);
    };
    const onLb = e => setLightbox(e.detail);
    document.addEventListener("keydown", onKey);
    window.addEventListener("lightbox", onLb);
    return () => { document.removeEventListener("keydown", onKey); window.removeEventListener("lightbox", onLb); };
  }, [bench, setBench]);

  useLayoutEffect(() => {
    setLightbox(null);
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  useReveal(location.pathname);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={`hdr ${hdr.solid ? "hdr--solid" : ""} ${hdr.hidden && !lightbox ? "hdr--hidden" : ""}`}>
        <Link className="hdr__mark d" to="/" aria-label="VINCE/ — home">VINCE<span className="s">/</span></Link>
        <nav className="hdr__nav" aria-label="Main">
          {NAV.map(([label, to]) => <NavLink key={label} to={to}>{label}</NavLink>)}
          <span className="hdr__time" title="Local time in Batangas, Philippines"><span className="dot" aria-hidden="true" /><Clock /></span>
        </nav>
      </header>

      <main id="main"><Outlet /></main>

      <footer className="foot">
        <div className="foot__row">
          <p className="foot__mark d">VINCE<span className="s">/</span></p>
          <ul className="foot__links">
            <li>{SITE.email ? <a href={`mailto:${SITE.email}`}>EMAIL</a> : <span className="muted" title="Not yet published">EMAIL</span>}</li>
            <li>{SITE.github ? <a href={SITE.github} target="_blank" rel="noopener">GITHUB</a> : <span className="muted">GITHUB</span>}</li>
            <li>{SITE.linkedin ? <a href={SITE.linkedin} target="_blank" rel="noopener">LINKEDIN</a> : <span className="muted" title="Not yet published">LINKEDIN</span>}</li>
          </ul>
        </div>
        <div className="foot__base m muted">
          <span>BATANGAS / PHILIPPINES</span>
          <span>BUILT OUT OF CURIOSITY.</span>
          <button type="button" className="m muted" onClick={() => setBench(!bench)} aria-pressed={bench}>{bench ? "CLOSE BENCH" : "BENCH"}</button>
        </div>
      </footer>

      <Bench open={bench} path={location.pathname} />

      {lightbox && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={() => setLightbox(null)}>
          <img src={lightbox.src} alt={lightbox.alt} />
          <p className="lb__cap m">{lightbox.alt}</p>
          <button type="button" className="lb__close m" onClick={() => setLightbox(null)}>CLOSE ×</button>
        </div>
      )}
    </>
  );
}
