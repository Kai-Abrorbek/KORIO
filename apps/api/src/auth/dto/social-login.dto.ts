import { Transform } from 'class-transformer';
import { normalizeEmailOptional } from '../../common/normalize-email';
import { IsOptional, IsString } from 'class-validator';
import { AuthProvider } from '../../common/enums/provider.enum';

export class SocialLoginDto {
  @IsString()
  provider: AuthProvider;

  @IsOptional()
  @IsString()
  providerId?: string; // 토큰 검증 안 하는 provider용 (임시)

  @IsOptional()
  @IsString()
  idToken?: string; // 구글 등 서버 검증용

  // 저장·조회를 같은 형태로 맞춘다. 안 하면 대소문자만 다른 계정이 갈라진다
  @Transform(({ value }) => normalizeEmailOptional(value))
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() nickname?: string;
  @IsOptional() @IsString() profileImage?: string;
  @IsOptional() @IsString() sessionId?: string;
}
