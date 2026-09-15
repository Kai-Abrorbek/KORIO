"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { HomeIcon } from "../../home/ui/home-icon";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { completeStudyNode } from "../../lesson/api/lesson";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { completeGrammar, getGrammar } from "../api/grammar";
import type { GrammarDialogueTurn, GrammarExample, GrammarQuizItem, Grammar } from "../model/grammar";
import styles from "./grammar.module.css";

function Highlight({ highlight, text }: { highlight?: string; text: string }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const parts = text.split(highlight);
  return <>{parts.map((part, index) => <Fragment key={`${part}:${index}`}>{part}{index < parts.length - 1 ? <mark>{highlight}</mark> : null}</Fragment>)}</>;
}

function SpeakerButton({ onClick, speaking }: { onClick: () => void; speaking: boolean }) {
  return (
    <button aria-label="Tinglash" className={speaking ? styles.studySpeakerActive : styles.studySpeaker} onClick={onClick} type="button">
      <MobileIcon name="volume-high" size={20} />
    </button>
  );
}

function StudyCard({ children, tone = "paper" }: { children: ReactNode; tone?: "paper" | "blue" | "pink" }) {
  return <section className={`${styles.studyCard} ${styles[`tone${tone[0]!.toUpperCase()}${tone.slice(1)}`]}`}>{children}</section>;
}

function Kicker({ children }: { children: ReactNode }) {
  return <small className={styles.kicker}>{children}</small>;
}

function ExampleRow({ example, onSpeak, speaking }: { example: GrammarExample; onSpeak: () => void; speaking: boolean }) {
  return (
    <div className={styles.exampleRow}>
      <span><strong><Highlight highlight={example.highlight} text={example.ko} /></strong>{example.gloss ? <small>{example.gloss}</small> : null}</span>
      <SpeakerButton onClick={onSpeak} speaking={speaking} />
    </div>
  );
}

function DialogueRow({ turn }: { turn: GrammarDialogueTurn }) {
  return (
    <div className={`${styles.dialogueRow} ${turn.side === "right" ? styles.dialogueRight : ""}`}>
      <span className={styles.dialogueAvatar}>{turn.speaker}</span>
      <span className={styles.dialogueBubble}><strong><Highlight highlight={turn.highlight} text={turn.ko} /></strong>{turn.gloss ? <small>{turn.gloss}</small> : null}</span>
    </div>
  );
}

interface GrammarQuizProps {
  items: GrammarQuizItem[];
  onComplete: () => void;
}

function GrammarQuiz({ items, onComplete }: GrammarQuizProps) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number | null>(null);
  const item = items[index];

  if (!item) {
    return (
      <div className={styles.quizDone}>
        <span><HomeIcon name="check" size={32} /></span>
        <strong>Mashq tugadi!</strong>
        <p>Barcha savollarga to&apos;g&apos;ri javob berdingiz.</p>
        <button onClick={() => { setIndex(0); setPicked(null); setWrong(null); }} type="button">Yana ishlash</button>
      </div>
    );
  }

  const choose = (optionIndex: number, correct: boolean) => {
    if (picked !== null) return;
    if (!correct) {
      setWrong(optionIndex);
      window.setTimeout(() => setWrong(null), 430);
      return;
    }
    setPicked(optionIndex);
    window.setTimeout(() => {
      const next = index + 1;
      setPicked(null);
      setWrong(null);
      setIndex(next);
      if (next >= items.length) onComplete();
    }, 650);
  };

  return (
    <div className={styles.quiz}>
      <div className={styles.quizHeader}><Kicker>MASHQ</Kicker><span>{index + 1} / {items.length}</span></div>
      <div className={styles.quizProgress}><i style={{ width: `${(index / items.length) * 100}%` }} /></div>
      <h3>{item.question}</h3>
      <div className={styles.quizOptions}>
        {item.options.map((option, optionIndex) => (
          <button
            className={picked === optionIndex ? styles.optionCorrect : wrong === optionIndex ? styles.optionWrong : ""}
            key={`${option.text}:${optionIndex}`}
            onClick={() => choose(optionIndex, option.correct)}
            type="button"
          >
            <span>{String.fromCharCode(65 + optionIndex)}</span>{option.text}
          </button>
        ))}
      </div>
      {picked !== null ? <p className={styles.correctMessage}>To&apos;g&apos;ri!</p> : wrong !== null ? <p className={styles.wrongMessage}>Yana bir bor urinib ko&apos;ring.</p> : null}
    </div>
  );
}

export function GrammarStudyScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request, updateUser, user } = useTelegramAuth();
  const { speak, speaking, stop } = useKoreanSpeech();
  const id = params.get("id") ?? "";
  const scoped = params.get("scoped") === "1";
  const from = params.get("from") ?? "";
  const section = Number(params.get("section")) || 0;
  const unit = Number(params.get("unit")) || 0;
  const [grammar, setGrammar] = useState<Grammar | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [reward, setReward] = useState<string | null>(null);
  const completedRef = useRef(new Set<string>());

  const load = useCallback(async () => {
    if (!id) {
      router.replace("/grammar-list");
      return;
    }
    setLoading(true);
    setFailed(false);
    stop();
    try {
      setGrammar(await getGrammar(request, id, scoped));
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [id, request, router, scoped, stop]);

  useEffect(() => {
    void load();
  }, [load]);

  const recordComplete = async () => {
    if (!grammar || completedRef.current.has(grammar.id)) return;
    completedRef.current.add(grammar.id);
    try {
      const result = await completeGrammar(request, grammar.id);
      if (result.totalXP !== undefined) updateUser({ totalXP: result.totalXP });
      if (result.gemsEarned > 0) updateUser({ gems: (user?.gems ?? 0) + result.gemsEarned });
      if (!result.already && (result.xpEarned > 0 || result.gemsEarned > 0)) {
        setReward(`+${result.xpEarned} XP${result.gemsEarned ? ` · +${result.gemsEarned} ◆` : ""}`);
      }
    } catch {
      completedRef.current.delete(grammar.id);
    }
  };

  const goBack = () => {
    stop();
    if (window.history.length > 1) router.back();
    else router.replace(scoped ? `/grammar-list?section=${section}&unit=${unit}&from=${from}` : "/grammar-list");
  };

  const openNext = () => {
    if (!grammar?.nextId) return;
    const query = new URLSearchParams({ id: grammar.nextId });
    if (scoped) {
      query.set("scoped", "1");
      query.set("section", String(section));
      query.set("unit", String(unit));
    }
    if (from) query.set("from", from);
    router.replace(`/grammar-study?${query.toString()}`);
  };

  const finishDay = async () => {
    if (finishing) return;
    setFinishing(true);
    try {
      if (scoped && section > 0 && unit > 0) {
        await completeStudyNode(request, { group: 1, kind: "grammar", lesson: 1, section, unit });
      }
      if (from === "studyPath") router.replace("/study-path");
      else router.replace(scoped ? `/grammar-list?section=${section}&unit=${unit}` : "/grammar-list");
    } catch {
      setFinishing(false);
    }
  };

  return (
    <main className={styles.grammarPage}>
      <header className={styles.topbar}>
        <button aria-label="Orqaga" onClick={goBack} type="button"><span className={styles.backGlyph}>‹</span></button>
        <strong className={styles.studyCrumb}>Grammatika · Davom</strong>
      </header>

      {loading ? <div className={styles.centerState}><span className={styles.spinner} /></div> : failed || !grammar ? (
        <div className={styles.centerState}><strong>Grammatikani yuklab bo&apos;lmadi.</strong><button onClick={() => void load()} type="button">Qayta urinish</button></div>
      ) : (
        <div className={styles.studyScroll}>
          <StudyCard>
            <Kicker>O&apos;RGANILAYOTGAN GRAMMATIKA</Kicker>
            <div className={styles.patternRow}><span>{grammar.pattern}</span><SpeakerButton onClick={() => speak(grammar.pattern)} speaking={speaking} /></div>
            <p className={styles.summary}>{grammar.summary}</p>
            {grammar.tags.length ? <div className={styles.studyTags}>{grammar.tags.map((tag) => <span key={tag}>{tag}</span>)}</div> : null}
          </StudyCard>

          {grammar.explanation ? <StudyCard><Kicker>BATAFSIL IZOH</Kicker><p className={styles.prose}>{grammar.explanation}</p></StudyCard> : null}

          {grammar.conjugations.length ? (
            <StudyCard>
              <Kicker>QO&apos;LLASH QOIDASI</Kicker>
              {grammar.conjugationRule ? <p className={styles.rule}>{grammar.conjugationRule}</p> : null}
              <div className={styles.conjugations}>{grammar.conjugations.map((item) => <div key={`${item.base}:${item.result}`}><span>{item.base}</span><b>→</b><strong>{item.result}</strong></div>)}</div>
            </StudyCard>
          ) : null}

          {grammar.examples.length ? (
            <StudyCard><Kicker>MISOLLAR</Kicker>{grammar.examples.map((example, index) => <ExampleRow example={example} key={`${example.ko}:${index}`} onSpeak={() => speak(example.ko)} speaking={speaking} />)}</StudyCard>
          ) : null}

          {grammar.dialogue.length ? (
            <StudyCard><Kicker>SUHBATDA</Kicker><div className={styles.dialogue}>{grammar.dialogue.map((turn, index) => <DialogueRow key={`${turn.speaker}:${turn.ko}:${index}`} turn={turn} />)}</div></StudyCard>
          ) : null}

          {grammar.similar ? <StudyCard tone="blue"><Kicker>O&apos;XSHASH GRAMMATIKA</Kicker><strong className={styles.similarPattern}>{grammar.pattern} ≈ {grammar.similar.pattern}</strong><p className={styles.prose}>{grammar.similar.note}</p></StudyCard> : null}

          {grammar.cautions.length ? <StudyCard tone="pink"><Kicker>DIQQAT QILING</Kicker><ul className={styles.cautions}>{grammar.cautions.map((caution) => <li key={caution}>{caution}</li>)}</ul></StudyCard> : null}

          {grammar.quiz.length ? <StudyCard><GrammarQuiz items={grammar.quiz} onComplete={() => void recordComplete()} /></StudyCard> : null}

          {reward ? <div className={styles.rewardToast}><HomeIcon name="sparkles" size={18} />{reward}</div> : null}

          {grammar.nextId && grammar.nextPattern ? (
            <button className={styles.nextGrammar} onClick={openNext} type="button"><span><small>KEYINGI GRAMMATIKA</small><strong>{grammar.nextPattern}</strong></span><HomeIcon name="arrow" size={23} /></button>
          ) : scoped ? (
            <button className={styles.nextGrammar} disabled={finishing} onClick={() => void finishDay()} type="button"><span><small>BUGUNGI GRAMMATIKA TUGADI</small><strong>{finishing ? "Saqlanmoqda..." : "O'quv yo'liga qaytish"}</strong></span><HomeIcon name="check" size={23} /></button>
          ) : null}
        </div>
      )}
    </main>
  );
}
