"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import styles from "./topik-level-sheet.module.css";

/**
 * TOPIK I / II 선택 시트 — 앱 TopikLevelModal 과 같은 생김새.
 *
 * 문구는 uz 로케일(locales/topik/uz.ts 의 levelModal)과 글자까지 같게 둔다.
 * 텔레그램 앱은 화면의 우즈벡어를 로케일에서 찾아 다른 언어로 바꾸기 때문에,
 * 한 글자라도 다르면 번역이 안 된다.
 */
const LEVELS = [
  {
    level: "1" as const,
    roman: "I",
    icon: "leaf-outline" as const,
    label: "Boshlang‘ich darajani mustahkamlang",
    description: "Kundalik hayot uchun zarur asosiy koreys tili ko‘nikmalarini tayyorlang.",
    sections: "O‘qish · Tinglash",
  },
  {
    level: "2" as const,
    roman: "II",
    icon: "diamond-outline" as const,
    label: "Yuqori darajaga tayyorlaning",
    description: "O‘qish va ish uchun amaliy koreys tili ko‘nikmalarini rivojlantiring.",
    sections: "O‘qish · Tinglash · Yozish",
  },
];

export function TopikLevelSheet({
  busy,
  onClose,
  onSelect,
}: {
  busy: boolean;
  onClose: () => void;
  onSelect: (level: "1" | "2") => void;
}) {
  // 아래로 끌어서 닫기 (앱 시트와 같은 기준: 110px 또는 빠르게 튕기기)
  const [dragY, setDragY] = useState(0);
  const [closing, setClosing] = useState(false);
  const drag = useRef<{ startY: number; startT: number } | null>(null);

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(onClose, 190);
    return () => window.clearTimeout(timer);
  }, [closing, onClose]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = { startY: event.clientY, startT: performance.now() };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    setDragY(Math.max(0, event.clientY - drag.current.startY));
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dy = Math.max(0, event.clientY - drag.current.startY);
    const velocity = dy / Math.max(1, performance.now() - drag.current.startT);
    drag.current = null;
    if (dy > 110 || velocity > 0.9) setClosing(true);
    else setDragY(0);
  };

  return (
    <div className={`${styles.backdrop} ${closing ? styles.backdropOut : ""}`} onClick={() => setClosing(true)} role="presentation">
      <section
        aria-label="Qaysi TOPIK uchun tayyorlanyapsiz?"
        aria-modal="true"
        className={`${styles.sheet} ${closing ? styles.sheetOut : ""}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        style={dragY && !closing ? { transform: `translateY(${dragY}px)`, transition: "none" } : undefined}
      >
        <div className={styles.dragZone} onPointerCancel={onPointerUp} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
          <div className={styles.handle} aria-hidden="true" />
          <header className={styles.header}>
            <span className={styles.headerIcon}><MobileIcon name="ribbon" size={22} /></span>
            <div className={styles.headerCopy}>
              <small>Shaxsiy o‘quv reja</small>
              <h2>Qaysi TOPIK uchun tayyorlanyapsiz?</h2>
              <p>Imtihon tuzilishi va tahlilni maqsadingizga moslaymiz.</p>
            </div>
            <button aria-label="Yopish" className={styles.close} onClick={() => setClosing(true)} onPointerDown={(event) => event.stopPropagation()} type="button">
              <MobileIcon name="close" size={21} />
            </button>
          </header>
        </div>

        <div className={styles.levels}>
          {LEVELS.map((item) => (
            <button
              className={`${styles.levelCard} ${item.level === "1" ? styles.levelOne : styles.levelTwo}`}
              disabled={busy}
              key={item.level}
              onClick={() => onSelect(item.level)}
              type="button"
            >
              <span className={styles.badge}>
                <MobileIcon name={item.icon} size={19} />
                <small>TOPIK</small>
                <b>{item.roman}</b>
              </span>
              <span className={styles.info}>
                <span className={styles.titleRow}>
                  <strong>{item.label}</strong>
                  <em>Imtihonga tayyorgarlik</em>
                </span>
                <span className={styles.description}>{item.description}</span>
                <span className={styles.sections}><MobileIcon name="layers-outline" size={14} />{item.sections}</span>
              </span>
              <span className={styles.arrow}><MobileIcon name="arrow-forward" size={18} /></span>
            </button>
          ))}
        </div>

        <p className={styles.assurance}>
          <MobileIcon name="shield-checkmark-outline" size={16} />
          Tanlangan darajani istalgan vaqtda o‘zgartirish mumkin.
        </p>
      </section>
    </div>
  );
}
