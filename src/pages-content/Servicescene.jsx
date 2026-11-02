"use client";
import PopUpScene from "@/components/PopUp/PopUpScene";
import PopUpLayer from "@/components/PopUp/PopUpLayer";
import { useBookStore } from "@/store/useBookStore";
import s from "./Servicescene.module.css";

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
const WOOD = "#8a5a35";

// ✏️ Edit the services here
const PLANKS = [
  { side: "R", y: 112, title: "Portfolios", sub: "for you or your team", bg: ORANGE, fg: PAPER },
  { side: "L", y: 156, title: "Industry Sites", sub: "for your business", bg: MUSTARD, fg: INK },
  { side: "R", y: 200, title: "Web Apps", sub: "built full-stack", bg: TEAL, fg: PAPER },
  { side: "L", y: 244, title: "Android Apps", sub: "for every pocket", bg: PINK, fg: INK },
];

const STARS = Array.from({ length: 14 }, (_, i) => ({
  x: 10 + ((i * 47 + 13) % 280),
  y: 8 + ((i * 29 + 5) % 110),
  r: 0.8 + (i % 3) * 0.4,
  d: (i % 6) * 0.5,
}));

const FIREFLIES = [
  { x: 40, y: 352, d: "0s" },
  { x: 92, y: 372, d: "1.2s" },
  { x: 208, y: 360, d: "2.1s" },
  { x: 262, y: 376, d: "0.6s" },
  { x: 168, y: 380, d: "3s" },
];

const plankPath = (side, y) =>
  side === "R"
    ? `M154 ${y} H270 L288 ${y + 20} L270 ${y + 40} H154 Z`
    : `M146 ${y} H30 L12 ${y + 20} L30 ${y + 40} H146 Z`;

const House = ({ x, y, on }) => (
  <g>
    <rect x={x} y={y} width="26" height="18" fill="#e6d5b3" stroke={INK} strokeWidth="1.5" />
    <polygon points={`${x - 3},${y} ${x + 13},${y - 12} ${x + 29},${y}`} fill={ORANGE} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
    <rect x={x + 9} y={y + 6} width="8" height="9" fill={MUSTARD} className={`${s.win}${on}`} />
  </g>
);

export default function ServicesScene() {
  // Back of sheet 6 (left page) → shows once 6 sheets are flipped
  const visible = useBookStore((st) => st.flipped >= 6);
  const on = visible ? ` ${s.on}` : "";

  return (
    <PopUpScene showAt={6}>
      {/* 1. DUSK SKY + MOUNTAINS */}
      <PopUpLayer flat>
        <svg {...svg}>
          <defs>
            <linearGradient id="sv-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a1a52" />
              <stop offset="0.5" stopColor="#8a4f7d" />
              <stop offset="1" stopColor="#f2a65a" />
            </linearGradient>
          </defs>
          <rect width="300" height="400" fill="url(#sv-sky)" />

          {STARS.map((st, i) => (
            <circle
              key={i}
              cx={st.x}
              cy={st.y}
              r={st.r}
              fill="#fff"
              className={s.twinkle}
              style={{ animationDelay: `${st.d}s` }}
            />
          ))}
          <path d="M252 30 a14 14 0 1 0 12 22 a11 11 0 1 1 -12 -22Z" fill="#fff3c0" />

          <circle cx="58" cy="248" r="34" fill="#ffd36b" opacity="0.25" />
          <circle cx="58" cy="248" r="22" fill="#f6b830" />

          <path d="M0 300 L50 235 L100 290 L160 215 L225 292 L300 245 V400 H0Z" fill="#4b3a7a" />
          <path d="M0 330 L70 280 L130 325 L200 270 L300 330 V400 H0Z" fill="#35295a" />
        </svg>
      </PopUpLayer>

      {/* 2. VILLAGE HILL + PINES */}
      <PopUpLayer z={14}>
        <svg {...svg}>
          <path d="M0 336 Q90 308 170 332 T300 322 V400 H0Z" fill="#174744" />
          <House x={20} y={314} on={on} />
          <House x={248} y={312} on={on} />
          {[
            { x: 74, y: 330, h: 40 },
            { x: 230, y: 328, h: 34 },
            { x: 288, y: 330, h: 44 },
          ].map((t, i) => (
            <g key={i}>
              <rect x={t.x - 3} y={t.y} width="6" height="14" fill={INK} />
              <polygon points={`${t.x},${t.y - t.h} ${t.x - t.h * 0.42},${t.y + 2} ${t.x + t.h * 0.42},${t.y + 2}`} fill="#0f3330" />
              <polygon points={`${t.x},${t.y - t.h * 1.25} ${t.x - t.h * 0.3},${t.y - t.h * 0.5} ${t.x + t.h * 0.3},${t.y - t.h * 0.5}`} fill="#0f3330" />
            </g>
          ))}
        </svg>
      </PopUpLayer>

      {/* 3. THE SIGNPOST WITH THE SERVICES */}
      <PopUpLayer z={38}>
        <svg {...svg}>
          {/* pole */}
          <rect x="146" y="94" width="8" height="256" rx="2" fill={WOOD} stroke={INK} strokeWidth="2" />
          <ellipse cx="150" cy="350" rx="26" ry="7" fill="#0f3330" />
          <polygon
            className={`${s.finial}${on}`}
            points="150,76 154,87 166,87 156,94 160,106 150,99 140,106 144,94 134,87 146,87"
            fill={MUSTARD}
            stroke={INK}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* planks */}
          {PLANKS.map((p, i) => (
            <g
              key={p.title}
              className={`${s.plank} ${p.side === "R" ? s.plankR : s.plankL}${on}`}
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <path d={plankPath(p.side, p.y)} fill={p.bg} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
              <circle cx={p.side === "R" ? 160 : 140} cy={p.y + 20} r="2" fill={INK} opacity="0.55" />
              <text
                x={p.side === "R" ? 168 : 40}
                y={p.y + 18}
                fontSize="13"
                fontWeight="700"
                fill={p.fg}
                style={{ fontFamily: "var(--font-title), serif" }}
              >
                {p.title}
              </text>
              <text
                x={p.side === "R" ? 168 : 40}
                y={p.y + 31}
                fontSize="8"
                fill={p.fg}
                opacity="0.9"
                style={{ fontFamily: "ui-monospace, Consolas, monospace" }}
              >
                {p.sub}
              </text>
            </g>
          ))}
        </svg>
      </PopUpLayer>

      {/* 4. FOREGROUND GRASS + FIREFLIES */}
      <PopUpLayer z={52}>
        <svg {...svg}>
          <path
            d="M0 372 L0 400 L300 400 L300 368 L286 352 L280 370 L262 348 L254 372 L40 372 L30 350 L22 372 L0 356 Z"
            fill="#0f3330"
          />
          <g>
            <line x1="84" y1="372" x2="84" y2="348" stroke={TEAL} strokeWidth="3" />
            <circle cx="84" cy="344" r="8" fill={PINK} />
            <circle cx="84" cy="344" r="3.5" fill={MUSTARD} />
          </g>
          <g>
            <line x1="216" y1="372" x2="216" y2="350" stroke={TEAL} strokeWidth="3" />
            <circle cx="216" cy="346" r="8" fill={MUSTARD} />
            <circle cx="216" cy="346" r="3.5" fill={ORANGE} />
          </g>
          {FIREFLIES.map((f, i) => (
            <circle
              key={i}
              className={`${s.firefly}${on}`}
              cx={f.x}
              cy={f.y}
              r="2.6"
              fill="#fff3a0"
              style={{ animationDelay: f.d }}
            />
          ))}
        </svg>
      </PopUpLayer>

      {/* 5. SPEECH BUBBLE */}
      <PopUpLayer z={64}>
        <svg {...svg}>
          <g data-after data-origin="138 96">
            <path
              d="M30 40 H120 a12 12 0 0 1 12 12 V60 a12 12 0 0 1 -12 12 H108 L138 96 L96 72 H30 a12 12 0 0 1 -12 -12 V52 a12 12 0 0 1 12 -12 Z"
              fill={PAPER}
              stroke={INK}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <text
              x="75"
              y="61"
              textAnchor="middle"
              fontSize="16"
              fill={ORANGE}
              style={{ fontFamily: "var(--font-hand), cursive" }}
            >
              Pick your quest!
            </text>
          </g>
        </svg>
      </PopUpLayer>
    </PopUpScene>
  );
}