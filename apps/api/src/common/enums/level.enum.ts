export enum UserLevel {
  BEGINNER = 'beginner', // 0 ~ 59점
  INTERMEDIATE = 'intermediate', // 60 ~ 89점
  ADVANCED = 'advanced', // 90 ~ 100점
}

export const calculateLevel = (score: number): UserLevel => {
  if (score >= 90) return UserLevel.ADVANCED;
  if (score >= 60) return UserLevel.INTERMEDIATE;
  return UserLevel.BEGINNER;
};
