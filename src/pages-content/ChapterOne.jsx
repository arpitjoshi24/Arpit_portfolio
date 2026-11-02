"use client";
import { useState } from "react";
import { useBookStore } from "@/store/useBookStore";
import s from "./ChapterOne.module.css";

// ✏️ Edit this block to change the page
const PROJECT = {
  chapter: "Chapter One",
  title: "The Kingdom of Tangled Tasks",
  problem:
    "In the kingdom of Teamwork, every task lived on a different scrap of paper. Nobody knew who owned what, deadlines slipped by unnoticed, and a tangle called Chaos grew bigger every day.",
  solution:
    "Arpit built TaskFlow, a full-stack task platform with three royal roles: Admins, Managers and Members. Tasks are assigned, tracked and announced before they are due, and 50+ people could work at once, with team efficiency up 25%. Docker packed the whole kingdom into one box, cutting setup time by 70%.",
  stack: ["Full-stack", "Role-based access", "Docker", "Notifications"],
  demo: "https://github.com/arpitjoshi24/Multi-Tenant-Task-Management-Platform", // ✏️ link to the live app / GitHub repo
};

export default function ChapterOne() {
  // Right page of sheet 4 → visible once 3 sheets are flipped
  const visible = useBookStore((st) => st.flipped >= 3);
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

      {/* Lift-the-flap interaction */}
      <div className={`${s.flapWrap} ${s.reveal}${on}`} style={{ "--i": 5 }}>
        <div className={s.under}>
          <a href={PROJECT.demo} target="_blank" rel="noreferrer">
            ✦ See the victory (project link)
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