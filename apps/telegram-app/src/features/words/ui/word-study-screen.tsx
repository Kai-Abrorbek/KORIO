"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { rememberAvatarWord } from "../../profile/model/avatar-study";
import { completeStudyNode } from "../../lesson/api/lesson";
import { useKoreanSpeech, speechLanguageOf } from "../../../shared/browser/use-korean-speech";
import { DEFAULT_LEARNING_COURSES, learnCourseOf, type LearnCourse } from "../../learning/model/learning-options";
import { useAppLanguage, useContentLanguage } from "../../../shared/i18n/language-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import {
  getUnitWords,
  getWordSections,
  markSeenWords,
  masterWord,
  reviewWord,
} from "../api/words";
import {
  PART_OF_SPEECH,
  isWordAnswerCorrect,
  lessonSlice,
  type StudyWord,
  type WordSectionSummary,
} from "../model/word";
import { useWordCardSwipe, WORD_CARD_SWIPE_THRESHOLD } from "./use-word-card-swipe";
import { readWordAutoPlay, readWordPreferences, saveWordPreferences } from "../model/word-preferences";
import { uzt } from "../../../shared/i18n/uz-text";
import { getDefaultWordCollectionGroup, getResumeWordIndex, type WordCollectionDetail, type WordCollectionGroup, type WordCollectionPosition } from "../../../../../../shared/word-library";
import { getWordCollection, getWordCollectionWords, saveWordCollectionPosition } from "../api/word-collections";
import { getWordLibraryCssVariables } from "../../../../../../shared/word-library-theme";
import { getWordBrowseAdvance, WORD_RECALL_ADVANCE_MS } from "../../../../../../shared/word-study-flow";
import { createRecallSaveAttempt, saveRecallProgress } from "../../../../../../shared/word-recall-progress";
import { useAppTheme } from "../../../shared/theme/theme-context";
import { WordStudyCompletion } from "./word-study-completion";
import styles from "./word-study.module.css";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;
type RecallStatus = "idle" | "wrong" | "correct";
type StudyPhase = "browse" | "recall" | "complete";
type CardMotion = "idle" | "out" | "in";

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

function useSeenWords(request: AuthenticatedRequest, scope: string) {
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

  useEffect(() => {
    sentRef.current.clear();
    return flush;
  }, [flush, scope]);
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
            draggable={false}
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
            {word.pronunciation.ipa || word.pronunciation.romanization ? <p>{word.pronunciation.ipa || word.pronunciation.romanization}</p> : null}
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
            <b>{example.text ?? example.korean}</b><span>{example.translation}</span>
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
  saving,
  saveFailed,
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
  saving: boolean;
  saveFailed: boolean;
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
          {word.targetLanguage === "en" ? "Inglizcha so'z" : "Koreyscha so'z"}
        </label>
        <div className={styles.answerShell}>
          <input
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            readOnly={saving || isCorrect}
            disabled={isCorrect}
            id="word-recall-answer"
            onBlur={() => onFocusChange(false)}
            onChange={(event) => onAnswer(event.target.value)}
            onFocus={(event) => {
              onFocusChange(true);
              // currentTarget 은 이벤트가 끝나면 null 이 된다 — 타이머 전에 잡아 둔다
              const input = event.currentTarget;
              window.setTimeout(
                () => input.scrollIntoView({ behavior: "smooth", block: "center" }),
                180,
              );
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.nativeEvent.isComposing) onSubmit();
            }}
            placeholder={word.meaning}
            value={answer}
          />
          <button
            aria-label="Javobni tekshirish"
            disabled={!answer.trim() || isCorrect || saving}
            onClick={onSubmit}
            type="button"
          >
            <MobileIcon name={isCorrect ? "checkmark" : "arrow-forward"} size={21} />
          </button>
        </div>
        {saving || saveFailed ? (
          <p className={styles.saveMessage} role={saveFailed ? "alert" : "status"}>
            <span data-i18n={saving ? "wordStudy.savePending" : "wordStudy.saveFailed"}>
              {uzt(saving ? "wordStudy.savePending" : "wordStudy.saveFailed")}
            </span>
          </p>
        ) : null}
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
                    : word.targetLanguage === "en" ? "Inglizchasini eslang" : "Koreyschasini eslang"}
            </strong>
            {!compact ? (
              <small>
                {hintVisible && !isCorrect
                  ? "Ko'rsatilgan javobni o'zingiz yozib tekshiring."
                  : isCorrect
                    ? uzt("wordStudy.recallCorrectSub")
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
            <button className={styles.hintButton} disabled={saving} onClick={onHint} type="button">
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
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const dialog = panel.current;
    dialog?.querySelector<HTMLButtonElement>("button[data-primary]")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key !== "Tab" || !dialog) return;
      const controls = dialog.querySelectorAll<HTMLButtonElement>(
        "button:not(:disabled)",
      );
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
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [onClose]);
  return (
    <div className={styles.offerBackdrop} onClick={onClose} role="presentation">
      <section
        aria-labelledby="recall-offer-title"
        aria-describedby="recall-offer-description"
        aria-modal="true"
        className={styles.offerCard}
        onClick={(event) => event.stopPropagation()}
        ref={panel}
        role="dialog"
      >
        <button
          className={styles.offerClose}
          aria-label={uzt("wordStudy.finish.close")}
          onClick={onClose}
          type="button"
        >
          <MobileIcon name="close" size={20} />
        </button>
        <div className={styles.offerArt} aria-hidden="true">
          <span />
          <span />
          <span>
            <MobileIcon name="create-outline" size={32} />
          </span>
        </div>
        <h2 id="recall-offer-title" data-i18n="wordStudy.recallOfferTitle">
          {uzt("wordStudy.recallOfferTitle")}
        </h2>
        <p
          id="recall-offer-description"
          data-i18n="wordStudy.recallOfferDescription"
        >
          {uzt("wordStudy.recallOfferDescription", { count })}
        </p>
        <button
          className={styles.offerStart}
          data-primary
          onClick={onStart}
          type="button"
        >
          <span data-i18n="wordStudy.recallOfferStart">
            {uzt("wordStudy.recallOfferStart")}
          </span>
          <MobileIcon name="arrow-forward" size={20} />
        </button>
        <button
          className={styles.offerSkip}
          onClick={onSkip}
          type="button"
          data-i18n="wordStudy.recallOfferLater"
        >
          {uzt("wordStudy.recallOfferLater")}
        </button>
      </section>
    </div>
  );
}

export function WordStudyScreen() {
  const { resolvedTheme } = useAppTheme();
  const router = useRouter();
  const params = useSearchParams();
  const { request, user } = useTelegramAuth();
  const course = learnCourseOf(user?.learnCourse);
  const speechLocale = DEFAULT_LEARNING_COURSES[course].speechLocale;
  const contentLanguage = useContentLanguage();
  const { flush: flushSeen, markSeen } = useSeenWords(
    request,
    `${user?.id ?? ""}:${course}`,
  );
  const { language } = useAppLanguage();
  const { prewarm, speak, speaking, stop } = useKoreanSpeech(request);
  const requestedSection = Number(params.get("section")) || 0;
  const requestedUnit = Number(params.get("unit")) || 0;
  const lesson = Math.max(1, Number(params.get("lesson")) || 1);
  const lessonCount = Math.max(1, Number(params.get("lessonCount")) || 1);
  const collectionId = params.get("collectionId") ?? "";
  const requestedGroupId = params.get("groupId") ?? "";
  const fromStudyPath = params.get("from") === "studyPath" && !collectionId;
  const shouldResume = params.get("resume") === "1";

  const studyScope = `${user?.id ?? ""}:${course}:${collectionId}:${requestedGroupId}:${requestedSection}:${requestedUnit}:${contentLanguage}:${language}:${fromStudyPath}:${lesson}:${lessonCount}`;
  const currentScopeRef = useRef(studyScope);
  currentScopeRef.current = studyScope;
  const [scopeReadyFor, setScopeReadyFor] = useState("");
  const [wordsScope, setWordsScope] = useState("");
  const [collection, setCollection] = useState<WordCollectionDetail | null>(
    null,
  );
  const [collectionGroup, setCollectionGroup] = useState<WordCollectionGroup | null>(null);
  const [positionFailed, setPositionFailed] = useState(false);
  const [summaries, setSummaries] = useState<WordSectionSummary[]>([]);
  const [section, setSection] = useState(3);
  const [unit, setUnit] = useState(1);
  const [words, setWords] = useState<StudyWord[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [scopeLoading, setScopeLoading] = useState(true);
  const [wordsLoading, setWordsLoading] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [studyPhase, setStudyPhase] = useState<StudyPhase>("browse");
  const [offerOpen, setOfferOpen] = useState(false);
  const [didPractice, setDidPractice] = useState(false);
  const [recallWord, setRecallWord] = useState<StudyWord | null>(null);
  const [answer, setAnswer] = useState("");
  const [recallStatus, setRecallStatus] = useState<RecallStatus>("idle");
  const [recallSaving, setRecallSaving] = useState(false);
  const [recallSaveFailed, setRecallSaveFailed] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [pendingRecallWordIds, setPendingRecallWordIds] = useState<string[]>(
    [],
  );
  const [dragX, setDragX] = useState(0);
  const [cardMotion, setCardMotion] = useState<CardMotion>("idle");
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  useEffect(() => {
    const viewport = window.visualViewport;
    const resize = () =>
      setViewportHeight(Math.round(viewport?.height ?? window.innerHeight));
    resize();
    viewport?.addEventListener("resize", resize);
    window.addEventListener("resize", resize);
    return () => {
      viewport?.removeEventListener("resize", resize);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const resumePositionRef = useRef<WordCollectionPosition | null>(null);
  const resumeIndexRef = useRef<number | null>(null);
  const resumeConsumedRef = useRef(false);
  const seenThisSessionRef = useRef(new Set<string>());
  const recalledThisSessionRef = useRef(new Set<string>());
  const recallAdvanceReadyRef = useRef(false);
  const activeRecallIdRef = useRef<string | null>(null);
  const finishingRef = useRef(false);
  const lastRecalledWordIdRef = useRef<string | null>(null);
  const recallSaveAttemptRef = useRef(createRecallSaveAttempt());
  const recallHadWrongAttemptRef = useRef(false);
  const animationTimeoutRef = useRef<number | null>(null);
  const animationLockedRef = useRef(false);

  const loadSummaries = useCallback(async () => {
    const requestScope = studyScope;
    setScopeLoading(true);
    setLoadFailed(false);
    setPositionFailed(false);
    setWords([]);
    setWordsLoading(false);
    setAutoPlay(readWordAutoPlay(course, user?.id));
    try {
      if (collectionId) {
        const detail = await getWordCollection(
          request,
          course,
          language,
          collectionId,
        );
        if (currentScopeRef.current !== requestScope) return;
        if (
          detail.targetLanguage !== course ||
          detail.courseId !== DEFAULT_LEARNING_COURSES[course].courseId
        )
          throw new Error("WORD_COLLECTION_SCOPE_CHANGED");
        const group = requestedGroupId
          ? detail.groups.find((item) => item.id === requestedGroupId)
          : getDefaultWordCollectionGroup(detail);
        if (requestedGroupId && !group)
          throw new Error("WORD_COLLECTION_GROUP_NOT_FOUND");
        setCollection(detail);
        setCollectionGroup(group ?? null);
        setSection(group?.section ?? 0);
        setUnit(group?.unit ?? 0);
        setSummaries([]);
        resumePositionRef.current =
          shouldResume && detail.lastPosition?.groupId === group?.id
            ? detail.lastPosition
            : null;
        setScopeReadyFor(requestScope);
      } else {
        const result = await getWordSections(request);
        if (currentScopeRef.current !== requestScope) return;
        const available = result.filter((summary) => summary.words > 0);
        const matchedSummary = available.find(
          (item) => item.section === requestedSection,
        );
        const matchedUnit = matchedSummary?.units.find(
          (item) => item.unit === requestedUnit,
        )?.unit;
        setCollection(null);
        setCollectionGroup(null);
        setSummaries(result);
        if (matchedSummary && matchedUnit) {
          setSection(matchedSummary.section);
          setUnit(matchedUnit);
          const saved = readWordPreferences(course, user?.id);
          if (
            shouldResume &&
            !fromStudyPath &&
            saved?.section === matchedSummary.section &&
            saved.unit === matchedUnit
          )
            resumeIndexRef.current = saved.cardIndex;
          setScopeReadyFor(requestScope);
        } else if (available.length) {
          router.replace("/word-library");
        } else {
          setWords([]);
          setWordsScope(requestScope);
          setScopeReadyFor(requestScope);
        }
      }
    } catch {
      if (currentScopeRef.current === requestScope) setLoadFailed(true);
    } finally {
      if (currentScopeRef.current === requestScope) setScopeLoading(false);
    }
  }, [
    studyScope,
    request,
    course,
    user?.id,
    collectionId,
    requestedGroupId,
    language,
    shouldResume,
    requestedSection,
    requestedUnit,
    fromStudyPath,
    router,
  ]);

  useEffect(() => {
    if (!collectionId && (!requestedSection || !requestedUnit)) {
      router.replace("/word-library");
      return;
    }
    resumeConsumedRef.current = false;
    resumeIndexRef.current = null;
    resumePositionRef.current = null;
    void loadSummaries();
  }, [collectionId, loadSummaries, requestedSection, requestedUnit, router]);

  const loadWords = useCallback(async () => {
    if (scopeLoading || scopeReadyFor !== studyScope) return;
    if (
      collectionId
        ? !collectionGroup
        : summaries.length === 0 || !section || !unit
    )
      return;
    const requestScope = studyScope;
    if (animationTimeoutRef.current !== null) {
      window.clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
    animationLockedRef.current = false;
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
    setDidPractice(false);
    seenThisSessionRef.current.clear();
    recalledThisSessionRef.current.clear();
    recallAdvanceReadyRef.current = false;
    finishingRef.current = false;
    lastRecalledWordIdRef.current = null;
    recallSaveAttemptRef.current = createRecallSaveAttempt();
    setRecallSaving(false);
    setRecallSaveFailed(false);
    recallHadWrongAttemptRef.current = false;
    setWords([]);
    setCardIndex(0);
    stop();
    setDragX(0);
    setCardMotion("idle");

    try {
      const all =
        collectionId && collectionGroup
          ? await getWordCollectionWords(
              request,
              course,
              contentLanguage,
              collectionId,
              collectionGroup.id,
            )
          : await getUnitWords(request, section, unit);
      if (currentScopeRef.current !== requestScope) return;
      const result =
        fromStudyPath && lessonCount > 1
          ? (() => {
              const range = lessonSlice(all.length, lessonCount, lesson);
              return all.slice(range.start, range.end);
            })()
          : all;
      setWords(result);
      setWordsScope(requestScope);

      if (collectionId && !resumeConsumedRef.current) {
        setCardIndex(getResumeWordIndex(result, resumePositionRef.current));
        resumeConsumedRef.current = true;
      }
      const resumeAt = resumeIndexRef.current;
      resumeIndexRef.current = null;
      if (!resumeConsumedRef.current && resumeAt != null && result.length > 0) {
        resumeConsumedRef.current = true;
        setCardIndex(
          Math.min(Math.max(0, resumeAt), Math.max(0, result.length - 1)),
        );
      }
    } catch {
      if (currentScopeRef.current === requestScope) setLoadFailed(true);
    } finally {
      if (currentScopeRef.current === requestScope) setWordsLoading(false);
    }
  }, [
    flushSeen,
    studyScope,
    scopeReadyFor,
    collectionId,
    collectionGroup,
    course,
    contentLanguage,
    fromStudyPath,
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

  const currentWord = wordsScope === studyScope ? words[cardIndex] : undefined;
  const previousWord = wordsScope === studyScope && cardIndex > 0 ? words[cardIndex - 1] : undefined;
  const nextWord = wordsScope === studyScope && cardIndex < words.length - 1 ? words[cardIndex + 1] : undefined;
  const hasPendingRecalls = pendingRecallWordIds.length > 0;
  const canGoPrevious = !recallSaving && (recallWord ? Boolean(currentWord) : Boolean(previousWord));
  const canGoNext =
    !recallSaving &&
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
  const positionQueueRef = useRef(Promise.resolve());
  const pendingPositionRef = useRef<{
    scope: string;
    request: AuthenticatedRequest;
    course: LearnCourse;
    language: string;
    collectionId: string;
    position: WordCollectionPosition;
  } | null>(null);
  const flushPosition = useCallback((reportFailure = true) => {
    const pending = pendingPositionRef.current;
    if (!pending) return positionQueueRef.current;
    pendingPositionRef.current = null;
    positionQueueRef.current = positionQueueRef.current
      .then(() =>
        saveWordCollectionPosition(
          pending.request,
          pending.course,
          pending.language,
          pending.collectionId,
          pending.position,
        ),
      )
      .then(() => {
        if (reportFailure && currentScopeRef.current === pending.scope)
          setPositionFailed(false);
      })
      .catch(() => {
        if (reportFailure && currentScopeRef.current === pending.scope)
          setPositionFailed(true);
      });
    return positionQueueRef.current;
  }, []);

  useEffect(() => {
    if (
      !collectionId ||
      !collectionGroup ||
      !currentWord ||
      wordsLoading ||
      scopeLoading
    )
      return;
    pendingPositionRef.current = {
      scope: studyScope,
      request,
      course,
      language,
      collectionId,
      position: {
        groupId: collectionGroup.id,
        cardIndex,
        lastWordId: currentWord.id,
      },
    };
    const timeout = window.setTimeout(() => flushPosition(), 350);
    return () => window.clearTimeout(timeout);
  }, [
    cardIndex,
    collectionGroup,
    collectionId,
    course,
    currentWord,
    flushPosition,
    language,
    request,
    scopeLoading,
    studyScope,
    wordsLoading,
  ]);

  useEffect(
    () => () => {
      void flushPosition(false);
    },
    [flushPosition, studyScope],
  );

  useEffect(() => {
    markSeen(currentWordId);
    if (currentWordId && studyPhase === "browse" && !recallWord) {
      seenThisSessionRef.current.add(currentWordId);
    }
    if (user?.id && currentWord) {
      rememberAvatarWord({
        userId: user.id,
        word: currentWord.headword,
        meaning: currentWord.meaning,
        language: contentLanguage,
      });
    }
  }, [
    contentLanguage,
    currentWord,
    currentWordId,
    markSeen,
    recallWord,
    studyPhase,
    user?.id,
  ]);

  // 모바일처럼 지금 카드부터 4장을 미리 받아 둔다 — 넘기는 즉시 소리가 나게
  useEffect(() => {
    const upcoming = words.slice(cardIndex, cardIndex + 4).map(speechText);
    if (upcoming.length)
      prewarm(
        upcoming,
        speechLanguageOf(words[cardIndex]?.speechLocale ?? speechLocale),
      );
  }, [cardIndex, prewarm, words, speechLocale]);

  useEffect(() => {
    if (recallWord || !currentWordId || !currentSpeechText || !autoPlay) return;
    speak(currentSpeechText, {
      language: speechLanguageOf(currentWord?.speechLocale ?? speechLocale),
    });
    return stop;
  }, [
    autoPlay,
    currentSpeechText,
    currentWordId,
    currentWord?.speechLocale,
    recallWord,
    speak,
    stop,
    speechLocale,
  ]);

  const finishStudyPathUnit = useCallback(() => {
    if (finishingRef.current) return;
    finishingRef.current = true;
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
      recallAdvanceReadyRef.current = false;
      if (requeue && recallWord) {
        setPendingRecallWordIds((current) =>
          current.includes(recallWord.id)
            ? current
            : [...current, recallWord.id],
        );
      }
      setRecallWord(null);
      setAnswer("");
      setRecallStatus("idle");
      setHintVisible(false);
      recallSaveAttemptRef.current = createRecallSaveAttempt();
      setRecallSaving(false);
      setRecallSaveFailed(false);
      recallHadWrongAttemptRef.current = false;
    },
    [recallWord],
  );

  const submitRecall = useCallback(async () => {
    if (
      !recallWord ||
      recallStatus === "correct" ||
      recallAdvanceReadyRef.current ||
      recallSaveAttemptRef.current.pending ||
      !answer.trim()
    )
      return;
    const correct = isWordAnswerCorrect(answer, recallWord.headword);
    const attempt = recallSaveAttemptRef.current;
    const isActive = () =>
      recallSaveAttemptRef.current === attempt &&
      currentScopeRef.current === studyScope &&
      activeRecallIdRef.current === recallWord.id && !finishingRef.current;
    if (!isActive()) return;
    if (!correct) recallHadWrongAttemptRef.current = true;
    setRecallSaving(true);
    setRecallSaveFailed(false);
    try {
      const saved = await saveRecallProgress({
        attempt,
        wordId: recallWord.id,
        correct,
        hadHelp: recallHadWrongAttemptRef.current,
        review: (id, result) => reviewWord(request, id, result),
        master: (id) => masterWord(request, id),
        isActive,
      });
      if (!saved || !isActive()) return;
    } catch {
      if (isActive()) setRecallSaveFailed(true);
      return;
    } finally {
      if (recallSaveAttemptRef.current === attempt) setRecallSaving(false);
    }
    if (correct) {
      recallAdvanceReadyRef.current = true;
      recalledThisSessionRef.current.add(recallWord.id);
      if (recallHadWrongAttemptRef.current) {
        setPendingRecallWordIds((current) =>
          current.includes(recallWord.id)
            ? current
            : [...current, recallWord.id],
        );
      }
      setKeyboardVisible(false);
      setRecallStatus("correct");
      hapticNotification("success");
      return;
    }
    setRecallStatus("wrong");
    hapticNotification("error");
  }, [answer, recallStatus, recallWord, request, studyScope]);

  const showRecallHint = useCallback(() => {
    if (!recallWord || recallStatus === "correct" || recallSaveAttemptRef.current.pending) return;
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
      recallAdvanceReadyRef.current = false;
      recallSaveAttemptRef.current = createRecallSaveAttempt();
      setRecallSaving(false);
      setRecallSaveFailed(false);
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
    if (finishingRef.current) return;
    const wordIds = words.map((word) => word.id);
    const candidateId = pickRecallWordId(
      wordIds,
      currentWord?.id,
      lastRecalledWordIdRef.current,
    );
    if (!candidateId) return;
    setOfferOpen(false);
    setStudyPhase("recall");
    setDidPractice(true);
    recalledThisSessionRef.current.clear();
    setPendingRecallWordIds(wordIds);
    showRecall(candidateId);
  }, [currentWord?.id, showRecall, words]);

  const skipRecallPractice = useCallback(() => {
    setOfferOpen(false);
    stop();
    flushSeen();
    void flushPosition();
    setDidPractice(false);
    setStudyPhase("complete");
  }, [flushPosition, flushSeen, stop]);

  const advanceRecall = useCallback(() => {
    // A timer and a manual swipe can meet here; consume this answer only once.
    if (!recallAdvanceReadyRef.current) return;
    recallAdvanceReadyRef.current = false;
    const candidateId = pickRecallWordId(
      pendingRecallWordIds,
      currentWord?.id,
      lastRecalledWordIdRef.current,
    );
    if (showRecall(candidateId)) return;
    clearRecall();
    stop();
    flushSeen();
    void flushPosition();
    setStudyPhase("complete");
  }, [
    clearRecall,
    currentWord?.id,
    flushPosition,
    flushSeen,
    pendingRecallWordIds,
    showRecall,
    stop,
  ]);

  const commitSwipe = useCallback(
    (direction: -1 | 1) => {
      stop();
      if (recallWord) {
        if (direction < 0) {
          clearRecall(true);
        } else if (recallStatus === "correct") {
          advanceRecall();
        }
      } else if (direction > 0 && currentWord) {
        const action = getWordBrowseAdvance(cardIndex, words.length);
        if (action.type === "next") {
          setCardIndex(action.index);
        } else if (studyPhase === "recall") {
          const candidateId = pickRecallWordId(
            pendingRecallWordIds,
            currentWord.id,
            lastRecalledWordIdRef.current,
          );
          if (showRecall(candidateId)) return;
          setStudyPhase("complete");
        } else if (studyPhase === "browse" && action.type === "offer") {
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
      advanceRecall,
      cardIndex,
      clearRecall,
      currentWord,
      pendingRecallWordIds,
      recallStatus,
      recallWord,
      showRecall,
      stop,
      studyPhase,
      words.length,
    ],
  );

  const resetCardPosition = useCallback(() => {
    if (animationLockedRef.current) return;
    if (animationTimeoutRef.current !== null) {
      window.clearTimeout(animationTimeoutRef.current);
    }
    animationLockedRef.current = true;
    setCardMotion("in");
    setDragX(0);
    animationTimeoutRef.current = window.setTimeout(() => {
      animationLockedRef.current = false;
      setCardMotion("idle");
      animationTimeoutRef.current = null;
    }, 320);
  }, []);

  const animateCardOut = useCallback(
    (direction: -1 | 1) => {
      if (animationLockedRef.current) return;
      if ((direction > 0 && !canGoNext) || (direction < 0 && !canGoPrevious)) {
        resetCardPosition();
        return;
      }

      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current);
      }
      animationLockedRef.current = true;
      setCardMotion("out");
      const scope = studyScope;
      const width = Math.max(window.innerWidth, 320);
      setDragX(direction > 0 ? -width * 1.18 : width * 1.18);
      animationTimeoutRef.current = window.setTimeout(() => {
        if (currentScopeRef.current !== scope || finishingRef.current) return;
        commitSwipe(direction);
        setCardMotion("in");
        setDragX(direction > 0 ? 42 : -42);
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            if (currentScopeRef.current === scope) setDragX(0);
          });
        });
        animationTimeoutRef.current = window.setTimeout(() => {
          if (currentScopeRef.current !== scope) return;
          animationLockedRef.current = false;
          setCardMotion("idle");
          animationTimeoutRef.current = null;
        }, 320);
      }, 245);
    },
    [canGoNext, canGoPrevious, commitSwipe, resetCardPosition, studyScope],
  );

  activeRecallIdRef.current = recallWord?.id ?? null;
  useEffect(() => {
    if (recallStatus !== "correct" || !recallWord || studyPhase !== "recall")
      return;
    const scope = studyScope;
    const wordId = recallWord.id;
    const timer = window.setTimeout(() => {
      if (
        currentScopeRef.current !== scope ||
        activeRecallIdRef.current !== wordId
      )
        return;
      animateCardOut(1);
    }, WORD_RECALL_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [animateCardOut, recallStatus, recallWord, studyPhase, studyScope]);

  const cardDeckRef = useWordCardSwipe({
    disabled:
      cardMotion !== "idle" ||
      offerOpen ||
      scopeLoading ||
      wordsLoading ||
      studyPhase === "complete",
    canGoNext,
    canGoPrevious,
    onOffset: setDragX,
    onCommit: animateCardOut,
    onReset: resetCardPosition,
  });

  useEffect(
    () => () => {
      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current);
      }
      animationLockedRef.current = false;
      recallAdvanceReadyRef.current = false;
      recallSaveAttemptRef.current = createRecallSaveAttempt();
    },
    [studyScope],
  );

  const goBack = async () => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    recallAdvanceReadyRef.current = false;
    stop();
    flushSeen();
    await flushPosition();
    if (window.history.length > 1) router.back();
    else router.replace("/");
  };

  const openScopePicker = async () => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    recallAdvanceReadyRef.current = false;
    stop();
    flushSeen();
    await flushPosition();
    if (!fromStudyPath && !collectionId) {
      saveWordPreferences(course, user?.id, {
        autoPlay,
        cardIndex,
        section,
        unit,
      });
    }
    const libraryParams = collectionId
      ? new URLSearchParams({
          collectionId,
          ...(collectionGroup ? { groupId: collectionGroup.id } : {}),
        })
      : new URLSearchParams({ section: String(section), unit: String(unit) });
    router.push(`/word-library?${libraryParams.toString()}`);
  };

  useEffect(() => {
    if (wordsLoading || words.length === 0) return;
    if ((words[0]?.targetLanguage ?? "ko") !== course) return;
    if (!fromStudyPath && !collectionId)
      saveWordPreferences(course, user?.id, {
        autoPlay,
        cardIndex,
        section,
        unit,
      });
  }, [
    autoPlay,
    cardIndex,
    section,
    unit,
    words,
    wordsLoading,
    course,
    user?.id,
    fromStudyPath,
    collectionId,
  ]);

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
    Math.min(1, (-dragX - 18) / (WORD_CARD_SWIPE_THRESHOLD - 18)),
  );
  const previousPreviewOpacity = Math.max(
    0,
    Math.min(1, (dragX - 18) / (WORD_CARD_SWIPE_THRESHOLD - 18)),
  );

  return (
    <main
      className={styles.wordPage}
      style={
        {
          ...getWordLibraryCssVariables(resolvedTheme === "dark"),
          ...(viewportHeight
            ? { "--study-viewport-height": `${viewportHeight}px` }
            : {}),
        } as CSSProperties
      }
    >
      {studyPhase === "complete" && wordsScope === studyScope ? (
        <>
          <header className={styles.completionHeader}>
            <button
              aria-label={uzt("wordStudy.finish.close")}
              className={styles.closeButton}
              type="button"
              onClick={fromStudyPath ? finishStudyPathUnit : goBack}
            >
              <MobileIcon name="close" size={23} />
            </button>
          </header>
          <WordStudyCompletion
            words={words}
            viewed={seenThisSessionRef.current.size}
            practiced={recalledThisSessionRef.current.size}
            didPractice={didPractice}
            range={
              collection
                ? `${collection.title}${collectionGroup?.title ? ` · ${collectionGroup.title}` : ""}`
                : uzt("wordStudy.range", { section, unit })
            }
            rangeI18nKey={!collection ? "wordStudy.range" : undefined}
            onContinue={fromStudyPath ? finishStudyPathUnit : goBack}
            onReviewAgain={startRecallPractice}
          />
        </>
      ) : (
        <>
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
              <span
                className={styles.rangeLabel}
                data-i18n="wordStudy.currentRange"
              >
                {uzt("wordStudy.currentRange")}
              </span>
              <strong data-no-translate={Boolean(collection) || undefined} data-i18n={!collection ? "wordStudy.range" : undefined} title={collection?.title}>
                {collection
                  ? collection.title
                  : uzt("wordStudy.range", { section, unit })}
              </strong>
              {collectionGroup && (
                <span className={styles.headerUnit} data-no-translate={Boolean(collectionGroup.title) || undefined} data-i18n={!collectionGroup.title ? "wordStudy.range" : undefined}>
                  {collectionGroup.title ||
                    uzt("wordStudy.range", { section, unit })}
                </span>
              )}
            </span>
            <button
              className={styles.changeButton}
              disabled={
                scopeLoading ||
                (!collectionId && summaries.every((item) => !item.words))
              }
              onClick={openScopePicker}
              type="button"
            >
              <span data-i18n="wordStudy.change">
                {uzt("wordStudy.change")}
              </span>
              <MobileIcon name="chevron-down" size={15} />
            </button>
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
            {positionFailed ? (
              <p
                className={styles.positionError}
                data-i18n="wordLibrary.positionFailed"
                role="status"
              >
                {uzt("wordLibrary.positionFailed")}
              </p>
            ) : null}
            {scopeLoading ||
            (!loadFailed && scopeReadyFor !== studyScope) ||
            wordsLoading ? (
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
                    Yuqoridagi o&apos;quv doirasini bosib, boshqa unitni
                    tanlang.
                  </p>
                </div>
              </section>
            ) : (
              <section
                className={[
                  styles.cardArea,
                  keyboardVisible ? styles.cardAreaKeyboard : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className={styles.deck} ref={cardDeckRef}>
                  {nextPreviewWord ? (
                    <div
                      aria-hidden="true"
                      className={styles.previewLayer}
                      style={{
                        opacity: nextPreviewOpacity,
                        transform:
                          "scale(" +
                          String(0.96 + nextPreviewOpacity * 0.04) +
                          ")",
                      }}
                    >
                      <PreviewCard
                        index={cardIndex + 1}
                        word={nextPreviewWord}
                      />
                    </div>
                  ) : null}
                  {previousPreviewWord ? (
                    <div
                      aria-hidden="true"
                      className={styles.previewLayer}
                      style={{
                        opacity: previousPreviewOpacity,
                        transform:
                          "scale(" +
                          String(0.96 + previousPreviewOpacity * 0.04) +
                          ")",
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
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{
                      opacity: currentOpacity,
                      transform:
                        "translateX(" +
                        String(dragX) +
                        "px) rotate(" +
                        String(rotation) +
                        "deg)",
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
                          setRecallSaveFailed(false);
                          if (recallStatus === "wrong") setRecallStatus("idle");
                        }}
                        onFocusChange={setKeyboardVisible}
                        onHint={showRecallHint}
                        onSpeak={() =>
                          speak(speechText(recallWord), {
                            language: speechLanguageOf(
                              recallWord.speechLocale ?? speechLocale,
                            ),
                          })
                        }
                        onSubmit={() => { void submitRecall(); }}
                        speaking={speaking}
                        status={recallStatus}
                        saving={recallSaving}
                        saveFailed={recallSaveFailed}
                        word={recallWord}
                      />
                    ) : (
                      <WordCard
                        index={cardIndex}
                        key={currentWord.id}
                        onSpeak={() =>
                          speak(speechText(currentWord), {
                            language: speechLanguageOf(
                              currentWord.speechLocale ?? speechLocale,
                            ),
                          })
                        }
                        speaking={speaking}
                        word={currentWord}
                      />
                    )}
                  </div>
                </div>

                <nav
                  className={[
                    styles.navigation,
                    keyboardVisible ? styles.navigationHidden : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
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
                    {recallWord ? (
                      recallStatus === "correct" ? (
                        uzt("wordStudy.recallContinue")
                      ) : course === "en" ? (
                        "Inglizcha so'zni yozib tekshiring"
                      ) : (
                        "Koreyscha so'zni yozib tekshiring"
                      )
                    ) : (
                      <>
                        <span data-no-translate>
                          {cardIndex + 1} / {words.length}
                        </span>
                        <span data-i18n="wordStudy.swipeHint">
                          {uzt("wordStudy.swipeHint")}
                        </span>
                      </>
                    )}
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
        </>
      )}

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
