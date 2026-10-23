"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import {
  ackFreezeNotice,
  ackStreakGoal,
  claimCheckin,
  claimComeback,
} from "../api/retention";
import {
  haptic,
  rt,
  type CheckinView,
  type RetentionSummary,
} from "../model/retention";
import { MONTH_BADGES, monthName, monthOf } from "../model/quest-meta";
import { Button3D, RewardDialog, type RewardDialogProps } from "./parts";
import styles from "./retention.module.css";

type Patch = (fn: (s: RetentionSummary) => RetentionSummary) => void;

// ─────────────────────────── 스트릭 칩 ───────────────────────────

/** 홈 스트릭 카드 아래 — 복구펜 보유 · 연속 목표 (앱 홈과 같다) */
export function StreakChips({ summary }: { summary: RetentionSummary | null }) {
  const router = useRouter();
  const active = summary?.streakGoal.active;
  return (
    <div className={styles.chips}>
      <span className={styles.freezeChip}>
        <MobileIcon name="snow" size={14} />
        {rt("freeze.chip", {
          max: summary?.freeze.max ?? 2,
          n: summary?.freeze.owned ?? 0,
        })}
      </span>
      <button
        className={styles.goalChip}
        onClick={(event) => {
          // 카드(달력 열기) 클릭으로 번지지 않게
          event.stopPropagation();
          router.push("/streak-goal");
        }}
        type="button"
      >
        <MobileIcon name="trophy" size={14} />
        <span>
          {active
            ? rt("goal.chipActive", { n: active.days, p: active.progress })
            : rt("goal.chip")}
        </span>
        <MobileIcon name="chevron-forward" size={13} />
      </button>
    </div>
  );
}

// ─────────────────────────── XP 부스트 ───────────────────────────

export function XpBoostBanner({
  until,
  multiplier,
  onEnd,
}: {
  until: string;
  multiplier: number;
  onEnd: () => void;
}) {
  const end = new Date(until).getTime();
  const [left, setLeft] = useState(Math.max(0, end - Date.now()));
  useEffect(() => {
    const timer = window.setInterval(() => {
      const ms = Math.max(0, end - Date.now());
      setLeft(ms);
      if (ms <= 0) {
        window.clearInterval(timer);
        onEnd();
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [end, onEnd]);
  if (left <= 0) return null;
  const mm = Math.floor(left / 60000);
  const ss = String(Math.floor((left % 60000) / 1000)).padStart(2, "0");
  return (
    <div className={styles.boost}>
      <span className={styles.boostBadge}>
        <MobileIcon name="flash" size={16} />×{multiplier}
      </span>
      <strong>{rt("boost.active", { n: multiplier })}</strong>
      <b data-no-translate>{mm}:{ss}</b>
    </div>
  );
}

// ─────────────────────────── 월간 챌린지 ───────────────────────────

/** 월간 챌린지 배지 — 달마다 색·그림이 다른 마름모 메달 (앱 QuestBadge 와 같다) */
export function QuestBadge({
  month,
  size = 56,
  locked = false,
}: {
  month: string;
  size?: number;
  locked?: boolean;
}) {
  const meta = MONTH_BADGES[monthOf(month)] ?? MONTH_BADGES[1]!;
  return (
    <span
      className={`${styles.badge} ${locked ? styles.badgeLocked : ""}`}
      style={{ "--bc": meta.color, "--bd": meta.dark, "--bs": `${size}px` } as CSSProperties}
    >
      <i className={styles.badgeFace} />
      <span className={styles.badgeIcon}>
        <MobileIcon name={locked ? "lock-closed" : meta.icon} size={Math.round(size * 0.38)} />
      </span>
      {!locked ? (
        <b className={styles.badgeTag} data-no-translate>
          {monthOf(month)}
        </b>
      ) : null}
    </span>
  );
}

/** 프로필 — 월간 챌린지 배지 모음. 없으면 아무것도 안 그린다 */
export function QuestBadgesRow({ badges }: { badges?: string[] }) {
  if (!badges?.length) return null;
  return (
    <section className={styles.badgesSection}>
      <h2 data-i18n="retention.monthly.profileTitle">{rt("monthly.profileTitle")}</h2>
      <div className={styles.badgesScroll}>
        {badges.map((key) => (
          <span className={styles.badgeItem} key={key}>
            <QuestBadge month={key} size={50} />
            <b data-i18n={`retention.monthly.months.${monthOf(key)}`}>{monthName(key)}</b>
            <small data-no-translate>{key.slice(0, 4)}</small>
          </span>
        ))}
      </div>
    </section>
  );
}

/** 홈 — 월간 챌린지 (앱 MonthlyChallengeCard 와 같다) */
// ─────────────────────────── 첫 7일 출석 ───────────────────────────

export function CheckinCard({
  checkin,
  patch,
  onClaimed,
}: {
  checkin: CheckinView;
  patch: Patch;
  onClaimed: (reward: { day: number; gems: number; superDays: number; swapped?: boolean }) => void;
}) {
  const { request, updateUser } = useTelegramAuth();
  const [busy, setBusy] = useState(false);
  const todayIndex = checkin.canClaim ? checkin.count : -1;
  // 이미 SUPER 면 7일째가 보석이다
  const anySwapped = checkin.rewards.some((reward) => reward.swapped);

  const claim = async () => {
    if (busy || !checkin.canClaim) return;
    setBusy(true);
    try {
      const result = await claimCheckin(request);
      haptic("success");
      updateUser({ gems: result.gems });
      patch((summary) => ({
        ...summary,
        checkin:
          summary.checkin && result.day < summary.checkin.rewards.length
            ? { ...summary.checkin, canClaim: false, count: result.day }
            : null,
        gems: result.gems,
      }));
      // SUPER 를 받았으면 isSuper 가 바뀐다 — 계정 정보를 다시 받는다
      if (result.reward.superDays > 0) {
        void request<{ isSuper?: boolean; superExpiresAt?: string | null }>("/users/me")
          .then((me) => updateUser({ isSuper: me.isSuper, superExpiresAt: me.superExpiresAt }))
          .catch(() => undefined);
      }
      onClaimed({
        day: result.day,
        gems: result.reward.gems,
        superDays: result.reward.superDays,
        swapped: result.reward.swapped,
      });
    } catch {
      // 이미 받았으면 다음 새로고침이 맞춘다
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={styles.card}>
      <span className={styles.titleRow}>
        <MobileIcon name="calendar" size={18} style={{ color: "#FF6B9A" }} />
        <strong className={styles.title}>{rt("checkin.title")}</strong>
      </span>
      <p className={styles.sub} data-i18n={anySwapped ? "retention.checkin.subSwapped" : "retention.checkin.sub"} style={{ margin: "4px 0 0" }}>
        {anySwapped ? rt("checkin.subSwapped") : rt("checkin.sub")}
      </p>
      <div className={styles.ckGrid}>
        {checkin.rewards.map((reward, index) => {
          const claimed = index < checkin.count;
          const today = index === todayIndex;
          // 7일째 큰 보라 칸 (SUPER 하루 또는 그 대신 받는 보석)
          const isSuper = reward.superDays > 0 || Boolean(reward.swapped);
          return (
            <span
              className={[
                styles.ck,
                isSuper ? styles.ckSuper : "",
                claimed ? styles.ckClaimed : "",
                today ? styles.ckToday : "",
              ].join(" ")}
              key={reward.day}
            >
              <small data-i18n="retention.checkin.day">{rt("checkin.day", { n: reward.day })}</small>
              {claimed ? (
                <i className={styles.ckCheck}><MobileIcon name="checkmark" size={16} /></i>
              ) : reward.swapped ? (
                <>
                  <span className={styles.ckSwap}>
                    <MobileIcon name="diamond" size={18} />
                    <b data-no-translate>{reward.gems.toLocaleString("en-US")}</b>
                  </span>
                  <b data-i18n="retention.checkin.swappedTag">{rt("checkin.swappedTag")}</b>
                </>
              ) : isSuper ? (
                <>
                  <MobileIcon name="infinite" size={20} />
                  <b data-no-translate>SUPER</b>
                </>
              ) : (
                <>
                  <MobileIcon name="diamond" size={16} />
                  <b data-no-translate>{reward.gems}</b>
                </>
              )}
            </span>
          );
        })}
      </div>
      {checkin.canClaim ? (
        <Button3D
          className={styles.dialogPrimary}
          icon={<MobileIcon name="gift" size={18} />}
          label={rt("checkin.claim")}
          loading={busy}
          onClick={() => void claim()}
          tone="pink"
        />
      ) : (
        <span className={styles.ckFoot}>
          <MobileIcon name="moon" size={14} />
          {rt("checkin.tomorrow")}
        </span>
      )}
    </section>
  );
}

// ─────────────────────────── 대화상자들 ───────────────────────────

/**
 * 홈에 한 번씩 뜨는 대화상자 — 한 번에 하나, 이 순서로:
 *   복귀 보상 → 복구펜 자동 사용 → 연속 목표 결과 → 출석 선물 받음 (앱 RetentionOverlays)
 *
 * RewardDialog 는 하나만 계속 붙여 두고 내용과 open 만 바꾼다 —
 * 그래야 열릴 때·닫힐 때 페이드가 자연스럽게 보인다.
 */
export function RetentionOverlays({
  summary,
  patch,
  checkinReward,
  onCheckinRewardClose,
}: {
  summary: RetentionSummary | null;
  patch: Patch;
  checkinReward: { day: number; gems: number; superDays: number; swapped?: boolean } | null;
  onCheckinRewardClose: () => void;
}) {
  const router = useRouter();
  const { request, updateUser } = useTelegramAuth();
  const [busy, setBusy] = useState(false);
  const [comebackLater, setComebackLater] = useState(false);

  const comeback = summary && !comebackLater ? summary.comeback : null;
  const notice = summary?.freeze.notice ?? null;
  const result = summary?.streakGoal.result ?? null;

  let dialog: RewardDialogProps | null = null;

  if (summary && comeback) {
    const claim = async () => {
      if (busy) return;
      setBusy(true);
      try {
        const res = await claimComeback(request);
        haptic("success");
        updateUser({ energy: res.energy });
        patch((s) => ({ ...s, comeback: null, xpBoost: res.xpBoost }));
      } catch {
        patch((s) => ({ ...s, comeback: null }));
      } finally {
        setBusy(false);
      }
    };
    dialog = {
      body: rt("comeback.body", { n: comeback.idleDays }),
      loading: busy,
      mood: "cheering",
      onPrimary: () => void claim(),
      onSecondary: () => setComebackLater(true),
      primaryLabel: rt("comeback.claim"),
      rewards: [
        { color: "#FF4F8B", icon: "flash", label: rt("comeback.energy", { n: comeback.energy }) },
        {
          color: "#FFB020",
          icon: "rocket",
          label: rt("comeback.boost", { m: comeback.boostMinutes, x: comeback.multiplier }),
        },
      ],
      secondaryKey: "retention.later",
      secondaryLabel: rt("later"),
      title: rt("comeback.title"),
    };
  } else if (summary && notice) {
    const ack = () => {
      patch((s) => ({ ...s, freeze: { ...s.freeze, notice: null } }));
      void ackFreezeNotice(request).catch(() => undefined);
    };
    dialog = {
      body: rt("freeze.savedBody", { n: notice.used, streak: summary.streak }),
      mood: "streak",
      onBackdrop: ack,
      onPrimary: ack,
      primaryKey: "retention.ok",
      primaryLabel: rt("ok"),
      primaryTone: "blue",
      rewards: [
        {
          color: "#3BA7F0",
          icon: "snow",
          label: rt("freeze.left", { max: summary.freeze.max, n: summary.freeze.owned }),
        },
      ],
      title: rt("freeze.savedTitle"),
    };
  } else if (summary && result) {
    const ack = (then?: () => void) => {
      patch((s) => ({ ...s, streakGoal: { ...s.streakGoal, result: null } }));
      void ackStreakGoal(request).catch(() => undefined);
      then?.();
    };
    const won = result.status === "completed";
    dialog = {
      body: won
        ? rt("goal.wonBody", { gems: result.gems })
        : rt("goal.lostBody", { gems: result.gems, n: result.progress }),
      mood: won ? "celebrating" : "sleepy",
      onPrimary: () => ack(() => router.push("/streak-goal")),
      onSecondary: () => ack(),
      primaryKey: won ? "retention.goal.nextGoal" : "retention.goal.retry",
      primaryLabel: won ? rt("goal.nextGoal") : rt("goal.retry"),
      secondaryKey: "retention.close",
      secondaryLabel: rt("close"),
      title: won ? rt("goal.wonTitle", { n: result.days }) : rt("goal.lostTitle"),
    };
  } else if (checkinReward) {
    const isSuper = checkinReward.superDays > 0;
    // 이미 SUPER 라 SUPER 하루 대신 보석을 받았다 — 왜 보석인지 한 줄
    const swapped = Boolean(checkinReward.swapped);
    dialog = {
      ...(swapped ? { body: rt("checkin.swappedBody") } : {}),
      mood: isSuper || swapped ? "level_up" : "great",
      onBackdrop: onCheckinRewardClose,
      onPrimary: onCheckinRewardClose,
      primaryKey: "retention.ok",
      primaryLabel: rt("ok"),
      rewards: [
        isSuper
          ? { color: "#776ee2", icon: "infinite", label: rt("checkin.gotSuper", { n: checkinReward.superDays }) }
          : { color: "#3BB6E5", icon: "diamond", label: rt("checkin.gotGems", { n: checkinReward.gems.toLocaleString("en-US") }) },
      ],
      title: rt("checkin.gotTitle", { n: checkinReward.day }),
    };
  }

  return <RewardDialog open={dialog !== null} {...(dialog ?? CLOSED_DIALOG)} />;
}

/** 닫혀 있을 때 넘기는 자리값 — RewardDialog 는 닫히는 동안 마지막 내용을 그린다 */
const CLOSED_DIALOG: RewardDialogProps = { onPrimary: () => undefined, primaryLabel: "", title: "" };
