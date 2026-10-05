import { useState } from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { RetentionService } from "@/services/retention.service";
import { useRetentionStore } from "@/store/retention.store";
import { useAuthStore } from "@/store/auth.store";
import * as Haptics from "@/utils/haptics";
import RewardDialog from "./RewardDialog";

/**
 * 홈에 한 번씩 뜨는 대화상자들 — 한 번에 하나만, 이 순서로:
 *   1) 복귀 보상   2) 복구펜을 자동으로 썼다   3) 연속 목표 결과   4) 출석 선물 받음
 * 서버 요약(summary)이 무엇을 띄울지 정한다. 닫으면 서버에 "봤다" 를 남긴다.
 */
export default function RetentionOverlays({
  checkinReward,
  onCheckinRewardClose,
}: {
  checkinReward: { day: number; gems: number; superDays: number } | null;
  onCheckinRewardClose: () => void;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const summary = useRetentionStore((st) => st.summary);
  const patch = useRetentionStore((st) => st.patch);
  const updateUser = useAuthStore((st) => st.updateUser);
  const [busy, setBusy] = useState(false);
  // 복귀 보상을 "나중에" 로 넘기면 이번 화면에선 다시 안 띄운다
  const [comebackLater, setComebackLater] = useState(false);

  if (!summary) return null;

  const comeback = !comebackLater ? summary.comeback : null;
  const notice = summary.freeze.notice;
  const result = summary.streakGoal.result;

  if (comeback) {
    const claim = async () => {
      if (busy) return;
      setBusy(true);
      try {
        const res = await RetentionService.claimComeback();
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        updateUser({ energy: res.energy } as any);
        patch((s) => ({ ...s, comeback: null, xpBoost: res.xpBoost }));
      } catch {
        patch((s) => ({ ...s, comeback: null }));
      } finally {
        setBusy(false);
      }
    };
    return (
      <RewardDialog
        visible
        mood="cheering"
        title={t("retention.comeback.title")}
        body={t("retention.comeback.body", { n: comeback.idleDays })}
        rewards={[
          {
            icon: "flash",
            color: "#FF4F8B",
            label: t("retention.comeback.energy", { n: comeback.energy }),
          },
          {
            icon: "rocket",
            color: "#FFB020",
            label: t("retention.comeback.boost", {
              x: comeback.multiplier,
              m: comeback.boostMinutes,
            }),
          },
        ]}
        primaryLabel={t("retention.comeback.claim")}
        onPrimary={claim}
        loading={busy}
        secondaryLabel={t("retention.later")}
        onSecondary={() => setComebackLater(true)}
      />
    );
  }

  if (notice) {
    const ack = () => {
      patch((s) => ({ ...s, freeze: { ...s.freeze, notice: null } }));
      RetentionService.ackFreezeNotice().catch(() => {});
    };
    return (
      <RewardDialog
        visible
        mood="streak"
        title={t("retention.freeze.savedTitle")}
        body={t("retention.freeze.savedBody", {
          n: notice.used,
          streak: summary.streak,
        })}
        rewards={[
          {
            icon: "snow",
            color: "#3BA7F0",
            label: t("retention.freeze.left", {
              n: summary.freeze.owned,
              max: summary.freeze.max,
            }),
          },
        ]}
        primaryLabel={t("retention.ok")}
        primaryColor="#3BA7F0"
        primaryDepth="#2180C4"
        onPrimary={ack}
        onBackdrop={ack}
      />
    );
  }

  if (result) {
    const ack = (next?: () => void) => {
      patch((s) => ({
        ...s,
        streakGoal: { ...s.streakGoal, result: null },
      }));
      RetentionService.ackGoal().catch(() => {});
      next?.();
    };
    const won = result.status === "completed";
    return (
      <RewardDialog
        visible
        mood={won ? "celebrating" : "sleepy"}
        title={
          won
            ? t("retention.goal.wonTitle", { n: result.days })
            : t("retention.goal.lostTitle")
        }
        body={
          won
            ? t("retention.goal.wonBody", { gems: result.gems })
            : t("retention.goal.lostBody", {
                n: result.progress,
                gems: result.gems,
              })
        }
        primaryLabel={
          won ? t("retention.goal.nextGoal") : t("retention.goal.retry")
        }
        onPrimary={() => ack(() => router.push("/streak-goal"))}
        secondaryLabel={t("retention.close")}
        onSecondary={() => ack()}
      />
    );
  }

  if (checkinReward) {
    const isSuper = checkinReward.superDays > 0;
    return (
      <RewardDialog
        visible
        mood={isSuper ? "level_up" : "great"}
        title={t("retention.checkin.gotTitle", { n: checkinReward.day })}
        rewards={[
          isSuper
            ? {
                icon: "infinite",
                color: "#776ee2",
                label: t("retention.checkin.gotSuper", {
                  n: checkinReward.superDays,
                }),
              }
            : {
                icon: "diamond",
                color: "#3BB6E5",
                label: t("retention.checkin.gotGems", {
                  n: checkinReward.gems,
                }),
              },
        ]}
        primaryLabel={t("retention.ok")}
        onPrimary={onCheckinRewardClose}
        onBackdrop={onCheckinRewardClose}
      />
    );
  }

  return null;
}
