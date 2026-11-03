"use client";
import { useBookStore } from "@/store/useBookStore";

export default function SoundToggle() {
  const muted = useBookStore((s) => s.muted);
  const toggleMute = useBookStore((s) => s.toggleMute);

  return (
    <button
      onClick={toggleMute}
      aria-label={muted ? "Turn sound on" : "Turn sound off"}
      title={muted ? "Sound off" : "Sound on"}
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 200,
        width: "2.8rem",
        height: "2.8rem",
        borderRadius: "50%",
        border: "2px solid #e3a72f",
        background: "rgba(30, 14, 60, 0.85)",
        color: "#fbe08a",
        fontSize: "1.2rem",
        boxShadow: "0 0 14px rgba(227, 167, 47, 0.35)",
      }}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}