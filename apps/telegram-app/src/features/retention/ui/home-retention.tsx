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
  claimMonthly,
  claimQuest,
  rerollQuest,
  reportQuestEvent,
} from "../api/retention";
import {
  haptic,
  rt,
  type CheckinView,
  type MonthlyView,
  type QuestChestResult,
  type QuestSlot,
  type QuestSlotId,
  type RetentionSummary,
} from "../model/retention";
import {
  MONTH_BADGES,
  TIER_META,
  monthName,
  monthOf,
  questAction,
  questIcon,
  questTitle,
  questTitleKey,
  type QuestAction,
} from "../model/quest-meta";
import { getMyInvite } from "../../social/api/social";
import { shareMessage } from "../../../shared/telegram/share";
import { uzt } from "../../../shared/i18n/uz-text";
import { Button3D, RewardDialog, type RewardDialogProps } from "./parts";
import styles from "./retention.module.css";

type Patch = (fn: (s: RetentionSummary) => RetentionSummary) => void;

/** 옛 서버(slots 없음)면 옛 3종을 칸 모양으로 */
function slotsOf(quests: RetentionSummary["quests"]): QuestSlot[] {
  if (quests.slots?.length) return quests.slots;
  return quests.items.map((item) => ({
    ...item,
    category: null,
    id: item.id as unknown as QuestSlotId,
    kind: item.id,
    promo: false,
    slot: item.id as unknown as QuestSlotId,
  }));
}

const ACTION_TONE: Record<QuestAction, "pink" | "orange" | "blue" | "purple"> = {
  find: "blue",
  invite: "orange",
  review: "purple",
  share: "pink",
};

function untilMidnight() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  const minutes = Math.max(0, Math.floor((next.getTime() - now.getTime()) / 60000));
  return { h: Math.floor(minutes / 60), m: minutes % 60 };
}

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

// ─────────────────────────── 일일 퀘스트 ───────────────────────────

export function DailyQuestsCard({
  quests,
  patch,
  streak = 0,
}: {
  quests: RetentionSummary["quests"];
  patch: Patch;
  streak?: number;
}) {
  const router = useRouter();
  const { request, updateUser, user } = useTelegramAuth();
  const [left, setLeft] = useState(untilMidnight());
  const [busy, setBusy] = useState<string | null>(null);
  const [gain, setGain] = useState<{ id: string; n: number; key: number } | null>(null);
  // 방금 연 상자에서 뭐가 나왔나
  const [got, setGot] = useState<QuestChestResult | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setLeft(untilMidnight()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const slots = slotsOf(quests);
  const base = slots.filter((q) => q.slot !== "bonus");
  const rerollsLeft = quests.rerolls?.left ?? 0;

  const claim = async (id: QuestSlotId | "chest") => {
    if (busy) return;
    setBusy(id);
    try {
      const result = await claimQuest(request, id);
      haptic("success");
      updateUser({ gems: result.gems });
      if (result.reward > 0) setGain({ id, key: Date.now(), n: result.reward });
      if (id === "chest") setGot(result.chest ?? { gems: result.reward, type: "gems" });
      patch((summary) => ({
        ...summary,
        gems: result.gems,
        ...(result.monthly ? { monthly: result.monthly } : {}),
        ...(result.xpBoost ? { xpBoost: result.xpBoost } : {}),
        ...(result.chest?.type === "freeze"
          ? { freeze: { ...summary.freeze, owned: result.chest.owned } }
          : {}),
        quests: {
          ...summary.quests,
          chest:
            id === "chest"
              ? { ...summary.quests.chest, claimed: true }
              : summary.quests.chest,
          items: summary.quests.items.map((item) =>
            (item.id as string) === id ? { ...item, claimed: true } : item,
          ),
          slots: summary.quests.slots?.map((q) => (q.slot === id ? { ...q, claimed: true } : q)),
        },
      }));
    } catch {
      // 이미 받았거나 아직 안 됨 — 다음 새로고침이 맞춘다
    } finally {
      setBusy(null);
    }
  };

  const reroll = async (slot: QuestSlotId) => {
    if (busy) return;
    setBusy(`reroll:${slot}`);
    haptic("light");
    try {
      const result = await rerollQuest(request, slot);
      patch((summary) => ({ ...summary, quests: result.quests }));
    } catch {
      haptic("warning");
    } finally {
      setBusy(null);
    }
  };

  /** 홍보·바로가기 — 공유는 텔레그램 채팅 선택창으로 */
  const act = async (quest: QuestSlot, action: QuestAction) => {
    if (busy) return;
    haptic("light");
    if (action === "find") {
      router.push("/add-friends");
      return;
    }
    if (action === "review") {
      router.push("/lesson?mode=review");
      return;
    }
    setBusy(quest.slot);
    try {
      const invite = await getMyInvite(request).catch(() => null);
      const code = invite?.code ?? "";
      const link = invite?.link ?? "https://korio.online";
      const text =
        action === "invite"
          ? uzt("invite.shareMessage", {
              code,
              gems: invite?.rewardGems ?? 1000,
              link,
              nickname: user?.nickname ?? "",
            })
          : streak > 0
            ? rt("quests.shareProgressMessage", { code, link, streak })
            : rt("quests.shareProgressPlain", { code, link });
      await shareMessage(text, "KORIO");
      const next = await reportQuestEvent(request, action === "invite" ? "shareInvite" : "shareProgress");
      if (next) patch((summary) => ({ ...summary, quests: next }));
    } finally {
      setBusy(null);
    }
  };

  const doneCount = base.filter((item) => item.done).length;
  const chest = quests.chest;
  const chestReady = chest.ready && !chest.claimed;
  const gotText = !got
    ? null
    : got.type === "gems"
      ? rt("quests.chestGems", { n: got.gems })
      : got.type === "xpBoost"
        ? rt("quests.chestBoost", { m: got.minutes, x: got.multiplier })
        : rt("quests.chestFreeze");

  return (
    <section className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.titleRow}>
          <i className={styles.titleIcon}><MobileIcon name="flag" size={15} /></i>
          <strong className={styles.title}>{rt("quests.title")}</strong>
          <span className={styles.countPill} data-no-translate>
            {doneCount}/{base.length}
          </span>
        </span>
        <span className={styles.timer}>
          <MobileIcon name="hourglass-outline" size={12} />
          {rt("quests.resetIn", { h: left.h, m: left.m })}
        </span>
      </div>

      {quests.rerolls ? (
        <div className={styles.rerollInfo}>
          <MobileIcon name="shuffle" size={13} />
          <span data-i18n={rerollsLeft > 0 ? "retention.quests.rerollsLeft" : "retention.quests.rerollNone"}>
            {rerollsLeft > 0 ? rt("quests.rerollsLeft", { n: rerollsLeft }) : rt("quests.rerollNone")}
          </span>
        </div>
      ) : null}

      {slots.map((quest) => (
        <QuestRow
          busy={busy === quest.slot}
          canReroll={rerollsLeft > 0 && !busy}
          gain={gain?.id === quest.slot ? gain : null}
          key={quest.slot}
          onAction={(action) => void act(quest, action)}
          onClaim={() => void claim(quest.slot)}
          onReroll={() => void reroll(quest.slot)}
          quest={quest}
        />
      ))}

      <button
        className={`${styles.chest} ${chestReady ? styles.chestReady : ""}`}
        disabled={!chestReady || busy === "chest"}
        onClick={() => void claim("chest")}
        type="button"
      >
        <span className={`${styles.chestIcon} ${chest.claimed ? styles.chestOpened : ""}`}>
          <MobileIcon name={chest.claimed ? "gift-outline" : "gift"} size={30} />
        </span>
        <span className={styles.qMid}>
          <strong className={styles.qTitle}>
            {chest.claimed ? rt("quests.chestOpened") : rt("quests.chest")}
          </strong>
          {gotText ? (
            <span className={styles.chestGot}>{gotText}</span>
          ) : (
            <span className={styles.sub}>
              {chestReady
                ? rt("quests.chestReady")
                : chest.claimed
                  ? rt("quests.chestTomorrow")
                  : rt("quests.chestMystery")}
            </span>
          )}
        </span>
        <span className={styles.qRight}>
          {chestReady ? (
            <span className={`${styles.btn3d} ${styles.amber} ${styles.compact}`}>
              {busy === "chest" ? <i className={styles.spin} /> : rt("quests.open")}
            </span>
          ) : chest.claimed ? null : (
            <span className={`${styles.reward} ${styles.mystery}`}>
              <MobileIcon name="help" size={14} />
            </span>
          )}
          {gain?.id === "chest" ? (
            <span className={styles.gain} key={gain.key}>
              <MobileIcon name="diamond" size={13} />+{gain.n}
            </span>
          ) : null}
        </span>
      </button>
    </section>
  );
}

function QuestRow({
  quest,
  busy,
  canReroll,
  gain,
  onClaim,
  onAction,
  onReroll,
}: {
  quest: QuestSlot;
  busy: boolean;
  canReroll: boolean;
  gain: { n: number; key: number } | null;
  onClaim: () => void;
  onAction: (action: QuestAction) => void;
  onReroll: () => void;
}) {
  const meta = questIcon(quest);
  const tier = TIER_META[quest.slot];
  const action = questAction(quest.kind);
  const ratio = quest.target > 0 ? Math.min(1, quest.progress / quest.target) : 0;
  // 처음 그릴 때 0 에서 차오르게
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(ratio));
    return () => cancelAnimationFrame(frame);
  }, [ratio]);
  // 공유·초대·팔로우처럼 한 번 하면 끝나는 건 막대 대신 버튼만
  const oneShot = quest.promo && quest.target === 1;
  const showAction = !!action && !quest.done && !quest.claimed;
  const showReroll = canReroll && !quest.done && !quest.claimed;

  return (
    <div className={styles.quest} style={{ "--qc": quest.done ? "#2BB673" : meta.color } as CSSProperties}>
      <i className={styles.qIcon} style={{ "--qc": meta.color } as CSSProperties}>
        <MobileIcon name={meta.icon} size={19} />
      </i>
      <span className={styles.qMid}>
        <span className={styles.qHead}>
          {tier ? (
            <em
              className={styles.tierChip}
              data-i18n={`retention.quests.tier.${quest.slot}`}
              style={{ "--tc": tier.color, "--td": tier.dark } as CSSProperties}
            >
              {rt(`quests.tier.${quest.slot}`)}
            </em>
          ) : null}
          {quest.promo ? (
            <i className={styles.promoMark} style={{ color: meta.color }}>
              <MobileIcon name="megaphone" size={12} />
            </i>
          ) : null}
        </span>
        <strong
          className={`${styles.qTitle} ${styles.qTitleWrap} ${quest.claimed ? styles.qDone : ""}`}
          data-i18n={questTitleKey(quest)}
        >
          {questTitle(quest)}
        </strong>
        {oneShot ? null : (
          <span className={styles.track}>
            <i style={{ width: `${shown * 100}%` }} />
            <b data-no-translate>
              {quest.progress}/{quest.target}
            </b>
          </span>
        )}
      </span>
      <span className={`${styles.qRight} ${styles.qRightCol}`}>
        {quest.claimed ? (
          <i className={styles.doneBadge}><MobileIcon name="checkmark" size={18} /></i>
        ) : quest.done ? (
          <Button3D
            compact
            icon={<MobileIcon name="diamond" size={13} />}
            label={`+${quest.gems}`}
            loading={busy}
            onClick={onClaim}
            tone="green"
          />
        ) : showAction && action ? (
          <Button3D
            compact
            i18nKey={`retention.quests.action.${action}`}
            label={rt(`quests.action.${action}`)}
            loading={busy}
            onClick={() => onAction(action)}
            tone={ACTION_TONE[action]}
          />
        ) : (
          <span className={styles.reward}>
            <MobileIcon name="diamond" size={12} />
            <span data-no-translate>{quest.gems}</span>
          </span>
        )}
        {showReroll ? (
          <button
            aria-label="Almashtirish"
            className={styles.rerollBtn}
            onClick={onReroll}
            type="button"
          >
            <MobileIcon name="shuffle" size={14} />
          </button>
        ) : null}
        {gain ? (
          <span className={styles.gain} key={gain.key}>
            <MobileIcon name="diamond" size={13} />+{gain.n}
          </span>
        ) : null}
      </span>
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
export function MonthlyChallengeCard({ monthly, patch }: { monthly: MonthlyView; patch: Patch }) {
  const { request, updateUser } = useTelegramAuth();
  const [busy, setBusy] = useState<number | null>(null);
  const meta = MONTH_BADGES[monthOf(monthly.month)] ?? MONTH_BADGES[1]!;
  const earned = monthly.badges.includes(monthly.month);
  const badgeAt = monthly.milestones.find((m) => m.badge)?.at ?? monthly.target;
  const claimable = monthly.milestones.find((m) => m.reached && !m.claimed);
  const ratio = monthly.target > 0 ? Math.min(1, monthly.count / monthly.target) : 0;
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(ratio));
    return () => cancelAnimationFrame(frame);
  }, [ratio]);
  const past = monthly.badges.filter((b) => b !== monthly.month);

  const claim = async (at: number) => {
    if (busy !== null) return;
    setBusy(at);
    try {
      const result = await claimMonthly(request, at);
      haptic("success");
      updateUser({ gems: result.gems });
      patch((summary) => ({ ...summary, gems: result.gems, monthly: result.monthly }));
    } catch {
      // 이미 받았거나 아직
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className={styles.card} style={{ "--mc": meta.color, "--md": meta.dark } as CSSProperties}>
      <div className={styles.monthHead}>
        <QuestBadge locked={!earned} month={monthly.month} size={56} />
        <span className={styles.monthText}>
          <strong className={styles.title} data-i18n="retention.monthly.title">
            {rt("monthly.title", { month: monthName(monthly.month) })}
          </strong>
          <span className={styles.sub} data-i18n="retention.monthly.sub">
            {rt("monthly.sub", { d: monthly.daysLeft, n: monthly.count, target: monthly.target })}
          </span>
          <span
            className={`${styles.monthBadgeLine} ${earned ? styles.monthBadgeEarned : ""}`}
            data-i18n={earned ? "retention.monthly.badgeEarned" : "retention.monthly.badgeLocked"}
          >
            {earned ? rt("monthly.badgeEarned") : rt("monthly.badgeLocked", { n: badgeAt })}
          </span>
        </span>
      </div>

      <div className={styles.monthTrackWrap}>
        <span className={styles.monthTrack}>
          <i style={{ width: `${shown * 100}%` }} />
        </span>
        {monthly.milestones.map((ms) => {
          const pos = monthly.target > 0 ? Math.min(1, ms.at / monthly.target) : 1;
          const ready = ms.reached && !ms.claimed;
          return (
            <span className={styles.markerSlot} key={ms.at} style={{ left: `${pos * 100}%` }}>
              <button
                className={`${styles.marker} ${ms.claimed ? styles.markerDone : ""} ${ready ? styles.markerReady : ""}`}
                disabled={!ready || busy !== null}
                onClick={() => void claim(ms.at)}
                type="button"
              >
                <MobileIcon name={ms.claimed ? "checkmark" : ms.badge ? "ribbon" : "gift"} size={14} />
              </button>
              <b data-no-translate>{ms.at}</b>
            </span>
          );
        })}
      </div>

      {claimable ? (
        <Button3D
          i18nKey="retention.monthly.claim"
          icon={
            <>
              <MobileIcon name="diamond" size={14} />
              <b data-no-translate>{claimable.gems}</b>
            </>
          }
          label={rt("monthly.claim")}
          loading={busy === claimable.at}
          onClick={() => void claim(claimable.at)}
          tone="amber"
        />
      ) : null}

      {past.length > 0 ? (
        <div className={styles.monthBadges}>
          <span className={styles.sub} data-i18n="retention.monthly.myBadges">
            {rt("monthly.myBadges")}
          </span>
          <div className={styles.badgesScroll}>
            {past.map((key) => (
              <QuestBadge key={key} month={key} size={36} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

// ─────────────────────────── 첫 7일 출석 ───────────────────────────

export function CheckinCard({
  checkin,
  patch,
  onClaimed,
}: {
  checkin: CheckinView;
  patch: Patch;
  onClaimed: (reward: { day: number; gems: number; superDays: number }) => void;
}) {
  const { request, updateUser } = useTelegramAuth();
  const [busy, setBusy] = useState(false);
  const todayIndex = checkin.canClaim ? checkin.count : -1;

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
      <p className={styles.sub} style={{ margin: "4px 0 0" }}>{rt("checkin.sub")}</p>
      <div className={styles.ckGrid}>
        {checkin.rewards.map((reward, index) => {
          const claimed = index < checkin.count;
          const today = index === todayIndex;
          const isSuper = reward.superDays > 0;
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
  checkinReward: { day: number; gems: number; superDays: number } | null;
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
    dialog = {
      mood: isSuper ? "level_up" : "great",
      onBackdrop: onCheckinRewardClose,
      onPrimary: onCheckinRewardClose,
      primaryKey: "retention.ok",
      primaryLabel: rt("ok"),
      rewards: [
        isSuper
          ? { color: "#776ee2", icon: "infinite", label: rt("checkin.gotSuper", { n: checkinReward.superDays }) }
          : { color: "#3BB6E5", icon: "diamond", label: rt("checkin.gotGems", { n: checkinReward.gems }) },
      ],
      title: rt("checkin.gotTitle", { n: checkinReward.day }),
    };
  }

  return <RewardDialog open={dialog !== null} {...(dialog ?? CLOSED_DIALOG)} />;
}

/** 닫혀 있을 때 넘기는 자리값 — RewardDialog 는 닫히는 동안 마지막 내용을 그린다 */
const CLOSED_DIALOG: RewardDialogProps = { onPrimary: () => undefined, primaryLabel: "", title: "" };
