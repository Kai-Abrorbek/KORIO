import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { AuthProvider } from "@/types/enums";

WebBrowser.maybeCompleteAuthSession();

// onError: 에러코드 콜백 (login 화면에서 t()로 표시)
export function useGoogleAuth(
  onError?: (code: string) => void,
  sessionId?: string,
) {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (!response) return;
    if (response.type === "success" && response.params?.id_token) {
      finish(response.params.id_token);
    } else if (response.type === "error") {
      setLoading(false);
      onError?.("SOCIAL_LOGIN_FAILED");
    } else {
      setLoading(false); // dismiss / cancel → 조용히 종료
    }
  }, [response]);

  const finish = async (idToken: string) => {
    try {
      const res: any = await authService.socialLogin({
        provider: AuthProvider.GOOGLE,
        idToken,
        sessionId,
      });
      setUser(res.user, res.accessToken);
      router.replace("/(tabs)");
    } catch (e: any) {
      onError?.(e?.message ?? "SOCIAL_LOGIN_FAILED");
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    if (!request) return;
    setLoading(true);
    await promptAsync();
  };

  return { signIn, loading, ready: !!request };
}
