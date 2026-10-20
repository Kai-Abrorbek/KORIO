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
import { createCinemaAudio, type CinemaAudio } from "../../../shared/browser/cinema-audio";
import { cinemaHaptic, prefersReducedMotion, runCinemaClock, type CinemaClock } from "../../../shared/browser/cinema-clock";
import { cinemaAt, progress, type CinemaKey } from "../../../shared/model/cinema";
import {
  LEAGUE_INTRO,
  LEAGUE_INTRO_CUES,
  LEAGUE_TRACK,
  RANK_ANIM_TOTAL_MS,
  RANK_GAIN_CHIP,
  RANK_HOLD_MS,
  RANK_MOVE_MS,
  podiumTracks,
  rowEnter,
  type LeagueSound,
} from "../../../shared/model/league-cinematic";
import { uzt } from "../../../shared/i18n/uz-text";
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
import { NameTitle } from "../../../shared/ui/name-title";
import { TierCrystal } from "./tier-crystal";
import styles from "./league-screen.module.css";

const LEAGUE_RESULT_CHECKED_KEY = "korio-league-result-checked";

/** 금 · 은 · 동 — 블록 면 · 아래 두께 · 숫자 (앱 LeaguePodium 과 같다) */
const MEDALS = [
  { fill: "#FFC93C", ribbon: "#E5A700", text: "#8A5B00" },
  { fill: "#C9D3DE", ribbon: "#A8B4C2", text: "#5C6875" },
  { fill: "#D19A64", ribbon: "#B07C48", text: "#7A4E1E" },
] as const;
const BLOCK_H: Record<1 | 2 | 3, number> = { 1: 96, 2: 72, 3: 56 };
const AVATAR: Record<1 | 2 | 3, number> = { 1: 76, 2: 60, 3: 60 };

/** 이미 만들어 둔 연출 소리를 다시 쓴다 (tools/cinema-audio · 앱 리그 탭과 같다) */
const LEAGUE_SOURCES: Record<LeagueSound, string> = {
  pop: "/sounds/lesson/stat-pop.mp3",
  sparkle: "/sounds/lesson/sparkle.mp3",
  whoosh: "/sounds/lesson/stamp-whoosh.mp3",
  ding: "/sounds/chest/gem-ding.mp3",
};
const LEAGUE_GAIN: Partial<Record<LeagueSound, number>> = { pop: 0.55, sparkle: 0.5, whoosh: 0.6, ding: 0.6 };

/** 이 주(weekKey)의 들어오는 연출을 이미 봤다 — 탭을 오갈 때마다 다시 솟지 않게 */
const introPlayed = new Set<string>();

const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

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
  return (
    <div className={[styles.zoneDivider, promote ? styles.zonePromote : styles.zoneDemote].join(" ")}>
      <i />
      <span data-i18n={promote ? "league.promoteZone" : "league.demoteZone"}>
        <MobileIcon name={promote ? "chevron-up" : "chevron-down"} size={13} />
        {uzt(promote ? "league.promoteZone" : "league.demoteZone")}
      </span>
      <i />
    </div>
  );
}

/** 시상대 칸 하나가 들어올 때 움직이는 부위 */
interface PodiumParts {
  person: HTMLElement | null;
  block: HTMLElement | null;
  crown: HTMLElement | null;
}

/** 내 줄에만 붙는 부위 (빛 · 속도선 · 칩 · 훑는 빛) */
interface MeParts {
  glow: HTMLElement | null;
  streaks: HTMLElement | null;
  gain: HTMLElement | null;
  chip: HTMLElement | null;
  sweep: HTMLElement | null;
}

/**
 * 리그 탭 (앱 app/(tabs)/league.tsx 와 같다) — 티어 무대 · 시상대 · 4위부터 목록.
 * 들어올 때 한 번(같은 주에는 한 번)과 순위가 올랐을 때 연출은 shared/model/league-cinematic.
 * React 는 뼈대만 그리고, 시계(runCinemaClock)가 매 프레임 style 을 직접 바꾼다.
 * 목록 · 시상대에서 사람을 누르면 그 사람 프로필, 나는 내 프로필.
 */
export function LeagueScreen() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const [data, setData] = useState<LeagueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(() => Date.now());
  const scroller = useRef<HTMLDivElement>(null);
  const crystal = useRef<HTMLSpanElement>(null);
  const ring = useRef<HTMLElement>(null);
  const podiumParts = useRef<Record<1 | 2 | 3, PodiumParts>>({
    1: { person: null, block: null, crown: null },
    2: { person: null, block: null, crown: null },
    3: { person: null, block: null, crown: null },
  });
  const enterRows = useRef<(HTMLDivElement | null)[]>([]);
  const rankRows = useRef(new Map<number, HTMLDivElement>());
  const meParts = useRef<MeParts>({ glow: null, streaks: null, gain: null, chip: null, sweep: null });

  useEffect(() => {
    // 모바일은 리그 탭이 계속 떠 있어서 앱 세션당 한 번만 확인한다. 여기선 화면이 다시
    // 마운트되므로, 확인(ack)이 실패하면 결과 화면 → 뒤로 → 다시 결과 화면이 무한히 돌았다
    try {
      if (window.sessionStorage.getItem(LEAGUE_RESULT_CHECKED_KEY)) return;
      window.sessionStorage.setItem(LEAGUE_RESULT_CHECKED_KEY, "1");
    } catch {
      // 저장소가 막혀 있으면 매번 확인한다
    }
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

  const me = data?.members.find((member) => member.isMe);
  const rankGain = me && data ? Math.max(0, data.previousRank - me.rank) : 0;

  /**
   * 들어오는 연출 + 순위 상승 연출. 그리기 전에 첫 장면을 맞춘다 —
   * 이미 본 주에 다시 들어오면 시계를 끝으로 바로 보내 줄들이 한 프레임도 사라지지 않게.
   */
  useLayoutEffect(() => {
    if (!data) return;
    const reduce = prefersReducedMotion();
    const fresh = !reduce && !introPlayed.has(data.weekKey);
    introPlayed.add(data.weekKey);
    const sound: CinemaAudio<LeagueSound> = createCinemaAudio({ sources: LEAGUE_SOURCES, gains: LEAGUE_GAIN });
    sound.preload();
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const podiumKeys = ([1, 2, 3] as const).map((place) => ({ place, ...podiumTracks(place) }));

    const applyIntro = (t: number) => {
      if (crystal.current) {
        crystal.current.style.opacity = String(cinemaAt(LEAGUE_TRACK.crystalOpacity, t));
        crystal.current.style.transform = `scale(${cinemaAt(LEAGUE_TRACK.crystalScale, t)})`;
      }
      if (ring.current) {
        const r = cinemaAt(LEAGUE_TRACK.ring, t);
        ring.current.style.opacity = String(r <= 0 || r >= 1 ? 0 : 0.8 * (1 - r));
        ring.current.style.transform = `scale(${0.6 + 1.2 * r})`;
      }
      for (const { place, block, avatar } of podiumKeys) {
        const parts = podiumParts.current[place];
        if (parts.block) {
          parts.block.style.transform = `translateY(${(1 - cinemaAt(block, t)) * (BLOCK_H[place] + 8)}px)`;
        }
        if (parts.person) {
          const a = cinemaAt(avatar, t);
          parts.person.style.opacity = String(Math.min(1, a * 1.5));
          parts.person.style.transform = `translateY(${(1 - a) * 24}px) scale(${Math.max(0.001, a)})`;
        }
        if (parts.crown) {
          const c = cinemaAt(LEAGUE_TRACK.crown, t);
          parts.crown.style.opacity = String(Math.min(1, c));
          parts.crown.style.transform = `translateY(${(1 - c) * -14}px) rotate(${(1 - c) * -20}deg) scale(${Math.max(0.001, c)})`;
        }
      }
      enterRows.current.forEach((row, index) => {
        if (!row) return;
        const p = rowEnter(index, t);
        row.style.opacity = String(p);
        row.style.transform = p >= 1 ? "" : `translateX(${(1 - p) * 48}px)`;
      });
      const { chip, sweep } = meParts.current;
      if (chip) {
        const c = cinemaAt(LEAGUE_TRACK.meChip, t);
        chip.style.opacity = String(Math.min(1, c));
        chip.style.transform = `scale(${Math.max(0.001, c)})`;
      }
      if (sweep) {
        const p = cinemaAt(LEAGUE_TRACK.sweep, t);
        const width = sweep.parentElement?.clientWidth ?? 360;
        sweep.style.opacity = String(p <= 0 || p >= 1 ? 0 : 1);
        sweep.style.transform = `translateX(${-90 + p * (width + 120)}px) rotate(18deg)`;
      }
    };
    const intro = runCinemaClock(LEAGUE_INTRO.end, applyIntro, fresh ? 0 : LEAGUE_INTRO.end);
    if (fresh) {
      for (const cue of LEAGUE_INTRO_CUES) at(cue.t, () => sound.play(cue.sound, { rate: cue.rate }));
      at(LEAGUE_INTRO.end - 800, () => cinemaHaptic("light"));
    }

    // ── 순위 상승 (앱 LeagueRankRow 와 같은 계산) ──
    // 리스트는 서버가 이미 새 순위로 정렬해서 준다. 각 행을 "옛 자리" 에서 시작시켜 제자리로 돌린다.
    // 1~3위는 시상대라 목록에 없다 — 시상대로 올라선 경우는 줄 연출을 접는다.
    let rankClock: CinemaClock | null = null;
    const offsets = new Map<number, number>();
    const meRank = data.members.find((member) => member.isMe)?.rank;
    if (!reduce && meRank && data.previousRank > meRank) {
      const oldRow = rankRows.current.get(data.previousRank);
      const newRow = rankRows.current.get(meRank);
      if (oldRow && newRow) {
        offsets.set(meRank, oldRow.getBoundingClientRect().top - newRow.getBoundingClientRect().top);
        for (let rank = meRank + 1; rank <= data.previousRank; rank += 1) {
          const current = rankRows.current.get(rank);
          const before = rankRows.current.get(rank - 1);
          if (current && before) offsets.set(rank, before.getBoundingClientRect().top - current.getBoundingClientRect().top);
        }
      }
    }
    if (offsets.size > 0 && meRank) {
      const landAt = RANK_HOLD_MS + RANK_MOVE_MS;
      const landKeys: CinemaKey[] = [
        { t: landAt, v: 0 },
        { t: landAt + 110, v: 1, e: "out" },
        { t: landAt + 420, v: 0, e: "inOut" },
      ];
      const gainKeys: CinemaKey[] = [
        { t: landAt, v: 0 },
        { t: landAt + RANK_GAIN_CHIP.show, v: 1, e: "back" },
        { t: landAt + RANK_GAIN_CHIP.hold, v: 1 },
        { t: landAt + RANK_GAIN_CHIP.hide, v: 0 },
      ];
      const applyRank = (t: number) => {
        const p = progress(t, RANK_HOLD_MS, landAt);
        const e = easeInOut(p);
        for (const [rank, offset] of offsets) {
          const row = rankRows.current.get(rank);
          if (!row) continue;
          const y = offset * (1 - e);
          if (rank === meRank) {
            const lift = t < landAt ? Math.min(1, t / 180) : Math.max(0, 1 - (t - landAt) / 200);
            const land = cinemaAt(landKeys, t);
            row.style.zIndex = lift > 0 ? "30" : "";
            row.style.transform = `translateY(${y}px) scale(${1 + lift * 0.05 + land * 0.06})`;
            row.style.boxShadow = lift > 0 ? `0 6px ${16 * lift}px rgb(119 110 226 / ${0.45 * lift})` : "";
            const { glow, streaks, gain } = meParts.current;
            if (glow) glow.style.opacity = String(t < landAt ? Math.min(1, t / 180) : Math.max(0, 1 - (t - landAt) / 360));
            if (streaks) {
              const bell = Math.sin(p * Math.PI);
              streaks.style.opacity = String(offset > 0 ? bell * 0.8 : 0);
              streaks.style.transform = `scaleY(${0.4 + bell * 0.6})`;
            }
            if (gain) {
              const c = cinemaAt(gainKeys, t);
              gain.style.opacity = String(Math.min(1, c));
              gain.style.transform = `translateY(${(1 - c) * 10}px) scale(${Math.max(0.001, c)})`;
            }
          } else {
            // 추월당한 줄: 움직이는 동안 살짝 기울고 흐려진다
            const wobble = offset < 0 ? Math.sin(p * Math.PI) : 0;
            row.style.opacity = String(1 - wobble * 0.35);
            row.style.transform = `translateY(${y}px) rotate(${-1.6 * wobble}deg)`;
          }
        }
      };
      applyRank(0);
      const delay = fresh ? LEAGUE_INTRO.rankUpAt : 0;
      at(delay, () => { rankClock = runCinemaClock(RANK_ANIM_TOTAL_MS, applyRank); });
      at(delay + RANK_HOLD_MS, () => { sound.play("whoosh"); cinemaHaptic("light"); });
      at(delay + landAt, () => { sound.play("ding", { rate: 1.15 }); cinemaHaptic("success"); });
      // 끝나면 순위를 확정 저장한다 (다음에 또 재생되지 않게)
      at(delay + RANK_ANIM_TOTAL_MS, () => {
        void request("/league/ack-rank", { body: JSON.stringify({ rank: meRank }), method: "POST" }).catch(() => undefined);
      });
    }

    /**
     * 들어오자마자 **내 줄로 스크롤**한다 (앱과 같다). 맨 위가 아니라 1/3 지점에 둬야
     * 위아래 몇 명이 같이 보여 "내가 어디쯤인지" 가 읽힌다. 시상대면 이미 보인다.
     */
    const page = scroller.current;
    const myRow = meRank ? rankRows.current.get(meRank) : undefined;
    if (page && myRow && meRank && meRank > 3) {
      at(fresh ? 900 : 280, () => {
        const top = myRow.getBoundingClientRect().top - page.getBoundingClientRect().top + page.scrollTop;
        page.scrollTo({ behavior: "smooth", top: Math.max(0, top - page.clientHeight / 3) });
      });
    }

    return () => {
      intro.stop();
      rankClock?.stop();
      timers.forEach((timer) => window.clearTimeout(timer));
      sound.dispose();
    };
  }, [data, request]);

  const openMember = useCallback(
    (member: LeagueMember) => {
      router.push(member.isMe ? "/profile" : `/friend-profile?id=${encodeURIComponent(member.id)}`);
    },
    [router],
  );

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
  // 서버(league.service TIER_CHALLENGE)가 티어별로 정한다. 폴백 210 은 XP 를 1/3 로
  // 내린 뒤로 3배 부풀린 숫자라, 모르면 안 적는다 (앱과 같다)
  const challengeXp = data.boostXp ?? 0;
  const remaining = new Date(data.endsAt).getTime() - now;
  const days = Math.ceil(remaining / 86400000);
  const hours = Math.max(0, Math.floor(remaining / 3600000));
  const minutes = Math.max(0, Math.floor((remaining % 3600000) / 60000));
  const timeLabel = days > 1 ? uzt("league.daysLeft", { count: days }) : `${hours}:${String(minutes).padStart(2, "0")}`;
  const promoteLine = data.promoteCount;
  const demoteLine = data.members.length - data.demoteCount;
  const keepSafe = data.myWeeklyXp >= data.keepXp;
  const keepRatio = data.keepXp > 0 ? Math.min(1, data.myWeeklyXp / data.keepXp) : 1;
  const podium = data.members.filter((member) => member.rank <= 3);
  const rest = data.members.filter((member) => member.rank > 3);
  const tierVars = {
    "--tier-color": tier.color,
    "--tier-dark": tier.colorDark,
    "--tier-light": tier.colorLight,
  } as CSSProperties;

  return (
    <main className={styles.leaguePage} style={tierVars}>
      <div className={styles.scroller} ref={scroller}>
        {/* ── 티어 무대 — 밤하늘 위 크리스털, 티어 색 조명 ── */}
        <section className={styles.stage}>
          <div className={styles.crystalWrap}>
            <i aria-hidden className={styles.spot} />
            <i aria-hidden className={styles.crystalRing} ref={ring} />
            <span className={styles.crystal} ref={crystal}>
              <TierCrystal active size={124} tier={tier} />
            </span>
          </div>
          <h1 className={styles.tierName}>{tierLabel(data.tier)}</h1>
          <div className={styles.chips}>
            <span className={styles.stageChip}>
              <MobileIcon name="time-outline" size={14} />
              {timeLabel}
            </span>
            {promoteLine > 0 ? (
              <span className={styles.stageChip} data-i18n="league.promotionZone">
                <MobileIcon name="chevron-up" size={14} />
                {uzt("league.promotionZone", { count: promoteLine })}
              </span>
            ) : null}
          </div>

          {/* 리그 유지선 — 브론즈(keepXp 0)에는 안 뜬다 */}
          {data.keepXp > 0 ? (
            <div className={styles.keepWrap}>
              <div className={styles.keepTop}>
                <span data-i18n="league.keepXpLabel">{uzt("league.keepXpLabel")}</span>
                <b
                  className={keepSafe ? styles.keepSafe : styles.keepDanger}
                  data-i18n={keepSafe ? "league.keepXpSafe" : "league.keepXpDanger"}
                >
                  {uzt(keepSafe ? "league.keepXpSafe" : "league.keepXpDanger", {
                    earned: data.myWeeklyXp,
                    required: data.keepXp,
                  })}
                </b>
              </div>
              <span className={styles.keepTrack}>
                <i className={keepSafe ? styles.keepFillSafe : styles.keepFillDanger} style={{ width: `${keepRatio * 100}%` }} />
              </span>
            </div>
          ) : null}

          {/* 티어 사다리 — 지나온 티어는 빛나고, 앞은 잠겨 있다 */}
          <div className={styles.ladder}>
            {TIERS.map((item, index) => (
              <span className={index === tierIndex ? styles.rungNow : styles.rung} key={item.key}>
                <TierCrystal
                  active={index === tierIndex}
                  locked={index > tierIndex}
                  size={index === tierIndex ? 58 : 44}
                  tier={item}
                />
              </span>
            ))}
          </div>
        </section>

        {/* ── 시상대 (1~3위) — 2 · 1 · 3 ── */}
        {podium.length > 0 ? (
          <section className={styles.podium}>
            {([2, 1, 3] as const).map((place) => {
              const member = podium.find((item) => item.rank === place);
              if (!member) return <span className={styles.podiumColumn} key={place} />;
              const medal = MEDALS[place - 1]!;
              const parts = podiumParts.current[place];
              return (
                <button
                  aria-label={`${place}. ${member.nickname}, ${member.xp} XP`}
                  className={styles.podiumColumn}
                  key={place}
                  onClick={() => openMember(member)}
                  type="button"
                >
                  <span className={styles.podiumPerson} ref={(node) => { parts.person = node; }}>
                    {place === 1 ? (
                      <span aria-hidden className={styles.crown} ref={(node) => { parts.crown = node; }}>
                        <svg height={30} viewBox="0 0 100 80" width={38}>
                          <path d="M8 66 L16 20 L36 44 L50 8 L64 44 L84 20 L92 66 Z" fill={medal.fill} stroke={medal.ribbon} strokeLinejoin="round" strokeWidth={6} />
                          <rect fill={medal.ribbon} height={14} rx={6} width={84} x={8} y={62} />
                        </svg>
                      </span>
                    ) : null}
                    <span
                      className={styles.podiumRing}
                      style={{ borderColor: member.isMe ? "var(--primary)" : medal.fill, height: AVATAR[place] + 10, width: AVATAR[place] + 10 }}
                    >
                      <FriendAvatar member={member} size={AVATAR[place]} />
                    </span>
                    <strong className={member.isMe ? styles.podiumNameMe : styles.podiumName}>{member.nickname}</strong>
                    <small>{`${member.xp} XP`}</small>
                  </span>
                  {/* 바닥에서 솟는 블록 — 이 칸 밖으로는 안 보이게 잘라 둔다 */}
                  <span className={styles.podiumFloor} style={{ height: BLOCK_H[place] + 6 }}>
                    <span
                      className={styles.podiumBlock}
                      ref={(node) => { parts.block = node; }}
                      style={{ backgroundColor: medal.fill, borderBottomColor: medal.ribbon, color: medal.text, height: BLOCK_H[place] + 6 }}
                    >
                      {place}
                    </span>
                  </span>
                </button>
              );
            })}
          </section>
        ) : null}

        {/* ── 리더보드 (4위부터) ── */}
        <section className={styles.board}>
          {/* 승급 인원이 시상대 안에서 끝나면 구분선은 목록 맨 위 */}
          {promoteLine > 0 && promoteLine <= 3 && rest.length > 0 ? <ZoneDivider kind="promote" /> : null}
          {rest.map((member, index) => {
            const zone = promoteLine > 0 && member.rank <= promoteLine
              ? styles.rowPromote
              : data.demoteCount > 0 && member.rank > demoteLine
                ? styles.rowDemote
                : "";
            return (
              <div className={styles.enter} key={member.id} ref={(node) => { enterRows.current[index] = node; }}>
                <div
                  className={styles.rowShell}
                  ref={(node) => {
                    if (node) rankRows.current.set(member.rank, node);
                    else rankRows.current.delete(member.rank);
                  }}
                >
                  <button
                    aria-label={`${member.rank}. ${member.nickname}, ${member.xp} XP`}
                    className={[styles.row, zone, member.isMe ? styles.rowMe : ""].join(" ")}
                    onClick={() => openMember(member)}
                    type="button"
                  >
                    <span className={styles.rank}>{member.rank}</span>
                    <FriendAvatar member={member} size={48} />
                    <span className={styles.info}>
                      <span className={styles.nameRow}>
                        <strong>{member.nickname}</strong>
                        {member.isMe ? (
                          <em className={styles.meChip} data-i18n="league.meChip" ref={(node) => { meParts.current.chip = node; }}>
                            {uzt("league.meChip")}
                          </em>
                        ) : null}
                      </span>
                      <span className={styles.sub}>
                        {member.flag ? <span className={styles.flag}>{member.flag}</span> : null}
                        {member.streak != null && member.streak > 0 ? (
                          <span className={styles.streak}><MobileIcon name="flame" size={13} />{member.streak}</span>
                        ) : null}
                        {/* 칭호 — 이름 밑 작은 이름표 */}
                        {!member.isBot ? <NameTitle size="sm" title={member.avatar?.title} /> : null}
                      </span>
                    </span>
                    <b className={styles.xp}>{`${member.xp} XP`}</b>
                    <MobileIcon name="chevron-forward" size={16} />
                    {member.isMe ? <i aria-hidden className={styles.sweep} ref={(node) => { meParts.current.sweep = node; }} /> : null}
                  </button>
                  {member.isMe ? (
                    <>
                      <i aria-hidden className={styles.glow} ref={(node) => { meParts.current.glow = node; }} />
                      <span aria-hidden className={styles.streaks} ref={(node) => { meParts.current.streaks = node; }}>
                        <i /><i /><i />
                      </span>
                      {rankGain > 0 ? (
                        <span className={styles.gainChip} data-i18n="league.rankUp" ref={(node) => { meParts.current.gain = node; }}>
                          {uzt("league.rankUp", { count: rankGain })}
                        </span>
                      ) : null}
                    </>
                  ) : null}
                </div>
                {promoteLine > 3 && member.rank === promoteLine ? <ZoneDivider kind="promote" /> : null}
                {data.demoteCount > 0 && member.rank === demoteLine ? <ZoneDivider kind="demote" /> : null}
              </div>
            );
          })}
        </section>
      </div>

      {/* XP 챌린지 — 티어 색 두툼한 버튼, 둘레로 빛이 숨 쉰다 */}
      <button
        aria-label={`+${challengeXp} XP`}
        className={styles.challengeButton}
        onClick={() => router.push(`/xp-challenge?tier=${encodeURIComponent(data.tier)}&xp=${challengeXp}`)}
        type="button"
      >
        <i aria-hidden className={styles.halo} />
        <span><MobileIcon name="flash" size={30} /></span>
        <b>{`+${challengeXp} XP`}</b>
      </button>
      <BottomTabs />
    </main>
  );
}
