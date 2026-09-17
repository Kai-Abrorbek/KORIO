"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import {
  getTopikRecipePractice,
  getTopikRecipePracticeSolutions,
} from "../api/topik";
import { useTopikListeningPlayback } from "../browser/use-topik-listening-playback";
import { topikUzText, type TopikRecipeQuestion } from "../model/topik";
import { ChoiceList, StimulusCard, TopikTextBlocks } from "./topik-exam-parts";
import styles from "./topik-practice-screen.module.css";

type Phase = "solving" | "result";

export function TopikPracticeScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupCode = searchParams.get("groupCode") ?? "";
  const { request } = useTelegramAuth();
  const [practiceSet, setPracticeSet] = useState<Awaited<ReturnType<typeof getTopikRecipePractice>> | null>(null);
  const [solutions, setSolutions] = useState<Awaited<ReturnType<typeof getTopikRecipePracticeSolutions>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [phase, setPhase] = useState<Phase>("solving");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const listening = useTopikListeningPlayback(request);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    if (!groupCode) {
      setPracticeSet(null);
      setError(true);
      setLoading(false);
      return;
    }
    try {
      setPracticeSet(await getTopikRecipePractice(request, groupCode));
    } catch {
      setPracticeSet(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [groupCode, request]);

  useEffect(() => {
    void load();
  }, [load]);

  const total = practiceSet?.questions.length ?? 0;
  const answeredCount = useMemo(
    () => (practiceSet?.questions ?? []).filter((question) => {
      if (question.responseType !== "written") return Boolean(answers[question.id]);
      const fields = question.writingConfig?.fields ?? [];
      return fields.length > 0 && fields.every((field) => {
        const answer = writtenAnswers[`${question.id}:${field.key}`] ?? "";
        return answer.trim().length >= field.minCharacters;
      });
    }).length,
    [answers, practiceSet, writtenAnswers],
  );
  const allAnswered = total > 0 && answeredCount === total;
  const writtenOnly = total > 0 && (practiceSet?.questions ?? []).every((question) => question.responseType === "written");
  const solutionById = useMemo(() => new Map(solutions.map((solution) => [solution.id, solution])), [solutions]);
  const correctCount = useMemo(() => {
    if (phase !== "result") return 0;
    return (practiceSet?.questions ?? []).reduce((count, question) => {
      const answerKey = solutionById.get(question.id)?.correctChoiceKey;
      return answerKey && answers[question.id] === answerKey ? count + 1 : count;
    }, 0);
  }, [answers, phase, practiceSet, solutionById]);

  const playAudio = (question: TopikRecipeQuestion) => {
    if (listening.activeKey === question.id && listening.status === "playing") {
      listening.stop();
      return;
    }
    if (!question.audio?.transcript.length) return;
    listening.play({
      key: question.id,
      audioUrl: question.audio.audioUrl,
      transcript: question.audio.transcript,
      questionNumber: question.number,
      fallbackToSpeech: question.audio.speechFallback,
    });
  };

  const submit = async () => {
    if (!allAnswered || submitting) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      setSolutions(await getTopikRecipePracticeSolutions(request, groupCode));
      setPhase("result");
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <main className={styles.centered}><i className={styles.spinner} /></main>;

  if (error || !practiceSet) {
    return (
      <main className={styles.centered}>
        <MobileIcon name="cloud-offline-outline" size={32} />
        <h1>Imtihon variantlarini yuklab bo‘lmadi.</h1>
        <div className={styles.errorActions}>
          <button className={styles.mutedButton} onClick={() => router.back()} type="button">Orqaga</button>
          <button onClick={() => void load()} type="button">Qayta urinish</button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <button aria-label="Orqaga" onClick={() => router.back()} type="button"><MobileIcon name="chevron-back" size={24} /></button>
        <div><small>{topikUzText(practiceSet.label)}</small><h1>Taxminiy savollarni yechish</h1></div>
        <b>{phase === "result" && !writtenOnly ? correctCount : answeredCount}/{total}</b>
      </header>
      <div className={styles.progressTrack}><i style={{ width: `${total ? (answeredCount / total) * 100 : 0}%` }} /></div>

      <div className={styles.scroll}>
        {phase === "result" ? (
          <section className={styles.resultCard}>
            <strong>{writtenOnly ? answeredCount : correctCount} / {total}</strong>
            <span>{writtenOnly ? "Yozib tugatilgan savollar" : "To‘g‘ri javoblar"}</span>
          </section>
        ) : null}

        {practiceSet.questions.map((question, index) => {
          const picked = answers[question.id];
          const entry = solutionById.get(question.id);
          const answerKey = entry?.correctChoiceKey;
          const solution = entry?.solution;
          const graded = phase === "result" && Boolean(answerKey);
          const playing = listening.activeKey === question.id && listening.status === "playing";
          return (
            <article className={styles.questionCard} key={question.id}>
              {question.stimulus ? <div className={styles.stimulus}><StimulusCard stimulus={question.stimulus} /></div> : null}
              <div className={styles.questionHead}><b>{index + 1}.</b><TopikTextBlocks blocks={question.prompt} /></div>
              {question.audio?.transcript.length ? (
                <section className={styles.audioCard}>
                  <button onClick={() => playAudio(question)} type="button">
                    <MobileIcon name={playing ? "stop" : "play"} size={17} />
                    {playing ? "Tinglashni to‘xtatish" : "Dialogni tinglash"}
                  </button>
                  {phase === "result" ? (
                    <div className={styles.transcript}>
                      {question.audio.transcript.map((line, lineIndex) => (
                        <p key={`${question.id}-line-${lineIndex}`}>{line.speaker ? <b>{line.speaker}</b> : null}<span>{line.text}</span></p>
                      ))}
                    </div>
                  ) : null}
                </section>
              ) : null}

              {question.responseType === "written" ? (
                <div className={styles.writingStack}>
                  {question.writingConfig ? <p className={styles.writingGuide}>{topikUzText(question.writingConfig.guide)}</p> : null}
                  {(question.writingConfig?.fields ?? []).map((field) => {
                    const key = `${question.id}:${field.key}`;
                    const value = writtenAnswers[key] ?? "";
                    return (
                      <label className={styles.writingField} key={key}>
                        <span><b>{field.label}</b><small>{value.length}/{field.maxCharacters}</small></span>
                        {field.multiline ? (
                          <textarea disabled={phase === "result"} maxLength={field.maxCharacters} onChange={(event) => setWrittenAnswers((current) => ({ ...current, [key]: event.target.value }))} placeholder="Javobingizni yozing." value={value} />
                        ) : (
                          <input disabled={phase === "result"} maxLength={field.maxCharacters} onChange={(event) => setWrittenAnswers((current) => ({ ...current, [key]: event.target.value }))} placeholder="Javobingizni yozing." value={value} />
                        )}
                        {phase === "solving" && value.trim().length < field.minCharacters ? <small>Kamida {field.minCharacters} ta belgi yozing.</small> : null}
                      </label>
                    );
                  })}
                  {phase === "result" && solution?.sampleAnswer ? (
                    <section className={styles.sampleCard}>
                      <strong>Namunaviy javob</strong>
                      <p>{solution.sampleAnswer}</p>
                      {(solution.rubric ?? []).map((item, rubricIndex) => <small key={`${question.id}-rubric-${rubricIndex}`}>{rubricIndex + 1}. {topikUzText(item)}</small>)}
                    </section>
                  ) : null}
                </div>
              ) : (
                <div className={styles.choices}>
                  <ChoiceList
                    choices={question.choices}
                    correctChoiceKey={graded ? answerKey : undefined}
                    disabled={phase === "result"}
                    layout={question.presentation?.choiceLayout ?? "one_column"}
                    onSelect={(choiceKey) => setAnswers((current) => ({ ...current, [question.id]: choiceKey }))}
                    selectedChoiceKey={picked}
                  />
                </div>
              )}
            </article>
          );
        })}
      </div>

      <footer className={styles.footer}>
        {submitError ? <p>Imtihon variantlarini yuklab bo‘lmadi.</p> : null}
        {phase === "solving" ? (
          <button disabled={!allAnswered} onClick={() => void submit()} type="button">Tekshirish</button>
        ) : (
          <button onClick={() => router.back()} type="button">Darsga qaytish</button>
        )}
      </footer>
    </main>
  );
}
