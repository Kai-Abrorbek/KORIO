import type { AvatarConfig } from "../../../shared/model/avatar";
import type { UserMe } from "../model/profile";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getMe(request: AuthenticatedRequest) {
  return request<UserMe>("/users/me");
}

export function updateMe(request: AuthenticatedRequest, data: Partial<Pick<UserMe, "nickname" | "username" | "bio">>) {
  return request<UserMe>("/users/me", { body: JSON.stringify(data), method: "PATCH" });
}

export function checkUsername(request: AuthenticatedRequest, username: string) {
  return request<{ available: boolean; reason: string | null }>(`/users/me/check-username?username=${encodeURIComponent(username)}`);
}

export function changePassword(request: AuthenticatedRequest, currentPassword: string, newPassword: string) {
  return request<{ success: boolean }>("/users/me/password", { body: JSON.stringify({ currentPassword, newPassword }), method: "POST" });
}

export function deleteAccount(request: AuthenticatedRequest) {
  return request<{ success: boolean }>("/users/me", { method: "DELETE" });
}

export function logoutAll(request: AuthenticatedRequest) {
  return request<{ success: boolean }>("/users/me/logout-all", { body: "{}", method: "POST" });
}

export function updateAvatar(request: AuthenticatedRequest, avatar: AvatarConfig) {
  return request<{ avatar: AvatarConfig }>("/users/me/avatar", { body: JSON.stringify(avatar), method: "PATCH" });
}
