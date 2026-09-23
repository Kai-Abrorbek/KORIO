import type {
  ClaimResult,
  FriendProfile,
  MyInvite,
  SocialUser,
  WeeklyStats,
} from "../model/social";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export const getFollowing = (request: AuthenticatedRequest, userId?: string) =>
  request<SocialUser[]>(userId ? `/users/${userId}/following` : "/users/me/following");

export const getFollowers = (request: AuthenticatedRequest, userId?: string) =>
  request<SocialUser[]>(userId ? `/users/${userId}/followers` : "/users/me/followers");

export const getSuggestions = (request: AuthenticatedRequest) =>
  request<SocialUser[]>("/users/suggestions");

export const searchUsers = (request: AuthenticatedRequest, query: string) =>
  request<SocialUser[]>(`/users/search?q=${encodeURIComponent(query)}`);

export const getUser = (request: AuthenticatedRequest, id: string) =>
  request<FriendProfile>(`/users/${id}`);

export const getUserWeekly = (request: AuthenticatedRequest, id: string) =>
  request<WeeklyStats>(`/users/${id}/stats/weekly`);

export const getMyWeekly = (request: AuthenticatedRequest) =>
  request<WeeklyStats>("/users/me/stats/weekly");

export const followUser = (request: AuthenticatedRequest, id: string) =>
  request<{ success: boolean }>(`/users/follow/${id}`, { method: "POST", body: "{}" });

export const unfollowUser = (request: AuthenticatedRequest, id: string) =>
  request<{ success: boolean }>(`/users/follow/${id}`, { method: "DELETE" });

export const getMyInvite = (request: AuthenticatedRequest) =>
  request<MyInvite>("/referrals/me");

export const claimInvite = (request: AuthenticatedRequest, code: string) =>
  request<ClaimResult>("/referrals/claim", {
    method: "POST",
    body: JSON.stringify({ code, source: "code" }),
  });
