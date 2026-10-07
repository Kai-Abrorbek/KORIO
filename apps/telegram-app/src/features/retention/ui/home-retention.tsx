"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import {
  ackFreezeNotice,
  ackStreakGoal,
  claimCheckin,
  claimComeback,
  claimQuest,
} from "../api/retention";
import {
  haptic,
  rt,
  type CheckinView,
  type QuestId,
  type QuestItem,
  type RetentionSummary,
} from "../model/retention";
import { Button3D, RewardDialog, type RewardDialogProps } from "./parts";
import styles from "./retention.module.css";

type Patch = (fn: (s: RetentionSummary) => RetentionSummary) => void;

const QUEST_META: Record<QuestId, { icon: IoniconName; color: string }> = {
  correct: { color: "#2BB673", icon: "checkmark-done" },
  minutes: { color: "#776ee2", icon: "time" },
  xp: { color: "#FFB020", icon: "flash" },
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
}: {
  quests: RetentionSummary["quests"];
  patch: Patch;
}) {
  const { request, updateUser } = useTelegramAuth();
  const [left, setLeft] = useState(untilMidnight());
  const [busy, setBusy] = useState<string | null>(null);
  const [gain, setGain] = useState<{ id: string; n: number; key: number } | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setLeft(untilMidnight()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const claim = async (id: QuestId | "chest") => {
    if (busy) return;
    setBusy(id);
    try {
      const result = await claimQuest(request, id);
      haptic("success");
      updateUser({ gems: result.gems });
      setGain({ id, key: Date.now(), n: result.reward });
      patch((summary) => ({
        ...summary,
        gems: result.gems,
        quests: {
          ...summary.quests,
          chest:
            id === "chest"
              ? { ...summary.quests.chest, claimed: true }
              : summary.quests.chest,
          items: summary.quests.items.map((item) =>
            item.id === id ? { ...item, claimed: true } : item,
          ),
        },
      }));
    } catch {
      // 이미 받았거나 아직 안 됨 — 다음 새로고침이 맞춘다
    } finally {
      setBusy(null);
    }
  };

  const doneCount = quests.items.filter((item) => item.done).length;
  const chest = quests.chest;
  const chestReady = chest.ready && !chest.claimed;

  return (
    <section className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.titleRow}>
          <i className={styles.titleIcon}><MobileIcon name="flag" size={15} /></i>
          <strong className={styles.title}>{rt("quests.title")}</strong>
          <span className={styles.countPill} data-no-translate>
            {doneCount}/{quests.items.length}
          </span>
        </span>
        <span className={styles.timer}>
          <MobileIcon name="hourglass-outline" size={12} />
          {rt("quests.resetIn", { h: left.h, m: left.m })}
        </span>
      </div>

      {quests.items.map((quest) => (
        <QuestRow
          busy={busy === quest.id}
          gain={gain?.id === quest.id ? gain : null}
          key={quest.id}
          onClaim={() => void claim(quest.id)}
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
          <span className={styles.sub}>
            {chestReady
              ? rt("quests.chestReady")
              : chest.claimed
                ? rt("quests.chestTomorrow")
                : rt("quests.chestHint")}
          </span>
        </span>
        <span className={styles.qRight}>
          {chestReady ? (
            <span className={`${styles.btn3d} ${styles.amber} ${styles.compact}`}>
              {busy === "chest" ? <i className={styles.spin} /> : rt("quests.open")}
            </span>
          ) : (
            <span className={styles.reward}>
              <MobileIcon name="diamond" size={12} />
              <span data-no-translate>{chest.gems}</span>
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
  gain,
  onClaim,
}: {
  quest: QuestItem;
  busy: boolean;
  gain: { n: number; key: number } | null;
  onClaim: () => void;
}) {
  const meta = QUEST_META[quest.id];
  const ratio = quest.target > 0 ? Math.min(1, quest.progress / quest.target) : 0;
  // 처음 그릴 때 0 에서 차오르게
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(ratio));
    return () => cancelAnimationFrame(frame);
  }, [ratio]);

  return (
    <div className={styles.quest} style={{ "--qc": quest.done ? "#2BB673" : meta.color } as CSSProperties}>
      <i className={styles.qIcon} style={{ "--qc": meta.color } as CSSProperties}>
        <MobileIcon name={meta.icon} size={18} />
      </i>
      <span className={styles.qMid}>
        <strong className={`${styles.qTitle} ${quest.claimed ? styles.qDone : ""}`}>
          {rt(`quests.${quest.id}`, { n: quest.target })}
        </strong>
        <span className={styles.track}>
          <i style={{ width: `${shown * 100}%` }} />
          <b data-no-translate>
            {quest.progress}/{quest.target}
          </b>
        </span>
      </span>
      <span className={styles.qRight}>
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
        ) : (
          <span className={styles.reward}>
            <MobileIcon name="diamond" size={12} />
            <span data-no-translate>{quest.gems}</span>
          </span>
        )}
        {gain ? (
          <span className={styles.gain} key={gain.key}>
            <MobileIcon name="diamond" size={13} />+{gain.n}
          </span>
        ) : null}
      </span>
    </div>
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
