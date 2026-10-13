import type { ReactNode } from "react";

import { uzt } from "../../../../shared/i18n/uz-text";
import { AppIcon } from "./icon";
import styles from "./roadmap-map.module.css";

/** 로드맵 맨 아래 — 아직 못 여는 다음 섹션 + 건너뛰기 (앱 NextSectionLocked) */
export function NextSectionLocked({
  badgeKey = "roadmap.nextSection",
  className,
  description,
  jumpDisabled = false,
  jumpKey = "roadmap.jumpHere",
  onJump,
  sectionNumber,
  title,
}: {
  /** 로드맵 중간(주제 사이)에 끼울 때 위아래 경계를 더 준다 (표현 로드맵) */
  className?: string;
  /** 넘어가는 중 — 두 번 눌리지 않게 */
  jumpDisabled?: boolean;
  /** 위 작은 뱃지 글자의 locale 키 (학습 로드는 "다음 급") */
  badgeKey?: string;
  /** 아래 버튼 글자의 locale 키 (학습 로드는 "시험 보고 바로 넘어가기") */
  jumpKey?: string;
  description?: string;
  /** 없으면 건너뛰기 버튼을 안 그린다 (학습 로드의 다음 급은 졸업 시험으로만 간다) */
  onJump?: () => void;
  sectionNumber: number;
  title?: ReactNode;
}) {
  return (
    <section className={styles.nextSection + (className ? " " + className : "")}>
      <span className={styles.nextBadge} data-i18n={badgeKey}>{uzt(badgeKey)}</span>
      <div className={styles.nextTitleRow}>
        {/* 아직 못 여는 구간이라 벅차하는 표정 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src="/characters/hangulmon_overwhelmed.png" />
        <AppIcon name="lock-closed" size={22} />
        <strong>{title || `Section ${sectionNumber}`}</strong>
      </div>
      {description ? <p className={styles.nextDesc}>{description}</p> : null}
      {onJump ? (
        <button className={styles.nextJump} disabled={jumpDisabled} onClick={onJump} type="button">
          <i />
          <span data-i18n={jumpKey}>{uzt(jumpKey)}</span>
        </button>
      ) : null}
    </section>
  );
}
