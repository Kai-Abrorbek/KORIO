"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { getContentLang } from "../../../shared/i18n/content-language";
import { gameRequestPath, type GameSession } from "./game-session";

export interface GameWord {
  id: string;
  ko: string;
  uz: string;
  en: string;
  ru: string;
  meaningKo?: string;
  emoji?: string;
  difficulty?: number;
}

export function useGameWords(count = 40, maxLen = 5, session?: GameSession) {
  const { request, user } = useTelegramAuth();
  const requestRef = useRef(request);
  requestRef.current = request;
  const legacyRequest = session ? null : request;
  // Unported games must not start consuming English merely because the pool API
  // now supports it. Each game opts in with an explicit session when migrated.
  const unavailable = !session && user?.learnCourse === "en";
  const [words, setWords] = useState<GameWord[] | null>(null);
  const [failed, setFailed] = useState(false);
  const generation = useRef(0);

  const load = useCallback(() => {
    const current = ++generation.current;
    setFailed(false);
    setWords(null);
    if (unavailable) {
      setFailed(true);
      return;
    }
    const path = `/words/game-pool?count=${count}&maxLen=${maxLen}`;
    const requester = legacyRequest ?? requestRef.current;
    void requester<{ words: GameWord[] }>(session ? gameRequestPath(path, session) : path)
      .then((response) => {
        if (current !== generation.current) return;
        if ((response.words?.length ?? 0) < Math.min(4, count)) setFailed(true);
        else setWords(response.words);
      })
      .catch(() => {
        if (current === generation.current) setFailed(true);
      });
  }, [count, maxLen, legacyRequest, session, unavailable]);

  useEffect(() => {
    load();
    return () => { generation.current += 1; };
  }, [load]);

  return {
    failed: unavailable || failed,
    loading: !unavailable && !words && !failed,
    reload: load,
    words: unavailable ? null : words,
  };
}

/** 게임 카드에 보일 뜻 — 설명 언어로. 없으면 우즈벡어 → 영어 */
export function meaningOfGameWord(word: Pick<GameWord, "uz" | "en" | "ru">) {
  const lang = getContentLang();
  return word[lang] || word.uz || word.en;
}
