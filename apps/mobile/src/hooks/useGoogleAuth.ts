import { useState } from "react";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { AuthProvider } from "@/types/enums";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID, // ⚠️ 웹 클라 ID (id_token용)
  // androidClientId는 자동으로 SHA-1로 매칭됨
});

export function useGoogleAuth(
  onError?: (code: string) => void,
  sessionId?: string,
) {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();

      await GoogleSignin.signOut();

      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;
      if (!idToken) {
        onError?.("SOCIAL_LOGIN_FAILED");
        return;
      }

      const res: any = await authService.socialLogin({
        provider: AuthProvider.GOOGLE,
        idToken,
        sessionId,
      });
      setUser(res.user, res.accessToken);
      router.replace("/(tabs)");
    } catch (e: any) {
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        // 사용자가 취소 → 조용히
      } else {
        onError?.(e?.message ?? "SOCIAL_LOGIN_FAILED");
      }
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, ready: true };
}
