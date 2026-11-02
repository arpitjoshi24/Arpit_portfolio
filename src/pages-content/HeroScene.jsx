"use client";
import PopUpScene from "@/components/PopUp/PopUpScene";
import PopUpLayer from "@/components/PopUp/PopUpLayer";
import { useBookStore } from "@/store/useBookStore";
import s from "./HeroScene.module.css";

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
const WOOD = "#8a5a35";

const STARS = Array.from({ length: 14 }, (_, i) => ({
  x: 164 + ((i * 41 + 7) % 112),
  y: 44 + ((i * 23 + 5) % 100),
  r: 0.8 + (i % 3) * 0.45,
  d: (i % 6) * 0.45,
}));

// symbols that float up from the laptop (x = position across the character image)
const CODE = [
  { t: "</>", x: "61%", d: "0s" },
  { t: "{ }", x: "66%", d: "0.9s" },
  { t: "const", x: "70%", d: "1.8s" },
  { t: "=>", x: "63%", d: "2.7s" },
  { t: "npm i", x: "68%", d: "3.6s" },
  { t: "<div>", x: "72%", d: "4.4s" },
];

const STEAM = [
  { x: "31.4%", d: "0s" },
  { x: "32.6%", d: "0.9s" },
  { x: "33.8%", d: "1.8s" },
];

export default function HeroScene() {
  const visible = useBookStore((st) => st.flipped >= 1);
  const on = visible ? ` ${s.on}` : "";

  return (
    <PopUpScene showAt={1}>
      {/* 1. ROOM BACKDROP: wall, floor, window with the day/night sky */}
      <PopUpLayer flat>
        <svg {...svg}>
          <defs>
            <linearGradient id="hs-wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6e6c8" />
              <stop offset="1" stopColor="#ecd3a8" />
            </linearGradient>
            <linearGradient id="hs-day" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7fcdf2" />
              <stop offset="1" stopColor="#fbe3c4" />
            </linearGradient>
            <linearGradient id="hs-dusk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ff9a5a" stopOpacity="0" />
              <stop offset="0.6" stopColor="#ff8a5a" stopOpacity="0.55" />
              <stop offset="1" stopColor="#f2b8b0" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="hs-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0b1233" />
              <stop offset="1" stopColor="#2b1a5a" />
            </linearGradient>
            <clipPath id="hs-win">
              <rect x="160" y="40" width="120" height="130" />
            </clipPath>
            <mask id="hs-moonmask">
              <rect x="196" y="286" width="48" height="48" fill="#fff" />
              <circle cx="228" cy="303" r="11" fill="#000" />
            </mask>
          </defs>

          {/* wall + floor */}
          <rect width="300" height="400" fill="url(#hs-wall)" />
          <rect y="350" width="300" height="50" fill="#b98a5a" />
          <rect y="350" width="300" height="5" fill="#8a5a35" />
          {[366, 380, 393].map((y) => (
            <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#a67a4c" strokeWidth="1.5" />
          ))}

          <rect width="300" height="400" fill="#150d2e" className={`${s.wallNight}${on}`} />

          {/* window sky */}
          <g clipPath="url(#hs-win)">
            <rect x="160" y="40" width="120" height="130" fill="url(#hs-day)" />
            <rect x="160" y="40" width="120" height="130" fill="url(#hs-dusk)" className={`${s.dusk}${on}`} />

            <g className={`${s.cloud}${on}`} fill="#fffaf0" opacity="0.92">
              <ellipse cx="200" cy="70" rx="20" ry="7" />
              <ellipse cx="212" cy="64" rx="13" ry="7" />
            </g>

            <rect x="160" y="40" width="120" height="130" fill="url(#hs-night)" className={`${s.night}${on}`} />

            <g className={`${s.stars}${on}`}>
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
            </g>

            {/* sun at the top, moon on the opposite side, rotating together */}
            <g className={`${s.orbit}${on}`}>
              <g>
                <circle cx="220" cy="110" r="26" fill="#ffd36b" opacity="0.3" />
                <g className={`${s.sunRays}${on}`}>
                  {Array.from({ length: 10 }, (_, i) => {
                    const a = (i * 36 * Math.PI) / 180;
                    return (
                      <line
                        key={i}
                        x1={220 + 19 * Math.cos(a)}
                        y1={110 + 19 * Math.sin(a)}
                        x2={220 + 26 * Math.cos(a)}
                        y2={110 + 26 * Math.sin(a)}
                        stroke="#e3a72f"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                    );
                  })}
                </g>
                <circle cx="220" cy="110" r="14" fill="#f6b830" />
              </g>
              <g>
                <circle cx="220" cy="310" r="24" fill="#fff3c0" opacity="0.2" />
                <circle cx="220" cy="310" r="14" fill="#f5efd8" mask="url(#hs-moonmask)" />
              </g>
            </g>

            {/* distant hills outside the window */}
            <g className={`${s.dim}${on}`}>
              <path d="M160 156 Q198 136 232 152 T280 144 V170 H160Z" fill="#2f7f79" />
              <path d="M160 164 Q210 150 250 162 T280 158 V170 H160Z" fill="#1f5f5b" />
            </g>
          </g>

          {/* window frame, sill and curtains */}
          <rect x="160" y="40" width="120" height="130" fill="none" stroke={WOOD} strokeWidth="5" />
          <line x1="220" y1="40" x2="220" y2="170" stroke={WOOD} strokeWidth="3" />
          <line x1="160" y1="105" x2="280" y2="105" stroke={WOOD} strokeWidth="3" />
          <rect x="152" y="170" width="136" height="7" rx="2" fill={WOOD} />
          <g className={`${s.dim}${on}`}>
            <path d="M146 34 H168 Q172 100 164 176 H146Z" fill={ORANGE} />
            <path d="M292 34 H272 Q268 100 276 176 H292Z" fill={ORANGE} />
          </g>
        </svg>
      </PopUpLayer>

      {/* 2. WALL DECOR: poster + shelf with books and a plant */}
      <PopUpLayer z={14}>
        <svg {...svg} className={`${s.dim}${on}`}>
          <rect x="20" y="34" width="56" height="64" rx="3" fill="#fffaf0" stroke={WOOD} strokeWidth="3" />
          <rect x="27" y="41" width="42" height="50" fill={TEAL} />
          <text x="48" y="72" textAnchor="middle" fontSize="18" fontFamily="monospace" fontWeight="700" fill="#e3a72f">
            {"</>"}
          </text>
          <circle cx="36" cy="49" r="2" fill="#fffaf0" />
          <circle cx="60" cy="83" r="2" fill="#f2b8b0" />

          <rect x="84" y="102" width="68" height="5" rx="2" fill={WOOD} />
          <rect x="90" y="84" width="7" height="18" fill={ORANGE} />
          <rect x="98" y="88" width="6" height="14" fill="#e3a72f" />
          <rect x="105" y="82" width="8" height="20" fill={TEAL} />
          <rect x="114" y="90" width="6" height="12" fill="#f2b8b0" />
          <path d="M130 102 L152 102 L149 116 L133 116Z" fill="#a8703f" transform="translate(-6 -14)" />
          <g className={`${s.leaf}${on}`} style={{ transformOrigin: "135px 90px", transformBox: "view-box" }}>
            <path d="M135 90 q-8 -14 -2 -22 q8 6 2 22Z" fill="#2f7f79" />
            <path d="M135 90 q8 -12 14 -16 q0 10 -14 16Z" fill="#3c9b93" />
            <path d="M135 90 q-2 -8 3 -18 q5 8 -3 18Z" fill="#1f5f5b" />
          </g>
        </svg>
      </PopUpLayer>

      {/* 3. THE CHARACTER (your PNG) + lights, code symbols and steam */}
      <PopUpLayer z={34}>
        <div className={s.rig}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/character.png" alt="Arpit coding at his desk" draggable={false} />

          <div className={`${s.light} ${s.lampGlow}${on}`} />
          <div className={`${s.light} ${s.lampCone}${on}`} />
          <div className={`${s.light} ${s.screenGlow}${on}`} />

          {CODE.map((c) => (
            <span key={c.t} className={`${s.code}${on}`} style={{ "--x": c.x, "--d": c.d }}>
              {c.t}
            </span>
          ))}

          {STEAM.map((st, i) => (
            <span key={i} className={`${s.steam}${on}`} style={{ "--x": st.x, "--d": st.d }} />
          ))}
        </div>
      </PopUpLayer>

      {/* 4. SPEECH BUBBLE */}
      <PopUpLayer z={50}>
        <svg {...svg}>
          <g data-after data-origin="100 212">
            <path
              d="M34 176 H106 a14 14 0 0 1 14 14 V196 a14 14 0 0 1 -14 14 H92 L112 232 L74 210 H34 a14 14 0 0 1 -14 -14 V190 a14 14 0 0 1 14 -14 Z"
              fill="#fffaf0"
              stroke={INK}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <text
              x="70"
              y="199"
              textAnchor="middle"
              fontSize="16"
              fill={ORANGE}
              style={{ fontFamily: "var(--font-hand), cursive" }}
            >
              Hi, I'm Arpit!
            </text>
          </g>
        </svg>
      </PopUpLayer>
    </PopUpScene>
  );
}