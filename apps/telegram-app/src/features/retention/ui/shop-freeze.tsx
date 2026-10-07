"use client";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { haptic, rt, type FreezeView } from "../model/retention";
import styles from "./retention.module.css";

/**
 * 상점 — 스트릭 복구펜 (모바일 StreakFreezeSection 과 같은 모양).
 * 연속이 끊길 날에 자동으로 한 장씩 쓰인다. 보유 상한까지만 살 수 있다.
 */
export function ShopFreezeSection({
  busy,
  freeze,
  gems,
  isSuper,
  onBuy,
}: {
  busy: boolean;
  freeze: FreezeView;
  gems: number;
  isSuper: boolean;
  onBuy: () => void;
}) {
  const full = freeze.owned >= freeze.max;
  const off = full || gems < freeze.price || busy;

  return (
    <>
      <h2 className={styles.shopLabel}>{rt("freeze.shopTitle")}</h2>
      <button
        className={styles.freezeRow}
        disabled={off}
        onClick={() => {
          haptic("light");
          onBuy();
        }}
        type="button"
      >
        <span className={styles.freezeIcon}>
          <MobileIcon name="snow" size={26} />
        </span>
        <span className={styles.freezeMid}>
          <b>{rt("freeze.name")}</b>
          <small>
            {isSuper
              ? rt("freeze.superSub", { n: freeze.superWeekly })
              : rt("freeze.sub")}
          </small>
          <span className={styles.slots}>
            {Array.from({ length: freeze.max }).map((_, index) => (
              <i
                className={`${styles.slot} ${index < freeze.owned ? styles.slotOn : ""}`}
                key={index}
              >
                <MobileIcon name="snow" size={11} />
              </i>
            ))}
            <em data-no-translate>
              {freeze.owned}/{freeze.max}
            </em>
          </span>
        </span>
        {full ? (
          <span className={styles.full} data-i18n="retention.freeze.full">{rt("freeze.full")}</span>
        ) : (
          <span className={styles.price} data-no-translate>
            <MobileIcon name="diamond" size={15} />
            {freeze.price.toLocaleString("en-US")}
          </span>
        )}
      </button>
    </>
  );
}
