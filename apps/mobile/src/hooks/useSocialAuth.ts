import { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";

import { BASE_URL } from "@/services/api";
import {
  completeSocialAuth,
  getSocialAuthDestination,
  parseSocialAuthCallbackUrl,
} from "@/services/social-auth.service";

/**
 * 카카오·네이버·텔레그램 로그인.
 *
 * 셋 다 "브라우저를 열고 → 앱 스킴으로 토큰을 받아온다" 로 흐름이 같아서
 * 훅 하나로 묶었다. 코드 교환과 프로필 조회는 서버가 한다 —
 * client secret 을 앱에 심으면 디컴파일로 그대로 털린다.
 *
 * 구글만 별도(useGoogleAuth): 네이티브 SDK 로 id_token 을 받아 서버가 검증한다.
 */
export type SocialProvider = "kakao" | "naver" | "telegram";

/**
 * 소셜 로그인이 때릴 주소. /auth/telegram/widget, /auth/kakao/start 는 전부
 * **우리 API 서버**의 엔드포인트라, 기본값은 그냥 API 주소다.
 *
 * 예전엔 EXPO_PUBLIC_SOCIAL_AUTH_BASE / EXPO_PUBLIC_TELEGRAM_AUTH_BASE 를
 * 따로 채워야 했는데, 값이 API 주소와 같은데도 안 채우면 API_BASE 가
 * undefined 라 소셜 로그인만 조용히 죽었다. 같은 값을 세 번 적게 두면
 * 배포 때 하나는 반드시 빠진다. 이제 안 넣으면 API 주소를 쓴다.
 *
 * 인증 서버를 따로 둘 때만 환경변수로 덮어쓴다.
 */
const API_BASE =
  process.env.EXPO_PUBLIC_SOCIAL_AUTH_BASE?.trim() ||
  process.env.EXPO_PUBLIC_TELEGRAM_AUTH_BASE?.trim() ||
  BASE_URL;

export function useSocialAuth(
  provider: SocialProvider,
  onError?: (code: string) => void,
  sessionId?: string,
) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    if (!API_BASE) {
      onError?.("SOCIAL_LOGIN_FAILED");
      return;
    }
    setLoading(true);
    try {
      const redirectUrl = Linking.createURL("auth/social-callback");
      // 텔레그램만 위젯 페이지를 거친다 (OAuth 가 아니라 서명 방식)
      const path =
        provider === "telegram"
          ? "/auth/telegram/widget"
          : `/auth/${provider}/start`;
      const url =
        `${API_BASE}${path}?redirect=${encodeURIComponent(redirectUrl)}` +
        (sessionId ? `&session=${encodeURIComponent(sessionId)}` : "");

      const result = await WebBrowser.openAuthSessionAsync(url, redirectUrl);
      if (result.type !== "success" || !result.url) {
        setLoading(false);
        return; // 사용자가 닫은 것 — 에러 띄우지 않는다
      }

      const callback = parseSocialAuthCallbackUrl(result.url);
      const err = callback?.error;
      const token = callback?.token;

      if (err || !token) {
        // 서버가 왜 실패했는지 붙여 보내준다. 설정 누락이면 바로 드러난다
        onError?.(err || "SOCIAL_LOGIN_FAILED");
        setLoading(false);
        return;
      }

      const user = await completeSocialAuth(token);
      router.replace(getSocialAuthDestination(user));
    } catch (e: any) {
      onError?.(e?.message ?? "SOCIAL_LOGIN_FAILED");
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
}
