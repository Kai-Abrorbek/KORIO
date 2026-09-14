import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  ZoomIn,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import TierCrystal from "@/components/league/TierCrystal";
import CrystalShatter from "@/components/league/CrystalShatter";
import TopikSuccessConfetti from "@/components/topik/TopikSuccessConfetti";
import { getTier } from "@/constants/league-tiers";
import { LeagueService, LeagueResult } from "@/services/league.service";

export default function LeagueResultScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [result, setResult] = useState<LeagueResult | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * 연출 미리보기 (개발 빌드 전용).
   *
   * `?preview=promote` / `?preview=demote` / `?preview=demoteXp` 로 열면 서버를
   * 부르지 않고 가짜 결과로 연출만 보여준다. 나갈 때 ackLeagueResult 도 안 부르므로
   * **실제 리그 상태를 건드리지 않는다** — 보고 나면 그대로 원래대로다.
   *
   * 승급·강등은 주 1회 정산 때만 생기는 화면이라, 이게 없으면 연출을 고칠 때마다
   * 한 주를 기다리거나 DB 를 손으로 건드려야 한다.
   *
   * 리그 페이지에 있던 테스트 버튼은 걷어냈다. 다시 볼 일이 생기면 개발 빌드에서
   * 이 경로로 직접 열면 된다 (버튼을 되살릴 필요 없다):
   *
   *   router.push({ pathname: "/league-result", params: { preview: "promote" } })
   *   preview: "promote" | "demote" | "demoteXp"
   */
  const params = useLocalSearchParams<{ preview?: string }>();
  const preview = __DEV__ ? params.preview : undefined;

  useEffect(() => {
    if (preview) {
      const demote = preview !== "promote";
      setResult({
        weekKey: "preview",
        finalRank: demote ? 27 : 2,
        fromTier: demote ? "gold" : "silver",
        toTier: demote ? "silver" : "gold",
        change: demote ? "demote" : "promote",
        gems: demote ? 0 : 30,
        reason: preview === "demoteXp" ? "xp" : demote ? "rank" : null,
        weeklyXp: preview === "demoteXp" ? 640 : undefined,
        requiredXp: preview === "demoteXp" ? 1500 : undefined,
      });
      setLoading(false);
      Haptics.notificationAsync(
        demote
          ? Haptics.NotificationFeedbackType.Warning
          : Haptics.NotificationFeedbackType.Success,
      );
      return;
    }
    LeagueService.getLeagueResult()
      .then((r) => {
        setResult(r);
        setLoading(false);
        if (r) {
          Haptics.notificationAsync(
            r.change === "demote"
              ? Haptics.NotificationFeedbackType.Warning
              : Haptics.NotificationFeedbackType.Success,
          );
        } else {
          router.back();
        }
      })
      .catch(() => router.back());
  }, [preview]);

  // 광선 회전/펄스
  const glow = useSharedValue(1);
  useEffect(() => {
    glow.value = withRepeat(
      withSequence(
        withTiming(1.12, { duration: 1100 }),
        withTiming(1, { duration: 1100 }),
      ),
      -1,
    );
  }, []);
  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glow.value }],
  }));

  /**
   * 강등은 2단계로 보여준다: 예전 티어 크리스탈이 깨지고(shattered=false 구간),
   * 다 부서진 뒤에 내려간 티어가 올라온다.
   *
   * 한 화면에 결과만 띄우면 "언제 바뀐 거지" 가 된다. 부서지는 걸 보고 나서
   * 새 티어를 봐야 인과가 읽힌다.
   */
  const [shattered, setShattered] = useState(false);

  if (loading || !result)
    return <View style={{ flex: 1, backgroundColor: "#15131F" }} />;

  const meta = getTier(result.toTier);
  const fromMeta = getTier(result.fromTier);
  const isPromote = result.change === "promote";
  const isDemote = result.change === "demote";
  // 강등 연출 중에는 배경도 옛 티어 색 → 다 부서지면 내려간 티어 색으로 바뀐다
  const stageMeta = isDemote && !shattered ? fromMeta : meta;
  const droppedByXp = isDemote && result.reason === "xp";

  const title = isPromote
    ? t("league.result.promoteTitle")
    : isDemote
      ? t("league.result.demoteTitle")
      : t("league.result.stayTitle");
  const sub = t(
    isPromote
      ? "league.result.promoteSub"
      : isDemote
        ? "league.result.demoteSub"
        : "league.result.staySub",
    { tier: t(`league.tiers.${result.toTier}`) },
  );

  const finish = async () => {
    // 미리보기는 서버에 아무것도 남기지 않는다 — 실제 결과가 있었다면
    // 그것도 그대로 남아서 다음에 정상적으로 뜬다
    if (!preview) {
      try {
        await LeagueService.ackLeagueResult();
      } catch {}
    }
    router.back();
  };

  return (
    <View style={[s.container, { backgroundColor: stageMeta.colorDark }]}>
      {/* 승급은 컨페티가 터진다. "use dom"(WebView) 이라 승급일 때만 마운트한다 */}
      {isPromote ? (
        <View pointerEvents="none" style={s.confetti}>
          <TopikSuccessConfetti
            playOnce
            dom={{
              scrollEnabled: false,
              showsHorizontalScrollIndicator: false,
              showsVerticalScrollIndicator: false,
              style: s.confettiFill,
            }}
          />
        </View>
      ) : null}

      <View style={[s.center, { paddingTop: insets.top }]}>
        {/* 뒤 광선 */}
        <Animated.View
          style={[s.glow, { backgroundColor: stageMeta.color }, glowStyle]}
        />
        {isDemote && !shattered ? (
          // 옛 티어가 부서진다 → 끝나면 내려간 티어가 올라온다
          <CrystalShatter
            tier={fromMeta}
            size={170}
            onDone={() => setShattered(true)}
          />
        ) : (
          <Animated.View
            entering={ZoomIn.springify().damping(11).mass(0.9)}
            // 승급은 더 크게, 더 늦게 튀어오른다 — 기다린 만큼 값이 있어 보이게
            style={isPromote ? { transform: [{ scale: 1.06 }] } : undefined}
          >
            <TierCrystal tier={stageMeta} size={170} />
          </Animated.View>
        )}

        {isDemote && !shattered ? null : (
        <Animated.Text
          entering={FadeInDown.delay(250).duration(400)}
          style={s.title}
        >
          {title}
        </Animated.Text>
        )}
        {isDemote && !shattered ? null : (
        <Animated.Text
          entering={FadeInDown.delay(350).duration(400)}
          style={s.sub}
        >
          {droppedByXp
            ? t("league.result.demoteXpSub", {
                tier: t(`league.tiers.${result.fromTier}`),
                required: result.requiredXp ?? 0,
              })
            : sub}
        </Animated.Text>
        )}

        {/* XP 미달로 떨어졌으면 얼마가 모자랐는지 숫자로 보여준다.
            "다음 주엔 얼마를 해야 하는지" 를 알 수 있어야 한다 */}
        {droppedByXp && shattered ? (
          <Animated.View
            entering={FadeInDown.delay(450).duration(400)}
            style={s.xpBar}
          >
            <Ionicons name="flash" size={16} color="#fff" />
            <Text style={s.xpBarText}>
              {t("league.result.xpShort", {
                earned: result.weeklyXp ?? 0,
                required: result.requiredXp ?? 0,
              })}
            </Text>
          </Animated.View>
        ) : null}

        {isDemote && !shattered ? null : (
        <Animated.View
          entering={FadeInDown.delay(550).duration(400)}
          style={s.rankChip}
        >
          <Ionicons name="podium" size={16} color="#fff" />
          <Text style={s.rankText}>
            {t("league.result.rank", { rank: result.finalRank })}
          </Text>
        </Animated.View>
        )}

        {result.gems > 0 && (isDemote ? shattered : true) && (
          <Animated.View
            entering={ZoomIn.delay(650).springify().damping(10)}
            style={s.gemChip}
          >
            <Ionicons name="diamond" size={20} color="#15131F" />
            <Text style={s.gemText}>
              {t("league.result.gems", { gems: result.gems })}
            </Text>
          </Animated.View>
        )}
      </View>

      {/* 부서지는 중에 버튼을 누르면 연출을 못 본다 */}
      {isDemote && !shattered ? (
        <View style={{ height: 56, marginBottom: insets.bottom + 16 }} />
      ) : (
        <Pressable
          style={({ pressed }) => [
            s.btn,
            { marginBottom: insets.bottom + 16 },
            pressed && s.btnPressed,
          ]}
          onPress={finish}
        >
          <Text style={[s.btnT, { color: stageMeta.colorDark }]}>
            {t("league.result.continue")}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 28 },
  confetti: { position: "absolute", top: 0, left: 0, right: 0, height: 420, overflow: "hidden", zIndex: 5 },
  confettiFill: { width: "100%", height: "100%", backgroundColor: "transparent" },
  xpBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  xpBarText: { color: "#fff", fontSize: 13, fontWeight: "700" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  glow: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.28,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#fff",
    marginTop: 32,
    textAlign: "center",
  },
  sub: {
    fontSize: 17,
    fontWeight: "600",
    color: "rgba(255,255,255,0.85)",
    marginTop: 8,
    textAlign: "center",
  },
  rankChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 99,
    marginTop: 22,
  },
  rankText: { color: "#fff", fontSize: 15, fontWeight: "800" },
  gemChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#FFD84D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 99,
    marginTop: 16,
  },
  gemText: { color: "#15131F", fontSize: 17, fontWeight: "900" },
  btn: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "rgba(0,0,0,0.18)",
  },
  btnPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
  btnT: { fontSize: 17, fontWeight: "900" },
});
