"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useBookStore } from "@/store/useBookStore";
import { useToolboxStore } from "@/store/useToolboxStore";
import { SKILLS, RARITY } from "@/data/skills";
import s from "./toolbox.module.css";

gsap.registerPlugin(useGSAP);

function Meter({ label, value, kind }) {
  return (
    <div className={s.meter}>
      <span>{label}</span>
      <div className={s.meterTrack}>
        <div data-bar className={`${s.meterFill} ${s[kind]}`} style={{ width: `${value}%` }} />
      </div>
      <b>{value}%</b>
    </div>
  );
}

export default function ToolboxInventory() {
  const root = useRef(null);
  const visible = useBookStore((st) => st.flipped >= 2);
  const selected = useToolboxStore((st) => st.selected);
  const setSelected = useToolboxStore((st) => st.setSelected);

  useGSAP(
    () => {
      const pops = gsap.utils.toArray("[data-pop]");
      const bars = gsap.utils.toArray("[data-bar]");

      if (!visible) {
        gsap.set(pops, { opacity: 0, scale: 0.4 });
        gsap.set(bars, { scaleX: 0 });
        return;
      }

      gsap.fromTo(
        pops,
        { opacity: 0, scale: 0.4, y: 14 },
        { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(2)", stagger: 0.045, delay: 0.85 }
      );
      gsap.fromTo(bars, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.out", delay: 1.4, stagger: 0.15 });
    },
    { dependencies: [visible], scope: root, revertOnUpdate: true }
  );

  return (
    <div className={s.page}>
      <div className={s.inner} ref={root}>
        <section className={s.panel}>
          <div className={s.plaque}>Inventory</div>
          <p className={s.capacity}>Capacity: {SKILLS.length} / 99</p>

          <div className={s.grid}>
            {SKILLS.map((sk) => {
              const r = RARITY[sk.rarity];
              const Icon = sk.Icon;
              return (
                <button
                  key={sk.id}
                  data-pop
                  className={`${s.slot} ${selected === sk.id ? s.selected : ""}`}
                  style={{ "--rc": r.color, "--ic": sk.color }}
                  onClick={(e) => {
                    e.stopPropagation(); // don't flip the page
                    setSelected(sk.id);
                  }}
                  aria-label={sk.name}
                >
                  <span className={s.slotInner}>
                    <Icon className={s.icon} />
                  </span>
                  <span className={s.slotName}>{sk.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className={s.status}>
          <span className={s.ribbon}>Character Status</span>
          <div className={s.meters}>
            <Meter label="Coffee ☕" value={95} kind="hp" />
            <Meter label="Focus" value={87} kind="mp" />
          </div>
        </section>
      </div>
    </div>
  );
}