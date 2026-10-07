import { Share } from "react-native";
import type { TFunction } from "i18next";
import { ReferralApi } from "@/services/referral.service";
import {
  RetentionService,
  type QuestEventType,
} from "@/services/retention.service";
import { useRetentionStore } from "@/store/retention.store";
import { useAuthStore } from "@/store/auth.store";

/**
 * 공유·초대처럼 서버가 직접 못 보는 행동을 알리고, 홈 퀘스트를 갱신한다.
 * 실패해도 조용히 — 퀘스트 때문에 공유가 막히면 안 된다.
 */
export async function reportQuestEvent(type: QuestEventType) {
  try {
    const { quests } = await RetentionService.questEvent(type);
    useRetentionStore.getState().patch((s) => ({ ...s, quests }));
  } catch {
    /* 다음 새로고침이 맞춘다 */
  }
}

async function myInvite() {
  try {
    return await ReferralApi.me();
  } catch {
    return null;
  }
}

/** 공유 시트를 띄우고, 실제로 보냈으면(닫기만 한 게 아니면) true */
async function shareText(message: string): Promise<boolean> {
  try {
    const res = await Share.share({ message });
    return res.action !== Share.dismissedAction;
  } catch {
    return false;
  }
}

/** 퀘스트 "친구에게 KORIO 초대장 보내기" — 초대 화면과 같은 문구 */
export async function shareInviteQuest(t: TFunction): Promise<boolean> {
  const invite = await myInvite();
  if (!invite) return false;
  const nickname = useAuthStore.getState().user?.nickname ?? "";
  const sent = await shareText(
    t("invite.shareMessage", {
      nickname,
      gems: invite.rewardGems,
      code: invite.code,
      link: invite.link,
    }),
  );
  if (sent) await reportQuestEvent("shareInvite");
  return sent;
}

/** 퀘스트 "내 공부 기록 공유하기" — 연속 기록 + 초대 코드 */
export async function shareProgressQuest(
  t: TFunction,
  streak: number,
): Promise<boolean> {
  const invite = await myInvite();
  const code = invite?.code ?? "";
  const link = invite?.link ?? "https://korio.online";
  const message =
    streak > 0
      ? t("retention.quests.shareProgressMessage", { streak, code, link })
      : t("retention.quests.shareProgressPlain", { code, link });
  const sent = await shareText(message);
  if (sent) await reportQuestEvent("shareProgress");
  return sent;
}
