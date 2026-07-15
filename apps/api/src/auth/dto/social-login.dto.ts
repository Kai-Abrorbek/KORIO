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

  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() nickname?: string;
  @IsOptional() @IsString() profileImage?: string;
  @IsOptional() @IsString() sessionId?: string;
}
