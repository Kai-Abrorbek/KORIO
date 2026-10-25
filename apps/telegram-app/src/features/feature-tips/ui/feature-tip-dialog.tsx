"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { uzt } from "../../../shared/i18n/uz-text";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { Button3D } from "../../retention/ui/parts";
import type { FeatureTip } from "../model/use-feature-tip";
import styles from "./feature-tips.module.css";

const FADE_MS = 180;
const MOOD: Record<FeatureTip["id"], string> = {
  invite: "cheering",
  payout: "proud",
  stickers: "great",
};
const n = (value: number) => value.toLocaleString("en-US");

/**
 * 기능 안내 대화상자 (앱 FeatureTipModal 과 같다) — 평가 대화상자와 같은 틀:
 * 보라로 물든 위쪽 + 고개 내민 하늘몬, 혜택은 숫자로, 버튼 하나로 그 화면에.
 */
export function FeatureTipDialog({
  tip,
  onGo,
  onClose,
  onNever,
}: {
  tip: FeatureTip | null;
  onGo: (tip: FeatureTip) => void;
  onClose: () => void;
  /** "다시 보지 않기" */
  onNever: () => void;
}) {
  const last = useRef<FeatureTip | null>(tip);
  if (tip) last.current = tip;
  const shownTip = tip ?? last.current;
  const [mounted, setMounted] = useState(Boolean(tip));
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (tip) {
      setMounted(true);
      // 붙은 다음 프레임에 켜야 transition 이 돈다
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }
    setShown(false);
    const timer = window.setTimeout(() => setMounted(false), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [tip]);

  if (!mounted || !shownTip) return null;
  const id = shownTip.id;

  return (
    <div aria-modal="true" className={`${styles.root} ${shown && tip ? styles.shown : ""}`} role="dialog">
      <button aria-label="close" className={styles.backdrop} onClick={onClose} type="button" />
      <section className={styles.card}>
        <span aria-hidden className={styles.sky} />
        <span className={styles.peek}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={`/characters/hangulmon_${MOOD[id]}.png`} />
        </span>

        <h2 data-i18n={`featureTips.${id}.title`}>{uzt(`featureTips.${id}.title`)}</h2>
        <p data-i18n={`featureTips.${id}.body`}>
          {shownTip.id === "payout"
            ? uzt("featureTips.payout.body", { min: n(shownTip.minGems) })
            : shownTip.id === "invite"
              ? uzt("featureTips.invite.body", { n: n(shownTip.rewardGems) })
              : uzt("featureTips.stickers.body")}
        </p>

        <Benefit tip={shownTip} />

        <Button3D
          className={styles.cta}
          i18nKey={`featureTips.${id}.cta`}
          label={uzt(`featureTips.${id}.cta`)}
          onClick={() => onGo(shownTip)}
          tone={id === "stickers" ? "blue" : "purple"}
        />
        <div className={styles.footer}>
          <button onClick={onNever} type="button">
            <span data-i18n="featureTips.never">{uzt("featureTips.never")}</span>
          </button>
          <i aria-hidden />
          <button onClick={onClose} type="button">
            <span data-i18n="featureTips.close">{uzt("featureTips.close")}</span>
          </button>
        </div>
      </section>
    </div>
  );
}

/** 혜택 한 덩어리 — 숫자로 바로 보이게 */
function Benefit({ tip }: { tip: FeatureTip }) {
  if (tip.id === "payout") {
    const ratio = Math.min(1, tip.gems / Math.max(1, tip.minGems));
    return (
      <div className={styles.benefit}>
        <div className={styles.payoutRow}>
          <MobileIcon className={styles.gem} name="diamond" size={16} />
          <strong data-no-translate>{n(tip.gems)}</strong>
          <span data-no-translate>/ {n(tip.minGems)}</span>
        </div>
        <div className={styles.track}>
          <i style={{ width: `${Math.max(4, ratio * 100)}%` } as CSSProperties} />
        </div>
        <small data-i18n="featureTips.payout.rate">
          {uzt("featureTips.payout.rate", { som: n(tip.somPerGem) })}
        </small>
      </div>
    );
  }

  if (tip.id === "invite") {
    return (
      <div className={styles.benefit}>
        <div className={styles.bigRow}>
          <MobileIcon className={styles.gem} name="diamond" size={22} />
          <strong data-no-translate>+{n(tip.rewardGems)}</strong>
        </div>
        <small data-i18n="featureTips.invite.each">{uzt("featureTips.invite.each")}</small>
        {tip.milestones.length ? (
          <div className={styles.chips}>
            {tip.milestones.map((m) => (
              <span
                className={m.reached ? styles.chipDone : undefined}
                data-i18n="featureTips.invite.milestone"
                key={m.count}
              >
                {uzt("featureTips.invite.milestone", { count: m.count, gems: n(m.gems) })}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`${styles.benefit} ${styles.stickerBenefit}`}>
      <span className={styles.stickerIcon}>
        <MobileIcon name="paper-plane" size={22} />
      </span>
      <div>
        <strong data-i18n="featureTips.stickers.free">{uzt("featureTips.stickers.free")}</strong>
        <small data-i18n="featureTips.stickers.how">{uzt("featureTips.stickers.how")}</small>
      </div>
    </div>
  );
}
