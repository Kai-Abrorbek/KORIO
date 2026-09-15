"use client";

import { useCallback, useMemo, useState } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { LearningIcon } from "../../learning/ui/learning-icon";
import { assessSpeech, type SpeechAssessResult } from "../api/lesson";
import {
  fillQuestionTemplate,
  joinBuildRows,
  stableShuffle,
  type LessonQuestion,
} from "../model/lesson";
import { useWebSpeechRecorder } from "../model/use-web-speech-recorder";
import styles from "./lesson.module.css";

interface QuestionCardProps {
  answerState: "idle" | "correct" | "wrong";
  instanceKey: string;
  onAnswer: (answer: string) => void;
  onSkip: () => void;
  question: LessonQuestion;
}

const BUILDER_TYPES = new Set([
  "sentence_builder",
  "translate_builder",
  "word_arrange",
  "listening",
  "reply_builder",
  "verb_transform",
]);
const CHOICE_TYPES = new Set(["dialog_complete", "image_choice", "reading_quiz"]);
const BLANK_TYPES = new Set(["fill_in_blank", "listen_fill", "cloze_passage"]);

function AudioButton({ question }: { question: LessonQuestion }) {
  const [speaking, setSpeaking] = useState(false);
  const text = question.audioText || question.npcText || question.answer;

  const play = () => {
    if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "ko-KR";
    speech.rate = 0.88;
    speech.onstart = () => setSpeaking(true);
    speech.onend = () => setSpeaking(false);
    speech.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(speech);
  };

  return (
    <button
      aria-label="Tinglash"
      className={`${styles.audioButton} ${speaking ? styles.audioButtonActive : ""}`}
      onClick={play}
      type="button"
    >
      <svg aria-hidden="true" height="25" viewBox="0 0 24 24" width="25">
        <path d="M4 9v6h4l5 4V5L8 9H4Zm12.5-.5a5 5 0 0 1 0 7M18.7 6a8.3 8.3 0 0 1 0 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
      <span>{speaking ? "Eshityapman" : "Tinglash"}</span>
    </button>
  );
}

function Prompt({ question }: { question: LessonQuestion }) {
  return (
    <>
      {question.tags?.[0] ? <span className={styles.questionBadge}>{question.tags[0]}</span> : null}
      <h1>{question.question || "To'g'ri javobni toping"}</h1>
      {question.passage ? (
        <section className={styles.passage}>
          {question.passageTitle ? <strong>{question.passageTitle}</strong> : null}
          <p>{question.passage}</p>
        </section>
      ) : null}
      {question.sourceText ? <p className={styles.sourceText}>{question.sourceText}</p> : null}
      {question.npcText ? <p className={styles.koreanPrompt}>{question.npcText}</p> : null}
    </>
  );
}

function SpeakingQuestion({
  locked,
  onAnswer,
  onSkip,
  question,
}: {
  locked: boolean;
  onAnswer: (answer: string) => void;
  onSkip: () => void;
  question: LessonQuestion;
}) {
  const { request } = useTelegramAuth();
  const [phase, setPhase] = useState<"idle" | "recording" | "analyzing" | "done">("idle");
  const [level, setLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SpeechAssessResult | null>(null);

  const handleAudio = useCallback(async (wav: ArrayBuffer) => {
    setPhase("analyzing");
    setError(null);
    try {
      const assessment = await assessSpeech(request, question.id, wav);
      if (assessment.status !== "success") {
        setPhase("idle");
        setError("Ovoz eshitilmadi. Yana bir marta ayting.");
        return;
      }
      setResult(assessment);
      setPhase("done");
      onAnswer(assessment.passed ? "all_correct" : "__speaking_low__");
    } catch {
      setPhase("idle");
      setError("Hozir talaffuzni tekshirib bo'lmadi. Yana urinib ko'ring.");
    }
  }, [onAnswer, question.id, request]);

  const recorder = useWebSpeechRecorder({
    onError: (code) => {
      setPhase("idle");
      setError(
        code === "permission"
          ? "Mikrofon ruxsati kerak. Telegram sozlamalaridan yoqing."
          : code === "too_short"
            ? "Juda qisqa aytdingiz. Gapni oxirigacha ayting."
            : code === "unsupported"
              ? "Bu qurilmada mikrofon yozuvi ishlamaydi."
              : "Mikrofonni ochib bo'lmadi.",
      );
    },
    onLevel: (value) => setLevel(Math.min(1, value * 18)),
    onResult: (wav) => void handleAudio(wav),
  });

  const pressMic = () => {
    if (locked || phase === "analyzing" || phase === "done") return;
    setError(null);
    if (recorder.recording) {
      recorder.stop();
      return;
    }
    setResult(null);
    setPhase("recording");
    void recorder.start();
  };

  return (
    <article className={`${styles.questionCard} ${styles.speakingCard}`}>
      <Prompt question={question} />
      <p className={styles.speakingTarget}>{question.answer}</p>
      <AudioButton question={question} />
      <button
        aria-label={recorder.recording ? "Yozishni tugatish" : "Gapirish"}
        className={`${styles.micButton} ${recorder.recording ? styles.micRecording : ""}`}
        disabled={locked || phase === "analyzing"}
        onClick={pressMic}
        style={{ "--voice-level": level } as React.CSSProperties}
        type="button"
      >
        {phase === "analyzing" ? <span className={styles.micSpinner}>↻</span> : <LearningIcon name="mic" size={36} />}
      </button>
      <strong className={styles.micLabel}>
        {phase === "recording"
          ? "Eshityapman..."
          : phase === "analyzing"
            ? "Talaffuz tekshirilmoqda..."
            : "Bosing va gapiring"}
      </strong>
      {error ? <p className={styles.speechError}>{error}</p> : null}
      {result ? (
        <div className={styles.speechScores}>
          <span><b>{Math.round(result.scores.pron)}</b><small>Talaffuz</small></span>
          <span><b>{Math.round(result.scores.accuracy)}</b><small>Aniqlik</small></span>
          <span><b>{Math.round(result.scores.fluency)}</b><small>Ravonlik</small></span>
        </div>
      ) : null}
      <button className={styles.skipButton} disabled={locked || recorder.recording} onClick={onSkip} type="button">
        Gapirish savolini o&apos;tkazib yuborish
      </button>
    </article>
  );
}

export function QuestionCard({
  answerState,
  instanceKey,
  onAnswer,
  onSkip,
  question,
}: QuestionCardProps) {
  const locked = answerState !== "idle";
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [placed, setPlaced] = useState<number[]>([]);
  const [typed, setTyped] = useState("");
  const [rowPicks, setRowPicks] = useState<string[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<number>>(() => new Set());
  const [matchMiss, setMatchMiss] = useState<string[]>([]);
  const [dialogOrder, setDialogOrder] = useState<number[]>([]);

  const bank = useMemo(
    () => stableShuffle((question.options ?? []).map((text, index) => ({ index, text })), instanceKey),
    [instanceKey, question.options],
  );
  const choices = useMemo(() => {
    const raw: { emoji?: string; imageUrl?: string; label: string; text: string }[] = question.choices?.length
      ? question.choices
      : (question.options ?? []).map((text) => ({ label: text, text }));
    return stableShuffle(raw, `${instanceKey}:choices`);
  }, [instanceKey, question.choices, question.options]);
  const rows = useMemo(
    () =>
      (question.buildRows ?? []).map((row, index) => ({
        ...row,
        options: stableShuffle(row.options, `${instanceKey}:row:${index}`),
      })),
    [instanceKey, question.buildRows],
  );
  const matchTiles = useMemo(
    () =>
      stableShuffle(
        (question.pairs ?? []).flatMap((pair, pairIndex) => [
          { id: `k-${pairIndex}`, pairIndex, side: "k" as const, text: pair.korean },
          { id: `n-${pairIndex}`, pairIndex, side: "n" as const, text: pair.native },
        ]),
        `${instanceKey}:pairs`,
      ),
    [instanceKey, question.pairs],
  );
  const dialogBank = useMemo(
    () =>
      stableShuffle(
        (question.dialogLines ?? []).map((line, index) => ({ ...line, index })),
        `${instanceKey}:dialog`,
      ),
    [instanceKey, question.dialogLines],
  );

  const placedWords = placed.map((index) => question.options?.[index] ?? "");
  const blankCount = Math.max(
    1,
    question.blankAnswers?.length ??
      (question.sentenceTemplate?.match(/_{3,}/g)?.length || 1),
  );

  const toggleWord = (index: number) => {
    if (locked) return;
    setPlaced((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const submitBuilder = () => {
    if (!placedWords.length || locked) return;
    if (question.type === "cloze_passage") {
      onAnswer(placedWords.slice(0, blankCount).join("|"));
      return;
    }
    if (BLANK_TYPES.has(question.type) && question.blankAnswers?.length) {
      onAnswer(fillQuestionTemplate(question, placedWords.slice(0, blankCount)));
      return;
    }
    onAnswer(placedWords.join(" "));
  };

  const pickMatch = (id: string) => {
    if (locked) return;
    const tile = matchTiles.find((item) => item.id === id);
    if (!tile || matched.has(tile.pairIndex)) return;
    if (!selectedMatch) {
      setSelectedMatch(id);
      setMatchMiss([]);
      return;
    }
    const first = matchTiles.find((item) => item.id === selectedMatch);
    if (!first || first.id === tile.id) {
      setSelectedMatch(null);
      return;
    }
    if (first.pairIndex === tile.pairIndex && first.side !== tile.side) {
      setMatched((current) => new Set([...current, tile.pairIndex]));
      setSelectedMatch(null);
      setMatchMiss([]);
    } else {
      setMatchMiss([first.id, tile.id]);
      setSelectedMatch(null);
      window.setTimeout(() => setMatchMiss([]), 420);
    }
  };

  const instruction = (() => {
    if (question.type === "word_matching" || question.type === "audio_match") {
      return "Mos keladigan so'zlarni juftlang";
    }
    if (question.type === "dialog_order") return "Suhbatni tartib bilan joylashtiring";
    if (question.type === "listen_type") return "Eshitganingizni yozing";
    if (question.type === "translate_type") return "Koreyschaga tarjima qiling";
    if (question.type === "type_answer") return "Bu ma'noni koreyscha yozing";
    return question.question || "Javobni toping";
  })();

  if (question.type === "grammar_build" && rows.length) {
    const complete = rowPicks.length === rows.length;
    return (
      <article className={`${styles.questionCard} ${styles.grammarCard}`}>
        <Prompt question={{ ...question, question: instruction }} />
        {question.answerTranslation ? (
          <p className={styles.translationPrompt}>{question.answerTranslation}</p>
        ) : null}
        <div className={styles.grammarAnswer}>
          {rowPicks.length ? rowPicks.join(" ") : <span>Gapni bosqichma-bosqich tuzing</span>}
        </div>
        <div className={styles.rowOptions}>
          {rows.map((row, rowIndex) => (
            <div className={styles.optionRow} key={`${instanceKey}-${rowIndex}`}>
              <small>{rowIndex + 1}</small>
              {row.options.map((option) => (
                <button
                  className={rowPicks[rowIndex] === option ? styles.chipSelected : styles.chip}
                  disabled={locked || rowIndex > rowPicks.length}
                  key={option}
                  onClick={() =>
                    setRowPicks((current) => [...current.slice(0, rowIndex), option])
                  }
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          ))}
        </div>
        <button
          className={styles.checkButton}
          disabled={!complete || locked}
          onClick={() => onAnswer(joinBuildRows(rows, rowPicks))}
          type="button"
        >
          Tekshirish
        </button>
      </article>
    );
  }

  if (question.type === "word_matching" || question.type === "audio_match") {
    const complete = matched.size === (question.pairs?.length ?? 0) && matched.size > 0;
    return (
      <article className={styles.questionCard}>
        <Prompt question={{ ...question, question: instruction }} />
        <div className={styles.matchGrid}>
          {matchTiles.map((tile) => {
            const done = matched.has(tile.pairIndex);
            return (
              <button
                className={`${styles.matchTile} ${
                  selectedMatch === tile.id ? styles.matchSelected : ""
                } ${done ? styles.matchDone : ""} ${
                  matchMiss.includes(tile.id) ? styles.matchWrong : ""
                }`}
                disabled={locked || done}
                key={tile.id}
                onClick={() => pickMatch(tile.id)}
                type="button"
              >
                {tile.side === "k" && question.type === "audio_match" ? "🔊 " : ""}
                {tile.text}
              </button>
            );
          })}
        </div>
        <p className={styles.matchCount}>{matched.size} / {question.pairs?.length ?? 0} juft</p>
        <button
          className={styles.checkButton}
          disabled={!complete || locked}
          onClick={() => onAnswer("all_correct")}
          type="button"
        >
          Tekshirish
        </button>
      </article>
    );
  }

  if (question.type === "dialog_order") {
    const complete = dialogOrder.length === dialogBank.length && dialogBank.length > 0;
    const ordered = dialogOrder.map((index) => dialogBank.find((line) => line.index === index));
    return (
      <article className={styles.questionCard}>
        <Prompt question={{ ...question, question: instruction }} />
        <div className={styles.dialogWindow}>
          {ordered.length ? ordered.map((line, index) => (
            <button
              className={line?.speaker === "user" ? styles.dialogUser : styles.dialogNpc}
              key={line?.index}
              onClick={() => !locked && setDialogOrder((current) => current.filter((_, i) => i !== index))}
              type="button"
            >
              {line?.text}
            </button>
          )) : <p>Xabarlarni to&apos;g&apos;ri tartibda bosing</p>}
        </div>
        <div className={styles.dialogBank}>
          {dialogBank.filter((line) => !dialogOrder.includes(line.index)).map((line) => (
            <button
              className={styles.dialogChip}
              disabled={locked}
              key={line.index}
              onClick={() => setDialogOrder((current) => [...current, line.index])}
              type="button"
            >
              {line.text}
            </button>
          ))}
        </div>
        <button
          className={styles.checkButton}
          disabled={!complete || locked}
          onClick={() =>
            onAnswer(dialogOrder.every((originalIndex, index) => originalIndex === index) ? "all_correct" : "__wrong_order__")
          }
          type="button"
        >
          Tekshirish
        </button>
      </article>
    );
  }

  if (CHOICE_TYPES.has(question.type) && choices.length) {
    return (
      <article className={styles.questionCard}>
        <Prompt question={{ ...question, question: instruction }} />
        {question.audioText ? <AudioButton question={question} /> : null}
        <div className={question.type === "image_choice" ? styles.imageChoices : styles.choiceList}>
          {choices.map((choice, index) => (
            <button
              className={`${styles.choiceButton} ${selectedChoice === choice.text ? styles.choiceSelected : ""}`}
              disabled={locked}
              key={`${choice.text}-${index}`}
              onClick={() => setSelectedChoice(choice.text)}
              type="button"
            >
              {choice.imageUrl ? (
                <span
                  aria-label={choice.label}
                  className={styles.choiceImage}
                  role="img"
                  style={{ backgroundImage: `url(${JSON.stringify(choice.imageUrl).slice(1, -1)})` }}
                />
              ) : choice.emoji ? <span>{choice.emoji}</span> : null}
              <b>{choice.label}</b>
            </button>
          ))}
        </div>
        <button
          className={styles.checkButton}
          disabled={!selectedChoice || locked}
          onClick={() => selectedChoice && onAnswer(selectedChoice)}
          type="button"
        >
          Tekshirish
        </button>
      </article>
    );
  }

  if (BUILDER_TYPES.has(question.type) || (BLANK_TYPES.has(question.type) && bank.length)) {
    const enough = BLANK_TYPES.has(question.type)
      ? placedWords.length >= blankCount
      : placedWords.length > 0;
    return (
      <article className={styles.questionCard}>
        <Prompt question={{ ...question, question: instruction }} />
        {question.audioText || question.type === "listening" ? <AudioButton question={question} /> : null}
        {question.answerTranslation ? <p className={styles.translationPrompt}>{question.answerTranslation}</p> : null}
        <div className={styles.answerTray}>
          {placedWords.length ? placedWords.map((word, index) => (
            <button key={`${placed[index]}-${index}`} onClick={() => toggleWord(placed[index] as number)} type="button">
              {word}
            </button>
          )) : <span>{BLANK_TYPES.has(question.type) ? "Bo'sh joylarni to'ldiring" : "So'zlarni shu yerga joylang"}</span>}
        </div>
        <div className={styles.wordBank}>
          {bank.map((item) => (
            <button
              className={placed.includes(item.index) ? styles.wordUsed : styles.wordChip}
              disabled={locked || placed.includes(item.index) || (BLANK_TYPES.has(question.type) && placed.length >= blankCount)}
              key={`${item.index}-${item.text}`}
              onClick={() => toggleWord(item.index)}
              type="button"
            >
              {item.text}
            </button>
          ))}
        </div>
        <button className={styles.checkButton} disabled={!enough || locked} onClick={submitBuilder} type="button">
          Tekshirish
        </button>
      </article>
    );
  }

  if (question.type === "speaking") {
    return <SpeakingQuestion locked={locked} onAnswer={onAnswer} onSkip={onSkip} question={{ ...question, question: instruction }} />;
  }

  return (
    <article className={`${styles.questionCard} ${question.type.startsWith("grammar_") ? styles.grammarCard : ""}`}>
      <Prompt question={{ ...question, question: instruction }} />
      {question.audioText || question.type === "listen_type" ? <AudioButton question={question} /> : null}
      {question.answerTranslation ? <p className={styles.translationPrompt}>{question.answerTranslation}</p> : null}
      {question.type === "grammar_blank" ? (
        <div className={styles.inlineSentence}>
          <span>{question.sentencePrefix}</span>
          <input
            aria-label="Javob"
            autoComplete="off"
            autoFocus
            disabled={locked}
            onChange={(event) => setTyped(event.target.value)}
            placeholder={question.hint || "Javob"}
            value={typed}
          />
          <span>{question.sentenceSuffix}</span>
        </div>
      ) : (
        <textarea
          autoComplete="off"
          autoFocus
          className={styles.answerInput}
          disabled={locked}
          onChange={(event) => setTyped(event.target.value)}
          placeholder="Koreyscha javobni kiriting"
          rows={3}
          value={typed}
        />
      )}
      <button
        className={styles.checkButton}
        disabled={!typed.trim() || locked}
        onClick={() => onAnswer(typed.trim())}
        type="button"
      >
        Tekshirish
      </button>
    </article>
  );
}
