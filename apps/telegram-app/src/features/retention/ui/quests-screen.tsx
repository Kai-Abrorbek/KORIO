"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramBackOverride } from "../../../shared/telegram/back-button";
import { shareMessage } from "../../../shared/telegram/share";
import { uzt } from "../../../shared/i18n/uz-text";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { LEARN_COURSES } from "../../learning/model/learning-options";
import { getMyInvite } from "../../social/api/social";
import {
  claimMonthly,
  claimQuest,
  getRetentionSummary,
  rerollQuest,
  reportQuestEvent,
} from "../api/retention";
import {
  haptic,
  rt,
  type MonthlyView,
  type QuestChestResult,
  type QuestSlot,
  type QuestSlotId,
  type RetentionSummary,
} from "../model/retention";
import {
  MONTH_BADGES,
  monthName,
  monthOf,
  questAction,
  questIcon,
  questTitle,
  questTitleKey,
  slotsOf,
  type QuestAction,
} from "../model/quest-meta";
import { QuestBadge } from "./home-retention";
import { Button3D } from "./parts";
import styles from "./quests-screen.module.css";

type Patch = (fn: (s: RetentionSummary) => RetentionSummary) => void;

/** 공유·초대·친구 찾기는 소셜(하늘색), 오답 다시 풀기는 학습(보라) */
const ACTION_TONE: Record<QuestAction, "blue" | "purple"> = {
  find: "blue",
  invite: "blue",
  review: "purple",
  share: "blue",
};

function untilMidnight() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  const minutes = Math.max(0, Math.floor((next.getTime() - now.getTime()) / 60000));
  return { h: Math.floor(minutes / 60), m: minutes % 60 };
}

/** 처음 그릴 때 0 에서 차오르게 */
function useFill(ratio: number) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(ratio));
    return () => cancelAnimationFrame(frame);
  }, [ratio]);
  return shown;
}

/**
 * 퀘스트 — 홈 바로가기 "Vazifalar" 로 들어온다 (앱 features/retention/screens/QuestsScreen 과 같다).
 * 오늘의 퀘스트는 상자를 둘러싼 링의 세 칸, 끝내면 그 칸이 초록이 되고 셋 다면 상자가 열린다.
 * 아래에 이번 달 챌린지 (퀘스트 수 → 보상 칸 → 그 달 배지).
 */
export function QuestsScreen() {
  const router = useRouter();
  const { request, user } = useTelegramAuth();
  const [summary, setSummary] = useState<RetentionSummary | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.replace("/home");
  };
  useTelegramBackOverride(goBack);

  const load = useCallback(async () => {
    try {
      setSummary(await getRetentionSummary(request));
      setLoadFailed(false);
    } catch {
      setLoadFailed(true);
    }
  }, [request]);

  useEffect(() => {
    void load();
  }, [load]);

  const patch: Patch = useCallback(
    (fn) => setSummary((current) => (current ? fn(current) : current)),
    [],
  );

  const gems = summary?.gems ?? user?.gems ?? 0;

  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <button aria-label="Orqaga" onClick={goBack} type="button">
          <MobileIcon name="chevron-back" size={26} />
        </button>
        <h1 data-i18n="retention.quests.pageTitle">{rt("quests.pageTitle")}</h1>
        <span className={styles.gemPill}>
          <MobileIcon name="diamond" size={14} />
          <span data-no-translate>{gems.toLocaleString("en-US")}</span>
        </span>
      </header>

      {!summary ? (
        <div className={styles.state}>
          {loadFailed ? (
            <Button3D
              compact
              i18nKey="retention.retry"
              icon={<MobileIcon name="refresh" size={16} />}
              label={rt("retry")}
              onClick={() => void load()}
            />
          ) : (
            <i className={styles.spin} />
          )}
        </div>
      ) : (
        <div className={styles.scroll}>
          <Today patch={patch} quests={summary.quests} streak={summary.streak} />
          {summary.monthly ? <Month monthly={summary.monthly} patch={patch} /> : null}
        </div>
      )}
    </main>
  );
}

// ─────────────────────────── 오늘 ───────────────────────────

function Today({
  quests,
  patch,
  streak,
}: {
  quests: RetentionSummary["quests"];
  patch: Patch;
  streak: number;
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
  const chest = quests.chest;
  const chestReady = chest.ready && !chest.claimed;

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
            id === "chest" ? { ...summary.quests.chest, claimed: true } : summary.quests.chest,
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

  const status = got
    ? got.type === "gems"
      ? rt("quests.chestGems", { n: got.gems })
      : got.type === "xpBoost"
        ? rt("quests.chestBoost", { m: got.minutes, x: got.multiplier })
        : rt("quests.chestFreeze")
    : chestReady
      ? rt("quests.chestReady")
      : chest.claimed
        ? rt("quests.chestTomorrow")
        : rt("quests.chestMystery");

  return (
    <>
      <section className={styles.dial}>
        <DayRing
          base={base}
          busy={busy === "chest"}
          chestClaimed={chest.claimed}
          chestReady={chestReady}
          gain={gain?.id === "chest" ? gain : null}
          onOpen={() => void claim("chest")}
        />
        <p className={`${styles.status} ${chestReady || got ? styles.statusGold : ""}`}>{status}</p>
        <p className={styles.reset}>
          <MobileIcon name="hourglass-outline" size={13} />
          {rt("quests.resetIn", { h: left.h, m: left.m })}
        </p>
      </section>

      <div className={styles.listHead}>
        <h2 data-i18n="retention.quests.title">{rt("quests.title")}</h2>
        {quests.rerolls ? (
          <span
            className={styles.swaps}
            data-i18n={rerollsLeft > 0 ? "retention.quests.rerollsLeft" : "retention.quests.rerollNone"}
          >
            <MobileIcon name="shuffle" size={13} />
            {rerollsLeft > 0 ? rt("quests.rerollsLeft", { n: rerollsLeft }) : rt("quests.rerollNone")}
          </span>
        ) : null}
      </div>

      <ol className={styles.list}>
        {slots.map((quest) => (
          <QuestLine
            busy={busy === quest.slot}
            canReroll={rerollsLeft > 0 && !busy}
            gain={gain?.id === quest.slot ? gain : null}
            key={quest.slot}
            onAction={(action) => void act(quest, action)}
            onClaim={() => void claim(quest.slot)}
            onReroll={() => void reroll(quest.slot)}
            quest={quest}
            rerolling={busy === `reroll:${quest.slot}`}
          />
        ))}
      </ol>
    </>
  );
}

const RING = 216;
const STROKE = 16;
const RADIUS = (RING - STROKE) / 2;
const CIRCLE = 2 * Math.PI * RADIUS;
/** 칸 사이 틈 (둥근 끝이 차지하는 만큼 포함) */
const GAP_DEG = 16;

/** 상자를 둘러싼 링 — 오늘의 퀘스트 한 개가 한 칸 */
function DayRing({
  base,
  chestReady,
  chestClaimed,
  busy,
  gain,
  onOpen,
}: {
  base: QuestSlot[];
  chestReady: boolean;
  chestClaimed: boolean;
  busy: boolean;
  gain: { n: number; key: number } | null;
  onOpen: () => void;
}) {
  const count = Math.max(1, base.length);
  const slice = 360 / count;
  const span = slice - GAP_DEG;
  const arc = (CIRCLE * span) / 360;
  const done = base.filter((q) => q.done).length;

  return (
    <div className={styles.ring}>
      <svg aria-hidden="true" height={RING} viewBox={`0 0 ${RING} ${RING}`} width={RING}>
        {base.map((quest, index) => (
          <RingArc
            arc={arc}
            done={quest.done}
            key={quest.slot}
            ratio={quest.target > 0 ? Math.min(1, quest.progress / quest.target) : 0}
            start={-90 + index * slice + GAP_DEG / 2}
          />
        ))}
      </svg>
      <div className={styles.core}>
        <button
          aria-label={rt("quests.open")}
          className={`${styles.chest} ${chestReady ? styles.chestReady : ""} ${chestClaimed ? styles.chestOpened : ""}`}
          disabled={!chestReady || busy}
          onClick={onOpen}
          type="button"
        >
          {busy ? <i className={styles.spinLight} /> : <MobileIcon name={chestClaimed ? "gift-outline" : "gift"} size={38} />}
          {chestClaimed ? (
            <i className={styles.chestCheck}>
              <MobileIcon name="checkmark" size={13} />
            </i>
          ) : null}
        </button>
        <strong className={styles.count} data-no-translate>
          {done}/{base.length}
        </strong>
        {gain ? (
          <span className={styles.gain} key={gain.key}>
            <MobileIcon name="diamond" size={14} />+{gain.n}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function RingArc({ start, arc, ratio, done }: { start: number; arc: number; ratio: number; done: boolean }) {
  const shown = useFill(ratio);
  const center = RING / 2;
  const common = {
    cx: center,
    cy: center,
    fill: "none",
    r: RADIUS,
    strokeLinecap: "round" as const,
    strokeWidth: STROKE,
    transform: `rotate(${start} ${center} ${center})`,
  };
  return (
    <>
      <circle {...common} className={styles.arcTrack} strokeDasharray={`${arc} ${CIRCLE}`} />
      {ratio > 0 ? (
        <circle
          {...common}
          className={`${styles.arcFill} ${done ? styles.arcDone : ""}`}
          strokeDasharray={`${arc * shown} ${CIRCLE}`}
        />
      ) : null}
    </>
  );
}

const MINI = 40;
const MINI_STROKE = 4;
const MINI_R = (MINI - MINI_STROKE) / 2;
const MINI_C = 2 * Math.PI * MINI_R;

function QuestLine({
  quest,
  busy,
  rerolling,
  canReroll,
  gain,
  onClaim,
  onAction,
  onReroll,
}: {
  quest: QuestSlot;
  busy: boolean;
  rerolling: boolean;
  canReroll: boolean;
  gain: { n: number; key: number } | null;
  onClaim: () => void;
  onAction: (action: QuestAction) => void;
  onReroll: () => void;
}) {
  const meta = questIcon(quest);
  const action = questAction(quest.kind);
  const ratio = quest.target > 0 ? Math.min(1, quest.progress / quest.target) : 0;
  const shown = useFill(ratio);
  // 공유·초대·팔로우처럼 한 번 하면 끝나는 건 숫자 없이
  const oneShot = quest.promo && quest.target === 1;
  const showAction = !!action && !quest.done && !quest.claimed;
  const showReroll = canReroll && !quest.done && !quest.claimed;
  const bonus = quest.slot === "bonus";
  const course = quest.course ? LEARN_COURSES[quest.course] : null;

  return (
    <li
      className={`${styles.quest} ${bonus ? styles.bonus : ""} ${quest.claimed ? styles.claimed : ""}`}
      style={{ "--done": quest.done ? 1 : 0 } as CSSProperties}
    >
      <span className={`${styles.mini} ${quest.done ? styles.miniDone : ""}`}>
        <svg aria-hidden="true" className={styles.miniRing} height={MINI} viewBox={`0 0 ${MINI} ${MINI}`} width={MINI}>
          <circle className={styles.miniTrack} cx={MINI / 2} cy={MINI / 2} fill="none" r={MINI_R} strokeWidth={MINI_STROKE} />
          {ratio > 0 ? (
            <circle
              className={styles.miniFill}
              cx={MINI / 2}
              cy={MINI / 2}
              fill="none"
              r={MINI_R}
              // 다 차면 둥근 끝끼리 겹친 이음매가 보여서 그냥 한 바퀴로
              strokeDasharray={shown >= 1 ? undefined : `${MINI_C * shown} ${MINI_C}`}
              strokeLinecap="round"
              strokeWidth={MINI_STROKE}
              transform={`rotate(-90 ${MINI / 2} ${MINI / 2})`}
            />
          ) : null}
        </svg>
        <MobileIcon name={quest.done ? "checkmark" : meta.icon} size={17} />
      </span>

      <span className={styles.qText}>
        <strong data-i18n={questTitleKey(quest)}>{questTitle(quest)}</strong>
        <small>
          <span data-i18n={`retention.quests.tier.${quest.slot}`}>{rt(`quests.tier.${quest.slot}`)}</span>
          {oneShot ? null : (
            <span data-no-translate>
              {" · "}
              {quest.progress}/{quest.target}
            </span>
          )}
          {course ? (
            <span className={styles.flag} data-no-translate>
              {course.flag}
            </span>
          ) : null}
        </small>
      </span>

      <span className={styles.qEnd}>
        {quest.claimed ? (
          <em className={styles.stamp} data-i18n="retention.quests.doneStamp">
            {rt("quests.doneStamp")}
          </em>
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
            <MobileIcon name="diamond" size={13} />
            <span data-no-translate>{quest.gems}</span>
          </span>
        )}
        {showReroll ? (
          <button
            aria-label="Almashtirish"
            className={`${styles.swap} ${rerolling ? styles.swapping : ""}`}
            onClick={onReroll}
            type="button"
          >
            <MobileIcon name="shuffle" size={15} />
          </button>
        ) : null}
        {gain ? (
          <span className={styles.gain} key={gain.key}>
            <MobileIcon name="diamond" size={13} />+{gain.n}
          </span>
        ) : null}
      </span>
    </li>
  );
}

// ─────────────────────────── 이번 달 ───────────────────────────

function Month({ monthly, patch }: { monthly: MonthlyView; patch: Patch }) {
  const { request, updateUser } = useTelegramAuth();
  const [busy, setBusy] = useState<number | null>(null);
  const meta = MONTH_BADGES[monthOf(monthly.month)] ?? MONTH_BADGES[1]!;
  const earned = monthly.badges.includes(monthly.month);
  const badgeAt = monthly.milestones.find((m) => m.badge)?.at ?? monthly.target;
  const claimable = monthly.milestones.find((m) => m.reached && !m.claimed);
  const shown = useFill(monthly.target > 0 ? Math.min(1, monthly.count / monthly.target) : 0);
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
    <section className={styles.month} style={{ "--mc": meta.color, "--md": meta.dark } as CSSProperties}>
      <div className={styles.monthHead}>
        <QuestBadge locked={!earned} month={monthly.month} size={48} />
        <span>
          <h2 data-i18n="retention.monthly.title">{rt("monthly.title", { month: monthName(monthly.month) })}</h2>
          <small data-i18n="retention.monthly.sub">
            {rt("monthly.sub", { d: monthly.daysLeft, n: monthly.count, target: monthly.target })}
          </small>
        </span>
      </div>

      <div className={styles.road}>
        <span className={styles.roadBar}>
          <i style={{ width: `${shown * 100}%` }} />
        </span>
        {monthly.milestones.map((ms) => {
          const pos = monthly.target > 0 ? Math.min(1, ms.at / monthly.target) : 1;
          const ready = ms.reached && !ms.claimed;
          return (
            <span className={styles.stop} key={ms.at} style={{ left: `${pos * 100}%` }}>
              <button
                aria-label={ready ? rt("monthly.claim") : String(ms.at)}
                className={`${styles.stopDot} ${ms.claimed ? styles.stopDone : ""} ${ready ? styles.stopReady : ""}`}
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

      <p
        className={`${styles.badgeLine} ${earned ? styles.badgeEarned : ""}`}
        data-i18n={earned ? "retention.monthly.badgeEarned" : "retention.monthly.badgeLocked"}
      >
        {earned ? rt("monthly.badgeEarned") : rt("monthly.badgeLocked", { n: badgeAt })}
      </p>

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
        <div className={styles.pastBadges}>
          <small data-i18n="retention.monthly.myBadges">{rt("monthly.myBadges")}</small>
          <div>
            {past.map((key) => (
              <QuestBadge key={key} month={key} size={34} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
