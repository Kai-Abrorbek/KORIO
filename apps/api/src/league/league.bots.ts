// 리그 봇 유저 (초기 유저 부족 시 방 채움)
export const BOT_PROFILES = [
  { nickname: 'Aziz', flag: '🇺🇿', base: 40 },
  { nickname: 'Malika', flag: '🇺🇿', base: 65 },
  { nickname: 'Дмитрий', flag: '🇷🇺', base: 90 },
  { nickname: 'Sardor', flag: '🇺🇿', base: 30 },
  { nickname: 'Анна', flag: '🇷🇺', base: 120 },
  { nickname: 'Jasur', flag: '🇺🇿', base: 55 },
  { nickname: 'Nilufar', flag: '🇺🇿', base: 75 },
  { nickname: 'Ryan', flag: '🇺🇸', base: 100 },
  { nickname: 'Ольга', flag: '🇷🇺', base: 45 },
  { nickname: 'Bekzod', flag: '🇺🇿', base: 25 },
  { nickname: 'Emma', flag: '🇺🇸', base: 85 },
  { nickname: 'Shohruh', flag: '🇺🇿', base: 60 },
];

// 티어가 높을수록 봇 XP도 높게 (난이도 상승)
export const TIER_BOT_MULTIPLIER: Record<string, number> = {
  bronze: 1,
  silver: 1.6,
  gold: 2.4,
  platinum: 3.4,
  diamond: 4.5,
};
