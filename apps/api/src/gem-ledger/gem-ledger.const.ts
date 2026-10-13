/**
 * 보석이 어디서 들어오고 어디로 나갔는지. 앱의 "보석 내역" 화면이 이 값으로 아이콘·문구를 고른다
 * (gemHistory.sources.<source>). 새 지급·차감 경로를 만들면 여기에 추가하고 앱 문구도 같이 넣는다.
 */
export const GEM_SOURCES = [
  // 학습 보상
  'chest', // 레슨·문법 레슨·로드맵 상자 { grade, from: lesson | grammar | roadmap }
  'streak_chest', // 연속 학습 상자 { grade }
  'grammar_section', // 문법 섹션 완료 { section }
  'level_exam', // 레벨 시험 통과 { level }
  // 퀘스트·출석
  'quest', // 오늘의 퀘스트
  'quest_chest', // 퀘스트 상자
  'monthly_challenge', // 월간 챌린지 칸 { at }
  'checkin', // 출석 { day }
  // 연속 학습
  'streak_goal', // 목표를 걸 때 미리 받는 보석 { days }
  'streak_goal_lost', // 목표 실패로 돌려놓은 보석 { days }
  'streak_freeze', // 복구펜 구매
  // 리그·친구
  'league', // 주간 리그 { tier, rank }
  'referral_welcome', // 초대 코드로 가입한 쪽
  'referral', // 친구를 초대한 쪽
  'referral_milestone', // 초대 N명 달성 { count }
  // 상점·프리미엄
  'energy_refill', // 에너지 충전
  'gem_pass', // 보석으로 산 프리미엄 { days }
  'cosmetic', // 캐릭터 꾸미기 아이템 { item }
  'subscription_bonus', // 구독 시작 보너스
  // 출금
  'payout', // 카드로 출금 신청 { last4 }
  'payout_refund', // 출금 반려·취소로 돌려받음 { last4, reason: rejected | cancelled }
  // 운영
  'admin', // 운영팀 지급·조정
] as const;

export type GemSource = (typeof GEM_SOURCES)[number];

export type GemParams = Record<string, string | number>;

export const GEM_HISTORY = {
  PAGE_SIZE: 40,
  MAX_PAGE_SIZE: 100,
} as const;
