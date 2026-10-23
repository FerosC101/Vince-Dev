import { Link } from "react-router-dom";
import { RECOGNITION } from "../data/records.js";
import { projectBySlug } from "../data/projects.jsx";
import { Recognition as Numbers } from "../components/Sections.jsx";
import { useTitle } from "../lib/useTitle.js";

export default function Recognition() {
  useTitle("Recognition");
  const rows = RECOGNITION.slice().reverse();
  return (
    <>
      <header className="page-head">
        <p className="m muted" style={{ margin: "0 0 12px" }}>{RECOGNITION.length} COMPETITIONS · 2025 — 2026</p>
        <h1 className="page-head__t d">Recognition<span className="s">/</span></h1>
      </header>
      <section className="sec" aria-label="Summary"><Numbers /></section>
      <div className="gap-m" />
      <section className="sec" aria-label="All records">
        <div className="reclist">
          {rows.map(r => {
            const pr = r.project && projectBySlug(r.project);
            return (
              <div key={r.id} id={r.id.replace("/", "-").toLowerCase()} className={`reclist__row ${r.champion ? "reclist__row--champ" : ""}`}>
                <span className="m muted">{r.id}</span>
                <span><p className="reclist__res d">{r.result}</p>{r.detail && <span className="m muted">{r.detail}</span>}</span>
                <span>{r.event}{pr && <><br /><Link className="cta" style={{ marginTop: 8 }} to={`/work/${pr.slug}`}>{pr.name} <span className="arr">→</span></Link></>}</span>
                <span className="m muted">{[r.place, r.date].filter(Boolean).join(" · ")}</span>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
