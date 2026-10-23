import { Link, useParams } from "react-router-dom";
import { FEATURED, OTHERS, projectBySlug, yearOf } from "../data/projects.jsx";
import { CASES } from "../data/cases.jsx";
import { recByProject } from "../data/records.js";
import EvidenceMark, { downloadMark } from "../components/EvidenceMark.jsx";
import { Drawing, Shot, Sig } from "../components/Visual.jsx";
import { useTitle } from "../lib/useTitle.js";
import NotFound from "./NotFound.jsx";

const ORDER = [...FEATURED, ...OTHERS];

/* Details live behind these. Default view stays clean. */
const GROUPS = [
  ["Technical notes", [["observation", "Observation"], ["context", "Context"], ["hypothesis", "Hypothesis"], ["constraints", "Constraints"]]],
  ["System details", [["system", "System"], ["experiment", "Experiment"]]],
  ["Process", [["failure", "What didn’t work"], ["revision", "What changed"]]],
  ["Results", [["result", "Result"], ["survived", "What survived"]]],
];

export default function Project() {
  const { slug } = useParams();
  const p = projectBySlug(slug);
  useTitle(p ? `${p.name}` : "Not on file");
  if (!p) return <NotFound />;

  const c = CASES[p.slug] || {};
  const y = yearOf(p);
  const idx = ORDER.indexOf(p);
  const next = ORDER[(idx + 1) % ORDER.length];
  const recs = recByProject(p.slug);
  const markId = `mark-${p.slug}`;
  const hero = c.hero;

  return (
    <article>
      <header className="case-head">
        <div className="case-head__meta">
          <span className="m">{p.category.join(" · ")}{y ? <span className="muted"> — {y}</span> : null}</span>
          <Sig code={p.code} year={p.mark.date !== "—" ? p.mark.date.slice(0, 2) : null} className="muted" />
        </div>
        <h1 className="case-head__title d">{p.titleBreak ? <>{p.titleBreak[0]}<br />{p.titleBreak[1]}</> : p.name}</h1>
      </header>

      {hero?.img && (
        <div className="case-hero">
          <Shot src={hero.img} alt={hero.alt} tone={hero.tone} fit={hero.fit} pos={hero.pos} eager caption={c.heroCaption} />
        </div>
      )}
      {hero?.plate && (
        <div className="case-hero wrap">
          <Drawing name={hero.plate} data={hero.data} slice={hero.plate === "landscape"} />
        </div>
      )}
      {c.pendingVisual && (
        <div className="case-hero">
          <div className="pending-hero"><span className="m muted">HARDWARE · SENSOR · PRODUCE — PHOTOGRAPHS PENDING</span></div>
        </div>
      )}

      <section className="question" aria-label="The question">
        <p className="m muted" style={{ margin: 0 }}>01 — The question</p>
        {c.question
          ? <p className="question__q ed reveal">{c.question}</p>
          : <p className="question__q ed reveal" style={{ color: "var(--grey)" }}>{c.oneLiner || "Project data pending."}</p>}
      </section>

      {(c.screens || []).map((s, i) => (
        <section key={s.k} className={`screen ${s.words ? "screen--words" : ""}`} aria-label={s.k}>
          <p className="screen__k"><span className="m muted">{String(i + 2).padStart(2, "0")}</span><span className="ed">{s.k}</span></p>
          <div className="screen__visual">{s.visual}</div>
          {s.words && <div className="screen__words"><ul className="words">{s.words.map((w, j) => <li key={w} className="reveal" style={{ "--d": `${j * 90}ms` }}>{w}</li>)}</ul></div>}
          {s.note && <p className="screen__note">{s.note}</p>}
        </section>
      ))}

      <section className="result" aria-label={c.result ? "Result" : "In short"}>
        <p className="result__k m muted">{c.result ? "Result" : "In short"}</p>
        <p className="result__p ed reveal">{c.result || p.desc || "Project data pending."}</p>
      </section>

      <section className="notes" aria-label="Details">
        {GROUPS.map(([label, items]) => {
          const filled = items.filter(([k]) => p.sections[k]);
          if (!filled.length) return null;
          return (
            <details className="note" key={label}>
              <summary>{label}<span className="s">+</span></summary>
              <div className="note__body">
                {filled.map(([k, h]) => (
                  <div className="nsec" key={k}>
                    <p className="nsec__h m muted">{h}</p>
                    <div className="nsec__b">{p.sections[k]}</div>
                  </div>
                ))}
              </div>
            </details>
          );
        })}
        <details className="note">
          <summary>Stack &amp; record<span className="s">+</span></summary>
          <div className="note__body">
            <dl className="meta-list">
              {p.meta.map(([k, v]) => [<dt key={k}>{k}</dt>, <dd key={k + "v"} className={v ? "" : "muted"}>{v ?? "Data pending"}</dd>])}
              {recs.map(r => [<dt key={r.id}>{r.id}</dt>, <dd key={r.id + "v"}>{r.result} — {r.event}</dd>])}
            </dl>
            <div style={{ display: "flex", gap: 28, alignItems: "end", flexWrap: "wrap" }}>
              <EvidenceMark id={markId} code={p.code} {...p.mark} className="is-in" />
              {!p.pending && (
                <button type="button" className="cta" style={{ background: "none", borderWidth: "0 0 1px", cursor: "pointer" }}
                  onClick={() => downloadMark(markId, `${p.code.replace("/", "-")}-evidence-mark`)}>
                  EVIDENCE MARK .SVG <span className="arr">↓</span>
                </button>
              )}
            </div>
          </div>
        </details>
      </section>

      <nav className="case-end" aria-label="Next">
        <Link className="case-next" to={`/work/${next.slug}`}>
          <span className="m muted">NEXT — {next.code}</span>
          <span className="d">{next.name}</span>
        </Link>
        <Link className="cta" to="/work">ALL WORK <span className="arr">→</span></Link>
      </nav>
    </article>
  );
}
