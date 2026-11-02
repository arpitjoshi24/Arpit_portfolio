import styles from "./Book.module.css";

export default function Page({ front, back, zIndex, onFront, onBack, frontClass = "" }) {
  return (
    <div data-sheet className={styles.sheet} style={{ zIndex }}>
      <div className={`${styles.face} ${styles.front} ${frontClass}`} onClick={onFront}>
        {front}
      </div>
      <div className={`${styles.face} ${styles.back}`} onClick={onBack}>
        {back}
      </div>
    </div>
  );
}