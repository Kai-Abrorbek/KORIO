export type FriendTab = "following" | "followers";

export interface Friend {
  id: string;
  name: string;
  avatarUri?: string;
  primaryFlag?: string;
  level?: number;
  isFollowing?: boolean;
  isFollowedBy?: boolean;
  isMe?: boolean;
}

export interface FriendsData {
  following: Friend[];
  followers: Friend[];
}
