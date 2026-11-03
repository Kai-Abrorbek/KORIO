"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { playSfx } from "../../../shared/browser/sfx";
import { uzt } from "../../../shared/i18n/uz-text";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import type { StudyWord } from "../model/word";
import styles from "./word-study-completion.module.css";

export function WordStudyCompletion({
  words,
  viewed,
  practiced,
  didPractice,
  range,
  rangeI18nKey,
  onContinue,
  onReviewAgain,
}: {
  words: StudyWord[];
  viewed: number;
  practiced: number;
  didPractice: boolean;
  range: string;
  rangeI18nKey?: string;
  onContinue: () => void;
  onReviewAgain: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    const cue = window.setTimeout(() => {
      if (document.hidden) return;
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
      void playSfx("lesson-complete");
    }, 480);
    return () => window.clearTimeout(cue);
  }, []);

  const samples = words.slice(-3);
  return (
    <section className={styles.complete}>
      <div className={styles.art} aria-hidden="true">
        <div className={styles.orbit} />
        <div className={styles.cards}>
          {samples.map((word, index) => (
            <div
              className={styles.word}
              key={word.id}
              style={
                {
                  "--card": index,
                  "--count": samples.length,
                  "--fan-distance": `${Math.abs(index - (samples.length - 1) / 2) * 13}px`,
                } as CSSProperties
              }
            >
              <span className={styles.cardMark}>
                <MobileIcon name="checkmark" size={17} />
              </span>
              <strong data-no-translate>{word.headword}</strong>
              <small data-no-translate>{word.meaning}</small>
              <span className={styles.cardRule} />
            </div>
          ))}
        </div>
        <span className={styles.seal}>
          <MobileIcon name="checkmark" size={37} />
        </span>
        {Array.from({ length: 12 }, (_, index) => (
          <i
            className={styles.particle}
            key={index}
            style={{ "--particle": index } as CSSProperties}
          />
        ))}
      </div>
      <div className={styles.result}>
        <h1
          ref={heading}
          tabIndex={-1}
          data-i18n={`wordStudy.finish.${didPractice ? "title" : "browseTitle"}`}
        >
          {uzt(`wordStudy.finish.${didPractice ? "title" : "browseTitle"}`)}
        </h1>
        <p
          data-i18n={`wordStudy.finish.${didPractice ? "subtitle" : "browseSubtitle"}`}
        >
          {uzt(
            `wordStudy.finish.${didPractice ? "subtitle" : "browseSubtitle"}`,
          )}
        </p>
        <span className={styles.range} data-no-translate={!rangeI18nKey || undefined} data-i18n={rangeI18nKey}>
          {range}
        </span>
        <dl className={styles.stats}>
          <div>
            <dt data-i18n="wordStudy.finish.viewed">
              {uzt("wordStudy.finish.viewed")}
            </dt>
            <dd>
              <MobileIcon name="layers" size={20} />
              <span data-no-translate>{viewed}</span>
            </dd>
          </div>
          {didPractice && (
            <div>
              <dt data-i18n="wordStudy.finish.practiced">
                {uzt("wordStudy.finish.practiced")}
              </dt>
              <dd>
                <MobileIcon name="checkmark" size={20} />
                <span data-no-translate>{practiced}</span>
              </dd>
            </div>
          )}
        </dl>
      </div>
      <div className={styles.actions}>
        <button className={styles.continue} type="button" onClick={onContinue}>
          <span data-i18n="wordStudy.finish.continue">
            {uzt("wordStudy.finish.continue")}
          </span>
          <MobileIcon name="arrow-forward" size={20} />
        </button>
        <button
          className={styles.again}
          type="button"
          onClick={onReviewAgain}
          data-i18n="wordStudy.finish.reviewAgain"
        >
          {uzt("wordStudy.finish.reviewAgain")}
        </button>
      </div>
    </section>
  );
}
