import { ArrayMaxSize, IsArray, IsString } from 'class-validator';

export class MarkSeenWordsDto {
  /** 카드로 넘겨 본 단어들. 앱이 모아서 한 번에 보낸다 */
  @IsArray()
  @ArrayMaxSize(200)
  @IsString({ each: true })
  ids: string[];
}
