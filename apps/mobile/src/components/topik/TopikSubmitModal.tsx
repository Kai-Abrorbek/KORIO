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

interface TopikSubmitModalProps {
  visible: boolean;
  answeredCount: number;
  totalCount: number;
  submitting?: boolean;
  errorTitle?: string;
  errorMessage?: string;
  onCancel: () => void;
  onSubmit: () => void;
}

export function TopikSubmitModal({
  visible,
  answeredCount,
  totalCount,
  submitting = false,
  errorTitle,
  errorMessage,
  onCancel,
  onSubmit,
}: TopikSubmitModalProps) {
  const { t } = useTranslation();
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const unansweredCount = Math.max(0, totalCount - answeredCount);
  const progressPercent = totalCount
    ? Math.min(100, Math.round((answeredCount / totalCount) * 100))
    : 0;

  return (
    <TopikSheetModal
      visible={visible}
      dismissible={!submitting}
      onClose={onCancel}
    >
      <View style={styles.heroRow}>
        <View style={styles.iconWrap}>
          <Ionicons
            name="checkmark-done-outline"
            size={29}
            color={palette.primary}
          />
        </View>
        <View style={styles.heroCopy}>
          <Text style={styles.eyebrow}>TOPIK</Text>
          <Text style={styles.title}>{t("topik.exam.submitTitle")}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("topik.common.close")}
          disabled={submitting}
          hitSlop={10}
          onPress={onCancel}
          style={({ pressed }) => [
            styles.closeButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="close" size={21} color={palette.textMuted} />
        </Pressable>
      </View>

      <Text style={styles.message}>
        {unansweredCount > 0
          ? t("topik.exam.unansweredMessage", { count: unansweredCount })
          : t("topik.exam.submitMessage")}
      </Text>

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>
            {t("topik.exam.answerProgress", {
              answered: answeredCount,
              total: totalCount,
            })}
          </Text>
          <Text style={styles.percentText}>{progressPercent}%</Text>
        </View>
        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${progressPercent}%` }]}
          />
        </View>
        <View
          style={[
            styles.statusNotice,
            unansweredCount === 0 && styles.statusNoticeComplete,
          ]}
        >
          <Ionicons
            name={
              unansweredCount > 0
                ? "alert-circle-outline"
                : "checkmark-circle-outline"
            }
            size={18}
            color={unansweredCount > 0 ? palette.warning : palette.success}
          />
          <Text
            style={[
              styles.statusText,
              unansweredCount === 0 && styles.statusTextComplete,
            ]}
          >
            {unansweredCount > 0
              ? t("topik.exam.unansweredMessage", { count: unansweredCount })
              : t("topik.exam.submitMessage")}
          </Text>
        </View>
      </View>

      {errorMessage && (
        <Animated.View
          entering={FadeInDown.duration(180)}
          style={styles.errorBox}
        >
          <Ionicons name="warning-outline" size={20} color={palette.danger} />
          <View style={styles.errorCopy}>
            {errorTitle && <Text style={styles.errorTitle}>{errorTitle}</Text>}
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        </Animated.View>
      )}

      <Pressable
        accessibilityRole="button"
        disabled={submitting}
        onPress={onSubmit}
        style={({ pressed }) => [
          styles.submitButton,
          pressed && styles.primaryPressed,
          submitting && styles.disabled,
        ]}
      >
        {submitting ? (
          <ActivityIndicator size="small" color={palette.white} />
        ) : (
          <Ionicons name="send" size={18} color={palette.white} />
        )}
        <Text style={styles.submitText}>{t("topik.exam.submit")}</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        disabled={submitting}
        onPress={onCancel}
        style={({ pressed }) => [
          styles.cancelButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.cancelText}>{t("topik.common.cancel")}</Text>
      </Pressable>
    </TopikSheetModal>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    heroRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    iconWrap: {
      width: 54,
      height: 54,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 18,
      backgroundColor: palette.primarySoft,
    },
    heroCopy: { flex: 1 },
    eyebrow: {
      color: palette.primary,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.25,
    },
    title: {
      color: palette.text,
      fontSize: 22,
      lineHeight: 29,
      fontWeight: "900",
      letterSpacing: -0.5,
      marginTop: 2,
    },
    closeButton: {
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 18,
      backgroundColor: palette.surfaceMuted,
    },
    message: {
      color: palette.textSecondary,
      fontSize: 13,
      lineHeight: 20,
      marginTop: 15,
    },
    progressCard: {
      gap: 12,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 19,
      backgroundColor: palette.surfaceElevated,
      padding: 15,
      marginTop: 18,
    },
    progressHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    progressLabel: { color: palette.text, fontSize: 13, fontWeight: "800" },
    percentText: {
      color: palette.primary,
      fontSize: 13,
      fontWeight: "900",
      fontVariant: ["tabular-nums"],
    },
    progressTrack: {
      height: 9,
      overflow: "hidden",
      borderRadius: 5,
      backgroundColor: palette.surfaceMuted,
    },
    progressFill: {
      height: "100%",
      borderRadius: 5,
      backgroundColor: palette.primary,
    },
    statusNotice: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      borderRadius: 12,
      backgroundColor: palette.warningSoft,
      padding: 11,
    },
    statusNoticeComplete: { backgroundColor: palette.successSoft },
    statusText: {
      flex: 1,
      color: palette.warningText,
      fontSize: 11,
      lineHeight: 16,
      fontWeight: "700",
    },
    statusTextComplete: { color: palette.successText },
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
    submitButton: {
      minHeight: 56,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderRadius: 17,
      backgroundColor: palette.primaryStrong,
      marginTop: 19,
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.14,
      shadowRadius: 12,
      elevation: 4,
    },
    submitText: { color: palette.white, fontSize: 16, fontWeight: "900" },
    cancelButton: {
      minHeight: 49,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      marginTop: 5,
    },
    cancelText: {
      color: palette.textSecondary,
      fontSize: 14,
      fontWeight: "800",
    },
    primaryPressed: { opacity: 0.9, transform: [{ scale: 0.985 }] },
    pressed: { opacity: 0.68 },
    disabled: { opacity: 0.58 },
  });
