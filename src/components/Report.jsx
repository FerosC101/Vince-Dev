/* Building blocks for field reports and other archive pages. */

export function Pending({ children = "Data pending" }) {
  return <span className="pending">{children}</span>;
}

export function PendingBlock({ label = "DATA PENDING", note = "Awaiting author’s notes" }) {
  return (
    <div className="pending-block">
      <span className="pstamp stampable">{label}</span>
      {note && <span className="m m--xs muted">{note}</span>}
    </div>
  );
}

export function Provenance({ children }) {
  return <p className="fsec__src m m--xs muted">{children}</p>;
}

/* cells: string | { mono } | { big } | { pending: true } */
function Cell({ c }) {
  if (c && typeof c === "object") {
    if (c.pending) return <td><Pending /></td>;
    if (c.big) return <td className="big">{c.big}</td>;
    if (c.mono) return <td className={`m m--xs ${c.mono === "—" ? "muted" : ""}`}>{c.mono}</td>;
  }
  return <td>{c}</td>;
}

export function SpecTable({ head, rows }) {
  return (
    <div className="table-wrap">
      <table className="spec">
        <thead><tr>{head.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <Cell key={j} c={c} />)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function Stages({ items }) {
  return (
    <ol className="stages">
      {items.map(([title, body], i) => (
        <li key={title}>
          <span className="d">{String(i + 1).padStart(2, "0")}</span>
          <div><h4 className="d">{title}</h4><p style={{ margin: 0 }}>{body}</p></div>
        </li>
      ))}
    </ol>
  );
}

export function Rule({ grey, thick, delay }) {
  return <hr className={`rule ${grey ? "rule--grey" : ""} ${thick ? "rule--thick" : ""}`} data-reveal="" data-delay={delay} />;
}

export function Slash() {
  return <span className="s">/</span>;
}

/* Section header used across archive pages */
export function SecHead({ id, title, meta }) {
  return (
    <div className="sec__head">
      <h2 id={id} className="sec__title d">{title}</h2>
      <p className="sec__meta m muted">{meta}</p>
    </div>
  );
}

/* Page header for inner pages */
export function PageHead({ strip, title, children, spec = "PAGE HEAD", titleStyle }) {
  return (
    <section className="phead wrap" data-spec={spec}>
      <div className="phead__strip m m--xs">
        {strip.map((s, i) => <span key={i} className={i ? "muted" : ""}>{s}</span>)}
      </div>
      <Rule />
      <h1 className="phead__title d" style={titleStyle}>{title}</h1>
      {children}
    </section>
  );
}

export function Stamp({ id, corner, result, event, rot = 0, sig, delay }) {
  return (
    <div className={`stamp stamp--ink stampable ${sig ? "stamp--sig" : ""}`} style={{ "--rot": `${rot}deg` }} data-delay={delay}>
      <div className="stamp__id m m--xs"><span>{id}</span><span>{corner}</span></div>
      <p className="stamp__res d">{result}</p>
      <p className="m m--xs stamp__ev" style={{ margin: 0 }}>{event}</p>
    </div>
  );
}
