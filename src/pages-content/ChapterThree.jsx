"use client";
import { useState } from "react";
import { useBookStore } from "@/store/useBookStore";
import s from "./ChapterOne.module.css"; // same page layout as Chapters 1 and 2

// ✏️ Edit this block to change the page
const PROJECT = {
  chapter: "Chapter Three",
  title: "The Messenger Who Never Got Lost",
  problem:
    "Across the realm, builders sent messages to servers all day (GET, POST, PUT, DELETE), but their tools were heavy, slow to set up, and forgot everything between visits. Every test meant typing the same long addresses again, and the hours slipped away.",
  solution:
    "Arpit forged API Master, a light desktop app built with Electron and React. It sends any request in one click, remembers 10+ environments and collections, and keeps a history so the messenger never forgets the road. Setup time fell by 50%, and the whole testing workflow got 60% faster.",
  stack: ["Electron.js", "React", "REST APIs", "Desktop app"],
  demo: "https://github.com/arpitjoshi24/API-Master", // ✏️ link to the GitHub repo / download
};

export default function ChapterThree() {
  // Right page of sheet 6 → visible once 5 sheets are flipped
  const visible = useBookStore((st) => st.flipped >= 5);
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
            ✦ See the code (GitHub)
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
        The final page awaits →
      </div>
    </div>
  );
}