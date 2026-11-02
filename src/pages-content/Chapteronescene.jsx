"use client";
import PopUpScene from "@/components/PopUp/PopUpScene";
import PopUpLayer from "@/components/PopUp/PopUpLayer";
import { useBookStore } from "@/store/useBookStore";
import s from "./Chapteronescene.module.css";

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

// board geometry
const COLS = [26, 110, 194]; // column x positions (To Do, In Progress, Done)
const SLOT = [146, 178, 210]; // card y positions inside a column
const CARD_W = 68;
const CARD_H = 26;

// one task card (a sticky card on the board)
const Card = ({ x, y, color, avatar, done }) => (
  <g>
    <rect x={x} y={y} width={CARD_W} height={CARD_H} rx="4" fill={PAPER} stroke={INK} strokeWidth="1.5" />
    <rect x={x} y={y} width="6" height={CARD_H} rx="3" fill={color} />
    <rect x={x + 12} y={y + 6} width="34" height="4" rx="2" fill={INK} opacity="0.75" />
    <rect x={x + 12} y={y + 14} width="22" height="3" rx="1.5" fill="#e6d5b3" />
    <circle cx={x + 57} cy={y + 13} r="6" fill={avatar} stroke={INK} strokeWidth="1" />
    {done && (
      <path
        d={`M${x + 38} ${y + 16} l3 3 l6 -8`}
        fill="none"
        stroke={TEAL}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </g>
);

export default function ChapterOneScene() {
  // Back of sheet 3 (left page) → shows once 3 sheets are flipped
  const visible = useBookStore((st) => st.flipped >= 3);
  const on = visible ? ` ${s.on}` : "";

  return (
    <PopUpScene showAt={3}>
      {/* 1. OFFICE WALL + DEADLINE CLOCK */}
      <PopUpLayer flat>
        <svg {...svg}>
          <defs>
            <linearGradient id="c1-wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6c9c0" />
              <stop offset="1" stopColor="#fbe3c4" />
            </linearGradient>
            <pattern id="c1-dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="11" cy="11" r="2" fill="#fffaf0" opacity="0.55" />
            </pattern>
          </defs>
          <rect width="300" height="400" fill="url(#c1-wall)" />
          <rect width="300" height="400" fill="url(#c1-dots)" />
          <rect y="350" width="300" height="50" fill="#b98a5a" />
          <rect y="350" width="300" height="5" fill={WOOD} />

          {/* wall clock */}
          <circle cx="100" cy="52" r="25" fill={PAPER} stroke={INK} strokeWidth="3" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={100 + 19 * Math.sin(a)}
                y1={52 - 19 * Math.cos(a)}
                x2={100 + 22 * Math.sin(a)}
                y2={52 - 22 * Math.cos(a)}
                stroke={INK}
                strokeWidth="1.6"
              />
            );
          })}
          <line x1="100" y1="52" x2="100" y2="38" stroke={INK} strokeWidth="2.4" strokeLinecap="round" className={`${s.minute}${on}`} />
          <line x1="100" y1="52" x2="108" y2="56" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="52" r="2.5" fill={INK} />
        </svg>
      </PopUpLayer>

      {/* 2. DESK: PLANT + DOCKER WHALE CARRYING CONTAINERS */}
      <PopUpLayer z={14}>
        <svg {...svg}>
          <rect x="0" y="330" width="300" height="14" fill={WOOD} />
          <rect x="0" y="344" width="300" height="56" fill="#6f4528" />

          {/* plant */}
          <path d="M24 306 h26 l-4 24 h-18Z" fill="#a8703f" />
          <path d="M37 306 q-12 -20 -4 -32 q12 10 4 32Z" fill="#2f7f79" />
          <path d="M37 306 q12 -18 20 -22 q0 14 -20 22Z" fill="#3c9b93" />
          <path d="M37 306 q-2 -12 4 -24 q7 12 -4 24Z" fill={TEAL} />

          {/* docker whale */}
          <g className={`${s.whale}${on}`}>
            {/* containers on its back */}
            {[230, 244, 258, 272].map((x, i) => (
              <rect key={x} x={x} y="292" width="12" height="11" fill={[ORANGE, MUSTARD, PINK, ORANGE][i]} stroke={INK} strokeWidth="1.2" />
            ))}
            {[237, 251, 265].map((x, i) => (
              <rect key={x} x={x} y="281" width="12" height="11" fill={[PINK, ORANGE, MUSTARD][i]} stroke={INK} strokeWidth="1.2" />
            ))}
            {/* body */}
            <path d="M222 303 H284 Q284 326 262 329 H238 Q222 324 222 303Z" fill="#3c9b93" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M284 306 q10 -6 12 -14 q-2 12 -12 18Z" fill="#3c9b93" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="235" cy="314" r="2.6" fill={INK} />
            <path d="M232 322 q8 4 16 0" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      </PopUpLayer>

      {/* 3. THE TASK BOARD */}
      <PopUpLayer z={34}>
        <svg {...svg}>
          {/* board */}
          <rect x="21" y="100" width="264" height="204" rx="9" fill="#00000022" />
          <rect x="18" y="96" width="264" height="204" rx="9" fill={PAPER} stroke={INK} strokeWidth="2.5" />

          {/* header bar */}
          <path d="M18 124 V105 a9 9 0 0 1 9 -9 H273 a9 9 0 0 1 9 9 V124 Z" fill={TEAL} />
          <circle cx="34" cy="110" r="7.5" fill={MUSTARD} />
          <path d="M30.5 110 l2.6 2.6 l5 -6" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="46" y="114" fontSize="11" fontWeight="800" fontFamily="ui-monospace, Consolas, monospace" fill={PAPER}>
            TaskFlow
          </text>

          {/* the 3 roles: Admin (crown), Manager (star), Member (dot) */}
          <g>
            <circle cx="224" cy="110" r="7" fill={PINK} stroke={INK} strokeWidth="1.2" />
            <path d="M219.5 104 l2.2 -3.5 l2.3 2.5 l2.3 -2.5 l2.2 3.5Z" fill={MUSTARD} stroke={INK} strokeWidth="1" strokeLinejoin="round" />
            <circle cx="244" cy="110" r="7" fill={MUSTARD} stroke={INK} strokeWidth="1.2" />
            <polygon points="244,105 245.4,108.6 249,108.8 246.2,111 247.2,114.6 244,112.5 240.8,114.6 241.8,111 239,108.8 242.6,108.6" fill={INK} />
            <circle cx="264" cy="110" r="7" fill="#7fd6c9" stroke={INK} strokeWidth="1.2" />
            <circle cx="264" cy="110" r="2.4" fill={INK} />
          </g>

          {/* columns */}
          {["To Do", "In Progress", "Done"].map((label, i) => (
            <g key={label}>
              <rect x={COLS[i]} y="128" width="78" height="164" rx="5" fill="#f4e9d3" />
              <text x={COLS[i] + 6} y="139" fontSize="8" fontWeight="800" fontFamily="ui-monospace, Consolas, monospace" fill={INK}>
                {label}
              </text>
            </g>
          ))}

          {/* static cards */}
          <Card x={COLS[0] + 5} y={SLOT[0]} color={PINK} avatar={PINK} />
          <Card x={COLS[0] + 5} y={SLOT[1]} color={TEAL} avatar="#7fd6c9" />
          <Card x={COLS[2] + 5} y={SLOT[0]} color={TEAL} avatar={MUSTARD} done />

          {/* In Progress card with a growing progress bar */}
          <Card x={COLS[1] + 5} y={SLOT[0]} color={ORANGE} avatar={PINK} />
          <rect x={COLS[1] + 17} y={SLOT[0] + 20} width="46" height="3" rx="1.5" fill="#e6d5b3" />
          <rect
            className={`${s.progress}${on}`}
            x={COLS[1] + 17}
            y={SLOT[0] + 20}
            width="46"
            height="3"
            rx="1.5"
            fill={ORANGE}
          />

          {/* the task that travels To Do → In Progress → Done */}
          <g className={`${s.mover}${on}`}>
            <Card x={COLS[0] + 5} y={SLOT[2]} color={MUSTARD} avatar={MUSTARD} />
            <path
              className={`${s.moverTick}${on}`}
              d={`M${COLS[0] + 43} ${SLOT[2] + 16} l3 3 l6 -8`}
              fill="none"
              stroke={TEAL}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </PopUpLayer>

      {/* 4. DEADLINE BELL + SPARKS */}
      <PopUpLayer z={50}>
        <svg {...svg}>
          {/* ringing bell with a notification badge */}
          <g className={`${s.bell}${on}`}>
            <path d="M32 64 q-12 0 -12 14 v8 h-4 v4 h40 v-4 h-4 v-8 q0 -14 -12 -14 q-4 -8 -8 0Z" fill={MUSTARD} stroke={INK} strokeWidth="2" strokeLinejoin="round" transform="translate(-2 -6) scale(0.9)" />
            <circle cx="34" cy="92" r="3.6" fill={INK} />
          </g>
          <g className={`${s.badge}${on}`}>
            <circle cx="48" cy="62" r="8" fill={ORANGE} stroke={INK} strokeWidth="1.5" />
            <text x="48" y="65.5" textAnchor="middle" fontSize="10" fontWeight="800" fontFamily="ui-monospace, Consolas, monospace" fill={PAPER}>
              1
            </text>
          </g>

          {/* confetti when the task lands in Done */}
          {[
            { x: 214, y: 192, c: MUSTARD, d: "0s" },
            { x: 252, y: 186, c: PINK, d: "0.08s" },
            { x: 232, y: 176, c: ORANGE, d: "0.16s" },
            { x: 262, y: 206, c: "#7fd6c9", d: "0.04s" },
          ].map((p, i) => (
            <circle
              key={i}
              className={`${s.confetti}${on}`}
              cx={p.x}
              cy={p.y}
              r="3.2"
              fill={p.c}
              style={{ animationDelay: p.d }}
            />
          ))}
        </svg>
      </PopUpLayer>

      {/* 5. SPEECH BUBBLE */}
      <PopUpLayer z={62}>
        <svg {...svg}>
          <g data-after data-origin="228 98">
            <path
              d="M166 44 H252 a12 12 0 0 1 12 12 V66 a12 12 0 0 1 -12 12 H244 L230 98 L220 78 H166 a12 12 0 0 1 -12 -12 V56 a12 12 0 0 1 12 -12 Z"
              fill={PAPER}
              stroke={INK}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <text
              x="208"
              y="67"
              textAnchor="middle"
              fontSize="16"
              fill={ORANGE}
              style={{ fontFamily: "var(--font-hand), cursive" }}
            >
              Task done! ✓
            </text>
          </g>
        </svg>
      </PopUpLayer>
    </PopUpScene>
  );
}