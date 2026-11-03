import { IsString, MaxLength } from 'class-validator';

/** POST /auth/oauth/exchange — 소셜 로그인 일회용 코드 + 앱이 들고 있던 verifier */
export class ExchangeLoginCodeDto {
  @IsString()
  @MaxLength(1024)
  loginCode: string;

  @IsString()
  @MaxLength(128)
  codeVerifier: string;
}
