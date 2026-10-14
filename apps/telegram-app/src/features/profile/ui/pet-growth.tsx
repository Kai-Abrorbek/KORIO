"use client";

import { uzt } from "../../../shared/i18n/uz-text";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { PET_STAGE_DAYS, daysToGrow, petSrc, petStage, type PaidPet, type PetStage } from "../../../shared/ui/avatar-pet";
import styles from "./pet-growth.module.css";

/**
 * 펫이 자라는 세 단계 — 아기 · 꼬마 · 다 큼 (그림 + 며칠부터). 지금 단계에 테두리.
 * 아래 줄: 지금 며칠 연속 / 며칠 더 하면 자라는지 (다 컸으면 끊기면 다시 아기가 된다는 경고).
 */
export function PetGrowth({ pet, streak }: { pet: PaidPet; streak: number }) {
  const stage = petStage(streak);
  const left = daysToGrow(streak);
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <b data-i18n="avatarEditor.pet.growTitle">{uzt("avatarEditor.pet.growTitle")}</b>
        <span className={styles.streak}>
          <MobileIcon name="flame" size={14} />
          <span data-i18n="avatarEditor.pet.streakNow">{uzt("avatarEditor.pet.streakNow", { n: streak })}</span>
        </span>
      </div>
      <div className={styles.stages}>
        {([0, 1, 2] as PetStage[]).map((s) => (
          <span className={`${styles.stage} ${s === stage ? styles.now : ""} ${s > stage ? styles.later : ""}`} key={s}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" draggable={false} src={petSrc(pet, s)} />
            <b data-i18n={`avatarEditor.pet.stages.s${s}`}>{uzt(`avatarEditor.pet.stages.s${s}`)}</b>
            <small data-i18n="avatarEditor.pet.stageAt">{uzt("avatarEditor.pet.stageAt", { n: PET_STAGE_DAYS[s] })}</small>
          </span>
        ))}
      </div>
      {left === null ? (
        <p className={styles.note} data-i18n="avatarEditor.pet.grownUp">{uzt("avatarEditor.pet.grownUp")}</p>
      ) : (
        <p className={styles.note} data-i18n="avatarEditor.pet.growNext">{uzt("avatarEditor.pet.growNext", { n: left })}</p>
      )}
    </div>
  );
}
