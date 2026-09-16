import type { ReactNode } from "react";

import {
  MobileIcon,
  type IoniconName,
} from "../../../shared/ui/mobile-icon";
import type { SessionSummary } from "../model/tutor";
import styles from "./tutor-screen.module.css";

interface TutorSummaryProps {
  data: SessionSummary;
  topicTitle?: string;
  onSpeak: (text: string) => void;
  onClose: () => void;
  onAgain: () => void;
}

export function TutorSummary({
  data,
  topicTitle,
  onSpeak,
  onClose,
  onAgain,
}: TutorSummaryProps) {
  const minutes = Math.floor(data.durationSec / 60);
  const seconds = data.durationSec % 60;

  return (
    <main className={`${styles.screen} ${styles.summaryScreen}`}>
      <div className={styles.summaryScroll}>
        <section className={styles.summaryHero}>
          <span className={styles.summaryHeroIcon}>
            <MobileIcon name="chatbubbles" size={26} />
          </span>
          <h1>Suhbat tugadi!</h1>
          {topicTitle ? <p>{topicTitle}</p> : null}
          <div className={styles.statRow}>
            <SummaryStat
              label="Suhbat vaqti"
              value={
                minutes > 0
                  ? `${minutes}:${String(seconds).padStart(2, "0")}`
                  : `${seconds}s`
              }
            />
            <i />
            <SummaryStat label="Gapirdingiz" value={String(data.spokenTurns)} />
            <i />
            <SummaryStat
              label="Yangi ibora"
              value={String(data.newVocabulary.length)}
            />
          </div>
        </section>

        {data.summary ? <p className={styles.summaryLine}>{data.summary}</p> : null}

        {data.goodExpressions.length ? (
          <SummarySection
            icon="checkmark-circle"
            tint="#58CC02"
            title="Yaxshi aytdingiz"
          >
            {data.goodExpressions.map((expression) => (
              <button
                className={styles.goodRow}
                key={expression}
                onClick={() => onSpeak(expression)}
                type="button"
              >
                <MobileIcon name="volume-medium" size={15} />
                <span>{expression}</span>
              </button>
            ))}
          </SummarySection>
        ) : null}

        {data.mistakes.length ? (
          <SummarySection
            icon="sparkles"
            tint="#FFC800"
            title="Bunday desangiz yanada yaxshi"
          >
            {data.mistakes.map((mistake, index) => (
              <article
                className={styles.fixCard}
                key={`${mistake.corrected}-${index}`}
              >
                <del>{mistake.original}</del>
                <MobileIcon name="arrow-down" size={13} />
                <button onClick={() => onSpeak(mistake.corrected)} type="button">
                  <strong>{mistake.corrected}</strong>
                  <MobileIcon name="volume-high" size={16} />
                </button>
                {mistake.note ? <p>{mistake.note}</p> : null}
              </article>
            ))}
          </SummarySection>
        ) : null}

        {data.newVocabulary.length ? (
          <SummarySection
            icon="bookmark"
            tint="var(--korio-purple)"
            title="Bugungi iboralar"
          >
            <div className={styles.summaryChips}>
              {data.newVocabulary.map((word) => (
                <button key={word} onClick={() => onSpeak(word)} type="button">
                  <MobileIcon name="volume-medium" size={13} />
                  {word}
                </button>
              ))}
            </div>
            <small>To&apos;g&apos;ri talaffuzni eshitish uchun bosing</small>
          </SummarySection>
        ) : null}

        {data.grammarPoints.length ? (
          <div className={styles.grammarChips}>
            {data.grammarPoints.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        ) : null}
      </div>

      <footer className={styles.summaryFooter}>
        <button className={styles.againButton} onClick={onAgain} type="button">
          <MobileIcon name="refresh" size={17} />
          Yana suhbatlashish
        </button>
        <button className={styles.doneButton} onClick={onClose} type="button">
          Tayyor
        </button>
      </footer>
    </main>
  );
}

function SummaryStat({ value, label }: { value: string; label: string }) {
  return (
    <span className={styles.stat}>
      <strong>{value}</strong>
      <small>{label}</small>
    </span>
  );
}

function SummarySection({
  icon,
  tint,
  title,
  children,
}: {
  icon: IoniconName;
  tint: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.summarySection}>
      <h2 style={{ color: tint }}>
        <MobileIcon name={icon} size={17} />
        <span>{title}</span>
      </h2>
      {children}
    </section>
  );
}
