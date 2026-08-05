import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import Animated, { ZoomIn, FadeIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useErrorStore } from "@/store/error.store";

export default function ErrorModal() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);
  const { visible, code, retry, dismiss } = useErrorStore();

  const message = t(`errors.${code}`, {
    defaultValue: t("errors.UNKNOWN_ERROR"),
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={dismiss}
    >
      <Animated.View entering={FadeIn.duration(150)} style={s.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={dismiss} />
        <Animated.View
          entering={ZoomIn.springify().damping(15).mass(0.7)}
          style={s.card}
        >
          <View style={s.iconWrap}>
            <Ionicons name="warning" size={32} color="#fff" />
          </View>
          <Text style={s.title}>{t("errors.title")}</Text>
          <Text style={s.msg}>{message}</Text>
          <Pressable
            style={({ pressed }) => [s.btn, pressed && s.btnPressed]}
            onPress={retry}
          >
            <Text style={s.btnT}>{t("errors.retry")}</Text>
          </Pressable>
          <Pressable onPress={dismiss} hitSlop={6} style={s.closeBtn}>
            <Text style={s.closeT}>{t("errors.close")}</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 32,
    },
    card: {
      width: "100%",
      maxWidth: 340,
      backgroundColor: theme.surface,
      borderRadius: 26,
      paddingTop: 28,
      paddingBottom: 22,
      paddingHorizontal: 24,
      alignItems: "center",
    },
    iconWrap: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: "#FF4B4B",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 8,
      textAlign: "center",
    },
    msg: {
      fontSize: 15,
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 22,
      marginBottom: 22,
      fontWeight: "500",
    },
    btn: {
      width: "100%",
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 15,
      alignItems: "center",
      borderBottomWidth: 4,
      borderBottomColor: "rgba(0,0,0,0.2)",
    },
    btnPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
    btnT: { color: "#fff", fontSize: 16, fontWeight: "800" },
    closeBtn: { paddingVertical: 12, marginTop: 4 },
    closeT: { fontSize: 15, fontWeight: "700", color: theme.textSecondary },
  });
