"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useBookStore } from "@/store/useBookStore";
import { useToolboxStore } from "@/store/useToolboxStore";
import { BY_ID, LOADOUT, STATS, RARITY } from "@/data/skills";
import s from "./toolbox.module.css";

gsap.registerPlugin(useGSAP);

function EquipSlot({ slot }) {
  const sk = BY_ID[slot.id];
  const r = RARITY[sk.rarity];
  const Icon = sk.Icon;
  const selected = useToolboxStore((st) => st.selected);
  const setSelected = useToolboxStore((st) => st.setSelected);

  return (
    <div className={s.eq}>
      <span className={s.eqLabel}>{slot.label}</span>
      <button
        data-pop
        className={`${s.slot} ${s.eqSlot} ${selected === sk.id ? s.selected : ""}`}
        style={{ "--rc": r.color, "--ic": sk.color }}
        onClick={(e) => {
          e.stopPropagation(); // don't flip the page
          setSelected(sk.id);
        }}
        aria-label={`${slot.label}: ${sk.name}`}
      >
        <span className={s.slotInner}>
          <Icon className={s.icon} />
        </span>
      </button>
    </div>
  );
}

export default function Toolbox() {
  const root = useRef(null);
  const visible = useBookStore((st) => st.flipped >= 2);
  const selected = useToolboxStore((st) => st.selected);

  const sel = BY_ID[selected];
  const r = RARITY[sel.rarity];
  const SelIcon = sel.Icon;

  useGSAP(
    () => {
      const pops = gsap.utils.toArray("[data-pop]");
      const bars = gsap.utils.toArray("[data-bar]");

      if (!visible) {
        gsap.set(pops, { opacity: 0, scale: 0.4 });
        gsap.set(bars, { scaleX: 0 });
        return;
      }

      gsap.fromTo(bars, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.out", delay: 1, stagger: 0.12 });
      gsap.fromTo(
        pops,
        { opacity: 0, scale: 0.4, y: 14 },
        { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(2)", stagger: 0.09, delay: 1.1 }
      );
    },
    { dependencies: [visible], scope: root, revertOnUpdate: true }
  );

  return (
    <div className={s.page}>
      <div className={s.inner} ref={root}>
        <section className={s.parch}>
          <div className={s.plaque}>Equipment</div>
          <p className={s.who}>Arpit Joshi · Lv. 99 Full Stack Developer</p>
          <p className={s.sub}>Character Attributes</p>

          <div className={s.stats}>
            {STATS.map((st) => (
              <div key={st.label} className={s.stat}>
                <span>{st.label}</span>
                <div className={s.statTrack}>
                  <div
                    data-bar
                    className={s.statFill}
                    style={{ width: `${st.value}%`, background: st.color }}
                  />
                </div>
                <b>{st.value}</b>
              </div>
            ))}
          </div>

          <div className={s.rig}>
            <div className={s.col}>
              {LOADOUT.slice(0, 3).map((sl) => (
                <EquipSlot key={sl.slot} slot={sl} />
              ))}
            </div>

            <div className={s.body}>
              <div className={s.aura} />
              <svg viewBox="0 0 100 210" aria-hidden="true">
                <defs>
                  <linearGradient id="tb-body" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#d3b88a" />
                    <stop offset="1" stopColor="#b99a68" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="24" r="16" fill="url(#tb-body)" />
                <path
                  d="M33 46 Q50 38 67 46 L80 98 L71 102 L66 74 L65 128 L69 202 L54 202 L50 138 L46 202 L31 202 L35 128 L34 74 L29 102 L20 98 Z"
                  fill="url(#tb-body)"
                />
                <text x="50" y="86" textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="700" fill="#d9622b">
                  {"</>"}
                </text>
              </svg>
            </div>

            <div className={s.col}>
              {LOADOUT.slice(3).map((sl) => (
                <EquipSlot key={sl.slot} slot={sl} />
              ))}
            </div>
          </div>

          {/* key makes the card re-animate every time you pick another skill */}
          <div key={sel.id} className={s.detail} style={{ "--rc": r.color, "--ic": sel.color }}>
            <div className={s.detailIcon}>
              <SelIcon />
            </div>
            <div>
              <div className={s.detailTop}>
                <h3>{sel.name}</h3>
                <span className={s.tag}>{r.label}</span>
              </div>
              <p className={s.type}>{sel.type}</p>
              <p className={s.desc}>{sel.desc}</p>
              <div className={s.lvl}>
                <span>Lv. {sel.level}</span>
                <div className={s.lvlTrack}>
                  <div className={s.lvlFill} style={{ width: `${sel.level}%` }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}