import { IsString, MaxLength, MinLength } from 'class-validator';

export class GlossWordDto {
  /**
   * 본문에 나온 그대로의 단어.
   * 서버가 이 레슨 본문에 실제로 있는지 확인한 뒤에만 처리한다.
   */
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  word: string;
}
