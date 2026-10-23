/* VINCE/ FIELD ARCHIVE — technical plates.
   Figures are drawn, not decorated: each one describes a mechanism named in
   the source material. Anything illustrative is labelled as such on the plate.
   Each function returns an SVG string; <Plate name="…"/> renders it. */

let uid = 0;

const svg = (w, h, body, label, slice) =>
  `<svg viewBox="0 0 ${w} ${h}" ${slice ? 'preserveAspectRatio="xMidYMid slice"' : ""} role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

const defs = id => `
  <defs>
    <marker id="a${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="pl-inkfill"/></marker>
    <marker id="s${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="pl-sig-fill"/></marker>
    <pattern id="h${id}" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="10" class="pl-hatch"/></pattern>
  </defs>`;

const gridBg = (w, h) => {
  let g = "";
  for (let x = 0; x <= w; x += 20) g += `<line class="${x % 100 ? "pl-grid" : "pl-grid-maj"}" x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
  for (let y = 0; y <= h; y += 20) g += `<line class="${y % 100 ? "pl-grid" : "pl-grid-maj"}" x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
  return g;
};

const t = (x, y, s, cls = "pl-t", extra = "") => `<text class="${cls}" x="${x}" y="${y}" ${extra}>${s}</text>`;

/* ── FIG. 00 — decayed Count-Min Sketch, working sketch (hero) ── */
function heroSketch() {
  const id = ++uid, W = 1200, H = 760;
  let s = defs(id) + gridBg(W, H);
  s += t(40, 64, "FIG. 00", "pl-d", 'font-size="34"');
  s += t(40, 86, "WORKING SKETCH — V/002", "pl-tg");

  // the stream: older arrivals fade, as their weight does
  const toks = "acabadbbeb".split("");
  const x0 = 260, step = 56;
  s += `<line class="pl-ink-thin" x1="${x0 - 20}" y1="72" x2="${x0 + step * 10}" y2="72" marker-end="url(#a${id})"/>`;
  s += t(x0 - 20, 62, "STREAM x₁ … xₜ — ONE PASS, NO REPLAY", "pl-tg");
  toks.forEach((c, i) => {
    const x = x0 + i * step, last = i === toks.length - 1;
    const op = (0.2 + 0.8 * Math.pow(i / 9, 1.4)).toFixed(2);
    s += `<g opacity="${op}"><rect x="${x}" y="92" width="40" height="40" class="${last ? "pl-sig" : "pl-ink-thin"} pl-paper"/>`;
    s += t(x + 20, 118, c, "pl-t", 'text-anchor="middle" font-size="18"') + "</g>";
    s += t(x + 20, 150, i === 9 ? "t" : `t−${9 - i}`, "pl-tg", 'text-anchor="middle" font-size="10"');
  });
  s += t(834, 108, "xₜ = b", "pl-ts");
  s += t(834, 126, "new arrival", "pl-tg");
  s += t(834, 150, "← older evidence fades", "pl-tg", 'font-size="11"');

  // arrival fans out to d hash functions
  const gx = 260, gy = 250, cw = 52, ch = 44, cols = 12, rows = 4, hits = [3, 9, 1, 6];
  s += `<polyline class="pl-ink-thin" points="784,132 784,196 160,196 160,${gy + ch * 3.5}"/>`;
  const rnd = (() => { let v = 7; return () => ((v = (v * 16807) % 2147483647) / 2147483647); })();
  for (let r = 0; r < rows; r++) {
    const yc = gy + ch * r + ch / 2;
    s += `<line class="pl-ink-thin" x1="160" y1="${yc}" x2="185" y2="${yc}"/>`;
    s += `<circle cx="200" cy="${yc}" r="15" class="pl-ink pl-paper"/>` + t(200, yc + 4.5, `h${r + 1}`, "pl-t", 'text-anchor="middle" font-size="11"');
    for (let c = 0; c < cols; c++) {
      const x = gx + c * cw, y = gy + r * ch, hit = hits[r] === c;
      s += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" class="${hit ? "pl-sig pl-wash" : "pl-ink-thin pl-paper"}"/>`;
      s += hit ? t(x + cw / 2, y + ch / 2 + 4, "+1", "pl-ts", 'text-anchor="middle" font-size="13"')
               : t(x + cw / 2, y + ch / 2 + 4, (rnd() * 8).toFixed(1), "pl-tg", 'text-anchor="middle" font-size="10" opacity=".7"');
    }
    s += `<line class="pl-sig" stroke-width="1.2" stroke-dasharray="3 3" x1="216" y1="${yc}" x2="${gx + hits[r] * cw - 2}" y2="${yc}" marker-end="url(#s${id})" opacity=".85"/>`;
  }
  for (let c = 0; c < cols; c++) s += t(gx + c * cw + cw / 2, gy - 8, c, "pl-tg", 'text-anchor="middle" font-size="9.5"');

  // dimensions
  const gr = gx + cols * cw, gb = gy + rows * ch;
  s += `<path class="pl-ink-thin" d="M${gr + 12} ${gy} h8 V${gb} h-8"/>`;
  s += t(gr + 30, gy + 82, "d = 4", "pl-t") + t(gr + 30, gy + 100, "hash rows", "pl-tg");
  s += `<path class="pl-ink-thin" d="M${gx} ${gb + 12} v8 H${gr} v-8"/>`;
  s += t((gx + gr) / 2, gb + 40, "w = 12 counters per row", "pl-t", 'text-anchor="middle"');

  // complexity annotations
  s += t(990, 272, "PER ARRIVAL", "pl-tg") + t(990, 292, "d counter updates", "pl-t") + t(990, 322, "→ O(d)", "pl-d", 'font-size="30" fill="#FF5A00" style="text-transform:none"');
  s += t(990, 366, "STATE", "pl-tg") + t(990, 386, "w × d counters", "pl-t") + t(990, 416, "→ O(w·d)", "pl-d", 'font-size="30" fill="#FF5A00" style="text-transform:none"');
  s += `<line class="pl-dash" x1="${gr + 50}" y1="286" x2="982" y2="286"/>`;

  // decay curve
  const cx0 = 260, cy0 = 700, cwid = 360, chei = 150;
  s += t(cx0, 536, "WEIGHT OF ONE OBSERVATION", "pl-tg");
  s += `<line class="pl-ink-thin" x1="${cx0}" y1="${cy0 - chei - 10}" x2="${cx0}" y2="${cy0}"/><line class="pl-ink-thin" x1="${cx0}" y1="${cy0}" x2="${cx0 + cwid + 10}" y2="${cy0}" marker-end="url(#a${id})"/>`;
  let d = "";
  for (let i = 0; i <= 60; i++) { const u = i / 60; d += `${i ? "L" : "M"}${(cx0 + u * cwid).toFixed(1)} ${(cy0 - chei * Math.exp(-4 * u)).toFixed(1)} `; }
  s += `<path class="pl-ink" d="${d}"/>`;
  const hx = cx0 + cwid * Math.log(2) / 4, hy = cy0 - chei / 2;
  s += `<polyline class="pl-dash" points="${cx0},${hy} ${hx},${hy} ${hx},${cy0}"/>` + `<circle cx="${hx}" cy="${hy}" r="3.5" class="pl-sig-fill"/>`;
  s += t(cx0 - 8, cy0 - chei + 4, "1", "pl-tg", 'text-anchor="end"') + t(cx0 - 8, hy + 4, "½", "pl-tg", 'text-anchor="end"');
  s += t(hx + 10, hy - 8, "half-life = ln2 / λ", "pl-ts");
  s += t(cx0 + 150, cy0 - 90, "w(Δt) = e^(−λ·Δt)", "pl-t");
  s += t(cx0 + cwid + 18, cy0 + 4, "Δt", "pl-tg");

  // estimate → candidate heap
  s += t(662, 566, "f̂(b) = minᵢ C[i][hᵢ(b)]", "pl-t");
  s += `<line class="pl-ink-thin" x1="770" y1="580" x2="890" y2="620" marker-end="url(#a${id})"/>`;
  const nodes = [[1010, 548, "d"], [950, 606, "c"], [1070, 606, "e"], [920, 664, "a"], [980, 664, "b"], [1040, 664, "f"], [1100, 664, "g"]];
  [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]].forEach(([a, b]) =>
    s += `<line class="pl-ink-thin" x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}"/>`);
  nodes.forEach(([x, y, c]) => s += `<circle cx="${x}" cy="${y}" r="15" class="${c === "b" ? "pl-sig" : "pl-ink"} pl-paper"/>` + t(x, y + 4.5, c, "pl-t", 'text-anchor="middle"'));
  s += t(905, 520, "CANDIDATE MIN-HEAP · TOP-k", "pl-tg");

  // title block
  s += `<rect x="860" y="700" width="310" height="44" class="pl-ink-thin pl-paper"/><line class="pl-ink-thin" x1="960" y1="700" x2="960" y2="744"/>`;
  s += t(872, 727, "V/002", "pl-d", 'font-size="22"');
  s += t(972, 718, "DECAYED COUNT-MIN SKETCH", "pl-tg", 'font-size="10.5"') + t(972, 734, "SCHEMATIC · NOT TO SCALE", "pl-tg", 'font-size="10.5"');

  return svg(W, H, s, "Working sketch of a decayed Count-Min Sketch: a stream of items, d hash rows of w counters, an exponential decay curve and a candidate min-heap.");
}

/* ── V/002 — evolving frequency under drift (illustrative model) ── */
function dahhChart(slice) {
  const id = ++uid, W = 1200, H = 700;
  let s = defs(id) + gridBg(W, H);
  const X0 = 170, X1 = 1140, Y0 = 430, Y1 = 110, T = 200, DRIFT = 100, lam = 0.04;
  const rateA = u => (u < DRIFT ? 1 : 0.25), rateB = u => (u < DRIFT ? 0.2 : 1);
  const dt = 0.5, A = [], B = [];
  let a = 0, b = 0, ca = 0, cb = 0, crossDecay = null, crossPlain = null;
  for (let u = 0; u <= T; u += dt) {
    a += (rateA(u) - lam * a) * dt; b += (rateB(u) - lam * b) * dt;
    ca += rateA(u) * dt; cb += rateB(u) * dt;
    if (crossDecay === null && u > DRIFT && b > a) crossDecay = u;
    if (crossPlain === null && u > DRIFT && cb > ca) crossPlain = u;
    A.push([u, a]); B.push([u, b]);
  }
  if (crossPlain === null) crossPlain = T;
  const ymax = 27;
  const px = u => X0 + (u / T) * (X1 - X0), py = v => Y0 - (v / ymax) * (Y0 - Y1);
  const path = arr => arr.map(([u, v], i) => `${i ? "L" : "M"}${px(u).toFixed(1)} ${py(v).toFixed(1)}`).join(" ");

  s += t(40, 64, "FIG. 02", "pl-d", 'font-size="34"');
  s += t(40, 86, "FREQUENCY UNDER CONCEPT DRIFT", "pl-tg");
  s += t(W - 40, 64, "ILLUSTRATIVE MODEL — NOT EXPERIMENTAL DATA", "pl-tg", 'text-anchor="end"');
  s += t(W - 40, 82, "TWO ITEMS · RATE SWAP AT t = 100 · λ = 0.04", "pl-tg", 'text-anchor="end"');

  // axes
  s += `<line class="pl-ink-thin" x1="${X0}" y1="${Y1 - 10}" x2="${X0}" y2="${Y0}"/><line class="pl-ink-thin" x1="${X0}" y1="${Y0}" x2="${X1 + 14}" y2="${Y0}" marker-end="url(#a${id})"/>`;
  for (let u = 0; u <= T; u += 50) s += `<line class="pl-ink-thin" x1="${px(u)}" y1="${Y0}" x2="${px(u)}" y2="${Y0 + 6}"/>` + t(px(u), Y0 + 22, u, "pl-tg", 'text-anchor="middle" font-size="10.5"');
  for (let v = 0; v <= 25; v += 5) s += t(X0 - 10, py(v) + 4, v, "pl-tg", 'text-anchor="end" font-size="10.5"');
  s += t(X0, Y1 - 20, "ĉ(t) — DECAYED ESTIMATE", "pl-tg");
  s += t(X1 + 10, Y0 + 40, "t", "pl-tg", 'text-anchor="end"');

  // drift
  s += `<line class="pl-sig" stroke-width="1.4" stroke-dasharray="5 4" x1="${px(DRIFT)}" y1="${Y1 - 12}" x2="${px(DRIFT)}" y2="${Y0 + 150}"/>`;
  s += `<rect x="${px(DRIFT) + 6}" y="${Y1 - 12}" width="122" height="22" class="pl-sig-fill"/>` + t(px(DRIFT) + 14, Y1 + 4, "CONCEPT DRIFT", "pl-t", 'fill="#F4F1EA" font-size="12"');

  s += `<path class="pl-ink" stroke-width="2" d="${path(A)}"/>`;
  s += `<path class="pl-sig" stroke-width="2.4" d="${path(B)}"/>`;
  s += t(px(40), py(A[80][1]) - 12, "ITEM A", "pl-t");
  s += t(px(170), py(B[340][1]) - 12, "ITEM B", "pl-ts");
  s += `<circle cx="${px(crossDecay)}" cy="${py(A[crossDecay / dt][1])}" r="5" class="pl-paper pl-sig"/>`;
  s += t(px(crossDecay) + 12, py(A[crossDecay / dt][1]) + 22, `estimates cross at t ≈ ${Math.round(crossDecay)}`, "pl-tg");

  // who is on top: plain counts vs decayed counts
  const strip = (y, label, cross, sig) => {
    let g = t(40, y + 15, label, "pl-tg", 'font-size="10.5"');
    g += `<rect x="${X0}" y="${y}" width="${px(cross) - X0}" height="22" class="pl-ink-thin" fill="url(#h${id})"/>`;
    g += t(X0 + 8, y + 15, "A ON TOP", "pl-t", 'font-size="10.5"');
    if (cross < T) {
      g += `<rect x="${px(cross)}" y="${y}" width="${X1 - px(cross)}" height="22" class="${sig ? "pl-sig pl-wash" : "pl-ink-thin pl-deep"}"/>`;
      g += t(px(cross) + 8, y + 15, "B", sig ? "pl-ts" : "pl-t", 'font-size="10.5"');
    }
    return g;
  };
  s += strip(500, "PLAIN COUNT · TOP", crossPlain, false);
  s += strip(540, "DECAYED · TOP", crossDecay, true);
  s += `<line class="pl-dash" x1="${px(crossPlain)}" y1="490" x2="${px(crossPlain)}" y2="600"/>`;
  s += t(px(crossPlain) - 6, 616, `plain count still favours A until t ≈ ${Math.round(crossPlain)}`, "pl-tg", 'text-anchor="end"');
  s += t(40, 668, "Rates are chosen to show the mechanism. Project benchmarks: DATA PENDING.", "pl-tg");

  return svg(W, H, s, "Illustrative model: decayed frequency estimates for two items swap order shortly after a concept drift, while plain counts lag behind.", slice);
}

/* ── pending plate ── */
function pending(slice, label = "PLATE PENDING", sub = "NO VERIFIED IMAGERY ON FILE") {
  const id = ++uid, W = 1200, H = 750;
  let s = defs(id) + `<rect width="${W}" height="${H}" fill="url(#h${id})"/>`;
  s += `<rect x="360" y="300" width="480" height="150" class="pl-paper pl-grey"/>`;
  s += t(600, 380, label, "pl-d", 'font-size="64" text-anchor="middle" fill="#8C8F8F"');
  s += t(600, 418, sub, "pl-tg", 'text-anchor="middle"');
  return svg(W, H, s, `${label} — ${sub}`, slice);
}


/* ── generic pipeline: data = { fig, title, stages:[{k,t,s}], accent, loop:{from,to,label}, note } ── */
function flow(slice, data) {
  const id = ++uid, W = 1200;
  const { fig = "FIG.", title = "", stages = [], accent = [], loop, note } = data || {};
  const perRow = stages.length > 5 ? Math.ceil(stages.length / 2) : stages.length;
  const rows = Math.ceil(stages.length / perRow);
  const top = 130, rowH = 190, gap = 44, x0 = 40;
  const bw = (W - 2 * x0 - gap * (perRow - 1)) / perRow, bh = 118;
  const H = top + rows * rowH + (loop ? 50 : 0) + 60;
  let s = defs(id) + gridBg(W, H);
  s += t(40, 64, fig, "pl-d", 'font-size="34"') + t(40, 86, title, "pl-tg");
  const pos = stages.map((_, i) => {
    const r = Math.floor(i / perRow), c = i % perRow;
    return [x0 + c * (bw + gap), top + r * rowH];
  });
  const wrap = (str, n) => { const w = String(str).split(" "); const out = [""]; w.forEach(x => { if ((out.at(-1) + " " + x).trim().length > n) out.push(x); else out[out.length - 1] = (out.at(-1) + " " + x).trim(); }); return out; };
  const chars = Math.floor(bw / 8.2);
  stages.forEach((st, i) => {
    const [x, y] = pos[i], sig = accent.includes(i);
    s += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" class="${sig ? "pl-sig" : "pl-ink"} pl-paper"/>`;
    s += `<line class="pl-ink-thin" x1="${x}" y1="${y + 28}" x2="${x + bw}" y2="${y + 28}"/>`;
    s += t(x + 10, y + 19, st.k || String(i + 1).padStart(2, "0"), sig ? "pl-ts" : "pl-tg", 'font-size="11"');
    wrap(st.t, Math.floor(bw / 14)).slice(0, 2).forEach((ln, j) => s += t(x + 10, y + 56 + j * 24, ln, "pl-d", 'font-size="24"'));
    if (st.s) wrap(st.s, chars).slice(0, 2).forEach((ln, j) => s += t(x + 10, y + bh - 26 + j * 14, ln, "pl-tg", 'font-size="10.5"'));
    if (i < stages.length - 1) {
      const [nx, ny] = pos[i + 1];
      if (ny === y) s += `<line class="pl-ink" x1="${x + bw}" y1="${y + bh / 2}" x2="${nx - 3}" y2="${ny + bh / 2}" marker-end="url(#a${id})"/>`;
      else s += `<polyline class="pl-ink" points="${x + bw / 2},${y + bh} ${x + bw / 2},${y + bh + 34} ${nx + bw / 2},${y + bh + 34} ${nx + bw / 2},${ny - 3}" marker-end="url(#a${id})"/>`;
    }
  });
  if (loop) {
    const [fx, fy] = pos[loop.from], [tx, ty] = pos[loop.to];
    const yb = Math.max(fy, ty) + bh + (rows > 1 && Math.floor(loop.from / perRow) === 0 ? 34 : 30);
    s += `<polyline class="pl-sig" stroke-width="1.5" stroke-dasharray="5 4" points="${fx + bw / 2},${fy + bh} ${fx + bw / 2},${yb} ${tx + bw / 2},${yb} ${tx + bw / 2},${ty + bh + 3}" marker-end="url(#s${id})"/>`;
    s += t((fx + tx) / 2 + bw / 2, yb - 8, loop.label || "", "pl-ts", 'text-anchor="middle" font-size="11"');
  }
  if (note) s += `<line class="pl-ink-thin" x1="40" y1="${H - 40}" x2="820" y2="${H - 40}"/>` + t(40, H - 20, note, "pl-tg", 'font-size="10.5"');
  return svg(W, H, s, `${title}: ${stages.map(x => x.t).join(" → ")}`, slice);
}

/* ── paired horizontal bars around 0 dB: data = { fig, title, unit, series:[a,b], rows:[[label, a, b]], min, max, note } ── */
function bars(slice, data) {
  const id = ++uid, W = 1200;
  const { fig = "FIG.", title = "", unit = "dB", series = ["A", "B"], rows = [], min = -20, max = 5, note } = data || {};
  const top = 150, rh = 86, L = 380, R = 1150;
  const H = top + rows.length * rh + 70;
  const px = v => L + ((v - min) / (max - min)) * (R - L);
  let s = defs(id) + gridBg(W, H);
  s += t(40, 64, fig, "pl-d", 'font-size="34"') + t(40, 86, title, "pl-tg");
  s += `<rect x="${W - 330}" y="52" width="16" height="10" class="pl-sig-fill"/>` + t(W - 306, 62, series[0], "pl-t", 'font-size="12"');
  s += `<rect x="${W - 190}" y="52" width="16" height="10" class="pl-deep pl-ink-thin"/>` + t(W - 166, 62, series[1], "pl-t", 'font-size="12"');
  for (let v = min; v <= max; v += 5) {
    s += `<line class="${v === 0 ? "pl-ink" : "pl-dash"}" x1="${px(v)}" y1="${top - 20}" x2="${px(v)}" y2="${H - 60}"/>`;
    s += t(px(v), top - 28, (v > 0 ? "+" : "") + v, "pl-tg", 'text-anchor="middle" font-size="10.5"');
  }
  s += t(R, top - 48, unit, "pl-tg", 'text-anchor="end" font-size="10.5"');
  rows.forEach(([label, a, b], i) => {
    const y = top + i * rh;
    s += t(40, y + 26, label, "pl-t", 'font-size="12.5"');
    [[a, "pl-sig-fill", 8], [b, "pl-deep pl-ink-thin", 40]].forEach(([v, cls, dy]) => {
      const x1 = px(Math.min(0, v)), x2 = px(Math.max(0, v));
      s += `<rect x="${x1}" y="${y + dy}" width="${Math.max(2, x2 - x1)}" height="24" class="${cls}"/>`;
      s += t(v < 0 ? x1 - 8 : x2 + 8, y + dy + 17, (v > 0 ? "+" : v === 0 ? "±" : "") + v.toFixed(1), cls.includes("sig") ? "pl-ts" : "pl-tg", `text-anchor="${v < 0 ? "end" : "start"}" font-size="12"`);
    });
  });
  if (note) s += t(40, H - 24, note, "pl-tg", 'font-size="10.5"');
  return svg(W, H, s, `${title}. ${rows.map(r => `${r[0]}: ${series[0]} ${r[1]}, ${series[1]} ${r[2]}`).join("; ")}`, slice);
}

/* ── DAHH data landscape: stacked decayed-frequency ridges (illustrative) ── */
function landscape(slice, data) {
  const { ridges = 26, W = 1600, H = 1000, accent = 17, label = true } = data || {};
  const rnd = (() => { let v = 11; return () => ((v = (v * 16807) % 2147483647) / 2147483647); })();
  const T = 220, lam = 0.045, top = 70, gap = (H - top - 120) / ridges, amp = gap * 5.2;
  const px = t => 40 + (t / T) * (W - 80);
  let s = "";
  for (let r = 0; r < ridges; r++) {
    // each item: a few bursts of arrivals; the estimate decays between them
    const bursts = Array.from({ length: 1 + Math.floor(rnd() * 3) }, () => [rnd() * T, 6 + rnd() * 26, 0.4 + rnd() * 1.2]);
    if (r === accent) bursts.push([T * 0.62, 60, 1.6]);
    let c = 0; const pts = [];
    for (let t = 0; t <= T; t += 1) {
      let rate = 0.02 + rnd() * 0.05;
      bursts.forEach(([b0, len, k]) => { if (t >= b0 && t < b0 + len) rate += k; });
      c += rate - lam * c;
      pts.push([t, c]);
    }
    const peak = r === accent ? 38 : 30;
    const y0 = top + r * gap + gap;
    const d = pts.map(([t, v], i) => `${i ? "L" : "M"}${px(t).toFixed(1)} ${(y0 - Math.min(v / peak, 1.25) * amp).toFixed(1)}`).join(" ");
    const cls = r === accent ? "pl-sig" : "pl-ink-thin";
    s += `<path d="${d} L${px(T)} ${y0 + 2} L${px(0)} ${y0 + 2} Z" class="pl-paper" stroke="none"/>`;
    s += `<path d="${d}" class="${cls}" ${r === accent ? 'stroke-width="2.2"' : 'stroke-width="1.1"'}/>`;
  }
  if (label) {
    s += `<line class="pl-ink-thin" x1="40" y1="${H - 60}" x2="${W - 40}" y2="${H - 60}"/>`;
    s += t(40, H - 34, "t →   DECAYED FREQUENCY ESTIMATES, ONE ITEM PER LINE", "pl-tg", 'font-size="13"');
    s += t(W - 40, H - 34, "ILLUSTRATIVE — GENERATED FROM THE DECAY MODEL", "pl-tg", 'font-size="13" text-anchor="end"');
  }
  return svg(W, H, s, "Illustrative data landscape: stacked lines of decaying frequency estimates, one item highlighted as a new heavy hitter after drift.", slice);
}

/* ── AURA separation: four streams that sum back to the input (schematic waveforms, measured shares) ── */
function streams(slice, data) {
  const W = 1600, H = 820;
  const lanes = (data && data.lanes) || [];
  const rnd = (() => { let v = 5; return () => ((v = (v * 48271) % 2147483647) / 2147483647); })();
  let s = "";
  const x0 = 360, x1 = W - 60, lh = (H - 160) / lanes.length;
  s += t(40, 54, "INPUT = Σ STREAMS", "pl-tg", 'font-size="13"');
  s += t(W - 60, 54, "SCHEMATIC WAVEFORMS · MEASURED SHARES FROM THE PROJECT README", "pl-tg", 'font-size="13" text-anchor="end"');
  lanes.forEach(([name, what, share, kind, hot], i) => {
    const yc = 110 + i * lh + lh / 2;
    s += `<line class="pl-grid-maj" x1="40" y1="${yc + lh / 2}" x2="${W - 60}" y2="${yc + lh / 2}"/>`;
    s += t(40, yc - 6, name, "pl-t", 'font-size="15"');
    s += t(40, yc + 16, what, "pl-tg", 'font-size="12.5"');
    if (share) s += t(300, yc + 12, share, "pl-d", `font-size="36" text-anchor="end"${hot ? ' fill="#FF5A00"' : ""}`);
    let d = "";
    for (let x = x0; x <= x1; x += 3) {
      const u = (x - x0) / (x1 - x0);
      let a;
      if (kind === "speech") a = (Math.sin(u * 40) * 0.5 + 0.6) * (0.3 + rnd() * 0.7);
      else if (kind === "babble") a = 0.25 + rnd() * 0.3;
      else if (kind === "transient") a = (u > 0.3 && u < 0.36 ? 0.9 : 0) + (u > 0.62 && u < 0.85 ? 0.75 + 0.2 * Math.sin(u * 90) : 0) + rnd() * 0.04;
      else a = 0.55 + 0.15 * Math.sin(u * 7) + rnd() * 0.12;
      const h = a * lh * 0.38;
      d += `M${x} ${(yc - h).toFixed(1)} L${x} ${(yc + h).toFixed(1)} `;
    }
    s += `<path d="${d}" class="${hot ? "pl-sig" : "pl-ink-thin"}" stroke-width="1.6"/>`;
  });
  return svg(W, H, s, "Schematic of AURA's four separated streams: primary speech, secondary speech, transients and environment.", slice);
}

export const PLATES = { "hero-sketch": heroSketch, "dahh-chart": dahhChart, pending, flow, bars, landscape, streams };
