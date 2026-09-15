"use client";

import { useCallback, useMemo, useState } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { assessSpeech, transcribeSpeech, type SpeechAssessResult } from "../api/lesson";
import {
  fillQuestionTemplate,
  joinBuildRows,
  stableShuffle,
  type AnswerState,
  type LessonQuestion,
} from "../model/lesson";
import { useWebSpeechRecorder } from "../model/use-web-speech-recorder";
import { LessonCharacter } from "./lesson-character";
import styles from "./lesson.module.css";

interface QuestionProps {
  answerState: AnswerState;
  combo: number;
  instanceKey: string;
  isChecking: boolean;
  onAnswer: (answer: string) => void;
  onSkip: () => void;
  question: LessonQuestion;
}

function speak(text: string, slow = false, onState?: (playing: boolean) => void) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = slow ? 0.62 : 0.88;
  utterance.onstart = () => onState?.(true);
  utterance.onend = () => onState?.(false);
  utterance.onerror = () => onState?.(false);
  window.speechSynthesis.speak(utterance);
}

function AudioButtons({ text }: { text: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={styles.speakerBubble}>
      <span className={styles.bubbleTail} />
      <button className={playing ? styles.speakerActive : ""} onClick={() => speak(text, false, setPlaying)} type="button">
        <MobileIcon name="volume-high" size={28} />
      </button>
      <button onClick={() => speak(text, true, setPlaying)} type="button">
        <MobileIcon family="material-community" name="turtle" size={27} />
      </button>
    </div>
  );
}

function CheckButton({ disabled, loading = false, onClick }: { disabled: boolean; loading?: boolean; onClick: () => void }) {
  return (
    <button className={styles.checkButton} disabled={disabled || loading} onClick={onClick} type="button">
      {loading ? <span className={styles.checkSpinner} /> : "Tekshirish"}
    </button>
  );
}

function CharacterAudio({ answerState, combo, question, text }: Pick<QuestionProps, "answerState" | "combo" | "question"> & { text: string }) {
  return (
    <div className={styles.npcRow}>
      <LessonCharacter combo={combo} height={160} seed={question.id} state={answerState} />
      <AudioButtons text={text} />
    </div>
  );
}

function CharacterPrompt({ answerState, combo, question, text }: Pick<QuestionProps, "answerState" | "combo" | "question"> & { text: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={styles.npcRow}>
      <LessonCharacter combo={combo} height={150} seed={question.id} state={answerState} />
      <div className={`${styles.speakerBubble} ${styles.textBubble}`}>
        <span className={styles.bubbleTail} />
        <button className={playing ? styles.promptSpeakerActive : ""} onClick={() => speak(text, false, setPlaying)} type="button">
          <MobileIcon name="volume-medium" size={24} />
        </button>
        <span>{text}</span>
      </div>
    </div>
  );
}

function BuilderQuestion({ answerState, combo, instanceKey, onAnswer, question, variant }: QuestionProps & { variant: "sentence" | "word" | "translate" | "reply" | "listening" }) {
  const locked = answerState !== "idle";
  const bank = useMemo(() => stableShuffle((question.options ?? []).map((word, index) => ({ index, word })), instanceKey), [instanceKey, question.options]);
  const [placed, setPlaced] = useState<number[]>([]);
  const placedWords = placed.map((index) => question.options?.[index] ?? "");
  const title = variant === "translate"
    ? "Quyidagi gapni tarjima qiling"
    : variant === "reply"
      ? "Eshitganingizga koreyschada javob bering"
      : variant === "listening"
        ? "Eshitganingizni tanlang"
        : question.question;
  const audioText = question.audioText || question.npcText || question.answer;
  const promptText = variant === "translate" ? (question.sourceText || question.answerTranslation || "") : variant === "reply" ? (question.npcText || question.sourceText || "") : "";
  const toggle = (index: number) => {
    if (locked) return;
    setPlaced((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  };
  return (
    <article className={styles.mobileQuestion}>
      <h1>{title}</h1>
      {promptText ? <CharacterPrompt answerState={answerState} combo={combo} question={question} text={promptText} /> : <CharacterAudio answerState={answerState} combo={combo} question={question} text={audioText} />}
      <div className={styles.ruledAnswer}>
        {placedWords.map((word, itemIndex) => (
          <button key={`${placed[itemIndex]}-${itemIndex}`} onClick={() => toggle(placed[itemIndex] as number)} type="button">{word}</button>
        ))}
      </div>
      <div className={styles.wordBank}>
        {bank.map(({ index, word }) => (
          <span className={styles.bankSlot} key={`${index}-${word}`}>
            <button className={placed.includes(index) ? styles.wordGhost : styles.wordChip} disabled={locked || placed.includes(index)} onClick={() => toggle(index)} type="button">{word}</button>
          </span>
        ))}
      </div>
      <CheckButton disabled={!placed.length || locked} onClick={() => onAnswer(placedWords.join(" "))} />
    </article>
  );
}

function ImageChoiceQuestion({ answerState, instanceKey, onAnswer, question }: QuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const choices = useMemo(() => stableShuffle(question.choices?.length ? question.choices : (question.options ?? []).map((text) => ({ emoji: "❓", label: text, text })), `${instanceKey}:images`), [instanceKey, question.choices, question.options]);
  return (
    <article className={styles.mobileQuestion}>
      <div className={styles.newWordBadge}><MobileIcon name="star" size={14} /> Yangi so&apos;z</div>
      <h1>To&apos;g&apos;ri rasmni tanlang</h1>
      <div className={styles.wordAudioRow}>
        <button onClick={() => speak(question.answer)} type="button"><MobileIcon name="volume-high" size={23} /></button>
        <strong>{question.answer}</strong>
      </div>
      <div className={styles.imageGrid}>
        {choices.map((choice) => {
          const correct = answerState !== "idle" && choice.text === question.answer;
          const wrong = answerState === "wrong" && choice.text === selected && !correct;
          return (
            <button className={`${styles.imageCard} ${selected === choice.text ? styles.imageSelected : ""} ${correct ? styles.imageCorrect : ""} ${wrong ? styles.imageWrong : ""}`} disabled={answerState !== "idle"} key={choice.text} onClick={() => { setSelected(choice.text); speak(choice.text); }} type="button">
              {correct ? <MobileIcon className={styles.choiceMark} name="checkmark-circle" size={23} /> : wrong ? <MobileIcon className={styles.choiceMark} name="close-circle" size={23} /> : null}
              {choice.imageUrl ? <span className={styles.choicePhoto} style={{ backgroundImage: `url(${JSON.stringify(choice.imageUrl).slice(1, -1)})` }} /> : <span className={styles.choiceEmoji}>{choice.emoji ?? "🖼️"}</span>}
              <b>{choice.label}</b>
            </button>
          );
        })}
      </div>
      <CheckButton disabled={!selected || answerState !== "idle"} onClick={() => selected && onAnswer(selected)} />
    </article>
  );
}

function ChoiceQuestion({ answerState, instanceKey, onAnswer, question, variant }: QuestionProps & { variant: "dialog" | "reading" }) {
  const [selected, setSelected] = useState<string | null>(null);
  const choices = useMemo(() => stableShuffle(question.choices?.length ? question.choices.map((choice) => choice.text) : (question.options ?? []), `${instanceKey}:choice`), [instanceKey, question.choices, question.options]);
  if (variant === "dialog") {
    return (
      <article className={`${styles.mobileQuestion} ${styles.dialogQuestion}`}>
        <div className={styles.dialogHeader}><span><MobileIcon name="chatbubbles-outline" size={23} /></span><div><small>DIALOGUE</small><h1>{question.question}</h1></div></div>
        <section className={styles.dialogScene}>
          <header><i /><b>A · B</b><MobileIcon name="volume-medium" size={16} /></header>
          {(question.dialogLines ?? []).map((line, index) => {
            const user = line.speaker === "user";
            return <div className={`${styles.dialogLine} ${user ? styles.dialogLineUser : ""}`} key={`${line.speaker}-${index}-${line.text}`}>
              {!user ? <span className={styles.dialogAvatar}>👨‍🏫<small>A</small></span> : null}
              <div className={styles.dialogBubble}><span><b>{user ? "B" : "A"}</b><button onClick={() => speak(line.text)} type="button"><MobileIcon name="volume-medium" size={17} /></button></span><p>{line.text}</p></div>
              {user ? <span className={styles.dialogAvatar}>👩‍🎓<small>B</small></span> : null}
            </div>;
          })}
          <div className={`${styles.dialogLine} ${styles.dialogLineUser}`}><div className={`${styles.dialogBubble} ${styles.dialogAnswerBubble}`}><span><b>B</b><MobileIcon name={selected ? "checkmark-circle" : "ellipsis-horizontal"} size={18} /></span><p>{selected ?? "— — —"}</p></div><span className={styles.dialogAvatar}>👩‍🎓<small>B</small></span></div>
        </section>
        <div className={styles.dialogOptionsHeader}><b>CHOICES</b><small>{choices.length} choices</small></div>
        <div className={styles.mobileChoiceList}>
          {choices.map((choice, index) => <button className={selected === choice ? styles.mobileChoiceSelected : ""} disabled={answerState !== "idle"} key={`${choice}-${index}`} onClick={() => setSelected(choice)} type="button"><small>{index + 1}</small><b>{choice}</b>{selected === choice ? <MobileIcon name="checkmark-circle" size={23} /> : null}</button>)}
        </div>
        <CheckButton disabled={!selected || answerState !== "idle"} onClick={() => selected && onAnswer(selected)} />
      </article>
    );
  }
  return (
    <article className={styles.mobileQuestion}>
      <h1>Matnni o&apos;qib, savolga javob bering</h1>
      {question.passage ? <section className={styles.readingPassage}>{question.passageTitle ? <strong>{question.passageTitle}</strong> : null}<p>{question.passage}</p></section> : null}
      <h2 className={styles.choiceQuestionText}>{question.question}</h2>
      <div className={styles.mobileChoiceList}>
        {choices.map((choice, index) => <button className={selected === choice ? styles.mobileChoiceSelected : ""} disabled={answerState !== "idle"} key={`${choice}-${index}`} onClick={() => setSelected(choice)} type="button"><small>{index + 1}</small><b>{choice}</b></button>)}
      </div>
      <CheckButton disabled={!selected || answerState !== "idle"} onClick={() => selected && onAnswer(selected)} />
    </article>
  );
}

function ListeningQuestion({ answerState, instanceKey, onAnswer, question }: QuestionProps) {
  const locked = answerState !== "idle";
  const bank = useMemo(() => stableShuffle((question.options?.length ? question.options : question.answer.split(" ")).map((word, index) => ({ index, word })), `${instanceKey}:listen`), [instanceKey, question.answer, question.options]);
  const [placed, setPlaced] = useState<number[]>([]);
  const placedWords = placed.map((index) => (question.options?.length ? question.options[index] : question.answer.split(" ")[index]) ?? "");
  const toggle = (index: number) => setPlaced((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  return (
    <article className={styles.mobileQuestion}>
      <h1>Eshitganingizni tanlang</h1>
      <div className={styles.listeningAudioRow}><button onClick={() => speak(question.answer)} type="button"><MobileIcon name="volume-high" size={36} /></button><button onClick={() => speak(question.answer, true)} type="button"><MobileIcon family="material-community" name="turtle" size={31} /></button></div>
      <div className={styles.listeningAnswer}>{placedWords.length ? placedWords.map((word, index) => <button key={`${placed[index]}-${word}`} onClick={() => toggle(placed[index] as number)} type="button">{word}</button>) : <span>So&apos;zni bosing yoki sudrab olib keling</span>}</div>
      <div className={styles.listeningDivider} />
      <div className={styles.listeningBank}>{bank.map(({ index, word }) => <button className={placed.includes(index) ? styles.listenGhost : ""} disabled={locked || placed.includes(index)} key={`${index}-${word}`} onClick={() => toggle(index)} type="button">{word}</button>)}</div>
      <CheckButton disabled={!placed.length || locked} onClick={() => onAnswer(placedWords.join(" "))} />
    </article>
  );
}

function TranslateTypeQuestion({ answerState, isChecking, onAnswer, question }: QuestionProps) {
  const { request } = useTelegramAuth();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const source = (question.sourceText || question.npcText || question.question).replace(/^(?:Koreyscha yozing|Type in Korean|Напишите по-корейски)\s*:\s*/iu, "").replace(/^["“«]\s*/u, "").replace(/\s*["”»]$/u, "").trim();
  const locked = answerState !== "idle" || isChecking || transcribing;
  const recorder = useWebSpeechRecorder({
    onError: (code) => setVoiceError(code === "permission" ? "Mikrofon ruxsati kerak. Sozlamalardan yoqing" : code === "too_short" ? "Juda qisqa. Gapni oxirigacha ayting" : "Mikrofonni ochib bo'lmadi"),
    onLevel: () => undefined,
    onResult: async (wav) => {
      setTranscribing(true);
      try {
        const result = await transcribeSpeech(request, wav);
        if (result.status === "success" && result.text.trim()) setValue(result.text.trim());
        else setVoiceError("Ovoz eshitilmadi. Yana bir marta gapirasizmi?");
      } catch { setVoiceError("Hozir tekshirib bo'lmadi. Birozdan so'ng urinib ko'ring"); }
      finally { setTranscribing(false); }
    },
  });
  const toggleMic = () => {
    if (locked && !recorder.recording) return;
    setVoiceError(null);
    if (recorder.recording) recorder.stop();
    else void recorder.start();
  };
  const tone = answerState === "correct" ? styles.translateCorrect : answerState === "wrong" ? styles.translateWrong : focused ? styles.translateFocused : "";
  return (
    <article className={`${styles.mobileQuestion} ${styles.translateTypeQuestion}`}>
      <div className={styles.translateHeader}><span><MobileIcon name="language" size={24} /></span><div><h1>Quyidagi gapni tarjima qiling</h1><p>Ma&apos;noni tabiiy koreyscha gap bilan ifodalang</p></div></div>
      <section className={styles.translateSource}><div><span><MobileIcon name="chatbubble-ellipses-outline" size={16} /> Tarjima qilinadigan gap</span><small>Koreyschaga <MobileIcon name="arrow-forward" size={13} /></small></div><p><b>“</b>{source}</p></section>
      <section className={`${styles.translateAnswer} ${tone}`}><header><span><MobileIcon name={answerState === "correct" ? "checkmark" : answerState === "wrong" ? "close" : "create-outline"} size={18} /></span><b>Koreyscha javobingiz</b>{value ? <button aria-label="Tozalash" onClick={() => setValue("")} type="button"><MobileIcon name="trash-outline" size={19} /></button> : null}</header><textarea autoFocus disabled={locked} onBlur={() => setFocused(false)} onChange={(event) => setValue(event.target.value)} onFocus={() => setFocused(true)} placeholder="Koreyscha gapni kiriting" value={value} /></section>
      <div className={styles.translateVoice}><button className={recorder.recording ? styles.translateVoiceActive : ""} disabled={isChecking || transcribing || answerState !== "idle"} onClick={toggleMic} type="button"><MobileIcon name={recorder.recording ? "stop" : "mic"} size={24} /></button><span><b>{recorder.recording ? "Tinglanmoqda..." : transcribing ? "Talaffuz tekshirilmoqda…" : "Gapirish uchun bosing"}</b><small>Gapirsangiz, javob maydoniga yoziladi</small></span></div>
      {voiceError ? <p className={styles.speechError}>{voiceError}</p> : null}
      <CheckButton disabled={!value.trim() || locked || recorder.recording} loading={isChecking || transcribing} onClick={() => onAnswer(value.trim())} />
    </article>
  );
}

function TypeAnswerQuestion({ answerState, combo, isChecking, onAnswer, question }: QuestionProps) {
  const template = question.sentenceTemplate?.trim() || `${question.sentencePrefix ?? ""}___${question.sentenceSuffix ?? ""}`;
  const parts = useMemo(() => template.split(/_{3,}/g), [template]);
  const blankTotal = Math.max(1, parts.length - 1);
  const [values, setValues] = useState<string[]>(() => Array(blankTotal).fill(""));
  const prompt = question.npcText || question.answerTranslation || "";
  const locked = answerState !== "idle" || isChecking;
  const complete = values.every((value) => value.trim());
  return (
    <article className={styles.mobileQuestion}>
      <h1>{prompt && !question.npcText ? "Bu ma‘noni koreyscha yozing" : question.question || "Bu ma‘noni koreyscha yozing"}</h1>
      {prompt ? <CharacterPrompt answerState={answerState} combo={combo} question={question} text={prompt} /> : null}
      <div className={styles.blankSentence}>{parts.map((part, index) => <span key={`${part}-${index}`}>{part}{index < blankTotal ? <input autoComplete="off" autoFocus={index === 0} disabled={locked} onChange={(event) => setValues((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.value : value))} placeholder="..." value={values[index] ?? ""} /> : null}</span>)}</div>
      <CheckButton disabled={!complete || locked} loading={isChecking} onClick={() => onAnswer(fillQuestionTemplate(question, values))} />
    </article>
  );
}

function TypedQuestion({ answerState, combo, isChecking, onAnswer, onSkip, question, variant }: QuestionProps & { variant: "type" | "translate" | "listen" | "listen-fill" | "verb" }) {
  const [value, setValue] = useState("");
  const listening = variant === "listen" || variant === "listen-fill";
  const title = variant === "type" ? "Bu ma‘noni koreyscha yozing" : variant === "translate" ? "Koreyschaga tarjima qiling" : variant === "verb" ? "To'g'ri shaklga o'zgartiring" : variant === "listen-fill" ? "Tushib qolgan so'zni kiriting" : "Eshitganingizni yozing";
  const prompt = question.npcText || question.answerTranslation || question.sourceText || "";
  const locked = answerState !== "idle" || isChecking;
  const submit = () => {
    if (!value.trim() || locked) return;
    const answer = variant === "listen-fill" && question.blankAnswers?.length ? fillQuestionTemplate(question, [value.trim()]) : value.trim();
    onAnswer(answer);
  };
  return (
    <article className={styles.mobileQuestion}>
      <h1>{title}</h1>
      {listening ? <CharacterAudio answerState={answerState} combo={combo} question={question} text={question.audioText || question.answer} /> : prompt ? <CharacterPrompt answerState={answerState} combo={combo} question={question} text={prompt} /> : null}
      {variant === "listen-fill" || variant === "verb" ? (
        <div className={styles.inlineSentence}><span>{question.sentencePrefix}</span><input autoComplete="off" autoFocus disabled={locked} onChange={(event) => setValue(event.target.value)} placeholder={question.hint || "Javob"} value={value} /><span>{question.sentenceSuffix}</span></div>
      ) : <textarea autoComplete="off" autoFocus className={styles.answerInput} disabled={locked} onChange={(event) => setValue(event.target.value)} placeholder="Bu yerga yozing" value={value} />}
      {listening ? <button className={styles.skipButton} disabled={locked} onClick={onSkip} type="button">Tinglash mashqini o&apos;tkazib yuborish</button> : null}
      <CheckButton disabled={!value.trim() || locked} loading={isChecking} onClick={submit} />
    </article>
  );
}

function FillQuestion({ answerState, instanceKey, onAnswer, question, variant }: QuestionProps & { variant: "fill" | "cloze" }) {
  const blankTotal = Math.max(1, question.blankAnswers?.length ?? (question.sentenceTemplate?.match(/_{3,}/g)?.length || 1));
  const options = useMemo(() => stableShuffle((question.options ?? []).map((word, index) => ({ index, word })), `${instanceKey}:fill`), [instanceKey, question.options]);
  const [picked, setPicked] = useState<number[]>([]);
  const values = picked.map((index) => question.options?.[index] ?? "");
  const sentence = (question.sentenceTemplate || `${question.sentencePrefix ?? ""}___${question.sentenceSuffix ?? ""}`).split(/_{3,}/g);
  return (
    <article className={styles.mobileQuestion}>
      <div className={styles.fillTitle}><MobileIcon name="create-outline" size={25} /><h1>{variant === "cloze" ? "Matndagi bo'sh joylarni to'ldiring" : "Bo'sh joyga mos so'zni tanlang"}</h1></div>
      {question.passage ? <section className={styles.readingPassage}><p>{question.passage}</p></section> : null}
      <div className={styles.fillSentence}>
        <small>{Math.min(values.length + 1, blankTotal)} / {blankTotal}</small>
        {sentence.map((part, index) => <span key={`${part}-${index}`}>{part}{index < sentence.length - 1 ? <button onClick={() => setPicked((current) => current.slice(0, index))} type="button">{values[index] || "　　　　"}</button> : null}</span>)}
      </div>
      <button className={styles.fullAudioButton} onClick={() => speak(question.audioText || question.answer)} type="button"><MobileIcon name="volume-high" size={22} /> To&apos;liq gapni tinglash</button>
      <div className={styles.fillOptions}><strong>Variantlar</strong><div>{options.map(({ index, word }) => <button disabled={answerState !== "idle" || picked.includes(index) || picked.length >= blankTotal} key={`${index}-${word}`} onClick={() => setPicked((current) => [...current, index])} type="button">{word}</button>)}</div></div>
      <CheckButton disabled={values.length < blankTotal || answerState !== "idle"} onClick={() => onAnswer(variant === "cloze" ? values.join("|") : fillQuestionTemplate(question, values))} />
    </article>
  );
}

function MatchingQuestion({ answerState, instanceKey, onAnswer, onSkip, question, variant }: QuestionProps & { variant: "word" | "audio" }) {
  const pairs = useMemo(() => question.pairs ?? [], [question.pairs]);
  const left = useMemo(() => stableShuffle(pairs.map((pair, pairId) => ({ pairId, text: pair.korean })), `${instanceKey}:left`), [instanceKey, pairs]);
  const right = useMemo(() => stableShuffle(pairs.map((pair, pairId) => ({ pairId, text: pair.native })), `${instanceKey}:right`), [instanceKey, pairs]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(() => new Set());
  const [wrong, setWrong] = useState<string[]>([]);
  const evaluate = (leftIndex: number, rightIndex: number) => {
    const l = left[leftIndex]; const r = right[rightIndex];
    setSelectedLeft(null); setSelectedRight(null);
    if (!l || !r) return;
    if (l.pairId === r.pairId) {
      setMatched((current) => new Set([...current, l.pairId]));
      speak(l.text);
    } else {
      setWrong([`l-${leftIndex}`, `r-${rightIndex}`]);
      window.setTimeout(() => setWrong([]), 520);
    }
  };
  return (
    <article className={styles.mobileQuestion}>
      <h1>{question.question}</h1><p className={styles.matchSubtitle}>Mos keladigan so&apos;zlarni juftlang</p>
      <div className={styles.matchColumns}>
        <div>{left.map((item, index) => <button className={`${selectedLeft === index ? styles.matchSelected : ""} ${matched.has(item.pairId) ? styles.matchDone : ""} ${wrong.includes(`l-${index}`) ? styles.matchWrong : ""}`} disabled={answerState !== "idle" || matched.has(item.pairId)} key={`l-${item.pairId}`} onClick={() => { setSelectedLeft(index); if (selectedRight !== null) evaluate(index, selectedRight); }} type="button">{variant === "audio" ? <><MobileIcon name="volume-high" size={25} /><span className={styles.waveform}>▮▮▮▮</span></> : item.text}</button>)}</div>
        <div>{right.map((item, index) => <button className={`${selectedRight === index ? styles.matchSelected : ""} ${matched.has(item.pairId) ? styles.matchDone : ""} ${wrong.includes(`r-${index}`) ? styles.matchWrong : ""}`} disabled={answerState !== "idle" || matched.has(item.pairId)} key={`r-${item.pairId}`} onClick={() => { setSelectedRight(index); if (selectedLeft !== null) evaluate(selectedLeft, index); }} type="button">{item.text}</button>)}</div>
      </div>
      {variant === "audio" ? <button className={styles.skipButton} onClick={onSkip} type="button">Tinglash mashqini o&apos;tkazib yuborish</button> : null}
      <CheckButton disabled={!pairs.length || matched.size !== pairs.length || answerState !== "idle"} onClick={() => onAnswer("all_correct")} />
    </article>
  );
}

function GrammarBuildQuestion({ answerState, instanceKey, onAnswer, question }: QuestionProps) {
  const rows = useMemo(() => (question.buildRows ?? []).map((row, index) => ({ ...row, options: stableShuffle(row.options, `${instanceKey}:row:${index}`) })), [instanceKey, question.buildRows]);
  const [picks, setPicks] = useState<string[]>([]);
  return (
    <article className={`${styles.mobileQuestion} ${styles.grammarQuestion}`}>
      <h1>{question.question}</h1>
      {question.answerTranslation ? <p className={styles.grammarMeaning}>{question.answerTranslation}</p> : null}
      <div className={styles.grammarBuildAnswer}>{picks.length ? picks.join(" ") : <span>Gapni bosqichma-bosqich tuzing</span>}</div>
      <div className={styles.grammarRows}>{rows.map((row, rowIndex) => <div key={rowIndex}><small>{rowIndex + 1}</small>{row.options.map((option) => <button className={picks[rowIndex] === option ? styles.grammarPicked : ""} disabled={answerState !== "idle" || rowIndex > picks.length} key={option} onClick={() => setPicks((current) => [...current.slice(0, rowIndex), option])} type="button">{option}</button>)}</div>)}</div>
      <CheckButton disabled={picks.length !== rows.length || answerState !== "idle"} onClick={() => onAnswer(joinBuildRows(rows, picks))} />
    </article>
  );
}

function DialogOrderQuestion({ answerState, instanceKey, onAnswer, question }: QuestionProps) {
  const lines = useMemo(() => stableShuffle((question.dialogLines ?? []).map((line, index) => ({ ...line, index })), `${instanceKey}:dialog`), [instanceKey, question.dialogLines]);
  const [order, setOrder] = useState<number[]>([]);
  return (
    <article className={styles.mobileQuestion}>
      <h1>Suhbatni tartib bilan joylashtiring</h1><p className={styles.matchSubtitle}>Suhbatni tugatish uchun quyidagi xabarlarni bosing</p>
      <div className={styles.dialogWindow}>{order.map((original, index) => { const line = lines.find((item) => item.index === original); return <button className={line?.speaker === "user" ? styles.dialogUser : styles.dialogNpc} key={original} onClick={() => setOrder((current) => current.filter((_, itemIndex) => itemIndex !== index))} type="button">{line?.text}</button>; })}</div>
      <div className={styles.dialogBank}>{lines.filter((line) => !order.includes(line.index)).map((line) => <button key={line.index} onClick={() => setOrder((current) => [...current, line.index])} type="button">{line.text}</button>)}</div>
      <CheckButton disabled={!lines.length || order.length !== lines.length || answerState !== "idle"} onClick={() => onAnswer(order.every((original, index) => original === index) ? "all_correct" : "__wrong_order__")} />
    </article>
  );
}

function ErrorHuntQuestion({ answerState, instanceKey, onAnswer, question }: QuestionProps) {
  const words = (question.npcText ?? "").split(" ");
  const options = useMemo(() => stableShuffle(question.options ?? [], `${instanceKey}:fix`), [instanceKey, question.options]);
  const [found, setFound] = useState<number | null>(null);
  const [missed, setMissed] = useState<number | null>(null);
  const [fix, setFix] = useState<string | null>(null);
  const tapWord = (word: string, index: number) => {
    if (answerState !== "idle" || found !== null) return;
    if (word === question.wrongWord) { setFound(index); return; }
    setMissed(index);
    window.setTimeout(() => onAnswer("__wrong_tap__"), 320);
  };
  return <article className={styles.mobileQuestion}><h1>{found === null ? "Gapdagi xatoni toping" : "To'g'ri shakl bilan tuzating"}</h1><div className={styles.errorBadge}>🕵️ <span>{found === null ? "Xato so'zni bosing — faqat bitta imkoniyat!" : "Topdingiz! Endi tuzatamizmi?"}</span></div><div className={styles.errorSentence}>{words.map((word, index) => <button className={`${found === index || missed === index ? styles.errorSelected : ""} ${found === index ? styles.errorFound : ""}`} disabled={answerState !== "idle" || found !== null} key={`${word}-${index}`} onClick={() => tapWord(word, index)} type="button">{word}</button>)}</div>{found !== null ? <div className={styles.errorFixOptions}>{options.map((option) => <button className={fix === option ? styles.errorFixSelected : ""} key={option} onClick={() => setFix(option)} type="button">{option}</button>)}</div> : null}<CheckButton disabled={found === null || !fix || answerState !== "idle"} onClick={() => fix && onAnswer(fix)} /></article>;
}

function SpeakingQuestion({ answerState, onAnswer, onSkip, question }: QuestionProps) {
  const { request } = useTelegramAuth();
  const [phase, setPhase] = useState<"idle" | "recording" | "analyzing" | "done">("idle");
  const [level, setLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SpeechAssessResult | null>(null);
  const handleAudio = useCallback(async (wav: ArrayBuffer) => {
    setPhase("analyzing"); setError(null);
    try {
      const assessment = await assessSpeech(request, question.id, wav);
      if (assessment.status !== "success") { setPhase("idle"); setError("Ovoz eshitilmadi. Yana bir marta gapirasizmi?"); return; }
      setResult(assessment); setPhase("done"); onAnswer(assessment.passed ? "all_correct" : "__speaking_low__");
    } catch { setPhase("idle"); setError("Hozir tekshirib bo'lmadi. Birozdan so'ng urinib ko'ring"); }
  }, [onAnswer, question.id, request]);
  const recorder = useWebSpeechRecorder({ onError: (code) => { setPhase("idle"); setError(code === "permission" ? "Mikrofon ruxsati kerak. Sozlamalardan yoqing" : code === "too_short" ? "Juda qisqa. Gapni oxirigacha ayting" : "Mikrofonni ochib bo'lmadi"); }, onLevel: (value) => setLevel(Math.min(1, value * 18)), onResult: (wav) => void handleAudio(wav) });
  const press = () => { if (answerState !== "idle" || phase === "analyzing" || phase === "done") return; setError(null); if (recorder.recording) { recorder.stop(); return; } setResult(null); setPhase("recording"); void recorder.start(); };
  return (
    <article className={`${styles.mobileQuestion} ${styles.speakingCard}`}><h1>{question.question}</h1><p className={styles.speakingTarget}>{question.answer}</p><button className={styles.wordSpeaker} onClick={() => speak(question.answer)} type="button"><MobileIcon name="volume-high" size={27} /></button><button aria-label="Gapirish" className={`${styles.micButton} ${recorder.recording ? styles.micRecording : ""}`} disabled={answerState !== "idle" || phase === "analyzing"} onClick={press} style={{ "--voice-level": level } as React.CSSProperties} type="button">{phase === "analyzing" ? <span className={styles.micSpinner}>↻</span> : <MobileIcon name="mic-outline" size={42} />}</button><strong className={styles.micLabel}>{phase === "recording" ? "Eshityapman…" : phase === "analyzing" ? "Talaffuz tekshirilmoqda…" : "Bosing va gapiring"}</strong>{error ? <p className={styles.speechError}>{error}</p> : null}{result ? <div className={styles.speechScores}><span><b>{Math.round(result.scores.pron)}</b><small>Talaffuz</small></span><span><b>{Math.round(result.scores.accuracy)}</b><small>Aniqlik</small></span><span><b>{Math.round(result.scores.fluency)}</b><small>Ravonlik</small></span></div> : null}<button className={styles.skipButton} disabled={answerState !== "idle" || recorder.recording} onClick={onSkip} type="button">Gapirish savolini o&apos;tkazib yuborish</button></article>
  );
}

export function QuestionCard(props: QuestionProps) {
  switch (props.question.type) {
    case "sentence_builder": return <BuilderQuestion {...props} variant="sentence" />;
    case "reply_builder": return <BuilderQuestion {...props} variant="reply" />;
    case "translate_builder": return <BuilderQuestion {...props} variant="translate" />;
    case "word_arrange": return <BuilderQuestion {...props} variant="word" />;
    case "listening": return <ListeningQuestion {...props} />;
    case "image_choice": return <ImageChoiceQuestion {...props} />;
    case "dialog_complete": return <ChoiceQuestion {...props} variant="dialog" />;
    case "reading_quiz": return <ChoiceQuestion {...props} variant="reading" />;
    case "type_answer": return <TypeAnswerQuestion {...props} />;
    case "translate_type": return <TranslateTypeQuestion {...props} />;
    case "listen_type": return <TypedQuestion {...props} variant="listen" />;
    case "listen_fill": return <TypedQuestion {...props} variant="listen-fill" />;
    case "verb_transform": return props.question.buildRows?.length ? <GrammarBuildQuestion {...props} /> : <TypedQuestion {...props} variant="verb" />;
    case "fill_in_blank": return <FillQuestion {...props} variant="fill" />;
    case "cloze_passage": return <FillQuestion {...props} variant="cloze" />;
    case "word_matching": return <MatchingQuestion {...props} variant="word" />;
    case "audio_match": return <MatchingQuestion {...props} variant="audio" />;
    case "grammar_build": return <GrammarBuildQuestion {...props} />;
    case "grammar_blank": return <TypedQuestion {...props} variant="verb" />;
    case "dialog_order": return <DialogOrderQuestion {...props} />;
    case "error_hunt": return <ErrorHuntQuestion {...props} />;
    case "speaking": return <SpeakingQuestion {...props} />;
  }
}
