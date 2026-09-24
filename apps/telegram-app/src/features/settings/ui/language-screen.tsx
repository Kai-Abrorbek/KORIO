"use client";

import { useRouter } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import {
  LANGUAGES,
  LANGUAGE_COPY,
  useLanguagePreference,
  type AppLanguage,
} from "../model/language-preference";
import styles from "./language-screen.module.css";

function goBack(router: ReturnType<typeof useRouter>) {
  if (window.history.length > 1) router.back();
  else router.replace("/settings");
}

export function LanguageScreen() {
  const router = useRouter();
  const { language, ready, setLanguage } = useLanguagePreference();
  const copy = LANGUAGE_COPY[language];

  const choose = (next: AppLanguage) => {
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
    setLanguage(next);
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
      </section>
    </main>
  );
}
