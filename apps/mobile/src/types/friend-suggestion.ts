import { AvatarConfig } from "./avatar";

export interface FriendSuggestion {
  id: string;
  name: string;
  avatar?: AvatarConfig;
  avatarUri?: string;
  reason: string;
  isFollowing?: boolean;
  isFollowedBy?: boolean;
}
