"use client";
import { useState } from "react";
import { useBookStore } from "@/store/useBookStore";
import s from "./ChapterOne.module.css"; // same page layout as Chapter 1

// ✏️ Edit this block to change the page
const PROJECT = {
  chapter: "Chapter Two",
  title: "The Hunt for the Hidden Treasures",
  problem:
    "In the next village, friends wanted a party game that turned their own rooms into a treasure map: a word is called, and the first to find that object wins. But a curse called Lag haunted every phone, because teaching a browser to recognise real things is heavy magic.",
  solution:
    "Arpit shrank the spell. A tiny YOLO11n model now runs right inside the browser, with no app to install and no waiting around. Hold the right object up to the camera and the round is yours, like a drawing game, but with the real world as the canvas.",
  stack: ["Next.js", "YOLO11n", "Real-time server", "Camera API"],
  demo: "https://github.com/arpitjoshi24/itemhunt", // ✏️ link to the live game / repo
};

export default function ChapterTwo() {
  // Right page of sheet 5 → visible once 4 sheets are flipped
  const visible = useBookStore((st) => st.flipped >= 4);
  const [open, setOpen] = useState(false);
  const on = visible ? ` ${s.in}` : "";

  return (
    <div className={s.page}>
      <span className={`${s.chapter} ${s.reveal}${on}`} style={{ "--i": 0 }}>
        {PROJECT.chapter}
      </span>

      <h2 className={`${s.title} ${s.reveal}${on}`} style={{ "--i": 1 }}>
        {PROJECT.title}
      </h2>

      <p className={`${s.p} ${s.reveal}${on}`} style={{ "--i": 2 }}>
        {PROJECT.problem}
      </p>

      <p className={`${s.p} ${s.reveal}${on}`} style={{ "--i": 3 }}>
        {PROJECT.solution}
      </p>

      <div className={`${s.chips} ${s.reveal}${on}`} style={{ "--i": 4 }}>
        {PROJECT.stack.map((t) => (
          <span key={t} className={s.chip}>
            {t}
          </span>
        ))}
      </div>

      <div className={`${s.flapWrap} ${s.reveal}${on}`} style={{ "--i": 5 }}>
        <div className={s.under}>
          <a href={PROJECT.demo} target="_blank" rel="noreferrer">
            ✦ Join the hunt (live demo)
          </a>
        </div>
        <button
          type="button"
          className={`${s.lid}${open ? ` ${s.lidOpen}` : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Close the flap" : "Lift the flap"}
        </button>
      </div>

      <div className={`${s.footer} ${s.reveal}${on}`} style={{ "--i": 6 }}>
        Turn the page →
      </div>
    </div>
  );
}