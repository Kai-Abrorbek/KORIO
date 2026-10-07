import { IsIn, IsInt } from 'class-validator';
import { MONTHLY_CHALLENGE, STREAK_GOALS } from './retention.config';
import { QUEST_EVENT_KEYS } from '../users/utils/quest-counter.util';

export class StartStreakGoalDto {
  @IsInt()
  @IsIn(STREAK_GOALS.map((g) => g.days))
  days: number;
}

export class ClaimQuestDto {
  // 새 앱은 칸(easy·normal·hard·bonus), 옛 앱은 종류(xp·correct·minutes)로 보낸다
  @IsIn([
    'easy',
    'normal',
    'hard',
    'bonus',
    'chest',
    'xp',
    'correct',
    'minutes',
  ])
  id: string;
}

export class RerollQuestDto {
  @IsIn(['easy', 'normal', 'hard', 'bonus'])
  slot: string;
}

export class QuestEventDto {
  @IsIn(QUEST_EVENT_KEYS)
  type: string;
}

export class ClaimMonthlyDto {
  @IsInt()
  @IsIn(MONTHLY_CHALLENGE.MILESTONES.map((m) => m.at))
  at: number;
}
