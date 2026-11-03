import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useAuthHydrated } from "@/hooks/useAuthGuard";
import {
  clearStagedSocialAuthCallback,
  completeSocialAuthCallback,
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
    login_code?: string | string[];
    error?: string | string[];
  }>();
  const tokenParam = firstString(params.token);
  const loginCodeParam = firstString(params.login_code);
  const errorParam = firstString(params.error);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    let active = true;
    const staged = peekStagedSocialAuthCallback();
    const token = tokenParam ?? staged?.token;
    const loginCode = loginCodeParam ?? staged?.loginCode;
    const callbackError = errorParam ?? staged?.error;

    const finish = async () => {
      if (callbackError || !(token || loginCode)) {
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
        const user = await completeSocialAuthCallback({ token, loginCode });
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
  }, [errorParam, hydrated, loginCodeParam, router, tokenParam]);

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
