"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import {
  getTopikAttempt,
  getTopikResult,
  getTopikSession,
  revealTopikSolution,
  saveTopikAnswers,
  startTopikAttempt,
  submitTopikAttempt,
} from "../api/topik";
import {
  flattenTopikQuestions,
  topikUzText,
  type TopikAttempt,
  type TopikAttemptMode,
  type TopikAttemptResult,
  type TopikExamSession,
  type TopikQuestionWithGroup,
  type TopikSaveAnswer,
  type TopikSolution,
} from "../model/topik";
import { SheetModal, StimulusCard, TopikTextBlocks } from "./topik-exam-parts";
import styles from "./topik-writing-screen.module.css";

type WritingResponses = Record<string, Record<string, string>>;

const WRITING_TYPES: Record<string, string> = {
  writing_argumentative_essay: "Mavzuli insho",
  writing_data_description: "Ma’lumotni tasvirlash",
  writing_sentence_completion: "Gapni tugatish",
};

function formatTime(totalSeconds: number) {
  return `${String(Math.floor(totalSeconds / 60)).padStart(2, "0")}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

function responsesFromAttempt(attempt: TopikAttempt): WritingResponses {
  return Object.fromEntries(attempt.answers.map((answer) => [answer.questionId, Object.fromEntries((answer.writtenResponses ?? []).map((item) => [item.fieldKey, item.text]))]));
}

function createSaveAnswer(question: TopikQuestionWithGroup, responses: Record<string, string>): TopikSaveAnswer | null {
  const writtenResponses = (question.writingConfig?.fields ?? []).map((field) => ({ fieldKey: field.key, text: responses[field.key] ?? "" }));
  if (!writtenResponses.some((item) => item.text.trim())) return null;
  return { questionId: question.id, writtenResponses, durationMs: 0, answeredAt: new Date().toISOString() };
}

export function TopikWritingScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request, user } = useTelegramAuth();
  const examCode = params.get("examCode") ?? "";
  const reviewAttemptId = params.get("reviewAttemptId") ?? "";
  const parsedQuestion = Number(params.get("questionNumber"));
  const selectedQuestionNumber = parsedQuestion >= 51 && parsedQuestion <= 54 ? parsedQuestion : null;
  const singlePractice = Boolean(selectedQuestionNumber && !reviewAttemptId);
  const mode: TopikAttemptMode = singlePractice ? "guided" : params.get("mode") === "mock_exam" ? "mock_exam" : "guided";
  const premium = Boolean(user?.isSuper && (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()));
  const contentRef = useRef<HTMLDivElement>(null);
  const [session, setSession] = useState<TopikExamSession | null>(null);
  const [attempt, setAttempt] = useState<TopikAttempt | null>(null);
  const [result, setResult] = useState<TopikAttemptResult | null>(null);
  const [practiceSolution, setPracticeSolution] = useState<TopikSolution | null>(null);
  const [responses, setResponses] = useState<WritingResponses>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startedAt, setStartedAt] = useState(Date.now());
  const [now, setNow] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const questions = useMemo(() => flattenTopikQuestions(session), [session]);
  const question = questions[currentIndex];
  const submittedReview = Boolean(result);
  const solutionVisible = Boolean(result || practiceSolution);
  const showTimer = mode === "mock_exam" && !submittedReview && !singlePractice;
  const elapsedSeconds = result ? result.elapsedSeconds : showTimer ? Math.max(0, Math.floor((now - startedAt) / 1000)) : 0;
  const answeredCount = questions.filter((item) => (item.writingConfig?.fields ?? []).every((field) => (responses[item.id]?.[field.key] ?? "").trim())).length;
  const currentSolution = practiceSolution ?? result?.questions.find((item) => item.questionId === question?.id)?.solution;
  const currentAnswered = Boolean(question && (question.writingConfig?.fields.length ?? 0) > 0 && question.writingConfig?.fields.every((field) => (responses[question.id]?.[field.key] ?? "").trim()));

  const load = useCallback(async () => {
    if (!premium || !examCode) { setLoading(false); setErrorOpen(true); return; }
    setLoading(true);
    try {
      setPracticeSolution(null);
      if (reviewAttemptId) {
        const [nextSession, nextAttempt, nextResult] = await Promise.all([
          getTopikSession(request, examCode, 51, 54),
          getTopikAttempt(request, reviewAttemptId),
          getTopikResult(request, reviewAttemptId),
        ]);
        setSession(nextSession); setAttempt(nextAttempt); setResult(nextResult); setResponses(responsesFromAttempt(nextAttempt)); setStartedAt(Date.now() - nextAttempt.elapsedSeconds * 1000);
      } else {
        const from = selectedQuestionNumber ?? 51;
        const to = selectedQuestionNumber ?? 54;
        const [nextSession, nextAttempt] = await Promise.all([
          getTopikSession(request, examCode, from, to),
          startTopikAttempt(request, examCode, mode, mode !== "mock_exam"),
        ]);
        const loadedQuestions = flattenTopikQuestions(nextSession);
        const resumed = loadedQuestions.findIndex((item) => item.number === nextAttempt.currentQuestionNumber);
        setSession(nextSession); setAttempt(nextAttempt); setResult(null); setResponses(responsesFromAttempt(nextAttempt)); setCurrentIndex(singlePractice ? 0 : Math.max(0, resumed)); setStartedAt(mode === "mock_exam" ? Date.now() - nextAttempt.elapsedSeconds * 1000 : Date.now());
      }
    } catch { setErrorOpen(true); }
    finally { setLoading(false); }
  }, [examCode, mode, premium, request, reviewAttemptId, selectedQuestionNumber, singlePractice]);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => { if (!showTimer) return; const timer = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(timer); }, [showTimer]);
  useEffect(() => { contentRef.current?.scrollTo({ top: 0, behavior: "instant" }); }, [currentIndex]);

  const updateResponse = (fieldKey: string, text: string) => {
    if (!question || submittedReview) return;
    setResponses((current) => ({ ...current, [question.id]: { ...(current[question.id] ?? {}), [fieldKey]: text } }));
  };

  const save = useCallback(async (nextIndex = currentIndex) => {
    if (!attempt || submittedReview || !questions.length) return;
    const answers = questions.map((item) => createSaveAnswer(item, responses[item.id] ?? {})).filter((item): item is TopikSaveAnswer => Boolean(item));
    if (!answers.length) return;
    setSaving(true);
    try { await saveTopikAnswers(request, attempt.id, answers, questions[nextIndex]?.number ?? selectedQuestionNumber ?? 51, mode === "mock_exam" ? elapsedSeconds : 0); }
    finally { setSaving(false); }
  }, [attempt, currentIndex, elapsedSeconds, mode, questions, request, responses, selectedQuestionNumber, submittedReview]);

  const moveTo = async (index: number) => {
    try { if (!submittedReview) await save(index); setCurrentIndex(Math.max(0, Math.min(questions.length - 1, index))); }
    catch { setErrorOpen(true); }
  };
  const leave = async () => { try { await save(currentIndex); router.back(); } catch { setErrorOpen(true); } };
  const submit = async () => {
    if (!attempt) return;
    setSubmitting(true);
    try { await save(currentIndex); await submitTopikAttempt(request, attempt.id); const nextResult = await getTopikResult(request, attempt.id); setResult(nextResult); setSubmitOpen(false); setCurrentIndex(0); }
    catch { setSubmitOpen(false); setErrorOpen(true); }
    finally { setSubmitting(false); }
  };
  const revealPractice = async () => {
    if (!attempt || !question || !currentAnswered) return;
    setSubmitting(true);
    try { await save(currentIndex); const revealed = await revealTopikSolution(request, attempt.id, question.id); setPracticeSolution(revealed.solution); }
    catch { setErrorOpen(true); }
    finally { setSubmitting(false); }
  };

  if (!premium) return <main className={styles.centered}><MobileIcon name="lock-closed" size={36} /><h1>TOPIK tayyorgarligi — Premium</h1><button onClick={() => router.replace("/premium")} type="button">Premiumni ko‘rish</button></main>;
  if (loading) return <main className={styles.centered}><i className={styles.spinner} /><p>Imtihon tayyorlanmoqda…</p></main>;
  if (!question || !attempt) return <main className={styles.centered}><MobileIcon name="document-text-outline" size={38} /><h1>Yozish imtihonini yuklab bo‘lmadi.</h1><button onClick={() => void load()} type="button">Qayta urinish</button></main>;

  return <main className={styles.screen}>
    <header className={styles.header}><button aria-label="Orqaga" onClick={() => submittedReview ? router.back() : setExitOpen(true)} type="button"><MobileIcon name="chevron-back" size={24} /></button><div><small>{solutionVisible ? "O‘ZINI TEKSHIRISH" : "TOPIK II YOZISH"}</small><b>{question.number} / 54</b></div><span><MobileIcon name={showTimer ? "time-outline" : "book-outline"} size={14} />{showTimer ? formatTime(elapsedSeconds) : singlePractice ? "Tur bo‘yicha mashq" : solutionVisible ? "Izohli takrorlash" : "Izohli o‘rganish"}</span></header>
    <div className={styles.progress}><i style={{ width: `${(currentIndex + 1) / questions.length * 100}%` }} /></div>
    {solutionVisible ? <section className={styles.completeBanner}><span><MobileIcon name="checkmark" size={22} /></span><div><b>{practiceSolution ? "Namunaviy javob ochildi" : "Yozish javoblari yakunlandi"}</b><p>{practiceSolution ? "Javobingiz bilan solishtirib, tuzilma va katak qoidalarini tekshiring." : "Namunaviy javob va baholash mezonlari bilan o‘zingizni tekshiring."}</p></div></section> : null}
    <div className={styles.content} ref={contentRef}><WritingCard onChange={updateResponse} question={question} readOnly={submittedReview} responses={responses[question.id] ?? {}} showRecommendedTime={showTimer} solution={currentSolution} /></div>
    <footer className={styles.footer}>
      {!singlePractice ? <button disabled={currentIndex === 0 || saving} onClick={() => void moveTo(currentIndex - 1)} type="button"><MobileIcon name="arrow-back" size={18} />Oldingi</button> : null}
      {currentIndex < questions.length - 1 ? <button className={styles.primary} disabled={saving} onClick={() => void moveTo(currentIndex + 1)} type="button"><MobileIcon name="arrow-forward" size={18} />Keyingi</button> : singlePractice ? practiceSolution ? <button className={styles.primary} disabled={saving} onClick={() => void leave()} type="button"><MobileIcon name="grid-outline" size={18} />Savol turlariga qaytish</button> : <button className={styles.primary} disabled={!currentAnswered || saving || submitting} onClick={() => void revealPractice()} type="button"><MobileIcon name="eye-outline" size={18} />{currentAnswered ? "Namuna va izohni ko‘rish" : "Avval javob yozing"}</button> : submittedReview ? <button className={styles.primary} onClick={() => router.back()} type="button"><MobileIcon name="albums-outline" size={18} />Imtihonlar ro‘yxatiga qaytish</button> : <button className={styles.primary} disabled={saving} onClick={() => setSubmitOpen(true)} type="button"><MobileIcon name="send" size={17} />Javoblarni yuborish</button>}
    </footer>

    <SheetModal onClose={() => setExitOpen(false)} visible={exitOpen}><h2>Hozircha shu yerda to‘xtaysizmi?</h2><p>Hozirgacha tanlagan javoblaringizni xavfsiz saqlaymiz.</p><ModalProgress answered={answeredCount} total={questions.length} /><button className={styles.modalPrimary} onClick={() => setExitOpen(false)} type="button">Davom etish</button><button className={styles.modalDanger} onClick={() => void leave()} type="button"><MobileIcon name="exit-outline" size={18} />Saqlash va chiqish</button></SheetModal>
    <SheetModal onClose={() => !submitting && setSubmitOpen(false)} visible={submitOpen}><h2>Javoblarni yuborasizmi?</h2><p>Yuborilgandan keyin javoblarni o‘zgartirib bo‘lmaydi.</p><ModalProgress answered={answeredCount} total={questions.length} /><button className={styles.modalPrimary} disabled={submitting} onClick={() => void submit()} type="button"><MobileIcon name="send" size={18} />Yuborish</button><button className={styles.modalSecondary} disabled={submitting} onClick={() => setSubmitOpen(false)} type="button">Bekor qilish</button></SheetModal>
    <SheetModal onClose={() => setErrorOpen(false)} visible={errorOpen}><div className={styles.errorVisual}><MobileIcon name="cloud-offline-outline" size={31} /></div><h2>Yozish imtihonini yuklab bo‘lmadi.</h2><p>Internet aloqasini tekshirib, qayta urinib ko‘ring.</p><button className={styles.modalPrimary} onClick={() => { setErrorOpen(false); void load(); }} type="button"><MobileIcon name="refresh" size={18} />Qayta urinish</button></SheetModal>
  </main>;
}

function WritingCard({ question, responses, readOnly, showRecommendedTime, solution, onChange }: { question: TopikQuestionWithGroup; responses: Record<string, string>; readOnly: boolean; showRecommendedTime: boolean; solution?: TopikSolution; onChange: (key: string, text: string) => void }) {
  const fields = question.writingConfig?.fields ?? [];
  return <article className={styles.card}>
    <header className={styles.cardHeader}><span>{question.number}</span><div><small>TOPIK II YOZISH</small><b>{WRITING_TYPES[question.type] ?? question.type}</b></div><em>{question.points}P</em></header>
    <section className={styles.instruction}><TopikTextBlocks blocks={question.group.instruction} /></section>
    {question.stimulus ? <div className={styles.stimulus}><StimulusCard stimulus={question.stimulus} /></div> : null}
    {question.writingConfig ? <section className={styles.guide}><span><MobileIcon name="sparkles" size={17} /></span><div><header><b>Yozish qo‘llanmasi</b>{showRecommendedTime ? <small>Tavsiya: {question.writingConfig.recommendedMinutes} daqiqa</small> : null}</header><p>{topikUzText(question.writingConfig.guide)}</p></div></section> : null}
    <div className={styles.responseStack}>{fields.map((field) => { const value = responses[field.key] ?? ""; const remaining = Math.max(0, field.minCharacters - value.length); const essay = field.multiline && field.maxCharacters > 150; return <section className={styles.responseField} key={field.key}><header><b>{field.label} javobi</b><span className={!remaining ? styles.completeCount : ""}>{value.length} / {field.maxCharacters} belgi</span></header>{essay ? <ManuscriptInput label={`${field.label} javobi`} maxLength={field.maxCharacters} onChange={(text) => onChange(field.key, text)} readOnly={readOnly} value={value} /> : <textarea aria-label={`${field.label} javobi`} className={field.multiline ? styles.multiline : ""} maxLength={field.maxCharacters} onChange={(event) => onChange(field.key, event.target.value)} placeholder="Mazmunga mos gapni kiriting." readOnly={readOnly} value={value} />}{!readOnly && remaining > 0 ? <small className={styles.minimum}><MobileIcon name="information-circle-outline" size={14} />Yana kamida {remaining} belgi yozing.</small> : null}</section>; })}</div>
    {solution ? <section className={styles.review}><header><span><MobileIcon name="checkmark-done" size={19} /></span><div><small>O‘ZINI TEKSHIRISH</small><b>Namunaviy javob</b></div></header><p>{solution.sampleAnswer || "Javob yozilmagan."}</p>{solution.rubric?.length ? <div><h3>Baholash mezonlari</h3>{solution.rubric.map((item, index) => <span key={index}><b>{index + 1}</b>{topikUzText(item)}</span>)}</div> : null}</section> : null}
  </article>;
}

function manuscriptCells(value: string, maxLength: number) {
  const cells = Array.from({ length: maxLength }, () => "");
  let cursor = 0;
  const chars = [...value];
  for (let index = 0; index < chars.length && cursor < maxLength; index += 1) {
    const char = chars[index];
    if (char === undefined) continue;
    if (char === "\n") {
      const column = cursor % 20;
      cursor += column ? 20 - column : 0;
      continue;
    }
    const next = chars[index + 1];
    if (/\d/.test(char) && next && /\d/.test(next)) {
      cells[cursor] = `${char}${next}`;
      index += 1;
    } else {
      cells[cursor] = char;
    }
    cursor += 1;
  }
  return cells;
}

function ManuscriptInput({ label, maxLength, readOnly, value, onChange }: { label: string; maxLength: number; readOnly: boolean; value: string; onChange: (text: string) => void }) {
  const [focused, setFocused] = useState(false); const inputRef = useRef<HTMLTextAreaElement>(null); const cells = useMemo(() => manuscriptCells(value, maxLength), [maxLength, value]); const rows = Math.ceil(maxLength / 20);
  return <div className={styles.manuscript}><section className={styles.rules}><header><span><MobileIcon name="grid-outline" size={16} /></span><div><b>Imtihon yozuv kataklari</b><p>Matn har satrda 20 katakdan iborat qog‘ozga avtomatik joylanadi.</p></div></header>{["Yangi abzatsni birinchi katakni bo‘sh qoldirib boshlang.","Har bir harf va tinish belgisi uchun bitta katak ishlating.","Tinish belgisi yangi satr boshiga tushsa, uni oldingi satr oxirgi harfi bilan joylang.","Arab raqamlarini har bir katakka ikkitadan yozing.","Abzatslar orasida bo‘sh satr qoldirmang va oraliqlarga rioya qiling."].map((rule) => <p key={rule}><i />{rule}</p>)}</section><section className={`${styles.paperFrame} ${focused ? styles.paperFocused : ""}`} onClick={() => inputRef.current?.focus()}><header><span><i />{focused ? "Kataklarga yozilmoqda" : "Yozish uchun katakni bosing"}</span><small>Har satrda 20 katak</small></header><div className={styles.paper}>{Array.from({ length: rows }, (_, row) => <div className={styles.paperRow} key={row}><div>{Array.from({ length: 20 }, (_, column) => { const index = row * 20 + column; return <span className={cells[index]?.length === 2 ? styles.compactCell : ""} key={index}>{cells[index]}</span>; })}</div><small>{(row + 1) * 20 % 100 === 0 ? (row + 1) * 20 : ""}</small></div>)}</div>{!readOnly ? <textarea aria-label={label} maxLength={maxLength} onBlur={() => setFocused(false)} onChange={(event) => onChange(event.target.value)} onFocus={() => setFocused(true)} ref={inputRef} value={value} /> : null}</section></div>;
}

function ModalProgress({ answered, total }: { answered: number; total: number }) { const percent = total ? Math.round(answered / total * 100) : 0; return <section className={styles.modalProgress}><header><b>Javoblar {answered}/{total}</b><span>{percent}%</span></header><div><i style={{ width: `${percent}%` }} /></div></section>; }
