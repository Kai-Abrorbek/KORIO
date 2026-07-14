import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
  interpolate,
  FadeInDown,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import BoriMascot from "@/components/home/BoriMascot";
import { useTheme } from "@/hooks/useTheme";
import { Modal } from "react-native";
import { useState } from "react";
import ScoreDetailScreen from "@/components/score/ScoreDetailScreen";

const MILESTONE_STYLE: {
  icon: keyof typeof Ionicons.glyphMap;
  labelKey: string;
}[] = [
  { icon: "star", labelKey: "score.milestones.start" },
  { icon: "hand-left", labelKey: "score.milestones.intro" },
  { icon: "restaurant", labelKey: "score.milestones.order" },
  { icon: "location", labelKey: "score.milestones.directions" },
  { icon: "book", labelKey: "score.milestones.reading" },
  { icon: "tv", labelKey: "score.milestones.tv" },
  { icon: "briefcase", labelKey: "score.milestones.work" },
  { icon: "trophy", labelKey: "score.milestones.complete" },
];

const BLUE = "#1CB0F6";
const BLUE_TEXT = "#1899D6";

interface Props {
  score: number;
  milestones?: { score: number }[];
  flag?: string; // 이모지 국기 (예: "🇺🇸")
  title?: string; // "영어 스코어를 올렸습니다!"
  continueLabel?: string;
  onContinue?: () => void;
  onShare?: () => void;
  onExplain?: () => void;
}

export default function ScoreUpScreen({
  score,
  milestones,
  flag = "🇺🇸",
  title,
  continueLabel,
  onContinue,
  onShare,
  onExplain,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const bounce = useSharedValue(0);
  const rot = useSharedValue(0);
  const sx = useSharedValue(0);
  const sparkle = useSharedValue(0);
  const pop = useSharedValue(0);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    // 등장 팝
    pop.value = withSequence(
      withTiming(1.15, { duration: 260, easing: Easing.out(Easing.back(2)) }),
      withTiming(1, { duration: 180 }),
    );
    // 통통 튀기
    bounce.value = withRepeat(
      withSequence(
        withTiming(-26, { duration: 380, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 380, easing: Easing.bounce }),
      ),
      -1,
    );
    // 좌우 흔들
    sx.value = withRepeat(
      withSequence(
        withTiming(-12, { duration: 300 }),
        withTiming(12, { duration: 300 }),
      ),
      -1,
      true,
    );
    // 살짝 회전 (흔들이랑 약간 다른 박자)
    rot.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 340 }),
        withTiming(8, { duration: 340 }),
      ),
      -1,
      true,
    );
    // 별 반짝
    sparkle.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0.2, { duration: 500 }),
      ),
      -1,
      true,
    );
  }, []);

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: bounce.value },
      { translateX: sx.value },
      { rotate: `${rot.value}deg` },
      { scale: pop.value || 1 },
    ],
  }));
  const sparkleStyle = useAnimatedStyle(() => ({
    opacity: sparkle.value,
    transform: [
      { scale: 0.6 + sparkle.value * 0.7 },
      { rotate: `${sparkle.value * 40}deg` },
    ],
  }));

  const detailMilestones = (milestones ?? []).map((m, i) => ({
    score: m.score,
    label: t(MILESTONE_STYLE[i % MILESTONE_STYLE.length].labelKey),
    icon: MILESTONE_STYLE[i % MILESTONE_STYLE.length].icon,
  }));

  return (
    <View style={s.container}>
      <View style={s.center}>
        {/* 마스코트 + 반짝이 */}
        <View style={s.mascotWrap}>
          <Animated.Text style={[s.spark, s.sparkTR, sparkleStyle]}>
            ✦
          </Animated.Text>
          <Animated.Text style={[s.spark, s.sparkTL, sparkleStyle]}>
            ✦
          </Animated.Text>
          <Animated.View style={mascotStyle}>
            <BoriMascot size={180} />
          </Animated.View>
        </View>

        {/* 국기 + 스코어 */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(500)}
          style={s.scoreRow}
        >
          <Text style={s.flag}>{flag}</Text>
          <Text style={s.score}>{score}</Text>
        </Animated.View>

        {/* 타이틀 */}
        <Animated.Text
          entering={FadeInDown.delay(320).duration(500)}
          style={s.title}
        >
          {title ?? t("score.raised")}
        </Animated.Text>
      </View>

      {/* 하단 */}
      <View style={s.footer}>
        <View style={s.row}>
          <TouchableOpacity
            style={s.shareBtn}
            onPress={onShare}
            activeOpacity={0.85}
          >
            <Ionicons name="share-outline" size={26} color={BLUE_TEXT} />
          </TouchableOpacity>
          <TouchableOpacity
            style={s.continueBtn}
            onPress={onContinue}
            activeOpacity={0.9}
          >
            <Text style={s.continueText}>
              {continueLabel ?? t("score.continue")}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            onExplain?.(); // 기존 콜백도 유지 (있으면)
            setShowDetail(true);
          }}
          style={s.explain}
        >
          <Text style={s.explainText}>{t("score.explain")}</Text>
        </TouchableOpacity>
      </View>
      {/* 스코어 상세 모달 — 옆에서 슬라이드 + 전체 덮기 */}
      <Modal
        visible={showDetail}
        animationType="none"
        transparent={false}
        onRequestClose={() => setShowDetail(false)}
        presentationStyle="fullScreen"
      >
        <Animated.View
          entering={SlideInRight.duration(280)}
          exiting={SlideOutRight.duration(220)}
          style={{ flex: 1 }}
        >
          <ScoreDetailScreen
            score={score}
            flag={flag}
            milestones={detailMilestones}
            onClose={() => setShowDetail(false)}
            onShare={onShare}
          />
        </Animated.View>
      </Modal>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BLUE,
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    mascotWrap: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 60,
    },
    spark: { position: "absolute", color: "#FFE14D", fontSize: 26, zIndex: 2 },
    sparkTR: { top: -10, right: 6 },
    sparkTL: { top: 30, left: -4, fontSize: 18 },
    scoreRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 18,
      marginBottom: 20,
    },
    flag: { fontSize: 64 },
    score: { fontSize: 84, fontWeight: "900", color: "#fff" },
    title: {
      fontSize: 26,
      fontWeight: "800",
      color: "#fff",
      textAlign: "center",
    },
    footer: { gap: 18 },
    row: { flexDirection: "row", gap: 12 },
    shareBtn: {
      width: 64,
      borderRadius: 16,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 18,
    },
    continueBtn: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 18,
    },
    continueText: { color: BLUE_TEXT, fontSize: 17, fontWeight: "800" },
    explain: { alignItems: "center", paddingVertical: 4 },
    explainText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "800",
      opacity: 0.95,
    },
  });
