"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { getContentLang } from "../../../shared/i18n/content-language";

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

export function useGameWords(count = 40, maxLen = 5) {
  const { request } = useTelegramAuth();
  const [words, setWords] = useState<GameWord[] | null>(null);
  const [failed, setFailed] = useState(false);
  const generation = useRef(0);

  const load = useCallback(() => {
    const current = ++generation.current;
    setFailed(false);
    setWords(null);
    void request<{ words: GameWord[] }>(`/words/game-pool?count=${count}&maxLen=${maxLen}`)
      .then((response) => {
        if (current !== generation.current) return;
        if ((response.words?.length ?? 0) < Math.min(4, count)) setFailed(true);
        else setWords(response.words);
      })
      .catch(() => {
        if (current === generation.current) setFailed(true);
      });
  }, [count, maxLen, request]);

  useEffect(() => {
    load();
    return () => { generation.current += 1; };
  }, [load]);

  return { failed, loading: !words && !failed, reload: load, words };
}

/** 게임 카드에 보일 뜻 — 설명 언어로. 없으면 우즈벡어 → 영어 */
export function meaningOfGameWord(word: Pick<GameWord, "uz" | "en" | "ru">) {
  const lang = getContentLang();
  return word[lang] || word.uz || word.en;
}
