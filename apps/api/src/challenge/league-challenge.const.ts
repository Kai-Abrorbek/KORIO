import { UserLeague } from '../users/schemas/user.schema';

/**
 * 리그별 주간 챌린지 종목.
 *
 * 예전에는 티어와 무관하게 짝 맞추기 하나였다. 브론즈부터 다이아몬드까지
 * 같은 걸 시키면 올라갈 이유가 줄어든다 — 티어가 오르면 종목도 바뀌어야
 * "다음 리그가 궁금한" 상태가 된다.
 *
 * ⚠️ **이 표가 단일 출처다.** 앱은 여기서 받은 id 로 어떤 게임을 열지만
 * 정하고, XP 는 한 줄도 계산하지 않는다. 앱이 종목을 고르게 두면
 * "제일 후한 종목" 을 직접 지정해서 부를 수 있다.
 */
export interface LeagueChallengeConfig {
  /** 앱의 라우트·문구 키와 같은 식별자 */
  id: string;
  /** 점수 1점당 XP. 게임마다 점수 스케일이 달라 종목별로 둔다 */
  xpPerPoint: number;
  /** 한 판에서 줄 수 있는 XP 상한 */
  maxXp: number;
  /** 시작할 때 깎는 에너지 */
  energyCost: number;
}

/**
 * 점수 스케일이 게임마다 달라서 xpPerPoint 도 다르다.
 * 짝 맞추기는 한 판에 20~30쌍, 아케이드는 수백 점이 나온다.
 * maxXp 는 티어가 오를수록 조금씩 높아진다 — 상위 리그일수록 경쟁이 빡세다.
 */
export const TIER_CHALLENGE: Record<UserLeague, LeagueChallengeConfig> = {
  [UserLeague.BRONZE]: { id: 'match', xpPerPoint: 6, maxXp: 180, energyCost: 15 },
  [UserLeague.SILVER]: { id: 'memory', xpPerPoint: 20, maxXp: 190, energyCost: 15 },
  [UserLeague.GOLD]: { id: 'wordRain', xpPerPoint: 2, maxXp: 200, energyCost: 15 },
  [UserLeague.SAPPHIRE]: { id: 'swipeJudge', xpPerPoint: 2, maxXp: 210, energyCost: 15 },
  [UserLeague.RUBY]: { id: 'particleRush', xpPerPoint: 2, maxXp: 220, energyCost: 18 },
  [UserLeague.EMERALD]: { id: 'echoChain', xpPerPoint: 8, maxXp: 230, energyCost: 18 },
  [UserLeague.AMETHYST]: { id: 'wordChain', xpPerPoint: 8, maxXp: 240, energyCost: 18 },
  [UserLeague.PEARL]: { id: 'swipeJudge', xpPerPoint: 2, maxXp: 250, energyCost: 20 },
  [UserLeague.OBSIDIAN]: { id: 'particleRush', xpPerPoint: 2, maxXp: 260, energyCost: 20 },
  [UserLeague.DIAMOND]: { id: 'echoChain', xpPerPoint: 8, maxXp: 280, energyCost: 20 },
};

/**
 * 점수는 앱이 신고한다. 게임 로직이 앱에 있어서 "정말 그 점수인지" 는
 * 서버가 확인할 방법이 없다 — 콤보 보너스와 같은 상황이다.
 * 그래서 **금액이 아니라 빈도**를 서버가 막는다.
 *
 * maxXp 상한만으로는 부족하다. 한 판에 210 이 상한이어도 1초에 한 번씩
 * 부르면 리그 1등을 살 수 있다. 아래 두 개가 실질적인 방어선이다.
 *
 * 쿨다운 90초: 어떤 종목이든 한 판이 최소 그 정도는 걸린다.
 * 하루 10회: 상한 XP 를 다 받아도 하루 2,000 대. 레슨 8개분 정도다.
 */
export const CHALLENGE_COOLDOWN_SEC = 90;
export const CHALLENGE_DAILY_LIMIT = 10;

/** 앱이 보낼 수 있는 점수의 절대 상한 (터무니없는 값 차단) */
export const CHALLENGE_MAX_SCORE = 2000;

export function challengeFor(tier?: UserLeague): LeagueChallengeConfig {
  return TIER_CHALLENGE[tier ?? UserLeague.BRONZE] ?? TIER_CHALLENGE[UserLeague.BRONZE];
}
