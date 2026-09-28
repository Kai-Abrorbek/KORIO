"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import styles from "./rank-banner.module.css";

/**
 * 홈의 "내 순위는 몇 등?" 배너 — 모바일 features/rank/RankBanner 와 같은 동작.
 * 누르면 /users/me/rank 를 불러 60초 동안 펼쳐 보여 주고 저절로 접힌다.
 *
 * 문구는 우즈벡어 원문 그대로 한 덩어리로 쓴다 (번역 카탈로그가 틀째 바꾼다).
 * 등수 숫자와 "-o'rin" 은 일부러 따로 둔다 — 숫자는 굴러가고, 접미사는
 * 언어마다 통째로 바뀐다 (ko: "위").
 */
type RankTier = "legend" | "master" | "elite" | "rising" | "steady" | "starter";

interface RankBreakdown {
  key: "proficiency" | "volume" | "consistency";
  value: number;
  raw: number;
}

interface MyRank {
  ranked: boolean;
  rank: number | null;
  total: number;
  percentile: number | null;
  tier: RankTier | null;
  breakdown: RankBreakdown[];
  xpToNextRank: number | null;
}

const HOLD_MS = 60_000;

const TIER: Record<RankTier, { accent: string; icon: IoniconName; name: string }> = {
  legend: { accent: "#FFD24A", icon: "flame", name: "Afsona" },
  master: { accent: "#FF9EC0", icon: "diamond", name: "Ustoz" },
  elite: { accent: "#6FE3FF", icon: "star", name: "Yuqori safda" },
  rising: { accent: "#7BE495", icon: "trending-up", name: "O'sishda" },
  steady: { accent: "#FFB865", icon: "footsteps", name: "Barqaror" },
  starter: { accent: "#CFC9FF", icon: "leaf", name: "Boshlanish" },
};

const STAT: Record<RankBreakdown["key"], { color: string; icon: IoniconName; label: string }> = {
  proficiency: { color: "#FFD24A", icon: "school", label: "Daraja" },
  volume: { color: "#6FE3FF", icon: "flash", label: "Hajm" },
  consistency: { color: "#7BE495", icon: "flame", label: "Izchillik" },
};

const group = (value: number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/** 숫자가 굴러 올라간다. 끝나면 언제나 정확히 to (모바일 AnimatedCount 와 같다) */
function CountUp({ to, duration = 1100 }: { to: number; duration?: number }) {
  const [shown, setShown] = useState(to);
  useEffect(() => {
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      setShown(Math.round((1 - Math.pow(1 - progress, 3)) * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    setShown(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, to]);
  return <span data-no-translate>{group(shown)}</span>;
}

export function RankBanner() {
  const { request } = useTelegramAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MyRank | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [holdKey, setHoldKey] = useState(0);
  const timer = useRef<number | null>(null);

  const close = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
    setOpen(false);
    setError(null);
  }, []);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const reveal = async () => {
    if (loading) return;
    if (open) {
      close();
      return;
    }
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
    setLoading(true);
    setError(null);
    try {
      setData(await request<MyRank>("/users/me/rank"));
      setOpen(true);
      setHoldKey((value) => value + 1);
      timer.current = window.setTimeout(close, HOLD_MS);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "UNKNOWN");
      setOpen(true);
      timer.current = window.setTimeout(close, 6_000);
    } finally {
      setLoading(false);
    }
  };

  const tier = data?.tier ? TIER[data.tier] : TIER.starter;
  const ranked = open && Boolean(data?.ranked) && !error;

  return (
    <button
      aria-expanded={open}
      className={`${styles.card} ${open ? styles.open : ""}`}
      disabled={loading}
      onClick={() => void reveal()}
      style={{ "--accent": tier.accent } as CSSProperties}
      type="button"
    >
      {!open ? <i aria-hidden="true" className={styles.shine} /> : null}

      <span className={styles.head}>
        <span className={styles.headIcon}>
          <MobileIcon name={ranked ? tier.icon : "sparkles"} size={18} />
        </span>
        <span className={styles.headText}>
          <b data-i18n={ranked ? `rank.tier.${data?.tier ?? "starter"}` : undefined}>{ranked ? tier.name : "Men nechanchi o'rindaman?"}</b>
          <small>{ranked ? `Eng yaxshi ${data?.percentile}%` : "Barcha o'quvchilar orasidagi o'rningizni ko'ring"}</small>
        </span>
        {loading ? <i className={styles.spinner} /> : <MobileIcon name={open ? "close" : "arrow-forward"} size={20} />}
      </span>

      {open ? (
        <span className={styles.body}>
          {error ? (
            <span className={styles.error}>{`O'rinni yuklab bo'lmadi · ${error}`}</span>
          ) : !data?.ranked ? (
            <span className={styles.unranked}>
              <b>Hozircha o&apos;rningiz yo&apos;q</b>
              <small>{`Bitta darsni tugatsangiz, ${data?.total ?? 0} kishi orasida o'rningiz belgilanadi.`}</small>
            </span>
          ) : (
            <RankResult data={data} />
          )}
          <span className={styles.holdTrack}>
            <i key={holdKey} style={{ animationDuration: `${error ? 6_000 : HOLD_MS}ms` }} />
          </span>
        </span>
      ) : null}
    </button>
  );
}

function RankResult({ data }: { data: MyRank }) {
  const tier = data.tier ? TIER[data.tier] : TIER.starter;
  // 2% 아래로는 안 내린다 — 0 이면 점이 왼쪽 끝에 박혀 "꼴찌" 처럼 보인다
  const ahead = Math.max(2, Math.min(100, 100 - (data.percentile ?? 100)));
  const valueOf = (item: RankBreakdown) =>
    item.key === "proficiency"
      ? `${item.raw}-daraja`
      : item.key === "volume"
        ? `${group(item.raw)} XP`
        : `${item.raw} kun`;

  return (
    <>
      <span className={styles.hero}>
        <span className={styles.tierChip} data-i18n={`rank.tier.${data.tier ?? "starter"}`}>
          <MobileIcon name={tier.icon} size={13} />
          {tier.name}
        </span>
        <strong className={styles.rankNum}>
          <CountUp to={data.rank ?? 0} />
          <span>-o&apos;rin</span>
        </strong>
        <small>{`${data.total.toLocaleString("en-US")} ta o'quvchi orasida`}</small>
      </span>

      <span className={styles.pos}>
        <span className={styles.posTrack} style={{ "--ahead": `${ahead}%` } as CSSProperties}>
          <i />
          <em />
        </span>
        <span className={styles.posEnds}>
          <small><span data-no-translate>1</span><span>-o&apos;rin</span></small>
          <small className={styles.posMe}>{`Eng yaxshi ${data.percentile}%`}</small>
          <small><span data-no-translate>{group(data.total)}</span><span>-o&apos;rin</span></small>
        </span>
      </span>

      <span className={styles.stats}>
        {data.breakdown.map((item, index) => {
          const look = STAT[item.key];
          return (
            <span
              className={styles.stat}
              key={item.key}
              style={{
                "--delay": `${320 + index * 90}ms`,
                "--fill": `${Math.round(Math.max(0.04, Math.min(1, item.value)) * 100)}%`,
                "--stat": look.color,
              } as CSSProperties}
            >
              <span className={styles.statHead}>
                <MobileIcon name={look.icon} size={12} />
                <small>{look.label}</small>
              </span>
              <b>{valueOf(item)}</b>
              <span className={styles.statTrack}><i /></span>
            </span>
          );
        })}
      </span>

      <span className={styles.cta}>
        <MobileIcon name={data.rank === 1 ? "trophy" : data.xpToNextRank == null ? "sparkles" : "arrow-up"} size={13} />
        {data.rank === 1
          ? "Umumiy 1-o'rin. Yuqorida hech kim yo'q"
          : data.xpToNextRank == null
            ? "Bundan yuqorisini daraja va izchillik hal qiladi"
            : `Bir pog'ona ko'tarilish uchun ${group(data.xpToNextRank)} XP`}
      </span>
    </>
  );
}
