"use client";

import type { AvatarConfig } from "../../../shared/model/avatar";
import { TITLE_LOOK, TITLE_ORDER, type PaidTitle, type TitleId } from "../../../shared/model/avatar-titles";
import { uzt } from "../../../shared/i18n/uz-text";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { NameTitle } from "../../../shared/ui/name-title";
import type { CosmeticsState } from "../api/cosmetics";
import { cosmeticPrice, ownsCosmetic } from "./aura-picker";
import styles from "./aura-picker.module.css";
import titleStyles from "./title-picker.module.css";

/**
 * 캐릭터 에디터의 "Unvon(칭호)" 탭 — 모바일 TitlePicker 와 같다.
 * 이름표를 줄로 보여 주고, 누르면 위 히어로에 바로 달린다. 다시 누르면 뗀다.
 * 세트 칭호는 그 세트를 입어 본 사람만 — 지금 입고 있는 것(draft)까지 쳐서 잠금을 푼다
 * (서버도 같은 저장에서 세트를 처음 입으며 칭호를 다는 걸 허락한다).
 */
const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * 세트 칭호 잠금.
 * - 서버가 owned 에 넣어 줬으면(세트를 받아 둠) 열림
 * - 아니면 지금 입고 있는 것(draft)으로 세트를 다 채웠을 때만 열림 — 같은 저장에서 세트를 처음 입으며 다는 경우.
 *   owned 에는 무료라 "모두의 것"인 아이템도 들어 있어서, 입지 않은 건 치지 않는다
 */
export function titleLocked(state: CosmeticsState | null, id: PaidTitle, draft: AvatarConfig) {
  if (!TITLE_LOOK[id].set) return false;
  if (state?.owned.includes(id)) return false;
  const requires = state?.items.find((item) => item.id === id)?.requires;
  if (!requires) return true; // 목록을 아직 못 받았으면 잠가 둔다
  const worn = new Set<string>([draft.costume, draft.hat, draft.hand]);
  return !requires.every((group) => group.some((itemId) => worn.has(itemId) && ownsCosmetic(state, itemId)));
}

export function TitleGrid({
  draft,
  equipped,
  onToggle,
  onRetry,
  state,
  status,
}: {
  draft: AvatarConfig;
  /** 지금 저장돼 있는 칭호 */
  equipped: string;
  onToggle: (id: TitleId) => void;
  onRetry: () => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
}) {
  if (status === "failed") {
    return (
      <div className={styles.failed}>
        <MobileIcon name="cloud-offline" size={26} />
        <p data-i18n="avatarEditor.nameTitle.loadFailed">{uzt("avatarEditor.nameTitle.loadFailed")}</p>
        <button onClick={onRetry} type="button">
          <span data-i18n="avatarEditor.aura.retry">{uzt("avatarEditor.aura.retry")}</span>
        </button>
      </div>
    );
  }
  const general = TITLE_ORDER.filter((id) => !TITLE_LOOK[id].set);
  const sets = TITLE_ORDER.filter((id) => TITLE_LOOK[id].set);
  const row = (id: PaidTitle) => (
    <TitleRow draft={draft} equipped={equipped} id={id} key={id} onToggle={onToggle} state={state} status={status} />
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <b data-i18n="avatarEditor.nameTitle.title">{uzt("avatarEditor.nameTitle.title")}</b>
        <small data-i18n="avatarEditor.nameTitle.subtitle">{uzt("avatarEditor.nameTitle.subtitle")}</small>
      </div>
      <div className={titleStyles.list}>{general.map(row)}</div>
      <div className={titleStyles.groupHead}>
        <b data-i18n="avatarEditor.nameTitle.setGroup">{uzt("avatarEditor.nameTitle.setGroup")}</b>
        <small data-i18n="avatarEditor.nameTitle.setHint">{uzt("avatarEditor.nameTitle.setHint")}</small>
      </div>
      <div className={titleStyles.list}>{sets.map(row)}</div>
    </div>
  );
}

function TitleRow({
  draft,
  equipped,
  id,
  onToggle,
  state,
  status,
}: {
  draft: AvatarConfig;
  equipped: string;
  id: PaidTitle;
  onToggle: (id: TitleId) => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
}) {
  const look = TITLE_LOOK[id];
  const selected = draft.title === id;
  const locked = titleLocked(state, id, draft);
  const owned = ownsCosmetic(state, id);
  const price = cosmeticPrice(state, id);
  const wearing = equipped === id;
  return (
    <button
      aria-disabled={locked}
      aria-pressed={selected}
      className={`${titleStyles.row} ${selected ? titleStyles.selected : ""} ${locked ? titleStyles.locked : ""}`}
      onClick={() => {
        if (!locked) onToggle(id);
      }}
      type="button"
    >
      <span className={titleStyles.plateWrap}>
        <NameTitle title={id} />
        {locked && look.set ? (
          <small className={titleStyles.hint} data-i18n={`avatarEditor.nameTitle.lockedBy.${look.set}`}>
            {uzt(`avatarEditor.nameTitle.lockedBy.${look.set}`)}
          </small>
        ) : null}
      </span>
      {locked ? (
        <small className={titleStyles.lockChip}>
          <MobileIcon name="lock-closed" size={12} />
          <span data-i18n="avatarEditor.nameTitle.locked">{uzt("avatarEditor.nameTitle.locked")}</span>
        </small>
      ) : wearing ? (
        <small className={styles.wearing} data-i18n="avatarEditor.nameTitle.inUse">
          {uzt("avatarEditor.nameTitle.inUse")}
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
      {selected ? (
        <i className={titleStyles.check}>
          <MobileIcon name="checkmark" size={13} />
        </i>
      ) : null}
    </button>
  );
}
