import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import type { GemPass } from "@/services/shop.service";

/**
 * 프리미엄 기간권 한 장.
 *
 * 기간이 길수록 색이 진해진다 (하늘 → 파랑 → 보라 → 금). 마지막 장은 카드 전체가
 * 그라디언트 + 광택이 흐르는 "추천" 카드다 — 정적인 목록으로 나열하면 어느 걸
 * 사야 하는지 아무도 모른다.
 *
 * 못 사는 경우를 그냥 흐리게만 두지 않는다. 보석이 모자라면 **얼마가 모자란지**,
 * 이미 충분히 쌓았으면 **왜 못 사는지**를 카드가 직접 말한다.
 */
const TIERS = [
  { a: "#7FD8F5", b: "#3BB6E5", edge: "#2A94BC" },
  { a: "#5BC0FF", b: "#1899D6", edge: "#1478A8" },
  { a: "#B98BF5", b: "#776ee2", edge: "#5448E0" },
  { a: "#FFC94D", b: "#FF8A00", edge: "#C26A00" },
];

interface Props {
  pass: GemPass;
  /** 첫 장 기준 절약률 계산용 */
  basePerDay: number;
  index: number;
  featured: boolean;
  gems: number;
  disabled: boolean;
  onPress: () => void;
}

export default function PassCard({
  pass,
  basePerDay,
  index,
  featured,
  gems,
  disabled,
  onPress,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);
  const tier = TIERS[Math.min(index, TIERS.length - 1)];

  const save =
    basePerDay > 0 ? Math.round((1 - pass.perDay / basePerDay) * 100) : 0;
  const short = Math.max(0, pass.gems - gems);
  const blocked = disabled || !pass.affordable || pass.overStack;

  // 추천 카드에만 광택을 흘린다. 전부 반짝이면 아무것도 안 반짝이는 것과 같다.
  const shine = useSharedValue(-1);
  useEffect(() => {
    if (!featured) return;
    shine.value = withDelay(
      600,
      withRepeat(
        withSequence(
          withTiming(1.6, { duration: 900, easing: Easing.inOut(Easing.quad) }),
          withTiming(-1, { duration: 0 }),
        ),
        -1,
        false,
      ),
    );
  }, [featured, shine]);

  const shineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shine.value * 260 }, { rotate: "18deg" }],
  }));

  const press = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const body = (
    <>
      {/* 기간 배지 */}
      <View style={[s.badge, featured && s.badgeOnGradient]}>
        {featured ? (
          <>
            <Text style={[s.badgeNum, { color: tier.b }]}>{pass.days}</Text>
            <Text style={[s.badgeUnit, { color: tier.b }]}>
              {t("shop.dayUnit")}
            </Text>
          </>
        ) : (
          <LinearGradient
            colors={[tier.a, tier.b]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.badgeFill}
          >
            <Text style={s.badgeNum}>{pass.days}</Text>
            <Text style={s.badgeUnit}>{t("shop.dayUnit")}</Text>
          </LinearGradient>
        )}
      </View>

      <View style={s.mid}>
        <View style={s.titleRow}>
          <Text style={[s.title, featured && s.onDark]} numberOfLines={1}>
            KORIO SUPER
          </Text>
          {save > 0 && (
            <View style={[s.saveChip, featured && s.saveChipOnDark]}>
              <Text style={[s.saveText, featured && { color: tier.b }]}>
                −{save}%
              </Text>
            </View>
          )}
        </View>
        <Text style={[s.sub, featured && s.subOnDark]} numberOfLines={1}>
          {t("shop.perDay", { n: pass.perDay.toLocaleString("en-US") })}
        </Text>
        {pass.overStack ? (
          <View style={s.warnRow}>
            <Ionicons
              name="lock-closed"
              size={12}
              color={featured ? "#fff" : theme.textSecondary}
            />
            <Text style={[s.warn, featured && s.subOnDark]} numberOfLines={2}>
              {t("shop.stackFull")}
            </Text>
          </View>
        ) : short > 0 ? (
          <View style={s.warnRow}>
            <Ionicons name="diamond" size={12} color="#E5379B" />
            <Text style={[s.warn, { color: "#E5379B" }]}>
              {t("shop.need", { n: short.toLocaleString("en-US") })}
            </Text>
          </View>
        ) : null}
      </View>

      {/* 가격 */}
      <View style={[s.price, featured && s.priceOnDark]}>
        <Ionicons
          name="diamond"
          size={16}
          color={featured ? "#fff" : "#3BB6E5"}
        />
        <Text style={[s.priceText, featured && s.onDark]}>
          {pass.gems.toLocaleString("en-US")}
        </Text>
      </View>
    </>
  );

  return (
    <Animated.View>
      <Pressable
        disabled={blocked}
        onPress={press}
        style={({ pressed }) => [
          s.wrap,
          { borderBottomColor: featured ? tier.edge : theme.border },
          featured ? s.wrapFeatured : s.wrapPlain,
          blocked && s.blocked,
          pressed && !blocked && s.pressed,
        ]}
      >
        {featured ? (
          <LinearGradient
            colors={[tier.a, tier.b]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.inner}
          >
            {/* 광택 */}
            <Animated.View style={[s.shine, shineStyle]} pointerEvents="none" />
            {body}
          </LinearGradient>
        ) : (
          <View style={s.inner}>{body}</View>
        )}

        {featured && (
          <View style={[s.ribbon, { backgroundColor: tier.edge }]}>
            <Ionicons name="flame" size={11} color="#fff" />
            <Text style={s.ribbonText}>{t("shop.best")}</Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      marginHorizontal: 20,
      marginBottom: 12,
      borderRadius: 20,
      borderBottomWidth: 5,
      overflow: "hidden",
    },
    wrapPlain: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
    },
    wrapFeatured: { marginTop: 4 },
    pressed: { transform: [{ translateY: 3 }], borderBottomWidth: 2 },
    blocked: { opacity: 0.55 },
    inner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      paddingVertical: 15,
      paddingHorizontal: 15,
    },
    shine: {
      position: "absolute",
      top: -40,
      left: -90,
      width: 46,
      height: 200,
      backgroundColor: "rgba(255,255,255,0.35)",
    },
    badge: { width: 54, height: 54, borderRadius: 16, overflow: "hidden" },
    badgeOnGradient: {
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    badgeFill: { flex: 1, alignItems: "center", justifyContent: "center" },
    badgeNum: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "900",
      lineHeight: 24,
    },
    badgeUnit: {
      color: "#fff",
      fontSize: 10,
      fontWeight: "800",
      opacity: 0.9,
      marginTop: -1,
    },
    mid: { flex: 1, gap: 2 },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    title: { fontSize: 16, fontWeight: "900", color: theme.text },
    onDark: { color: "#fff" },
    sub: { fontSize: 12, fontWeight: "600", color: theme.textSecondary },
    subOnDark: { color: "rgba(255,255,255,0.92)" },
    saveChip: {
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: 8,
      backgroundColor: "#58CC0222",
    },
    saveChipOnDark: { backgroundColor: "#fff" },
    saveText: { fontSize: 11, fontWeight: "900", color: "#58CC02" },
    warnRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginTop: 2,
    },
    warn: { flex: 1, fontSize: 11, fontWeight: "700", color: theme.textSecondary },
    price: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 12,
      backgroundColor: theme.bg === "#ffffff" ? "#F2FAFE" : "#2E2E39",
    },
    priceOnDark: { backgroundColor: "rgba(0,0,0,0.18)" },
    priceText: { fontSize: 16, fontWeight: "900", color: "#3BB6E5" },
    ribbon: {
      position: "absolute",
      top: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      paddingHorizontal: 9,
      paddingVertical: 3,
      borderBottomLeftRadius: 12,
    },
    ribbonText: {
      color: "#fff",
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 0.6,
    },
  });
