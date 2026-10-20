import { IsIn, IsInt, IsString, Max, Min, ValidateIf } from 'class-validator';

export const PRON_LEVELS = ['lv1', 'lv2', 'lv3', 'lv4'] as const;
export const PRON_MODES = ['easy', 'hard'] as const;

export class SavePronunciationDto {
  @ValidateIf(
    (_object: SavePronunciationDto, value: unknown) => value !== undefined,
  )
  @IsIn(['ko', 'en'])
  targetLanguage?: 'ko' | 'en';

  @IsString()
  @IsIn([...PRON_LEVELS])
  level: (typeof PRON_LEVELS)[number];

  @IsInt()
  @Min(1)
  @Max(50)
  step: number;

  @IsString()
  @IsIn([...PRON_MODES])
  mode: (typeof PRON_MODES)[number];

  @IsInt()
  @Min(0)
  @Max(100)
  score: number;
}
