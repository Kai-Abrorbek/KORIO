"use client";

import { useEffect, useState } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { playSfx } from "../../../shared/browser/sfx";
import type { ContentLanguage } from "../../../shared/i18n/content-language";
import styles from "./content-language-sheet.module.css";

/**
 * 뜻·설명 언어 고르기 (한국어 UI 전용). 모바일 앱의 ContentLanguageSheet 와 같은 화면.
 *
 * 언어 이름과 "사과 → olma" 견본은 번역하지 않는다(data-no-translate) —
 * 언어 목록은 항상 원어로 적는다. 제목·설명·버튼만 UI 언어로 바뀐다.
 */
const OPTIONS: { code: ContentLanguage; flag: string; name: string; sample: string }[] = [
  { code: "uz", flag: "🇺🇿", name: "O'zbek", sample: "olma" },
  { code: "ru", flag: "🇷🇺", name: "Русский", sample: "яблоко" },
  { code: "en", flag: "🇬🇧", name: "English", sample: "apple" },
];

export function ContentLanguageSheet({
  onClose,
  onConfirm,
  value,
  visible,
}: {
  visible: boolean;
  value: ContentLanguage;
  onConfirm: (language: ContentLanguage) => void;
  /** 확인 없이 닫음 (배경 탭) */
  onClose: () => void;
}) {
  const [picked, setPicked] = useState<ContentLanguage>(value);

  // 열 때마다 저장된 값으로 되돌린다
  useEffect(() => {
    if (visible) setPicked(value);
  }, [value, visible]);

  if (!visible) return null;

  return (
    <div
      aria-modal="true"
      className={styles.backdrop}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
    >
      <section className={styles.sheet}>
        <i className={styles.handle} />
        <span className={styles.badge}>
          <MobileIcon name="book" size={26} />
        </span>
        <h2>Ma&apos;no va izohlar qaysi tilda bo&apos;lsin?</h2>
        <p>
          Ekran koreys tilida qoladi — faqat so&apos;z ma&apos;nolari, tarjimalar va grammatika izohlari shu tilda ko&apos;rsatiladi. Til sozlamalarida istalgan vaqt o&apos;zgartirish mumkin.
        </p>

        <div className={styles.options} role="radiogroup">
          {OPTIONS.map((option) => {
            const selected = picked === option.code;
            return (
              <button
                aria-checked={selected}
                className={selected ? styles.selected : undefined}
                data-no-translate
                key={option.code}
                onClick={() => {
                  window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
                  setPicked(option.code);
                }}
                role="radio"
                type="button"
              >
                <i className={styles.flag}>{option.flag}</i>
                <span>
                  <b>{option.name}</b>
                  <small>
                    사과 <em>→</em> {option.sample}
                  </small>
                </span>
                <i className={selected ? styles.checkOn : styles.checkOff}>
                  {selected ? <MobileIcon name="checkmark" size={15} /> : null}
                </i>
              </button>
            );
          })}
        </div>

        <button
          className={styles.confirm}
          onClick={() => {
            playSfx("click");
            onConfirm(picked);
          }}
          type="button"
        >
          Tasdiqlash
        </button>
      </section>
    </div>
  );
}
