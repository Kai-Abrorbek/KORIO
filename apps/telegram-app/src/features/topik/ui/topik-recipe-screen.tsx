"use client";

import {
  type CSSProperties,
  type ReactNode,
  type TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { getTopikRecipe } from "../api/topik";
import { useTopikListeningPlayback } from "../browser/use-topik-listening-playback";
import {
  topikUzText,
  type TopikGrammarSection,
  type TopikRecipeQuestion,
} from "../model/topik";
import { ChoiceList, StimulusCard, TopikTextBlocks } from "./topik-exam-parts";
import styles from "./topik-recipe-screen.module.css";

const CHOICE_MARK = ["①", "②", "③", "④"];

function koreanText(value: { ko: string } | null | undefined) {
  return value?.ko ?? "";
}

export function TopikRecipeScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupCode = searchParams.get("groupCode") ?? "";
  const { request } = useTelegramAuth();
  const [recipe, setRecipe] = useState<Awaited<ReturnType<typeof getTopikRecipe>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openSolutionId, setOpenSolutionId] = useState<string | null>(null);
  const [openGrammarKey, setOpenGrammarKey] = useState<string | null>(null);
  const listening = useTopikListeningPlayback(request);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    if (!groupCode) {
      setRecipe(null);
      setError(true);
      setLoading(false);
      return;
    }
    try {
      setRecipe(await getTopikRecipe(request, groupCode));
    } catch {
      setRecipe(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [groupCode, request]);

  useEffect(() => {
    void load();
  }, [load]);

  const openSolution = useMemo(
    () => recipe?.examples.find((question) => question.id === openSolutionId) ?? null,
    [openSolutionId, recipe],
  );
  const openGrammar = useMemo(
    () => recipe?.grammarSections.find((section) => section.key === openGrammarKey) ?? null,
    [openGrammarKey, recipe],
  );

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

  if (loading) {
    return <main className={styles.centered}><i className={styles.spinner} /></main>;
  }

  if (error || !recipe) {
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
        <button aria-label="Orqaga" onClick={() => router.back()} type="button">
          <MobileIcon name="chevron-back" size={24} />
        </button>
        <div>
          <small>{topikUzText(recipe.label)}</small>
          <h1>{topikUzText(recipe.title)}</h1>
        </div>
        <span>{recipe.targetLevel}-daraja</span>
      </header>

      <div className={styles.scroll}>
        <section className={styles.intro}>{topikUzText(recipe.intro)}</section>

        <SectionLabel>Oltin retsept</SectionLabel>
        <section className={styles.recipeCard}>
          {recipe.goldenRecipe.map((tip) => (
            <div className={styles.tipRow} key={tip.order}>
              <b>{tip.order}</b>
              <p>{topikUzText(tip.text)}</p>
            </div>
          ))}
        </section>

        {recipe.grammarSections.length ? (
          <>
            <SectionLabel>Asosiy reyting</SectionLabel>
            <div className={styles.grammarList}>
              {recipe.grammarSections.map((section) => (
                <button key={section.key} onClick={() => setOpenGrammarKey(section.key)} type="button">
                  <MobileIcon name="library-outline" size={20} />
                  <span>
                    <b>{topikUzText(section.title)}</b>
                    <small>{section.entries.length} ta asosiy nuqta</small>
                  </span>
                  <MobileIcon name="chevron-forward" size={18} />
                </button>
              ))}
            </div>
          </>
        ) : null}

        <SectionLabel>Yechilgan namunalar</SectionLabel>
        {recipe.examples.map((question) => (
          <RecipeQuestionCard
            audioPlaying={listening.activeKey === question.id && listening.status === "playing"}
            key={question.id}
            onOpenSolution={() => setOpenSolutionId(question.id)}
            onPlayAudio={() => playAudio(question)}
            question={question}
          />
        ))}

        <button
          className={styles.practiceButton}
          onClick={() => router.push(`/topik-practice?groupCode=${encodeURIComponent(recipe.groupCode)}`)}
          type="button"
        >
          <span>
            <b>Taxminiy savollarni yechish</b>
            <small>{recipe.practiceCount} ta savol</small>
          </span>
          <MobileIcon name="arrow-forward" size={22} />
        </button>
      </div>

      <SideSheet
        onClose={() => setOpenSolutionId(null)}
        subtitle={openSolution ? `${openSolution.number}-savol` : undefined}
        title="Izoh"
        visible={Boolean(openSolution)}
      >
        {openSolution ? <SolutionBody question={openSolution} /> : null}
      </SideSheet>

      <SideSheet
        onClose={() => setOpenGrammarKey(null)}
        subtitle="Chiqish ehtimoli va muhimligi bo‘yicha"
        title={openGrammar ? topikUzText(openGrammar.title) : ""}
        visible={Boolean(openGrammar)}
      >
        {openGrammar ? <GrammarBody section={openGrammar} /> : null}
      </SideSheet>
    </main>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <h2 className={styles.sectionLabel}>{children}</h2>;
}

function RecipeQuestionCard({ question, onOpenSolution, onPlayAudio, audioPlaying }: {
  question: TopikRecipeQuestion;
  onOpenSolution: () => void;
  onPlayAudio: () => void;
  audioPlaying: boolean;
}) {
  return (
    <article className={styles.questionCard}>
      {question.stimulus ? <div className={styles.stimulus}><StimulusCard stimulus={question.stimulus} /></div> : null}
      <div className={styles.questionHead}>
        <b>{question.number}.</b>
        <TopikTextBlocks blocks={question.prompt} />
      </div>
      {question.audio?.transcript.length ? (
        <section className={styles.audioCard}>
          <button onClick={onPlayAudio} type="button">
            <MobileIcon name={audioPlaying ? "stop" : "play"} size={17} />
            {audioPlaying ? "Tinglashni to‘xtatish" : "Dialogni tinglash"}
          </button>
          <div>
            {question.audio.transcript.map((line, index) => (
              <p key={`${question.id}-audio-${index}`}>
                {line.speaker ? <b>{line.speaker}</b> : null}
                <span>{line.text}</span>
              </p>
            ))}
          </div>
        </section>
      ) : null}
      {question.choices.length ? (
        <div className={styles.choices}>
          <ChoiceList choices={question.choices} disabled layout={question.presentation?.choiceLayout ?? "one_column"} />
        </div>
      ) : null}
      <footer className={styles.questionFooter}>
        <small>{question.tags[0] ?? ""}</small>
        <button onClick={onOpenSolution} type="button">
          <MobileIcon name="reader-outline" size={16} />
          Izohni ko‘rish
        </button>
      </footer>
    </article>
  );
}

function SolutionBody({ question }: { question: TopikRecipeQuestion }) {
  const answerIndex = question.choices.findIndex((choice) => choice.key === question.correctChoiceKey);
  const answer = question.choices[answerIndex];
  const flowKo = koreanText(question.solution?.strategy);
  const flowLocal = topikUzText(question.solution?.strategy);
  const explanationKo = koreanText(question.solution?.explanation);
  const explanationLocal = topikUzText(question.solution?.explanation);

  if (question.responseType === "written") {
    return (
      <div>
        <section className={styles.answerBox}>
          <small>Namunaviy javob</small>
          <p>{question.solution?.sampleAnswer || "Namunaviy javob mavjud emas."}</p>
        </section>
        {(question.solution?.rubric ?? []).map((item, index) => (
          <div className={styles.noteRow} key={`${question.id}-rubric-${index}`}><b>{index + 1}</b><p>{topikUzText(item)}</p></div>
        ))}
        {explanationKo ? <p className={styles.solutionKo}>{explanationKo}</p> : null}
        {explanationLocal && explanationLocal !== explanationKo ? <p className={styles.solutionText}>{explanationLocal}</p> : null}
      </div>
    );
  }

  return (
    <div>
      <section className={styles.answerBox}>
        <small>To‘g‘ri javob: {CHOICE_MARK[answerIndex] ?? ""}</small>
        <strong>{answer?.text ?? ""}</strong>
      </section>
      {flowKo ? (
        <section className={styles.flowBox}>
          <strong>{flowKo}</strong>
          {flowLocal && flowLocal !== flowKo ? <p>{flowLocal}</p> : null}
        </section>
      ) : null}
      {explanationKo ? <p className={styles.solutionKo}>{explanationKo}</p> : null}
      {explanationLocal && explanationLocal !== explanationKo ? <p className={styles.solutionText}>{explanationLocal}</p> : null}
      {(question.solution?.choiceNotes ?? []).map((note) => {
        const index = question.choices.findIndex((choice) => choice.key === note.choiceKey);
        return <div className={styles.noteRow} key={note.choiceKey}><b>{CHOICE_MARK[index] ?? ""}</b><p>{topikUzText(note.note)}</p></div>;
      })}
    </div>
  );
}

function GrammarBody({ section }: { section: TopikGrammarSection }) {
  return (
    <div>
      {section.entries.map((entry) => (
        <section className={styles.grammarEntry} key={entry.rank}>
          <header><b>{String(entry.rank).padStart(2, "0")}</b><strong>{entry.form}</strong></header>
          {entry.meanings.map((meaning, index) => (
            <div className={styles.meaningRow} key={`${entry.rank}-${index}`}>
              {entry.meanings.length > 1 ? <b>{CHOICE_MARK[index]}</b> : null}
              <span><strong>{topikUzText(meaning)}</strong>{entry.examples[index] ? <p>{entry.examples[index]}</p> : null}</span>
            </div>
          ))}
        </section>
      ))}
      {section.tips.map((tip, index) => (
        <section className={styles.grammarTip} key={`${section.key}-tip-${index}`}>
          <MobileIcon name="bulb" size={16} />
          <p>{topikUzText(tip)}</p>
        </section>
      ))}
    </div>
  );
}

function SideSheet({ visible, onClose, title, subtitle, children }: {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [dragX, setDragX] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, visible]);

  if (!visible) return null;

  const startDrag = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const moveDrag = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    const start = touchStart.current;
    if (!touch || !start) return;
    const x = touch.clientX - start.x;
    const y = touch.clientY - start.y;
    if (x > 0 && Math.abs(x) > Math.abs(y)) setDragX(x);
  };
  const endDrag = () => {
    const shouldClose = dragX > Math.min(window.innerWidth * 0.92, 460) * 0.24;
    touchStart.current = null;
    setDragX(0);
    if (shouldClose) onClose();
  };
  const panelStyle = { "--drag-x": `${dragX}px` } as CSSProperties;

  return (
    <div aria-modal="true" className={styles.sheetWrap} role="dialog">
      <button aria-label="Yopish" className={styles.sheetBackdrop} onClick={onClose} type="button" />
      <section className={styles.sideSheet} onTouchEnd={endDrag} onTouchMove={moveDrag} onTouchStart={startDrag} style={panelStyle}>
        <header>
          <div><h2>{title}</h2>{subtitle ? <p>{subtitle}</p> : null}</div>
          <button aria-label="Yopish" onClick={onClose} type="button"><MobileIcon name="close" size={20} /></button>
        </header>
        <div className={styles.sheetDivider} />
        <div className={styles.sheetContent}>{children}</div>
      </section>
    </div>
  );
}
