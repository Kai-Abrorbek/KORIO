"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { localized, type ReadingWordGloss } from "../../reading-listening/api/reading-listening";
import { glossTopikWord } from "../api/topik";
import styles from "./topik-word-gloss.module.css";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

/**
 * TOPIK 연습 화면의 단어 뜻보기 — 지문·대본의 단어를 **두 번** 누르면 뜻과 간단한 설명 (앱과 같음).
 * 한 번 누르기는 그대로 둔다. 실전 모드엔 Provider 가 없어서 글자가 평소처럼 나온다.
 * 뜻은 서버가 문제 묶음 단위로 저장해 둬서, 누군가 한 번 찾은 단어는 다음 사람에게 바로 나간다.
 */
const GlossContext = createContext<((word: string, questionId: string | null) => void) | null>(null);
const QuestionContext = createContext<string | null>(null);

const DOUBLE_TAP_MS = 350;
const cleanWord = (token: string) => token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");

/** 한 화면에 문제가 여럿이면 문제마다 감싼다 (서버가 그 문제 글로 문맥을 잡는다) */
export function TopikGlossScope({ questionId, children }: { questionId: string; children: ReactNode }) {
  return <QuestionContext.Provider value={questionId}>{children}</QuestionContext.Provider>;
}

/** 글을 단어로 나눠, 두 번 누르면 뜻보기를 연다. 연습 화면이 아니면 그냥 글자 */
export function TopikGlossWords({ text }: { text: string }) {
  const open = useContext(GlossContext);
  const questionId = useContext(QuestionContext);
  const lastTapRef = useRef<{ index: number; at: number } | null>(null);
  if (!open || !text) return <>{text}</>;
  return (
    <>
      {text.split(/(\s+)/).map((token, index) => {
        const word = /\S/.test(token) ? cleanWord(token) : "";
        if (!word) return token;
        return (
          <span
            className={styles.word}
            key={`${index}-${token}`}
            onClick={() => {
              const now = Date.now();
              const last = lastTapRef.current;
              if (last && last.index === index && now - last.at < DOUBLE_TAP_MS) {
                lastTapRef.current = null;
                open(word, questionId);
              } else {
                lastTapRef.current = { index, at: now };
              }
            }}
          >
            {token}
          </span>
        );
      })}
    </>
  );
}

export function TopikWordGlossProvider({
  children,
  enabled,
  questionId = null,
  request,
}: {
  children: ReactNode;
  enabled: boolean;
  questionId?: string | null;
  request: AuthenticatedRequest;
}) {
  const { speak } = useKoreanSpeech(request);
  const [word, setWord] = useState<string | null>(null);
  const [gloss, setGloss] = useState<ReadingWordGloss | null>(null);
  const [loading, setLoading] = useState(false);
  const runRef = useRef(0);
  const seenRef = useRef(new Map<string, ReadingWordGloss | null>());

  const open = useCallback((tapped: string, scoped: string | null) => {
    const target = scoped ?? questionId;
    if (!target) return;
    const key = `${target}|${tapped}`;
    const run = ++runRef.current;
    setWord(tapped);
    if (seenRef.current.has(key)) {
      setGloss(seenRef.current.get(key) ?? null);
      setLoading(false);
      return;
    }
    setGloss(null);
    setLoading(true);
    glossTopikWord(request, target, tapped)
      .then((res) => {
        seenRef.current.set(key, res.gloss);
        if (run === runRef.current) setGloss(res.gloss);
      })
      .catch(() => {
        if (run === runRef.current) setGloss(null);
      })
      .finally(() => {
        if (run === runRef.current) setLoading(false);
      });
  }, [questionId, request]);

  const close = () => {
    runRef.current += 1;
    setWord(null);
    setGloss(null);
    setLoading(false);
  };

  return (
    <GlossContext.Provider value={enabled ? open : null}>
      {children}
      {enabled && word ? (
        <div className={styles.backdrop} onClick={close} role="presentation">
          <section className={styles.sheet} onClick={(event) => event.stopPropagation()}>
            <i />
            <header>
              <div>
                <small>SO‘Z MA’NOSI</small>
                <h2>{word}</h2>
                {gloss?.lemma && gloss.lemma !== word ? <p>Lug‘at shakli: {gloss.lemma}</p> : null}
              </div>
              <button aria-label="Talaffuzni eshitish" onClick={() => speak(gloss?.lemma || word)} type="button">
                <MobileIcon name="volume-medium" size={19} />
              </button>
            </header>
            {loading ? (
              <div className={styles.loading}><i className={styles.spinner} /> Ma’nosi qidirilmoqda...</div>
            ) : gloss && localized(gloss.meaning) ? (
              <>
                <p className={styles.meaning}>{localized(gloss.meaning)}</p>
                {gloss.note && localized(gloss.note) ? <aside>{localized(gloss.note)}</aside> : null}
              </>
            ) : (
              <p className={styles.missing}>Bu so‘zning ma’nosi topilmadi.</p>
            )}
          </section>
        </div>
      ) : null}
    </GlossContext.Provider>
  );
}
