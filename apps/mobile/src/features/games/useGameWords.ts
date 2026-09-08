import { useCallback, useEffect, useState } from "react";
import { GameWordsApi, type GameWord } from "@/services/game-words.service";

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
  const [words, setWords] = useState<GameWord[] | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(() => {
    setFailed(false);
    setWords(null);
    let alive = true;
    GameWordsApi.pool(count, maxLen)
      .then((r) => {
        if (!alive) return;
        // 판을 못 채울 만큼 적게 오면 실패로 본다 — 카드가 모자란 게임판은
        // 게임이 아니다
        if ((r.words?.length ?? 0) < Math.min(4, count)) setFailed(true);
        else setWords(r.words);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [count, maxLen]);

  useEffect(() => load(), [load]);

  return { words, loading: !words && !failed, failed, reload: load };
}
