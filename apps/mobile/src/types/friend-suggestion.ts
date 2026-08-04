export interface FriendSuggestion {
  id: string;
  name: string;
  avatarUri?: string;
  reason: string;
  isFollowing?: boolean;
  isFollowedBy?: boolean;
}
