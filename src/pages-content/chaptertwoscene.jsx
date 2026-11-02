"use client";
import PopUpScene from "@/components/PopUp/PopUpScene";
import PopUpLayer from "@/components/PopUp/PopUpLayer";
import { useBookStore } from "@/store/useBookStore";
import s from "./Chaptertwoscene.module.css";

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
const WOOD = "#8a5a35";

const BULBS = [
  { x: 24, y: 26, c: PINK },
  { x: 62, y: 34, c: MUSTARD },
  { x: 100, y: 38, c: "#7fd6c9" },
  { x: 138, y: 40, c: ORANGE },
  { x: 176, y: 38, c: PINK },
  { x: 214, y: 34, c: MUSTARD },
  { x: 252, y: 28, c: "#7fd6c9" },
  { x: 282, y: 22, c: ORANGE },
];

export default function ChapterTwoScene() {
  // Back of sheet 4 (left page) → shows once 4 sheets are flipped
  const visible = useBookStore((st) => st.flipped >= 4);
  const on = visible ? ` ${s.on}` : "";

  return (
    <PopUpScene showAt={4}>
      {/* 1. ROOM BACKDROP + party string lights */}
      <PopUpLayer flat>
        <svg {...svg}>
          <defs>
            <linearGradient id="c2-wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6c9c0" />
              <stop offset="1" stopColor="#fbe3c4" />
            </linearGradient>
            <pattern id="c2-dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="11" cy="11" r="2" fill="#fffaf0" opacity="0.55" />
            </pattern>
          </defs>
          <rect width="300" height="400" fill="url(#c2-wall)" />
          <rect width="300" height="400" fill="url(#c2-dots)" />
          <rect y="350" width="300" height="50" fill="#b98a5a" />
          <rect y="350" width="300" height="5" fill={WOOD} />

          <path d="M0 14 Q75 52 150 40 T300 10" fill="none" stroke={INK} strokeWidth="1.5" />
          {BULBS.map((b, i) => (
            <g key={i}>
              <circle cx={b.x} cy={b.y} r="9" fill={b.c} opacity="0.25" />
              <circle
                cx={b.x}
                cy={b.y + 3}
                r="4.5"
                fill={b.c}
                className={`${s.bulb}${on}`}
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            </g>
          ))}
        </svg>
      </PopUpLayer>

      {/* 2. TABLE WITH THINGS TO HUNT */}
      <PopUpLayer z={14}>
        <svg {...svg}>
          <rect x="0" y="330" width="300" height="16" fill={WOOD} />
          <rect x="14" y="346" width="10" height="30" fill={WOOD} />
          <rect x="276" y="346" width="10" height="30" fill={WOOD} />

          {/* lamp */}
          <rect x="38" y="322" width="22" height="8" rx="3" fill={INK} />
          <rect x="47" y="296" width="4" height="28" fill={INK} />
          <path d="M32 298 L42 270 H58 L68 298Z" fill={MUSTARD} />

          {/* books */}
          <rect x="236" y="312" width="38" height="9" rx="2" fill={TEAL} />
          <rect x="240" y="303" width="34" height="9" rx="2" fill={ORANGE} />
          <rect x="236" y="321" width="40" height="9" rx="2" fill={PINK} />

          {/* plant */}
          <path d="M254 298 h22 l-3 18 h-16Z" fill="#a8703f" transform="translate(0 -4)" />
          <path d="M265 296 q-10 -16 -4 -26 q10 8 4 26Z" fill="#2f7f79" />
          <path d="M265 296 q10 -14 16 -18 q0 12 -16 18Z" fill="#3c9b93" />
        </svg>
      </PopUpLayer>

      {/* 3. THE PHONE WITH THE SCANNER */}
      <PopUpLayer z={34}>
        <svg {...svg}>
          <defs>
            <clipPath id="c2-screen">
              <rect x="90" y="104" width="120" height="226" rx="12" />
            </clipPath>
          </defs>

          <g className={`${s.phone}${on}`}>
            {/* body */}
            <rect x="82" y="92" width="136" height="250" rx="20" fill={INK} />
            <rect x="90" y="104" width="120" height="226" rx="12" fill="#274b48" />

            <g clipPath="url(#c2-screen)">
              {/* what the camera sees */}
              <rect x="90" y="104" width="120" height="226" fill="#d9c7a3" />
              <rect x="90" y="278" width="120" height="52" fill="#8a5a35" />

              {/* mug */}
              <rect x="136" y="250" width="28" height="30" rx="5" fill={ORANGE} />
              <path d="M164 258 q12 4 0 14" fill="none" stroke={ORANGE} strokeWidth="4" />
              <path
                className={`${s.steam}${on}`}
                d="M144 246 q-5 -9 0 -16 M154 246 q-5 -9 0 -16"
                fill="none"
                stroke="#fff"
                strokeOpacity="0.8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* detection box */}
              <g className={`${s.box}${on}`}>
                <rect x="128" y="238" width="44" height="48" fill="none" stroke={MUSTARD} strokeWidth="2.5" />
                <rect x="128" y="224" width="58" height="14" fill={MUSTARD} />
                <text x="132" y="234" fontSize="9" fontFamily="ui-monospace, Consolas, monospace" fontWeight="700" fill={INK}>
                  mug 92%
                </text>
              </g>

              {/* scan line */}
              <rect className={`${s.scan}${on}`} x="90" y="104" width="120" height="3" fill="#7fd6c9" opacity="0.75" />

              {/* HUD chips */}
              <rect x="96" y="112" width="36" height="15" rx="7.5" fill={INK} opacity="0.7" />
              <text x="114" y="123" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, Consolas, monospace" fill="#fffaf0">
                0:30
              </text>
              <rect x="170" y="112" width="34" height="15" rx="7.5" fill={INK} opacity="0.7" />
              <text x="187" y="123" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, Consolas, monospace" fill={MUSTARD}>
                ★ 3
              </text>
            </g>

            {/* viewfinder corners */}
            <g fill="none" stroke="#fffaf0" strokeWidth="2.5" strokeLinecap="round">
              <path d="M100 150 v-10 h10" />
              <path d="M200 150 v-10 h-10" />
              <path d="M100 312 v10 h10" />
              <path d="M200 312 v10 h-10" />
            </g>
            <rect x="130" y="95" width="40" height="5" rx="2.5" fill="#000" opacity="0.5" />
          </g>
        </svg>
      </PopUpLayer>

      {/* 4. TREASURES FLOATING OUT OF THE PHONE */}
      <PopUpLayer z={50}>
        <svg {...svg}>
          {/* star */}
          <g className={`${s.float}${on}`} style={{ animationDelay: "0s" }}>
            <polygon
              points="46,146 52,162 70,162 56,172 61,189 46,179 31,189 36,172 22,162 40,162"
              fill={MUSTARD}
              stroke={INK}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>
          {/* gem */}
          <g className={`${s.float}${on}`} style={{ animationDelay: "0.8s" }}>
            <polygon points="238,150 262,150 272,164 250,188 228,164" fill={PINK} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
            <polyline points="228,164 272,164 M238,150 250,164 262,150 M250,164 250,188" fill="none" stroke={INK} strokeWidth="1.5" />
          </g>
          {/* magnifier */}
          <g className={`${s.float}${on}`} style={{ animationDelay: "1.6s" }}>
            <circle cx="252" cy="262" r="14" fill="#fffaf0" fillOpacity="0.5" stroke={INK} strokeWidth="3" />
            <line x1="262" y1="272" x2="278" y2="290" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          </g>
          {/* sparkles */}
          {[
            { x: 40, y: 230, d: "0.3s" },
            { x: 266, y: 218, d: "1.1s" },
            { x: 62, y: 112, d: "1.9s" },
          ].map((sp, i) => (
            <path
              key={i}
              className={`${s.spark}${on}`}
              style={{ animationDelay: sp.d, transformOrigin: `${sp.x}px ${sp.y}px` }}
              d={`M${sp.x} ${sp.y - 8} v16 M${sp.x - 8} ${sp.y} h16`}
              stroke={MUSTARD}
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </PopUpLayer>

      {/* 5. SPEECH BUBBLE */}
      <PopUpLayer z={62}>
        <svg {...svg}>
          <g data-after data-origin="92 106">
            <path
              d="M30 50 H120 a12 12 0 0 1 12 12 V74 a12 12 0 0 1 -12 12 H102 L92 106 L82 86 H30 a12 12 0 0 1 -12 -12 V62 a12 12 0 0 1 12 -12 Z"
              fill="#fffaf0"
              stroke={INK}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <text
              x="75"
              y="73"
              textAnchor="middle"
              fontSize="15"
              fill={ORANGE}
              style={{ fontFamily: "var(--font-hand), cursive" }}
            >
              Found it! +10
            </text>
          </g>
        </svg>
      </PopUpLayer>
    </PopUpScene>
  );
}