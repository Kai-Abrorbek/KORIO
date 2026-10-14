"use client";

import type { CSSProperties } from "react";

import styles from "./avatar-pet.module.css";

/**
 * 펫 — 캐릭터 옆에 서 있는 친구 (api cosmetics, slot pet). 모바일 AvatarPet 과 같다.
 *
 * 연속 학습일(streak)로 자란다: 0~6일 아기 · 7~29일 꼬마 · 30일~ 다 큼.
 * 연속이 끊기면 다시 아기 — 단계는 서버에 없고 그때그때 streak 로 정한다.
 * 그림은 public/pets/<id>_<단계>.webp (320×320 투명). 움직이지 않는다.
 */
export type PetId = "pet_none" | "pet_jindo" | "pet_hangulmon" | "pet_tiger" | "pet_dokkaebi";
export type PaidPet = Exclude<PetId, "pet_none">;
export type PetStage = 0 | 1 | 2;

/** 에디터 그리드 순서 — 희귀도 낮은 것부터 */
export const PET_ORDER: PaidPet[] = ["pet_jindo", "pet_hangulmon", "pet_tiger", "pet_dokkaebi"];

export const PET_LOOK: Record<PaidPet, { accent: string; rarity: "common" | "rare" | "epic" | "legendary" }> = {
  pet_jindo: { accent: "#E8414C", rarity: "rare" },
  pet_hangulmon: { accent: "#8B6CF0", rarity: "rare" },
  pet_tiger: { accent: "#FFA640", rarity: "epic" },
  pet_dokkaebi: { accent: "#5DB4F2", rarity: "legendary" },
};

/** 단계가 시작되는 연속 학습일 */
export const PET_STAGE_DAYS = [0, 7, 30] as const;
/** 단계마다 보이는 크기 (다 큼 = 1) */
export const PET_SCALE: Record<PetStage, number> = { 0: 0.7, 1: 0.85, 2: 1 };

export const isPet = (value: unknown): value is PaidPet => typeof value === "string" && value in PET_LOOK;

export function petStage(streak: number | null | undefined): PetStage {
  const days = Math.max(0, streak ?? 0);
  return days >= PET_STAGE_DAYS[2] ? 2 : days >= PET_STAGE_DAYS[1] ? 1 : 0;
}

/** 다음 단계까지 남은 날 (다 컸으면 null) */
export function daysToGrow(streak: number | null | undefined) {
  const stage = petStage(streak);
  if (stage === 2) return null;
  return PET_STAGE_DAYS[(stage + 1) as 1 | 2] - Math.max(0, streak ?? 0);
}

export const petSrc = (id: PaidPet, stage: PetStage) => `/pets/${id}_${stage}.webp`;

/**
 * 캐릭터 상자 안에 얹는 펫 — 캐릭터 왼발 옆. 부모(캐릭터 상자)는 position: relative.
 * size: 캐릭터 상자 대비 다 큰 펫 너비 (기본 44%)
 */
export function AvatarPet({
  pet,
  streak,
  size = 44,
  className,
}: {
  pet?: string | null;
  streak?: number | null;
  size?: number;
  className?: string;
}) {
  if (!isPet(pet)) return null;
  const stage = petStage(streak);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      aria-hidden="true"
      className={`${styles.pet} ${className ?? ""}`}
      decoding="async"
      draggable={false}
      src={petSrc(pet, stage)}
      style={{ "--pet-w": `${size * PET_SCALE[stage]}%` } as CSSProperties}
    />
  );
}
