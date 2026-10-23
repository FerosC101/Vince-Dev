import { useMemo } from "react";
import { PLATES } from "../lib/plates.js";

/* Open any image full-screen. Layout listens for this event. */
export const openLightbox = (src, alt) => window.dispatchEvent(new CustomEvent("lightbox", { detail: { src, alt } }));

/* A screenshot / photograph. Square corners, masked reveal, click to expand. */
export function Shot({ src, alt, caption, ratio, fit = "cover", pos = "50% 50%", className = "", tone, zoom = true, eager }) {
  return (
    <figure className={`shot reveal ${tone ? `shot--${tone}` : ""} ${className}`}>
      <button type="button" className="shot__frame" style={ratio ? { aspectRatio: ratio } : undefined}
        onClick={zoom ? () => openLightbox(src, alt) : undefined} tabIndex={zoom ? 0 : -1} aria-label={zoom ? `Expand image: ${alt}` : undefined}>
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" style={{ objectFit: fit, objectPosition: pos }} />
      </button>
      {caption && <figcaption className="cap">{caption}</figcaption>}
    </figure>
  );
}

/* A drawn plate (SVG) without the old frame chrome. */
export function Drawing({ name, data, slice, caption, className = "", ratio }) {
  const html = useMemo(() => PLATES[name]?.(slice, data) ?? "", [name, slice, data]);
  return (
    <figure className={`drawing reveal ${className}`}>
      <div className="drawing__svg" style={ratio ? { aspectRatio: ratio } : undefined} dangerouslySetInnerHTML={{ __html: html }} />
      {caption && <figcaption className="cap">{caption}</figcaption>}
    </figure>
  );
}

/* AILA input → output: a statute page, OCR line boxes, and the extracted record.
   The clause is real output from AILA’s Round-1 submission file. */
export function ClauseCard({ compact }) {
  return (
    <div className={`clause reveal ${compact ? "clause--compact" : ""}`}>
      <div className="clause__page" aria-hidden="true">
        <p className="clause__head">PERSONAL DATA PROTECTION ACT 2012</p>
        <p className="clause__line"><span className="ocr">Purpose</span></p>
        <p className="clause__line">
          <span className="ocr">3.</span>{" "}
          <mark className="ocr ocr--hit">The purpose of this Act is to safeguard individuals’ personal data against misuse, while supporting the legitimate needs of organisations to collect, use and disclose personal data for business and legal purposes.</mark>
        </p>
        <p className="clause__line clause__line--ghost"><span /><span /><span /></p>
      </div>
      <dl className="clause__rec">
        <div><dt>ECONOMY</dt><dd>Singapore</dd></div>
        <div><dt>LAW</dt><dd>Personal Data Protection Act 2012</dd></div>
        <div><dt>SECTION</dt><dd>s. 3</dd></div>
        <div><dt>INDICATOR</dt><dd className="s">P7-I1</dd></div>
        <div><dt>SOURCE</dt><dd>sso.agc.gov.sg</dd></div>
      </dl>
    </div>
  );
}

/* A pipeline set as type: WORD → WORD → WORD */
export function TypeFlow({ steps, accent = [] }) {
  return (
    <p className="typeflow reveal" aria-label={steps.join(" to ")}>
      {steps.map((s, i) => (
        <span key={s}>
          <span className={accent.includes(i) ? "s" : ""}>{s}</span>
          {i < steps.length - 1 && <span className="typeflow__arr" aria-hidden="true">→</span>}
        </span>
      ))}
    </p>
  );
}

/* Words stacked large: SEARCHABLE / TRACEABLE / COMPARABLE */
export function Words({ items }) {
  return <ul className="words">{items.map((w, i) => <li key={w} className="reveal" style={{ "--d": `${i * 90}ms` }}>{w}</li>)}</ul>;
}

/* Structured space for photographs that don’t exist yet. Nothing is drawn that isn’t known. */
export function PendingSlots({ slots }) {
  return (
    <div className="slots">
      {slots.map(([label, area]) => (
        <div key={label} className="slot reveal" style={{ gridArea: area }}>
          <span className="slot__label">{label}</span>
          <span className="slot__state">PHOTOGRAPH PENDING</span>
        </div>
      ))}
      <svg className="slots__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path className="draw" d="M62 18 L78 8 L98 8" />
        <path className="draw" d="M40 72 L52 92 L70 92" />
      </svg>
    </div>
  );
}

/* Small evidence signature: V/009 · 26 with a short barcode */
function hash32(str) { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h >>> 0; }
export function Sig({ code, year, className = "" }) {
  const bars = useMemo(() => {
    let s = hash32(code) || 1; const out = []; let x = 0;
    while (x < 58) { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; const w = (s >>> 0) % 3 === 0 ? 2 : 1; out.push([x, w]); x += w + 1 + ((s >>> 3) % 2); }
    return out;
  }, [code]);
  return (
    <span className={`sig ${className}`} aria-label={`${code}${year ? ", " + year : ""}`}>
      <svg viewBox="0 0 60 12" aria-hidden="true">{bars.map(([x, w]) => <rect key={x} x={x} y="0" width={w} height="12" />)}</svg>
      <span>{code.replace("/", "/")}</span>
      {year && <span className="sig__y">{year}</span>}
    </span>
  );
}
