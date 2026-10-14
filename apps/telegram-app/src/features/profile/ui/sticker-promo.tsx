"use client";

import { useRouter } from "next/navigation";

import type { AvatarConfig } from "../../../shared/model/avatar";
import { uzt } from "../../../shared/i18n/uz-text";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { GeneratedAvatar } from "../../league/ui/generated-avatar";
import styles from "./sticker-promo.module.css";

/**
 * "내 캐릭터 텔레그램 스티커" 들어가는 카드 — 프로필·상점. 모바일 StickerPromoCard 와 같다.
 * 미리보기를 서버에 묻지 않고(무겁다) 내 캐릭터 얼굴 + 말풍선 "ㅋㅋㅋ" 로 그린다.
 */
export function StickerPromoCard({ avatar }: { avatar?: Partial<AvatarConfig> | null }) {
  const router = useRouter();
  return (
    <button
      className={styles.card}
      onClick={() => {
        window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
        router.push("/stickers");
      }}
      type="button"
    >
      <i aria-hidden="true" className={styles.shine} />
      <span className={styles.face}>
        <span className={styles.sticker}>
          <GeneratedAvatar avatar={avatar} variant="head" />
        </span>
        <b className={styles.bubble} data-no-translate>
          ㅋㅋㅋ
        </b>
        <span className={styles.tg}>
          <MobileIcon name="paper-plane" size={11} />
        </span>
      </span>
      <span className={styles.text}>
        <b>
          <span data-i18n="stickers.promo.title">{uzt("stickers.promo.title")}</span>
          <em data-i18n="stickers.promo.new">{uzt("stickers.promo.new")}</em>
        </b>
        <small data-i18n="stickers.promo.body">{uzt("stickers.promo.body")}</small>
      </span>
      <MobileIcon className={styles.chevron} name="chevron-forward" size={20} />
    </button>
  );
}
