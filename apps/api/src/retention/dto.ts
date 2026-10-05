import { IsIn, IsInt } from 'class-validator';
import { STREAK_GOALS } from './retention.config';

export class StartStreakGoalDto {
  @IsInt()
  @IsIn(STREAK_GOALS.map((g) => g.days))
  days: number;
}

export class ClaimQuestDto {
  @IsIn(['xp', 'correct', 'minutes', 'chest'])
  id: string;
}
