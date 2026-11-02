"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useBookStore } from "@/store/useBookStore";
import s from "./contactform.module.css";

// EmailJS keys come from .env.local (see setup notes). The public key is meant to be public.
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// ✏️ shown as a fallback if sending fails
const CONTACT_EMAIL = "arpitjoshi564@gmail.com";

const SERVICES = [
  "Portfolio website",
  "Industry / business website",
  "Web application",
  "Android application",
  "Something else",
];

// the little bottle shown after a successful send
function Bottle() {
  return (
    <svg className={s.bottle} viewBox="0 0 120 140" aria-hidden="true">
      <g className={s.bottleBob}>
        <rect x="50" y="8" width="20" height="16" rx="3" fill="#8a5a35" stroke="#2b2118" strokeWidth="2" />
        <path
          d="M52 24 H68 V38 Q92 48 92 74 V118 Q92 130 80 130 H40 Q28 130 28 118 V74 Q28 48 52 38 Z"
          fill="#bfe9e2"
          fillOpacity="0.7"
          stroke="#2b2118"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <rect x="44" y="64" width="32" height="44" rx="3" fill="#fffaf0" stroke="#2b2118" strokeWidth="1.8" transform="rotate(-6 60 86)" />
        <path d="M50 76 H70 M50 86 H70 M50 96 H64" stroke="#d9622b" strokeWidth="2" strokeLinecap="round" transform="rotate(-6 60 86)" />
      </g>
      <path d="M6 134 q12 -8 24 0 t24 0 t24 0 t24 0 t24 0" fill="none" stroke="#1f5f5b" strokeWidth="3" strokeLinecap="round" className={s.wave} />
    </svg>
  );
}

export default function ContactForm() {
  // Right page of sheet 7 → visible once 6 sheets are flipped
  const visible = useBookStore((st) => st.flipped >= 6);
  const on = visible ? ` ${s.in}` : "";

  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  // Don't let clicks / typing inside the form turn the book's pages
  const stop = (e) => e.stopPropagation();

 const handleSubmit = async (e) => {
  e.preventDefault();

  const form = formRef.current;
  if (!form) return;

  if (form.company.value) {
    setStatus("sent");
    return;
  }

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    setStatus("error");
    return;
  }

  setStatus("sending");

  try {
    await emailjs.sendForm(
      SERVICE_ID,
      TEMPLATE_ID,
      form,
      {
        publicKey: PUBLIC_KEY,
      }
    );

    setStatus("sent");
    form.reset();
  } catch (err) {
    console.error("EmailJS error:", err);
    setStatus("error");
  }
};

  return (
    <div
      className={s.page}
      onClick={stop}
      onPointerDown={stop}
      onKeyDown={stop}
      onKeyUp={stop}
    >
      <span className={`${s.chapter} ${s.reveal}${on}`} style={{ "--i": 0 }}>
        The final page
      </span>

      <h2 className={`${s.title} ${s.reveal}${on}`} style={{ "--i": 1 }}>
        A Message in a Bottle
      </h2>

      {status === "sent" ? (
        <div className={s.sent}>
          <Bottle />
          <p className={s.sentTitle}>Your bottle is on its way!</p>
          <p className={s.p}>Thank you. I&apos;ll write back to you very soon.</p>
          <button type="button" className={s.again} onClick={() => setStatus("idle")}>
            Send another
          </button>
        </div>
      ) : (
        <>
          <p className={`${s.p} ${s.reveal}${on}`} style={{ "--i": 2 }}>
            Have a quest worth building? Write it on the parchment, seal the
            bottle, and I&apos;ll reply by raven (email).
          </p>

          <form ref={formRef} className={s.form} onSubmit={handleSubmit}>
            <div className={`${s.row} ${s.reveal}${on}`} style={{ "--i": 3 }}>
              <label className={s.field}>
                <span className={s.label}>Your name</span>
                <input className={s.input} name="from_name" type="text" required maxLength={80} autoComplete="name" />
              </label>
              <label className={s.field}>
                <span className={s.label}>Your email</span>
                <input className={s.input} name="from_email" type="email" required maxLength={120} autoComplete="email" />
              </label>
            </div>

            <label className={`${s.field} ${s.reveal}${on}`} style={{ "--i": 4 }}>
              <span className={s.label}>What do you need?</span>
              <select className={s.input} name="service" defaultValue={SERVICES[0]}>
                {SERVICES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>

            <label className={`${s.field} ${s.reveal}${on}`} style={{ "--i": 5 }}>
              <span className={s.label}>Your message</span>
              <textarea className={`${s.input} ${s.textarea}`} name="message" required rows={4} maxLength={1500} />
            </label>

            {/* honeypot field, hidden from people */}
            <input className={s.hp} type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className={`${s.actions} ${s.reveal}${on}`} style={{ "--i": 6 }}>
              <button type="submit" className={s.send} disabled={status === "sending"}>
                {status === "sending" ? "Sealing the bottle..." : "Seal & send ✦"}
              </button>
              {status === "error" && (
                <span className={s.error} role="alert">
                  Oh no, the bottle sank. Please email me at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </span>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}