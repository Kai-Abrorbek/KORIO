import * as Linking from "expo-linking";

import { TokenStorage } from "@/services/api";
import { UserService, type UserMe } from "@/services/user.service";
import { useAuthStore, type User } from "@/store/auth.store";

export type SocialAuthCallbackPayload = {
  token?: string;
  error?: string;
};

type PendingCompletion = {
  token: string;
  promise: Promise<UserMe>;
};

const CALLBACK_ROUTES = [
  "auth/social-callback",
  "kakao-auth",
  "naver-auth",
  "telegram-auth",
  "social-auth",
] as const;

let stagedCallback: SocialAuthCallbackPayload | null = null;
let pendingCompletion: PendingCompletion | null = null;

function firstString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function normalizeSocialAuthError(value?: string): string {
  if (value && /^[A-Z][A-Z0-9_]{0,63}$/.test(value)) {
    return value;
  }

  return "SOCIAL_LOGIN_FAILED";
}

export function parseSocialAuthCallbackUrl(
  url: string,
): SocialAuthCallbackPayload | null {
  try {
    const parsed = Linking.parse(url);
    const scheme = parsed.scheme?.toLowerCase();
    if (scheme && !["mobile", "korio", "exp", "http", "https"].includes(scheme)) {
      return null;
    }

    const route = [parsed.hostname, parsed.path]
      .filter(Boolean)
      .join("/")
      .replace(/^\/+|\/+$/g, "");
    const isSocialCallback = CALLBACK_ROUTES.some(
      (candidate) => route === candidate || route.endsWith("/" + candidate),
    );

    if (!isSocialCallback) {
      return null;
    }

    const token = firstString(parsed.queryParams?.token);
    const error = firstString(parsed.queryParams?.error);

    return {
      token: token?.trim() || undefined,
      error: error ? normalizeSocialAuthError(error) : undefined,
    };
  } catch {
    return null;
  }
}

export function stageSocialAuthCallback(
  payload: SocialAuthCallbackPayload,
): void {
  stagedCallback = payload;
}

export function peekStagedSocialAuthCallback(): SocialAuthCallbackPayload | null {
  return stagedCallback;
}

export function clearStagedSocialAuthCallback(
  payload: SocialAuthCallbackPayload | null,
): void {
  if (stagedCallback === payload) {
    stagedCallback = null;
  }
}

export function getSocialAuthDestination(
  user: Pick<UserMe, "isOnboardingCompleted">,
): "/(tabs)" | "/onboarding/survey" {
  return user.isOnboardingCompleted ? "/(tabs)" : "/onboarding/survey";
}

export async function completeSocialAuth(token: string): Promise<UserMe> {
  const normalizedToken = token.trim();
  if (!normalizedToken || normalizedToken.length > 8192) {
    throw new Error("SOCIAL_LOGIN_FAILED");
  }

  const auth = useAuthStore.getState();
  if (
    auth.accessToken === normalizedToken &&
    auth.user?.isOnboardingCompleted !== undefined
  ) {
    return auth.user as unknown as UserMe;
  }

  if (pendingCompletion?.token === normalizedToken) {
    return pendingCompletion.promise;
  }

  const promise = (async () => {
    await TokenStorage.set(normalizedToken);
    const user = await UserService.getMe();
    useAuthStore
      .getState()
      .setUser(user as unknown as User, normalizedToken);
    return user;
  })();

  pendingCompletion = { token: normalizedToken, promise };

  try {
    return await promise;
  } finally {
    if (pendingCompletion?.promise === promise) {
      pendingCompletion = null;
    }
  }
}
