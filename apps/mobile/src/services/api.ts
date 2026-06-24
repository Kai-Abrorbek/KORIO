import { Platform } from "react-native";

const DEV_LAN_IP = "192.168.45.192";

const BASE_URL =
  Platform.select({
    web: "http://localhost:3000",
    ios: `http://${DEV_LAN_IP}:3000`,
    android: `http://${DEV_LAN_IP}:3000`,
  }) ?? "http://localhost:3000";

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

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await TokenStorage.get();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((options.headers as Record<string, string>) ?? {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "UNKNOWN_ERROR");
  }

  return data;
}

const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: any) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: any) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

export { TokenStorage };
export default api;
