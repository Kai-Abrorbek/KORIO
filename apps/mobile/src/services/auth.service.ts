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
}

interface SocialLoginData {
  provider: AuthProvider;
  providerId: string;
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

  logout: async () => {
    await TokenStorage.remove();
  },

  getToken: () => TokenStorage.get(),
};
