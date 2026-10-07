import styles from "./roadmap-map.module.css";

/** 로드맵 배경 — 그라데이션 + 구름·언덕·반짝이 (앱 RoadmapBackdrop) */
export function RoadmapBackdrop() {
  return (
    <div aria-hidden="true" className={styles.backdrop}>
      <i className={styles.orbTop} />
      <i className={styles.orbSide} />
      <i className={styles.cloud}>
        <b />
        <b />
        <b />
      </i>
      <i className={styles.hillLeft} />
      <i className={styles.hillRight} />
      <i className={`${styles.sparkle} ${styles.sparkleOne}`} />
      <i className={`${styles.sparkle} ${styles.sparkleTwo}`} />
      <i className={`${styles.sparkle} ${styles.sparkleThree}`} />
    </div>
  );
}
