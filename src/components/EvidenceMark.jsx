import { useMemo } from "react";

/* Evidence mark — a printable SVG tag. The barcode is derived
   deterministically from code + domain, so an entry keeps the same mark
   everywhere it appears. */

function hash32(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}
function rng(seed) {
  let s = seed || 1;
  return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 10000) / 10000; };
}
function bars(code, domain) {
  const r = rng(hash32(code + "|" + domain));
  const out = [];
  let x = 12;
  while (x < 302) {
    const w = r() < .55 ? 1 : r() < .7 ? 2 : 3.2;
    const h = r() < .12 ? 30 : 26;
    if (x + w > 304) break;
    out.push([x, w, h]);
    x += w + (r() < .5 ? 1.6 : r() < .6 ? 3 : 4.6);
  }
  return out;
}

export default function EvidenceMark({ code, domain = "", date = "—", status = "FILED", cls = "", large, id, className = "" }) {
  const [pre, num = ""] = code.split("/");
  const barcode = useMemo(() => bars(code, domain), [code, domain]);
  const label = `Evidence mark ${code}${domain ? " — " + domain : ""}${date ? ", " + date : ""}`;
  return (
    <div id={id} className={`v-mark stampable ${large ? "lg" : ""} ${className}`} data-status={status}>
      <svg viewBox="0 0 316 160" role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
        <rect className="vm-frame" x=".75" y=".75" width="314.5" height="158.5" />
        <text className="vm-tg" x="12" y="16">VINCE/ FIELD ARCHIVE</text>
        <circle className="vm-dot" cx={304 - status.length * 5.6 - 8} cy="13.4" r="3" />
        <text className="vm-tg" x="304" y="16" textAnchor="end">{status}</text>
        <line className="vm-hair" x1="0" y1="24" x2="316" y2="24" />
        <text className="vm-code" x="10" y="82">{pre}<tspan className="vm-s">/</tspan>{num}</text>
        <line className="vm-hair" x1="196" y1="24" x2="196" y2="94" />
        <text className="vm-t" x="206" y="44">{domain}</text>
        <text className="vm-date" x="206" y="82">{date}</text>
        <line className="vm-hair" x1="0" y1="94" x2="316" y2="94" />
        {barcode.map(([x, w, h], i) => <rect key={i} className="vm-bar" x={x.toFixed(1)} y="104" width={w} height={h} />)}
        <text className="vm-tg" x="12" y="150">{code} · {domain} · {date}</text>
        <text className="vm-tg" x="304" y="150" textAnchor="end">{cls}</text>
      </svg>
    </div>
  );
}

const EXPORT_CSS = `
.vm-frame{fill:#F4F1EA;stroke:#0B0B0B;stroke-width:1.5}.vm-hair{stroke:#0B0B0B;stroke-width:.75}.vm-bar{fill:#0B0B0B}
.vm-code,.vm-date{font-family:'Archivo Narrow','Arial Narrow',sans-serif;font-weight:800;fill:#0B0B0B}.vm-code{font-size:54px}.vm-date{font-size:30px}
.vm-s{fill:#FF5A00}.vm-dot{fill:#FF5A00}.vm-t{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.08em;fill:#0B0B0B}
.vm-tg{font-family:'IBM Plex Mono',monospace;font-size:7.5px;letter-spacing:.1em;fill:#676A6A}`;

/* Save the mark with the given element id as a standalone SVG (print, stickers, reports). */
export function downloadMark(id, name) {
  const svg = document.querySelector(`#${id} svg`);
  if (!svg) return;
  const clone = svg.cloneNode(true);
  clone.insertAdjacentHTML("afterbegin", `<style>${EXPORT_CSS}</style>`);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([clone.outerHTML], { type: "image/svg+xml" }));
  a.download = `${name}.svg`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
