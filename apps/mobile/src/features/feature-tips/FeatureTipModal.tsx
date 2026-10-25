import { useRef } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { Pressable } from "@/components/ui/Pressables";
import HaneulmonMascot, {
  type HaneulmonMood,
} from "@/components/home/HaneulmonMascot";
import Button3D from "@/features/retention/components/Button3D";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import type { FeatureTip } from "./useFeatureTip";

const MOOD: Record<FeatureTip["id"], HaneulmonMood> = {
  payout: "proud",
  invite: "cheering",
  stickers: "great",
};
const GOLD = "#FFD900";
const SKY = "#1CB0F6";
const SKY_DEPTH = "#1899D6";

const n = (value: number) => value.toLocaleString("en-US");

/**
 * 기능 안내 — 가운데 뜨는 대화상자 (앱 평가 모달과 같은 틀: 보라로 물든 위쪽 + 고개 내민 하늘몬).
 * 기능마다 혜택을 숫자로 보여 주고, 버튼 하나로 그 화면에 바로 간다.
 * 열림/닫힘은 Modal 기본 페이드 하나만 (RewardDialog 2026-10-06 규칙).
 */
export default function FeatureTipModal({
  tip,
  onGo,
  onClose,
  onNever,
}: {
  tip: FeatureTip | null;
  /** 그 기능 화면으로 */
  onGo: (tip: FeatureTip) => void;
  onClose: () => void;
  /** "다시 보지 않기" */
  onNever: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  // 닫히는 페이드 동안 마지막 내용을 그린다
  const last = useRef<FeatureTip | null>(tip);
  if (tip) last.current = tip;
  const shown = tip ?? last.current;

  return (
    <Modal
      transparent
      visible={!!tip}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={s.root}>
        <Pressable
          style={[StyleSheet.absoluteFill, s.backdrop]}
          onPress={onClose}
        />
        {shown ? (
          <View style={s.card}>
            <LinearGradient
              pointerEvents="none"
              colors={["rgba(119,110,226,0.18)", "rgba(119,110,226,0)"]}
              style={s.sky}
            />
            <View style={s.peek}>
              <HaneulmonMascot size={108} mood={MOOD[shown.id]} />
            </View>

            <Text style={s.title}>{t(`featureTips.${shown.id}.title`)}</Text>
            <Text style={s.body}>
              {shown.id === "payout"
                ? t("featureTips.payout.body", { min: n(shown.minGems) })
                : shown.id === "invite"
                  ? t("featureTips.invite.body", { n: n(shown.rewardGems) })
                  : t("featureTips.stickers.body")}
            </Text>

            <Benefit tip={shown} theme={theme} />

            <Button3D
              label={t(`featureTips.${shown.id}.cta`)}
              onPress={() => onGo(shown)}
              color={shown.id === "stickers" ? SKY : undefined}
              depthColor={shown.id === "stickers" ? SKY_DEPTH : undefined}
              style={s.cta}
            />
            <View style={s.footer}>
              <Pressable onPress={onNever} hitSlop={10} style={s.footBtn}>
                <Text style={s.footText} numberOfLines={2}>
                  {t("featureTips.never")}
                </Text>
              </Pressable>
              <View style={s.footDivider} />
              <Pressable onPress={onClose} hitSlop={10} style={s.footBtn}>
                <Text style={s.footText} numberOfLines={2}>
                  {t("featureTips.close")}
                </Text>
              </Pressable>
            </View>
          </View>
        ) : null}
      </GestureHandlerRootView>
    </Modal>
  );
}

/** 혜택 한 덩어리 — 숫자로 바로 보이게 */
function Benefit({ tip, theme }: { tip: FeatureTip; theme: ThemeColors }) {
  const { t } = useTranslation();
  const s = getStyles(theme);

  if (tip.id === "payout") {
    const ratio = Math.min(1, tip.gems / Math.max(1, tip.minGems));
    return (
      <View style={s.benefit}>
        <View style={s.payoutRow}>
          <Ionicons name="diamond" size={16} color="#5CD0F0" />
          <Text style={s.payoutNow}>{n(tip.gems)}</Text>
          <Text style={s.payoutGoal}>/ {n(tip.minGems)}</Text>
        </View>
        <View style={s.track}>
          <View style={[s.fill, { width: `${Math.max(4, ratio * 100)}%` }]} />
        </View>
        <Text style={s.caption}>
          {t("featureTips.payout.rate", { som: n(tip.somPerGem) })}
        </Text>
      </View>
    );
  }

  if (tip.id === "invite") {
    return (
      <View style={s.benefit}>
        <View style={s.bigRow}>
          <Ionicons name="diamond" size={22} color="#5CD0F0" />
          <Text style={s.big}>+{n(tip.rewardGems)}</Text>
        </View>
        <Text style={s.caption}>{t("featureTips.invite.each")}</Text>
        {tip.milestones.length ? (
          <View style={s.chips}>
            {tip.milestones.map((m) => (
              <View key={m.count} style={[s.chip, m.reached && s.chipDone]}>
                <Text style={s.chipText}>
                  {t(
                    m.superDays
                      ? "featureTips.invite.milestonePass"
                      : "featureTips.invite.milestone",
                    { count: m.count, gems: n(m.gems), days: m.superDays },
                  )}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <View style={[s.benefit, s.stickerBenefit]}>
      <View style={s.stickerIcon}>
        <Ionicons name="paper-plane" size={22} color="#FFFFFF" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.stickerFree}>{t("featureTips.stickers.free")}</Text>
        <Text style={s.caption}>{t("featureTips.stickers.how")}</Text>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    root: { flex: 1, alignItems: "center", justifyContent: "center" },
    backdrop: { backgroundColor: "rgba(16, 11, 44, 0.74)" },
    card: {
      width: "88%",
      maxWidth: 380,
      backgroundColor: theme.surface,
      borderRadius: 28,
      paddingTop: 52,
      paddingHorizontal: 20,
      paddingBottom: 14,
      borderWidth: 1,
      borderColor: theme.border,
    },
    sky: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 150,
      borderTopLeftRadius: 27,
      borderTopRightRadius: 27,
    },
    peek: { position: "absolute", top: -60, alignSelf: "center" },
    title: {
      fontSize: 22,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
      lineHeight: 28,
      letterSpacing: -0.3,
    },
    body: {
      marginTop: 6,
      fontSize: 14,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 20,
    },
    benefit: {
      marginTop: 16,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.bg,
      paddingVertical: 14,
      paddingHorizontal: 14,
      alignItems: "center",
    },
    payoutRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
    payoutNow: { fontSize: 24, fontWeight: "900", color: theme.text },
    payoutGoal: { fontSize: 15, fontWeight: "800", color: theme.textSecondary },
    track: {
      marginTop: 10,
      alignSelf: "stretch",
      height: 10,
      borderRadius: 999,
      backgroundColor: theme.border,
      overflow: "hidden",
    },
    fill: { height: "100%", borderRadius: 999, backgroundColor: GOLD },
    caption: {
      marginTop: 8,
      fontSize: 12.5,
      fontWeight: "700",
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 17,
    },
    bigRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    big: {
      fontSize: 30,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -0.5,
    },
    chips: {
      marginTop: 12,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 6,
    },
    chip: {
      paddingVertical: 4,
      paddingHorizontal: 9,
      borderRadius: 999,
      backgroundColor: "#FFF1C7",
      borderWidth: 1,
      borderColor: "#FFE38A",
    },
    chipDone: { opacity: 0.5 },
    chipText: { fontSize: 11.5, fontWeight: "900", color: "#9A6A00" },
    stickerBenefit: { flexDirection: "row", gap: 12 },
    stickerIcon: {
      width: 46,
      height: 46,
      borderRadius: 14,
      backgroundColor: SKY,
      alignItems: "center",
      justifyContent: "center",
    },
    stickerFree: { fontSize: 17, fontWeight: "900", color: theme.text },
    cta: { marginTop: 16 },
    footer: {
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    footBtn: { flex: 1, paddingVertical: 8, alignItems: "center" },
    footText: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.textSecondary,
      textAlign: "center",
    },
    footDivider: { width: 1, height: 14, backgroundColor: theme.border },
  });
