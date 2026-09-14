/**
 * 리그별 챌린지 종목 — **표시·라우팅용 표**.
 *
 * ⚠️ 어떤 티어가 어떤 종목인지, XP 가 얼마인지는 **서버가 정한다**
 * (apps/api/src/challenge/league-challenge.const.ts). 앱이 종목을 고르면
 * "제일 후한 종목" 을 직접 지정해서 부를 수 있다.
 * 여기는 서버가 준 id 를 화면(라우트·아이콘·색)으로 바꾸는 표일 뿐이다.
 */
export interface ChallengeMeta {
  route: string;
  icon: string;
}

export const CHALLENGE_META: Record<string, ChallengeMeta> = {
  match: { route: "/match-game", icon: "grid" },
  memory: { route: "/memory-game", icon: "albums" },
  wordRain: { route: "/word-rain", icon: "rainy" },
  swipeJudge: { route: "/swipe-judge", icon: "swap-horizontal" },
  particleRush: { route: "/particle-rush", icon: "flash" },
  echoChain: { route: "/echo-chain", icon: "volume-high" },
  wordChain: { route: "/word-chain", icon: "link" },
};

/** 서버가 모르는 id 를 주더라도 화면이 죽지 않게 */
export const FALLBACK_CHALLENGE: ChallengeMeta = CHALLENGE_META.match;

export const challengeMetaOf = (id?: string): ChallengeMeta =>
  (id && CHALLENGE_META[id]) || FALLBACK_CHALLENGE;
