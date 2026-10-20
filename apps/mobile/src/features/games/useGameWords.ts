import { useCallback, useEffect, useRef, useState } from "react";
import { GameWordsApi, type GameWord } from "@/services/game-words.service";
import { useSettingsStore } from "@/store/settings.store";

/**
 * 게임에 쓸 단어를 서버에서 받아온다.
 *
 * 게임마다 같은 코드를 복사하지 않으려고 하나로 모았다.
 *
 * ⚠️ 실패해도 하드코딩 목록으로 조용히 대체하지 않는다. 그러면 유저는
 *    자기가 배운 단어가 아닌 남의 단어로 게임을 하면서 그걸 모른다.
 *    못 받았으면 못 받았다고 말하고 다시 시도할 길을 준다.
 */
export function useGameWords(count = 40, maxLen = 5) {
  const course = useSettingsStore((state) => state.learnCourse);
  const [words, setWords] = useState<GameWord[] | null>(null);
  const [failed, setFailed] = useState(false);
  const generation = useRef(0);

  const load = useCallback(() => {
    const current = ++generation.current;
    // Only matching has been ported so far and uses its own scoped loader.
    // Preserve unavailable behavior in the remaining games, including leagues.
    setFailed(course !== "ko");
    setWords(null);
    if (course !== "ko") return;
    GameWordsApi.pool(count, maxLen, "ko")
      .then((r) => {
        if (current !== generation.current) return;
        // 판을 못 채울 만큼 적게 오면 실패로 본다 — 카드가 모자란 게임판은
        // 게임이 아니다
        if ((r.words?.length ?? 0) < Math.min(4, count)) setFailed(true);
        else setWords(r.words);
      })
      .catch(() => {
        if (current === generation.current) setFailed(true);
      });
  }, [count, maxLen, course]);

  useEffect(() => {
    load();
    return () => {
      generation.current += 1;
    };
  }, [load]);

  return {
    words: course === "ko" ? words : null,
    loading: course === "ko" && !words && !failed,
    failed: course !== "ko" || failed,
    reload: load,
  };
}
