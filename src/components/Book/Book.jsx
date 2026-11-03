"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useBookStore } from "@/store/useBookStore";
import Page from "./Page";
import Cover from "./Cover";
import BackCover from "./Backcover";
import SoundToggle from "@/components/UI/SoundToggle";
import { playFlip, startMusic, setMuted } from "@/utils/sound";
import styles from "./Book.module.css";

import HeroScene from "@/pages-content/HeroScene";
import OnceUponATime from "@/pages-content/OnceUponATime";
import ToolboxInventory from "@/pages-content/ToolboxInventory";
import Toolbox from "@/pages-content/Toolbox";
import ChapterOneScene from "@/pages-content/Chapteronescene";
import ChapterOne from "@/pages-content/ChapterOne";
import ChapterTwoScene from "@/pages-content/chaptertwoscene";
import ChapterTwo from "@/pages-content/ChapterTwo";
import ChapterThreeScene from "@/pages-content/chapterthreescene";
import ChapterThree from "@/pages-content/ChapterThree";
import ServicesScene from "@/pages-content/Servicescene";
import ContactForm from "@/pages-content/Contactform";

gsap.registerPlugin(useGSAP);

// Each sheet = a front face (right side) and a back face (left side after flipping)
const sheets = [
  { front: <Cover />, back: <HeroScene />, frontClass: styles.coverFace },
  { front: <OnceUponATime />, back: <ToolboxInventory /> },
  { front: <Toolbox />, back: <ChapterOneScene /> },
  { front: <ChapterOne />, back: <ChapterTwoScene /> },
  { front: <ChapterTwo />, back: <ChapterThreeScene /> },
  { front: <ChapterThree />, back: <ServicesScene /> },
  { front: <ContactForm />, back: <BackCover />, backClass: styles.coverFace },
];

export default function Book() {
  const root = useRef(null);
  const first = useRef(true);
  const prevFlipped = useRef(0);

  const flipped = useBookStore((s) => s.flipped);
  const turning = useBookStore((s) => s.turning);
  const muted = useBookStore((s) => s.muted);
  const { next, prev, setTotal, clearTurning } = useBookStore.getState();
  const total = sheets.length;

  useEffect(() => {
    setTotal(total);
  }, [setTotal, total]);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // drop the "lifted" z-index once the flip finishes
  useEffect(() => {
    if (turning === null) return;
    const t = setTimeout(clearTurning, 1300);
    return () => clearTimeout(t);
  }, [turning, flipped, clearTurning]);

  // flip sound on every page turn, music starts when the book opens
  // flip sound on every page turn
  useEffect(() => {
    if (flipped === prevFlipped.current) return;
    prevFlipped.current = flipped;
    playFlip();
  }, [flipped]);

  // background music: try on load, then retry on the first interaction
  useEffect(() => {
    startMusic();

    const events = ["pointerdown", "click", "keydown", "touchend"];
    const unlock = () => {
      startMusic();
      events.forEach((e) => window.removeEventListener(e, unlock));
    };
    events.forEach((e) => window.addEventListener(e, unlock));

    return () => events.forEach((e) => window.removeEventListener(e, unlock));
  }, []);

  // mute button
  useEffect(() => {
    setMuted(muted);
  }, [muted]);

  // the actual 3D flip + centering the book
  useGSAP(
    () => {
      const dur = first.current ? 0 : 1.1;
      gsap.utils.toArray("[data-sheet]").forEach((el, i) => {
        gsap.to(el, {
          rotateY: i < flipped ? -180 : 0,
          duration: dur,
          ease: "power2.inOut",
        });
      });
      gsap.to("[data-book]", {
        xPercent: flipped === 0 ? -25 : flipped === total ? 25 : 0,
        duration: dur,
        ease: "power2.inOut",
      });
      first.current = false;
    },
    { dependencies: [flipped], scope: root }
  );

  return (
    <main className={styles.stage} ref={root}>
      <div className={styles.book} data-book>
        {sheets.map((sheet, i) => (
          <Page
            key={i}
            front={sheet.front}
            back={sheet.back}
            frontClass={sheet.frontClass}
            backClass={sheet.backClass}
            zIndex={i === turning ? 100 : i < flipped ? i + 1 : total - i}
            onFront={next}
            onBack={prev}
          />
        ))}
      </div>

      <div className={styles.controls}>
        <button onClick={prev} disabled={flipped === 0}>← Back</button>
        <span>{flipped} / {total}</span>
        <button onClick={next} disabled={flipped === total}>Next →</button>
      </div>

      <SoundToggle />
    </main>
  );
}