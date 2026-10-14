"use client";

import type { CSSProperties } from "react";

import type { AvatarConfig } from "../../../shared/model/avatar";
import { uzt } from "../../../shared/i18n/uz-text";
import { RARITY_COLOR } from "../../../shared/ui/avatar-aura";
import { SCENE_LOOK, SCENE_ORDER, SceneBackdrop, isScene, type SceneId } from "../../../shared/ui/avatar-scene";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { AVATAR_BACKGROUNDS, GeneratedAvatar } from "../../league/ui/generated-avatar";
import type { CosmeticsState } from "../api/cosmetics";
import { cosmeticPrice, ownsCosmetic } from "./aura-picker";
import styles from "./aura-picker.module.css";
import sceneStyles from "./scene-picker.module.css";

/**
 * 캐릭터 에디터의 "Sahna" 탭 — 서울 여행 배경 그림. 모바일 ScenePicker 와 같다.
 * 카드를 누르면 위 큰 캐릭터 뒤에 바로 깔린다. 안 산 것이면 아래 버튼 → 시트 (오라와 같은 흐름).
 * 그림은 움직이지 않는다.
 */
const fmt = (n: number) => n.toLocaleString("en-US");

export function SceneGrid({
  draft,
  equipped,
  onPick,
  onRetry,
  state,
  status,
}: {
  draft: AvatarConfig;
  /** 지금 저장돼 있는 장면 */
  equipped: string;
  onPick: (id: SceneId) => void;
  onRetry: () => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
}) {
  if (status === "failed") {
    return (
      <div className={styles.failed}>
        <MobileIcon name="cloud-offline" size={26} />
        <p data-i18n="avatarEditor.scene.loadFailed">{uzt("avatarEditor.scene.loadFailed")}</p>
        <button onClick={onRetry} type="button">
          <span data-i18n="avatarEditor.aura.retry">{uzt("avatarEditor.aura.retry")}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <b data-i18n="avatarEditor.scene.title">{uzt("avatarEditor.scene.title")}</b>
        <small data-i18n="avatarEditor.scene.subtitle">{uzt("avatarEditor.scene.subtitle")}</small>
      </div>
      <div className={styles.grid}>
        <SceneCard draft={draft} equipped={equipped} id="scene_none" onPick={onPick} state={state} status={status} />
        {SCENE_ORDER.map((id) => (
          <SceneCard draft={draft} equipped={equipped} id={id} key={id} onPick={onPick} state={state} status={status} />
        ))}
      </div>
    </div>
  );
}

function SceneCard({
  draft,
  equipped,
  id,
  onPick,
  state,
  status,
}: {
  draft: AvatarConfig;
  equipped: string;
  id: SceneId;
  onPick: (id: SceneId) => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
}) {
  const selected = (draft.scene ?? "scene_none") === id;
  const look = isScene(id) ? SCENE_LOOK[id] : null;
  const owned = ownsCosmetic(state, id);
  const price = cosmeticPrice(state, id);
  const wearing = equipped === id;
  // 장면 없음 = 내가 고른 색 배경
  const plain = AVATAR_BACKGROUNDS[draft.background] ?? AVATAR_BACKGROUNDS.background_lilac;
  return (
    <button
      aria-pressed={selected}
      className={`${styles.card} ${selected ? styles.cardSelected : ""}`}
      data-rarity={look?.rarity ?? "none"}
      onClick={() => onPick(id)}
      style={{ "--rarity": look ? RARITY_COLOR[look.rarity] : "#c9c6dc", "--aura": look?.accent ?? "#c9c6dc" } as CSSProperties}
      type="button"
    >
      <span className={`${styles.preview} ${sceneStyles.preview}`}>
        {isScene(id) ? (
          <SceneBackdrop scene={id} />
        ) : (
          <i className={sceneStyles.plain} style={{ "--plain-from": plain[0], "--plain-to": plain[1] } as CSSProperties} />
        )}
        <span className={`${styles.previewAvatar} ${sceneStyles.avatar}`}>
          <GeneratedAvatar avatar={draft} variant="full" />
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
      <span className={`${styles.info} ${sceneStyles.info}`}>
        <b data-i18n={id === "scene_none" ? "avatarEditor.scene.none" : `avatarEditor.scene.items.${id}.name`}>
          {id === "scene_none" ? uzt("avatarEditor.scene.none") : uzt(`avatarEditor.scene.items.${id}.name`)}
        </b>
        {id === "scene_none" ? null : wearing ? (
          <small className={styles.wearing} data-i18n="avatarEditor.scene.inUse">
            {uzt("avatarEditor.scene.inUse")}
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
