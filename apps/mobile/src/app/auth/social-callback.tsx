import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useAuthHydrated } from "@/hooks/useAuthGuard";
import {
  clearStagedSocialAuthCallback,
  completeSocialAuth,
  getSocialAuthDestination,
  normalizeSocialAuthError,
  peekStagedSocialAuthCallback,
} from "@/services/social-auth.service";
import { useTheme } from "@/hooks/useTheme";

function firstString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default function SocialAuthCallbackScreen() {
  const router = useRouter();
  const hydrated = useAuthHydrated();
  const theme = useTheme();
  const params = useLocalSearchParams<{
    token?: string | string[];
    error?: string | string[];
  }>();
  const tokenParam = firstString(params.token);
  const errorParam = firstString(params.error);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    let active = true;
    const staged = peekStagedSocialAuthCallback();
    const token = tokenParam ?? staged?.token;
    const callbackError = errorParam ?? staged?.error;

    const finish = async () => {
      if (callbackError || !token) {
        clearStagedSocialAuthCallback(staged);
        router.replace({
          pathname: "/auth/login",
          params: {
            socialError: normalizeSocialAuthError(callbackError),
          },
        });
        return;
      }

      try {
        const user = await completeSocialAuth(token);
        if (active) {
          router.replace(getSocialAuthDestination(user));
        }
      } catch (error) {
        if (active) {
          const code =
            error instanceof Error ? error.message : "SOCIAL_LOGIN_FAILED";
          router.replace({
            pathname: "/auth/login",
            params: { socialError: normalizeSocialAuthError(code) },
          });
        }
      } finally {
        clearStagedSocialAuthCallback(staged);
      }
    };

    void finish();

    return () => {
      active = false;
    };
  }, [errorParam, hydrated, router, tokenParam]);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
