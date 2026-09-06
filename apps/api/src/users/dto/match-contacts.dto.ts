import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

/**
 * POST /users/match-contacts.
 *
 * 이름이 아니라 **전화번호 해시**를 받는다. 이름 매칭은 거의 안 맞았고
 * (연락처 이름 "엄마" vs 닉네임 "haneul22"), 아무 이름이나 던져서 가입자를
 * 훑을 수 있는 구멍이기도 했다.
 */
export class MatchContactsDto {
  @IsArray()
  @ArrayMaxSize(2000)
  @IsString({ each: true })
  @Matches(/^[a-fA-F0-9]{64}$/, { each: true })
  hashes: string[];
}

export class SetPhoneDto {
  /** E.164 (+998901234567). 서버는 해시와 뒷 4자리만 저장한다 */
  @IsString()
  @MaxLength(20)
  phone: string;
}

export class ContactsDiscoverableDto {
  @IsBoolean()
  discoverable: boolean;
}
