"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { useTelegramBackOverride } from "../../../shared/telegram/back-button";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { continueLearningDestination } from "../../learning/model/learning-options";
import { getStreakGoal, startStreakGoal } from "../api/retention";
import {
  goalLength,
  haptic,
  rt,
  type StreakGoalOption,
  type StreakGoalPage,
} from "../model/retention";
import { Button3D, RewardDialog } from "./parts";
import styles from "./retention.module.css";

/** "이어가면 받는 보석" 표를 며칠 앞까지 보여줄지 */
const LOOKAHEAD_DAYS = 30;

/**
 * 연속 학습 목표 (앱 features/retention/screens/StreakGoalScreen 과 같다).
 *  1) 이어가면 받는 보석 — 연속 N일째마다 상자 보석을 앞으로 30일 표로
 *  2) 목표(3·7·14·21·30일)를 고르면 **바로** 보석. 끊기면 돌려받는다 (모자라면 마이너스)
 */
export function StreakGoalScreen() {
  const router = useRouter();
  const { request, updateUser, user } = useTelegramAuth();
  const [page, setPage] = useState<StreakGoalPage | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [starting, setStarting] = useState(false);
  const [started, setStarted] = useState<StreakGoalOption | null>(null);

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.replace("/home");
  };
  useTelegramBackOverride(goBack);

  const load = useCallback(async () => {
    try {
      const result = await getStreakGoal(request);
      setPage(result);
      setLoadFailed(false);
      updateUser({ gems: result.gems, streak: result.streak });
    } catch {
      setLoadFailed(true);
    }
  }, [request, updateUser]);

  useEffect(() => {
    void load();
  }, [load]);

  const options = useMemo(() => page?.options ?? [], [page]);
  const active = page?.active ?? null;
  const chosen = options.find((option) => option.days === selected) ?? null;

  // 기본 선택 — 7일 (없으면 첫 번째)
  useEffect(() => {
    if (selected === null && options.length && !active) {
      setSelected((options.find((option) => option.days === 7) ?? options[0])!.days);
    }
  }, [options, active, selected]);

  const start = async () => {
    if (!chosen || starting) return;
    setStarting(true);
    try {
      const result = await startStreakGoal(request, chosen.days);
      haptic("success");
      setPage(result);
      updateUser({ gems: result.gems });
      setConfirming(false);
      setStarted(chosen);
    } catch {
      setConfirming(false);
      void load();
    } finally {
      setStarting(false);
    }
  };

  const goStudy = () => {
    router.push(user ? continueLearningDestination(user) : "/home");
  };

  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <button aria-label="Orqaga" onClick={goBack} type="button">
          <MobileIcon name="chevron-back" size={26} />
        </button>
        <h1>{rt("goal.pageTitle")}</h1>
        <span className={styles.gemPill}>
          <MobileIcon name="diamond" size={14} />
          <span className={(page?.gems ?? 0) < 0 ? styles.negative : ""} data-no-translate>
            {(page?.gems ?? 0).toLocaleString("en-US")}
          </span>
        </span>
      </header>

      {!page ? (
        <div className={styles.state}>
          {loadFailed ? (
            <Button3D
              compact
              icon={<MobileIcon name="refresh" size={16} />}
              label={rt("retry")}
              onClick={() => void load()}
            />
          ) : (
            <i className={styles.spin} style={{ borderColor: "var(--border)", borderTopColor: "#776ee2" }} />
          )}
        </div>
      ) : (
        <>
          <div className={styles.scroll}>
            {/* 히어로 */}
            <section className={styles.hero}>
              <span className={styles.heroFlame}>
                <MobileIcon name="flame" size={64} />
              </span>
              <span>
                <div className={styles.heroCount} data-no-translate>{page.streak}</div>
                <div className={styles.heroLabel}>{rt("goal.heroStreak")}</div>
                <span className={styles.heroFreeze}>
                  <MobileIcon name="snow" size={13} />
                  {rt("freeze.chip", { max: page.freeze.max, n: page.freeze.owned })}
                </span>
              </span>
            </section>

            <MilestoneTrack
              everyDays={page.streakChest.everyDays}
              gems={page.streakChest.gems}
              goalGems={active?.gems ?? chosen?.gems ?? 0}
              streak={page.streak}
            />

            <h2 className={styles.section}>
              {active ? rt("goal.activeTitle") : rt("goal.pickTitle")}
            </h2>

            {active ? (
              <ActiveGoal days={active.days} gems={active.gems} progress={active.progress} />
            ) : (
              <div className={styles.options}>
                {options.map((option, index) => {
                  const on = option.days === selected;
                  return (
                    <button
                      className={`${styles.option} ${on ? styles.optionOn : ""}`}
                      key={option.days}
                      onClick={() => {
                        haptic("select");
                        setSelected(option.days);
                      }}
                      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
                      type="button"
                    >
                      <span className={styles.optLen}>{goalLength(option.days)}</span>
                      <span className={styles.optMid}>
                        <span className={styles.flames}>
                          {Array.from({ length: Math.min(5, index + 1) }, (_, flame) => (
                            <MobileIcon key={flame} name="flame" size={14} />
                          ))}
                        </span>
                        <span className={styles.sub}>{rt("goal.optionSub", { n: option.days })}</span>
                      </span>
                      <span className={styles.optGems}>
                        <MobileIcon name="diamond" size={14} />
                        <span data-no-translate>+{option.gems}</span>
                      </span>
                      {on ? (
                        <i className={styles.optCheck}><MobileIcon name="checkmark" size={14} /></i>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}

            <div className={styles.rules}>
              {(
                [
                  ["flash", rt("goal.rule1")],
                  ["calendar", rt("goal.rule2")],
                  ["snow", rt("goal.rule3")],
                  ["alert-circle", rt("goal.rule4")],
                ] as [IoniconName, string][]
              ).map(([icon, text], index) => (
                <div className={index === 3 ? styles.ruleWarn : ""} key={index}>
                  <MobileIcon name={icon} size={15} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 하단 고정 버튼 */}
          <div className={styles.bottom}>
            {active ? (
              <Button3D
                icon={<MobileIcon name="book" size={18} />}
                label={rt("goal.goStudy")}
                onClick={goStudy}
              />
            ) : (
              <Button3D
                disabled={!chosen}
                icon={<MobileIcon name="diamond" size={17} />}
                label={chosen ? rt("goal.startCta", { gems: chosen.gems }) : rt("goal.pickFirst")}
                onClick={() => setConfirming(true)}
                tone="orange"
              />
            )}
          </div>
        </>
      )}

      {/* 대화상자는 계속 붙여 두고 open 만 바꾼다 — 닫힐 때도 페이드가 보인다 */}
      <RewardDialog
        body={rt("goal.confirmBody", { gems: chosen?.gems ?? 0 })}
        loading={starting}
        mood="determined"
        onPrimary={() => void start()}
        onSecondary={() => setConfirming(false)}
        open={confirming && Boolean(chosen)}
        primaryLabel={rt("goal.confirmYes")}
        primaryTone="orange"
        rewards={
          chosen
            ? [
                { color: "#3BB6E5", icon: "diamond", label: rt("goal.confirmGet", { gems: chosen.gems }) },
                { color: "#FF7A00", icon: "flame", label: rt("goal.confirmKeep", { n: chosen.days }) },
              ]
            : []
        }
        secondaryLabel={rt("goal.confirmNo")}
        title={rt("goal.confirmTitle", { len: goalLength(chosen?.days ?? 0) })}
      />

      <RewardDialog
        body={rt("goal.startedBody", { n: started?.days ?? 0 })}
        mood="celebrating"
        onPrimary={() => {
          setStarted(null);
          goStudy();
        }}
        onSecondary={() => setStarted(null)}
        open={Boolean(started)}
        primaryLabel={rt("goal.goStudy")}
        rewards={
          started
            ? [{ color: "#3BB6E5", icon: "diamond", label: rt("goal.confirmGet", { gems: started.gems }) }]
            : []
        }
        secondaryLabel={rt("close")}
        title={rt("goal.startedTitle")}
      />
    </main>
  );
}

function MilestoneTrack({
  streak,
  everyDays,
  gems,
  goalGems,
}: {
  streak: number;
  everyDays: number;
  gems: number;
  goalGems: number;
}) {
  // 지금 연속 다음부터 30일 안에 오는 상자 날들
  const milestones = useMemo(() => {
    if (everyDays <= 0) return [] as number[];
    const out: number[] = [];
    let day = (Math.floor(streak / everyDays) + 1) * everyDays;
    while (day <= streak + LOOKAHEAD_DAYS) {
      out.push(day);
      day += everyDays;
    }
    return out;
  }, [streak, everyDays]);
  const total = milestones.length * gems;

  return (
    <section className={styles.card} style={{ margin: 0 }}>
      <span className={styles.titleRow}>
        <MobileIcon name="gift" size={18} style={{ color: "#FFB020" }} />
        <strong className={styles.title}>{rt("goal.trackTitle")}</strong>
      </span>
      <p className={styles.sub} style={{ margin: "4px 0 0" }}>
        {rt("goal.trackSub", { every: everyDays, gems })}
      </p>
      <div className={styles.mTrack}>
        {milestones.map((day, index) => (
          <span
            className={`${styles.milestone} ${index === 0 ? styles.mNext : ""}`}
            key={day}
            style={{ animationDelay: `${index * 0.07}s` } as CSSProperties}
          >
            <small>{rt("goal.dayN", { n: day })}</small>
            <MobileIcon name="gift" size={22} />
            <b>
              <MobileIcon name="diamond" size={11} />
              <span data-no-translate>{gems}</span>
            </b>
            <em>
              {day - streak === 1
                ? rt("goal.tomorrow")
                : rt("goal.inDays", { n: day - streak })}
            </em>
          </span>
        ))}
      </div>
      <div className={styles.totalRow}>
        <span>{rt("goal.trackTotal", { n: LOOKAHEAD_DAYS })}</span>
        <b>
          <MobileIcon name="diamond" size={16} />
          <span data-no-translate>{(total + goalGems).toLocaleString("en-US")}</span>
        </b>
      </div>
      {goalGems > 0 ? (
        <div className={styles.totalHint}>
          {rt("goal.trackWithGoal", { chest: total, goal: goalGems })}
        </div>
      ) : null}
    </section>
  );
}

function ActiveGoal({ days, gems, progress }: { days: number; gems: number; progress: number }) {
  const ratio = days > 0 ? Math.min(1, progress / days) : 0;
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(ratio));
    return () => cancelAnimationFrame(frame);
  }, [ratio]);
  return (
    <section className={styles.active}>
      <div className={styles.activeTop}>
        <strong>{goalLength(days)}</strong>
        <span className={styles.optGems}>
          <MobileIcon name="diamond" size={14} />
          <span data-no-translate>{gems}</span>
        </span>
      </div>
      <div className={styles.dots}>
        {Array.from({ length: days }, (_, index) => (
          <i
            className={[
              styles.dot,
              days > 14 ? styles.dotSmall : "",
              index < progress ? styles.dotDone : "",
            ].join(" ")}
            key={index}
          >
            {index < progress && days <= 14 ? <MobileIcon name="flame" size={12} /> : null}
          </i>
        ))}
      </div>
      <div className={styles.activeTrack}>
        <i style={{ width: `${shown * 100}%` }} />
      </div>
      <div className={styles.activeText}>{rt("goal.activeProgress", { n: days, p: progress })}</div>
      <div className={styles.warn}>
        <MobileIcon name="alert-circle" size={14} />
        <span>{rt("goal.activeWarn", { gems })}</span>
      </div>
    </section>
  );
}
