"use client";
import PopUpScene from "@/components/PopUp/PopUpScene";
import PopUpLayer from "@/components/PopUp/PopUpLayer";
import { useBookStore } from "@/store/useBookStore";
import s from "./Chapterthreescene.module.css";

const svg = {
  viewBox: "0 0 300 400",
  preserveAspectRatio: "xMidYMax slice",
  width: "100%",
  height: "100%",
  "aria-hidden": true,
};

const INK = "#2b2118";
const TEAL = "#1f5f5b";
const ORANGE = "#d9622b";
const MUSTARD = "#e3a72f";
const PINK = "#f2b8b0";
const PAPER = "#fffaf0";
const DARK = "#16302e";
const MONO = "ui-monospace, Consolas, monospace";

// method colours, one per HTTP verb
const GET = { t: "GET", bg: TEAL, fg: PAPER };
const POST = { t: "POST", bg: ORANGE, fg: PAPER };
const PUT = { t: "PUT", bg: MUSTARD, fg: INK };
const DELETE = { t: "DELETE", bg: PINK, fg: INK };

const SAVED = [
  { m: GET, name: "List tasks" },
  { m: POST, name: "Add user" },
  { m: PUT, name: "Update item" },
];

// what the response panel types out
const JSON_LINES = [
  { x: 168, t: "{" },
  { x: 176, t: '"tasks": 12,' },
  { x: 176, t: '"env": "dev",' },
  { x: 176, t: '"ok": true' },
  { x: 168, t: "}" },
];

// the method pill on the main toolbar cycles through all four verbs
const CYCLE = [GET, POST, PUT, DELETE];

export default function ChapterThreeScene() {
  // Back of sheet 5 (left page) → shows once 5 sheets are flipped
  const visible = useBookStore((st) => st.flipped >= 5);
  const on = visible ? ` ${s.on}` : "";

  return (
    <PopUpScene showAt={5}>
      {/* 1. DESKTOP WALLPAPER + CODE RAIN */}
      <PopUpLayer flat>
        <svg {...svg}>
          <defs>
            <linearGradient id="c3-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1f5f5b" />
              <stop offset="1" stopColor="#0f3330" />
            </linearGradient>
            <pattern id="c3-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0 H0 V20" fill="none" stroke="#7fd6c9" strokeWidth="0.6" opacity="0.16" />
            </pattern>
          </defs>
          <rect width="300" height="400" fill="url(#c3-bg)" />
          <rect width="300" height="400" fill="url(#c3-grid)" />

          {/* floating verbs in the background */}
          {[
            { t: "GET", x: 20, y: 70, d: "0s" },
            { t: "POST", x: 236, y: 54, d: "1s" },
            { t: "PUT", x: 252, y: 360, d: "2s" },
            { t: "DELETE", x: 12, y: 372, d: "3s" },
          ].map((v) => (
            <text
              key={v.t}
              className={`${s.verb}${on}`}
              style={{ animationDelay: v.d }}
              x={v.x}
              y={v.y}
              fontSize="13"
              fontWeight="800"
              fontFamily={MONO}
              fill="#7fd6c9"
            >
              {v.t}
            </text>
          ))}
        </svg>
      </PopUpLayer>

      {/* 2. APP SHADOW + DOCK */}
      <PopUpLayer z={14}>
        <svg {...svg}>
          <rect x="22" y="96" width="262" height="258" rx="14" fill="#000" opacity="0.28" />
          {/* dock */}
          <rect x="82" y="364" width="136" height="26" rx="13" fill="#ffffff22" />
          {[PINK, MUSTARD, "#7fd6c9", ORANGE].map((c, i) => (
            <rect key={i} x={96 + i * 30} y="368" width="18" height="18" rx="5" fill={c} />
          ))}
        </svg>
      </PopUpLayer>

      {/* 3. THE API MASTER APP (big window) */}
      <PopUpLayer z={34}>
        <svg {...svg}>
          {/* window */}
          <rect x="18" y="90" width="262" height="258" rx="14" fill={PAPER} stroke={INK} strokeWidth="2.5" />
          <path d="M18 116 V104 a14 14 0 0 1 14 -14 H266 a14 14 0 0 1 14 14 V116 Z" fill={INK} />
          <circle cx="34" cy="103" r="4" fill={PINK} />
          <circle cx="46" cy="103" r="4" fill={MUSTARD} />
          <circle cx="58" cy="103" r="4" fill="#7fd6c9" />
          <text x="149" y="107" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily={MONO} fill={PAPER}>
            API Master
          </text>

          {/* sidebar: environment + saved collection */}
          <rect x="18" y="116" width="82" height="232" fill="#e6d5b3" />
          <rect x="26" y="124" width="66" height="16" rx="8" fill={TEAL} />
          <circle cx="36" cy="132" r="3.5" fill="#7fd6c9" />
          <text x="44" y="135" fontSize="8" fontWeight="700" fontFamily={MONO} fill={PAPER}>
            env: dev
          </text>

          <text x="26" y="156" fontSize="7.5" fontWeight="800" fontFamily={MONO} fill={INK} opacity="0.7">
            COLLECTIONS
          </text>
          {SAVED.map((row, i) => {
            const y = 164 + i * 26;
            return (
              <g key={row.name}>
                <rect x="24" y={y} width="70" height="20" rx="4" fill={PAPER} stroke={INK} strokeWidth="1" />
                <rect x="28" y={y + 5} width="20" height="10" rx="3" fill={row.m.bg} />
                <text x="38" y={y + 12.6} textAnchor="middle" fontSize="6" fontWeight="800" fontFamily={MONO} fill={row.m.fg}>
                  {row.m.t}
                </text>
                <text x="51" y={y + 13} fontSize="6.5" fontFamily={MONO} fill={INK}>
                  {row.name.length > 9 ? row.name.slice(0, 9) : row.name}
                </text>
              </g>
            );
          })}

          <text x="26" y="254" fontSize="7.5" fontWeight="800" fontFamily={MONO} fill={INK} opacity="0.7">
            HISTORY
          </text>
          {[0, 1, 2].map((i) => (
            <g key={i} className={`${s.history}${on}`} style={{ animationDelay: `${i * 0.5}s` }}>
              <circle cx="31" cy={268 + i * 16} r="3" fill={[TEAL, ORANGE, MUSTARD][i]} />
              <rect x="40" y={266 + i * 16} width={44 - i * 8} height="4" rx="2" fill={INK} opacity="0.5" />
            </g>
          ))}

          {/* request bar */}
          <rect x="108" y="124" width="164" height="22" rx="6" fill="#f4e9d3" stroke={INK} strokeWidth="1.2" />
          {CYCLE.map((m, i) => (
            <g key={m.t} className={`${s.method}${on}`} style={{ animationDelay: `${i * 2.5}s` }}>
              <rect x="112" y="128" width="36" height="14" rx="7" fill={m.bg} />
              <text x="130" y="138" textAnchor="middle" fontSize="7.5" fontWeight="800" fontFamily={MONO} fill={m.fg}>
                {m.t}
              </text>
            </g>
          ))}
          <text x="154" y="138" fontSize="8" fontFamily={MONO} fill={INK}>
            /api/tasks
          </text>
          <g className={`${s.send}${on}`}>
            <rect x="238" y="127" width="30" height="16" rx="5" fill={ORANGE} />
            <text x="253" y="138" textAnchor="middle" fontSize="8" fontWeight="800" fontFamily={MONO} fill={PAPER}>
              Send
            </text>
          </g>

          {/* request tabs */}
          <text x="112" y="164" fontSize="7.5" fontWeight="800" fontFamily={MONO} fill={TEAL}>
            Params
          </text>
          <text x="152" y="164" fontSize="7.5" fontFamily={MONO} fill={INK} opacity="0.55">
            Headers
          </text>
          <text x="196" y="164" fontSize="7.5" fontFamily={MONO} fill={INK} opacity="0.55">
            Body
          </text>
          <rect x="108" y="167" width="34" height="2" rx="1" fill={TEAL} />

          {/* response panel */}
          <rect x="108" y="176" width="164" height="164" rx="6" fill={DARK} />
          <g className={`${s.reply}${on}`}>
            <rect x="116" y="184" width="44" height="14" rx="7" fill="#3c9b93" />
            <text x="138" y="194" textAnchor="middle" fontSize="8" fontWeight="800" fontFamily={MONO} fill="#fff">
              200 OK
            </text>
            <text x="168" y="194" fontSize="8" fontFamily={MONO} fill={MUSTARD}>
              142 ms
            </text>
          </g>
          {JSON_LINES.map((l, i) => (
            <text
              key={i}
              className={`${s.line}${on}`}
              style={{ animationDelay: `${i * 0.25}s` }}
              x={l.x - 52}
              y={222 + i * 14}
              fontSize="9"
              fontFamily={MONO}
              fill="#a8f0e4"
            >
              {l.t}
            </text>
          ))}
        </svg>
      </PopUpLayer>

      {/* 4. PAPER-PLANE REQUEST + RESPONSE */}
      <PopUpLayer z={50}>
        <svg {...svg}>
          {/* request plane flies out of the Send button... */}
          <g transform="translate(256 120)">
            <g className={`${s.plane}${on}`}>
              <polygon points="0,8 26,0 10,10" fill={PAPER} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
              <polygon points="10,10 26,0 13,20" fill="#e6d5b3" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
            </g>
          </g>
          {/* ...and a pink reply plane lands back into the response panel */}
          <g transform="translate(300 250) scale(-1 1)">
            <g className={`${s.plane}${on}`} style={{ animationDelay: "3.5s" }}>
              <polygon points="0,8 26,0 10,10" fill={PINK} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
              <polygon points="10,10 26,0 13,20" fill="#e6d5b3" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
            </g>
          </g>
        </svg>
      </PopUpLayer>

      {/* 5. SPEECH BUBBLE */}
      <PopUpLayer z={62}>
        <svg {...svg}>
          <g data-after data-origin="70 92">
            <path
              d="M22 38 H110 a12 12 0 0 1 12 12 V60 a12 12 0 0 1 -12 12 H84 L72 92 L64 72 H22 a12 12 0 0 1 -12 -12 V50 a12 12 0 0 1 12 -12 Z"
              fill={PAPER}
              stroke={INK}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <text
              x="66"
              y="61"
              textAnchor="middle"
              fontSize="16"
              fill={ORANGE}
              style={{ fontFamily: "var(--font-hand), cursive" }}
            >
              200 OK!
            </text>
          </g>
        </svg>
      </PopUpLayer>
    </PopUpScene>
  );
}