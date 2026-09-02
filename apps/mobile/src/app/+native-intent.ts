import {
  parseSocialAuthCallbackUrl,
  stageSocialAuthCallback,
} from "@/services/social-auth.service";

export function redirectSystemPath({
  path,
}: {
  path: string;
  initial: boolean;
}): string {
  const callback = parseSocialAuthCallbackUrl(path);
  if (!callback) {
    return path;
  }

  // Keep OAuth credentials out of Expo Router's unmatched-route UI and history.
  stageSocialAuthCallback(callback);
  return "/auth/social-callback";
}
