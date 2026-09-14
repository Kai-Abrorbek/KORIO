import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { getTier } from "@/constants/league-tiers";
import { useAuthStore } from "@/store/auth.store";
import { LeagueService, type ChallengeInfo } from "@/services/league.service";
import { ApiError } from "@/services/api";
import { challengeMetaOf } from "@/constants/league-challenge";

/**
 * 종목·에너지 비용·XP 상한은 **서버가 정한다** (리그마다 다르다).
 * 여기 값들은 서버 응답이 오기 전에 잠깐 쓰는 자리표시자일 뿐이다.
 */
const FALLBACK_ENERGY_COST = 15;

export default function XpChallenge() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const p = useLocalSearchParams<{ tier: string; xp: string; type?: string }>();

  const tier = getTier(p.tier ?? "bronze");
  const user = useAuthStore((s) => s.user);
  const energy = user?.energy ?? 0;

  // 리그마다 종목이 다르다. 뭘 하는지·얼마가 드는지는 서버에서 받는다 —
  // 앱이 고르게 두면 제일 후한 종목을 직접 지정해서 부를 수 있다.
  const [info, setInfo] = useState<ChallengeInfo | null>(null);
  const [starting, setStarting] = useState(false);
  const [failed, setFailed] = useState(false);
  /**
   * 서버에 이 엔드포인트가 아직 없는 상태(배포 전)인지.
   * 그때는 종목·XP·에너지를 서버가 못 정하지만, **시작은 되게 한다** —
   * 버튼이 아무 반응 없이 죽어 있는 게 제일 나쁘다.
   */
  const [notDeployed, setNotDeployed] = useState(false);
  useEffect(() => {
    let alive = true;
    void LeagueService.getChallenge()
      .then((res) => {
        if (alive) setInfo(res);
      })
      .catch((error) => {
        if (!alive) return;
        if (error instanceof ApiError && error.status === 404) {
          setNotDeployed(true);
        } else {
          setFailed(true);
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  const challengeId = info?.id ?? p.type ?? "match";
  const meta = challengeMetaOf(challengeId);
  const maxXp = info?.maxXp ?? Number(p.xp ?? 210);
  const energyCost = info?.energyCost ?? FALLBACK_ENERGY_COST;
  const outOfEnergy = energy < energyCost;
  const noPlaysLeft = !!info && info.playsLeftToday <= 0;

  const float = useSharedValue(0);
  useEffect(() => {
    float.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 1200, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
    );
  }, []);
  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }],
  }));

  const start = async () => {
    if (starting || outOfEnergy || noPlaysLeft) return;
    setStarting(true);
    setFailed(false);
    try {
      await LeagueService.snapshotRank();
    } catch {}
    // 에너지 차감은 서버가 한다. 앱에서 깎으면 안 깎고 게임만 여는 게 코드 한 줄이다.
    try {
      const res = await LeagueService.startChallenge();
      const next = (res as { energy?: { energy?: number } }).energy?.energy;
      if (typeof next === "number") {
        useAuthStore.getState().updateUser({ energy: next } as never);
      }
    } catch (error) {
      // 404 = 서버에 아직 이 엔드포인트가 없다(배포 전). 게임은 열어준다 —
      // 대신 XP 는 안 들어온다(완료 제출도 404 라 결과 화면이 0 을 보여준다).
      // 그 외 오류는 원인을 말해주고 멈춘다. 예전엔 여기서 조용히 return 해서
      // 시작 버튼이 아무 반응 없이 죽어 있었다.
      const missing = error instanceof ApiError && error.status === 404;
      if (!missing) {
        setFailed(true);
        setStarting(false);
        return;
      }
      setNotDeployed(true);
    }
    router.replace({
      pathname: "/challenge-intro",
      params: {
        tier: p.tier ?? "bronze",
        xp: String(maxXp),
        type: challengeId,
      },
    });
  };

  return (
    <View style={[s.c, { backgroundColor: tier.color }]}>
      {/* 헤더 */}
      <View style={[s.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="close" size={32} color="#fff" />
        </Pressable>
        <Text style={s.title}>{t(`challenge.types.${challengeId}`)}</Text>
        <View style={s.energyChip}>
          <Ionicons name="flash" size={18} color="#fff" />
          <Text style={s.energyText}>{energy}</Text>
        </View>
      </View>

      <View style={s.body}>
        {/* 카드 아이콘 */}
        <Animated.View style={[s.cards, floatStyle]}>
          <View
            style={[
              s.card,
              { transform: [{ rotate: "-8deg" }], marginRight: -30 },
            ]}
          >
            <Ionicons name={meta.icon as never} size={54} color={tier.color} />
          </View>
          <View style={[s.card, { transform: [{ rotate: "6deg" }] }]}>
            <Ionicons name={meta.icon as never} size={54} color={tier.color} />
          </View>
        </Animated.View>

        <Text style={s.headline}>
          {t("challenge.headlinePre")}
          <Text style={s.headlineXp}> {maxXp} XP</Text>
          {t("challenge.headlinePost")}
        </Text>

        {/* 레벨 / 획득 박스 */}
        <View style={s.infoBox}>
          <View style={s.infoCol}>
            <Text style={s.infoLabel}>{t("challenge.playsLeft")}</Text>
            <Text style={s.infoValue}>
              {info ? `${info.playsLeftToday}` : "—"}
            </Text>
          </View>
          <View style={s.infoDivider} />
          <View style={s.infoCol}>
            <Text style={s.infoLabel}>{t("challenge.earn")}</Text>
            <Text style={s.infoValue}>{maxXp} XP</Text>
          </View>
        </View>
      </View>

      {/* 시작 버튼 */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 20 }]}>
        {failed ? (
          <Text style={s.startError}>{t("challenge.startFailed")}</Text>
        ) : notDeployed && __DEV__ ? (
          // 개발 빌드에서만 보인다. 왜 XP 가 0 인지 알고 테스트하라고.
          <Text style={s.startError}>{"서버 미배포 — XP 안 들어옴"}</Text>
        ) : null}
        <Pressable
          onPress={start}
          disabled={starting || outOfEnergy || noPlaysLeft}
        >
          {({ pressed }) => (
            <View
              style={[
                s.startBtn,
                (starting || outOfEnergy || noPlaysLeft) && { opacity: 0.5 },
                pressed && { transform: [{ translateY: 3 }] },
              ]}
            >
              <Text style={[s.startText, { color: tier.color }]}>
                {noPlaysLeft
                  ? t("challenge.noPlaysLeft")
                  : outOfEnergy
                    ? t("challenge.noEnergy")
                    : t("challenge.start")}
              </Text>
              <View style={[s.costChip, { backgroundColor: tier.color }]}>
                <Ionicons name="flash" size={16} color="#fff" />
                <Text style={s.costText}>{energyCost}</Text>
              </View>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: { color: "#fff", fontSize: 20, fontWeight: "900" },
  energyChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  energyText: { color: "#fff", fontSize: 16, fontWeight: "900" },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  cards: { flexDirection: "row", marginBottom: 50 },
  card: {
    width: 120,
    height: 150,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 38,
  },
  headlineXp: { color: "#FFE082" },
  infoBox: {
    flexDirection: "row",
    borderWidth: 2.5,
    borderColor: "rgba(255,255,255,0.6)",
    borderRadius: 16,
    marginTop: 40,
    width: "100%",
  },
  infoCol: { flex: 1, alignItems: "center", paddingVertical: 16 },
  infoDivider: { width: 2.5, backgroundColor: "rgba(255,255,255,0.6)" },
  infoLabel: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
    fontWeight: "700",
  },
  infoValue: { color: "#fff", fontSize: 24, fontWeight: "900", marginTop: 4 },
  footer: { paddingHorizontal: 20 },
  startBtn: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  startText: { fontSize: 20, fontWeight: "900" },
  startError: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginBottom: 10,
    opacity: 0.9,
  },
  costChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  costText: { color: "#fff", fontSize: 15, fontWeight: "900" },
});
