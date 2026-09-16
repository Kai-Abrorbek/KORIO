"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useWebSpeechRecorder } from "../../lesson/model/use-web-speech-recorder";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import {
  assessReading,
  completeReadingLesson,
  getReadingGloss,
  getReadingLesson,
  listReadingLessons,
  localized,
  type CompleteReadingResult,
  type ReadingLesson,
  type ReadingLessonSummary,
  type ReadingVocabularyExercise,
  type ReadingVocabularyExerciseBlank,
  type ReadingWordGloss,
} from "../api/reading-listening";
import styles from "./reading-listening-screen.module.css";

const STEPS: Array<{ icon: IoniconName; label: string }> = [
  { icon: "book-outline", label: "O‘qib ko‘ramiz" },
  { icon: "checkmark-circle-outline", label: "Tekshiramiz" },
  { icon: "create-outline", label: "Yozib ko‘ramiz" },
  { icon: "sparkles-outline", label: "Yangi so‘zlar" },
];
const WORD_SPLIT = /(\s+|[.!?…,·~;:“”"'‘’()[\]{}]+)/u;
const cleanWord = (word: string) => word.normalize("NFC").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();

function LessonImage({ lesson }: { lesson: ReadingLesson }) {
  const [failed, setFailed] = useState(false);
  const source = lesson.media.imageUrl || `/reading-listening/lessons/${lesson.media.imageKey || lesson.code}.webp`;
  return failed ? <span className={styles.imageFallback}>책</span> : (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={localized(lesson.media.imageAlt)} onError={() => setFailed(true)} src={source} />
  );
}

function ReadStep({ activeVocabulary, failedWord, fontIndex, lesson, onFont, onGloss, onSelectVocabulary, onSpeakVocabulary, passageWords, readingIndex, readingPhase, readingStatus, speech, toggleReading, toggleSpeech }: {
  activeVocabulary: ReadingLesson["vocabulary"][number] | undefined;
  failedWord: number | null; fontIndex: number; lesson: ReadingLesson; onFont: (index: number) => void;
  onGloss: (word: string) => void; onSelectVocabulary: (id: string) => void; onSpeakVocabulary: (word: string) => void;
  passageWords: string[]; readingIndex: number; readingPhase: string; readingStatus: string;
  speech: { progress: number; speaking: boolean }; toggleReading: () => void; toggleSpeech: () => void;
}) {
  let globalWordIndex = 0;
  const speechIndex = speech.speaking && passageWords.length
    ? Math.min(passageWords.length - 1, Math.floor(Math.min(0.9999, speech.progress + 0.32 / passageWords.length) * passageWords.length))
    : -1;
  const readingVisible = readingIndex > 0 || readingPhase !== "idle";
  return <section className={styles.stepContent}>
    <article className={styles.hero}>
      <div className={styles.heroImage}><LessonImage lesson={lesson} /><span><b>{String(lesson.unit).padStart(2,"0")}-dars</b><small><MobileIcon name="time-outline" size={15} /> {lesson.estimatedMinutes} daq.</small></span></div>
      <div className={styles.heroCopy}><small>BUGUNGI MADANIY MATN</small><h1>{lesson.title}</h1><p>{localized(lesson.topic)}</p><strong>Shoshilmang, gaplar oqimini his qilib o‘qing.</strong></div>
    </article>
    <article className={styles.readingCard}>
      <div className={styles.toolbar}>
        <button className={`${styles.audioButton} ${speech.speaking ? styles.audioActive : ""}`} onClick={toggleSpeech} type="button"><span><MobileIcon name={speech.speaking ? "stop" : "volume-high-outline"} size={21} /></span><div><strong>{speech.speaking ? "Tinglashni to‘xtatish" : "Matnni to‘liq tinglash"}</strong><i><em style={{ width: `${speech.speaking ? speech.progress * 100 : 0}%` }} /></i></div></button>
        <button className={`${styles.readingMic} ${readingPhase === "recording" ? styles.micActive : failedWord !== null ? styles.micFailed : readingPhase === "complete" ? styles.micComplete : ""}`} onClick={toggleReading} type="button"><span>{readingPhase === "assessing" ? <i className={styles.spinnerSmall} /> : <MobileIcon name={readingPhase === "complete" ? "checkmark" : readingPhase === "recording" ? "stop" : "mic"} size={19} />}</span><b>{readingPhase === "recording" ? "To‘xta" : "Mashq"}</b></button>
        <div className={styles.fontControl}><b>Aa</b><span>{[0,1,2].map((index) => <button aria-label={`Matn o‘lchami ${index + 1}`} className={index === fontIndex ? styles.fontActive : ""} key={index} onClick={() => onFont(index)} type="button"><i style={{ height: 7 + index * 2, width: 7 + index * 2 }} /></button>)}</span></div>
      </div>
      <div className={`${styles.coach} ${failedWord !== null ? styles.coachError : readingPhase === "complete" ? styles.coachComplete : readingPhase === "recording" ? styles.coachActive : ""}`}><span><MobileIcon name={failedWord !== null ? "refresh" : readingPhase === "complete" ? "checkmark" : readingPhase === "recording" ? "ear-outline" : "sparkles-outline"} size={16} /></span><p>{readingStatus}</p>{readingPhase !== "complete" && passageWords[readingIndex] ? <b>{passageWords[readingIndex]}</b> : null}</div>
      <div className={styles.passage} style={{ "--font-size": `${[14,15.5,17][fontIndex] ?? 15.5}px` } as CSSProperties}>
        {lesson.passage.map((paragraph) => <p key={paragraph.id}>{(paragraph.segments?.length ? paragraph.segments : [{ text: paragraph.text }]).flatMap((segment, segmentIndex) => segment.text.split(WORD_SPLIT).map((part, partIndex) => {
          if (!part || /^\s+$/.test(part) || WORD_SPLIT.test(part)) return <span key={`${segmentIndex}-${partIndex}`}>{part}</span>;
          const wordIndex = cleanWord(part) ? globalWordIndex++ : -1;
          const className = wordIndex === failedWord
            ? styles.wordFailed
            : readingVisible && readingPhase !== "complete" && wordIndex === readingIndex
              ? styles.wordCurrent
              : readingVisible && wordIndex < readingIndex
                ? styles.wordRead
                : readingVisible
                  ? styles.wordUnread
                  : wordIndex === speechIndex
                    ? styles.wordSpeaking
                    : segment.vocabularyId
                      ? `${styles.wordHighlighted} ${segment.vocabularyId === activeVocabulary?.id ? styles.wordHighlightedActive : ""}`
                      : "";
          return <button className={className} key={`${segmentIndex}-${partIndex}`} onClick={() => segment.vocabularyId ? onSelectVocabulary(segment.vocabularyId) : onGloss(part)} type="button">{part}</button>;
        }))}</p>)}
      </div>
      <aside className={styles.wordHint}><MobileIcon name="hand-left-outline" size={18} /> Rangli so‘zga tegib, ma’nosini darhol ko‘ring.</aside>
      {activeVocabulary ? <div className={styles.selectedWord}><div><small>TANLANGAN SO‘Z</small><strong>{activeVocabulary.word} <i>{activeVocabulary.pronunciation}</i></strong></div><button aria-label="Talaffuzni tinglash" onClick={() => onSpeakVocabulary(activeVocabulary.word)} type="button"><MobileIcon name="volume-medium" size={20} /></button><p>{localized(activeVocabulary.meaning)}</p></div> : null}
    </article>
  </section>;
}

function CheckStep({ answers, lesson, onAnswer, onTranslate, translated }: {
  answers: Record<string,number>; lesson: ReadingLesson; onAnswer: (id:string,choice:number) => void;
  onTranslate: (id:string) => void; translated: string[];
}) {
  return <section className={styles.stepContent}><header className={styles.sectionIntro}><small><MobileIcon name="checkmark-done-outline" size={16} /> MAZMUNNI TUSHUNISH</small><h1>O‘qiganlaringizni xotirjam eslang</h1><p>Javobni tanlasangiz, matndagi asosni ko‘rasiz.</p><span><MobileIcon name="leaf-outline" size={15} /> {Object.keys(answers).length} / {lesson.questions.length} Bajarildi</span></header>
    {lesson.questions.map((question,index) => {
      const selected = answers[question.id]; const showTranslation = translated.includes(question.id);
      return <article className={styles.question} key={question.id}><header><span>{index + 1}</span><h2>{question.prompt.ko}</h2></header><button className={styles.translationButton} onClick={() => onTranslate(question.id)} type="button"><MobileIcon name="language-outline" size={15} /> {showTranslation ? "Tarjimani yopish" : "Tarjimani ko‘rish"}<MobileIcon name={showTranslation ? "chevron-up" : "chevron-down"} size={14} /></button>{showTranslation ? <p className={styles.translation}>{localized(question.prompt)}</p> : null}<div className={styles.options}>{question.options.map((option,choice) => { const answered = selected !== undefined; const correct = choice === question.answerIndex; const picked = choice === selected; return <button className={answered && correct ? styles.correct : picked ? styles.wrong : ""} key={choice} onClick={() => onAnswer(question.id,choice)} type="button"><span>{answered && correct ? <MobileIcon name="checkmark" size={15} /> : picked ? <i /> : null}</span><div><strong>{option.ko}</strong>{showTranslation ? <small>{localized(option)}</small> : null}</div></button>; })}</div>{selected !== undefined ? <aside className={styles.explanation}><strong><MobileIcon name="search-outline" size={16} /> MATNDAGI ASOS</strong><p>{question.explanation.ko}</p>{showTranslation ? <small>{localized(question.explanation)}</small> : null}</aside> : null}</article>;
    })}
  </section>;
}

function WriteStep({ lesson, onExample, onTranslation, onWriting, showExample, translated, writing }: {
  lesson: ReadingLesson; onExample: () => void; onTranslation: () => void; onWriting: (value:string) => void;
  showExample: boolean; translated: boolean; writing: string;
}) {
  return <section className={styles.stepContent}><header className={styles.sectionIntro}><small><MobileIcon name="pencil-outline" size={16} /> MENING GAPLARIM</small><h1>O‘qigan iboralaringiz bilan o‘z hikoyangizni yozing</h1></header><article className={styles.writingCard}><div className={styles.writingPrompt}><span><MobileIcon name="chatbubble-ellipses-outline" size={22} /></span><strong>{lesson.writing.prompt.ko}</strong></div><button className={styles.translationButton} onClick={onTranslation} type="button"><MobileIcon name="language-outline" size={15} /> {translated ? "Tarjimani yopish" : "Tarjimani ko‘rish"}<MobileIcon name={translated ? "chevron-up" : "chevron-down"} size={14} /></button>{translated ? <div className={styles.translation}><strong>{localized(lesson.writing.prompt)}</strong><p>{localized(lesson.writing.helper)}</p></div> : null}<aside className={styles.guide}><small>FIKRNI OCHUVCHI SAVOLLAR</small><p>{lesson.writing.helper.ko}</p></aside><div className={styles.keywords}>{lesson.writing.keywords.map((word) => <button key={word} onClick={() => onWriting(writing ? `${writing} ${word}` : word)} type="button">+ {word}</button>)}</div><label className={styles.textarea}><textarea onChange={(event) => onWriting(event.target.value)} placeholder={lesson.writing.placeholder.ko} value={writing} /><small>{writing.length}</small></label><button className={styles.exampleToggle} onClick={onExample} type="button"><MobileIcon name={showExample ? "eye-off-outline" : "eye-outline"} size={18} /> {showExample ? "Namunani yopish" : "Namuna javobni ko‘rish"}<MobileIcon name={showExample ? "chevron-up" : "chevron-down"} size={17} /></button>{showExample ? <p className={styles.example}>{lesson.writing.exampleAnswer}</p> : null}</article></section>;
}

type VocabularyResponse = { baseWord: string; response: string };
const vocabularyResponseKey = (exerciseId: string, blankId: string) => `${exerciseId}:${blankId}`;
const normalizeVocabularyAnswer = (value: string) => value.normalize("NFC").trim().replace(/\s+/g, " ");
const vocabularyAnswerIsCorrect = (blank: ReadingVocabularyExerciseBlank, response?: VocabularyResponse) => {
  if (!response || normalizeVocabularyAnswer(response.baseWord) !== normalizeVocabularyAnswer(blank.baseWord)) return false;
  return [blank.answer, ...(blank.acceptedAnswers ?? [])].map(normalizeVocabularyAnswer).includes(normalizeVocabularyAnswer(response.response));
};

function ExerciseTemplate({ activeBlankId, answers, exercise, graded, onBlank }: {
  activeBlankId: string | null;
  answers: Record<string, VocabularyResponse>;
  exercise: ReadingVocabularyExercise;
  graded: boolean;
  onBlank: (blankId: string) => void;
}) {
  const blanks = new Map(exercise.blanks.map((blank) => [blank.id, blank]));
  return <div className={styles.templateText}>{exercise.template.split(/(\{\{[^}]+\}\})/g).filter(Boolean).map((piece,index) => {
    const match = /^\{\{(.+)\}\}$/.exec(piece);
    if (!match) return <span key={`text-${index}`}>{piece}</span>;
    const blank = blanks.get(match[1] ?? "");
    if (!blank) return null;
    const response = answers[vocabularyResponseKey(exercise.id, blank.id)];
    const correct = graded && vocabularyAnswerIsCorrect(blank,response);
    const wrong = graded && !correct;
    const active = activeBlankId === blank.id;
    return <button className={`${styles.inlineBlank} ${correct ? styles.blankCorrect : wrong ? styles.blankWrong : active ? styles.blankActive : ""}`} key={blank.id} onClick={() => onBlank(blank.id)} type="button">{response?.response.trim() || "　　　　"}</button>;
  })}</div>;
}

function VocabularyStep({ answers, lesson, onAnswer, onClear, onReveal, onSpeak, revealed }: {
  answers: Record<string,VocabularyResponse>;
  lesson: ReadingLesson;
  onAnswer: (key:string,value:VocabularyResponse) => void;
  onClear: (key:string) => void;
  onReveal:(id:string)=>void;
  onSpeak:(word:string)=>void;
  revealed:string[];
}) {
  const [activeByExercise,setActiveByExercise] = useState<Record<string,string|null>>({});
  const [gradedByExercise,setGradedByExercise] = useState<Record<string,boolean>>({});
  const chooseWord = (exercise:ReadingVocabularyExercise,word:string) => {
    const activeId = activeByExercise[exercise.id];
    const target = exercise.blanks.find((blank) => blank.id === activeId)
      ?? exercise.blanks.find((blank) => !answers[vocabularyResponseKey(exercise.id,blank.id)]?.response)
      ?? exercise.blanks[0];
    if (!target) return;
    if (exercise.type === "sentence_word_bank") {
      exercise.blanks.forEach((blank) => {
        const key = vocabularyResponseKey(exercise.id,blank.id);
        if (blank.id !== target.id && answers[key]?.baseWord === word) onClear(key);
      });
    }
    onAnswer(vocabularyResponseKey(exercise.id,target.id),{
      baseWord: word,
      response: exercise.type === "sentence_word_bank" ? word : "",
    });
    setGradedByExercise((current) => ({ ...current,[exercise.id]:false }));
    if (exercise.type === "sentence_word_bank") {
      const targetIndex = exercise.blanks.findIndex((blank) => blank.id === target.id);
      const next = exercise.blanks.slice(targetIndex + 1).find((blank) => !answers[vocabularyResponseKey(exercise.id,blank.id)]?.response);
      setActiveByExercise((current) => ({ ...current,[exercise.id]:next?.id ?? target.id }));
    } else setActiveByExercise((current) => ({ ...current,[exercise.id]:target.id }));
  };

  return <section className={styles.stepContent}>
    <header className={styles.sectionIntro}><small><MobileIcon name="sparkles-outline" size={16} /> ASOSIY SO‘ZLAR</small><h1>Matnda uchragan so‘zlarni jamlaymiz</h1><p>Ma’no va misolni ko‘rish uchun kartani bosing.</p></header>
    <div className={styles.vocabularyList}>{lesson.vocabulary.map((item,index) => <article className={styles.vocabularyCard} key={item.id} onClick={() => onReveal(item.id)}><span>{String(index + 1).padStart(2,"0")}</span><div><header><strong>{item.word}</strong><small>{item.pronunciation}</small>{localized(item.note) ? <i>{localized(item.note)}</i> : null}</header>{revealed.includes(item.id) ? <><p>{localized(item.meaning)}</p>{item.example.trim() ? <aside>{item.example}</aside> : null}</> : <small>Ma’nosini ko‘rish <MobileIcon name="chevron-down" size={16} /></small>}</div><button aria-label="Talaffuzni tinglash" onClick={(event) => { event.stopPropagation(); onSpeak(item.word); }} type="button"><MobileIcon name="volume-medium-outline" size={20} /></button></article>)}</div>
    {lesson.vocabularyExercises?.length ? <section className={styles.practice}>
      <header className={styles.practiceHeading}><span><MobileIcon name="pencil" size={19} /></span><div><small>LUG‘AT MASHQI</small><h2>O‘qigan so‘zlaringizni gapda ishlating</h2><p>Bo‘sh joyni bosing, keyin mos so‘zni tanlang.</p></div></header>
      {lesson.vocabularyExercises.map((exercise,exerciseIndex) => {
        const activeBlankId = activeByExercise[exercise.id] ?? null;
        const activeBlank = exercise.blanks.find((blank) => blank.id === activeBlankId);
        const activeResponse = activeBlank ? answers[vocabularyResponseKey(exercise.id,activeBlank.id)] : undefined;
        const graded = Boolean(gradedByExercise[exercise.id]);
        const complete = exercise.blanks.every((blank) => {
          const response = answers[vocabularyResponseKey(exercise.id,blank.id)];
          return response?.baseWord.trim() && response.response.trim();
        });
        const correctCount = exercise.blanks.filter((blank) => vocabularyAnswerIsCorrect(blank,answers[vocabularyResponseKey(exercise.id,blank.id)])).length;
        return <article className={styles.exercise} key={exercise.id}>
          <header className={styles.exerciseHeader}><span>{String(exerciseIndex + 1).padStart(2,"0")}</span><div><h3>{localized(exercise.title)}</h3><p>{localized(exercise.instruction)}</p></div></header>
          <section className={styles.wordBank}><small><MobileIcon name="albums-outline" size={15} /> SO‘ZLAR QUTISI</small><div>{exercise.wordBank.map((word) => {
            const selected = exercise.blanks.some((blank) => answers[vocabularyResponseKey(exercise.id,blank.id)]?.baseWord === word);
            return <button className={selected ? styles.wordSelected : ""} key={word} onClick={() => chooseWord(exercise,word)} type="button">{word}</button>;
          })}</div></section>
          <section className={styles.templateCard}><small><MobileIcon name="hand-left-outline" size={15} /> BO‘SH JOYNI TANLANG</small><ExerciseTemplate activeBlankId={activeBlankId} answers={answers} exercise={exercise} graded={graded} onBlank={(blankId) => setActiveByExercise((current) => ({ ...current,[exercise.id]:blankId }))} /></section>
          {exercise.type === "paragraph_conjugation" && activeBlank ? <section className={styles.conjugation}><header><strong>Gapga moslab o‘zgartiring</strong><button onClick={() => { onClear(vocabularyResponseKey(exercise.id,activeBlank.id)); setGradedByExercise((current) => ({ ...current,[exercise.id]:false })); }} type="button">Tanlovni bekor qilish</button></header><div><span>{activeResponse?.baseWord || "—"}</span><MobileIcon name="arrow-forward" size={17} /><input autoCorrect="off" onChange={(event) => { onAnswer(vocabularyResponseKey(exercise.id,activeBlank.id),{ baseWord:activeResponse?.baseWord ?? "",response:event.target.value }); setGradedByExercise((current) => ({ ...current,[exercise.id]:false })); }} placeholder="Mos shaklni koreyscha yozing" value={activeResponse?.response ?? ""} /></div></section> : null}
          {graded ? <section><div className={`${styles.scoreBanner} ${correctCount === exercise.blanks.length ? styles.scorePerfect : styles.scoreWrong}`}><MobileIcon name={correctCount === exercise.blanks.length ? "checkmark-circle" : "refresh-circle"} size={21} /><strong>{correctCount === exercise.blanks.length ? "Hammasi to‘g‘ri! So‘zlarning matndagi qo‘llanishini tushundingiz." : `${exercise.blanks.length} tadan ${correctCount} tasi to‘g‘ri`}</strong></div>{exercise.blanks.filter((blank) => !vocabularyAnswerIsCorrect(blank,answers[vocabularyResponseKey(exercise.id,blank.id)])).map((blank) => <div className={styles.feedback} key={blank.id}><strong>To‘g‘ri javob: {blank.answer}</strong><p>{localized(blank.explanation)}</p></div>)}</section> : null}
          <button className={styles.checkButton} disabled={!complete} onClick={() => setGradedByExercise((current) => ({ ...current,[exercise.id]:true }))} type="button">{graded ? "Qayta tekshirish" : "Tekshirish"}<MobileIcon name="arrow-forward-circle" size={20} /></button>
        </article>;
      })}
    </section> : null}
  </section>;
}

function GlossSheet({ gloss, loading, onClose, onSpeak, word }: { gloss:ReadingWordGloss|null; loading:boolean; onClose:()=>void; onSpeak:(word:string)=>void; word:string }) {
  return <div className={styles.modalBackdrop} onClick={onClose} role="presentation"><section className={styles.sheet} onClick={(event) => event.stopPropagation()}><i /><header><div><small>SO‘Z MA’NOSI</small><h2>{word}</h2></div><button aria-label="Yopish" onClick={onClose} type="button"><MobileIcon name="close" size={21} /></button></header>{loading ? <div className={styles.sheetLoading}><i className={styles.spinner} /> Ma’nosi qidirilmoqda...</div> : gloss ? <><p>{localized(gloss.meaning)}</p><dl><dt>Asosiy shakli</dt><dd>{gloss.lemma}</dd><dt>So‘z turkumi</dt><dd>{gloss.pos}</dd></dl>{gloss.note ? <aside>{localized(gloss.note)}</aside> : null}<button className={styles.sheetSpeak} onClick={() => onSpeak(gloss.word)} type="button"><MobileIcon name="volume-medium" size={19} /> Talaffuzni eshitish</button></> : <p>Bu so‘zning ma’nosi hali tayyor emas.</p>}</section></div>;
}

function LessonPicker({ current, lessons, onChoose, onClose }: { current:string; lessons:ReadingLessonSummary[]; onChoose:(item:ReadingLessonSummary)=>void; onClose:()=>void }) {
  return <div className={styles.modalBackdrop} onClick={onClose} role="presentation"><section className={`${styles.sheet} ${styles.picker}`} onClick={(event) => event.stopPropagation()}><i /><header><div><small>MADANIY O‘QISH</small><h2>Matnni tanlash</h2><p>{lessons.length}</p></div><button aria-label="Yopish" onClick={onClose} type="button"><MobileIcon name="close" size={21} /></button></header><div className={styles.pickerList}>{lessons.map((item) => <button className={item.code === current ? styles.selectedLesson : ""} key={item.code} onClick={() => onChoose(item)} type="button"><span>{String(item.unit).padStart(2,"0")}{item.progress?.completed ? <i><MobileIcon name="checkmark" size={11} /></i> : null}</span><div><strong>{item.title}</strong><small>{localized(item.topic)}</small></div><MobileIcon name={item.code === current ? "checkmark-circle" : "chevron-forward"} size={22} /></button>)}</div></section></div>;
}

function CompleteSheet({ onDone, onRetry, state }: { onDone:()=>void; onRetry:()=>void; state:{error:boolean;loading:boolean;result:CompleteReadingResult|null} }) {
  return <div className={styles.modalBackdrop} role="presentation"><section className={`${styles.sheet} ${styles.complete}`}><span className={styles.completeIcon}>{state.loading ? <i className={styles.spinner} /> : <MobileIcon name={state.error ? "cloud-offline-outline" : "checkmark"} size={34} />}</span>{state.loading ? <><h2>Saqlanmoqda...</h2><p>Natijangiz yozilmoqda.</p></> : state.error ? <><h2>Natijani saqlab bo‘lmadi</h2><div className={styles.completeActions}><button onClick={onRetry} type="button"><MobileIcon name="refresh" size={16} /> Qayta urinish</button><button onClick={onDone} type="button">Tayyor</button></div></> : state.result ? <><small>BUGUN BIR MATNNI TUGATDINGIZ</small><h2>O‘qib bo‘ldingiz!</h2>{state.result.repeat ? <p>Takroriy o‘qish uchun XP kamroq beriladi</p> : null}<strong className={styles.xp}>+{state.result.xpEarned} XP</strong><div className={styles.completeStats}><span><b>{state.result.quizCorrect}/{state.result.quizTotal}</b><small>Tushunish savollari</small></span><span><b>{state.result.progress.pronunciationCompleted ? "✓" : "—"}</b><small>Ovoz chiqarib o‘qish</small></span><span><b>{state.result.progress.writingSubmitted ? "✓" : "—"}</b><small>O‘z gapim</small></span></div>{!state.result.progress.pronunciationCompleted ? <p>Keyingi safar ovoz chiqarib o‘qib, ko‘proq XP oling.</p> : null}<button className={styles.sheetSpeak} onClick={onDone} type="button">Tayyor</button></> : null}</section></div>;
}

export function ReadingListeningScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request, updateUser, user } = useTelegramAuth();
  const parsedLevel = Number(params.get("level"));
  const level = Number.isInteger(parsedLevel) && parsedLevel >= 1 && parsedLevel <= 6 ? parsedLevel : 0;
  const premium = Boolean(user?.isSuper && (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()));
  const [lesson, setLesson] = useState<ReadingLesson | null>(null);
  const [lessons, setLessons] = useState<ReadingLessonSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [fontIndex, setFontIndex] = useState(1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [writing, setWriting] = useState("");
  const [showExample, setShowExample] = useState(false);
  const [translated, setTranslated] = useState<string[]>([]);
  const [writingTranslated, setWritingTranslated] = useState(false);
  const [revealedVocabulary, setRevealedVocabulary] = useState<string[]>([]);
  const [activeVocabularyId, setActiveVocabularyId] = useState<string | null>(null);
  const [glossWord, setGlossWord] = useState<string | null>(null);
  const [gloss, setGloss] = useState<ReadingWordGloss | null>(null);
  const [glossLoading, setGlossLoading] = useState(false);
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, { baseWord: string; response: string }>>({});
  const [completeState, setCompleteState] = useState<{ error: boolean; loading: boolean; result: CompleteReadingResult | null } | null>(null);
  const completeSaving = useRef(false);
  const speech = useKoreanSpeech(request);
  const [passageSpeaking, setPassageSpeaking] = useState(false);

  const passageText = useMemo(() => lesson?.passage.map((paragraph) => paragraph.segments?.length ? paragraph.segments.map((segment) => segment.text).join("") : paragraph.text).join("\n\n") ?? "", [lesson]);
  const passageWords = useMemo(() => passageText.split(/\s+/).map(cleanWord).filter(Boolean), [passageText]);
  const [readingIndex, setReadingIndex] = useState(0);
  const [failedWord, setFailedWord] = useState<number | null>(null);
  const [readingPhase, setReadingPhase] = useState<"assessing" | "complete" | "idle" | "recording" | "retry">("idle");
  const [readingError, setReadingError] = useState<string | null>(null);
  const readingActive = useRef(false);
  const readingStart = useRef<() => Promise<void>>(async () => undefined);
  const readingIndexRef = useRef(0);
  readingIndexRef.current = readingIndex;

  const recorder = useWebSpeechRecorder({
    onError: (code) => {
      readingActive.current = false;
      setReadingPhase("idle");
      setReadingError(code === "permission" ? "Bu qurilmada mikrofonli o‘qish mavjud emas." : code === "too_short" ? "Ovoz eshitilmadi. Yana o‘qib ko‘ring." : "Talaffuzni tekshirib bo‘lmadi. Yana urinib ko‘ring.");
    },
    onResult: async (wav) => {
      if (!lesson) return;
      setReadingPhase("assessing");
      const startIndex = readingIndexRef.current;
      try {
        const result = await assessReading(request, lesson.code, startIndex, Math.min(40, passageWords.length - startIndex), wav);
        if (result.status !== "success") {
          setReadingError(result.status === "no_speech" ? "Ovoz eshitilmadi. Yana o‘qib ko‘ring." : "Talaffuzni tekshirib bo‘lmadi. Yana urinib ko‘ring.");
          setReadingPhase("retry");
          readingActive.current = false;
          return;
        }
        setReadingIndex(result.nextWordIndex);
        setFailedWord(result.failedWordIndex);
        setReadingError(null);
        if (result.complete) {
          readingActive.current = false;
          setReadingPhase("complete");
          window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
        } else if (result.failedWordIndex !== null) {
          readingActive.current = false;
          setReadingPhase("retry");
        } else if (readingActive.current) {
          setReadingPhase("idle");
          window.setTimeout(() => void readingStart.current(), 250);
        }
      } catch {
        readingActive.current = false;
        setReadingPhase("retry");
        setReadingError("Talaffuzni tekshirib bo‘lmadi. Yana urinib ko‘ring.");
      }
    },
  });
  const cancelRecording = recorder.cancel;
  const prewarmSpeech = speech.prewarm;
  const stopSpeech = speech.stop;
  const stopAllSpeech = useCallback(() => {
    stopSpeech();
    setPassageSpeaking(false);
  }, [stopSpeech]);

  const startReading = useCallback(async () => {
    if (!lesson || !passageWords.length) return;
    stopAllSpeech();
    readingActive.current = true;
    setReadingError(null);
    setFailedWord(null);
    const started = await recorder.start();
    if (started) setReadingPhase("recording");
    else readingActive.current = false;
  }, [lesson, passageWords.length, recorder, stopAllSpeech]);
  readingStart.current = startReading;

  const stopReading = useCallback(() => {
    readingActive.current = false;
    recorder.cancel();
    setReadingPhase((current) => current === "complete" ? current : "idle");
  }, [recorder]);

  const resetLesson = useCallback(() => {
    stopAllSpeech(); stopReading(); setStep(0); setAnswers({}); setWriting(""); setShowExample(false);
    setTranslated([]); setWritingTranslated(false); setRevealedVocabulary([]); setActiveVocabularyId(null);
    setExerciseAnswers({}); setReadingIndex(0); setFailedWord(null); setReadingPhase("idle"); setReadingError(null);
  }, [stopAllSpeech, stopReading]);

  useEffect(() => {
    if (!premium || !level) return;
    let active = true;
    setLoading(true);
    void listReadingLessons(request, level).then(async (catalog) => {
      if (!active) return;
      setLessons(catalog.items);
      const first = catalog.items[0];
      if (!first) throw new Error("EMPTY");
      const detail = await getReadingLesson(request, first.code);
      if (active) setLesson(detail);
    }).catch(() => { if (active) router.replace("/reading-listening-levels"); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [level, premium, request, router]);

  useEffect(() => () => { stopSpeech(); cancelRecording(); }, [cancelRecording, stopSpeech]);

  useEffect(() => {
    if (premium && !level) router.replace("/reading-listening-levels");
  }, [level, premium, router]);

  useEffect(() => {
    if (passageText) prewarmSpeech([passageText]);
  }, [passageText, prewarmSpeech]);

  const chooseLesson = async (item: ReadingLessonSummary) => {
    if (item.code === lesson?.code || lessonLoading) { setPickerOpen(false); return; }
    setPickerOpen(false); setLessonLoading(true); resetLesson();
    try { setLesson(await getReadingLesson(request, item.code)); window.scrollTo({ top: 0 }); }
    catch { setPickerOpen(true); }
    finally { setLessonLoading(false); }
  };
  const selectStep = (index: number) => { stopAllSpeech(); stopReading(); setStep(index); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const toggleSpeech = () => {
    if (passageSpeaking) { stopAllSpeech(); return; }
    stopReading();
    setPassageSpeaking(true);
    speech.speak(passageText, { onEnd: () => setPassageSpeaking(false) });
  };
  const speakWord = (word: string) => {
    setPassageSpeaking(false);
    speech.speak(word);
  };
  const toggleReading = () => {
    if (readingActive.current || recorder.recording || readingPhase === "assessing") { stopReading(); return; }
    if (readingPhase === "complete") setReadingIndex(0);
    void startReading();
  };
  const openGloss = async (word: string) => {
    if (!lesson || readingActive.current) return;
    const clean = word.trim();
    if (!cleanWord(clean)) return;
    setGlossWord(clean);
    const local = lesson.glossary?.find((item) => cleanWord(item.word) === cleanWord(clean));
    if (local) { setGloss(local); setGlossLoading(false); return; }
    setGloss(null); setGlossLoading(true);
    try { setGloss((await getReadingGloss(request, lesson.code, clean)).gloss); }
    catch { setGloss(null); }
    finally { setGlossLoading(false); }
  };

  const submit = async () => {
    if (!lesson || completeSaving.current) return;
    completeSaving.current = true;
    setCompleteState({ loading: true, error: false, result: null }); stopReading(); stopAllSpeech();
    try {
      const result = await completeReadingLesson(request, lesson.code, {
        answers: Object.entries(answers).map(([questionId, choiceIndex]) => ({ questionId, choiceIndex })),
        exerciseAnswers: Object.entries(exerciseAnswers).map(([key, value]) => {
          const [exerciseId = "", blankId = ""] = key.split(":");
          return { exerciseId, blankId, ...value };
        }),
        writingText: writing.trim() || undefined,
      });
      setCompleteState({ loading: false, error: false, result });
      setLessons((items) => items.map((item) => item.code === lesson.code ? { ...item, progress: result.progress } : item));
      if (result.totalXP !== null) updateUser({ totalXP: result.totalXP });
    } catch { setCompleteState({ loading: false, error: true, result: null }); }
    finally { completeSaving.current = false; }
  };

  if (!premium) return <main className={styles.screen}><section className={styles.center}><span className={styles.centerIcon}><MobileIcon name="lock-closed" size={34} /></span><h1>Bu mashq KORIO Premium bilan ochiladi</h1><button onClick={() => router.replace("/premium")} type="button">KORIO Premium</button></section></main>;
  if (!level) return null;
  if (loading || !lesson) return <main className={styles.screen}><section className={styles.center}><div className={styles.spinner} /><p>Matn tayyorlanmoqda...</p></section></main>;

  const activeVocabulary = lesson.vocabulary.find((item) => item.id === activeVocabularyId);
  const readingStatus = readingError || (readingPhase === "complete" ? "Matnni oxirigacha to‘g‘ri o‘qidingiz" : readingPhase === "retry" ? "Qizil so‘zdan yana o‘qing" : readingActive.current ? "To‘xtamasdan davom eting" : "Mikrofonni yoqib o‘qing — o‘qilgan joylar matnda belgilanadi.");

  return (
    <main className={styles.screen}>
      <header className={styles.header}><button aria-label="Yopish" onClick={() => router.back()} type="button"><MobileIcon name="close" size={23} /></button><div><small>Madaniy o‘qish · {lesson.level}-daraja</small><strong>O‘qish · tinglash</strong></div><span>{step + 1} <small>/ 4</small></span></header>
      <div className={styles.progress}><i style={{ width: `${(step + 1) * 25}%` }} /></div>
      <nav className={styles.steps}>{STEPS.map((item,index) => <button className={index === step ? styles.activeStep : ""} key={item.label} onClick={() => selectStep(index)} type="button"><MobileIcon name={index < step ? "checkmark" : item.icon} size={15} /> {item.label}</button>)}</nav>
      <div className={styles.scroll}>
        <button className={styles.lessonSelector} onClick={() => setPickerOpen(true)} type="button"><span><MobileIcon name="library-outline" size={21} /></span><div><small>Matnni tanlash</small><strong>{String(lesson.unit).padStart(2,"0")}. {lesson.title}</strong></div>{lessonLoading ? <i className={styles.spinnerSmall} /> : <span><MobileIcon name="chevron-down" size={18} /></span>}</button>

        {step === 0 ? <ReadStep activeVocabulary={activeVocabulary} failedWord={failedWord} fontIndex={fontIndex} lesson={lesson} onFont={setFontIndex} onGloss={(word) => void openGloss(word)} onSelectVocabulary={setActiveVocabularyId} onSpeakVocabulary={speakWord} passageWords={passageWords} readingIndex={readingIndex} readingPhase={readingPhase} readingStatus={readingStatus} speech={{ progress: speech.progress, speaking: passageSpeaking }} toggleReading={toggleReading} toggleSpeech={toggleSpeech} /> : null}
        {step === 1 ? <CheckStep answers={answers} lesson={lesson} onAnswer={(id,choice) => setAnswers((value) => ({ ...value, [id]: choice }))} onTranslate={(id) => setTranslated((value) => value.includes(id) ? value.filter((item) => item !== id) : [...value,id])} translated={translated} /> : null}
        {step === 2 ? <WriteStep lesson={lesson} onExample={() => setShowExample((value) => !value)} onTranslation={() => setWritingTranslated((value) => !value)} onWriting={setWriting} showExample={showExample} translated={writingTranslated} writing={writing} /> : null}
        {step === 3 ? <VocabularyStep answers={exerciseAnswers} lesson={lesson} onAnswer={(key,value) => setExerciseAnswers((current) => ({ ...current, [key]: value }))} onClear={(key) => setExerciseAnswers((current) => { if (!(key in current)) return current; const next={...current}; delete next[key]; return next; })} onReveal={(id) => setRevealedVocabulary((value) => value.includes(id) ? value.filter((item) => item !== id) : [...value,id])} onSpeak={speakWord} revealed={revealedVocabulary} /> : null}

        <button className={styles.continue} onClick={() => step < 3 ? selectStep(step + 1) : void submit()} type="button">{step < 3 ? "Keyingi bosqich" : "Darsni tugatish"}<span><MobileIcon name={step < 3 ? "arrow-forward" : "checkmark"} size={19} /></span></button>
      </div>

      {glossWord ? <GlossSheet gloss={gloss} loading={glossLoading} onClose={() => { setGlossWord(null); setGloss(null); }} onSpeak={speakWord} word={glossWord} /> : null}
      {pickerOpen ? <LessonPicker current={lesson.code} lessons={lessons} onChoose={(item) => void chooseLesson(item)} onClose={() => setPickerOpen(false)} /> : null}
      {completeState ? <CompleteSheet state={completeState} onDone={() => router.replace("/reading-listening-levels")} onRetry={() => void submit()} /> : null}
    </main>
  );
}
