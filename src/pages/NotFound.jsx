import { Link } from "react-router-dom";
import { useTitle } from "../lib/useTitle.js";

export default function NotFound() {
  useTitle("Not on file");
  return (
    <header className="page-head" style={{ minHeight: "70vh" }}>
      <p className="m muted" style={{ margin: "0 0 12px" }}>ERR/404</p>
      <h1 className="page-head__t d">Not on file<span className="s">.</span></h1>
      <p style={{ marginTop: 32 }}><Link className="cta" to="/">BACK TO THE WORK <span className="arr">→</span></Link></p>
    </header>
  );
}
