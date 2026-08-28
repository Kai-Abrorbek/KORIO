import type { AvatarConfig } from "@/types/avatar";

export type FriendTab = "following" | "followers";

export interface Friend {
  id: string;
  name: string;
  avatarUri?: string;
  primaryFlag?: string;
  /** 누적 XP. 예전엔 level 이라는 이름으로 XP 를 넣고 있어서
   *  같은 자리에 1250(XP)과 2(레벨)가 번갈아 나왔다. */
  xp?: number;
  isFollowing?: boolean;
  isFollowedBy?: boolean;
  isMe?: boolean;
  avatar?: AvatarConfig;
}

export interface FriendsData {
  following: Friend[];
  followers: Friend[];
}
