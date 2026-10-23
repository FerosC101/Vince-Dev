import { useMemo } from "react";
import { PLATES } from "../lib/plates.js";

/* A figure plate: drawn SVG in a cropped, optionally taped frame. */
export default function Plate({ name, data, slice, crop, taped, caption, note, noteClass = "muted", spec, className = "", children }) {
  const html = useMemo(() => PLATES[name]?.(slice, data) ?? "", [name, slice, data]);
  return (
    <figure className={`plate ${crop ? "plate--crop" : ""} ${taped ? "plate--taped" : ""} ${className}`} data-spec={spec}>
      {children ? children(<div className="plate__frame" dangerouslySetInnerHTML={{ __html: html }} />)
        : <div className="plate__frame" dangerouslySetInnerHTML={{ __html: html }} />}
      {(caption || note) && (
        <figcaption className="m m--xs">
          <span>{caption}</span>
          {note && <span className={noteClass}>{note}</span>}
        </figcaption>
      )}
    </figure>
  );
}
