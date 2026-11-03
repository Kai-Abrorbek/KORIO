import { StyleSheet } from "react-native";
import type { DialogPalette } from "../../../../../shared/dialog-theme";

export function createDialogStyles(colors: DialogPalette) {
  return StyleSheet.create({
    title: {
      color: colors.text,
      fontSize: 25,
      lineHeight: 32,
      fontWeight: "800",
      textAlign: "center",
      marginBottom: 12,
    },
    message: {
      color: colors.textSecondary,
      fontSize: 15,
      lineHeight: 23,
      fontWeight: "500",
      textAlign: "center",
    },
    actions: { width: "100%", gap: 10, marginTop: 24 },
    primary: {
      width: "100%",
      minHeight: 52,
      borderRadius: 999,
      paddingHorizontal: 20,
      paddingVertical: 14,
      backgroundColor: colors.action,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 8,
    },
    primaryText: {
      color: colors.onAction,
      fontSize: 16,
      lineHeight: 22,
      fontWeight: "800",
      textAlign: "center",
      flexShrink: 1,
    },
    secondary: {
      width: "100%",
      minHeight: 48,
      borderRadius: 999,
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: colors.soft,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 8,
    },
    secondaryText: {
      color: colors.textSecondary,
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "700",
      textAlign: "center",
      flexShrink: 1,
    },
    close: {
      width: 44,
      height: 44,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.soft,
    },
  });
}
