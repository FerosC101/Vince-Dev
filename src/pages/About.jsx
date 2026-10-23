import { Link } from "react-router-dom";
import { AboutBlock, Experience, Recognition, TechStrip } from "../components/Sections.jsx";
import { useTitle } from "../lib/useTitle.js";

export default function About() {
  useTitle("About");
  return (
    <>
      <section className="sec" style={{ paddingTop: 120 }} aria-label="About">
        <AboutBlock headingLevel={1} />
      </section>

      <div className="gap-xl" />

      <section className="sec" id="experience" aria-labelledby="xp-h">
        <h2 id="xp-h" className="sec__title d">Field experience<span className="s">/</span></h2>
        <Experience />
      </section>

      <div className="gap-l" />

      <section className="sec" aria-labelledby="rec-h">
        <h2 id="rec-h" className="sec__title d">Recognition<span className="s">/</span></h2>
        <Recognition />
      </section>

      <div className="gap-m" />
      <TechStrip />

      <div className="gap-l" />
      <section className="sec" aria-label="Elsewhere">
        <p><Link className="cta" to="/work">SEE THE WORK <span className="arr">→</span></Link></p>
      </section>
    </>
  );
}
