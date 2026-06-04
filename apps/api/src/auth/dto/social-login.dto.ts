import { IsOptional, IsString } from 'class-validator';
import { AuthProvider } from '../../common/enums/provider.enum';

export class SocialLoginDto {
  @IsString()
  provider: AuthProvider; // 'google' | 'kakao' | 'naver' | 'telegram'

  @IsString()
  providerId: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  sessionId?: string; // 온보딩 데이터 연결용
}
