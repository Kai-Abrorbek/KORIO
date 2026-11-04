import api, { ApiError, BASE_URL, TokenStorage } from "@/services/api";
import type { LiveKitGrant } from "@/features/voice-tutor/services/livekit";

export interface GrokPromoOptions {
  available: boolean;
  reason?: "NOT_CONFIGURED";
  maxDurationSec: number;
  voice: string;
  name: string;
}

export interface GrokPromoSession {
  sessionId: string;
  status: "active";
  maxDurationSec: number;
  livekit: LiveKitGrant;
}

/** These admin endpoints never read or update the ordinary tutor's settings. */
export const GrokPromoApi = {
  // This discovery also runs for ordinary learners. A failed optional feature
  // check must not open the app-wide network/server error dialog.
  options: async (): Promise<GrokPromoOptions> => {
    const token = await TokenStorage.get();
    if (!token) throw new ApiError("UNAUTHORIZED", 401);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    try {
      const response = await fetch(`${BASE_URL}/grok-promo-tutor/options`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });
      if (!response.ok) throw new ApiError("GROK_PROMO_UNAVAILABLE", response.status);
      return await response.json() as GrokPromoOptions;
    } finally {
      clearTimeout(timer);
    }
  },
  start: () => api.post<GrokPromoSession>("/grok-promo-tutor/sessions", {}),
  end: (id: string) => api.post(`/grok-promo-tutor/sessions/${encodeURIComponent(id)}/end`, {}),
};
