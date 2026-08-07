import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TopikSheetModal } from "./TopikSheetModal";
import { type TopikPalette, useTopikTheme } from "./topikTheme";

interface TopikNoticeModalProps {
  visible: boolean;
  title: string;
  message: string;
  primaryLabel: string;
  onClose: () => void;
  onPrimary?: () => void;
  secondaryLabel?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: "info" | "error";
  gradientColors?: readonly [string, string];
  busy?: boolean;
}

export function TopikNoticeModal({
  visible,
  title,
  message,
  primaryLabel,
  onClose,
  onPrimary,
  secondaryLabel,
  icon,
  variant = "info",
  gradientColors,
  busy = false,
}: TopikNoticeModalProps) {
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const colors =
    gradientColors ??
    (variant === "error"
      ? ([palette.danger, palette.dangerText] as const)
      : ([palette.primary, palette.primaryStrong] as const));

  return (
    <TopikSheetModal
      visible={visible}
      dismissible={!busy}
      onClose={onClose}
      sheetStyle={styles.compactSheet}
    >
      <View style={styles.visual}>
        <View
          style={[
            styles.orbitLarge,
            {
              backgroundColor:
                variant === "error" ? palette.dangerSoft : palette.primarySoft,
            },
          ]}
        />
        <View
          style={[
            styles.orbitSmall,
            {
              backgroundColor:
                variant === "error" ? palette.dangerSoft : palette.primarySoft,
            },
          ]}
        />
        <LinearGradient colors={colors} style={styles.iconWrap}>
          <Ionicons
            name={
              icon ?? (variant === "error" ? "warning-outline" : "sparkles")
            }
            size={32}
            color={palette.white}
          />
        </LinearGradient>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      <Pressable
        accessibilityRole="button"
        disabled={busy}
        onPress={onPrimary ?? onClose}
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.primaryPressed,
          busy && styles.disabled,
        ]}
      >
        {busy ? (
          <ActivityIndicator size="small" color={palette.white} />
        ) : (
          <Ionicons
            name={variant === "error" ? "refresh" : "checkmark"}
            size={19}
            color={palette.white}
          />
        )}
        <Text style={styles.primaryText}>{primaryLabel}</Text>
      </Pressable>

      {secondaryLabel && (
        <Pressable
          accessibilityRole="button"
          disabled={busy}
          onPress={onClose}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.secondaryText}>{secondaryLabel}</Text>
        </Pressable>
      )}
    </TopikSheetModal>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    compactSheet: { alignItems: "center", paddingHorizontal: 24 },
    visual: {
      width: 112,
      height: 96,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 1,
    },
    orbitLarge: {
      position: "absolute",
      width: 96,
      height: 96,
      borderRadius: 48,
      opacity: 0.58,
    },
    orbitSmall: {
      position: "absolute",
      right: 3,
      top: 2,
      width: 28,
      height: 28,
      borderRadius: 14,
    },
    iconWrap: {
      width: 66,
      height: 66,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 22,
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 7 },
      shadowOpacity: 0.18,
      shadowRadius: 13,
      elevation: 6,
    },
    title: {
      color: palette.text,
      fontSize: 23,
      lineHeight: 31,
      fontWeight: "900",
      letterSpacing: -0.55,
      textAlign: "center",
      marginTop: 12,
    },
    message: {
      maxWidth: 360,
      color: palette.textSecondary,
      fontSize: 13,
      lineHeight: 20,
      textAlign: "center",
      marginTop: 8,
    },
    primaryButton: {
      width: "100%",
      minHeight: 55,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderRadius: 17,
      backgroundColor: palette.primaryStrong,
      marginTop: 23,
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.14,
      shadowRadius: 12,
      elevation: 4,
    },
    primaryText: { color: palette.white, fontSize: 15, fontWeight: "900" },
    secondaryButton: {
      width: "100%",
      minHeight: 48,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      marginTop: 5,
    },
    secondaryText: {
      color: palette.textSecondary,
      fontSize: 14,
      fontWeight: "800",
    },
    primaryPressed: { opacity: 0.9, transform: [{ scale: 0.985 }] },
    pressed: { opacity: 0.68 },
    disabled: { opacity: 0.58 },
  });
