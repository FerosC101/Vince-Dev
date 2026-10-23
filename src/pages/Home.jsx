import { Link } from "react-router-dom";
import { FEATURED, OTHERS } from "../data/projects.jsx";
import { SPREADS } from "../components/Spreads.jsx";
import { AboutBlock, Collage, Experience, Graveyard, LogClips, Recognition, TechStrip } from "../components/Sections.jsx";
import { Drawing } from "../components/Visual.jsx";
import { useTitle } from "../lib/useTitle.js";

export default function Home() {
  useTitle(null);
  return (
    <>
      {/* HERO — 100vh */}
      <section className="hero" data-spec="HERO">
        <p className="hero__kicker m muted">VINCE<span className="s">/</span> FIELD ARCHIVE — 2026</p>
        <div className="hero__visual">
          <Drawing name="landscape" data={{ ridges: 34, label: false, accent: 21 }} slice
            caption="Fig. — decayed frequency estimates, illustrative" />
        </div>
        <h1 className="hero__title d">
          <span>Things I couldn’t</span>
          <span>leave unsolved<span className="s">.</span></span>
        </h1>
        <div className="hero__foot">
          <p className="hero__line">Software, intelligent systems, algorithms and experiments by Vince Anjo Villar.</p>
          <a className="cta" href="#work" onClick={e => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}>
            SCROLL <span className="arr">↓</span>
          </a>
        </div>
      </section>

      <div className="gap-l" />

      {/* SELECTED WORK — magazine spreads */}
      <section id="work" aria-label="Selected work">
        {FEATURED.map((p, i) => {
          const Spread = SPREADS[p.slug];
          return <Spread key={p.slug} n={i + 1} p={p} />;
        })}
      </section>

      <div className="gap-xl" />

      {/* OTHER THINGS/ */}
      <section className="sec" aria-labelledby="other-h">
        <h2 id="other-h" className="sec__title d">Other things<span className="s">/</span></h2>
        <p className="sec__sub m muted">{OTHERS.length} MORE — BUILDS, HACKATHONS, PROTOTYPES, RESEARCH</p>
        <Collage projects={OTHERS} />
        <p style={{ marginTop: 32 }}><Link className="cta" to="/work">FULL INDEX <span className="arr">→</span></Link></p>
      </section>

      <div className="gap-xl" />

      {/* FIELD EXPERIENCE/ */}
      <section className="sec" aria-labelledby="xp-h">
        <h2 id="xp-h" className="sec__title d">Field experience<span className="s">/</span></h2>
        <Experience />
      </section>

      <div className="gap-l" />

      {/* RECOGNITION/ */}
      <section className="sec" aria-labelledby="rec-h">
        <h2 id="rec-h" className="sec__title d">Recognition<span className="s">/</span></h2>
        <Recognition />
      </section>

      <div className="gap-m" />
      <TechStrip />
      <div className="gap-xl" />

      {/* ABOUT/ */}
      <section className="sec" aria-label="About">
        <AboutBlock />
      </section>

      <div className="gap-xl" />

      {/* GRAVEYARD/ */}
      <section className="sec" aria-labelledby="grave-h">
        <h2 id="grave-h" className="sec__title d">Graveyard<span className="s">/</span></h2>
        <p className="sec__sub m muted">IDEAS THAT DIDN’T MAKE IT.</p>
        <Graveyard />
      </section>

      <div className="gap-l" />

      {/* LOG/ */}
      <section className="sec" aria-labelledby="log-h">
        <h2 id="log-h" className="sec__title d">Log<span className="s">/</span></h2>
        <LogClips />
      </section>
    </>
  );
}
