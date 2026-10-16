import { useMemo } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Pressable } from "@/components/ui/Pressables";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import * as Haptics from "@/utils/haptics";

/**
 * 앱 안 확인창 — 안드로이드 기본 Alert.alert 대신. 텔레그램 shared/ui/confirm-dialog 와 같은 모양.
 *
 * - 열고 닫기는 페이드만 (튀어나오기·흔들림 금지)
 * - 위: 색 동그라미 아이콘(두 겹), 제목, 설명 / 아래: 3D 확인 버튼 + (있으면) 테두리 취소 버튼
 * - 배경을 누르거나 안드로이드 뒤로가기 = 취소
 */
export type ConfirmTone = "danger" | "primary" | "warning";

const TONE: Record<ConfirmTone, { color: string; depth: string }> = {
  danger: { color: "#FF4B4B", depth: "#D93636" },
  primary: { color: "#776EE2", depth: "#5A50C9" },
  warning: { color: "#FF9600", depth: "#D97C00" },
};

export default function ConfirmDialog({
  visible,
  tone = "danger",
  icon,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: {
  visible: boolean;
  tone?: ConfirmTone;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
  confirmLabel: string;
  /** 없으면 버튼 하나 (알림창) */
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const theme = useTheme();
  const s = useMemo(() => getStyles(theme), [theme]);
  const look = TONE[tone];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onCancel}
    >
      <View style={s.root}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        <View style={s.card}>
          <View style={[s.badgeOuter, { backgroundColor: look.color + "24" }]}>
            <View style={[s.badgeInner, { backgroundColor: look.color, borderBottomColor: look.depth }]}>
              <Ionicons name={icon} size={30} color="#FFFFFF" />
            </View>
          </View>
          <Text style={s.title}>{title}</Text>
          {message ? <Text style={s.message}>{message}</Text> : null}
          <View style={s.actions}>
            <Pressable
              onPress={() => {
                void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onConfirm();
              }}
              style={({ pressed }) => [
                s.confirm,
                { backgroundColor: look.color, borderBottomColor: look.depth },
                pressed ? s.pressed : null,
              ]}
            >
              <Text style={s.confirmText}>{confirmLabel}</Text>
            </Pressable>
            {cancelLabel ? (
              <Pressable onPress={onCancel} style={({ pressed }) => [s.cancel, pressed ? s.pressed : null]}>
                <Text style={s.cancelText}>{cancelLabel}</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    root: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
      backgroundColor: "rgba(14,10,40,0.55)",
    },
    card: {
      width: "100%",
      maxWidth: 340,
      alignItems: "center",
      backgroundColor: theme.surface,
      borderRadius: 28,
      borderWidth: 2,
      borderBottomWidth: 5,
      borderColor: theme.border,
      paddingTop: 26,
      paddingBottom: 16,
      paddingHorizontal: 20,
      shadowColor: "#140C46",
      shadowOpacity: 0.22,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 12 },
      elevation: 10,
    },
    badgeOuter: {
      width: 76,
      height: 76,
      borderRadius: 38,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },
    badgeInner: {
      width: 56,
      height: 56,
      borderRadius: 28,
      borderBottomWidth: 4,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      color: theme.text,
      fontSize: 19,
      fontWeight: "900",
      lineHeight: 25,
      textAlign: "center",
      marginBottom: 6,
    },
    message: {
      color: theme.textSecondary,
      fontSize: 14.5,
      fontWeight: "700",
      lineHeight: 21,
      textAlign: "center",
      marginHorizontal: 4,
    },
    actions: { alignSelf: "stretch", gap: 10, marginTop: 20 },
    confirm: {
      height: 52,
      borderRadius: 16,
      borderBottomWidth: 4,
      alignItems: "center",
      justifyContent: "center",
    },
    confirmText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
    cancel: {
      height: 52,
      borderRadius: 16,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    cancelText: { color: theme.textSecondary, fontSize: 16, fontWeight: "900" },
    pressed: { borderBottomWidth: 2, transform: [{ translateY: 2 }] },
  });
