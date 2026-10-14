"use client";

import { useEffect, useState, type CSSProperties } from "react";

import type { AvatarConfig } from "../../../shared/model/avatar";
import { uzt } from "../../../shared/i18n/uz-text";
import { useTelegramBackOverride } from "../../../shared/telegram/back-button";
import { AURA_LOOK, AURA_ORDER, AvatarAura, RARITY_COLOR, isAura, type AuraId } from "../../../shared/ui/avatar-aura";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { GeneratedAvatar } from "../../league/ui/generated-avatar";
import type { CosmeticsState } from "../api/cosmetics";
import styles from "./aura-picker.module.css";

/**
 * 캐릭터 에디터의 "Aura" 탭 — 모바일 AuraPicker 와 같다.
 * 카드를 누르면 바로 입어본다(위 큰 캐릭터에 오라가 뜬다). 사는 건 아래 버튼 → 시트.
 */
const fmt = (n: number) => n.toLocaleString("en-US");

export function auraPrice(state: CosmeticsState | null, id: string) {
  return state?.items.find((item) => item.id === id)?.price ?? null;
}

/** 가격 0 = 무료 (서버는 무료 오라를 owned 에도 넣어 준다) */
export function auraIsFree(state: CosmeticsState | null, id: string) {
  return auraPrice(state, id) === 0;
}

/** 오라가 전부 무료인가 — 에디터 위 배지를 보석 잔액 대신 "전부 무료" 로 */
export function aurasAllFree(state: CosmeticsState | null) {
  return Boolean(state && state.items.length > 0 && state.items.every((item) => item.price <= 0));
}

export function ownsAura(state: CosmeticsState | null, id: string | undefined) {
  if (!id || id === "aura_none") return true;
  return Boolean(state?.owned.includes(id));
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
  const owned = ownsAura(state, id);
  const price = auraPrice(state, id);
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

/** 사기 전 확인 — 크게 입어보고, 값·내 보석·모자란 만큼 */
export function AuraBuySheet({
  avatar,
  buying,
  error,
  gems,
  id,
  onBuy,
  onClose,
  price,
}: {
  avatar: AvatarConfig;
  buying: boolean;
  error: boolean;
  gems: number;
  id: Exclude<AuraId, "aura_none">;
  onBuy: () => void;
  onClose: () => void;
  price: number;
}) {
  const look = AURA_LOOK[id];
  const short = Math.max(0, price - gems);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  useTelegramBackOverride(buying ? () => undefined : onClose);

  return (
    <div aria-modal="true" className={`${styles.sheetRoot} ${shown ? styles.shown : ""}`} role="dialog">
      <button aria-label={uzt("avatarEditor.aura.later")} className={styles.backdrop} onClick={buying ? undefined : onClose} type="button" />
      <section className={styles.sheet} data-rarity={look.rarity} style={{ "--rarity": RARITY_COLOR[look.rarity], "--aura": look.color } as CSSProperties}>
        <i className={styles.grabber} />
        <div className={styles.sheetStage}>
          <span className={styles.sheetAvatar}>
            <AvatarAura aura={id}>
              <GeneratedAvatar avatar={{ ...avatar, aura: id }} variant="full" />
            </AvatarAura>
          </span>
        </div>
        <em className={styles.sheetRarity} data-i18n={`avatarEditor.aura.rarity.${look.rarity}`}>
          {uzt(`avatarEditor.aura.rarity.${look.rarity}`)}
        </em>
        <h2 data-i18n={`avatarEditor.aura.items.${id}.name`}>{uzt(`avatarEditor.aura.items.${id}.name`)}</h2>
        <p data-i18n={`avatarEditor.aura.items.${id}.desc`}>{uzt(`avatarEditor.aura.items.${id}.desc`)}</p>

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
          <span data-i18n="avatarEditor.aura.buyWear">{uzt("avatarEditor.aura.buyWear")}</span>
        </button>
        <button className={styles.later} disabled={buying} onClick={onClose} type="button">
          <span data-i18n="avatarEditor.aura.later">{uzt("avatarEditor.aura.later")}</span>
        </button>
      </section>
    </div>
  );
}

/** 산 직후 — 빛 터지는 축하 한 번 */
export function AuraBought({ avatar, id, onClose }: { avatar: AvatarConfig; id: Exclude<AuraId, "aura_none">; onClose: () => void }) {
  const look = AURA_LOOK[id];
  useTelegramBackOverride(onClose);
  return (
    <div aria-modal="true" className={`${styles.sheetRoot} ${styles.shown} ${styles.center}`} role="dialog">
      <button aria-label={uzt("avatarEditor.aura.great")} className={styles.backdrop} onClick={onClose} type="button" />
      <section className={styles.bought} style={{ "--rarity": RARITY_COLOR[look.rarity], "--aura": look.color } as CSSProperties}>
        <span aria-hidden="true" className={styles.burst}>
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} style={{ "--a": `${i * 30}deg`, "--i": i } as CSSProperties} />
          ))}
        </span>
        <span className={styles.boughtAvatar}>
          <AvatarAura aura={id}>
            <GeneratedAvatar avatar={{ ...avatar, aura: id }} variant="full" />
          </AvatarAura>
        </span>
        <h2 data-i18n="avatarEditor.aura.boughtTitle">{uzt("avatarEditor.aura.boughtTitle")}</h2>
        <p data-i18n="avatarEditor.aura.boughtBody">{uzt("avatarEditor.aura.boughtBody")}</p>
        <button className={styles.buy} onClick={onClose} type="button">
          <span data-i18n="avatarEditor.aura.great">{uzt("avatarEditor.aura.great")}</span>
        </button>
      </section>
    </div>
  );
}
