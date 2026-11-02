import styles from "./Cover.module.css";

const RUNES = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾ";

const stars = Array.from({ length: 30 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 100,
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
        <path id="runePath" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        <radialGradient id="sealGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c58bff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#c58bff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="98" fill="url(#sealGlow)" />

      <g className={styles.spinSlow}>
        <circle cx="100" cy="100" r="92" fill="none" stroke="#e8b94a" strokeWidth="1.4" />
        <circle cx="100" cy="100" r="68" fill="none" stroke="#e8b94a" strokeWidth="1" />
        <text fontSize="13" fill="#e8b94a" letterSpacing="3">
          <textPath href="#runePath">{RUNES}</textPath>
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

export default function Cover() {
  return (
    <div className={styles.cover}>
      <div className={styles.art}>
        {stars.map((s, i) => (
          <span
            key={i}
            className={styles.star}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
        <div className={styles.shine} />
      </div>

      <div className={styles.spine} />
      <div className={styles.frame} />

      <div className={styles.content}>
        <Seal />
        <h1 className={styles.name}>Arpit Joshi</h1>
        <p className={styles.role}>Full Stack Developer</p>
        <span className={styles.tap}>Tap to open ✦</span>
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