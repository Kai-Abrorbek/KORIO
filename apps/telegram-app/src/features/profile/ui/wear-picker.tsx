"use client";

import type { CSSProperties } from "react";

import type { AvatarConfig } from "../../../shared/model/avatar";
import {
  WEAR_LOOK,
  WEAR_SETS,
  setProgress,
  wearSlotOf,
  type WearItemId,
  type WearSlot,
} from "../../../shared/model/avatar-wearables";
import { uzt } from "../../../shared/i18n/uz-text";
import { RARITY_COLOR } from "../../../shared/ui/avatar-aura";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { GeneratedAvatar } from "../../league/ui/generated-avatar";
import type { CosmeticsState } from "../api/cosmetics";
import { cosmeticPrice, ownsCosmetic } from "./aura-picker";
import styles from "./aura-picker.module.css";
import wearStyles from "./wear-picker.module.css";

/**
 * 캐릭터 에디터의 "세트" 탭 — 의상(costume)·손(hand). 모바일 WearPicker 와 같다.
 * 세트마다 묶어서 보여 준다 (K팝: 무대 의상 · 응원봉 · 마이크). 몇 칸 채웠는지 칩.
 * 카드를 누르면 입고, 입은 걸 한 번 더 누르면 벗는다. 안 산 것이면 아래 버튼 → 시트 (오라와 같은 흐름).
 */
const fmt = (n: number) => n.toLocaleString("en-US");
const SET_ICON: Record<(typeof WEAR_SETS)[number]["id"], IoniconName> = {
  kpop: "musical-notes",
  king: "sunny",
  seonbi: "book",
  guard: "shield-checkmark",
  taekwondo: "fitness",
};
const GROUPS = ["kpop", "tradition"] as const;


export function WearGrid({
  draft,
  equipped,
  onToggle,
  onRetry,
  state,
  status,
}: {
  draft: AvatarConfig;
  /** 지금 저장돼 있는 칸들 */
  equipped: Partial<Record<WearSlot, string>>;
  onToggle: (slot: WearSlot, id: WearItemId) => void;
  onRetry: () => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
}) {
  if (status === "failed") {
    return (
      <div className={styles.failed}>
        <MobileIcon name="cloud-offline" size={26} />
        <p data-i18n="avatarEditor.wear.loadFailed">{uzt("avatarEditor.wear.loadFailed")}</p>
        <button onClick={onRetry} type="button">
          <span data-i18n="avatarEditor.aura.retry">{uzt("avatarEditor.aura.retry")}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <b data-i18n="avatarEditor.wear.title">{uzt("avatarEditor.wear.title")}</b>
        <small data-i18n="avatarEditor.wear.subtitle">{uzt("avatarEditor.wear.subtitle")}</small>
      </div>
      {/* 세트 효과 안내 */}
      <p className={wearStyles.bonus}>
        <MobileIcon name="sparkles" size={15} />
        <span data-i18n="avatarEditor.wear.bonus">{uzt("avatarEditor.wear.bonus")}</span>
      </p>
      {GROUPS.map((group) => (
        <div className={wearStyles.group} key={group}>
          {group === "tradition" ? (
            <h3 className={wearStyles.groupTitle} data-i18n={`avatarEditor.wear.groups.${group}`}>
              {uzt(`avatarEditor.wear.groups.${group}`)}
            </h3>
          ) : null}
          {WEAR_SETS.filter((set) => set.group === group).map((set) => (
            <SetSection
              draft={draft}
              equipped={equipped}
              key={set.id}
              onToggle={onToggle}
              set={set}
              state={state}
              status={status}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/** 세트 하나 — 머리글(아이콘·이름·설명·몇 칸 채웠나) + 그 세트 아이템 카드 */
function SetSection({
  draft,
  equipped,
  onToggle,
  set,
  state,
  status,
}: {
  draft: AvatarConfig;
  equipped: Partial<Record<WearSlot, string>>;
  onToggle: (slot: WearSlot, id: WearItemId) => void;
  set: (typeof WEAR_SETS)[number];
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
}) {
  const progress = setProgress(set, draft);
  const ids = set.parts.flatMap((part) => part.ids);
  return (
    <section className={wearStyles.set}>
      <header className={wearStyles.setHead}>
        <span className={wearStyles.setIcon} style={{ "--set": set.halo } as CSSProperties}>
          <MobileIcon name={SET_ICON[set.id]} size={18} />
        </span>
        <span className={wearStyles.setText}>
          <b data-i18n={`avatarEditor.wear.sets.${set.id}.name`}>{uzt(`avatarEditor.wear.sets.${set.id}.name`)}</b>
          <small data-i18n={`avatarEditor.wear.sets.${set.id}.desc`}>{uzt(`avatarEditor.wear.sets.${set.id}.desc`)}</small>
        </span>
        {progress.complete ? (
          <em className={`${wearStyles.progress} ${wearStyles.complete}`}>
            <MobileIcon name="checkmark-circle" size={14} />
            <span data-i18n="avatarEditor.wear.done">{uzt("avatarEditor.wear.done")}</span>
          </em>
        ) : (
          <em className={wearStyles.progress} data-no-translate>
            {progress.done}/{progress.total}
          </em>
        )}
      </header>
      <div className={styles.grid}>
        {ids.map((id) => (
          <WearCard draft={draft} equipped={equipped} id={id} key={id} onToggle={onToggle} state={state} status={status} />
        ))}
      </div>
    </section>
  );
}

function WearCard({
  draft,
  equipped,
  id,
  onToggle,
  state,
  status,
}: {
  draft: AvatarConfig;
  equipped: Partial<Record<WearSlot, string>>;
  id: WearItemId;
  onToggle: (slot: WearSlot, id: WearItemId) => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
}) {
  const slot = wearSlotOf(id);
  const selected = draft[slot] === id;
  const look = WEAR_LOOK[id];
  const owned = ownsCosmetic(state, id);
  const price = cosmeticPrice(state, id);
  const wearing = equipped[slot] === id;
  return (
    <button
      aria-pressed={selected}
      className={`${styles.card} ${selected ? styles.cardSelected : ""}`}
      data-rarity={look.rarity}
      onClick={() => onToggle(slot, id)}
      style={{ "--rarity": RARITY_COLOR[look.rarity], "--aura": look.accent } as CSSProperties}
      type="button"
    >
      <span className={styles.preview}>
        <span className={styles.previewAvatar}>
          <GeneratedAvatar avatar={{ ...draft, [slot]: id }} variant="full" />
        </span>
        <em className={styles.rarity} data-i18n={`avatarEditor.aura.rarity.${look.rarity}`}>
          {uzt(`avatarEditor.aura.rarity.${look.rarity}`)}
        </em>
        {selected ? (
          <i className={styles.check}>
            <MobileIcon name="checkmark" size={14} />
          </i>
        ) : null}
      </span>
      <span className={`${styles.info} ${wearStyles.info}`}>
        <b data-i18n={`avatarEditor.wear.items.${id}.name`}>{uzt(`avatarEditor.wear.items.${id}.name`)}</b>
        {wearing ? (
          <small className={styles.wearing} data-i18n="avatarEditor.wear.inUse">
            {uzt("avatarEditor.wear.inUse")}
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
