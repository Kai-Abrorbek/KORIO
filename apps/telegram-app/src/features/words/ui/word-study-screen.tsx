"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { completeStudyNode } from "../../lesson/api/lesson";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import {
  getUnitWords,
  getWordSections,
  markSeenWords,
  reviewWord,
} from "../api/words";
import {
  PART_OF_SPEECH,
  isWordAnswerCorrect,
  lessonSlice,
  type StudyWord,
  type WordSectionSummary,
  type WordUnitSummary,
} from "../model/word";
import styles from "./word-study.module.css";

const SWIPE_THRESHOLD = 88;
const SWIPE_VELOCITY = 720;
const SCOPE_STORAGE_KEY = "korio.telegram.word-scope";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;
type RecallStatus = "idle" | "wrong" | "correct";
type StudyPhase = "browse" | "recall" | "complete";
type CardMotion = "idle" | "out" | "in";

interface WordPreferences {
  autoPlay: boolean;
  cardIndex: number;
  section: number;
  unit: number;
}

interface CardPalette {
  accent: string;
  dark: string;
  from: string;
  tint: string;
  to: string;
}

const PALETTES: readonly CardPalette[] = [
  { accent: "#776ee2", dark: "#5f56c8", from: "#dcd8ff", tint: "#f3f1ff", to: "#f0eeff" },
  { accent: "#1ca7d8", dark: "#1286b0", from: "#bfefff", tint: "#ecfaff", to: "#e8f9ff" },
  { accent: "#e78a20", dark: "#c56b0c", from: "#ffe0b5", tint: "#fff7e8", to: "#fff4dc" },
  { accent: "#2ba875", dark: "#1d865c", from: "#cbefdc", tint: "#effbf5", to: "#eefaf3" },
  { accent: "#e95d84", dark: "#c84269", from: "#ffd7e2", tint: "#fff1f5", to: "#fff0f4" },
];

function paletteFor(word: StudyWord, index: number): CardPalette {
  const seed = [...word.headword].reduce(
    (sum, character) => sum + (character.codePointAt(0) ?? 0),
    index,
  );
  return PALETTES[seed % PALETTES.length] ?? PALETTES[0]!;
}

function paletteStyle(palette: CardPalette): CSSProperties {
  return {
    "--word-accent": palette.accent,
    "--word-accent-dark": palette.dark,
    "--word-from": palette.from,
    "--word-tint": palette.tint,
    "--word-to": palette.to,
  } as CSSProperties;
}

function speechText(word: StudyWord): string {
  return word.pronunciation.ttsText || word.pronunciation.hangul || word.headword;
}

function readPreferences(): WordPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(SCOPE_STORAGE_KEY) ?? "null",
    ) as Partial<WordPreferences> | null;
    if (!parsed || !Number.isFinite(parsed.section) || !Number.isFinite(parsed.unit)) {
      return null;
    }
    return {
      autoPlay: typeof parsed.autoPlay === "boolean" ? parsed.autoPlay : true,
      cardIndex: Number.isFinite(parsed.cardIndex) ? Number(parsed.cardIndex) : 0,
      section: Number(parsed.section),
      unit: Number(parsed.unit),
    };
  } catch {
    window.localStorage.removeItem(SCOPE_STORAGE_KEY);
    return null;
  }
}

function savePreferences(preferences: WordPreferences) {
  window.localStorage.setItem(SCOPE_STORAGE_KEY, JSON.stringify(preferences));
}

function pickRecallWordId(
  pendingIds: string[],
  currentWordId?: string,
  lastRecalledWordId?: string | null,
) {
  const spacedCandidates = pendingIds.filter(
    (id) => id !== currentWordId && id !== lastRecalledWordId,
  );
  const freshCandidates = pendingIds.filter((id) => id !== lastRecalledWordId);
  const candidates =
    spacedCandidates.length > 0
      ? spacedCandidates
      : freshCandidates.length > 0
        ? freshCandidates
        : pendingIds;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function hapticSelection() {
  window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
}

function hapticImpact() {
  window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
}

function hapticNotification(type: "error" | "success") {
  window.Telegram?.WebApp.HapticFeedback?.notificationOccurred(type);
}

function useSeenWords(request: AuthenticatedRequest) {
  const pendingRef = useRef<string[]>([]);
  const sentRef = useRef(new Set<string>());

  const flush = useCallback(() => {
    const ids = pendingRef.current;
    if (!ids.length) return;
    pendingRef.current = [];
    void markSeenWords(request, ids).catch(() => undefined);
  }, [request]);

  const markSeen = useCallback(
    (wordId?: string) => {
      if (!wordId || sentRef.current.has(wordId)) return;
      sentRef.current.add(wordId);
      pendingRef.current.push(wordId);
      if (pendingRef.current.length >= 6) flush();
    },
    [flush],
  );

  useEffect(() => flush, [flush]);
  return { flush, markSeen };
}

function WordVisual({
  concealHeadword = false,
  word,
}: {
  concealHeadword?: boolean;
  word: StudyWord;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(word.media.imageUrl) && !imageFailed;

  return (
    <div className={styles.visualArea}>
      <div className={styles.visualBadges}>
        <span className={styles.partChip}><i />{PART_OF_SPEECH[word.partOfSpeech]}</span>
        {word.placement?.isCore ? (
          <span className={styles.coreChip}>
            <MobileIcon name="sparkles" size={13} />Asosiy
          </span>
        ) : null}
      </div>
      <div className={styles.wordVisual}>
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={concealHeadword ? "Ma'nosiga qarab eslang" : word.media.imageAlt || word.headword}
            onError={() => setImageFailed(true)}
            src={word.media.imageUrl}
          />
        ) : word.media.emoji ? (
          <span className={styles.wordEmoji}>{word.media.emoji}</span>
        ) : (
          <span className={styles.wordLetter}>
            {concealHeadword ? "?" : word.headword.slice(0, 1)}
          </span>
        )}
      </div>
    </div>
  );
}

function SpeakerIcon({ active = false }: { active?: boolean }) {
  return (
    <MobileIcon name={active ? "volume-high" : "volume-medium-outline"} size={25} />
  );
}

function WordCard({
  index,
  onSpeak,
  speaking,
  word,
}: {
  index: number;
  onSpeak: () => void;
  speaking: boolean;
  word: StudyWord;
}) {
  const palette = paletteFor(word, index);
  const example = word.examples[0];

  return (
    <article className={styles.wordCard} style={paletteStyle(palette)}>
      <WordVisual word={word} />
      <div className={styles.cardBody}>
        <div className={styles.wordRow}>
          <div className={styles.wordHeading}>
            <h2>{word.headword}</h2>
            {word.pronunciation.romanization ? <p>{word.pronunciation.romanization}</p> : null}
          </div>
          <button
            aria-label="So'z talaffuzini tinglash"
            className={speaking ? styles.speakerActive : styles.speakerButton}
            onClick={onSpeak}
            type="button"
          >
            <SpeakerIcon active={speaking} />
          </button>
        </div>
        <small className={styles.meaningLabel}>Ma&apos;nosi</small>
        <strong className={styles.meaning}>{word.meaning}</strong>
        <div className={styles.cardDivider} />
        <div className={styles.exampleTitle}>
          <span><MobileIcon name="chatbubble-ellipses" size={16} /></span>Misol
        </div>
        {example ? (
          <div className={styles.examplePanel}>
            <b>{example.korean}</b><span>{example.translation}</span>
          </div>
        ) : (
          <div className={[styles.examplePanel, styles.exampleEmpty].join(" ")}>
            <MobileIcon name="create-outline" size={18} />
            <span>Bu so&apos;z uchun misol gap tez orada qo&apos;shiladi.</span>
          </div>
        )}
        {word.usageNote ? (
          <p className={styles.usageNote}>
            <MobileIcon name="bulb-outline" size={17} /><span>{word.usageNote}</span>
          </p>
        ) : null}
      </div>
    </article>
  );
}

function RecallCard({
  answer,
  compact,
  hintVisible,
  index,
  onAnswer,
  onFocusChange,
  onHint,
  onSpeak,
  onSubmit,
  speaking,
  status,
  word,
}: {
  answer: string;
  compact: boolean;
  hintVisible: boolean;
  index: number;
  onAnswer: (value: string) => void;
  onFocusChange: (focused: boolean) => void;
  onHint: () => void;
  onSpeak: () => void;
  onSubmit: () => void;
  speaking: boolean;
  status: RecallStatus;
  word: StudyWord;
}) {
  const palette = paletteFor(word, index);
  const isCorrect = status === "correct";
  const isWrong = status === "wrong";
  const cardClasses = [
    styles.wordCard,
    styles.recallCard,
    compact ? styles.recallCompact : "",
    isCorrect ? styles.recallCorrect : "",
    isWrong ? styles.recallWrong : "",
  ].filter(Boolean).join(" ");

  return (
    <article className={cardClasses} style={paletteStyle(palette)}>
      <WordVisual concealHeadword word={word} />
      <div className={styles.cardBody}>
        <div className={styles.recallBadgeRow}>
          <span className={styles.recallBadge}>
            <MobileIcon name="sparkles" size={14} />Yodlash mashqi
          </span>
          {!compact ? (
            <small className={styles.recallCountHint}>
              Hali tekshirilmagan so&apos;z
            </small>
          ) : null}
        </div>
        <label className={styles.recallLabel} htmlFor="word-recall-answer">
          Koreyscha so&apos;z
        </label>
        <div className={styles.answerShell}>
          <input
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            disabled={isCorrect}
            id="word-recall-answer"
            onBlur={() => onFocusChange(false)}
            onChange={(event) => onAnswer(event.target.value)}
            onFocus={(event) => {
              onFocusChange(true);
              window.setTimeout(
                () => event.currentTarget.scrollIntoView({ behavior: "smooth", block: "center" }),
                180,
              );
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") onSubmit();
            }}
            placeholder={word.meaning}
            value={answer}
          />
          <button
            aria-label="Javobni tekshirish"
            disabled={!answer.trim() || isCorrect}
            onClick={onSubmit}
            type="button"
          >
            <MobileIcon name={isCorrect ? "checkmark" : "arrow-forward"} size={21} />
          </button>
        </div>
        <small className={styles.meaningLabel}>Ma&apos;nosi</small>
        <strong className={styles.meaning}>{word.meaning}</strong>
        <div className={styles.cardDivider} />
        <div
          className={[
            styles.recallFeedback,
            isCorrect ? styles.feedbackCorrect : "",
            isWrong ? styles.feedbackWrong : "",
          ].filter(Boolean).join(" ")}
        >
          <span className={styles.feedbackIcon}>
            <MobileIcon
              name={isCorrect ? "checkmark" : isWrong ? "refresh" : "bulb-outline"}
              size={18}
            />
          </span>
          <span className={styles.feedbackCopy}>
            <strong>
              {hintVisible && !isCorrect
                ? "Javob: " + word.headword
                : isCorrect
                  ? "To'g'ri!"
                  : isWrong
                    ? "Yana bir bor eslang"
                    : "Koreyschasini eslang"}
            </strong>
            {!compact ? (
              <small>
                {hintVisible && !isCorrect
                  ? "Ko'rsatilgan javobni o'zingiz yozib tekshiring."
                  : isCorrect
                    ? "Endi keyingi so'zga o'tishingiz mumkin."
                    : isWrong
                      ? "Bu yaqinda ko'rgan so'zingiz. Qayta yozib ko'ring."
                      : "Bo'shliq va tinish belgilaridagi farq qabul qilinadi."}
              </small>
            ) : null}
          </span>
          {isCorrect ? (
            <button
              aria-label="So'z talaffuzini tinglash"
              className={speaking ? styles.miniSpeakerActive : styles.miniSpeaker}
              onClick={onSpeak}
              type="button"
            >
              <SpeakerIcon active={speaking} />
            </button>
          ) : !hintVisible ? (
            <button className={styles.hintButton} onClick={onHint} type="button">
              <MobileIcon name="bulb-outline" size={16} />Yordam
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function PreviewCard({ index, word }: { index: number; word: StudyWord }) {
  const palette = paletteFor(word, index);
  return (
    <article className={styles.previewCard} style={paletteStyle(palette)}>
      <div className={styles.previewVisual}>
        <span>{word.media.emoji || "가"}</span>
      </div>
      <div className={styles.previewBody}>
        <strong>{word.headword}</strong>
        <span>{word.meaning}</span>
      </div>
    </article>
  );
}

function RecallOffer({
  count,
  onClose,
  onSkip,
  onStart,
}: {
  count: number;
  onClose: () => void;
  onSkip: () => void;
  onStart: () => void;
}) {
  return (
    <div className={styles.offerBackdrop} onClick={onClose} role="presentation">
      <section
        aria-label="Yodlash mashqi"
        aria-modal="true"
        className={styles.offerCard}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <span className={styles.offerIcon}>
          <MobileIcon name="sparkles" size={28} />
        </span>
        <small>Barcha so&apos;zlarni ko&apos;rdingiz</small>
        <h2>Endi eslab ko&apos;ramizmi?</h2>
        <p>
          Hozirgina ko&apos;rgan {count} ta so&apos;zni ma&apos;nosiga qarab
          yozib, xotirangizni tekshiring.
        </p>
        <button className={styles.offerStart} onClick={onStart} type="button">
          <MobileIcon name="school-outline" size={20} />Mashqni boshlash
        </button>
        <button className={styles.offerSkip} onClick={onSkip} type="button">
          Keyinroq
        </button>
      </section>
    </div>
  );
}

function ScopeSheet({
  initialAutoPlay,
  initialSection,
  initialUnit,
  onApply,
  onClose,
  summaries,
}: {
  initialAutoPlay: boolean;
  initialSection: number;
  initialUnit: number;
  onApply: (section: number, unit: number, autoPlay: boolean) => void;
  onClose: () => void;
  summaries: WordSectionSummary[];
}) {
  const available = summaries.filter((summary) => summary.words > 0);
  const [section, setSection] = useState(initialSection);
  const [unit, setUnit] = useState(initialUnit);
  const [autoPlay, setAutoPlay] = useState(initialAutoPlay);
  const [sheetY, setSheetY] = useState(0);
  const [sheetTransitioning, setSheetTransitioning] = useState(false);
  const dragRef = useRef<{
    pointerId: number;
    startAt: number;
    startY: number;
  } | null>(null);
  const selectedSummary =
    available.find((summary) => summary.section === section) ?? available[0];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const selectSection = (nextSection: number) => {
    const nextSummary = available.find(
      (summary) => summary.section === nextSection,
    );
    if (!nextSummary) return;
    setSection(nextSection);
    setUnit(nextSummary.units[0]?.unit ?? 1);
    hapticSelection();
  };

  const selectPlayback = (enabled: boolean) => {
    if (enabled === autoPlay) return;
    setAutoPlay(enabled);
    hapticSelection();
  };

  const finishSheetDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag) return;
    const elapsed = Math.max(1, performance.now() - drag.startAt);
    const velocity = ((event.clientY - drag.startY) / elapsed) * 1000;
    if (sheetY > 100 || velocity > 900) {
      setSheetTransitioning(true);
      setSheetY(window.innerHeight);
      window.setTimeout(onClose, 200);
      return;
    }
    setSheetTransitioning(true);
    setSheetY(0);
    window.setTimeout(() => setSheetTransitioning(false), 180);
  };

  return (
    <div className={styles.sheetBackdrop} onClick={onClose} role="presentation">
      <section
        aria-label="O'rganish doirasini tanlang"
        aria-modal="true"
        className={[
          styles.scopeSheet,
          sheetTransitioning ? styles.sheetTransitioning : "",
        ].filter(Boolean).join(" ")}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        style={{ transform: "translateY(" + String(sheetY) + "px)" }}
      >
        <div
          className={styles.sheetDragArea}
          onPointerDown={(event) => {
            if ((event.target as HTMLElement).closest("button")) return;
            dragRef.current = {
              pointerId: event.pointerId,
              startAt: performance.now(),
              startY: event.clientY,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
            setSheetTransitioning(false);
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current;
            if (!drag || drag.pointerId !== event.pointerId) return;
            setSheetY(Math.max(0, event.clientY - drag.startY));
          }}
          onPointerUp={finishSheetDrag}
        >
          <div className={styles.sheetGrip} />
          <header>
            <span>
              <small>KARTALARNI TANLANG</small>
              <strong>O&apos;rganish doirasini tanlang</strong>
            </span>
            <button aria-label="Yopish" onClick={onClose} type="button">
              <MobileIcon name="close" size={20} />
            </button>
          </header>
        </div>

        <div className={styles.pickerScroll}>
          <h3>Bo&apos;lim</h3>
          <div className={styles.scopeSectionRow}>
            {available.map((summary) => {
              const selected = summary.section === selectedSummary?.section;
              return (
                <button
                  className={selected ? styles.scopeSelected : ""}
                  key={summary.section}
                  onClick={() => selectSection(summary.section)}
                  type="button"
                >
                  <strong>{summary.section}-bo&apos;lim</strong>
                  <span>{summary.words} ta so&apos;z</span>
                </button>
              );
            })}
          </div>

          <h3>Unit</h3>
          <div className={styles.unitGrid}>
            {(selectedSummary?.units ?? []).map((item: WordUnitSummary) => {
              const selected = item.unit === unit;
              return (
                <button
                  className={selected ? styles.unitSelected : ""}
                  key={item.unit}
                  onClick={() => {
                    setUnit(item.unit);
                    hapticSelection();
                  }}
                  type="button"
                >
                  <span className={styles.unitNumber}>{item.unit}</span>
                  <span className={styles.unitCopy}>
                    <strong>{item.unit}-unit</strong>
                    <small>{item.words} ta so&apos;z</small>
                  </span>
                  {selected ? <MobileIcon name="checkmark-circle" size={22} /> : null}
                </button>
              );
            })}
          </div>

          <h3 className={styles.playbackLabel}>Talaffuzni eshitish</h3>
          <div className={styles.playbackOptions}>
            <button
              aria-checked={autoPlay}
              className={autoPlay ? styles.playbackSelected : ""}
              onClick={() => selectPlayback(true)}
              role="radio"
              type="button"
            >
              <span className={styles.playbackIcon}>
                <MobileIcon name="volume-high-outline" size={20} />
              </span>
              <span className={styles.playbackCopy}>
                <strong>Avtomatik ijro</strong>
                <small>Har yangi karta ochilganda so&apos;z o&apos;qiladi.</small>
              </span>
              {autoPlay ? <MobileIcon name="checkmark-circle" size={21} /> : null}
            </button>
            <button
              aria-checked={!autoPlay}
              className={!autoPlay ? styles.playbackSelected : ""}
              onClick={() => selectPlayback(false)}
              role="radio"
              type="button"
            >
              <span className={styles.playbackIcon}>
                <MobileIcon name="finger-print-outline" size={20} />
              </span>
              <span className={styles.playbackCopy}>
                <strong>Bosib tinglash</strong>
                <small>Faqat karnay tugmasini bosganda o&apos;qiladi.</small>
              </span>
              {!autoPlay ? <MobileIcon name="checkmark-circle" size={21} /> : null}
            </button>
          </div>
        </div>

        <button
          className={styles.applyScope}
          disabled={!selectedSummary || !unit}
          onClick={() => {
            if (selectedSummary && unit) {
              onApply(selectedSummary.section, unit, autoPlay);
            }
          }}
          type="button"
        >
          Shu doirani o&apos;rganish
          <MobileIcon name="arrow-forward" size={20} />
        </button>
      </section>
    </div>
  );
}

export function WordStudyScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request } = useTelegramAuth();
  const { flush: flushSeen, markSeen } = useSeenWords(request);
  const { prewarm, speak, speaking, stop } = useKoreanSpeech(request);
  const requestedSection = Number(params.get("section")) || 0;
  const requestedUnit = Number(params.get("unit")) || 0;
  const lesson = Math.max(1, Number(params.get("lesson")) || 1);
  const lessonCount = Math.max(1, Number(params.get("lessonCount")) || 1);
  const fromStudyPath = params.get("from") === "studyPath";

  const [summaries, setSummaries] = useState<WordSectionSummary[]>([]);
  const [section, setSection] = useState(3);
  const [unit, setUnit] = useState(1);
  const [words, setWords] = useState<StudyWord[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [scopeLoading, setScopeLoading] = useState(true);
  const [wordsLoading, setWordsLoading] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [scopeOpen, setScopeOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [studyPhase, setStudyPhase] = useState<StudyPhase>("browse");
  const [offerOpen, setOfferOpen] = useState(false);
  const [recallWord, setRecallWord] = useState<StudyWord | null>(null);
  const [answer, setAnswer] = useState("");
  const [recallStatus, setRecallStatus] = useState<RecallStatus>("idle");
  const [hintVisible, setHintVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [pendingRecallWordIds, setPendingRecallWordIds] = useState<string[]>([]);
  const [dragX, setDragX] = useState(0);
  const [cardMotion, setCardMotion] = useState<CardMotion>("idle");

  const resumeIndexRef = useRef<number | null>(null);
  const resumeConsumedRef = useRef(false);
  const recallOfferShownRef = useRef(false);
  const lastRecalledWordIdRef = useRef<string | null>(null);
  const recallResultReportedRef = useRef(false);
  const recallHadWrongAttemptRef = useRef(false);
  const animationTimeoutRef = useRef<number | null>(null);
  const pointerRef = useRef<{
    pointerId: number;
    startAt: number;
    startX: number;
    startY: number;
  } | null>(null);

  const loadSummaries = useCallback(async () => {
    setScopeLoading(true);
    setLoadFailed(false);
    try {
      const result = await getWordSections(request);
      const available = result.filter((summary) => summary.words > 0);
      const saved = readPreferences();
      setSummaries(result);
      if (saved) setAutoPlay(saved.autoPlay);

      const targetSection = requestedSection || saved?.section;
      const targetUnit = requestedUnit || saved?.unit;
      const matchedSummary = available.find((item) => item.section === targetSection);
      const matchedUnit = matchedSummary?.units.find(
        (item) => item.unit === targetUnit,
      )?.unit;

      if (matchedSummary && matchedUnit) {
        setSection(matchedSummary.section);
        setUnit(matchedUnit);
        if (
          !requestedSection &&
          saved &&
          saved.section === matchedSummary.section &&
          saved.unit === matchedUnit
        ) {
          resumeIndexRef.current = saved.cardIndex;
        }
      } else {
        const fallback = available[0];
        if (fallback?.units[0]) {
          setSection(fallback.section);
          setUnit(fallback.units[0].unit);
        }
        if (!requestedSection) setScopeOpen(true);
      }
    } catch {
      setLoadFailed(true);
    } finally {
      setScopeLoading(false);
    }
  }, [request, requestedSection, requestedUnit]);

  useEffect(() => {
    void loadSummaries();
  }, [loadSummaries]);

  const loadWords = useCallback(async () => {
    if (scopeLoading || summaries.length === 0 || !section || !unit) return;
    setWordsLoading(true);
    setLoadFailed(false);
    flushSeen();
    setStudyPhase("browse");
    setOfferOpen(false);
    setRecallWord(null);
    setAnswer("");
    setRecallStatus("idle");
    setHintVisible(false);
    setKeyboardVisible(false);
    setPendingRecallWordIds([]);
    recallOfferShownRef.current = false;
    lastRecalledWordIdRef.current = null;
    recallResultReportedRef.current = false;
    recallHadWrongAttemptRef.current = false;
    setWords([]);
    setCardIndex(0);
    stop();
    setDragX(0);
    setCardMotion("idle");

    try {
      const all = await getUnitWords(request, section, unit);
      const result =
        lessonCount > 1
          ? (() => {
              const range = lessonSlice(all.length, lessonCount, lesson);
              return all.slice(range.start, range.end);
            })()
          : all;
      setWords(result);

      const resumeAt = resumeIndexRef.current;
      resumeIndexRef.current = null;
      if (!resumeConsumedRef.current && resumeAt != null && result.length > 0) {
        resumeConsumedRef.current = true;
        setCardIndex(
          Math.min(Math.max(0, resumeAt), Math.max(0, result.length - 1)),
        );
      }
    } catch {
      setLoadFailed(true);
    } finally {
      setWordsLoading(false);
    }
  }, [
    flushSeen,
    lesson,
    lessonCount,
    request,
    scopeLoading,
    section,
    stop,
    summaries.length,
    unit,
  ]);

  useEffect(() => {
    void loadWords();
  }, [loadWords]);

  const currentWord = words[cardIndex];
  const previousWord = cardIndex > 0 ? words[cardIndex - 1] : undefined;
  const nextWord = cardIndex < words.length - 1 ? words[cardIndex + 1] : undefined;
  const hasPendingRecalls = pendingRecallWordIds.length > 0;
  const canGoPrevious = recallWord ? Boolean(currentWord) : Boolean(previousWord);
  const canGoNext =
    Boolean(currentWord) &&
    (recallWord
      ? recallStatus === "correct"
      : Boolean(nextWord) ||
        studyPhase === "browse" ||
        (studyPhase === "recall" && hasPendingRecalls));
  const nextPreviewWord = recallWord
    ? recallStatus === "correct"
      ? nextWord
      : undefined
    : nextWord;
  const previousPreviewWord = recallWord ? currentWord : previousWord;
  const currentWordId = currentWord?.id ?? "";
  const currentSpeechText = currentWord ? speechText(currentWord) : "";

  useEffect(() => {
    markSeen(currentWordId);
  }, [currentWordId, markSeen]);

  useEffect(() => {
    const nearby = [currentWord, nextWord]
      .filter((word): word is StudyWord => Boolean(word))
      .map(speechText);
    prewarm(nearby);
  }, [currentWord, nextWord, prewarm]);

  useEffect(() => {
    if (recallWord || !currentWordId || !currentSpeechText || !autoPlay) return;
    speak(currentSpeechText);
    return stop;
  }, [autoPlay, currentSpeechText, currentWordId, recallWord, speak, stop]);

  const finishStudyPathUnit = useCallback(() => {
    flushSeen();
    if (section > 0 && unit > 0) {
      void completeStudyNode(request, {
        group: 1,
        kind: "words",
        lesson,
        section,
        unit,
      }).catch(() => undefined);
    }
    router.replace("/study-path");
  }, [flushSeen, lesson, request, router, section, unit]);

  const clearRecall = useCallback(
    (requeue = false) => {
      setKeyboardVisible(false);
      if (requeue && recallWord) {
        setPendingRecallWordIds((current) =>
          current.includes(recallWord.id) ? current : [...current, recallWord.id],
        );
      }
      setRecallWord(null);
      setAnswer("");
      setRecallStatus("idle");
      setHintVisible(false);
      recallResultReportedRef.current = false;
      recallHadWrongAttemptRef.current = false;
    },
    [recallWord],
  );

  const submitRecall = useCallback(() => {
    if (!recallWord || recallStatus === "correct" || !answer.trim()) return;
    const correct = isWordAnswerCorrect(answer, recallWord.headword);
    if (!recallResultReportedRef.current) {
      recallResultReportedRef.current = true;
      const learnedWithoutHelp = correct && !recallHadWrongAttemptRef.current;
      void reviewWord(
        request,
        recallWord.id,
        learnedWithoutHelp ? "good" : "again",
      ).catch(() => undefined);
    }
    if (correct) {
      if (recallHadWrongAttemptRef.current) {
        setPendingRecallWordIds((current) =>
          current.includes(recallWord.id) ? current : [...current, recallWord.id],
        );
      }
      setKeyboardVisible(false);
      setRecallStatus("correct");
      hapticNotification("success");
      return;
    }
    recallHadWrongAttemptRef.current = true;
    setRecallStatus("wrong");
    hapticNotification("error");
  }, [answer, recallStatus, recallWord, request]);

  const showRecallHint = useCallback(() => {
    if (!recallWord || recallStatus === "correct") return;
    recallHadWrongAttemptRef.current = true;
    setHintVisible(true);
    setRecallStatus("idle");
    hapticImpact();
  }, [recallStatus, recallWord]);

  const showRecall = useCallback(
    (candidateId?: string) => {
      if (!candidateId) return false;
      const candidate = words.find((word) => word.id === candidateId);
      if (!candidate) return false;
      setPendingRecallWordIds((current) =>
        current.filter((id) => id !== candidate.id),
      );
      lastRecalledWordIdRef.current = candidate.id;
      recallResultReportedRef.current = false;
      recallHadWrongAttemptRef.current = false;
      setAnswer("");
      setRecallStatus("idle");
      setHintVisible(false);
      setRecallWord(candidate);
      hapticSelection();
      return true;
    },
    [words],
  );

  const startRecallPractice = useCallback(() => {
    const wordIds = words.map((word) => word.id);
    const candidateId = pickRecallWordId(
      wordIds,
      currentWord?.id,
      lastRecalledWordIdRef.current,
    );
    if (!candidateId) return;
    setOfferOpen(false);
    setStudyPhase("recall");
    setPendingRecallWordIds(wordIds);
    showRecall(candidateId);
  }, [currentWord?.id, showRecall, words]);

  const skipRecallPractice = useCallback(() => {
    setOfferOpen(false);
    stop();
    if (fromStudyPath) {
      finishStudyPathUnit();
      return;
    }
    flushSeen();
    if (window.history.length > 1) router.back();
    else router.replace("/");
  }, [finishStudyPathUnit, flushSeen, fromStudyPath, router, stop]);

  useEffect(() => {
    if (
      studyPhase !== "browse" ||
      recallWord ||
      !currentWordId ||
      nextWord ||
      recallOfferShownRef.current
    ) {
      return;
    }
    const timeout = window.setTimeout(() => {
      recallOfferShownRef.current = true;
      stop();
      setOfferOpen(true);
      hapticNotification("success");
    }, 550);
    return () => window.clearTimeout(timeout);
  }, [currentWordId, nextWord, recallWord, stop, studyPhase]);

  const commitSwipe = useCallback(
    (direction: -1 | 1) => {
      stop();
      if (recallWord) {
        if (direction < 0) {
          clearRecall(true);
        } else if (recallStatus === "correct") {
          const candidateId = pickRecallWordId(
            pendingRecallWordIds,
            currentWord?.id,
            lastRecalledWordIdRef.current,
          );
          if (showRecall(candidateId)) return;
          clearRecall();
          setStudyPhase("complete");
        }
      } else if (direction > 0 && currentWord) {
        if (nextWord) {
          setCardIndex((current) => Math.min(words.length - 1, current + 1));
        } else if (studyPhase === "recall") {
          const candidateId = pickRecallWordId(
            pendingRecallWordIds,
            currentWord.id,
            lastRecalledWordIdRef.current,
          );
          if (showRecall(candidateId)) return;
          setStudyPhase("complete");
        } else if (studyPhase === "browse") {
          recallOfferShownRef.current = true;
          setOfferOpen(true);
        }
      } else {
        setCardIndex((current) =>
          Math.min(words.length - 1, Math.max(0, current + direction)),
        );
      }
      hapticSelection();
    },
    [
      clearRecall,
      currentWord,
      nextWord,
      pendingRecallWordIds,
      recallStatus,
      recallWord,
      showRecall,
      stop,
      studyPhase,
      words.length,
    ],
  );

  const animateCardOut = useCallback(
    (direction: -1 | 1) => {
      if (cardMotion !== "idle") return;
      if (
        (direction > 0 && !canGoNext) ||
        (direction < 0 && !canGoPrevious)
      ) {
        setCardMotion("in");
        setDragX(0);
        window.setTimeout(() => setCardMotion("idle"), 240);
        return;
      }

      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current);
      }
      setCardMotion("out");
      const width = Math.max(window.innerWidth, 320);
      setDragX(direction > 0 ? -width * 1.18 : width * 1.18);
      animationTimeoutRef.current = window.setTimeout(() => {
        commitSwipe(direction);
        setCardMotion("in");
        setDragX(direction > 0 ? 42 : -42);
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setDragX(0));
        });
        animationTimeoutRef.current = window.setTimeout(() => {
          setCardMotion("idle");
          animationTimeoutRef.current = null;
        }, 320);
      }, 245);
    },
    [canGoNext, canGoPrevious, cardMotion, commitSwipe],
  );

  useEffect(
    () => () => {
      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current);
      }
    },
    [],
  );

  const goBack = () => {
    stop();
    if (window.history.length > 1) router.back();
    else router.replace("/");
  };

  const openScopePicker = () => {
    stop();
    setScopeOpen(true);
  };

  const applyScope = (
    nextSection: number,
    nextUnit: number,
    nextAutoPlay: boolean,
  ) => {
    setScopeOpen(false);
    setAutoPlay(nextAutoPlay);
    savePreferences({
      autoPlay: nextAutoPlay,
      cardIndex,
      section: nextSection,
      unit: nextUnit,
    });
    if (nextSection === section && nextUnit === unit) return;
    resumeIndexRef.current = null;
    resumeConsumedRef.current = true;
    setSection(nextSection);
    setUnit(nextUnit);
    hapticImpact();
  };

  useEffect(() => {
    if (wordsLoading || words.length === 0) return;
    savePreferences({ autoPlay, cardIndex, section, unit });
  }, [autoPlay, cardIndex, section, unit, words.length, wordsLoading]);

  const progress = words.length > 0 ? (cardIndex + 1) / words.length : 0;
  const cardWidth =
    typeof window === "undefined" ? 390 : Math.max(window.innerWidth, 320);
  const currentOpacity = Math.max(
    0.72,
    1 - Math.min(Math.abs(dragX) / (cardWidth * 0.9), 1) * 0.28,
  );
  const rotation = Math.max(-8, Math.min(8, (dragX / cardWidth) * 8));
  const nextPreviewOpacity = Math.max(
    0,
    Math.min(1, (-dragX - 18) / (SWIPE_THRESHOLD - 18)),
  );
  const previousPreviewOpacity = Math.max(
    0,
    Math.min(1, (dragX - 18) / (SWIPE_THRESHOLD - 18)),
  );

  const pointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (cardMotion !== "idle") return;
    if (
      (event.target as HTMLElement).closest(
        "button, input, a, label, textarea, select",
      )
    ) {
      return;
    }
    pointerRef.current = {
      pointerId: event.pointerId,
      startAt: performance.now(),
      startX: event.clientX,
      startY: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - pointer.startX;
    const deltaY = event.clientY - pointer.startY;
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 12) return;
    const movingTowardNext = deltaX < 0;
    const canMove = movingTowardNext ? canGoNext : canGoPrevious;
    setDragX(canMove ? deltaX : deltaX * 0.18);
  };

  const pointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const pointer = pointerRef.current;
    pointerRef.current = null;
    if (!pointer || pointer.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - pointer.startX;
    const elapsed = Math.max(1, performance.now() - pointer.startAt);
    const velocityX = (deltaX / elapsed) * 1000;
    const direction: -1 | 1 = deltaX < 0 ? 1 : -1;
    const canMove = direction > 0 ? canGoNext : canGoPrevious;
    if (
      canMove &&
      (Math.abs(deltaX) >= SWIPE_THRESHOLD ||
        Math.abs(velocityX) >= SWIPE_VELOCITY)
    ) {
      animateCardOut(direction);
      return;
    }
    setCardMotion("in");
    setDragX(0);
    window.setTimeout(() => setCardMotion("idle"), 240);
  };

  return (
    <main className={styles.wordPage}>
      <header className={styles.header}>
        <button
          aria-label="Yopish"
          className={styles.closeButton}
          onClick={goBack}
          type="button"
        >
          <MobileIcon name="close" size={23} />
        </button>
        <span className={styles.headerTitle}>
          <small>SO&apos;Z KARTALARI</small>
          <strong>So&apos;z kartalari</strong>
        </span>
        <span className={styles.counter}>
          {recallWord ? (
            <>
              <MobileIcon name="sparkles" size={14} /><b>Takror</b>
            </>
          ) : (
            <>
              <b>{words.length ? cardIndex + 1 : 0}</b>
              <small>/ {words.length}</small>
            </>
          )}
        </span>
      </header>
      <div className={styles.progressWrap}>
        <div className={styles.progressTrack}>
          <i
            style={{
              width: String(Math.max(0, Math.min(1, progress)) * 100) + "%",
            }}
          />
        </div>
      </div>

      <div className={styles.content}>
        {!keyboardVisible ? (
          <button
            className={styles.scopeButton}
            disabled={scopeLoading || summaries.every((item) => !item.words)}
            onClick={openScopePicker}
            type="button"
          >
            <span className={styles.scopeIcon}>
              <MobileIcon name="layers" size={19} />
            </span>
            <span className={styles.scopeCopy}>
              <small>Hozirgi o&apos;quv doirasi</small>
              <strong>{section}-bo&apos;lim · {unit}-unit</strong>
            </span>
            <em>
              O&apos;zgartirish
              <MobileIcon name="chevron-down" size={15} />
            </em>
          </button>
        ) : null}

        {scopeLoading || wordsLoading ? (
          <section className={styles.centerState}>
            <div className={styles.stateCard}>
              <span className={styles.spinner} />
              <strong>So&apos;z kartalari tayyorlanmoqda</strong>
              <p>Tanlangan unitdagi so&apos;zlarni tartiblayapmiz.</p>
            </div>
          </section>
        ) : loadFailed ? (
          <section className={styles.centerState}>
            <div className={styles.stateCard}>
              <span className={styles.errorIcon}>
                <MobileIcon name="cloud-offline-outline" size={30} />
              </span>
              <strong>So&apos;zlarni yuklab bo&apos;lmadi</strong>
              <p>Ulanishni tekshirib, qayta urinib ko&apos;ring.</p>
              <button
                onClick={() => {
                  if (summaries.length) void loadWords();
                  else void loadSummaries();
                }}
                type="button"
              >
                Qayta urinish
              </button>
            </div>
          </section>
        ) : !currentWord ? (
          <section className={styles.centerState}>
            <div className={styles.stateCard}>
              <span className={styles.stateEmoji}>🗂️</span>
              <strong>Bu doirada hali so&apos;zlar yo&apos;q</strong>
              <p>
                Yuqoridagi o&apos;quv doirasini bosib, boshqa unitni tanlang.
              </p>
            </div>
          </section>
        ) : (
          <section
            className={[
              styles.cardArea,
              keyboardVisible ? styles.cardAreaKeyboard : "",
            ].filter(Boolean).join(" ")}
          >
            <div
              className={styles.deck}
              onPointerCancel={() => {
                pointerRef.current = null;
                setCardMotion("in");
                setDragX(0);
                window.setTimeout(() => setCardMotion("idle"), 240);
              }}
              onPointerDown={pointerDown}
              onPointerMove={pointerMove}
              onPointerUp={pointerUp}
            >
              {nextPreviewWord ? (
                <div
                  aria-hidden="true"
                  className={styles.previewLayer}
                  style={{
                    opacity: nextPreviewOpacity,
                    transform:
                      "scale(" + String(0.96 + nextPreviewOpacity * 0.04) + ")",
                  }}
                >
                  <PreviewCard index={cardIndex + 1} word={nextPreviewWord} />
                </div>
              ) : null}
              {previousPreviewWord ? (
                <div
                  aria-hidden="true"
                  className={styles.previewLayer}
                  style={{
                    opacity: previousPreviewOpacity,
                    transform:
                      "scale(" + String(0.96 + previousPreviewOpacity * 0.04) + ")",
                  }}
                >
                  <PreviewCard
                    index={recallWord ? cardIndex : cardIndex - 1}
                    word={previousPreviewWord}
                  />
                </div>
              ) : null}
              <div
                className={[
                  styles.currentCard,
                  cardMotion === "out" ? styles.cardMotionOut : "",
                  cardMotion === "in" ? styles.cardMotionIn : "",
                ].filter(Boolean).join(" ")}
                style={{
                  opacity: currentOpacity,
                  transform:
                    "translateX(" + String(dragX) + "px) rotate(" +
                    String(rotation) + "deg)",
                }}
              >
                {recallWord ? (
                  <RecallCard
                    answer={answer}
                    compact={keyboardVisible}
                    hintVisible={hintVisible}
                    index={cardIndex}
                    key={"recall-" + recallWord.id}
                    onAnswer={(value) => {
                      setAnswer(value);
                      if (recallStatus === "wrong") setRecallStatus("idle");
                    }}
                    onFocusChange={setKeyboardVisible}
                    onHint={showRecallHint}
                    onSpeak={() => speak(speechText(recallWord))}
                    onSubmit={submitRecall}
                    speaking={speaking}
                    status={recallStatus}
                    word={recallWord}
                  />
                ) : (
                  <WordCard
                    index={cardIndex}
                    key={currentWord.id}
                    onSpeak={() => speak(speechText(currentWord))}
                    speaking={speaking}
                    word={currentWord}
                  />
                )}
              </div>
            </div>

            {fromStudyPath && studyPhase === "complete" && words.length > 0 ? (
              <button
                className={styles.finishButton}
                onClick={finishStudyPathUnit}
                type="button"
              >
                Bugungi so&apos;zlar tugadi!
                <MobileIcon name="arrow-forward" size={20} />
              </button>
            ) : null}

            <nav
              className={[
                styles.navigation,
                keyboardVisible ? styles.navigationHidden : "",
              ].filter(Boolean).join(" ")}
            >
              <button
                aria-label="Oldingi so'z"
                disabled={!canGoPrevious}
                onClick={() => animateCardOut(-1)}
                type="button"
              >
                <MobileIcon name="arrow-back" size={21} />
              </button>
              <span>
                <MobileIcon
                  name={
                    recallWord
                      ? recallStatus === "correct"
                        ? "arrow-forward"
                        : "create-outline"
                      : "swap-horizontal"
                  }
                  size={18}
                />
                {recallWord
                  ? recallStatus === "correct"
                    ? "To'g'ri! Davom etish uchun suring"
                    : "Koreyscha so'zni yozib tekshiring"
                  : "Kartalarni suring"}
              </span>
              <button
                aria-label="Keyingi so'z"
                className={styles.nextButton}
                disabled={!canGoNext}
                onClick={() => animateCardOut(1)}
                type="button"
              >
                <MobileIcon name="arrow-forward" size={21} />
              </button>
            </nav>
          </section>
        )}
      </div>

      {scopeOpen && summaries.length > 0 ? (
        <ScopeSheet
          initialAutoPlay={autoPlay}
          initialSection={section}
          initialUnit={unit}
          onApply={applyScope}
          onClose={() => setScopeOpen(false)}
          summaries={summaries}
        />
      ) : null}
      {offerOpen ? (
        <RecallOffer
          count={words.length}
          onClose={() => setOfferOpen(false)}
          onSkip={skipRecallPractice}
          onStart={startRecallPractice}
        />
      ) : null}
    </main>
  );
}
