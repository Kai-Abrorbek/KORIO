import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SaveSpeakingProgressDto {
  /** 다음에 시작할 문장 번호 (0-based). total 과 같으면 주제를 끝낸 것 */
  @Type(() => Number)
  @IsInt()
  @Min(0)
  index: number;

  /** 이 주제의 문장 수 */
  @Type(() => Number)
  @IsInt()
  @Min(0)
  total: number;
}
