import { Link } from "react-router-dom";
import { yearOf } from "../data/projects.jsx";
import { CASES } from "../data/cases.jsx";
import { ClauseCard, Drawing, PendingSlots, Shot, Sig } from "./Visual.jsx";

/* Each featured project is its own spread with its own visual language.
   Shared: number · title · one line · category · year · one action. */

function Meta({ n, p }) {
  const y = yearOf(p);
  return (
    <div className="spread__meta">
      <span className="spread__num">{String(n).padStart(2, "0")}</span>
      <span className="m">{p.category.slice(0, 2).join(" · ")}{y ? <span className="muted"> — {y}</span> : null}</span>
    </div>
  );
}

function Foot({ p, label = "VIEW CASE" }) {
  const c = CASES[p.slug];
  return (
    <div className="spread__foot">
      <p className="spread__line ed">{c.oneLiner}</p>
      <div className="actions">
        <Sig code={p.code} year={p.mark.date !== "—" ? p.mark.date.slice(0, 2) : null} className="muted" />
        <Link className="cta" to={`/work/${p.slug}`}>{label} <span className="arr">→</span></Link>
      </div>
    </div>
  );
}

const Title = ({ p, className = "" }) => (
  <h3 className={`spread__title d ${className}`}><Link to={`/work/${p.slug}`}>{p.name}</Link></h3>
);

export function SpreadAila({ n, p }) {
  return (
    <article className="spread spread--aila" data-spec={`SPREAD ${p.code}`}>
      <Meta n={n} p={p} />
      <Title p={p} />
      <div className="spread__media bleed">
        <Shot src="/work/aila-globe.jpg" alt="AILA’s regulatory globe" tone="dark" pos="50% 42%" />
        <ClauseCard />
      </div>
      <Foot p={p} />
    </article>
  );
}

export function SpreadAura({ n, p }) {
  return (
    <article className="spread spread--aura" data-spec={`SPREAD ${p.code}`}>
      <Meta n={n} p={p} />
      <div className="spread__media">
        <Shot src="/work/aura-demo.jpg" alt="AURA running its demo scene: engine suppressed, siren preserved" tone="dark" pos="0% 0%" />
      </div>
      <div className="aura__side">
        <Title p={p} />
        <div className="aura__stats">
          <p className="stat reveal"><span className="stat__n d s">+0.6 dB</span><span className="stat__l m">Siren, through AURA</span></p>
          <p className="stat stat--dim reveal" style={{ "--d": "120ms", marginTop: 26 }}><span className="stat__n d">−8.0 dB</span><span className="stat__l m muted">Siren, through noise cancellation</span></p>
        </div>
      </div>
      <div style={{ gridColumn: "1 / -1" }}><Foot p={p} /></div>
    </article>
  );
}

export function SpreadDahh({ n, p }) {
  return (
    <article className="spread spread--dahh" data-spec={`SPREAD ${p.code}`}>
      <Meta n={n} p={p} />
      <Title p={p} />
      <div className="dahh__field bleed">
        <Drawing name="landscape" data={{ ridges: 30, label: false }} slice />
        <p className="math ed" aria-label="f-hat of x equals the minimum over i of C i, h i of x">f̂(x) = min<sub>i</sub> C[i][h<sub>i</sub>(x)]</p>
      </div>
      <p className="cap" style={{ paddingTop: 12 }}>Illustrative — decayed frequency estimates, one item per line; the orange line is a new heavy hitter after drift.</p>
      <Foot p={p} />
    </article>
  );
}

export function SpreadAlvin({ n, p }) {
  return (
    <article className="spread spread--alvin" data-spec={`SPREAD ${p.code}`}>
      <Meta n={n} p={p} />
      <Title p={p} />
      <div className="alvin__map">
        <Shot src="/work/alvin-map.jpg" alt="ALVIN map overview of BGC with a recommended room and walking route" tone="dark" pos="60% 30%" />
      </div>
      <div className="alvin__twin">
        <Shot src="/work/alvin-twin.jpg" alt="ALVIN digital twin: 3D building with comfort score" tone="dark" pos="40% 50%" />
      </div>
      <p className="alvin__note m reveal">
        <svg viewBox="0 0 90 24" aria-hidden="true"><path className="draw" d="M0 20 L30 20 L50 4 L90 4" /></svg>
        ESP32 SENSOR NODE → COMFORT SCORE 0–100
      </p>
      <Foot p={p} />
    </article>
  );
}

export function SpreadHarvest({ n, p }) {
  return (
    <article className="spread spread--hg" data-spec={`SPREAD ${p.code} — AWAITING PHOTOGRAPHS`}>
      <Meta n={n} p={p} />
      <Title p={p} />
      <PendingSlots slots={[["HARDWARE", "a"], ["SENSOR", "b"], ["PRODUCE", "c"]]} />
      <Foot p={p} label="VIEW SLOT" />
    </article>
  );
}

export const SPREADS = {
  aila: SpreadAila,
  aura: SpreadAura,
  "drift-aware-heavy-hitters": SpreadDahh,
  alvin: SpreadAlvin,
  harvestguard: SpreadHarvest,
};
