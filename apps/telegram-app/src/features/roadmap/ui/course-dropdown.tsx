"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { getRoadmapScore, getStudyPathScore } from "../api/roadmap";
import type { RoadmapScoreResponse } from "../model/roadmap";
import styles from "./course-dropdown.module.css";

/**
 * 로드맵 헤더의 🇰🇷 스코어를 누르면 위에서 내려오는 패널 — 앱 CourseDropdown.
 * 수강 중 과정 + 과정 추가, 스코어 진행 카드("Ball haqida" → /score).
 *
 * 스코어는 학습 모드마다 다르다 (자유 = 레슨 완료, 로드 = 하루 노드 완료).
 */
const EMPTY: RoadmapScoreResponse = { completedUnits: 0, milestones: [], nextScore: 0, progress: 0, score: 0 };

export function CourseDropdown({
  category,
  onClose,
  studyMode,
  visible,
}: {
  visible: boolean;
  onClose: () => void;
  studyMode: "guided" | "free";
  /** 로드맵 트랙. "grammar" 면 문법 스코어 (헤더 숫자와 같은 기준) */
  category?: string | null;
}) {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const [score, setScore] = useState<RoadmapScoreResponse>(EMPTY);

  useEffect(() => {
    if (!visible) return;
    let alive = true;
    const grammar = !!category && category !== "vocabulary";
    const load = studyMode === "guided" && !grammar ? getStudyPathScore(request) : getRoadmapScore(request, category);
    void load.then((value) => alive && setScore(value)).catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [category, request, studyMode, visible]);

  if (!visible) return null;
  const go = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <div className={styles.root}>
      <section className={styles.panel}>
        <small className={styles.sectionLabel}>O‘rganilmoqda</small>
        <div className={styles.row}>
          <button className={styles.courseItem} onClick={onClose} type="button">
            <span className={`${styles.iconBox} ${styles.iconBoxActive}`}><i data-no-translate>🇰🇷</i></span>
            <b>Koreys tili</b>
          </button>
          <button className={styles.courseItem} onClick={() => go("/courses")} type="button">
            <span className={`${styles.iconBox} ${styles.iconBoxAdd}`}><MobileIcon name="add" size={40} /></span>
            <b className={styles.muted}>Kurslar</b>
          </button>
        </div>

        <div className={styles.scoreCard}>
          <div className={styles.scoreBarRow}>
            <b data-no-translate>{score.score}</b>
            <span className={styles.scoreTrack}><i style={{ width: `${Math.round(score.progress * 100)}%` }} /></span>
            <b data-no-translate>{score.nextScore}</b>
          </div>
          <p>{`Sizning ballingiz: ${score.score}.`}</p>
          <button className={styles.scoreLink} onClick={() => go("/score")} type="button">Ball haqida</button>
        </div>

        <button aria-label="Yopish" className={styles.grabberZone} onClick={onClose} type="button"><i /></button>
      </section>
      <button aria-label="Yopish" className={styles.backdrop} onClick={onClose} type="button" />
    </div>
  );
}
