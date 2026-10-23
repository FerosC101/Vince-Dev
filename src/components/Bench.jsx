import { useEffect, useState } from "react";
import { SITE } from "../config.js";

/* BENCH — the technical status layer. Reports only real values:
   build time comes from the build, activity only from a connected source. */

const EXPERIMENTS = ["Machine Intelligence", "Edge Computing", "Algorithms", "LLM Systems", "Software Engineering"];
const BUILT = new Date(__BUILD_TIME__);

const fmtDate = d => {
  const p = n => String(n).padStart(2, "0");
  return `${String(d.getFullYear()).slice(2)}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
};

function useDocStats(open, path) {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      const main = document.querySelector("main");
      if (!main) return;
      const q = s => main.querySelectorAll(s).length;
      setStats([
        ["PATH", path],
        ["SECTIONS", q("section")],
        ["FIGURES", q("figure")],
        ["MARKS", q(".v-mark")],
        ["WORDS", ((main.innerText.match(/\S+/g) || []).length).toLocaleString("en")],
        ["PENDING", q(".pending, .pending-block, .photo-slot")],
      ]);
    });
    return () => cancelAnimationFrame(id);
  }, [open, path]);
  return stats;
}

function useActivity(open) {
  const [state, setState] = useState({ status: SITE.githubUser ? "idle" : "none", events: [] });
  useEffect(() => {
    if (!open || !SITE.githubUser || state.status !== "idle") return;
    setState(s => ({ ...s, status: "loading" }));
    fetch(`https://api.github.com/users/${encodeURIComponent(SITE.githubUser)}/events/public?per_page=30`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(all => {
        const events = all.filter(e => e.type === "PushEvent").slice(0, 5).map(e => ({
          repo: e.repo.name.split("/")[1],
          msg: ((e.payload.commits || []).at(-1)?.message || "").split("\n")[0].slice(0, 38),
          date: fmtDate(new Date(e.created_at)),
        }));
        setState({ status: "ok", events });
      })
      .catch(() => setState({ status: "error", events: [] }));
  }, [open, state.status]);
  return state;
}

export default function Bench({ open, path }) {
  const stats = useDocStats(open, path);
  const activity = useActivity(open);

  return (
    <section className="bench" aria-label="Bench mode — technical status layer" hidden={!open}>
      <div className="bench__grid">
        <div className="bench__cell">
          <h2 className="d">SYSTEM<span className="s">/</span></h2>
          <dl className="m m--xs">
            <dt>FRAMEWORK</dt><dd>REACT {__REACT_VERSION__} · REACT ROUTER</dd>
            <dt>BUILD</dt><dd>VITE · {fmtDate(BUILT)}</dd>
            <dt>DEPLOYMENT</dt><dd>{SITE.deployment || <span className="muted">DATA PENDING</span>}</dd>
            <dt>LAST UPDATE</dt><dd>{fmtDate(BUILT)} {BUILT.toTimeString().slice(0, 5)}</dd>
            <dt>STATUS</dt><dd><span className="dot" aria-hidden="true" /> SERVING</dd>
          </dl>
        </div>
        <div className="bench__cell">
          <h2 className="d">CURRENT EXPERIMENTS<span className="s">/</span></h2>
          <ul className="m m--xs">
            {EXPERIMENTS.map((e, i) => <li key={e}><span>{e}</span><span className="muted">E/{String(i + 1).padStart(2, "0")}</span></li>)}
          </ul>
        </div>
        <div className="bench__cell">
          <h2 className="d">RECENT ACTIVITY<span className="s">/</span></h2>
          <div className="m m--xs">
            {activity.status === "ok" && activity.events.length > 0 ? (
              <ul>{activity.events.map((e, i) => <li key={i}><span>{e.repo} — {e.msg}</span><span className="muted">{e.date}</span></li>)}</ul>
            ) : (
              <div className="nolive">
                <span className="dot dot--grey" />&nbsp;{" "}
                {{
                  none: "NO LIVE SOURCE CONNECTED",
                  idle: "CONNECTING…",
                  loading: "CONNECTING…",
                  error: "LIVE SOURCE UNREACHABLE",
                  ok: "SOURCE CONNECTED — NO RECENT PUBLIC PUSHES",
                }[activity.status]}
              </div>
            )}
          </div>
        </div>
        <div className="bench__cell">
          <h2 className="d">DOCUMENT<span className="s">/</span></h2>
          <dl className="m m--xs">
            {stats.map(([k, v]) => [<dt key={k}>{k}</dt>, <dd key={k + "v"}>{v}</dd>])}
          </dl>
        </div>
      </div>
      <div className="bench__foot m m--xs muted">
        <span>BENCH VIEW EXPOSES STRUCTURE. DASHED FRAMES ARE LABELLED COMPONENTS.</span>
        <span>PRESS <kbd>B</kbd> TO TOGGLE</span>
      </div>
    </section>
  );
}
