"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import type { AvatarConfig } from "../../../shared/model/avatar";
import { uzt } from "../../../shared/i18n/uz-text";
import { useTelegramBackOverride } from "../../../shared/telegram/back-button";
import { AURA_LOOK, AURA_ORDER, AvatarAura, RARITY_COLOR, isAura, type AuraId } from "../../../shared/ui/avatar-aura";
import { SCENE_LOOK, SceneBackdrop, isScene, type SceneId } from "../../../shared/ui/avatar-scene";
import { AvatarPet, PET_LOOK, isPet, type PaidPet } from "../../../shared/ui/avatar-pet";
import { WEAR_LOOK, isCostume, isHand, type WearItemId } from "../../../shared/model/avatar-wearables";
import { PetGrowth } from "./pet-growth";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useSwipeToClose } from "../../../shared/ui/use-swipe-to-close";
import { GeneratedAvatar } from "../../league/ui/generated-avatar";
import type { CosmeticsState } from "../api/cosmetics";
import styles from "./aura-picker.module.css";

/**
 * 캐릭터 에디터의 "Aura" 탭 — 모바일 AuraPicker 와 같다.
 * 카드를 누르면 바로 입어본다(위 큰 캐릭터에 오라가 뜬다). 사는 건 아래 버튼 → 시트.
 */
const fmt = (n: number) => n.toLocaleString("en-US");

/** 상점 꾸미기 아이템 (오라 · 배경 장면 · 펫) — 사는 시트·산 직후 창은 다 같이 쓴다 */
export type ShopItemId = Exclude<AuraId, "aura_none"> | Exclude<SceneId, "scene_none"> | PaidPet | WearItemId;
export type ShopSlot = "aura" | "scene" | "pet" | "costume" | "hand";

export const slotOf = (id: ShopItemId): ShopSlot =>
  isScene(id) ? "scene" : isPet(id) ? "pet" : isCostume(id) ? "costume" : isHand(id) ? "hand" : "aura";

export function cosmeticPrice(state: CosmeticsState | null, id: string) {
  return state?.items.find((item) => item.id === id)?.price ?? null;
}

/** 이 칸 아이템이 전부 무료인가 — 에디터 위 배지를 보석 잔액 대신 "전부 무료" 로 */
export function slotAllFree(state: CosmeticsState | null, slot: ShopSlot) {
  const items = state?.items.filter((item) => item.slot === slot) ?? [];
  return items.length > 0 && items.every((item) => item.price <= 0);
}

/** 가격 0 = 무료 (서버는 무료 아이템을 owned 에도 넣어 준다). 없음(_none)은 늘 가진 것 */
export function ownsCosmetic(state: CosmeticsState | null, id: string | undefined) {
  if (!id || id.endsWith("_none")) return true;
  return Boolean(state?.owned.includes(id));
}

/** 사는 시트·산 직후 창의 색 — 오라는 오라 빛, 장면·펫은 강조색 */
function shopLook(id: ShopItemId) {
  if (isScene(id)) return { rarity: SCENE_LOOK[id].rarity, color: SCENE_LOOK[id].accent, keys: "avatarEditor.scene" };
  if (isPet(id)) return { rarity: PET_LOOK[id].rarity, color: PET_LOOK[id].accent, keys: "avatarEditor.pet" };
  if (isCostume(id) || isHand(id)) return { rarity: WEAR_LOOK[id].rarity, color: WEAR_LOOK[id].accent, keys: "avatarEditor.wear" };
  return { rarity: AURA_LOOK[id].rarity, color: AURA_LOOK[id].color, keys: "avatarEditor.aura" };
}

/** 시트·산 직후 창 위 그림 — 오라는 오라 두른 캐릭터, 장면은 그 장면 앞에, 펫은 캐릭터 옆에 */
function ShopStage({
  avatar,
  id,
  className = "",
  streak = 0,
}: {
  avatar: AvatarConfig;
  id: ShopItemId;
  className?: string;
  streak?: number;
}) {
  if (isCostume(id) || isHand(id)) {
    // 의상·손 — 그 아이템을 입은 캐릭터 (장면이 있으면 그 앞에)
    const worn = { ...avatar, [isCostume(id) ? "costume" : "hand"]: id };
    return (
      <div className={`${className} ${styles.sceneStage} ${styles.petStage}`}>
        <SceneBackdrop scene={avatar.scene} />
        <span className={styles.sceneStageAvatar}>
          <AvatarAura aura={avatar.aura}>
            <GeneratedAvatar avatar={worn} variant="full" />
          </AvatarAura>
        </span>
      </div>
    );
  }
  if (isPet(id)) {
    return (
      <div className={`${className} ${styles.sceneStage} ${styles.petStage}`}>
        <SceneBackdrop scene={avatar.scene} />
        <span className={`${styles.sceneStageAvatar} ${styles.petStageAvatar}`}>
          <AvatarAura aura={avatar.aura}>
            <GeneratedAvatar avatar={avatar} variant="full" />
          </AvatarAura>
          {/* 시트에선 펫이 주인공 — 크게 */}
          <AvatarPet pet={id} size={64} streak={streak} />
        </span>
      </div>
    );
  }
  if (isScene(id)) {
    return (
      <div className={`${className} ${styles.sceneStage}`}>
        <SceneBackdrop scene={id} />
        <span className={styles.sceneStageAvatar}>
          <AvatarAura aura={avatar.aura}>
            <GeneratedAvatar avatar={{ ...avatar, scene: id }} variant="full" />
          </AvatarAura>
        </span>
      </div>
    );
  }
  return (
    <div className={className}>
      <span className={styles.sheetAvatar}>
        <AvatarAura aura={id}>
          <GeneratedAvatar avatar={{ ...avatar, aura: id }} variant="full" />
        </AvatarAura>
      </span>
    </div>
  );
}

export function AuraGrid({
  draft,
  equipped,
  onPick,
  onRetry,
  state,
  status,
}: {
  draft: AvatarConfig;
  /** 지금 저장돼 있는 오라 */
  equipped: string;
  onPick: (id: AuraId) => void;
  onRetry: () => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
}) {
  if (status === "failed") {
    return (
      <div className={styles.failed}>
        <MobileIcon name="cloud-offline" size={26} />
        <p data-i18n="avatarEditor.aura.loadFailed">{uzt("avatarEditor.aura.loadFailed")}</p>
        <button onClick={onRetry} type="button">
          <span data-i18n="avatarEditor.aura.retry">{uzt("avatarEditor.aura.retry")}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <b data-i18n="avatarEditor.aura.title">{uzt("avatarEditor.aura.title")}</b>
        <small data-i18n="avatarEditor.aura.subtitle">{uzt("avatarEditor.aura.subtitle")}</small>
      </div>
      <div className={styles.grid}>
        <AuraCard draft={draft} equipped={equipped} id="aura_none" onPick={onPick} state={state} status={status} />
        {AURA_ORDER.map((id) => (
          <AuraCard draft={draft} equipped={equipped} id={id} key={id} onPick={onPick} state={state} status={status} />
        ))}
      </div>
    </div>
  );
}

function AuraCard({
  draft,
  equipped,
  id,
  onPick,
  state,
  status,
}: {
  draft: AvatarConfig;
  equipped: string;
  id: AuraId;
  onPick: (id: AuraId) => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
}) {
  const selected = (draft.aura ?? "aura_none") === id;
  const look = isAura(id) ? AURA_LOOK[id] : null;
  const owned = ownsCosmetic(state, id);
  const price = cosmeticPrice(state, id);
  const wearing = equipped === id;
  return (
    <button
      aria-pressed={selected}
      className={`${styles.card} ${selected ? styles.cardSelected : ""}`}
      data-rarity={look?.rarity ?? "none"}
      onClick={() => onPick(id)}
      style={{ "--rarity": look ? RARITY_COLOR[look.rarity] : "#c9c6dc", "--aura": look?.color ?? "#c9c6dc" } as CSSProperties}
      type="button"
    >
      <span className={styles.preview}>
        <span className={styles.previewAvatar}>
          <AvatarAura aura={id}>
            <GeneratedAvatar avatar={{ ...draft, aura: id }} variant="full" />
          </AvatarAura>
        </span>
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
      <span className={styles.info}>
        <b data-i18n={id === "aura_none" ? "avatarEditor.aura.none" : `avatarEditor.aura.items.${id}.name`}>
          {id === "aura_none" ? uzt("avatarEditor.aura.none") : uzt(`avatarEditor.aura.items.${id}.name`)}
        </b>
        {id === "aura_none" ? null : wearing ? (
          <small className={styles.wearing} data-i18n="avatarEditor.aura.wearing">
            {uzt("avatarEditor.aura.wearing")}
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

/** 사기 전 확인 — 크게 입어보고, 값·내 보석·모자란 만큼 (오라 · 배경 장면) */
export function CosmeticBuySheet({
  avatar,
  buying,
  error,
  gems,
  id,
  onBuy,
  onClose,
  price,
  streak = 0,
}: {
  avatar: AvatarConfig;
  buying: boolean;
  error: boolean;
  gems: number;
  id: ShopItemId;
  onBuy: () => void;
  onClose: () => void;
  price: number;
  /** 펫이면 지금 단계 모습·자라는 단계를 보여 준다 */
  streak?: number;
}) {
  const look = shopLook(id);
  const short = Math.max(0, price - gems);
  const [shown, setShown] = useState(false);
  const sheetRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  useTelegramBackOverride(buying ? () => undefined : onClose);
  // 아래로 끌어 닫기 (사는 중엔 그대로)
  useSwipeToClose(sheetRef, buying ? () => undefined : onClose);

  return (
    <div aria-modal="true" className={`${styles.sheetRoot} ${shown ? styles.shown : ""}`} role="dialog">
      <button aria-label={uzt("avatarEditor.aura.later")} className={styles.backdrop} onClick={buying ? undefined : onClose} type="button" />
      <section className={styles.sheet} data-rarity={look.rarity} ref={sheetRef} style={{ "--rarity": RARITY_COLOR[look.rarity], "--aura": look.color } as CSSProperties}>
        <i className={styles.grabber} />
        <ShopStage avatar={avatar} className={styles.sheetStage} id={id} streak={streak} />
        <em className={styles.sheetRarity} data-i18n={`avatarEditor.aura.rarity.${look.rarity}`}>
          {uzt(`avatarEditor.aura.rarity.${look.rarity}`)}
        </em>
        <h2 data-i18n={`${look.keys}.items.${id}.name`}>{uzt(`${look.keys}.items.${id}.name`)}</h2>
        <p data-i18n={`${look.keys}.items.${id}.desc`}>{uzt(`${look.keys}.items.${id}.desc`)}</p>
        {isPet(id) ? (
          <div className={styles.sheetGrowth}>
            <PetGrowth pet={id} streak={streak} />
          </div>
        ) : null}

        <div className={styles.rows}>
          <span>
            <small data-i18n="avatarEditor.aura.price">{uzt("avatarEditor.aura.price")}</small>
            <b data-no-translate>
              <MobileIcon name="diamond" size={14} />
              {fmt(price)}
            </b>
          </span>
          <span>
            <small data-i18n="avatarEditor.aura.balance">{uzt("avatarEditor.aura.balance")}</small>
            <b className={short ? styles.short : ""} data-no-translate>
              <MobileIcon name="diamond" size={14} />
              {fmt(gems)}
            </b>
          </span>
        </div>

        {short ? (
          <p className={styles.need} data-i18n="avatarEditor.aura.needMore">
            {uzt("avatarEditor.aura.needMore", { n: fmt(short) })}
          </p>
        ) : null}
        {error ? (
          <p className={styles.error} data-i18n="avatarEditor.aura.failed">
            {uzt("avatarEditor.aura.failed")}
          </p>
        ) : null}

        <button className={styles.buy} disabled={buying || short > 0} onClick={onBuy} type="button">
          {buying ? <i className={styles.spinner} /> : <MobileIcon name="diamond" size={18} />}
          <span data-i18n={`${look.keys}.buyWear`}>{uzt(`${look.keys}.buyWear`)}</span>
        </button>
        <button className={styles.later} disabled={buying} onClick={onClose} type="button">
          <span data-i18n="avatarEditor.aura.later">{uzt("avatarEditor.aura.later")}</span>
        </button>
      </section>
    </div>
  );
}

/** 산 직후 — 페이드로만 뜬다 (빛 터짐·튕김 없음) */
export function CosmeticBought({
  avatar,
  id,
  onClose,
  streak = 0,
}: {
  avatar: AvatarConfig;
  id: ShopItemId;
  onClose: () => void;
  streak?: number;
}) {
  const look = shopLook(id);
  useTelegramBackOverride(onClose);
  return (
    <div aria-modal="true" className={`${styles.sheetRoot} ${styles.shown} ${styles.center}`} role="dialog">
      <button aria-label={uzt("avatarEditor.aura.great")} className={styles.backdrop} onClick={onClose} type="button" />
      <section className={styles.bought} style={{ "--rarity": RARITY_COLOR[look.rarity], "--aura": look.color } as CSSProperties}>
        <ShopStage avatar={avatar} className={styles.boughtStage} id={id} streak={streak} />
        <h2 data-i18n={`${look.keys}.boughtTitle`}>{uzt(`${look.keys}.boughtTitle`)}</h2>
        <p data-i18n={`${look.keys}.boughtBody`}>{uzt(`${look.keys}.boughtBody`)}</p>
        <button className={styles.buy} onClick={onClose} type="button">
          <span data-i18n="avatarEditor.aura.great">{uzt("avatarEditor.aura.great")}</span>
        </button>
      </section>
    </div>
  );
}
