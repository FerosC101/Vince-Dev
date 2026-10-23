import { useState } from "react";
import { Link } from "react-router-dom";
import { yearOf } from "../data/projects.jsx";
import { CASES, TILES } from "../data/cases.jsx";
import { EXPERIENCE, GRAVEYARD, GRAVEYARD_RESERVED, HACKATHON_WINS, LOG, NATIONAL_AWARDS, PLACEMENTS, RECOGNITION } from "../data/records.js";
import { Drawing, Shot } from "./Visual.jsx";

const pad = n => String(n).padStart(2, "0");

/* ─── OTHER THINGS/ — irregular collage ─── */
export function Collage({ projects }) {
  return (
    <div className="collage">
      {projects.map((p, i) => {
        const c = CASES[p.slug] || {};
        const visual = c.thumb || c.thumbPlate;
        const shape = visual ? (TILES[p.slug] || "sm") : "text";
        const y = yearOf(p);
        return (
          <Link key={p.slug} to={`/work/${p.slug}`} className={`tile tile--${shape} reveal`} style={{ "--d": `${(i % 4) * 70}ms` }} data-spec={p.code}>
            {c.thumb && <span className="tile__img"><img src={c.thumb} alt="" loading="lazy" decoding="async" /></span>}
            {!c.thumb && c.thumbPlate && <span className="tile__img tile__img--plate"><Drawing name={c.thumbPlate.name} data={c.thumbPlate.data} slice /></span>}
            <span className="tile__label">
              <span>
                <span className="m">{p.code}{y ? ` · ${y}` : ""}</span>
                <span className="tile__name d" style={{ display: "block" }}>{p.name}</span>
                {c.oneLiner && <span className="tile__idea" style={{ display: "block" }}>{c.oneLiner}</span>}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/* ─── FIELD EXPERIENCE/ — three rows, details on request ─── */
const XP_SHORT = {
  "EXP/003": { name: "GCash", role: "Machine Learning Operations", year: "2026", line: "Worked around production ML, model reliability and MLOps." },
  "EXP/002": { name: "Universal Steel", role: "Web Development", year: "2026" },
  "EXP/001": { name: "DevFlex", role: "Backend Development", year: "2025" },
};
export function Experience() {
  return (
    <div className="xp">
      {EXPERIENCE.map(x => {
        const s = XP_SHORT[x.id];
        return (
          <details key={x.id} className="xp__row" id={x.anchor}>
            <summary>
              <h3 className="xp__org d">{s.name}</h3>
              <span className="xp__yr">{s.year}</span>
              <span className="xp__role m muted">{s.role}{s.line ? <><br /><span style={{ textTransform: "none", letterSpacing: 0, fontFamily: "var(--f-body)", fontSize: 15, color: "var(--ink)" }}>{s.line}</span></> : null}</span>
              <span className="xp__more">DETAILS <span className="s">→</span></span>
            </summary>
            <div className="xp__body">
              <div>
                <p className="m" style={{ marginBottom: 10 }}>{x.org} — {x.role}</p>
                <p>{x.desc}</p>
                <p className="m muted" style={{ marginTop: 10 }}>{x.period}</p>
              </div>
              <ul className="xp__tags">{x.tags.map(t => <li key={t}>{t}</li>)}</ul>
            </div>
          </details>
        );
      })}
    </div>
  );
}

/* ─── RECOGNITION/ — numbers, then a strip of names ─── */
export function Recognition() {
  const [sel, setSel] = useState(null);
  const shown = RECOGNITION.slice().reverse();
  const active = shown.find(r => r.id === sel);
  return (
    <>
      <div className="nums">
        <p className="reveal" style={{ margin: 0 }}><span className="num__n d" data-count={HACKATHON_WINS.length} data-pad="00">{pad(HACKATHON_WINS.length)}</span><span className="num__l">Hackathon<br />championships</span></p>
        <p className="reveal" style={{ margin: 0, "--d": "100ms" }}><span className="num__n d" data-count={NATIONAL_AWARDS.length} data-pad="00">{pad(NATIONAL_AWARDS.length)}</span><span className="num__l">National<br />awards</span></p>
        <p className="reveal" style={{ margin: 0, "--d": "200ms" }}><span className="num__n d" data-count={PLACEMENTS.length} data-pad="00">{pad(PLACEMENTS.length)}</span><span className="num__l">Finalist &amp;<br />awardee placements</span></p>
      </div>
      <div className="strip" role="group" aria-label="Competitions">
        {shown.map(r => (
          <button key={r.id} type="button" aria-pressed={sel === r.id}
            onMouseEnter={() => setSel(r.id)} onFocus={() => setSel(r.id)} onClick={() => setSel(sel === r.id ? null : r.id)}>
            {r.short}
          </button>
        ))}
      </div>
      <div className="strip__detail" aria-live="polite">
        {active ? (
          <>
            <span className={`ed ${active.champion ? "s" : ""}`}>{active.result}</span>
            <span className="m">{active.event}</span>
            <span className="m muted">{[active.place, active.date].filter(Boolean).join(" · ")}</span>
          </>
        ) : <span className="m muted">HOVER OR TAP A NAME · <Link to="/recognition" className="cta" style={{ border: 0, padding: 0 }}>ALL RECORDS <span className="arr">→</span></Link></span>}
      </div>
    </>
  );
}

/* ─── the work proves the skills: a slow strip, no ratings ─── */
const TECH = ["Python", "Java", "Go", "JavaScript", "Flutter", "Firebase", "PostgreSQL", "Machine learning", "STM32", "ESP32"];
export function TechStrip() {
  const items = [...TECH, ...TECH];
  return (
    <div className="marquee" aria-label={`Tools: ${TECH.join(", ")}`}>
      <div className="marquee__track" aria-hidden="true">{items.map((t, i) => <span key={i}>{t.toUpperCase()}</span>)}</div>
    </div>
  );
}

/* ─── ABOUT/ — photo and a short introduction ─── */
export function AboutBlock({ headingLevel = 2 }) {
  const H = `h${headingLevel}`;
  return (
    <div className="about">
      <div className="about__photo">
        <Shot src="/images/portrait.jpg" alt="Vince Anjo Villar on stage, reading from a card while holding a microphone" ratio="4 / 5" pos="50% 16%" />
      </div>
      <div className="about__text">
        <H className="about__name d">Vince Anjo Villar</H>
        <p className="m" style={{ margin: 0 }}>Computer Science<br /><span className="muted">Batangas, Philippines</span></p>
        <p className="about__line ed">I build software, intelligent systems, algorithms and prototypes around problems I find difficult to ignore.</p>
        <div className="about__facts">
          <p className="m">Batangas State University<br /><span className="muted">BS Computer Science · 2023 — 2027</span></p>
          <p className="m muted">Dean’s Lister<br />Shell MSP Scholar<br />AWS e:Novator Ambassador</p>
        </div>
      </div>
    </div>
  );
}

/* ─── GRAVEYARD/ — only filed by the author ─── */
function DeadSketch({ seed }) {
  // abstract, crossed-out sketch marks — no invented content
  const r = (() => { let v = seed; return () => ((v = (v * 16807) % 2147483647) / 2147483647); })();
  const lines = Array.from({ length: 7 }, (_, i) => {
    const y = 14 + i * 11 + r() * 4;
    return `M${8 + r() * 6} ${y} L${40 + r() * 50} ${y + (r() - .5) * 3}`;
  });
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {lines.map((d, i) => <path key={i} d={d} />)}
      <path d={`M${60 + r() * 10} 20 h24 v28 h-24 z`} />
      <path className="x draw" d="M6 8 L94 92" />
      <path className="x draw" d="M94 8 L6 92" />
    </svg>
  );
}
export function Graveyard() {
  const plots = [
    ...GRAVEYARD,
    ...Array.from({ length: Math.max(0, GRAVEYARD_RESERVED - GRAVEYARD.length) }, (_, i) => ({ id: `G/${String(GRAVEYARD.length + i + 1).padStart(3, "0")}`, empty: true })),
  ];
  return (
    <div className="grave">
      {plots.map((g, i) => (
        <div key={g.id} className="corpse reveal" tabIndex={0} style={{ "--d": `${i * 90}ms` }}>
          <div className="corpse__art"><DeadSketch seed={7 + i * 13} /></div>
          <div className="corpse__meta">
            <span className="m">{g.empty ? "UNFILED" : g.name}</span>
            <span className="m muted">{g.id}</span>
          </div>
          {g.empty
            ? <p className="corpse__why">Reserved. Filed only by the author — with the cause of death and what survived.</p>
            : <p className="corpse__why"><span className="m">CAUSE OF DEATH →</span> {g.cause}<br /><span className="m">WHAT SURVIVED →</span> {g.survived}</p>}
        </div>
      ))}
    </div>
  );
}

/* ─── LOG/ — clippings ─── */
const ddmmyy = id => id.split(".").reverse().join(".");
export function LogClips({ limit = 2 }) {
  return (
    <div className="clips">
      {LOG.slice(0, limit).map(n => (
        <Link key={n.id} to={`/log#log-${n.id.replaceAll(".", "-")}`} className="clip reveal">
          <span className="m">{n.category}</span>
          <span className="clip__date d">{ddmmyy(n.id)}</span>
          <div className="clip__art"><Drawing name="landscape" data={{ ridges: 14, label: false, accent: 9 }} slice /></div>
          <p className="clip__title ed">{n.title}</p>
          <span className="cta">READ <span className="arr">→</span></span>
        </Link>
      ))}
      <div className="clip clip--ghost reveal" style={{ "--d": "120ms" }}>
        <span className="m">NEXT ENTRY</span>
        <span className="clip__date d">——.——</span>
        <p className="clip__title ed">Unwritten.</p>
      </div>
    </div>
  );
}
