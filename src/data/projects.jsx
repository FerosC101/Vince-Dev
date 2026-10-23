/* Field archive entries, NEWEST FIRST.

   Sources: the CV, and each project's own README / docs / git history in ~/Codes.
   Only write what those sources support. A report section missing from
   `sections` renders as DATA PENDING. Periods come from git history (first →
   last commit) or the CV; projects without either show DATE PENDING.

   kind: "report" — full field report (all ten sections, pending ones shown)
         "record" — short record (only filed sections are shown)          */
import Plate from "../components/Plate.jsx";
import { SpecTable, Stages, Provenance } from "../components/Report.jsx";

export const REPORT_SECTIONS = [
  ["observation", "Observation", "What was noticed?"],
  ["context", "Context", "Why does this matter?"],
  ["hypothesis", "Hypothesis", "What idea was explored?"],
  ["constraints", "Constraints", "What made the problem technically difficult?"],
  ["system", "System", "How does the system work?"],
  ["experiment", "Experiment", "What was implemented?"],
  ["failure", "Failure", "What did not work?"],
  ["revision", "Revision", "What changed after testing?"],
  ["result", "Result", "What was achieved?"],
  ["survived", "What survived", "What ideas, techniques or lessons carried forward?"],
];

/* ─────────────────────────── plate data ─────────────────────────── */

export const FLOW = {
  aila: {
    fig: "FIG. 01", title: "V/009 — EXTRACTION & MAPPING PIPELINE",
    stages: [
      { t: "Discovery", s: "live search, official sources ranked first" },
      { t: "Retrieval", s: "HTML · PDF · OCR · Internet Archive" },
      { t: "Extraction", s: "Gemini, verbatim-only rules" },
      { t: "Mapping", s: "validated against RDTII taxonomy" },
      { t: "Classify", s: "KNOWN / NEW · confidence 0–1" },
      { t: "Export", s: "13-column CSV + JSON" },
    ],
    accent: [2],
    note: "FROM THE PROJECT README AND v5 METHODOLOGY. CONFIDENCE < 0.80 IS FLAGGED FOR HUMAN REVIEW.",
  },
  aura: {
    fig: "FIG. 01", title: "V/011 — AUDIO PIPELINE",
    stages: [
      { t: "Microphone" }, { t: "Buffering" }, { t: "Preprocess" },
      { t: "Separation", s: "4 streams that sum to input" }, { t: "Classify", s: "what each sound is" },
      { t: "Speaker ID", s: "Person Lock" }, { t: "Relevance", s: "should you hear it?" },
      { t: "Gain", s: "SafetyGuard has final say" }, { t: "Reconstruct" }, { t: "Headphones" },
    ],
    accent: [3, 7],
    note: "AUDIO CALLBACK: 1.3 MS OF A 20 MS BUDGET. SPEAKER ID AND NAME AWARENESS RUN ON A SEPARATE WORKER.",
  },
  altair: {
    fig: "FIG. 01", title: "V/016 — SELF-REFLECTIVE LOOP",
    stages: [
      { t: "Dataset profile", s: "deterministic measurement" },
      { t: "Multi-agent analysis", s: "specialists reason over profile" },
      { t: "Candidates", s: "scored by explicit rules" },
      { t: "Adversarial check", s: "skeptic: PASS / REJECT" },
      { t: "Experiments", s: "real training, real CV" },
      { t: "Self-reflection", s: "was it supported?" },
      { t: "Recommendation", s: "with the evidence trail" },
    ],
    accent: [3, 5],
    loop: { from: 5, to: 1, label: "REVISE WHEN UNSUPPORTED" },
    note: "THE LANGUAGE MODEL NEVER SETS A NUMBER AND NEVER PICKS THE ANSWER.",
  },
  alvin: {
    fig: "FIG. 01", title: "V/013 — DIGITAL TWIN ARCHITECTURE",
    stages: [
      { t: "ESP32 nodes", s: "temperature · humidity" },
      { t: "FastAPI", s: "ingestion · Firestore bridge" },
      { t: "Comfort engine", s: "0–100 score per space" },
      { t: "Routing graph", s: "networkx · OSRM walking" },
      { t: "Dashboard", s: "MapLibre · three.js twin" },
    ],
    accent: [2],
    note: "WEATHER FROM OPENWEATHERMAP. UI FALLS BACK TO MOCK DATA WHEN THE BACKEND IS OFFLINE.",
  },
  kaia: {
    fig: "FIG. 01", title: "V/012 — SCREENING-TO-CARE PATHWAY",
    stages: [
      { t: "Collect", s: "kit + cartridge" },
      { t: "Reader", s: "point-of-care analysis" },
      { t: "Vision", s: "AI-assisted interpretation" },
      { t: "Clinician review", s: "approve / override" },
      { t: "Risk engine", s: "referral + follow-up" },
      { t: "Care completed", s: "tracked, not assumed" },
      { t: "Population", s: "de-identified program gaps" },
    ],
    accent: [3, 5],
    note: "PROTOTYPE. READER, VISION AND CONTINUITY ENGINE ARE SIMULATED; ALL RECORDS ARE SYNTHETIC.",
  },
  golf: {
    fig: "FIG. 01", title: "V/020 — ROUND LIFECYCLE",
    stages: [
      { t: "Host starts", s: "server stores starts_at / ends_at" },
      { t: "Players submit", s: "WebSocket, no accounts" },
      { t: "Executor", s: "one container per job" },
      { t: "Judge", s: "public + hidden tests" },
      { t: "Lock + drain", s: "1 s grace for latency" },
      { t: "Rank", s: "fewest chars, then earliest" },
    ],
    accent: [2],
    note: "PARTICIPANT CODE NEVER RUNS IN THE GAME SERVER. THE SERVER IS THE ONLY CLOCK.",
  },
  vince: {
    fig: "FIG. 01", title: "V/017 — THE AI LOOP",
    stages: [
      { t: "Message", s: "“spent 180 on lunch…”" },
      { t: "Context bundle", s: "compact JSON snapshot" },
      { t: "AI proxy", s: "Cloud Function holds the key" },
      { t: "{ message, actions[] }" },
      { t: "Action executor", s: "log expense · tick task" },
      { t: "Screens update", s: "providers invalidated" },
    ],
    accent: [2],
    note: "NO SECRETS SHIP WITH THE APP. THE PROXY PINS THE MODEL AND RATE-LIMITS PER USER.",
  },
  lens: {
    fig: "FIG. 01", title: "V/019 — DOCUMENT-TO-ASSET WORKFLOW",
    stages: [
      { t: "Import", s: "image / scanned PDF, ≤100 pages" },
      { t: "OCR", s: "lines linked to source crops" },
      { t: "AI fields", s: "optional Gemini 2.5" },
      { t: "Review", s: "reviewer value is separate" },
      { t: "Export", s: "structured data · SVG / DXF" },
    ],
    accent: [3],
    note: "OCR-ONLY OUTPUT IS NEVER LABELLED AS AI INTERPRETATION.",
  },
};

const AURA_BARS = {
  fig: "FIG. 02", title: "V/011 — MEASURED ON THE PSC DEMO SCENE",
  series: ["AURA", "ANC simulation"],
  rows: [
    ["Engine / rumble 20–300 Hz", -8.7, -18.4],
    ["Speech clarity 1–4 kHz", 0.0, -7.8],
    ["Horn / siren 400–3500 Hz", -0.6, -9.0],
    ["Siren audibility", 0.6, -8.0],
  ],
  min: -20, max: 5,
  note: "SOURCE: scripts/bench_end_to_end.py, AS REPORTED IN THE PROJECT README.",
};

/* ─────────────────────────── entries ─────────────────────────── */

export const PROJECTS = [
  /* V/020 ─ CODE GOLF */
  {
    slug: "code-golf", code: "V/020", kind: "report", year: 2026,
    name: "Code Golf",
    category: ["Real-time systems", "Sandboxed execution"],
    desc: "Live Python code-golf competitions for community game nights. Everyone gets the same working solution at the same moment; the shortest passing rewrite wins the round.",
    tags: ["FastAPI", "WebSockets", "PostgreSQL", "Docker sandbox", "React", "Monaco"],
    period: "September 2026",
    mark: { domain: "SYS · GAME", date: "26.09", status: "FILED", cls: "CLASS: SYSTEM" },
    plate: { name: "flow", data: FLOW.golf },
    plateCaption: "FIG. 01 — Round lifecycle",
    meta: [
      ["Archive no.", "V/020"],
      ["Period", "September 2026"],
      ["Stack", "React · TypeScript · Vite · Tailwind · Monaco / FastAPI · SQLAlchemy · PostgreSQL / Docker executor"],
      ["Contribution", "6 of 6 commits · solo"],
      ["Repository", "FerosC101/Code-Golf"],
    ],
    sections: {
      observation: <p>A code-golf game night only works if it is fair: everyone sees the same problem at the same moment, every submission is judged the same way, and nobody’s code can touch anyone else’s.</p>,
      hypothesis: <p>Make the server the only clock and keep untrusted code out of the game server entirely. The host queues problems, players rewrite a working solution as short as they can, and an isolated executor judges every submission against public and hidden tests.</p>,
      constraints: (
        <SpecTable head={["Constraint", "Decision"]} rows={[
          ["Participant code is untrusted", "Runs in a separate executor on an internal network; one fresh container per job"],
          ["Container limits", { mono: "--network none · read-only root · 16 MB tmpfs · 128 MB memory, no swap" }],
          ["Clients can’t be trusted with time", "Round start and end are stored server-side; clients only render the countdown"],
          ["Live rounds hold WebSockets open", "Backend can’t be serverless — frontend on Vercel, backend + executor + Postgres on Render"],
          ["In-process timers and fan-out", "Backend runs as a single worker; Redis noted as the path to multi-instance"],
        ]} />
      ),
      system: (
        <>
          <Plate name="flow" data={FLOW.golf} taped caption="FIG. 01 — When time runs out: submissions lock, in-flight judging drains, then ranks are written and broadcast." spec="FIG.01" />
          <Stages items={[
            ["Frontend", "React, TypeScript, Vite, Tailwind v4 and a Monaco editor. Player, host and read-only spectator views."],
            ["Game server", "FastAPI with async SQLAlchemy on PostgreSQL. Per-room locks, round timers, judging orchestration and per-viewer snapshots."],
            ["Executor", "Isolated execution service. Docker mode for production, process mode for development; outputs are passed, failed, timeout or runtime_error."],
          ]} />
          <p className="prose">Snapshots are tailored per viewer: players never receive hidden tests or other players’ code until results reveal the winning solution. On restart, the backend re-arms timers for rounds that were live.</p>
        </>
      ),
      experiment: (
        <SpecTable head={["Built", "Detail"]} rows={[
          ["Problem library", "34 problems — 11 easy, 8 medium, 5 hard, 10 nightmare — each with a verbose original, public and hidden tests, and a par"],
          ["Scoring rules", "Every character counts, in Unicode code points, identically on client and server"],
          ["Practice range", "Solo, no clock; scored against par; beating a hole reveals the par solution"],
          ["Spectator view", "Read-only projector view that works on phones"],
        ]} />
      ),
      revision: (
        <SpecTable head={["Order", "Change (from commit history)"]} rows={[
          [{ mono: "01" }, "Initial build: live competitions"],
          [{ mono: "02" }, "Database connection retried on startup"],
          [{ mono: "03" }, "24-problem library, host library picker and practice range"],
          [{ mono: "04" }, "Nightmare tier: 10 very hard, deliberately confusing problems for matches"],
          [{ mono: "05" }, "Round ties broken by who first submitted the winning length"],
        ]} />
      ),
    },
  },

  /* V/019 ─ LEGACYLENS */
  {
    slug: "legacylens", code: "V/019", kind: "report", year: 2026,
    name: "LegacyLens",
    category: ["Document intelligence", "Mobile OCR"],
    desc: "AppCon 2026 Team 08 entry that turns legacy paper pages into reviewable structured assets — OCR linked to source crops, optional AI field extraction, and reviewer-controlled export.",
    tags: ["Flutter", "On-device OCR", "Apple Vision", "Gemini 2.5", "Firebase AI Logic", "SVG / DXF"],
    period: "September 2026",
    mark: { domain: "OCR · MOBILE", date: "26.09", status: "IN PROGRESS", cls: "CLASS: TEAM ENTRY" },
    plate: { name: "flow", data: FLOW.lens },
    plateCaption: "FIG. 01 — Document-to-asset workflow",
    meta: [
      ["Archive no.", "V/019"],
      ["Event", "AppCon 2026 — Team 08 · Legacy Knowledge Digitization & Asset Redefinition"],
      ["Recognition", "Best Pitching — AppCon 2026"],
      ["Period", "September 2026"],
      ["Stack", "Flutter · on-device OCR · Apple Vision · Firebase AI Logic (Gemini 2.5)"],
      ["Contribution", "2 of 8 commits — industrial UI redesign; Knowledge Fusion research mode"],
      ["Status", "In development"],
    ],
    sections: {
      context: <p>Built for AppCon 2026 as Team 08’s entry to the <em>Legacy Knowledge Digitization &amp; Asset Redefinition</em> challenge. The repository records the team brief, a playbook, and an iPhone-first demo plan.</p>,
      constraints: (
        <SpecTable head={["Rule", "Why"]} rows={[
          ["OCR-only output is never labelled as AI interpretation", "The app still works when Firebase AI Logic is unavailable"],
          ["Review score is a routing estimate, not a calibrated probability", "It decides what a reviewer sees first, nothing more"],
          ["Unresolved values export blank, flagged for review", "A guessed value in an archive is worse than a missing one"],
          ["Source images stay out of saved checkpoints", "Up to 20 device-local checkpoints keep fields and decisions only"],
        ]} />
      ),
      system: (
        <>
          <Plate name="flow" data={FLOW.lens} taped caption="FIG. 01 — Original page, OCR text, source crop, AI suggestion, review score and final value are kept separate." spec="FIG.01" />
          <p className="prose">Drawing pages go through a separate path: detected quadrilaterals and contours are overlaid on their true vertices, nearby OCR dimension labels are associated, and the result exports as editable SVG or DXF. On iOS, an enhanced grayscale derivative replaces the original scan for OCR only when it improves line count or mean confidence.</p>
        </>
      ),
      experiment: (
        <SpecTable head={["Contribution", "Commit"]} rows={[
          ["Industrial redesign of the app UI", { mono: "feat(ui)" }],
          ["Knowledge Fusion research mode", { mono: "feat" }],
        ]} />
      ),
    },
    pendingNotes: { result: "Entry still in development — no results reported" },
  },

  /* V/018 ─ OUTPLAY */
  {
    slug: "outplay", code: "V/018", kind: "record", year: 2026,
    name: "Outplay",
    category: ["Esports", "Competitive intelligence"],
    desc: "Product mockup for an AI-powered competitive intelligence platform for esports players and teams, built around one question: what can we learn from how you compete?",
    tags: ["React", "Vite", "Product design"],
    period: "September 2026",
    mark: { domain: "ESPORTS · AI", date: "26.09", status: "MOCKUP", cls: "CLASS: CONCEPT" },
    meta: [
      ["Archive no.", "V/018"],
      ["Period", "September 2026"],
      ["Stack", "React · Vite"],
      ["Contribution", "3 of 6 commits · 3 contributors"],
    ],
    sections: {
      observation: <p>Tournaments, ladders, scrims and profiles already exist. The product brief treats them as the substrate, not the product: the value is in learning how players and teams compete and how their styles interact.</p>,
      system: <p>A mockup and a written product reference. The brief records a pivot: it replaced an earlier spec for a readiness-and-tournament hub (<em>prepare → compete → prove</em>) with competitive intelligence.</p>,
    },
  },

  /* V/017 ─ VINCE (LIFE OS) */
  {
    slug: "vince-life-os", code: "V/017", kind: "report", year: 2026,
    name: "Vince — life OS",
    category: ["LLM systems", "Mobile"],
    desc: "A personal life OS for a Filipino student or young professional. Describe your day in plain language and it logs the expense, ticks the task, and keeps every screen in sync.",
    tags: ["Flutter", "Riverpod", "Firebase", "Cloud Functions", "Claude via OpenRouter"],
    period: "September 2026",
    mark: { domain: "LLM · MOBILE", date: "26.09", status: "FILED", cls: "CLASS: SYSTEM" },
    plate: { name: "flow", data: FLOW.vince },
    plateCaption: "FIG. 01 — The AI loop",
    meta: [
      ["Archive no.", "V/017"],
      ["Period", "September 2026"],
      ["Stack", "Flutter (Android · iOS · web) · Riverpod · Firebase · Cloud Functions proxy · Claude via OpenRouter"],
      ["Contribution", "19 of 19 commits · solo"],
    ],
    sections: {
      observation: <p>Logging a day usually means several apps: one for spending, one for tasks, one for habits. Here the chat is the primary interface; the other tabs are views onto what it recorded.</p>,
      system: (
        <>
          <Plate name="flow" data={FLOW.vince} taped caption="FIG. 01 — The model replies with a message and a list of actions; the app executes them." spec="FIG.01" />
          <p className="prose">A message goes to the AI service with a context bundle — a compact JSON snapshot of profile, today’s tasks, this week’s spending, meals and wellbeing. The reply is <code>{"{ message, actions[] }"}</code>; an action executor runs each action and the affected providers are invalidated so every screen catches up. The AI client is an interface, so the model behind it is swappable.</p>
        </>
      ),
      experiment: (
        <SpecTable head={["Test suite", "What it proves"]} rows={[
          ["Screen layout test", "Renders each screen at 390×844 with the real theme and fails on overflow. It has already caught one."],
          ["Error-state test", "Injects failures at the repository layer, so the real provider bodies are exercised."],
        ]} />
      ),
      failure: <p>Earlier builds shipped the Gemini API key inside the app bundle. The README treats that key as public and instructs revoking it.</p>,
      revision: (
        <SpecTable head={["Change", "From commit history"]} rows={[
          ["Key moved server-side", "AI calls go through a Cloud Function; the key lives in Secret Manager"],
          ["Hardening", "Firestore rules validate document shape; App Check activated; per-user rate limiting"],
          ["Model switch", "Gemini → Claude via OpenRouter → a free OpenRouter model with a local proxy"],
          ["Errors", "Stop swallowing errors; report the ones that remain"],
          ["Visual system", "Bauhaus language replaced by a light minimalist system; dark mode as a tuned second palette"],
        ]} />
      ),
    },
  },

  /* V/016 ─ ALTAIR */
  {
    slug: "altair", code: "V/016", kind: "report", year: 2026,
    name: "ALTAIR",
    category: ["Multi-agent systems", "AutoML research"],
    desc: "A self-reflective multi-agent framework for choosing machine-learning algorithms. Agents profile a dataset, argue over candidates, run real experiments, then audit their own recommendation and revise it when the evidence doesn’t support it.",
    tags: ["Multi-agent", "Adversarial verification", "Cross-validation", "FastAPI", "Next.js", "PostgreSQL"],
    period: null,
    mark: { domain: "ML · AGENTS", date: "—", status: "FILED", cls: "CLASS: RESEARCH" },
    plate: { name: "flow", data: FLOW.altair },
    plateCaption: "FIG. 01 — Self-reflective loop",
    plateNote: "7 agents · 1 loop",
    meta: [
      ["Archive no.", "V/016"],
      ["Full name", "Autonomous Learning, Testing, and Adaptive Intelligence with Reflection"],
      ["Period", null],
      ["Stack", "FastAPI · Next.js · PostgreSQL (SQLite fallback) · Docker · provider-agnostic LLM layer"],
      ["Contribution", null],
    ],
    sections: {
      observation: <p>Ask a language model which algorithm fits a dataset and it will answer confidently — <em>“use Random Forest”</em> — without having measured anything.</p>,
      hypothesis: <p>Replace <code>Dataset → LLM → answer</code> with a loop where every number is measured: profile the data deterministically, let specialist agents reason over the profile, attack the recommendation with a skeptic, train and cross-validate for real, and then check whether the recommendation was actually supported. The language model interprets and articulates; it never sets a number and never picks the answer.</p>,
      constraints: (
        <SpecTable head={["Research decision", "Why"]} rows={[
          ["Rank on cross-validated scores, not the held-out split", "Single-split comparisons are irreproducible; disagreement is surfaced as a limitation"],
          ["Metric chosen from the data", "PR-AUC for severe imbalance, ROC-AUC binary, macro-F1 multiclass, MAE heavy-tailed, R² otherwise"],
          ["Near-unique ≠ identifier", "Every continuous target is near-unique; excluding it silently destroys the problem"],
          ["Preprocessing fitted inside each pipeline", "On training folds only — no test statistic reaches a model"],
          ["The loop must terminate", "A revision pointing at an already-measured candidate converges instead of oscillating"],
        ]} />
      ),
      system: (
        <>
          <Plate name="flow" data={FLOW.altair} taped caption="FIG. 01 — Only deterministic checks can reject a recommendation; LLM challenges are recorded but never blocking." spec="FIG.01" />
          <SpecTable head={["Agent", "Responsibility"]} rows={[
            ["Dataset Analyst", "Interprets the profile: scale, composition, quality risks"],
            ["Task Classifier", "Binary / multiclass / regression, with confidence and reason"],
            ["Algorithm Selection", "Scores every catalogue algorithm; shortlists a diverse set"],
            ["Research Agent", "Strengths, weaknesses, preprocessing, compute, right library"],
            ["Adversarial / Skeptic", "Attacks across ten challenge categories; returns PASS or REJECT"],
            ["Experiment Agent", "Splitting, cross-validation, training, evaluation"],
            ["Self-Reflection", "Audits the decision; revises and re-enters analysis when unsupported"],
          ]} />
        </>
      ),
      experiment: (
        <>
          <p className="prose">Confidence is arithmetic, not opinion — a weighted combination of five measured components. A candidate that was never measured cannot win.</p>
          <SpecTable head={["Component", "Weight"]} rows={[
            ["Measured performance", { big: "40%" }],
            ["Dataset fit", { big: "20%" }],
            ["Adversarial verification", { big: "15%" }],
            ["Self-reflection", { big: "15%" }],
            ["Agent reasoning", { big: "10%" }],
          ]} />
        </>
      ),
      failure: <p>Reasoning models spent their entire token budget on chain-of-thought and returned empty content. On <code>nex-agi/nex-n2.5-mini:free</code>, 0 of 3 responses were usable with reasoning on at a 1,200-token budget. ALTAIR correctly fell back to deterministic reasoning — the platform kept working, but the LLM contributed nothing.</p>,
      revision: (
        <SpecTable head={["Change", "Measured"]} rows={[
          ["Disable reasoning via a generic request-body escape hatch", { big: "3/3" }],
          ["Or raise the token budget to 3,000", { big: "3/3" }],
        ]} />
      ),
      result: <p>Runs end to end with no LLM configured, labelling every agent output <code>deterministic</code>. With a free OpenRouter key, two models tested reliably returned strict JSON at roughly 2.5–3 s per call.</p>,
    },
    partial: ["result"],
  },

  /* V/015 ─ HARVESTGUARD */
  {
    slug: "harvestguard", code: "V/015", kind: "record", year: 2026, pending: true,
    name: "HarvestGuard",
    category: ["Edge AI", "Embedded systems"],
    desc: null,
    tags: ["React", "TypeScript"],
    period: null,
    mark: { domain: "EDGE · EMBED", date: "—", status: "PENDING", cls: "CLASS: PROTOTYPE" },
    plate: { name: "pending" },
    plateCaption: "FIG. — Awaiting documentation",
    meta: [
      ["Archive no.", "V/015"],
      ["Period", null],
      ["Repository state", "React + TypeScript — login and registration screens"],
      ["Contribution", null],
    ],
    sections: {
      system: <p>The repository currently holds the start of the web interface: login and registration screens in React and TypeScript. The edge and embedded components are not in the repository yet.</p>,
    },
  },

  /* V/014 ─ RANI */
  {
    slug: "rani", code: "V/014", kind: "record", year: 2026,
    name: "Rani",
    category: ["Fintech", "Blockchain"],
    desc: "A natural-language payment interface for Stellar: type “Send ₱500 to Maria for dinner” instead of a wallet address.",
    tags: ["Stellar testnet", "Freighter", "React", "TypeScript", "JWT"],
    period: "July 2026",
    mark: { domain: "FIN · CHAIN", date: "26.07", status: "FILED", cls: "CLASS: PROTOTYPE" },
    meta: [
      ["Archive no.", "V/014"],
      ["Period", "July 2026"],
      ["Stack", "Vite · React · TypeScript / backend on Render / Stellar testnet"],
      ["Contribution", "12 of 19 commits · 3 contributors"],
    ],
    sections: {
      system: <p>The frontend parses intent from a sentence; the backend resolves contacts by name, builds the transaction, and submits and polls it on the Stellar testnet.</p>,
      experiment: (
        <SpecTable head={["Built", "Detail"]} rows={[
          ["Wallet", "Freighter wallet connect + JWT auth"],
          ["Contacts", "Add and resolve by name"],
          ["Parsing", "Regex-based intent and entity parsing"],
          ["Payments", "Path-payment simulation; transaction build, submit and poll"],
          ["Guardrails", "Spending limits and audit logging"],
        ]} />
      ),
    },
  },

  /* V/013 ─ ALVIN */
  {
    slug: "alvin", code: "V/013", kind: "report", year: 2026,
    name: "ALVIN",
    category: ["Physical computing", "Digital twins"],
    desc: "Adaptive Living Virtual Intelligence Network — a 3D digital twin that turns IoT sensing, maps and weather into answers for the people inside a building: where to be right now, and where to go if something goes wrong.",
    tags: ["ESP32", "FastAPI", "Firestore", "networkx", "MapLibre GL", "three.js"],
    period: "July 2026",
    mark: { domain: "IOT · TWIN", date: "26.07", status: "FILED", cls: "CLASS: SYSTEM" },
    plate: { name: "flow", data: FLOW.alvin },
    plateCaption: "FIG. 01 — Twin architecture",
    plateNote: "ESP32 → twin",
    meta: [
      ["Archive no.", "V/013"],
      ["Period", "July 2026"],
      ["Stack", "ESP32 firmware / FastAPI · Firebase Admin · networkx · OpenWeatherMap / React 19 · MapLibre GL · three.js"],
      ["Contribution", "30 of 63 commits · 6 contributors"],
      ["Repository", "FerosC101/Alvin"],
    ],
    sections: {
      observation: <p>A digital twin is usually a passive dashboard. The people inside the building have a simpler question: <em>where should I be right now — and where do I go if something goes wrong?</em></p>,
      hypothesis: <p>Make the twin an active decision-support layer: score the comfort of every space in real time, recommend the best place for what you’re doing, and in an emergency route you by GPS to the nearest partner evacuation centre.</p>,
      constraints: (
        <SpecTable head={["Constraint", "Decision"]} rows={[
          ["Demos can’t depend on the backend", "The UI runs fully on mock data when the backend is offline"],
          ["Credentials may be missing", "Backend boots in a degraded mode — weather works, Firestore endpoints return a clear 503"],
          ["Routing needs to work anywhere", "OSRM walking directions with a straight-line fallback"],
        ]} />
      ),
      system: (
        <>
          <Plate name="flow" data={FLOW.alvin} taped caption="FIG. 01 — Sensor nodes feed a FastAPI backend; the browser renders the map and the 3D twin." spec="FIG.01" />
          <Stages items={[
            ["3D city map", "Dark MapLibre GL basemap locked to BGC, Taguig, with 3D building extrusions and a clickable main building."],
            ["Interactive twin", "Building and per-room .glb models rendered with react-three-fiber."],
            ["Comfort scoring", "Every space carries a 0–100 score from temperature, humidity, airflow and noise."],
            ["Emergency routing", "One button draws a walking GPS route to a partner evacuation centre and hands off to turn-by-turn navigation."],
          ]} />
        </>
      ),
      revision: <p>In the final days of the build, the sensor node was reduced to a DHT22 only (the MQ-2 gas sensor was dropped), an in-memory datastore was added so live data flows end to end, and the firmware was consolidated into a single sketch with notes for running over a phone hotspot.</p>,
    },
  },

  /* V/012 ─ KAIA */
  {
    slug: "kaia", code: "V/012", kind: "report", year: 2026,
    name: "KAIA",
    category: ["Health systems", "Machine intelligence"],
    desc: "A prototype for cervical-health screening and care navigation that follows a woman from sample collection to completed care — and shows health offices where their screening pathway loses people.",
    tags: ["FastAPI", "PostgreSQL", "React 19", "TypeScript", "WebSockets", "Fernet"],
    period: null,
    mark: { domain: "HEALTH · AI", date: "—", status: "PROTOTYPE", cls: "CLASS: SYSTEM" },
    plate: { name: "flow", data: FLOW.kaia },
    plateCaption: "FIG. 01 — Screening-to-care pathway",
    plateNote: "4 user surfaces",
    meta: [
      ["Archive no.", "V/012"],
      ["Period", null],
      ["Stack", "React 19 · TypeScript · Vite 7 · Tailwind 4 · TanStack Query / FastAPI · SQLAlchemy 2 · Alembic · PostgreSQL"],
      ["Contribution", null],
      ["Disclaimer", "Prototype. Does not diagnose cervical cancer. All people and records are synthetic."],
    ],
    sections: {
      observation: <p>Screening is not the outcome. A screening programme succeeds only when a positive result becomes completed confirmatory care — and that is where people are lost.</p>,
      hypothesis: <p>Don’t stop at screening. Follow each woman from kit registration through point-of-care analysis, clinician-reviewed results, referral and tracked follow-up until care is <em>completed</em>, then use de-identified programme data to show where the pathway succeeds or fails.</p>,
      constraints: (
        <SpecTable head={["Constraint", "Decision"]} rows={[
          ["It must not read as a diagnosis", "Every result says “This is a screening result and is not a diagnosis.” and requires clinician review"],
          ["AI can be wrong", "Clinicians approve or override KAIA Vision with a written justification"],
          ["Population data is sensitive", "CSV export with small-cell suppression; pseudonymous follow-up lists; audit logs"],
          ["No real devices or patients", "Reader, Vision and Continuity Engine are simulated; all records synthetic"],
        ]} />
      ),
      system: (
        <>
          <Plate name="flow" data={FLOW.kaia} taped caption="FIG. 01 — The pathway does not end at a result; it ends at completed care." spec="FIG.01" />
          <SpecTable head={["Surface", "What it does"]} rows={[
            ["Patient app", "Journey tracker, kit registration with consent, results, referral with QR code, screening passport, access control over own data"],
            ["Health-worker portal", "Screening queue, reader interface, Vision review, referral worklists, follow-ups ranked by the Continuity Engine"],
            ["Institution admin", "Follow-up completion, coverage by barangay, referral completion and time to follow-up, programme gap detection"],
            ["System admin", "Registries, AI model versions (active / shadow / retired), risk-engine rule editor with dry-run, audit logs"],
          ]} />
        </>
      ),
    },
  },

  /* V/011 ─ AURA */
  {
    slug: "aura", code: "V/011", kind: "report", year: 2026,
    name: "AURA",
    category: ["Audio intelligence", "On-device ML"],
    desc: "AI-powered selective awareness. Noise cancellation removes sound by frequency and can’t tell a siren from an engine; AURA works out what each sound is and decides whether you should hear it.",
    tags: ["Source separation", "Sound classification", "Speaker embedding", "Swift", "SwiftUI", "Python"],
    period: null,
    mark: { domain: "AUDIO · ML", date: "—", status: "FILED", cls: "CLASS: SYSTEM" },
    plate: { name: "bars", data: AURA_BARS },
    plateCaption: "FIG. 02 — AURA vs noise cancellation, measured",
    plateNote: "siren +0.6 dB vs −8.0 dB",
    meta: [
      ["Archive no.", "V/011"],
      ["Period", null],
      ["Stack", "iPhone app (Swift, SwiftUI) · Python reference engine and benchmark harness · web control surface"],
      ["Hardware", "Ordinary microphones and headphones — no proprietary DSP or firmware"],
      ["Contribution", null],
    ],
    sections: {
      observation: <p>Noise cancellation removes sound by <em>frequency</em>. It cannot tell a siren from an engine, so it takes both.</p>,
      hypothesis: <p>Separate the scene into independent streams, identify what each sound is, score how relevant it is to you right now, and set its gain accordingly — keep the siren, lose the engine underneath it.</p>,
      constraints: (
        <SpecTable head={["Constraint", "Bound / rule"]} rows={[
          ["Audio deadline", { big: "20 ms" }],
          ["Safety sounds", "Never attenuated below −3 dB; quiet sirens lifted; when unsure, keep it audible"],
          ["Privacy", "No audio, transcripts or logs of what was heard are ever stored; no code path uploads audio"],
          ["Walking", "Suppression runs at 0.7× depth — over-suppression while walking is a safety problem"],
        ]} />
      ),
      system: (
        <>
          <Plate name="flow" data={FLOW.aura} taped caption="FIG. 01 — Two threads split by deadline: the audio callback, and a semantic worker for speaker ID and name awareness." spec="FIG.01" />
          <SpecTable head={["Stream", "What lands there", "Measured"]} rows={[
            [{ mono: "primary_speech" }, "The dominant voice", { big: "86%" }],
            [{ mono: "secondary_speech" }, "Competing talkers, babble", { mono: "—" }],
            [{ mono: "transient" }, "Horns, sirens, alarms, bells", { big: "100%" }],
            [{ mono: "environment" }, "Engine, road, room tone", { big: "99%" }],
          ]} />
          <Provenance>The four streams sum back to the input (verified to 153 dB). “Measured” is the share of each source landing in its stream.</Provenance>
          <p className="prose">Because engine rumble and a horn share the environment stream, one gain can’t express “drop the rumble, keep the horn”. Each decision is projected onto six shaping bands and applied with cascaded biquads — zero added latency.</p>
        </>
      ),
      experiment: (
        <SpecTable head={["Separation quality", "Interference rejection"]} rows={[
          ["Speech vs engine + crowd", { big: "+13.6 dB" }],
          ["Horn in the transient stream", { big: "+19.7 dB" }],
          ["Siren in the transient stream", { big: "+29.4 dB" }],
          ["Engine in the environment stream", { big: "+9.6 dB" }],
          ["Person Lock — enrolled speaker identified", { big: "4/4" }],
        ]} />
      ),
      result: (
        <>
          <Plate name="bars" data={AURA_BARS} caption="FIG. 02 — Noise cancellation makes the siren 8 dB harder to hear. AURA leaves it where it was while removing the engine." note="Measured" spec="FIG.02" />
          <SpecTable head={["Performance", "Value"]} rows={[
            ["Processing per 20 ms block", { big: "1.3 ms" }],
            ["Measured end-to-end latency, live", { big: "~45 ms" }],
            ["Dropouts over 600 frames", { big: "0" }],
          ]} />
          <Provenance>Latency includes CoreAudio input and output buffers and the separator’s algorithmic delay, not just compute.</Provenance>
        </>
      ),
    },
  },

  /* V/010 ─ PERSONA */
  {
    slug: "persona", code: "V/010", kind: "record", year: 2026,
    name: "Persona",
    category: ["Wellbeing", "Applied ML"],
    desc: "A wellbeing app with guided routines — sleep, breathing, deep work, hydration, wind-down — backed by an inference API that scores health metrics with a trained model.",
    tags: ["Flutter", "Firebase", "FastAPI", "CatBoost", "Cloud Run", "Open-Meteo"],
    period: "May 2026 — June 2026",
    mark: { domain: "WELL · ML", date: "26.06", status: "FILED", cls: "CLASS: APPLICATION" },
    meta: [
      ["Archive no.", "V/010"],
      ["Period", "May 2026 — June 2026"],
      ["Stack", "Flutter · Firebase / FastAPI inference API on Cloud Run / CatBoost"],
      ["Contribution", "5 of 13 commits · 5 contributors"],
    ],
    sections: {
      system: <p>Flutter can’t load scikit-learn model files, so a FastAPI service serves the models over HTTP. It exposes a health-insight endpoint and an environmental endpoint that combines live Open-Meteo weather with environmental scores. Both keep a stable JSON shape, with heuristic fallbacks until trained models are present.</p>,
      experiment: <p>The health model is CatBoost over 35 features spanning sleep, activity, heart rate, self-reported mood and stress, screen time, hydration and weather, predicting five scores: wellness, stress, energy, recovery and sleep quality. The app implements guided workflows for sleep, breathing, deep work, pomodoro, hydration, energy reset and wind-down, plus insights and a scents screen.</p>,
    },
  },

  /* V/009 ─ AILA */
  {
    slug: "aila", code: "V/009", kind: "report", year: 2026,
    name: "AILA",
    category: ["Regulatory intelligence", "LLM systems"],
    desc: "AI Legal Intelligence Assistant — an autonomous legal validation and evidence-extraction engine for UN ESCAP’s digital trade regulatory index. It crawls official government sources, extracts verbatim statutory provisions and maps them to RDTII indicators.",
    tags: ["OCR", "NLP", "LLMs", "RAG", "Semantic search", "Gemini", "Tesseract"],
    period: "May 2026 — July 2026",
    mark: { domain: "LLM · POLICY", date: "26.07", status: "FILED", cls: "CLASS: SYSTEM" },
    plate: { name: "flow", data: FLOW.aila },
    plateCaption: "FIG. 01 — Extraction and mapping pipeline",
    plateNote: "65 provisions · 7 economies",
    meta: [
      ["Archive no.", "V/009"],
      ["Event", "UN ESCAP RDTII Global Hackathon — Indicators 6 & 7: cross-border data flows, domestic data protection"],
      ["Period", "May 2026 — July 2026"],
      ["Stack", "React 18 · Vite · TypeScript / Node · Express · SQLite / Gemini 2.5 Flash · gemini-embedding-001 · Tesseract.js"],
      ["Contribution", "24 of 42 commits · 4 contributors"],
      ["Recognition", "Top 44 Global — Global Hackathon on Using AI for Digital Trade Regulatory Analysis"],
      ["Related build", "AILA MVP — Philippine regulatory monitoring with crawlers for SEC, BSP, DTI, DOJ and the Official Gazette (Next.js · FastAPI · PostgreSQL)"],
    ],
    sections: {
      observation: <p>ESCAP’s Regional Digital Trade Integration Index tracks how economies regulate the digital economy. Every cell needs a verbatim legal provision, an official citation and a rationale — and the seed database behind it can be outdated, mis-cited or incomplete.</p>,
      context: <p>Built for Round 1 of the UN ESCAP RDTII Global Hackathon, covering Indicators 6 and 7: cross-border data flows and domestic data protection. The required output is a fixed 13-column CSV, plus a supplementary technical JSON.</p>,
      hypothesis: <p>Treat the seed database as context, never as evidence. Discover official sources at runtime, extract provisions verbatim, validate them against the current law, and map them to the real indicator taxonomy. If evidence can’t be verified, flag it — don’t invent it.</p>,
      constraints: (
        <SpecTable head={["Constraint", "Decision"]} rows={[
          ["Nothing may be fabricated", "No invented URLs, sections, law numbers, amendment dates or verbatim text; unverifiable → flagged"],
          ["Official sources only", "Government → Gazette → Parliament → Attorney-General → ministries → regulators; secondary sources are never evidence"],
          ["Scanned PDFs", "OCR with Tesseract, multilingual; character error rate recorded"],
          ["Bot-blocked portals", "legislation.gov.au and AGC recovered through Internet Archive snapshots"],
          ["Hallucinated indicator IDs", "Every ID is validated against the RDTII taxonomy; invalid ones are dropped"],
        ]} />
      ),
      system: (
        <>
          <Plate name="flow" data={FLOW.aila} taped caption="FIG. 01 — Every provision is tagged KNOWN (in the seed) or NEW (independently discovered)." spec="FIG.01" />
          <p className="prose">Around the engine sits a research interface: a regulatory knowledge graph, a globe, a document archive with a needs-review filter, and a RAG assistant. Its answers cite retrieved excerpts, and confidence is discounted when retrieval is weak, so the system doesn’t overstate.</p>
        </>
      ),
      experiment: (
        <>
          <SpecTable head={["Harness", "Measures", "Gold set"]} rows={[
            [{ mono: "npm run eval" }, "RAG retrieval hit-rate, top-1 precision, grounded-rate, average confidence", { mono: "15 questions" }],
            [{ mono: "npm run eval:extract" }, "Extraction indicator F1, field accuracy, Cohen’s κ", { mono: "gold extractions" }],
          ]} />
          <Provenance>Harness outputs are not recorded in the repository. Scores: data pending.</Provenance>
        </>
      ),
      failure: (
        <SpecTable head={["Problem", "Where it showed up"]} rows={[
          ["Government portals blocking automated access", "legislation.gov.au, AGC"],
          ["RAG rate limiting, OCR queueing, DB chunk limits", "Fixed mid-build"],
          ["Validations that leaned on non-official sources", "AU / SG / MY / Thailand data"],
          ["Broken source links", "P6 / P7 / P8 indicators"],
        ]} />
      ),
      revision: <p>The last days of the build moved validation to an <em>official-only mode</em>: validations were cleaned to official sources only, Round-2 data was pulled from official portals, broken source links were fixed, and Singapore provisions were tightened to the verbatim text of the official 2020 Revised Edition.</p>,
      result: (
        <>
          <SpecTable head={["Round-1 submission file", "Value"]} rows={[
            ["Provisions", { big: "65" }],
            ["Economies", { big: "7" }],
            ["Confirmed from seed (KNOWN)", { big: "37" }],
            ["Independently discovered (NEW)", { big: "28" }],
            ["With a verbatim statutory snippet", { big: "60" }],
          ]} />
          <Provenance>Counted from server/data/round1-submission.csv — Singapore 19, Australia 16, India 13, Malaysia 10, Viet Nam 4, Thailand 2, Indonesia 1.</Provenance>
        </>
      ),
    },
  },

  /* V/008 ─ ARTEMIS */
  {
    slug: "artemis", code: "V/008", kind: "record", year: 2026,
    name: "Artemis",
    category: ["MLOps", "Model monitoring"],
    desc: "A model monitoring web application: logs predictions, tracks model versions, computes data and concept drift, visualises metrics and drift trends, and sends alerts.",
    tags: ["FastAPI", "Go · Gin", "React", "Recharts", "PostgreSQL", "Docker Compose"],
    period: null,
    mark: { domain: "MLOPS · DRIFT", date: "—", status: "FILED", cls: "CLASS: SYSTEM" },
    meta: [
      ["Archive no.", "V/008"],
      ["Period", null],
      ["Stack", "Python FastAPI · Go (Gin) · React + Recharts · PostgreSQL · Docker Compose"],
      ["Disclosure", "Standalone builds. Related to MLOps work (EXP/003); no internal systems are described."],
    ],
    sections: {
      system: (
        <Stages items={[
          ["Python API", "ML logic, JWT auth, drift detection and alerting to a webhook and optional SMTP email."],
          ["Go API", "Fast endpoints for prediction logging, metrics and drift retrieval."],
          ["Dashboard", "React and Recharts: model metrics, versions and drift trends."],
          ["Storage", "PostgreSQL for predictions, drift events, metrics and model versions."],
        ]} />
      ),
      experiment: <p>The minimal build detects drift with a two-sample Kolmogorov–Smirnov test between a baseline and the current window, flagging drift at p &lt; 0.05 and reporting 1 − p as a score.</p>,
    },
  },

  /* V/007 ─ ENVIRONMENTAL AUTOPILOT */
  {
    slug: "environmental-autopilot", code: "V/007", kind: "record", year: 2026,
    name: "Environmental Autopilot",
    category: ["Smart campus", "Closed-loop control"],
    desc: "A smart-campus platform that continuously senses, predicts, decides, acts and learns — simulated IoT streams per zone, automatic interventions, and a learning loop that updates action policy from measured impact.",
    tags: ["Node.js", "WebSockets", "Simulation", "Forecasting", "Adaptive policy"],
    period: "April 2026",
    mark: { domain: "IOT · CONTROL", date: "26.04", status: "FILED", cls: "CLASS: SIMULATION" },
    meta: [
      ["Archive no.", "V/007"],
      ["Also filed as", "Verdent · Project Sentinel"],
      ["Period", "April 2026"],
      ["Stack", "Node.js server with HTTP + WebSocket · map dashboard"],
      ["Contribution", "6 of 18 commits · 4 contributors"],
    ],
    sections: {
      system: (
        <Stages items={[
          ["Sense", "Per-zone CO₂, temperature and humidity streams, updated every tick."],
          ["Decide", "Rule-based risk evaluation with adaptive action scoring, explained in an intervention log."],
          ["Act", "Autopilot mode applies interventions continuously; before/after impact is measured."],
          ["Learn", "Action rewards update from measured effectiveness; a trend forecast predicts risk ahead."],
        ]} />
      ),
      experiment: <p>Scenario controls vary crowd density, outside temperature and weather intensity so the loop can be tested against conditions it hasn’t seen.</p>,
    },
  },

  /* V/006 ─ STELLA */
  {
    slug: "stella", code: "V/006", kind: "record", year: 2026,
    name: "STELLA",
    category: ["Personal assistant", "Human–computer interaction"],
    desc: "A voice- and gesture-controlled personal assistant for macOS that authenticates its owner by face and voice, runs in the background, and learns routines — offline by default.",
    tags: ["Python", "Speech", "Gesture recognition", "Face + voice auth", "GPT4All"],
    period: null,
    mark: { domain: "AI · MACOS", date: "—", status: "FILED", cls: "CLASS: APPLICATION" },
    meta: [
      ["Archive no.", "V/006"],
      ["Period", null],
      ["Platform", "macOS — runs as a LaunchAgent, starts on login"],
      ["Contribution", null],
    ],
    sections: {
      experiment: (
        <SpecTable head={["Capability", "Detail"]} rows={[
          ["Owner authentication", "Facial and voice recognition"],
          ["Voice commands", "Open apps, control volume and brightness, take screenshots"],
          ["Gesture control", "Hand-gesture recognition for hands-free control"],
          ["Self-adaptive", "Learns routines and suggests actions"],
          ["Privacy-first", "Works offline; optional local GPT4All for reasoning"],
        ]} />
      ),
    },
  },

  /* V/005 ─ ANCHOR */
  {
    slug: "anchor", code: "V/005", kind: "record", year: 2026,
    name: "Anchor",
    category: ["Social impact", "AI platform"],
    desc: "AI-powered protection platform for Overseas Filipino Workers: verify job offers, analyse employment contracts with AI, receive real-time safety alerts, and connect with support.",
    tags: ["Flutter", "React", "TypeScript", "Firebase", "Cloud Functions"],
    period: "March 2026 — May 2026",
    mark: { domain: "OFW · SAFETY", date: "26.05", status: "FILED", cls: "CLASS: PLATFORM" },
    meta: [
      ["Archive no.", "V/005"],
      ["Period", "March 2026 — May 2026"],
      ["Stack", "Flutter mobile app / React + TypeScript + Vite + Tailwind web platform / Firebase Auth, Firestore, Storage, Cloud Functions"],
      ["Contribution", "18 of 59 commits · 6 contributors"],
    ],
    sections: {
      system: (
        <Stages items={[
          ["Mobile app", "Flutter, Android and iOS — the worker’s side."],
          ["Web platform", "React admin / NGO platform."],
          ["AI services", "Model integrations for contract analysis and offer verification."],
          ["Firebase", "Email and Google auth, Firestore, Storage, Cloud Functions and security rules."],
        ]} />
      ),
    },
  },

  /* V/004 ─ HERA */
  {
    slug: "hera", code: "V/004", kind: "record", year: 2026,
    name: "HERA",
    category: ["Maternal health", "AI platform"],
    desc: "A maternal-health monitoring platform connecting midwives, doctors and administrators, with AI risk assessment and analytics.",
    tags: ["Flutter", "Next.js", "FastAPI", "Firebase"],
    period: "February 2026",
    mark: { domain: "HEALTH · ML", date: "26.02", status: "EARLY", cls: "CLASS: PLATFORM" },
    meta: [
      ["Archive no.", "V/004"],
      ["Period", "February 2026"],
      ["Stack", "Flutter (midwives) · Next.js (doctors, admins) · FastAPI AI services · Firebase"],
      ["Contribution", "3 of 9 commits · 3 contributors"],
      ["Status", "Early stage — monorepo structure established"],
    ],
    sections: {
      system: (
        <Stages items={[
          ["Mobile", "Flutter app for midwives: field data collection and patient monitoring."],
          ["Web", "Dashboard for doctors and administrators: analysis, AI insights, patient management."],
          ["AI services", "FastAPI for risk assessment and predictive analytics."],
        ]} />
      ),
    },
  },

  /* V/003 ─ NEUROTRACE */
  {
    slug: "neurotrace", code: "V/003", kind: "record", year: 2026,
    name: "NeuroTrace AI",
    category: ["Digital biomarkers", "Mobile health"],
    desc: "Early detection of microplastic-related neurological effects from smartphone tests — cognitive, motor, reaction-time and speech — as digital neurobehavioural biomarkers.",
    tags: ["Flutter", "FastAPI", "PostgreSQL", "Feature extraction", "ML"],
    period: "January 2026",
    mark: { domain: "NEURO · ML", date: "26.01", status: "FILED", cls: "CLASS: RESEARCH APP" },
    meta: [
      ["Archive no.", "V/003"],
      ["Period", "January 2026"],
      ["Stack", "Flutter (iOS · Android · web) · FastAPI · PostgreSQL · multi-modal feature extraction"],
      ["Contribution", "7 of 7 commits · solo"],
    ],
    sections: {
      experiment: (
        <SpecTable head={["Test", "Signal"]} rows={[
          ["Reaction time", "High-precision response timing"],
          ["Cognitive memory", "N-back and other memory tasks"],
          ["Motor control", "Path tracing; finger tapping with bilateral hand comparison"],
          ["Speech", "Recorded audio for voice biomarkers"],
          ["Exposure survey", "Microplastic exposure assessment"],
        ]} />
      ),
    },
  },

  /* V/002 ─ DRIFT-AWARE HEAVY HITTERS */
  {
    slug: "drift-aware-heavy-hitters", code: "V/002", kind: "report", year: 2026,
    name: "Drift-aware heavy hitters",
    titleBreak: ["Drift-aware", "heavy hitters"],
    category: ["Algorithms", "Data streams", "Research"],
    desc: "A streaming algorithm for estimating item frequency under concept drift: Count-Min Sketch extended with exponential decay, with heap-based candidate selection. O(d) update time, O(w·d) memory.",
    tags: ["Count-Min Sketch", "Exponential decay", "Heap-based candidate selection", "Streaming algorithms", "Concept drift"],
    period: "December 2025 — February 2026",
    mark: { domain: "ALG · STREAM", date: "26.02", status: "FILED", cls: "CLASS: RESEARCH" },
    plate: { name: "dahh-chart" },
    plateCaption: "FIG. 02 — Frequency under drift (illustrative model)",
    plateNote: "O(d) · O(w·d)",
    meta: [
      ["Archive no.", "V/002"],
      ["Period", "December 2025 — February 2026"],
      ["Concepts", "Count-Min Sketch · Exponential decay · Heap-based candidate selection · Streaming algorithms · Concept drift"],
      ["Bounds", "Update O(d) · Memory O(w·d)"],
      ["Paper / code", null],
    ],
    partial: ["result"],
    sections: {
      observation: <p>A standard Count-Min Sketch never forgets. Every item it has seen keeps its full weight, so when the distribution of a stream shifts, yesterday’s heavy hitters keep outranking today’s — sometimes for a long time.</p>,
      context: <p>Heavy-hitter detection answers <em>what is frequent</em> in a stream too large to store. In a stream that changes — concept drift — the useful question is <em>what is frequent now</em>. An estimator that can’t tell the two apart reports the past as the present.</p>,
      hypothesis: <p>Extend Count-Min Sketch with exponential decay, so each observation’s contribution shrinks with age. Frequency estimates then follow the recent stream in real time, without storing it. A heap keeps the current top candidates.</p>,
      constraints: (
        <SpecTable head={["Constraint", "Bound", "Why it binds"]} rows={[
          ["Single pass over the stream", { big: "1×" }, "Items arrive once and are not stored; there is no replay."],
          ["Work per arrival", { big: "O(d)" }, "One counter update per hash row. It has to keep pace with the stream in real time."],
          ["State", { big: "O(w·d)" }, "A fixed grid of counters, independent of how many distinct items appear."],
          ["Estimates, not counts", { big: "f̂ ≥ f" }, "Count-Min answers are approximate. Hash collisions only ever inflate a counter."],
        ]} />
      ),
      system: (
        <>
          <Plate name="hero-sketch" taped caption="FIG. 00 — Each arrival touches one counter per row. Counters decay; the minimum across rows is the estimate." note="Schematic" spec="FIG.00" />
          <Stages items={[
            ["Sketch", "A d × w grid of counters. Each of the d rows has its own hash function mapping an item to one of w counters."],
            ["Decay", "Counters decay exponentially with time, so older observations weigh less than recent ones."],
            ["Estimate", "An item’s frequency is read as the minimum of its d counters, which is the least-collided view."],
            ["Candidates", "A heap keyed on estimated frequency holds the current heavy-hitter candidates."],
          ]} />
          <div>
            <pre className="code" aria-label="Illustrative pseudocode"><span className="c"># on each arrival x at time t</span>{"\n"}<span className="k">for</span> i <span className="k">in</span> 1..d:                          <span className="c"># d rows → O(d)</span>{"\n"}    j ← hᵢ(x){"\n"}    C[i][j] ← decay(C[i][j], t) + 1{"\n"}f̂ ← <span className="k">min</span>ᵢ C[i][hᵢ(x)]                    <span className="c"># Count-Min estimate</span>{"\n"}update candidate heap with (x, f̂)</pre>
            <p className="code-cap m m--xs muted"><span>Illustrative pseudocode — describes the stated design, not the project source.</span><span style={{ textTransform: "none" }}>decay(c, t) = c · e^(−λ·Δt)</span></p>
          </div>
        </>
      ),
      experiment: (
        <>
          <SpecTable head={["Component", "Technique", "Status"]} rows={[
            ["Count-Min Sketch extension", { mono: "Exponential decay" }, { mono: "Implemented" }],
            ["Real-time frequency estimation", { mono: "Streaming" }, { mono: "Implemented" }],
            ["Candidate selection", { mono: "Heap-based" }, { mono: "Implemented" }],
            ["Datasets and drift scenarios", { mono: "—" }, { pending: true }],
          ]} />
          <Plate name="dahh-chart" caption="FIG. 02 — How decay changes who is on top after drift. Illustrative model; the rates are chosen to show the mechanism." note="Not experimental data" spec="FIG.02" />
        </>
      ),
      result: (
        <SpecTable head={["Measure", "Value", "Source"]} rows={[
          ["Update time per arrival", { big: "O(d)" }, { mono: "CV" }],
          ["Memory", { big: "O(w·d)" }, { mono: "CV" }],
          ["Accuracy under drift", { pending: true }, { mono: "—" }],
          ["Throughput", { pending: true }, { mono: "—" }],
          ["Comparison with baselines", { pending: true }, { mono: "—" }],
        ]} />
      ),
    },
  },

  /* V/001 ─ PULSE */
  {
    slug: "pulse", code: "V/001", kind: "record", year: 2025,
    name: "Pulse",
    category: ["Health systems", "LLM applications"],
    desc: "An AI-powered smart hospital management system with a Gemini assistant for medical inquiries, symptom guidance, conversational appointment booking and hospital information.",
    tags: ["Flutter", "Firebase", "Google Gemini"],
    period: "October 2025 — February 2026",
    mark: { domain: "HEALTH · LLM", date: "26.02", status: "FILED", cls: "CLASS: APPLICATION" },
    meta: [
      ["Archive no.", "V/001"],
      ["Period", "October 2025 — February 2026"],
      ["Stack", "Flutter · Firebase · Google Gemini"],
      ["Contribution", "60 of 86 commits · 5 contributors"],
      ["Repository", "FerosC101/Pulse"],
    ],
    sections: {
      system: <p>Traditional hospital-management features in a Flutter app on Firebase, with Google Gemini as a context-aware assistant: it answers health questions, helps users understand symptoms with general guidance, books appointments conversationally, and answers questions about hospital services and departments.</p>,
    },
  },
];

export const projectBySlug = slug => PROJECTS.find(p => p.slug === slug);
/* Homepage spreads, in order. */
export const FEATURED_SLUGS = ["aila", "aura", "drift-aware-heavy-hitters", "alvin", "harvestguard"];
export const FEATURED = FEATURED_SLUGS.map(projectBySlug);
export const OTHERS = PROJECTS.filter(p => !FEATURED_SLUGS.includes(p.slug));
/* "2025—26" style year label from the period */
export const yearOf = p => {
  const ys = [...new Set((p.period || "").match(/20\d\d/g) || [])];
  return ys.length === 0 ? null : ys.length === 1 ? ys[0] : `${ys[0]}—${ys.at(-1).slice(2)}`;
};
