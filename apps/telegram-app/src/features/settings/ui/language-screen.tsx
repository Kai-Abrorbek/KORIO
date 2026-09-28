"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import {
  LANGUAGES,
  LANGUAGE_COPY,
  useLanguagePreference,
  type AppLanguage,
} from "../model/language-preference";
import styles from "./language-screen.module.css";
import { ContentLanguageSheet } from "./content-language-sheet";
import { useAppLanguage } from "../../../shared/i18n/language-context";
import {
  detectDeviceContentLanguage,
  type ContentLanguage,
} from "../../../shared/i18n/content-language";

/** 설명 언어 이름도 원어로 */
const CONTENT_NAMES: Record<ContentLanguage, string> = {
  uz: "O'zbek",
  ru: "Русский",
  en: "English",
};

function goBack(router: ReturnType<typeof useRouter>) {
  if (window.history.length > 1) router.back();
  else router.replace("/settings");
}

export function LanguageScreen() {
  const router = useRouter();
  const { language, ready, setLanguage } = useLanguagePreference();
  const { contentLanguage, savedContentLanguage, setContentLanguage } = useAppLanguage();
  const [sheetOpen, setSheetOpen] = useState(false);
  const copy = LANGUAGE_COPY[language];

  const choose = (next: AppLanguage) => {
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
    setLanguage(next);
    // 한국어 UI 는 뜻·설명을 한국어로 줄 수 없다 → 처음 고를 때 한 번 묻는다.
    // 기본값을 먼저 저장한다 — 닫기만 해도 이 값이 남는다 (앱과 같다)
    if (next === "ko" && !savedContentLanguage) {
      setContentLanguage(detectDeviceContentLanguage());
      setSheetOpen(true);
    }
  };

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <button aria-label={copy.back} onClick={() => goBack(router)} type="button">
          <MobileIcon name="chevron-back" size={28} />
        </button>
        <h1>{copy.title}</h1>
      </header>

      <section className={styles.body}>
        <p>{copy.subtitle}</p>
        <div className={styles.list}>
          {LANGUAGES.map((item, index) => {
            const selected = ready && language === item.code;
            return (
              <button
                aria-pressed={selected}
                className={selected ? styles.selected : undefined}
                data-no-translate
                key={item.code}
                onClick={() => choose(item.code)}
                style={{ animationDelay: String(index * 60) + "ms" }}
                type="button"
              >
                <i className={styles.flag}>{item.flag}</i>
                <span>
                  <b>{item.name}</b>
                  <small>{item.greeting}</small>
                </span>
                {selected ? (
                  <i className={styles.checkOn}>
                    <MobileIcon name="checkmark" size={16} />
                  </i>
                ) : (
                  <i className={styles.checkOff} />
                )}
              </button>
            );
          })}
        </div>

        {/* 한국어 UI 일 때만 — 뜻·설명은 어느 말로 볼지 */}
        {ready && language === "ko" ? (
          <button
            className={styles.contentRow}
            onClick={() => {
              window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
              setSheetOpen(true);
            }}
            type="button"
          >
            <i className={styles.contentIcon}>
              <MobileIcon name="book" size={18} />
            </i>
            <span>
              <b>Ma&apos;no va izohlar tili</b>
              <small>So&apos;z ma&apos;nolari, tarjima, grammatika izohlari</small>
            </span>
            <em data-no-translate>{CONTENT_NAMES[contentLanguage]}</em>
            <MobileIcon name="chevron-forward" size={18} />
          </button>
        ) : null}
      </section>

      <ContentLanguageSheet
        onClose={() => setSheetOpen(false)}
        onConfirm={(next) => {
          setContentLanguage(next);
          setSheetOpen(false);
        }}
        value={contentLanguage}
        visible={sheetOpen}
      />
    </main>
  );
}
