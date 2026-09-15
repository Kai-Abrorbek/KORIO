"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { HomeIcon } from "../../home/ui/home-icon";
import { LearningIcon } from "../../learning/ui/learning-icon";
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
} from "../model/word";
import styles from "./word-study.module.css";

type RecallStatus = "idle" | "wrong" | "correct";
type StudyPhase = "browse" | "recall" | "complete";

const SCOPE_STORAGE_KEY = "korio.telegram.word-scope";
const PALETTES = [
  { accent: "#776ee2", dark: "#5f56c8", from: "#dcd8ff", tint: "#f3f1ff", to: "#f0eeff" },
  { accent: "#1ca7d8", dark: "#1286b0", from: "#bfefff", tint: "#ecfaff", to: "#e8f9ff" },
  { accent: "#e78a20", dark: "#c56b0c", from: "#ffe0b5", tint: "#fff7e8", to: "#fff4dc" },
  { accent: "#2ba875", dark: "#1d865c", from: "#cbefdc", tint: "#effbf5", to: "#eefaf3" },
  { accent: "#e95d84", dark: "#c84269", from: "#ffd7e2", tint: "#fff1f5", to: "#fff0f4" },
] as const;

function paletteFor(word: StudyWord, index: number) {
  const seed = [...word.headword].reduce(
    (sum, character) => sum + (character.codePointAt(0) ?? 0),
    index,
  );
  return PALETTES[seed % PALETTES.length] ?? PALETTES[0];
}

function shuffleIds(words: StudyWord[], avoidFirst?: string): string[] {
  const ids = words.map((word) => word.id);
  for (let index = ids.length - 1; index > 0; index -= 1) {
    const swapWith = Math.floor(Math.random() * (index + 1));
    [ids[index], ids[swapWith]] = [ids[swapWith]!, ids[index]!];
  }
  if (ids.length > 1 && ids[0] === avoidFirst) ids.push(ids.shift()!);
  return ids;
}

function SpeakerIcon({ active = false }: { active?: boolean }) {
  return <MobileIcon name={active ? "volume-high" : "volume-medium-outline"} size={25} />;
}

interface WordCardProps {
  index: number;
  onSpeak: () => void;
  speaking: boolean;
  word: StudyWord;
}

function WordCard({ index, onSpeak, speaking, word }: WordCardProps) {
  const palette = paletteFor(word, index);
  const example = word.examples[0];
  const paletteStyle = {
    "--word-accent": palette.accent,
    "--word-accent-dark": palette.dark,
    "--word-from": palette.from,
    "--word-tint": palette.tint,
    "--word-to": palette.to,
  } as CSSProperties;

  return (
    <article className={styles.wordCard} style={paletteStyle}>
      <div className={styles.visualArea}>
        <div className={styles.visualBadges}>
          <span className={styles.partChip}><i />{PART_OF_SPEECH[word.partOfSpeech]}</span>
          {word.placement?.isCore ? (
            <span className={styles.coreChip}><HomeIcon name="sparkles" size={14} /> Asosiy</span>
          ) : null}
        </div>
        <div className={styles.wordVisual}>
          {word.media.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={word.media.imageAlt || word.headword} src={word.media.imageUrl} />
          ) : word.media.emoji ? (
            <span className={styles.wordEmoji}>{word.media.emoji}</span>
          ) : (
            <span className={styles.wordLetter}>{word.headword.slice(0, 1)}</span>
          )}
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.wordRow}>
          <div>
            <h2>{word.headword}</h2>
            {word.pronunciation.romanization ? <p>{word.pronunciation.romanization}</p> : null}
          </div>
          <button
            aria-label="So'zni tinglash"
            className={speaking ? styles.speakerActive : styles.speakerButton}
            onClick={onSpeak}
            type="button"
          >
            <SpeakerIcon active={speaking} />
          </button>
        </div>
        <small className={styles.meaningLabel}>MA&apos;NOSI</small>
        <strong className={styles.meaning}>{word.meaning}</strong>
        <div className={styles.cardDivider} />
        <div className={styles.exampleTitle}><span>•••</span> Misol</div>
        {example ? (
          <div className={styles.examplePanel}>
            <b>{example.korean}</b>
            <span>{example.translation}</span>
          </div>
        ) : (
          <div className={styles.examplePanel}><span>Bu so&apos;z uchun misol tez orada qo&apos;shiladi.</span></div>
        )}
        {word.usageNote ? <p className={styles.usageNote}>💡 {word.usageNote}</p> : null}
      </div>
    </article>
  );
}

interface RecallCardProps extends WordCardProps {
  answer: string;
  hintVisible: boolean;
  onAnswer: (value: string) => void;
  onHint: () => void;
  onSubmit: () => void;
  status: RecallStatus;
}

function RecallCard({
  answer,
  hintVisible,
  index,
  onAnswer,
  onHint,
  onSpeak,
  onSubmit,
  speaking,
  status,
  word,
}: RecallCardProps) {
  const palette = paletteFor(word, index);
  const paletteStyle = {
    "--word-accent": palette.accent,
    "--word-accent-dark": palette.dark,
    "--word-from": palette.from,
    "--word-tint": palette.tint,
    "--word-to": palette.to,
  } as CSSProperties;

  return (
    <article
      className={`${styles.wordCard} ${styles.recallCard} ${
        status === "correct" ? styles.recallCorrect : status === "wrong" ? styles.recallWrong : ""
      }`}
      style={paletteStyle}
    >
      <div className={styles.visualArea}>
        <div className={styles.visualBadges}>
          <span className={styles.partChip}><i />{PART_OF_SPEECH[word.partOfSpeech]}</span>
          <span className={styles.coreChip}><HomeIcon name="sparkles" size={14} /> Tezkor takror</span>
        </div>
        <div className={styles.wordVisual}>
          {word.media.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="" src={word.media.imageUrl} />
          ) : word.media.emoji ? (
            <span className={styles.wordEmoji}>{word.media.emoji}</span>
          ) : (
            <span className={styles.wordLetter}>?</span>
          )}
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.recallHeading}>
          <small>MA&apos;NOSIGA QARAB ESLANG</small>
          <strong>{word.meaning}</strong>
        </div>
        <label className={styles.recallLabel} htmlFor="word-recall-answer">Koreyscha so&apos;z</label>
        <div className={styles.answerShell}>
          <input
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            disabled={status === "correct"}
            id="word-recall-answer"
            onChange={(event) => onAnswer(event.target.value)}
            onFocus={(event) => setTimeout(() => event.currentTarget.scrollIntoView({ behavior: "smooth", block: "center" }), 180)}
            onKeyDown={(event) => {
              if (event.key === "Enter") onSubmit();
            }}
            placeholder={word.meaning}
            value={answer}
          />
          <button disabled={!answer.trim() || status === "correct"} onClick={onSubmit} type="button">
            <HomeIcon name={status === "correct" ? "check" : "arrow"} size={21} />
          </button>
        </div>
        <div className={styles.recallFeedback}>
          <span className={styles.feedbackIcon}>
            <HomeIcon name={status === "correct" ? "check" : status === "wrong" ? "refresh" : "sparkles"} size={19} />
          </span>
          <span>
            <strong>
              {hintVisible && status !== "correct"
                ? `Javob: ${word.headword}`
                : status === "correct"
                  ? "To'g'ri! Juda yaxshi"
                  : status === "wrong"
                    ? "Yana bir bor urinib ko'ring"
                    : "Koreyscha so'zni yozib tekshiring"}
            </strong>
            <small>
              {status === "correct"
                ? "Keyingi kartaga o'tishingiz mumkin."
                : hintVisible
                  ? "Javobga qarab yozing va yana tekshiring."
                  : "Bilmasangiz ishoradan foydalaning."}
            </small>
          </span>
          {status === "correct" ? (
            <button aria-label="So'zni tinglash" className={speaking ? styles.miniSpeakerActive : styles.miniSpeaker} onClick={onSpeak} type="button"><SpeakerIcon active={speaking} /></button>
          ) : !hintVisible ? (
            <button className={styles.hintButton} onClick={onHint} type="button">💡 Ishora</button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

interface ScopeSheetProps {
  initialSection: number;
  initialUnit: number;
  onApply: (section: number, unit: number) => void;
  onClose: () => void;
  summaries: WordSectionSummary[];
}

function ScopeSheet({ initialSection, initialUnit, onApply, onClose, summaries }: ScopeSheetProps) {
  const [section, setSection] = useState(initialSection || summaries[0]?.section || 1);
  const selected = summaries.find((item) => item.section === section) ?? summaries[0];
  const [unit, setUnit] = useState(initialUnit || selected?.units[0]?.unit || 1);

  useEffect(() => {
    if (!selected?.units.some((item) => item.unit === unit)) {
      setUnit(selected?.units[0]?.unit ?? 1);
    }
  }, [selected, unit]);

  return (
    <div className={styles.sheetBackdrop} onClick={onClose} role="presentation">
      <section aria-label="So'zlar oralig'ini tanlash" aria-modal="true" className={styles.scopeSheet} onClick={(event) => event.stopPropagation()} role="dialog">
        <div className={styles.sheetGrip} />
        <header><span><small>O&apos;QUV DOIRASI</small><strong>Qayerdan boshlaymiz?</strong></span><button aria-label="Yopish" onClick={onClose} type="button"><HomeIcon name="close" size={25} /></button></header>
        <p>Bo&apos;lim va unitni tanlang. Oxirgi tanlov keyingi safar eslab qolinadi.</p>
        <div className={styles.scopeSectionRow}>
          {summaries.filter((item) => item.words > 0).map((item) => (
            <button className={item.section === section ? styles.scopeSelected : ""} key={item.section} onClick={() => setSection(item.section)} type="button">
              <small>BO&apos;LIM</small><strong>{item.section}</strong><span>{item.words} so&apos;z</span>
            </button>
          ))}
        </div>
        <h3>Unitni tanlang</h3>
        <div className={styles.unitGrid}>
          {selected?.units.map((item) => (
            <button className={item.unit === unit ? styles.unitSelected : ""} key={item.unit} onClick={() => setUnit(item.unit)} type="button">
              <strong>{item.unit}-unit</strong><span>{item.words} ta so&apos;z</span>
            </button>
          ))}
        </div>
        <button className={styles.applyScope} disabled={!selected || !unit} onClick={() => onApply(selected!.section, unit)} type="button">Shu yerdan o&apos;rganish <HomeIcon name="arrow" size={20} /></button>
      </section>
    </div>
  );
}

function RecallOffer({ count, onClose, onSkip, onStart }: { count: number; onClose: () => void; onSkip: () => void; onStart: () => void }) {
  return (
    <div className={styles.offerBackdrop} onClick={onClose} role="presentation">
      <section aria-label="Yodlash mashqi" aria-modal="true" className={styles.offerCard} onClick={(event) => event.stopPropagation()} role="dialog">
        <span className={styles.offerIcon}><HomeIcon name="sparkles" size={31} /></span>
        <small>ENDI ESLAB KO&apos;RAMIZ</small>
        <h2>So&apos;zlarni yodlab oldingizmi?</h2>
        <p>Ko&apos;rgan {count} ta so&apos;zning koreyschasini o&apos;zingiz yozib tekshiring.</p>
        <button className={styles.offerStart} onClick={onStart} type="button"><LearningIcon name="albums" size={20} /> Yodlashni mashq qilish</button>
        <button className={styles.offerSkip} onClick={onSkip} type="button">Keyinroq mashq qilaman</button>
      </section>
    </div>
  );
}

export function WordStudyScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request } = useTelegramAuth();
  const { speak, speaking, stop } = useKoreanSpeech();
  const fromStudyPath = params.get("from") === "studyPath";
  const requestedSection = Number(params.get("section")) || 0;
  const requestedUnit = Number(params.get("unit")) || 0;
  const lesson = Math.max(1, Number(params.get("lesson")) || 1);
  const lessonCount = Math.max(1, Number(params.get("lessonCount")) || 1);
  const [summaries, setSummaries] = useState<WordSectionSummary[]>([]);
  const [section, setSection] = useState(requestedSection);
  const [unit, setUnit] = useState(requestedUnit);
  const [words, setWords] = useState<StudyWord[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [scopeOpen, setScopeOpen] = useState(false);
  const [phase, setPhase] = useState<StudyPhase>("browse");
  const [offerOpen, setOfferOpen] = useState(false);
  const [recallQueue, setRecallQueue] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [recallStatus, setRecallStatus] = useState<RecallStatus>("idle");
  const [hintVisible, setHintVisible] = useState(false);
  const [hadHelp, setHadHelp] = useState(false);
  const [reported, setReported] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const seenRef = useRef(new Set<string>());
  const pointerStartRef = useRef<number | null>(null);
  const offerShownRef = useRef(false);

  const loadSections = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    try {
      const result = await getWordSections(request);
      const available = result.filter((item) => item.words > 0);
      setSummaries(result);
      let targetSection = requestedSection;
      let targetUnit = requestedUnit;
      let restoredFromSaved = false;
      if (!targetSection || !targetUnit) {
        try {
          const saved = JSON.parse(localStorage.getItem(SCOPE_STORAGE_KEY) ?? "null") as { section?: number; unit?: number } | null;
          targetSection = saved?.section ?? 0;
          targetUnit = saved?.unit ?? 0;
          restoredFromSaved = Boolean(targetSection && targetUnit);
        } catch {
          localStorage.removeItem(SCOPE_STORAGE_KEY);
        }
      }
      const exactSummary = available.find((item) => item.section === targetSection);
      const exactTarget = exactSummary?.units.find((item) => item.unit === targetUnit);
      const summary = exactSummary ?? available[0];
      const target = exactTarget ?? summary?.units[0];
      if (!summary || !target) throw new Error("EMPTY_WORD_SCOPE");
      setSection(summary.section);
      setUnit(target.unit);
      if ((!requestedSection || !requestedUnit) && (!restoredFromSaved || !exactTarget)) {
        setScopeOpen(true);
      }
    } catch {
      setFailed(true);
      setLoading(false);
    }
  }, [request, requestedSection, requestedUnit]);

  useEffect(() => {
    void loadSections();
  }, [loadSections]);

  const loadWords = useCallback(async () => {
    if (!section || !unit || summaries.length === 0) return;
    setLoading(true);
    setFailed(false);
    stop();
    try {
      const all = await getUnitWords(request, section, unit);
      const range = lessonSlice(all.length, lessonCount, lesson);
      const result = lessonCount > 1 ? all.slice(range.start, range.end) : all;
      setWords(result);
      setIndex(0);
      setPhase("browse");
      setRecallQueue([]);
      setOfferOpen(false);
      offerShownRef.current = false;
      seenRef.current.clear();
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [lesson, lessonCount, request, section, stop, summaries.length, unit]);

  useEffect(() => {
    void loadWords();
  }, [loadWords]);

  const currentWord = words[index];
  const recallWord = useMemo(
    () => words.find((word) => word.id === recallQueue[0]) ?? null,
    [recallQueue, words],
  );

  useEffect(() => {
    if (!currentWord || phase !== "browse" || seenRef.current.has(currentWord.id)) return;
    seenRef.current.add(currentWord.id);
    void markSeenWords(request, [currentWord.id]).catch(() => undefined);
  }, [currentWord, phase, request]);

  useEffect(() => {
    if (phase !== "browse" || !currentWord || index !== words.length - 1 || offerShownRef.current) return;
    const timeout = window.setTimeout(() => {
      offerShownRef.current = true;
      setOfferOpen(true);
      stop();
    }, 600);
    return () => window.clearTimeout(timeout);
  }, [currentWord, index, phase, stop, words.length]);

  const speechText = (word: StudyWord) => word.pronunciation.ttsText || word.pronunciation.hangul || word.headword;

  const goBack = () => {
    stop();
    if (window.history.length > 1) router.back();
    else router.replace(fromStudyPath ? "/study-path" : "/course-categories");
  };

  const changeScope = (nextSection: number, nextUnit: number) => {
    localStorage.setItem(SCOPE_STORAGE_KEY, JSON.stringify({ section: nextSection, unit: nextUnit }));
    setScopeOpen(false);
    if (nextSection === section && nextUnit === unit) return;
    setSection(nextSection);
    setUnit(nextUnit);
  };

  const finishNode = async () => {
    if (finishing) return;
    setFinishing(true);
    try {
      if (fromStudyPath) {
        await completeStudyNode(request, { group: 1, kind: "words", lesson, section, unit });
        router.replace("/study-path");
      } else if (window.history.length > 1) {
        router.back();
      } else {
        router.replace("/course-categories");
      }
    } catch {
      setFinishing(false);
    }
  };

  const startRecall = () => {
    setOfferOpen(false);
    setPhase("recall");
    setRecallQueue(shuffleIds(words, currentWord?.id));
    setAnswer("");
    setRecallStatus("idle");
    setHintVisible(false);
    setHadHelp(false);
    setReported(false);
  };

  const submitRecall = () => {
    if (!recallWord || !answer.trim() || recallStatus === "correct") return;
    const correct = isWordAnswerCorrect(answer, recallWord.headword);
    if (!reported) {
      setReported(true);
      void reviewWord(request, recallWord.id, correct && !hadHelp ? "good" : "again").catch(() => undefined);
    }
    if (correct) {
      setRecallStatus("correct");
      return;
    }
    setHadHelp(true);
    setRecallStatus("wrong");
  };

  const nextRecall = () => {
    if (!recallWord || recallStatus !== "correct") return;
    const remaining = recallQueue.slice(1);
    if (hadHelp) remaining.push(recallWord.id);
    if (remaining.length === 0) {
      setRecallQueue([]);
      setPhase("complete");
      return;
    }
    setRecallQueue(remaining);
    setAnswer("");
    setRecallStatus("idle");
    setHintVisible(false);
    setHadHelp(false);
    setReported(false);
  };

  const goPrevious = () => {
    stop();
    if (phase === "recall") {
      setPhase("browse");
      setIndex(Math.max(0, words.length - 1));
      return;
    }
    if (phase === "browse") setIndex((value) => Math.max(0, value - 1));
  };

  const goNext = () => {
    stop();
    if (phase === "recall") {
      nextRecall();
      return;
    }
    if (phase === "browse" && index < words.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
    if (phase === "browse") setOfferOpen(true);
  };

  const progress = phase === "recall"
    ? (words.length - recallQueue.length) / Math.max(1, words.length)
    : phase === "complete"
      ? 1
      : (index + 1) / Math.max(1, words.length);
  const canPrevious = phase === "recall" || (phase === "browse" && index > 0);
  const canNext = phase === "recall" ? recallStatus === "correct" : phase === "browse";

  return (
    <main className={styles.wordPage}>
      <header className={styles.header}>
        <button aria-label="Yopish" className={styles.closeButton} onClick={goBack} type="button"><HomeIcon name="close" size={28} /></button>
        <span className={styles.headerTitle}><small>SO&apos;Z KARTALARI</small><strong>So&apos;z kartalari</strong></span>
        <span className={styles.counter}>
          {phase === "recall" ? <><HomeIcon name="sparkles" size={14} /> Takror</> : `${words.length ? index + 1 : 0} / ${words.length}`}
        </span>
      </header>
      <div className={styles.progressTrack}><i style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }} /></div>

      <div className={styles.content}>
        {!loading && summaries.length > 0 && phase !== "recall" ? (
          <button className={styles.scopeButton} onClick={() => setScopeOpen(true)} type="button">
            <span className={styles.scopeIcon}><LearningIcon name="albums" size={21} /></span>
            <span><small>Hozirgi o&apos;quv doirasi</small><strong>{section}-bo&apos;lim · {unit}-unit</strong></span>
            <em>O&apos;zgartirish⌄</em>
          </button>
        ) : null}

        {loading ? (
          <section className={styles.stateCard}><span className={styles.spinner} /><strong>So&apos;zlar tayyorlanmoqda</strong><p>Bir lahza kuting...</p></section>
        ) : failed ? (
          <section className={styles.stateCard}><span className={styles.stateEmoji}>☁️</span><strong>So&apos;zlarni yuklab bo&apos;lmadi</strong><p>Internetni tekshirib, yana urinib ko&apos;ring.</p><button onClick={() => void loadSections()} type="button">Qayta urinish</button></section>
        ) : phase === "complete" ? (
          <section className={styles.completeCard}><span><HomeIcon name="check" size={42} /></span><small>MASHQ TUGADI</small><h2>Barcha so&apos;zlarni esladingiz!</h2><p>{words.length} ta so&apos;zni ko&apos;rdingiz va koreyschasini yozib tekshirdingiz.</p><button disabled={finishing} onClick={() => void finishNode()} type="button">{finishing ? "Saqlanmoqda..." : fromStudyPath ? "O'quv yo'liga qaytish" : "Tugatish"}<HomeIcon name="arrow" size={20} /></button></section>
        ) : currentWord ? (
          <section
            className={styles.deck}
            onPointerDown={(event) => { pointerStartRef.current = event.clientX; }}
            onPointerUp={(event) => {
              const start = pointerStartRef.current;
              pointerStartRef.current = null;
              if (start === null) return;
              const delta = event.clientX - start;
              if (delta > 58 && canPrevious) goPrevious();
              if (delta < -58 && canNext) goNext();
            }}
          >
            {phase === "recall" && recallWord ? (
              <RecallCard
                answer={answer}
                hintVisible={hintVisible}
                index={words.indexOf(recallWord)}
                onAnswer={(value) => { setAnswer(value); if (recallStatus === "wrong") setRecallStatus("idle"); }}
                onHint={() => { setHintVisible(true); setHadHelp(true); setRecallStatus("idle"); }}
                onSpeak={() => speak(speechText(recallWord))}
                onSubmit={submitRecall}
                speaking={speaking}
                status={recallStatus}
                word={recallWord}
              />
            ) : (
              <WordCard index={index} onSpeak={() => speak(speechText(currentWord))} speaking={speaking} word={currentWord} />
            )}
          </section>
        ) : (
          <section className={styles.stateCard}><span className={styles.stateEmoji}>🗂️</span><strong>Bu unitda so&apos;z topilmadi</strong></section>
        )}

        {!loading && !failed && phase !== "complete" && currentWord ? (
          <nav className={styles.navigation}>
            <button aria-label="Oldingi" disabled={!canPrevious} onClick={goPrevious} type="button"><HomeIcon name="arrow" size={22} /></button>
            <span><HomeIcon name={phase === "recall" ? recallStatus === "correct" ? "arrow" : "sparkles" : "swap"} size={18} />{phase === "recall" ? recallStatus === "correct" ? "Keyingi so'zga o'ting" : "Javobni yozib tekshiring" : "Kartalarni suring"}</span>
            <button aria-label="Keyingi" className={styles.nextButton} disabled={!canNext} onClick={goNext} type="button"><HomeIcon name="arrow" size={22} /></button>
          </nav>
        ) : null}
      </div>

      {scopeOpen && summaries.length > 0 ? <ScopeSheet initialSection={section} initialUnit={unit} onApply={changeScope} onClose={() => setScopeOpen(false)} summaries={summaries} /> : null}
      {offerOpen ? <RecallOffer count={words.length} onClose={() => setOfferOpen(false)} onSkip={() => { setOfferOpen(false); void finishNode(); }} onStart={startRecall} /> : null}
    </main>
  );
}
