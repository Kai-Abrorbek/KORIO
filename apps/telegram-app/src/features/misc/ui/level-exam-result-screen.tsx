"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import type { CSSProperties } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { WEAK_AREA_LABELS } from "../model/misc";
import styles from "./celebration-screen.module.css";

export function LevelExamResultScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const passed = params.get("passed") === "1";
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
        <h1>{passed ? `${level}-daraja o'tildi!` : `${level}-daraja, ozgina qoldi`}</h1>
        <p>{passed ? "Bu yergacha kelganingiz zo'r. Keyingi darajaga o'tamiz." : "Keyingi daraja ochiq. Quyidagilarni yana bir ko'rsangiz ancha oson bo'ladi."}</p>
        <div className={styles.examScore}><b>{ratio}%</b><span>{total} savoldan {correct} tasi to&apos;g&apos;ri</span></div>
        {passed && (gems > 0 || xp > 0) ? <div className={styles.examRewards}>
          {gems > 0 ? <span><MobileIcon name="diamond" size={19} />+{gems}</span> : null}
          {xp > 0 ? <span><MobileIcon name="flash" size={19} />+{xp} XP</span> : null}
        </div> : null}
        {weak.length ? <div className={styles.weakCard}><strong>Shu qismlar qiyin bo&apos;ldi</strong><div>{weak.map((area) => <span key={area}>{WEAK_AREA_LABELS[area] ?? "Boshqa"}</span>)}</div></div> : null}
        {nextLevel ? <small className={styles.nextLevel}>{nextLevel}-daraja ochildi</small> : null}
      </section>
      <footer className={styles.examActions}>
        <button className={styles.examPrimary} onClick={() => router.replace("/study-path")} type="button">Davom etish</button>
        {!passed ? <button className={styles.examRetry} onClick={() => router.replace("/lesson?mode=levelExam&from=studyPath")} type="button">Qayta urinish</button> : null}
      </footer>
    </main>
  );
}
