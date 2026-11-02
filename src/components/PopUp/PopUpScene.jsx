"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useBookStore } from "@/store/useBookStore";
import styles from "./PopUp.module.css";

gsap.registerPlugin(useGSAP);

export default function PopUpScene({ children, showAt = 1, delay = 0.75, tilt = true }) {
  const root = useRef(null);
  const stage = useRef(null);
  const visible = useBookStore((s) => s.flipped >= showAt);

  useGSAP(
    () => {
      const layers = gsap.utils.toArray("[data-layer]");
      const pops = layers.filter((l) => l.dataset.flat !== "1");
      const flats = layers.filter((l) => l.dataset.flat === "1");
      const afters = gsap.utils.toArray("[data-after]");

      // folded flat while the book is closed
      gsap.set(pops, { rotateX: 90, opacity: 0, z: 0, transformOrigin: "50% 100%" });
      gsap.set(flats, { opacity: 0 });
      gsap.set(afters, { scale: 0, opacity: 0, svgOrigin: (i, el) => el.dataset.origin });

      if (!visible) return;

      const tl = gsap.timeline({ delay });
      tl.to(flats, { opacity: 1, duration: 0.6 }, 0)
        .to(
          pops,
          {
            rotateX: 0,
            opacity: 1,
            z: (i, el) => Number(el.dataset.z) || 0,
            duration: 1,
            ease: "back.out(1.5)",
            stagger: 0.18,
          },
          0.1
        )
        .to(
          afters,
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)", stagger: 0.2 },
          ">-0.3"
        );
    },
    { dependencies: [visible], scope: root, revertOnUpdate: true }
  );

  const onMove = (e) => {
    if (!tilt || !visible) return;
    const r = root.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(stage.current, {
      rotationY: x * 12,
      rotationX: -y * 8,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onLeave = () =>
    gsap.to(stage.current, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "power3.out" });

  return (
    <div ref={root} className={styles.scene} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={stage} className={styles.stage}>
        {children}
      </div>
    </div>
  );
}