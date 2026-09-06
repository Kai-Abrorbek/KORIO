/**
 * 초대 보상 규칙.
 *
 * 숫자를 여기 모아두는 이유: 보상 액수는 마케팅이 만지는 값이라 자주 바뀌는데,
 * 서비스 코드 곳곳에 흩어져 있으면 하나만 고치고 나머지를 놓친다.
 */

/** 초대가 성사되면 초대자·피초대자에게 각각 주는 보석 */
export const REFERRAL_GEMS = 1000;

/**
 * 피초대자가 코드를 쓸 수 있는 기한 (가입 후 며칠).
 *
 * 이게 없으면 1년 쓴 유저 둘이 서로 코드를 넣고 2000 보석을 만들어낸다.
 * "초대" 는 새 사람을 데려오는 것이지 기존 유저끼리 교환하는 게 아니다.
 */
export const CLAIM_WINDOW_DAYS = 14;

/**
 * 한 사람이 보상을 받을 수 있는 최대 초대 수.
 * 넘어도 초대 기록은 남지만 보석은 안 나간다 (봇 농장 방어).
 */
export const MAX_REWARDED_REFERRALS = 100;

/**
 * 누적 초대 수 마일스톤 보너스.
 *
 * 1명당 1000 보석만 주면 "한 명 초대하고 끝" 이 된다. 계단을 놓아야
 * 두 번째·세 번째를 부른다. 각 단계는 딱 한 번만 지급된다.
 */
export const REFERRAL_MILESTONES: { count: number; gems: number }[] = [
  { count: 3, gems: 1000 },
  { count: 10, gems: 3000 },
  { count: 25, gems: 8000 },
  { count: 50, gems: 20000 },
];

/** 초대 코드 길이 */
export const CODE_LENGTH = 7;

/**
 * 코드에 쓰는 글자.
 *
 * 0/O, 1/I/L 처럼 헷갈리는 글자를 뺐다. 코드는 카톡으로 받아 **눈으로 읽고
 * 손으로 옮겨 적는** 물건이라, 한 글자만 헷갈려도 "코드가 틀렸대요" 문의가 된다.
 */
export const CODE_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

/** 초대 링크. 앱링크가 붙기 전에도 사람이 읽고 옮길 수 있는 모양이어야 한다 */
export const INVITE_BASE_URL = 'https://korio.online/i';
