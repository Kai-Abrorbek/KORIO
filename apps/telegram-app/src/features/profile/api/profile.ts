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

/**
 * 메일 코드 → 1회용 토큰 → 새 비밀번호. 로그인 화면의 "비밀번호 찾기" 와 같은
 * 공개 엔드포인트다. purpose 는 메일 문구만 바꾼다 (setPassword = 비밀번호 만들기 안내).
 */
export function requestPasswordCode(request: AuthenticatedRequest, email: string, lang: string, purpose: "reset" | "setPassword") {
  return request<{ success: boolean }>("/auth/password/forgot", { body: JSON.stringify({ email, lang, purpose }), method: "POST" });
}

export function verifyPasswordCode(request: AuthenticatedRequest, email: string, code: string) {
  return request<{ resetToken: string; expiresInSec: number }>("/auth/password/verify", { body: JSON.stringify({ email, code }), method: "POST" });
}

/** 응답의 accessToken 으로 갈아끼워야 한다 — 옛 토큰은 여기서 죽는다 */
export function resetPasswordWithToken(request: AuthenticatedRequest, resetToken: string, newPassword: string) {
  return request<{ accessToken: string }>("/auth/password/reset", { body: JSON.stringify({ resetToken, newPassword }), method: "POST" });
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
