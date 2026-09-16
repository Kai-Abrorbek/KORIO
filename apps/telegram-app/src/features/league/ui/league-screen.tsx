"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import {
  TIERS,
  getTier,
  getTierIndex,
  tierLabel,
  type LeagueData,
  type LeagueMember,
  type LeagueResult,
} from "../model/league";
import { FriendAvatar } from "./friend-avatar";
import { TierCrystal } from "./tier-crystal";
import styles from "./league-screen.module.css";

const MEDALS = [
  { fill: "#FFC93C", ribbon: "#E5A700", text: "#8A5B00" },
  { fill: "#C9D3DE", ribbon: "#A8B4C2", text: "#5C6875" },
  { fill: "#D19A64", ribbon: "#B07C48", text: "#7A4E1E" },
];

function RankBadge({ isMe, rank }: { isMe: boolean; rank: number }) {
  if (rank <= 3) {
    const medal = MEDALS[rank - 1]!;
    return (
      <span className={styles.rankBadge}>
        <i className={styles.medalTail} style={{ borderTopColor: medal.ribbon }} />
        <b style={{ backgroundColor: medal.fill, color: medal.text }}>{rank}</b>
      </span>
    );
  }
  return (
    <span className={styles.rankBadge}>
      <strong className={isMe ? styles.rankMe : ""}>{rank}</strong>
    </span>
  );
}

function BottomTabs() {
  const router = useRouter();
  return (
    <nav aria-label="Asosiy navigatsiya" className={styles.bottomNav}>
      <button onClick={() => router.push("/home")} type="button">
        <MobileIcon name="home" size={23} /><span>Asosiy</span>
      </button>
      <button onClick={() => router.push("/stats")} type="button">
        <MobileIcon name="bar-chart" size={23} /><span>Statistika</span>
      </button>
      <button aria-current="page" className={styles.navActive} type="button">
        <MobileIcon name="trophy" size={23} /><span>Liga</span>
      </button>
      <button onClick={() => router.push("/premium")} type="button">
        <MobileIcon name="ribbon" size={23} /><span>Premium</span>
      </button>
    </nav>
  );
}

function ZoneDivider({ kind }: { kind: "promote" | "demote" }) {
  const promote = kind === "promote";
  const color = promote ? "#58CC02" : "#FF4B4B";
  return (
    <div className={styles.zoneDivider}>
      <i style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }}>
        <MobileIcon name={promote ? "chevron-up" : "chevron-down"} size={13} />
        {promote ? "Yuqoriga" : "Pastga"}
      </span>
      <i style={{ backgroundColor: color }} />
    </div>
  );
}

function MemberRow({
  member,
  offset,
  zone,
  onRef,
}: {
  member: LeagueMember;
  offset: number;
  zone: "promote" | "demote" | null;
  onRef: (rank: number, node: HTMLDivElement | null) => void;
}) {
  return (
    <div
      className={[
        styles.memberRow,
        zone === "promote" ? styles.rowPromote : "",
        zone === "demote" ? styles.rowDemote : "",
        member.isMe ? styles.rowMe : "",
        offset !== 0 ? styles.rankAnimated : "",
      ].join(" ")}
      ref={(node) => onRef(member.rank, node)}
      style={{ "--rank-offset": `${offset}px` } as CSSProperties}
    >
      <RankBadge isMe={member.isMe} rank={member.rank} />
      <FriendAvatar member={member} />
      <span className={styles.memberInfo}>
        <strong className={member.isMe ? styles.nameMe : ""}>{member.nickname}</strong>
        <span className={styles.memberSub}>
          {member.flag ? <span className={styles.flag}>{member.flag}</span> : null}
          {member.streak != null ? <span>{member.streak}</span> : null}
        </span>
      </span>
      <b className={member.isMe ? styles.xpMe : styles.xp}>{member.xp} XP</b>
    </div>
  );
}

export function LeagueScreen() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const [data, setData] = useState<LeagueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(() => Date.now());
  const [offsets, setOffsets] = useState<Map<number, number>>(new Map());
  const [animationDone, setAnimationDone] = useState(false);
  const rows = useRef(new Map<number, HTMLDivElement>());

  useEffect(() => {
    let active = true;
    void request<LeagueResult | null>("/league/result")
      .then((result) => {
        if (active && result) router.push("/league-result");
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, [request, router]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    void request<LeagueData>("/league/me")
      .then((result) => { if (active) setData(result); })
      .catch(() => undefined)
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [request]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const onRowRef = useCallback((rank: number, node: HTMLDivElement | null) => {
    if (node) rows.current.set(rank, node);
    else rows.current.delete(rank);
  }, []);

  useLayoutEffect(() => {
    if (!data || animationDone || offsets.size > 0) return;
    const me = data.members.find((member) => member.isMe);
    if (!me || data.previousRank <= me.rank) return;
    const oldRow = rows.current.get(data.previousRank);
    const currentRow = rows.current.get(me.rank);
    if (!oldRow || !currentRow) return;
    const next = new Map<number, number>();
    next.set(
      me.rank,
      oldRow.getBoundingClientRect().top - currentRow.getBoundingClientRect().top,
    );
    for (let rank = me.rank + 1; rank <= data.previousRank; rank += 1) {
      const current = rows.current.get(rank);
      const before = rows.current.get(rank - 1);
      if (current && before) {
        next.set(
          rank,
          before.getBoundingClientRect().top - current.getBoundingClientRect().top,
        );
      }
    }
    setOffsets(next);
  }, [animationDone, data, offsets.size]);

  useEffect(() => {
    if (!data || offsets.size === 0) return;
    const me = data.members.find((member) => member.isMe);
    if (!me) return;
    const timer = window.setTimeout(() => {
      void request("/league/ack-rank", {
        body: JSON.stringify({ rank: me.rank }),
        method: "POST",
      }).catch(() => undefined);
      setAnimationDone(true);
      setOffsets(new Map());
    }, 1550);
    return () => window.clearTimeout(timer);
  }, [data, offsets, request]);

  const tierIndex = useMemo(() => getTierIndex(data?.tier ?? "bronze"), [data?.tier]);

  if (loading || !data) {
    return (
      <main className={styles.leaguePage}>
        <div className={styles.loading}><i /></div>
        <BottomTabs />
      </main>
    );
  }

  const tier = getTier(data.tier);
  const challengeXp = data.boostXp ?? 210;
  const remaining = new Date(data.endsAt).getTime() - now;
  const days = Math.ceil(remaining / 86400000);
  const hours = Math.max(0, Math.floor(remaining / 3600000));
  const minutes = Math.max(0, Math.floor((remaining % 3600000) / 60000));
  const timeLabel = days > 1 ? `${days} kun` : `${hours}:${String(minutes).padStart(2, "0")}`;
  const demoteLine = data.members.length - data.demoteCount;
  const keepSafe = data.myWeeklyXp >= data.keepXp;
  const keepRatio = data.keepXp > 0 ? Math.min(1, data.myWeeklyXp / data.keepXp) : 1;

  return (
    <main className={styles.leaguePage}>
      <header className={styles.header}>
        <h1>{tierLabel(data.tier)}</h1>
        <p><MobileIcon name="time-outline" size={16} />{timeLabel}</p>
      </header>

      {data.keepXp > 0 ? (
        <section className={styles.keepWrap}>
          <div><span>Ligada qolish</span><b className={keepSafe ? styles.keepSafe : styles.keepDanger}>{data.myWeeklyXp} / {data.keepXp} XP · {keepSafe ? "xavfsiz" : "tushib ketasiz"}</b></div>
          <span className={styles.keepTrack}><i style={{ backgroundColor: keepSafe ? "#58CC02" : "#FF4B4B", width: `${keepRatio * 100}%` }} /></span>
        </section>
      ) : null}

      <div className={styles.tierScroll}>
        {TIERS.map((item, index) => (
          <TierCrystal
            active={index === tierIndex}
            key={item.key}
            locked={index > tierIndex}
            size={index === tierIndex ? 120 : 92}
            tier={item}
          />
        ))}
      </div>

      <div className={styles.boardScroll}>
        <section className={styles.board}>
          {data.members.map((member) => {
            const zone = data.promoteCount > 0 && member.rank <= data.promoteCount
              ? "promote"
              : data.demoteCount > 0 && member.rank > demoteLine
                ? "demote"
                : null;
            return (
              <div key={member.id}>
                <MemberRow member={member} offset={offsets.get(member.rank) ?? 0} onRef={onRowRef} zone={zone} />
                {data.promoteCount > 0 && member.rank === data.promoteCount ? <ZoneDivider kind="promote" /> : null}
                {data.demoteCount > 0 && member.rank === demoteLine ? <ZoneDivider kind="demote" /> : null}
              </div>
            );
          })}
        </section>
      </div>

      <button
        aria-label={`+${challengeXp} XP`}
        className={styles.challengeButton}
        onClick={() => router.push(`/xp-challenge?tier=${encodeURIComponent(data.tier)}&xp=${challengeXp}`)}
        style={{ "--tier-color": tier.color, "--tier-dark": tier.colorDark, "--tier-light": tier.colorLight } as CSSProperties}
        type="button"
      >
        <span><MobileIcon name="flash" size={30} /></span>
        <b>+{challengeXp} XP</b>
      </button>
      <BottomTabs />
    </main>
  );
}
