import type { CSSProperties } from "react";

import { uzt } from "../../../shared/i18n/uz-text";
import type { IoniconName } from "../../../shared/ui/mobile-icon";
import { darken } from "../../roadmap/ui/map/color";
import { AppIcon } from "../../roadmap/ui/map/icon";
import type { StudyDay, StudyNode } from "../model/study-path";
import { STUDY_NODE_ICON } from "../model/study-path-view";
import styles from "./study-map.module.css";

/**
 * 오늘 하루 배너 (앱 DayBanner) — 며칠째 · 얼마나 남았나 · 지금 급수(보여주기만).
 * 다음 급은 졸업 시험 합격으로만 간다.
 */
export function DayBanner({
  color,
  day,
  level,
  onLevelPress,
}: {
  color: string;
  day: StudyDay;
  level: number;
  /** 급수 목록 열기 (위 급은 시험 통과로만 간다) */
  onLevelPress: () => void;
}) {
  const done = day.nodes.filter((node) => node.done).length;
  const total = day.nodes.length;
  const complete = total > 0 && done >= total;
  const ratio = total > 0 ? Math.min(1, done / total) : 0;
  const style = {
    "--day": color,
    "--day-depth": darken(color, 42),
    "--day-mid": darken(color, 15),
  } as CSSProperties;
  return (
    <section className={styles.dayBanner} style={style}>
      <i className={styles.glow} />
      <i className={styles.depth} />
      <div className={styles.face}>
        <i className={styles.orbLarge} />
        <i className={styles.orbSmall} />
        <i className={styles.shine} />
        <span className={styles.dayBadge}>
          <span data-no-translate>{complete ? <AppIcon name="checkmark" size={24} /> : day.dayNumber}</span>
        </span>
        <span className={styles.body}>
          <small>
            {complete
              ? uzt("studyPath.dayComplete")
              : uzt(day.phase === 1 ? "studyPath.phaseLearn" : "studyPath.phasePractice", { n: day.dayNumber })}
          </small>
          <strong>{day.title}</strong>
          <span className={styles.progressRow}>
            <span className={styles.track}>
              <b style={{ width: `${ratio * 100}%` }} />
            </span>
            <em data-no-translate>{uzt("studyPath.progressOf", { done, total })}</em>
          </span>
        </span>
        <button
          aria-label={uzt("studyLevel.change")}
          className={styles.levelBadge}
          onClick={onLevelPress}
          type="button"
        >
          <span data-i18n="studyPath.levelShort">{uzt("studyPath.levelShort", { n: level })}</span>
          <AppIcon name="swap-vertical" size={13} />
        </button>
      </div>
    </section>
  );
}

/** 급수 안에서 섹션이 바뀌는 자리 — 잠금이 아니라 이정표 (앱 SectionDivider) */
export function SectionDivider({ color, section }: { color: string; section: number }) {
  return (
    <div className={styles.sectionDivider} style={{ "--day": color } as CSSProperties}>
      <i />
      <span>
        <AppIcon name="flag" size={13} />
        {uzt("studyPath.sectionStart", { n: section })}
      </span>
      <i />
    </div>
  );
}

const COUNT_LABEL: Record<string, string> = {
  final: "studyPath.countQuestions",
  grammar: "studyPath.countGrammar",
  grammarQuiz: "studyPath.countQuestions",
  recap: "studyPath.countQuestions",
  review: "studyPath.countQuestions",
  vocabQuiz: "studyPath.countQuestions",
  words: "studyPath.countWords",
};

/**
 * 학습 로드 노드 말풍선 (앱 StudyNodePopover) — 오늘 몇 번째 · 무엇 · 얼마나 · 시작/이어서.
 * 잠긴 노드도 미리 볼 수 있다 (시작만 못 한다).
 */
export function StudyNodePopover({
  color,
  node,
  onStart,
  step,
  stepCount,
  title,
  triangleOffsetX,
}: {
  color: string;
  node: StudyNode;
  onStart: () => void;
  step: number;
  stepCount: number;
  title: string;
  triangleOffsetX: number;
}) {
  const completed = node.status === "completed";
  const locked = node.status === "locked";
  const icon: IoniconName = completed
    ? "checkmark"
    : locked
      ? "lock-closed"
      : ((STUDY_NODE_ICON[node.kind] ?? "star") as IoniconName);
  const stepText = uzt("studyPath.step", { step, total: stepCount });
  const style = {
    "--arrow-x": `${triangleOffsetX}px`,
    "--day": color,
    "--day-shadow": darken(color, 60),
  } as CSSProperties;

  return (
    <div className={styles.popover} data-node-popover onClick={(event) => event.stopPropagation()} style={style}>
      <i className={styles.popArrow} />
      <div className={styles.titleRow}>
        <span className={styles.titleIcon}>
          <AppIcon name={icon} size={19} />
        </span>
        <span className={styles.titleTexts}>
          <small>{locked ? `${uzt("studyPath.preview")} · ${stepText}` : stepText}</small>
          <strong>{title}</strong>
        </span>
      </div>

      <p className={styles.description}>{uzt(`studyPath.desc.${node.kind}`)}</p>

      <div className={styles.metaRow}>
        {node.count > 0 ? (
          <span>
            <AppIcon name="layers-outline" size={15} />
            {uzt(COUNT_LABEL[node.kind] ?? "studyPath.countQuestions", { count: node.count })}
          </span>
        ) : null}
        {node.lessonCount > 1 ? (
          <span>
            <AppIcon name="albums-outline" size={15} />
            {uzt("studyPath.lessonProgress", { done: node.lessonsDone, total: node.lessonCount })}
          </span>
        ) : null}
      </div>

      {locked ? (
        <div className={styles.lockedNote}>
          <AppIcon name="time-outline" size={17} />
          <span>{uzt("studyPath.lockedHint")}</span>
        </div>
      ) : (
        <button className={styles.startButton} onClick={onStart} type="button">
          {uzt(
            completed ? "studyPath.again" : node.lessonsDone > 0 ? "studyPath.continueLesson" : "studyPath.start",
            { n: node.nextLesson },
          )}
          <AppIcon name="arrow-forward" size={19} />
        </button>
      )}
    </div>
  );
}

/** 그 급을 다 끝냈을 때 나오는 졸업 시험 카드 (앱 LevelExamCard) */
export function LevelExamCard({ level, onPress, passed }: { level: number; onPress: () => void; passed: boolean }) {
  const color = passed ? "#1D9E75" : "#E2A83A";
  const style = {
    "--exam": color,
    "--exam-depth": darken(color, 38),
    "--exam-mid": darken(color, 16),
  } as CSSProperties;
  return (
    <button className={styles.examCard} onClick={onPress} style={style} type="button">
      <i className={styles.examDepth} />
      <span className={styles.examFace}>
        <i className={styles.examShine} />
        <i className={styles.examOrb} />
        <span className={styles.examIcon}>
          <AppIcon name={passed ? "ribbon" : "school"} size={26} />
        </span>
        <span className={styles.examTexts}>
          <strong>{uzt("levelExam.cardTitle", { n: level })}</strong>
          <small>{uzt(passed ? "levelExam.cardDone" : "levelExam.cardBody")}</small>
        </span>
        <AppIcon name="chevron-forward" size={20} />
      </span>
    </button>
  );
}
