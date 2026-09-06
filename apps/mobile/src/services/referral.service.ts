import api from "./api";

export interface InviteMilestone {
  count: number;
  gems: number;
  reached: boolean;
  claimed: boolean;
}

export interface InvitedFriend {
  id: string;
  nickname: string;
  username: string;
  profileImage: string;
  avatar: any;
  gems: number;
  joinedAt: string;
}

export interface MyInvite {
  code: string;
  link: string;
  rewardGems: number;
  invitedCount: number;
  gemsEarned: number;
  /** 아직 아무의 코드도 안 썼고 기한도 안 지났으면 true */
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
  | {
      success: true;
      gems: number;
      overCap: boolean;
      inviter: {
        id: string;
        nickname: string;
        profileImage: string;
        avatar: any;
      };
    }
  | { success: false; error: ClaimError };

export const ReferralApi = {
  me: (): Promise<MyInvite> => api.get("/referrals/me"),

  claim: (code: string, source: "link" | "code" = "code"): Promise<ClaimResult> =>
    api.post("/referrals/claim", { code, source }),
};
