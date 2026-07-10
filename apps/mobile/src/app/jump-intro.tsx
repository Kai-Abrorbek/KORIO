import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import BoriMascot from "@/components/home/BoriMascot";

export default function JumpIntroScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme);
  const { section, unit } = useLocalSearchParams<{
    section?: string;
    unit?: string;
  }>();

  const start = () => {
    router.replace({
      pathname: "/lesson",
      params: {
        mode: "jumpTest",
        section: String(section),
        unit: String(unit),
      },
    });
  };

  const close = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/roadmap");
  };

  return (
    <View style={[s.container, { paddingTop: insets.top + 8 }]}>
      {/* 상단: X + 하트 5개 */}
      <View style={s.header}>
        <TouchableOpacity onPress={close} hitSlop={12}>
          <Ionicons name="close" size={30} color={theme.textSecondary} />
        </TouchableOpacity>
        <View style={s.heartsRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
              key={i}
              name="heart"
              size={26}
              color="#FF9600"
              style={{ marginLeft: i === 0 ? 0 : 4 }}
            />
          ))}
        </View>
      </View>

      {/* 마스코트 + 말풍선 */}
      <View style={s.center}>
        <Animated.View entering={FadeIn.duration(300)} style={s.mascotRow}>
          <BoriMascot size={130} />
          <View style={s.bubble}>
            <Text style={s.bubbleText}>{t("jump.introRule")}</Text>
            <View style={s.bubbleTail} />
          </View>
        </Animated.View>
      </View>

      {/* 계속 버튼 */}
      <Animated.View
        entering={FadeInDown.delay(200)}
        style={[s.bottom, { paddingBottom: insets.bottom + 16 }]}
      >
        <TouchableOpacity
          style={s.continueBtn}
          onPress={start}
          activeOpacity={0.9}
        >
          <Text style={s.continueText}>{t("jump.introContinue")}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 20 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 40,
    },
    heartsRow: { flexDirection: "row", alignItems: "center" },
    center: { flex: 1, justifyContent: "center" },
    mascotRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    bubble: {
      flex: 1,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 18,
      padding: 18,
    },
    bubbleText: {
      fontSize: 17,
      fontWeight: "700",
      color: theme.text,
      lineHeight: 26,
    },
    bubbleTail: {
      position: "absolute",
      left: -10,
      top: 28,
      width: 0,
      height: 0,
      borderTopWidth: 8,
      borderBottomWidth: 8,
      borderRightWidth: 11,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: theme.surface,
    },
    bottom: {},
    continueBtn: {
      backgroundColor: "#58CC02",
      borderRadius: 16,
      paddingVertical: 17,
      alignItems: "center",
      borderBottomWidth: 4,
      borderColor: "#48A800",
    },
    continueText: { color: "#fff", fontSize: 17, fontWeight: "900" },
  });
