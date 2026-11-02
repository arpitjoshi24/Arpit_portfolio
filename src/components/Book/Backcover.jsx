import styles from "./Backcover.module.css";

// ✏️ Edit your links here
const EMAIL = "arpitjoshi564@gmail.com";
const GITHUB = "https://github.com/arpitjoshi24";
const LINKEDIN = "#"; // add your LinkedIn URL

const RUNES = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾ";

const stars = Array.from({ length: 30 }, (_, i) => ({
  left: (i * 41 + 17) % 100,
  top: (i * 59 + 3) % 100,
  size: 2 + (i % 3),
  delay: (i % 8) * 0.5,
}));

function Ornament() {
  return (
    <svg className={styles.orn} viewBox="0 0 40 40" aria-hidden="true">
      <g fill="none" stroke="#e8b94a" strokeWidth="2" strokeLinecap="round">
        <path d="M6 22 Q6 6 22 6" />
        <path d="M12 24 Q12 12 24 12" />
        <circle cx="26" cy="26" r="3" fill="#e8b94a" stroke="none" />
      </g>
    </svg>
  );
}

function Corner({ pos }) {
  return (
    <div className={`${styles.corner} ${styles[pos]}`}>
      <Ornament />
    </div>
  );
}

function Seal() {
  return (
    <svg className={styles.seal} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path id="bcRunePath" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        <radialGradient id="bcSealGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c58bff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#c58bff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="98" fill="url(#bcSealGlow)" />

      <g className={styles.spinSlow}>
        <circle cx="100" cy="100" r="92" fill="none" stroke="#e8b94a" strokeWidth="1.4" />
        <circle cx="100" cy="100" r="68" fill="none" stroke="#e8b94a" strokeWidth="1" />
        <text fontSize="13" fill="#e8b94a" letterSpacing="3">
          <textPath href="#bcRunePath">{RUNES}</textPath>
        </text>
      </g>

      <g className={styles.spinRev}>
        <polygon points="100,38 153.7,131 46.3,131" fill="none" stroke="#e8b94a" strokeWidth="1.2" />
        <polygon points="100,162 46.3,69 153.7,69" fill="none" stroke="#e8b94a" strokeWidth="1.2" />
      </g>

      <circle cx="100" cy="100" r="22" fill="none" stroke="#e8b94a" strokeWidth="1.2" />
      <path
        className={styles.pulse}
        d="M100 82 L104 96 L118 100 L104 104 L100 118 L96 104 L82 100 L96 96 Z"
        fill="#fbe08a"
      />
    </svg>
  );
}

export default function BackCover() {
  // Links sit on a page that turns on click, so keep clicks from bubbling up
  const stop = (e) => e.stopPropagation();

  return (
    <div className={styles.back}>
      <div className={styles.art}>
        {stars.map((st, i) => (
          <span
            key={i}
            className={styles.star}
            style={{
              left: `${st.left}%`,
              top: `${st.top}%`,
              width: st.size,
              height: st.size,
              animationDelay: `${st.delay}s`,
            }}
          />
        ))}
        <div className={styles.shine} />
      </div>

      <div className={styles.spine} />
      <div className={styles.frame} />

      <div className={styles.content} onClick={stop} onPointerDown={stop}>
        <Seal />

        <span className={styles.end}>✦ The End ✦</span>
        <h2 className={styles.title}>Every great story needs a next chapter</h2>
        <p className={styles.sub}>
          Have an idea for a portfolio, a website or an app? Let&apos;s write it together.
        </p>

        <a
          className={styles.hire}
          href={`mailto:${EMAIL}?subject=${encodeURIComponent("Let's work together")}`}
        >
          Hire me ✦
        </a>

        <div className={styles.links}>
          <a href={`mailto:${EMAIL}`}>Email</a>
          <span aria-hidden="true">·</span>
          <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
          <span aria-hidden="true">·</span>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>

        <p className={styles.sig}>Arpit Joshi · Full Stack Developer</p>
      </div>

      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      <div className={styles.strap}>
        <span className={styles.stud} />
      </div>
    </div>
  );
}