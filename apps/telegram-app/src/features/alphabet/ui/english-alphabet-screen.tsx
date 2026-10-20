"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import {
  ENGLISH_PHONICS,
  phonicsSegments,
  phonicsText,
  type EnglishPhonicsGuide,
  type PhonicsExample,
  type PhonicsLocale,
} from "../../../../../../shared/english-phonics";
import { PHONICS_COPY } from "../../../../../../shared/english-phonics-copy";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useSoundPreferences } from "../../settings/model/preferences";
import { SOUND_PREFERENCES_EVENT } from "../../../shared/browser/sfx";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { useAppLanguage } from "../../../shared/i18n/language-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import styles from "./english-alphabet.module.css";

type Copy = (typeof PHONICS_COPY)[PhonicsLocale];
type Play = (text: string, key: string, slow?: boolean) => void;

/** Highlight the whole spelling pattern, not every matching letter in a word. */
export function FocusWord({ example }: { example: PhonicsExample }) {
  return (
    <span className={styles.word} lang="en-US">
      {phonicsSegments(example).map((part, index) =>
        part.highlighted ? <mark key={index}>{part.text}</mark> : part.text,
      )}
    </span>
  );
}

function WordExample({
  example,
  locale,
  copy,
  play,
  active,
  id,
}: {
  example: PhonicsExample;
  locale: PhonicsLocale;
  copy: Copy;
  play: Play;
  active: string | null;
  id: string;
}) {
  return (
    <div className={styles.example}>
      <div className={styles.wordInfo}>
        <FocusWord example={example} />
        <span className={styles.ipa} lang="en-US">
          {example.ipa}
        </span>
        <span className={styles.meaning}>
          {phonicsText(example.meaning, locale)}
        </span>
      </div>
      <div className={styles.audioControls}>
        <button
          aria-label={`${copy.listen}: ${example.word}`}
          aria-pressed={active === id}
          className={active === id ? styles.audioActive : styles.audio}
          onClick={() => play(example.word, id)}
          type="button"
        >
          <MobileIcon name={active === id ? "stop" : "volume-high"} size={19} />
        </button>
        <button
          aria-label={`${copy.slow}: ${example.word}`}
          aria-pressed={active === `${id}-slow`}
          className={active === `${id}-slow` ? styles.slowActive : styles.slow}
          onClick={() => play(example.word, `${id}-slow`, true)}
          type="button"
        >
          {copy.slow}
        </button>
      </div>
    </div>
  );
}

export function EnglishLetterModal({
  guide,
  locale,
  index,
  onClose,
  onNavigate,
}: {
  guide: EnglishPhonicsGuide;
  locale: PhonicsLocale;
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const copy = PHONICS_COPY[locale];
  const { request } = useTelegramAuth();
  const { value: sound } = useSoundPreferences();
  const { speak, stop } = useKoreanSpeech(request);
  const [tab, setTab] = useState<"rules" | "practice">("rules");
  const [openRule, setOpenRule] = useState<string | null>(
    guide.rules[0]?.id ?? null,
  );
  const [active, setActive] = useState<string | null>(null);
  const [audioNotice, setAudioNotice] = useState<"error" | "muted" | null>(
    null,
  );
  const [answer, setAnswer] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const playbackRef = useRef(0);

  const stopPlayback = useCallback(() => {
    playbackRef.current += 1;
    stop();
    setActive(null);
  }, [stop]);

  useEffect(() => {
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  // No auto-play. Pending TTS preparation must not start after closing or changing a letter.
  useEffect(
    () => () => {
      playbackRef.current += 1;
      stop();
    },
    [stop],
  );
  useEffect(() => {
    window.addEventListener(SOUND_PREFERENCES_EVENT, stopPlayback);
    return () =>
      window.removeEventListener(SOUND_PREFERENCES_EVENT, stopPlayback);
  }, [stopPlayback]);

  const play: Play = (text, key, slow = false) => {
    if (active === key) {
      stopPlayback();
      return;
    }
    stopPlayback();
    let sessionMute: string | null = null;
    try {
      sessionMute = window.sessionStorage.getItem("korio-muted");
    } catch {
      /* private browsing */
    }
    if (
      (sessionMute === null ? sound.startMuted : sessionMute === "true") ||
      sound.speechVolume === 0
    ) {
      setAudioNotice("muted");
      return;
    }
    setAudioNotice(null);
    const playback = playbackRef.current;
    setActive(key);
    speak(text, {
      language: "en-US",
      // Keep the user's speech rate and volume; slow is relative to that rate.
      rate: slow ? Math.max(0.25, sound.speechRate * 0.55) : sound.speechRate,
      respectSoundSettings: true,
      onEnd: () => {
        if (playbackRef.current === playback) setActive(null);
      },
      onError: () => {
        if (playbackRef.current !== playback) return;
        setActive(null);
        setAudioNotice("error");
      },
    });
  };

  const close = () => {
    stopPlayback();
    onClose();
  };
  const navigate = (next: number) => {
    stopPlayback();
    onNavigate(next);
  };
  const keyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), [href], [tabindex="0"]',
    );
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  const examples = (items: readonly PhonicsExample[], prefix: string) =>
    items.map((example, position) => (
      <WordExample
        active={active}
        copy={copy}
        example={example}
        id={`${prefix}-${position}`}
        key={`${prefix}-${example.word}`}
        locale={locale}
        play={play}
      />
    ));

  return (
    <div
      className={styles.backdrop}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        aria-describedby="phonics-name-vs-sound"
        aria-labelledby="phonics-letter-title"
        aria-modal="true"
        className={styles.modal}
        data-no-translate="true"
        onKeyDown={keyDown}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <div aria-hidden="true" className={styles.handle} />
        <header className={styles.modalHeader}>
          <div>
            <span className={styles.overline}>🇺🇸 English · US</span>
            <h2 id="phonics-letter-title">
              {guide.letter}
              <span>{guide.letter.toLowerCase()}</span>
            </h2>
          </div>
          <button
            aria-label={copy.close}
            className={styles.iconButton}
            onClick={close}
            ref={closeRef}
            type="button"
          >
            <MobileIcon name="close" size={24} />
          </button>
        </header>
        <div className={styles.nameRow}>
          <div>
            <span className={styles.eyebrow}>{copy.nameLabel}</span>
            <strong lang="en-US">
              {guide.name} <span>{guide.nameIpa}</span>
            </strong>
            {locale === "ko" && <small>{guide.koreanName}</small>}
          </div>
          <button
            aria-label={`${copy.listen}: ${guide.name}`}
            className={active === "name" ? styles.audioActive : styles.audio}
            onClick={() => play(guide.name, "name")}
            type="button"
          >
            <MobileIcon
              name={active === "name" ? "stop" : "volume-high"}
              size={22}
            />
          </button>
        </div>
        <p className={styles.nameNotice} id="phonics-name-vs-sound">
          <MobileIcon name="bulb-outline" size={20} />
          <span>{copy.nameVsSound}</span>
        </p>
        <div
          aria-label={copy.title}
          className={styles.tabs}
          onKeyDown={(event) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
              return;
            event.preventDefault();
            const next =
              event.key === "Home"
                ? "rules"
                : event.key === "End"
                  ? "practice"
                  : tab === "rules"
                    ? "practice"
                    : "rules";
            stopPlayback();
            setTab(next);
            document.getElementById(`phonics-tab-${next}`)?.focus();
          }}
          role="tablist"
        >
          {(["rules", "practice"] as const).map((value) => (
            <button
              aria-controls={`phonics-panel-${value}`}
              aria-selected={tab === value}
              id={`phonics-tab-${value}`}
              key={value}
              onClick={() => {
                stopPlayback();
                setTab(value);
              }}
              role="tab"
              tabIndex={tab === value ? 0 : -1}
              type="button"
            >
              {value === "rules" ? copy.rulesTab : copy.practiceTab}
            </button>
          ))}
        </div>
        <div
          aria-live="polite"
          className={audioNotice ? styles.audioNotice : styles.srOnly}
          role="status"
        >
          {audioNotice === "error"
            ? copy.audioError
            : audioNotice === "muted"
              ? copy.mutedHint
              : active
                ? copy.listen
                : ""}
        </div>
        <div
          aria-labelledby={`phonics-tab-${tab}`}
          className={styles.modalScroll}
          id={`phonics-panel-${tab}`}
          role="tabpanel"
          tabIndex={0}
        >
          {tab === "rules" ? (
            <>
              <p className={styles.tip}>{phonicsText(guide.tip, locale)}</p>
              {guide.contrast && (
                <section className={styles.contrast}>
                  <span className={styles.sectionLabel}>
                    {copy.compareTitle}
                  </span>
                  <h3>{phonicsText(guide.contrast.title, locale)}</h3>
                  <p>{phonicsText(guide.contrast.explanation, locale)}</p>
                  {examples(guide.contrast.examples, "contrast")}
                </section>
              )}
              <div className={styles.rules}>
                {guide.rules.map((rule, position) => (
                  <section className={styles.rule} key={rule.id}>
                    <h3>
                      <button
                        aria-controls={`rule-${rule.id}`}
                        aria-expanded={openRule === rule.id}
                        className={styles.ruleToggle}
                        onClick={() =>
                          setOpenRule(openRule === rule.id ? null : rule.id)
                        }
                        type="button"
                      >
                        <span className={styles.ruleNumber}>
                          {String(position + 1).padStart(2, "0")}
                        </span>
                        <span className={styles.ruleHeading}>
                          <span>{phonicsText(rule.title, locale)}</span>
                          <span className={styles.pattern} lang="en-US">
                            {rule.pattern} <b>→ {rule.sound}</b>
                          </span>
                        </span>
                        <MobileIcon
                          name={
                            openRule === rule.id ? "chevron-up" : "chevron-down"
                          }
                          size={18}
                        />
                      </button>
                    </h3>
                    {openRule === rule.id && (
                      <div className={styles.ruleBody} id={`rule-${rule.id}`}>
                        <span className={styles.sectionLabel}>
                          {copy.whenLabel}
                        </span>
                        <p>{phonicsText(rule.explanation, locale)}</p>
                        <span className={styles.sectionLabel}>
                          {copy.examplesLabel}
                        </span>
                        {examples(rule.examples, rule.id)}
                        {rule.caution && (
                          <aside className={styles.caution}>
                            <strong>{copy.exceptionsLabel}</strong>
                            <p>{phonicsText(rule.caution, locale)}</p>
                          </aside>
                        )}
                      </div>
                    )}
                  </section>
                ))}
              </div>
              <p className={styles.disclaimer}>
                {copy.ipaHint}
                <br />
                {copy.disclaimer}
              </p>
            </>
          ) : (
            <section className={styles.practice}>
              <span className={styles.practiceIcon}>
                <MobileIcon name="ear-outline" size={30} />
              </span>
              <h3>{copy.practiceTitle}</h3>
              <p>{copy.practiceIntro}</p>
              <h4>{phonicsText(guide.check.prompt, locale)}</h4>
              <div className={styles.choices}>
                {guide.check.options.map((example, option) => (
                  <div className={styles.choice} key={example.word}>
                    <button
                      aria-pressed={answer === option}
                      className={
                        answer === option
                          ? styles.choiceSelected
                          : styles.choiceButton
                      }
                      onClick={() => {
                        stopPlayback();
                        setAnswer(option);
                      }}
                      type="button"
                    >
                      <FocusWord example={example} />
                      <span>{phonicsText(example.meaning, locale)}</span>
                    </button>
                    <div className={styles.choiceAudioRow}>
                      <button
                        aria-label={`${copy.listen}: ${example.word}`}
                        aria-pressed={active === `check-${option}`}
                        className={styles.choiceAudio}
                        onClick={() => play(example.word, `check-${option}`)}
                        type="button"
                      >
                        <MobileIcon
                          name={
                            active === `check-${option}`
                              ? "stop"
                              : "volume-high"
                          }
                          size={20}
                        />
                      </button>
                      <button
                        aria-label={`${copy.slow}: ${example.word}`}
                        aria-pressed={active === `check-${option}-slow`}
                        className={styles.choiceAudio}
                        onClick={() =>
                          play(example.word, `check-${option}-slow`, true)
                        }
                        type="button"
                      >
                        {copy.slow}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {answer !== null && (
                <div
                  aria-live="polite"
                  className={
                    answer === guide.check.correctIndex
                      ? styles.correct
                      : styles.retry
                  }
                >
                  <strong>
                    <MobileIcon
                      name={
                        answer === guide.check.correctIndex
                          ? "checkmark-circle"
                          : "bulb-outline"
                      }
                      size={20}
                    />
                    {answer === guide.check.correctIndex
                      ? copy.correct
                      : copy.tryAgain}
                  </strong>
                  <p>{phonicsText(guide.check.explanation, locale)}</p>
                  <button
                    onClick={() => {
                      stopPlayback();
                      setAnswer(null);
                    }}
                    type="button"
                  >
                    {copy.resetPractice}
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
        <footer className={styles.modalFooter}>
          <button
            aria-label={`${copy.previousLetter}: ${ENGLISH_PHONICS[index - 1]?.letter ?? ""}`}
            disabled={index === 0}
            onClick={() => navigate(index - 1)}
            type="button"
          >
            <MobileIcon name="chevron-back" size={21} />
            {ENGLISH_PHONICS[index - 1]?.letter ?? ""}
          </button>
          <span>
            {copy.letterPosition
              .replace("{{current}}", String(index + 1))
              .replace("{{total}}", String(ENGLISH_PHONICS.length))}
          </span>
          <button
            aria-label={`${copy.nextLetter}: ${ENGLISH_PHONICS[index + 1]?.letter ?? ""}`}
            disabled={index === ENGLISH_PHONICS.length - 1}
            onClick={() => navigate(index + 1)}
            type="button"
          >
            {ENGLISH_PHONICS[index + 1]?.letter ?? ""}
            <MobileIcon name="chevron-forward" size={21} />
          </button>
        </footer>
      </div>
    </div>
  );
}

export function EnglishAlphabetScreen() {
  const router = useRouter();
  const { language } = useAppLanguage();
  const locale: PhonicsLocale = language in PHONICS_COPY ? language : "en";
  const copy = PHONICS_COPY[locale];
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "vowels" | "consonants">("all");
  const close = useCallback(() => setSelected(null), []);
  const navigate = useCallback((index: number) => setSelected(index), []);
  const guide = selected === null ? undefined : ENGLISH_PHONICS[selected];
  return (
    <main className={styles.page} data-no-translate="true">
      <div inert={selected !== null}>
        <header className={styles.header}>
          <button
            aria-label={copy.back}
            className={styles.iconButton}
            onClick={() => router.back()}
            type="button"
          >
            <MobileIcon name="arrow-back" size={24} />
          </button>
          <span>🇺🇸 English · US</span>
          <span className={styles.headerBadge}>A–Z</span>
        </header>
        <section className={styles.hero}>
          <span aria-hidden="true" className={styles.heroLetters}>
            Aa<span>→</span>
            <i>/æ/</i>
          </span>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </section>
        <div aria-label={copy.title} className={styles.filters}>
          {(["all", "vowels", "consonants"] as const).map((value) => (
            <button
              aria-pressed={filter === value}
              key={value}
              onClick={() => setFilter(value)}
              type="button"
            >
              {value === "all" ? copy.allLetters : copy[value]}
            </button>
          ))}
        </div>
        <div className={styles.letterGrid}>
          {ENGLISH_PHONICS.map((letter, index) => {
            const vowel = "AEIOU".includes(letter.letter);
            if (
              (filter === "vowels" && !vowel) ||
              (filter === "consonants" && vowel)
            )
              return null;
            return (
              <button
                aria-label={`${letter.letter} ${letter.name} — ${copy.patternCount.replace("{{count}}", String(letter.rules.length))}`}
                className={vowel ? styles.vowelCard : styles.letterCard}
                key={letter.letter}
                onClick={() => setSelected(index)}
                type="button"
              >
                <strong lang="en-US">
                  {letter.letter}
                  <span>{letter.letter.toLowerCase()}</span>
                </strong>
                <span className={styles.cardName} lang="en-US">
                  {letter.nameIpa}
                </span>
                <span className={styles.cardPatterns}>
                  {copy.patternCount.replace(
                    "{{count}}",
                    String(letter.rules.length),
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <p className={styles.pageNote}>{copy.nameVsSound}</p>
      </div>
      {guide && selected !== null && (
        <EnglishLetterModal
          guide={guide}
          index={selected}
          key={guide.letter}
          locale={locale}
          onClose={close}
          onNavigate={navigate}
        />
      )}
    </main>
  );
}
