import { useState, useEffect, useLayoutEffect, useCallback, useRef, useMemo, type ReactNode } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { Pressable, PressableText } from "@/components/ui/Pressables";
import { useFocusEffect, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import {
  LeagueService,
  LeagueData,
  LeagueMember,
} from "@/services/league.service";
import { TIERS, getTier, getTierIndex } from "@/constants/league-tiers";
import TierCrystal from "@/components/league/TierCrystal";
import FriendAvatar from "@/components/friends/FriendAvatar";
import NameTitle from "@/components/avatar/NameTitle";
import LeagueRankRow, {
  RANK_ANIM_TOTAL_MS,
} from "@/components/league/LeagueRankRow";
import LeaguePodium from "@/components/league/LeaguePodium";
import { cinemaAt } from "@/components/cinema/cinema";
import { useCinemaAudio, useCinemaClock } from "@/components/cinema/useCinema";
import {
  LEAGUE_INTRO,
  LEAGUE_INTRO_CUES,
  LEAGUE_TRACK,
  RANK_HOLD_MS,
  RANK_MOVE_MS,
  rowEnter,
  type LeagueSound,
} from "@/components/league/leagueCinematic";

const VIOLET = "#776EE2";

/** 이미 만들어 둔 연출 소리를 다시 쓴다 (tools/cinema-audio) */
const LEAGUE_SOURCES: Record<LeagueSound, number> = {
  pop: require("../../../assets/sounds/lesson/stat-pop.mp3"),
  sparkle: require("../../../assets/sounds/lesson/sparkle.mp3"),
  whoosh: require("../../../assets/sounds/lesson/stamp-whoosh.mp3"),
  ding: require("../../../assets/sounds/chest/gem-ding.mp3"),
};
const LEAGUE_GAIN: Partial<Record<LeagueSound, number>> = { pop: 0.55, sparkle: 0.5, whoosh: 0.6, ding: 0.6 };

/** 이 주(weekKey)의 들어오는 연출을 이미 봤다 — 탭을 오갈 때마다 다시 솟지 않게 */
const introPlayed = new Set<string>();

// ── 아바타 ──
function Avatar({
  member,
  size = 44,
  ring,
}: {
  member: LeagueMember;
  size?: number;
  /** 온라인 점 테두리 (줄 바탕색) */
  ring: string;
}) {
  return (
    <View style={{ width: size, height: size }}>
      <FriendAvatar
        name={member.nickname}
        avatar={member.isBot ? undefined : member.avatar}
        avatarUri={member.profileImage}
        size={size}
      />
      {member.online && (
        <View
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: size * 0.28,
            height: size * 0.28,
            borderRadius: size,
            backgroundColor: "#58CC02",
            borderWidth: 2.5,
            borderColor: ring,
          }}
        />
      )}
    </View>
  );
}

export default function LeagueScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);

  const [data, setData] = useState<LeagueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: screenW, height: screenH } = useWindowDimensions();
  const reducedMotion = useReducedMotion();
  const [checkedResult, setCheckedResult] = useState(false);

  useEffect(() => {
    if (checkedResult) return;
    setCheckedResult(true);
    LeagueService.getLeagueResult()
      .then((r) => {
        if (r) router.push("/league-result");
      })
      .catch(() => {});
  }, [checkedResult]);

  // ── 들어오는 연출 (leagueCinematic) ──
  const { clock, run } = useCinemaClock(LEAGUE_INTRO.end);
  const audio = useCinemaAudio(LEAGUE_SOURCES, LEAGUE_GAIN);
  const [introPlaying, setIntroPlaying] = useState(false);
  const soundTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => soundTimers.current.forEach(clearTimeout), []);

  // 그리기 전에 시계를 맞춘다 — 이미 본 주에 다시 들어올 때 줄들이 한 프레임 사라지지 않게
  useLayoutEffect(() => {
    if (!data) return;
    const fresh = !reducedMotion && !introPlayed.has(data.weekKey);
    introPlayed.add(data.weekKey);
    setIntroPlaying(fresh);
    soundTimers.current.forEach(clearTimeout);
    soundTimers.current = [];
    if (!fresh) {
      run(LEAGUE_INTRO.end);
      return;
    }
    run(0);
    for (const cue of LEAGUE_INTRO_CUES) {
      soundTimers.current.push(setTimeout(() => audio.play(cue.sound, { rate: cue.rate }), cue.t));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // ── 순위 상승 애니메이션 ──
  //
  // 리스트는 서버가 **이미 새 순위로 정렬**해서 준다. 그래서 각 행을 "옛 자리"
  // 에서 시작시켜 제자리로 돌아오게 하는 게 맞다.
  //   나        : 옛 순위 자리(아래)에서 새 자리로 올라온다
  //   밀린 사람 : 한 칸 위에서 시작해 한 칸 아래로 내려온다
  //
  // 거리는 rank 차 × 상수로 계산하지 않는다. 승급·강등 구분선이 행 사이에
  // 끼어 있어서 그 계산이 틀어진다. 실제 onLayout 좌표를 쓴다.
  // 1~3위는 시상대라 목록에 없다 — 시상대로 올라선 경우는 줄 연출을 접는다.
  const [animDone, setAnimDone] = useState(false);
  /**
   * 개발용 재생. 이 애니메이션은 "실제로 순위가 올라야" 볼 수 있어서, 고쳐도
   * 확인할 방법이 없었다. 확인이 안 되니 망가진 채로 오래 남아 있었다.
   * 개발 빌드에서 티어 이름을 길게 누르면 세 계단 올라온 것처럼 다시 재생한다.
   * 릴리스 빌드에선 아예 동작하지 않는다.
   */
  const [devPrevRank, setDevPrevRank] = useState<number | null>(null);
  const rowY = useRef(new Map<number, number>());
  const [measuredCount, setMeasuredCount] = useState(0);

  /**
   * 들어오자마자 **내 줄로 스크롤**한다.
   *
   * 리그방은 30명이라 들어오면 맨 위부터 보인다 — 내가 12등이면 내 자리는 화면
   * 밖이고, 매번 손으로 찾아 내려야 했다. 사람들이 이 화면에서 제일 먼저 보고
   * 싶은 건 자기 줄이다. 맨 위로 붙이지 않고 화면의 1/3 지점에 둔다.
   * 시상대에 있으면 이미 보이므로 움직이지 않는다.
   */
  const listRef = useRef<ScrollView>(null);
  const boardY = useRef(0);
  const scrolledToMe = useRef(false);

  const onRowLayout = useCallback((rank: number, y: number) => {
    if (rowY.current.get(rank) === y) return;
    rowY.current.set(rank, y);
    setMeasuredCount(rowY.current.size);
  }, []);

  useEffect(() => {
    if (scrolledToMe.current || !data) return;
    const me = data.members.find((m) => m.isMe);
    if (!me || me.rank <= 3) return;
    const y = rowY.current.get(me.rank);
    if (y === undefined) return; // 아직 측정 전 — 다음 onLayout 때 다시 온다
    scrolledToMe.current = true;
    const target = Math.max(0, boardY.current + y - screenH / 3);
    // 들어오는 연출이 시상대를 보여 준 뒤에 내려간다
    const timer = setTimeout(
      () => listRef.current?.scrollTo({ y: target, animated: true }),
      introPlaying ? 900 : 280,
    );
    return () => clearTimeout(timer);
  }, [data, measuredCount, screenH, introPlaying]);

  /** rank → 시작 오프셋(px). 비어 있으면 애니 없음 */
  const startOffsets = useMemo(() => {
    const out = new Map<number, number>();
    if (!data || animDone || reducedMotion) return out;
    const me = data.members.find((m) => m.isMe);
    if (!me) return out;

    const prev = devPrevRank ?? data.previousRank ?? me.rank;
    if (prev <= me.rank) return out; // 안 올랐으면 애니 없음

    const yOf = (rank: number) => rowY.current.get(rank);
    const myOldY = yOf(prev);
    const myNewY = yOf(me.rank);
    // 옛 자리가 화면 목록 밖(리그를 옮겨 왔다 · 시상대로 올라섰다 등)이면 애니를 접는다
    if (myOldY == null || myNewY == null) return out;

    out.set(me.rank, myOldY - myNewY); // 양수: 나는 아래에 있었다

    // 내가 끼어들면서 한 칸씩 밀린 사람들 (새 순위 me.rank+1 … prev)
    for (let rank = me.rank + 1; rank <= prev; rank++) {
      const nowY = yOf(rank);
      const beforeY = yOf(rank - 1); // 이 사람의 옛 자리 = 한 칸 위 슬롯
      if (nowY == null || beforeY == null) continue;
      out.set(rank, beforeY - nowY); // 음수: 위에 있었다
    }
    return out;
    // measuredCount 가 바뀔 때마다 다시 계산한다 (rowY 는 ref 라 의존성에 못 넣는다)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, animDone, measuredCount, devPrevRank, reducedMotion]);

  /** 개발 빌드에서만: 티어 이름을 길게 눌러 애니를 다시 본다 */
  const replayRankAnim = useCallback(() => {
    if (!__DEV__ || !data) return;
    const me = data.members.find((m) => m.isMe);
    if (!me) return;
    setAnimDone(false);
    setIntroPlaying(false);
    setDevPrevRank(Math.min(data.members.length, me.rank + 3));
  }, [data]);

  const animReady = startOffsets.size > 0;
  const rankDelay = introPlaying ? LEAGUE_INTRO.rankUpAt : 0;

  useEffect(() => {
    if (!animReady || !data) return;
    const me = data.members.find((m) => m.isMe);
    if (!me) return;
    const timers = [
      // 치고 올라갈 때 휙, 도착하면 딩
      setTimeout(() => audio.play("whoosh"), rankDelay + RANK_HOLD_MS),
      setTimeout(() => audio.play("ding", { rate: 1.15 }), rankDelay + RANK_HOLD_MS + RANK_MOVE_MS),
      // 애니가 끝나면 순위를 확정 저장한다 (다음에 또 재생되지 않게)
      setTimeout(() => {
        LeagueService.ackRank(me.rank).catch(() => {});
        setAnimDone(true);
      }, rankDelay + RANK_ANIM_TOTAL_MS),
    ];
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animReady, data]);

  useFocusEffect(
    useCallback(() => {
      // 탭을 다시 열 때마다 내 줄로 한 번 더 내려간다 (아래 스크롤 효과)
      scrolledToMe.current = false;
      setLoading(true);
      LeagueService.getMyLeague()
        .then(setData)
        .catch((e) => console.error("리그 로드 실패:", e))
        .finally(() => setLoading(false));
    }, []),
  );

  // 카운트다운 갱신
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  // XP 챌린지 버튼 둘레 — 숨 쉬듯 번지는 빛
  const breath = useSharedValue(0);
  useEffect(() => {
    breath.value = withRepeat(
      withSequence(withTiming(1, { duration: 1200 }), withTiming(0, { duration: 1200 })),
      -1,
    );
  }, [breath]);
  const breathStyle = useAnimatedStyle(() => ({
    opacity: 0.25 + breath.value * 0.35,
    transform: [{ scale: 1 + breath.value * 0.22 }],
  }));

  const crystalStyle = useAnimatedStyle(() => ({
    opacity: cinemaAt(LEAGUE_TRACK.crystalOpacity, clock.value),
    transform: [{ scale: cinemaAt(LEAGUE_TRACK.crystalScale, clock.value) }],
  }));
  const crystalRingStyle = useAnimatedStyle(() => {
    const r = cinemaAt(LEAGUE_TRACK.ring, clock.value);
    return { opacity: r <= 0 || r >= 1 ? 0 : 0.8 * (1 - r), transform: [{ scale: 0.6 + 1.2 * r }] };
  });

  /** 누르면 그 사람 프로필 — 나는 내 프로필 탭 */
  const openMember = useCallback(
    (member: LeagueMember) => {
      if (member.isMe) {
        router.push("/profile");
        return;
      }
      router.push({ pathname: "/friend-profile", params: { id: member.id } });
    },
    [router],
  );
  const xpLabel = useCallback((xp: number) => `${xp} XP`, []);

  if (loading || !data) {
    return (
      <View
        style={[
          s.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  const tierMeta = getTier(data.tier);
  const myTierIdx = getTierIndex(data.tier);
  // 서버(league.service 의 TIER_CHALLENGE)가 티어별로 정한다. 폴백이 210 이던
  // 시절이 있었는데 XP 를 1/3 로 내린 뒤로는 3배 뻥이라, 모르면 안 적는다.
  const CHALLENGE_XP = data.boostXp ?? 0;

  // 카운트다운 라벨
  const remaining = new Date(data.endsAt).getTime() - now;
  const days = Math.ceil(remaining / 86400000);
  const hours = Math.floor(remaining / 3600000);
  const timeLabel =
    days > 1
      ? t("league.daysLeft", { count: days })
      : `${Math.max(0, hours)}:${String(Math.max(0, Math.floor((remaining % 3600000) / 60000))).padStart(2, "0")}`;

  const promoteLine = data.promoteCount;
  const demoteLine = data.members.length - data.demoteCount;

  // 이 리그에 남으려면 이번 주에 모아야 하는 XP.
  // 정산 때 순위보다 이게 먼저다(미달이면 1등이어도 떨어진다) — 그러면
  // 주중에 얼마나 모자란지 보여줘야 한다. 안 보여주면 월요일에 이유 없이
  // 떨어진 것처럼 느낀다.
  const keepXp = data.keepXp ?? 0;
  const myWeeklyXp = data.myWeeklyXp ?? 0;
  const keepSafe = myWeeklyXp >= keepXp;
  const keepRatio = keepXp > 0 ? Math.min(1, myWeeklyXp / keepXp) : 1;

  const me = data.members.find((m) => m.isMe);
  const prevRank = devPrevRank ?? data.previousRank ?? me?.rank ?? 0;
  const rankGain = me ? Math.max(0, prevRank - me.rank) : 0;
  const podium = data.members.filter((m) => m.rank <= 3);
  const rest = data.members.filter((m) => m.rank > 3);

  const promoteDivider = (
    <View style={s.zoneDivider}>
      <View style={[s.zoneLine, { backgroundColor: "#58CC02" }]} />
      <View style={[s.zoneChip, { backgroundColor: "#58CC02", borderBottomColor: "#58A700" }]}>
        <Ionicons name="chevron-up" size={13} color="#fff" />
        <Text style={s.zoneText}>{t("league.promoteZone")}</Text>
      </View>
      <View style={[s.zoneLine, { backgroundColor: "#58CC02" }]} />
    </View>
  );

  return (
    <View style={s.container}>
      <ScrollView
        ref={listRef}
        contentContainerStyle={{ paddingBottom: insets.bottom + 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── 티어 무대 — 밤하늘 위 크리스털, 티어 색 조명 ── */}
        <LinearGradient
          colors={["#221A5C", "#33267F", "#4B37A8"]}
          locations={[0, 0.55, 1]}
          style={[s.stage, { paddingTop: insets.top + 26 }]}
        >
          <View style={s.stageTop}>
            <View style={s.crystalWrap}>
              <Svg width={230} height={230} style={StyleSheet.absoluteFill}>
                <Defs>
                  <RadialGradient id="leagueSpot" cx="50%" cy="50%" r="50%">
                    <Stop offset="0" stopColor={tierMeta.colorLight} stopOpacity={0.55} />
                    <Stop offset="0.55" stopColor={tierMeta.color} stopOpacity={0.18} />
                    <Stop offset="1" stopColor={tierMeta.color} stopOpacity={0} />
                  </RadialGradient>
                </Defs>
                <Circle cx={115} cy={115} r={115} fill="url(#leagueSpot)" />
              </Svg>
              <Animated.View
                pointerEvents="none"
                style={[s.crystalRing, { borderColor: tierMeta.colorLight }, crystalRingStyle]}
              />
              <Animated.View style={crystalStyle}>
                <TierCrystal tier={tierMeta} size={124} active />
              </Animated.View>
            </View>

            {/* 개발 빌드에서만: 티어 이름을 길게 눌러 순위 애니를 다시 본다.
                릴리스에선 onLongPress 가 undefined 라 그냥 텍스트다 */}
            <PressableText
              style={[s.tierName, { textShadowColor: tierMeta.colorDark }]}
              onLongPress={__DEV__ ? replayRankAnim : undefined}
              suppressHighlighting
            >
              {t(`league.tiers.${data.tier}`)}
            </PressableText>

            <View style={s.chips}>
              <View style={s.stageChip}>
                <Ionicons name="time-outline" size={14} color="#FFFFFF" />
                <Text style={s.stageChipText}>{timeLabel}</Text>
              </View>
              {promoteLine > 0 ? (
                <View style={s.stageChip}>
                  <Ionicons name="chevron-up" size={14} color="#7CE33A" />
                  <Text style={s.stageChipText} numberOfLines={1}>
                    {t("league.promotionZone", { count: promoteLine })}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* 리그 유지선 — 브론즈(keepXp 0)에는 안 뜬다 */}
            {keepXp > 0 && (
              <View style={s.keepWrap}>
                <View style={s.keepTop}>
                  <Text style={s.keepLabel}>{t("league.keepXpLabel")}</Text>
                  <Text style={[s.keepValue, { color: keepSafe ? "#7CE33A" : "#FF8A8A" }]}>
                    {t(keepSafe ? "league.keepXpSafe" : "league.keepXpDanger", {
                      earned: myWeeklyXp,
                      required: keepXp,
                    })}
                  </Text>
                </View>
                <View style={s.keepTrack}>
                  <View
                    style={[
                      s.keepFill,
                      {
                        width: `${keepRatio * 100}%`,
                        backgroundColor: keepSafe ? "#58CC02" : "#FF4B4B",
                        borderBottomColor: keepSafe ? "#58A700" : "#D33B3B",
                      },
                    ]}
                  />
                </View>
              </View>
            )}
          </View>

          {/* 티어 사다리 — 지나온 티어는 빛나고, 앞은 잠겨 있다 */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.ladder}
          >
            {TIERS.map((tr, i) => (
              <View key={tr.key} style={[s.rung, i === myTierIdx && s.rungNow]}>
                <TierCrystal
                  tier={tr}
                  locked={i > myTierIdx}
                  size={i === myTierIdx ? 58 : 44}
                  active={i === myTierIdx}
                />
              </View>
            ))}
          </ScrollView>
        </LinearGradient>

        {/* ── 시상대 (1~3위) ── */}
        {podium.length > 0 ? (
          <View style={s.podiumWrap}>
            <LeaguePodium
              top={podium}
              clock={clock}
              theme={theme}
              xpLabel={xpLabel}
              onPressMember={openMember}
            />
          </View>
        ) : null}

        {/* ── 리더보드 (4위부터) ── */}
        <View
          style={s.board}
          onLayout={(e) => {
            boardY.current = e.nativeEvent.layout.y;
          }}
        >
          {/* 승급 인원이 시상대 안에서 끝나면 구분선은 목록 맨 위 */}
          {promoteLine > 0 && promoteLine <= 3 && rest.length > 0 ? promoteDivider : null}
          {rest.map((m, index) => {
            const inPromote = promoteLine > 0 && m.rank <= promoteLine;
            const inDemote = data.demoteCount > 0 && m.rank > demoteLine;
            return (
              <EnterRow
                key={m.id}
                index={index}
                clock={clock}
                onLayout={(y) => onRowLayout(m.rank, y)}
              >
                <LeagueRankRow
                  startOffset={startOffsets.get(m.rank) ?? 0}
                  animate={animReady}
                  lifted={m.isMe}
                  delay={rankDelay}
                  rankGain={m.isMe ? rankGain : 0}
                  gainLabel={t("league.rankUp", { count: rankGain })}
                  onPress={() => openMember(m)}
                  accessibilityLabel={`${m.rank}. ${m.nickname}, ${m.xp} XP`}
                  style={[
                    s.row,
                    inPromote && s.rowPromote,
                    inDemote && s.rowDemote,
                    m.isMe && s.rowMe,
                  ]}
                >
                  <Text style={[s.rank, m.isMe && s.rankMe]}>{m.rank}</Text>
                  <Avatar member={m} size={48} ring={theme.surface} />
                  <View style={s.info}>
                    <View style={s.nameRow}>
                      <Text style={[s.name, m.isMe && s.nameMe]} numberOfLines={1}>
                        {m.nickname}
                      </Text>
                      {m.isMe ? <MeChip clock={clock} label={t("league.meChip")} /> : null}
                    </View>
                    <View style={s.subRow}>
                      {!!m.flag && <Text style={s.flag}>{m.flag}</Text>}
                      {m.streak != null && m.streak > 0 && (
                        <View style={s.streakPill}>
                          <Ionicons name="flame" size={13} color="#FF7A00" />
                          <Text style={s.streak}>{m.streak}</Text>
                        </View>
                      )}
                      {/* 칭호 — 이름 밑 작은 이름표 */}
                      {!m.isBot && <NameTitle size="sm" title={m.avatar?.title} />}
                    </View>
                  </View>
                  <Text style={[s.xp, m.isMe && s.xpMe]}>{m.xp} XP</Text>
                  <Ionicons name="chevron-forward" size={16} color={theme.border} />
                  {m.isMe ? <MeSweep clock={clock} width={screenW} /> : null}
                </LeagueRankRow>

                {/* 승급존 경계선 */}
                {promoteLine > 3 && m.rank === promoteLine && promoteDivider}

                {/* 강등존 경계선 */}
                {data.demoteCount > 0 && m.rank === demoteLine && (
                  <View style={s.zoneDivider}>
                    <View style={[s.zoneLine, { backgroundColor: "#FF4B4B" }]} />
                    <View style={[s.zoneChip, { backgroundColor: "#FF4B4B", borderBottomColor: "#D33B3B" }]}>
                      <Ionicons name="chevron-down" size={13} color="#fff" />
                      <Text style={s.zoneText}>{t("league.demoteZone")}</Text>
                    </View>
                    <View style={[s.zoneLine, { backgroundColor: "#FF4B4B" }]} />
                  </View>
                )}
              </EnterRow>
            );
          })}
        </View>
      </ScrollView>

      {/* XP 챌린지 — 티어 색 두툼한 버튼, 둘레로 빛이 숨 쉰다 */}
      <View style={[fab.wrap, { bottom: insets.bottom + 120 }]}>
        <Animated.View
          pointerEvents="none"
          style={[fab.halo, { backgroundColor: tierMeta.color }, breathStyle]}
        />
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/xp-challenge",
              params: { tier: data.tier, xp: String(CHALLENGE_XP) },
            })
          }
          accessibilityRole="button"
          accessibilityLabel={`+${CHALLENGE_XP} XP`}
        >
          {({ pressed }) => (
            <View style={{ alignItems: "center" }}>
              <View style={[fab.depth, { backgroundColor: tierMeta.colorDark }]} />
              <LinearGradient
                colors={[tierMeta.colorLight, tierMeta.color]}
                style={[fab.face, pressed && fab.facePressed]}
              >
                <Ionicons name="flash" size={30} color="#fff" />
              </LinearGradient>
              <View style={[fab.badge, { backgroundColor: tierMeta.colorDark, borderColor: theme.bg }]}>
                <Text style={fab.badgeText}>+{CHALLENGE_XP} XP</Text>
              </View>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

/** 목록 한 줄 자리 — 들어올 때 오른쪽에서 차르륵 흘러 들어온다 */
function EnterRow({
  index,
  clock,
  onLayout,
  children,
}: {
  index: number;
  clock: SharedValue<number>;
  onLayout: (y: number) => void;
  children: ReactNode;
}) {
  const style = useAnimatedStyle(() => {
    const p = rowEnter(index, clock.value);
    return { opacity: p, transform: [{ translateX: (1 - p) * 48 }] };
  });
  return (
    <Animated.View style={style} onLayout={(e) => onLayout(e.nativeEvent.layout.y)}>
      {children}
    </Animated.View>
  );
}

/** 내 이름 옆 "나" 칩 — 들어올 때 톡 */
function MeChip({ clock, label }: { clock: SharedValue<number>; label: string }) {
  const style = useAnimatedStyle(() => {
    const c = cinemaAt(LEAGUE_TRACK.meChip, clock.value);
    return { opacity: Math.min(1, c), transform: [{ scale: Math.max(0.001, c) }] };
  });
  return (
    <Animated.View style={[meChip.wrap, style]}>
      <Text style={meChip.text}>{label}</Text>
    </Animated.View>
  );
}

/** 내 줄을 한 번 훑고 지나가는 빛 */
function MeSweep({ clock, width }: { clock: SharedValue<number>; width: number }) {
  const style = useAnimatedStyle(() => {
    const p = cinemaAt(LEAGUE_TRACK.sweep, clock.value);
    return {
      opacity: p <= 0 || p >= 1 ? 0 : 1,
      transform: [{ translateX: -90 + p * (width + 120) }, { rotate: "18deg" }],
    };
  });
  return (
    <Animated.View pointerEvents="none" style={[meChip.sweep, style]}>
      <LinearGradient
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.55)", "rgba(255,255,255,0)"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}

const meChip = StyleSheet.create({
  wrap: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: VIOLET,
    borderBottomWidth: 2,
    borderBottomColor: "#5B4DD4",
  },
  text: { color: "#FFFFFF", fontSize: 11, fontWeight: "900" },
  sweep: { position: "absolute", top: -20, bottom: -20, left: 0, width: 70 },
});

const fab = StyleSheet.create({
  wrap: { position: "absolute", right: 20, alignItems: "center" },
  halo: {
    position: "absolute",
    top: -6,
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  depth: {
    position: "absolute",
    top: 6,
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  face: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  facePressed: { transform: [{ translateY: 5 }] },
  badge: {
    marginTop: -8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 2.5,
  },
  badgeText: { color: "#fff", fontSize: 13, fontWeight: "900" },
});

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    stage: {
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
      paddingBottom: 14,
      overflow: "hidden",
    },
    stageTop: { alignItems: "center", paddingHorizontal: 20 },
    crystalWrap: {
      width: 230,
      height: 178,
      alignItems: "center",
      justifyContent: "center",
    },
    crystalRing: {
      position: "absolute",
      width: 150,
      height: 150,
      borderRadius: 75,
      borderWidth: 3,
    },
    tierName: {
      marginTop: -6,
      fontSize: 32,
      fontWeight: "900",
      color: "#FFFFFF",
      letterSpacing: -0.5,
      textShadowOffset: { width: 0, height: 3 },
      textShadowRadius: 0,
    },
    chips: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 8,
      marginTop: 10,
    },
    stageChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: 1.5,
      borderColor: "rgba(255,255,255,0.28)",
      backgroundColor: "rgba(255,255,255,0.14)",
      maxWidth: "100%",
    },
    stageChipText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
    keepWrap: { alignSelf: "stretch", marginTop: 14, gap: 6 },
    keepTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
    keepLabel: { fontSize: 12, fontWeight: "800", color: "#D9D3FF" },
    keepValue: { fontSize: 12, fontWeight: "900", flexShrink: 1, textAlign: "right" },
    keepTrack: {
      height: 12,
      borderRadius: 6,
      backgroundColor: "rgba(255,255,255,0.16)",
      overflow: "hidden",
    },
    keepFill: { height: 12, borderRadius: 6, borderBottomWidth: 3 },
    ladder: {
      paddingHorizontal: 16,
      paddingTop: 14,
      gap: 6,
      alignItems: "flex-end",
    },
    rung: {
      paddingHorizontal: 4,
      paddingBottom: 2,
      borderRadius: 14,
    },
    rungNow: {
      backgroundColor: "rgba(255,255,255,0.12)",
      borderWidth: 1.5,
      borderColor: "rgba(255,255,255,0.3)",
    },
    podiumWrap: { marginTop: 18 },
    board: { paddingHorizontal: 8, marginTop: 14, gap: 4 },
    row: {
      flexDirection: "row",
      alignItems: "center",
      minHeight: 72,
      paddingHorizontal: 12,
      gap: 12,
      borderRadius: 16,
      overflow: "hidden",
    },
    rowPromote: { backgroundColor: "rgba(88,204,2,0.08)" },
    rowDemote: { backgroundColor: "rgba(255,75,75,0.08)" },
    rowMe: {
      backgroundColor: "rgba(119,110,226,0.14)",
      borderWidth: 2,
      borderColor: VIOLET,
    },
    zoneDivider: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginVertical: 10,
      paddingHorizontal: 4,
    },
    zoneLine: { flex: 1, height: 3, borderRadius: 99 },
    zoneChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      paddingVertical: 4,
      paddingHorizontal: 11,
      borderRadius: 99,
      borderBottomWidth: 3,
    },
    zoneText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "900",
      letterSpacing: 0.3,
    },
    rank: {
      width: 26,
      textAlign: "center",
      fontSize: 17,
      fontWeight: "900",
      color: theme.textSecondary,
    },
    rankMe: { color: VIOLET },
    info: { flex: 1, minWidth: 0 },
    nameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    name: {
      flexShrink: 1,
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
    },
    nameMe: { color: theme.text, fontWeight: "900" },
    subRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 3,
      minWidth: 0,
    },
    flag: { fontSize: 15 },
    streakPill: { flexDirection: "row", alignItems: "center", gap: 2 },
    streak: { fontSize: 13, fontWeight: "900", color: "#FF7A00" },
    xp: { fontSize: 16, fontWeight: "800", color: theme.textSecondary },
    xpMe: { color: VIOLET, fontWeight: "900" },
  });
