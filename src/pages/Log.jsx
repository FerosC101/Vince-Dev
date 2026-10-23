import { LOG } from "../data/records.js";
import { Drawing } from "../components/Visual.jsx";
import { useTitle } from "../lib/useTitle.js";

const ddmmyy = id => id.split(".").reverse().join(".");

export default function Log() {
  useTitle("Log");
  return (
    <>
      <header className="page-head">
        <p className="m muted" style={{ margin: "0 0 12px" }}>LAB JOURNAL · DATED DD.MM.YY</p>
        <h1 className="page-head__t d">Log<span className="s">/</span></h1>
      </header>

      <section className="sec" aria-label="Entries">
        {LOG.map(n => (
          <article key={n.id} id={`log-${n.id.replaceAll(".", "-")}`} className="screen" style={{ minHeight: "80vh" }}>
            <p className="screen__k"><span className="m">{n.category}</span><span className="m muted">{n.date}</span></p>
            <div className="screen__visual" style={{ gridColumn: "1 / 8" }}>
              <span className="clip__date d" style={{ fontSize: "clamp(96px, 16vw, 300px)", margin: 0 }}>{ddmmyy(n.id)}</span>
              <h2 className="ed" style={{ fontSize: "clamp(32px, 4vw, 64px)", margin: 0 }}>{n.title}</h2>
            </div>
            <div style={{ gridColumn: "8 / -1", alignSelf: "end" }}>
              <div className="clip__art"><Drawing name="landscape" data={{ ridges: 16, label: false, accent: 11 }} slice /></div>
              {n.body.map((p, i) => <p key={i} style={{ margin: "0 0 12px", maxWidth: "46ch" }}>{p}</p>)}
              {n.margin && <p className="m muted" style={{ borderLeft: "1px solid var(--signal)", paddingLeft: 12 }}>{n.margin}</p>}
            </div>
          </article>
        ))}
        <div className="clip clip--ghost" style={{ maxWidth: 520 }}>
          <span className="m">NEXT ENTRY</span>
          <span className="clip__date d">——.——</span>
          <p className="clip__title ed">Unwritten.</p>
        </div>
      </section>
    </>
  );
}
