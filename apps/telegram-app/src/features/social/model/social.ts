import type { AvatarConfig } from "../../../shared/model/avatar";

export interface SocialUser {
  id: string;
  nickname: string;
  username?: string;
  profileImage?: string;
  avatar?: Partial<AvatarConfig> | null;
  targetLanguage?: string;
  totalXP?: number;
  streak?: number;
  league?: string;
  isSuper?: boolean;
  isOnline?: boolean;
  isMe?: boolean;
  isFollowing?: boolean;
  isFollowedBy?: boolean;
  reasonName?: string;
}

export interface FriendProfile extends SocialUser {
  bio?: string;
  joinedYear?: number;
  coursePrimaryFlag?: string;
  courseExtraCount?: number;
  followingCount?: number;
  followersCount?: number;
  languageLevel?: number;
  followedBy?: Array<{ id: string; nickname: string; profileImage?: string }>;
  followedByCount?: number;
}

export interface WeeklyDay {
  date: string;
  xpEarned?: number;
}

export interface WeeklyStats {
  days: WeeklyDay[];
}

export interface InviteMilestone {
  count: number;
  gems: number;
  reached: boolean;
  claimed: boolean;
}

export interface InvitedFriend {
  id: string;
  nickname: string;
  username?: string;
  profileImage?: string;
  avatar?: Partial<AvatarConfig> | null;
  gems: number;
  joinedAt: string;
}

export interface MyInvite {
  code: string;
  link: string;
  rewardGems: number;
  invitedCount: number;
  gemsEarned: number;
  canRedeem: boolean;
  milestones: InviteMilestone[];
  invited: InvitedFriend[];
}

export type ClaimError =
  | "INVALID_CODE"
  | "CODE_NOT_FOUND"
  | "SELF_REFERRAL"
  | "ALREADY_CLAIMED"
  | "WINDOW_CLOSED"
  | "CIRCULAR";

export type ClaimResult =
  | { success: true; gems: number; overCap: boolean; inviter: SocialUser }
  | { success: false; error: ClaimError };

export const CLAIM_ERRORS: Record<ClaimError, string> = {
  INVALID_CODE: "Kod formati noto‘g‘ri. Qaytadan tekshiring.",
  CODE_NOT_FOUND: "Bunday kod yo‘q. Qaytadan tekshiring.",
  SELF_REFERRAL: "O‘z kodingizni ishlatib bo‘lmaydi.",
  ALREADY_CLAIMED: "Siz allaqachon taklif kodidan foydalangansiz.",
  WINDOW_CLOSED: "Taklif kodi faqat ro‘yxatdan o‘tgandan keyin qisqa vaqt ishlaydi.",
  CIRCULAR: "Bir-biringizni taklif qilib mukofot olib bo‘lmaydi.",
};

export const languageFlag = (language?: string) =>
  ({ ko: "🇰🇷", en: "🇺🇸", uz: "🇺🇿", ru: "🇷🇺" })[language ?? ""] ?? "🇰🇷";
