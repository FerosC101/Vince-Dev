/* The visual layer for each archive entry: what a visitor sees first.
   Facts live in projects.jsx; this file decides how they are shown.

   oneLiner  — the single idea (homepage + grid)
   question  — the opening line of the case page
   hero      — { img } | { plate, data } — first full-width visual
   thumb     — grid image (omit for a text-only tile)
   tile      — grid shape: "xl" | "tall" | "wide" | "sm" | "text"
   screens   — one idea per screen on the case page
   result    — one concise paragraph                                           */
import { ClauseCard, Drawing, Shot, TypeFlow, Words } from "../components/Visual.jsx";
import { FLOW } from "./projects.jsx";

const W = "/work/";

const AURA_BARS = {
  fig: "", title: "SIREN, SPEECH AND ENGINE BANDS — MEASURED ON THE PSC DEMO SCENE",
  series: ["AURA", "Noise cancellation"],
  rows: [
    ["Engine / rumble 20–300 Hz", -8.7, -18.4],
    ["Speech clarity 1–4 kHz", 0.0, -7.8],
    ["Horn / siren 400–3500 Hz", -0.6, -9.0],
    ["Siren audibility", 0.6, -8.0],
  ],
  min: -20, max: 5,
  note: "SOURCE: scripts/bench_end_to_end.py, AS REPORTED IN THE PROJECT README.",
};

const AURA_LANES = {
  lanes: [
    ["primary_speech", "the dominant voice", "86%", "speech"],
    ["secondary_speech", "competing talkers, babble", null, "babble"],
    ["transient", "horns, sirens, alarms, bells", "100%", "transient", true],
    ["environment", "engine, road, room tone", "99%", "env"],
  ],
};

export const CASES = {
  aila: {
    oneLiner: "Fragmented regulation, made searchable.",
    question: "Can fragmented regulation become searchable intelligence?",
    hero: { img: W + "aila-globe.jpg", alt: "AILA’s regulatory globe, a dotted world map in the dark interface", tone: "dark" },
    thumb: W + "aila-network.jpg",
    screens: [
      {
        k: "Input",
        visual: <ClauseCard />,
        words: ["PDF", "Scan", "Regulation"],
        note: "A real extraction: Singapore’s Personal Data Protection Act 2012, s. 3, mapped to indicator P7-I1.",
      },
      {
        k: "Intelligence",
        visual: (
          <>
            <TypeFlow steps={["Discover", "Retrieve", "OCR", "Extract", "Map"]} accent={[3]} />
            <Shot src={W + "aila-network.jpg"} alt="AILA network view: jurisdictions as nodes, regulations clustered around them" tone="dark" ratio="16 / 10" />
          </>
        ),
        note: "Official sources only. If the text can’t be verified, it’s flagged — never invented.",
      },
      {
        k: "Output",
        visual: <Shot src={W + "aila-archive.jpg"} alt="AILA document archive: extracted clauses with section numbers, verbatim quotes and mapped indicators" tone="dark" ratio="16 / 10" pos="50% 0%" />,
        words: ["Searchable", "Traceable", "Comparable"],
      },
    ],
    result: "65 statutory provisions across 7 economies, 60 of them with verbatim text and 28 discovered independently of the seed database. Top 44 globally at the Global Hackathon on Using AI for Digital Trade Regulatory Analysis.",
  },

  aura: {
    oneLiner: "Hear what matters. Silence what doesn’t.",
    question: "Can headphones tell a siren from an engine?",
    hero: { img: W + "aura-demo.jpg", alt: "AURA running the PSC demo scene: engine noise suppressed by 16 dB, emergency siren preserved", tone: "dark" },
    thumb: W + "aura-demo.jpg",
    screens: [
      {
        k: "Separate",
        visual: <Drawing name="streams" data={AURA_LANES} />,
        note: "Four streams that sum back to the input. The siren lands entirely in the transient stream.",
      },
      {
        k: "Decide",
        visual: <Words items={["Preserved", "Enhanced", "Reduced", "Suppressed"]} />,
        note: "A safety sound is never pushed below −3 dB, whatever the mode or the user asks.",
      },
      {
        k: "Measure",
        visual: <Drawing name="bars" data={AURA_BARS} />,
        words: ["1.3 ms", "of a 20 ms budget"],
      },
    ],
    result: "Noise cancellation makes a siren 8 dB harder to hear. AURA leaves it where it was (+0.6 dB) while taking 8.7 dB out of the engine underneath — at about 45 ms end-to-end latency, on ordinary microphones and headphones.",
  },

  "drift-aware-heavy-hitters": {
    oneLiner: "Frequency estimation that forgets on purpose.",
    question: "What is frequent now — not ever?",
    hero: { plate: "landscape", data: { ridges: 30 }, tone: "paper" },
    thumbPlate: { name: "landscape", data: { ridges: 16, label: false, accent: 10 } },
    screens: [
      {
        k: "Sketch",
        visual: <Drawing name="hero-sketch" />,
        words: ["O(d)", "O(w·d)"],
        note: "d hash rows of w counters. Each arrival touches one counter per row.",
      },
      {
        k: "Drift",
        visual: <Drawing name="dahh-chart" />,
        note: "Illustrative model. With decay, the new heavy hitter takes over shortly after drift; plain counts lag behind.",
      },
    ],
    result: "Count-Min Sketch extended with exponential decay and heap-based candidate selection: real-time frequency estimation under concept drift in O(d) time per update and O(w·d) memory. Benchmarks are still to be filed.",
  },

  alvin: {
    oneLiner: "Where should I be right now?",
    question: "Where should I be right now — and where do I go if something goes wrong?",
    hero: { img: W + "alvin-map.jpg", alt: "ALVIN map overview: dark 3D city map of BGC with comfort recommendations and a walking route", tone: "dark" },
    thumb: W + "alvin-twin.jpg",
    screens: [
      {
        k: "Sense",
        visual: <TypeFlow steps={["ESP32", "FastAPI", "Comfort score", "Route"]} accent={[2]} />,
        words: ["Temperature", "Humidity"],
        note: "Every space carries a 0–100 comfort score, computed live.",
      },
      {
        k: "Twin",
        visual: (
          <div className="pair">
            <Shot src={W + "alvin-twin.jpg"} alt="ALVIN digital twin: 3D building model with a building-status comfort gauge" tone="dark" ratio="4 / 5" pos="38% 50%" />
            <Shot src={W + "alvin-analytics.jpg"} alt="ALVIN analytics: temperature and humidity trends and sensor-node status" tone="dark" ratio="4 / 5" pos="30% 50%" />
          </div>
        ),
      },
    ],
    result: "A working twin that runs on live sensor data end to end — reduced in the final days to a DHT22-only node with an in-memory datastore — and falls back to mock data so it never breaks mid-demo.",
  },

  harvestguard: {
    oneLiner: "Early spoilage intelligence.",
    question: null,
    pendingVisual: true,
    thumb: null,
  },

  kaia: {
    oneLiner: "Screening doesn’t end at a result.",
    question: "What happens after a screening result?",
    hero: { img: W + "kaia.jpg", alt: "KAIA landing page with a patient journey tracker from kit registered to follow-up", tone: "light" },
    thumb: W + "kaia.jpg",
    screens: [{ k: "Pathway", visual: <TypeFlow steps={["Collect", "Reader", "Vision", "Review", "Referral", "Completed care"]} accent={[5]} /> }],
  },

  "code-golf": {
    oneLiner: "Make it shorter. Make it work.",
    question: "How do you run a fair code-golf night on untrusted code?",
    hero: { img: W + "golf.jpg", alt: "Code Golf landing page: pixel-art wordmark and a snake mascot on a putting green", tone: "dark" },
    thumb: W + "golf.jpg",
    screens: [{ k: "Practice", visual: <Shot src={W + "golf-practice.jpg"} alt="Code Golf practice range" tone="dark" ratio="16 / 9" pos="50% 0%" /> }],
  },

  legacylens: {
    oneLiner: "Make history usable.",
    question: "Can a phone turn a century-old page into reviewable data?",
    hero: { img: W + "legacylens-gazetteer.jpg", alt: "A page from a 1901 Philippine gazetteer used as a LegacyLens demo record", tone: "paper", pos: "50% 30%" },
    thumb: W + "legacylens-ios.jpg",
    screens: [{
      k: "Review",
      visual: (
        <div className="pair pair--phones">
          <Shot src={W + "legacylens-ios.jpg"} alt="LegacyLens on iPhone: Make history usable" ratio="9 / 19" fit="cover" pos="50% 0%" />
          <Shot src={W + "legacylens-android.jpg"} alt="LegacyLens on Android" ratio="9 / 19" fit="cover" pos="50% 0%" />
        </div>
      ),
    }],
  },

  altair: {
    oneLiner: "Recommendations that have to prove themselves.",
    question: "Can an algorithm recommendation prove itself?",
    hero: { plate: "flow", data: FLOW.altair, tone: "paper" },
    thumb: null,
  },

  outplay: {
    oneLiner: "What can we learn from how you compete?",
    question: "What can we learn from how you compete?",
    hero: { img: W + "outplay.jpg", alt: "Outplay mockup: competitive DNA radar chart and next-match intelligence", tone: "dark" },
    thumb: W + "outplay.jpg",
  },

  "vince-life-os": {
    oneLiner: "The chat is the interface.",
    question: "What if logging your day was just telling it?",
    hero: { img: W + "vince-early.jpg", alt: "An earlier build of the Vince app: Bauhaus-style sign-in screen", tone: "light", fit: "contain" },
    thumb: W + "vince-early.jpg",
    heroCaption: "An earlier build, before the Bauhaus language was replaced.",
  },

  rani: {
    oneLiner: "Move money with plain language.",
    question: "Can a payment be a sentence?",
    hero: { img: W + "rani.jpg", alt: "Rani welcome screen: Talk to Stellar, connect Freighter wallet", tone: "dark" },
    thumb: W + "rani.jpg",
  },

  persona: {
    oneLiner: "Guided routines, scored by a model.",
    question: "Can wellness routines respond to real health signals?",
    hero: { img: W + "persona.jpg", alt: "Persona welcome screen: your AI-powered wellness companion", tone: "dark", fit: "contain" },
    thumb: W + "persona.jpg",
  },

  hera: {
    oneLiner: "Maternal health, from the field to the doctor.",
    question: "Can a midwife’s field data reach a doctor as a risk signal?",
    hero: { img: W + "hera-ultrasound.jpg", alt: "An ultrasound image from HERA’s AI training data", tone: "dark", fit: "contain" },
    thumb: W + "hera-ultrasound.jpg",
    heroCaption: "From the AI-services training data.",
  },

  artemis: { oneLiner: "Is the model still seeing the data it learned from?", question: "Is the model still seeing the data it learned from?", thumb: null },
  "environmental-autopilot": { oneLiner: "Sense, predict, decide, act, learn.", question: "Can a campus manage its own air?", thumb: null },
  stella: { oneLiner: "An assistant that knows it’s you.", question: "Can a Mac assistant know it’s you?", thumb: null },
  anchor: { oneLiner: "Protection for Overseas Filipino Workers.", question: "Can a job offer be checked before it’s signed?", thumb: null },
  neurotrace: { oneLiner: "Neurological signals from phone tests.", question: "Can a phone test catch subtle neurological change?", thumb: null },
  pulse: { oneLiner: "A hospital with an assistant.", question: "Can a hospital’s front desk be a conversation?", thumb: null },
};

/* Grid shapes for OTHER THINGS/ — an irregular rhythm, not a card grid. */
export const TILES = {
  aila: "xl", aura: "tall", "drift-aware-heavy-hitters": "wide", alvin: "sm",
  kaia: "xl", "code-golf": "tall", legacylens: "tall", altair: "text", outplay: "wide",
  "vince-life-os": "sm", rani: "sm", persona: "sm", hera: "sm", artemis: "text",
  "environmental-autopilot": "text", stella: "text", anchor: "text", neurotrace: "text", pulse: "text",
};
