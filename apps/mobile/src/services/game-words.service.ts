import api from "./api";

/**
 * 미니게임에 쓰는 단어.
 *
 * 예전엔 게임마다 `mocks/` 의 하드코딩 목록을 썼다. 같은 단어 스무 개가
 * 돌고 돌아서 두 판만 해도 다 외웠고, 무엇보다 **유저가 실제로 배운 것과
 * 아무 상관이 없었다.**
 *
 * 이제 서버가 그 사람의 진도를 보고 뽑는다 — 이미 만난 단어가 먼저 나오고,
 * 모자라면 쉬운 것부터 채운다. 난이도를 따로 고르게 하지 않는 이유가 이것이다.
 */
export interface GameWord {
  id: string;
  ko: string;
  uz: string;
  en: string;
  ru: string;
  /** 한국어 뜻풀이 (있을 때만) */
  meaningKo: string;
  emoji: string;
  difficulty: number;
}

export const GameWordsApi = {
  /**
   * @param count 게임이 필요한 개수. 서버가 4~120 으로 조인다
   * @param maxLen 카드에 들어갈 최대 글자 수
   */
  pool: (
    count = 40,
    maxLen = 5,
  ): Promise<{ words: GameWord[]; fromProgress: boolean }> =>
    api.get(`/words/game-pool?count=${count}&maxLen=${maxLen}`),

  /** 끝말잇기 첫 단어 */
  chainStart: (): Promise<{ word: ChainWordDto | null }> =>
    api.get(`/words/chain/start`),

  /**
   * 끝말잇기 한 수. 사전 확인 + 우리 차례를 한 번에 받는다.
   * reply 가 null 이면 서버가 더 낼 단어가 없다 = 유저 승.
   */
  chainTurn: (body: {
    word: string;
    prev?: string | null;
    used?: string[];
  }): Promise<{
    accepted: boolean;
    reason?: string;
    word?: ChainWordDto;
    reply?: ChainWordDto | null;
  }> => api.post(`/words/chain/turn`, body),

  /**
   * 힌트. 서버 사전에서 뽑는다 —— 앱 목록에서 뽑으면 힌트대로 쳤는데
   * "그런 단어 없다" 가 나와서 힌트가 함정이 된다.
   */
  chainHints: (
    start: string,
    exclude: string[] = [],
  ): Promise<{ words: Omit<ChainWordDto, "emoji">[] }> =>
    api.get(
      `/words/chain/hints?start=${encodeURIComponent(start)}` +
        `&exclude=${encodeURIComponent(exclude.slice(0, 60).join(","))}`,
    ),
};

export interface ChainWordDto {
  ko: string;
  uz: string;
  en: string;
  ru: string;
  emoji: string;
}

/** 화면 언어에 맞는 뜻 한 줄 */
export function meaningOfWord(
  w: { uz: string; en: string; ru: string },
  lang: string,
): string {
  const l = (lang ?? "uz").slice(0, 2);
  if (l === "uz") return w.uz || w.en;
  if (l === "ru") return w.ru || w.en;
  return w.en || w.uz;
}
