import api from "./api";
import { AuthProvider } from "../types/enums";

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
  register: (data: RegisterData) => api.post("/auth/register", data),

  login: (data: LoginData) => api.post("/auth/login", data),

  socialLogin: (data: SocialLoginData) => api.post("/auth/social", data),
};
