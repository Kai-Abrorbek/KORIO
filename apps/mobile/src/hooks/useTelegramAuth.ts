import { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { TokenStorage } from "@/services/api";
import { useAuthStore } from "@/store/auth.store";
import { UserService } from "@/services/user.service";

const TG_BASE = process.env.EXPO_PUBLIC_TELEGRAM_AUTH_BASE;

export function useTelegramAuth(
  onError?: (code: string) => void,
  sessionId?: string,
) {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    if (!TG_BASE) {
      onError?.("SOCIAL_LOGIN_FAILED");
      return;
    }
    setLoading(true);
    try {
      const redirectUrl = Linking.createURL("telegram-auth"); // mobile://telegram-auth
      const url =
        `${TG_BASE}/auth/telegram/widget?redirect=${encodeURIComponent(redirectUrl)}` +
        (sessionId ? `&session=${encodeURIComponent(sessionId)}` : "");

      const result = await WebBrowser.openAuthSessionAsync(url, redirectUrl);
      if (result.type !== "success" || !result.url) {
        setLoading(false);
        return; // 취소/닫힘 → 조용히
      }

      const { queryParams } = Linking.parse(result.url);
      const token = queryParams?.token as string | undefined;
      if (!token) {
        onError?.("SOCIAL_LOGIN_FAILED");
        setLoading(false);
        return;
      }

      await TokenStorage.set(token);
      const me: any = await UserService.getMe(); // 토큰으로 유저 조회
      setUser(me, token);
      router.replace("/(tabs)");
    } catch (e: any) {
      onError?.(e?.message ?? "SOCIAL_LOGIN_FAILED");
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
}
