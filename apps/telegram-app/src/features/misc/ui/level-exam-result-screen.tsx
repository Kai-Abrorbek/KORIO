"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, type CSSProperties } from "react";

import { uzt } from "../../../shared/i18n/uz-text";
import { playSfx, preloadSfx } from "../../../shared/browser/sfx";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useCourseCopyKey } from "../../learning/model/course-copy";
import { WEAK_AREA_LABELS } from "../model/misc";
import styles from "./celebration-screen.module.css";

export function LevelExamResultScreen() {
  const router = useRouter();
  const copyKey = useCourseCopyKey();
  const params = useSearchParams();
  const passed = params.get("passed") === "1";
  useEffect(() => {
    if (!passed) return;
    preloadSfx("level-up");
    const timer = window.setTimeout(() => playSfx("level-up"), 0);
    return () => window.clearTimeout(timer);
  }, [passed]);
  // 기회(하트)를 다 써서 중간에 끝났는지 — 앱 LevelExamResultScreen 과 같은 문구
  const heartsOut = !passed && params.get("heartsOut") === "1";
  const hearts = Number(params.get("hearts")) || 5;
  const correct = Math.max(0, Number(params.get("correct")) || 0);
  const total = Math.max(0, Number(params.get("total")) || 0);
  const level = Math.max(1, Number(params.get("level")) || 1);
  const nextLevel = Number(params.get("nextLevel")) || null;
  const gems = Math.max(0, Number(params.get("gems")) || 0);
  const xp = Math.max(0, Number(params.get("xp")) || 0);
  const weak = (params.get("weak") ?? "").split(",").filter(Boolean);
  const ratio = total ? Math.round(correct / total * 100) : 0;

  return (
    <main className={`${styles.examPage} ${passed ? styles.examPassedPage : styles.examMissedPage}`}>
      {passed ? <div className={styles.examConfetti} aria-hidden="true">{Array.from({ length: 22 }, (_, index) => <i key={index} style={{ "--i": index } as CSSProperties} />)}</div> : null}
      <section className={styles.examContent}>
        <Image alt="Haneulmon" className={styles.examMascot} height={passed ? 170 : 150} src={`/characters/hangulmon_${passed ? "celebrating" : "default"}.png`} unoptimized width={passed ? 170 : 150} />
        {/* 영어 코스는 영어용 문구 (learning/model/course-copy — 한국어 화면의 "급" → "단계") */}
        {passed ? (
          <h1 data-i18n={copyKey("levelExam.passedTitle")}>{uzt(copyKey("levelExam.passedTitle"), { n: level })}</h1>
        ) : heartsOut ? (
          <h1>{uzt("levelExam.heartsOutTitle")}</h1>
        ) : (
          <h1 data-i18n={copyKey("levelExam.missedTitle")}>{uzt(copyKey("levelExam.missedTitle"), { n: level })}</h1>
        )}
        {passed ? (
          <p data-i18n={copyKey("levelExam.passedBody")}>{uzt(copyKey("levelExam.passedBody"))}</p>
        ) : heartsOut ? (
          <p>{uzt("levelExam.heartsOutBody", { hearts })}</p>
        ) : (
          <p data-i18n={copyKey("levelExam.missedBody")}>{uzt(copyKey("levelExam.missedBody"))}</p>
        )}
        <div className={styles.examScore}><b>{ratio}%</b><span>{`${total} savoldan ${correct} tasi to'g'ri`}</span></div>
        {passed && (gems > 0 || xp > 0) ? <div className={styles.examRewards}>
          {gems > 0 ? <span><MobileIcon name="diamond" size={19} />+{gems}</span> : null}
          {xp > 0 ? <span><MobileIcon name="flash" size={19} />{`+${xp} XP`}</span> : null}
        </div> : null}
        {weak.length ? <div className={styles.weakCard}><strong>Shu qismlar qiyin bo&apos;ldi</strong><div>{weak.map((area) => <span key={area}>{WEAK_AREA_LABELS[area] ?? "Boshqa"}</span>)}</div></div> : null}
        {nextLevel ? (
          <small className={styles.nextLevel} data-i18n={copyKey("levelExam.nextOpen")}>
            {uzt(copyKey("levelExam.nextOpen"), { n: nextLevel })}
          </small>
        ) : null}
      </section>
      <footer className={styles.examActions}>
        <button className={styles.examPrimary} onClick={() => router.replace("/study-path")} type="button">Davom etish</button>
        {!passed ? <button className={styles.examRetry} onClick={() => router.replace(`/lesson?mode=levelExam&from=studyPath${params.get("examLevel") ? `&examLevel=${params.get("examLevel")}` : ""}`)} type="button">Qayta urinish</button> : null}
      </footer>
    </main>
  );
}
