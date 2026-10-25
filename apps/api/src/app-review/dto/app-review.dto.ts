import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {
  APP_REVIEW,
  APP_REVIEW_DISMISS_MODES,
  APP_REVIEW_PLATFORMS,
} from '../app-review.const';

export class CreateAppReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  @MaxLength(APP_REVIEW.COMMENT_MAX)
  comment?: string;

  @IsOptional()
  @IsIn(APP_REVIEW_PLATFORMS)
  platform?: (typeof APP_REVIEW_PLATFORMS)[number];

  @IsOptional()
  @IsString()
  @MaxLength(32)
  appVersion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  locale?: string;
}

export class DismissAppReviewDto {
  @IsIn(APP_REVIEW_DISMISS_MODES)
  mode: (typeof APP_REVIEW_DISMISS_MODES)[number];
}
