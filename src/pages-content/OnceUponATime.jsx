"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useBookStore } from "@/store/useBookStore";
import styles from "./OnceUponATime.module.css";

gsap.registerPlugin(useGSAP);

// ✏️ edit these to match your real stack
const SKILLS = ["React", "Next.js", "Node.js", "MongoDB", "JavaScript", "CSS"];

export default function OnceUponATime() {
  const root = useRef(null);
  const visible = useBookStore((s) => s.flipped >= 1);

  useGSAP(
    () => {
      const items = gsap.utils.toArray("[data-reveal]");
      gsap.killTweensOf(items);
      if (visible) {
        gsap.fromTo(
          items,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.14, delay: 1 }
        );
      } else {
        gsap.set(items, { opacity: 0 });
      }
    },
    { dependencies: [visible], scope: root }
  );

  const r = (extra = "") => ({ className: `${extra} ${styles.reveal}`, "data-reveal": true });

  return (
    <div ref={root} className={styles.page}>
      <span {...r(styles.chapter)}>Prologue</span>
      <h2 {...r(styles.title)}>Once upon a time...</h2>

      <p {...r(styles.p)}>
        In a land of glowing screens and endless tabs, there lived a full stack developer
        named <b>Arpit Joshi</b>, who turned coffee into code and ideas into working things.
      </p>
      <p {...r(styles.p)}>
        From the pixels in the browser to the servers behind the curtain, he built whole
        worlds, one adventure at a time. This book holds the best of them.
      </p>
      <p {...r(styles.p)}>
  Armed with curiosity and a keyboard, he wandered through the magical
  worlds of frontend and backend, turning little ideas into bigger adventures.
</p>

<p {...r(styles.p)}>
  Along the way, he encountered mysterious bugs, conquered endless errors,
  and learned that sometimes the greatest discoveries begin with a simple mistake.
</p>

<p {...r(styles.p)}>
  And with every new project, his story grew a little bigger.
  But the best chapters were still waiting to be written...
</p>

    

      <span {...r(styles.footer)}>Turn the page →</span>
    </div>
  );
}