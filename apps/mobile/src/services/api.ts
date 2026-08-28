import { Platform } from "react-native";
import { useErrorStore } from "@/store/error.store";

const DEV_LAN_IP = process.env.EXPO_PUBLIC_DEV_LAN_IP ?? "localhost";

const DEV_BASE_URL =
  Platform.select({
    web: "http://localhost:3000",
    ios: `http://${DEV_LAN_IP}:3000`,
    android: `http://${DEV_LAN_IP}:3000`,
  }) ?? "http://localhost:3000";

/**
 * 배포 빌드는 EXPO_PUBLIC_API_URL 을 반드시 https 로 넣어야 한다.
 * 이게 없으면 스토어에 올라간 앱이 http://localhost:3000 을 때리게 되고,
 * http 로 넣으면 액세스 토큰이 평문으로 오간다. 그래서 조용히 넘어가지 않고
 * 개발 중에는 콘솔로, 배포 빌드에서는 곧바로 던져서 알린다.
 */
const CONFIGURED_URL = process.env.EXPO_PUBLIC_API_URL?.trim();

function resolveBaseUrl(): string {
  if (!CONFIGURED_URL) {
    if (!__DEV__) {
      throw new Error(
        "EXPO_PUBLIC_API_URL 이 설정되지 않았다. 배포 빌드는 https 주소가 필요하다.",
      );
    }
    return DEV_BASE_URL;
  }
  if (!__DEV__ && !CONFIGURED_URL.startsWith("https://")) {
    throw new Error(
      "EXPO_PUBLIC_API_URL 은 https 여야 한다. http 면 토큰이 평문으로 나간다.",
    );
  }
  return CONFIGURED_URL.replace(/\/+$/, "");
}

export const BASE_URL = resolveBaseUrl();

export class ApiError extends Error {
  code: string;
  status: number;
  constructor(code: string, status = 0) {
    super(code);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

const TokenStorage = {
  get: async (): Promise<string | null> => {
    if (Platform.OS === "web") {
      return localStorage.getItem("access_token");
    }
    const SecureStore = await import("expo-secure-store");
    return SecureStore.getItemAsync("access_token");
  },
  set: async (token: string): Promise<void> => {
    if (Platform.OS === "web") {
      localStorage.setItem("access_token", token);
      return;
    }
    const SecureStore = await import("expo-secure-store");
    await SecureStore.setItemAsync("access_token", token);
  },
  remove: async (): Promise<void> => {
    if (Platform.OS === "web") {
      localStorage.removeItem("access_token");
      return;
    }
    const SecureStore = await import("expo-secure-store");
    await SecureStore.deleteItemAsync("access_token");
  },
};

function resolveCode(status: number, backendMsg?: string): string {
  if (backendMsg) return backendMsg; // 백엔드 코드 우선 (INVALID_CREDENTIALS 등)
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  if (status === 404) return "NOT_FOUND";
  if (status >= 500) return "SERVER_ERROR";
  return "UNKNOWN_ERROR";
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await TokenStorage.get();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) ?? {}),
  };

  // 네트워크/서버(5xx) 실패 → 모달에 재시도 여부 묻고 대기. 재시도면 루프 반복.
  while (true) {
    let res: Response;
    try {
      res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
    } catch {
      const retry = await useErrorStore.getState().present("NETWORK_ERROR");
      if (retry) continue;
      throw new ApiError("NETWORK_ERROR", 0);
    }

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (res.ok) return data;

    if (res.status >= 500) {
      const retry = await useErrorStore.getState().present("SERVER_ERROR");
      if (retry) continue;
      throw new ApiError("SERVER_ERROR", res.status);
    }

    // 4xx: 호출부가 인라인 처리 (모달/재시도 없음)
    throw new ApiError(resolveCode(res.status, data?.message), res.status);
  }
}

const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: any) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  /**
   * 바이너리 그대로 POST (오디오 업로드용).
   * base64 로 감싸면 33% 커져서 raw 로 보낸다 — RN 의 XHR 이 ArrayBuffer 바디를 지원한다.
   */
  postBinary: <T>(path: string, body: ArrayBuffer, contentType: string) =>
    request<T>(path, {
      method: "POST",
      body: new Uint8Array(body) as any,
      headers: { "Content-Type": contentType },
    }),
  patch: <T>(path: string, body: any) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

export { TokenStorage };
export default api;
