import api, { TokenStorage } from "./api";
import { AuthProvider } from "@/types/enums";

interface RegisterData {
  email: string;
  password: string;
  nickname: string;
  sessionId?: string;
}

interface LoginData {
  email: string;
  password: string;
  sessionId?: string;
}

interface SocialLoginData {
  provider: AuthProvider;
  providerId?: string; // 옵셔널로
  idToken?: string; // 추가
  email?: string;
  nickname?: string;
  profileImage?: string;
  sessionId?: string;
}

export const authService = {
  register: async (data: RegisterData) => {
    const res: any = await api.post("/auth/register", data);
    if (res?.accessToken) await TokenStorage.set(res.accessToken);
    return res;
  },

  login: async (data: LoginData) => {
    const res: any = await api.post("/auth/login", data);
    if (res?.accessToken) await TokenStorage.set(res.accessToken);
    return res;
  },

  socialLogin: async (data: SocialLoginData) => {
    const res: any = await api.post("/auth/social", data);
    if (res?.accessToken) await TokenStorage.set(res.accessToken);
    return res;
  },

  // ───────── 비밀번호 찾기 ─────────
  //
  // 1) forgotPassword  이메일 → 코드 발송
  // 2) verifyResetCode 코드 → 1회용 토큰
  // 3) resetPassword   토큰 + 새 비밀번호 → 바로 로그인
  //
  // 1번은 계정이 없어도 성공으로 온다. 서버가 일부러 구분해서 안 알려준다
  // (여기서 실패를 돌려주면 이 엔드포인트가 회원 조회기가 된다).

  forgotPassword: (data: { email: string; lang?: string }) =>
    api.post("/auth/password/forgot", data) as Promise<{ success: boolean }>,

  verifyResetCode: (data: { email: string; code: string }) =>
    api.post("/auth/password/verify", data) as Promise<{
      resetToken: string;
      expiresInSec: number;
    }>,

  resetPassword: async (data: { resetToken: string; newPassword: string }) => {
    const res: any = await api.post("/auth/password/reset", data);
    if (res?.accessToken) await TokenStorage.set(res.accessToken);
    return res;
  },

  logout: async () => {
    await TokenStorage.remove();
  },

  getToken: () => TokenStorage.get(),
};
