"use client";

import type { CSSProperties } from "react";

import type { AvatarConfig } from "../../../shared/model/avatar";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useAvatarStudy } from "../model/avatar-study";
import { uzt } from "../../../shared/i18n/uz-text";
import { RARITY_COLOR } from "../../../shared/ui/avatar-aura";
import { PET_LOOK, PET_ORDER, isPet, petSrc, petStage, type PetId } from "../../../shared/ui/avatar-pet";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import type { CosmeticsState } from "../api/cosmetics";
import { cosmeticPrice, ownsCosmetic } from "./aura-picker";
import styles from "./aura-picker.module.css";
import { PetGrowth } from "./pet-growth";
import petStyles from "./pet-picker.module.css";

/**
 * 캐릭터 에디터의 "Hayvoncha(펫)" 탭 — 모바일 PetPicker 와 같다.
 * 위: 고른 펫이 자라는 세 단계 + 지금 연속 학습일. 아래: 펫 카드 (지금 단계 모습).
 * 카드를 누르면 위 큰 캐릭터 옆에 바로 선다. 안 산 것이면 아래 버튼 → 시트 (오라와 같은 흐름).
 */
const fmt = (n: number) => n.toLocaleString("en-US");

export function PetGrid({
  draft,
  equipped,
  onPick,
  onRetry,
  state,
  status,
  streak,
}: {
  draft: AvatarConfig;
  /** 지금 저장돼 있는 펫 */
  equipped: string;
  onPick: (id: PetId) => void;
  onRetry: () => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
  streak: number;
}) {
  const { user } = useTelegramAuth();
  const { petStars } = useAvatarStudy();
  const starCount = user?.id ? petStars[user.id] ?? 0 : 0;

  if (status === "failed") {
    return (
      <div className={styles.failed}>
        <MobileIcon name="cloud-offline" size={26} />
        <p data-i18n="avatarEditor.pet.loadFailed">{uzt("avatarEditor.pet.loadFailed")}</p>
        <button onClick={onRetry} type="button">
          <span data-i18n="avatarEditor.aura.retry">{uzt("avatarEditor.aura.retry")}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <b data-i18n="avatarEditor.pet.title">{uzt("avatarEditor.pet.title")}</b>
        <small data-i18n="avatarEditor.pet.subtitle">{uzt("avatarEditor.pet.subtitle")}</small>
      </div>
      {isPet(draft.pet) ? (
        <div className={petStyles.starBadge}>
          <MobileIcon name="star" size={14} />
          <span data-i18n="avatarEditor.pet.reviewStars">{uzt("avatarEditor.pet.reviewStars", { n: starCount })}</span>
        </div>
      ) : null}
      <div className={petStyles.growth}>
        <PetGrowth pet={isPet(draft.pet) ? draft.pet : "pet_jindo"} streak={streak} />
      </div>
      <div className={styles.grid}>
        <PetCard draft={draft} equipped={equipped} id="pet_none" onPick={onPick} state={state} status={status} streak={streak} />
        {PET_ORDER.map((id) => (
          <PetCard draft={draft} equipped={equipped} id={id} key={id} onPick={onPick} state={state} status={status} streak={streak} />
        ))}
      </div>
    </div>
  );
}

function PetCard({
  draft,
  equipped,
  id,
  onPick,
  state,
  status,
  streak,
}: {
  draft: AvatarConfig;
  equipped: string;
  id: PetId;
  onPick: (id: PetId) => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
  streak: number;
}) {
  const selected = (draft.pet ?? "pet_none") === id;
  const look = isPet(id) ? PET_LOOK[id] : null;
  const owned = ownsCosmetic(state, id);
  const price = cosmeticPrice(state, id);
  const wearing = equipped === id;
  return (
    <button
      aria-pressed={selected}
      className={`${styles.card} ${selected ? styles.cardSelected : ""}`}
      data-rarity={look?.rarity ?? "none"}
      onClick={() => onPick(id)}
      style={{ "--rarity": look ? RARITY_COLOR[look.rarity] : "#c9c6dc", "--aura": look?.accent ?? "#c9c6dc" } as CSSProperties}
      type="button"
    >
      <span className={`${styles.preview} ${petStyles.preview}`}>
        {isPet(id) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="" className={petStyles.petImage} draggable={false} src={petSrc(id, petStage(streak))} />
        ) : (
          <span className={petStyles.none}>
            <MobileIcon name="paw-outline" size={34} />
          </span>
        )}
        {look ? (
          <em className={styles.rarity} data-i18n={`avatarEditor.aura.rarity.${look.rarity}`}>
            {uzt(`avatarEditor.aura.rarity.${look.rarity}`)}
          </em>
        ) : null}
        {selected ? (
          <i className={styles.check}>
            <MobileIcon name="checkmark" size={14} />
          </i>
        ) : null}
      </span>
      <span className={`${styles.info} ${petStyles.info}`}>
        <b data-i18n={id === "pet_none" ? "avatarEditor.pet.none" : `avatarEditor.pet.items.${id}.name`}>
          {id === "pet_none" ? uzt("avatarEditor.pet.none") : uzt(`avatarEditor.pet.items.${id}.name`)}
        </b>
        {id === "pet_none" ? null : wearing ? (
          <small className={styles.wearing} data-i18n="avatarEditor.pet.inUse">
            {uzt("avatarEditor.pet.inUse")}
          </small>
        ) : price === 0 ? (
          <small className={styles.free}>
            <MobileIcon name="sparkles" size={12} />
            <span data-i18n="avatarEditor.aura.free">{uzt("avatarEditor.aura.free")}</span>
          </small>
        ) : owned ? (
          <small className={styles.owned}>
            <MobileIcon name="checkmark-circle" size={13} />
            <span data-i18n="avatarEditor.aura.owned">{uzt("avatarEditor.aura.owned")}</span>
          </small>
        ) : (
          <small className={styles.price} data-no-translate>
            <MobileIcon name="diamond" size={12} />
            {status === "loading" || price === null ? "…" : fmt(price)}
          </small>
        )}
      </span>
    </button>
  );
}
