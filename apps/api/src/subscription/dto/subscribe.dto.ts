import { IsIn, IsString } from 'class-validator';

export const PLAN_IDS = ['monthly', 'yearly', 'family'] as const;

export class SubscribeDto {
  @IsString()
  @IsIn([...PLAN_IDS])
  planId: string;
}
