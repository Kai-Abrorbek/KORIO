import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import Animated, { FadeInDown } from "react-native-reanimated";
import { TopikSheetModal } from "./TopikSheetModal";
import { type TopikPalette, useTopikTheme } from "./topikTheme";

interface TopikExitModalProps {
  visible: boolean;
  answeredCount: number;
  totalCount: number;
  leaving?: boolean;
  errorTitle?: string;
  errorMessage?: string;
  onContinue: () => void;
  onLeave: () => void;
}

export function TopikExitModal({
  visible,
  answeredCount,
  totalCount,
  leaving = false,
  errorTitle,
  errorMessage,
  onContinue,
  onLeave,
}: TopikExitModalProps) {
  const { t } = useTranslation();
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const progress = totalCount > 0 ? answeredCount / totalCount : 0;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round(progress * 100)),
  );

  return (
    <TopikSheetModal
      visible={visible}
      dismissible={!leaving}
      onClose={onContinue}
    >
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons
            name="document-text-outline"
            size={28}
            color={palette.primary}
          />
          <View style={styles.savedBadge}>
            <Ionicons name="checkmark" size={13} color={palette.white} />
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("topik.exam.continue")}
          disabled={leaving}
          hitSlop={10}
          onPress={onContinue}
          style={({ pressed }) => [
            styles.closeButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="close" size={21} color={palette.textMuted} />
        </Pressable>
      </View>

      <Text style={styles.title}>{t("topik.exam.leaveTitle")}</Text>
      <Text style={styles.message}>{t("topik.exam.leaveMessage")}</Text>

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View style={styles.progressLabelRow}>
            <Ionicons name="stats-chart" size={15} color={palette.primary} />
            <Text style={styles.progressLabel}>
              {t("topik.exam.answerProgress", {
                answered: answeredCount,
                total: totalCount,
              })}
            </Text>
          </View>
          <View style={styles.percentPill}>
            <Text style={styles.percentText}>{progressPercent}%</Text>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${progressPercent}%` }]}
          />
        </View>

        <View style={styles.saveNotice}>
          <Ionicons
            name="cloud-done-outline"
            size={17}
            color={palette.success}
          />
          <Text style={styles.saveNoticeText}>
            {t("topik.exam.autoSaveNotice")}
          </Text>
        </View>
      </View>

      {errorMessage && (
        <Animated.View
          entering={FadeInDown.duration(180)}
          style={styles.errorBox}
        >
          <Ionicons
            name="cloud-offline-outline"
            size={20}
            color={palette.danger}
          />
          <View style={styles.errorCopy}>
            {errorTitle && <Text style={styles.errorTitle}>{errorTitle}</Text>}
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        </Animated.View>
      )}

      <Pressable
        accessibilityRole="button"
        disabled={leaving}
        onPress={onContinue}
        style={({ pressed }) => [
          styles.continueButton,
          pressed && styles.primaryPressed,
        ]}
      >
        <Text style={styles.continueText}>{t("topik.exam.continue")}</Text>
        <Ionicons name="arrow-forward" size={19} color={palette.white} />
      </Pressable>

      <Pressable
        accessibilityRole="button"
        disabled={leaving}
        onPress={onLeave}
        style={({ pressed }) => [
          styles.leaveButton,
          pressed && styles.pressed,
          leaving && styles.disabled,
        ]}
      >
        {leaving ? (
          <ActivityIndicator size="small" color={palette.dangerText} />
        ) : (
          <Ionicons name="exit-outline" size={18} color={palette.dangerText} />
        )}
        <Text style={styles.leaveText}>{t("topik.exam.leave")}</Text>
      </Pressable>
    </TopikSheetModal>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    header: {
      minHeight: 58,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    iconWrap: {
      width: 56,
      height: 56,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 18,
      backgroundColor: palette.primarySoft,
    },
    savedBadge: {
      position: "absolute",
      right: -3,
      bottom: -3,
      width: 23,
      height: 23,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
      borderColor: palette.surface,
      borderRadius: 12,
      backgroundColor: palette.success,
    },
    closeButton: {
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 18,
      backgroundColor: palette.surfaceMuted,
    },
    title: {
      color: palette.text,
      fontSize: 24,
      lineHeight: 32,
      fontWeight: "900",
      letterSpacing: -0.6,
      marginTop: 14,
    },
    message: {
      color: palette.textSecondary,
      fontSize: 14,
      lineHeight: 21,
      marginTop: 7,
    },
    progressCard: {
      gap: 12,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 19,
      backgroundColor: palette.surfaceElevated,
      padding: 15,
      marginTop: 20,
    },
    progressHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    progressLabelRow: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    progressLabel: { color: palette.text, fontSize: 13, fontWeight: "800" },
    percentPill: {
      borderRadius: 9,
      backgroundColor: palette.primarySoft,
      paddingHorizontal: 9,
      paddingVertical: 5,
    },
    percentText: {
      color: palette.primaryText,
      fontSize: 11,
      fontWeight: "900",
      fontVariant: ["tabular-nums"],
    },
    progressTrack: {
      height: 8,
      overflow: "hidden",
      borderRadius: 5,
      backgroundColor: palette.surfaceMuted,
    },
    progressFill: {
      height: "100%",
      borderRadius: 5,
      backgroundColor: palette.primary,
    },
    saveNotice: { flexDirection: "row", alignItems: "center", gap: 7 },
    saveNoticeText: {
      flex: 1,
      color: palette.textMuted,
      fontSize: 11,
      lineHeight: 16,
      fontWeight: "700",
    },
    errorBox: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      borderWidth: 1,
      borderColor: palette.danger,
      borderRadius: 15,
      backgroundColor: palette.dangerSoft,
      padding: 13,
      marginTop: 12,
    },
    errorCopy: { flex: 1, gap: 3 },
    errorTitle: { color: palette.dangerText, fontSize: 12, fontWeight: "900" },
    errorMessage: {
      color: palette.textSecondary,
      fontSize: 11,
      lineHeight: 16,
    },
    continueButton: {
      minHeight: 56,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderRadius: 17,
      backgroundColor: palette.primaryStrong,
      marginTop: 20,
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.14,
      shadowRadius: 12,
      elevation: 4,
    },
    continueText: { color: palette.white, fontSize: 16, fontWeight: "900" },
    leaveButton: {
      minHeight: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      borderRadius: 15,
      marginTop: 5,
    },
    leaveText: { color: palette.dangerText, fontSize: 14, fontWeight: "800" },
    primaryPressed: { opacity: 0.9, transform: [{ scale: 0.985 }] },
    pressed: { opacity: 0.68 },
    disabled: { opacity: 0.55 },
  });
