import type { CSSProperties } from "react";

import { uzt } from "../../../../shared/i18n/uz-text";
import { darken } from "./color";
import { AppIcon } from "./icon";
import styles from "./roadmap-map.module.css";

/** 지금 보고 있는 유닛 배너 (앱 SectionBanner) — 누르면 섹션 목록 */
export function SectionBanner({
  color,
  label = uzt("roadmap.allSections"),
  onPress,
  sectionNumber,
  title,
  unitNumber,
}: {
  color: string;
  /** 누르면 열리는 목록 이름 (접근성) */
  label?: string;
  onPress: () => void;
  sectionNumber: number;
  title: string;
  unitNumber: number;
}) {
  const style = {
    "--unit": color,
    "--unit-depth": darken(color, 42),
    "--unit-mid": darken(color, 15),
  } as CSSProperties;
  return (
    <section className={styles.banner} style={style}>
      <i className={styles.bannerGlow} />
      <i className={styles.bannerDepth} />
      <div className={styles.bannerFace}>
        <i className={styles.bannerOrbLarge} />
        <i className={styles.bannerOrbSmall} />
        <i className={styles.bannerShine} />
        <button aria-label={label} className={styles.bannerMain} onClick={onPress} type="button">
          <span className={styles.mapBadge}>
            <span>
              <AppIcon name="map" size={21} />
            </span>
          </span>
          <span className={styles.bannerText}>
            <small>{uzt("roadmap.sectionUnit", { section: sectionNumber, unit: unitNumber })}</small>
            <strong>{title}</strong>
          </span>
        </button>
        <button aria-label={label} className={styles.guide} onClick={onPress} type="button">
          <i />
          <span>
            <AppIcon name="reader-outline" size={24} />
          </span>
        </button>
      </div>
    </section>
  );
}
