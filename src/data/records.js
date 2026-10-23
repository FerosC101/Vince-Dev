/* Verified records — source: CV. Do not add facts that aren't in source material. */

export const EXPERIENCE = [
  {
    id: "EXP/003",
    anchor: "exp-003",
    org: "GCash / Mynt, Inc.",
    role: "Machine Learning Operations Engineer Intern",
    period: "April 2026 — August 2026",
    short: "Apr 2026 — Aug 2026",
    desc: "Worked on machine-learning operations workflows focused on production model monitoring, reliability, reproducibility and deployment scalability.",
    manifest: [
      ["Monitoring", "Model monitoring · Data drift · Model drift · Model health reporting"],
      ["Data", "Data preprocessing"],
      ["Reproducibility", "Model versioning · Experiment tracking"],
      ["Orchestration", "DAG configuration management · MLOps workflows"],
      ["Disclosure", "Internal systems, data and implementation details are not described here.", true],
    ],
    tags: ["Model monitoring", "Data drift", "Model drift", "Model health reporting", "Data preprocessing", "Model versioning", "Experiment tracking", "DAG configuration", "MLOps workflows"],
  },
  {
    id: "EXP/002",
    anchor: "exp-002",
    org: "Universal Steel Smelting Co., Inc.",
    role: "Web Developer",
    period: "January 2026 — March 2026",
    short: "Jan 2026 — Mar 2026",
    desc: "Responsive web development with attention to accessibility, usability, performance, cross-browser compatibility and deployment.",
    manifest: [
      ["Stack", "HTML · CSS · JavaScript"],
      ["Quality", "Accessibility · Usability · Performance · Cross-browser compatibility"],
      ["Delivery", "Deployment"],
    ],
    tags: ["Responsive web", "HTML", "CSS", "JavaScript", "Accessibility", "Usability", "Performance", "Cross-browser", "Deployment"],
  },
  {
    id: "EXP/001",
    anchor: "exp-001",
    org: "DevFlex",
    role: "Backend Developer",
    period: "May 2025 — August 2025",
    short: "May 2025 — Aug 2025",
    desc: "Developed scalable backend systems and integrated them with frontend and mobile applications.",
    manifest: [
      ["Services", "Backend systems · APIs"],
      ["Data", "PostgreSQL · MySQL · Database architecture"],
      ["Integration", "System integration with frontend and mobile applications"],
    ],
    tags: ["Backend systems", "APIs", "PostgreSQL", "MySQL", "Database architecture", "System integration"],
  },
];

export const INVENTORY = [
  { crate: "Crate A", title: "Programming", items: ["Python", "JavaScript", "Dart", "Kotlin", "Java", "Go"] },
  { crate: "Crate B", title: "Application systems", items: ["Flutter", "Android SDK", "Firebase", "REST APIs", "HTML", "CSS"] },
  { crate: "Crate C", title: "Data", items: ["Excel", "Power BI", "Tableau", "Pandas", "NumPy", "Data cleaning", "Visualization", "Statistics"] },
  { crate: "Crate D", title: "Operations", items: ["Git", "Jira", "Scrum", "Kanban"] },
];

export const OPERATOR = [
  ["Name", "Vince Anjo R. Villar"],
  ["Discipline", "Bachelor of Science in Computer Science"],
  ["Institution", "Batangas State University — The National Engineering University"],
  ["Education", "2023 — 2027"],
  ["Location", "Batangas City, Batangas"],
  ["Academic / Community record", ["Dean’s Lister", "Shell MSP Scholar", "AWS e:Novator Ambassador"]],
];

/* Competition record — source: Vince's own list (2026-09-30). Oldest first.
   champion: printed in signal orange. hackathon: counts toward the ×N hackathon record.
   project: slug of the archive entry built for it (only where the repo confirms it). */
const REC_RAW = [
  { event: "World Engineering Day 2025 STM32 Hackathon", result: "Champion", place: "Batangas City, Batangas", date: "March 5, 2025", year: 2025, champion: true, hackathon: true, short: "WED STM32" },
  { event: "Technofusion BI Dashboard Challenge", result: "Champion", place: "Batangas City, Batangas", date: "April 2025", year: 2025, champion: true, short: "BI Dashboard" },
  { event: "Technofusion 2025 Hackathon", result: "2nd runner-up", place: "Batangas City, Batangas", date: "April 2025", year: 2025, short: "Technofusion" },
  { event: "BPI DataWave 2025", result: "Top 6", detail: "Finalist", place: "Makati City, Metro Manila", date: "July — September 2025", year: 2025, short: "DataWave" },
  { event: "Inventi Hackathon Challenge 2025", result: "Champion", place: "Makati City, Metro Manila", date: "September 2025", year: 2025, champion: true, hackathon: true, short: "Inventi" },
  { event: "DICT Philippine Startup X Challenge — Regional Pitching, CALABARZON", result: "1st runner-up", detail: "Best Pitch Presentation", place: "Batangas City, Batangas", date: "November 4, 2025", year: 2025, short: "Startup X" },
  { event: "GCash ImaGnation 2025", result: "Top 10", detail: "Finalist", place: "Taguig City, Metro Manila", date: "November 20, 21 & 24, 2025", year: 2025, short: "ImaGnation" },
  { event: "10th Huawei ICT Competition 2025 — National Finals, Innovation Track", result: "2nd prize", place: "Mandaluyong City, Metro Manila", date: "December 5, 2025", year: 2025, national: true, short: "Huawei ICT" },
  { event: "Philippine Innovation Conference 2025 — Hack the Future: Smart Batangas Province Hackathon", result: "Champion", place: "Batangas City, Batangas", date: "December 2025", year: 2025, champion: true, hackathon: true, short: "Smart Batangas" },
  { event: "L’Oréal Brandstorm 2026", result: "Top 24", detail: "Semi-finalist", place: "Mandaluyong City, Metro Manila", date: "January — April 2026", year: 2026, short: "Brandstorm" },
  { event: "World Engineering Day 2026 Hackathon", result: "Participant", detail: "International level", level: "International", place: null, date: "January — March 2026", year: 2026, short: "WED 2026" },
  { event: "SustainaXion: The X-Factor to Sustainability in Action", result: "Champion", place: "Batangas City, Batangas", date: "March 5, 2026", year: 2026, champion: true, hackathon: true, short: "SustainaXion" },
  { event: "Technofusion 2026", result: "Champion", place: null, date: "April — May 2026", year: 2026, champion: true, hackathon: true, short: "Technofusion" },
  { event: "Global Hackathon on Using AI for Digital Trade Regulatory Analysis", result: "Top 44", detail: "Global", level: "International", place: null, date: "April — October 2026", year: 2026, project: "aila", short: "UN ESCAP" },
  { event: "IoT Conference Philippines — packetHacks × Hack the Climate", result: "3rd runner-up", place: "Pasay City, Metro Manila", date: "June — September 2026", year: 2026, short: "packetHacks" },
  { event: "AppCon 2026", result: "Best pitching", place: null, date: "September 23–25, 2026", year: 2026, project: "legacylens", short: "AppCon" },
  { event: "STM32 National Hackathon 2026", result: "1st runner-up", national: true, place: "Alabang, Las Piñas", date: "September 24, 2026", year: 2026, short: "STM32 National" },
];

/* REC/001 is the aggregate hackathon record; individual records are REC/002 onward, oldest first. */
export const RECOGNITION = REC_RAW.map((r, i) => ({
  ...r,
  id: `REC/${String(i + 2).padStart(3, "0")}`,
  rot: [-2, 1.5, -1, 2.4, -1.6, 0.8, -2.6, 1.2][i % 8],
}));

export const HACKATHON_WINS = RECOGNITION.filter(r => r.hackathon);
export const CHAMPIONSHIPS = RECOGNITION.filter(r => r.champion);
export const INTERNATIONAL = RECOGNITION.filter(r => r.level === "International");
export const NATIONAL_AWARDS = RECOGNITION.filter(r => r.national);
/* finalist and awardee placements: every result that isn't a championship or plain participation */
export const PLACEMENTS = RECOGNITION.filter(r => !r.champion && r.result !== "Participant");
export const recByProject = slug => RECOGNITION.filter(r => r.project === slug);

export const LOG_CATEGORIES = ["BUILD LOG", "FIELD NOTE", "RESEARCH NOTE", "HACKATHON", "EXPERIMENT", "POSTMORTEM"];

/* Newest first. id → LOG/YY.MM.DD */
export const LOG = [
  {
    id: "26.09.30",
    date: "30 Sep 2026 · Batangas",
    category: "FIELD NOTE",
    title: "Archive opened",
    body: [
      "First public version of this field archive. Entries are filed as they are documented, with an archive number, an evidence mark and whatever material exists: sketches, results, notes.",
      "Anything that could not be verified from source material is marked DATA PENDING rather than filled in. Those gaps are the backlog.",
    ],
    margin: "Margin — The graveyard is open too. Failed ideas get filed with the same care as shipped ones.",
  },
];

/* Filed by the author only. Shape: { id, name, cause, why, survived } */
export const GRAVEYARD = [];
export const GRAVEYARD_RESERVED = 3;
