import { Graveyard as Plots } from "../components/Sections.jsx";
import { useTitle } from "../lib/useTitle.js";

export default function Graveyard() {
  useTitle("Graveyard");
  return (
    <>
      <header className="page-head">
        <p className="m muted" style={{ margin: "0 0 12px" }}>IDEAS THAT DIDN’T MAKE IT.</p>
        <h1 className="page-head__t d">Graveyard<span className="s">/</span></h1>
      </header>
      <section className="sec" aria-label="Plots"><Plots /></section>
    </>
  );
}
