import { ArrayMaxSize, IsArray, IsString, MaxLength } from 'class-validator';

/**
 * POST /users/match-contacts.
 * 예전엔 `@Body('names') names: string[]` 라 검증이 아예 없었다.
 * 숫자나 객체가 섞여 오면 서비스의 n.trim() 이 던져서 500 이 났다.
 */
export class MatchContactsDto {
  @IsArray()
  @ArrayMaxSize(500)
  @IsString({ each: true })
  @MaxLength(60, { each: true })
  names: string[];
}
