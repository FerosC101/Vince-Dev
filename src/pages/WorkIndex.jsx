import { FEATURED, OTHERS } from "../data/projects.jsx";
import { Collage } from "../components/Sections.jsx";
import { useTitle } from "../lib/useTitle.js";

export default function WorkIndex() {
  useTitle("Work");
  return (
    <>
      <header className="page-head">
        <p className="m muted" style={{ margin: "0 0 12px" }}>{FEATURED.length + OTHERS.length} ENTRIES · 2025 — 2026</p>
        <h1 className="page-head__t d">Work<span className="s">/</span></h1>
      </header>
      <section className="sec" aria-label="Selected">
        <p className="m muted" style={{ marginTop: 48 }}>SELECTED</p>
        <Collage projects={FEATURED} />
      </section>
      <div className="gap-l" />
      <section className="sec" aria-label="Everything else">
        <p className="m muted">OTHER THINGS</p>
        <Collage projects={OTHERS} />
      </section>
    </>
  );
}
